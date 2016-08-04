package com.so_cili.dhtcrawler.constant;

import java.util.List;
import java.util.Timer;
import java.util.TimerTask;

import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.Db;
import com.so_cili.dhtcrawler.util.StringUtil;
import com.so_cili.jfinal.entity.Torrent;

public class DataBase {
	
	//缓存总记录数
	public static Long total;
	
	//缓存最近50条记录
	public static List<Torrent> top50;	

	private static Timer task = new Timer(true);
	
	public static void startCache() {
		task.schedule(new TimerTask() {
			@Override
			public void run() {
				total = Db.queryLong("SELECT COUNT(id) FROM tb_file");
				top50 = Torrent.dao.find("SELECT id,info_hash,name,find_date FROM tb_file ORDER BY find_date DESC LIMIT 50");
				for (Torrent t : top50) {
					t.put("flag", t.get("id") + StringUtil.formatStr(t.getStr("name")));
				}
			}
		}, 300, PropKit.use("crawler.properties").getLong("dataBase.cache.flush.time"));
	}
	
	public static void stopCache() {
		task.cancel();
	}
}
