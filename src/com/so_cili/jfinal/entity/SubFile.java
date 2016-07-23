package com.so_cili.jfinal.entity;

import com.jfinal.plugin.activerecord.Model;

public class SubFile extends Model<SubFile> {
	
	public static final SubFile dao = new SubFile();

	private Long id;
	private String path;
	private String length;
	
	private Long fid;		//外键，tb_file
}
