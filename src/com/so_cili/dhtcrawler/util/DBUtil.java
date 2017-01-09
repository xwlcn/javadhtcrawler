package com.so_cili.dhtcrawler.util;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.HashSet;
import java.util.Iterator;
import java.util.Map;
import java.util.Map.Entry;
import java.util.Set;
import java.util.concurrent.ConcurrentHashMap;

import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.ICallback;
import com.jfinal.plugin.activerecord.Record;

/**
 * DB工具类，主要用来处理数据库分表问题
 * @author xwl
 * @version 
 * Created on 2017年1月5日 下午5:52:47
 */
public class DBUtil {
	
	private static Map<String, Integer> sequences = new ConcurrentHashMap<>();
	private final static String TABLE_PREFIX = "tb_file_";
	public final static int TABLE_MAX_LINE = PropKit.use("config.properties").getInt("table.max.line");
	private final static char[] DIGIST = {
			'0', '1', '2', '3', 
			'4', '5', '6', '7', 
			'8', '9', 'a', 'b',
			'c', 'd', 'e', 'f'};
	
	/**
	 * 根据序列号当前值初始化分表最大表号
	 */
	public static void initSequence() {
		for (int i = 0; i < 16; i++) {
			String seqName = TABLE_PREFIX + DIGIST[i];
			long value = Db.queryLong("SELECT current_value FROM tb_sequence WHERE seq_name = '" + seqName + "'");
			if (((int)(value / TABLE_MAX_LINE)) == 0) {
				createTable(TABLE_PREFIX + DIGIST[i] + "_0");
			}
			sequences.put(TABLE_PREFIX + DIGIST[i], (int)(value / TABLE_MAX_LINE));
		}
	}

	/**
	 * 根据infoHash判断在数据库中是否存在
	 * @param infoHash
	 * @return
	 */
	public static boolean checkExist(String infoHash) {
		String firstCharacter = infoHash.substring(0, 1);
		String seq = TABLE_PREFIX + firstCharacter;
		Integer tabNum = sequences.get(seq);
		//首先查询是否存在infoHash首字母开头的表
		if (tabNum == null)
			return false;
		//若表存在，则查询这些表中是否存在该infoHash
		String sql = "SELECT ";
		
		for (int i = 0; i <= tabNum; i++) {
			sql += "IF((SELECT COUNT(0) FROM " + seq + "_" + i + " WHERE info_hash = '" + infoHash + "') > 0, TRUE, FALSE) OR ";
		}

		sql += "1 = 0";
		return Db.queryLong(sql) == 1;
	}
	
	/**
	 * 保存Torrent入库
	 * @param record
	 * @return
	 */
	public static boolean saveTorrent(Record record) {
		String firstCharacter = record.getStr("info_hash").substring(0, 1);
		String seqName = TABLE_PREFIX + firstCharacter;
		if (checkExist(record.getStr("info_hash")))
			return false;
		long id = nextVal(seqName);
		if (id < 0)
			return false;
		record.set("id", id);
		//得到分表序号
		int tbNum = (int)(id / TABLE_MAX_LINE);
		//得到表名
		String tabName = seqName + "_" + tbNum;
		//查询是否存在该表,不存在就创建
		if (sequences.get(seqName) < tbNum) {
			createTable(tabName);
			sequences.put(seqName, tbNum);
		}
		return Db.save(tabName, record);
	}
	
	/**
	 * 获取序列值
	 * @param seqName	序列名
	 * @return
	 */
	private static Long nextVal(String seqName) {
		return (Long) Db.execute(new ICallback() {
			
			@Override
			public Object call(Connection conn) throws SQLException {
				ResultSet rs = conn.createStatement().executeQuery("SELECT nextVal('" + seqName + "') as current");
				if (rs.next())
					return rs.getLong(1);
				else
					return -1;
			}
		});
	}
	
	/**
	 * 建表
	 * @param tableName
	 */
	public static void createTable(String tableName) {
		Db.execute(new ICallback() {
			@Override
			public Object call(Connection conn) throws SQLException {
				CallableStatement stmt = conn.prepareCall("call createTabProc(?)");
				stmt.setString(1, tableName);
				stmt.execute();
				return null;
			}
		});
	}
}
