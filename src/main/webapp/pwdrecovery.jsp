<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Torp Systems - Recover password</title>
  <link rel="stylesheet" type="text/css" href="css/index.css">
  
</head>
<body>
  		<div class="body"></div>
		<div class="grad"></div>
		<%
	    if (request.getParameter("success") != null  && request.getParameter("success").equalsIgnoreCase("iu")) {
	    	out.println("<div class='clsRegSuccessMessage'>Invalid User Name. Please Enter Valid User Name.</div>");
	    }
		%>
		<div class="header">
			<div>
				<span>TORP</span></br>
				<span>Systems</span></br>
			</div>
		</div>
		<br>
		<form id="idPm_pwdRecoverForm" action="/torp/ServiceRouter/resetpassword" method="post">
			<div class="login">
					<input type="text" placeholder="username" name="loginid"><br>
					<input type="submit" class="clsRecover_PwdBtn" value="Recover Password">
					<div style="width: 260px;"><span>&nbsp;&nbsp;</span><span class="clsPm_Login">Back to Login</span></div>
			</div>
		</form>
		<jsp:include page="externaljsfiles.jsp"></jsp:include>
		<script type="text/javascript" src="js/recoverpwd.js"></script>
</body>
</html>