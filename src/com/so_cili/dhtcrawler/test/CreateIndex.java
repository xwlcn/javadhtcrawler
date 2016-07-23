package com.so_cili.dhtcrawler.test;

import com.so_cili.jfinal.service.TorrentService;

public class CreateIndex extends Thread {

	@Override
	public void run() {
		new TorrentService().createIndex();
	}
}
