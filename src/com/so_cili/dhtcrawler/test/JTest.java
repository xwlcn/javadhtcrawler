package com.so_cili.dhtcrawler.test;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.nio.channels.SocketChannel;

import org.junit.Test;

import sun.nio.ch.SocketAdaptor;

public class JTest {

	@Test
	public void testMemory() throws InterruptedException, IOException {
		Socket s = SocketChannel.open().socket();
		s.connect(new InetSocketAddress("baidu.com", 80));
		BufferedReader br = new BufferedReader(new InputStreamReader(s.getInputStream()));
		String str = null;
		while ((str = br.readLine()) != null) {
			System.out.println(str);
		}
	}
	
	@Test
	public void testXF() throws IOException {
	}
}
