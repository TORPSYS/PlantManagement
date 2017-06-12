$.fn.inverters=function(options)
{
	options=$.extend({},options);
	return this.each(function(){
		var wrapperUnqId=$.inverters.getDataHolderUniqId("idInverterPg_");	
		$(".clsInverterPg_divWrapper",this).remove("");
		$(this).append($.inverters.getHtmlContent(wrapperUnqId));
		var wrapperJqSel=$("#"+wrapperUnqId);
		wrapperJqSel.data("options",options);
		$.inverters.loadInverterGrid(wrapperUnqId);
		$(".clsInverterPg_FilterHldr",wrapperJqSel).html($.inverters.getFilterHtml(wrapperUnqId,options))
		$.inverters.getDataforfilters(wrapperUnqId, wrapperJqSel);
		$.inverters.loadAndBindFilterHandlr(wrapperUnqId, wrapperJqSel);
	 });
	
}

//jQuery.fn.reloadinverters=function(options)
//{	
//	var invertermodelid = options.invertermodelid;
//	var gridUniqueId=jQuery.inverters.getwrapperId(this);
//	var reloadInverterSel=$("#idInverterPg_divGridTbl_"+gridUniqueId);
//	if(invertermodelid != undefined)
//	{
//		reloadInverterSel.data("invertermodelid",invertermodelid);
//		reloadInverterSel.data("options",options);
//		reloadInverterSel.setPostDataItem("invertermodelid",invertermodelid);	 
//		reloadInverterSel.trigger('reloadGrid');	    
//	}
//	if(options.cleardata!=undefined && options.cleardata)
//	{
//		var options=$.extend({error:true},options);
//		reloadInverterSel.data("options",options);
//		reloadInverterSel.clearGridData(true);
//	}
//}


