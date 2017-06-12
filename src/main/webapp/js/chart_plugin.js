$.fn.charttp=function(options)
{
	options=$.extend({},options);
	return this.each(function(){
		var wrapperUnqId=$.charttp.getDataHolderUniqId("idcharttpPg_");	
		$(".clscharttpPg_divWrapper",this).remove("");
		$(this).append($.charttp.getHtmlContent(wrapperUnqId));
		var wrapperJqSel=$("#"+wrapperUnqId);
		wrapperJqSel.data("options",options);
		$(".clscharttpPg_FilterHldr",wrapperJqSel).html($.charttp.getFilterHtml(wrapperUnqId,options))
		$.charttp.getDataforfilters(wrapperUnqId, wrapperJqSel);
		$.charttp.loadAndBindFilterHandlr(wrapperUnqId, wrapperJqSel);
		
	 });
	
}


$.charttp={
	nxtId:0,
	getDataHolderUniqId:function(prefix)
	{
		return prefix+$.charttp.nxtId++;
    },
    getHtmlContent:function(wrapperUnqId)
    {
    	var htmlContent='';
    	htmlContent+='<div class="clscharttpPg_divWrapper" id="'+wrapperUnqId+'">';  
    		htmlContent+='<div class="clscharttpPg_FilterHldr" style="margin-bottom:15px;"></div>';
			htmlContent+="<div class='clscharttpPg_divChartPvsIHldr_"+wrapperUnqId+"' style='margin-top:15px;border: 1px solid #49BA8E;'></div>";
//			htmlContent+="<div class='clscharttpPg_divChartIDEHldr_"+wrapperUnqId+"' style='margin-top:15px;border: 1px solid #49BA8E;'></div>";
//			htmlContent+="<div class='clscharttpPg_divChartTAMHldr_"+wrapperUnqId+"' style='margin-top:15px;border: 1px solid #49BA8E;'></div>";
    	htmlContent+='</div>';
    	return htmlContent;
    	
    },
    getFilterHtml:function(uniqueId)
	{
    	var htmlContent="";
		htmlContent+="<fieldset>";
			htmlContent+= "<div class='filter_row'>";
				htmlContent+= "<div class='filter_divElemt'>";
					htmlContent+= "<div class='filter_divLbl'><label>Start Date:</label></div>";
					htmlContent+= "<input class='filter_divSDSel ' style='width: 50%;' />";
				htmlContent+= "</div>";
				htmlContent+= "<div class='filter_divElemt'>";
					htmlContent+= "<div class='filter_divLbl'><label>End Date:</label></div>";
					htmlContent+= "<input class='filter_divEDSel ' style='width: 50%;' />";
				htmlContent+= "</div>";
				
				htmlContent+= "<div class='filter_divElemt'>";
					htmlContent+= "<div class='filter_divLbl'><label>Chart:</label></div>";
					htmlContent+= "<select class='filter_divChartSel flexselect' style='width: 50%;'><option value=0>Select Chart</option><option value=1>Power and Irradiance vs Time</option><option value=2>Current Day Energy vs Time</option><option value=3>Maximum Power vs Date - Daily Chart</option><option value=4>Daily Energy vs Date - Daily Chart</option><option value=5>Temperature vs Time</option><option value=6>DC Voltage & Irradiance vs Time</option><option value=7>DC Current & Irradiance vs Time</option><option value=8>DC Power & Irradiance vs Time</option></select>";
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
				
				htmlContent+= "<div class='filter_divElemt clscharttpPg_ChartOpts'>";
					htmlContent+= "<div class='filter_divLbl'><label>Chart Options:</label></div>";
					htmlContent+= "<select class='filter_divShowInvDataSel flexselect' style='width: 50%;'><option value=0>Plant & Inverter Data</option><option value=1>Plant Data</option><option value=2>Inverter Data</option></select>";
				htmlContent+= "</div>";
				
			htmlContent+= "</div>";
			
			htmlContent+= "<div class='filter_row' style='text-align: center;margin-top: 1%;'>";
				htmlContent+= "<input type='button' class='filter_divSearchBttn' value='Go'/>";
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
			inverterModelSel.html($.charttp.getInverter(postparams));
			//inverterModelSel.chosen({enable_split_word_search:false,allow_single_deselect: true,width:"165px"});
		});
	
	},
	loadAndBindFilterHandlr:function(uniqueId, wrapperJq)
	{
		var clearBtn = $(".filter_divClearBttn",wrapperJq);
		var chartTypeJq = $(".filter_divChartSel",wrapperJq);
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
		
		chartTypeJq.unbind('change');
		chartTypeJq.data("wrapperJq",wrapperJq);
		chartTypeJq.change(function()
		{
			var wrapperJq = $(this).data("wrapperJq");
			if($(this).val() == 6 || $(this).val() == 7 || $(this).val() == 8)
				$(".clscharttpPg_ChartOpts",wrapperJq).hide();
			else
				$(".clscharttpPg_ChartOpts",wrapperJq).show();
			if($(this).val() == 1)
				$(".filter_divShowInvDataSel",wrapperJq).html("<option value=0>Plant & Inverter Data</option><option value=1>Plant Data</option>");
			else
				$(".filter_divShowInvDataSel",wrapperJq).html("<option value=0>Plant & Inverter Data</option><option value=1>Plant Data</option><option value=2>Inverter Data</option>");
			
		})
		
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
			var chartType = parseInt($(".filter_divChartSel",wrapperJq).val());
			var invData = $(".filter_divShowInvDataSel",wrapperJq).val();
			if(strtDte==undefined ||endDte== undefined || strtDte=="" ||endDte== "")
			{
				alert("Please Enter Start Date and End Date.")
				return;
			}
			if(chartType == 0)
			{
				alert("Please select Chart");
				return;
			}
			
			switch (chartType) {
			case 1:
			case 2:	$.charttp.getPwrInverterData(wrapperJq,{pwrinverterid:inverterId,forplantid:plantId,starttime:strtDte,endtime:endDte,showinvdata:invData});
					$.charttp.getPwrPlantData(wrapperJq,{pwrplantid:plantId,starttime:strtDte,endtime:endDte,showinvdata:invData});
					break;
			case 3:	$.charttp.getPwrInverterData(wrapperJq,{pwrinverterid:inverterId,forplantid:plantId,starttime:strtDte,endtime:endDte,maxpower:"y",showinvdata:invData});
					$.charttp.getPwrPlantData(wrapperJq,{pwrplantid:plantId,starttime:strtDte,endtime:endDte,maxpower:"y",showinvdata:invData});
					break;
			case 4:	$.charttp.getPwrInverterData(wrapperJq,{pwrinverterid:inverterId,forplantid:plantId,starttime:strtDte,endtime:endDte,daywise:"y",showinvdata:invData});
					$.charttp.getPwrPlantData(wrapperJq,{pwrplantid:plantId,starttime:strtDte,endtime:endDte,daywise:"y",showinvdata:invData});
					break;
			case 5:	$.charttp.getPwrInverterData(wrapperJq,{pwrinverterid:inverterId,forplantid:plantId,starttime:strtDte,endtime:endDte,showinvdata:invData});
					$.charttp.getPwrPlantData(wrapperJq,{pwrplantid:plantId,starttime:strtDte,endtime:endDte,showinvdata:invData});
					break;
			case 6:	$.charttp.getStringData(wrapperJq,{inverterid:inverterId,plantid:plantId,starttime:strtDte,endtime:endDte});
					$.charttp.getPwrPlantData(wrapperJq,{pwrplantid:plantId,starttime:strtDte,endtime:endDte,showinvdata:1,iscalulatedfrominv:"n"});
					break;
			case 7:	$.charttp.getStringData(wrapperJq,{inverterid:inverterId,plantid:plantId,starttime:strtDte,endtime:endDte});
					$.charttp.getPwrPlantData(wrapperJq,{pwrplantid:plantId,starttime:strtDte,endtime:endDte,showinvdata:1,iscalulatedfrominv:"n"});
					break;
			case 8:	$.charttp.getStringData(wrapperJq,{inverterid:inverterId,plantid:plantId,starttime:strtDte,endtime:endDte});
					$.charttp.getPwrPlantData(wrapperJq,{pwrplantid:plantId,starttime:strtDte,endtime:endDte,showinvdata:1,iscalulatedfrominv:"n"});
					break;
			
			}
			$.charttp.getchart(uniqueId, wrapperJq, chartType);
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
			seltr.data("invertercount",null);
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
  					seltr.data("invertercount",data.invertercount);
	  			}
  				else
  				{
  					seltr.data("pwrinverterdata",data.pwrinverterdata);
  					seltr.data("pwrinverterdatamaxpower",[]);
  					seltr.data("invertercount",data.invertercount);
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
	getStringData:function(seltr,postParams)
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
 				seltr.data("stringdata",data.pwrstringdata);
 				seltr.data("totalstringscount",data.totalstringscount);
	  		},
	  		error:function(xhr,status,error){},
	  		complete:function(xhr,status){}
	  	});
	},
	
   getchart:function(wrapperUnqId,wrapperJqSel,chartType)
   {
	   var uniqueKey=wrapperUnqId;
	   var options=wrapperJqSel.data("options");
	   var pwrinverterdata=wrapperJqSel.data("pwrinverterdata");
	   var pwrplantdata=wrapperJqSel.data("pwrplantdata");
	   var pwrplantdatamaxpower=wrapperJqSel.data("pwrplantdatamaxpower");
	   var pwrinverterdatamaxpower=wrapperJqSel.data("pwrinverterdatamaxpower");
	   var invertercount = wrapperJqSel.data("invertercount");
	   var pwrstringdata=wrapperJqSel.data("stringdata");
	   var totalstringscount = wrapperJqSel.data("totalstringscount");
	   if(totalstringscount == undefined)
		   totalstringscount = 0;
	   var myData = [];
	   var formatTime = d3.time.format("%Y-%m-%d %H:%M");
	   if(chartType == 6 || chartType == 7 || chartType == 8)
	   {
			    var forstringid=0;
			    var stringname="";
			    var stringpower=[];
			    var stringcurrent=[];
			    var stringvoltage=[];
			    var stringc=[];
			    var stringv=[];
			    var stringp=[];
			    
		   		$.each(pwrstringdata, function(i,string)
				{
					if (i == 0) {
						forstringid = string.forstringid;
						stringname=string.stringname;
					}
				   	var x= string.pwrstringdatats;
					var x1 = formatTime.parse(x);
					var nstringpower = string.stringpower;
					var nstringcurrent = string.stringdccurrent;
					var nstringvoltage = string.stringdcvoltage;
					
					if(forstringid != string.forstringid )
					{
						if(forstringid!=0) {
								stringvoltage.push({values:stringv,key:stringname+' Voltage',type: 'line', yAxis : 1});
								stringcurrent.push({values:stringc,key:stringname+' Current',type: 'line', yAxis : 1}); 
								stringpower.push({values:stringp,key:stringname+ ' Power' ,type: 'line', yAxis : 1}); 
						}
						forstringid = string.forstringid;
						stringname = string.stringname;
						stringc=[];
						stringv=[];
						stringp=[];
					}
					stringc.push({x:x1.getTime(),y:nstringcurrent});
					stringv.push({x:x1.getTime(),y:nstringvoltage});
					stringp.push({x:x1.getTime(),y:nstringpower});
					if (i == pwrstringdata.length-1) 
					{
						stringcurrent.push({values:stringc,key:stringname+' Current',type: 'line', yAxis : 1}); 
						stringvoltage.push({values:stringv,key:stringname+' Voltage',type: 'line', yAxis : 1});
						stringpower.push({values:stringp,key:stringname+ ' Power' ,type: 'line', yAxis : 1}); 
					}
				});
		   		
		   	   var forplantid=0;
			   var plantname="";
			   var splantdatairradianceval=[];
			   var plantrad=[];
			   
			   $.each(pwrplantdata, function(i,plant)
				{
					if (i == 0) {
						forplantid = plant.forplantid;
						plantname=plant.pwrplantname;
					}
				   	var x=plant.pwrplantdatats;
				   	var x1 = formatTime.parse(x);
					var nplantrad=plant.plantdatairradiance;
					
					
					if(forplantid != plant.forplantid)
					{
						if(forplantid!=0) {
								splantdatairradianceval.push({values:plantrad,key:plantname+ ' Irradiance/10',type: 'line', yAxis : 2,interpolate:'step-before'});
						}
						forplantid = plant.forplantid;
						plantname=plant.pwrplantname;
						plantrad=[];
					}
					plantrad.push({x:x1.getTime(),y:nplantrad/10});
					if (i == pwrplantdata.length-1) 
						splantdatairradianceval.push({values:plantrad,key:plantname+ ' Irradiance/10',type: 'line', yAxis : 2,interpolate:'step-before'});
				});
				   
	   }
	   else
	   {
		   var forplantid=0;
		   var plantname="";
		   var plantdatairradianceval=[];
		   var plantmoduletempval=[];
		   var plantambtempval=[];
		   var plantcurdayenergy=[];
		   var plantpower=[];
		   var plantrad=[];
		   var plantmt=[];
		   var plantat=[];
		   var plantct=[];
		   var plantpwr=[];
		   
		   $.each(pwrplantdata, function(i,plant)
			{
				if (i == 0) {
					forplantid = plant.forplantid;
					plantname=plant.pwrplantname;
				}
			   	var x=plant.pwrplantdatats;
			   	var x1 = formatTime.parse(x);
				var nplantrad=plant.plantdatairradiance;
				var nplantmt=plant.plantmoduletemp;
				var nplantat=plant.plantambtemp;
				var nplantct=plant.plantcurdayenegry;
				var nplantpwr=plant.plantpower;
				
				
				if(forplantid != plant.forplantid )
				{
					if(forplantid!=0) {
							plantdatairradianceval.push({values:plantrad,key:plantname+ ' Irradiance/10',type: 'line', yAxis : 2,interpolate: 'step-before'});
							plantmoduletempval.push({values:plantmt,key:plantname+' Module Temperature',type: 'line', yAxis : 2,interpolate: 'step-before'}); 
							plantambtempval.push({values:plantat,key:plantname+' Ambient Temperature',type: 'line', yAxis : 2,interpolate: 'step-before'});
							plantcurdayenergy.push({values:plantct,key:plantname+ ' Current Day Energy' }); 
							plantpower.push({values:plantpwr,key:plantname+ ' Power',type: 'line', yAxis : 1}); 
					}
					forplantid = plant.forplantid;
					plantname=plant.pwrplantname;
					plantrad=[];
					plantmt=[];
					plantat=[];
					plantct=[];
					plantpwr=[];
				}
				if(plant.iscalulatedfrominv == "n")
				{
					plantrad.push({x:x1.getTime(),y:nplantrad/10});
					plantmt.push({x:x1.getTime(),y:nplantmt});
					plantat.push({x:x1.getTime(),y:nplantat});
				}
				if(plant.iscalulatedfrominv == "y")
				{
					plantct.push({x:x1.getTime(),y:nplantct});
					plantpwr.push({x:x1.getTime(),y:nplantpwr/1000});
				}
				
				if (i == pwrplantdata.length-1) 
				{
					plantdatairradianceval.push({values:plantrad,key:plantname+ ' Irradiance/10',type: 'line', yAxis : 2,interpolate: 'step-before'});
					plantmoduletempval.push({values:plantmt,key:plantname+' Module Temperature',type: 'line', yAxis : 2,interpolate: 'step-before'}); 
					plantambtempval.push({values:plantat,key:plantname+' Ambient Temperature',type: 'line', yAxis : 2,interpolate: 'step-before'});
					plantcurdayenergy.push({values:plantct,key:plantname+ ' Current Day Energy' }); 
					plantpower.push({values:plantpwr,key:plantname+ ' Power',type: 'line', yAxis : 1}); 
				}
			});
		   
		   
		   
		   var forinverterid=0;
		   var currdayenergy=[];
		   var invtemp=[];
		   var invpower=[];
		   var invertername="";
		   var inverterTempArray = [];
		   var inverterEnergyArray = [];
		   var inverterPowerwArray = [];
		   $.each(pwrinverterdata, function(i,pwrinvdata)
			{
				if (i == 0) {
					forinverterid = pwrinvdata.forinverterid;
					invertername=pwrinvdata.invertername;
				}
			   	var x=pwrinvdata.pwrinvdatats;
			   	var x1 = formatTime.parse(x);
				var ninvtemp=pwrinvdata.invtemp;
				var ncurrdayenergy=pwrinvdata.currdayenergy;
				var ninvpower=pwrinvdata.invpower;
				
				if(forinverterid!=pwrinvdata.forinverterid)
				{
					if(forinverterid!=0) {
						inverterTempArray.push({values:invtemp,key:invertername+ ' Temp' ,type: 'line', yAxis : 2,interpolate: 'step-before'}); // ,color: '#'+(j+1)+''+(j+1)+''+(j+1)+''
						inverterEnergyArray.push({values:currdayenergy,key:invertername+' Energy'}); // ,color: '#'+(j+2)+''+(j+2)+''+(j+2)+''
						inverterPowerwArray.push({values:invpower,key:invertername+' Power',type: 'line', yAxis : 1}); //,color: '#'+(j+3)+''+(j+3)+''+(j+3)+''
					}
					forinverterid=pwrinvdata.forinverterid;
					invertername=pwrinvdata.invertername;
					invtemp=[];
					invpower=[];
					currdayenergy=[];
				}
				invtemp.push({x:x1.getTime(),y:ninvtemp});	 
				currdayenergy.push({x:x1.getTime(),y:ncurrdayenergy});	
				invpower.push({x:x1.getTime(),y:ninvpower/1000});
				
				if(i==pwrinverterdata.length-1)
				{
					inverterTempArray.push({values:invtemp,key:invertername+ ' Temp' ,type: 'line', yAxis : 2,interpolate: 'step-before'}); // ,color: '#'+(j+1)+''+(j+1)+''+(j+1)+''
					inverterEnergyArray.push({values:currdayenergy,key:invertername+' Energy'}); // ,color: '#'+(j+2)+''+(j+2)+''+(j+2)+''
					inverterPowerwArray.push({values:invpower,key:invertername+' Power',type: 'line', yAxis : 1}); //,color: '#'+(j+3)+''+(j+3)+''+(j+3)+''
				}
			});
		   
		   var forplantidmx=0;
		   var plantnamemx="";
		   var plantpowermx=[];
		   var plantpwrmx=[];
		   
		   $.each(pwrplantdatamaxpower, function(i,plant)
			{
				if (i == 0) {
					forplantidmx = plant.forplantid;
					plantnamemx=plant.pwrplantname;
				}
			   	var x=plant.pwrplantdatats;
			   	var x1 = formatTime.parse(x);
				var nplantpwrmx=plant.plantpower;
				
				if(forplantidmx != plant.forplantid)
				{
					if(forplantidmx!=0) {
						plantpowermx.push({values:plantpwrmx,key:plantnamemx+ ' Power'}); 
					}
					forplantidmx = plant.forplantid;
					plantnamemx=plant.pwrplantname;
					plantpwr=[];
				}
				plantpwrmx.push({x:x1.getTime(),y:nplantpwrmx});
				if(i == pwrplantdatamaxpower.length-1)
					plantpowermx.push({values:plantpwrmx,key:plantnamemx+ ' Power'}); 
			});
		   
		   
		   var forinverteridmx=0;
		   var invpowermx=[];
		   var inverternamemx="";
		   var inverterPowerMx = [];
		   $.each(pwrinverterdatamaxpower, function(i,pwrinvdata)
			{
				if (i == 0) {
					forinverteridmx = pwrinvdata.forinverterid;
					inverternamemx=pwrinvdata.invertername;
				}
			   	var x=pwrinvdata.pwrinvdatats;
			   	var x1 = formatTime.parse(x);
				var ninvpowermx=pwrinvdata.invpower;
				
				if(forinverteridmx!=pwrinvdata.forinverterid)
				{
					if(forinverteridmx!=0) {
						inverterPowerMx.push({values:invpowermx,key:inverternamemx+ ' Power'}); // ,color: '#'+(j+1)+''+(j+1)+''+(j+1)+''
					}
					forinverteridmx=pwrinvdata.forinverterid;
					inverternamemx=pwrinvdata.invertername;
					invpowermx=[];
				}
				invpowermx.push({x:x1.getTime(),y:ninvpowermx});	
				if(i == pwrinverterdatamaxpower.length-1)
					inverterPowerMx.push({values:invpowermx,key:inverternamemx+ ' Power'}); // ,color: '#'+(j+1)+''+(j+1)+''+(j+1)+''
			});
	   }
		   
	   var myData=[];
	   var displayStr = "";
	   var xAxisLabel1 = "";
	   var xAxisLabel2 = "";
	   var chartStyle = 1;
	   
	   //chart 1
	   
	  switch (chartType) {
			case 1:
			   for(index in inverterPowerwArray)
					myData.push(inverterPowerwArray[index]);
			   for(index in plantdatairradianceval)
				   myData.push(plantdatairradianceval[index]);
			   for(index in plantpower)
				   myData.push(plantpower[index]);
			   $.charttp.checkAndInsertVal(myData);
			   /*
			   for(index in inverterTempArray)
				   myData.push(inverterTempArray[index]);
			   for(index in plantmoduletempval)
				   myData.push(plantmoduletempval[index]);
			   for(index in plantambtempval)
				   myData.push(plantambtempval[index]);
				   */
			   displayStr = "Power and Irradiance vs Time";
			   xAxisLabel1 = "Power(KW)";
			   xAxisLabel2 = "Irradiance(W/SQ.Mtr)";
			   break;
			case 2:
			   for(index in inverterEnergyArray)
				   myData.push(inverterEnergyArray[index]);
			   for(index in plantcurdayenergy)
				   myData.push(plantcurdayenergy[index]);
			   displayStr = "Inverter Day Energy vs Time";
			   xAxisLabel1 = "Energy(W)";
			   break;
			case 3:
				for(index in inverterPowerMx)
					myData.push(inverterPowerMx[index]);
			    for(index in plantpowermx)
			    	myData.push(plantpowermx[index]);
			    displayStr = "Maximum Power vs Date";
			    xAxisLabel1 = "Maximum Power(W)";
		    break;
			case 4:
			   for(index in inverterEnergyArray)
				   myData.push(inverterEnergyArray[index]);
			   for(index in plantcurdayenergy)
				   myData.push(plantcurdayenergy[index]);
			   displayStr = "Daily Energy vs Date";
			   xAxisLabel1="Daily Energy(W)";
			   break;
			case 5:
				   for(index in inverterTempArray)
					   myData.push(inverterTempArray[index]);
				   for(index in plantmoduletempval)
					   myData.push(plantmoduletempval[index]);
				   for(index in plantmoduletempval)
					   myData.push(plantambtempval[index]);
				   $.charttp.checkAndInsertVal(myData);
				   displayStr = "Temperature vs Time";
				   xAxisLabel1="Temperature(C)";
				   chartStyle = 2;
				   break;
			case 6:
				   for(index in splantdatairradianceval)
					   myData.push(splantdatairradianceval[index]);
				   for(index in stringvoltage)
					   myData.push(stringvoltage[index]);
				   $.charttp.checkAndInsertVal(myData);
				   displayStr = "DC Voltage & Irradiance vs Time";
				   xAxisLabel1 = "DC Voltage(V)";
				   xAxisLabel2 = "Irradiance(W/SQ.Mtr)";
				   break;
			case 7:
				   for(index in splantdatairradianceval)
					   myData.push(splantdatairradianceval[index]);
				   for(index in stringcurrent)
					   myData.push(stringcurrent[index]);
				   $.charttp.checkAndInsertVal(myData);
				   displayStr = "DC Current & Irradiance vs Time";
				   xAxisLabel1 = "DC Current(Amp)";
				   xAxisLabel2 = "Irradiance(W/SQ.Mtr)";
				   break;
			case 8:
				   for(index in splantdatairradianceval)
					   myData.push(splantdatairradianceval[index]);
				   for(index in stringpower)
					   myData.push(stringpower[index]);
				   $.charttp.checkAndInsertVal(myData);
				   displayStr = "DC Power & Irradiance vs Time";
				   xAxisLabel1 = "DC Power(W)";
				   xAxisLabel2 = "Irradiance(W/SQ.Mtr)";
				   break;
	  	}
	    
	   	 $(".clscharttpPg_divChartPvsIHldr_"+wrapperUnqId,wrapperJqSel).html($.charttp.getSvgHtmlContent(1,uniqueKey,displayStr,invertercount));
//		 $(".clscharttpPg_divChartIDEHldr_"+wrapperUnqId,wrapperJqSel).html($.charttp.getSvgHtmlContent(2,uniqueKey,"Inverter Day Energy vs Time"));
//		 $(".clscharttpPg_divChartTAMHldr_"+wrapperUnqId,wrapperJqSel).html($.charttp.getSvgHtmlContent(3,uniqueKey,"Inverter Temperature/Plant Ambient Temperature/Plant Module Temperature vs Time"));
		 
	   	 if(chartType == 1 || chartType == 6 || chartType == 7 || chartType == 8)
	   		 $.charttp.calMultiChart('#idprndbPg_chartHldrNo1_'+uniqueKey,myData,xAxisLabel1,xAxisLabel2);
	   	 else
	   		 $.charttp.calChart('#idprndbPg_chartHldrNo1_'+uniqueKey,myData,xAxisLabel1,chartType,chartStyle);//2
//		 $.charttp.calChart('#idprndbPg_chartHldrNo3_'+uniqueKey,myData3,"Temperature");
	},
	getSvgHtmlContent:function(index,uniqueKey,label,inverterCount)
	{
		var htmlContent = "<div id='idprndbPg_chartHldrNo"+index+"_"+uniqueKey+"' class='with-3d-shadow with-transitions'>";
		htmlContent += "<span style='width:100%;color:white;background:#49BA8E;text-align:center;float: left;'><b>"+label+"</b></span>";
		if(inverterCount != undefined && inverterCount > 0)
			htmlContent += "<span style='width:100%;margin-top: 5px;color:white;background:#49BA8E;text-align:center;float: left;'><b>TOTAL INVERTERS:"+inverterCount+"</b></span>";
		htmlContent +="<svg style='height: 400px;width:100%;display:block;'></svg>";
		htmlContent +="</div>";
		return htmlContent;
	},
	checkAndInsertVal:function(myData)
	{
		var arr = [];
		var arrrev = [];
		for(data in myData)
		{
			if(myData[data].values[0] != undefined)
				arr.push(myData[data].values[0].x);
			if(myData[data].values.length > 0)
			{
				var lastIndex = myData[data].values.length - 1;
				if(myData[data].values[lastIndex] != undefined)
					arrrev.push(myData[data].values[lastIndex].x);
			}
		}
		arr.sort();
		arrrev.sort();
		for(data in myData)
		{
			if(myData[data].values[0] != undefined && myData[data].values[0].x != arr[0])
				myData[data].values.unshift({x:arr[0],y: 0});
			if(myData[data].values.length > 0)
			{
				var lastIndex = myData[data].values.length - 1;
				if(myData[data].values[lastIndex] != undefined && myData[data].values[lastIndex].x != arrrev[arrrev.length - 1])
					myData[data].values.push({x:arrrev[arrrev.length - 1],y: 0});
			}
		}
	},
	calChart:function(holder,data,yAxisLabel,chartType,chartStyle)
	{
//		var barTimespan = 10 * 60;
//		var halfBarXMin = data[0].values[0].x - barTimespan / 2 * 1000;
//		var halfBarXMax = data[0].values[data[0].values.length-1].x + barTimespan / 2 * 1000;
//		var chartStyle = 1; // 1 - bar, 2 - line
		nv.addGraph(function() {
		     
		     if (chartStyle == 2) {
				 var chart = nv.models.lineChart();

				 // .color(['#68c'])			 
				 chart
	    	       .xScale(d3.time.scale()) // use a time scale instead of plain numbers in order to get nice round default values in the axis
//	        	   .forceX([halfBarXMin, halfBarXMax])
		           .useInteractiveGuideline(true) // check out the css that turns the guideline into this nice thing
		           .margin({"left": 80, "right": 50, "top": 20, "bottom": 80})
	    	       .duration(0) 
		            //Show the legend, allowing users to turn on/off line series. 
			       ;
	         }
	         else {
                 var chart = nv.models.multiBarChart();

                         // .color(['#68c'])
                 chart
//.transitionDuration(350)
			      .reduceXTicks(true)   //If 'false', every single x-axis tick label will be rendered.
			      .rotateLabels(0)      //Angle to rotate x-axis labels.
			      .showControls(false)   //Allow user to switch between 'Grouped' and 'Stacked' mode.
			      .groupSpacing(0.1)    //Distance between each group of bars.
				  ;
	         
	         }
	         
			 var tickMultiFormat = d3.time.format.multi([
			                                             ["%-I:%M%p", function(d) { return d.getMinutes(); }], // not the beginning of the hour
			                                             ["%-I%p", function(d) { return d.getHours(); }], // not midnight
			                                             ["%b %-d", function(d) { return d.getDate() != 1; }], // not the first of the month
			                                             ["%b %-d", function(d) { return d.getMonth(); }], // not Jan 1st
			                                             ["%Y", function() { return true; }]
			                                         ]);
	        chart.xAxis
	        		.showMaxMin(false)
	        		.axisLabel('Time')
	                .tickPadding(10)
	                .tickFormat(function (d) 
	                 { 
	                	if(chartType == 3 || chartType == 4) 
	                		return d3.time.format('%b %d')(new Date(d));
	                	else
	                		return d3.time.format('%b %d %I%p')(new Date(d));
	                 })
	        ;
	//      
			 chart.yAxis     //Chart y-axis settings
			 .axisLabel(yAxisLabel)
			 .showMaxMin(false)
			 .tickFormat(d3.format('.02f'));
			 
	/* Done setting the chart up? Time to render it!*/
	
			 d3.select(holder+' svg')    //Select the <svg> element you want to render the chart in.   
			 .datum(data) 
			 .call(chart);          //Finally, render the chart!
			 var tsFormat = d3.time.format('%b %-d, %Y %I:%M%p');
			 
			 if (chartStyle == 2) {
				 var contentGenerator = chart.interactiveLayer.tooltip.contentGenerator();
				 var tooltip = chart.interactiveLayer.tooltip;
				 tooltip.contentGenerator(function (d) 
				 {
					 d.value = data[0].values[d.index].x;
					 return contentGenerator(d); 
				 });
				 tooltip.headerFormatter(function (d) { return tsFormat(new Date(d)); });
			 }
	
	//Update the chart when window resizes.
			 nv.utils.windowResize(chart.update);
			 
			 return chart;
			});
	},
	
	calMultiChart:function(holder,data,yAxisLabel1,yAxisLabel2 )
	{
//		var barTimespan = 10 * 60;
//		var halfBarXMin = data[0].values[0].x - barTimespan / 2 * 1000;
//		var halfBarXMax = data[0].values[data[0].values.length-1].x + barTimespan / 2 * 1000;
		
		nv.addGraph(function() {
			 var chart = nv.models.multiChart();

			 // .color(['#68c'])			 
			 chart
	           //.xScale(d3.time.scale()) // use a time scale instead of plain numbers in order to get nice round default values in the axis
	           //.forceX([halfBarXMin, halfBarXMax])
	           //.useInteractiveGuideline(true) // check out the css that turns the guideline into this nice thing
	           .margin({"left": 80, "right": 50, "top": 20, "bottom": 80})
	           //.duration(0) 
	            //Show the legend, allowing users to turn on/off line series. 
	       ;
			 var tickMultiFormat = d3.time.format.multi([
			                                             ["%-I:%M%p", function(d) { return d.getMinutes(); }], // not the beginning of the hour
			                                             ["%-I%p", function(d) { return d.getHours(); }], // not midnight
			                                             ["%b %-d", function(d) { return d.getDate() != 1; }], // not the first of the month
			                                             ["%b %-d", function(d) { return d.getMonth(); }], // not Jan 1st
			                                             ["%Y", function() { return true; }]
			                                         ]);
	        chart.xAxis
	        		.showMaxMin(false)
	        		.axisLabel('Time')
	                .tickPadding(10)
	                .tickFormat(function (d) 
	                 { 
	                	return d3.time.format('%b %d %I%p')(new Date(d));
	                 });
	        ;
	//      
			 chart.yAxis1     //Chart y-axis settings
			 .axisLabel(yAxisLabel1)
			 .showMaxMin(false)
			 .tickFormat(d3.format('.02f'));
			 
			 chart.yAxis2     //Chart y-axis settings
			 .axisLabel(yAxisLabel2)
			 .showMaxMin(false)
			 .tickFormat(d3.format('.02f'));
			 
			 
	/* Done setting the chart up? Time to render it!*/
	
			 d3.select(holder+' svg')    //Select the <svg> element you want to render the chart in.   
			 .datum(data) 
			 .call(chart);          //Finally, render the chart!
	
	//Update the chart when window resizes.
			 nv.utils.windowResize(chart.update);
			 
			 return chart;
			});
	}
	
  
}

