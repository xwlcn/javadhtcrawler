package com.so_cili.dhtcrawler.handler;

import java.io.BufferedOutputStream;
import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.PipedInputStream;
import java.io.PipedOutputStream;
import java.io.UnsupportedEncodingException;
import java.math.BigInteger;
import java.net.InetSocketAddress;
import java.net.Socket;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Date;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.log4j.Logger;
import org.apache.tomcat.util.codec.binary.StringUtils;
import org.ardverk.coding.BencodingInputStream;
import org.ardverk.coding.BencodingOutputStream;

import com.so_cili.dhtcrawler.listener.OnMetadataListener;
import com.so_cili.dhtcrawler.server.DHTServer;
import com.so_cili.dhtcrawler.structure.Info;
import com.so_cili.dhtcrawler.structure.SubFile;
import com.so_cili.dhtcrawler.structure.Torrent;
import com.so_cili.dhtcrawler.util.ByteUtil;
import com.so_cili.dhtcrawler.util.ExtensionUtil;
import com.so_cili.dhtcrawler.util.StringUtil;

/**
 * peer wire 协议来下载 metadata 获取种子文件信息
 * @author xwl
 * @version 
 * Created on 2016年4月6日 上午11:28:03
 */
public class AnnouncePeerInfoHashWireHandler implements IInfoHashHandler {
	
	private Logger logger = Logger.getLogger(AnnouncePeerInfoHashWireHandler.class);
	
	private final String BT_PROTOCOL = "BitTorrent protocol";
	private final byte[] BT_RESERVED = new byte[] {
			(byte) (0x00 & 0xff), (byte) (0x00 & 0xff), (byte) (0x00 & 0xff), (byte) (0x00 & 0xff), 
			(byte) (0x00 & 0xff), (byte) (0x10 & 0xff), (byte) (0x00 & 0xff), (byte) (0x01 & 0xff), 
	};
	private final byte BT_MSG_ID = 20 & 0xff;
	private final int EXT_HANDSHAKE_ID = 0;
	private final int CONNECT_TIMEOUT = 1000;
	private final int READ_WRITE_TIMEOUT = 3000;
	private final int MAX_METADATA_SIZE = 1000000;
	
	private final byte[] EXT_HANDSHAKE_DATA = new byte["d1:md11:ut_metadatai1eee".length()];
	
	{
		System.arraycopy("d1:md11:ut_metadatai1eee".getBytes(), 0, EXT_HANDSHAKE_DATA, 0, "d1:md11:ut_metadatai1eee".length());
	}
	
	private InetSocketAddress address;
	private byte[] info_hash;
	private byte[] peer_id = DHTServer.createRandomNodeId();
	private byte[] metadata;
	private int ut_metadata;
	private int metadata_size;
	
	private boolean[] finished;
	
	private Socket socket;
	private InputStream in;
	private OutputStream out;
	
	private PipedOutputStream writeStream;
	private PipedInputStream readStream;
	private OutputStream os;
	
	private boolean stop = false;
	
	private int nextSize = 0;
	private NextFunction nextFunction;
	
	private OnMetadataListener onMetadataListener;
	
	private Torrent torrent = null;
	
	private byte[] readBuff = new byte[1024];

	public void handler(InetSocketAddress address, byte[] info_hash) throws Exception {

			stop = false;
			nextSize = 0;
			
			writeStream = new PipedOutputStream();
			readStream = new PipedInputStream(22 * 1024);
			readStream.connect(writeStream);
			os = new BufferedOutputStream(writeStream);
			
			this.address = address;
			this.info_hash = info_hash;
			
			parseHandShake();
			
			socket = new Socket();
			socket.setReuseAddress(true);
			socket.connect(this.address, CONNECT_TIMEOUT);
			socket.setSoTimeout(READ_WRITE_TIMEOUT);
			in = socket.getInputStream();
			out = socket.getOutputStream();
			sendHandShake();
			loop();

	}
	
	private void loop() throws IOException {
		int len = -1;
		while (!stop && !socket.isClosed() && (len = in.read(readBuff)) != -1) {
			os.write(readBuff, 0, len);
			os.flush();
			checkMessage();
		}
		if (!stop)
			release();
	}
	
