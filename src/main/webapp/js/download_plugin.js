$.fn.download=function(options)
{
	options=$.extend({},options);
	return this.each(function(){
		var wrapperUnqId=$.download.getDataHolderUniqId("idDownloadPg_");	
		$(".clsDownloadPg_divWrapper",this).remove("");
		$(this).append($.download.getHtmlContent(wrapperUnqId));
		var wrapperJqSel=$("#"+wrapperUnqId);
		wrapperJqSel.data("options",options);
		$(".clsDownloadPg_FilterHldr",wrapperJqSel).html($.download.getFilterHtml(wrapperUnqId,options))
		$.download.getDataforfilters(wrapperUnqId, wrapperJqSel);
		$.download.loadAndBindFilterHandlr(wrapperUnqId, wrapperJqSel);
	 });
	
}


$.download={
	nxtId:0,
	getDataHolderUniqId:function(prefix)
	{
		return prefix+$.download.nxtId++;
    },
    getHtmlContent:function(wrapperUnqId)
    {
    	var htmlContent='';
    	htmlContent+='<div class="clsDownloadPg_divWrapper" id="'+wrapperUnqId+'">';  
    		htmlContent+='<div class="clsDownloadPg_FilterHldr" style="margin-bottom:15px;"></div>';
    	htmlContent+='</div>';
    	return htmlContent;
    	
    },
    getFilterHtml:function(uniqueId)
	{
    	var htmlContent="";
		htmlContent+="<fieldset>";
			htmlContent+= "<div class='filter_row'>";
			
				htmlContent+= "<div class='filter_divElemt'>";
					htmlContent+= "<div class='filter_divLbl'><label>Data Options:</label></div>";
					htmlContent+= "<select class='filter_divShowInvDataSel flexselect' style='width: 50%;'><option value=1>Plant Data</option><option value=2>Inverter Data</option><option value=3>String Data</option><option value=4>Plant Meter Data</option></select>";
				htmlContent+= "</div>";
				
				htmlContent+= "<div class='filter_divElemt'>";
					htmlContent+= "<div class='filter_divLbl'><label>Start Date:</label></div>";
					htmlContent+= "<input class='filter_divSDSel ' style='width: 50%;' />";
				htmlContent+= "</div>";
				htmlContent+= "<div class='filter_divElemt'>";
					htmlContent+= "<div class='filter_divLbl'><label>End Date:</label></div>";
					htmlContent+= "<input class='filter_divEDSel ' style='width: 50%;' />";
				htmlContent+= "</div>";
				
			htmlContent+= "</div>";
			htmlContent+= "<div class='filter_row'>";
				htmlContent+= "<div class='filter_divElemt'>";
					htmlContent+= "<div class='filter_divLbl'><label>Plants:</label></div>";
					htmlContent+= "<select class='filter_divPlantSel flexselect' style='width: 50%;' ><option value=0>Select Plant</option></select>";
				htmlContent+= "</div>";
			
				htmlContent+= "<div class='filter_divElemt'>";
					htmlContent+= "<div class='filter_divLbl'><label>Inverters:</label></div>";
					htmlContent+= "<select class='filter_divInverterSel flexselect' style='width: 50%;'><option value=0>Select Inverters </option></select>";
				htmlContent+= "</div>";
				
			htmlContent+= "</div>";
			
			htmlContent+= "<div class='filter_row' style='text-align: center;margin-top: 1%;'>";
				htmlContent+= "<input type='button' class='filter_divSearchBttn' value='Download'/>";
				//htmlContent+= "<input type='button' class='filter_divClearBttn' value='Clear'/>";
			htmlContent+= "</div>";
		htmlContent+="</fieldset>";
		return htmlContent;
	},
	getDataforfilters:function(uniqueId, wrapperJq)
	{
		var plantSel=$(".filter_divPlantSel",wrapperJq);
		var inverterModelSel=$(".filter_divInverterSel",wrapperJq);
		var strtDteSel=$(".filter_divSDSel",wrapperJq);
		var endDteSel=$(".filter_divEDSel",wrapperJq);
		strtDteSel.datepicker({changeMonth: true,changeYear: true,dateFormat: 'dd/mm/yy'});
		endDteSel.datepicker({changeMonth: true,changeYear: true,dateFormat: 'dd/mm/yy'});
		
		var plantOptions = 
		{
			asyncVal:false,
			url:'/torp/ServiceRouter/getplants',
			selectHeader:'Plant',
			postParams:{},
			desc:['pwrplantname','pwrplantcode'],
			id:'pwrplantid',
			jsonArray:'plants',
			intialVal:true,
			initblank:true
		}
		loadCombobox(plantSel,plantOptions);
		plantSel.val("");
		plantSel.chosen({enable_split_word_search:false,allow_single_deselect: true,width:"165px"});
		
		plantSel.unbind("change");
		plantSel.change(function(){
			var invplantid=$(this).val();
			var postparams={invplantid:invplantid};
			inverterModelSel.html($.download.getInverter(postparams));
			//inverterModelSel.chosen({enable_split_word_search:false,allow_single_deselect: true,width:"165px"});
		});
	
	},
	loadAndBindFilterHandlr:function(uniqueId, wrapperJq)
	{
		var clearBtn = $(".filter_divClearBttn",wrapperJq);
		clearBtn.unbind('click');
		clearBtn.click(function()
		{
			$(".filter_divSDSel",wrapperJq).val("");
			$(".filter_divEDSel",wrapperJq).val("");
			$(".filter_divPlantSel",wrapperJq).val("");
			$(".filter_divInverterSel",wrapperJq).val("");
			$(".filter_divPlantSel",wrapperJq).trigger("chosen:updated");
			$(".filter_divInverterSel",wrapperJq).trigger("chosen:updated");
		});
		
		var searchbtn = $(".filter_divSearchBttn",wrapperJq);
		searchbtn.unbind('click');
		searchbtn.data("uniqueId",uniqueId);
		searchbtn.data("wrapperJq",wrapperJq);
		searchbtn.click(function()
		{
			var searchbtn=$(this);
			var wrapperJq=$(this).data("wrapperJq");
			var uniqueId=$(this).data("uniqueId");
			var plantId = $(".filter_divPlantSel",wrapperJq).val();
			var inverterId =$(".filter_divInverterSel",wrapperJq).val();
			var strtDte=$(".filter_divSDSel",wrapperJq).val();
			var endDte=$(".filter_divEDSel",wrapperJq).val();
			var invData = $(".filter_divShowInvDataSel",wrapperJq).val();
			if(strtDte==undefined ||endDte== undefined || strtDte=="" ||endDte== "")
			{
				alert("Please Enter Start Date and End Date.")
				return;
			}
			if(invData == 1)
			{
				$.download.getPwrPlantData(wrapperJq,{pwrplantid:plantId,starttime:strtDte,endtime:endDte,showinvdata:invData});
				var htmlContent = $.download.populateData(wrapperJq,1);
				if(htmlContent != undefined && htmlContent.trim().length != 0)
					downLoadAsExcel(htmlContent,'text/csv;charset=utf-8;',"PlantData From "+strtDte+" to "+endDte+".txt");
				else
					alert("No Data Available");
			}
			else if(invData == 2)
			{
				$.download.getPwrInverterData(wrapperJq,{pwrinverterid:inverterId,starttime:strtDte,endtime:endDte,showinvdata:invData,forplantid:plantId});
				var htmlContent = $.download.populateData(wrapperJq,2);
				if(htmlContent != undefined && htmlContent.trim().length != 0)
					downLoadAsExcel(htmlContent,'text/csv;charset=utf-8;',"InverterData From "+strtDte+" to "+endDte+".txt");
				else
					alert("No Data Available");
			}
			else if(invData == 3)
			{
				$.download.getPwrStringData(wrapperJq,{inverterid:inverterId,starttime:strtDte,endtime:endDte,showinvdata:invData,plantid:plantId});
				var htmlContent = $.download.populateData(wrapperJq,3);
				if(htmlContent != undefined && htmlContent.trim().length != 0)
					downLoadAsExcel(htmlContent,'text/csv;charset=utf-8;',"StringData From "+strtDte+" to "+endDte+".txt");
				else
					alert("No Data Available");
			}
			else
			{
				$.download.getPwrPlantMeterData(wrapperJq,{starttime:strtDte,endtime:endDte,pwrplantid:plantId});
				var htmlContent = $.download.populateData(wrapperJq,4);
				if(htmlContent != undefined && htmlContent.trim().length != 0)
					downLoadAsExcel(htmlContent,'text/csv;charset=utf-8;',"PlantMeterData From "+strtDte+" to "+endDte+".txt");
				else
					alert("No Data Available");
			}
		});
	},
	
	getInverter:function(postParams)
	{
		var list="<option value='0'>Select Inverter</option>";
	  	 $.ajax(
	  	 {
	  		url:"/torp/ServiceRouter/getinverters",
	  		dataType:"json",
	  		async:false,
	  		type:'post',
	  		data:postParams,
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

	getPwrInverterData:function(seltr,postParams)
	{
		 if(postParams.showinvdata == 1)
		 {
			seltr.data("pwrinverterdatamaxpower",[]);
			seltr.data("pwrinverterdata",[]);
			return;
		 }
	  	 $.ajax(
	  	 {
	  		url:"/torp/ServiceRouter/getpwrinverterdata",
	  		dataType:"json",
	  		async:false,
	  		type:'post',
	  		data:postParams,
	  		success:function(data,xhr,settings)
	  		{
	  			if(postParams.maxpower && postParams.maxpower == "y")
	  			{
  					seltr.data("pwrinverterdatamaxpower",data.pwrinverterdata);
  					seltr.data("pwrinverterdata",[]);
	  			}
  				else
  				{
  					seltr.data("pwrinverterdata",data.pwrinverterdata);
  					seltr.data("pwrinverterdatamaxpower",[]);
  				}
	  		},
	  		error:function(xhr,status,error){},
	  		complete:function(xhr,status){}
	  	});
	},
	getPwrPlantData:function(seltr,postParams)
	{
		 if(postParams.showinvdata == 2)
		 {
			seltr.data("pwrplantdatamaxpower",[]);
			seltr.data("pwrplantdata",[]);
			return;
		 }
	  	 $.ajax(
	  	 {
	  		url:"/torp/ServiceRouter/getpwrplantdata",
	  		dataType:"json",
	  		async:false,
	  		type:'post',
	  		data:postParams,
	  		success:function(data,xhr,settings)
	  		{
  				if(postParams.maxpower && postParams.maxpower == "y")
  				{
  					seltr.data("pwrplantdatamaxpower",data.pwrplantdata);
  					seltr.data("pwrplantdata",[]);
  				}
  				else
  				{
  					seltr.data("pwrplantdatamaxpower",[]);
  					seltr.data("pwrplantdata",data.pwrplantdata);
  				}
	  		},
	  		error:function(xhr,status,error){},
	  		complete:function(xhr,status){}
	  	});
	},
	getPwrStringData:function(seltr,postParams)
	{
	  	 $.ajax(
	  	 {
	  		url:"/torp/ServiceRouter/getpwrstringdata",
	  		dataType:"json",
	  		async:false,
	  		type:'post',
	  		data:postParams,
	  		success:function(data,xhr,settings)
	  		{
  				seltr.data("pwrstringdata",data.pwrstringdata);
	  		},
	  		error:function(xhr,status,error){},
	  		complete:function(xhr,status){}
	  	});
	},
	
	getPwrPlantMeterData:function(seltr,postParams)
	{
	  	 $.ajax(
	  	 {
	  		url:"/torp/ServiceRouter/getpwrplantmeterdata",
	  		dataType:"json",
	  		async:false,
	  		type:'post',
	  		data:postParams,
	  		success:function(data,xhr,settings)
	  		{
 				seltr.data("pwrplantmeterdata",data.plantmeterdata);
	  		},
	  		error:function(xhr,status,error){},
	  		complete:function(xhr,status){}
	  	});
	},
	populateData:function(wrapperJq,type)
	{
		var data;
		var colArray;
		if(type == 1)
		{
			data = wrapperJq.data("pwrplantdata");
			colArray = { 
					  pwrplantname:"Power Plant Name",
					  pwrplantdatats:"Power Plant Data Time Stamp",
					  plantpower:"Plant Power",
					  meterreading:"Meter Reading",
					  plantdatairradiance:"Irradiance",
					  plantmoduletemp:"Module Temperature",
					  plantambtemp:"Ambient Temperature",
					  plantcurdayenegry:"Plant Current Day Enegry",
					  iscalulatedfrominv:"Is Calulated From Inverter"
					}
		}
		else if(type == 2)
		{
			data = wrapperJq.data("pwrinverterdata");
			colArray = { 
					  invertername:"Inverter Name",
					  pwrinvdatats:"Inverter Data Time Stamp",
					  phonevolt:"Phase -I Voltage",
					  phonecurr:"Phase -I Current",
					  phonefreq:"Phase -I Frequency",
					  phtwovolt:"Phase -II Voltage",
					  phtwocurr:"Phase -II Current",
					  phtwofreq:"Phase -II Frequency",
					  phthreevolt:"Phase -III Voltage",
					  phthreecurr:"Phase -III Current",
					  phthreefreq:"Phase -III Frequency",
					  netvolt:"Net Voltage",
					  netcurr:"Net Current",
					  netfreq:"Net Frequency",
					  powerfactor:"Power Factor",
					  phonepower:"Phase -I Power",
					  phtwopower:"Phase -II Power",
					  phthreepower:"Phase -III Power",
					  invpower:"Inverter Power",
					  currdayenergy:"Inverter Current Day Enegry",
					  invtemp:"Inverter Temperature",
					  invstatus:"Inverter Status",
					  inverrorcode:"Error Code",
					}
		}
		else if(type == 3)
		{
			data = wrapperJq.data("pwrstringdata");
			colArray = { 
					  plantname:"Plant Name",
					  invertername:"Inverter Name",
					  stringname:"String Name",
					  pwrstringdatats:"String Data Time Stamp",
					  stringdcvoltage:"DC Voltage",
					  stringdccurrent:"DC Current",
					  stringpower:"DC Power",
					}
		}
		else
		{
			data = wrapperJq.data("pwrplantmeterdata");
			colArray = { 
					  plantname:"Plant Name",
					  metername:"Meter Name",
					  meterdatats:"Meter Data Time Stamp",
					  meterdata:"Meter Data"
					}
		}
		var htmlContent = "";
		if(data.length == 0)
			return;
		for(arr in colArray)
			htmlContent += colArray[arr]+"\t";
		htmlContent += "\n";
		$.each(data,function(i,row)
		{
			for (var key in colArray)
				if(row[key] != undefined)
					htmlContent +=  row[key]+"\t";
				else
					htmlContent +=  " "+"\t";
			htmlContent += "\n";
		});
		return htmlContent;
	}
	
}

