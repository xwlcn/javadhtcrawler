<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE HTML>
<html>
<head>
<jsp:include page="common/include.jsp"></jsp:include>
<title>出错啦 ！ - 搜磁力 - 最好用的BT磁力搜索引擎</title>
</head>
<body>
<jsp:include page="common/header.jsp"></jsp:include>
<section class="container-fluid page-404 minWP text-c">
  <p class="error-title"><i class="Hui-iconfont va-m" style="font-size:80px">&#xe688;</i><span class="va-m"> 404</span></p>
  <p class="error-description">不好意思，您访问的页面不存在~</p>
  <p class="error-info">您可以：<a href="javascript:;" onclick="history.go(-1)" class="c-primary">&lt; 返回上一页</a><span class="ml-20">|</span><a href="${pageContext.request.contextPath }/" class="c-primary ml-20">去首页 &gt;</a></p>
</section>
</body>
</html>