$.fn.addoreditplants=function(options)
{
	options=jQuery.extend({type:"add"},options);
	return this.each(function()
	{
		var uniqueId=$.addoreditplants.getDivuniqueId("idaddoreditplants_PlgnWrapper_");
		$(".clsaddoreditplants_divWrapper",this).remove();
		$(this).append($.addoreditplants.getHtmlContent(uniqueId,options));
		var wrapperJq = $("#"+uniqueId);
		wrapperJq.data("options",options);
		var title =  "Add Plants Details";
		if(options.type == "edit")
			title =  "Edit Plants Details";
		wrapperJq.dialog({autoOpen:true,modal:true,title:title,width:'700px',closeOnEscape:false,resizable: false,close:function(event, ui){$(this).dialog('close')}});
		$.addoreditplants.loadAndBindHandlers(uniqueId,wrapperJq);
		if(options.type == "edit")
			$.addoreditplants.populateData(wrapperJq,options.extradata);
	});
}

$.addoreditplants =
{
		NextId:0,
		getDivuniqueId:function(idPrefix)
		{
			return idPrefix+$.addoreditplants.NextId++;
		},
		getHtmlContent:function(uniqueId,options)
		{
			var htmlContent = "";
			htmlContent+='<form class="clsaddoreditplants_divWrapper" id='+uniqueId+' action="/torp/ServiceRouter/addeditordeleteplants">';	
			var title =  "Add Plants Details";
			if(options.type == "edit")
			{
				title =  "Edit Plants Details";
				htmlContent += "<input type='hidden' name='mode' value='update'/>";
				htmlContent += "<input type='hidden' name='pwrplantid' value='"+options.extradata.pwrplantid+"'/>";
			}
			else
				htmlContent += "<input type='hidden' name='mode' value='add'/>";
			htmlContent+="<fieldset><legend>"+title+"</legend>";
			htmlContent+="<div class='clsTemplate_DlgContentHldr'>";
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Plant Name</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsaddoreditplants_PlntName cifval_required" name="pwrplantname"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Plant Code</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsaddoreditplants_Plntcode cifval_required" name="pwrplantcode"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Installed  Capacity</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsaddoreditplants_PlntInstallCap" name="pwrinstalledcapacity" readonly></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Actual  Capacity</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsaddoreditplants_PlntActualCap cifval_required" name="pwractualcapacity"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Plant Lattitude</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsaddoreditplants_PlntLat" style="width:250px;" name="plantlat"><select class="clsaddoreditplants_PlntLatNoS"  name="nos"><option value="N">North</option><option value="S">South</option></select></span></div>';
				htmlContent+='</div>';
			
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Plant Longitude</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsaddoreditplants_PlntLong" style="width:250px;" name="plantlong"><select class="clsaddoreditplants_PlntLatEoW"  name="eow"><option value="E">East</option><option value="W">West</option></select></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">CO2 Saved/KWH</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsaddoreditplants_COTwoSavedPerKWH" name="cotwosavedperkwh"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Timezone Difference in Mins </div><div class="clsCmm_fieldInput"><span><input type="text" class="clsaddoreditplants_TzDiffinMins cifval_required" name="tzdiffinmins"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Irradiance From Plant</div><div style="position:relative;float:left;"><span><select class="clsaddoreditplants_IrradFromPlant" name="irradiancefromplantid"></select><button style="background:url(/ciflinksim/css/images/add.png) no-repeat;border:none;width:16px;position: relative;width: 20px;height: 20px;top: 6px;left: 5px;" class="clsAddOrEditInverter_AddPlant"></button></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Has Meter Reading</div><div style="position:relative;float:left;"><span><select class="clsaddoreditplants_HasMeterReading" name="hasmeterreading"><option value="n">No</option><option value="y">Yes</option></select></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Has Inverter Data</div><div style="position:relative;float:left;"><span><select class="clsaddoreditplants_HasInverterData" name="hasinverterdata"><option value="n">No</option><option value="y">Yes</option></select></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Meter Reading Interval</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsaddoreditplants_MeterReadingInterval" name="meterreadinginterval"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Inverter Data Interval</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsaddoreditplants_InverterDataInterval" name="inverterdatainterval"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Minimun Iradiance For Power</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsaddoreditplants_MinIrradianceForPower" name="minirradianceforpower"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Alerts to</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsaddoreditplants_AlertsTo" name="alertsto"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_btnHldr"><input type="submit" class="clsaddoreditplants_SubmitBtn" value="Save"><input type="button" class="clsaddoreditplants_CancelBtn" value="Cancel"></div>';
				htmlContent+='</div>';
			htmlContent+='</div>';
			htmlContent+='</form>';
			return htmlContent;
		},
		loadAndBindHandlers:function(uniqueId,wrapperJq)
		{
			var plantSel = $(".clsaddoreditplants_IrradFromPlant",wrapperJq);
			var options = wrapperJq.data("options");
			plantSel.html($.addoreditplants.getPlantsHtml());
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
				beforeSubmit : $.addoreditplants.addPlantsFormRequest,
				success: function(responseText){$.addoreditplants.addPlantsFormResponse(responseText,options,wrapperJq)},
				error:  showError,
				dataType : 'json'
			};
			wrapperJq.ajaxForm(formOptions);
			var cacnelBtn = $(".clsaddoreditplants_CancelBtn",wrapperJq);
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
		addPlantsFormRequest:function(formData,jqForm,options) 
		{ 	    
			var wrapperJq=$('#'+jqForm.context.id);
			var norS = $(".clsaddoreditplants_PlntLatNoS",wrapperJq).val();
			var eorW = $(".clsaddoreditplants_PlntLatNoS",wrapperJq).val();
			formData = jQuery.map( formData, function( a ) {
					if(norS == "S" && a.name=="plantlat")
					  return (a.value="-"+a.value);
					if(eorW == "W" && a.name=="plantlong")
						  return (a.value="-"+a.value);
				});
			var valid = wrapperJq.cifvalidatefromexternalevent();
		    if(!valid)
		    {
			   return false;
		    }
		},
		addPlantsFormResponse:function(responseText,options,wrapperJq)
		{
			if (responseText.status == 'ok') 
			{	
				if(options.type=="edit")
					alert("Plants updated successfully");
				else
					alert("Plants added successfully");
				if(options.callbackfunc!=undefined)
					options.callbackfunc(true);
				wrapperJq.dialog("close");
			} 
			else
			{
				if(options.type=="edit")
					alert("Failed to update Plants details");
				else
					alert("Failed to add Plants details");
			}
		},
		populateData:function(wrapperJq,extradata)
		{
			$(".clsaddoreditplants_PlntName",wrapperJq).val(extradata.pwrplantname);
			$(".clsaddoreditplants_Plntcode",wrapperJq).val(extradata.pwrplantcode);
			$(".clsaddoreditplants_PlntInstallCap",wrapperJq).val(extradata.pwrinstalledcapacity);
			$(".clsaddoreditplants_PlntAv",wrapperJq).val(extradata.areaofpv);
			$(".clsaddoreditplants_PlntActualCap",wrapperJq).val(extradata.pwractualcapacity);
			if(extradata.plantlat != "null")
				$(".clsaddoreditplants_PlntLat",wrapperJq).val(Math.abs(extradata.plantlat));
			else
				$(".clsaddoreditplants_PlntLat",wrapperJq).val(0);
			if(extradata.plantlong != "null")
				$(".clsaddoreditplants_PlntLong",wrapperJq).val(Math.abs(extradata.plantlong));
			else
				$(".clsaddoreditplants_PlntLong",wrapperJq).val(0);
			if(extradata.tzdiffinmins != "null")
				$(".clsaddoreditplants_TzDiffinMins",wrapperJq).val(extradata.tzdiffinmins);
			else
				$(".clsaddoreditplants_TzDiffinMins",wrapperJq).val(0);
			if(extradata.plantlat != "null" && extradata.plantlat < 0)
				$(".clsaddoreditplants_PlntLatNoS",wrapperJq).val("S");
			if(extradata.plantlong != "null" && extradata.plantlong < 0)
				$(".clsaddoreditplants_PlntLatEoW",wrapperJq).val("W");
			if(extradata.cotwosavedperkwh != "null")
				$(".clsaddoreditplants_COTwoSavedPerKWH",wrapperJq).val(extradata.cotwosavedperkwh);
			else
				$(".clsaddoreditplants_COTwoSavedPerKWH",wrapperJq).val(0);
			$(".clsaddoreditplants_IrradFromPlant",wrapperJq).val(extradata.irradiancefromplantid);
			$(".clsaddoreditplants_HasMeterReading",wrapperJq).val(extradata.hasmeterreading);
			$(".clsaddoreditplants_HasInverterData",wrapperJq).val(extradata.hasinverterdata);
			$(".clsaddoreditplants_MeterReadingInterval",wrapperJq).val(extradata.meterreadinginterval);
			$(".clsaddoreditplants_MinIrradianceForPower",wrapperJq).val(extradata.minirradianceforpower);
			if(extradata.alertsto != "null")
				$(".clsaddoreditplants_AlertsTo",wrapperJq).val(extradata.alertsto);
			$(".clsaddoreditplants_InverterDataInterval",wrapperJq).val(extradata.inverterdatainterval);
		}
}




