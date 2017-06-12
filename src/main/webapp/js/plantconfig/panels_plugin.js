$.fn.panels=function(options)
{
	options=$.extend({},options);
	return this.each(function(){
		var wrapperUnqId=$.panels.getDataHolderUniqId("idPanelPg_");	
		$(".clsPanelPg_divWrapper",this).remove("");
		$(this).append($.panels.getHtmlContent(wrapperUnqId));
		var wrapperJqSel=$("#"+wrapperUnqId);
		wrapperJqSel.data("options",options);
		$.panels.loadPanelGrid(wrapperUnqId);
		$(".clsPanelPg_FilterHldr",wrapperJqSel).html($.panels.getFilterHtml(wrapperUnqId,options))
		$.panels.getDataforfilters(wrapperUnqId, wrapperJqSel);
		$.panels.loadAndBindFilterHandlr(wrapperUnqId, wrapperJqSel);
	 });
	
}

jQuery.fn.reloadpanels=function(options)
{	
	var pwrpanelmodelid = options.pwrpanelmodelid;
	var gridUniqueId=jQuery.panels.getwrapperId(this);
	var reloadpanelsel=$("#idPanelPg_divGridTbl_"+gridUniqueId);
	if(pwrpanelmodelid != undefined)
	{
		reloadpanelsel.data("pwrpanelmodelid",pwrpanelmodelid);
		reloadpanelsel.data("options",options);
		reloadpanelsel.setPostDataItem("pwrpanelmodelid",pwrpanelmodelid);	 
		reloadpanelsel.trigger('reloadGrid');	    
	}
	if(options.cleardata!=undefined && options.cleardata)
	{
		var options=$.extend({error:true},options);
		reloadpanelsel.data("options",options);
		reloadpanelsel.clearGridData(true);
	}
}


