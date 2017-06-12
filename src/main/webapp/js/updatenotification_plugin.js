
jQuery.fn.updatenotification=function(options)
{
	options=jQuery.extend({globView:true},options)
	return this.each(function() 
	{
		var divUniqueId=jQuery.updatenotification.getdivDataHolderUniqId("idUpdateNotification_PlgnWrapper_");
		var gridViewId=options.gridId.closest('.ui-jqgrid-view').attr('id');
		var elmSelector=$('#'+gridViewId);
		$('.clsUpdateNotification_PlgnWrapper',elmSelector).remove("");
		elmSelector.prepend(jQuery.updatenotification.getHtmlComponent(divUniqueId));
		var wrapperJq_sel=$('#'+divUniqueId);
		jQuery.updatenotification.setPositionForNotifier(wrapperJq_sel,elmSelector);
		
		var reloadBtnSel=$('.clsUpdateNotification_PlgnReloadYsBtn',wrapperJq_sel);
		reloadBtnSel.unbind('click')
		reloadBtnSel.click(function()
		{
			options.gridId.trigger('reloadGrid');
			options.gridId.data("ExternalEvent","true");
			wrapperJq_sel.html("");
		});
		
		reloadBtnSel.hover
		(
			function()
			{
				reloadBtnSel.css({opacity:'1'});
			},
			function()
			{
				reloadBtnSel.css({opacity:'0.7'});
			}
		);
		
		var cancelBtnSel=$('.clsUpdateNotification_PlgnReloadNoBtn',wrapperJq_sel);
		cancelBtnSel.unbind('click')
		cancelBtnSel.click(function()
		{
			wrapperJq_sel.html("");
		});
		
		cancelBtnSel.hover
		(
			function()
			{
				cancelBtnSel.css({opacity:'1'});
			},
			function()
			{
				cancelBtnSel.css({opacity:'0.7'});
			}
		);
		
		var bodySel=$('.clsUpdateNotification_PlgnBody',wrapperJq_sel);
		bodySel.hover
		(
			function()
			{
				bodySel.css({opacity:'0.96'});
			},
			function()
			{
				bodySel.css({opacity:'0.86'});
			}
		);
	});
}

jQuery.updatenotification=
{
		  Nextid :0,
		  getdivDataHolderUniqId:function(idPrefix)
		  {
			  jQuery.updatenotification.Nextid=jQuery.updatenotification.Nextid+1;
			  return idPrefix+jQuery.updatenotification.Nextid;
		  }, 
		  
		  getHtmlComponent:function(divUniqueId)
		  {
			 var htmlComponent='';
		  	 htmlComponent+='<div class="clsUpdateNotification_PlgnWrapper" id="'+divUniqueId+'">';
		  			htmlComponent+='<div class="clsUpdateNotification_PlgnBody">';
		  				htmlComponent+='<div class="clsUpdateNotification_PlgnText">Data Updated...</div>';
		  				htmlComponent+='<div class="clsUpdateNotification_PlgnReloadOptionContent">';
			  				htmlComponent+='<div class="clsUpdateNotification_PlgnReloadOptionText">Reload Grid</div>';
			  				htmlComponent+='<div class="clsUpdateNotification_PlgnReloadOptionBtn">';
			  					htmlComponent+='<div class="clsUpdateNotification_PlgnReloadYsBtn" title="Reload"></div>';
			  					htmlComponent+='<div class="clsUpdateNotification_PlgnReloadNoBtn" title="Close"></div>';
			  				htmlComponent+='</div>';
		  				htmlComponent+='</div>';
					htmlComponent+='</div>';
				htmlComponent+='</div>';
			return htmlComponent;
		  },
		  
		  setPositionForNotifier:function(wrapperJq_sel,elmSelector)
		  {
			  var leftPos=elmSelector.width()-120;
			  var topPos=-10;
			  $('.clsUpdateNotification_PlgnBody',wrapperJq_sel).css({left:leftPos+"px",top:topPos+"px"});
//			  $('.clsUpdateNotification_PlgnReloadOptionContent',wrapperJq_sel).blink(600);
//			  $('.clsUpdateNotification_PlgnText',wrapperJq_sel).blink(600);
		  }
}


function removeNotification(selector)
{
	var gridViewSel=selector.closest('.ui-jqgrid-view').attr('id');
	$('.clsUpdateNotification_PlgnWrapper',$('#'+gridViewSel)).remove("");
}





