package com.so_cili.jfinal.service;

import java.io.IOException;
import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Record;
import com.so_cili.dhtcrawler.util.StringUtil;
import com.so_cili.jfinal.entity.Torrent;
import com.so_cili.lucene.bean.PageBean;
import com.so_cili.lucene.manager.IndexManager;

public class TorrentService {

	/**
	 * 数据库批量建立索引
	 * 一般在程序重新跑的时候调用此方法
	 */
	public void createIndex() {
		long count = Db.queryLong("select count(name) from tb_file");
		long times = (long) Math.ceil((double) count / 10000);
		for (int i = 0; i < times; i++) {
			Page<Torrent> page = Torrent.dao.paginate(i + 1, 10000, "select info_hash, name", "from tb_file");
			IndexManager.createIndex(page.getList().toArray(new Torrent[page.getList().size()]));
			System.out.println(i);
		}
		System.out.println("create index finished");
	}
	
	public PageBean<Record> search(String keyword, int curPage, Integer pageSize) {
		PageBean<Record> page = null;
		try {
			page = IndexManager.search(keyword, curPage, pageSize);
		} catch (IOException e) {
			e.printStackTrace();
		}
		return page;
	}

	/**
	 * 获取最近爬取的Torrent
	 * @param num	获取的数量
	 * @return	Torrent列表
	 */
	public List<Torrent> findRecentlyTorrent(int num) {
		return Torrent.dao.find("SELECT id,info_hash,name,find_date FROM tb_file ORDER BY find_date DESC LIMIT ?", num);
	}

	/**
	 * 获取爬取的资源总数
	 * @return	资源总数
	 */
	public long findTorrentSize() {
		return Db.queryLong("select count(size) from tb_file");
	}

	/**
	 * 根据当前的info_hash获取前一条记录
	 * @param torrent
	 * @return
	 */
	public Record findPreTorrent(Record torrent) {
		Record pre = Db.findFirst("SELECT id,info_hash, name FROM tb_file WHERE id < ? ORDER BY id DESC limit 1", 
				torrent.getLong("id"));
		if (pre !=  null)
			pre.set("flag", pre.get("id") + "-" + pre.getStr("info_hash").substring(0, 1) + StringUtil.formatStr(pre.getStr("name")));
		return pre;
	}

	/**
	 * 根据当前的info_hash获取后一条记录
	 * @param torrent
	 * @return
	 */
	public Record findNextTorrent(Record torrent) {
		Record next = Db.findFirst("SELECT id,info_hash, name FROM tb_file WHERE id > ? limit 1",
				torrent.getLong("id"));
		if (next !=  null)
			next.set("flag", next.get("id") + "-" + next.getStr("info_hash").substring(0, 1) + StringUtil.formatStr(next.getStr("name")));
		return next;
	}
	
}
