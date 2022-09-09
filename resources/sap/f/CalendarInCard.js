/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/Button","sap/m/Toolbar","sap/ui/core/Core","sap/ui/core/format/DateFormat","sap/ui/core/IconPool","sap/ui/core/InvisibleText","sap/ui/unified/Calendar","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/calendar/CalendarUtils","./CalendarInCardRenderer"],function(t,e,i,a,r,o,s,n,h,c){"use strict";var _=s.extend("sap.f.CalendarInCard",{metadata:{library:"sap.f"}});_.prototype.init=function(){s.prototype.init.apply(this,arguments);this.setProperty("_currentPicker","month")};_.prototype.onBeforeRendering=function(){var t=this.getAggregation("month"),e=this._getFocusedDate().toLocalJSDate();t[0].displayDate(e);this._iSize=0;switch(this._iMode){case 0:this._oPickerBtn.setText(this._formatPickerText(e));break;case 1:this._oPickerBtn.setText(this._formatMonthPickerText());break;case 2:case 3:this._oPickerBtn.setText(this._formatYearPickerText());break}this._updateTodayButtonState()};_.prototype.onAfterRendering=function(t){};_.prototype.onsaptabnext=function(t){};_.prototype.onsaptabprevious=function(t){};_.prototype._initializeHeader=function(){var a=this.getId()+"--Head",s=i.getLibraryResourceBundle("sap.f"),n=new t(a+"-PrevBtn",{icon:r.getIconURI("slim-arrow-left"),tooltip:s.getText("CALENDAR_BTN_PREV"),type:"Transparent",press:function(){this._handlePrevious()}.bind(this)}),h=new t({icon:r.getIconURI("slim-arrow-right"),tooltip:s.getText("CALENDAR_BTN_NEXT"),type:"Transparent",press:function(){this._handleNext()}.bind(this)}),c=new e(a,{ariaLabelledBy:o.getStaticId("sap.f","CALENDAR_NAVIGATION")});this._oTodayBtn=new t({text:s.getText("CALENDAR_TODAY"),ariaLabelledBy:o.getStaticId("sap.f","CALENDAR_NAVIGATE_TO_TODAY"),type:"Transparent",press:function(){this._handleTodayPress()}.bind(this)});this._oPickerBtn=new t({type:"Transparent",ariaLabelledBy:o.getStaticId("sap.f","CALENDAR_SELECT_RANGE"),press:function(){this._handlePickerButtonPress()}.bind(this)});c.addContent(n).addContent(this._oTodayBtn).addContent(h).addContent(this._oPickerBtn);this.setAggregation("header",c)};_.prototype._handlePickerButtonPress=function(){switch(this._iMode){case 0:this._showMonthPicker();this._oPickerBtn.getDomRef().focus();break;case 1:this._showYearPicker();this._oPickerBtn.getDomRef().focus();break;case 2:this._showYearRangePicker();break}};_.prototype._handleTodayPress=function(){var t=new Date,e=n.fromLocalJSDate(t);this.getAggregation("month")[0].setDate(t);this.getSelectedDates()[0].setStartDate(t);this._setFocusedDate(e);if(this._iMode===3){t.setFullYear(t.getFullYear()-this._getYearRangePicker().getRangeSize()/2);this._getYearRangePicker().setDate(t);this._oPickerBtn.setText(this._formatYearPickerText())}else if(this._iMode===2){this._getYearPicker().setDate(t);this._oPickerBtn.setText(this._formatYearPickerText())}else if(this._iMode===1){this.displayDate(t);this._getMonthPicker()._iYear=t.getFullYear();this._getMonthPicker().setMonth(t.getMonth());this._oPickerBtn.setText(this._formatMonthPickerText())}else{this._oPickerBtn.setText(this._formatPickerText())}this._addMonthFocusDelegate();this._updateTodayButtonState();this.fireStartDateChange();this.fireSelect()};_.prototype._formatPickerText=function(t){var e=t?t:this.getSelectedDates()[0].getStartDate(),r=i.getConfiguration().getRTL(),o=a.getDateInstance({format:"yMMMM"}),s=o.format(e),n,h;if(!r){n=s;if(h){n+=" - "+h}}else{if(h){n=h+" - "+s}else{n=s}}return n};_.prototype._formatYearPickerText=function(){var t=this._getYearPicker().getDate().getFullYear(),e=this._getYearPicker().getYears(),i=t-Math.floor(e/2),a=t+e/2-1;return""+i+" - "+a};_.prototype._formatMonthPickerText=function(){return a.getDateInstance({format:"y"}).format(this.getStartDate())};_.prototype._showMonthPicker=function(t){var e=this._getFocusedDate(),i=this._getMonthPicker();this.setProperty("_currentPicker","monthPicker");i._setYear(e.getYear());i._setDate(e);if(!t){i.setMonth(e.getMonth());this._setDisabledMonths(e.getYear(),i)}this._iMode=1;this._togglePrevNext(e,false);this._oPickerBtn.setText(this._formatMonthPickerText())};_.prototype._showYearPicker=function(){var t=this._getFocusedDate(),e=this._getYearPicker();this.setProperty("_currentPicker","yearPicker");this._togglePrevNexYearPicker();this._iMode=2;e.setDate(t.toLocalJSDate());this._oPickerBtn.setText(this._formatYearPickerText())};_.prototype._showYearRangePicker=function(){s.prototype._showYearRangePicker.apply(this,arguments);this._oPickerBtn.setVisible(false)};_.prototype._selectMonth=function(){s.prototype._selectMonth.apply(this,arguments);this._oPickerBtn.setText(this._formatPickerText());this._updateTodayButtonState()};_.prototype._selectYear=function(){s.prototype._selectYear.apply(this,arguments);this._oPickerBtn.setText(this._formatMonthPickerText());this._showMonthPicker();this._updateTodayButtonState()};_.prototype._selectYearRange=function(){var t=this.getAggregation("yearRangePicker"),e=t.getRangeSize(),i=this.getPrimaryCalendarType(),a=n.fromLocalJSDate(t.getDate(),i),r=this._getFocusedDate();a.setMonth(r.getMonth(),r.getDate());a.setYear(a.getYear()+Math.floor(e/2));r.setYear(a.getYear());this._setFocusedDate(r);this._showYearPicker();this._oPickerBtn.setVisible(true).setText(this._formatYearPickerText());this._updateTodayButtonState()};_.prototype._handlePrevious=function(){s.prototype._handlePrevious.apply(this,arguments);this._handleArrowNavigation(-1)};_.prototype._handleNext=function(){s.prototype._handleNext.apply(this,arguments);this._handleArrowNavigation(1)};_.prototype._handleArrowNavigation=function(t){var e,i,a;if(this._iMode===3){a=this._getYearRangePicker();a.getDate().setFullYear(a.getDate().getFullYear()+t*a.getYears());this._oPickerBtn.setText(this._formatYearPickerText())}else if(this._iMode===2){i=this._getYearPicker();i.getDate().setFullYear(i.getDate().getFullYear()+t*i.getYears());this._oPickerBtn.setText(this._formatYearPickerText())}else if(this._iMode===1){e=this._getMonthPicker();this._getFocusedDate().setYear(e._iYear);this.getAggregation("month")[0].getDate().setYear(e._iYear);this._oPickerBtn.setText(this._formatMonthPickerText())}else{this._oPickerBtn.setText(this._formatPickerText(this._getFocusedDate().toLocalJSDate()))}this._updateTodayButtonState()};_.prototype._dateMatchesVisibleRange=function(){var t=n.fromLocalJSDate(new Date),e,i,a,r,o;switch(this._iMode){case 0:e=this.getSelectedDates().length?this.getSelectedDates()[0].getStartDate():this.getStartDate();i=e.getDate()===t.getDate();return i&&h._isSameMonthAndYear(n.fromLocalJSDate(this.getStartDate()),t);case 1:return h._isSameMonthAndYear(n.fromLocalJSDate(this.getStartDate()),t);case 2:return h._isSameMonthAndYear(n.fromLocalJSDate(this._getYearPicker().getDate()),t);case 3:a=this._getYearRangePicker();r=a.getDate();o=new Date(r.getFullYear()+a.getRangeSize()/2,r.getMonth(),r.getDate());return h._isSameMonthAndYear(n.fromLocalJSDate(o),t)}};_.prototype._updateTodayButtonState=function(){if(this._oTodayBtn){this._oTodayBtn.setEnabled(!this._dateMatchesVisibleRange())}};_.prototype._updateHeader=function(){};_.prototype.onsapescape=function(){this.fireCancel();this._closePickers();this._oPickerBtn.setVisible(true);this._oPickerBtn.setText(this._formatPickerText())};_.prototype._updateHeadersButtons=function(){};_.prototype._togglePrevNext=function(){};_.prototype._togglePrevNexYearPicker=function(){};_.prototype._initializeSecondMonthHeader=function(){};_.prototype._updateHeadersYearPrimaryText=function(){};_.prototype._updateHeadersYearAdditionalText=function(){};_.prototype._updateActiveHeaderYearButtonVisibility=function(){};_.prototype._setHeaderText=function(){};return _});
//# sourceMappingURL=CalendarInCard.js.map