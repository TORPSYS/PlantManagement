<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Torp Systems - Login</title>
  <link rel="stylesheet" type="text/css" href="css/index.css">
  <link rel="stylesheet" type="text/css" href="css/createuser_plugin.css">
   <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css">
  <link rel="stylesheet" type="text/css" href="css/ui.jqgrid.4.6.0.css">
  <link rel="stylesheet" type="text/css" href="css/torp-theme.css">
  
</head>
<body>
  		<div class="body"></div>
  		<div style="float:left;width:50%;">
			<div style="float:left;width:50%;">
				<span>Simplified Mapping and Resource Ingestion Tool</span>
			</div>
			<div style="float:left;width:50%;">
				<spa>ALWAYS LEARNING</span>
			</div>
		</div>
		<div class="grad"></div>
		<%
    	if (request.getParameter("success") != null  && request.getParameter("success").equalsIgnoreCase("f")) {
	    	out.println("<div class='clsRegSuccessMessage'>Invalid Credentials. Please Login with valid credentials.</div>");
    	}
    	if (request.getParameter("success") != null  && request.getParameter("success").equalsIgnoreCase("r")) {
	    	out.println("<div class='clsRegSuccessMessage'>New Password has been sent to your registered mail.</div>");
    	}
    	if (request.getParameter("success") != null  && request.getParameter("success").equalsIgnoreCase("iu")) {
	    	out.println("<div class='clsRegSuccessMessage'>Invalid Username. Please Login with valid credentials.</div>");
    	}
		%>
		
		<div class="header">
			<div>
				<span>TORP</span></br>
				<span>Systems</span></br>
			</div>
		</div>
		<br>
		<form id="idSm_loginForm" action="/torp/ServiceRouter/login" method="post">
			<div class="login">
					<input type="text" placeholder="username" name="loginid"><br>
					<input type="password" placeholder="password" name="pwd"><br>
					<input type="submit" class="clsLogin_SubmitBtn" value="Login">
					<div style="width: 260px;"><span>Need Help?&nbsp;&nbsp;</span><span class="clsSm_ForgotPwd">Forgot Password</span></div>
			</div>
			<div class="clsSm_setAccHldr"></div>
		</form>
		<jsp:include page="externaljsfiles.jsp"></jsp:include>
		<jsp:include page="jsfiles.jsp"></jsp:include>
		<jsp:include page="cssfiles.jsp"></jsp:include>
</body>
</html>