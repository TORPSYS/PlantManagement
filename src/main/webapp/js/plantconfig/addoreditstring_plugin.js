$.fn.addoreditstring=function(options)
{
	options=jQuery.extend({type:"add"},options);
	return this.each(function()
	{
		var uniqueId=$.addoreditstring.getDivuniqueId("idAddOrEditString_PlgnWrapper_");
		$(".clsAddOrEditString_divWrapper",this).remove();
		$(this).append($.addoreditstring.getHtmlContent(uniqueId,options));
		var wrapperJq = $("#"+uniqueId);
		wrapperJq.data("options",options);
		var title =  "Add String Details";
		if(options.type == "edit")
			title =  "Edit String Details";
		wrapperJq.dialog({autoOpen:true,modal:true,title:title,width:'700px',closeOnEscape:false,resizable: false,close:function(event, ui){$(this).dialog('close')}});
		$.addoreditstring.loadAndBindHandlers(uniqueId,wrapperJq);
		if(options.type == "edit")
			$.addoreditstring.populateData(wrapperJq,options.extradata);
	});
}

$.addoreditstring =
{
		NextId:0,
		getDivuniqueId:function(idPrefix)
		{
			return idPrefix+$.addoreditstring.NextId++;
		},
		getHtmlContent:function(uniqueId,options)
		{
			var htmlContent = "";
			htmlContent+='<form class="clsAddOrEditString_divWrapper" id='+uniqueId+' action="/torp/ServiceRouter/addeditordeletestring">';	
			var title =  "Add String Details";
			if(options.type == "edit")
			{
				title =  "Edit String Details";
				htmlContent += "<input type='hidden' name='mode' value='update'/>";
				htmlContent += "<input type='hidden' name='pwrstringid' value='"+options.extradata.pwrstringid+"'/>";
			}
			else
				htmlContent += "<input type='hidden' name='mode' value='add'/>";
			htmlContent+="<fieldset><legend>"+title+"</legend>";
			htmlContent+="<div class='clsTemplate_DlgContentHldr'>";
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">String Name</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsAddOrEditString_InvStrName cifval_required" name="stringname"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">String Code</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsAddOrEditString_InvStrName cifval_required" name="stringcode"></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">String Capacity</div><div class="clsCmm_fieldInput"><span><input type="text" class="clsAddOrEditString_InvStrCap " name="strcapacity" readonly></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Plant</div><div style="position:relative;float:left;"><span><select class="clsAddOrEditString_Plant cifval_comboreqd" name="plantid"></select><button style="background:url(/ciflinksim/css/images/add.png) no-repeat;border:none;width:16px;position: relative;width: 20px;height: 20px;top: 6px;left: 5px;" class="clsAddOrEditString_AddPlant"></button></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Inverter</div><div style="position:relative;float:left;"><span><select class="clsAddOrEditString_Inverter cifval_comboreqd" name="inverterid"></select><button style="background:url(/ciflinksim/css/images/add.png) no-repeat;border:none;width:16px;position: relative;width: 20px;height: 20px;top: 6px;left: 5px;" class="clsAddOrEditString_AddInverter"></button></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">Panel Model</div><div style="position:relative;float:left;"><span><select class="clsAddOrEditString_PanelModel" name="panelmodelid"></select><button style="background:url(/ciflinksim/css/images/add.png) no-repeat;border:none;width:16px;position: relative;width: 20px;height: 20px;top: 6px;left: 5px;" class="clsAddOrEditString_AddPanelModel"></button></span></div>';
				htmlContent+='</div>';
				
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_fieldTitle">No. of Panels</div><div style="position:relative;float:left;"><span><input type="text" class="clsAddOrEditString_numpanels cifval_required" name="numpanels"></span></div>';
				htmlContent+='</div>';
			
				htmlContent+='<div class="clsCmm_fieldRowWrap">';
					htmlContent+='<div class="clsCmm_btnHldr"><input type="submit" class="clsAddOrEditString_SubmitBtn" value="Save"><input type="button" class="clsAddOrEditString_CancelBtn" value="Cancel"></div>';
				htmlContent+='</div>';
			htmlContent+='</div>';
			htmlContent+='</form>';
			return htmlContent;
		},
		loadAndBindHandlers:function(uniqueId,wrapperJq)
		{
			var inverterSel = $(".clsAddOrEditString_Inverter",wrapperJq);
			var plantSel = $(".clsAddOrEditString_Plant",wrapperJq);
			var addPanelModel = $(".clsAddOrEditString_AddPanelModel",wrapperJq);
			var addInverter = $(".clsAddOrEditString_AddInverter",wrapperJq);
			var addPlant = $(".clsAddOrEditString_AddPlant",wrapperJq);
			var panelModelListSel = $(".clsAddOrEditString_PanelModel",wrapperJq);
			addPanelModel.data("panelModelListSel",panelModelListSel);
			addPanelModel.unbind('click');
			addPanelModel.click(function(event)
			{
				 event.preventDefault();
				 var panelModelListSel= addPanelModel.data("panelModelListSel");
				 var options=
				 {
						callbackfunc:function(status)
						{
							if(status)
								panelModelListSel.html($.addoreditstring.getPanelModelsHtml());
						}
				 };
				$(this).addoreditpanelmodel(options);
			});
			
			addInverter.data("inverterSel",inverterSel);
			addInverter.data("plantSel",plantSel);
			addInverter.unbind('click');
			addInverter.click(function(event)
			{
				 event.preventDefault();
				 var inverterSel= $(this).data("inverterSel");
				 var plantSel= $(this).data("plantSel");
				 var options=
				 {
						callbackfunc:function(status)
						{
							if(status)
								plantSel.trigger('change');
						}
				 };
				$(this).adoreditinverter(options);
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
								plantSel.html($.addoreditstring.getPlantsHtml());
						}
				 };
				$(this).addoreditplants(options);
			});
			
			plantSel.html($.addoreditstring.getPlantsHtml());
			inverterSel.html($.addoreditstring.getInvertersHtml({}));
			panelModelListSel.html($.addoreditstring.getPanelModelsHtml());
			plantSel.unbind('change');
			plantSel.data("inverterSel",inverterSel);
			plantSel.change(function()
			{
				var inverterSel = $(this).data("inverterSel");
				var invplantid=$(this).val();
				var postparams={invplantid:invplantid};
				inverterSel.html($.addoreditstring.getInvertersHtml(postparams));
			});
			
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
				beforeSubmit : $.addoreditstring.addStringFormRequest,
				success: function(responseText){$.addoreditstring.addStringFormResponse(responseText,options,wrapperJq)},
				error:  showError,
				dataType : 'json'
			};
			wrapperJq.ajaxForm(formOptions);
			var cacnelBtn = $(".clsAddOrEditString_CancelBtn",wrapperJq);
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
		getInvertersHtml:function(params)
		{
			var list="<option value='0'>None</option>";
		  	 $.ajax(
		  	 {
		  		url:"/torp/ServiceRouter/getinverters",
		  		dataType:"json",
		  		async:false,
		  		data:params,
		  		type:'post',
		  		success:function(data,xhr,settings)
		  		{
		  			var id;
		  			var name="";
		  			$.each(data.inverters, function(i,inverter)
					{
						var id = inverter.pwrinverterid;
						var desc = inverter.invertername + " - " +inverter.invertercode;
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
		addStringFormRequest:function(formData,jqForm,options) 
		{ 	    
			var wrapperJq=$('#'+jqForm.context.id);
			var valid = wrapperJq.cifvalidatefromexternalevent();
		    if(!valid)
		    {
			   return false;
		    }
		},
		addStringFormResponse:function(responseText,options,wrapperJq)
		{
			if (responseText.status == 'ok') 
			{	
				if(options.type=="edit")
					alert("String updated successfully");
				else
					alert("String added successfully");
				if(options.callbackfunc!=undefined)
					options.callbackfunc(true);
				wrapperJq.dialog("close");
			} 
			else
			{
				if(options.type=="edit")
					alert("Failed to update String details");
				else
					alert("Failed to add String details");
			}
		},
		populateData:function(wrapperJq,extradata)
		{
			var inverterSel = $(".clsAddOrEditString_Inverter",wrapperJq);
			var panelModelListSel = $(".clsAddOrEditString_PanelModel",wrapperJq);
			var plantSel = $(".clsAddOrEditString_Plant",wrapperJq);
			$(".clsAddOrEditString_InvStrName",wrapperJq).val(extradata.stringname);
			$(".clsAddOrEditString_InvStrCode",wrapperJq).val(extradata.stringcode);
			$(".clsAddOrEditString_InvStrCap",wrapperJq).val(extradata.strcapacity);
			$(".clsAddOrEditString_numpanels",wrapperJq).val(extradata.numpanels);
			panelModelListSel.val(extradata.panelmodelid);
			plantSel.val(extradata.plantid);
			plantSel.trigger('change');
			inverterSel.val(extradata.inverterid);
		}


}




