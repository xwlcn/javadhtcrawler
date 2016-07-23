package com.so_cili.dhtcrawler.listener;

import java.net.InetSocketAddress;

/**
 * announce_peer 请求监听器
 * 
 * @author xwl
 * @version 
 * Created on 2016年3月29日 下午6:00:39
 */
public interface OnAnnouncePeerListener {
	
	/**
	 * announce_peer 	请求回调处理方法
	 * 
	 * @param address	节点地址		
	 * @param info_hash	torrent的infohash
	 * @param port		peer下载的端口号
	 */
	void onAnnouncePeer(InetSocketAddress address, byte[] info_hash, int port);
}
