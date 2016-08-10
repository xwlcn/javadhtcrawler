package com.so_cili.dhtcrawler.server;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.EOFException;
import java.io.IOException;
import java.math.BigInteger;
import java.net.InetAddress;
import java.net.InetSocketAddress;
import java.net.UnknownHostException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;
import java.util.Random;
import java.util.Timer;
import java.util.TimerTask;
import java.util.concurrent.Executors;

import org.apache.log4j.Logger;
import org.ardverk.coding.BencodingInputStream;
import org.ardverk.coding.BencodingOutputStream;
import org.jboss.netty.bootstrap.ConnectionlessBootstrap;
import org.jboss.netty.buffer.ChannelBuffer;
import org.jboss.netty.buffer.ChannelBuffers;
import org.jboss.netty.channel.Channel;
import org.jboss.netty.channel.ChannelHandlerContext;
import org.jboss.netty.channel.ChannelPipeline;
import org.jboss.netty.channel.ChannelPipelineFactory;
import org.jboss.netty.channel.Channels;
import org.jboss.netty.channel.ExceptionEvent;
import org.jboss.netty.channel.MessageEvent;
import org.jboss.netty.channel.SimpleChannelHandler;
import org.jboss.netty.channel.socket.DatagramChannelFactory;
import org.jboss.netty.channel.socket.nio.NioDatagramChannelFactory;

import com.maxmind.geoip.LookupService;
import com.so_cili.dhtcrawler.listener.OnAnnouncePeerListener;
import com.so_cili.dhtcrawler.listener.OnGetPeersListener;
import com.so_cili.dhtcrawler.structure.Node;
import com.so_cili.dhtcrawler.structure.Queue;
import com.so_cili.dhtcrawler.util.ByteUtil;
import com.so_cili.dhtcrawler.util.NodeIdUtil;

public class DHTServer extends Thread {
	
	/**
	 * 记录日志
	 */
	private Logger logger = Logger.getLogger(DHTServer.class);

	/**
	 * 最大节点数
	 */
	public int maxGoodNodeCount;
	
	/**
	 * node id
	 */
	private byte[] nodId = createRandomNodeId();
	
	/**
	 * node队列
	 */
	private Queue<Node> queue = new Queue<>();
	
	/**
	 * 自动重新加入DHT网络 timer
	 * 
	 */
	private Timer autoRejoinDHTTimer;
	
	/**
     * Netty Channel
     */
    private Channel channel;
    
    private OnGetPeersListener onGetPeersListener = null;
    private OnAnnouncePeerListener onAnnouncePeerListener = null;
    
    private LookupService ls = null;
    
    private Map<String, String> allowedIp = null;
    
    private String hostname;
    
    private ConnectionlessBootstrap b;
    
    /**
     * 启动节点列表
     */
    private final List<InetSocketAddress> BOOTSTRAP_NODES = new ArrayList<>(Arrays.asList(
			new InetSocketAddress("router.bittorrent.com", 6881),
			new InetSocketAddress("dht.transmissionbt.com", 6881),
			new InetSocketAddress("router.utorrent.com", 6881),
			new InetSocketAddress("router.bitcomet.com", 6881),
			new InetSocketAddress("dht.aelitis.com", 6881)));
    
    public DHTServer(String hostname, int port, int maxGoodNodeCount) {
    	this.hostname = hostname;
    	
    	try {
			ls = new LookupService(DHTServer.class.getResource("/GeoIP.dat").getPath(), LookupService.GEOIP_MEMORY_CACHE);
		} catch (IOException e) {
			e.printStackTrace();
		}
    	
    	DatagramChannelFactory factory = new NioDatagramChannelFactory(Executors
                .newCachedThreadPool());

    	PacketHandler packetHandler = new PacketHandler();

        b = new ConnectionlessBootstrap(factory);
        b.setPipelineFactory(new ChannelPipelineFactory() {
            public ChannelPipeline getPipeline() throws Exception {
                return Channels.pipeline(packetHandler);
            }
        });
        b.setOption("receiveBufferSize", 65536);
        b.setOption("sendBufferSize", 268435456);
        channel = b.bind(new InetSocketAddress(port));
        this.maxGoodNodeCount = maxGoodNodeCount;
        
        autoRejoinDHTTimer = new Timer();
        autoRejoinDHTTimer.schedule(new TimerTask() {
			
			@Override
			public void run() {
				if (queue.size() <= 0) {
					joinDHT();
				}
				//System.out.println("node count:" + queue.size());
			}
		}, 1000, 5000);

    }
    