$.panels={
	nxtId:0,
	getDataHolderUniqId:function(prefix)
	{
		return prefix+$.panels.nxtId++;
    },
    getHtmlContent:function(wrapperUnqId)
    {
    	var htmlContent='';
    	htmlContent+='<div class="clsPanelPg_divWrapper" id="'+wrapperUnqId+'">';   
		htmlContent+='<div class="clsPanelPg_FilterHldr" style="margin-bottom:15px;"></div>';
			htmlContent+='<div class="clsPanelPg_divGridWrapper clsCmm_FirstDiv ">';
					htmlContent+='<table id="idPanelPg_divGridTbl_'+wrapperUnqId+'"></table>'; 
					htmlContent+='<div id="idPanelPg_divGridPager_'+wrapperUnqId+'"></div>';
			htmlContent+='</div>';
			htmlContent+="<div class='clsPanelPg_diEditHldr' style='margin-top:15px;'></div>";
    	htmlContent+='</div>';
    	return htmlContent;
    	
    },
    getFilterHtml:function(uniqueId)
	{
    	var htmlContent="";
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
		return htmlContent;
	},
	getDataforfilters:function(uniqueId, wrapperJq)
	{
		var stringSel=$(".filter_divStringSel",wrapperJq);
		var panelModelSel=$(".filter_divPanelModelSel",wrapperJq);
		
		var stringOptions = 
		{
			asyncVal:false,
			url:'/torp/ServiceRouter/getstrings',
			selectHeader:'Strings',
			postParams:{},
			desc:['stringname','stringcode'],
			id:'pwrstringid',
			jsonArray:'strings',
			intialVal:true,
			initblank:true
		}
		loadCombobox(stringSel,stringOptions);
		stringSel.val("");
		stringSel.chosen({enable_split_word_search:false,allow_single_deselect: true,width:"165px"});
		
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
			$(".filter_divStringSel",wrapperJq).val("");
			$(".filter_divPanelModelSel",wrapperJq).val("");
			$(".filter_divStringSel",wrapperJq).trigger("chosen:updated");
			$(".filter_divPanelModelSel",wrapperJq).trigger("chosen:updated");
		});
		
		var searchbtn = $(".filter_divSearchBttn",wrapperJq);
		searchbtn.unbind('click');
		searchbtn.click(function()
		{
			var tableGridSel=$("#idPanelPg_divGridTbl_"+uniqueId);
			var stringId = $(".filter_divStringSel",wrapperJq).val();;
			var panelModelId =$(".filter_divPanelModelSel",wrapperJq).val();
			
			if( stringId>0)
				tableGridSel.setPostDataItem('pwrstringid',stringId);
			else
				tableGridSel.removePostDataItem("pwrstringid");
			
			if(panelModelId >0)
				tableGridSel.setPostDataItem('panelmodelid',panelModelId);
			else
				tableGridSel.removePostDataItem("panelmodelid");
			
			tableGridSel.trigger('reloadGrid');
		});
	},
    loadPanelGrid:function(wrapperUnqId)
	{
    	var wrapperJqSel=$('#'+wrapperUnqId);
    	var tabGridId="#idPanelPg_divGridTbl_"+wrapperUnqId;
		var tabGridPagerId="#idPanelPg_divGridPager_"+wrapperUnqId;	
		var tabGridIdSel=$(tabGridId);
		tabGridIdSel.data("wrapperUnqId",wrapperUnqId);
		var gridLoad=tabGridIdSel.data("gridLoad");
		if(gridLoad!=null)
			return;		
		gridLoad=tabGridIdSel.jqGrid({
	        url: "/torp/ServiceRouter/getpanels",
	        datatype:'json',
	        width:(jqgrid_getdefaultwidthinview() - 60),
	        height:150,
	        ajaxGridOptions : {async:false},
            mtype:'POST',
	        jsonReader: 
	        		{
						root:'panels',
						userdata:'panels',
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
	 		
	         colNames:['Action','','Panel Model ','Panel Voltage','Panel Current','Panel Capacity','String Name'],
	         colModel:[
						{
							   name:'act',
							   index:'act',
							   height:200,
							   width:100,
							   sortable:false,
						},
						{
							   name:'pwrpanelid',
				        	   index:'pwrpanelid',
				        	   hidden:true
						},
						{
				        	   name:'panelmodelid',
				        	   index:'panelmodelid',
				        	   jsonmap:'panelmodel',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				         },
						 {
				        	   name:'panelvoltage',
				        	   index:'panelvoltage',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				         },
				         {
				        	   name:'panelcurrent',
				        	   index:'panelcurrent',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				         },
				         {
				        	   name:'panelcapacity',
				        	   index:'panelcapacity',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				         },
				         {
				        	   name:'pwrstringid',
				        	   index:'pwrstringid',
				        	   jsonmap:'stringname',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				         }],
			 viewrecords: true,
	         pager: tabGridPagerId,
	         caption: "Panels",
	         gridComplete:function()
	         {
				var ids=tabGridIdSel.jqGrid('getDataIDs');
				var ids=tabGridIdSel.jqGrid('getDataIDs');
				for(var i=0;i < ids.length;i++)
				{
					var rowid = ids[i];	
					var actionsbtns = "<input class='deleteactionsstyle' type='button'  value='X' title='Delete' onclick=\"$.panels.panelsDelete('"+rowid+"','"+tabGridId+"');\" />";
					actionsbtns = actionsbtns +"<input class='editactionsstyle'  type='button' value='E' title='Edit' onclick=\"$.panels.panelsEdit('"+rowid+"','"+tabGridId+"','"+wrapperUnqId+"');\" />";
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
			 $(this).addoreditpanels(opts);
		},
		   position:"last",
		   title:'Add_new_row'
		});
	},
	getwrapperId: function(element)
	{
		return  $(".clsPanelPg_divWrapper",element).attr("id");
	},
	
	panelsDelete:function(rowid,tabGridId)
	{
		var tabGridIdSel=$(tabGridId);			
		var res=confirm("Are you sure! you want to delete.");
		if(!res)
		  return;		
		var rowData = tabGridIdSel.getGridParam('userData')[rowid - 1];
	 	var pwrpanelid=rowData.pwrpanelid;	 	
		var succ=tabGridIdSel.jqGrid('delRowData',rowid); 
		if(succ)
		{
		 	  $.ajax({
				   type: "POST",
				   url: "/torp/ServiceRouter/addeditordeletepanel",
				   dataType:'json',
				   data:"mode=delete&pwrpanelid="+pwrpanelid,
				   success: function(data)
				   {
						if(data.status == "ok")
						{			
							alert("Panel deleted successfully")
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
		
   panelsEdit:function(rowid,tabGridId,wrapperId)
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
		$(".clsPanelPg_diEditHldr",wrapperJq).addoreditpanels(opts);	
   },
}