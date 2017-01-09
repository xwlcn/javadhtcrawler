package com.so_cili.dhtcrawler.db;

import java.util.List;

import org.apache.log4j.Logger;

import redis.clients.jedis.Jedis;
import redis.clients.jedis.JedisPool;
import redis.clients.jedis.JedisPoolConfig;  

public class RedisPool {  
       
    protected static Logger logger = Logger.getLogger(RedisPool.class);  
       
    //Redis服务器IP  
    
    private static String ADDR_ARRAY = "localhost";     
    
    //Redis的端口号  
    
    private static int PORT = 6379; 
    
    //访问密码  
//    private static String AUTH = "";  
       
    //可用连接实例的最大数目，默认值为8；  
    //如果赋值为-1，则表示不限制；如果pool已经分配了maxActive个jedis实例，则此时pool的状态为exhausted(耗尽)。  
    private static int MAX_ACTIVE = 1000;  
       
    //控制一个pool最多有多少个状态为idle(空闲的)的jedis实例，默认值也是8。  
    private static int MAX_IDLE = 100;  
       
    //等待可用连接的最大时间，单位毫秒，默认值为-1，表示永不超时。如果超过等待时间，则直接抛出JedisConnectionException；  
    private static int MAX_WAIT = 180000;  
   
    //超时时间  
    private static int TIMEOUT = 200000;  
       
    //在borrow一个jedis实例时，是否提前进行validate操作；如果为true，则得到的jedis实例均是可用的；  
    private static boolean TEST_ON_BORROW = true;  
       
    private static JedisPool jedisPool = null;  
       
    /** 
     * redis过期时间,以秒为单位 
     */ 
    public final static int EXRP_HOUR = 60*60;          //一小时  
    public final static int EXRP_DAY = 60*60*24;        //一天  
    public final static int EXRP_MONTH = 60*60*24*30;   //一个月  
       
    /** 
     * 初始化Redis连接池 
     */ 
    private static void initialPool(){  
        try {  
            JedisPoolConfig config = new JedisPoolConfig();  
            config.setMaxTotal(MAX_ACTIVE);  
            config.setMaxIdle(MAX_IDLE);  
            config.setMaxWaitMillis(MAX_WAIT);  
            config.setTestOnBorrow(TEST_ON_BORROW);  
            jedisPool = new JedisPool(config, ADDR_ARRAY.split(",")[0], PORT, TIMEOUT);  
        } catch (Exception e) {  
            logger.error("First create JedisPool error : "+e);  
            try{  
                //如果第一个IP异常，则访问第二个IP  
                JedisPoolConfig config = new JedisPoolConfig();  
                config.setMaxTotal(MAX_ACTIVE);  
                config.setMaxIdle(MAX_IDLE);  
                config.setMaxWaitMillis(MAX_WAIT);  
                config.setTestOnBorrow(TEST_ON_BORROW);  
                jedisPool = new JedisPool(config, ADDR_ARRAY.split(",")[1], PORT, TIMEOUT);  
            }catch(Exception e2){  
                logger.error("Second create JedisPool error : "+e2);  
            }  
        }  
    }  
       
       
    /** 
     * 在多线程环境同步初始化 
     */ 
    private static synchronized void poolInit() {  
        if (jedisPool == null) {    
            initialPool();  
        }  
    }  
   
       
    /** 
     * 同步获取Jedis实例 
     * @return Jedis 
     */ 
    @SuppressWarnings("deprecation")
	public synchronized static Jedis getJedis() {    
        if (jedisPool == null) {    
            poolInit();  
        }  
        Jedis jedis = null;  
        try {    
            if (jedisPool != null) {    
                jedis = jedisPool.getResource();   
            }  
        } catch (Exception e) {    
        	jedisPool.returnBrokenResource(jedis);
            logger.error("Get jedis error : "+e);  
        }finally{  
            //returnResource(jedis);  
        }  
        return jedis;  
    }    
       
    /** 
     * 释放jedis资源 
     * @param jedis 
     */ 
    @SuppressWarnings("deprecation")
	public static void returnResource(final Jedis jedis) {  
        if (jedis != null && jedisPool !=null) {  
        	try {
        		jedisPool.returnResource(jedis);  
        	} catch (Exception e) {}
        }  
    }  
       