    private void joinDHT() {
    	for (InetSocketAddress address : BOOTSTRAP_NODES) {
    		findNode(address,null, getNodeId());
    	}
    }

    private class PacketHandler extends SimpleChannelHandler {
        public void messageReceived(ChannelHandlerContext ctx, MessageEvent e) {
            ByteArrayInputStream stream = new ByteArrayInputStream(((ChannelBuffer) e.getMessage()).array());
            BencodingInputStream bencode = new BencodingInputStream(stream);
            try {
                try {
                    Map<String, ?> map = bencode.readMap();
                    if (map != null)
                        //packetProcessing((InetSocketAddress) e.getRemoteAddress(), map);
                    	packetProcessing((InetSocketAddress) e.getRemoteAddress(), map);
                } catch (EOFException eof) {
                    logger.error("", eof);
                }
                bencode.close();
                stream.close();
            } catch (IOException ex) {
                logger.error("", ex);
            }
        }

		@Override
		public void exceptionCaught(ChannelHandlerContext ctx, ExceptionEvent e) throws Exception {
			logger.error(e);
		}
        
        
    }
    
    /**
     * 数据包处理
     * 
     * @param address	节点地址
     * @param map		数据包 map
     */
    @SuppressWarnings("unchecked")
	private void packetProcessing(InetSocketAddress address, Map<String, ?> map) {
        String y = new String((byte[]) map.get("y"));
        if (y.equals("q"))
            query(address, (byte[]) map.get("t"), new String((byte[]) map.get("q")), (Map<String, ?>) map.get("a"));
        else if (y.equals("r"))
            response(address, (byte[]) map.get("t"), (Map<String, ?>) map.get("r"));
    }
    
    /**
     * 查询请求处理
     *
     * @param address 节点地址
     * @param t       transaction id
     * @param q       查询名称：ping、find_node、get_peers、announce_peer中的一种
     * @param a       查询内容
     */
    private void query(InetSocketAddress address, byte[] t, String q, Map<String, ?> a) {
    	if (q.equals("ping"))
            responsePing(address, t);
        else if (q.equals("find_node"))
            responseFindNode(address, t);
        else if (q.equals("get_peers"))
            responseGetPeers(address, t, (byte[]) a.get("info_hash"));
        else if (q.equals("announce_peer")) {
        	if (a.containsKey("implied_port") && ((BigInteger) a.get("implied_port")).intValue() != 0) {
        		responseAnnouncePeer(address, t, (byte[]) a.get("info_hash"), address.getPort(), (byte[]) a.get("token"));
        	} else {
        		responseAnnouncePeer(address, t, (byte[]) a.get("info_hash"), ((BigInteger) a.get("port")).intValue(), (byte[]) a.get("token"));
        	}
        }
    }
    
    /**
     * 回应 ping 请求
     *
     * @param address 节点地址
     * @param t       transaction id
     */
    private void responsePing(InetSocketAddress address, byte[] t) {
    	sendKRPC(address, createQueries(t, "r", new HashMap<String, Object>()));
        logger.debug("responsePing " + address.toString());
    }
    
