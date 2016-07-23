package com.so_cili.dhtcrawler.structure;

/**
 * 多文件列表的子文件结构
 * 
 * @author xwl
 * @version Created on 2016年4月4日 下午8:52:42
 */
public class SubFile {

	private String length;
	private String path;

	public SubFile() {
	}

	public SubFile(String length, String path) {
		super();
		this.length = length;
		this.path = path;
	}

	public String getLength() {
		return length;
	}

	public void setLength(String length) {
		this.length = length;
	}

	public String getPath() {
		return path;
	}

	public void setPath(String path) {
		this.path = path;
	}

}
