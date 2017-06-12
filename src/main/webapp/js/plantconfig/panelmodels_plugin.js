$.fn.panelmodels=function()
{
	return this.each(function(){
		var wrapperUnqId=$.panelmodels.getDataHolderUniqId("idpanelmodelsPg_");	
		$(".clspanelmodelsPg_divWrapper",this).remove("");
		$(this).append($.panelmodels.getHtmlContent(wrapperUnqId));
		var wrapperJqSel=$("#"+wrapperUnqId);
		var panelSel=$('.clspanelmodelsPg_divPanelHldr',wrapperJqSel);
		var clsOpts={cleardata:true};
		panelSel.panels(clsOpts);
		$.panelmodels.loadpanelmodelssGrid(wrapperUnqId);
		
	 });
	
}
$.panelmodels={
	nxtId:0,
	getDataHolderUniqId:function(prefix)
	{
		return prefix+$.panelmodels.nxtId++;
    },
    getHtmlContent:function(wrapperUnqId)
    {
    	var htmlContent='';
    	htmlContent+='<div class="clspanelmodelsPg_divWrapper" id="'+wrapperUnqId+'">';  
			htmlContent+='<div class="clspanelmodelsPg_divGridWrapper clsCmm_FirstDiv ">';
					htmlContent+='<table id="idpanelmodelsPg_divGridTbl_'+wrapperUnqId+'"></table>'; 
					htmlContent+='<div id="idpanelmodelsPg_divGridPager_'+wrapperUnqId+'"></div>';
			htmlContent+='</div>';
			htmlContent+="<div class='clspanelmodelsPg_divPanelHldr' style='margin-top:15px;'></div>";
    	htmlContent+='</div>';
    	return htmlContent;
    	
    },
    getFilterHtml:function(uniqueId)
	{
    	/*var htmlContent="";
		htmlContent+="<fieldset>";
			htmlContent+= "<div class='filter_row'>";
				htmlContent+= "<div class='filter_divElemt'>";
					htmlContent+= "<div class='filter_divLbl'><label>Strings:</label></div>";
					htmlContent+= "<select class='filter_divStringSel flexselect' style='width: 50%;' ><option value=1>Select Strings</option></select>";
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
		/*var stringSel=$(".filter_divStringSel",wrapperJq);
		var panelModelSel=$(".filter_divPanelModelSel",wrapperJq);
		
		var stringOptions = 
		{
			asyncVal:false,
			url:'/torp/ServiceRouter/getstrings',
			selectHeader:'Strings',
			postParams:{},
			desc:'stringname',
			id:'pwrstringid',
			jsonArray:'strings',
			intialVal:true,
			initblank:true
		}
		loadCombobox(stringSel,stringOptions);
		stringSel.val("");
		stringSel.chosen({enable_split_word_search:false,allow_single_deselect: true});
		
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
			$(".filter_divStringSel",wrapperJq).val("");
			$(".filter_divPanelModelSel",wrapperJq).val("");
			$(".filter_divStringSel",wrapperJq).trigger("chosen:updated");
			$(".filter_divPanelModelSel",wrapperJq).trigger("chosen:updated");
		});
		
		var searchbtn = $(".filter_divSearchBttn",wrapperJq);
		searchbtn.unbind('click');
		searchbtn.click(function()
		{
			var tableGridSel=$("#idplantsPg_divGridTbl_"+uniqueId);
			var stringId = $(".filter_divStringSel",wrapperJq).val();;
			var panelModelId =$(".filter_divPanelModelSel",wrapperJq).val();
			
			if( stringId>0)
				tableGridSel.setPostDataItem('pwrstringid',stringId);
			else
				tableGridSel.removePostDataItem("pwrstringid");
			
			if(panelModelId >0)
				tableGridSel.setPostDataItem('pwrpanelmodelid',panelModelId);
			else
				tableGridSel.removePostDataItem("pwrpanelmodelid");
			
			tableGridSel.trigger('reloadGrid');
		});*/
	},
    loadpanelmodelssGrid:function(wrapperUnqId)
	{
    	var wrapperJqSel=$('#'+wrapperUnqId);
    	var tabGridId="#idpanelmodelsPg_divGridTbl_"+wrapperUnqId;
		var tabGridPagerId="#idpanelmodelsPg_divGridPager_"+wrapperUnqId;
        var panelSel = $('.clspanelmodelsPg_divPanelHldr',wrapperJqSel);		
		var tabGridIdSel=$(tabGridId);
		tabGridIdSel.data("wrapperUnqId",wrapperUnqId);
		var gridLoad=tabGridIdSel.data("gridLoad");
		if(gridLoad!=null)
			return;		
		gridLoad=tabGridIdSel.jqGrid({
	        url: "/torp/ServiceRouter/getpanelmodels",
	        datatype:'json',
	        width:(jqgrid_getdefaultwidthinview() - 60),
	        height:150,
	        ajaxGridOptions : {async:false},
	        jsonReader: 
	        		{
						root:'panelmodels',
						userdata:'panelmodels',
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
	 		
	         colNames:['Action','','Panel Make','Panel Model','Voc','Vmp','Imp','Pmpp'],
	         colModel:[
						{
							   name:'act',
							   index:'act',
							   height:200,
							   width:60,
							   sortable:false,
						},
						{
							   name:'pwrpanelmodelid',
				        	   index:'pwrpanelmodelid',
				        	   hidden:true
						},
						{
				        	   name:'panelmake',
				        	   index:'panelmake',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				        	   sortable:true,
				        },
						{
				        	   name:'panelmodel',
				        	   index:'panelmodel',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				        	   sortable:true,
				        },
				        {
				        	   name:'panelvoc',
				        	   index:'panelvoc',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				        	   sortable:true,
				        },
				        {
				        	   name:'panelvmp',
				        	   index:'panelvmp',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				        	   sortable:true,
				        },
				        {
				        	   name:'panelimp',
				        	   index:'panelimp',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				        	   sortable:true,
				        },
				        {
				        	   name:'panelpmpp',
				        	   index:'panelpmpp',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				        	   sortable:true,
				        }
				        ],
			 viewrecords: true,
	         pager: tabGridPagerId,
	         caption: "Panel Models",
	         gridComplete:function()
	         {
				 var ids=tabGridIdSel.jqGrid('getDataIDs');
	        	 if(ids.length == 0)
	        	 {
	        		 panelSel.reloadpanels({cleardata:true,error:true});
	        	 }
				var ids=tabGridIdSel.jqGrid('getDataIDs');
				for(var i=0;i < ids.length;i++)
				{
				
					var rowid = ids[i];	
					var actionsbtns = "<input class='deleteactionsstyle' type='button'  value='X' title='Delete' onclick=\"$.panelmodels.panelmodelsDelete('"+rowid+"','"+tabGridId+"');\" />";
					actionsbtns = actionsbtns +"<input class='editactionsstyle'  type='button' value='E' title='Edit' onclick=\"$.panelmodels.panelmodelsEdit('"+rowid+"','"+tabGridId+"','"+wrapperUnqId+"');\" />";
					tabGridIdSel.jqGrid('setRowData',ids[i],{act:actionsbtns});
					jqGrid_DefaultActionOnSave(rowid,tabGridIdSel);
				}
							
	         },
			 onSelectRow: function(ids) 
			{ 
				var rowData; 
				var rowData=tabGridIdSel.getGridParam('userData')[ids - 1];
			 	if(rowData!=undefined)
			 	{
			 		var options={pwrpanelmodelid:rowData.pwrpanelmodelid};	    
			 		panelSel.reloadpanels(options);
			 	}	
			},
			loadComplete: function()
	 		{
	        	$.panelmodels.loadpanelmodelsGrid(tabGridIdSel,1);
			}
			    
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
			 $(this).addoreditpanelmodel(opts);
		},
		position:"last",
		title:'Add_new_row'
		});
	},
	loadpanelmodelsGrid:function(tabGridIdSel,rowId)
	{
		  tabGridIdSel.setSelection(rowId,true);
	},
	  
	panelmodelsDelete:function(rowid,tabGridId)
	{
		var tabGridIdSel=$(tabGridId);			
		var res=confirm("Are you sure! you want to delete.");
		if(!res)
		  return;		
		var rowData = tabGridIdSel.getGridParam('userData')[rowid - 1];
	 	var pwrpanelmodelid=rowData.pwrpanelmodelid;	 	
		var succ=tabGridIdSel.jqGrid('delRowData',rowid); 
		if(succ)
		{
		 	  $.ajax({
				   type: "POST",
				   url: "/torp/ServiceRouter/addeditordeletepanelmodel",
				   dataType:'json',
				   data:"mode=delete&pwrpanelmodelid="+pwrpanelmodelid,
				   success: function(data)
				   {
						if(data.status == "ok")
						{			
							alert("Panel Model Delted Successfully")
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
   panelmodelsEdit:function(rowid,tabGridId,wrapperId)
   {
	   wrapperJq = $("#"+wrapperId);
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
		$(".clspanelmodelsPg_divPanelHldr",wrapperJq).addoreditpanelmodel(opts);	
   }

}