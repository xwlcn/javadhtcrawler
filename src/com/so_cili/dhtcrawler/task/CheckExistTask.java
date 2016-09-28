package com.so_cili.dhtcrawler.task;

import java.sql.Connection;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;

import com.jfinal.plugin.activerecord.Db;
import com.so_cili.dhtcrawler.main.Main;
import com.so_cili.dhtcrawler.structure.DownloadPeer;
import com.so_cili.dhtcrawler.util.ByteUtil;

public class CheckExistTask extends Thread {

	private DownloadPeer peer;
	private ExecutorService metadataDwonloadThreadPool;
	private Integer max_thread;
	private BlockingQueue<DownloadPeer> hashQueue;
	
	public CheckExistTask(BlockingQueue<DownloadPeer> hashQueue, 
			ExecutorService metadataDwonloadThreadPool, Connection conn, Integer mAX_THREAD2) {
		this.hashQueue = hashQueue;
		this.metadataDwonloadThreadPool = metadataDwonloadThreadPool;
		this.max_thread = mAX_THREAD2;
	}


	@Override
	public void run() {
		while (!isInterrupted()) {
			try {
				peer = hashQueue.take();
				long c = Db.queryLong("SELECT COUNT(id) FROM tb_file WHERE info_hash=?",ByteUtil.byteArrayToHex(peer.getInfo_hash()));
				//statment.setString(1, ByteUtil.byteArrayToHex(peer.getInfo_hash()));
				if (c <= 0) {
					//System.out.println(ByteUtil.byteArrayToHex(peer.getInfo_hash()));
					metadataDwonloadThreadPool.execute(new WireMetadataDownloadTask(peer));
					Main.count.incrementAndGet();
				}
			} catch (Exception e) {
				System.out.println(e.getMessage());
			} 
		}
	}
}
