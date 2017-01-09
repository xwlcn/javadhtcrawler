package com.so_cili.dhtcrawler.constant;

import java.math.BigDecimal;

import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.Db;
import com.so_cili.dhtcrawler.structure.RingBuffer;

public class DataBase extends Thread {
	
	//缓存总记录数
	public static BigDecimal total;
	
	//缓存最近50条记录
	public static RingBuffer top50 = new RingBuffer(50);	

	private static boolean stop = false;
	
	private static boolean first = true;
	
	public static void startCache() {
		
		new DataBase().start();
	}
	
	@Override
	public void run() {
		
		long interval = PropKit.use("crawler.properties").getLong("dataBase.cache.flush.time");
		
		while (!stop) {
			try {
				total = Db.queryBigDecimal("SELECT SUM(current_value) FROM tb_sequence");
				Thread.sleep(interval);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
	}
	
	public static void stopCache() {
		stop = true;
	}
}
