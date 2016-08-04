package com.so_cili.dhtcrawler.main;

import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingQueue;
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
import com.so_cili.dhtcrawler.task.WireMetadataDownloadTask;
import com.so_cili.jfinal.entity.Torrent;

import redis.clients.jedis.Jedis;

public class Main extends Thread {
	
	public static Main me = new Main();
	
	public static AtomicLong count = new AtomicLong(0);
	public static AtomicLong update_count = new AtomicLong(0);
	private List<Thread> threads = new ArrayList<>();
	private DHTServer server = null;
	
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
		
		List<BlockingQueue<DownloadPeer>> dps = new ArrayList<>();
		for (int i = 0; i < 10; i ++) {
			dps.add(new LinkedBlockingQueue<>());
		}

		BlockingQueue<DownloadPeer> hashQueue = new LinkedBlockingQueue<>();
		MyQueue<Torrent> torrentQueue = new MyQueue<>();
		
		//启动下载metadata的线程
		for (int i = 0; i < prop.getInt("main.metadata.thread.num"); i++) {
			Thread t = new WireMetadataDownloadTask(dps, torrentQueue, RedisPool.getJedis());
			threads.add(t);
			t.start();
		}
		
		//启动检测info_hash在数据库是否存在的线程
		for (int i = 0; i < prop.getInt("main.checkexist.thread.num"); i++) {
			Thread t = new CheckExistTask(hashQueue, dps, RedisPool.getJedis());
			threads.add(t);
			t.start();
		}

		/*SaveTorrentTask saveTorrentTask = new SaveTorrentTask(torrentQueue, RedisPool.getJedis());
		threads.add(saveTorrentTask);
		saveTorrentTask.start();*/
		
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
				//System.out.println("announce_peer request, address:" + address.getHostString() + ":" + port + ", info_hash:" + ByteUtil.byteArrayToHex(info_hash) + "dps size:" + dps.size());
				if (hashQueue.size() > prop.getLong("main.dhtserver.max.info_hash"))
					return;
				//String hash = ByteUtil.byteArrayToHex(info_hash);
				if (jedis.getSet(info_hash, new byte[]{0}) == null) {
					try {
						//放进阻塞队列交给其他线程来检测info_hash是否存在，若在此处检测严重影响爬虫Server获取innfo_hash的速度
						hashQueue.put(new DownloadPeer(address.getHostString(), port, info_hash));
					} catch (InterruptedException e) {
						jedis.del(info_hash);
					}
					/*Torrent torrent = Torrent.dao.findFirst("select * from tb_file where info_hash=? limit 1", ByteUtil.byteArrayToHex(info_hash));
					
					//int result = Db.update("update tb_file set hot=hot+1 where info_hash=?", ByteUtil.byteArrayToHex(info_hash));
					//if (result > 0) {
						//System.out.print("update_count:" + update_count.getAndIncrement() + "\r");
					if (torrent != null) {
						//torrent.set("hot", torrent.getLong("hot") + 1).update();
						jedis.del(info_hash);
						return;
					}

					try {
						dps.put(new DownloadPeer(address.getHostString(), port, info_hash));
					} catch (InterruptedException e) {
						jedis.del(info_hash);
					}*/
				}
			}
		});
		//server.setDaemon(true);
		server.start();
	}
	
	public void stopAll() {
		for (Thread t : threads) {
			t.interrupt();
		}
		if (server != null)
			server.stopAll();
	}
	
}
