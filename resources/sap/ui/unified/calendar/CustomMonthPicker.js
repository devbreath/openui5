/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Renderer","sap/ui/unified/Calendar",'sap/ui/unified/CalendarRenderer',"sap/ui/unified/calendar/Header","sap/ui/unified/DateRange"],function(R,C,a,H,D){"use strict";var b=R.extend(a);b.apiVersion=2;var c=C.extend("sap.ui.unified.internal.CustomMonthPicker",{metadata:{library:"sap.ui.unified"},renderer:b});c.prototype._initializeHeader=function(){var h=new H(this.getId()+"--Head",{visibleButton1:false});h.attachEvent("pressPrevious",this._handlePrevious,this);h.attachEvent("pressNext",this._handleNext,this);h.attachEvent("pressButton2",this._handleButton2,this);this._afterHeaderRenderAdjustCSS=this._createOnAfterRenderingDelegate(h);h.addDelegate(this._afterHeaderRenderAdjustCSS);this.setAggregation("header",h);};c.prototype.init=function(){C.prototype.init.apply(this,arguments);this.setProperty("_currentPicker","monthPicker");this._bNamesLengthChecked=true;};c.prototype.onBeforeRendering=function(){var s=this.getSelectedDates(),y=this._getYearPicker().getDate(),m,S;C.prototype.onBeforeRendering.apply(this,arguments);if(this._iMode===1){if(s.length&&s[0].getStartDate()&&(!y||(s[0].getStartDate().getFullYear()===y.getFullYear()))){m=this._getMonthPicker();S=s[0].getStartDate();m.setMonth(S.getMonth());m._iYear=S.getFullYear();}}};c.prototype._closePickers=function(){this.setProperty("_currentPicker","monthPicker");this._togglePrevNext(this._getFocusedDate(),true);};c.prototype._selectYear=function(){var m=this._getMonthPicker(),y=this._getYearPicker(),f=this._getFocusedDate();f.setYear(y.getYear());m._setYear(f.getYear());m._setDate(f);this._focusDate(f,true);this._showMonthPicker();};c.prototype._selectMonth=function(){var m=this._getMonthPicker(),s=this.getSelectedDates()[0],f=this._getFocusedDate();if(!s){s=new D();}if(!m.getIntervalSelection()){f.setMonth(m.getMonth(),1);s.setStartDate(f.toLocalJSDate());this.addSelectedDate(s);}this.fireSelect();};c.prototype.onsapescape=function(e){this.fireCancel();};c.prototype._hideMonthPicker=function(){this._hideOverlay();this._togglePrevNext(this._getFocusedDate(),true);this._bActionTriggeredFromSecondHeader=false;};c.prototype.setShowCurrentDateButton=function(s){return this;};return c;});