    /**
     * 回应 find_node 请求
     * 
     * @param address	节点地址
     * @param t			transaction id
     */
    private void responseFindNode(InetSocketAddress address, byte[] t) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("nodes", new byte[]{});
        sendKRPC(address, createQueries(t, "r", map));
        logger.debug("responseFindNode " + address.toString());
    }
    
    /**
     * 回应 get_peers 请求
     * 
     * @param address	节点地址
     * @param t			transaction id
     * @param info_hash	torrent's infohash
     */
    private void responseGetPeers(InetSocketAddress address, byte[] t, byte[] info_hash) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("token", new byte[] {info_hash[0], info_hash[1]});
        map.put("nodes", new byte[]{});
        map.put("id", getNeighbor(info_hash));
        sendKRPC(address, createQueries(t, "r", map));
        if (onGetPeersListener != null && isAllowedIp(address.getHostString()))
        	onGetPeersListener.onGetPeers(address, info_hash);
        logger.info("info_hash[GetPeers] : " + address.toString() + " - " + ByteUtil.byteArrayToHex(info_hash));
    }
    
	private byte[] getNeighbor(byte[] info_hash) {
    	byte[] bytes = new byte[20];
    	System.arraycopy(info_hash, 0, bytes, 0, 10);
    	System.arraycopy(getNodeId(), 10, bytes, 10, 10);
    	return bytes;
    }
    
    /**
     * 回应 announce_peer 请求
     * 
     * @param address	节点地址
     * @param t			transaction id
     * @param info_hash	torrent's infohash
     * @param port		download port
     */
    private void responseAnnouncePeer(InetSocketAddress address, byte[] t, byte[] info_hash, int port, byte[] token) {
    	HashMap<String, Object> map = new HashMap<String, Object>();
    	map.put("id", getNeighbor(info_hash));
    	sendKRPC(address, createQueries(t, "r", map));
    	if (Arrays.equals(token, Arrays.copyOfRange(info_hash, 0, 2))) {
	        if (onAnnouncePeerListener != null && isAllowedIp(address.getHostString()))
	        	onAnnouncePeerListener.onAnnouncePeer(address, info_hash, port);
    	}
        logger.info("info_hash[AnnouncePeer] : " + address.toString() + " - " + ByteUtil.byteArrayToHex(info_hash));
        //System.out.println("info_hash[AnnouncePeer] : " + address.toString() + " - " + ByteUtil.byteArrayToHex(info_hash));
    }
    
    /**
     * 处理答复
     *
     * @param address 节点地址
     * @param t       答复transaction id，由于爬虫每次发出查询将查询名称作为transaction id，因此可以用它来判断答复的类型
     * @param r       答复内容
     */
    private void response(InetSocketAddress address, byte[] t, Map<String, ?> r) {
    	if (t == null)
    		return;
        String str = new String(t);
        if (str.equals("ping"))
            resultPing(address);
        else if (str.equals("find_node"))
            resultFindNode(address, (byte[]) r.get("nodes"));
        else
            resultGetPeers(address, t, r);
    }
    
    /**
     * 处理 ping 回应结果
     * 
     * @param address
     */
    private void resultPing(InetSocketAddress address) {
        //TODO
    }
    
    /**
     * 处理 find_node 回应结果
     * 
     * @param address	节点地址
     * @param nodes		节点列表 byte 数组
     */
    private void resultFindNode(InetSocketAddress address, byte[] nodes) {
        //LinkedList<byte[]> addressList = new LinkedList<byte[]>();
        decodeNodes(nodes);
        /*for (InetSocketAddress a : decodeNodes(nodes)) {
            byte[] addressdata = new byte[a.getAddress().getAddress().length + 2];
            System.arraycopy(a.getAddress().getAddress(), 0, addressdata, 0, addressdata.length - 2);
            addressdata[addressdata.length - 2] = (byte) ((a.getPort() >> 2) & 0xff);
            addressdata[addressdata.length - 1] = (byte) (a.getPort() & 0xff);
            addressList.add(addressdata);
        }*/
        

        logger.debug("resultFindNode : " + address.toString());
    }
    
    /**
     * 处理 get_peers 回应结果(这里我们做爬虫，实际上上不需要实现)
     * 
     * @param address
     * @param info_hash
     * @param r
     */
    private void resultGetPeers(InetSocketAddress address, byte[] info_hash, Map<String, ?> r) {
    	
    }
    
    /**
     * 创建请求数据包
     *
     * @param t   	transaction id
     * @param y   	数据包类型：查询(q)、答复(r)
     * @param arg	内容
     * @return map
     */
    private Map<String, ?> createQueries(byte[] t, String y, Map<String, Object> arg) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("t", t);
        map.put("y", y);
        if (!arg.containsKey("id"))
        	arg.put("id", getNodeId());

        if (y.equals("q")) {
            map.put("q", new String(t));
            map.put("a", arg);
        } else {
            map.put("r", arg);
        }

        return map;
    }
    
    /**
     * 发送请求
     * @param address	节点地址
     * @param map		数据包map
     */
    private void sendKRPC(InetSocketAddress address, Map<String, ?> map) {
        try (ByteArrayOutputStream stream = new ByteArrayOutputStream();
        		BencodingOutputStream bencode = new BencodingOutputStream(stream)){
            bencode.writeMap(map);
            channel.write(ChannelBuffers.copiedBuffer(stream.toByteArray()), address);
        } catch (Exception e) {
            //logger.error("", e);
        }
    }
    
    /**
     * 解码 nodes
     * 
     * @param nodes	byte array
     * @return		解码后的 node 地址
     */
    private List<InetSocketAddress> decodeNodes(byte[] nodes) {
        if (nodes == null)
            return null;

        LinkedList<InetSocketAddress> list = new LinkedList<InetSocketAddress>();

        for (int i = 0; i < nodes.length; i += 26) {
            InetAddress ip = null;
            try {
                ip = InetAddress.getByAddress(new byte[]{nodes[i + 20], nodes[i + 21], nodes[i + 22], nodes[i + 23]});
            } catch (UnknownHostException e) {
                logger.error("", e);
            }

            try {
                InetSocketAddress address = new InetSocketAddress(ip, (0x0000FF00 & (nodes[i + 24] << 8)) | (0x000000FF & nodes[i + 25]));
                list.addFirst(address);
                //System.out.println("node:" + address.getHostString() + ":" + address.getPort());
                if (queue.size() <= maxGoodNodeCount && !address.getHostString().equals(this.hostname)) {
                	byte[] nid = new byte[20];
                	System.arraycopy(nodes, i, nid, 0, 20);
                	queue.insert(new Node(address.getHostString(), address.getPort(), nid));
                }
                logger.debug("setNodes :" + address.toString());
            } catch (IllegalArgumentException ex) {
                logger.error("", ex);
            }

        }
        return list;
    }
    
    private byte[] getNodeId() {
    	return this.nodId;
    }
    
    public void ping(InetSocketAddress address) {
        sendKRPC(address, createQueries("ping".getBytes(), "q", new HashMap<String, Object>()));
        logger.debug("Ping : " + address.toString());
    }
    
    /**
     * 发送 find_node 请求
     * 
     * @param address
     * @param target
     */
    private void findNode(InetSocketAddress address,byte[] nid, byte[] target) {
        HashMap<String, Object> map = new HashMap<String, Object>();
        map.put("target", target);
        if (nid != null)
        	map.put("id", getNeighbor(nid));
        sendKRPC(address, createQueries("find_node".getBytes(), "q", map));
        logger.debug("findNode : " + address.toString());
    }
    
    @Override
    public void run() {
    	while (true) {
    		//System.out.println(queue.size());
            try {
            	Node node = queue.remove();
        		//ping(new InetSocketAddress(node.getIp(), node.getPort()));
        		findNode(new InetSocketAddress(node.getIp(), node.getPort()),node.getNid(), NodeIdUtil.buildNodeId());
                Thread.sleep(50);
            } catch (InterruptedException e) {
            }
    	}
    }
    
    public static byte[] createRandomNodeId() {
        Random random = new Random();
        byte[] r = new byte[20];
        random.nextBytes(r);
        return r;
    }
    
    private boolean isAllowedIp(String ip) {
    	if (ls == null || allowedIp == null)
    		return true;
    	if (ls != null && allowedIp != null && !allowedIp.containsKey(ls.getCountry(ip).getCode())) {
    		return false;
    	}
    	return true;
    }
    
    public void setOnGetPeersListener(OnGetPeersListener onGetPeersListener) {
		this.onGetPeersListener = onGetPeersListener;
	}
    
    public void setOnAnnouncePeerListener(OnAnnouncePeerListener onAnnouncePeerListener) {
		this.onAnnouncePeerListener = onAnnouncePeerListener;
	}
    
    public void setAllowedIp(Map<String, String> allowedIp) {
		this.allowedIp = allowedIp;
	}
    
    public void stopAll() {
    	if (channel != null)
    		channel.close().awaitUninterruptibly();
    	if (b != null)
    		b.releaseExternalResources();
    	if (autoRejoinDHTTimer != null)
    		autoRejoinDHTTimer.cancel();
    }
}

