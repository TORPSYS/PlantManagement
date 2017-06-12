$.fn.invertermodel=function()
{
	return this.each(function(){
		var wrapperUnqId=$.invertermodel.getDataHolderUniqId("idInverterModelPg_");	
		$(".clsInverterModelPg_divWrapper",this).remove("");
		$(this).append($.invertermodel.getHtmlContent(wrapperUnqId));
		var wrapperJqSel=$("#"+wrapperUnqId);
		var inverterSel=$('.clsInverterModelPg_divInverterHldr',wrapperJqSel);
		inverterSel.inverters();
		$.invertermodel.loadInverterModelsGrid(wrapperUnqId);
	 });
	
}
$.invertermodel={
	nxtId:0,
	getDataHolderUniqId:function(prefix)
	{
		return prefix+$.invertermodel.nxtId++;
    },
    getHtmlContent:function(wrapperUnqId)
    {
    	var htmlContent='';
    	htmlContent+='<div class="clsInverterModelPg_divWrapper" id="'+wrapperUnqId+'">';       			
			htmlContent+='<div class="clsInverterModelPg_divGridWrapper clsCmm_FirstDiv ">';
					htmlContent+='<table id="idInverterModelPg_divGridTbl_'+wrapperUnqId+'"></table>'; 
					htmlContent+='<div id="idInverterModelPg_divGridPager_'+wrapperUnqId+'"></div>';
			htmlContent+='</div>';
			htmlContent+="<div class='clsInverterModelPg_divInverterHldr' style='margin-top:15px;'></div>";
			htmlContent+="<div class='clsInverterModelPg_divInvModelEditHldr' style='margin-top:15px;'></div>";
    	htmlContent+='</div>';
    	return htmlContent;
    	
    },
    loadInverterModelsGrid:function(wrapperUnqId)
	{
    	var wrapperJqSel=$('#'+wrapperUnqId);
    	var tabGridId="#idInverterModelPg_divGridTbl_"+wrapperUnqId;
		var tabGridPagerId="#idInverterModelPg_divGridPager_"+wrapperUnqId;
		var tabGridIdSel=$(tabGridId);
		tabGridIdSel.data("wrapperUnqId",wrapperUnqId);
		var gridLoad=tabGridIdSel.data("gridLoad");
		if(gridLoad!=null)
			return;		
		gridLoad=tabGridIdSel.jqGrid({
	        url: "/torp/ServiceRouter/getinvertermodels",
	        datatype:'json',
	        width:(jqgrid_getdefaultwidthinview() - 60),
	        height:150,
	        ajaxGridOptions : {async:false},
	        jsonReader: 
	        		{
						root:'invertermodels',
						userdata:'invertermodels',
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
	 		
	         colNames:['Action','','Inverter Make','Inverter Model','Ac Inverter Capacity'],
	         colModel:[
						{
							   name:'act',
							   index:'act',
							   height:200,
							   width:40,
							   sortable:false,
						},
						{
							   name:'invertermodelid',
				        	   index:'invertermodelid',
				        	   hidden:true
						},
						{
				        	   name:'invmake',
				        	   index:'invmake',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				        },
						{
				        	   name:'invmodel',
				        	   index:'invmodel',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				        },
				        {
				        	   name:'invcapacity',
				        	   index:'invcapacity',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				         }],
			 viewrecords: true,
	         pager: tabGridPagerId,
	         caption: "Inverter Models",
	         gridComplete:function()
	         {
				var ids=tabGridIdSel.jqGrid('getDataIDs');
				for(var i=0;i < ids.length;i++)
				{
				
					var rowid = ids[i];	
					var actionsbtns = "<input class='deleteactionsstyle' type='button'  value='X' title='Delete' onclick=\"$.invertermodel.invertermodelDelete('"+rowid+"','"+tabGridId+"');\" />";
					actionsbtns = actionsbtns +"<input class='editactionsstyle'  type='button' value='E' title='Edit' onclick=\"$.invertermodel.invertermodelEdit('"+rowid+"','"+tabGridId+"','"+wrapperUnqId+"');\" />";
					tabGridIdSel.jqGrid('setRowData',ids[i],{act:actionsbtns});
					jqGrid_DefaultActionOnSave(rowid,tabGridIdSel);
				}
							
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
			 $(this).addoreditinvertermodel(opts);
		},
		position:"last",
		title:'Add_new_row'
		});
	},
	  
	invertermodelDelete:function(rowid,tabGridId)
	{
		var tabGridIdSel=$(tabGridId);			
		var res=confirm("Are you sure! you want to delete.");
		if(!res)
		  return;		
		var rowData = tabGridIdSel.getGridParam('userData')[rowid - 1];
	 	var invertermodelid=rowData.invertermodelid;	 	
		var succ=tabGridIdSel.jqGrid('delRowData',rowid); 
		if(succ)
		{
		 	  $.ajax({
				   type: "POST",
				   url: "/torp/ServiceRouter/addeditordeleteinvertermodel",
				   dataType:'json',
				   data:"mode=delete&invertermodelid="+invertermodelid,
				   success: function(data)
				   {
						if(data.status == "ok")
						{			
							alert("Inverter Model Delted Successfully")
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
   invertermodelEdit:function(rowid,tabGridId,wrapperId)
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
		$(".clsInverterModelPg_divInvModelEditHldr",wrapperJq).addoreditinvertermodel(opts);	
   }

}