$.fn.addoreditpanels=function(options)
{
	options=jQuery.extend({type:"add"},options);
	return this.each(function()
	{
		var uniqueId=$.addoreditpanels.getDivuniqueId("idAddOrEditPanels_PlgnWrapper_");
		$(".clsAddOrEditPanels_divWrapper",this).remove();
		$(this).append($.addoreditpanels.getHtmlContent(uniqueId,options));
		var wrapperJq = $("#"+uniqueId);
		wrapperJq.data("options",options);
		var title =  "Add Panels Details";
		if(options.type == "edit")
			title =  "Edit Panels Details";
		wrapperJq.dialog({autoOpen:true,modal:true,title:title,width:'700px',closeOnEscape:false,resizable: false,close:function(event, ui){$(this).dialog('close')}});
		$.addoreditpanels.loadAndBindHandlers(uniqueId,wrapperJq);
		if(options.type == "edit")
			$.addoreditpanels.populateData(wrapperJq,options.extradata);
	});
}

$.addoreditpanels =
{
		NextId:0,
		getDivuniqueId:function(idPrefix)
		{
			return idPrefix+$.addoreditpanels.NextId++;
		},
		getHtmlContent:function(uniqueId,options)
		{
			var htmlContent = "";
			htmlContent+='<form class="clsAddOrEditPanels_divWrapper" id='+uniqueId+' action="/torp/ServiceRouter/addeditordeletepanel">';	
			var title =  "Add Panels Details";
			if(options.type == "edit")
			{
				title =  "Edit Panels Details";
				htmlContent += "<input type='hidden' name='mode' value='update'/>";
				htmlContent += "<input type='hidden' name='pwrpanelid' value='"+options.extradata.pwrpanelid+"'/>";
			}
			else
				htmlContent += "<input type='hidden' name='mode' value='add'/>";
			htmlContent+="<fieldset><legend>"+title+"</legend>";
			htmlContent+="<div class='clsTemplate_DlgContentHldr'>";
			
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Panel Model</div><div style="position:relative;float:left;"><span><select class="clsAddOrEditPanel_PanelModel" name="panelmodelid"></select><button style="background:url(/ciflinksim/css/images/add.png) no-repeat;border:none;width:16px;position: relative;width: 20px;height: 20px;top: 6px;left: 5px;" class="clsAddOrEditPanel_AddPanelModel"></button></span></div>';
				htmlContent+='</div>';
		
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Panel Voltage</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsAddOrEditPanel_PnlVoltg cifval_required" name="panelvoltage"></span></div>';
				htmlContent+='</div>';
			
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Panel Current</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsAddOrEditPanel_PnlCurr cifval_required" name="panelcurrent"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Panel Capacity</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsAddOrEditPanel_PnlCap cifval_required" name="panelcapacity"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Strings</div><div style="position:relative;float:left;"><span><select class="clsAddOrEditPanel_String" name="pwrstringid"></select><button style="background:url(/ciflinksim/css/images/add.png) no-repeat;border:none;width:16px;position: relative;width: 20px;height: 20px;top: 6px;left: 5px;" class="clsAddOrEditPanel_AddStrings"></button></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_btnHldr"><input type="submit" class="clsAddOrEditPanels_SubmitBtn" value="Save"><input type="button" class="clsAddOrEditPanels_CancelBtn" value="Cancel"></div>';
				htmlContent+='</div>';
			htmlContent+='</div>';
			htmlContent+='</form>';
			return htmlContent;
		},
		loadAndBindHandlers:function(uniqueId,wrapperJq)
		{
			var addPanelModel = $(".clsAddOrEditPanel_AddPanelModel",wrapperJq);
			var addPanelModelSel=$(".clsAddOrEditPanel_PanelModel",wrapperJq);
			var addStrings = $(".clsAddOrEditPanel_AddStrings",wrapperJq);
			var addStringsSel = $(".clsAddOrEditPanel_String",wrapperJq);
			addPanelModel.data("addPanelModelSel",addPanelModelSel);
			addPanelModel.unbind('click');
			addPanelModel.click(function(event)
			{
				 event.preventDefault();
				 var addPanelModelSel= $(this).data("addPanelModelSel");
				 var options=
				 {
						callbackfunc:function(status)
						{
							if(status)
								addPanelModelSel.html($.addoreditpanels.getPanelModelsHtml());
						}
				 };
				$(this).addoreditpanelmodel(options);
			});
			
			addStrings.data("addStringsSel",addStringsSel);
			addStrings.unbind('click');
			addStrings.click(function(event)
			{
				 event.preventDefault();
				 var addStringsSel= $(this).data("addStringsSel");
				 var options=
				 {
						callbackfunc:function(status)
						{
							if(status)
								plantSel.html($.addoreditpanels.getStringsHtml());
						}
				 };
				$(this).addoreditstring(options);
			});
			
			addStringsSel.html($.addoreditpanels.getStringsHtml());
			addPanelModelSel.html($.addoreditpanels.getPanelModelsHtml());
			
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
				beforeSubmit : $.addoreditpanels.addPanelFormRequest,
				success: function(responseText){$.addoreditpanels.addPanelFormResponse(responseText,options,wrapperJq)},
				error:  showError,
				dataType : 'json'
			};
			wrapperJq.ajaxForm(formOptions);
			var cacnelBtn = $(".clsAddOrEditPanels_CancelBtn",wrapperJq);
			cacnelBtn.unbind('click');
			cacnelBtn.click(function()
			{
				wrapperJq.dialog("close");
			});
			
		},
		getStringsHtml:function()
		{
			var list="<option value='0'>None</option>";
		  	 $.ajax(
		  	 {
		  		url:"/torp/ServiceRouter/getstrings",
		  		dataType:"json",
		  		async:false,
		  		type:'post',
		  		success:function(data,xhr,settings)
		  		{
		  			var id;
		  			var name="";
		  			$.each(data.strings, function(i,strs)
					{
						var id = strs.pwrstringid;
						var desc = strs.stringname + " - " +strs.stringcode;
						list +='<option value="' +id + '">' + desc + '</option>';
					});
		  		},
		  		error:function(xhr,status,error){},
		  		complete:function(xhr,status){}
		  	});
		  	return list; 
		},
		getPanelModelsHtml:function()
		{
			var list="<option value='0'>None</option>";
		  	 $.ajax(
		  	 {
		  		url:"/torp/ServiceRouter/getpanelmodels",
		  		dataType:"json",
		  		async:false,
		  		type:'post',
		  		success:function(data,xhr,settings)
		  		{
		  			var id;
		  			var name="";
		  			$.each(data.panelmodels, function(i,panelmodel)
					{
						var id = panelmodel.pwrpanelmodelid;
						var desc = panelmodel.panelmake + " - " +panelmodel.panelmodel;
						list +='<option value="' +id + '">' + desc + '</option>';
					});
		  		},
		  		error:function(xhr,status,error){},
		  		complete:function(xhr,status){}
		  	});
		  	return list; 
		},
		addPanelFormRequest:function(formData,jqForm,options) 
		{ 	    
			var wrapperJq=$('#'+jqForm.context.id);
			var valid = wrapperJq.cifvalidatefromexternalevent();
		    if(!valid)
		    {
			   return false;
		    }
		},
		addPanelFormResponse:function(responseText,options,wrapperJq)
		{
			if (responseText.status == 'ok') 
			{	
				if(options.type=="edit")
					alert("Panels updated successfully");
				else
					alert("Panels added successfully");
				if(options.callbackfunc!=undefined)
					options.callbackfunc(true);
				wrapperJq.dialog("close");
			} 
			else
			{
				if(options.type=="edit")
					alert("Failed to update Panels details");
				else
					alert("Failed to add Panels details");
			}
		},
		populateData:function(wrapperJq,extradata)
		{
			var stringSel = $(".clsAddOrEditPanel_String",wrapperJq);
			var panelModelSel = $(".clsAddOrEditPanel_PanelModel",wrapperJq);
			$(".clsAddOrEditPanel_PnlVoltg",wrapperJq).val(extradata.panelvoltage);
			$(".clsAddOrEditPanel_PnlCurr",wrapperJq).val(extradata.panelcurrent);
			$(".clsAddOrEditPanel_PnlCap",wrapperJq).val(extradata.panelcapacity);
			stringSel.val(extradata.pwrstringid);
			panelModelSel.val(extradata.panelmodelid);
		}
}





