package com.so_cili.dhtcrawler.test;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.util.Arrays;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedList;
import java.util.Map;
import java.util.Set;

import org.ardverk.coding.BencodingOutputStream;

import com.so_cili.dhtcrawler.handler.AnnouncePeerInfoHashWireHandler;
import com.so_cili.dhtcrawler.handler.IInfoHashHandler;
import com.so_cili.dhtcrawler.structure.DownloadPeer;
import com.so_cili.dhtcrawler.structure.Queue;
import com.so_cili.dhtcrawler.util.ByteUtil;
import com.so_cili.dhtcrawler.util.NodeIdUtil;

public class Test2 {
	
	@SuppressWarnings("unused")
	private static final String BT_PROTOCOL = "BitTorrent protocol";

	/*
announce_peer request, address:115.60.19.58:11101, info_hash:17a94ba8bf13fec14f15975e4e562221254ec6b6
announce_peer request, address:36.228.12.89:1652, info_hash:1aa6939e9da1949a54cb03831e0a7a49d08ccca3
announce_peer request, address:118.166.211.234:9390, info_hash:9dc51c5ddac86e966a86d10c91c029c0201c550b
announce_peer request, address:116.237.81.63:9101, info_hash:9da4386687e6eb013cec0aa388493a3cbe3fc2fd
announce_peer request, address:60.3.117.141:11101, info_hash:972f75e68718cd541ff5cb9a102457bf8ff8fee9
announce_peer request, address:182.112.232.66:11101, info_hash:98b2cd494a5de9d16dd980a33b40ffbaf6b6ccb1
announce_peer request, address:171.222.81.227:6881, info_hash:7ea9743d29d320cfdeb727dfd9e5b0ebae7ca15f
announce_peer request, address:171.222.81.227:6881, info_hash:7ea9743d29d320cfdeb727dfd9e5b0ebae7ca15f
announce_peer request, address:1.197.45.28:11101, info_hash:17a94ba8bf13fec14f15975e4e562221254ec6b6
announce_peer request, address:61.227.70.102:7934, info_hash:d2d9c10e52b1dcea20b5f23ee405d051f5580fff
announce_peer request, address:115.213.76.236:11101, info_hash:17a94ba8bf13fec14f15975e4e562221254ec6b6
announce_peer request, address:183.206.106.23:11101, info_hash:17a94ba8bf13fec14f15975e4e562221254ec6b6
announce_peer request, address:61.146.122.166:11101, info_hash:982e9d903d4b87e55c9f7d47acc7d3118d07de74
announce_peer request, address:113.57.212.111:36644, info_hash:3849395dad8314f1223dde50dec141157e4bc392
announce_peer request, address:222.65.105.122:11101, info_hash:17a94ba8bf13fec14f15975e4e562221254ec6b6
announce_peer request, address:116.55.252.67:65001, info_hash:dda50ab2af5655786bf1b71f55e2a9af34f87369
announce_peer request, address:101.30.6.122:11101, info_hash:17a94ba8bf13fec14f15975e4e562221254ec6b6
announce_peer request, address:36.248.157.143:11101, info_hash:17a94ba8bf13fec14f15975e4e562221254ec6b6
announce_peer request, address:175.166.28.65:11101, info_hash:98b2cd494a5de9d16dd980a33b40ffbaf6b6ccb1
announce_peer request, address:182.88.254.91:11101, info_hash:17a94ba8bf13fec14f15975e4e562221254ec6b6
announce_peer request, address:106.117.67.208:11101, info_hash:17a94ba8bf13fec14f15975e4e562221254ec6b6
announce_peer request, address:123.11.252.100:11101, info_hash:12a3698722dc913f969780d19d74d30fef3d5ccf
154.45.216.167:1188 - 389a3bccac7851975f86dc6a375564a909f7694f
info_hash[AnnouncePeer] : /176.195.91.45:6881 - 32232925ff6d1fc92ca1550fab9a632bfdf2b066
info_hash[AnnouncePeer] : /78.83.101.201:39147 - c99d52174a54a379d99f28a4d237413ae448831e
info_hash[AnnouncePeer] : /201.80.179.43:45965 - 58c335a14668de637bf9a14ca14d7fa1b6fd9021
info_hash[AnnouncePeer] : /24.87.54.19:7282 - e6d19e5f01053671dc04eb3c0f4accbdf327d235
info_hash[AnnouncePeer] : /78.130.174.10:49541 - c99d52174a54a379d99f28a4d237413ae448831e
info_hash[AnnouncePeer] : /213.81.131.38:5395 - c99d52174a54a379d99f28a4d237413ae448831e
info_hash[AnnouncePeer] : /178.84.148.66:8999 - 65bdcb1498ba5fe6226f7d8a6a3cd0aa5061fa91
info_hash[AnnouncePeer] : /93.171.160.75:6881 - 32232925ff6d1fc92ca1550fab9a632bfdf2b066
info_hash[AnnouncePeer] : /95.84.136.184:1030 - 397a0ce1ce81b8c745cd312033d8928720af3960
info_hash[AnnouncePeer] : /81.91.40.240:60161 - 84e7146eaa21eb86d1a33b6974860c63328fc2bd
info_hash[AnnouncePeer] : /176.104.166.246:49001 - 304cbf8b7b2e4c916d63bc097db782a40039f4cc
info_hash[AnnouncePeer] : /85.252.150.39:59028 - c99d52174a54a379d99f28a4d237413ae448831e
info_hash[AnnouncePeer] : /210.49.214.45:6881 - 223388706f7f1b51231ad4c418cbcf9a149d3ecb
info_hash[AnnouncePeer] : /210.49.214.45:6881 - 223388706f7f1b51231ad4c418cbcf9a149d3ecb
info_hash[AnnouncePeer] : /84.202.117.180:1076 - c99d52174a54a379d99f28a4d237413ae448831e
announce_peer request, address:117.135.223.15:6881, info_hash:35a40eab07cca86f5224a1aabef8bf067455ad9d
message received:61.54.24.49:65001:fdc72aeef0eb3943dca3a59360bafc9b0a60389a


*/
	//magnet:?xt=urn:btih:089b833700132841adc375940bd94dd6a4375d0b
	public static void main(String[] args) throws IOException, InterruptedException {
		/*IInfoHashHandler handler = new AnnouncePeerInfoHashWireHandler();
		handler.handler(new InetSocketAddress("61.54.24.49", 65001), 
				ByteUtil.hexStringToBytes("fdc72aeef0eb3943dca3a59360bafc9b0a60389a"));
*/
		/*for (int i = 0; i < 1000; i++) {
			System.out.println(ByteUtil.byteArrayToHex(NodeIdUtil.buildNodeId()));
			Thread.sleep(20);
		}*/
		/*Map<String, Object> map = new HashMap<>();
		Map<String, Object> m = new HashMap<>();
		m.put("ut_metadata", 1);
		map.put("m", m);
		
		System.out.println(new String(encode(map)));*/
		/*Queue<DownloadPeer> dps = new Queue<>();
		dps.insert(new DownloadPeer("12313", 123, new String("111111111111").getBytes()));
		dps.insert(new DownloadPeer("1", 12311, new String("111111111111").getBytes()));
		System.out.println(dps.size());
		System.out.println(Arrays.equals(new String("111111111111").getBytes(), new String("111111111111").getBytes()));
		Set<String> list = new HashSet<>();
		list.add(new String("111111111111"));
		list.add(new String("111111111111"));
		System.out.println(list.size());*/
		Queue<String> queue = new Queue<>();
		queue.remove();
		/*Socket socket = new Socket("154.45.216.167", 1188);
		System.out.println(socket.isConnected());*/
		/*String dir = System.getProperty("user.dir");
		LookupService ls = new LookupService(dir + "/GeoIP.dat",LookupService.GEOIP_MEMORY_CACHE);
		System.out.println(ls.getCountry("199.188.179.241").getCode());*/
	}
	
	private static byte[] encode(Map<String, Object> map) throws IOException {
		ByteArrayOutputStream stream = new ByteArrayOutputStream();
		BencodingOutputStream bencode = new BencodingOutputStream(stream);
		bencode.writeMap(map);
		byte[] data = stream.toByteArray();
		bencode.close();
		stream.close();
		return data;
	}
}
//announce_peer request, address:95.67.172.190:54946, info_hash:d39360e767949c6402e4a96fad89cceb08707d67












