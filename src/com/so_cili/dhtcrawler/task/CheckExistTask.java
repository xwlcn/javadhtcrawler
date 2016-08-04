package com.so_cili.dhtcrawler.task;

import java.util.List;
import java.util.concurrent.BlockingQueue;

import com.jfinal.plugin.activerecord.Db;
import com.so_cili.dhtcrawler.structure.DownloadPeer;
import com.so_cili.dhtcrawler.util.ByteUtil;

import redis.clients.jedis.Jedis;

public class CheckExistTask extends Thread {

	private BlockingQueue<DownloadPeer> hashQueue;
	private List<BlockingQueue<DownloadPeer>> dps;
	private Jedis jedis;
	
	public CheckExistTask(BlockingQueue<DownloadPeer> hashQueue, 
			List<BlockingQueue<DownloadPeer>> dps, Jedis jedis) {
		this.hashQueue = hashQueue;
		this.dps = dps;
		this.jedis = jedis;
	}
	
	@Override
	public void run() {
		int index = 0;
		int size = dps.size();
		while (!isInterrupted()) {
			try {
				DownloadPeer dp = hashQueue.take();
				int result = 1;
				try {
					result = Db.update("update tb_file set hot=hot+1 where info_hash=?", ByteUtil.byteArrayToHex(dp.getInfo_hash()));
				} catch (Exception e) {}
				if (result <= 0) {
					index = (index + 1) % size;
					dps.get(index).put(dp);
				} else {
					jedis.del(dp.getInfo_hash());
				}
			} catch (Exception e) {}
		}
	}
}
