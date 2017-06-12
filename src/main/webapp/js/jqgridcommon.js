//===============jqgrid defualt settings starts===========================//
$.extend($.jgrid.defaults, {
    // datatype: 'json',
    // height: "100%",
     loadComplete: function (data) 
     {
         var validatrMsgHolderSel=$(this).closest(".ui-jqgrid-bdiv");
         $(".cifValError",validatrMsgHolderSel).remove();
     },
     onSortCol:function (index, columnIndex, sortOrder)
     {
        var tableGrid = $(this).attr("id");
        resetGridSortOrder(tableGrid);
        
        //return 'stop';
        return 'ok'
     },
     multiSort:true,
     sortable: true
});

function resetGridSortOrder(tableGrid)
{
	var tableGridJq = $("#"+tableGrid);
    
    var parentJq = $(tableGridJq.parent().parent().parent());
    $(".ui-jqgrid-sortable",parentJq).removeClass("clsJqGridSortAscending");
    $(".ui-jqgrid-sortable",parentJq).removeClass("clsJqGridSortDescending");
//    $("td",tableGridJq).css("background","transparent");
    
    var sortOrder = " "+tableGridJq.jqGrid('getGridParam','sortname')+""+tableGridJq.jqGrid('getGridParam','sortorder');
    var sortItems = sortOrder.split(",");
    var orderedBy = "";
    
    for(var i=0;i<sortItems.length;i++)
    {
    	var sortItem = sortItems[i].split(" ");
    	var colName = "";
    	if(sortItem[1] != "")
    		colName = getColumnName(sortItem[1],tableGridJq);
    	var sortType = sortItem[2];
    	var str = "";
    	
    	if(colName != undefined && colName != "")
    	{
        	if(sortType == "asc")
        	{
        		str = "<span class='clsJqGridSortAscendingImage'></span>";
        		$("#jqgh_"+tableGrid+"_"+colName).addClass("clsJqGridSortAscending");
//        		$("td[aria-describedby='"+tableGrid+"_"+colName+"']",tableGridJq).css("background","yellowgreen");
        	}
        	else if(sortType == "desc")
        	{
        		str = "<span class='clsJqGridSortDescendingImage'></span>";
        		$("#jqgh_"+tableGrid+"_"+colName).addClass("clsJqGridSortDescending");
//        		$("td[aria-describedby='"+tableGrid+"_"+colName+"']",tableGridJq).css("background","lightcoral");
        	}
        	else
        	{
        		str = "<span class='clsJqGridSortAscendingImage'></span>";
        		$("#jqgh_"+tableGrid+"_"+colName).css("background","yellowgreen");
//        		$("td[aria-describedby='"+tableGrid+"_"+colName+"']",tableGridJq).css("background","yellowgreen");
        	}
        	
        	if(i==0)
        		orderedBy+= "<span>"+$("#jqgh_"+tableGrid+"_"+colName).text()+"</span> "+str;
        	else
        		orderedBy+= " <span style='margin-left:15px'>, "+$("#jqgh_"+tableGrid+"_"+colName).text()+"</span> "+str;
    	}
    }
    if(orderedBy != "")
    {
    	$(".clsGridOrderByColumns",parentJq).remove();
    	parentJq.prepend("<div class='clsGridOrderByColumns'> <span>Ordered By :- </span>"+orderedBy+" </div>");
    }
    else
    	$(".clsGridOrderByColumns",parentJq).remove();
}

function getColumnName(colName,tableGridJq)
{
	var cols = tableGridJq.jqGrid("getGridParam", "colModel");
//  var actualColName = col[iCol]['index'];
	
	for(var i=0;i<cols.length;i++)
	{
		if(cols[i].index == colName)
		{
			return cols[i].name;
		}
	}
	
	return colName;
}
//===============jqgrid defualt settings starts===========================//

var JQGRID_ROWLIST=[10,20,30,50,100];
var JQGRID_MAXROWNUM= 9999999999;
	
function jqgrid_getCurrentPage(selectorid)
{
	removeNotification($(selectorid));
	var rowslimit=jQuery(selectorid).getPostDataItem("rows");
	var offset=jQuery(selectorid).getPostDataItem("offset");
	var curPage = (offset/rowslimit)+1;
	return curPage;
}

function jqgrid_getTotalPages(selectorid,records)
{
	var rowslimit=jQuery(selectorid).getPostDataItem("rows");
	var remainder=parseInteger(records.total%rowslimit);
	if(remainder==0)
		return ((parseInteger(records.total/rowslimit)));
	return ((parseInteger(records.total/rowslimit))+1);
}

function jqgrid_getTotalRecords(records)
{
	return records.total;
}

function jqgrid_getRowNum()
{
	return 10;
}

function jqgrid_getRowList()
{
	return JQGRID_ROWLIST; 
}

