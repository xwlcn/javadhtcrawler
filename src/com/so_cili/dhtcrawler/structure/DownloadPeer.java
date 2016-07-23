package com.so_cili.dhtcrawler.structure;

import java.util.Arrays;

public class DownloadPeer {

	private String ip;
	private int port;
	private byte[] info_hash;
	
	public DownloadPeer(String ip, int port, byte[] info_hash) {
		super();
		this.ip = ip;
		this.port = port;
		this.info_hash = info_hash;
	}

	public String getIp() {
		return ip;
	}

	public void setIp(String ip) {
		this.ip = ip;
	}

	public int getPort() {
		return port;
	}

	public void setPort(int port) {
		this.port = port;
	}

	public byte[] getInfo_hash() {
		return info_hash;
	}

	public void setInfo_hash(byte[] info_hash) {
		this.info_hash = info_hash;
	}

	@Override
	public boolean equals(Object obj) {
		return Arrays.equals(info_hash, ((DownloadPeer) obj).getInfo_hash());
	}

	@Override
	public int hashCode() {
		return new String(info_hash).hashCode();
	}
	
	

}
