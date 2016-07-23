package com.so_cili.dhtcrawler.test;

import java.util.ArrayList;
import java.util.List;

import com.alibaba.fastjson.JSON;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Page;
import com.so_cili.dhtcrawler.structure.SubFile;
import com.so_cili.dhtcrawler.util.ZipUtil;
import com.so_cili.jfinal.entity.Torrent;

public class PutSubfiles extends Thread {

	@Override
	public void run() {
		long count = Db.queryLong("select count(name) from tb_file");
		long times = (long) Math.ceil((double) count / 10000);
		long success = 0;
		System.out.println("start...times:" + times);
		for (int i = 0; i < times; i++) {
			Page<Torrent> page = Torrent.dao.paginate(i + 1, 10000, "select *", "from tb_file");
			
			if (page.getList() != null) {
				System.out.print(page.getList().size() + "\r");
				for (Torrent torrent : page.getList()) {
					if (torrent.getSubFiles() != null && torrent.getSubFiles().size() > 0) {
						List<SubFile> list = new ArrayList<>();
						for (com.so_cili.jfinal.entity.SubFile sf : torrent.getSubFiles()) {
							list.add(new SubFile(sf.getStr("length"), sf.getStr("path")));
						}
						torrent.set("subfiles", ZipUtil.compress(JSON.toJSONString(list)));
					}
				}
				Db.batchUpdate(page.getList(), page.getList().size());
			} else {
				System.out.println("failed");
			}
			System.out.println("success:" + i);
		}
	}
}
