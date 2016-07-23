package com.so_cili.jfinal.entity;

public class FanHao {

	private String fanhao;
	private String title;
	private String pianchang;
	private String date;
	private String publisher;

	public FanHao() {
		super();
		// TODO Auto-generated constructor stub
	}

	public FanHao(String fanhao, String title, String pianchang, String date, String publisher) {
		super();
		this.fanhao = fanhao;
		this.title = title;
		this.pianchang = pianchang;
		this.date = date;
		this.publisher = publisher;
	}

	public String getFanhao() {
		return fanhao;
	}

	public void setFanhao(String fanhao) {
		this.fanhao = fanhao;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

	public String getPianchang() {
		return pianchang;
	}

	public void setPianchang(String pianchang) {
		this.pianchang = pianchang;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getPublisher() {
		return publisher;
	}

	public void setPublisher(String publisher) {
		this.publisher = publisher;
	}

}
