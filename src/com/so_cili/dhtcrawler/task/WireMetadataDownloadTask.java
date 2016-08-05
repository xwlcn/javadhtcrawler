package com.so_cili.dhtcrawler.task;

import java.net.InetSocketAddress;
import java.sql.Timestamp;

import com.alibaba.fastjson.JSON;
import com.so_cili.dhtcrawler.handler.AnnouncePeerInfoHashWireHandler;
import com.so_cili.dhtcrawler.listener.OnMetadataListener;
import com.so_cili.dhtcrawler.main.Main;
import com.so_cili.dhtcrawler.structure.DownloadPeer;
import com.so_cili.dhtcrawler.structure.Torrent;
import com.so_cili.dhtcrawler.util.ZipUtil;

public class WireMetadataDownloadTask extends Thread{
	
	//private AnnouncePeerInfoHashWireHandler handler = new AnnouncePeerInfoHashWireHandler();
	

	private DownloadPeer peer;
	
	public WireMetadataDownloadTask(DownloadPeer peer) {
		this.peer = peer;
	}

	@Override
	public void run() {

			AnnouncePeerInfoHashWireHandler handler = new AnnouncePeerInfoHashWireHandler();
			initHandler(handler);
			try {
				handler.handler(new InetSocketAddress(peer.getIp(), peer.getPort()), peer.getInfo_hash());
			} catch (Exception e) {
				//jedis.del(ByteUtil.byteArrayToHex(peer.getInfo_hash()));
				//e.printStackTrace();
				//System.out.println(e.getMessage());
			} finally {
				//jedis.del(peer.getInfo_hash());
				handler.release();
				handler = null;
				Main.count.decrementAndGet();
			}

	}
	
	private void initHandler(AnnouncePeerInfoHashWireHandler handler) {
	//private void initHandler() {
		handler.setOnMetadataListener(new OnMetadataListener() {
			@Override
			public void onMetadata(Torrent torrent) {
					//System.out.println("finished,dps size:" + dps.size());
					if (torrent == null || torrent.getInfo() == null)
						return;
					//System.out.print("success count:" + Main.count.getAndIncrement() + "\r");
					//入库操作
					com.so_cili.jfinal.entity.Torrent t = new com.so_cili.jfinal.entity.Torrent();
					t.set("info_hash", torrent.getInfo_hash())
					.set("name", torrent.getInfo().getName())
					.set("type", torrent.getType())
					.set("find_date", new Timestamp(new java.util.Date().getTime()))
					.set("size", torrent.getInfo().getLength())
					.set("hot", 1)
					.set("subfiles", torrent.getInfo().getFiles() != null && torrent.getInfo().getFiles().size() > 0 ? ZipUtil.compress(JSON.toJSONString(torrent.getInfo().getFiles())) : null);
					Main.torrentQueue.insert(t);
					
					/*com.so_cili.jfinal.entity.Torrent t = new com.so_cili.jfinal.entity.Torrent();
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
					}*/
			}
		});
	}
	
}
