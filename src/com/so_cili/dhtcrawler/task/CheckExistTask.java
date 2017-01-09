package com.so_cili.dhtcrawler.task;

import java.sql.Connection;
import java.util.Random;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.ExecutorService;

import com.jfinal.plugin.activerecord.Db;
import com.so_cili.dhtcrawler.main.Main;
import com.so_cili.dhtcrawler.structure.DownloadPeer;
import com.so_cili.dhtcrawler.util.ByteUtil;
import com.so_cili.dhtcrawler.util.DBUtil;

public class CheckExistTask extends Thread {

	private DownloadPeer peer;
	private ExecutorService metadataDwonloadThreadPool;
	private Integer max_thread;
	private BlockingQueue<DownloadPeer> hashQueue;
	
	public CheckExistTask(DownloadPeer peer, ExecutorService metadataDwonloadThreadPool) {
		this.peer = peer;
		this.metadataDwonloadThreadPool = metadataDwonloadThreadPool;
	}
	
	/*public CheckExistTask(BlockingQueue<DownloadPeer> hashQueue, 
			ExecutorService metadataDwonloadThreadPool, Connection conn, Integer mAX_THREAD2) {
		this.hashQueue = hashQueue;
		this.metadataDwonloadThreadPool = metadataDwonloadThreadPool;
		this.max_thread = mAX_THREAD2;
	}*/


	@Override
	public void run() {
		//while (!isInterrupted()) {
			try {
				//long curr = System.currentTimeMillis();
				//peer = hashQueue.take();
				//long curr1 = System.currentTimeMillis();
				boolean exist = DBUtil.checkExist(ByteUtil.byteArrayToHex(peer.getInfo_hash()));
				//long last = System.currentTimeMillis();
				//System.out.println(last - curr1);
				/*System.out.println("thread:" + getId() + ", cost:" + (last - curr) + "ms, " + 
						(last - curr1) + "ms, exist:" + exist);*/
				//statment.setString(1, ByteUtil.byteArrayToHex(peer.getInfo_hash()));
				if (!exist) {
					//System.out.print("start download..." + new Random().nextInt() + "\r");
					metadataDwonloadThreadPool.execute(new WireMetadataDownloadTask(peer));
					Main.count.incrementAndGet();
				}
			} catch (Exception e) {
				e.printStackTrace();
			} 
		//}
	}
}
