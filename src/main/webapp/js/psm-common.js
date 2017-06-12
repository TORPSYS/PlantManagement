function loadCombobox(selectJq,comboOption)
{
	$.ajax({
		   type: "POST",
		   async: comboOption.asyncVal,
		   url: comboOption.url,
		   data:comboOption.postParams,
		   dataType:'json',
		   success: function(data){
						if(data.status == "ok")
						{
							selectJq.html("");
							if(comboOption.intialVal == undefined || comboOption.intialVal == true)
							{
								if(comboOption.initblank)
									selectJq.append('<option value=""></option>');
								else
									selectJq.append('<option value="0" selected="true">Select '+comboOption.selectHeader+'</option>');
							}
							var optionContent = "";
							$.each(data[comboOption.jsonArray], function(i,arr)
			        		{
				          		var id = arr[comboOption.id];
				          		var desc = "";
				          		if(comboOption.desc.length > 1)
				          			desc = arr[comboOption.desc[0]] + " - " +arr[comboOption.desc[1]];
				          		else
				          			desc = arr[comboOption.desc];
				          		optionContent+="<option value=" +id + " >" + desc + "</option>";
			        		});
							selectJq.append(optionContent);
			        	}
			        	else
			        	{
			        		alert("Temporary error in loading. Please reload");
			        	}
		   },
		   error:function(obj1,obj2,obj3)
		   {
			   //alert("jsonError");
		   }
	});
}

function callAjaxService(ajaxOption)
{
	$.ajax({
		   type: "POST",
		   async: ajaxOption.asyncVal,
		   url: ajaxOption.url,
		   data:ajaxOption.postParams,
		   dataType:'json',
		   success: ajaxOption.successfunc,
		   error:ajaxOption.errorfunc
	});
}

function parseInteger(val)
{
	return parseInt(val,10);
}

function showmsg(txt1,txt2,txt2)
{
	alert(txt1);
}

function downLoadAsExcel(content,contentType,fileName)
{
	var textFileAsBlob = new Blob([content], {type:contentType});
	var downloadLink = document.createElement("a");
	downloadLink.download = fileName;
	downloadLink.innerHTML = "Download File";
	if (window.webkitURL != null)
	{
		// Chrome allows the link to be clicked
		// without actually adding it to the DOM.
		downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
	}
	else
	{
		// Firefox requires the link to be added to the DOM
		// before it can be clicked.
		downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
		downloadLink.onclick = destroyClickedElement;
		downloadLink.style.display = "none";
		document.body.appendChild(downloadLink);
	}

	downloadLink.click();
}

function destroyClickedElement(event)
{
	document.body.removeChild(event.target);
}

function showError()
{
	alert("Error");
}

Number.prototype.padLeft = function(base,chr){
	   var  len = (String(base || 10).length - String(this).length)+1;
	   return len > 0? new Array(len).join(chr || '0')+this : this;
}
