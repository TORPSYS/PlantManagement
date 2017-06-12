$.fn.plants=function(options)
{
	options=$.extend({},options);
	return this.each(function(){
		var wrapperUnqId=$.plants.getDataHolderUniqId("idplantsPg_");	
		$(".clsplantsPg_divWrapper",this).remove("");
		$(this).append($.plants.getHtmlContent(wrapperUnqId));
		var wrapperJqSel=$("#"+wrapperUnqId);
		wrapperJqSel.data("options",options);
		$.plants.loadClientsGrid(wrapperUnqId);
		$(".clsplantsPg_FilterHldr",wrapperJqSel).html($.plants.getFilterHtml(wrapperUnqId,options))
		$.plants.getDataforfilters(wrapperUnqId, wrapperJqSel);
		$.plants.loadAndBindFilterHandlr(wrapperUnqId, wrapperJqSel);
	 });
	
}
$.plants={
	nxtId:0,
	getDataHolderUniqId:function(prefix)
	{
		return prefix+$.plants.nxtId++;
    },
    getHtmlContent:function(wrapperUnqId)
    {
    	var htmlContent='';
    	htmlContent+='<div class="clsplantsPg_divWrapper" id="'+wrapperUnqId+'" >';  
    		htmlContent+='<div class="clsplantsPg_FilterHldr" style="margin-bottom:15px;"></div>';
			htmlContent+='<div class="clsplantsPg_divGridWrapper clsCmm_FirstDiv ">';
					htmlContent+='<table id="idplantsPg_divGridTbl_'+wrapperUnqId+'"></table>'; 
					htmlContent+='<div id="idplantsPg_divGridPager_'+wrapperUnqId+'"></div>';
			htmlContent+='</div>';
			htmlContent+="<div class='clsplantsPg_diEditHldr' style='margin-top:15px;'></div>";
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
			var tableGridSel=$("#idplantsPg_divGridTbl_"+uniqueId);
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
    loadClientsGrid:function(wrapperUnqId)
	{
    	var wrapperJqSel=$('#'+wrapperUnqId);
    	var options = wrapperJqSel.data("options");
    	var tabGridId="#idplantsPg_divGridTbl_"+wrapperUnqId;
		var tabGridPagerId="#idplantsPg_divGridPager_"+wrapperUnqId;			
		var tabGridIdSel=$(tabGridId);
		tabGridIdSel.data("wrapperUnqId",wrapperUnqId);
		var gridLoad=tabGridIdSel.data("gridLoad");
		if(gridLoad!=null)
			return;		
		gridLoad=tabGridIdSel.jqGrid({
	        url: "/torp/ServiceRouter/getplants",
	        datatype:'json',
	        width:(jqgrid_getdefaultwidthinview() - 60),
	        mtype:'POST',
	        height:150,
	        jsonReader: 
	        		{
						root:'plants',
						userdata:'plants',
				        repeatitems: false,
				        page:   function(obj) 
					    {
						 	return(jqgrid_getCurrentPage(tabGridId));
					    },
					    total:  function(obj) 
					    {
						    return (jqgrid_getTotalPages(tabGridId,obj));   
					    },
					    records:function(obj)
						{
					    	return (jqgrid_getTotalRecords(obj));
						} 
					},
			 rowNum:jqgrid_getRowNum(),
	         rowList:jqgrid_getRowList(),
		     beforeRequest:function()
	         {
				  jqgrid_setPageLimitOffset(tabGridId); 
				  //jQuery(tabGridId).setPostDataItem("schoolid",options.schoolid);
	         },
	 		
	         colNames:['Action','','Plant Name','Plant Code','Installed Capacity','Actual Capacity','Plant Lattitude','Plant Longitude','Timezone Difference in Mins','CO2 Saved/KWH',"Irradiance From Plant","Has Meter Reading","Has Inverter Data","Meter Reading Interval","Inverter Data Interval","Minimum Iradiance For Power","Alerts To"],
	         colModel:[
						{
							   name:'act',
							   index:'act',
							   height:200,
							   width:150,
							   sortable:false,
						},
						{
							   name:'pwrplantid',
				        	   index:'pwrplantid',
				        	   hidden:true
						},
						{
				        	   name:'pwrplantname',
				        	   index:'pwrplantname',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				         },
						 {
				        	   name:'pwrplantcode',
				        	   index:'pwrplantcode',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				         },
				         {
				        	   name:'pwrinstalledcapacity',
				        	   index:'pwrinstalledcapacity',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				        	   formatter:$.plants.strCapFormatter
				         },
				         {
				        	   name:'pwractualcapacity',
				        	   index:'pwractualcapacity',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				         },
				         {
				        	   name:'plantlat',
				        	   index:'plantlat',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				        	   formatter:$.plants.latFormatter
				         },
				         {
				        	   name:'plantlong',
				        	   index:'plantlong',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				        	   formatter:$.plants.longFormatter
				         },
				         {
				        	   name:'tzdiffinmins',
				        	   index:'tzdiffinmins',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				        	   formatter:$.plants.nullFormatter
				         },
				         {
				        	   name:'cotwosavedperkwh',
				        	   index:'cotwosavedperkwh',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				        	   formatter:$.plants.nullFormatter
				         },
				         {
				        	   name:'irradiancefromplant',
				        	   index:'irradiancefromplant',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				        	   formatter:$.plants.nullFormatter
				         },
				         {
				        	   name:'hasmeterreading',
				        	   index:'hasmeterreading',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				        	   formatter:$.plants.yornFormatter
				         },
				         {
				        	   name:'hasinverterdata',
				        	   index:'hasinverterdata',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				        	   formatter:$.plants.yornFormatter
				         },
				         {
				        	   name:'meterreadinginterval',
				        	   index:'meterreadinginterval',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				         },
				         {
				        	   name:'inverterdatainterval',
				        	   index:'inverterdatainterval',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				         },
				         {
				        	   name:'minirradianceforpower',
				        	   index:'minirradianceforpower',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				         },
				         {
				        	   name:'alertsto',
				        	   index:'alertsto',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				        	   formatter:$.plants.nullFormatter
				         }],
			 viewrecords: true,
	         pager: tabGridPagerId,
	         caption: "plants",
	         gridComplete:function()
	         {
					var ids=tabGridIdSel.jqGrid('getDataIDs');
					for(var i=0;i < ids.length;i++)
					{
						var rowid = ids[i];	
						var actionsbtns="";
						var actionsbtns = "<input class='deleteactionsstyle' type='button'  value='X' title='Delete' onclick=\"$.plants.plantsDelete('"+rowid+"','"+tabGridId+"');\" />";
						actionsbtns = actionsbtns +"<input class='editactionsstyle'  type='button' value='E' title='Edit' onclick=\"$.plants.plantsEdit('"+rowid+"','"+tabGridId+"','"+wrapperUnqId+"');\" />";
						tabGridIdSel.jqGrid('setRowData',ids[i],{act:actionsbtns});
						jqGrid_DefaultActionOnSave(rowid,tabGridIdSel);
					}			
	         }    
		});
		tabGridIdSel.data("gridLoad",gridLoad);
		tabGridIdSel.jqGrid('gridResize',{minHeight:80, maxHeight:300});
		tabGridIdSel.jqGrid('navGrid',tabGridPagerId,{refresh:false,search:false,edit:false,add:false,del:false});
		tabGridIdSel.jqGrid('navButtonAdd',tabGridPagerId,{caption:"Add",buttonicon:'ui-icon-circle-plus',
			onClickButton:function()
			{
			    var optionsObj=tabGridIdSel.data("options");
				var opts=
				{
						type:'add',
						callbackfunc:function(status)
						{
							if(status)
								tabGridIdSel.trigger('reloadGrid');
						}
				};
				$(this).addoreditplants(opts);
			},position:"last",
		});
	},
		
	plantsEdit:function(rowid,tabGridId,wrapperId)
   {
		var wrapperJq = $("#"+wrapperId);
		var tabGridIdSel=$(tabGridId);
		tabGridIdSel.setSelection(rowid,true);  
		var rowdata=tabGridIdSel.getGridParam('userData')[rowid - 1];
		var opts=
			{
					type:'edit',
					extradata:rowdata,
					callbackfunc:function(status)
					{
						if(status)
							tabGridIdSel.trigger('reloadGrid');
					}
			};
		$(".clsplantsPg_diEditHldr",wrapperJq).addoreditplants(opts);
   },
   plantsDelete:function(rowid,tabGridId)
	{
	   var tabGridIdSel=$(tabGridId);			
		var res=confirm("Are you sure! you want to delete.");
		if(!res)
		  return;		
		var rowData = tabGridIdSel.getGridParam('userData')[rowid - 1];
	 	var pwrplantid=rowData.pwrplantid;	 	
		var succ=tabGridIdSel.jqGrid('delRowData',rowid); 
		if(succ)
		{
		 	  $.ajax({
				   type: "POST",
				   url: "/torp/ServiceRouter/addeditordeleteplants",
				   dataType:'json',
				   data:"mode=delete&pwrplantid="+pwrplantid,
				   success: function(data)
				   {
						if(data.status == "ok")
						{			
							alert("Plant deleted successfully")
							tabGridIdSel.trigger("reloadGrid");
			        	}
			        	else
			        	{
			        		alert("Temporary error in loading application(can't Delete). Please reload");
			        	}
				   },
				   error:function(obj1,obj2,obj3)
				   {
					   alert("Error");
				   }
			 });
		}
   },
   nullFormatter:function(cellvalue,options,rowObject)
   {
		var colName = options.colModel["name"];
		if(rowObject[colName] == "null")
			  return "";
		else
			 return rowObject[colName];
   },
   yornFormatter:function(cellvalue,options,rowObject)
   {
		var colName = options.colModel["name"];
		if(rowObject[colName] == "y")
			  return "Yes";
		else
			 return "No";
   },
   latFormatter:function(cellvalue,options,rowObject)
   {
		var colName = options.colModel["name"];
		if(rowObject[colName] == "null")
			  return "";
		else
		{
			if(rowObject[colName] < 0)
				return Math.abs(rowObject[colName])+" N";
			else
				return rowObject[colName]+" S";
		}
   },
   longFormatter:function(cellvalue,options,rowObject)
   {
		var colName = options.colModel["name"];
		if(rowObject[colName] == "null")
			  return "";
		else
		{
			if(rowObject[colName] < 0)
				return Math.abs(rowObject[colName])+" W";
			else
				return rowObject[colName]+" E";
		}
   },
   
	

}