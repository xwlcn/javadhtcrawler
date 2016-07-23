package com.so_cili.jfinal.entity;

import com.jfinal.plugin.activerecord.Model;

public class AVer extends Model<AVer> {

	public static final AVer dao = new AVer();
	
	private Integer id;
	private String name;
	private String list;
}
