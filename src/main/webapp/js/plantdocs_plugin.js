$.fn.plantdocs=function(options)
{
	options=$.extend({},options);
	return this.each(function(){
		var wrapperUnqId=$.plantdocs.getDataHolderUniqId("idPlantDocsPg_");	
		$(".clsPlantDocsPg_divWrapper",this).remove("");
		$(this).append($.plantdocs.getHtmlContent(wrapperUnqId));
		var wrapperJqSel=$("#"+wrapperUnqId);
		wrapperJqSel.data("options",options);
		$.plantdocs.loadPlantDocsGrid(wrapperUnqId);
		$(".clsPlantDocsPg_FilterHldr",wrapperJqSel).html($.plantdocs.getFilterHtml(wrapperUnqId,options))
		$.plantdocs.getDataforfilters(wrapperUnqId, wrapperJqSel);
		$.plantdocs.loadAndBindFilterHandlr(wrapperUnqId, wrapperJqSel);
	 });
	
}

$.plantdocs={
	nxtId:0,
	getDataHolderUniqId:function(prefix)
	{
		return prefix+$.plantdocs.nxtId++;
    },
    getHtmlContent:function(wrapperUnqId)
    {
    	var htmlContent='';
    	htmlContent+='<div class="clsPlantDocsPg_divWrapper" id="'+wrapperUnqId+'">';  
    		htmlContent+='<div class="clsPlantDocsPg_FilterHldr" style="margin-bottom:15px;"></div>';
			htmlContent+='<div class="clsPlantDocsPg_divGridWrapper clsCmm_FirstDiv ">';
					htmlContent+='<table id="idPlantDocsPg_divGridTbl_'+wrapperUnqId+'"></table>'; 
					htmlContent+='<div id="idPlantDocsPg_divGridPager_'+wrapperUnqId+'"></div>';
			htmlContent+='</div>';
			htmlContent+="<div class='clsPlantDocsPg_divDocHldr' style='margin-top:15px;'></div>";
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
					htmlContent+= "<div class='filter_divLbl'><label>Document Type:</label></div>";
					htmlContent+= "<select class='filter_divDocTypeSel flexselect' style='width: 50%;'></select>";
				htmlContent+= "</div>";
				
				htmlContent+= "<div class='filter_divElemt'>";
					htmlContent+= "<div class='filter_divLbl'><label>Start Date:</label></div>";
					htmlContent+= "<input class='filter_divSDSel ' style='width: 50%;' />";
				htmlContent+= "</div>";
				htmlContent+= "<div class='filter_divElemt'>";
					htmlContent+= "<div class='filter_divLbl'><label>End Date:</label></div>";
					htmlContent+= "<input class='filter_divEDSel' style='width: 50%;' />";
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
		var docTypeSel=$(".filter_divDocTypeSel",wrapperJq);
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
		docTypeSel.html('<option value="0">All Document Types</option><option value="1">Electrical SLD</option><option value="2">Plant Layout</option><option value="3">As-Build Drawings</option><option value="4">Statutory Clearances</option><option value="5">Warranty Certificates</option><option value="6">Commissioning Documents</option><option value="7">Maintenance Records</option><option value="8">Others</option>');
	},
	loadAndBindFilterHandlr:function(uniqueId, wrapperJq)
	{
		var clearBtn = $(".filter_divClearBttn",wrapperJq);
		clearBtn.unbind('click');
		clearBtn.click(function()
		{
			$(".filter_divPlantSel",wrapperJq).val("");
			$(".filter_divDocTypeSel",wrapperJq).val(0);
			$(".filter_divPlantSel",wrapperJq).trigger("chosen:updated");
			$(".filter_divSDSel",wrapperJq).val("");
			$(".filter_divEDSel",wrapperJq).val("");
		});
		
		var searchbtn = $(".filter_divSearchBttn",wrapperJq);
		searchbtn.unbind('click');
		searchbtn.click(function()
		{
			var tableGridSel=$("#idPlantDocsPg_divGridTbl_"+uniqueId);
			var plantId = $(".filter_divPlantSel",wrapperJq).val();
			var docTypeId =$(".filter_divDocTypeSel",wrapperJq).val();
			var startDate = $(".filter_divSDSel",wrapperJq).val();
			var endDate = $(".filter_divEDSel",wrapperJq).val();
			
			if( plantId>0)
				tableGridSel.setPostDataItem('forplantid',plantId);
			else
				tableGridSel.removePostDataItem("forplantid");
			
			if(docTypeId >0)
				tableGridSel.setPostDataItem('pdoctype',docTypeId);
			else
				tableGridSel.removePostDataItem("pdoctype");
			if(startDate.trim() != "")
				tableGridSel.setPostDataItem('startdate',startDate);
			else
				tableGridSel.removePostDataItem("startdate");
			if(endDate.trim() != "")
				tableGridSel.setPostDataItem('enddate',endDate);
			else
				tableGridSel.removePostDataItem("enddate");
			tableGridSel.trigger('reloadGrid');
		});
	},
    loadPlantDocsGrid:function(wrapperUnqId)
	{
    	var wrapperJqSel=$('#'+wrapperUnqId);
    	var tabGridId="#idPlantDocsPg_divGridTbl_"+wrapperUnqId;
		var tabGridPagerId="#idPlantDocsPg_divGridPager_"+wrapperUnqId;	
		var tabGridIdSel=$(tabGridId);
		tabGridIdSel.data("wrapperUnqId",wrapperUnqId);
		var gridLoad=tabGridIdSel.data("gridLoad");
		if(gridLoad!=null)
			return;		
		gridLoad=tabGridIdSel.jqGrid({
	        url: "/torp/ServiceRouter/getdocumentdetails",
	        datatype:'json',
	        width:(jqgrid_getdefaultwidthinview() - 60),
	        height:150,
	        ajaxGridOptions : {async:false},
            mtype:'POST',
	        jsonReader: 
	        		{
						root:'pwrplantdocs',
						userdata:'pwrplantdocs',
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
	         colNames:['Action','','Plant','Document Name','Document Type','Created By','Docment Date','Created Date',''],
	         colModel:[
						{
							   name:'act',
							   index:'act',
							   height:200,
							   width:150,
							   sortable:false,
						},
						{
							   name:'pwrplantdocid',
				        	   index:'pwrplantdocid',
				        	   hidden:true
						},
						{
				        	   name:'plantname',
				        	   index:'plantname',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				         },
				         {
				        	   name:'pdocname',
				        	   index:'pdocname',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				         },
						 {
				        	   name:'pdoctype',
				        	   index:'pdoctype',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
							   formatter:$.plantdocs.pdoctypeFormatter
				         },
				         {
				        	   name:'creatorname',
				        	   index:'creatorname',
				        	   height:200,
				        	   width:200,
				        	   editable:false
				         },
				         {
				        	   name:'pdocdate',
				        	   index:'pdocdate',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				        	   formatter:$.plantdocs.nullFormatter
				         },
				         {
				        	   name:'createddate',
				        	   index:'createddate',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				        	   formatter:$.plantdocs.nullFormatter
				         },
				         
				         {
							   name:'docfileid',
				        	   index:'docfileid',
				        	   hidden:true
				         }],
			 viewrecords: true,
	         pager: tabGridPagerId,
	         caption: "Plant Documents",
	         gridComplete:function()
	         {
				var ids=tabGridIdSel.jqGrid('getDataIDs');
				for(var i=0;i < ids.length;i++)
				{
					var rowid = ids[i];	
					var actionsbtns = "";
					if(GLOBAL_USER_ROLE == 1 || GLOBAL_USER_ROLE == 2)
					{
						actionsbtns = actionsbtns +"<input class='editactionsstyle'  type='button' value='E' style='background-color: #49BA8E;' title='Edit Details' onclick=\"$.plantdocs.plantdocsEdit('"+rowid+"','"+tabGridId+"','"+wrapperUnqId+"');\" />";
						actionsbtns = actionsbtns +"<input class='editactionsstyle'  type='button' value='R' style='background-color: #d75159;' title='Replace Doc' onclick=\"$.plantdocs.plantdocsReplace('"+rowid+"','"+tabGridId+"','"+wrapperUnqId+"');\" />";
						actionsbtns = actionsbtns +"<input class='editactionsstyle'  type='button' value='X' style='background-color: #c02c3a;' title='Delete' onclick=\"$.plantdocs.plantdocsDelete('"+rowid+"','"+tabGridId+"','"+wrapperUnqId+"');\" />";
					}
					actionsbtns = actionsbtns +"<input class='editactionsstyle'  type='button' value='V' title='View Doc' onclick=\"$.plantdocs.plantdocsView('"+rowid+"','"+tabGridId+"','"+wrapperUnqId+"');\" />";
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
			 $(this).uploaddocument(opts);
		},
		   position:"last",
		   title:'Add_new_row'
		});
   },
   nullFormatter:function(cellvalue,options,rowObject)
   {
		var colName = options.colModel["name"];
		if(rowObject[colName] == "null")
			  return "";
		else
			 return rowObject[colName];
   },
   pdoctypeFormatter:function(cellvalue,options,rowObject)
   {
		switch (rowObject.pdoctype) {
		case 1: return "Electrical SLD";
		case 2: return "Plant Layout";
		case 3: return "As-Build Drawings";
		case 4: return "Statutory Clearances";
		case 5: return "Warranty Certificates";
		case 6: return "Commissioning Documents";
		case 7: return "Maintenance Records";
		case 8: return "Maintenance Records";
		default:return "";
		}
   },
   plantdocsEdit:function(rowId,tabGridId,wrapperUnqId)
   {
	    var wrapperJq = $("#"+wrapperUnqId);
		var tabGridIdSel=$(tabGridId);
		tabGridIdSel.setSelection(rowId,true);  
		var rowdata=tabGridIdSel.getGridParam('userData')[rowId - 1];
		var opts=
			{
					type:'editdoc',
					uploadDocData:rowdata,
					callbackfunc:function(status)
					{
						if(status)
							tabGridIdSel.trigger('reloadGrid');
					}
			};
		$(".clsPlantDocsPg_divDocHldr",wrapperJq).uploaddocument(opts);
   },
   plantdocsView:function(rowId,tabGridId,wrapperUnqId)
   {
	    var wrapperJq = $("#"+wrapperUnqId);
		var tabGridIdSel=$(tabGridId);
		tabGridIdSel.setSelection(rowId,true);  
		var rowdata=tabGridIdSel.getGridParam('userData')[rowId - 1];
   		window.open("/torp/ServiceRouter/getfilecontent?fileid="+rowdata.docfileid,"_self");
   },
   plantdocsReplace:function(rowId,tabGridId,wrapperUnqId)
   {
	    var wrapperJq = $("#"+wrapperUnqId);
		var tabGridIdSel=$(tabGridId);
		tabGridIdSel.setSelection(rowId,true);  
		var rowdata=tabGridIdSel.getGridParam('userData')[rowId - 1];
		var opts=
		{
				type:'edit',
				uploadDocData:rowdata,
				callbackfunc:function(status)
				{
					if(status)
						tabGridIdSel.trigger('reloadGrid');
				}
		};
		$(".clsPlantDocsPg_divDocHldr",wrapperJq).uploaddocument(opts);
   },
   plantdocsDelete:function(rowId,tabGridId,wrapperUnqId)
   {
	    var tabGridIdSel=$(tabGridId);			
		var res=confirm("Are you sure! you want to delete.");
		if(!res)
		  return;		
		var rowData = tabGridIdSel.getGridParam('userData')[rowId - 1];
		var succ=tabGridIdSel.jqGrid('delRowData',rowId); 
		if(succ)
		{
		 	  $.ajax({
				   type: "POST",
				   url: "/torp/ServiceRouter/deletedocument",
				   dataType:'json',
				   data:{fileid:rowData.docfileid,storageid:rowData.storageid,storagetype:rowData.storagetype},
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
   }
}