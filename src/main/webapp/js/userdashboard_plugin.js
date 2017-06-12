$.fn.userdb=function(options)
{
	options=$.extend({},options);
	return this.each(function(){
		var wrapperUnqId=$.userdb.getDataHolderUniqId("idUserDB_");	
		$(".clsUserDBPg_divWrapper",this).remove("");
		var plantObj = $.userdb.getPlants();
		$(this).append($.userdb.getHtmlContent(wrapperUnqId,plantObj));
		var wrapperJqSel=$("#"+wrapperUnqId);
		wrapperJqSel.data("options",options);
		if(options.filter != undefined && options.filter)
		{
			$(".clsUserDBPg_FilterHldr",wrapperJqSel).html($.userdb.getFilterHtml(wrapperUnqId,options))
			$.userdb.getDataforfilters(wrapperUnqId, wrapperJqSel, plantObj);
			$.userdb.loadAndBindFilterHandlr(wrapperUnqId, wrapperJqSel);
		}
		$.userdb.loadDashboardData(wrapperJqSel,(options.forplantid != undefined)?options.forplantid:"");
		$(this).data("loadPlugin",wrapperJqSel);
		if(options.dialog != undefined && options.dialog == true)
		{
			$(".clsUserDBPg_divPlantHldr",wrapperJqSel).hide();
			$(".clsUserDBPg_divLastUpdatedTimeDiv",wrapperJqSel).hide();
			$(".clsUserDBPg_divPlantHldr_"+options.forplantid).show();
			var wWidth = $(window).width();
			var dWidth = wWidth * 0.95;
			var wHeight = $(window).height();
			var dHeight = wHeight * 0.95;
			wrapperJqSel.dialog({autoOpen:true,modal:true,title:"Dashboard",width:dWidth,height:dHeight,closeOnEscape:false,resizable: false,close:function(event, ui){eraseDialog($(this))}});
		}
		else
		{
			$(".clsUserDBPg_divPlantHldr",wrapperJqSel).hide();
			$(".clsUserDBPg_divLastUpdatedTimeDiv",wrapperJqSel).hide();
		}
	 });
	
}


