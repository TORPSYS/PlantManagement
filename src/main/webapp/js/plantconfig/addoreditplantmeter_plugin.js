$.fn.adoreditplantmeter=function(options)
{
	options=jQuery.extend({type:"add"},options);
	return this.each(function()
	{
		var uniqueId=$.adoreditplantmeter.getDivuniqueId("idAddOrEditPlantMeter_PlgnWrapper_");
		$(".clsAddOrEditPlantMeter_divWrapper",this).remove();
		$(this).append($.adoreditplantmeter.getHtmlContent(uniqueId,options));
		var wrapperJq = $("#"+uniqueId);
		wrapperJq.data("options",options);
		var title =  "Add Plant Meter Details";
		if(options.type == "edit")
			title =  "Edit Plant Meter Details";
		wrapperJq.dialog({autoOpen:true,modal:true,title:title,width:'700px',closeOnEscape:false,resizable: false,close:function(event, ui){$(this).dialog('close')}});
		$.adoreditplantmeter.loadAndBindHandlers(uniqueId,wrapperJq);
		if(options.type == "edit")
			$.adoreditplantmeter.populateData(wrapperJq,options.extradata);
	});
}

$.adoreditplantmeter =
{
		NextId:0,
		getDivuniqueId:function(idPrefix)
		{
			return idPrefix+$.adoreditplantmeter.NextId++;
		},
		getHtmlContent:function(uniqueId,options)
		{
			var htmlContent = "";
			htmlContent+='<form class="clsAddOrEditPlantMeter_divWrapper" id='+uniqueId+' action="/torp/ServiceRouter/addeditordelplantmeter">';	
			var title =  "Add Plant Meter Details";
			if(options.type == "edit")
			{
				title =  "Edit Plant Meter Details";
				htmlContent += "<input type='hidden' name='mode' value='update'/>";
				htmlContent += "<input type='hidden' name='pwrplantmeterid' value='"+options.extradata.pwrplantmeterid+"'/>";
			}
			else
				htmlContent += "<input type='hidden' name='mode' value='add'/>";
			htmlContent+="<fieldset><legend>"+title+"</legend>";
			htmlContent+="<div class='clsTemplate_DlgContentHldr'>";
			
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Plant</div><div style="position:relative;float:left;"><span><select class="clsAddOrEditPlantMeter_Plant cifval_comboreqd" name="forplantid"></select></span></div>';
				htmlContent+='</div>';
			
			
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Meter Name</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsAddOrEditPlantMeter_MeterName cifval_required" name="metername"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Meter Code</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsAddOrEditPlantMeter_MeterCode cifval_required" name="metercode"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Data Key</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsAddOrEditPlantMeter_DataKey" name="datakey"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_btnHldr"><input type="submit" class="clsAddOrEditPlantMeter_SubmitBtn" value="Save"><input type="button" class="clsAddOrEditPlantMeter_CancelBtn" value="Cancel"></div>';
				htmlContent+='</div>';
			htmlContent+='</div>';
			htmlContent+='</form>';
			return htmlContent;
		},
		loadAndBindHandlers:function(uniqueId,wrapperJq)
		{
			var plantSel = $(".clsAddOrEditPlantMeter_Plant",wrapperJq);
			plantSel.html($.adoreditplantmeter.getPlantsHtml());
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
				beforeSubmit : $.adoreditplantmeter.addPlantMeterFormRequest,
				success: function(responseText){$.adoreditplantmeter.addplantMeterFormResponse(responseText,options,wrapperJq)},
				error:  showError,
				dataType : 'json'
			};
			wrapperJq.ajaxForm(formOptions);
			var cacnelBtn = $(".clsAddOrEditPlantMeter_CancelBtn",wrapperJq);
			cacnelBtn.unbind('click');
			cacnelBtn.click(function()
			{
				wrapperJq.dialog("close");
			});
			
		},
		getPlantsHtml:function()
		{
			var list="<option value='0'>None</option>";
		  	 $.ajax(
		  	 {
		  		url:"/torp/ServiceRouter/getplants",
		  		dataType:"json",
		  		async:false,
		  		type:'post',
		  		success:function(data,xhr,settings)
		  		{
		  			var id;
		  			var name="";
		  			$.each(data.plants, function(i,plant)
					{
						var id = plant.pwrplantid;
						var desc = plant.pwrplantname + " - " +plant.pwrplantcode;
						list +='<option value="' +id + '">' + desc + '</option>';
					});
		  		},
		  		error:function(xhr,status,error){},
		  		complete:function(xhr,status){}
		  	});
		  	return list; 
		},
		addPlantMeterFormRequest:function(formData,jqForm,options) 
		{ 	    
			var wrapperJq=$('#'+jqForm.context.id);
			var valid = wrapperJq.cifvalidatefromexternalevent();
		    if(!valid)
		    {
			   return false;
		    }
		},
		addplantMeterFormResponse:function(responseText,options,wrapperJq)
		{
			if (responseText.status == 'ok') 
			{	
				if(options.type=="edit")
					alert("Plant Meter updated successfully");
				else
					alert("Plant Meter added successfully");
				if(options.callbackfunc!=undefined)
					options.callbackfunc(true);
				wrapperJq.dialog("close");
			} 
			else
			{
				if(options.type=="edit")
					alert("Failed to update Plant Meter details\nReason:"+responseText.reason);
				else
					alert("Failed to add Plant Meter details\nReason:"+responseText.reason);
			}
		},
		populateData:function(wrapperJq,extradata)
		{
			var plantSel = $(".clsAddOrEditPlantMeter_Plant",wrapperJq);
			$(".clsAddOrEditPlantMeter_MeterName",wrapperJq).val(extradata.metername);
			$(".clsAddOrEditPlantMeter_MeterCode",wrapperJq).val(extradata.metercode);
			if(extradata.datakey != "null")
				$(".clsAddOrEditPlantMeter_DataKey",wrapperJq).val(extradata.datakey);
			plantSel.val(extradata.forplantid);
		}
}




