package com.so_cili.lucene.manager;

import java.io.IOException;
import java.io.StringReader;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

import org.apache.lucene.analysis.Analyzer;
import org.apache.lucene.analysis.TokenStream;
import org.apache.lucene.analysis.tokenattributes.CharTermAttribute;
import org.apache.lucene.document.Document;
import org.apache.lucene.document.Field;
import org.apache.lucene.document.TextField;
import org.apache.lucene.index.DirectoryReader;
import org.apache.lucene.index.IndexWriter;
import org.apache.lucene.index.IndexWriterConfig;
import org.apache.lucene.queryparser.classic.QueryParser;
import org.apache.lucene.search.IndexSearcher;
import org.apache.lucene.search.Query;
import org.apache.lucene.search.ScoreDoc;
import org.apache.lucene.search.TopDocs;
import org.apache.lucene.search.highlight.Fragmenter;
import org.apache.lucene.search.highlight.Highlighter;
import org.apache.lucene.search.highlight.QueryScorer;
import org.apache.lucene.search.highlight.SimpleHTMLFormatter;
import org.apache.lucene.search.highlight.SimpleSpanFragmenter;
import org.apache.lucene.store.Directory;
import org.apache.lucene.store.FSDirectory;

import com.alibaba.fastjson.JSON;
import com.chenlb.mmseg4j.analysis.ComplexAnalyzer;
import com.jfinal.kit.PropKit;
import com.so_cili.dhtcrawler.structure.SubFile;
import com.so_cili.dhtcrawler.util.StringUtil;
import com.so_cili.dhtcrawler.util.ZipUtil;
import com.so_cili.jfinal.entity.Torrent;
import com.so_cili.lucene.bean.PageBean;
import com.so_cili.lucene.stopword.StopWord;

public class IndexManager {

	private static final String TORRENT_NAME_INDEX_PATH = PropKit.use("lucene.properties")
			.get("torrent_name_index_path");

	private static final int PAGE_SIZE = 16;

	private static Directory directory = null;
	//private static IndexSearcher searcher = null;
	private static IndexWriter writer = null;
	private static Analyzer analyzer = null;

	static {
		try {
			directory = FSDirectory.open(Paths.get(TORRENT_NAME_INDEX_PATH));
			analyzer = new ComplexAnalyzer();
			IndexWriterConfig iwc = new IndexWriterConfig(analyzer);
			writer = new IndexWriter(directory, iwc);
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	public static void closeIndexWriter() throws IOException {
		if (writer != null)
			writer.close();
	}

	/**
	 * 批量创建索引
	 * 
	 * @param torrents
	 */
	public static void createIndex(Torrent... torrents) {
		try {
			for (Torrent torrent : torrents) {
				Document document = new Document();
				document.add(new TextField("info_hash", torrent.getStr("info_hash"), Field.Store.YES));
				document.add(new TextField("name", torrent.getStr("name"), Field.Store.YES));
				writer.addDocument(document);
			}
			writer.commit();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}

	/**
	 * 分页高亮搜索
	 * @param keyword
	 * @param curPage
	 * @return
	 * @throws IOException
	 */
	public static PageBean<Torrent> search(String keyword, int curPage, Integer pageSize) throws IOException {
		if (pageSize == null)
			pageSize = PAGE_SIZE;
		IndexSearcher searcher = new IndexSearcher(DirectoryReader.open(directory));
		List<String> hashes = new ArrayList<>();
		try {
            QueryParser parser = new QueryParser("name", analyzer);
    		Query query = parser.parse(keyword);
    		
    		ScoreDoc last = getLastScoreDoc(curPage, query, searcher);
            TopDocs hits = searcher.searchAfter(last, query, pageSize);
            Document doc = null;
            if (null != hits.scoreDocs && hits.totalHits > 0) {
                for (ScoreDoc hit : hits.scoreDocs) {
                    doc = searcher.doc(hit.doc);
                    hashes.add("'" + doc.get("info_hash") + "'");
                }
                List<Torrent> list = Torrent.dao.find("select * from tb_file where info_hash in(" + org.apache.commons.lang.StringUtils.join(hashes, ",") + ")");
                
                QueryScorer scorer=new QueryScorer(query);
                SimpleHTMLFormatter formatter = new SimpleHTMLFormatter("<span class=\"c-red\">","</span>");
                Fragmenter fragmenter = new SimpleSpanFragmenter(scorer);  
                Highlighter highlight=new Highlighter(formatter, scorer);  
                highlight.setTextFragmenter(fragmenter);
                
                for (Torrent torrent : list) {
                	torrent.put("sSize", StringUtil.formatSize((double) torrent.getLong("size")));
                	torrent.put("flag", torrent.get("id") + StringUtil.formatStr(torrent.getStr("name")));
                	torrent.put("subfiles", JSON.parseArray(ZipUtil.decompress(torrent.getBytes("subfiles")), SubFile.class));
                	//高亮显示
                	String name = torrent.getStr("name");
                	TokenStream tokenStream = analyzer.tokenStream("name", new StringReader(name));    
                    String highLightName = highlight.getBestFragment(tokenStream, name);
                    torrent.put("name", highLightName);
                }
                return new PageBean<Torrent>(hits.totalHits, curPage, pageSize, (int)Math.ceil((double)hits.totalHits / pageSize), list);
                
            } else {
                return null;
            }
        } catch (Exception ex) {
        	ex.printStackTrace();
            return null;
        }
	}
	
	public static List<String> getWords(String str){  
	    List<String> result = new ArrayList<String>();  
	    TokenStream stream = null;  
	    try {  
	        stream = analyzer.tokenStream("name", new StringReader(str));  
	        CharTermAttribute attr = stream.addAttribute(CharTermAttribute.class);  
	        stream.reset();  
	        while(stream.incrementToken()){  
	        	if (!StopWord.contains(attr.toString()))
	        		result.add(attr.toString());  
	        }  
	    } catch (IOException e) {  
	        e.printStackTrace();  
	    }finally{  
	        if(stream != null){  
	            try {  
	                stream.close();  
	            } catch (IOException e) {  
	                e.printStackTrace();  
	            }  
	        }  
	    }  
	    return result;  
	}  

	private static ScoreDoc getLastScoreDoc(int curPage, Query query,
            IndexSearcher searcher) throws IOException {
        if (curPage == 1) {
            return null;
        }
        int num = PAGE_SIZE * (curPage - 1);
        TopDocs tds = searcher.search(query, num);
        return tds.scoreDocs[num - 1];
    }
	
}