function jqgrid_setPageLimitOffset(selectorid)
{
	var rows = jQuery(selectorid).getPostDataItem("rows");
	var page=jQuery(selectorid).getPostDataItem("page");
	var calcOffset=(page-1)*rows;
	var calcLimit=rows*1;
		
	jQuery(selectorid).setPostDataItem("offset",calcOffset);
	jQuery(selectorid).setPostDataItem("limit",calcLimit);
}

function jqgrid_checkUnSavedRecord(selectorid)
{
	var rowObj;
	rowObj=$(selectorid).getInd(-1,true);
	if(rowObj!=false)
	{
		//showmsg("Do you want to lost the unsaved data!.","Status");
		var confirmRes= confirm("Do you want to discard the unsaved data??");
		if(confirmRes==true)
		{
			alert("ok");
		}
		else
		{
			alert("no");
		}
	}
}

function jqgrid_autoresizeonancestorresize(selector)
{
	jQuery(selector).bind('resize', function()
	{
		jqgrid_autoresizeunderancestor(this);
	}).trigger('resize');

}

function jqgrid_autoresizeunderancestor(anc)
{
	alert("jqgrid_autoresize");
	var ancestor = $(anc);
	var ancestorWidth = ancestor.width();
    if (grid = $('.ui-jqgrid-btable:visible'))
    {
        grid.each(function(index) {
            gridId = $(this).attr('id');
            $('#' + gridId).setGridWidth(gridParentWidth);
        });
    }
}


function jqgrid_autoresizeonresizewindow()
{
	jQuery(window).bind('resize', function()
	{
//        if (grid = $('.ui-jqgrid-btable:visible'))
//        {
//            grid.each(function(index) {
//                gridId = $(this).attr('id');
//                gridParentWidth = $('#gbox_' + gridId).parent().width();
//                $('#' + gridId).setGridWidth(gridParentWidth);
//            });
//        }
		jqgrid_autoresize();
	}).trigger('resize');

}

function jqgrid_autoresize()
{
    if (grid = $('.ui-jqgrid-btable:visible',$(".ui-tabs")))
    {
        grid.each(function(index) {
            gridId = $(this).attr('id');
            if(! $(this).hasClass('clsCif_doNotResizeGrid')) 
            {
            	gridParentWidth =  $(".ui-tabs").width()-60;
            	$('#' + gridId).setGridWidth(gridParentWidth);
            }
        });
    }
}

function jqgrid_getdefaultwidthinview()
{
	 var width=$(".ui-tabs").width()-60;
	 return width;
}

function jqgrid_getdefaultheightinview()
{
	var layoutBarBottom = parseInteger($(".ui-tabs ~ .ui-layout-resizer").css("bottom"));
	var viewHeight = parseInteger($(".cls_view:visible",$(".ui-tabs")).height());
	var rightContentHeight = parseInteger($(".ui-tabs").height());
	
	return rightContentHeight - (layoutBarBottom + viewHeight);
}

function jqgrid_setTRData(tblJq,rowId,key,objVal)
{
	$("tr[id='"+rowId+"']",tblJq).data(key,objVal);
}

function jqgrid_getTRData(tblJq,rowId,key)
{
	return $("tr[id='"+rowId+"']",tblJq).data(key);
}

function jqgrid_clearValilatorsForRow(tblJq,rowId)
{
	var errMsgesHldr=$(tblJq).closest(".ui-jqgrid-bdiv");
	$(".cifval_gridrow_"+rowId+"",errMsgesHldr).remove();
	if(parseInt($(".jqgfirstrow",$(tblJq)).css("height")) > 0)
		$(".jqgfirstrow",$(tblJq)).css("height","0px");
}
function jqGrid_DefaultActionOnEdit(rowid,gridSelector,pre)
{
	if(pre==undefined)
		pre="";
	  $(".deleteactionsstyle"+pre,$("tr[id='"+rowid+"']",gridSelector)).hide();
	  $(".editactionsstyle"+pre,$("tr[id='"+rowid+"']",gridSelector)).hide();
	  $(".cancelactionsstyle"+pre,$("tr[id='"+rowid+"']",gridSelector)).show();
	  $(".saveactionsstyle"+pre,$("tr[id='"+rowid+"']",gridSelector)).show();
}

function jqGrid_DefaultActionOnSave(rowid,gridSelector,pre)
{
	if(pre==undefined)
		pre="";
	  $(".deleteactionsstyle"+pre,$("tr[id='"+rowid+"']",gridSelector)).show();
	  $(".editactionsstyle"+pre,$("tr[id='"+rowid+"']",gridSelector)).show();
	  $(".cancelactionsstyle"+pre,$("tr[id='"+rowid+"']",gridSelector)).hide();
	  $(".saveactionsstyle"+pre,$("tr[id='"+rowid+"']",gridSelector)).hide();
}

