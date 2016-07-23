package com.so_cili.lucene.bean;

import java.util.List;

public class PageBean<T> {

	private Integer total;
	private Integer curPage;
	private Integer pageSize;
	private Integer pageCount;	//总页数
	
	private List<T> list;
	
	public PageBean(Integer total, Integer curPage, Integer pageSize, Integer pageCount, List<T> list) {
		super();
		this.total = total;
		this.curPage = curPage;
		this.pageSize = pageSize;
		this.pageCount = pageCount;
		this.list = list;
	}

	public Integer getTotal() {
		return total;
	}

	public void setTotal(Integer total) {
		this.total = total;
	}

	public Integer getCurPage() {
		return curPage;
	}

	public void setCurPage(Integer curPage) {
		this.curPage = curPage;
	}

	public Integer getPageSize() {
		return pageSize;
	}

	public void setPageSize(Integer pageSize) {
		this.pageSize = pageSize;
	}

	public List<T> getList() {
		return list;
	}

	public void setList(List<T> list) {
		this.list = list;
	}

	public Integer getPageCount() {
		return pageCount;
	}

	public void setPageCount(Integer pageCount) {
		this.pageCount = pageCount;
	}
	
	
}
