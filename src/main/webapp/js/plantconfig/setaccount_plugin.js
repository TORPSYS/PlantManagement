$.fn.setaccount=function(options)
{
	options=jQuery.extend({type:"add"},options);
	return this.each(function()
	{
		var uniqueId=$.setaccount.getDivuniqueId("idSetAccount_PlgnWrapper_");
		$(".clsSetAccount_divWrapper",this).remove();
		$(this).append($.setaccount.getHtmlContent(uniqueId,options));
		var wrapperJq = $("#"+uniqueId);
		wrapperJq.data("options",options);
		var title =  "Select Account";
		wrapperJq.dialog({autoOpen:true,modal:true,title:title,width:'700px',closeOnEscape:false,resizable: false,close:function(event, ui){$(this).dialog('close')}});
		$.setaccount.loadAndBindHandlers(uniqueId,wrapperJq);
	});
}

$.setaccount =
{
		NextId:0,
		getDivuniqueId:function(idPrefix)
		{
			return idPrefix+$.setaccount.NextId++;
		},
		getHtmlContent:function(uniqueId,options)
		{
			var htmlContent = "";
			htmlContent+='<form class="clsSetAccount_divWrapper" style="z-index:2;" id='+uniqueId+' action="/torp/ServiceRouter/setaccount">';	
			var title =  "Select Account";
			htmlContent+="<fieldset><legend>"+title+"</legend>";
			htmlContent+="<div class='clsTemplate_DlgContentHldr'>";
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Account</div><div style="position:relative;float:left;"><span><select class="clsSetAccount_Accounts cifval_comboreqd" name="accountid"></select></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_btnHldr"><input type="submit" class="clsSetAccount_SubmitBtn filter_divSearchBttn" value="Select"><input type="button" class="clsSetAccount_CancelBtn filter_divClearBttn" value="Cancel"></div>';
				htmlContent+='</div>';
			htmlContent+='</div>';
			htmlContent+='</form>';
			return htmlContent;
		},
		loadAndBindHandlers:function(uniqueId,wrapperJq)
		{
			var accIdSel = $(".clsSetAccount_Accounts",wrapperJq);
			accIdSel.html($.setaccount.getAccounts());
			var options = wrapperJq.data("options");
			var optionsval=
			{
	 			onsubmit:true,onchange:false,
				callback:function(valid)
				{
					if(!valid)
					{
						return;
					}
				}
			};
			wrapperJq.cifvalidate(optionsval);
			var formOptions=
			{	
				beforeSubmit : $.setaccount.formRequest,
				success: function(responseText){$.setaccount.formResponse(responseText,options,wrapperJq)},
				error:  showError,
				dataType : 'json'
			};
			wrapperJq.ajaxForm(formOptions);
			var cacnelBtn = $(".clsSetAccount_CancelBtn",wrapperJq);
			cacnelBtn.unbind('click');
			cacnelBtn.click(function()
			{
				window.location="./torp.jsp";
			});
			
		},
		formRequest:function(formData,jqForm,options) 
		{ 	    
			var wrapperJq=$('#'+jqForm.context.id);
			var valid = wrapperJq.cifvalidatefromexternalevent();
		    if(!valid)
		    {
			   return false;
		    }
		},
		formResponse:function(responseText,options,wrapperJq)
		{
			window.location="./torp.jsp";
		},
		getAccounts:function()
		{
			var list="<option value='0'>Select Account</option>";
		  	 $.ajax(
		  	 {
		  		url:"/torp/ServiceRouter/getaccounts",
		  		dataType:"json",
		  		async:false,
		  		type:'post',
		  		success:function(data,xhr,settings)
		  		{
		  			var id;
		  			var name="";
		  			$.each(data.accounts, function(i,acc)
					{
						var id = acc.accountid;
						var desc = acc.accountname;
						list +='<option value="' +id + '">' + desc + '</option>';
					});
		  		},
		  		error:function(xhr,status,error){},
		  		complete:function(xhr,status){}
		  	});
		  	return list; 
		}


}




