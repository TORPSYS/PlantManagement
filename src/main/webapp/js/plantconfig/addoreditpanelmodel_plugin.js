$.fn.addoreditpanelmodel=function(options)
{
	options=jQuery.extend({type:"add"},options);
	return this.each(function()
	{
		var uniqueId=$.addoreditpanelmodel.getDivuniqueId("idaddoreditpanelmodel_PlgnWrapper_");
		$(".clsaddoreditpanelmodel_divWrapper",this).remove();
		$(this).append($.addoreditpanelmodel.getHtmlContent(uniqueId,options));
		var wrapperJq = $("#"+uniqueId);
		wrapperJq.data("options",options);
		var title =  "Add Panel Model Details";
		if(options.type == "edit")
			title =  "Edit Panel Model Details";
		wrapperJq.dialog({autoOpen:true,modal:true,title:title,width:'700px',closeOnEscape:false,resizable: false,close:function(event, ui){$(this).dialog('close')}});
		$.addoreditpanelmodel.loadAndBindHandlers(uniqueId,wrapperJq);
		if(options.type == "edit")
			$.addoreditpanelmodel.populateData(wrapperJq,options.extradata);
	});
}

$.addoreditpanelmodel =
{
		NextId:0,
		getDivuniqueId:function(idPrefix)
		{
			return idPrefix+$.addoreditpanelmodel.NextId++;
		},
		getHtmlContent:function(uniqueId,options)
		{
			var htmlContent = "";
			htmlContent+='<form class="clsaddoreditpanelmodel_divWrapper" id='+uniqueId+' action="/torp/ServiceRouter/addeditordeletepanelmodel">';	
			var title =  "Add Panel Model Details";
			if(options.type == "edit")
			{
				title =  "Edit Panel Model Details";
				htmlContent += "<input type='hidden' name='mode' value='update'/>";
				htmlContent += "<input type='hidden' name='pwrpanelmodelid' value='"+options.extradata.pwrpanelmodelid+"'/>";
			}
			else
				htmlContent += "<input type='hidden' name='mode' value='add'/>";
			htmlContent+="<fieldset><legend>"+title+"</legend>";
			htmlContent+="<div class='clsTemplate_DlgContentHldr'>";
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Panel Make</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsaddoreditpanelmodel_PanelMake cifval_required" name="panelmake"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Panel Model</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsaddoreditpanelmodel_PanelModel cifval_required" name="panelmodel"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Panel Voc</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsaddoreditpanelmodel_Panelvoc cifval_required" name="panelvoc"></span></div>';
				htmlContent+='</div>';
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Panel Vmp</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsaddoreditpanelmodel_Panelvmp cifval_required" name="panelvmp"></span></div>';
				htmlContent+='</div>';
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Panel Imp</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsaddoreditpanelmodel_Panelimp cifval_required" name="panelimp"></span></div>';
				htmlContent+='</div>';
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Panel Pmpp</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsaddoreditpanelmodel_Panelpmpp cifval_required" name="panelpmpp"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_btnHldr"><input type="submit" class="clsaddoreditpanelmodel_SubmitBtn" value="Save"><input type="button" class="clsaddoreditpanelmodel_CancelBtn" value="Cancel"></div>';
				htmlContent+='</div>';
			htmlContent+='</div>';
			htmlContent+='</form>';
			return htmlContent;
		},
		loadAndBindHandlers:function(uniqueId,wrapperJq)
		{
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
				beforeSubmit : $.addoreditpanelmodel.addPanelModelFormRequest,
				success: function(responseText){$.addoreditpanelmodel.addPanelModelFormResponse(responseText,options,wrapperJq)},
				error:  showError,
				dataType : 'json'
			};
			wrapperJq.ajaxForm(formOptions);
			var cacnelBtn = $(".clsaddoreditpanelmodel_CancelBtn",wrapperJq);
			cacnelBtn.unbind('click');
			cacnelBtn.click(function()
			{
				wrapperJq.dialog("close");
			});
			
		},
		addPanelModelFormRequest:function(formData,jqForm,options) 
		{ 	    
			var wrapperJq=$('#'+jqForm.context.id);
			var valid = wrapperJq.cifvalidatefromexternalevent();
		    if(!valid)
		    {
			   return false;
		    }
		},
		addPanelModelFormResponse:function(responseText,options,wrapperJq)
		{
			if (responseText.status == 'ok') 
			{	
				if(options.type=="edit")
					alert("Panel Model updated successfully");
				else
					alert("Panel Model added successfully");
				if(options.callbackfunc!=undefined)
					options.callbackfunc(true);
				wrapperJq.dialog("close");
			} 
			else
			{
				if(options.type=="edit")
					alert("Failed to update Panel Model details");
				else
					alert("Failed to add Panel Model details");
			}
		},
		populateData:function(wrapperJq,extradata)
		{
			$(".clsaddoreditpanelmodel_PanelMake",wrapperJq).val(extradata.panelmake);
			$(".clsaddoreditpanelmodel_PanelModel",wrapperJq).val(extradata.panelmodel);
			$(".clsaddoreditpanelmodel_Panelvoc",wrapperJq).val(extradata.panelvoc);
			$(".clsaddoreditpanelmodel_Panelvmp",wrapperJq).val(extradata.panelvmp);
			$(".clsaddoreditpanelmodel_Panelimp",wrapperJq).val(extradata.panelimp);
			$(".clsaddoreditpanelmodel_Panelpmpp",wrapperJq).val(extradata.panelpmpp); 
		}


}




