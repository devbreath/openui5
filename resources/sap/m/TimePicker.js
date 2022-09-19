/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./InputBase','./DateTimeField','./MaskInputRule','./Toolbar','./ToolbarSpacer','./Popover','./ResponsivePopover','sap/ui/core/EnabledPropagator','sap/ui/core/IconPool','./TimePickerInternals','./TimePickerClocks','./TimePickerInputs','./MaskEnabler','sap/ui/Device','sap/ui/core/format/DateFormat','sap/ui/core/format/TimezoneUtil','sap/ui/core/Locale','sap/m/library','sap/ui/core/LocaleData','./TimePickerRenderer',"sap/ui/events/KeyCodes","sap/base/Log","sap/ui/core/InvisibleText",'./Button',"sap/ui/thirdparty/jquery"],function(I,D,M,T,a,P,R,E,b,c,d,e,f,g,h,j,L,l,k,m,K,n,o,B,q){"use strict";var p=l.PlacementType,r=l.TimePickerMaskMode,s=l.ButtonType,t=1;var u=D.extend("sap.m.TimePicker",{metadata:{library:"sap.m",designtime:"sap/m/designtime/TimePicker.designtime",properties:{localeId:{type:"string",group:"Data"},title:{type:"string",group:"Misc",defaultValue:null},minutesStep:{type:"int",group:"Misc",defaultValue:t},secondsStep:{type:"int",group:"Misc",defaultValue:t},placeholderSymbol:{type:"string",group:"Misc",defaultValue:"_"},mask:{type:"string",group:"Misc",defaultValue:null},maskMode:{type:"sap.m.TimePickerMaskMode",group:"Misc",defaultValue:r.On},support2400:{type:"boolean",group:"Misc",defaultValue:false},hideInput:{type:"boolean",group:"Misc",defaultValue:false},showCurrentTimeButton:{type:"boolean",group:"Behavior",defaultValue:false}},aggregations:{rules:{type:"sap.m.MaskInputRule",multiple:true,singularName:"rule"},_picker:{type:"sap.m.ResponsivePopover",multiple:false,visibility:"hidden"},_numPicker:{type:"sap.m.Popover",multiple:false,visibility:"hidden"}},events:{afterValueHelpOpen:{},afterValueHelpClose:{},liveChange:{parameters:{value:{type:"string"},previousValue:{type:"string"}}}},dnd:{draggable:false,droppable:true}}});b.insertFontFaceStyle();E.call(u.prototype,true);f.call(u.prototype);var v={Short:"short",Medium:"medium",Long:"long"},w={Hour:"hour",Minute:"minute",Second:"second"},x='-';u.prototype.init=function(){D.prototype.init.apply(this,arguments);f.init.apply(this,arguments);this.setDisplayFormat(z());this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._bValid=false;this._sUsedDisplayPattern=null;this._sUsedValuePattern=null;this._oDisplayFormat=null;this._sValueFormat=null;this._oPopoverKeydownEventDelegate=null;this._rPlaceholderRegEx=new RegExp(x,'g');this._sLastChangeValue=null;var i=this.addEndIcon({id:this.getId()+"-icon",src:this.getIconSrc(),noTabStop:true,title:"",tooltip:this._oResourceBundle.getText("OPEN_PICKER_TEXT")});this._bShouldClosePicker=false;this._bShouldCloseNumericPicker=false;i.addEventDelegate({onmousedown:function(A){this._bShouldClosePicker=this.isOpen();}},this);i.attachPress(function(){this.toggleOpen(this._bShouldClosePicker);},this);this._sMinutes="00";this._sSeconds="00";};u.prototype.onBeforeRendering=function(){D.prototype.onBeforeRendering.apply(this,arguments);var V=this._getValueHelpIcon();if(V){V.setProperty("visible",this.getEditable(),true);}};u.prototype.exit=function(){if(this._oTimeSemanticMaskHelper){this._oTimeSemanticMaskHelper.destroy();}f.exit.apply(this,arguments);this._removePickerEvents();this._oResourceBundle=null;this._bValid=false;this._sUsedDisplayPattern=null;this._oDisplayFormat=null;this._oPopoverKeydownEventDelegate=null;this._sUsedValuePattern=null;this._sValueFormat=null;this._sLastChangeValue=null;};u.prototype.getIconSrc=function(){return b.getIconURI("time-entry-request");};u.prototype.isOpen=function(){return this._getPicker()&&this._getPicker().isOpen();};u.prototype.toggleOpen=function(O){if(this.getEditable()&&this.getEnabled()){this[O?"_closePicker":"_openPicker"]();}};u.prototype.isNumericOpen=function(){return this._getNumericPicker()&&this._getNumericPicker().isOpen();};u.prototype.toggleNumericOpen=function(O){if(this.getEditable()&&this.getEnabled()){this[O?"_closeNumericPicker":"_openNumericPicker"]();this._openByFocusIn=false;this._openByClick=false;}};u.prototype.onfocusin=function(i){var A=this._getPicker(),C=this._isIconClicked(i),N=this._getNumericPicker(),O=N&&N.isOpen();if(!this._isMobileDevice()){D.prototype.onfocusin.apply(this,arguments);f.onfocusin.apply(this,arguments);}if(A&&A.isOpen()&&!C){this._closePicker();return;}if(this._openByClick){this._openByClick=false;return;}if(!this._isMobileDevice()){return;}if(!C){this.toggleNumericOpen(O);}this._openByFocusIn=true;};u.prototype.onclick=function(i){var A=this._isIconClicked(i),C=this._getNumericPicker(),O=C&&C.isOpen();if(this._openByFocusIn){this._openByFocusIn=false;return;}if(!this._isMobileDevice()){return;}if(!A){this.toggleNumericOpen(O);}this._openByClick=true;};u.prototype._isIconClicked=function(i){return q(i.target).hasClass("sapUiIcon")||q(i.target).hasClass("sapMInputBaseIconContainer")||q(i.target).hasClass("sapUiIconTitle");};u.prototype.onBeforeOpen=function(){var C=this._getClocks(),i=this.getDateValue(),A=i?i.getMilliseconds():0,F=this._getFormatter(true).oFormatOptions.pattern,G=F.indexOf("HH"),H=F.indexOf("H"),J=c._isHoursValue24(this._$input.val(),G,H)?c._replace24HoursWithZero(this._$input.val(),G,H):this._$input.val(),N;var O=this._getFormatter(true).parse(J)||i;var Q=this._getFormatter(true).format(O);C.setValue(Q);N=this._getPickerParser().format(i||new Date(),sap.ui.getCore().getConfiguration().getTimezone());i=this._getPickerParser().parse(N,j.getLocalTimezone())[0];i.setMilliseconds(A);if(this._shouldSetInitialFocusedDateValue()){i=this.getInitialFocusedDateValue()||i;}C._setTimeValues(i,c._isHoursValue24(this._$input.val(),G,H));this.$().addClass(I.ICON_PRESSED_CSS_CLASS);};u.prototype.onAfterOpen=function(){var C=this._getClocks();if(C){C.showFirstClock();C._focusActiveButton();}this.fireAfterValueHelpOpen();};u.prototype.onAfterClose=function(){this.$().removeClass(I.ICON_PRESSED_CSS_CLASS);this._getClocks().showFirstClock();this.fireAfterValueHelpClose();};u.prototype._isMobileDevice=function(){return!g.system.desktop&&(g.system.phone||g.system.tablet);};u.prototype.onBeforeNumericOpen=function(){var i=this._getInputs(),A=this.getDateValue(),C=this._$input.val(),F=this._getFormatter(true).oFormatOptions.pattern,G=F.indexOf("HH"),H=F.indexOf("H");var J=this._getFormatter(true).parse(C)||A;var N=this._getFormatter(true).format(J);i.setValue(N);if(this._shouldSetInitialFocusedDateValue()){A=this.getInitialFocusedDateValue();}i._setTimeValues(A,c._isHoursValue24(N,G,H));};u.prototype._getValueHelpIcon=function(){var V=this.getAggregation("_endIcon");return V&&V[0];};u.prototype._handleInputChange=function(V){var i,A,C,F,G=this.getValueFormat()||(this._sValueFormat&&this._sValueFormat.oFormatOptions.pattern),H,J;G=G?G:"";H=G.indexOf("HH");J=G.indexOf("H");V=V||this._$input.val();A=V;C=c._isHoursValue24(A,H,J);F=this.getSupport2400()&&C;this._bValid=true;if(V!==""){i=this._parseValue(C?c._replace24HoursWithZero(V,H,J):V,true);if(F){i.setMinutes(0,0);}if(!i){this._bValid=false;}else{V=this._formatValue(i);if(this.getMaskMode()&&this.getMask()){this._setupMaskVariables();}}}A=F?"24:"+V.replace(/[0-9]/g,"0").slice(0,-3):V;this.updateDomValue(A);if(i){A=V=this._formatValue(i,true);if(F&&i&&i.getHours()===0){A=V=c._replaceZeroHoursWith24(V,H,J);}}this.setProperty("value",A,true);this.setLastValue(V);if(this._bValid){this.setProperty("dateValue",i,true);}this.fireChangeEvent(A,{valid:this._bValid});return true;};u.prototype.onChange=function(i){var V=i?i.value:null;if(this.getEditable()&&this.getEnabled()){return this._handleInputChange(V);}return false;};u.prototype.setMinutesStep=function(i){var C=this._getClocks(),A=this._getInputs();i=Math.max(t,i||t);if(C){C.setMinutesStep(i);}if(A){A.setMinutesStep(i);}return this.setProperty("minutesStep",i,true);};u.prototype.setSecondsStep=function(i){var C=this._getClocks(),A=this._getInputs();i=Math.max(t,i||t);if(C){C.setSecondsStep(i);}if(A){A.setSecondsStep(i);}return this.setProperty("secondsStep",i,true);};u.prototype.setTitle=function(i){var C=this._getClocks();if(C){C.setLabelText(i);}this.setProperty("title",i,true);return this;};u.prototype._handleDateValidation=function(i){if(!i){this._bValid=false;n.warning("Value can not be converted to a valid date",this);}else{this._bValid=true;this.setProperty("dateValue",i,true);var V=this._formatValue(i);if(this.isActive()){this.updateDomValue(V);}else{this.setProperty("value",V,true);this.setLastValue(V);this._sLastChangeValue=V;}}};u.prototype.setSupport2400=function(S){var C=this._getClocks(),i=this._getInputs();this.setProperty("support2400",S,true);if(C){C.setSupport2400(S);}if(i){i.setSupport2400(S);}this._initMask();return this;};u.prototype.setDisplayFormat=function(i){var C=this._getClocks(),A=this._getInputs();this.setProperty("displayFormat",i,true);this._initMask();if(C){C.setValueFormat(i);C.setDisplayFormat(i);}if(A){A.setValueFormat(i);A.setDisplayFormat(i);}var F=this.getDateValue();if(!F){return this;}var O=this._formatValue(F);this.updateDomValue(O);this.setLastValue(O);return this;};u.prototype.setValue=function(V){if(V){this._getFormatter();}var i,O,F=this.getValueFormat()||(this._sValueFormat&&this._sValueFormat.oFormatOptions.pattern),C=this._getClocks(),A=this._getInputs(),G,H,J=false;F=F?F:"";G=F.indexOf("HH");H=F.indexOf("H");V=this.validateProperty("value",V);this._initMask();if(this.getValue()!==V){this._sLastChangeValue=V;}if(this.getDomRef()&&!this._getInputValue()){J=true;}f.setValue.call(this,V);if(this.getDomRef()&&this._bPreferUserInteraction&&J){this.getFocusDomRef().value="";}if(this.getMask()){this._setupMaskVariables();}this._bValid=true;if(V){i=this._parseValue(c._isHoursValue24(V,G,H)?c._replace24HoursWithZero(V,G,H):V);if(!i){this._bValid=false;n.warning("Value can not be converted to a valid date",this);}}if(this._bValid){this.setProperty("dateValue",i,true);}if(i&&!this.getSupport2400()){O=this._formatValue(i);}else{O=V;}if(C){C.setValue(this._formatValue(i));}if(A){A.setValue(this._formatValue(i));}this.updateDomValue(O);this.setLastValue(O);return this;};u.prototype.setDateValue=function(i){this._initMask();return D.prototype.setDateValue.apply(this,arguments);};u.prototype.setTooltip=function(i){var A=this.getDomRef(),C;this._refreshTooltipBaseDelegate(i);this.setAggregation("tooltip",i,true);if(!A){return this;}C=this.getTooltip_AsString();if(C){A.setAttribute("title",C);}else{A.removeAttribute("title");}return this;};u.prototype.setLocaleId=function(i){var C=this.getValue(),A=this._getClocks(),F=this._getInputs();this.setProperty("localeId",i,true);this._initMask();this._oDisplayFormat=null;this._sValueFormat=null;if(C){this.setValue(C);}if(A){A.setLocaleId(i);}if(F){F.setLocaleId(i);}return this;};u.prototype.setShowCurrentTimeButton=function(S){var C=this._getClocks(),N=this._getNumericPicker();C&&C.setShowCurrentTimeButton(S);N&&N.getContent()[0].setShowCurrentTimeButton(S);return this.setProperty("showCurrentTimeButton",S);};u.prototype._getDefaultDisplayStyle=function(){return v.Medium;};u.prototype._getDefaultValueStyle=function(){return v.Medium;};u.prototype._getLocale=function(){var i=this.getLocaleId();return i?new L(i):sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();};u.prototype._getFormatterInstance=function(F,i,A,C,G){var H=this._getLocale();if(i===v.Short||i===v.Medium||i===v.Long){F=h.getTimeInstance({style:i,strictParsing:true,relative:A},H);}else{F=h.getTimeInstance({pattern:i,strictParsing:true,relative:A},H);}if(G){this._sUsedDisplayPattern=i;this._oDisplayFormat=F;}else{this._sUsedValuePattern=i;this._sValueFormat=F;}return F;};u.prototype._getFormat=function(){var F=this._getDisplayFormatPattern();if(!F){F=v.Medium;}if(Object.keys(v).indexOf(F)!==-1){F=z();}return F;};u.prototype.onsappageup=function(i){this._increaseTime(1,w.Hour);i.preventDefault();};u.prototype.onsappageupmodifiers=function(i){if(!(i.ctrlKey||i.metaKey||i.altKey)&&i.shiftKey){this._increaseTime(1,w.Minute);}if(!i.altKey&&i.shiftKey&&(i.ctrlKey||i.metaKey)){this._increaseTime(1,w.Second);}i.preventDefault();};u.prototype.onsappagedown=function(i){this._increaseTime(-1,w.Hour);i.preventDefault();};u.prototype.onsappagedownmodifiers=function(i){if(!(i.ctrlKey||i.metaKey||i.altKey)&&i.shiftKey){this._increaseTime(-1,w.Minute);}if(!i.altKey&&i.shiftKey&&(i.ctrlKey||i.metaKey)){this._increaseTime(-1,w.Second);}i.preventDefault();};u.prototype.onkeydown=function(i){var A=K,C=i.which||i.keyCode,F=i.altKey,G;if(C===A.F4||(F&&(C===A.ARROW_UP||C===A.ARROW_DOWN))){G=this._getPicker()&&this._getPicker().isOpen();if(!G){this._openPicker();}else{this._closePicker();}i.preventDefault();}else if(!this._isMobileDevice()){f.onkeydown.call(this,i);}else{if(C===K.ENTER||C===K.SPACE){this._openNumericPicker();}}};u.prototype._getPicker=function(){return this.getAggregation("_picker");};u.prototype._getNumericPicker=function(){return this.getAggregation("_numPicker");};u.prototype._removePickerEvents=function(){var i,A=this._getPicker();if(A){i=A.getAggregation("_popup");if(typeof this._oPopoverKeydownEventDelegate==='function'){i.removeEventDelegate(this._oPopoverKeydownEventDelegate);}}};u.prototype.openBy=function(i){this._openPicker(i);};u.prototype._openPicker=function(i){var A=this._getPicker();if(!A){A=this._createPicker(this._getDisplayFormatPattern());}if(!i){i=this.getDomRef();}A.openBy(i);A.getContent()[0]._sMinutes=this._sMinutes;A.getContent()[0]._sSeconds=this._sSeconds;return A;};u.prototype._closePicker=function(){var i=this._getPicker();if(i){this._sMinutes=i.getContent()[0]._sMinutes;this._sSeconds=i.getContent()[0]._sSeconds;i.close();}else{n.warning("There is no picker to close.");}return i;};u.prototype._openNumericPicker=function(){var i=this._getNumericPicker();if(!i){i=this._createNumericPicker(this._getDisplayFormatPattern());}i.open();i.getContent()[0]._sMinutes=this._sMinutes;i.getContent()[0]._sSeconds=this._sSeconds;return i;};u.prototype._closeNumericPicker=function(){var i=this._getNumericPicker();if(i){this._sMinutes=i.getContent()[0]._sMinutes;this._sSeconds=i.getContent()[0]._sSeconds;i.close();this.getDomRef("inner").select();}else{n.warning("There is no picker to close.");}return i;};u.prototype._createPicker=function(F){var i=this,A,C,G,H,O,J,N,Q=this.getAggregation("_endIcon")[0],S=this._getLocale().getLanguage(),U,V,W;H=sap.ui.getCore().getLibraryResourceBundle("sap.m");O=H.getText("TIMEPICKER_SET");J=H.getText("TIMEPICKER_CANCEL");N=this._oResourceBundle.getText("TIMEPICKER_SET_TIME");G=new d(this.getId()+"-clocks",{support2400:this.getSupport2400(),displayFormat:F,valueFormat:F,localeId:S,minutesStep:this.getMinutesStep(),secondsStep:this.getSecondsStep(),showCurrentTimeButton:this.getShowCurrentTimeButton()});G._setAcceptCallback(this._handleOkPress.bind(this));var X=this._getValueStateHeader();C=new R(i.getId()+"-RP",{showCloseButton:false,showHeader:false,horizontalScrolling:false,verticalScrolling:true,title:N,placement:p.VerticalPreferredBottom,contentWidth:"20rem",beginButton:new B(this.getId()+"-OK",{text:O,type:s.Emphasized,press:this._handleOkPress.bind(this)}),endButton:new B(this.getId()+"-Cancel",{text:J,press:this._handleCancelPress.bind(this)}),content:[X,G],ariaLabelledBy:o.getStaticId("sap.m","TIMEPICKER_SET_TIME"),beforeOpen:this.onBeforeOpen.bind(this),afterOpen:this.onAfterOpen.bind(this),afterClose:this.onAfterClose.bind(this)});X.setPopup(C._oControl);A=C.getAggregation("_popup");if(A.setShowArrow){A.setShowArrow(false);}A.oPopup.setExtraContent([Q]);if(g.system.phone){U=this.$("inner").attr("aria-labelledby");V=U&&U.split(" ")[0];W=V?document.getElementById(V).getAttribute("aria-label"):"";if(W){C.setTitle(W);}C.setShowHeader(true);}else{this._oPopoverKeydownEventDelegate={onkeydown:function(Y){var Z=K,$=Y.which||Y.keyCode,_=Y.altKey;if((_&&($===Z.ARROW_UP||$===Z.ARROW_DOWN))||$===Z.F4){this._handleOkPress(Y);this.focus();Y.preventDefault();}}};A.addEventDelegate(this._oPopoverKeydownEventDelegate,this);}C.addStyleClass(this.getRenderer().CSS_CLASS+"DropDown");C.open=function(){return this.openBy(i);};this.setAggregation("_picker",C,true);return C;};u.prototype._createNumericPicker=function(F){var i=this,A,C,O,G,H=this._getLocale().getLanguage();C=sap.ui.getCore().getLibraryResourceBundle("sap.m");O=C.getText("TIMEPICKER_SET");G=C.getText("TIMEPICKER_CANCEL");A=new P(i.getId()+"-NP",{showArrow:false,showHeader:false,horizontalScrolling:false,verticalScrolling:false,placement:p.VerticalPreferredBottom,content:[new e(this.getId()+"-inputs",{support2400:this.getSupport2400(),displayFormat:F,valueFormat:F,localeId:H,minutesStep:this.getMinutesStep(),secondsStep:this.getSecondsStep(),showCurrentTimeButton:this.getShowCurrentTimeButton()})],footer:[new T({content:[new a(),new B(this.getId()+"-NumericOK",{text:O,type:s.Emphasized,press:this._handleNumericOkPress.bind(this)}),new B(this.getId()+"-NumericCancel",{text:G,press:this._handleNumericCancelPress.bind(this)})]})],ariaLabelledBy:o.getStaticId("sap.m","TIMEPICKER_SET_TIME"),beforeOpen:this.onBeforeNumericOpen.bind(this),afterOpen:function(){this.fireAfterValueHelpOpen();}.bind(this),afterClose:function(){this.fireAfterValueHelpClose();}.bind(this)});A.open=function(){return this.openBy(i);};this.setAggregation("_numPicker",A,true);return A;};u.prototype._getClocks=function(){var i=this._getPicker();if(!i){return null;}return i.getContent()[1];};u.prototype._getInputs=function(){var i=this._getNumericPicker();if(!i){return null;}return i.getContent()[0];};u.prototype._handleOkPress=function(i){var A=this._getClocks().getTimeValues(),V,F=this._getPickerParser().format(A,j.getLocalTimezone());A=this._getPickerParser().parse(F,sap.ui.getCore().getConfiguration().getTimezone())[0];this._isClockPicker=true;this._isNumericPicker=false;V=this._formatValue(A);this.updateDomValue(V);this._handleInputChange();this._closePicker();};u.prototype._handleCancelPress=function(i){this._closePicker();};u.prototype._handleNumericOkPress=function(i){var A=this._getInputs().getTimeValues(),V,F=this._getPickerParser().format(A,j.getLocalTimezone());A=this._getPickerParser().parse(F,sap.ui.getCore().getConfiguration().getTimezone())[0];this._isClockPicker=false;this._isNumericPicker=true;V=this._formatValue(A);this.updateDomValue(V);this._handleInputChange();this.getDomRef("inner").select();this._closeNumericPicker();};u.prototype._handleNumericCancelPress=function(i){this._closeNumericPicker();};u.prototype._getLocaleBasedPattern=function(i){return k.getInstance(sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()).getTimePattern(i);};u.prototype._parseValue=function(V,i){if(i){V=this._oTimeSemanticMaskHelper.stripValueOfLeadingSpaces(V);V=V.replace(this._rPlaceholderRegEx,'');}return D.prototype._parseValue.call(this,V,i);};u.prototype._formatValue=function(i,V){var A=D.prototype._formatValue.apply(this,arguments),F=this.getValueFormat()||(this._sValueFormat&&this._sValueFormat.oFormatOptions.pattern),C,G,H;F=F?F:"";C=F.indexOf("HH");G=F.indexOf("H");if(i){if(!V&&this._oTimeSemanticMaskHelper){A=this._oTimeSemanticMaskHelper.formatValueWithLeadingTrailingSpaces(A);}}if((this._isNumericPicker&&this.isNumericOpen()&&this._getInputs()&&this._getInputs()._getHoursInput()&&this._getInputs()._getHoursInput().getValue()==="24")||(this._isClockPicker&&this.isOpen()&&this._getClocks()&&this._getClocks()._getHoursClock()&&this._getClocks()._getHoursClock().getSelectedValue()===24)||(this._sLastChangeValue&&this._sLastChangeValue.indexOf("24")>-1)){H=true;}if(i&&i.getHours()===0&&this.getSupport2400()&&H){A=c._replaceZeroHoursWith24(A,C,G);}return A;};u.prototype._increaseTime=function(N,U){var O=this.getDateValue(),i,A;if(O&&this.getEditable()&&this.getEnabled()){i=new Date(O.getTime());switch(U){case w.Hour:i.setHours(i.getHours()+N);A=60*60*1000;break;case w.Minute:i.setMinutes(i.getMinutes()+N);A=60*1000;break;case w.Second:A=1000;i.setSeconds(i.getSeconds()+N);}if(N<0&&i.getTime()-O.getTime()!==N*A){i=new Date(O.getTime()+N*A);}this.setDateValue(i);this.fireChangeEvent(this.getValue(),{valid:true});}};u.prototype._initMask=function(){if(this._oTimeSemanticMaskHelper){this._oTimeSemanticMaskHelper.destroy();}this._oTimeSemanticMaskHelper=new y(this);};u.prototype._isMaskEnabled=function(){return this.getMaskMode()===r.On&&!this._isMobileDevice();};u.prototype._shouldSetInitialFocusedDateValue=function(){if(!this._isValidValue()){return true;}return!this.getValue()&&!!this.getInitialFocusedDateValue();};u.prototype._isValidValue=function(){return this._bValid;};u.prototype.fireChangeEvent=function(V,i){if(V){V=V.trim();}if(V!==this._sLastChangeValue){this._sLastChangeValue=V;D.prototype.fireChangeEvent.call(this,V,i);}};var y=function(A){var C=A._getDisplayFormatPattern(),F,G,H=A._getLocale(),i;if(A._checkStyle(C)){F=k.getInstance(H).getTimePattern(C);}else{C=C.replace(/'/g,"");F=C;}this._oTimePicker=A;this.aOriginalAmPmValues=k.getInstance(H).getDayPeriods("abbreviated");this.aAmPmValues=this.aOriginalAmPmValues.slice(0);this.iAmPmValueMaxLength=Math.max(this.aAmPmValues[0].length,this.aAmPmValues[1].length);for(i=0;i<this.aAmPmValues.length;i++){while(this.aAmPmValues[i].length<this.iAmPmValueMaxLength){this.aAmPmValues[i]+=" ";}}this.b24H=C.indexOf("H")!==-1;this.bLeadingZero=C.indexOf("HH")!==-1||C.indexOf("hh")!==-1;this.sLeadingChar=this.bLeadingZero?"0":" ";this.sAlternativeLeadingChar=this.bLeadingZero?" ":"0";this.sLeadingRegexChar=this.bLeadingZero?"0":"\\s";A.setPlaceholderSymbol(x);F=F.replace(/hh/ig,"h").replace(/h/ig,"h9");if(this.b24H){G="["+this.sLeadingRegexChar+"012]";}else{G="["+this.sLeadingRegexChar+"1]";}this._maskRuleHours=new M({maskFormatSymbol:"h",regex:G});A.addRule(this._maskRuleHours);this.iHourNumber1Index=F.indexOf("h9");this.iHourNumber2Index=this.iHourNumber1Index!==-1?this.iHourNumber1Index+1:-1;this.iMinuteNumber1Index=F.indexOf("mm");F=F.replace(/mm/g,"59");this.iSecondNumber1Index=F.indexOf("ss");F=F.replace(/ss/g,"59");this._maskRuleMinSec=new M({maskFormatSymbol:"5",regex:"[0-5]"});A.addRule(this._maskRuleMinSec);this.aAllowedHours=V.call(this,this.b24H,this.sLeadingChar);this.aAllowedMinutesAndSeconds=W.call(this);this.iAmPmChar1Index=F.indexOf("a");this.iAfterAmPmValueIndex=-1;if(this.iAmPmChar1Index!==-1){this.iAfterAmPmValueIndex=this.iAmPmChar1Index+this.iAmPmValueMaxLength;var J=this.iAmPmValueMaxLength-"a".length;this.shiftIndexes(J);var N=65;var O="";var Q="";var S="";for(i=0;i<this.iAmPmValueMaxLength;i++){Q="[";if(this.aAmPmValues[0][i]){Q+=this.aAmPmValues[0][i];}else{Q+="\\s";}if(this.aAmPmValues[1][i]!==this.aAmPmValues[0][i]){if(this.aAmPmValues[1][i]){Q+=this.aAmPmValues[1][i];}else{Q+="\\s";}}Q+="]";S=String.fromCharCode(N++);O+=S;this._maskRuleChars=new M({maskFormatSymbol:S,regex:Q});A.addRule(this._maskRuleChars);}F=F.replace(/a/g,O);}A.setMask(F);function U(X,Y,Z){var $=[],_,i;for(i=X;i<=Y;i++){_=i.toString();if(i<10){_=Z+_;}$.push(_);}return $;}function V(X,Y){var Z=X?0:1,$=this._oTimePicker.getSupport2400()?24:23,_=X?$:12;return U(Z,_,Y);}function W(){return U(0,59,"0");}};y.prototype.replaceChar=function(C,A,F){var G=A-this.iAmPmChar1Index,H,J,N,S,O,Q,i;if(A===this.iHourNumber1Index&&this.sAlternativeLeadingChar===C){if(this.aAllowedHours.indexOf(this.sLeadingChar+C)!==-1){return this.sLeadingChar+C;}else{return this.sLeadingChar;}}else if(A===this.iHourNumber1Index&&!this._oTimePicker._isCharAllowed(C,A)&&this.aAllowedHours.indexOf(this.sLeadingChar+C)!==-1){return this.sLeadingChar+C;}else if(A===this.iHourNumber2Index&&F[this.iHourNumber1Index]===x){this._oTimePicker._oTempValue.setCharAt(this.sLeadingChar,this.iHourNumber1Index);return C;}else if(A===this.iHourNumber2Index&&this.aAllowedHours.indexOf(F[this.iHourNumber1Index]+C)===-1){return"";}else if((A===this.iMinuteNumber1Index||A===this.iSecondNumber1Index)&&!this._oTimePicker._isCharAllowed(C,A)&&this.aAllowedMinutesAndSeconds.indexOf("0"+C)!==-1){return"0"+C;}else if(G>=0&&A<this.iAfterAmPmValueIndex){H=F.slice(this.iAmPmChar1Index,A);J=this.aAmPmValues[0].slice(0,G);N=this.aAmPmValues[1].slice(0,G);O=this.aAmPmValues[0].slice(G,this.iAfterAmPmValueIndex);Q=this.aAmPmValues[1].slice(G,this.iAfterAmPmValueIndex);S=(J===N);var U="";for(i=G;i<this.iAmPmValueMaxLength;i++){if(this.aAmPmValues[0][i]===this.aAmPmValues[1][i]){U+=this.aAmPmValues[0][i];}else{break;}}if(i===this.iAmPmValueMaxLength||i!==G){return U;}else{if(!S){if(H===J){return O;}else if(H===N){return Q;}else{return C;}}else{if(this.aAmPmValues[0][G].toLowerCase()===C.toLowerCase()&&this.aAmPmValues[0]===H+O){return O;}else if(this.aAmPmValues[1][G].toLowerCase()===C.toLowerCase()&&this.aAmPmValues[1]===H+Q){return Q;}else{return C;}}}}else{return C;}};y.prototype.formatValueWithLeadingTrailingSpaces=function(i){var A=this._oTimePicker.getMask().length;if(this.aOriginalAmPmValues[0]!==this.aAmPmValues[0]){i=i.replace(this.aOriginalAmPmValues[0],this.aAmPmValues[0]);}if(this.aOriginalAmPmValues[1]!==this.aAmPmValues[1]){i=i.replace(this.aOriginalAmPmValues[1],this.aAmPmValues[1]);}while(A>i.length){i=[i.slice(0,this.iHourNumber1Index)," ",i.slice(this.iHourNumber1Index)].join('');}return i;};y.prototype.stripValueOfLeadingSpaces=function(i){if(i[this.iHourNumber1Index]===" "){i=[i.slice(0,this.iHourNumber1Index),i.slice(this.iHourNumber1Index+1)].join('');}return i;};y.prototype.shiftIndexes=function(i){if(this.iAmPmChar1Index<this.iHourNumber1Index){this.iHourNumber1Index+=i;this.iHourNumber2Index+=i;}if(this.iAmPmChar1Index<this.iMinuteNumber1Index){this.iMinuteNumber1Index+=i;}if(this.iAmPmChar1Index<this.iSecondNumber1Index){this.iSecondNumber1Index+=i;}};y.prototype.destroy=function(){if(this._maskRuleHours){this._maskRuleHours.destroy();this._maskRuleHours=null;}if(this._maskRuleMinSec){this._maskRuleMinSec.destroy();this._maskRuleMinSec=null;}if(this._maskRuleChars){this._maskRuleChars.destroy();this._maskRuleChars=null;}};u.prototype._feedReplaceChar=function(C,i,A){return this._oTimeSemanticMaskHelper.replaceChar(C,i,A);};u.prototype._getAlteredUserInputValue=function(V){return V?this._formatValue(this._parseValue(V,true),true):V;};u.prototype.getAccessibilityInfo=function(){var i=this.getRenderer();var A=D.prototype.getAccessibilityInfo.apply(this,arguments);var V=this.getValue()||"";if(this._bValid){var C=this.getDateValue();if(C){V=this._formatValue(C);}}q.extend(true,A,{role:i.getAriaRole(this),type:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_TIMEINPUT"),description:[V,i.getLabelledByAnnouncement(this),i.getDescribedByAnnouncement(this)].join(" ").trim(),autocomplete:"none",haspopup:true});return A;};function z(){var i=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale(),A=k.getInstance(i);return A.getTimePattern(v.Medium);}u.prototype._revertKey=function(i,S){S=S||this._getTextSelection();var A=S.iFrom,C=S.iTo,F=A,G,H;if(!S.bHasSelection){if(i.bBackspace){F=A=this._oRules.previousTo(A);}else if(i.bDelete){G=this.getPlaceholderSymbol();H=this._oTempValue._aContent.length;while((this._oTempValue._aContent[A]===G||this._oTempValue._aInitial[A]!==G)&&A<H){A++;}C=A;}}if(i.bBackspace||(i.bDelete&&S.bHasSelection)){C=C-1;}this._resetTempValue(A,C);this._bCheckForLiveChange=true;this.updateDomValue(this._oTempValue.toString());this._setCursorPosition(Math.max(this._iUserInputStartPosition,F));};u.prototype._getPickerParser=function(){if(!this._clocksParser){this._clocksParser=h.getDateTimeWithTimezoneInstance({showTimezone:false});}return this._clocksParser;};u._PICKER_CONTENT_HEIGHT="25rem";return u;});
