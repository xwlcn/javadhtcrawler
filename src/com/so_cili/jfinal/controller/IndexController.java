package com.so_cili.jfinal.controller;

import java.io.UnsupportedEncodingException;
import java.net.URLDecoder;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Db;
import com.so_cili.dhtcrawler.constant.DataBase;
import com.so_cili.dhtcrawler.structure.SubFile;
import com.so_cili.dhtcrawler.util.StringUtil;
import com.so_cili.dhtcrawler.util.ZipUtil;
import com.so_cili.jfinal.entity.AVer;
import com.so_cili.jfinal.entity.FanHao;
import com.so_cili.jfinal.entity.Torrent;
import com.so_cili.jfinal.service.TorrentService;
import com.so_cili.jfinal.validator.InfoValidator;
import com.so_cili.lucene.bean.PageBean;
import com.so_cili.lucene.manager.IndexManager;

public class IndexController extends Controller {
	
	private TorrentService service = new TorrentService();
	
	public void index() {
		//long total = service.findTorrentSize();
		/*List<Torrent> torrents = service.findRecentlyTorrent(50);
		for (Torrent t : torrents) {
			t.put("flag", t.get("id") + StringUtil.formatStr(t.getStr("name")));
		}*/
		setAttr("total", DataBase.total);
		setAttr("torrents", DataBase.top50);
		render("index.jsp");
	}
	
	public void search() throws UnsupportedEncodingException {
		//TODO search
		String keyword = getAttrForStr("keyword");
		Integer page = getAttrForInt("page");
		if (page == null || page <= 0) 
			page = 1;
		
		if (keyword != null && !"".equals(keyword)) {
			keyword = URLDecoder.decode(keyword, "UTF-8");
			PageBean<Torrent> results = service.search(keyword, page, null);
			setAttr("keyword", keyword);
			setAttr("results", results);
		}
		
		render("search.jsp");
	}
	
	@Before(InfoValidator.class)
	public void info() {
		try{
		Long id = getParaToLong(0);
		if (id > 0) {
			Torrent torrent = Torrent.dao.findById(id);
			if (torrent != null) {
				torrent.put("subfiles", JSON.parseArray(ZipUtil.decompress(torrent.getBytes("subfiles")), SubFile.class));
				AVer aver = torrent.getAVer();
				if (aver != null) {
					aver.put("fanhao_list", JSON.parseArray(aver.getStr("list"), FanHao.class));
					setAttr("aver", aver);
				}
				
				//获取前一条与后一条记录
				Torrent pre = service.findPreTorrent(torrent);
				Torrent next = service.findNextTorrent(torrent);
				setAttr("pre", pre);
				setAttr("next", next);
				
				//获取分词列表
				List<String> words = IndexManager.getWords(torrent.getStr("name"));
				setAttr("words", words);
				
				//相关资源
				PageBean<Torrent> related = service.search(torrent.getStr("name").replaceAll("[\\pP\\pZ\\pS\\pC]", ","), 1, 10);
				setAttr("related", related);
				
				torrent.put("sSize", StringUtil.formatSize((double) torrent.getLong("size")));
				setAttr("torrent", torrent);
			}
		}}catch(Exception e) {e.printStackTrace();}
		render("info.jsp");
	}
	
	public void testIndex() {
		//Torrent.dao.paginate(1, 100, "select info_hash,name", "from tb_file");
		List<Torrent> list = Torrent.dao.paginate(1, 100, "select info_hash,name", "from tb_file").getList();
		System.out.println(list.size());
		IndexManager.createIndex(list.toArray(new Torrent[]{}));
	}

	public void indexAll() {
		service.createIndex();
		renderHtml("success");
	}
	
	public void test() {
		long rtn = -1;
		try {
		rtn = Db.queryLong("select count(name) from tb_file where info_hash=?", "00013cc51f99e953e6387d89a8e42fb6d26b4743");
		} catch(Exception e) {
			e.printStackTrace();
		}
		renderHtml("count:" + rtn);
	}
}
