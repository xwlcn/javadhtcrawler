package com.so_cili.lucene.stopword;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.HashMap;
import java.util.Map;

public class StopWord {

	private static Map<String, Integer> stopwords = new HashMap<>();
	
	static {
		try {
			BufferedReader br = new BufferedReader(new InputStreamReader(StopWord.class.getResourceAsStream("/stopword.dic"), "gbk"));
			String line = null;
			while ((line = br.readLine()) != null) {
				stopwords.put(line, 1);
			}
		} catch (Exception e) {}
	}
	
	public static boolean contains(String word) {
		return stopwords.containsKey(word);
	}
}
