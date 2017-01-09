package com.so_cili.dhtcrawler.main;

import java.net.InetSocketAddress;
import java.sql.SQLException;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.TimeUnit;
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
import com.so_cili.jfinal.entity.Torrent;

import redis.clients.jedis.Jedis;

public class Main extends Thread {
	
	public static Main me = new Main();
	
	public static AtomicLong count = new AtomicLong(0);
	public static AtomicLong update_count = new AtomicLong(0);
	public static AtomicLong success_count = new AtomicLong(0);
	public static MyQueue<Torrent> torrentQueue = new MyQueue<>();
	private DHTServer server = null;
	private ExecutorService metadataDwonloadThreadPool;
	private ExecutorService CheckExistThreadPool;
	private ConnectionPool connPool;
	private long redis_size = 0;
	
	private Jedis jedis;
	
	@Override
	public void run() {
		
		System.out.println("Main start...");
		
		//连接redis缓存服务器
		jedis = RedisPool.getJedis();
		if (jedis == null) {
			System.out.println("get jedis failed.");
			return;
		}
		jedis.flushDB();
		jedis.flushAll();
		
		Prop prop = PropKit.use("crawler.properties");
		
		final Long MAX_INFO_HASH = prop.getLong("main.dhtserver.max.info_hash");
		final Integer MAX_THREAD = prop.getInt("main.metadata.thread.num") + 20000;

		metadataDwonloadThreadPool = Executors.newFixedThreadPool(prop.getInt("main.metadata.thread.num"));
		CheckExistThreadPool = Executors.newFixedThreadPool(prop.getInt("main.checkexist.thread.num"));

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
				//System.out.print("info_hash:" + ByteUtil.byteArrayToHex(info_hash) + "\r");
				if (redis_size > MAX_INFO_HASH) {
					redis_size = 0;
					jedis.flushDB();
					jedis.flushAll();
					return;
				}
				if (jedis.getSet(info_hash, new byte[]{0}) == null) {
					//System.out.print(Main.count.getAndIncrement() + "\r");
					CheckExistThreadPool.execute(new CheckExistTask(new DownloadPeer(address.getHostString(), port, info_hash), metadataDwonloadThreadPool));
					redis_size++;
				}
			}
		});
		server.start();
	}
	
	public void stopAll() {
		if (server != null)
			server.stopAll();
		if (connPool != null) {
			try {
				connPool.closeConnectionPool();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		if (CheckExistThreadPool != null) {
			CheckExistThreadPool.shutdown();
			try {
				CheckExistThreadPool.awaitTermination(10, TimeUnit.MINUTES);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		if (metadataDwonloadThreadPool != null) {
			metadataDwonloadThreadPool.shutdown();
			try {
				metadataDwonloadThreadPool.awaitTermination(10, TimeUnit.MINUTES);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
		}
		RedisPool.returnResource(jedis);
		RedisPool.close();
		System.out.println("webapp and crawler are all stoped.!!!");
	}
	
}
