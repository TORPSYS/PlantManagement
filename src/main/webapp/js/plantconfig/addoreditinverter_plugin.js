$.fn.adoreditinverter=function(options)
{
	options=jQuery.extend({type:"add"},options);
	return this.each(function()
	{
		var uniqueId=$.adoreditinverter.getDivuniqueId("idAddOrEditInverter_PlgnWrapper_");
		$(".clsAddOrEditInverter_divWrapper",this).remove();
		$(this).append($.adoreditinverter.getHtmlContent(uniqueId,options));
		var wrapperJq = $("#"+uniqueId);
		wrapperJq.data("options",options);
		var title =  "Add Inverter Details";
		if(options.type == "edit")
			title =  "Edit Inverter Details";
		wrapperJq.dialog({autoOpen:true,modal:true,title:title,width:'700px',closeOnEscape:false,resizable: false,close:function(event, ui){$(this).dialog('close')}});
		$.adoreditinverter.loadAndBindHandlers(uniqueId,wrapperJq);
		if(options.type == "edit")
			$.adoreditinverter.populateData(wrapperJq,options.extradata);
	});
}

$.adoreditinverter =
{
		NextId:0,
		getDivuniqueId:function(idPrefix)
		{
			return idPrefix+$.adoreditinverter.NextId++;
		},
		getHtmlContent:function(uniqueId,options)
		{
			var htmlContent = "";
			htmlContent+='<form class="clsAddOrEditInverter_divWrapper" id='+uniqueId+' action="/torp/ServiceRouter/addeditordeleteinverter">';	
			var title =  "Add Inverter Details";
			if(options.type == "edit")
			{
				title =  "Edit Inverter Details";
				htmlContent += "<input type='hidden' name='mode' value='update'/>";
				htmlContent += "<input type='hidden' name='pwrinverterid' value='"+options.extradata.pwrinverterid+"'/>";
			}
			else
				htmlContent += "<input type='hidden' name='mode' value='add'/>";
			htmlContent+="<fieldset><legend>"+title+"</legend>";
			htmlContent+="<div class='clsTemplate_DlgContentHldr'>";
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Inverter Name</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsAddOrEditInverter_InvName cifval_required" name="invertername"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Inverter Code</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsAddOrEditInverter_InvCode cifval_required" name="invertercode"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Ac Inverter Capacity</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsAddOrEditInverter_InvCap " name="invcapacity" readonly></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Installed Inverter Capacity</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsAddOrEditInverter_InstInvCap " name="installedinvcapacity" readonly ></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Plant</div><div style="position:relative;float:left;"><span><select class="clsAddOrEditInverter_Plant cifval_comboreqd" name="invplantid"></select><button style="background:url(/ciflinksim/css/images/add.png) no-repeat;border:none;width:16px;position: relative;width: 20px;height: 20px;top: 6px;left: 5px;" class="clsAddOrEditInverter_AddPlant"></button></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Inverter Model</div><div style="position:relative;float:left;"><span><select class="clsAddOrEditInverter_InverterModel" name="invmodelid"></select><button style="background:url(/ciflinksim/css/images/add.png) no-repeat;border:none;width:16px;position: relative;width: 20px;height: 20px;top: 6px;left: 5px;" class="clsAddOrEditInverter_AddInverterModel"></button></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">No of Strings</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsAddOrEditInverter_NoOfStrings cifval_required" name="noofstrings"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_btnHldr"><input type="submit" class="clsAddOrEditInverter_SubmitBtn" value="Save"><input type="button" class="clsAddOrEditInverter_CancelBtn" value="Cancel"></div>';
				htmlContent+='</div>';
			htmlContent+='</div>';
			htmlContent+='</form>';
			return htmlContent;
		},
		loadAndBindHandlers:function(uniqueId,wrapperJq)
		{
			var plantSel = $(".clsAddOrEditInverter_Plant",wrapperJq);
			var addInverterModel = $(".clsAddOrEditInverter_AddInverterModel",wrapperJq);
			var addPlant = $(".clsAddOrEditInverter_AddPlant",wrapperJq);
			var inverterModelSel = $(".clsAddOrEditInverter_InverterModel",wrapperJq);
			addInverterModel.data("inverterModelSel",inverterModelSel);
			addInverterModel.data("wrapperJq",wrapperJq);
			addInverterModel.unbind('click');
			addInverterModel.click(function(event)
			{
				 event.preventDefault();
				 var wrapperJq=$(this).data("wrapperJq");
				 var inverterModelSel= addInverterModel.data("inverterModelSel");
				 var options=
				 {
						callbackfunc:function(status)
						{
							if(status)
								inverterModelSel.html($.adoreditinverter.getInverterModelsHtml(wrapperJq));
						}
				 };
				$(this).addoreditinvertermodel(options);
			});
			
			addPlant.data("plantSel",plantSel);
			addPlant.unbind('click');
			addPlant.click(function(event)
			{
				 event.preventDefault();
				 var plantSel= $(this).data("plantSel");
				 var options=
				 {
						callbackfunc:function(status)
						{
							if(status)
								plantSel.html($.adoreditinverter.getPlantsHtml());
						}
				 };
				$(this).addoreditplants(options);
			});
			
			plantSel.html($.adoreditinverter.getPlantsHtml());
			inverterModelSel.html($.adoreditinverter.getInverterModelsHtml(wrapperJq));
			
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
			
		
			inverterModelSel.unbind('change');
			inverterModelSel.data('wrapperJq',wrapperJq);
			inverterModelSel.change(function()
			{
				var wrapperJq=$(this).data("wrapperJq");
				var id=$(this).val();
				var invcapacity=wrapperJq.data("invcapacity_"+id);
				$(".clsAddOrEditInverter_InvCap",wrapperJq).val(invcapacity);
			});
			inverterModelSel.trigger("change");
			wrapperJq.cifvalidate(optionsval);
			var formOptions=
			{	
				beforeSubmit : $.adoreditinverter.addInverterFormRequest,
				success: function(responseText){$.adoreditinverter.addInverterFormResponse(responseText,options,wrapperJq)},
				error:  showError,
				dataType : 'json'
			};
			wrapperJq.ajaxForm(formOptions);
			var cacnelBtn = $(".clsAddOrEditInverter_CancelBtn",wrapperJq);
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
		getInverterModelsHtml:function(wrapperJq)
		{
			var list="<option value='0'>None</option>";
		  	 $.ajax(
		  	 {
		  		url:"/torp/ServiceRouter/getinvertermodels",
		  		dataType:"json",
		  		async:false,
		  		type:'post',
		  		success:function(data,xhr,settings)
		  		{
		  			var id;
		  			var name="";
		  			$.each(data.invertermodels, function(i,invertermodel)
					{
						var id = invertermodel.invertermodelid;
						var desc = invertermodel.invmake + " - " +invertermodel.invmodel;
						list +='<option value="' +id + '">' + desc + '</option>';
						wrapperJq.data("invcapacity_"+id,invertermodel.invcapacity);
					});
		  		},
		  		error:function(xhr,status,error){},
		  		complete:function(xhr,status){}
		  	});
		  	return list; 
		},
		addInverterFormRequest:function(formData,jqForm,options) 
		{ 	    
			var wrapperJq=$('#'+jqForm.context.id);
			var valid = wrapperJq.cifvalidatefromexternalevent();
		    if(!valid)
		    {
			   return false;
		    }
		},
		addInverterFormResponse:function(responseText,options,wrapperJq)
		{
			if (responseText.status == 'ok') 
			{	
				if(options.type == "edit")
					alert("Inverter updated successfully");
				else
					alert("Inverter added successfully");
				if(options.callbackfunc!=undefined)
					options.callbackfunc(true);
				wrapperJq.dialog("close");
			} 
			else
			{
				if(options.type == "edit")
					alert("Failed to update Inverter details");
				else
					alert("Failed to add Inverter details");
			}
		},
		populateData:function(wrapperJq,extradata)
		{
			var plantSel = $(".clsAddOrEditInverter_Plant",wrapperJq);
			var inverterModelSel = $(".clsAddOrEditInverter_InverterModel",wrapperJq);
			$(".clsAddOrEditInverter_InvName",wrapperJq).val(extradata.invertername);
			$(".clsAddOrEditInverter_InvCode",wrapperJq).val(extradata.invertercode);
			$(".clsAddOrEditInverter_InvCap",wrapperJq).val(extradata.invcapacity);
			$(".clsAddOrEditInverter_InstInvCap",wrapperJq).val(extradata.installedinvcapacity);
			$(".clsAddOrEditInverter_NoOfStrings",wrapperJq).val(extradata.noofstrings);
			plantSel.val(extradata.invplantid);
			inverterModelSel.val(extradata.invmodelid);
		}
}




