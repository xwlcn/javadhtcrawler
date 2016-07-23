package com.so_cili.dhtcrawler.structure;

import java.util.List;

public class Info {
	
	private String name;
	private Long length;
	private Long pieceLength;
	private byte[] pieces;
	
	private List<SubFile> files;
	
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public Long getLength() {
		return length;
	}

	public void setLength(Long length) {
		this.length = length;
	}

	public Long getPieceLength() {
		return pieceLength;
	}

	public void setPieceLength(Long pieceLength) {
		this.pieceLength = pieceLength;
	}

	public byte[] getPieces() {
		return pieces;
	}

	public void setPieces(byte[] pieces) {
		this.pieces = pieces;
	}

	public List<SubFile> getFiles() {
		return files;
	}

	public void setFiles(List<SubFile> files) {
		this.files = files;
	}

	
}