    public static void set(String key, String value) {
    	Jedis jedis = null;
		try {
			jedis = getJedis();
			jedis.set(key, value);
		} catch (Exception e) {
			logger.error("set key:" + key + "error:", e);
		} finally {
			if (jedis != null)
				returnResource(jedis);
		}
    }
    
    public static String getSet(String key, String value) {
    	Jedis jedis = null;
    	String res = null;
		try {
			jedis = getJedis();
			res = jedis.getSet(key, value);
		} catch (Exception e) {
			logger.error("set key:" + key + "error:", e);
		} finally {
			if (jedis != null)
				returnResource(jedis);
		}
		return res;
    }
    
    public static String get(String key) {
    	Jedis jedis = null;
    	String s = null;
    	try {
			jedis = getJedis();
			s = jedis.get(key);
		} catch (Exception e) {
			e.printStackTrace();
			logger.error("get key:" + key + "have an error:", e);
		} finally {
			if (jedis != null) {
				returnResource(jedis);
			}
		}
    	return s;
    }
    
    public static void hset(String key, String field, String value) {
    	Jedis jedis = null;
    	try {
			jedis = getJedis();
			jedis.hset(key, field, value);
		} catch (Exception e) {
			logger.error("hset key:" + key + "have an error:", e);
		} finally {
			if (jedis != null) {
				returnResource(jedis);
			}
		}
    }
    
    public static String hget(String key, String field) {
    	Jedis jedis = null;
    	String s = null;
    	try {
			jedis = getJedis();
			s = jedis.hget(key, field);
		} catch (Exception e) {
			logger.error("hget key:" + key + "have an error:", e);
		} finally {
			if (jedis != null) {
				returnResource(jedis);
			}
		}
    	return s;
    }
    
    public static void lpush(String key, String...strings) {
    	Jedis jedis = null;
    	try {
			jedis = getJedis();
			jedis.lpush(key, strings);
		} catch (Exception e) {
			logger.error("lpush key:" + key + "have an error:", e);
		} finally {
			if (jedis != null) {
				returnResource(jedis);
			}
		}
    }
    
    public static List<String> lrange(String key, long start, long end) {
    	Jedis jedis = null;
    	List<String> list = null;
    	try {
			jedis = getJedis();
			list = jedis.lrange(key, start, end);
		} catch (Exception e) {
			logger.error("lrange key:" + key + "have an error:", e);
		} finally {
			if (jedis != null) {
				returnResource(jedis);
			}
		}
    	return list;
    }
    
    public static Boolean exists(String key) {
    	Jedis jedis = null;
    	Boolean b = false;
    	try {
			jedis = getJedis();
			b = jedis.exists(key);
		} catch (Exception e) {
			logger.error("exists key:" + key + "have an error:", e);
		} finally {
			if (jedis != null) {
				returnResource(jedis);
			}
		}
    	return b;
    }
    
    public static Boolean hexists(String key, String field) {
    	Jedis jedis = null;
    	Boolean b = false;
    	try {
			jedis = getJedis();
			b = jedis.hexists(key, field);
		} catch (Exception e) {
			logger.error("hexists key:" + key + "have an error:", e);
		} finally {
			if (jedis != null) {
				returnResource(jedis);
			}
		}
    	return b;
    }
    
    public static void lrem(String key, long count, String value) {
    	Jedis jedis = null;
    	try {
			jedis = getJedis();
			jedis.lrem(key, count, value);
		} catch (Exception e) {
			logger.error("lrem key:" + key + "have an error:", e);
		} finally {
			if (jedis != null) {
				returnResource(jedis);
			}
		}
    }
    
    public static void flushDB() {
    	Jedis jedis = null;
    	try {
			jedis = getJedis();
			jedis.flushDB();
		} catch (Exception e) {
			logger.error("flushDB have an error:", e);
		} finally {
			if (jedis != null) {
				returnResource(jedis);
			}
		}
    }
    
    public static void close() {
    	jedisPool.close();
    }

}