function jqGrid_checkEditableRowExist(tableSelector,rowid)
{
	if(rowid!=undefined)
	{
		if($("#"+rowid,$(tableSelector)).attr("editable") == "1")
		{
			showmsg("Please save the Editable record first!.","Status","warning");
			return true;
		}
	}
	else
	{
		var editableTrue=$('.editable',$('tr',$(tableSelector))).length;
		if(editableTrue>0)
		{
			showmsg("Please save the Editable record first!.","Status","warning");
			return true;
		}
		/*var ids=jQuery(tableSelector).jqGrid("getDataIDs");
		for(var i=0;i < ids.length;i++)
		{
			var rowid = ids[i];
			if($("#"+rowid,$(tableSelector)).attr("editable") == "1")
			{
				showmsg("Please save the Editable record first!.","Status","warning");
				return true;
			}
		} */
	}
	
	return false;
}

function jqGrid_yesNoFormatter( cellvalue, options, rowObject )
{
	if(cellvalue == "y")
		return "Yes";
	else if(cellvalue == "n")
		return "No";
	else
	{
		if(cellvalue != undefined && cellvalue != null && cellvalue != "null")
			return cellvalue;
		else 
			return "";
	}
}

function isChecked(jQGridSel,rowid,noticeMsg)
{
	if($('.cbox',$("#"+rowid,jQGridSel)).prop("checked"))
	{
		if(noticeMsg)
			showmsg("Row Selected!!!...UnCheck and Try To Edit","","notice");
		return true;
	}
	return false;
}


function jqGrid_GetPrimaryKeys(jqGridSelector)
{
	var selRowIds=jqGridSelector.getGridParam('selarrrow'); //to get selected rows
//	if(selRowIds.length<1)
//	{
//		showmsg("Plz Select Rows To Delete","","notice");
//		return false;
//	}
	var keyIdsStr="";
	var i=0;
	for(var rowIdx=0;rowIdx<selRowIds.length;rowIdx++)
	{
		var rowId=selRowIds[rowIdx];
		if(rowId>0)
		{
			if(i!=0)
				keyIdsStr+=",";
			keyIdsStr+=jqGridSelector.getRowData(rowId).primarykey;
			i++;
		}
	}
	return keyIdsStr;
}

function jqGrid_GetCols(jqGridSelector,colkey)
{
	var selRowIds=jqGridSelector.getGridParam('selarrrow'); //to get selected rows
//	if(selRowIds.length<1)
//	{
//		showmsg("Plz Select Rows To Delete","","notice");
//		return false;
//	}
	var keyIdsStr="";
	var i=0;
	for(var rowIdx=0;rowIdx<selRowIds.length;rowIdx++)
	{
		var rowId=selRowIds[rowIdx];
		if(rowId>0)
		{
			if(i!=0)
				keyIdsStr+=",";
			keyIdsStr+=jqGridSelector.getRowData(rowId)[colkey];
			i++;
		}
	}
	return keyIdsStr;
}

function jqGrid_OnSelectRowOperation(jqGridSelector,rowid)
{
	/*if(jqGrid_checkEditableRowExist(jqGridSelector,rowid))
	{
		jqGridSelector.setSelection(rowid,false);
	}*/
	var selRowIds=jqGridSelector.getGridParam('selarrrow');
	if(selRowIds.length>1)
		return false;
	if(rowid!=selRowIds[0])
		return selRowIds[0];
	else
		return rowid;
	
}

function addMultiDeleteButton(jqGridSelector,gridPagerSelector,caption,type)
{
		jqGridSelector.jqGrid('navButtonAdd',gridPagerSelector,
		{
			caption:caption, buttonicon :'ui-icon-trash',onClickButton:function(id)
			 {	
				if(jqGrid_checkEditableRowExist(jqGridSelector))
					return false;
				var selRowIds=jqGridSelector.getGridParam('selarrrow');
				if(selRowIds.length<1)
				{
					showmsg("Plz Select Rows To Delete","","notice");
					return false;
				}
				var res=cmm_okCancelConfirmation("Are you sure! you want to delete "+selRowIds.length+" Items...?");
				if(!res)
					return;
				var primaryKeys=jqGrid_GetPrimaryKeys(jqGridSelector);
				if(primaryKeys!=false && primaryKeys.trim().length>0)
				{
					var serviceOptions=
					{
							type:type,
							primaryIds:primaryKeys,
							failureCallBack:function()
							{
							},
							successCallBack:function()
							{
								jqGridSelector.setGridParam({page:1}).trigger('reloadGrid');
							}
					};
					func_delete(serviceOptions);
				}
			 },
			 title:"Delete_Multiple_Rows",
			 position:"last"
		});
}


