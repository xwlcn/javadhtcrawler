<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<jsp:include page="common/include.jsp"></jsp:include>
<script type="text/javascript" src="${pageContext.request.contextPath }/static/common/js/base64.js"></script>
<script type="text/javascript" src="${pageContext.request.contextPath }/static/common/js/webThunderDetect.js"></script>
<meta name="keywords" content="${torrent.name }, 搜磁力, 磁力搜索, 番号搜索, 磁力链接, 磁力搜, 磁力链, 磁力链接搜索, so-cili, BT磁力电影资源" />
<meta name="description" content="${torrent.name } 磁力链接， 迅雷下载链接， 文件详细信息展示。" />
<title>${torrent.name } - 搜磁力 - 最新最热磁力搜索引擎</title>
</head>
<body>
	<jsp:include page="common/header.jsp"></jsp:include>
	<div class="index-content">
		<div class="first-content" style="height: 90%">
			<div class="container-fluid pb-10 mt-10 cl search-header">
				<a class="col-md-1 hidden-sm hidden-xs text-r f-l" href="${pageContext.request.contextPath }/">
					<img style="width:160px" src="${pageContext.request.contextPath }/static/images/banner.png" alt="So-Cili.COM - 搜磁力">
				</a>
				<div class="col-md-6 col-xs-12 f-l">
					<div class="col-xs-10" style="padding: 0">
						<input type="text" placeholder="搜索那么多，不如搜磁力！" class="input-text size-L" id="keyword">
					</div>
					<div class="col-xs-2" style="padding: 0">
						<button class="btn btn-primary size-L col-md-2" id="search_button">搜索</button>
					</div>
				</div>
			</div>
			
			<div class="container-fluid cl pb-20">
				<div class="col-md-1 f-l hidden-xs"></div>
				<div class="col-md-8 col-xs-12 f-l pb-50">
					<h1 class="f-18 pb-10">${torrent.name }</h1>
					<table class="table table-border table-bordered table-hover">
						<tbody>
							<tr class="text-c success"><th colspan="5">下载地址</th></tr>
							<tr>
								<td class="text-r" style="width:60px">磁力链接:</td>
								<td colspan="4"><a class="c-blue" href="magnet:?xt=urn:btih:${torrent.info_hash }&dn=${torrent.name }">magnet:?xt=urn:btih:${torrent.info_hash }&dn=${torrent.name }</a></td>
							</tr>
							<tr>
								<td class="text-r">迅雷链接:</td>
								<td colspan="4"><a class="c-blue" id="thunder-link" onclick="xldown('magnet:?xt=urn:btih:${torrent.info_hash }&dn=${torrent.name }')" href="javascript:void(0);"><script type="text/javascript">document.write(ThunderEncode("magnet:?xt=urn:btih:${torrent.info_hash }&dn=${torrent.name }"))</script></a></td>
							</tr>
							<tr class="text-c success"><th colspan="5">文件描述</th></tr>
							<tr>
								<td class="text-r">文件类型:</td>
								<td colspan="2">${torrent.type }</td>
								<c:if test="${aver != null }">
								<td class="text-c" rowspan="8" colspan="2"><img src="${pageContext.request.contextPath }/static/covers${aver.cover }" alt="${aver.name } - ${torrent.name }番号海报"></img></td>
								</c:if>
							</tr>
							<tr>
								<td class="text-r">发现时间:</td>
								<td colspan="2"><fmt:formatDate value="${torrent.find_date }" pattern="yyyy-MM-dd HH:mm:ss"/></td>
							</tr>
							<tr>
								<td class="text-r">文件大小:</td>
								<td colspan="2">${torrent.sSize }</td>
							</tr>
							<tr>
								<td class="text-r">文件数量:</td>
								<td colspan="2">${torrent.subfiles == null ? 1 : fn:length(torrent.subfiles) }</td>
							</tr>
							<tr>
								<td class="text-r">文件热度:</td>
								<td colspan="2">${torrent.hot } ℃</td>
							</tr>
							<tr>
				    			<td class="text-r">上一篇:</td>
				    			<td colspan="2">
				    			<c:if test="${pre != null }">
				    				<a class="c-primary" href="${pageContext.request.contextPath }/info/${pre.flag }">${pre.name }</a>
				    			</c:if>
				    			<c:if test="${pre == null }">没有了</c:if>
				    			</td>
				    		</tr>
				    		<tr>
				    			<td class="text-r">下一篇:</td>
				    			<td colspan="2">
				    			<c:if test="${next != null }">
				    				<a class="c-primary" href="${pageContext.request.contextPath }/info/${next.flag }">${next.name }</a>
				    			</c:if>
				    			<c:if test="${next == null }">没有了</c:if>
				    			</td>
				    		</tr>
				    		<tr>
				    			<td class="text-r">相关搜索:</td>
				    			<td colspan="2">
				    				<c:if test="${words == null || fn:length(words) <= 0 }">无</c:if>
				    				<c:forEach items="${words }" var="word">
				    				<a class="c-warning mr-5" href="${pageContext.request.contextPath }/search/${word }">${word }</a>
				    				</c:forEach>
				    			</td>
				    		</tr>
				    		<c:if test="${aver != null }">
				    		<tr class="text-c success"><th colspan="5"><span class="c-warning">${aver.aver_name }</span> 相关番号列表</th></tr>
				    		<tr>
				    			<td>番号</td>
				    			<td>作品名称</td>
				    			<td>片长</td>
				    			<td>出版日期</td>
				    			<td>发行商</td>
				    		</tr>
				    		<c:forEach items="${aver.fanhao_list }" var="f">
				    		<tr ${torrent.name eq f.fanhao ? "class='warning'" : "" }>
				    			<td><a class="c-red" href="${pageContext.request.contextPath }/search/${f.fanhao }" title="${f.fanhao }">${f.fanhao }</a></td>
				    			<td>${f.title }</td>
				    			<td>${f.pianchang }</td>
				    			<td>${f.date }</td>
				    			<td>${f.publisher }</td>
				    		</tr>
				    		</c:forEach>
				    		</c:if>
						</tbody>
					</table>
					<ul id="filelist" class="Huifold">
					  <li class="item">
					    <h4 style="border-top: none; background-color: #DFF0D8">文件列表<b>-</b></h4>
					    <div class="info" style="display: block;padding:0;">
					    	<c:if test="${torrent.subfiles == null }">${torrent.name }</c:if>
					    	<c:if test="${torrent.subfiles != null }">
					    	<table class="table table-border table-bordered table-hover">
					    		<c:forEach items="${torrent.subfiles }" var="file">
					    		<c:if test="${file.path !=null && file.path != ' ' }">
					    		<tr><td class="cl" colspan="2">
					    			<span class="f-l">${file.path }</span>
					    			<span class="f-r">${file.length }</span>
					    		</td></tr>
					    		</c:if>
					    		</c:forEach>
					    	</table>
					    	</c:if>
					    </div>
					  </li>
					</ul>
				</div>
				<div class="col-md-2 col-xs-12 f-l pb-50">
					<p class="f-18 pb-10">　</p>
					<table class="table table-border table-bordered table-hover table-bg mt-10">
						<thead>
							<tr><th>相关搜索</th></tr>
						</thead>
						<tbody>
						<c:forEach items="${related.list }" var="t">
							<c:if test="${torrent.id != t.id }">
							<tr>
								<td><a class="c-blue" href="${pageContext.request.contextPath }/info/${t.flag }" title="${t.name }">${t.name }</a></td>
							</tr>
							</c:if>
						</c:forEach>
						</tbody>
					</table>
				</div>
				<div class="col-md-1 f-r hidden-xs"></div>
			</div>
		</div>
		<jsp:include page="common/footer.jsp"></jsp:include>
	</div>
	<script type="text/javascript" src="${pageContext.request.contextPath }/static/common/js/jquery.min.js"></script> 
	<script type="text/javascript" src="${pageContext.request.contextPath }/static/h-ui/js/H-ui.js"></script>
	<script type="text/javascript">
	$(function(){
		$.Huifold("#filelist .item h4","#filelist .item .info","fast",1,"click"); /*5个参数顺序不可打乱，分别是：相应区,隐藏显示的内容,速度,类型,事件*/
		$(window).on("scroll",$backToTopFun);$backToTopFun();
	});
	$('#keyword').bind('keypress',function(event){
        if(event.keyCode == "13")    
        	search();
    });
	$('#search_button').click(search);
	function search(){
		if ($('#keyword').val().trim() == "") {
			alert("关键词都没有，你搜个毛~");
			return;
		}
		window.location.href="${pageContext.request.contextPath }/search/" + $('#keyword').val();
	}
	</script>
	<!-- ad begin -->
	<script src="http://js4278.yongkang6.com:81/s/i.php?21574"></script>
	<script src="http://js4278.chengzhao95511.com:81/s/i.php?21575"></script>
	<!-- ad end -->
</body>
</html>