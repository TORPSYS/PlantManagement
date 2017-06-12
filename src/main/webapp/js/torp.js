var GLOBAL_USER_ROLE = 0;
var USERNAME = "";
var USERID = "";
var activeTabs;
var disabledTabs;
$(document).ajaxStart($.blockUI).ajaxStop($.unblockUI);
$(document).ready(function()
{
	
	$.ajax({
		   type: "POST",
		   url: "/torp/ServiceRouter/loginstatus",
		   dataType:'json',
		   async:false,
		   success: function(data)
		   {
			   if(data.loggedin == "true")
			   {
				   USERNAME = data.username;
				   USERID = data.userid;
				   GLOBAL_USER_ROLE = data.roles;
			   }
			   if(data.loggedin == "false")
					window.location = "./index.jsp";
		   },
		   error:function(obj1,obj2,obj3)
		   {
			   window.location = "./index.jsp";
		   }
	});
	if(GLOBAL_USER_ROLE == 2)
	{
		activeTabs=1;
		disabledTabs = [0];
	}
	else if(GLOBAL_USER_ROLE == 3)
	{
		activeTabs=2;
		disabledTabs = [0,1];
	}
	
	$("#tabs").tabs({
		active:activeTabs,
		disabled:disabledTabs,
	    activate: function (event, ui) {
	        var active = $('#tabs').tabs('option', 'active');
	        if($("#tabs ul>li a").eq(active).attr("href") == "#tabs-3")
	        {
	        	var loadPlugin=$("#idTorp_Dashboard").data("loadPlugin");
	        	if(loadPlugin==null)
	        	{
	        		$("#idTorp_Dashboard").userdb();
	        		$("#idTorp_Dashboard").data("loadPlugin",loadPlugin);
	        	}
	        	else
	        		$.userdb.loadDashboardData(loadPlugin);
	        }
	        if($("#tabs ul>li a").eq(active).attr("href") == "#tabs-1")
	        {
	        	$("#idTorp_Users").users();
	        }
	        if($("#tabs ul>li a").eq(active).attr("href") == "#tabs-2")
	        {
	        	$("#idTorp_Plant").plants();
	        	$("#pctabs").tabs({
	        		active:0,
	        	    activate: function (event, ui) {
	        	        var active = $('#pctabs').tabs('option', 'active');
	        	        if($("#pctabs ul>li a").eq(active).attr("href") == "#pctabs-1")
	        	        {
	        	        	$("#idTorp_Plant").plants()
	        	        }
	        	        if($("#pctabs ul>li a").eq(active).attr("href") == "#pctabs-2")
	        	        {
	        	        	$("#idTorp_Inverter").invertermodel();
	        	        }
	        	        if($("#pctabs ul>li a").eq(active).attr("href") == "#pctabs-4")
	        	        {
	        	        	$("#idTorp_Strings").strings();
	        	        }
	        	        if($("#pctabs ul>li a").eq(active).attr("href") == "#pctabs-5")
	        	        {
	        	        	$("#idTorp_Panel").panelmodels();
	        	        }
	        	        if($("#pctabs ul>li a").eq(active).attr("href") == "#pctabs-6")
	        	        {
	        	        	$("#idTorp_PlantMeter").plantmeters();
	        	        }
	        	    }
	        	});
	        }
	        if($("#tabs ul>li a").eq(active).attr("href") == "#tabs-4")
	        {
	        	$("#idTorp_Charts").charttp();
	        }
	        if($("#tabs ul>li a").eq(active).attr("href") == "#tabs-5")
	        {
	        	$("#idTorp_Documents").plantdocs();
	        }
	        if($("#tabs ul>li a").eq(active).attr("href") == "#tabs-6")
	        {
	        	$("#idTorp_Downloads").download();
	        }
	        if($("#tabs ul>li a").eq(active).attr("href") == "#tabs-7")
	        {
	        	$("#idTorp_PlantSummary").plantsummary();
	        }
	        
	    }
	});
	
	if(GLOBAL_USER_ROLE == 2)
	{
		$("#tabs").tabs({ active: 1 });
		$("#pctabs").tabs({
    		active:0,
    	    activate: function (event, ui) {
    	        var active = $('#pctabs').tabs('option', 'active');
    	        if($("#pctabs ul>li a").eq(active).attr("href") == "#pctabs-1")
    	        {
    	        	$("#idTorp_Plant").plants()
    	        }
    	        if($("#pctabs ul>li a").eq(active).attr("href") == "#pctabs-2")
    	        {
    	        	$("#idTorp_Inverter").invertermodel();
    	        }
    	        if($("#pctabs ul>li a").eq(active).attr("href") == "#pctabs-4")
    	        {
    	        	$("#idTorp_Strings").strings();
    	        }
    	        if($("#pctabs ul>li a").eq(active).attr("href") == "#pctabs-5")
    	        {
    	        	$("#idTorp_Panel").panelmodels();
    	        }
    	        if($("#pctabs ul>li a").eq(active).attr("href") == "#pctabs-6")
    	        {
    	        	$("#idTorp_PlantMeter").plantmeters();
    	        }
    	    }
    	});
		$("#idTorp_Plant").plants();
		$("#idTorp_Dashboard").userdb({filter:true});
	}
	else if(GLOBAL_USER_ROLE == 3)
	{
		$("#tabs").tabs({ active: 2 });
		$("#idTorp_Dashboard").userdb({filter:true});
	}
	else
	{
		$("#tabs").tabs({ active: 0 });
		$("#idTorp_Users").users();
		$("#idTorp_Dashboard").userdb({filter:true});
	}
		
	/*
	$("#idTorp_Users").users();
	$("#idTorp_Plant").plants()
	$("#idTorp_Strings").strings();
	$("#idTorp_Inverter").invertermodel();
	$("#idTorp_PlantMeter").plantmeters();
	$("#idTorp_Charts").charttp();
	$("#idTorp_Downloads").download();
	$("#idTorp_Dashboard").userdb();
//	$("#idTorp_DailyCharts").dailychart();
	$("#idTorp_Panel").panelmodels();
	$("#pctabs").tabs({});
	*/
	$("#idTorp_UserName").html("WELCOME "+USERNAME);
	$(document).data("userid",USERID);
	$(document).data("userrole",GLOBAL_USER_ROLE);
	
//	$("#tabs-5").uploadedsyllabus();
//	$("#tabs-2").courses();

	// close icon: removing the tab on click
	$("#tabs").delegate( "span.ui-icon-close", "click", function() {
      var panelId = $( this ).closest( "li" ).remove().attr( "aria-controls" );
      $( "#" + panelId ).remove();
      $("#tabs").tabs( "refresh" );
    });
	
	var logOutBtnSel = $(".clsTorp_LogoutBtn");
	logOutBtnSel.unbind('click');
	logOutBtnSel.click(function()
	{
		$.ajax({
			   type: "POST",
			   url: "/torp/ServiceRouter/logout",
			   dataType:'json',
			   success: function(data)
			   {
					if(data.status == "ok")
					{			
						window.location = "./index.jsp";
		        	}
			   },
			   error:function(obj1,obj2,obj3)
			   {
				   window.location = "./index.jsp";
			   }
		 });
		
	});
	
	var chPwdBtnSel = $(".clsTorp_ChPwdBtn");
	chPwdBtnSel.unbind('click');
	chPwdBtnSel.click(function()
	{
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
		    		updatePwd($(".clsTorp_pwd1",this).val());
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
	});
	
	var chAccBtnSel = $(".clsTorp_ChAccBtn");
	chAccBtnSel.unbind('click');
	chAccBtnSel.click(function()
	{
		$(this).setaccount();
	});
	
	if(GLOBAL_USER_ROLE == 2 || GLOBAL_USER_ROLE == 1)
		chAccBtnSel.show();
	else
		chAccBtnSel.hide();
		
	
	jqgrid_autoresizeonresizewindow();	
});

