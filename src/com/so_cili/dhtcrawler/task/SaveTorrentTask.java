package com.so_cili.dhtcrawler.task;

import java.util.ArrayList;
import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.so_cili.dhtcrawler.structure.MyQueue;
import com.so_cili.jfinal.entity.Torrent;
import com.so_cili.lucene.manager.IndexManager;

import redis.clients.jedis.Jedis;

/**
 * 
 * @ClassName:     SaveTorrentTask.java
 * @Description:   TODO(异步torrent批量入库) 
 * 
 * @author          xwl
 * @version         V1.0  
 * @Date           2016年8月1日 上午12:47:51
 */
public class SaveTorrentTask extends Thread {

	private MyQueue<com.so_cili.jfinal.entity.Torrent> torrentQueue;
	private Jedis jedis;
	
	public SaveTorrentTask(MyQueue<com.so_cili.jfinal.entity.Torrent> torrentQueue, Jedis jedis) {
		this.torrentQueue = torrentQueue;
		this.jedis = jedis;
	}
	
	@Override
	public void run() {
		while (!this.isInterrupted()) {
			try {
				List<com.so_cili.jfinal.entity.Torrent> list = torrentQueue.getAll();
				List<String> hashes = new ArrayList<>();
				try {
					sleep(20000);
					if (list.size() > 0) {
						int[] rs = Db.batchSave(list, list.size()); 
						for (int i = 0; i < rs.length; i++) {
							if (rs[i] > 0) {
								IndexManager.createIndex(new com.so_cili.jfinal.entity.Torrent()
										.set("info_hash", list.get(i).getStr("info_hash"))
										.set("name", list.get(i).getStr("name")));
							}
						}
					}
				} catch (Exception e) {
					//e.printStackTrace();
				} finally {
					for (Torrent t : list) {
						hashes.add(t.getStr("info_hash"));
					}
					jedis.del(hashes.toArray(new String[hashes.size()]));
				}
			} catch (Exception e) {}
		}
	}
	
}
