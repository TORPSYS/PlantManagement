//=====================================REQUIRED FIELD VALIDATION=============================================
function cifval_validateRequireField(value)
{
	value=jQuery.trim(value);
	valid=true;
	if(value=="" || value.length<=0 || value==null || value==undefined)
		return false;
	else 
		return true;
}

//=====================================CHECKING DUPLICATE ENTRY FIELD VALIDATION=============================================
function cifval_validateCheckDupliate(value,valuesList,i)
{
	value=jQuery.trim(value);
	valid=true;
	
	for(var j=0;j<valuesList.length;j++)
	{
		if(valuesList[j] == value)
			return {valid:false,pos:j};
	}
	valuesList[i] = value;

	return {valid:true};
}

//=====================================CHECKING DUPLICATE ENTRY FIELD VALIDATION=============================================
function cifval_validateCheckExcludingDupliate(value,valuesList,i)
{
	value=jQuery.trim(value);
	valid=true;
	
	for(var j=0;j<valuesList.length;j++)
	{
		if(valuesList[j] == value)
			return {valid:false,pos:j};
	}
	valuesList[i] = value;

	return {valid:true};
}

//=====================================COMBOBOX FIELD VALIDATION=============================================
function cifval_validateComboField(value)
{
	value=jQuery.trim(value);
	valid=true;
	//if(value=="0" || value=="-1" || value.length<=0)
	if( value == " "|| parseInteger(value) <= 0)
		return false;
	else 
		return true;
}

//=====================================NAME VALIDATION=============================================
//It takes only characters
function cifval_validateName(value)
{
  var nameRegEx = /^[a-zA-Z'-.\s]{1,10}$/;
  valid=true;
  return nameRegEx.test(value);
}

//=====================================EMAIL VALIDATION=============================================
//Same as standard format
function cifval_validateEmail(value)
{
  var emailRegEx = /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/;
  valid=true;
  return emailRegEx.test(value);
}

//=====================================DATE VALIDATION=============================================
//expected format is dd/mm/yyyy
function cifval_validateDate(dtStr) 
{
	var dtCh= "/";
	var minYear=1900;
	var maxYear=2100;
	var daysInMonth = DaysArray(12);
	var pos1=dtStr.indexOf(dtCh);
	var pos2=dtStr.indexOf(dtCh,pos1+1);
	var strDay=dtStr.substring(0,pos1);
	var strMonth=dtStr.substring(pos1+1,pos2);
	var strYear=dtStr.substring(pos2+1);
	
	strYr=strYear
	if (strDay.charAt(0)=="0" && strDay.length>1) strDay=strDay.substring(1)
	if (strMonth.charAt(0)=="0" && strMonth.length>1) strMonth=strMonth.substring(1)
	for (var i = 1; i <= 3; i++) {
		if (strYr.charAt(0)=="0" && strYr.length>1) strYr=strYr.substring(1)
	}
	month=parseInteger(strMonth)
	day=parseInteger(strDay)
	year=parseInteger(strYr)
	
	if (pos1==-1 || pos2==-1){
		return false
	}
	if (strMonth.length<1 || month<1 || month>12){
		return false
	}
	if (strDay.length<1 || day<1 || day>31 || (month==2 && day>daysInFebruary(year)) || day > daysInMonth[month]){
		return false
	}
	if (strYear.length != 4 || year==0 || year<minYear || year>maxYear){
		return false
	}
	if (dtStr.indexOf(dtCh,pos2+1)!=-1 || isInteger(stripCharsInBag(dtStr, dtCh))==false){
		return false
	}
	
	function isInteger(s){
		var i;
	    for (i = 0; i < s.length; i++){   
	        // Check that current character is number.
	        var c = s.charAt(i);
	        if (((c < "0") || (c > "9"))) return false;
	    }
	    // All characters are numbers.
	    return true;
	}
	
	function stripCharsInBag(s, bag){
		var i;
	    var returnString = "";
	    // Search through string's characters one by one.
	    // If character is not in bag, append to returnString.
	    for (i = 0; i < s.length; i++){   
	        var c = s.charAt(i);
	        if (bag.indexOf(c) == -1) returnString += c;
	    }
	    return returnString;
	}
	
	function daysInFebruary (year){
		// February has 29 days in any year evenly divisible by four,
	    // EXCEPT for centurial years which are not also divisible by 400.
	    return (((year % 4 == 0) && ( (!(year % 100 == 0)) || (year % 400 == 0))) ? 29 : 28 );
	}
	function DaysArray(n) {
		for (var i = 1; i <= n; i++) {
			this[i] = 31
			if (i==4 || i==6 || i==9 || i==11) {this[i] = 30}
			if (i==2) {this[i] = 29}
	   } 
	   return this
	}
	valid=true;
		return true
}
//===========================================MOBILE NUMBER VALIDATION=========================
function cifval_validateMobileNumber(value)
{
  var remobNumber = new RegExp("^\\(?(\\d{3})\\)?[- ]?(\\d{3})[- ]?(\\d{4})$");
  return remobNumber.test(value);
}
//============================================EMPTY TEXTBOX==================================
function cifval_validateEmptyTxtBx(value)
{
	valid=true;
	if(value.length>0)
		return true;
	else 
		return false;
}
//============================================ONLY NUMBER======================================
function cifval_validateOnlyNumber(strString)
{
   var strValidChars = "0123456789";
   var strChar;
   var blnResult = true;

   if (strString.length == 0) return false;
   //  test strString consists of valid characters listed above
   for (i = 0; i < strString.length && blnResult == true; i++)
   {
	  strChar = strString.charAt(i);
	  if (strValidChars.indexOf(strChar) == -1)
	  {
	    blnResult = false;
	  }
   }
   valid=true;
   return blnResult;
}
//============================================ NUMBER AND SPACES ======================================
function cifval_validateEmptyOrNumber(number)
{
	var regex= /^[0-9\-_ \n\r\t]*$/;
	valid=true;
	return regex.test(number);
}
//============================================ Compare Dats ==========================================
function cifval_compareDates(sDate,eDate)
{
	//yr,mon,day
	if(sDate != undefined && eDate != undefined )
	{
		if(sDate == "" && eDate != "")
		{
			if(!cifval_validateDate(eDate))
//				return false;
			return true;
		}
		if(eDate == "" && sDate != "")
		{
//			if(!cifval_validateDate(sDate))
//				return false;
			return true;
		}
		if(eDate == "" && sDate == "")
			return true;
		var sd = sDate.split("/");
		var sDate = new Date(sd[2],sd[1],sd[0])
		var ed = eDate.split("/")
		var eDate = new Date(ed[2],ed[1],ed[0]);
		
		var sTime = sDate.getTime();
		var eTime = eDate.getTime();
		if(sTime > eTime)
			return false;
		else
			return true;
	}
	else
		return true;
}


