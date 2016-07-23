package com.so_cili.dhtcrawler.task;

import java.net.InetSocketAddress;
import java.sql.Timestamp;
import java.util.concurrent.BlockingQueue;

import com.alibaba.fastjson.JSON;
import com.so_cili.dhtcrawler.handler.AnnouncePeerInfoHashWireHandler;
import com.so_cili.dhtcrawler.listener.OnMetadataListener;
import com.so_cili.dhtcrawler.structure.DownloadPeer;
import com.so_cili.dhtcrawler.structure.Torrent;
import com.so_cili.dhtcrawler.util.ZipUtil;
import com.so_cili.lucene.manager.IndexManager;

public class WireMetadataDownloadTask extends Thread{
	
	//private AnnouncePeerInfoHashWireHandler handler = new AnnouncePeerInfoHashWireHandler();
	

	private BlockingQueue<DownloadPeer> dps;
	
	public WireMetadataDownloadTask(BlockingQueue<DownloadPeer> dps) {
		super();
		this.dps = dps;
		//initHandler();
	}

	@Override
	public void run() {
		try {
			while (!this.isInterrupted()) {
				//System.out.println("current work thread: " + tid + ", dps size:" + dps.size());
					DownloadPeer peer;
					peer = dps.take();
					AnnouncePeerInfoHashWireHandler handler = new AnnouncePeerInfoHashWireHandler();
					initHandler(handler);
					handler.handler(new InetSocketAddress(peer.getIp(), peer.getPort()), peer.getInfo_hash());
			}
		} catch (InterruptedException e) {}
	}
	
	private void initHandler(AnnouncePeerInfoHashWireHandler handler) {
	//private void initHandler() {
		handler.setOnMetadataListener(new OnMetadataListener() {
			@Override
			public void onMetadata(Torrent torrent) {
				try {
				//System.out.println("finished,dps size:" + dps.size());
				if (torrent == null || torrent.getInfo() == null)
					return;
				//入库操作
				/*Connection conn = null;
				PreparedStatement statement = null;
				try {*/
					com.so_cili.jfinal.entity.Torrent t = new com.so_cili.jfinal.entity.Torrent();
					boolean result = t.set("info_hash", torrent.getInfo_hash())
										.set("name", torrent.getInfo().getName())
										.set("type", torrent.getType())
										.set("find_date", new Timestamp(new java.util.Date().getTime()))
										.set("size", torrent.getInfo().getLength())
										.set("hot", 1)
										.set("subfiles", torrent.getInfo().getFiles() != null && torrent.getInfo().getFiles().size() > 0 ? ZipUtil.compress(JSON.toJSONString(torrent.getInfo().getFiles())) : null)
										.save();
					if (result) {
						IndexManager.createIndex(new com.so_cili.jfinal.entity.Torrent()
								.set("info_hash", torrent.getInfo_hash())
								.set("name", torrent.getInfo().getName()));
					}
					/*conn = connPool.getConnection();
					statement = conn.prepareStatement("insert into tb_file(info_hash,name,type,find_date,size,files) values(?,?,?,?,?,?)");
					statement.setString(1, torrent.getInfo_hash());
					statement.setString(2, torrent.getInfo().getName());
					statement.setString(3, torrent.getType());
					statement.setTimestamp(4, new Timestamp(new java.util.Date().getTime()));
					statement.setLong(5, torrent.getInfo().getLength());
					statement.setBytes(6, (torrent.getInfo().getFiles() != null && torrent.getInfo().getFiles().size() > 0) ? ZipUtil.compress(JSON.toJSONString(torrent.getInfo().getFiles())) : null);
					int i = statement.executeUpdate();
					statement.close();
					if (i == 1) {
						IndexManager.createIndex(new com.so_cili.jfinal.entity.Torrent()
								.set("info_hash", torrent.getInfo_hash())
								.set("name", torrent.getInfo().getName()));
					}*/
				/*} catch (SQLException e) {
					//e.printStackTrace();
					if (statement != null)
						try {
							statement.close();
							statement = null;
						} catch (SQLException e1) {
							//e1.printStackTrace();
						}
				} finally {
					if (conn != null) {
						connPool.returnConnection(conn);
						conn = null;
					}
				}*/
				} catch (Exception e) {e.printStackTrace();}
				
			}
		});
	}
	
}
