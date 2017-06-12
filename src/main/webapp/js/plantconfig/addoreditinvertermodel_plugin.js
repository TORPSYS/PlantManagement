$.fn.addoreditinvertermodel=function(options)
{
	options=jQuery.extend({type:"add"},options);
	return this.each(function()
	{
		var uniqueId=$.addoreditinvertermodel.getDivuniqueId("idAddOrEditInverterModel_PlgnWrapper_");
		$(".clsAddOrEditInverterModel_divWrapper",this).remove();
		$(this).append($.addoreditinvertermodel.getHtmlContent(uniqueId,options));
		var wrapperJq = $("#"+uniqueId);
		wrapperJq.data("options",options);
		var title =  "Add Inverter Model Details";
		if(options.type == "edit")
			title =  "Edit Inverter Model Details";
		wrapperJq.dialog({autoOpen:true,modal:true,title:title,width:'700px',closeOnEscape:false,resizable: false,close:function(event, ui){$(this).dialog('close')}});
		$.addoreditinvertermodel.loadAndBindHandlers(uniqueId,wrapperJq);
		if(options.type == "edit")
			$.addoreditinvertermodel.populateData(wrapperJq,options.extradata);
	});
}

$.addoreditinvertermodel =
{
		NextId:0,
		getDivuniqueId:function(idPrefix)
		{
			return idPrefix+$.addoreditinvertermodel.NextId++;
		},
		getHtmlContent:function(uniqueId,options)
		{
			var htmlContent = "";
			htmlContent+='<form class="clsAddOrEditInverterModel_divWrapper" id='+uniqueId+' action="/torp/ServiceRouter/addeditordeleteinvertermodel">';	
			var title =  "Add Inverter Model Details";
			if(options.type == "edit")
			{
				title =  "Edit Inverter Model Details";
				htmlContent += "<input type='hidden' name='mode' value='update'/>";
				htmlContent += "<input type='hidden' name='invertermodelid' value='"+options.extradata.invertermodelid+"'/>";
			}
			else
				htmlContent += "<input type='hidden' name='mode' value='add'/>";
			htmlContent+="<fieldset><legend>"+title+"</legend>";
			htmlContent+="<div class='clsTemplate_DlgContentHldr'>";
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Inverter Make</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsAddOrEditInverterModel_InvMake cifval_required" name="invmake"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Inverter Model</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsAddOrEditInverterModel_InvModel cifval_required" name="invmodel"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Ac Inverter Capacity</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsAddOrEditInverterModel_InvCapcity cifval_required" name="invcapacity"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_btnHldr"><input type="submit" class="clsAddOrEditInverterModel_SubmitBtn" value="Save"><input type="button" class="clsAddOrEditInverterModel_CancelBtn" value="Cancel"></div>';
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
				beforeSubmit : $.addoreditinvertermodel.addInverterModelFormRequest,
				success: function(responseText){$.addoreditinvertermodel.addInverterModelFormResponse(responseText,options,wrapperJq)},
				error:  showError,
				dataType : 'json'
			};
			wrapperJq.ajaxForm(formOptions);
			var cacnelBtn = $(".clsAddOrEditInverterModel_CancelBtn",wrapperJq);
			cacnelBtn.unbind('click');
			cacnelBtn.click(function()
			{
				wrapperJq.dialog("close");
			});
			
		},
		addInverterModelFormRequest:function(formData,jqForm,options) 
		{ 	    
			var wrapperJq=$('#'+jqForm.context.id);
			var valid = wrapperJq.cifvalidatefromexternalevent();
		    if(!valid)
		    {
			   return false;
		    }
		},
		addInverterModelFormResponse:function(responseText,options,wrapperJq)
		{
			if (responseText.status == 'ok') 
			{	
				if(options.type=="edit")
					alert("Inverter Model updated successfully");
				else
					alert("Inverter Model added successfully");
				if(options.callbackfunc!=undefined)
					options.callbackfunc(true);
				wrapperJq.dialog("close");
			} 
			else
			{
				if(options.type=="edit")
					alert("Failed to update Inverter Model details");
				else
					alert("Failed to add Inverter Model details");
			}
		},
		populateData:function(wrapperJq,extradata)
		{
			$(".clsAddOrEditInverterModel_InvMake",wrapperJq).val(extradata.invmake);
			$(".clsAddOrEditInverterModel_InvModel",wrapperJq).val(extradata.invmodel);
			$(".clsAddOrEditInverterModel_InvCapcity",wrapperJq).val(extradata.invcapacity);
		}


}




