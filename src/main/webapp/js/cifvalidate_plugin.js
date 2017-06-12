jQuery.fn.cifvalidate = function(options)
{
	options=jQuery.extend({onchange:false,onsubmit:false,onfocusout:false},options);
	return this.each(function()
	{ 
		var mainWrapper=this;
		$(this).data("validateoptions",options);
		//jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options);
		var uniqueId=jQuery.validate.getDivuniqueId("validate_");
		if(options.onchange!=undefined && options.onchange == true)
		{
			$(".cifval_required",$(mainWrapper)).change(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
			
			$(".cifval_checkduplicate",$(mainWrapper)).change(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
			$(".cifval_checkduplicateexcludingnull",$(mainWrapper)).change(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
			
			$(".cifval_comboreqd",$(mainWrapper)).change(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
			
			$(".cifval_name",$(mainWrapper)).change(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
			
			$(".cifval_email",$(mainWrapper)).change(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
			
			$(".cifval_date",$(mainWrapper)).unbind('change');
			$(".cifval_date",$(mainWrapper)).change(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			}); 
			
			$(".cifval_mobnum",$(mainWrapper)).change(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			}); 
			
			$(".cifval_emptyornum",$(mainWrapper)).change(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
			
			//$(".cifval_onlynum",$(mainWrapper)).unbind("change");
			$(".cifval_onlynum",$(mainWrapper)).change(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
			
			$(".cifval_avoidspcl",$(mainWrapper)).change(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
			
			$(".cifval_avoidspclspace",$(mainWrapper)).change(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
			
			
			
			var sDateJq = $(".cifval_sdate",$(mainWrapper));
			sDateJq.unbind('change');
			sDateJq.change(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
			var eDateJq = $(".cifval_edate",$(mainWrapper));
			eDateJq.unbind('change');
			eDateJq.change(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
		}
		
		//viresh
		if(options.onfocusout!=undefined && options.onfocusout == true)
		{
			$(".cifval_required",$(mainWrapper)).focusout(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
			
			$(".cifval_checkduplicate",$(mainWrapper)).focusout(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
			$(".cifval_checkduplicateexcludingnull",$(mainWrapper)).focusout(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
			
			$(".cifval_comboreqd",$(mainWrapper)).focusout(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
			
			$(".cifval_name",$(mainWrapper)).focusout(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
			
			$(".cifval_email",$(mainWrapper)).focusout(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
			
			$(".cifval_date",$(mainWrapper)).unbind('focusout');
			$(".cifval_date",$(mainWrapper)).focusout(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			}); 
			
			$(".cifval_mobnum",$(mainWrapper)).focusout(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			}); 
			
			$(".cifval_emptyornum",$(mainWrapper)).focusout(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
			
			//$(".cifval_onlynum",$(mainWrapper)).unbind("focusout");
			$(".cifval_onlynum",$(mainWrapper)).focusout(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
			
			$(".cifval_avoidspcl",$(mainWrapper)).focusout(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
			
			$(".cifval_avoidspclspace",$(mainWrapper)).focusout(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
			
			
			
			var sDateJq = $(".cifval_sdate",$(mainWrapper));
			sDateJq.unbind('focusout');
			sDateJq.focusout(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
			var eDateJq = $(".cifval_edate",$(mainWrapper));
			eDateJq.unbind('focusout');
			eDateJq.focusout(function()
			{
				jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options,this);
			});
		}
		//end viresh
		if(options.onsubmit!=undefined && options.onsubmit == true)
		{
			//$(".cifval_submit",mainWrapper).unbind('click');
			$(".cifval_submit",mainWrapper).click(function(event)
			{
				var valid=jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options);
				if(!valid)
				{
					event.preventDefault();
				}
			});
		}
	});
}

jQuery.fn.cifvalidatefromexternalevent = function(externakOptions)
{
//	return this.each(function()
//	{
		var mainWrapper=this;
		var options=$(mainWrapper).data("validateoptions");
		if(options==undefined)
		{
			options=externakOptions;
		}
		if(options != undefined)
		{
			var valid=jQuery.validate.cifval_cmnValidateFunction(mainWrapper,options);
			return valid;
		}
		return true;
//	}
}

jQuery.validate =
{
		
	NextId:0,
	
	getDivuniqueId: function(idPrefix)
	{
		jQuery.validate.NextId+=1;
		return idPrefix+jQuery.validate.NextId;
	},
	
	cifval_errorPlacement: function(errorMsg, element,iVal,valid,errTopPos,options)
	{
//		$(element).wrap(<div);
//		$(element).parent().addClass("clsCifValErrorPositionClass");
		var parent=$(element).parent();
		if(options.cifval_error_on_first_row!= undefined && options.cifval_error_on_first_row && !valid)
		{
			options.first_row_sel.css("height","24px");
		}
//		if(parent.parent().prev().hasClass("jqgfirstrow") && !options.onchange)
//		{
//			parent.parent().prev().css("height","24px");
//		}
		$('div#idCifValError' + element.attr("id")+iVal).remove();
	    if(valid == true)
	    {
		   return;
		}
	    else if(valid == false)
	    {
	    	var htmlstr='';
	    	if(options.grid==true)
		    {
	    		var type = element.attr("role");
	    		var gridRowId=$(element).closest('tr').attr("id");
	    		htmlstr +='<div id="idCifValError' + element.attr("id")+iVal + '" class="cifValError cifval_gridrow_'+gridRowId+'">';
		    }
	    	else
	    	{
	    		htmlstr +='<div id="idCifValError' + element.attr("id")+iVal + '" class="cifValError">';
	    	}
	    	htmlstr+='<div class="cifValErrorContent">* '+errorMsg+'</div>'
	    	htmlstr+='<div class="cifValErrorArrow"><div class="line10"></div><div class="line9"></div><div class="line8"></div><div class="line7"></div>';
	    	htmlstr+='<div class="line6"></div><div class="line5"></div><div class="line4"></div><div class="line3"></div><div class="line2"></div><div class="line1"></div></div></div>';
	    	
	    	if(options.grid==true)
		    {
	    		if(type != undefined && type == "select")
		    		$(".ui-autocomplete-input").closest(".ui-jqgrid-bdiv").append(htmlstr);
	    		else
	    			$(element).closest('.ui-jqgrid-bdiv').append(htmlstr);
	    		
	    		// for custom select 
	    		if(type == undefined)
	    		{
	    			var splitCls = element.attr("class").split(" ");
	    			var found = false;
	    			for(var i = 0; i < splitCls.length; i++)
	    			{
	    				if(splitCls[i] == "cifval_comboreqd")
	    				{
	    					type = "select";
	    					found = true;
	    					break;
	    				}
	    			}
	    			if(found)
	    				element.closest(".ui-jqgrid-bdiv").append(htmlstr);
	    		}
		    }
	    	else
	    	{
	    		$(parent).append(htmlstr);
	    		//$('.'+parent.attr('class')).append(htmlstr);
	    	}
	    	
//	    	$(element,$(parent)).unbind('keypress');
	    	$(element,$(parent)).keypress(function()
	    	{
				$('div#idCifValError' + element.attr("id")+iVal).remove();
				removeCifErrorsOnFirstRow(this,options.first_row_sel,options.cifval_error_on_first_row);
	    	});
//	    	$(element,$(parent)).unbind('click');
	    	$(element,$(parent)).click(function()
	    	{
				$('div#idCifValError' + element.attr("id")+iVal).remove();
				removeCifErrorsOnFirstRow(this,options.first_row_sel,options.cifval_error_on_first_row);
				
	    	});
//	    	$(element,$(parent)).unbind('focus');
	    	$(element,$(parent)).focus(function()
	    	{
				$('div#idCifValError' + element.attr("id")+iVal).remove();
				removeCifErrorsOnFirstRow(this,options.first_row_sel,options.cifval_error_on_first_row);
	    	});
	    	
	    	$(element,$(parent)).change(function()
	    	{
	    		if($(this).val()>0)
	    		{
	    			$('div#idCifValError' + element.attr("id")+iVal).remove();
	    			removeCifErrorsOnFirstRow(this,options.first_row_sel,options.cifval_error_on_first_row);
	    		}
	    	});
	    }
	    
	    if(options.grid==true)
	    {
	    	var gridoffset=$(element).closest('.ui-jqgrid-bdiv').offset();
	    	var scrollLeftPos = 0;
	    	var elmOffset;
	    	if(type != undefined && type == "select")
	    	{
	    		elmOffset = $(element).css("display","block").offset();
	    		$(element).css("display","none");
	    	}
	    	else
	    		elmOffset = $(element).offset();
	    	if(options.scrollLeftPos > 0)
	    		scrollLeftPos = options.scrollLeftPos;
	    	var leftPos=(elmOffset.left)-(gridoffset.left)+scrollLeftPos;
	    	$('div#idCifValError' + element.attr("id")+iVal).css('left',leftPos);
	    	var topPos=(elmOffset.top)-(gridoffset.top);
	    	
	    	//var scrollDvOffTop=$(element).closest('.ui-jqgrid-bdiv')[0].offsetTop;
	    	var scollTop=$(element).closest('.ui-jqgrid-bdiv')[0].scrollTop
	    	//var extraHight=scrollDvOffTop-scollTop;
	    	
	    	if(scollTop>0)
	    	{
	    		topPos = topPos+scollTop;
	    	}
	    	$('div#idCifValError' + element.attr("id")+iVal).css('top',topPos-25);
	    }
	    else
	    {
		    offset = element.offset();
		    var elmWidth=element.width();
		    elmWidth=(elmWidth/2)-10;
		    $('div#idCifValError' + element.attr("id")+iVal).css('left',elmWidth);//+ element.outerWidth()
		    var top=offset.top-35;
		    $('div#idCifValError' + element.attr("id")+iVal).css('top',-(errTopPos+30));
	    }
//	    if(options.scroll_grid_on_errors != undefined && options.scroll_grid_on_errors)
//		{
//		    	$('#'+element[0].offsetParent.offsetParent.id).closest(".ui-jqgrid-bdiv").scrollLeft(leftPos-30);
//		}
	},
	
	cifval_cmnValidateFunction: function(mainWrapper,options, valElem)
	{
		options.scrollLeftPos = $(mainWrapper).closest(".ui-jqgrid-bdiv").scrollLeft();
		if($(mainWrapper)[0].nodeName == "TR")
		{
			if($(mainWrapper)[0].offsetParent != null)
			{
				options.cifval_error_on_first_row = $(('#'+$(mainWrapper)[0].id),$("#"+$(mainWrapper)[0].offsetParent.id)).prev().hasClass("jqgfirstrow");
				options.first_row_sel=$(".jqgfirstrow",$("#"+$(mainWrapper)[0].offsetParent.id));
				options.scroll_grid_on_errors = true;
			}
		}
		var cntxt;
		var globValid=true;
		if (valElem != undefined)
			cntxt = valElem;
		else
			cntxt = $(mainWrapper);
		
		var requiredFieldArray=(valElem == undefined) ? $(".cifval_required",cntxt) : $(cntxt).filter(".cifval_required") ;
		for (var i=0;i<requiredFieldArray.length;i++)
		{
			var valid=true;
			var field_val=$(requiredFieldArray[i]).val();
			if (!cifval_validateRequireField(field_val))
			{
				valid=false;
				globValid=false;
			}
			else
			{
				valid = true;
			}
			var iVal="_reqid_"+i;
			jQuery.validate.cifval_errorPlacement("Input is required",$(requiredFieldArray[i]),iVal,valid,0,options);
		}
		
		var duplicateFieldArray=(valElem == undefined) ? $(".cifval_checkduplicate",cntxt) : $(cntxt).filter(".cifval_checkduplicate") ;
		var valuesList = new Array();
		for (var i=0;i<duplicateFieldArray.length;i++)
		{
			var valid=true;
			var field_val=$(duplicateFieldArray[i]).val();
			var validatedObj = cifval_validateCheckDupliate(field_val,valuesList,i);
			if (!validatedObj.valid)
			{
				valid=false;
				globValid=false;
			}
			else
			{
				valid = true;
			}
			var iVal="_dupreqid_"+i;
			var iVal1="_dupreqid_"+validatedObj.pos;
			jQuery.validate.cifval_errorPlacement("Duplicate Entry Exist",$(duplicateFieldArray[i]),iVal,valid,0,options);
			jQuery.validate.cifval_errorPlacement("Duplicate Entry Exist",$(duplicateFieldArray[validatedObj.pos]),iVal1,valid,0,options);
		}
		
		var excludingDuplicateFieldArray=(valElem == undefined) ? $(".cifval_checkduplicateexcludingnull",cntxt) : $(cntxt).filter(".cifval_checkduplicate") ;
		var valuesList = new Array();
		for (var i=0;i<excludingDuplicateFieldArray.length;i++)
		{
			var valid=true;
			var field_val=$(excludingDuplicateFieldArray[i]).val();
			if(field_val != "")
			{
				var validatedObj = cifval_validateCheckExcludingDupliate(field_val,valuesList,i);
				if (!validatedObj.valid)
				{
					valid=false;
					globValid=false;
				}
				else
				{
					valid = true;
				}
				var iVal="_edupreqid_"+i;
				var iVal1="_edupreqid_"+validatedObj.pos;
				jQuery.validate.cifval_errorPlacement("Duplicate Entry Exist",$(excludingDuplicateFieldArray[i]),iVal,valid,0,options);
				jQuery.validate.cifval_errorPlacement("Duplicate Entry Exist",$(excludingDuplicateFieldArray[validatedObj.pos]),iVal1,valid,0,options);
			}
		}
		
		var comboFieldArray=(valElem == undefined) ? $(".cifval_comboreqd",cntxt) : $(cntxt).filter(".cifval_comboreqd") ;
		for (var i=0;i<comboFieldArray.length;i++)
		{
			var valid=true;
			var field_val=$(comboFieldArray[i]).val();
			if (!cifval_validateComboField(field_val) || field_val == null)
			{
				valid=false;
				globValid=false;
			}
			else
			{
				valid = true;
			}
			var iVal="_combreqid_"+i;
			jQuery.validate.cifval_errorPlacement("Select an Option",$(comboFieldArray[i]),iVal,valid,0,options);
		}
		
		if(options!=undefined && options.checkboxgroupvalid!=undefined && options.checkboxgroupvalid.groupclassname!=undefined)
		{
			var chkBoxGrpClass=options.checkboxgroupvalid.groupclassname;
			var errPlacementClass=options.checkboxgroupvalid.errplacementclass;
			var chkBoxGropArray=(valElem == undefined) ? $("."+chkBoxGrpClass+"",cntxt) : $(cntxt).filter("."+chkBoxGrpClass+"") ;
			var valid=true;
			var count=0;
			if(chkBoxGropArray.length > 0)
			{
				for (i=0;i<chkBoxGropArray.length;i++)
				{
					var field_val=$(chkBoxGropArray[i]).prop("checked");
					if (field_val)
					{
						count+=1;
					}
				}
				if(count >= 1){
					valid = true;
				}
				else
				{
					valid = false;
					globValid=false;
				}
			}
			jQuery.validate.cifval_errorPlacement("Please select atlest any one option.",$("."+errPlacementClass),iVal,valid,15,options);
		}
		
		var nameArray=(valElem == undefined) ? $(".cifval_name",cntxt) : $(cntxt).filter(".cifval_name") ;
		for (var i=0;i<nameArray.length;i++)
		{
			var valid=true;
			var name_val=$(nameArray[i]).val();
			if (!cifval_validateName(name_val))
			{
				valid=false;
				globValid=false;
			}
			else
			{
				valid = true;
			}
			var iVal="_nameid_"+i;
			jQuery.validate.cifval_errorPlacement("Name is required",$(nameArray[i]),iVal,valid,0,options);
		}
		
		var emailArray=(valElem == undefined) ? $(".cifval_email",cntxt) : $(cntxt).filter(".cifval_email") ;
		for (var i=0;i<emailArray.length;i++)  
		{
			var valid=true;
			var email_val=$(emailArray[i]).val();
	        if(!cifval_validateEmail(email_val))
	        {
	          valid=false;
	          globValid=false;
	        }
	        else
	        {
				valid = true;
	        }
	        var iVal="_emailid_"+i;
	        jQuery.validate.cifval_errorPlacement("E-mail is required",$(emailArray[i]),iVal,valid,0,options);
		}
		
		var mobNumArray=(valElem == undefined) ? $(".cifval_mobnum",cntxt) : $(cntxt).filter(".cifval_mobnum") ;
		for (var i=0;i<mobNumArray.length;i++) 
		{
			var valid=true;
			var mobnum_val=$(mobNumArray[i]).val();
			if(!cifval_validateMobileNumber(mobnum_val)) 
			{
				valid=false;
				globValid=false;
	        }
			else
			{
				valid=true;
			}
			var iVal="_mobnoid_"+i;
			jQuery.validate.cifval_errorPlacement("Correct format is xxxxxxxxxx",$(mobNumArray[i]),iVal,valid,0,options);
		}
		
		var onlyNumArray=(valElem == undefined) ? $(".cifval_onlynum",cntxt) : $(cntxt).filter(".cifval_onlynum") ;
		for (var i=0;i<onlyNumArray.length;i++)	
		{
			var valid=true;
			var onlynum_val=$(onlyNumArray[i]).val();
			if(!cifval_validateOnlyNumber(onlynum_val)) 
			{
				valid=false;
				globValid=false;
	        }
			else
			{
				valid=true;
			}
			var iVal="_onlynoid_"+i;
			jQuery.validate.cifval_errorPlacement("Only number's allowed",$(onlyNumArray[i]),iVal,valid,0,options);
		}
		
		var  emptyOrNumArray=(valElem == undefined) ? $(".cifval_emptyornum",cntxt) : $(cntxt).filter(".cifval_emptyornum");
		for (var i=0;i<emptyOrNumArray.length;i++)
		{
			var valid=true;
			var emptyOrnum_val=$(emptyOrNumArray[i]).val();
			if(!cifval_validateEmptyOrNumber(emptyOrnum_val)) 
			{
				valid=false;
				globValid=false;
	        }
			else
			{
				valid=true;
			}
			var iVal="_emtornoid_"+i;
			jQuery.validate.cifval_errorPlacement("Empty or number's allowed",$(emptyOrNumArray[i]),iVal,valid,0,options);
		}
		var  sDateArray=(valElem == undefined) ? $(".cifval_sdate",cntxt) : $(cntxt).filter(".cifval_sdate");
		var  eDateArray=(valElem == undefined) ? $(".cifval_edate",cntxt) : $(cntxt).filter(".cifval_edate");
		for (var i=0;i<sDateArray.length;i++)
		{
			var sDate = $(sDateArray[i]).val();
			var eDate = $(eDateArray[i]).val();
			if(!cifval_compareDates(sDate,eDate))
			{
				valid = false;
				globValid=false;
			}
			else
				valid=true;
			var iVal="_dateid_"+i;
			jQuery.validate.cifval_errorPlacement("Start date should be less than End date",$(sDateArray[i]),iVal,valid,0,options);
		}
		var dateArray=(valElem == undefined) ? $(".cifval_date",cntxt) : $(cntxt).filter(".cifval_date") ;
		for (var i=0;i<dateArray.length;i++) 
		{
			var valid=true;
			var date_val=$(dateArray[i]).val();
			if (!cifval_validateDate(date_val))
			{
				valid=false;
				globValid=false;
			}
			else
			{
				valid=true;
			}
			var iVal="_dateid_"+i;
			jQuery.validate.cifval_errorPlacement("Expected format is dd/mm/yyyy",$(dateArray[i]),iVal,valid,0,options);
		}
		
		var avoidSplChrArr=(valElem == undefined) ? $(".cifval_avoidspcl",cntxt) : $(cntxt).filter(".cifval_avoidspcl") ;
		for (var i=0;i<avoidSplChrArr.length;i++)
		{
			var pattern=/^[a-z0-9\s]+$/i;
			var val = $(".cifval_avoidspcl").val();
			var iVal="_avoidsplchr_"+i;
			if(!pattern.test(val))
			{
				valid = false;
				globValid=false;
			}
			else
				valid=true;
			if(val.length==0)
				jQuery.validate.cifval_errorPlacement("Input is required",$(".cifval_avoidspcl"),iVal,valid,0,options);
			else
				jQuery.validate.cifval_errorPlacement("Special Charcter is not allowed",$(".cifval_avoidspcl"),iVal,valid,0,options);
		}
		
		var avoidSpcArr=(valElem == undefined) ? $(".cifval_avoidspclspace",cntxt) : $(cntxt).filter(".cifval_avoidspclspace") ;
		for (var i=0;i<avoidSpcArr.length;i++)
		{
			var pattern=/^[a-z0-9]+$/i;
			var val = $(".cifval_avoidspclspace").val();
			if(!pattern.test(val))
			{
				valid = false;
				globValid=false;
			}
			else
				valid=true;
			var iVal="_avoidspc_"+i;
			if(val.length==0)
				jQuery.validate.cifval_errorPlacement("Input is required",$(".cifval_avoidspclspace"),iVal,valid,0,options);
			else
				jQuery.validate.cifval_errorPlacement("Any Special Charcter and Space are not allowed",$(".cifval_avoidspclspace"),iVal,valid,0,options);
		}
		
		
		if(options != undefined && options.callback != undefined)
			options.callback(globValid);
		return globValid;
	}
}

function removeCifErrorsOnFirstRow(element,firstrow,requiredonfirstrow)
{
	if(firstrow != undefined && requiredonfirstrow != undefined)
	{
		if($(".cifval_gridrow_"+$(element).closest('tr')[0].id).length == 0 && requiredonfirstrow!=undefined && requiredonfirstrow)
			firstrow.css("height","0px");
	}
//	if($(element).parent()[0].nodeName == "TD")
//	{
//		if($(element).parent().parent().prev().hasClass("jqgfirstrow"))
//		{
//			if($(".cifval_gridrow_"+$(element).parent().parent()[0].id).length == 0)
//				$(element).parent().parent().prev().css("height","0px");
//		}
//	}
}




