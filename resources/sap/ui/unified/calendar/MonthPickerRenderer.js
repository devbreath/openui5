/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/calendar/CalendarDate",'sap/ui/core/format/DateFormat','sap/ui/core/InvisibleText'],function(C,D,I){"use strict";var M={apiVersion:2};M.render=function(r,m){var a=(m.getProperty("_firstMonth")!==undefined)?m.getProperty("_firstMonth"):m.getMonth(),b=m.getMonths(),s=0,c=m.getColumns(),t=m.getTooltip_AsString(),l=m._getLocaleData(),d=m.getId(),w="",e=[],f=[],g=m.getPrimaryCalendarType(),S=m._getSecondaryCalendarType(),p=D.getDateInstance({format:"y",calendarType:m.getPrimaryCalendarType()}),y=m._iYear?m._iYear:new Date().getFullYear(),P=p.format(new Date(Date.UTC(y,0,1)),true),i,A,h;if(m._bLongMonth||!m._bNamesLengthChecked){e=l.getMonthsStandAlone("wide",g);}else{e=l.getMonthsStandAlone("abbreviated",g);f=l.getMonthsStandAlone("wide",g);}r.openStart("div",m);r.class("sapUiCalMonthPicker");if(S){r.class("sapUiCalMonthSecType");}if(t){r.attr("tooltip",t);}r.accessibilityState(m,{role:"grid",readonly:"true",multiselectable:m.getIntervalSelection(),roledescription:sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified").getText("MONTH_PICKER"),describedby:m._bCalendar?I.getStaticId("sap.ui.unified","CALENDAR_YEAR_PICKER_OPEN_HINT"):""});r.openEnd();var j;if(b>12){b=12;}else if(b<12){s=a;}if(c>0){w=(100/c)+"%";}else{w=(100/b)+"%";}for(i=0;i<b;i++){var k=i+s,o=C.fromLocalJSDate(new Date(),m.getPrimaryCalendarType());o.setMonth(k,1);m._iYear&&o.setYear(m._iYear);j={role:"gridcell"};if(!m._bLongMonth&&m._bNamesLengthChecked){j["label"]=f[k];}if(c>0&&i%c===0){r.openStart("div");r.accessibilityState(null,{role:"row"});r.openEnd();}r.openStart("div",d+"-m"+(k));r.class("sapUiCalItem");A=m._fnShouldApplySelection(o);h=m._fnShouldApplySelectionBetween(o);if(A){r.class("sapUiCalItemSel");j["selected"]=true;}if(h){r.class("sapUiCalItemSelBetween");j["selected"]=true;}if(!A&&!h){j["selected"]=false;}if(k<m._iMinMonth||k>m._iMaxMonth){r.class("sapUiCalItemDsbl");j["disabled"]=true;}j["label"]=e[k]+" "+P;if(S){var n=m.getSecondaryCalendarType(),q=l.getMonthsStandAlone("abbreviated",n),u=D.getDateInstance({format:"y",calendarType:n}),v=m._getDisplayedSecondaryDates(k),x,z,B;if(v.start.getMonth()===v.end.getMonth()){x=q[v.start.getMonth()];z=u.format(v.start.toUTCJSDate(),true);}else{B=l.getIntervalPattern();x=B.replace(/\{0\}/,q[v.start.getMonth()]).replace(/\{1\}/,q[v.end.getMonth()]);z=B.replace(/\{0\}/,u.format(v.start.toUTCJSDate(),true)).replace(/\{1\}/,u.format(v.end.toUTCJSDate(),true));}j["label"]=j["label"]+" "+x+" "+z;}r.attr("tabindex","-1");r.style("width",w);r.accessibilityState(null,j);r.openEnd();r.text(e[k]);if(S){r.openStart("div",d+"-m"+k+"-secondary");r.class("sapUiCalItemSecText");r.openEnd();r.text(x);r.close("div");}r.close("div");if(c>0&&((i+1)%c===0)){r.close("div");}}r.close("div");};return M;},true);
