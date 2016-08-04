package com.so_cili.dhtcrawler.structure;

import java.util.ArrayList;
import java.util.List;

public class MyQueue<T> extends ArrayList<T> {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	synchronized public List<T> getAll() {
		List<T> list = new ArrayList<>();
		list.addAll(this);
		clear();
		return list;
	}
	
	synchronized public void insert(T t) {
		add(t);
	}
}
