/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/core/date/UniversalDate","sap/ui/mdc/enum/BaseType","sap/base/util/merge"],function(e,t,r,a){"use strict";var n=e.CalendarType;var i={typeToUniversalDate:function(e,a,n){var i;if(n&&n===r.DateTime){i="yyyyMMdd-HHmmssSSS"}else{i="yyyyMMdd"}var s=this.typeToString(e,a,i);var o=parseInt(s.slice(0,4));var T=parseInt(s.slice(4,6))-1;var u=parseInt(s.slice(6,8));var g=n===r.DateTime?parseInt(s.slice(9,11)):0;var l=n===r.DateTime?parseInt(s.slice(11,13)):0;var c=n===r.DateTime?parseInt(s.slice(13,15)):0;var v=n===r.DateTime?parseInt(s.slice(15,18)):0;var p=new t(t.UTC(o,T,u,g,l,c,v));return p},universalDateToType:function(e,t,a){var n=e.getUTCFullYear();var i=e.getUTCMonth()+1;var s=e.getUTCDate();var o=n.toString()+(i<10?"0":"")+i.toString()+(s<10?"0":"")+s.toString();var T;if(a&&a===r.DateTime){T="yyyyMMdd-HHmmssSSS";var u=e.getUTCHours();var g=e.getUTCMinutes();var l=e.getUTCSeconds();var c=e.getUTCMilliseconds();o=o+"-"+(u<10?"0":"")+u.toString()+(g<10?"0":"")+g.toString()+(l<10?"0":"")+l.toString()+(c<100?"0":"")+(c<10?"0":"")+c.toString()}else{T="yyyyMMdd"}var v=this.stringToType(o,t,T);return v},createInternalType:function(e,t){var r=sap.ui.require(e.getMetadata().getName().replace(/\./g,"/"));var i=a({},e.getConstraints());var s=a({},e.getFormatOptions());if(s.style){delete s.style}s.pattern=t;s.calendarType=n.Gregorian;if(this.showTimezone(e)){s.showTimezone=false}return new r(s,i)},showTimezone:function(e){var t=e.getFormatOptions();var r=function(e,t){return!e.hasOwnProperty(t)||e[t]};return e.isA("sap.ui.model.odata.type.DateTimeWithTimezone")&&r(t,"showTimezone")&&(r(t,"showDate")||r(t,"showTime"))},typeToString:function(e,t,r){var a=this.createInternalType(t,r);var n=a.formatValue(e,"string");return n},stringToType:function(e,t,r){var a=this.createInternalType(t,r);var n=a.parseValue(e,"string");return n},localToUtc:function(e){return new Date(Date.UTC(e.getFullYear(),e.getMonth(),e.getDate(),e.getHours(),e.getMinutes(),e.getSeconds(),e.getMilliseconds()))},utcToLocal:function(e){return new Date(e.getUTCFullYear(),e.getUTCMonth(),e.getUTCDate(),e.getUTCHours(),e.getUTCMinutes(),e.getUTCSeconds(),e.getUTCMilliseconds())}};return i});
//# sourceMappingURL=DateUtil.js.map