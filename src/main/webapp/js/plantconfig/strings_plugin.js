$.fn.strings=function(options)
{
	options=$.extend({},options);
	return this.each(function(){
		var wrapperUnqId=$.strings.getDataHolderUniqId("idStringsPg_");	
		$(".clsStringsPg_divWrapper",this).remove("");
		$(this).append($.strings.getHtmlContent(wrapperUnqId));
		var wrapperJqSel=$("#"+wrapperUnqId);
		wrapperJqSel.data("options",options);
		$.strings.loadClientsGrid(wrapperUnqId);
		$(".clsStringsPg_FilterHldr",wrapperJqSel).html($.strings.getFilterHtml(wrapperUnqId,options))
		$.strings.getDataforfilters(wrapperUnqId, wrapperJqSel);
		$.strings.loadAndBindFilterHandlr(wrapperUnqId, wrapperJqSel);
	 });
	
}
$.strings={
	nxtId:0,
	getDataHolderUniqId:function(prefix)
	{
		return prefix+$.strings.nxtId++;
    },
    getHtmlContent:function(wrapperUnqId)
    {
    	var htmlContent='';
    	htmlContent+='<div class="clsStringsPg_divWrapper" id="'+wrapperUnqId+'" >';  
    		htmlContent+='<div class="clsStringsPg_FilterHldr" style="margin-bottom:15px;"></div>';
			htmlContent+='<div class="clsStringsPg_divGridWrapper clsCmm_FirstDiv ">';
					htmlContent+='<table id="idStringsPg_divGridTbl_'+wrapperUnqId+'"></table>'; 
					htmlContent+='<div id="idStringsPg_divGridPager_'+wrapperUnqId+'"></div>';
			htmlContent+='</div>';
			htmlContent+="<div class='clsStringsPg_divStrEditHldr' style='margin-top:15px;'></div>";
    	htmlContent+='</div>';
    	return htmlContent;
    	
    },
    getFilterHtml:function(uniqueId)
	{
    	var htmlContent="";
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
		return htmlContent;
	},
	getDataforfilters:function(uniqueId, wrapperJq)
	{
		var inverterSel=$(".filter_divInverterSel",wrapperJq);
		var panelModelSel=$(".filter_divPanelModelSel",wrapperJq);
		
		var inverterOptions = 
		{
			asyncVal:false,
			url:'/torp/ServiceRouter/getinverters',
			selectHeader:'Inverter',
			postParams:{},
			desc:['invertername','invertercode'],
			id:'pwrinverterid',
			jsonArray:'inverters',
			intialVal:true,
			initblank:true
		}
		loadCombobox(inverterSel,inverterOptions);
		inverterSel.val("");
		inverterSel.chosen({enable_split_word_search:false,allow_single_deselect: true,width:"165px"});
		
		var panelModelOptions = 
		{
			asyncVal:false,
			url:'/torp/ServiceRouter/getpanelmodels',
			selectHeader:'Panel Model',
			postParams:{},
			desc:['panelmake','panelmodel'],
			id:'pwrpanelmodelid',
			jsonArray:'panelmodels',
			intialVal:true,
			initblank:true
		}
		loadCombobox(panelModelSel,panelModelOptions);
		panelModelSel.val("");
		panelModelSel.chosen({enable_split_word_search:false,allow_single_deselect: true,width:"165px"});
	},
	loadAndBindFilterHandlr:function(uniqueId, wrapperJq)
	{
		var clearBtn = $(".filter_divClearBttn",wrapperJq);
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
			var tableGridSel=$("#idStringsPg_divGridTbl_"+uniqueId);
			var inverterId = $(".filter_divInverterSel",wrapperJq).val();;
			var panelModelId =$(".filter_divPanelModelSel",wrapperJq).val();
			
			if( inverterId>0)
				tableGridSel.setPostDataItem('inverterid',inverterId);
			else
				tableGridSel.removePostDataItem("inverterid");
			
			if(panelModelId >0)
				tableGridSel.setPostDataItem('pwrpanelmodelid',panelModelId);
			else
				tableGridSel.removePostDataItem("pwrpanelmodelid");
			
			tableGridSel.trigger('reloadGrid');
		});
	},
    loadClientsGrid:function(wrapperUnqId)
	{
    	var wrapperJqSel=$('#'+wrapperUnqId);
    	var options = wrapperJqSel.data("options");
    	var tabGridId="#idStringsPg_divGridTbl_"+wrapperUnqId;
		var tabGridPagerId="#idStringsPg_divGridPager_"+wrapperUnqId;			
		var tabGridIdSel=$(tabGridId);
		tabGridIdSel.data("wrapperUnqId",wrapperUnqId);
		var gridLoad=tabGridIdSel.data("gridLoad");
		if(gridLoad!=null)
			return;		
		gridLoad=tabGridIdSel.jqGrid({
	        url: "/torp/ServiceRouter/getstrings",
	        datatype:'json',
	        width:(jqgrid_getdefaultwidthinview() - 60),
	        mtype:'POST',
	        height:150,
	        jsonReader: 
	        		{
						root:'strings',
						userdata:'strings',
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
				  jQuery(tabGridId).setPostDataItem("schoolid",options.schoolid);
	         },
	 		
	         colNames:['Action','','String Name','String Code','String Capacity','Inverter','Panel Model','','','No. of Panels'],
	         colModel:[
						{
							   name:'act',
							   index:'act',
							   height:200,
							   width:100,
							   sortable:false,
						},
						{
							   name:'pwrstringid',
				        	   index:'pwrstringid',
				        	   hidden:true
						},
						{
				        	   name:'stringname',
				        	   index:'stringname',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				         },
						 {
				        	   name:'stringcode',
				        	   index:'stringcode',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				         },
				         {
				        	   name:'strcapacity',
				        	   index:'strcapacity',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				         },
				         {
				        	   name:'invertername',
				        	   index:'invertername',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				         },
				         {
				        	   name:'panelmodelname',
				        	   index:'panelmodelname',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				        	   formatter:$.strings.nullFormatter
				         },
				         {
				        	   name:'inverterid',
				        	   index:'inverterid',
				        	   hidden:true
				         },
				         {
				        	   name:'panelmodelid',
				        	   index:'panelmodelid',
				        	   hidden:true
				         },
				         {
				        	   name:'numpanels',
				        	   index:'numpanels',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				         }
				         
				         ],
			 viewrecords: true,
	         pager: tabGridPagerId,
	         caption: "Strings",
	         gridComplete:function()
	         {
					var ids=tabGridIdSel.jqGrid('getDataIDs');
					for(var i=0;i < ids.length;i++)
					{
						var rowid = ids[i];	
						var actionsbtns="";
						var actionsbtns = "<input class='deleteactionsstyle' type='button'  value='X' title='Delete' onclick=\"$.strings.stringDelete('"+rowid+"','"+tabGridId+"');\" />";
						actionsbtns = actionsbtns +"<input class='editactionsstyle'  type='button' value='E' title='Edit' onclick=\"$.strings.stringEdit("+rowid+",'"+tabGridId+"','"+wrapperUnqId+"');\" />";
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
				$(this).addoreditstring(opts);
			},position:"last",
		});
	},
		
   stringEdit:function(rowid,tabGridId,wrapperUnqId)
   {
	   var wrapperJq = $("#"+wrapperUnqId);
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
	   $(".clsStringsPg_divStrEditHldr",wrapperJq).addoreditstring(opts);	
   },
	stringDelete:function(rowid,tabGridId)
	{
		var tabGridIdSel=$(tabGridId);			
		var res=confirm("Are you sure! you want to delete.");
		if(!res)
		  return;		
		var rowData = tabGridIdSel.getGridParam('userData')[rowid - 1];
	 	var pwrstringid=rowData.pwrstringid;	 	
		var succ=tabGridIdSel.jqGrid('delRowData',rowid); 
		if(succ)
		{
		 	  $.ajax({
				   type: "POST",
				   url: "/torp/ServiceRouter/addeditordeletestring",
				   dataType:'json',
				   data:{mode:"delete",pwrstringid:pwrstringid},
				   success: function(data)
				   {
						if(data.status == "ok")
						{			
							alert("String deleted successfully")
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
   }
	

}