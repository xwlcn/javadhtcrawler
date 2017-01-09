package com.so_cili.dhtcrawler.task;

import java.net.InetSocketAddress;
import java.sql.Timestamp;

import com.alibaba.fastjson.JSON;
import com.jfinal.plugin.activerecord.Record;
import com.so_cili.dhtcrawler.constant.DataBase;
import com.so_cili.dhtcrawler.db.RedisPool;
import com.so_cili.dhtcrawler.handler.AnnouncePeerInfoHashWireHandler;
import com.so_cili.dhtcrawler.listener.OnMetadataListener;
import com.so_cili.dhtcrawler.main.Main;
import com.so_cili.dhtcrawler.structure.DownloadPeer;
import com.so_cili.dhtcrawler.structure.Torrent;
import com.so_cili.dhtcrawler.util.DBUtil;
import com.so_cili.dhtcrawler.util.StringUtil;
import com.so_cili.dhtcrawler.util.ZipUtil;
import com.so_cili.lucene.manager.IndexManager;

import redis.clients.jedis.Jedis;

public class WireMetadataDownloadTask implements Runnable {
	
	//private AnnouncePeerInfoHashWireHandler handler = new AnnouncePeerInfoHashWireHandler();
	

	private DownloadPeer peer;
	private Jedis jedis;
	
	public WireMetadataDownloadTask(DownloadPeer peer) {
		this.peer = peer;
		this.jedis = RedisPool.getJedis();
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
				Main.count.decrementAndGet();
				handler.release();
				handler = null;
				peer = null;
				if (jedis != null)
					RedisPool.returnResource(jedis);
			}
			//System.out.println("finished,dps size:" + Main.count.get());

	}
	
	private void initHandler(AnnouncePeerInfoHashWireHandler handler) {
	//private void initHandler() {
		handler.setOnMetadataListener(new OnMetadataListener() {
			@Override
			public void onMetadata(Torrent torrent) {
					//System.out.println("finished,dps size:" + Main.count.get());
					if (torrent == null || torrent.getInfo() == null)
						return;
					//入库操作
					Record record = new Record();
					String jsonSubFiles = JSON.toJSONString(torrent.getInfo().getFiles());
					record.set("info_hash", torrent.getInfo_hash())
					.set("name", torrent.getInfo().getName().getBytes())
					.set("type", torrent.getType())
					.set("find_date", new Timestamp(new java.util.Date().getTime()))
					.set("size", torrent.getInfo().getLength())
					.set("hot", 1)
					.set("subfiles", torrent.getInfo().getFiles() != null && torrent.getInfo().getFiles().size() > 0 ? ZipUtil.compress(jsonSubFiles) : null);
					boolean success = DBUtil.saveTorrent(record);
					if (success) {
						record.set("name", torrent.getInfo().getName());
						record.set("flag", record.get("id") + "-" + torrent.getInfo_hash().substring(0, 1) + StringUtil.formatStr(torrent.getInfo().getName()));
						record.set("subfiles", jsonSubFiles);
						DataBase.top50.put(record);
						IndexManager.createIndex(new com.so_cili.jfinal.entity.Torrent()
								.set("id", record.getLong("id"))
								.set("info_hash", torrent.getInfo_hash())
								.set("name", torrent.getInfo().getName()));
						System.out.print("success count:" + Main.success_count.getAndIncrement() + ", " + Main.count.get() + "\r");
					}
					/*com.so_cili.jfinal.entity.Torrent t = new com.so_cili.jfinal.entity.Torrent();
					long id = jedis.incr("id");
					if (id % 500000 == 1) {
						DB.que
					}
					boolean result = t.set("id", id)
										set("info_hash", torrent.getInfo_hash())
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
