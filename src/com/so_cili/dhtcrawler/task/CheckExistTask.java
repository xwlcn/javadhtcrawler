package com.so_cili.dhtcrawler.task;

import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;

import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.Db;
import com.so_cili.dhtcrawler.main.Main;
import com.so_cili.dhtcrawler.structure.DownloadPeer;
import com.so_cili.dhtcrawler.util.ByteUtil;

import redis.clients.jedis.Jedis;

public class CheckExistTask extends Thread {

	private BlockingQueue<DownloadPeer> hashQueue;
	private BlockingQueue<DownloadPeer> downloadPeerQueue;
	private Jedis jedis;
	private ExecutorService threadPool;
	
	public CheckExistTask(BlockingQueue<DownloadPeer> hashQueue, 
			ExecutorService threadPool, Jedis jedis) {
		this.hashQueue = hashQueue;
		this.threadPool = threadPool;
		this.jedis = jedis;
	}
	
	@Override
	public void run() {
		final long max_thread = PropKit.use("crawler.properties").getLong("main.metadata.thread.num") + 200;
		while (!isInterrupted()) {
			try {
				DownloadPeer dp = hashQueue.take();
				int result = 1;
				try {
					result = Db.update("update tb_file set hot=hot+1 where info_hash=?", ByteUtil.byteArrayToHex(dp.getInfo_hash()));
				} catch (Exception e) {}
				if (result <= 0 && Main.count.get() < max_thread) {
					Main.count.getAndIncrement();
					//downloadPeerQueue.put(dp);
					threadPool.execute(new WireMetadataDownloadTask(dp));
				} else {
					//jedis.del(dp.getInfo_hash());
				}
			} catch (Exception e) {}
		}
	}
}
