package com.so_cili.dhtcrawler.test;

import java.util.Date;

import com.alibaba.fastjson.JSON;
import com.so_cili.dhtcrawler.structure.SubFile;
import com.so_cili.dhtcrawler.structure.Torrent;
import com.so_cili.lucene.stopword.StopWord;

public class Test1 {

	public static void main(String[] args) throws Exception {
		/*ConnectionPool connPool = new ConnectionPool("com.mysql.jdbc.Driver"
				 ,"jdbc:mysql://5.189.155.88:3306/dht?useUnicode=true&characterEncoding=UTF-8" ,"root" ,"1993527wan");
		try {
			connPool .createPool();
		} catch (Exception e1) {
			e1.printStackTrace();
		}
		Connection conn = connPool.getConnection();
		ResultSet rs = conn.prepareStatement("select name from tb_file where info_hash = 'b2428b6e70f936a37af35d93a1edb6dbac0e45e4'").executeQuery();
		if (rs.next()) {
			String name = rs.getString(1);
			System.out.println(name);
			System.out.println(new String(new String(name.getBytes("UTF-8"), "ISO-8859-1").getBytes(), "UTF-8"));
			System.out.println(new String(name.getBytes("ISO-8859-1"), "UTF-8"));
		}*/
		
		//测试字符串   
	    /* String str="罗伯特上校正在进行一次“城市肃清”行动。在法律之外，他独自单挑各种势力，从街头混混到高层政客。然而这种行动却越发激进，却造成了警局的困扰，罗伯特以前的士兵威廉姆斯决定联合当地警局，将一发不可收拾的罗伯特拉回正轨，绳之以法。罗伯特上校正在进行一次“城市肃清”行动。在法律之外，他独自单挑各种势力，从街头混混到高层政客。然而这种行动却越发激进，却造成了警局的困扰，罗伯特以前的士兵威廉姆斯决定联合当地警局，将一发不可收拾的罗伯特拉回正轨，绳之以法。罗伯特上校正在进行一次“城市肃清”行动。在法律之外，他独自单挑各种势力，从街头混混到高层政客。然而这种行动却越发激进，却造成了警局的困扰，罗伯特以前的士兵威廉姆斯决定联合当地警局，将一发不可收拾的罗伯特拉回正轨，绳之以法。罗伯特上校正在进行一次“城市肃清”行动。在法律之外，他独自单挑各种势力，从街头混混到高层政客。然而这种行动却越发激进，却造成了警局的困扰，罗伯特以前的士兵威廉姆斯决定联合当地警局，将一发不可收拾的罗伯特拉回正轨，绳之以法。罗伯特上校正在进行一次“城市肃清”行动。在法律之外，他独自单挑各种势力，从街头混混到高层政客。然而这种行动却越发激进，却造成了警局的困扰，罗伯特以前的士兵威廉姆斯决定联合当地警局，将一发不可收拾的罗伯特拉回正轨，绳之以法。罗伯特上校正在进行一次“城市肃清”行动。在法律之外，他独自单挑各种势力，从街头混混到高层政客。然而这种行动却越发激进，却造成了警局的困扰，罗伯特以前的士兵威廉姆斯决定联合当地警局，将一发不可收拾的罗伯特拉回正轨，绳之以法。罗伯特上校正在进行一次“城市肃清”行动。在法律之外，他独自单挑各种势力，从街头混混到高层政客。然而这种行动却越发激进，却造成了警局的困扰，罗伯特以前的士兵威廉姆斯决定联合当地警局，将一发不可收拾的罗伯特拉回正轨，绳之以法。罗伯特上校正在进行一次“城市肃清”行动。在法律之外，他独自单挑各种势力，从街头混混到高层政客。然而这种行动却越发激进，却造成了警局的困扰，罗伯特以前的士兵威廉姆斯决定联合当地警局，将一发不可收拾的罗伯特拉回正轨，绳之以法。罗伯特上校正在进行一次“城市肃清”行动。在法律之外，他独自单挑各种势力，从街头混混到高层政客。然而这种行动却越发激进，却造成了警局的困扰，罗伯特以前的士兵威廉姆斯决定联合当地警局，将一发不可收拾的罗伯特拉回正轨，绳之以法。";   
	         
	      System.out.println("原长度："+str.length());     
	         
	      System.out.println("压缩后："+ZipUtil.gzip(str).length());     
	         
	    System.out.println("解压缩："+ZipUtil.gunzip(ZipUtil.gzip(str))); */
		
		/*String s = "准确说不是误传，而是HTTP协议只支持使用ISO-8859-1的协议传递，客户端的浏览器是按照GBK的编码转换成4个字节发出的。字节的内容和顺序还是正确的。转换成4个字节发出的。字节的内容和顺序还是正确的。";
		System.out.println(s.getBytes().length);
		System.out.println(ZipUtil.compress(s).length);*/
		
		/*String name = "upload1exe"; // 注：name的值是动态的 这里只是假设已知。
		// 获取后缀名
		System.out.println(name.substring(name.lastIndexOf(".")));*/
		//System.out.println(new Date());
		/*String str = "일요일이좋다 - 런닝 맨.E291.짝, 1％의 우정.130818.HDTV.XViD-HANrel.avi";  
        System.out.println(str);  
        String str1 = str.replaceAll("[\\pP\\pZ\\pS\\pC]", "-");  
        System.out.println(str1); */ 
		/*String[] ss = "일요일이좋다---런닝-맨-E291-짝--1-의-우정-130818-HDTV-XViD-HANrel-avi".split("-");
		for (String s : ss) {
			System.out.println(s);
		}*/
		SubFile sf = new SubFile("1233", "11111111111");
		System.out.println(JSON.toJSONString(sf));
	}

}
