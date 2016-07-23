package com.so_cili.dhtcrawler.structure;

import java.util.Arrays;

public class Node {

	private String ip;
	private int port;
	private byte[] nid;

	public Node(String ip, int port, byte[] nid) {
		super();
		this.ip = ip;
		this.port = port;
		this.nid = Arrays.copyOfRange(nid, 0, nid.length);
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

	public byte[] getNid() {
		return nid;
	}

	public void setNid(byte[] nid) {
		this.nid = nid;
	}

	@Override
	public boolean equals(Object obj) {
		return ((Node) obj).getIp().equals(ip);
	}

	@Override
	public int hashCode() {
		return ip.hashCode();
	}

}
