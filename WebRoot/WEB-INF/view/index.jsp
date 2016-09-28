<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<!DOCTYPE html>
<html>
<head>
<jsp:include page="common/include.jsp"></jsp:include>
<meta name="keywords" content="搜磁力, 磁力搜索, 番号搜索, 磁力链接, 磁力搜, 磁力链, 磁力链接搜索, so-cili, BT磁力电影资源" />
<meta name="description" content="BT磁力链接搜索引擎so-cili.com是一个实现了BT协议的DHT网络爬虫BT资源搜索网站，索引了全球最新最热门的BT种子信息和磁力链接，提供磁力链接搜索、BT搜索、种子搜索等强大功能。" />
<title>So-Cili - 搜磁力 - 最好用的BT磁力搜索引擎</title>
</head>
<body>
	<jsp:include page="common/header.jsp"></jsp:include>
	<div class="text-c" style="height: 95%">
		<div class="first-content">
			<div class="wrapper">
				<div class="container mt-50 cl">
					<a href="${pageContext.request.contextPath }">
						<img class="text-c mt-50 mb-50" src="${pageContext.request.contextPath }/static/images/banner.png" alt="So-Cili.COM - 搜磁力">
					</a>
					<div class="col-md-8 col-md-offset-2">
						<input type="text" placeholder="搜索那么多，不如搜磁力！" class="input-text size-L" id="keyword" autocomplete="off" style="width:80%"><button class="btn btn-primary size-L" id="search_button">搜索</button>
					</div>
				</div>
				<div class="container cl">
					<div class="row mt-40">
						<span class="label label-warning radius">热门搜索:</span>
						<a class="label label-success radius" href="${pageContext.request.contextPath }/search/谍影重重5">谍影重重5</a>
						<a class="label label-success radius" href="${pageContext.request.contextPath }/search/使徒行者">使徒行者</a>
						<a class="label label-success radius" href="${pageContext.request.contextPath }/search/惊天魔盗团2">惊天魔盗团2</a>
						<a class="label label-success radius" href="${pageContext.request.contextPath }/search/三人行">三人行</a>
						<a class="label label-success radius" href="${pageContext.request.contextPath }/search/犯罪家族">犯罪家族</a>
						<a class="label label-success radius" href="${pageContext.request.contextPath }/search/乌龙特派员">乌龙特派员</a>
						<a class="label label-success radius" href="${pageContext.request.contextPath }/search/234说爱你">234说爱你</a>
						<a class="label label-success radius" href="${pageContext.request.contextPath }/search/东柱">东柱</a>
						<a class="label label-success radius" href="${pageContext.request.contextPath }/search/魔兽">魔兽</a>
						<a class="label label-success radius" href="${pageContext.request.contextPath }/search/老笠">老笠</a>
					</div>
				</div>
			</div>
		</div>
		<div class="second-content mt-20 mb-40 cl">
			<div class="container tags">
				<div class="row pb-20 f-18">共收录 <strong class="c-danger">${total }</strong> 条记录</div>
				<table class="table table-border table-bg col-md-8 col-md-offset-2">
					<thead>
						<tr>
							<th class="text-c" colspan="2">Top50最近入库</th>
						</tr>
					</thead>
					<tbody>
					<c:forEach items="${torrents }" var="torrent">
					<c:if test="${torrent.flag != null}">
						<tr class="cl" style="border-bottom: 1px solid #ddd;">
							<td class="col-md-10" style="border: none">
							<a class="f-l" href="${pageContext.request.contextPath }/info/${torrent.flag }" title="${torrent.name }" target="_blank">${torrent.name }</a>
							</td>
							<td class="col-md-2 hidden-xs" style="border: none"><span class="label label-success f-r"><fmt:formatDate value="${torrent.find_date }" pattern="yyyy-MM-dd HH:mm:ss"/></span></td>
						</tr>
					</c:if>
					</c:forEach>
					</tbody>
				</table>
			</div>
		</div>
	</div>
	<jsp:include page="common/footer.jsp"></jsp:include>
	<script type="text/javascript" src="${pageContext.request.contextPath }/static/common/js/jquery.min.js"></script> 
	<script type="text/javascript" src="${pageContext.request.contextPath }/static/h-ui/js/H-ui.js"></script>
	<script type="text/javascript">
		$(function(){$(window).on("scroll",$backToTopFun);$backToTopFun();});
		$('#keyword').keyup(function(){
			$('#search-form').attr('action', '${pageContext.request.contextPath }/search/' + $('#keyword').val());
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
	<!-- ad end -->
</body>
</html>