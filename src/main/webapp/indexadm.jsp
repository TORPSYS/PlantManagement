<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>EduRite Master - Login</title>
  <link rel="stylesheet" type="text/css" href="css/index.css">
  <link rel="stylesheet" type="text/css" href="css/createuser_plugin.css">
  
</head>
<body>
  		<div class="body"></div>
		<div class="grad"></div>
		<%
	    	if (request.getParameter("success") != null  && request.getParameter("success").equalsIgnoreCase("f")) {
		    	out.println("<div class='clsRegSuccessMessage'>Invalid Credentials. Please Login with valid credentials.</div>");
	    	}
			if (request.getParameter("success") != null  && request.getParameter("success").equalsIgnoreCase("pu")) {
		    	out.println("<div class='clsRegSuccessMessage'>Password Updated. Please Login with new credentials.</div>");
	    	}
		%>
		<div class="header">
			<div>
				<span>Pearson</span></br>
				<span>Simplified Mapping and</span></br>
				<span>Resource Ingestion Tool</span>
			</div>
		</div>
		<br>
		<form id="idSm_loginForm" action="/sm/ServiceRouter/adminlogin" method="post">
			<div class="login">
					<input type="text" placeholder="admin username" name="login_name"><br>
					<input type="password" placeholder="password" name="pwd"><br>
					<input type="submit" class="clsLogin_SubmitBtn" value="Login">
			</div>
		</form>
		<jsp:include page="externaljsfiles.jsp"></jsp:include>
		<jsp:include page="jsfiles.jsp"></jsp:include>
		<jsp:include page="cssfiles.jsp"></jsp:include>
</body>
</html>