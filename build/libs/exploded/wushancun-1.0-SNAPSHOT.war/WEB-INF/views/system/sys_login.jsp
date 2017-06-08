<%--
  Created by IntelliJ IDEA.
  User: lucky
  Date: 2017/6/8
  Time: 13:32
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>
    <title>后台管理系统——登录</title>
    <%@include file="../common/include.jsp"%>
    <link rel="stylesheet" type="text/css" href="resources/css/login/bootstrap.min.css">
    <link rel="stylesheet" type="text/css" href="resources/css/login/animate.css">
    <link rel="stylesheet" type="text/css" href="resources/css/login/style.css">
   <!-- Modernizr JS -->
    <script  type="text/javascript" src="resources/js/login/modernizr-2.6.2.min.js"></script>
</head>
<body>
    <div class="row">
        <div class="col-md-4 col-md-push-8">
            <!-- Start Sign In Form -->
            <form action="#" class="fh5co-form animate-box" data-animate-effect="fadeInRight">
                <h2>登录</h2>
                <div class="form-group">
                    <label for="username" class="sr-only">用户名</label>
                    <input type="text" class="form-control" id="username" placeholder="Username" autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="password" class="sr-only">密码</label>
                    <input type="password" class="form-control" id="password" placeholder="Password" autocomplete="off">
                </div>
                <div class="form-group">
                    <label for="remember"><input type="checkbox" id="remember"> Remember Me</label>
                </div>

                <div class="form-group">
                    <input type="submit" value="登录" class="btn btn-primary">
                </div>
            </form>
            <!-- END Sign In Form -->
        </div>
    </div>
    </div>
    <!-- Bootstrap -->
    <script  type="text/javascript" src="resources/js/login/bootstrap.min.js"></script>
    <!-- Waypoints -->
    <script  type="text/javascript" src="resources/js/login/jquery.waypoints.min.js"></script>
    <!-- Main JS -->
    <script  type="text/javascript" src="resources/js/login/main.js"></script>

</body>
</html>
