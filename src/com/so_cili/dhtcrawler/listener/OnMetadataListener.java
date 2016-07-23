package com.so_cili.dhtcrawler.listener;

import com.so_cili.dhtcrawler.structure.Torrent;

public interface OnMetadataListener {

	/**
	 * torrent 中不一定包含所有信息，
	 * 唯一能保证的是会包含 name 与 单文件或多文件信息
	 * 其它例如creation by，announce 等并不一定包含
	 * 在处理入库的时候上面问题值得注意
	 * @param torrent
	 */
	public void onMetadata(Torrent torrent);
}
