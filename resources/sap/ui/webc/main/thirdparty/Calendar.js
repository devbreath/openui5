sap.ui.define(["sap/ui/webc/common/thirdparty/localization/dates/CalendarDate","sap/ui/webc/common/thirdparty/base/Render","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/localization/getCachedLocaleDataInstance","sap/ui/webc/common/thirdparty/base/locale/getLocale","sap/ui/webc/common/thirdparty/localization/DateFormat","./CalendarDate","./CalendarPart","./CalendarHeader","./DayPicker","./MonthPicker","./YearPicker","./types/CalendarSelectionMode","sap/ui/webc/common/thirdparty/localization/features/calendar/Gregorian","./generated/templates/CalendarTemplate.lit","./generated/themes/Calendar.css"],function(e,t,a,r,n,s,i,o,c,d,h,l,u,p,m,y){"use strict";function _(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var g=_(e);var D=_(r);var M=_(n);var f=_(s);const P={tag:"ui5-calendar",fastNavigation:true,properties:{selectionMode:{type:u,defaultValue:u.Single},hideWeekNumbers:{type:Boolean},_currentPicker:{type:String,defaultValue:"day"},_previousButtonDisabled:{type:Boolean},_nextButtonDisabled:{type:Boolean},_headerMonthButtonText:{type:String},_headerYearButtonText:{type:String}},managedSlots:true,slots:{default:{propertyName:"dates",type:HTMLElement,invalidateOnChildChange:true}},events:{"selected-dates-change":{detail:{dates:{type:Array},values:{type:Array}}},"show-month-press":{},"show-year-press":{}}};class k extends o{static get metadata(){return P}static get template(){return m}static get styles(){return y}get _selectedDatesTimestamps(){return this.dates.map(e=>{const t=e.value;return t&&!!this.getFormat().parse(t)?this._getTimeStampFromString(t)/1e3:undefined}).filter(e=>!!e)}_setSelectedDates(e){const t=e.map(e=>this.getFormat().format(new Date(e*1e3),true));const a=[...this.dates].map(e=>e.value);this.dates.filter(e=>!t.includes(e.value)).forEach(e=>{this.removeChild(e)});t.filter(e=>!a.includes(e)).forEach(e=>{const t=document.createElement(i.getMetadata().getTag());t.value=e;this.appendChild(t)})}async onAfterRendering(){await t.renderFinished();this._previousButtonDisabled=!this._currentPickerDOM._hasPreviousPage();this._nextButtonDisabled=!this._currentPickerDOM._hasNextPage();const e=f.getDateInstance({format:"y",calendarType:this.primaryCalendarType});const a=D(M());this._headerMonthButtonText=a.getMonthsStandAlone("wide",this.primaryCalendarType)[this._calendarDate.getMonth()];if(this._currentPicker==="year"){const t=new g(this._calendarDate,this._primaryCalendarType);const a=new g(this._calendarDate,this._primaryCalendarType);t.setYear(this._currentPickerDOM._firstYear);a.setYear(this._currentPickerDOM._lastYear);this._headerYearButtonText=`${e.format(t.toLocalJSDate(),true)} - ${e.format(a.toLocalJSDate(),true)}`}else{this._headerYearButtonText=String(e.format(this._localDate,true))}}onHeaderShowMonthPress(e){this._currentPickerDOM._autoFocus=false;this._currentPicker="month";this.fireEvent("show-month-press",e)}onHeaderShowYearPress(e){this._currentPickerDOM._autoFocus=false;this._currentPicker="year";this.fireEvent("show-year-press",e)}get _currentPickerDOM(){return this.shadowRoot.querySelector(`[ui5-${this._currentPicker}picker]`)}onHeaderPreviousPress(){this._currentPickerDOM._showPreviousPage()}onHeaderNextPress(){this._currentPickerDOM._showNextPage()}get secondaryCalendarTypeButtonText(){if(!this.secondaryCalendarType){return}const e=new Date(this._timestamp*1e3);const t=f.getDateInstance({format:"y",calendarType:this.secondaryCalendarType});const a=this._getDisplayedSecondaryMonthText();const r=t.format(e,true);return{yearButtonText:r,monthButtonText:a.text,monthButtonInfo:a.info}}_getDisplayedSecondaryMonthText(){const e=this._getDisplayedSecondaryMonths();const t=D(M());const a=t.getIntervalPattern();const r=D(M()).getMonthsStandAlone("abbreviated",this.secondaryCalendarType);const n=D(M()).getMonthsStandAlone("wide",this.secondaryCalendarType);if(e.startMonth===e.endMonth){return{text:t.getMonths("abbreviated",this.secondaryCalendarType)[e.startMonth],textInfo:t.getMonths("wide",this.secondaryCalendarType)[e.startMonth]}}return{text:a.replace(/\{0\}/,r[e.startMonth]).replace(/\{1\}/,r[e.endMonth]),textInfo:a.replace(/\{0\}/,n[e.startMonth]).replace(/\{1\}/,n[e.endMonth])}}_getDisplayedSecondaryMonths(){const e=new Date(this._timestamp*1e3);let t=g.fromLocalJSDate(e,this._primaryCalendarType);t.setDate(1);t=new g(t,this.secondaryCalendarType);const a=t.getMonth();let r=g.fromLocalJSDate(e,this._primaryCalendarType);r.setDate(this._getDaysInMonth(r));r=new g(r,this.secondaryCalendarType);const n=r.getMonth();return{startMonth:a,endMonth:n}}_getDaysInMonth(e){const t=new g(e);t.setDate(1);t.setMonth(t.getMonth()+1);t.setDate(0);return t.getDate()}get _isHeaderMonthButtonHidden(){return this._currentPicker==="month"||this._currentPicker==="year"}get _isDayPickerHidden(){return this._currentPicker!=="day"}get _isMonthPickerHidden(){return this._currentPicker!=="month"}get _isYearPickerHidden(){return this._currentPicker!=="year"}onSelectedDatesChange(e){const t=e.detail.timestamp;const a=e.detail.dates;const r=a.map(e=>{const t=g.fromTimestamp(e*1e3,this._primaryCalendarType);return this.getFormat().format(t.toUTCJSDate(),true)});this.timestamp=t;const n=!this.fireEvent("selected-dates-change",{timestamp:t,dates:[...a],values:r},true);if(!n){this._setSelectedDates(a)}}onSelectedMonthChange(e){this.timestamp=e.detail.timestamp;this._currentPicker="day";this._currentPickerDOM._autoFocus=true}onSelectedYearChange(e){this.timestamp=e.detail.timestamp;this._currentPicker="day";this._currentPickerDOM._autoFocus=true}onNavigate(e){this.timestamp=e.detail.timestamp}_onkeydown(e){if(a.isF4(e)&&this._currentPicker!=="month"){this._currentPicker="month"}if(a.isF4Shift(e)&&this._currentPicker!=="year"){this._currentPicker="year"}}get selectedDates(){return this._selectedDatesTimestamps}set selectedDates(e){this._setSelectedDates(e)}static get dependencies(){return[i,c,d,h,l]}}k.define();return k});