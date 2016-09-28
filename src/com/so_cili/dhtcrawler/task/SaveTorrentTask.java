package com.so_cili.dhtcrawler.task;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.so_cili.dhtcrawler.constant.DataBase;
import com.so_cili.dhtcrawler.db.ConnectionPool;
import com.so_cili.dhtcrawler.structure.MyQueue;
import com.so_cili.jfinal.entity.Torrent;
import com.so_cili.lucene.manager.IndexManager;

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
	private PreparedStatement statment;
	
	public SaveTorrentTask(MyQueue<com.so_cili.jfinal.entity.Torrent> torrentQueue, ConnectionPool pool) {
		this.torrentQueue = torrentQueue;
	}
	
	@Override
	public void run() {
		while (!this.isInterrupted()) {
			try {
				sleep(20000);
				List<com.so_cili.jfinal.entity.Torrent> list = torrentQueue.getAll();
				List<Torrent> torrents = new ArrayList<>();
				try {
					if (list.size() > 0) {
						int[] rs = Db.batchSave(list, list.size()); 
						for (int i = 0; i < rs.length; i++) {
							if (rs[i] > 0) {
								torrents.add(new com.so_cili.jfinal.entity.Torrent()
										.set("info_hash", list.get(i).getStr("info_hash"))
										.set("name", list.get(i).getStr("name")));
								DataBase.total++;
							}
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
				} finally {
					IndexManager.createIndex(torrents.toArray(new Torrent[torrents.size()]));
					list.clear();
					list = null;
				}
			} catch (Exception e) {
				//System.out.println(e.getMessage());
			}
		}
	}
	
}
