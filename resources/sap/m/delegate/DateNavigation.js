/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/EventProvider","sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/library"],function(t,e,a){"use strict";var r=a.CalendarIntervalType;var s=t.extend("sap.m.delegate.DateNavigation",{constructor:function(){t.apply(this,arguments);this._unit=r.Day;this._start=new Date;this._step=1}});s.HOURS24=1e3*3600*24;s.prototype.setUnit=function(t){this._unit=t};s.prototype.setStart=function(t){this._start=t};s.prototype.setStep=function(t){this._step=t};s.prototype.setCurrent=function(t){this._current=t};s.prototype.getUnit=function(){return this._unit};s.prototype.getStart=function(){return this._start};s.prototype.getStep=function(){return this._step};s.prototype.getCurrent=function(){return this._current};s.prototype.getEnd=function(){var t=e._createUniversalUTCDate(this.getStart(),undefined,true);switch(this.getUnit()){case r.Day:case r.Week:t.setUTCDate(t.getUTCDate()+this.getStep()-1);break;case r.OneMonth:case"OneMonth":t.setUTCMonth(t.getUTCMonth()+1);t.setUTCDate(t.getUTCDate()-1);break;case r.Hour:t.setUTCHours(t.getUTCHours()+this.getStep()-1);break;case r.Month:t.setUTCMonth(t.getUTCMonth()+this.getStep()-1);break;default:break}return e._createLocalDate(t,true)};s.prototype.next=function(){var t=e._createUniversalUTCDate(this.getStart(),undefined,true);var a=this.getCurrent()?e._createUniversalUTCDate(this.getCurrent(),undefined,true):e._createUniversalUTCDate(this.getStart(),undefined,true);switch(this.getUnit()){case r.Hour:a.setUTCHours(a.getUTCHours()+this.getStep());this.setCurrent(e._createLocalDate(a,true));t.setUTCHours(t.getUTCHours()+this.getStep());this.setStart(e._createLocalDate(t,true));break;case r.Week:case r.Day:a.setUTCDate(a.getUTCDate()+this.getStep());this.setCurrent(e._createLocalDate(a,true));t.setUTCDate(t.getUTCDate()+this.getStep());this.setStart(e._createLocalDate(t,true));break;case r.Month:a.setUTCMonth(a.getUTCMonth()+this.getStep());this.setCurrent(e._createLocalDate(a,true));t.setUTCMonth(t.getUTCMonth()+this.getStep());this.setStart(e._createLocalDate(t,true));break;case r.OneMonth:case"OneMonth":a.setUTCMonth(a.getUTCMonth()+1,1);this.setCurrent(e._createLocalDate(a,true));t.setUTCMonth(t.getUTCMonth()+1,1);this.setStart(e._createLocalDate(t,true));break;default:break}};s.prototype.previous=function(){var t=e._createUniversalUTCDate(this.getStart(),undefined,true);var a=this.getCurrent()?e._createUniversalUTCDate(this.getCurrent(),undefined,true):e._createUniversalUTCDate(this.getStart(),undefined,true);switch(this.getUnit()){case r.Hour:a.setUTCHours(a.getUTCHours()-this.getStep());this.setCurrent(e._createLocalDate(a,true));t.setUTCHours(t.getUTCHours()-this.getStep());this.setStart(e._createLocalDate(t,true));break;case r.Week:case r.Day:a.setUTCDate(a.getUTCDate()-this.getStep());this.setCurrent(e._createLocalDate(a,true));t.setUTCDate(t.getUTCDate()-this.getStep());this.setStart(e._createLocalDate(t,true));break;case r.Month:a.setUTCMonth(a.getUTCMonth()-this.getStep());this.setCurrent(e._createLocalDate(a,true));t.setUTCMonth(t.getUTCMonth()-this.getStep());this.setStart(e._createLocalDate(t,true));break;case r.OneMonth:case"OneMonth":a.setUTCMonth(a.getUTCMonth()-1,1);this.setCurrent(e._createLocalDate(a,true));t.setUTCMonth(t.getUTCMonth()-1,1);this.setStart(e._createLocalDate(t,true));break;default:break}};s.prototype.toDate=function(t){var a,n,i,u=e._createUniversalUTCDate(t,undefined,true),h=e._createUTCDate(t,true);this.setCurrent(t);switch(this.getUnit()){case r.OneMonth:case"OneMonth":if(e.monthsDiffer(this.getStart(),t)){var o=e.getFirstDateOfMonth(h);this.setStart(e._createLocalDate(o,true))}break;case r.Day:n=e._createUniversalUTCDate(this.getStart(),undefined,true);n.setUTCDate(n.getUTCDate()+this.getStep());if(t.valueOf()>=n.valueOf()){i=1+Math.ceil((t.valueOf()-n.valueOf())/s.HOURS24);a=e._createUniversalUTCDate(this.getStart(),undefined,true);a.setUTCDate(a.getUTCDate()+i);this.setStart(e._createLocalDate(a,true))}else if(t.valueOf()<this.getStart().valueOf()){a=e._createUniversalUTCDate(t,undefined,true);this.setStart(e._createLocalDate(a,true))}break;case r.Month:n=e._createUniversalUTCDate(this.getStart());n.setUTCMonth(n.getUTCMonth()+this.getStep());if(u.getTime()>=n.valueOf()){i=1+e._monthsBetween(t,e._createLocalDate(n,true));a=e._createUniversalUTCDate(this.getStart(),undefined,true);a.setUTCMonth(a.getUTCMonth()+i);this.setStart(e._createLocalDate(a,true))}else if(t.valueOf()<this.getStart().valueOf()){a=e._createUniversalUTCDate(t,undefined,true);this.setStart(e._createLocalDate(a,true))}break;case r.Week:var c=e.getFirstDateOfWeek(h);if(this.getStart().valueOf()!==c.valueOf()){this.setStart(e._createLocalDate(c,true))}break;case r.Hour:n=this.getEnd(this.getStart());var U=e._createUniversalUTCDate(n,undefined,true);if(u.getTime()<e._createUniversalUTCDate(this.getStart(),undefined,true).getTime()||u.getTime()>U.getTime()){this.setStart(t)}break;default:break}};return s});
//# sourceMappingURL=DateNavigation.js.map