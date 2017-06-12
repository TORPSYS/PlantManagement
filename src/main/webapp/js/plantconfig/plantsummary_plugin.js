$.fn.plantsummary=function(options)
{
	options=$.extend({},options);
	return this.each(function(){
		var wrapperUnqId=$.plantsummary.getDataHolderUniqId("idPlantsSummary_");	
		$(".clsPlantsSummary_divWrapper",this).remove("");
		$(this).append($.plantsummary.getHtmlContent(wrapperUnqId));
		var wrapperJqSel=$("#"+wrapperUnqId);
		wrapperJqSel.data("options",options);
		var today = new Date();
	    today = [   today.getDate().padLeft(),
	    			(today.getMonth()+1).padLeft(),
	              	today.getFullYear()].join('/')+
                    ' ' +
                  [ today.getHours().padLeft(),
                    today.getMinutes().padLeft(),
                    today.getSeconds().padLeft()].join(':');
		var dashboarddata = $.plantsummary.getPlantDashBoardData({todaydate:today,iscalulatedfrominv:"y",plantsummary:"y"});
		var dashboardmeterdata = $.plantsummary.getPlantDashBoardData({todaydate:today,iscalulatedfrominv:"m",plantsummary:"y"});
		dashboarddata.sort(function(a, b){
			  return a.forplantid > b.forplantid;
		});
		if(dashboardmeterdata != undefined && dashboardmeterdata.length > 0)
		{
			dashboardmeterdata.sort(function(a, b){
				  return a.forplantid > b.forplantid;
			});
		}
//		$.plantsummary.reorderPlanSummaryData(dashboarddata,dashboardmeterdata);
		$.plantsummary.loadPlantSummaryGrid(wrapperUnqId,dashboardmeterdata);
//		$(".clsPlantsSummary_FilterHldr",wrapperJqSel).html($.plantsummary.getFilterHtml(wrapperUnqId,options))
		$.plantsummary.getDataforfilters(wrapperUnqId, wrapperJqSel);
		$.plantsummary.loadAndBindFilterHandlr(wrapperUnqId, wrapperJqSel);
	 });
	
}
$.plantsummary={
	nxtId:0,
	getDataHolderUniqId:function(prefix)
	{
		return prefix+$.plantsummary.nxtId++;
    },
    reorderPlanSummaryData:function()
    {
    	
    },
    getHtmlContent:function(wrapperUnqId)
    {
    	var htmlContent='';
    	htmlContent+='<div class="clsPlantsSummary_divWrapper" id="'+wrapperUnqId+'" >';  
//    		htmlContent+='<div class="clsPlantsSummary_FilterHldr" style="margin-bottom:15px;"></div>';
			htmlContent+='<div class="clsPlantsSummary_divGridWrapper clsCmm_FirstDiv ">';
					htmlContent+='<table id="idPlantsSummary_divGridTbl_'+wrapperUnqId+'"></table>'; 
					htmlContent+='<div id="idPlantsSummary_divGridPager_'+wrapperUnqId+'"></div>';
			htmlContent+='</div>';
			htmlContent+="<div class='clsPlantsSummary_DashboardHldr'></div>";
    	htmlContent+='</div>';
    	return htmlContent;
    	
    },
    getFilterHtml:function(uniqueId)
	{
    	/*var htmlContent="";
		htmlContent+="<fieldset>";
			htmlContent+= "<div class='filter_row'>";
				htmlContent+= "<div class='filter_divElemt'>";
					htmlContent+= "<div class='filter_divLbl'><label>Inverter:</label></div>";
					htmlContent+= "<select class='filter_divInverterSel flexselect' style='width: 50%;' ><option value=1>Select Inverter</option></select>";
				htmlContent+= "</div>";
				htmlContent+= "<div class='filter_divElemt'>";
					htmlContent+= "<div class='filter_divLbl'><label>Panel Model:</label></div>";
					htmlContent+= "<select class='filter_divPanelModelSel flexselect' style='width: 50%;'><option value=1>Select Panel Model</option></select>";
				htmlContent+= "</div>";
			htmlContent+= "</div>";
			
			htmlContent+= "<div class='filter_row' style='text-align: center;margin-top: 1%;'>";
				htmlContent+= "<input type='button' class='filter_divSearchBttn' value='Search'/>";
				htmlContent+= "<input type='button' class='filter_divClearBttn' value='Clear'/>";
			htmlContent+= "</div>";
		htmlContent+="</fieldset>";
		return htmlContent;*/
	},
	getDataforfilters:function(uniqueId, wrapperJq)
	{
		/*var inverterSel=$(".filter_divInverterSel",wrapperJq);
		var panelModelSel=$(".filter_divPanelModelSel",wrapperJq);
		
		var inverterOptions = 
		{
			asyncVal:false,
			url:'/torp/ServiceRouter/getinverters',
			selectHeader:'Inverter',
			postParams:{},
			desc:'invertername',
			id:'pwrinverterid',
			jsonArray:'inverters',
			intialVal:true,
			initblank:true
		}
		loadCombobox(inverterSel,inverterOptions);
		inverterSel.val("");
		inverterSel.chosen({enable_split_word_search:false,allow_single_deselect: true});
		
		var panelModelOptions = 
		{
			asyncVal:false,
			url:'/sm/ServiceRouter/getpanelmodels',
			selectHeader:'Panel Model',
			postParams:{},
			desc:'panelmodel',
			id:'pwrpanelmodelid',
			jsonArray:'panelmodels',
			intialVal:true,
			initblank:true
		}
		loadCombobox(panelModelSel,panelModelOptions);
		panelModelSel.val("");
		panelModelSel.chosen({enable_split_word_search:false,allow_single_deselect: true});*/
	},
	loadAndBindFilterHandlr:function(uniqueId, wrapperJq)
	{
		/*var clearBtn = $(".filter_divClearBttn",wrapperJq);
		clearBtn.unbind('click');
		clearBtn.click(function()
		{
			$(".filter_divInverterSel",wrapperJq).val("");
			$(".filter_divPanelModelSel",wrapperJq).val("");
			$(".filter_divInverterSel",wrapperJq).trigger("chosen:updated");
			$(".filter_divPanelModelSel",wrapperJq).trigger("chosen:updated");
		});
		
		var searchbtn = $(".filter_divSearchBttn",wrapperJq);
		searchbtn.unbind('click');
		searchbtn.click(function()
		{
			var tableGridSel=$("#idPlantsSummary_divGridTbl_"+uniqueId);
			var inverterId = $(".filter_divInverterSel",wrapperJq).val();;
			var panelModelId =$(".filter_divPanelModelSel",wrapperJq).val();
			
			if( inverterId>0)
				tableGridSel.setPostDataItem('pwrinverterid',inverterId);
			else
				tableGridSel.removePostDataItem("pwrinverterid");
			
			if(panelModelId >0)
				tableGridSel.setPostDataItem('pwrpanelmodelid',panelModelId);
			else
				tableGridSel.removePostDataItem("pwrpanelmodelid");
			
			tableGridSel.trigger('reloadGrid');
		});*/
	},
	loadPlantSummaryGrid:function(wrapperUnqId,data)
	{
    	var wrapperJqSel=$('#'+wrapperUnqId);
    	var options = wrapperJqSel.data("options");
    	var tabGridId="#idPlantsSummary_divGridTbl_"+wrapperUnqId;
		var tabGridPagerId="#idPlantsSummary_divGridPager_"+wrapperUnqId;			
		var tabGridIdSel=$(tabGridId);
		tabGridIdSel.data("wrapperUnqId",wrapperUnqId);
		var gridLoad=tabGridIdSel.data("gridLoad");
		if(gridLoad!=null)
			return;		
		gridLoad=tabGridIdSel.jqGrid({
	        datatype:'local',
	        width:(jqgrid_getdefaultwidthinview() - 60),
	        height:150,
	        data: data,
	        rowNum:jqgrid_getRowNum(),
	        rowList:jqgrid_getRowList(),
	        beforeRequest:function()
	        {
				  jqgrid_setPageLimitOffset(tabGridId); 
	        },
	         colNames:['Action','','Plant Name','Installed Capacity','Last Power Generated Time','Current Power','Todays Energy','Month Energy','YTD Energy','Cummulative Energy'],
	         colModel:[
						{
							   name:'act',
							   index:'act',
							   height:200,
							   width:100,
							   sortable:false,
						},
						{
							   name:'forplantid',
				        	   index:'forplantid',
				        	   hidden:true
						},
						{
				        	   name:'pwrplantname',
				        	   index:'pwrplantname',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				         },
				         {
				        	   name:'installeddccapacity',
				        	   index:'installeddccapacity',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				         },
				         {
				        	   name:'pwrplantdatats',
				        	   index:'pwrplantdatats',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				        	   formatter:$.plantsummary.nullFormatter
				         },
						 {
				        	   name:'cplantpower',
				        	   index:'cplantpower',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				         },
				         {
				        	   name:'cplantcurdayenegry',
				        	   index:'cplantcurdayenegry',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				         },
				         {
				        	   name:'mplantcurdayenegry',
				        	   index:'mplantcurdayenegry',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				         },
				         {
				        	   name:'ytdplantcurdayenegry',
				        	   index:'ytdplantcurdayenegry',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				         },
				         {
				        	   name:'ccplantcurdayenegry',
				        	   index:'ccplantcurdayenegry',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				         }],
			 viewrecords: true,
	         pager: tabGridPagerId,
	         caption: "PLANT SUMMARY",
	         gridComplete:function()
	         {
					var ids=tabGridIdSel.jqGrid('getDataIDs');
					for(var i=0;i < ids.length;i++)
					{
						var rowid = ids[i];	
						var actionsbtns="";
						var actionsbtns = "<input class='deleteactionsstyle' type='button'  value='VIEW' title='View' onclick=\"$.plantsummary.plantSummaryView('"+rowid+"','"+tabGridId+"','"+wrapperUnqId+"');\" />";
						tabGridIdSel.jqGrid('setRowData',ids[i],{act:actionsbtns});
					}			
	         }    
		});
		tabGridIdSel.data("gridLoad",gridLoad);
		tabGridIdSel.jqGrid('gridResize',{minHeight:80, maxHeight:300});
    },
   nullFormatter:function(cellvalue,options,rowObject)
   {
		var colName = options.colModel["name"];
		if(rowObject[colName] == "null")
			  return "";
		else
			 return rowObject[colName];
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
	plantSummaryView:function(rowid,tabGridId,wrapperUnqId)
	{
//		var wrapperJq = $("#"+wrapperUnqId);
//		var tabGridIdSel=$(tabGridId);
//		tabGridIdSel.setSelection(rowid,true);
//		var rowData = tabGridIdSel.jqGrid('getRowData',rowid);
//		$(".clsPlantsSummary_DashboardHldr",wrapperJq).userdb({forplantid:rowData.forplantid,dialog:true});
		alert("Under Progress");
	}
}