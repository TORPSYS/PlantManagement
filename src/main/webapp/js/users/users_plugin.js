$.fn.users=function()
{
	return this.each(function(){
		var wrapperUnqId=$.users.getDataHolderUniqId("idUsersPg_");	
		$(".clsUsersPg_divWrapper",this).remove("");
		$(this).append($.users.getHtmlContent(wrapperUnqId));
		var wrapperJqSel=$("#"+wrapperUnqId);
		$.users.loadUsersGrid(wrapperUnqId);
		$(".clsUsersPg_FilterHldr",wrapperJqSel).html(jQuery.users.getfilterhtml(wrapperUnqId));
		jQuery.users.loadandbindfilterHandlr(wrapperUnqId,wrapperJqSel);
	 });
}
$.users={
	nxtId:0,
	getDataHolderUniqId:function(prefix)
	{
		return prefix+$.users.nxtId++;
    },
    getHtmlContent:function(wrapperUnqId)
    {
    	var htmlContent='';
    	htmlContent+='<div class="clsUsersPg_divWrapper" id="'+wrapperUnqId+'" >';       			
       			htmlContent+='<div class="clsUsersPg_FilterHldr" style="margin-bottom:15px;"></div>';
//       				htmlContent+='<legend>'+cmGetSessionProp("hr.lgnd.comp")+'</legend>';
       				htmlContent+='<div class="clsUsersPg_divGridWrapper clsCmm_FirstDiv ">';
    						htmlContent+='<table id="idUsersPg_divUserGridTbl_'+wrapperUnqId+'"></table>'; 
    						htmlContent+='<div id="idUsersPg_divUserGridPager_'+wrapperUnqId+'"></div>';
    				htmlContent+='</div>';
    				htmlContent+='<div class="clsUsersPg_divUserPlantHldr"></div>';
    	htmlContent+='</div>';
    	return htmlContent;
    	
    },
    getfilterhtml:function(uniqueId)
	{
		var htmlContent="";
		htmlContent+="<fieldset>";
			htmlContent+= "<div class='filter_row'>";
				htmlContent+= "<div class='filter_divElemt' >";
					htmlContent+= "<div class='filter_divLbl' ><label>User Role:</label></div>";
					htmlContent+= "<select  class='filter_divUserRoleSel flexselect' style='width: 50%;'><option value=0>Select User Role</option><option value=1>ADMIN</option><option value=2>ENGINEER</option><option value=3>CUSTOMER</option></select>";
				htmlContent+= "</div>";
			htmlContent+= "</div>"	
			htmlContent+= "<div class='filter_row' style='text-align: center;margin-top: 1%;'>";
				htmlContent+= "<input type='button' class='filter_divSearchBttn' value='Search'/>";
				htmlContent+= "<input type='button' class='filter_divClearBttn' value='Clear'/>";
			htmlContent+= "</div>";
		htmlContent+="</fieldset>";
		return htmlContent;
	},
	loadandbindfilterHandlr:function(uniqueId, wrapperJq)
	{
		var clearBtn = $(".filter_divClearBttn",wrapperJq);
		clearBtn.unbind('click');
		clearBtn.click(function()
		{
			$(".filter_divUserRoleSel",wrapperJq).val(0);
		});
		
		var searchbtn = $(".filter_divSearchBttn",wrapperJq);
		searchbtn.unbind('click');
		searchbtn.click(function()
		{
			var tableGridSel=$("#idUsersPg_divUserGridTbl_"+uniqueId);
			var userRole=$(".filter_divUserRoleSel",wrapperJq).val();
			
			if( userRole>0)
				tableGridSel.setPostDataItem('userrole',userRole);
			else
				tableGridSel.removePostDataItem("userrole");
			
			tableGridSel.trigger('reloadGrid');
		});
	},
    loadUsersGrid:function(wrapperUnqId)
	{
    	var wrapperJqSel=$('#'+wrapperUnqId);
    	var userGridTabId="#idUsersPg_divUserGridTbl_"+wrapperUnqId;
		var userGridPagerId="#idUsersPg_divUserGridPager_"+wrapperUnqId;			
		var userGridTabIdSel=$(userGridTabId);
		var plantList = $.users.getPlants({userfilter:"y"});
		userGridTabIdSel.data("plantlist",plantList);
		userGridTabIdSel.data("wrapperUnqId",wrapperUnqId);
		var gridLoad=userGridTabIdSel.data("gridLoad");
		if(gridLoad!=null)
			return;		
		gridLoad=userGridTabIdSel.jqGrid({
	        url: "/torp/ServiceRouter/getusers",
	        datatype:'json',
	        width:jqgrid_getdefaultwidthinview(),
	        height:150,
	        jsonReader: 
	        		{
						root:'users',
						userdata:'users',
				        repeatitems: false,
				        page:   function(obj) 
					    {
						 	return(jqgrid_getCurrentPage(userGridTabId));
					    },
					    total:  function(obj) 
					    {
						    return (jqgrid_getTotalPages(userGridTabId,obj));   
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
//				  jqgrid_setPageLimitOffset(userGridTabId); 
	         },
	 		
	         colNames:['Action','','User Name','Login ID','Password','Role','Active','','Is System Admin','Allowed Plants'],
	         colModel:[
						{
							   name:'act',
							   index:'act',
							   height:200,
							   width:150,
							   sortable:false,
						},
						{
							   name:'userid',
				        	   index:'userid',
				        	   hidden:true
						},
						{
				        	   name:'username',
				        	   index:'username',
				        	   height:200,
				        	   width:200,
				        	   editable:true,
				        	   editoptions:{'class':"cifval_required"}
				         },
				         {
				        	   name:'loginid',
				        	   index:'loginid',
				        	   height:200,
				        	   width:200,
				        	   editable:true,
				        	   editoptions:{'class':"cifval_email"}
				         },
				         {
				        	   name:'pwd',
				        	   index:'pwd',
				        	   height:200,
				        	   width:200,
				        	   editable:true,
							   edittype:"password",
				        	   editoptions:{'class':"cifval_required"},
							   formatter:$.users.pwdFormatter
				         },
				         {
				        	   name:'userrole',
				        	   index:'userrole',
				        	   edittype:"select",
				        	   height:200,
				        	   width:200,
				        	   editable:true,
				        	   editoptions:{value:"1:ADMIN;2:ENGINEER;3:CUSTOMER",style:'width:100%'},
				        	   formatter:$.users.rolesFormatter
				         },
				         {
				        	   name:'isactive',
				        	   index:'isactive',
				        	   height:200,
				        	   width:200,
				        	   edittype:"select",
				        	   editable:true,
				        	   editoptions:{value:"n:Inactive;y:Active"},
				        	   formatter:$.users.isActvFormatter
				         },
				         {
				        	   name:'accountid',
				        	   index:'accountid',
				        	   hidden:true
				         },
				         {
				        	   name:'issysadmin',
				        	   index:'issysadmin',
				        	   height:200,
				        	   width:200,
				        	   edittype:"select",
				        	   editable:true,
				        	   editoptions:{value:"n:No;y:Yes"},
				        	   formatter:$.users.isSysAdmFormatter
				         },
				         {
				        	   name:'allowedplants',
				        	   index:'allowedplants',
				        	   height:200,
				        	   width:200,
				        	   editable:false,
				        	   formatter:$.users.allowedPlants
				         }],
			 viewrecords: true,
	         pager: userGridPagerId,
	         caption: "Users",
	         gridComplete:function()
	         {
					var ids=userGridTabIdSel.jqGrid('getDataIDs');
					for(var i=0;i < ids.length;i++)
					{
						var rowid = ids[i];	
						var actionsbtns="";
						actionsbtns += "<input class='deleteactionsstyle' type='button'  value='X' title='Delete' onclick=\"$.users.userDelete('"+rowid+"','"+userGridTabId+"');\" />";
						actionsbtns = actionsbtns +"<input class='editactionsstyle'  type='button' value='E' title='Edit' onclick=\"$.users.userEdit("+rowid+",'"+userGridTabId+"');\" />";
						actionsbtns = actionsbtns + "<input class='saveactionsstyle' type='button' value='S' title='Save' onclick=\"$.users.userSave("+rowid+",'"+userGridTabId+"');\" />";
						actionsbtns = actionsbtns + "<input class='saveactionsstyle' type='button'  value='C' title='Cancel' onclick=\"$.users.userCancel("+rowid+",'"+userGridTabId+"');\" />";
						actionsbtns = actionsbtns + "<input class='actionsstyle' type='button'  value='UP' title='Update Password' onclick=\"$.users.updateUserPwd("+rowid+",'"+userGridTabId+"');\" />";
						actionsbtns = actionsbtns + "<input class='actionsstyle' type='button'  value='Plants' title='Update Plants' onclick=\"$.users.updateUserPlants("+rowid+",'"+userGridTabId+"','"+wrapperUnqId+"');\" />";
						
						userGridTabIdSel.jqGrid('setRowData',ids[i],{act:actionsbtns});
						jqGrid_DefaultActionOnSave(rowid,userGridTabIdSel);
					}
							
	         }
			    
		});
		userGridTabIdSel.data("gridLoad",gridLoad);
		userGridTabIdSel.navGrid(userGridPagerId,{edit:false,add:false,del:false,search:false,refresh:false});
		userGridTabIdSel.jqGrid('navButtonAdd',userGridPagerId,{caption:"Add",buttonicon:'ui-icon-circle-plus',
			onClickButton:function()
			{ 
		 	  var newRowId=-1;
			  var newRowExist;			  
			  newRowExist=userGridTabIdSel.getInd(newRowId,true);
			  var anotherEditableRowExist = jqGrid_checkEditableRowExist(userGridTabId);			  
			  if(!anotherEditableRowExist)
			  {
				 
				  if(newRowExist==false)
			      {
				      var success=jQuery(userGridTabId).addRowData(newRowId,"last");
				      userGridTabIdSel.setSelection(newRowId,true);
				      if (success)
				      { 
				    	  userGridTabIdSel.setColProp('pwd',{editable:true});
				    	  jQuery(userGridTabId).editRow(newRowId);
				    	  jqGrid_DefaultActionOnEdit(newRowId,userGridTabIdSel);				    	  						  
				    	  var cifValOptions={onchange:true,grid:true};
				    	  $('#'+newRowId,userGridTabIdSel).cifvalidate(cifValOptions);
				      }
			      }
			  }
		      else
		      {
//		    	  showmsg("Please save the created record first!.","Status","warning");
		      }
		   },
		   position:"last",
		   title:'Add_new_row'
		});
	},
	
	userDelete:function(rowid,tabGridId)
	{
		var tabGridIdSel=$(tabGridId);			
		var res=confirm("Are you sure! you want to delete.");
		if(!res)
		  return;		
		var rowData = tabGridIdSel.getGridParam('userData')[rowid - 1];
	 	var userid=rowData.userid;	 	
		var succ=tabGridIdSel.jqGrid('delRowData',rowid); 
		if(succ)
		{
		 	  $.ajax({
				   type: "POST",
				   url: "/torp/ServiceRouter/addeditordeleteuser",
				   dataType:'json',
				   data:"mode=delete&userid="+userid,
				   success: function(data)
				   {
						if(data.status == "ok")
						{			
							alert("User deleted successfully")
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
   updateUserPwd:function(rowid,tabGridId)
   {
	   var tabGridIdSel=$(tabGridId);
	   tabGridIdSel.setSelection(rowid,true);
	   var rowData = tabGridIdSel.getGridParam('userData')[rowid - 1];
	   if(rowData == undefined)
	   {
		   alert("Please add the user before performing this action");
		   return;
	   }
	   $('<div></div>').dialog({
		    modal: true,
		    title: "Change Password",
		    open: function() {
		      var markup = '<span style="display:block;">Enter Password:<input type="password" class="clsTorp_pwd1"/></span><span style="display:block;">Re-Enter Password:<input type="password" class="clsTorp_pwd2"/></span>';
		      $(this).html(markup);
		    },
		    buttons: {
		      Ok: function() {
		    	if($(".clsTorp_pwd1",this).val().trim().length >0 && $(".clsTorp_pwd2",this).val().trim().length > 0 && $(".clsTorp_pwd1",this).val() == $(".clsTorp_pwd2",this).val())
		    	{
		    		$.users.updatePwd($(".clsTorp_pwd1",this).val(),rowData.userid,rowData.loginid,tabGridIdSel);
		    		$( this ).dialog( "close" );
		    	}
		    	else
		    		alert("Password Mismatch");
		      },
		      Cancel: function()
		      {
		    	  $(this).dialog('close');
		      }
		    }   }); 
   },
   
   updateUserPlants:function(rowid,tabGridId,wrapperUnqId)
   {
	   var wrapperJq = $("#"+wrapperUnqId);
	   var tabGridIdSel=$(tabGridId);
	   tabGridIdSel.setSelection(rowid,true);
	   var rowData = tabGridIdSel.getGridParam('userData')[rowid - 1];
	   if(rowData == undefined)
	   {
		   alert("Please add the user before performing this action");
		   return;
	   }
	   $(".clsUsersPg_divUserPlantHldr",wrapperJq).edituserplants({userid:rowData.userid,allowedplants:rowData.allowedplants,callbackfunc:function(val){if(val)tabGridIdSel.trigger("reloadGrid");}})
   },
   updatePwd:function(pwd1,userid,loginid,tabGridIdSel)
   {
	   	$.ajax({
	   		   type: "POST",
	   		   url: "/torp/ServiceRouter/addeditordeleteuser",
	   		   data:{pwd:pwd1,userid:userid,mode:"updatepwd",loginid:loginid},
	   		   dataType:'json',
	   		   success: function(data)
	   		   {
	   				if(data.status == "ok")
	   					tabGridIdSel.trigger("reloadGrid");
	   		   },
	   		   error:function(obj1,obj2,obj3)
	   		   {
	   			   alert("Error");
	   		   }
	   	 });
   },
   userEdit:function(rowid,tabGridId)
   {
	   var tabGridIdSel=$(tabGridId);
	   tabGridIdSel.setSelection(rowid,true);  
	   var anotherEditableRowExist = jqGrid_checkEditableRowExist(tabGridId);
	   if(!anotherEditableRowExist)
		{
			var rowdata=tabGridIdSel.jqGrid('getRowData',rowid) 
			jqGrid_DefaultActionOnEdit(rowid,tabGridIdSel);
			tabGridIdSel.setColProp('pwd',{editable:false});
			tabGridIdSel.editRow(rowid);						
	    	var cifValOptions={onchange:true,grid:true};
	    	$('#'+rowid,tabGridIdSel).cifvalidate(cifValOptions);
		}
   },
   userSave:function(rowid,userGridTabId)
   {
	   var userGridTabIdSel=$(userGridTabId);
	   userGridTabIdSel.setSelection(rowid,true);
	   var rowData = userGridTabIdSel.getGridParam('userData')[rowid - 1];
	   var valid = $('#'+rowid,userGridTabIdSel).cifvalidatefromexternalevent();
	   if(valid)
	   {
		   if(rowid==-1) //Add row
		   {
			   var edtUserUrl="/torp/ServiceRouter/addeditordeleteuser";
			   var saveReq = userGridTabIdSel.jqGrid('saveRow',rowid, $.users.user_add_succesfunc, edtUserUrl,{mode:"add"},$.users.user_add_aftersavefunc,$.users.user_add_errorfunc,$.users.user_add_afterrestorefunc);
			   if (saveReq)
				   userGridTabIdSel.trigger('reloadGrid');
		   }
		   else //Edit row
		   {
				var edit_Extraparams={userid:rowData.userid,mode:"update"};
				var edtUserUrl="/torp/ServiceRouter/addeditordeleteuser";
				userGridTabIdSel.jqGrid('saveRow',rowid,$.users.user_edit_succesfunc, edtUserUrl,edit_Extraparams, $.users.user_edit_aftersavefunc,$.users.user_edit_errorfunc,$.users.user_edit_afterrestorefunc);					
				jqGrid_DefaultActionOnEdit(rowid,userGridTabIdSel);
		   }
		}
   },
   userCancel:function(rowid,userGridTabId)
   {	   
	   var userGridTabIdSel=$(userGridTabId);
	   userGridTabIdSel.setSelection(rowid,true);
	   if(rowid==-1) //Cancel newly added row
	   {
	  		userGridTabIdSel.jqGrid('delRowData', rowid);
	   }
	   else //Cancel edit row
	   {
			userGridTabIdSel.restoreRow(rowid);
			jqGrid_DefaultActionOnSave(rowid,userGridTabIdSel);
	    }
	   jqgrid_clearValilatorsForRow(userGridTabId,rowid);
	   userGridTabIdSel.setSelection(1,true);
   },
  
	user_edit_succesfunc: function(xhr)
	{
		var responseText = eval('(' + xhr.responseText + ')'); 		
		if (responseText.status == 'ok') 
		{	
			alert("User details updated");
			$(this).trigger('reloadGrid');
		}
		else
		{
			alert("Failed to edit record");
		}
		return true;
	},
	user_edit_aftersavefunc: function(rowid,xhr)
	{
		
	},
	user_edit_errorfunc: function(rowid,responseText)
	{
		alert("Failed to edit");
		$(this).restoreRow(rowid);
	},
	user_edit_afterrestorefunc: function()
	{
	},
	user_add_succesfunc: function(xhr)
	{	
		var responseText = eval('(' + xhr.responseText + ')'); 
		if (responseText.status == 'ok') 
		{	
			alert("User added successfully")
			$(this).trigger('reloadGrid');
		}
		else
		{
			alert("Failed to Add Record");
		}
		return true;
	},
	
	user_add_errorfunc: function(rowid,responseText)
	{
		alert("Fail to add record");
		jQuery(this).restoreRow(rowid);
	},
	
	user_add_aftersavefunc: function(rowid,xhr)
	{		
		var responseText = eval('(' + xhr.responseText + ')'); 
		if (responseText.status == 'ok') 
		{	
			alert("User added successfully")
			$(this).trigger('reloadGrid');
		}
		else
		{
			alert("Failed to add record");
		}
	},
	
	user_add_afterrestorefunc: function()
	{
		
	},
	rolesFormatter:function(cellvalue,options,rowObject)
	{
		if(options.rowId>0)
		{
			var rowData=$("#"+options.gid).getGridParam('userData')[options.rowId - 1];
			if(rowData!=undefined)
			{
				if(rowData.userrole == 1)
					return "ADMIN";
				else if(rowData.userrole == 2)
					return "ENGINEER";
				else if(rowData.userrole == 3)
					return "CUSTOMER";
			}
		}
	},
	isActvFormatter:function( cellvalue, options, rowObject )
	{
		if(options.rowId>0)
		{
			var rowData=$("#"+options.gid).getGridParam('userData')[options.rowId - 1];
			if(rowData!=undefined)
			{
				if(rowData["isactive"] == 0)
					return "Inactive";
				else
					return "Active";
			}
		}
	},
	isSysAdmFormatter:function( cellvalue, options, rowObject )
	{
		if(options.rowId>0)
		{
			var rowData=$("#"+options.gid).getGridParam('userData')[options.rowId - 1];
			if(rowData!=undefined)
			{
				if(rowData["issysadmin"] == "y")
					return "Yes";
				else
					return "No";
			}
		}
	},
	pwdFormatter:function( cellvalue, options, rowObject )
	{
		if(options.rowId == -1)
			return "";
		return "xxxxxxxxxx";
	},
	allowedPlants:function( cellvalue, options, rowObject )
	{
		var plntList = [];
		var plantList = $("#"+options.gid).data("plantlist");
		if(options.rowId>0)
		{
			var rowData=$("#"+options.gid).getGridParam('userData')[options.rowId - 1];
			if(rowData["allowedplants"] != "null" && rowData["allowedplants"].trim().length > 0)
			 {
				 var apprStr = rowData["allowedplants"].substring(1,rowData["allowedplants"].length-1).split(",");
				 for(j in apprStr)
				 {
					 var stArr = $.grep(plantList, function(n, i) {
						  return (n.pwrplantid+"" == apprStr[j]);
					 });
					 if(stArr.length > 0)
					 {
						 plntList.push(stArr[0]["pwrplantname"]+"("+stArr[0].pwrplantcode+")");
					 }
				 }
			 }
		}
		if(plntList.length > 0)
			return plntList.toString();
		else
			return "";
	},
	getPlants:function(postParams)
	{
		 var plantList;
	  	 $.ajax(
	  	 {
	  		url:"/torp/ServiceRouter/getplants",
	  		dataType:"json",
	  		async:false,
	  		type:'post',
	  		data:postParams,
	  		success:function(data,xhr,settings)
	  		{
	  			plantList = data.plants;
	  		},
	  		error:function(xhr,status,error){},
	  		complete:function(xhr,status){}
	  	});
	  	return plantList; 
	},

}






