package com.so_cili.dhtcrawler.task;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;

import com.so_cili.dhtcrawler.db.ConnectionPool;
import com.so_cili.dhtcrawler.main.Main;
import com.so_cili.dhtcrawler.structure.DownloadPeer;
import com.so_cili.dhtcrawler.util.ByteUtil;

public class CheckExistTask extends Thread {

	private DownloadPeer peer;
	private ExecutorService metadataDwonloadThreadPool;
	private Integer max_thread;
	private ConnectionPool pool;
	private Connection conn;
	private PreparedStatement statment;
	private BlockingQueue<DownloadPeer> hashQueue;
	private List<DownloadPeer> list = new ArrayList<>();
	
	public CheckExistTask(BlockingQueue<DownloadPeer> hashQueue, 
			ExecutorService metadataDwonloadThreadPool, Connection conn, Integer mAX_THREAD2) {
		this.hashQueue = hashQueue;
		this.metadataDwonloadThreadPool = metadataDwonloadThreadPool;
		this.max_thread = mAX_THREAD2;
		this.conn = conn;
	}


	@Override
	public void run() {
		try {
			conn.setAutoCommit(false);
			statment = conn.prepareStatement("update tb_file set hot=hot+1 where info_hash=?");
		} catch (SQLException e1) {
			//e1.printStackTrace();
		}
		while (!isInterrupted()) {
			int result = 1;
			try {
				peer = hashQueue.take();
				list.add(peer);
				statment.setString(1, ByteUtil.byteArrayToHex(peer.getInfo_hash()));
				statment.addBatch();
				if (list.size() >= 500) {
					int[] rs = statment.executeBatch();
					conn.commit();
					for (int i = 0; i < rs.length; i++) {
						if (rs[i] <= 0 && Main.count.get() < max_thread) {
							metadataDwonloadThreadPool.execute(new WireMetadataDownloadTask(list.get(i)));
							Main.count.incrementAndGet();
						}
					}
					list.clear();
				}
				//result = Db.update("update tb_file set hot=hot+1 where info_hash=?", ByteUtil.byteArrayToHex(peer.getInfo_hash()));
				/*statment.setString(1, ByteUtil.byteArrayToHex(peer.getInfo_hash()));
				result = statment.executeUpdate();
				if (result <= 0 && Main.count.get() < max_thread) {
					metadataDwonloadThreadPool.execute(new WireMetadataDownloadTask(peer));
					Main.count.incrementAndGet();
				}*/
			} catch (Exception e) {
				
			} finally {
				/*if (statment != null) {
					try {
						statment.close();
					} catch (SQLException e) {
						//e.printStackTrace();
					}
				}*/
			}
		}
		if (statment != null) {
			try {
				statment.close();
			} catch (SQLException e) {
				//e.printStackTrace();
			}
		}
		if (conn != null) {
			pool.returnConnection(conn);
		}
	}
}
