$(document).ready(function()
{
	var loginOptions=
	{	
		beforeSubmit : TorpLogin_LoginRequest,
		success: TorpLogin_LoginResponse,
		async: true,
		error:  TorpLogin_Error,
		dataType : 'json'
	};
	$("#idSm_loginForm").ajaxForm(loginOptions);
	
	$(".clsSm_ForgotPwd").unbind('click');
	$(".clsSm_ForgotPwd").click(function()
	{
		window.location="./pwdrecovery.jsp";
	});
	
});

function TorpLogin_LoginRequest(formData, jqForm, options) 
{ 	
	
}

function TorpLogin_LoginResponse(responseText)
{
	if (responseText.loggedin  == 'true' && responseText.issysadmin == "y")
	{
		$(".login").remove();
		$(".header").remove();
		$(".clsSm_setAccHldr").setaccount();
	}
	else if(responseText.loggedin  == 'true')
		window.location="./torp.jsp";
	else if (responseText.loggedin  == 'false') 
		window.location="./index.jsp?success=f";
	
}

function TorpLogin_Error()
{
	alert("login error");
}
