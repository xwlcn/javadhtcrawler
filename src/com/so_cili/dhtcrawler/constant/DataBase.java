package com.so_cili.dhtcrawler.constant;

import java.util.List;

import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.Db;
import com.so_cili.dhtcrawler.util.StringUtil;
import com.so_cili.jfinal.entity.Torrent;

public class DataBase extends Thread {
	
	//缓存总记录数
	public static Long total;
	
	//缓存最近50条记录
	public static List<Torrent> top50;	

	private static boolean stop = false;
	
	public static void startCache() {
		
		new DataBase().start();
	}
	
	@Override
	public void run() {
		
		long interval = PropKit.use("crawler.properties").getLong("dataBase.cache.flush.time");
		
		while (!stop) {
			try {
				total = Db.queryLong("SELECT COUNT(id) FROM tb_file");
				top50 = Torrent.dao.find("SELECT id,info_hash,name,find_date FROM tb_file ORDER BY find_date DESC LIMIT 50");
				for (Torrent t : top50) {
					t.put("flag", t.get("id") + StringUtil.formatStr(t.getStr("name")));
				}
				Thread.sleep(interval);
			} catch (Exception e) {
				//e.printStackTrace();
			}
		}
	}
	
	public static void stopCache() {
		stop = true;
	}
}