	private void checkMessage() throws IOException {
		while (readStream.available() >= nextSize) {
			byte[] buff = new byte[nextSize];
			readStream.read(buff, 0, nextSize);
			nextFunction.onFunction(buff);
		}
	}
	
	/**
	 * 第一次握手
	 * @throws IOException 
	 */
	private void sendHandShake() throws IOException {
		
		/*proctocol*/
		out.write(BT_PROTOCOL.length() & 0xff);
		out.write(BT_PROTOCOL.getBytes());
		
		/*reserved bytes*/
		out.write(BT_RESERVED);
		
		/*info_hash*/
		out.write(info_hash);
		
		/*peer_id*/
		out.write(peer_id);

		out.flush();

	}
	
	/**
	 * 第二次握手
	 * @throws IOException 
	 */
	private void sendExtHandShake() throws IOException {

		sendMessage(EXT_HANDSHAKE_ID, EXT_HANDSHAKE_DATA);

	}
	
	/**
	 * 请求所有的piece数据
	 * @throws IOException 
	 */
	private void requestPieces() throws IOException {

		metadata = new byte[this.metadata_size];

		int num_piece = (int) Math.ceil(this.metadata_size / (16.0 * 1024));
		finished = new boolean[num_piece];
		for (int piece = 0; piece < num_piece; piece++) {
			requestPiece(piece);
		}
	}
	
	private void requestPiece(int piece) throws IOException {

		Map<String, Object> map = new HashMap<>();
		map.put("msg_type", 0);
		map.put("piece", piece);
		
		byte[] data = encode(map);
		
		sendMessage(this.ut_metadata, data);

	}
	
	private byte[] encode(Map<String, Object> map) throws IOException {
		ByteArrayOutputStream stream = new ByteArrayOutputStream();
		BencodingOutputStream bencode = new BencodingOutputStream(stream);
		bencode.writeMap(map);
		byte[] data = stream.toByteArray();
		bencode.close();
		stream.close();
		return data;
	}
	
	@SuppressWarnings("unchecked")
	private Map<String, Object> decode(byte[] buf) {
		Map<String, Object> map = null;
		try (ByteArrayInputStream stream = new ByteArrayInputStream(buf);
		BencodingInputStream bencode = new BencodingInputStream(stream);) {
			map = (Map<String, Object>) bencode.readMap();
		} catch (Exception e) {
			release();
		}
		return map;
	}
	
	/**
	 * 发送消息
	 * @param id	消息ID
	 * @param data	消息bencode编码的数据
	 * @throws IOException 
	 */
	private void sendMessage(int id, byte[] data) throws IOException {
		
		//length prefix bytes
		byte[] length_prefix = ByteUtil.intToByteArray(data.length + 2);
        for(int i=0; i<4; i++)
        	length_prefix[i] = (byte)(length_prefix[i] & 0xff);
        out.write(length_prefix);
        
        //bittorrent message ID, = 20
        out.write(BT_MSG_ID);
        
        //extended message ID. 0 = handshake, >0 = extended message as specified by the handshake.
        out.write((byte)(id & 0xff));
        
        //data
        out.write(data);
		out.flush();
	}
	
	private void onExtendMessage(byte b, byte[] buf) throws IOException {

		if (b == 0) {
			onExtendHandShake(decode(buf));
		} else {
			onPiece(buf);
		}

	}
	
	private NextFunction onMessageLength = new NextFunction() {
		@Override
		public void onFunction(byte[] buff) {
			int length = ByteUtil.byteArrayToInt(buff);
			if (length > 0) {
				parseNext(length, onMessage);
			} else {
				parseNext(4, onMessageLength);
			}
		}
	};
	
	private NextFunction onMessage = new NextFunction() {
		@Override
		public void onFunction(byte[] buff) throws IOException {
			parseNext(4, onMessageLength);
			if (buff[0] == BT_MSG_ID) {
				onExtendMessage(buff[1], Arrays.copyOfRange(buff, 2, buff.length));
			}
		}
	};
	