$.userdb={
	nxtId:0,
	getDataHolderUniqId:function(prefix)
	{
		return prefix+$.userdb.nxtId++;
    },
    getHtmlContent:function(wrapperUnqId,plantObj)
    {
    	var htmlContent='';
    	htmlContent+='<div class="clsUserDBPg_divWrapper" id="'+wrapperUnqId+'" style="float: left; width: 100%; margin-bottom: 20px;">';  
    		htmlContent+='<div class="clsUserDBPg_FilterHldr" style="margin-bottom:15px;"></div>';
			htmlContent+=$.userdb.getPlantDivs(plantObj);
    	htmlContent+='</div>';
    	return htmlContent;
    	
    },
    getFilterHtml:function(uniqueId)
	{
    	var htmlContent="";
		htmlContent+="<fieldset>";
			htmlContent+= "<div class='filter_row'>";
				htmlContent+= "<div class='filter_divElemt'>";
					htmlContent+= "<div class='filter_divLbl'><label>Plants:</label></div>";
					htmlContent+= "<select class='filter_divPlantSel flexselect' style='width: 50%;' multiple><option value=0>Select Plant</option></select>";
				htmlContent+= "</div>";
			htmlContent+= "</div>";
			
			htmlContent+= "<div class='filter_row' style='text-align: center;margin-top: 1%;'>";
				htmlContent+= "<input type='button' class='filter_divSearchBttn' value='Go'/>";
			htmlContent+= "</div>";
		htmlContent+="</fieldset>";
		return htmlContent;
	},
	getDataforfilters:function(uniqueId, wrapperJq, plantObj)
	{
		var plantSel=$(".filter_divPlantSel",wrapperJq);
		plantSel.html(plantObj.list);
		plantSel.val("");
		plantSel.chosen({enable_split_word_search:false,allow_single_deselect: true,width:"165px"});
	},
	getPlants:function()
	{
		var rtrnObj = {};
		var list="<option value='0'>Select Plant</option>";
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
	  			rtrnObj.plants=data.plants;
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
	  	rtrnObj.list = list;
	  	return rtrnObj; 
	},
	loadAndBindFilterHandlr:function(uniqueId, wrapperJq)
	{
		var clearBtn = $(".filter_divClearBttn",wrapperJq);
		clearBtn.unbind('click');
		clearBtn.click(function()
		{
			
		});
		
		var searchbtn = $(".filter_divSearchBttn",wrapperJq);
		searchbtn.unbind('click');
		searchbtn.data("uniqueId",uniqueId);
		searchbtn.data("wrapperJq",wrapperJq);
		searchbtn.click(function()
		{
			var wrapperJq = $(this).data("wrapperJq");
			var plantIds = $(".filter_divPlantSel",wrapperJq).val();
			if(plantIds != null)
			{
				$(".clsUserDBPg_divPlantHldr",wrapperJq).hide();
				for(i in plantIds)
					$(".clsUserDBPg_divPlantHldr_"+plantIds[i]).show();
				$(".clsUserDBPg_divLastUpdatedTimeDiv",wrapperJq).show();
			}
			else
			{
				$(".clsUserDBPg_divPlantHldr",wrapperJq).hide();
				$(".clsUserDBPg_divLastUpdatedTimeDiv",wrapperJq).hide();
				alert("Please select the Plants");
			}
//			$('#idUserDBPg_CurrentPwr',wrapperJq).css("width","100%");
//			$('#idUserDBPg_AllTimePwr',wrapperJq).css("width","100%");
//			$('#idUserDBPg_MonthPwr',wrapperJq).css("width","100%");
//			$('#idUserDBPg_YearPwr',wrapperJq).css("width","100%");
			wrapperJq.data("dashboarddata",null);
			wrapperJq.data("dashboardmeterdata",null);
			$.userdb.loadDashboardData(wrapperJq,plantIds);
		});
	},
	
	getPlantDashBoardData:function(postParams)
	{
		 var mdata;
		 var ddata;
		 var mpdata;
		 var ypdata;
		 var apdata;
		 var ytddata;
		 var cdata;
	  	 $.ajax(
	  	 {
	  		url:"/torp/ServiceRouter/getuserdashboarddata",
	  		dataType:"json",
	  		async:false,
	  		type:'post',
	  		data:postParams,
	  		success:function(data,xhr,settings)
	  		{
	  			mdata = data.monthdata;
	  			ddata = data.daydata;
	  			mpdata = data.monthpeakdata;
	  			ypdata = data.yearpeakdata;
	  			apdata = data.alltimepeakdata;
	  			ytddata = data.ytddata;
	  			cdata = data.cdata;
	  		},
	  		error:function(xhr,status,error){},
	  		complete:function(xhr,status){}
	  	});
	  	for(ct in cdata)
	  	{
	  		var val = $.grep(mdata,function(n,i) {
	  			return n.forplantid == cdata[ct].forplantid;
	  		});
	  		var mpd = $.grep(mpdata,function(n,i) {
	  			return n.forplantid == cdata[ct].forplantid;
	  		});
	  		var ypd = $.grep(ypdata,function(n,i) {
	  			return n.forplantid == cdata[ct].forplantid;
	  		});
	  		var apd = $.grep(apdata,function(n,i) {
	  			return n.forplantid == cdata[ct].forplantid;
	  		});
	  		var dd = $.grep(ddata,function(n,i) {
	  			return n.forplantid == cdata[ct].forplantid;
	  		});
	  		var ytdd = $.grep(ytddata,function(n,i) {
	  			return n.forplantid == cdata[ct].forplantid;
	  		});
	  		if(val.length > 0)
	  			cdata[ct].mplantcurdayenegry = val[0].mplantcurdayenegry;
	  		if(mpd.length > 0)
	  		{
	  			cdata[ct].mpplantpower = mpd[0].cplantpower;
	  			cdata[ct].month = mpd[0].month;
	  		}
	  		if(ypd.length > 0)
	  		{
	  			cdata[ct].ypplantpower = ypd[0].cplantpower;
	  			cdata[ct].year = ypd[0].year;
	  		}
	  		if(apd.length > 0)
	  			cdata[ct].applantpower = apd[0].cplantpower;
	  		if(dd.length > 0)
	  		{
	  			cdata[ct].cplantcurdayenegry = dd[0].cplantcurdayenegry;
	  			cdata[ct].cplantpower = dd[0].cplantpower;
				//cdata[ct].pwrplantdatats = dd[0].pwrplantdatats;
	  		}
	  		if(ytdd.length > 0)
	  			cdata[ct].ytdplantcurdayenegry = ytdd[0].ytdplantcurdayenegry;
	  		
	  	}
	  	return cdata;
	},
	getPlantDivs:function(plantObj)
	{
		var plants = plantObj.plants;
		var htmlContent = "<div class='clsUserDBPg_divLastUpdatedTimeDiv'>LAST UPDATED ON <span class='clsUserDBPg_divLastUpdatedTime'></div>";
		for(plant in plants)
		{
			htmlContent+="<div class='clsUserDBPg_divPlantHldr_"+plants[plant].pwrplantid+" clsUserDBPg_divPlantHldr' style='margin-top:15px;border: 1px solid #F26C6C;float: left;width: 100%;'>";
			htmlContent+="<div style='background: #F26C6C;color: aliceblue;'>"+plants[plant].pwrplantname+" - "+plants[plant].pwrplantcode+"</div>";
			htmlContent+="<div class='clsUserDBPg_CmmDiv' style='background: #F6A730;'>";
				htmlContent+="<span class='clsUserDBPg_CmmSpan'>Installed Capacity</span><span class='clsUserDBPg_InstCapacity odometer clsUserDBPg_CmmOdometer'>"+plants[plant].pwrinstalledcapacity+"</span>";
				htmlContent+="<span class='clsUserDBPg_CmmSpan'>Status</span><span class='clsUserDBPg_Status'></span>";
				htmlContent+="<span class='clsUserDBPg_LastDate'></span>";
			htmlContent+="</div>";
			htmlContent+="<div class='clsUserDBPg_CmmDiv' style='background: #8BA1F2;'>";
				htmlContent+="<span class='clsUserDBPg_CmmSpan'>Todays Energy</span><span class='clsUserDBPg_TEnergy odometer clsUserDBPg_CmmOdometer'></span>";
				htmlContent+="<span class='clsUserDBPg_CmmSpan'>Month Energy</span><span class='clsUserDBPg_MEnergy odometer clsUserDBPg_CmmOdometer'></span>";
				htmlContent+="<span class='clsUserDBPg_CmmSpan'>YTD Energy</span><span class='clsUserDBPg_YTDEnergy odometer clsUserDBPg_CmmOdometer' ></span>";
				htmlContent+="<span class='clsUserDBPg_CmmSpan'>Cumulative Energy</span><span class='clsUserDBPg_CEnergy odometer clsUserDBPg_CmmOdometer'></span>";
			htmlContent+="</div>";
			htmlContent+="<div class='clsUserDBPg_CmmDiv' style='background: #E87A7A;'><div style='width: 100%; float: left; text-align: center;'>Current Power</div><div class='clsUserDBPg_CurrentPwr clsUserDBPg_CmmHighChart' id='idUserDBPg_CurrentPwr'>";
//			htmlContent+='<div class="progress vertical" style="width:80%;">';
//			htmlContent+='<div class="progress-bar progress-bar-info progress-bar-striped" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100" style="width:80%">';
//				htmlContent+='<span class="sr-only">100% Complete</span>';
//			htmlContent+=' </div>';
//			htmlContent+=' </div>';
			htmlContent+="</div></div>";
			htmlContent+="<div class='clsUserDBPg_CmmDivider'>Peak Values</div>";
			htmlContent+="<div class='clsUserDBPg_CmmDiv' style='background: #7EDC92;'><span style='width: 100%; float: left; text-align: center;'>All Time</span><div class='clsUserDBPg_AllTimePwr clsUserDBPg_CmmHighChart' id='idUserDBPg_AllTimePwr' ></div></div>";
			htmlContent+="<div class='clsUserDBPg_CmmDiv' style='background: #7EA7F2;'><span style='width: 100%; float: left; text-align: center;' class='clsUserDBPg_YearHldr'>Year</span><div class='clsUserDBPg_YearPwr clsUserDBPg_CmmHighChart' id='idUserDBPg_YearPwr'></div></div>";
			htmlContent+="<div style='background: #FD7F43;' class='clsUserDBPg_CmmDiv'><span style='width: 100%; float: left; text-align: center;' class='clsUserDBPg_MonthHldr'>Month</span><div class='clsUserDBPg_MonthPwr clsUserDBPg_CmmHighChart' id='idUserDBPg_MonthPwr' ></div></div>";
			
			/* 
			htmlContent+="<div class='clsUserDBPg_CmmDivider clsUserDBPg_MeterData'>Inverter Readings</div>";
			htmlContent+="<div class='clsUserDBPg_CmmDiv clsUserDBPg_MeterData' style='background: #8BA1F2;'>";
				htmlContent+="<span class='clsUserDBPg_CmmSpan'>Todays Energy</span><span class='clsUserDBPg_MTEnergy odometer clsUserDBPg_CmmOdometer'></span>";
				htmlContent+="<span class='clsUserDBPg_CmmSpan'>Month Energy</span><span class='clsUserDBPg_MMEnergy odometer clsUserDBPg_CmmOdometer'></span>";
				htmlContent+="<span class='clsUserDBPg_CmmSpan'>YTD Energy</span><span class='clsUserDBPg_MYTDEnergy odometer clsUserDBPg_CmmOdometer' ></span>";
				htmlContent+="<span class='clsUserDBPg_CmmSpan'>Cumulative Energy</span><span class='clsUserDBPg_MCEnergy odometer clsUserDBPg_CmmOdometer'></span>";
			htmlContent+="</div>";
			htmlContent+="<div class='clsUserDBPg_CmmDiv clsUserDBPg_MeterData' style='background: #E87A7A;'><div style='width: 100%; float: left; text-align: center;'>Current Power</div><div class='clsUserDBPg_CurrentPwr clsUserDBPg_CmmHighChart' id='idUserDBPg_MCurrentPwr'></div></div>";
			*/
			htmlContent+="</div>";
		}
		if(plants.length != 0)
			return htmlContent;
		return "";
	},
	loadDashboardData:function(wrapperJq,plantIds)
	{
		    var today = new Date();
		    today = [   today.getDate().padLeft(),
		    			(today.getMonth()+1).padLeft(),
		              	today.getFullYear()].join('/')+
	                    ' ' +
	                  [ today.getHours().padLeft(),
	                    today.getMinutes().padLeft(),
	                    today.getSeconds().padLeft()].join(':');
		    var dashboarddata = wrapperJq.data("dashboarddata");
		    var dashboardmeterdata = wrapperJq.data("dashboardmeterdata");
		    if(dashboarddata == undefined && dashboardmeterdata  == undefined)
		    {
				var dashboarddata = $.userdb.getPlantDashBoardData({todaydate:today,iscalulatedfrominv:"y",forplantids:plantIds.toString()});
				var dashboardmeterdata = $.userdb.getPlantDashBoardData({todaydate:today,iscalulatedfrominv:"m",forplantids:plantIds.toString()});
				dashboarddata.sort(function(a, b){
					  return a.forplantid > b.forplantid;
				});
				if(dashboardmeterdata != undefined && dashboardmeterdata.length > 0)
				{
					dashboardmeterdata.sort(function(a, b){
						  return a.forplantid > b.forplantid;
					});
				}
				wrapperJq.data("dashboarddata",dashboarddata);
				wrapperJq.data("dashboardmeterdata",dashboardmeterdata);
				$(".clsUserDBPg_divLastUpdatedTime").text(new Date());
		    }
			var monthNames = ["January", "February", "March", "April", "May", "June",
			                  "July", "August", "September", "October", "November", "December"
			                ];
            var d = new Date();
			for(db in dashboarddata)
			{
				var selJq = $(".clsUserDBPg_divPlantHldr_"+dashboarddata[db].forplantid,wrapperJq);
				var installeddccapacity = dashboarddata[db].installeddccapacity/1000;
				var curPower = dashboarddata[db].cplantpower;
				$('#idUserDBPg_MCurrentPwr',selJq).highcharts(Highcharts.merge(gaugeOptions, {
			        yAxis: {
			            min: 0,
			            max: installeddccapacity,
			        },
			        chart:
			        {
			        	backgroundColor:'#E87A7A'
			        },
			        series: [{
			            name: 'Power',
			            data: [parseFloat((curPower/1000).toFixed(2))],
			            dataLabels: {
			                format: '<div style="text-align:center"><span style="font-family: monospace;font-size:18px;color:' +
			                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'white') + '">{y:.1f}</span><br/>'
			            }
			        }]

			    }));
				$('#idUserDBPg_AllTimePwr',selJq).highcharts(Highcharts.merge(gaugeOptions, {
			        yAxis: {
			            min: 0,
			            max: installeddccapacity,
			        },
			        chart:
			        {
			        	backgroundColor:'#7EDC92'
			        },
			        series: [{
			            name: 'Power',
			            data: [parseFloat((dashboarddata[db].applantpower/1000).toFixed(2))],
			            dataLabels: {
			                format: '<div style="text-align:center"><span style="font-family: monospace;font-size:18px;color:' +
			                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'white') + '">{y:.1f}</span><br/>'
			            }
			        }]

			    }));
				$('#idUserDBPg_MonthPwr',selJq).highcharts(Highcharts.merge(gaugeOptions, {
			        yAxis: {
			            min: 0,
			            max: installeddccapacity
			        },
			        chart:
			        {
			        	backgroundColor:'#FD7F43'
			        },
			        series: [{
			            name: 'Power',
			            data: [parseFloat((dashboarddata[db].mpplantpower/1000).toFixed(2))],
			            dataLabels: {
			                format: '<div style="text-align:center"><span style="font-family: monospace;font-size:18px;color:' +
			                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'white') + '">{y:.1f}</span><br/>'
			            }
			        }]

			    }));
				$('#idUserDBPg_YearPwr',selJq).highcharts(Highcharts.merge(gaugeOptions, {
			        yAxis: {
			            min: 0,
			            max: installeddccapacity
			        },
			        chart:
			        {
			        	backgroundColor:'#7EA7F2'
			        },
			        series: [{
			            name: 'Power',
			            data: [parseFloat((dashboarddata[db].ypplantpower/1000).toFixed(2))],
			            dataLabels: {
			                format: '<div style="text-align:center"><span style="font-family: monospace;font-size:18px;color:' +
			                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'white') + '">{y:.1f}</span><br/>'
			            }
			        }]

			    }));
				
				$(".clsUserDBPg_MTEnergy",selJq).text(dashboarddata[db].cplantcurdayenegry);
				$(".clsUserDBPg_MYTDEnergy",selJq).text(dashboarddata[db].ytdplantcurdayenegry);
				$(".clsUserDBPg_MCEnergy",selJq).text(dashboarddata[db].ccplantcurdayenegry);
				$(".clsUserDBPg_MMEnergy",selJq).text(dashboarddata[db].mplantcurdayenegry);
				
				if(dashboarddata[db].year == "null")
					$(".clsUserDBPg_YearHldr",selJq).text("Year - "+new Date().getFullYear());
				else
					$(".clsUserDBPg_YearHldr",selJq).text("Year - "+dashboarddata[db].year);
				if(dashboarddata[db].month == "null")
	                $(".clsUserDBPg_MonthHldr",selJq).text("Month - "+monthNames[d.getMonth()]);
				else
					$(".clsUserDBPg_MonthHldr",selJq).text("Month - "+dashboarddata[db].month);
			}
			if(dashboardmeterdata == undefined || dashboardmeterdata.length == 0)
				$(".clsUserDBPg_MeterData",wrapperJq).hide();
			else
			{
				for(db in dashboardmeterdata)
				{
					var selJq = $(".clsUserDBPg_divPlantHldr_"+dashboardmeterdata[db].forplantid,wrapperJq);
					$(".clsUserDBPg_MeterData",selJq).show();
					var installeddccapacity = dashboardmeterdata[db].installeddccapacity/1000;
					var curPower = 0;
					var lastCurPower=0;
					var diffmins;
					var formatTime = d3.time.format("%Y-%m-%d %H:%M");
					if(dashboardmeterdata[db].pwrplantdatats != undefined )
					{
						var diffmins = (new Date().getTime() - formatTime.parse(dashboardmeterdata[db].pwrplantdatats).getTime())/(1000*60);
						lastCurPower = dashboardmeterdata[db].cplantpower;
						if(diffmins < 80)
							curPower = dashboardmeterdata[db].cplantpower;
						else
							curPower = 0;
					}
					$('#idUserDBPg_CurrentPwr',selJq).highcharts(Highcharts.merge(gaugeOptions, {
				        yAxis: {
				            min: 0,
				            max: installeddccapacity,
				        },
				        chart:
				        {
				        	backgroundColor:'#E87A7A'
				        },
				        series: [{
				            name: 'Power',
				            data: [parseFloat((curPower/1000).toFixed(2))],
				            dataLabels: {
				                format: '<div style="text-align:center"><span style="font-family: monospace;font-size:18px;color:' +
				                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'white') + '">{y:.1f}</span><br/>'
				            }
				        }]
	
				    }));
					
					if(diffmins > 80 || diffmins == undefined || curPower == 0)
						$(".clsUserDBPg_Status",selJq).css("background","red");
					else
						$(".clsUserDBPg_Status",selJq).css("background","green");
					if(dashboardmeterdata[db].pwrplantdatats != undefined)
						$(".clsUserDBPg_LastDate",selJq).html("Last Power Reading @ "+dashboardmeterdata[db].pwrplantdatats);
					else
						$(".clsUserDBPg_LastDate",selJq).html("No Power Data.");
					
					$(".clsUserDBPg_TEnergy",selJq).text(dashboardmeterdata[db].cplantcurdayenegry);
					$(".clsUserDBPg_YTDEnergy",selJq).text(dashboardmeterdata[db].ytdplantcurdayenegry);
					$(".clsUserDBPg_CEnergy",selJq).text(dashboardmeterdata[db].ccplantcurdayenegry);
					$(".clsUserDBPg_MEnergy",selJq).text(dashboardmeterdata[db].mplantcurdayenegry);
				}
			}
	}
	
  
}

