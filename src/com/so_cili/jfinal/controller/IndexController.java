package com.so_cili.jfinal.controller;

import java.io.UnsupportedEncodingException;
import java.math.BigDecimal;
import java.net.URLDecoder;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Record;
import com.so_cili.dhtcrawler.constant.DataBase;
import com.so_cili.dhtcrawler.structure.SubFile;
import com.so_cili.dhtcrawler.util.DBUtil;
import com.so_cili.dhtcrawler.util.StringUtil;
import com.so_cili.dhtcrawler.util.ZipUtil;
import com.so_cili.jfinal.service.TorrentService;
import com.so_cili.jfinal.validator.InfoValidator;
import com.so_cili.lucene.bean.PageBean;
import com.so_cili.lucene.manager.IndexManager;

public class IndexController extends Controller {

	private TorrentService service = new TorrentService();

	public void test() {
		try {
			// DBUtil.createTable("test1111");
			BigDecimal total = Db.queryBigDecimal("SELECT SUM(current_value) FROM tb_sequence");
			renderText(total + "");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void index() {
		// long total = service.findTorrentSize();
		/*
		 * List<Torrent> torrents = service.findRecentlyTorrent(50); for
		 * (Torrent t : torrents) { t.put("flag", t.get("id") +
		 * StringUtil.formatStr(t.getStr("name"))); }
		 */
		try {
			setAttr("total", DataBase.total);
			setAttr("torrents", DataBase.top50.getAll());
			render("index.jsp");
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	public void search() throws UnsupportedEncodingException {
		// TODO search
		String keyword = getAttrForStr("keyword");
		Integer page = getAttrForInt("page");
		if (page == null || page <= 0)
			page = 1;

		if (keyword != null && !"".equals(keyword)) {
			keyword = URLDecoder.decode(keyword, "UTF-8");
			PageBean<Record> results = service.search(keyword, page, null);
			setAttr("keyword", keyword);
			setAttr("results", results);
		}

		render("search.jsp");
	}

	@Before(InfoValidator.class)
	public void info() {
		try {
			Long id = getParaToLong(0);
			String prefix = getPara(1);
			if (id > 0 && prefix.length() == 1 && prefix.matches("[a-f 0-9]")) {
				Record torrent = Db.findFirst(
						"SELECT * FROM tb_file_" + prefix + "_" + (id / DBUtil.TABLE_MAX_LINE) + " where id = " + id);
				if (torrent != null) {
					torrent.set("name", new String(torrent.getBytes("name")));
					torrent.set("subfiles",
							JSON.parseArray(ZipUtil.decompress(torrent.getBytes("subfiles")), SubFile.class));

					// 获取前一条与后一条记录
					/*
					 * Record pre = service.findPreTorrent(torrent); Record next
					 * = service.findNextTorrent(torrent); setAttr("pre", pre);
					 * setAttr("next", next);
					 */

					// 获取分词列表
					List<String> words = IndexManager.getWords(torrent.getStr("name"));
					setAttr("words", words);

					// 相关资源
					PageBean<Record> related = service
							.search(torrent.getStr("name").replaceAll("[\\pP\\pZ\\pS\\pC]", ","), 1, 10);
					setAttr("related", related);

					torrent.set("sSize", StringUtil.formatSize((double) torrent.getLong("size")));
					setAttr("torrent", torrent);
				}
			}
		} catch (Exception e) {
			renderError(404);
			return;
		}
		render("info.jsp");
	}

	/*
	 * public void testIndex() { //Torrent.dao.paginate(1, 100,
	 * "select info_hash,name", "from tb_file"); List<Torrent> list =
	 * Torrent.dao.paginate(1, 2000, "select info_hash,name", "from tb_file"
	 * ).getList(); System.out.println(list.size());
	 * IndexManager.createIndex(list.toArray(new Torrent[]{}));
	 * renderHtml("success"); }
	 * 
	 * public void indexAll() { service.createIndex(); System.out.println(
	 * "indexAll success"); renderHtml("success"); }
	 * 
	 * public void test() { long rtn = -1; try { rtn = Db.queryLong(
	 * "select count(name) from tb_file where info_hash=?",
	 * "00013cc51f99e953e6387d89a8e42fb6d26b4743"); } catch(Exception e) {
	 * e.printStackTrace(); } renderHtml("count:" + rtn); }
	 */
}