	private void parseHandShake() {
		//发送握手消息后接收第一个字符是协议名称字符串的长度
		parseNext(1, new NextFunction() {
			@Override
			public void onFunction(byte[] buff) {
				final int protocolLen = (int) buff[0];
				//接下来是协议名称(长度：protocolLen)和BT_RESERVED(长度：8)、info_hash(长度：20)、peer_id(长度：20)
				parseNext(protocolLen + 48, new NextFunction() {
					@Override
					public void onFunction(byte[] buff) throws IOException {
						byte[] protocol = Arrays.copyOfRange(buff, 0, protocolLen);
						if (!BT_PROTOCOL.equals(new String(protocol))) {
							logger.error("handshake failed.");
							release();
							return;
						}
						byte[] handshake = Arrays.copyOfRange(buff, protocolLen, buff.length);
						if (handshake[5] == 0x10) {
							parseNext(4, onMessageLength);
							sendExtHandShake();
						} else {
							logger.error("remote peer don't support download metadata.");
							release();
						}
					}
				});
			}
		});
	}
	
	@SuppressWarnings("unchecked")
	private void onExtendHandShake(Map<String, Object> map) throws IOException {
		
		Map<String, Object> m = (Map<String, Object>) map.get("m");
		
		if (m == null || !m.containsKey("ut_metadata") || !map.containsKey("metadata_size")) {
			logger.error("onExtendHandShake failed");
			release();
			return;
		}
		this.ut_metadata = ((BigInteger) m.get("ut_metadata")).intValue();
		this.metadata_size = ((BigInteger) map.get("metadata_size")).intValue();
		if (this.metadata_size > MAX_METADATA_SIZE) {
			release();
			return;
		}
		
		requestPieces();
	}
	
	private void onPiece(byte[] buff) throws IOException {
		String str = new String(buff, "ISO-8859-1");
		int pos = str.indexOf("ee") + 2;
		Map<String, Object> map = decode(str.substring(0, pos).getBytes("ISO-8859-1"));
		byte[] piece_metadata = Arrays.copyOfRange(buff, pos, buff.length);
		
		if (!map.containsKey("msg_type") || !map.containsKey("piece")) {
			logger.error("onPiece packet error.");
			release();
			return;
		}

		if (((BigInteger) map.get("msg_type")).intValue() != 1) {
			logger.error("onPiece error, msg_type:" + map.get("msg_type"));
			release();
			return;
		}

		int piece = ((BigInteger) map.get("piece")).intValue();
		System.arraycopy(piece_metadata, 0, this.metadata, piece * 16 * 1024, piece_metadata.length);
		finished[piece] = true;
		allFinished();

	}
	
	private void allFinished() throws UnsupportedEncodingException {
		boolean b = true;
		for (int i = 0; i < finished.length; i++) {
			if (!finished[i]) {
				b = false;
				break;
			}
		}
		if (b) {
			onFinished();
		}
	}

	private void onFinished() throws UnsupportedEncodingException {

		Map<String, Object> map = decode(Arrays.copyOfRange(metadata, 0, metadata_size));
		//System.out.println("success count:" + ++Main.count);
		if (map != null && onMetadataListener != null) {
			torrent = parseTorrent(map);
		}
		//System.out.println("info_hash:" + NodeIdUtil.SHA1(metadata));
		//writeToFile();
		//System.out.println(JSON.toJSON(info));

		release();
	}
	
	private String decode_utf8(String encoding, Map<String, Object> map, String key) throws UnsupportedEncodingException {
		if (map.containsKey(key + ".utf-8")) {
			return new String((byte[]) map.get(key + ".utf-8"), "UTF-8");
		}
		return StringUtils.newStringUtf8((byte[]) map.get(key));
	}
	
	private String decode_utf8_2(String encoding, Map<String, Object> map, String key) throws UnsupportedEncodingException {
		if (map.containsKey(key + ".utf-8")) {
			return new String(((List<byte[]>) map.get(key + ".utf-8")).get(0), "UTF-8");
		}
		return StringUtils.newStringUtf8(((List<byte[]>) map.get(key )).get(0));
	}
	
