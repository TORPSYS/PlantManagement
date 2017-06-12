$(document).ready(function()
{
	var pwdRecoverOptions=
	{	
		beforeSubmit : PMLogin_PwdRecoverRequest,
		success: PMLogin_PwdRecoverResponse,
		async: true,
		error:  PMLogin_Error,
		dataType : 'json'
	};
	$("#idPm_pwdRecoverForm").ajaxForm(pwdRecoverOptions);
	$(".clsPm_Login").click(function()
	{
		window.location="./index.jsp";
	});
});

function PMLogin_PwdRecoverRequest(formData, jqForm, options) 
{ 	
	$.blockUI();
}

function PMLogin_PwdRecoverResponse(responseText)
{
	$.unblockUI();
	if (responseText.status  == 'ok') 
		window.location="./index.jsp?success=r";
	else
		window.location="./pwdrecovery.jsp?success=iu";
	
}

function PMLogin_Error()
{
	alert("login error");
}