<!DOCTYPE html>
<html>

<head>
  <meta charset="UTF-8">
  <title>Torp - Systems</title>
  <link rel="stylesheet" type="text/css" href="css/jquery-ui.min.css">
  <link rel="stylesheet" type="text/css" href="css/ui.jqgrid.4.6.0.css">
  <link rel="stylesheet" type="text/css" href="css/psm-common.css">
  <link rel="stylesheet" type="text/css" href="css/flexselect.css">
  <link rel="stylesheet" type="text/css" href="css/chosen.css">
  <link rel="stylesheet" type="text/css" href="css/plugins/ui.daterangepicker.css"></link>
 <!--  <link rel="stylesheet" type="text/css" href="css/course/courses_plugin.css"></link> -->
 <link rel="stylesheet" type="text/css" href="css/torp-theme.css">
 <link rel="stylesheet" type="text/css" href="css/plugins/nvd3/nv.d3.css">
 <link rel="stylesheet" type="text/css" href="css/odometer/themes/odometer-theme-digital.css">
 <link rel="stylesheet" type="text/css" href="css/userdashboard_plugin.css">
 <style>
        text {
            font: 12px sans-serif;
        }
        svg {
            display: block;
        }
        html, body, #chart1, svg {
            margin: 0px;
            padding: 0px;
            height: 100%;
            width: 100%;
        }

        .dashed {
            stroke-dasharray: 5,5;
        }
    </style>
</head>
<body>
	<div class="header">
		<div style="float:left;width:35%;">
			<span>TORP Systems</span>
		</div>
		<div style="float:left;width:25%;">
			<span id="idTorp_UserName"></span>
		</div>
		<div style="float:left;width:40%;">
			<a type="button" class="clsTorp_LogoutBtn">LOGOUT</a>
			<a type="button" class="clsTorp_ChPwdBtn">CHANGE PASSWORD</a>
			<a type="button" class="clsTorp_ChAccBtn">CHANGE ACCOUNT</a>
		</div>
	</div>
	<div id="tabs">
	    <ul>
	        <li class="clsTorp_UserMgmt clsTab"><a href="#tabs-1">User Management</a></li>
	        <li class="clsTorp_PlantMgmt clsTab"><a href="#tabs-2">Plant Management</a></li>
	        <li class="clsTorp_Dashboard clsTab"><a href="#tabs-3">Dashboard</a></li>
	        <li class="clsTorp_Charts clsTab"><a href="#tabs-4">Charts</a></li>
	        <li class="clsTorp_Documents clsTab"><a href="#tabs-5">Documents</a></li>	
	        <li class="clsTorp_Downloads clsTab"><a href="#tabs-6">Downloads</a></li>	  
	        <li class="clsTorp_PlantSummary clsTab"><a href="#tabs-7">Plant Summary</a></li>	            
	    </ul>
	    <div id="tabs-1" class="clsTab_Background">
	        <div id="idTorp_Users"></div>
	    </div>
	    <div id="tabs-2" class="clsTab_Background">
	      <div id="pctabs">
			    <ul>
			        <li class="clsTorp_Plant clsPCTab"><a href="#pctabs-1">Plants</a></li>
			        <li class="clsTorp_Inverters clsPCTab"><a href="#pctabs-2">Inverters</a></li>
			        <li class="clsTorp_Strings clsPCTab"><a href="#pctabs-4">Strings</a></li>
			        <li class="clsTorp_Panels clsPCTab"><a href="#pctabs-5">Panels</a></li>
			        <li class="clsTorp_PlantMeters clsPCTab"><a href="#pctabs-6">Plant Meters</a></li>
			    </ul>
			    <div id="pctabs-1" class="clsTab_Background">
			      <div id="idTorp_Plant">
			      </div>
			    </div>
			    <div id="pctabs-2" class="clsTab_Background">
			      <div id="idTorp_Inverter">
			      </div>
			    </div>
			    <div id="pctabs-4" class="clsTab_Background">
			      <div id="idTorp_Strings">
			      </div>
			    </div>
			    <div id="pctabs-5" class="clsTab_Background">
			      <div id="idTorp_Panel">
			      </div>
			    </div>
			    <div id="pctabs-6" class="clsTab_Background">
			      <div id="idTorp_PlantMeter">
			      </div>
			    </div>
			</div>
	    </div>
	    <div id="tabs-3" class="clsTab_Background">
	        <div id="idTorp_Dashboard">
			      </div>
	    </div>
	    <div id="tabs-4" class="clsTab_Background">
	        <div id="idTorp_Charts">
			      </div>
	    </div>
	    <div id="tabs-5" class="clsTab_Background">
	        <div id="idTorp_Documents">
			      	<!-- <select name="pmdoctype">
                                        <option value="1">Electrical SLD</option>
                                        <option value="2">Plant Layout</option>
                                        <option value="3">As-Build Drawings</option>
                                        <option value="4">Statutory Clearances</option>
                                        <option value="5">Warranty Certificates</option>
                                        <option value="6">Commissioning Documents</option>
                                        <option value="7">Maintenance Records</option>
                                        <option value="8">Others</option>
			      	</select> -->
            </div>
	    </div>
	    <div id="tabs-6" class="clsTab_Background">
	        <div id="idTorp_Downloads"></div>
	    </div>
	     <div id="tabs-7" class="clsTab_Background">
	        <div id="idTorp_PlantSummary"></div>
	    </div>
	    
	</div>
	<jsp:include page="externaljsfiles.jsp"></jsp:include>
	<jsp:include page="jsfiles.jsp"></jsp:include>
	<script type="text/javascript" src="js/torp.js"></script>
	<jsp:include page="cssfiles.jsp"></jsp:include>
</body>
</html>