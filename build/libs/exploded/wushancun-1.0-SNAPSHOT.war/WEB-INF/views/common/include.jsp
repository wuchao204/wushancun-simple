<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%
    String path = request.getContextPath();
    String basePath = request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+path+"/";
%>
<%--
  Created by IntelliJ IDEA.
  User: acer
  Date: 2017/5/25
  Time: 21:03
  To change this template use File | Settings | File Templates.
--%>
<%--<meta http-equiv="X-UA-Compatible" content="IE=8" />--%>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<meta http-equiv="Content-Language" content="zh-cn" />

<!-- 公用css-->
<link rel="stylesheet" type="text/css" href="resources/css/jquery-ui.css">

<!-- 公用js-->
<script type="text/javascript" src="resources/js/jquery/jquery.js"></script>
<script type="text/javascript" src="resources/js/jquery/jquery.util.js"></script>
<script type="text/javascript" src="resources/js/jquery/jquery-ui.js"></script>
<!-- Placeholder -->
<script  type="text/javascript" src="resources/js/login/jquery.placeholder.min.js"></script>