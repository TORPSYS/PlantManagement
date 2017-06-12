$.fn.dailychart=function(options)
{
	options=$.extend({},options);
	return this.each(function(){
		var wrapperUnqId=$.dailychart.getDataHolderUniqId("idDailyCharttpPg_");	
		$(".clsDailyCharttpPg_divWrapper",this).remove("");
		$(this).append($.dailychart.getHtmlContent(wrapperUnqId));
		var wrapperJqSel=$("#"+wrapperUnqId);
		wrapperJqSel.data("options",options);
		$(".clsDailyCharttpPg_FilterHldr",wrapperJqSel).html($.dailychart.getFilterHtml(wrapperUnqId,options))
		$.dailychart.getDataforfilters(wrapperUnqId, wrapperJqSel);
		$.dailychart.loadAndBindFilterHandlr(wrapperUnqId, wrapperJqSel);
		
	 });
	
}


$.dailychart={
	nxtId:0,
	getDataHolderUniqId:function(prefix)
	{
		return prefix+$.dailychart.nxtId++;
    },
    getHtmlContent:function(wrapperUnqId)
    {
    	var htmlContent='';
    	htmlContent+='<div class="clsDailyCharttpPg_divWrapper" id="'+wrapperUnqId+'">';  
    		htmlContent+='<div class="clsDailyCharttpPg_FilterHldr" style="margin-bottom:15px;"></div>';
    		htmlContent+="<div class='clsDailyCharttpPg_divChartPvsIHldr_"+wrapperUnqId+"' style='margin-top:15px;border: 1px solid #49BA8E;'></div>";
			htmlContent+="<div class='clsDailyCharttpPg_divChartIDEHldr_"+wrapperUnqId+"' style='margin-top:15px;border: 1px solid #49BA8E;'></div>";
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
			inverterModelSel.html($.dailychart.getInverter(postparams));
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
			if(strtDte==undefined ||endDte== undefined || strtDte=="" ||endDte== "")
			{
				alert("please Enter Start Date and End Date.")
				return;
			}
			
			$.dailychart.getPwrInverterData(wrapperJq,{pwrinverterid:inverterId,starttime:strtDte,endtime:endDte,daywise:"y"});
			$.dailychart.getPwrPlantData(wrapperJq,{pwrplantid:plantId,starttime:strtDte,endtime:endDte,daywise:"y"});
			$.dailychart.getPwrInverterData(wrapperJq,{pwrinverterid:inverterId,starttime:strtDte,endtime:endDte,maxpower:"y"});
			$.dailychart.getPwrPlantData(wrapperJq,{pwrplantid:plantId,starttime:strtDte,endtime:endDte,maxpower:"y"});
			$.dailychart.getchart(uniqueId, wrapperJq);
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
  					seltr.data("pwrinverterdatamaxpower",data.pwrinverterdata);
  				else
  					seltr.data("pwrinverterdata",data.pwrinverterdata);
	  		},
	  		error:function(xhr,status,error){},
	  		complete:function(xhr,status){}
	  	});
	},
	getPwrPlantData:function(seltr,postParams)
	{
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
  					seltr.data("pwrplantdatamaxpower",data.pwrplantdata);
  				else
  					seltr.data("pwrplantdata",data.pwrplantdata);
	  		},
	  		error:function(xhr,status,error){},
	  		complete:function(xhr,status){}
	  	});
	},
	
   getchart:function(wrapperUnqId,wrapperJqSel)
   {
	   var uniqueKey=wrapperUnqId;
	   var options=wrapperJqSel.data("options");
	   var pwrinverterdata=wrapperJqSel.data("pwrinverterdata");
	   var pwrplantdata=wrapperJqSel.data("pwrplantdata");
	   var pwrplantdatamaxpower=wrapperJqSel.data("pwrplantdatamaxpower");
	   var pwrinverterdatamaxpower=wrapperJqSel.data("pwrinverterdatamaxpower");
	   
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
			var  x1=new Date(x);
			var nplantrad=plant.plantdatairradiance;
			var nplantmt=plant.plantmoduletemp;
			var nplantat=plant.plantambtemp;
			var nplantct=plant.plantcurdayenegry;
			var nplantpwr=plant.plantpower;
			
			if(forplantid != plant.forplantid || i == pwrplantdata.length-1)
			{
				if(forinverterid!=0) {
						plantdatairradianceval.push({values:plantrad,key:plantname+ ' Irradiance/10',type: 'line', yAxis : 2});
						plantmoduletempval.push({values:plantmt,key:plantname+' Module Temperature',type: 'line', yAxis : 2}); 
						plantambtempval.push({values:plantat,key:plantname+' Ambient Temperature',type: 'line', yAxis : 2});
						plantcurdayenergy.push({values:plantct,key:plantname+ ' Current Day Energy' }); 
						plantpower.push({values:plantpwr,key:plantname+ ' Power/1000',type: 'line', yAxis : 1}); 
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
		});
	   
	   
	   var forinverterid=0;
	   var currdayenergy=[];
	   var invtemp=[];
	   var invpower=[];
	   var invertername="";
	   var myData = [];
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
			var  x1=new Date(x);
			var ninvtemp=pwrinvdata.invtemp;
			var ncurrdayenergy=pwrinvdata.currdayenergy;
			var ninvpower=pwrinvdata.invpower;
			
			if(forinverterid!=pwrinvdata.forinverterid || i==pwrinverterdata.length-1)
			{
				if(forinverterid!=0) {
					inverterTempArray.push({values:invtemp,key:invertername+ ' Temp' ,type: 'line', yAxis : 2}); // ,color: '#'+(j+1)+''+(j+1)+''+(j+1)+''
					inverterEnergyArray.push({values:currdayenergy,key:invertername+' Energy'}); // ,color: '#'+(j+2)+''+(j+2)+''+(j+2)+''
					inverterPowerwArray.push({values:invpower,key:invertername+' Power/1000',type: 'line', yAxis : 1}); //,color: '#'+(j+3)+''+(j+3)+''+(j+3)+''
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
			var  x1=new Date(x);
			var nplantpwrmx=plant.plantpower;
			
			if(forplantidmx != plant.forplantid || i == pwrplantdatamaxpower.length-1)
			{
				if(forplantidmx!=0) {
					plantpowermx.push({values:plantpwrmx,key:plantnamemx+ ' Power'}); 
				}
				forplantidmx = plant.forplantid;
				plantnamemx=plant.pwrplantname;
				plantpwr=[];
			}
			plantpwrmx.push({x:x1.getTime(),y:nplantpwrmx});
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
			var  x1=new Date(x);
			var ninvpowermx=pwrinvdata.invpower;
			
			if(forinverteridmx!=pwrinvdata.forinverterid || i==pwrinverterdatamaxpower.length-1)
			{
				if(forinverteridmx!=0) {
					inverterPowerMx.push({values:invpowermx,key:inverternamemx+ ' Power'}); // ,color: '#'+(j+1)+''+(j+1)+''+(j+1)+''
				}
				forinverteridmx=pwrinvdata.forinverterid;
				inverternamemx=pwrinvdata.invertername;
				invpowermx=[];
			}
			invpowermx.push({x:x1.getTime(),y:ninvpowermx});	
		});
	   
	   var myData2=[];
	   for(index in inverterEnergyArray)
		   myData2.push(inverterEnergyArray[index]);
	   for(index in plantcurdayenergy)
		   myData2.push(plantcurdayenergy[index]);
	   
	   var myData1=[];
	   for(index in inverterPowerMx)
		   myData1.push(inverterPowerMx[index]);
	   for(index in plantpowermx)
		   myData1.push(plantpowermx[index]);
	   
	   
	   	 $(".clsDailyCharttpPg_divChartPvsIHldr_"+wrapperUnqId,wrapperJqSel).html($.dailychart.getSvgHtmlContent(1,uniqueKey,"Maximum Power vs Date"));
		 $(".clsDailyCharttpPg_divChartIDEHldr_"+wrapperUnqId,wrapperJqSel).html($.dailychart.getSvgHtmlContent(2,uniqueKey,"Daily Energy vs Date"));
		 
		 $.dailychart.calChart('#idprndbPg_chartHldrNo1_'+uniqueKey,myData1,"Maximum Power");
		 $.dailychart.calChart('#idprndbPg_chartHldrNo2_'+uniqueKey,myData2,"Daily Energy");
	},
	getSvgHtmlContent:function(index,uniqueKey,label)
	{
		var htmlContent = "<div id='idprndbPg_chartHldrNo"+index+"_"+uniqueKey+"' class='with-3d-shadow with-transitions'>" +
		"<span style='width:100%;color:white;background:#49BA8E;text-align:center;float: left;'><b>"+label+"</b></span>"+
		"<svg style='height: 400px;width:100%;display:block;'></svg>" +
		"</div>";
		return htmlContent;
	},
	
	calChart:function(holder,data,yAxisLabel)
	{
		
		nv.addGraph(function() {
			 var chart = nv.models.lineChart();

			 chart
	           .xScale(d3.time.scale()) // use a time scale instead of plain numbers in order to get nice round default values in the axis
	           .useInteractiveGuideline(true) // check out the css that turns the guideline into this nice thing
	           .margin({"left": 80, "right": 50, "top": 20, "bottom": 80})
	           .duration(0) 
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
	                	return tickMultiFormat(new Date(d));
	                 });
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
			 var contentGenerator = chart.interactiveLayer.tooltip.contentGenerator();
			 var tooltip = chart.interactiveLayer.tooltip;
			 tooltip.contentGenerator(function (d) 
			 {
				 d.value = data[d.index].values[d.index].x;
				 return contentGenerator(d); 
			 });
			 tooltip.headerFormatter(function (d) { return tsFormat(new Date(d)); });
	
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
	                	return tickMultiFormat(new Date(d));
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
//			 chart.xAxis.tickValues(data[0].values.map( function(d){return d.x;} ) );
//			 var tsFormat = d3.time.format('%b %-d, %Y %I:%M%p');
//			 var contentGenerator = chart.interactiveLayer.tooltip.contentGenerator();
//			 var tooltip = chart.interactiveLayer.tooltip;
//			 tooltip.contentGenerator(function (d) 
//			 {
//				 return contentGenerator(d); 
//			 });
//			 tooltip.headerFormatter(function (d) { return tsFormat(new Date(d)); });
	
	//Update the chart when window resizes.
			 nv.utils.windowResize(chart.update);
			 
			 return chart;
			});
	}
	
  
}