function addMultiDeleteButtonNew(jqGridSelector,type)
{
	if(jqGrid_checkEditableRowExist(jqGridSelector))
		return false;
	var selRowIds=jqGridSelector.getGridParam('selarrrow');
	if(selRowIds.length<1)
	{
		showmsg("Plz Select Rows To Delete","","notice");
		return false;
	}
	var res=cmm_okCancelConfirmation("Are you sure! you want to delete "+selRowIds.length+" Items...?");
	if(!res)
		return;
	var primaryKeys=jqGrid_GetPrimaryKeys(jqGridSelector);
	if(primaryKeys!=false && primaryKeys.trim().length>0)
	{
		var serviceOptions=
		{
				type:type,
				primaryIds:primaryKeys,
				failureCallBack:function()
				{
				},
				successCallBack:function()
				{
					jqGridSelector.setGridParam({page:1}).trigger('reloadGrid');
				}
		};
		func_delete(serviceOptions);
	}
}


function jq_GridUncheckAllChkBx(jqGridSelector)
{
	
}

function jq_GridOnInlineDeleteOperation(jqGridSelector,rowId)
{
	var selRowIds=jqGridSelector.getGridParam('selarrrow');
	if(selRowIds.length>0)
	{
		if(selRowIds.length==1 && selRowIds[0]==rowId)
			return true;
		showmsg("One Or More Rows are Selected Plz Uncheck And Try To Delete Or Go For Multiple Delete...","","notice");
		return false;
	}
	return true
}

function checkJqGridUrlForLocal(URL)
{
	return URL != null && URL.length > 0 ? 'json' : 'local'
}

function getNewRowId(jqGridTabGridSel)
{
		var newRowIdNo=jqGridTabGridSel.data("newRowIdNo");
		var newRowId;
		if(newRowIdNo==undefined)
		{
			newRowId="newRow_"+1;
			jqGridTabGridSel.data("newRowIdNo",2)
		}
		else
		{
			newRowId="newRow_"+newRowIdNo;
			newRowIdNo++;
			jqGridTabGridSel.data("newRowIdNo",newRowIdNo);
		}
		return newRowId;
}

function jqGrid_monthFrmtr(month)
{
	switch(month)
	{
		case 1: return "Jan"; 
			break;
		case 2: return "Feb"; 
			break;
		case 3: return "March"; 
			break;
		case 4: return "April"; 
			break;
		case 5: return "May"; 
			break;
		case 6: return "June"; 
			break;
		case 7: return "July"; 
			break;
		case 8: return "Aug"; 
			break;
		case 9: return "Sep"; 
			break;
		case 10: return "Oct"; 
			break;
		case 11: return "Nov"; 
			break;
		case 12: return "December"; 
			break;
		default: return "";
	}
}

function getPostDataObjForDownload(jqGridSelector)
{
	var postData = jqGridSelector.jqGrid('getGridParam', 'postData');
	delete postData.offset;
	delete postData.limit;
	delete postData.page;
	return postData;
}

function getURLForDownload(jqGridSelector)
{
	var url = jqGridSelector.jqGrid('getGridParam', 'url');
	return url;
}

function getJqGridRoot(jqGridSelector)
{
	return jqGridSelector.jqGrid('getGridParam', 'jsonReader').root;
}


//client download funtion

function  getDownLoadContents(gridSel,dataObj)
{
	var colModelArry= gridSel.jqGrid('getGridParam','colModel');
	var colNameArry= gridSel.jqGrid('getGridParam','colNames');
	var tableHeader="";
	var tableContnt="";
	var gid=gridSel.attr("id");
	if(dataObj!=undefined)
	{
		for(var j=0;j<dataObj.length;j++)
		{
			var currntDataObj=dataObj[j];
				for(var m=0;m<colModelArry.length;m++)
				{
					var currntcolMdlAry=colModelArry[m];
					var currntcolNameAry=colNameArry[m];
					if(j==0 && currntcolMdlAry.hidden==false )
						tableHeader+=currntcolNameAry+"\t";
					if(currntcolMdlAry.hidden==false)
					{
						var contntNme="";
						if(currntcolMdlAry.formatter!=undefined)
						{
							if(jQuery.type(currntcolMdlAry.formatter ) === "function")
							{
								tableContnt+=currntcolMdlAry.formatter("",{gid:gid},currntDataObj);
								tableContnt+="\t";
							}
						}
						else
						{
							if(currntcolMdlAry.jsonmap!=undefined)
								contntNme=currntcolMdlAry.jsonmap;
							else
								contntNme=currntcolMdlAry.name;
						    tableContnt+=currntDataObj[contntNme]+"\t ";
						}
					}
					
				}
				tableContnt+="\n";
			
		}
	}
	var reportCntn=tableHeader+"\n"+tableContnt;
	var clntdwnld={content:reportCntn};
	gridSel.clientdownload(clntdwnld);
}
