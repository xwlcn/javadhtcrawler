package com.so_cili.dhtcrawler.main;

import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.LinkedBlockingQueue;
import java.util.concurrent.atomic.AtomicLong;

import com.jfinal.kit.Prop;
import com.jfinal.kit.PropKit;
import com.so_cili.dhtcrawler.db.RedisPool;
import com.so_cili.dhtcrawler.listener.OnAnnouncePeerListener;
import com.so_cili.dhtcrawler.listener.OnGetPeersListener;
import com.so_cili.dhtcrawler.server.DHTServer;
import com.so_cili.dhtcrawler.structure.DownloadPeer;
import com.so_cili.dhtcrawler.structure.MyQueue;
import com.so_cili.dhtcrawler.task.CheckExistTask;
import com.so_cili.dhtcrawler.task.SaveTorrentTask;
import com.so_cili.jfinal.entity.Torrent;

import redis.clients.jedis.Jedis;

public class Main extends Thread {
	
	public static Main me = new Main();
	
	public static AtomicLong count = new AtomicLong(0);
	public static AtomicLong update_count = new AtomicLong(0);
	public static MyQueue<Torrent> torrentQueue = new MyQueue<>();
	private List<Thread> threads = new ArrayList<>();
	private DHTServer server = null;
	private ExecutorService metadataDwonloadThreadPool;
	private ExecutorService CheckExistThreadPool;
	
	@Override
	public void run() {
		
		//连接redis缓存服务器
		Jedis jedis = RedisPool.getJedis();
		if (jedis == null) {
			System.out.println("get jedis failed.");
			return;
		}
		jedis.flushDB();
		jedis.flushAll();
		
		Prop prop = PropKit.use("crawler.properties");
		
		/*List<BlockingQueue<DownloadPeer>> dps = new ArrayList<>();
		for (int i = 0; i < 100; i ++) {
			dps.add(new LinkedBlockingQueue<>());
		}*/

		metadataDwonloadThreadPool = Executors.newFixedThreadPool(prop.getInt("main.metadata.thread.num"));
		CheckExistThreadPool = Executors.newFixedThreadPool(prop.getInt("main.checkexist.thread.num"));
		/*BlockingQueue<DownloadPeer> downloadPeerQueue = new LinkedBlockingQueue<>();*/
		
		//启动下载metadata的线程
		/*for (int i = 0; i < prop.getInt("main.metadata.thread.num"); i++) {
			Thread t = new WireMetadataDownloadTask(downloadPeerQueue, torrentQueue, RedisPool.getJedis());
			threads.add(t);
			t.start();
		}*/
		
		//启动检测info_hash在数据库是否存在的线程
		/*for (int i = 0; i < prop.getInt("main.checkexist.thread.num"); i++) {
			Thread t = new CheckExistTask(hashQueue, threadPool, RedisPool.getJedis());
			threads.add(t);
			t.start();
		}*/

		SaveTorrentTask saveTorrentTask = new SaveTorrentTask(torrentQueue, RedisPool.getJedis());
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
		
		final Long MAX_INFO_HASH = prop.getLong("main.dhtserver.max.info_hash");
		final Integer MAX_THREAD = PropKit.use("crawler.properties").getInt("main.metadata.thread.num") + 200;
		
		//配置announce_peers请求监听器
		server.setOnAnnouncePeerListener(new OnAnnouncePeerListener() {
			
			@Override
			public void onAnnouncePeer(InetSocketAddress address, byte[] info_hash, int port) {
				//System.out.println("announce_peer request, address:" + address.getHostString() + ":" + port + ", info_hash:" + ByteUtil.byteArrayToHex(info_hash) + "dps size:" + dps.size());
				if (jedis.dbSize() > MAX_INFO_HASH) {
					jedis.flushDB();
					jedis.flushAll();
					System.gc();
					return;
				}
				//String hash = ByteUtil.byteArrayToHex(info_hash);
				if (jedis.getSet(info_hash, new byte[]{0}) == null) {
						//放进阻塞队列交给其他线程来检测info_hash是否存在，若在此处检测严重影响爬虫Server获取innfo_hash的速度
				CheckExistThreadPool.execute(new CheckExistTask(
						new DownloadPeer(address.getHostString(), port, info_hash), 
						metadataDwonloadThreadPool, MAX_THREAD));
				}
			}
		});
		//server.setDaemon(true);
		server.start();
	}
	
	public void stopAll() {
		metadataDwonloadThreadPool.shutdown();
		CheckExistThreadPool.shutdown();
		for (Thread t : threads) {
			t.interrupt();
		}
		if (server != null)
			server.stopAll();
	}
	
}
