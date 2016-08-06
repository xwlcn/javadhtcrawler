package com.so_cili.dhtcrawler.task;

import java.util.concurrent.ExecutorService;

import com.jfinal.plugin.activerecord.Db;
import com.so_cili.dhtcrawler.main.Main;
import com.so_cili.dhtcrawler.structure.DownloadPeer;
import com.so_cili.dhtcrawler.util.ByteUtil;

public class CheckExistTask implements Runnable {

	private DownloadPeer peer;
	private ExecutorService metadataDwonloadThreadPool;
	private Integer max_thread;
	
	public CheckExistTask(DownloadPeer peer, 
			ExecutorService metadataDwonloadThreadPool, Integer max_thread) {
		this.peer = peer;
		this.metadataDwonloadThreadPool = metadataDwonloadThreadPool;
		this.max_thread = max_thread;
	}
	
	@Override
	public void run() {
		int result = 1;
		try {
			result = Db.update("update tb_file set hot=hot+1 where info_hash=?", ByteUtil.byteArrayToHex(peer.getInfo_hash()));
		} catch (Exception e) {}
		if (result <= 0 && Main.count.get() < max_thread) {
			Main.count.getAndIncrement();
			metadataDwonloadThreadPool.execute(new WireMetadataDownloadTask(peer));
		}
	}
}
