/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/InvisibleText","sap/ui/core/Element","sap/ui/core/Control","sap/ui/core/ListItem","sap/ui/core/library","sap/ui/core/Renderer","sap/ui/core/message/MessageMixin","sap/m/DynamicDateFormat","sap/m/DynamicDateUtil","sap/ui/core/IconPool","sap/ui/core/Icon","sap/ui/core/LabelEnablement","sap/ui/core/format/DateFormat","sap/ui/core/format/TimezoneUtil","sap/ui/base/ManagedObjectObserver","sap/ui/Device","./Label","./GroupHeaderListItem","./StandardListItem","./StandardListItemRenderer","./Button","./List","./Input","./InputRenderer","./Toolbar","./ResponsivePopover","./Page","./NavContainer","./DynamicDateRangeRenderer","./StandardDynamicDateOption","./library","sap/ui/thirdparty/jquery","sap/ui/core/Configuration","sap/ui/dom/jquery/Focusable"],function(t,e,i,o,n,a,r,s,p,u,l,h,g,c,d,_,f,y,v,T,m,O,I,A,D,E,S,b,R,C,P,jQuery,V){"use strict";var F=n.ValueState,L=P.ToolbarDesign,N=P.ToolbarStyle,M=P.ListType,B=P.ListMode,x=P.ListSeparators,Y=sap.ui.getCore().getLibraryResourceBundle("sap.m");var H=i.extend("sap.m.DynamicDateRange",{metadata:{library:"sap.m",properties:{value:{type:"object"},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},valueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:F.None},name:{type:"string",group:"Misc",defaultValue:null},placeholder:{type:"string",group:"Misc",defaultValue:null},editable:{type:"boolean",group:"Behavior",defaultValue:true},valueStateText:{type:"string",group:"Misc",defaultValue:null},required:{type:"boolean",group:"Misc",defaultValue:false},enableGroupHeaders:{type:"boolean",group:"Behavior",defaultValue:true},formatter:{type:"object"},options:{type:"string[]",group:"Behavior",defaultValue:["DATE","TODAY","YESTERDAY","TOMORROW","FIRSTDAYWEEK","LASTDAYWEEK","FIRSTDAYMONTH","LASTDAYMONTH","FIRSTDAYQUARTER","LASTDAYQUARTER","FIRSTDAYYEAR","LASTDAYYEAR","DATERANGE","DATETIMERANGE","FROM","TO","FROMDATETIME","TODATETIME","YEARTODATE","DATETOYEAR","LASTDAYS","LASTWEEKS","LASTMONTHS","LASTQUARTERS","LASTYEARS","NEXTDAYS","NEXTWEEKS","NEXTMONTHS","NEXTQUARTERS","NEXTYEARS","TODAYFROMTO","THISWEEK","LASTWEEK","NEXTWEEK","SPECIFICMONTH","SPECIFICMONTHINYEAR","THISMONTH","LASTMONTH","NEXTMONTH","THISQUARTER","LASTQUARTER","NEXTQUARTER","QUARTER1","QUARTER2","QUARTER3","QUARTER4","THISYEAR","LASTYEAR","NEXTYEAR","DATETIME"]},hideInput:{type:"boolean",group:"Misc",defaultValue:false}},aggregations:{_input:{type:"sap.m.Input",multiple:false,visibility:"hidden"},_popup:{type:"sap.m.ResponsivePopover",multiple:false,visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}},events:{change:{parameters:{value:{type:"object"},valid:{type:"boolean"}}}}},renderer:R});r.call(H.prototype);H.prototype.init=function(){this._oInput=new U(this.getId()+"-input",{showValueHelp:true,valueHelpIconSrc:u.getIconURI("sap-icon://check-availability"),valueHelpRequest:this._toggleOpen.bind(this),showSuggestion:true,suggest:this._handleSuggest.bind(this)});this._oListItemDelegate=undefined;this._onBeforeInputRenderingDelegate={onBeforeRendering:function(){this._oInput._getValueHelpIcon().setVisible(true)}};this._oInput._getValueHelpIcon().setTooltip(Y.getText("INPUT_VALUEHELP_BUTTON"));this._oInput.addDelegate(this._onBeforeInputRenderingDelegate,this);this.setAggregation("_input",this._oInput,false);this._oInput._setControlOrigin(this);this._oInput.attachChange(this._handleInputChange,this);this.oValueObserver=new d(function(){delete this.oBoundValueFormatter}.bind(this));this.oValueObserver.observe(this,{bindings:["value"]})};H.prototype.exit=function(){this._oInput.removeDelegate(this._onBeforeInputRenderingDelegate);this._onBeforeInputRenderingDelegate=undefined;this.oValueObserver.destroy();this._infoDatesFooter=undefined;this.aInputControls=undefined;this._removeAllListItemDelegates()};H.prototype._removeAllListItemDelegates=function(){if(this._oOptionsList){this._oOptionsList.getItems().forEach(function(t){t.removeDelegate(this._oListItemDelegate)},this)}};H.prototype.onBeforeRendering=function(){this._updateInputValue(this.getValue());this._oInput.setEditable(this.getEditable());this._oInput.setEnabled(this.getEnabled());this._oInput.setRequired(this.getRequired());this._oInput.setName(this.getName());this._oInput.setWidth(this.getWidth());this._oInput.setPlaceholder(this.getPlaceholder());this._oInput.setValueState(this.getValueState());this._oInput.setValueStateText(this.getValueStateText());this.setValue(this._substitudeMissingValue(this.getValue()))};H.prototype.setValue=function(t){var e=t&&t.operator;t=this._substitudeValue(t);this.setProperty("value",t);this._oSelectedOption=p.getOption(e);this._updateInputValue(t);return this};H.prototype._toggleOpen=function(){if(this._oPopup&&this._oPopup.isOpen()){this._closePopup()}else{this.open()}};H.prototype.open=function(t){if(this.getEditable()&&this.getEnabled()){this._createPopup();this._createPopupContent();if(!this._oListItemDelegate){this._oListItemDelegate={onsapshow:this._closePopup.bind(this),onsaphide:this._closePopup.bind(this)}}this._removeAllListItemDelegates();this._oOptionsList.destroyAggregation("items");this._collectValueHelpItems(this._getOptions(),true).map(function(t){if(typeof t==="string"){return this._createHeaderListItem(t)}if(t.getKey()==="FROMDATETIME"){t._bAdditionalTimeText=!!this._findOption("FROM")}else if(t.getKey()==="TODATETIME"){t._bAdditionalTimeText=!!this._findOption("TO")}else if(t.getKey()==="DATETIMERANGE"){t._bAdditionalTimeText=!!this._findOption("DATERANGE")}return this._createListItem(t)},this).forEach(function(t){t.addDelegate(this._oListItemDelegate,this);this._oOptionsList.addItem(t)},this);this._oNavContainer.to(this._oNavContainer.getPages()[0]);this._openPopup(t)}};H.prototype._findOption=function(t){return this._getOptions().find(function(e){return e.getKey()===t})};H.prototype.addOption=function(t){var e=this.getOptions();if(e.indexOf(t)===-1){e.push(t)}this.setOptions(e)};H.prototype.getFocusDomRef=function(){return this.getAggregation("_input")&&this.getAggregation("_input").getFocusDomRef()};H.prototype._updateInputValue=function(t){var e;if(t&&t.operator!=="PARSEERROR"){e=this._enhanceInputValue(this._formatValue(t),t);this._oInput.setValue(e)}else if(t===undefined){this._oInput.setValue("")}};H.prototype._handleSuggest=function(t){if(this._oPopup&&this._oPopup.isOpen()){this._closePopup()}var e=t.getParameter("suggestValue");this._oInput.removeAllSuggestionItems();var i=this._getOptions().filter(function(t){var i={operator:t.getKey(),values:[]},o=t.getValueHelpUITypes(this);if(o.length&&o[0].getType()){return false}var n=p.getOption(i.operator).format(i,this._getFormatter()).toLowerCase();var a=n.indexOf(e.toLowerCase());return a===0||a>0&&n[a-1]===" "},this);this._collectValueHelpItems(i,true).forEach(function(t){if(t.getKey){var e={operator:t.getKey(),values:[]};this._addSuggestionItem(e)}else{this._addSuggestionGroupItem(t)}},this);var o=e.match(/\d+/);if(!o){return}i=this._getOptions().filter(function(t){return t.getValueHelpUITypes(this).length===1&&t.getValueHelpUITypes(this)[0].getType()==="int"},this);this._collectValueHelpItems(i,false).forEach(function(t){if(t.getKey){var e={operator:t.getKey(),values:[parseInt(o[0])]};this._addSuggestionItem(e)}else{this._addSuggestionGroupItem(t)}},this)};H.prototype._getOptions=function(){var t=this.getOptions();var e=t.map(function(t){return p.getOption(t)},this);return e.filter(function(t){return!!t})};H.prototype._getDatesLabelFormatter=function(){var t,e=this._oSelectedOption?this._oSelectedOption.getValueHelpUITypes():[],i=e&&e.length?e[0].getType():"";if(!this._oDatesLabelFormatter){switch(i){case"datetime":t=Object.create(this._getFormatter()._dateTimeFormatter.oFormatOptions);t.singleIntervalValue=true;t.interval=true;this._oDatesLabelFormatter=g.getDateTimeInstance(t);break;default:t=Object.create(this._getFormatter()._dateFormatter.oFormatOptions);t.singleIntervalValue=true;t.interval=true;this._oDatesLabelFormatter=g.getInstance(t)}}return this._oDatesLabelFormatter};H.prototype._destroyInputControls=function(){if(!this.aInputControls){return}this.aInputControls.forEach(function(t){t.destroy()});this.aInputControls=undefined};H.prototype._addSuggestionItem=function(t){var e=this._checkFormatterUTCTimezone(t);var i=p.toDates(t);var n=[];for(var a=0;a<i.length;a++){n[a]=this._convertDate(i[a],e)}var r=new o({text:p.getOption(t.operator).format(t,this._getFormatter()),additionalText:this._getDatesLabelFormatter().format(n)});this._oInput.addSuggestionItem(r)};H.prototype._addSuggestionGroupItem=function(t){this._oInput.addSuggestionItemGroup({text:t})};H.prototype._handleInputChange=function(t){var e=t.getParameter("value");var i=this._parseValue(this._stripValue(e));var o=this.getValue();var n=e.trim()===""||!!i;if(!n){this.setValue({operator:"PARSEERROR",values:[Y.getText("DDR_WRONG_VALUE"),e]})}else{this.setValue(i)}this.fireChange({value:this.getValue(),prevValue:o,valid:n})};H.prototype._enhanceInputValue=function(t,e){if(p.getOption(e.operator).enhanceFormattedValue()||e.operator==="LASTDAYS"&&e.values[0]<=1||e.operator==="NEXTDAYS"&&e.values[0]<=1){return t+" ("+this._toDatesString(e)+")"}return t};H.prototype._stripValue=function(t){var e=t.indexOf("(");var i=t.lastIndexOf(")");var o=t;if(e!==-1&&i!==-1&&e<i){o=t.slice(0,e)+t.slice(i+1);o=o.trim()}return o};H.prototype._toDatesString=function(t){var e=this._checkFormatterUTCTimezone(t);var i=p.toDates(t);var o=[];for(var n=0;n<i.length;n++){o[n]=this._convertDate(i[n],e)}return this._getDatesLabelFormatter().format(o)};H.prototype._convertDate=function(t,e){var i=this._getPickerParser().format(t,c.getLocalTimezone());var o=e?"UTC":V.getTimezone();var n=this._getPickerParser().parse(i,o);var a=n?new Date(n[0].getTime()):n;return a};H.prototype._reverseConvertDate=function(t){var e=this._getPickerParser().format(t,V.getTimezone());var i=this._getPickerParser().parse(e,c.getLocalTimezone());var o=i?new Date(i[0].getTime()):i;return o};H.prototype._getPickerParser=function(){if(!this._calendarParser){this._calendarParser=g.getDateTimeWithTimezoneInstance({showTimezone:false})}return this._calendarParser};H.prototype._createPopup=function(){if(!this._oPopup){this._oPopup=new E(this.getId()+"-RP",{contentHeight:"512px",contentWidth:"320px",showCloseButton:false,showArrow:false,showHeader:false,placement:P.PlacementType.VerticalPreferedBottom,ariaLabelledBy:[t.getStaticId("sap.m","INPUT_AVALIABLE_VALUES")]});this._oPopup.addStyleClass("sapMDDRPopover");if(_.system.phone){this._oPopup.addStyleClass("sapUiNoContentPadding")}else{this._oPopup._oControl._getSingleNavContent=function(){return null}}this._oPopup.attachAfterOpen(function(){var t=this._oNavContainer.getPages()[0];this._applyNavContainerPageFocus(t);this.invalidate()},this);this._oPopup.attachAfterClose(function(){this._oPreviousSelectedOption=this._oSelectedOption;this._setFooterVisibility(false);this.invalidate()},this);this._oPopup.setBeginButton(new m({type:P.ButtonType.Emphasized,text:Y.getText("DYNAMIC_DATE_RANGE_CONFIRM"),press:this._applyValue.bind(this)}));this._oPopup.setEndButton(new m({text:Y.getText("DYNAMIC_DATE_RANGE_CANCEL"),press:function(){this._oSelectedOption=this._oPreviousSelectedOption;this._oDatesLabelFormatter=null;this._closePopup()}.bind(this)}));this._setFooterVisibility(false);this._oPopup._getPopup().setAutoClose(true);this.setAggregation("_popup",this._oPopup,true)}};H.prototype._collectValueHelpItems=function(t,e){var i;var o;var n=[];var a=t;var r=p.getStandardKeys();a.sort(function(t,e){var i=t.getGroup()-e.getGroup();if(i){return i}return r.indexOf(t.getKey())-r.indexOf(e.getKey())});if(e){a=a.reduce(function(t,e){if(C.LastXKeys.indexOf(e.getKey())!==-1){if(i){return t}i=true}if(C.NextXKeys.indexOf(e.getKey())!==-1){if(o){return t}o=true}t.push(e);return t},[])}if(this.getEnableGroupHeaders()){a=a.reduce(function(t,e){var i=e.getGroupHeader();if(n.indexOf(i)===-1){n.push(i);t.push(i)}t.push(e);return t},[])}return a};H.prototype._createListItem=function(t){var e=this._isFixedOption(t);return new K(this.getId()+"-option-"+t.getKey().replaceAll(" ",""),{type:e?M.Active:M.Navigation,title:t.getText(this),wrapping:true,optionKey:t.getKey(),press:this._handleOptionPress.bind(this)})};H.prototype._createHeaderListItem=function(t){var e=new y;e.setTitle(t);e._bGroupHeader=true;return e};H.prototype._handleOptionPress=function(t){var e=t.getSource().getOptionKey(),i=p.getOption(e);if(this._oPreviousSelectedOption&&this._oPreviousSelectedOption.getKey()!==e){this._oDatesLabelFormatter=null}this._oPreviousSelectedOption=this._oSelectedOption;this._oSelectedOption=i;if(this._isFixedOption(i)){this._applyValue()}else{var o=this._createInfoDatesFooter();this._destroyInputControls();this.aInputControls=i.createValueHelpUI(this,this._updateInternalControls.bind(this));var n=this._oNavContainer.getPages()[1];n.removeAllContent();this.aInputControls.forEach(function(t){n.addContent(t)});n.setFooter(o);n.setTitle(i.getText(this));this._setFooterVisibility(true);this._updateInternalControls(i);this._oNavContainer.to(n)}};H.prototype._isFixedOption=function(t){return!t.getValueHelpUITypes(this).length};H.prototype._createInfoDatesFooter=function(){this._infoDatesFooter=new D({design:L.Info,style:N.Clear,content:[new f({text:Y.getText("DDR_INFO_DATES_EMPTY_HINT")})]});return this._infoDatesFooter};H.prototype._getDatesLabel=function(){return this._infoDatesFooter.getContent()[0]};H.prototype._updateDatesLabel=function(){var t=this._oSelectedOption.getValueHelpOutput(this),e=this._checkFormatterUTCTimezone(t),i=[],o;var n=p.toDates(t);if(!t||!t.operator||!p.getOption(t.operator)){return}for(var a=0;a<n.length;a++){i[a]=this._convertDate(n[a],e)}if(i){if(this._oSelectedOption.getKey()==="FROMDATETIME"||this._oSelectedOption.getKey()==="TODATETIME"||this._oSelectedOption.getKey()==="FROM"||this._oSelectedOption.getKey()==="TO"){i.push(null)}o=this._getDatesLabelFormatter().format(i);this._getDatesLabel().setText(Y.getText("DDR_INFO_DATES",[o]))}};H.prototype._setApplyButtonEnabled=function(t){if(!this._oPopup){return}var e=this._oPopup.getBeginButton();if(e.getVisible()){e.setEnabled(t)}};H.prototype._updateInternalControls=function(t){var e=t.validateValueHelpUI(this);if(e){this._updateDatesLabel()}this._setApplyButtonEnabled(e)};H.prototype._setFooterVisibility=function(t){var e;if(!this._oPopup){return}e=this._oPopup.getAggregation("_popup");if(_.system.phone){this._oPopup.getBeginButton().setVisible(t)}else{e.getFooter().setVisible(t)}e.invalidate();return this};H.prototype._createPopupContent=function(){var t=new S({showHeader:false,showNavButton:false}),e=new S({showHeader:true,showNavButton:true}).addStyleClass("sapMDynamicDateRangePopover");e.attachNavButtonPress(function(){this._setFooterVisibility(false);this._oNavContainer.back()},this);if(_.system.phone){t.setShowHeader(true);t.setTitle(this._getOptionsPageTitleText())}if(!this._oOptionsList){this._oOptionsList=new O({showSeparators:x.None,mode:B.SingleSelectMaster})}if(!this._oNavContainer){this._oNavContainer=new b({autoFocus:false});this._oNavContainer.addPage(t);this._oNavContainer.setInitialPage(t);this._oNavContainer.addPage(e);this._oNavContainer.attachAfterNavigate(this._navContainerAfterNavigate,this);this._oPopup.addContent(this._oNavContainer)}this._oNavContainer.getPages()[0].removeAllContent();this._oNavContainer.getPages()[0].addContent(this._oOptionsList);return this._oOptionsList};H.prototype._applyNavContainerPageFocus=function(t){var e=this.getValue(),i=this._oNavContainer.getPages()[0],o;if(t===i&&e){o=this._oOptionsList.getItems().find(function(t){return t.isA("sap.m.DynamicDateRangeListItem")&&t.getOptionKey()===e.operator})}if(!o){o=jQuery(t.getDomRef().querySelector("section")).firstFocusableDomRef()}o.focus();o&&o.setSelected&&o.setSelected(true);this._reApplyFocusToElement(t,e)};H.prototype._reApplyFocusToElement=function(t,e){};H.prototype._getOptionsPageTitleText=function(){return h.getReferencingLabels(this).concat(this.getAriaLabelledBy()).reduce(function(t,i){var o=e.registry.get(i);return t+" "+(o.getText?o.getText():"")},"").trim()};H.prototype._navContainerAfterNavigate=function(t){var e=this._oNavContainer.getPages()[1],i=t.getParameters()["to"];if(i===e){this.aInputControls.forEach(function(t){if(t.$().firstFocusableDomRef()){t.addAriaLabelledBy&&t.addAriaLabelledBy(i.getId()+"-title");if(!this._isCalendarBasedControl(t)&&t.addAriaDescribedBy){t.addAriaDescribedBy(i.getFooter().getContent()[0])}}},this)}if(this._oPopup&&this._oPopup.isOpen()){this._applyNavContainerPageFocus(i)}else{this.focus()}};H.prototype._isCalendarBasedControl=function(t){return t.isA("sap.ui.unified.Calendar")||t.isA("sap.ui.unified.calendar.CustomMonthPicker")||t.isA("sap.ui.unified.calendar.MonthPicker")||t.isA("sap.ui.unified.calendar.YearPicker")||t.isA("sap.ui.unified.calendar.YearRangePicker")||t.isA("sap.ui.unified.calendar.Month")};H.prototype.openBy=function(t){this.open(t)};H.prototype._openPopup=function(t){if(!this._oPopup){return}this._oPopup._getPopup().setExtraContent([this._oInput.getDomRef()]);this._oPopup.openBy(t||this._oInput)};H.prototype._applyValue=function(){this._oOutput=this._oSelectedOption.getValueHelpOutput(this);var t=this._checkFormatterUTCTimezone(this._oOutput);var e=p.toDates(this._oOutput);for(var i=0;i<e.length;i++){if(this._oOutput.values[i]instanceof Date){this._oOutput.values[i]=this._convertDate(e[i],t)}}var o=this.getValue();this.setValue(this._oOutput);this.fireChange({prevValue:o,value:this.getValue(),valid:true});this._closePopup()};H.prototype._closePopup=function(){this._setFooterVisibility(false);this._oNavContainer.to(this._oNavContainer.getPages()[0]);this._oPopup.close()};H.prototype._getFormatter=function(){var t=this.getFormatter(),e;if(t){return t}if(this.oBoundValueFormatter){return this.oBoundValueFormatter}e=this.getBinding("value");if(e&&e.getType()){this.oBoundValueFormatter=s.getInstance(e.getType().oFormatOptions);return this.oBoundValueFormatter}if(!this.oDefaultFormatter){this.oDefaultFormatter=s.getInstance()}return this.oDefaultFormatter};H.prototype._formatValue=function(t){return p.getOption(t.operator).format(t,this._getFormatter())};H.prototype._parseValue=function(t){var e=p.parse(t,this._getFormatter(),this.getOptions()).filter(function(t){return this.getOptions().indexOf(t.operator)!==-1},this);return e.length?e[0]:null};H.prototype._substitudeValue=function(t){var e,i,o;if(!t||!t.operator||!t.values){return t}e=t.operator;i=t.values;if(e==="LASTDAYS"&&i[0]===1&&this.getOptions().includes("YESTERDAY")){o={operator:"YESTERDAY",values:[]}}else if(e==="NEXTDAYS"&&i[0]===1&&this.getOptions().includes("TOMORROW")){o={operator:"TOMORROW",values:[]}}else if((e==="LASTDAYS"||e==="NEXTDAYS")&&i[0]===0){o={operator:"TODAY",values:[]}}return o?o:t};H.prototype.getIdForLabel=function(){return this.getAggregation("_input").getIdForLabel()};H.prototype._substitudeMissingValue=function(t){var e=t;if(t&&t.operator==="YESTERDAY"&&!this.getOptions().includes("YESTERDAY")&&this.getOptions().includes("LASTDAYS")){e={operator:"LASTDAYS",values:[1]}}else if(t&&t.operator==="TOMORROW"&&!this.getOptions().includes("TOMORROW")&&this.getOptions().includes("NEXTDAYS")){e={operator:"NEXTDAYS",values:[1]}}return e};H.prototype._checkFormatterUTCTimezone=function(t){return this._getFormatter()._checkFormatterUTCTimezone(t.operator)};var w=a.extend(A);w.apiVersion=2;w.writeInnerAttributes=function(t,e){var i=e._getControlOrigin?e._getControlOrigin():null,o=this.getAccessibilityState(e);if(i&&i.isA("sap.m.DynamicDateRange")){t.accessibilityState(i,o)}t.attr("type","text")};w.getAccessibilityState=function(t){var e=A.getAccessibilityState(t),i=t._getControlOrigin(),o=i.getAriaLabelledBy(),a=h.getReferencingLabels(i),r=i.getAriaDescribedBy().join(" "),s;s=a.concat(o).join(" ");if(r){e.describedby=r}if(s){e.labelledby=s}e.roledescription=Y.getText("ACC_CTR_TYPE_DYNAMIC_DATE_RANGE");e.role=this.getAriaRole();e.haspopup=n.aria.HasPopup.ListBox.toLowerCase();e.autocomplete="list";e.controls=i._oPopup&&i._oPopup.getDomRef()?i._oPopup.getDomRef().id:undefined;return e};var U=I.extend("sap.m.internal.DynamicDateRangeInput",{metadata:{library:"sap.m"},renderer:w});U.prototype._setControlOrigin=function(t){this._oOriginControl=t;return this._oOriginControl};U.prototype._getControlOrigin=function(){return this._oOriginControl};U.prototype.preventChangeOnFocusLeave=function(t){return this.bFocusoutDueRendering};U.prototype.shouldSuggetionsPopoverOpenOnMobile=function(t){var e=t.srcControl instanceof l;return this.isMobileDevice()&&this.getEditable()&&this.getEnabled()&&this.getShowSuggestion()&&!e&&!this._bClearButtonPressed};U.prototype.onfocusin=function(t){var e=this._getControlOrigin()._oPopup;I.prototype.onfocusin.apply(this,arguments);if(e&&e.isOpen()&&!_.system.tablet&&!_.system.mobile){this._getControlOrigin()._closePopup()}};var K=v.extend("sap.m.DynamicDateRangeListItem",{metadata:{library:"sap.m",properties:{optionKey:{type:"string",group:"Misc",defaultValue:null}}},renderer:T});K.prototype.hasActiveType=function(){return true};K.prototype.isIncludedIntoSelection=function(){return false};K.prototype.onsapspace=function(t){t.preventDefault()};K.prototype.getNavigationControl=function(){var t=v.prototype.getNavigationControl.apply(this,arguments),e=this.getOptionKey(),i=p.getOption(e).getValueTypes(),o=["SPECIFICMONTH","DATE","DATERANGE","FROM","TO"].includes(e),n=i&&i.length&&i[0]==="datetime",a;if(o||n){t.addStyleClass("sapMDDRDateOption");a=o?u.getIconURI("appointment-2"):u.getIconURI("date-time")}else{a=u.getIconURI("slim-arrow-right")}t.setSrc(a);return t};return H});
//# sourceMappingURL=DynamicDateRange.js.map