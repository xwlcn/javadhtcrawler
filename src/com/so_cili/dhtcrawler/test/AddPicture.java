package com.so_cili.dhtcrawler.test;

import java.util.ArrayList;
import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import com.alibaba.fastjson.JSON;
import com.jfinal.plugin.activerecord.Db;
import com.so_cili.dhtcrawler.util.HttpUtil;
import com.so_cili.dhtcrawler.util.StringUtil;
import com.so_cili.jfinal.entity.AVer;
import com.so_cili.jfinal.entity.FanHao;

public class AddPicture extends Thread {

	@Override
	public void run() {
		System.out.println("start...");
		int i = 59;
		while (i <= 1799) {
			String html = HttpUtil.sendGet("http://www.fanhaowang.info/Article/StarFiles/" + i + ".html", "GBK");
			if (html != null && !"".equals(html)) {
				String name = StringUtil.findMiddleByLeftAndRight(html, "<div class=\"nr_top_l\"><h1>", "</h1>");
				//获取图片
				String imgUrl = StringUtil.findMiddleByLeftAndRight(html, "<img src=\"", "\"></div>");
				String cover = imgUrl.substring(imgUrl.lastIndexOf("/"));
				html = html.replaceAll(" ", "");
				html = html.replaceAll("&nbsp;", "");
				//System.out.println(html);
				Pattern pattern = Pattern.compile("<tr><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td><td>(.*?)</td></tr>");
				
				Matcher matcher = pattern.matcher(html);
				
				if (!matcher.find()) {
					pattern = Pattern.compile("<tr><td style=\"text-align: left\">(.*?)</td><td style=\"text-align: left\">(.*?)</td><td style=\"text-align: left\">(.*?)</td><td style=\"text-align: left\">(.*?)</td><td style=\"text-align: left\">(.*?)</td></tr>");
					matcher = pattern.matcher(html);
				}
				
				List<FanHao> list = new ArrayList<>();
				
				if (HttpUtil.download("http://www.fanhaowang.info" + imgUrl, cover, "C:\\Users\\Administrator\\Desktop\\images\\")) {
					StringBuffer s = new StringBuffer();
					while (matcher.find()) {
						String fanhao = matcher.group(1);
						list.add(new FanHao(fanhao, matcher.group(2), matcher.group(3), matcher.group(4), matcher.group(5)));
						s.append(" name like '%" + fanhao + "%' or");
					}
					if (!"".equals(name) && !"".equals(cover)) {
						AVer aver = new AVer().set("aver_name", name)
						.set("cover", cover)
						.set("list", JSON.toJSONString(list));
						if (aver.save()) {
							String sql = "update tb_file set aid=" + aver.getInt("id") + " where" + s.toString().substring(0, s.toString().length() - 3);
							//System.out.println(sql);
							System.out.println(Db.update(sql) + " records have changed.");
						} else {
							System.out.println("end width:" + i + " d");
							break;
						}
						
					} else {
						System.out.println("end width:" + i + " c");
						break;
					}
				} else {
					System.out.println("end width:" + i + " b");
					break;
				}
			} else {
				continue;
			}
			System.out.println(i + " has finished.");
			try {
				Thread.sleep(3000);
			} catch (InterruptedException e) {
				e.printStackTrace();
			}
			i++;
		}
	}
}
