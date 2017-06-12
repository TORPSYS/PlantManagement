jQuery.fn.uploaddocument=function(options)
{
	options=jQuery.extend({type:"add",view:"doc"},options);
	return this.each(function()
	{
		var uniqueId=jQuery.uploaddocument.getDivHolderUniqId("idUploadDoc_PlgnWrapper_");
		$(".clsUploadDoc_divWrapper",this).remove();
		$(this).append(jQuery.uploaddocument.getHtmlContent(uniqueId,options));
		var wrapperJq = $("#"+uniqueId);
		wrapperJq.data("options",options);
		var dialogTitle;
		if(options.type == "add")
			dialogTitle="Upload Document";
		if(options.type == "edit")
			dialogTitle="Replace Document";
		if(options.type == "editdoc")
			dialogTitle="Edit Document Details";
		wrapperJq.dialog({autoOpen:true,modal:true,title:dialogTitle,width:'590px',closeOnEscape:false,close:function(event, ui){$(this).dialog('close')}});
		jQuery.uploaddocument.loadAndBindHandlers(uniqueId,wrapperJq);
		if(options.type == "editdoc" && options.uploadDocData != undefined)
			$.uploaddocument.populateDocData(options.uploadDocData,wrapperJq);
	});
}

jQuery.uploaddocument=
{
		uploaDocNextId: 0,
		getDivHolderUniqId:function(idPrefix)
		{
	  		return idPrefix+jQuery.uploaddocument.uploaDocNextId++;
		},
		populateDocData:function(data,wrapperJq)
		{
			$(".clsUploadDoc_DocName",wrapperJq).val(data.pdocname);
			$(".clsUploadDoc_DocType",wrapperJq).val(data.pdoctype);
			$(".clsUploadDoc_DocDate",wrapperJq).val(data.pdocdate);
			$(".clsUploadDoc_ForPlant",wrapperJq).val(data.forplantid);
		},
		getHtmlContent:function(uniqueId,options)
		{
			var htmlContent = "";
			var legendTitle="";
			if(options.type == "add")
			{
				htmlContent+= '<form id="'+uniqueId+'" class="clsUploadDoc_divWrapper" action="/torp/ServiceRouter/uploaddocument" enctype="multipart/form-data"  method="post">';
				htmlContent+='<input type="hidden" class="clsDocManager_HiddenIPBxForFileIds" name="fileids"/>';
				htmlContent+='<input type="hidden" name="mode" value="add"/>';
				legendTitle="Upload Document";
			}
			if(options.type == "editdoc")
			{
				htmlContent+= '<form id="'+uniqueId+'" class="clsUploadDoc_divWrapper" action="/torp/ServiceRouter/uploaddocument" enctype="multipart/form-data"  method="post">';
				legendTitle="Edit Document Details";
				htmlContent+='<input type="hidden" name="mode" value="editdoc"/>';
				htmlContent+='<input type="hidden" name="pwrplantsdocid" value="'+options.uploadDocData.pwrplantsdocid+'"/>';
			}
			if(options.type == "edit")
			{
				htmlContent+= '<form id="'+uniqueId+'" class="clsUploadDoc_divWrapper" action="/torp/ServiceRouter/replacedocument" enctype="multipart/form-data" method="post">';
				htmlContent+='<input type="hidden" name="fileid" value="'+options.uploadDocData.docfileid+'"/>';
				htmlContent+='<input type="hidden" name="storageid" value="'+options.uploadDocData.storageid+'"/>';
				legendTitle="Replace Document";
			}
				htmlContent+="<fieldset><legend>"+legendTitle+"</legend>";
				var dn = "Document Name";
				var dt = "Document Type";
				var dd = "Document Date";
				var pn = "For Plant";
				var fn = "File Name";
				var cr = "Create";
				var s = "Save";
				var c = "Cancel";
				if(options.type != "edit")
				{
					htmlContent+='<div class="clsCmm_fieldRowWrap">';
						htmlContent+='<div class="clsCmm_fieldTitle">'+dn+'</div>';
						htmlContent+='<div class="clsCmm_fieldInput"><span><input type="text" class="cifval_required clsUploadDoc_DocName" name="pdocname"></span></div>';
					htmlContent+='</div>';	
					
					htmlContent+='<div class="clsCmm_fieldRowWrap">';
						htmlContent+='<div class="clsCmm_fieldTitle">'+dt+'</div>';
						htmlContent+='<div style="position:relative;float:left;"><span><select class="clsUploadDoc_DocType cifval_comboreqd" name="pdoctype"></select></span></div>';
					htmlContent+='</div>';
					
					htmlContent+='<div class="clsCmm_fieldRowWrap">';
						htmlContent+='<div class="clsCmm_fieldTitle">'+dd+'</div>';
						htmlContent+='<div class="clsCmm_fieldInput"><span><input type="text" class="cifval_required clsUploadDoc_DocDate" name="pdocdate"></span></div>';
					htmlContent+='</div>';	
					
					htmlContent+='<div class="clsCmm_fieldRowWrap">';
						htmlContent+='<div class="clsCmm_fieldTitle">'+pn+'</div>';
						htmlContent+='<div style="position:relative;float:left;"><span><select class="clsUploadDoc_ForPlant cifval_comboreqd" name="forplantid"></select></span></div>';
					htmlContent+='</div>';
				}
				if(options.type == "edit" || options.type == "add")
				{
					htmlContent+='<div class="clsCmm_fieldRowWrap">';
						htmlContent+='<div class="clsCmm_fieldTitle">'+fn+'</div>';
						htmlContent+='<div class="clsCmm_fieldInput"><span><input type="file" class="clsUploadDoc_UploadFile cifval_required" name="file"></span> </div>';
					htmlContent+='</div>';
				}
				htmlContent+='<div class="clscmm_viewBtnHldr" style="background:none;border:none;">';
				if(options.type == "add")
						htmlContent+= '<div class="clsUploadDoc_BtnCreate"><input type="submit" class="cifval_submit" value="'+cr+'">';
				if(options.type == "edit" || options.type == "editdoc")
						htmlContent+= '<div class="clsUploadDoc_BtnSave"><input type="submit" class="cifval_submit" value="'+s+'">';
				htmlContent+= '<input type="button" class="clsUploadDoc_BtnCancel" value="'+c+'"> </div>';
				htmlContent+='</div>';
					htmlContent+="</fieldset>";	
			htmlContent+= '</form>';
			return htmlContent;
		},
		loadAndBindHandlers:function(uniqueId,wrapperJq)
		{
			var cancelBtn=$('.clsUploadDoc_BtnCancel',wrapperJq);
			var docTypeSel = $(".clsUploadDoc_DocType",wrapperJq);
			var forPlantSel = $(".clsUploadDoc_ForPlant",wrapperJq);
			var docDateSel = $(".clsUploadDoc_DocDate",wrapperJq);
			docTypeSel.html($.uploaddocument.getDocTypesHtml());
			forPlantSel.html($.uploaddocument.getPlantsHtml());
			docDateSel.datepicker({changeMonth: true,changeYear: true,dateFormat: 'dd/mm/yy'});
			cancelBtn.data("wrapperJq",wrapperJq);
			cancelBtn.unbind('click');
			cancelBtn.click(function()
			{
				var wrapperJq=$(this).data("wrapperJq");
				wrapperJq.dialog("close");
			});
			var uploadDocOptions = wrapperJq.data("options");
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
			if(uploadDocOptions.type=="add")
			{
				var optionLogin=
				{	
					beforeSubmit : function(formData,jqForm,options){showUploadDoc_AddRequest(formData,jqForm,options,uploadDocOptions)},
					success: function(responseText){showUploadDoc_AddResponse(responseText,uploadDocOptions,wrapperJq)},
					error:  showError ,
					dataType : 'json'
				};
				wrapperJq.ajaxForm(optionLogin);
			}
			if(uploadDocOptions.type == "edit" || uploadDocOptions.type == "editdoc")
			{
				var optionLogin=
				{	
					beforeSubmit : showUploadDoc_EditRequest,
					success: function(responseText){showUploadDoc_EditResponse(responseText,uploadDocOptions,wrapperJq)},
					error:  showError ,
					dataType : 'json'
				};
				wrapperJq.ajaxForm(optionLogin);
			}
			
		},
		getDocTypesHtml:function()
		{
			var list="<option value='0'>None</option>";
			list+= " <option value='1'>Electrical SLD</option>";
			list+= " <option value='2'>Plant Layout</option>";
			list+= " <option value='3'>As-Build Drawings</option>";
			list+= " <option value='4'>Statutory Clearances</option>";
			list+= " <option value='5'>Warranty Certificates</option>";
			list+= " <option value='6'>Commissioning Documents</option>";
			list+= " <option value='7'>Maintenance Records</option>";
			list+= " <option value='8'>Others</option>";
		  	return list; 
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
}

	function showUploadDoc_AddRequest(formData,jqForm,options,uploadDocOptions) 
	{ 
		var wrapperJq=$('#'+jqForm.context.id);
		var valid = wrapperJq.cifvalidatefromexternalevent();
	    if(!valid)
	    {
		   return false;
	    }
	}
	
	function showUploadDoc_AddResponse(responseText,options,wrapperJq)
	{
		var options = wrapperJq.data("options");
		var docName = "";
		if(options.type != "edit")
			docName = $(".clsUploadDoc_DocName",wrapperJq).val();
		if (responseText.status == 'ok') 
		{	
			showmsg("Uploaded successfully");
			if(options.callbackfunc!=undefined)
				options.callbackfunc(true);
			wrapperJq.dialog("close");
		} 
		else
		{
			alert("Failed to Upload File");
		}
	}
	
	function showUploadDoc_EditRequest(formData, jqForm, options) 
	{ 	
		var wrapperJq=$('#'+jqForm.context.id);
		var valid = wrapperJq.cifvalidatefromexternalevent();
	    if(!valid)
	    {
		   return false;
	    }
	}
	
	function showUploadDoc_EditResponse(responseText,options,wrapperJq)
	{
		if (responseText.status == 'ok') 
		{	
			if(options.type == "edit")
				showmsg("Replaced successfully");
			if(options.type == "editdoc")
				showmsg("Document Details updated successfully");
			if(options.callbackfunc!=undefined)
				options.callbackfunc(true);
			wrapperJq.dialog("close");
		} 
		else
		{
			alert("Failed to Edit Document Details");
		}
	}

