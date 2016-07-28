package com.so_cili.dhtcrawler.main;

import java.net.InetSocketAddress;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

import com.so_cili.dhtcrawler.db.RedisPool;
import com.so_cili.dhtcrawler.listener.OnAnnouncePeerListener;
import com.so_cili.dhtcrawler.listener.OnGetPeersListener;
import com.so_cili.dhtcrawler.server.DHTServer;
import com.so_cili.dhtcrawler.structure.DownloadPeer;
import com.so_cili.dhtcrawler.task.WireMetadataDownloadTask;
import com.so_cili.dhtcrawler.util.ByteUtil;
import com.so_cili.jfinal.entity.Torrent;

import redis.clients.jedis.Jedis;

public class Main extends Thread {
	
	public static Main me = new Main();
	
	public static long count = 0;
	private List<Thread> threads = new ArrayList<>();
	private DHTServer server = null;
	
	@Override
	public void run() {
		Jedis jedis = RedisPool.getJedis();
		if (jedis == null) {
			System.out.println("get jedis failed.");
			return;
		}
		jedis.flushDB();
		jedis.flushAll();
		
		BlockingQueue<DownloadPeer> dps = new LinkedBlockingQueue<>();

		for (int i = 0; i < 220; i++) {
			Thread t = new WireMetadataDownloadTask(dps, RedisPool.getJedis());
			threads.add(t);
			t.start();
		}

		
		server = new DHTServer("0.0.0.0", 6882, 88800);
		
		/*Map<String, String> allowedIp = new HashMap<>();
		allowedIp.put("CN", "CN");
		allowedIp.put("TW", "TW");
		allowedIp.put("HK", "HK");
		allowedIp.put("JP", "JP");
		allowedIp.put("KR", "KR");
		//allowedIp.put("SG", "SG");
		
		server.setAllowedIp(allowedIp);*/
		
		server.setOnGetPeersListener(new OnGetPeersListener() {
			
			@Override
			public void onGetPeers(InetSocketAddress address, byte[] info_hash) {
				//System.out.println("get_peers request, address:" + address.getHostString() + ", info_hash:" + ByteUtil.byteArrayToHex(info_hash));
			}
		});
		server.setOnAnnouncePeerListener(new OnAnnouncePeerListener() {
			
			@Override
			public void onAnnouncePeer(InetSocketAddress address, byte[] info_hash, int port) {
				//System.out.println("announce_peer request, address:" + address.getHostString() + ":" + port + ", info_hash:" + ByteUtil.byteArrayToHex(info_hash) + "dps size:" + dps.size());
				if (dps.size() > 500000)
					return;
				if (jedis.get(info_hash) == null) {
					Torrent torrent = Torrent.dao.findFirst("select * from tb_file where info_hash=? limit 1", ByteUtil.byteArrayToHex(info_hash));
					if (torrent != null) {
						torrent.set("hot", torrent.getInt("hot") + 1).update();
						return;
					}
					try {
						jedis.setex(info_hash, 60 * 30, new byte[]{});
						dps.put(new DownloadPeer(address.getHostString(), port, info_hash));
					} catch (InterruptedException e) {
						e.printStackTrace();
					}
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
