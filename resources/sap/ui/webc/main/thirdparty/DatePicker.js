sap.ui.define(["sap/ui/webc/common/thirdparty/base/FeaturesRegistry","sap/ui/webc/common/thirdparty/localization/dates/CalendarDate","sap/ui/webc/common/thirdparty/localization/dates/modifyDateBy","sap/ui/webc/common/thirdparty/localization/dates/getRoundedTimestamp","sap/ui/webc/common/thirdparty/localization/dates/getTodayUTCTimestamp","sap/ui/webc/common/thirdparty/base/types/ValueState","sap/ui/webc/common/thirdparty/base/util/AriaLabelHelper","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/base/Device","sap/ui/webc/common/thirdparty/icons/appointment-2","sap/ui/webc/common/thirdparty/icons/decline","./types/HasPopup","./generated/i18n/i18n-defaults","./DateComponentBase","./Icon","./Button","./ResponsivePopover","./Calendar","./CalendarDate","./Input","./types/InputType","./generated/templates/DatePickerTemplate.lit","./generated/templates/DatePickerPopoverTemplate.lit","sap/ui/webc/common/thirdparty/localization/features/calendar/Gregorian","./generated/themes/DatePicker.css","./generated/themes/DatePickerPopover.css","./generated/themes/ResponsivePopoverCommon.css"],function(e,t,a,i,r,s,n,o,u,l,p,h,c,d,m,f,g,v,y,_,P,V,S,D,F,T,I){"use strict";function b(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var k=b(t);var w=b(a);var C=b(i);var E=b(r);var A=b(s);const O={tag:"ui5-date-picker",altTag:"ui5-datepicker",managedSlots:true,properties:{value:{type:String},valueState:{type:A,defaultValue:A.None},required:{type:Boolean},disabled:{type:Boolean},readonly:{type:Boolean},placeholder:{type:String,defaultValue:undefined},name:{type:String},hideWeekNumbers:{type:Boolean},accessibleName:{type:String},accessibleNameRef:{type:String,defaultValue:""},_isPickerOpen:{type:Boolean,noAttribute:true},_respPopoverConfig:{type:Object},_calendarCurrentPicker:{type:String,defaultValue:"day"}},slots:{valueStateMessage:{type:HTMLElement},formSupport:{type:HTMLElement}},events:{change:{detail:{value:{type:String},valid:{type:Boolean}}},input:{detail:{value:{type:String},valid:{type:Boolean}}}}};class R extends d{static get metadata(){return O}static get template(){return V}static get staticAreaTemplate(){return S}static get styles(){return F}static get staticAreaStyles(){return[I,T]}constructor(){super();this.FormSupport=undefined}onResponsivePopoverAfterClose(){this._isPickerOpen=false;if(u.isPhone()){this.blur()}else{this._getInput().focus()}}onBeforeRendering(){this.FormSupport=e.getFeature("FormSupport");["minDate","maxDate"].forEach(e=>{if(this[e]&&!this.isValid(this[e])){console.warn(`Invalid value for property "${e}": ${this[e]} is not compatible with the configured format pattern: "${this._displayFormat}"`)}});const t=e.getFeature("FormSupport");if(t){t.syncNativeHiddenInput(this)}else if(this.name){console.warn(`In order for the "name" property to have effect, you should also: import "@ui5/webcomponents/dist/features/InputElementsFormSupport.js";`)}this.value=this.normalizeValue(this.value)||this.value;this.liveValue=this.value}get _calendarSelectionMode(){return"Single"}get _calendarTimestamp(){if(this.value&&this._checkValueValidity(this.value)){const e=this.dateValueUTC.getTime();return C(e)}return E(this._primaryCalendarType)}get _calendarSelectedDates(){if(this.value&&this._checkValueValidity(this.value)){return[this.value]}return[]}_onkeydown(e){if(o.isShow(e)){e.preventDefault();if(this.isOpen()){if(!o.isF4(e)){this._toggleAndFocusInput()}}else{this._toggleAndFocusInput()}}if(this.isOpen()){return}if(o.isEnter(e)){if(this.FormSupport){this.FormSupport.triggerFormSubmit(this)}}else if(o.isPageUpShiftCtrl(e)){e.preventDefault();this._modifyDateValue(1,"year")}else if(o.isPageUpShift(e)){e.preventDefault();this._modifyDateValue(1,"month")}else if(o.isPageUp(e)){e.preventDefault();this._modifyDateValue(1,"day")}else if(o.isPageDownShiftCtrl(e)){e.preventDefault();this._modifyDateValue(-1,"year")}else if(o.isPageDownShift(e)){e.preventDefault();this._modifyDateValue(-1,"month")}else if(o.isPageDown(e)){e.preventDefault();this._modifyDateValue(-1,"day")}}_modifyDateValue(e,t){if(!this.dateValue){return}const a=w(k.fromLocalJSDate(this.dateValue),e,t,this._minDate,this._maxDate);const i=this.formatValue(a.toUTCJSDate());this._updateValueAndFireEvents(i,true,["change","value-changed"])}_updateValueAndFireEvents(e,t,a,i=true){const r=this._checkValueValidity(e);if(r&&t){e=this.normalizeValue(e)}let s=true;this.liveValue=e;a.forEach(t=>{if(!this.fireEvent(t,{value:e,valid:r},true)){s=false}});if(!s){return}if(i){this._getInput().getInputDOMRef().then(t=>{t.value=e});this.value=e;this._updateValueState()}}_updateValueState(){const e=this._checkValueValidity(this.value);if(!e){this.valueState=A.Error}else if(e&&this.valueState===A.Error){this.valueState=A.None}}_toggleAndFocusInput(){this.togglePicker();this._getInput().focus()}_getInput(){return this.shadowRoot.querySelector("[ui5-input]")}_onInputSubmit(e){}_onInputChange(e){this._updateValueAndFireEvents(e.target.value,true,["change","value-changed"])}async _onInputInput(e){this._updateValueAndFireEvents(e.target.value,false,["input"],false)}_checkValueValidity(e){if(e===""){return true}return this.isValid(e)&&this.isInValidRange(e)}_click(e){if(u.isPhone()){this.responsivePopover.showAt(this);e.preventDefault()}}isValid(e=""){if(e===""){return true}return!!this.getFormat().parse(e)}isInValidRange(e=""){if(e===""){return true}const t=this._getCalendarDateFromString(e);return t.valueOf()>=this._minDate.valueOf()&&t.valueOf()<=this._maxDate.valueOf()}normalizeValue(e){if(e===""){return e}return this.getFormat().format(this.getFormat().parse(e,true),true)}get _displayFormat(){return this.getFormat().oFormatOptions.pattern}get _placeholder(){return this.placeholder!==undefined?this.placeholder:this._displayFormat}get _headerTitleText(){return R.i18nBundle.getText(c.INPUT_SUGGESTIONS_TITLE)}get phone(){return u.isPhone()}get showHeader(){return this.phone}get showFooter(){return this.phone}get accInfo(){return{ariaRoledescription:this.dateAriaDescription,ariaHasPopup:h.Grid,ariaAutoComplete:"none",ariaRequired:this.required,ariaLabel:n.getEffectiveAriaLabelText(this)}}get openIconTitle(){return R.i18nBundle.getText(c.DATEPICKER_OPEN_ICON_TITLE)}get openIconName(){return"appointment-2"}get dateAriaDescription(){return R.i18nBundle.getText(c.DATEPICKER_DATE_DESCRIPTION)}get _shouldHideHeader(){return false}async _respPopover(){const e=await this.getStaticAreaItemDomRef();return e.querySelector("[ui5-responsive-popover]")}_canOpenPicker(){return!this.disabled&&!this.readonly}onSelectedDatesChange(e){e.preventDefault();const t=e.detail.values&&e.detail.values[0];this._updateValueAndFireEvents(t,true,["change","value-changed"]);this.closePicker()}onHeaderShowMonthPress(){this._calendarCurrentPicker="month"}onHeaderShowYearPress(){this._calendarCurrentPicker="year"}formatValue(e){return this.getFormat().format(e)}closePicker(){this.responsivePopover.close()}async openPicker(){this._isPickerOpen=true;this._calendarCurrentPicker="day";this.responsivePopover=await this._respPopover();this.responsivePopover.showAt(this)}togglePicker(){if(this.isOpen()){this.closePicker()}else if(this._canOpenPicker()){this.openPicker()}}isOpen(){return!!this._isPickerOpen}get dateValue(){return this.liveValue?this.getFormat().parse(this.liveValue):this.getFormat().parse(this.value)}get dateValueUTC(){return this.liveValue?this.getFormat().parse(this.liveValue,true):this.getFormat().parse(this.value)}get styles(){return{main:{width:"100%"}}}get type(){return P.Text}static get dependencies(){return[m,g,v,y,_,f]}}R.define();return R});