jQuery.fn.loadingplugin=function(options)
{
	options=jQuery.extend({type:'loading'},options)
//	if(options!=undefined && options.show==undefined)
//	{
		$('.clsLoading_PlgnWrapper').html("");
		var divUniqueId=jQuery.loadingplugin.getdivDataHolderUniqId("idLoading_PlgnWrapper_");
		$('body').append(jQuery.loadingplugin.getHtmlComponent(divUniqueId));
		var wrapperJq_sel=$('#'+divUniqueId);
		$.loadingplugin.setOptionsForLoading(options,wrapperJq_sel);
		if(options.timeout!=undefined)
		{
			setTimeout(function()
				{
					$('.clsLoading_PlgnWrapper').html("");
				},
				options.timeout);
			
		}
//		$('.clsLoading_PlgnWrapper').hide();
//	}
//	if(options!=undefined && options.show==true)
//	{
//		$('.clsLoading_PlgnWrapper').show();
//	}
//	if(options!=undefined && options.show==false)
//	{
//		$('.clsLoading_PlgnWrapper').hide();
//	}
	
//	return this.each(function() 
//	{
//		$('.clsLoading_PlgnWrapper',$(this)).html("");
//		var divUniqueId=jQuery.loadingplugin.getdivDataHolderUniqId("idLoading_PlgnWrapper_");
//		$('body').append(jQuery.loadingplugin.getHtmlComponent(divUniqueId));
//		var wrapperJq_sel=$('#'+divUniqueId);
//		$.loadingplugin.setOptionsForLoading(options,wrapperJq_sel);
//	});
}

jQuery.fn.removeloading=function(options)
{
//	$('.clsLoading_PlgnWrapper',$('body')).html("");
		setTimeout(function()
			{
				$('.clsLoading_PlgnWrapper').html("");
			},	2000);
//	return this.each(function() 
//	{
//		$('.clsLoading_PlgnWrapper',$('body')).html("");
////		setTimeout(function()
////				{
////					$('.clsLoading_PlgnWrapper').html("");
////				},
////				3000);
//	});
}
jQuery.loadingplugin=
{
		  Nextid :0,
		  getdivDataHolderUniqId:function(idPrefix)
		  {
			  jQuery.loadingplugin.Nextid=jQuery.loadingplugin.Nextid+1;
			  return idPrefix+jQuery.loadingplugin.Nextid;
		  }, 
		  
		  getHtmlComponent:function(divUniqueId)
		  {
			 var htmlComponent='';
		  	 htmlComponent+='<div class="clsLoading_PlgnWrapper" id="'+divUniqueId+'">';
		  			htmlComponent+='<div class="clsLoading_PlgnBody">';
		  				htmlComponent+='<div class="clsLoading_PlgnImage">.</div>';
		  				htmlComponent+='<div class="clsLoading_PlgnText"></div>';
					htmlComponent+='</div>';
				htmlComponent+='</div>';
			return htmlComponent;
		  },
		  
		  setOptionsForLoading:function(options,wrapperJq_sel)
		  {
			  var type;
			  if(options==undefined)
			  {
				  type='loading'
			  }
			  else
				  type=options.type;
			  switch(type)
			  {
				  case 'downloading':
				  case 'uploading':$.loadingplugin.setDownloadingAndUploading(options,wrapperJq_sel);
					  break;
				  case 'loading':$.loadingplugin.setLoading(options,wrapperJq_sel);
					  break;
				  case 'pageloading':$.loadingplugin.setPageLoading(options,wrapperJq_sel);
					  break;
			  }
		  },
		  
		  setDownloadingAndUploading:function(options,wrapperJq_sel)
		  {
			  $('.clsLoading_PlgnImage',wrapperJq_sel).addClass('clsLoading_PlgnDownloading');
			  var text;
			  if(options.text==undefined)
				  text="Uploading"
			   else
				  text=options.text;
					  
			  $('.clsLoading_PlgnText',wrapperJq_sel).text(text+'...')
			  
		  },
		  
		  setLoading:function(options,wrapperJq_sel)
		  {
			  $('.clsLoading_PlgnImage',wrapperJq_sel).addClass('clsLoading_PlgnLoading');
			  var text;
			  if(options.text==undefined)
				  text="Loading"
			   else
				  text=options.text;
					  
			  $('.clsLoading_PlgnText',wrapperJq_sel).text(text+'...')
		  },
		  
		  setPageLoading:function(options,wrapperJq_sel)
		  {
			  $('.clsLoading_PlgnImage',wrapperJq_sel).addClass('clsLoading_PlgnPageLoading');
			  var text;
			  if(options.text==undefined)
				  text="Loading"
			   else
				  text=options.text;
					  
			  $('.clsLoading_PlgnText',wrapperJq_sel).text(text+'...')
		  }
		  
}






















