package com.so_cili.jfinal.entity;

import java.util.Date;
import java.util.List;

import com.jfinal.plugin.activerecord.Model;

public class Torrent extends Model<Torrent> {

	public static final Torrent dao = new Torrent();

	private Long id;
	private String info_hash;
	private String name;
	private String type;
	private Date find_date;
	private Long size;
	private Integer hot;
	private Integer aid;
	private byte[] subfiles;
	
	public AVer getAVer() {
		if (get("aid") == null)
			return null;
		return AVer.dao.findById(getInt("aid"));
	}
	
	public List<SubFile> getSubFiles() {
		return SubFile.dao.find("select * from tb_subfile where fid=?", getLong("id"));
	}
}