	@SuppressWarnings("unchecked")
	private Torrent parseTorrent(Map<String, Object> map) throws UnsupportedEncodingException {
		String encoding = "UTF-8";
		Torrent torrent = new Torrent();
		Map<String, Object> info;
		if (map.containsKey("info")) {
			info = (Map<String, Object>) map.get("info");
		} else {
			info = map;
		}
		
		if (!info.containsKey("name")) {
			return null;
		}
		
		if (map.containsKey("encoding")) {
			encoding = (String) map.get("encoding");
		}
		
		/*if (map.containsKey("creation date")) {
			torrent.setCreationDate(new Date(((BigInteger) map.get("creation date")).longValue()));
		}
		else {
			torrent.setCreationDate(new Date());
		}
		
		if (map.containsKey("announce")) {
			torrent.setAnnounce(decode_utf8(encoding, map, "announce"));
		}
		
		if (map.containsKey("comment")) {
			torrent.setComment(decode_utf8(encoding, map, "comment").toString().substring(0, 300));
		}
		
		if (map.containsKey("created by")) {
			torrent.setCreatedBy(decode_utf8(encoding, map, "created by"));
		}*/
		Info torrentInfo = new Info();
		String name = decode_utf8(encoding, map, "name");
		torrentInfo.setName(name.length() > 300 ? name.substring(0, 300) : name);
		
		Set<String> types = new HashSet<>();
		//多文件
		if (info.containsKey("files")) {
			List<Map<String, Object>> list = (List<Map<String, Object>>) info.get("files");
			List<SubFile> subFiles = new ArrayList<>();
			Long countLength = new Long(0);
			for (Map<String, Object> f : list) {
				Long length = ((BigInteger) f.get("length")).longValue();
				countLength += length;
				
				String path = decode_utf8_2(encoding, f, "path");
				if (path != null) {
					path = path.length() > 300 ? path.substring(0, 300) : path;
				}
				SubFile subFile = new SubFile(StringUtil.formatSize((double) length), path);
				
				String type = ExtensionUtil.getExtensionType(subFile.getPath());
				if (type != null) {
					types.add(type);
				}
				
				if (subFile.getPath().indexOf("如果您看到此文件，请升级到BitComet(比特彗星)") == -1)
					subFiles.add(subFile);
			}
			torrentInfo.setFiles(subFiles);
			torrentInfo.setLength(countLength);

			String temp = org.apache.commons.lang.StringUtils.join(types.toArray(new String[]{}), ",");
			if (temp != null && !"".equals(temp)) {
				torrent.setType(temp);
			} else {
				torrent.setType("其他");
			}
		} else {
			torrentInfo.setLength(((BigInteger) info.get("length")).longValue());
			
			String type = ExtensionUtil.getExtensionType(name);
			torrent.setType(type == null ? "未知" :type);
		}
		torrent.setInfo(torrentInfo);
		return torrent;
	}
	
	@SuppressWarnings("unused")
	private void writeToFile() throws IOException {
		String path="C:/Users/Administrator/Desktop/test.torrent";
        File file=new File(path);
        if(!file.exists())
            file.createNewFile();
        FileOutputStream out=new FileOutputStream(file,false); //如果追加方式用true        

        out.write(metadata);//注意需要转换对应的字符集
        out.close();

	}

	public void release() {
		//System.out.println("exit");
		stop = true;
		metadata = null;
		try {
			if (writeStream != null)
				writeStream.close();
			if (os != null) {
				os.close();
			}
			if (readStream != null) {
				readStream.close();
			}
			if (in != null)
				in.close();
			if (out != null)
				out.close();
			if (socket != null)
				socket.close();
		} catch (IOException e) {
			//e.printStackTrace();
		}
		if (torrent != null) {
			torrent.setInfo_hash(ByteUtil.byteArrayToHex(info_hash));
		}
		if (torrent != null && onMetadataListener != null) {
			onMetadataListener.onMetadata(torrent);
			torrent = null;
		}
	}
	
	private void parseNext(int nextSize, NextFunction nextFunction) {
		this.nextSize = nextSize;
		this.nextFunction = nextFunction;
	}
	
	private interface NextFunction {
		public void onFunction(byte[] buff)  throws IOException;
	}

	public void setOnMetadataListener(OnMetadataListener onMetadataListener) {
		this.onMetadataListener = onMetadataListener;
	}
}
