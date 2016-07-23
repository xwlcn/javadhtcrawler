package com.so_cili.dhtcrawler.task;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingQueue;

import com.alibaba.fastjson.JSON;
import com.so_cili.dhtcrawler.db.ConnectionPool;
import com.so_cili.dhtcrawler.structure.Torrent;
import com.so_cili.dhtcrawler.util.ZipUtil;
import com.so_cili.lucene.manager.IndexManager;

public class SaveTorrentTask extends Thread {
	
	private ConnectionPool connPool = null;
	private BlockingQueue<Torrent> torrentQueue;
	
	public SaveTorrentTask(ConnectionPool connPool, BlockingQueue<Torrent> torrentQueue) {
		this.connPool = connPool;
		this.torrentQueue = torrentQueue;
	}

	@Override
	public void run() {
		Connection conn = null;
		PreparedStatement statement = null;
		int count = 0;
		try {
			conn = connPool.getConnection();
			conn.setAutoCommit(false);
			statement = conn.prepareStatement("insert into tb_file(info_hash,name,type,find_date,size,files) values(?,?,?,?,?,?)");
		} catch (SQLException e) {
			//e.printStackTrace();
			System.out.println("save torrent thread-" + getId() + " init database connection failed.");
			return;
		}
		List<com.so_cili.jfinal.entity.Torrent> torrents = new ArrayList<>();
		while (!this.isInterrupted()) {
			try {
				count++;
				Torrent torrent = torrentQueue.take();
				statement.setString(1, torrent.getInfo_hash());
				statement.setString(2, torrent.getInfo().getName());
				statement.setString(3, torrent.getType());
				statement.setTimestamp(4, new Timestamp(new java.util.Date().getTime()));
				statement.setLong(5, torrent.getInfo().getLength());
				statement.setBytes(6, (torrent.getInfo().getFiles() != null && torrent.getInfo().getFiles().size() > 0) ? ZipUtil.compress(JSON.toJSONString(torrent.getInfo().getFiles())) : null);
				statement.addBatch();
				torrents.add(new com.so_cili.jfinal.entity.Torrent()
						.set("info_hash", torrent.getInfo_hash())
						.set("name", torrent.getInfo().getName()));
				if (count % 200 == 0) {
					int[] rs = statement.executeBatch();
					for (int i = 0; i < rs.length; i ++) {
						if (1 == rs[i]) {
							IndexManager.createIndex(torrents.get(i));
						}
					}
					conn.commit();
					torrents.clear();
				}
			} catch (InterruptedException e) {
				//e.printStackTrace();
			} catch (SQLException e) {
				//e.printStackTrace();
			}
		}
		
		if(statement != null) {
			try {
				int[] rs = statement.executeBatch();
				for (int i = 0; i < rs.length; i ++) {
					if (1 == rs[i]) {
						IndexManager.createIndex(torrents.get(i));
					}
				}
				conn.commit();
				torrents.clear();
				statement.close();
			} catch (SQLException e) {
				e.printStackTrace();
			}
		}
		
		if (conn != null) {
			connPool.returnConnection(conn);
		}
	}
}
