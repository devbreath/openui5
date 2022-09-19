/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/unified/calendar/CalendarUtils','sap/ui/core/format/TimezoneUtil','sap/ui/core/Core','sap/ui/core/date/UniversalDate','sap/ui/unified/CalendarLegendRenderer','sap/ui/unified/library',"sap/base/Log"],function(C,T,a,U,b,l,L){"use strict";var c=l.CalendarDayType;var d={apiVersion:2};d.render=function(r,t){var D=t._getStartDate();var s=t.getTooltip_AsString();var i=t.getId();var A={value:i+"-Descr",append:true};r.openStart("div",t);r.class("sapUiCalTimesRow");r.class("sapUiCalRow");if(s){r.attr("title",s);}if(t._getShowHeader()){A.value=A.value+" "+i+"-Head";}r.accessibilityState(t,{role:"grid",readonly:"true",multiselectable:!t.getSingleSelection()||t.getIntervalSelection(),labelledby:A});r.openEnd();r.openStart("span",i+"-Descr");r.style("display","none");r.openEnd();r.text(t._rb.getText("CALENDAR_DIALOG"));r.close("span");if(t.getIntervalSelection()){r.openStart("span",i+"-Start");r.style("display","none");r.openEnd();r.text(t._rb.getText("CALENDAR_START_TIME"));r.close("span");r.openStart("span",i+"-End");r.style("display","none");r.openEnd();r.text(t._rb.getText("CALENDAR_END_TIME"));r.close("span");}this.renderRow(r,t,D);r.close("div");};d.renderRow=function(r,t,D){var i=t.getId();this.renderHeader(r,t,D);r.openStart("div",i+"-times");r.class("sapUiCalItems");r.attr("role","row");r.openEnd();this.renderTimes(r,t,D);r.close("div");};d.renderHeader=function(r,t,D){if(t._getShowHeader()){var o=t._getLocaleData();var i=t.getId();r.openStart("div",i+"-Head");r.openEnd();this.renderHeaderLine(r,t,o,D);r.close("div");}};d.renderHeaderLine=function(r,t,o,D){var f=t._getFormatDate();var I=t.getId();var e=t.getItems();var g=t._getIntervalStart(D);var m=t.getIntervalMinutes();var w="";var s=0;var h=[];var i=0;for(i=0;i<e;i++){s=f.format(g,true);if(h.length>0&&h[h.length-1].sDay==s){h[h.length-1].iItems++;}else{h.push({sDay:s,iItems:1});}g.setUTCMinutes(g.getUTCMinutes()+m);}for(i=0;i<h.length;i++){var j=h[i];w=(100/e*j.iItems)+"%";r.openStart("div",I+"-Head"+i);r.class("sapUiCalHeadText");r.style("width",w);r.openEnd();r.text(j.sDay);r.close("div");}};d._convertToTimezone=function(D){var t=a.getConfiguration().getTimezone();var n=C._createUniversalUTCDate(D,undefined,true);n=new Date(D.getUTCFullYear(),D.getUTCMonth(),D.getUTCDate(),D.getUTCHours(),D.getUTCMinutes(),D.getUTCSeconds());n.setUTCFullYear(D.getUTCFullYear());n=T.convertToTimezone(n,t);return n;};d.renderTimes=function(r,t,D){var h=this.getHelper(t,D);var I=t.getItems();var w=(100/I)+"%";var o=t._getIntervalStart(D);var O="";var A="";for(var i=0;i<I;i++){if(h.oFormatTimeAmPm){A=h.oFormatTimeAmPm.format(o,true);if(O==A){A="";}else{O=A;}}this.renderTime(r,t,o,h,w,A);o.setUTCMinutes(o.getUTCMinutes()+h.iMinutes);}};d.getHelper=function(t,D){var h={};h.sLocale=t._getLocale();h.oLocaleData=t._getLocaleData();h.oNow=C._createUniversalUTCDate(new Date(),undefined,true);h.sCurrentTime=t._rb.getText("CALENDAR_CURRENT_TIME");h.sId=t.getId();h.oFormatLong=t._getFormatLong();h.oFormatTime=t._getFormatTime();h.oFormatTimeAmPm=t._oFormatTimeAmPm;h.iMinutes=t.getIntervalMinutes();var s=t.getLegend();if(s){var o=sap.ui.getCore().byId(s);if(o){if(!(o instanceof sap.ui.unified.CalendarLegend)){throw new Error(o+" is not an sap.ui.unified.CalendarLegend. "+t);}h.oLegend=o;}else{L.warning("CalendarLegend "+s+" does not exist!",t);}}h.oNow=this._convertToTimezone(new Date());return h;};d.renderTime=function(r,t,D,h,w,A){var R=t._getAriaRole();var m={role:R,selected:R!=="gridcell"?null:false,label:"",describedby:""};var y=t._oFormatYyyyMMddHHmm.format(D.getJSDate(),true);var s=t._checkDateSelected(D);var o=t._getDateType(D);var e=t._checkTimeEnabled(D);r.openStart("div",h.sId+"-"+y);r.class("sapUiCalItem");if(w){r.style("width",w);}var n=new U(D.getTime());n.setUTCMinutes(n.getUTCMinutes()+h.iMinutes);if(D.getTime()<=h.oNow.getTime()&&n.getTime()>h.oNow.getTime()){r.class("sapUiCalItemNow");m["label"]=h.sCurrentTime+" ";}if(s>0){r.class("sapUiCalItemSel");if(R==="gridcell"){m["selected"]=true;}}if(s==2){r.class("sapUiCalItemSelStart");m["describedby"]=m["describedby"]+" "+h.sId+"-Start";}else if(s==3){r.class("sapUiCalItemSelEnd");m["describedby"]=m["describedby"]+" "+h.sId+"-End";}else if(s==4){r.class("sapUiCalItemSelBetween");}else if(s==5){r.class("sapUiCalItemSelStart");r.class("sapUiCalItemSelEnd");m["describedby"]=m["describedby"]+" "+h.sId+"-Start";m["describedby"]=m["describedby"]+" "+h.sId+"-End";}if(o&&o.type!=c.None){r.class("sapUiCalItem"+o.type);if(o.tooltip){r.attr('title',o.tooltip);}}if(!e){r.class("sapUiCalItemDsbl");m["disabled"]=true;}r.attr("tabindex","-1");r.attr("data-sap-time",y);m["label"]=m["label"]+h.oFormatLong.format(D,true);if(o&&o.type!=c.None){b.addCalendarTypeAccInfo(m,o.type,h.oLegend);}r.accessibilityState(null,m);r.openEnd();if(o&&o.type!=c.None){r.openStart("div");r.class("sapUiCalSpecialDate");if(o.color){r.style("background-color",o.color);}r.openEnd();r.close("div");}r.openStart("span");r.class("sapUiCalItemText");r.openEnd();r.text(h.oFormatTime.format(D,true));if(A){r.openStart("span");r.class("sapUiCalItemTextAmPm");r.openEnd();r.text(A);r.close("span");}r.close("span");r.close("div");};return d;},true);
