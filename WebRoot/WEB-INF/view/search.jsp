<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="common/include.jsp"></jsp:include>
<meta name="keywords" content="搜磁力, 磁力搜索, 磁力链接, 番号搜索, 磁力搜, 磁力链, 磁力链接搜索, so-cili, BT磁力电影资源" />
<meta name="description" content="${keyword }相关磁力链接列表, torrent,BT种子下载,磁力链接和迅雷_百度云播放资源。" />
<style type="text/css">
p {margin-bottom: 0;}
</style>
<title>${keyword } - 搜磁力 - 最新最热磁力搜索引擎</title>
</head>
<body>
	<jsp:include page="common/header.jsp"></jsp:include>
	<div class="index-content">
		<div style="height: 90%">
			<div class="first-content">
				<div class="container-fluid pb-10 mt-10 cl search-header">
					<a class="hidden-sm hidden-xs text-r f-l" href="${pageContext.request.contextPath }/">
						<img style="width:160px" src="${pageContext.request.contextPath }/static/images/banner.png" alt="So-Cili.COM - 搜磁力">
					</a>
					<div class="col-md-6 col-xs-12 f-l">
						<div class="col-xs-10" style="padding: 0">
							<input type="text" placeholder="搜索那么多，不如搜磁力！" class="input-text size-L" id="keyword" value="${keyword }">
						</div>
						<div class="col-xs-2" style="padding: 0">
							<button class="btn btn-primary size-L col-md-2" id="search_button">搜索</button>
						</div>
					</div>
				</div>
				<div class="container-fluid cl">
					<div class="col-md-1 f-l hidden-xs"></div>
					<ul class="col-md-10 col-xs-12 f-l">
						<li class="mb-20">
							<input type="hidden" id="pageCount" value="${results == null ? 0 : results.pageCount }">
							<h4 class="">找到约 <span class="badge badge-warning radius">${results == null ? 0 : results.total }</span> 条结果（用时 0.01 秒）</h4>
							<c:if test="${results != null }">
							<div class="line"></div>
							</c:if>
						</li>
						<c:forEach items="${results.list }" var="torrent">
						<li class="mb-20">
							<a class="c-blue f-18" href="${pageContext.request.contextPath }/info/${torrent.flag }" target="_blank">
								${torrent.name }
							</a>
							<c:if test="${torrent.subfiles != null }">
							<div class="f-12">
								<c:forEach begin="0" end="2" items="${torrent.subfiles }" var="file">
									<p class="c-666">${file.path }</p>
								</c:forEach>
								<c:if test="${fn:length(torrent.subfiles) > 3 }">
									<p class="c-666">...</p>
								</c:if>
							</div>
							</c:if>
							<div class="f-14 c-green">
								文件类型：${torrent.type }
								<span class="pipe">|</span>
								发现时间：<fmt:formatDate value="${torrent.find_date }" pattern="yyyy-MM-dd HH:mm:ss"/>
								<span class="pipe">|</span>
								大小：${torrent.sSize }
								<span class="pipe">|</span>
								文件数量：${torrent.subfiles == null ? 1 : fn:length(torrent.subfiles) }
								<span class="pipe">|</span>
								文件热度：${torrent.hot } ℃
							</div>
						</li>
						</c:forEach>
						<li class="mb-20" id="page"></li>
					</ul>
					<div class="col-md-1 f-r hidden-xs"></div>
				</div>
			</div>
		</div>
		<jsp:include page="common/footer.jsp"></jsp:include>
	</div>
	<script type="text/javascript" src="${pageContext.request.contextPath }/static/common/js/jquery.min.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath }/static/h-ui/js/H-ui.js"></script>
	<script type="text/javascript" src="${pageContext.request.contextPath }/static/h-ui/js/laypage/1.2/laypage.js"></script>
	<script type="text/javascript">
	$(function(){$(window).on("scroll",$backToTopFun);$backToTopFun();});
	laypage({
		
		cont: 'page',
	    pages: ${results == null ? 1 : results.pageCount }, //可以叫服务端把总页数放在某一个隐藏域，再获取。假设我们获取到的是18
	    skip: true, //是否开启跳页
	    skin: 'molv',
	    groups: 10, //连续显示分页数,
	    curr: function(){ //通过url获取当前页，也可以同上（pages）方式获取
	        return ${results == null || results.curPage <= 0 ? 1 : results.curPage};
	    }(), 
	    jump: function(e, first){ //触发分页后的回调
	        if(!first){ //一定要加此判断，否则初始时会无限刷新
	            location.href = '${pageContext.request.contextPath }/search/${keyword }/'+e.curr;
	        }
	    }
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
	<!-- ad end -->
</body>
</html>