//document.addEventListener("DOMContentLoaded", function(event) {
//	gg1 = new JustGage({
//        id: "idUserDBPg_YearPwr",
//        formatNumber: true,
//        value:150,
//        min: 1,
//        max: 1000000,
//        counter: true
//    });
//	gg2 = new JustGage({
//        id: "idUserDBPg_MonthPwr",
//        formatNumber: true,
//        value: 150,
//        min: 1,
//        max: 1000000,
//        counter: true
//    });
//	gg3 = new JustGage({
//        id: "idUserDBPg_CurrentPwr",
//        formatNumber: true,
//        value: 150,
//        min: 1,
//        max: 1000000,
//        counter: true
//    });
//	gg4 = new JustGage({
//        id: "idUserDBPg_AllTimePwr",
//        formatNumber: true,
//        value:150,
//        min: 1,
//        max: 1000000,
//        counter: true
//    });
//});

gaugeOptions = {

        chart: {
            type: 'solidgauge'
        },
        title: {
            text: '<b style="font-size:18px;color:white;">Plant Power(KW)</b>'
        },
        pane: {
            center: ['50%', '85%'],
            size: '140%',
            startAngle: -90,
            endAngle: 90,
            dataLabels: {
                format: '<div style="text-align:center"><span style="font-size:20px;color:' +
                    ((Highcharts.theme && Highcharts.theme.contrastTextColor) || 'white') + '">{y:.1f}</span><br/>'
            },
            background: {
                backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || '#EEE',
                innerRadius: '60%',
                outerRadius: '100%',
                shape: 'arc'
            }
        },
        credits: {
            enabled: false
        },

        tooltip: {
            enabled: false
        },

        // the value axis
        yAxis: {
            stops: [
                [0.1, '#55BF3B'], // green
                [0.5, '#DDDF0D'], // yellow
                [0.9, '#DF5353'] // red
            ],
            lineWidth: 0,
            minorTickInterval: null,
            tickPixelInterval: 400,
            tickWidth: 0,
            title: {
                y: -70
            },
            labels: {
                y: 16
            },
            tickAmount: 2
        },

        plotOptions: {
            solidgauge: {
                dataLabels: {
                    y: 5,
                    borderWidth: 0,
                    useHTML: true
                }
            }
        }
    };


function updatePwd(pwd1)
{
	$.ajax({
		   type: "POST",
		   url: "/torp/ServiceRouter/updatepassword",
		   data:{pwd1:pwd1},
		   dataType:'json',
		   success: function(data)
		   {
				if(data.status == "ok")
					window.location = "./torp.jsp";
				else
					window.location = "./index.jsp?success=f";
		   },
		   error:function(obj1,obj2,obj3)
		   {
			   alert("Error");
			   window.location = "./indexadm.jsp";
		   }
	 });
}

	
	
