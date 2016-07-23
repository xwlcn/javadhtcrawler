package com.so_cili.jfinal.common.config;

import java.io.IOException;

import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.core.JFinal;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.activerecord.dialect.MysqlDialect;
import com.jfinal.plugin.c3p0.C3p0Plugin;
import com.jfinal.render.ViewType;
import com.so_cili.dhtcrawler.constant.DataBase;
import com.so_cili.dhtcrawler.main.Main;
import com.so_cili.dhtcrawler.test.AddPicture;
import com.so_cili.dhtcrawler.test.CreateIndex;
import com.so_cili.dhtcrawler.test.PutSubfiles;
import com.so_cili.jfinal.controller.IndexController;
import com.so_cili.jfinal.entity.AVer;
import com.so_cili.jfinal.entity.SubFile;
import com.so_cili.jfinal.handler.ParaHandler;
import com.so_cili.lucene.manager.IndexManager;

public class WebConfig extends JFinalConfig {
	/**
	 * 配置JFinal常量
	 */
	@Override
	public void configConstant(Constants me) {
		//读取数据库配置文件
		PropKit.use("config.properties");
		//设置当前是否为开发模式
		me.setDevMode(PropKit.getBoolean("devMode"));
		//设置默认上传文件保存路径 getFile等使用
		me.setBaseUploadPath("/upload");
		//设置上传最大限制尺寸
		//me.setMaxPostSize(1024*1024*10);
		//设置默认下载文件路径 renderFile使用
		//me.setBaseDownloadPath("");
		me.setBaseViewPath("/WEB-INF/view");
		//设置默认视图类型
		me.setViewType(ViewType.JSP);
		//设置404渲染视图
		me.setError404View("/WEB-INF/view/404.jsp");
		
	}
	/**
	 * 配置JFinal路由映射
	 */
	@Override
	public void configRoute(Routes me) {
		me.add("/", IndexController.class, "");
	}
	/**
	 * 配置JFinal插件
	 * 数据库连接池
	 * ORM
	 * 缓存等插件
	 * 自定义插件
	 */
	@Override
	public void configPlugin(Plugins me) {
		//配置数据库连接池插件
		C3p0Plugin c3p0Plugin=new C3p0Plugin(PropKit.get("jdbcUrl"), PropKit.get("user"), PropKit.get("password"));
		c3p0Plugin.setMaxPoolSize(400);
		c3p0Plugin.setMinPoolSize(210);
		//orm映射 配置ActiveRecord插件
		ActiveRecordPlugin arp=new ActiveRecordPlugin(c3p0Plugin);
		arp.setShowSql(PropKit.getBoolean("devMode"));
		arp.setDialect(new MysqlDialect());
		/********在此添加数据库 表-Model 映射*********/
		arp.addMapping("tb_file", com.so_cili.jfinal.entity.Torrent.class);
		arp.addMapping("tb_aver", AVer.class);
		//arp.addMapping("tb_subfile", SubFile.class);
		//添加到插件列表中
		me.add(c3p0Plugin);
		me.add(arp);
	}
	/**
	 * 配置全局拦截器
	 */
	@Override
	public void configInterceptor(Interceptors me) {

	}
	/**
	 * 配置全局处理器
	 */
	@Override
	public void configHandler(Handlers me) {
		me.add(new ParaHandler());
	}
	public static void main(String[] args) {
		JFinal.start("WebRoot", 80, "/", 5);
	}
	
	@Override
	public void afterJFinalStart() {
		super.afterJFinalStart();
		DataBase.startCache();
		Main.me.start();
		//new AddPicture().start();
		//new CreateIndex().start();
		//new PutSubfiles().start();
	}
	
	@Override
	public void beforeJFinalStop() {
		super.beforeJFinalStop();
		try {
			DataBase.stopCache();
			Main.me.stopAll();
			IndexManager.closeIndexWriter();
		} catch (Exception e) {
			//e.printStackTrace();
		}
	}
}