$.inverters={
	nxtId:0,
	getDataHolderUniqId:function(prefix)
	{
		return prefix+$.inverters.nxtId++;
    },
    getHtmlContent:function(wrapperUnqId)
    {
    	var htmlContent='';
    	htmlContent+='<div class="clsInverterPg_divWrapper" id="'+wrapperUnqId+'">';  
    		htmlContent+='<div class="clsInverterPg_FilterHldr" style="margin-bottom:15px;"></div>';
			htmlContent+='<div class="clsInverterPg_divGridWrapper clsCmm_FirstDiv ">';
					htmlContent+='<table id="idInverterPg_divGridTbl_'+wrapperUnqId+'"></table>'; 
					htmlContent+='<div id="idInverterPg_divGridPager_'+wrapperUnqId+'"></div>';
			htmlContent+='</div>';
			htmlContent+="<div class='clsInverterPg_divInvEditHldr' style='margin-top:15px;'></div>";
    	htmlContent+='</div>';
    	return htmlContent;
    	
    },
    getFilterHtml:function(uniqueId)
	{
    	var htmlContent="";
		htmlContent+="<fieldset>";
			htmlContent+= "<div class='filter_row'>";
				htmlContent+= "<div class='filter_divElemt'>";
					htmlContent+= "<div class='filter_divLbl'><label>Plant:</label></div>";
					htmlContent+= "<select class='filter_divPlantSel flexselect' style='width: 50%;' ><option value=1>Select Plant</option></select>";
				htmlContent+= "</div>";
				htmlContent+= "<div class='filter_divElemt'>";
					htmlContent+= "<div class='filter_divLbl'><label>Inverter Model:</label></div>";
					htmlContent+= "<select class='filter_divInverterModelSel flexselect' style='width: 50%;'><option value=1>Select Panel Model</option></select>";
				htmlContent+= "</div>";
			htmlContent+= "</div>";
			
			htmlContent+= "<div class='filter_row' style='text-align: center;margin-top: 1%;'>";
				htmlContent+= "<input type='button' class='filter_divSearchBttn' value='Search'/>";
				htmlContent+= "<input type='button' class='filter_divClearBttn' value='Clear'/>";
			htmlContent+= "</div>";
		htmlContent+="</fieldset>";
		return htmlContent;
	},
	getDataforfilters:function(uniqueId, wrapperJq)
	{
		var plantSel=$(".filter_divPlantSel",wrapperJq);
		var inverterModelSel=$(".filter_divInverterModelSel",wrapperJq);
		
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
		
		var inverterModelOptions = 
		{
			asyncVal:false,
			url:'/torp/ServiceRouter/getinvertermodels',
			selectHeader:'Inverter Model',
			postParams:{},
			desc:['invmake','invmodel'],
			id:'invertermodelid',
			jsonArray:'invertermodels',
			intialVal:true,
			initblank:true
		}
		loadCombobox(inverterModelSel,inverterModelOptions);
		inverterModelSel.val("");
		inverterModelSel.chosen({enable_split_word_search:false,allow_single_deselect: true,width:"165px"});
	},
	loadAndBindFilterHandlr:function(uniqueId, wrapperJq)
	{
		var clearBtn = $(".filter_divClearBttn",wrapperJq);
		clearBtn.unbind('click');
		clearBtn.click(function()
		{
			$(".filter_divPlantSel",wrapperJq).val("");
			$(".filter_divInverterModelSel",wrapperJq).val("");
			$(".filter_divPlantSel",wrapperJq).trigger("chosen:updated");
			$(".filter_divInverterModelSel",wrapperJq).trigger("chosen:updated");
		});
		
		var searchbtn = $(".filter_divSearchBttn",wrapperJq);
		searchbtn.unbind('click');
		searchbtn.click(function()
		{
			var tableGridSel=$("#idInverterPg_divGridTbl_"+uniqueId);
			var plantId = $(".filter_divPlantSel",wrapperJq).val();
			var invModelId =$(".filter_divInverterModelSel",wrapperJq).val();
			
			if( plantId>0)
				tableGridSel.setPostDataItem('invplantid',plantId);
			else
				tableGridSel.removePostDataItem("invplantid");
			
			if(invModelId >0)
				tableGridSel.setPostDataItem('invmodelid',invModelId);
			else
				tableGridSel.removePostDataItem("invmodelid");
			
			tableGridSel.trigger('reloadGrid');
		});
	},
    loadInverterGrid:function(wrapperUnqId)
	{
    	var wrapperJqSel=$('#'+wrapperUnqId);
    	var tabGridId="#idInverterPg_divGridTbl_"+wrapperUnqId;
		var tabGridPagerId="#idInverterPg_divGridPager_"+wrapperUnqId;	
		var tabGridIdSel=$(tabGridId);
		tabGridIdSel.data("wrapperUnqId",wrapperUnqId);
		var gridLoad=tabGridIdSel.data("gridLoad");
		if(gridLoad!=null)
			return;		
		gridLoad=tabGridIdSel.jqGrid({
	        url: "/torp/ServiceRouter/getinverters",
	        datatype:'json',
	        width:(jqgrid_getdefaultwidthinview() - 60),
	        height:150,
	        ajaxGridOptions : {async:false},
            mtype:'POST',
	        jsonReader: 
	        		{
						root:'inverters',
						userdata:'inverters',
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
	         },
	         colNames:['Action','','Inverter Name','Inverter Code','Plant','Inverter Model','Ac Inverter Capacity','Installed Inv. Capacity','No of Strings','',''],
	         colModel:[
						{
							   name:'act',
							   index:'act',
							   height:200,
							   width:100,
							   sortable:false,
						},
						{
							   name:'pwrinverterid',
				        	   index:'pwrinverterid',
				        	   hidden:true
						},
						{
				        	   name:'invertername',
				        	   index:'invertername',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				         },
						 {
				        	   name:'invertercode',
				        	   index:'invertercode',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				         },
				         {
				        	   name:'plantname',
				        	   index:'plantname',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				         },
				         {
				        	   name:'invmodelname',
				        	   index:'invmodelname',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				        	   formatter:$.inverters.nullFormatter
				         },
				         {
				        	   name:'invcapacity',
				        	   index:'invcapacity',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				         },
				         {
				        	   name:'installedinvcapacity',
				        	   index:'installedinvcapacity',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				         },
				         {
				        	   name:'noofstrings',
				        	   index:'noofstrings',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				         },
				         {
				        	   name:'invmodelid',
				        	   index:'invmodelid',
				        	   hidden:true
				         },
				         {
				        	   name:'invplantid',
				        	   index:'invplantid',
				        	   hidden:true
				         }],
			 viewrecords: true,
	         pager: tabGridPagerId,
	         caption: "Inverters",
	         gridComplete:function()
	         {
				var ids=tabGridIdSel.jqGrid('getDataIDs');
				for(var i=0;i < ids.length;i++)
				{
					var rowid = ids[i];	
					var actionsbtns = "<input class='deleteactionsstyle' type='button'  value='X' title='Delete' onclick=\"$.inverters.invertersDelete('"+rowid+"','"+tabGridId+"');\" />";
					actionsbtns = actionsbtns +"<input class='editactionsstyle'  type='button' value='E' title='Edit' onclick=\"$.inverters.invertersEdit('"+rowid+"','"+tabGridId+"','"+wrapperUnqId+"');\" />";
					tabGridIdSel.jqGrid('setRowData',ids[i],{act:actionsbtns});
					jqGrid_DefaultActionOnSave(rowid,tabGridIdSel);
				}
							
	         },
			    
		});
		tabGridIdSel.data("gridLoad",gridLoad);
		tabGridIdSel.navGrid(tabGridPagerId,{edit:false,add:false,del:false,search:false,refresh:false});
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
			 $(this).adoreditinverter(opts);
		},
		   position:"last",
		   title:'Add_new_row'
		});
	},
	getwrapperId: function(element)
	{
		return  $(".clsInverterPg_divWrapper",element).attr("id");
	},
	
	invertersDelete:function(rowid,tabGridId)
	{
		var tabGridIdSel=$(tabGridId);			
		var res=confirm("Are you sure! you want to delete.");
		if(!res)
		  return;		
		var rowData = tabGridIdSel.getGridParam('userData')[rowid - 1];
	 	var pwrinverterid=rowData.pwrinverterid;	 	
		var succ=tabGridIdSel.jqGrid('delRowData',rowid); 
		if(succ)
		{
		 	  $.ajax({
				   type: "POST",
				   url: "/torp/ServiceRouter/addeditordeleteinverter",
				   dataType:'json',
				   data:"mode=delete&pwrinverterid="+pwrinverterid,
				   success: function(data)
				   {
						if(data.status == "ok")
						{			
							alert("Inverter deleted successfully")
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
		
   invertersEdit:function(rowid,tabGridId,wrapperId)
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
		$(".clsInverterPg_divInvEditHldr",wrapperJq).adoreditinverter(opts);	
   },
   nullFormatter:function(cellvalue,options,rowObject)
   {
		var colName = options.colModel["name"];
		if(rowObject[colName] == "null")
			  return "";
		else
			 return rowObject[colName];
   }
}