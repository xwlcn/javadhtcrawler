package com.so_cili.dhtcrawler.main;

import java.net.InetSocketAddress;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.atomic.AtomicLong;

import com.jfinal.kit.Prop;
import com.jfinal.kit.PropKit;
import com.so_cili.dhtcrawler.db.ConnectionPool;
import com.so_cili.dhtcrawler.db.RedisPool;
import com.so_cili.dhtcrawler.listener.OnAnnouncePeerListener;
import com.so_cili.dhtcrawler.listener.OnGetPeersListener;
import com.so_cili.dhtcrawler.server.DHTServer;
import com.so_cili.dhtcrawler.structure.DownloadPeer;
import com.so_cili.dhtcrawler.structure.MyQueue;
import com.so_cili.dhtcrawler.task.CheckExistTask;
import com.so_cili.dhtcrawler.task.SaveTorrentTask;
import com.so_cili.dhtcrawler.util.ByteUtil;
import com.so_cili.jfinal.entity.Torrent;

import redis.clients.jedis.Jedis;

public class Main extends Thread {
	
	public static Main me = new Main();
	
	public static AtomicLong count = new AtomicLong(0);
	public static AtomicLong update_count = new AtomicLong(0);
	public static AtomicLong success_count = new AtomicLong(0);
	public static MyQueue<Torrent> torrentQueue = new MyQueue<>();
	private List<Thread> threads = new ArrayList<>();
	private DHTServer server = null;
	private ExecutorService metadataDwonloadThreadPool;
	private ExecutorService CheckExistThreadPool;
	private ConnectionPool connPool;
	private long redis_size = 0;
	
	@Override
	public void run() {
		
		System.out.println("Main start...");
		
		//连接redis缓存服务器
		Jedis jedis = RedisPool.getJedis();
		if (jedis == null) {
			System.out.println("get jedis failed.");
			return;
		}
		jedis.flushDB();
		jedis.flushAll();
		
		//connPool = new ConnectionPool("com.mysql.jdbc.Driver", "jdbc:mysql:///dht?useUnicode=true&characterEncoding=utf8&zeroDateTimeBehavior=convertToNull", "root", "1993527wan");
		
		Prop prop = PropKit.use("crawler.properties");
		
		final Long MAX_INFO_HASH = prop.getLong("main.dhtserver.max.info_hash");
		final Integer MAX_THREAD = prop.getInt("main.metadata.thread.num") + 2000;
		
		/*List<BlockingQueue<DownloadPeer>> dps = new ArrayList<>();
		for (int i = 0; i < 100; i ++) {
			dps.add(new LinkedBlockingQueue<>());
		}*/

		metadataDwonloadThreadPool = Executors.newFixedThreadPool(prop.getInt("main.metadata.thread.num"));
		//CheckExistThreadPool = Executors.newFixedThreadPool(prop.getInt("main.checkexist.thread.num"));
		/*BlockingQueue<DownloadPeer> downloadPeerQueue = new LinkedBlockingQueue<>();*/
		BlockingQueue<DownloadPeer> hashQueue = new LinkedBlockingQueue<>();
		
		//启动下载metadata的线程
		/*for (int i = 0; i < prop.getInt("main.metadata.thread.num"); i++) {
			Thread t = new WireMetadataDownloadTask(downloadPeerQueue, torrentQueue, RedisPool.getJedis());
			threads.add(t);
			t.start();
		}*/
		
		//启动检测info_hash在数据库是否存在的线程

		for (int i = 0; i < prop.getInt("main.checkexist.thread.num"); i++) {
			Thread t = new CheckExistTask(hashQueue, metadataDwonloadThreadPool, null, MAX_THREAD);
			threads.add(t);
			t.start();
		}


		SaveTorrentTask saveTorrentTask = new SaveTorrentTask(torrentQueue, connPool);
		threads.add(saveTorrentTask);
		saveTorrentTask.start();
		
		server = new DHTServer(prop.get("main.dhtserver.host"), 
				prop.getInt("main.dhtserver.port"), prop.getInt("main.dhtserver.max.node"));
		
		//配置爬取国家白名单
		/*Map<String, String> allowedIp = new HashMap<>();
		allowedIp.put("CN", "CN");
		allowedIp.put("TW", "TW");
		allowedIp.put("HK", "HK");
		allowedIp.put("JP", "JP");
		allowedIp.put("KR", "KR");
		//allowedIp.put("SG", "SG");
		
		server.setAllowedIp(allowedIp);*/
		
		//配置get_peer请求监听器
		server.setOnGetPeersListener(new OnGetPeersListener() {
			
			@Override
			public void onGetPeers(InetSocketAddress address, byte[] info_hash) {
				//System.out.println("get_peers request, address:" + address.getHostString() + ", info_hash:" + ByteUtil.byteArrayToHex(info_hash));
			}
		});
		
		//配置announce_peers请求监听器
		server.setOnAnnouncePeerListener(new OnAnnouncePeerListener() {
			
			@Override
			public void onAnnouncePeer(InetSocketAddress address, byte[] info_hash, int port) {
				//System.out.print("announce_peer request, address:" + address.getHostString() + ":" + port + ", info_hash:" + ByteUtil.byteArrayToHex(info_hash) + "\r");
				if (hashQueue.size() > MAX_INFO_HASH)
					return;
				if (redis_size > MAX_INFO_HASH) {
					redis_size = 0;
					jedis.flushDB();
					jedis.flushAll();
					return;
				}
				if (jedis.getSet(info_hash, new byte[]{0}) == null) {
					/*CheckExistThreadPool.execute(new CheckExistTask(
							new DownloadPeer(address.getHostString(), port, info_hash), 
							metadataDwonloadThreadPool, MAX_THREAD, pool));*/
					try {
						hashQueue.put(new DownloadPeer(address.getHostString(), port, info_hash));
					} catch (InterruptedException e) {
						//e.printStackTrace();
					}
					redis_size++;
				}
			}
		});
		server.start();
	}
	
	public void stopAll() {
		if (connPool != null) {
			try {
				connPool.closeConnectionPool();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		metadataDwonloadThreadPool.shutdown();
		//CheckExistThreadPool.shutdown();
		for (Thread t : threads) {
			t.interrupt();
		}
		if (server != null)
			server.stopAll();
	}
	
}
