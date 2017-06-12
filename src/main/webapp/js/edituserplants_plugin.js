$.fn.edituserplants=function(options)
{
	options=jQuery.extend({type:"add"},options);
	return this.each(function()
	{
		var uniqueId=$.edituserplants.getDivuniqueId("idEditUserPlant_PlgnWrapper_");
		$(".clsEditUserPlant_divWrapper",this).remove();
		$(this).append($.edituserplants.getHtmlContent(uniqueId,options));
		var wrapperJq = $("#"+uniqueId);
		wrapperJq.data("options",options);
		var title =  "Edit User Plants";
		wrapperJq.dialog({autoOpen:true,modal:true,title:title,width:'900px',closeOnEscape:false,resizable: false,close:function(event, ui){$(this).dialog('close');}});
		$.edituserplants.loadAndBindHandlers(uniqueId,wrapperJq);
	});
}

$.edituserplants =
{
		NextId:0,
		getDivuniqueId:function(idPrefix)
		{
			return idPrefix+$.edituserplants.NextId++;
		},
		getHtmlContent:function(uniqueId,options)
		{
			var htmlContent = "";
			htmlContent+='<form class="clsEditUserPlant_divWrapper" id='+uniqueId+' action="/torp/ServiceRouter/updateuserplants">';			
			htmlContent+="<input type='hidden' name='userid' value='"+options.userid+"'>";
			htmlContent+="<fieldset><legend>User Plants</legend>";
			htmlContent+="<div class='clsEditUserPlant_DlgContentHldr'>";
			
				htmlContent+='<div class="clsEditUserPlant_divPlantHldr"></div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_btnHldr" style="margin-top:10px;"><input type="submit" value="Save" class="filter_divSearchBttn"><input type="button" class="clsEditUserPlant_CancelBtn filter_divClearBttn" value="Cancel"></div>';
				htmlContent+='</form>';
				return htmlContent;
		},
		loadAndBindHandlers:function(uniqueId,wrapperJq)
		{
			var options = wrapperJq.data("options");
			var plantHldr = $(".clsEditUserPlant_divPlantHldr",wrapperJq);
			var options = wrapperJq.data("options");
			options.userfilter="y";
			plantHldr.html($.edituserplants.getPlantList(options));
			var optionsval=
			{
	 			onsubmit:true,onchange:true,
				callback:function(valid)
				{
					if(!valid)
					{
						return;
					}
				}
			};
			wrapperJq.cifvalidate(optionsval);
			wrapperJq.data("val","User Plants");
			var formOptions=
			{	
				beforeSubmit : $.edituserplants.addFormRequest,
				success: function(responseText){$.edituserplants.addFormResponse(responseText,options,wrapperJq)},
				error:  showError,
				dataType : 'json'
			};
			wrapperJq.ajaxForm(formOptions);
			var cacnelBtn = $(".clsEditUserPlant_CancelBtn",wrapperJq);
			cacnelBtn.unbind('click');
			cacnelBtn.click(function()
			{
				wrapperJq.dialog('close');
			});
			
			var chkAllSel = $(".clsEditUserPlant_chkAll",wrapperJq);
			chkAllSel.unbind('click');
			chkAllSel.click(function()
			{
				if(chkAllSel.is(":checked"))
					$(".clsEditUserPlant_cbox",wrapperJq).prop("checked",true);
				else
					$(".clsEditUserPlant_cbox",wrapperJq).prop("checked",false);
			});
		},
		addFormRequest:function(formData,jqForm,options) 
		{ 	    
			var wrapperJq=$(jqForm);
			var pgOpts = wrapperJq.data("options");
			var valid = wrapperJq.cifvalidatefromexternalevent();
			var vals = [];
			$('.clsEditUserPlant_cbox:checked',wrapperJq).each(function() {
				vals.push($(this).val());
			});
			if(vals.length > 0)
				formData.push({name:"userplants",value:"{"+vals.toString()+"}"});
		    if(!valid)
		    {
			   return false;
		    }
		},
		addFormResponse:function(responseText,options,wrapperJq)
		{
			if (responseText.status == 'ok') 
			{	
				showmsg(wrapperJq.data("val")+" Updated Successfully");
				if(options.callbackfunc!=undefined)
				{
					options.callbackfunc(true);
				}
				wrapperJq.dialog('close');
			} 
			else
			{
				alert("Failed to Update User Plants");
			}
		},
		getPlantList:function(options)
		{
			var list='<div class="clsEditUserPlant_Header" style=" margin-bottom: 8px; "><span class="clsEditUserPlant_span"><input class="clsEditUserPlant_cbox clsEditUserPlant_chkAll" type="checkbox"/></span><span>Plants</span></div>';
		  	 $.ajax(
		  	 {
		  		url:"/torp/ServiceRouter/getplants",
		  		dataType:"json",
		  		async:false,
		  		data:options,
		  		type:'post',
		  		beforeSend:function()
		  		{
		  			
		  		},
		  		success:function(data,xhr,settings)
		  		{
		  			var id;
		  			var name="";
		  			var gids;
		  			if(options.allowedplants != "null")
		  				gids = options.allowedplants.substring(1,options.allowedplants.length-1).split(",");
		  			$.each(data.plants, function(i,val)
					{
						var id = val.pwrplantid;
						var desc = val.pwrplantname;
						var str = "";
						if($.inArray(id+"", gids) != -1)
							str = "checked";
						list +='<div><span class="clsEditUserPlant_span"><input class="clsEditUserPlant_cbox" type="checkbox" value="'+id+'" '+str+'/></span><span style="font-size: larger;">'+desc+'</span></div>';
					});
		  		},
		  		error:function(xhr,status,error){},
		  		complete:function(xhr,status){}
		  	});
		  	return list; 
		}
}









