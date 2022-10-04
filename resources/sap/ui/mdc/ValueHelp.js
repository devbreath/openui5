/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/Element","sap/ui/mdc/mixin/PromiseMixin","sap/ui/mdc/condition/Condition","sap/ui/mdc/condition/FilterOperatorUtil","sap/ui/mdc/condition/FilterConverter","sap/ui/mdc/enum/SelectType","sap/ui/mdc/enum/OutParameterMode","sap/ui/mdc/enum/ConditionValidated","sap/ui/model/Context","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/base/ManagedObjectModel","sap/ui/base/ManagedObjectObserver","sap/base/util/merge","sap/base/util/deepEqual","sap/ui/mdc/enum/PropagationReason"],function(e,t,i,n,o,a,r,s,l,p,u,c,d,g,h,f){"use strict";var v=e.extend("sap.ui.mdc.ValueHelp",{metadata:{library:"sap.ui.mdc",properties:{conditions:{type:"object[]",defaultValue:[],byValue:true},delegate:{type:"object",group:"Data",defaultValue:{name:"sap/ui/mdc/ValueHelpDelegate"}},filterValue:{type:"string",defaultValue:""},validateInput:{type:"boolean",defaultValue:true},_config:{type:"object",defaultValue:{},visibility:"hidden"},_valid:{type:"boolean",group:"Appearance",defaultValue:true,visibility:"hidden"}},aggregations:{dialog:{type:"sap.ui.mdc.valuehelp.IDialogContainer",multiple:false},typeahead:{type:"sap.ui.mdc.valuehelp.ITypeaheadContainer",multiple:false}},events:{select:{parameters:{conditions:{type:"object[]"},add:{type:"boolean"},close:{type:"boolean"}}},disconnect:{},closed:{},navigated:{parameters:{leaveFocus:{type:"boolean"},condition:{type:"object"},itemId:{type:"string"}}},switchToValueHelp:{}},defaultProperty:"filterValue"}});v.prototype.init=function(){e.prototype.init.apply(this,arguments);this._oObserver=new d(T.bind(this));this._oObserver.observe(this,{aggregations:["typeahead","dialog"]});this.setBindingContext(null);this._oConditions={}};v.prototype.exit=function(){if(this._oManagedObjectModel){this._oManagedObjectModel.destroy();delete this._oManagedObjectModel}};v.prototype.invalidate=function(e){return};v.prototype.connect=function(e,t){if(this._oControl&&this._oControl!==e){this.close();this.setFilterValue("");this.setConditions([]);this.fireDisconnect()}this._oControl=e;this.setProperty("_config",t,true);I.call(this);return this};v.prototype.getControl=function(){return this._oControl};v.prototype.getDomRef=function(){var e=this.getTypeahead();var t=this.getDialog();if(e&&(e.isOpen()||e.isOpening())){return e.getDomRef()}else if(t&&(t.isOpen()||t.isOpening())){return t.getDomRef()}};v.prototype.getAriaAttributes=function(e){var t=this.getTypeahead();var i=this.getDialog();if(!i&&t&&t.getUseAsValueHelp()){i=t}var n=t&&t.isOpen();var o=i&&i.isOpen();var a=t&&t.getAriaAttributes(e);var r=i&&i.getAriaAttributes(e);var s;var l;var p;var u;if(n){s=a.contentId}else if(o){s=r.contentId}l=t&&a.ariaHasPopup||i&&r.ariaHasPopup;p=t&&a.role||i&&r.role;u=t&&a.roleDescription||i&&r.roleDescription;return{contentId:s,ariaHasPopup:l,role:p,roleDescription:u,valueHelpEnabled:!!i||!!t&&!!t.getUseAsValueHelp()}};v.prototype._retrieveDelegateContent=function(e,t){var i;if(!t){var n=e.getSelectedContent();t=n&&n.getId()}i=this._retrievePromise("delegateContent");var o=this.isOpen();if(!i||i&&o||i&&i.aggregation!==e.sParentAggregationName){var a=function(){return this._getControlDelegatePromise().then(function(i){return i.retrieveContent(this.getPayload(),e,t)}.bind(this))}.bind(this);var r=i&&i.isPending();i=this._addPromise("delegateContent",r?i.getInternalPromise().then(a):a);i.aggregation=e.sParentAggregationName}return i.getInternalPromise()};v.prototype._getControlDelegatePromise=function(e){return this._retrievePromise("delegate",this.initControlDelegate.bind(this))};v.prototype.open=function(e){var t=e?this.getTypeahead():x.call(this);var i=e?this.getDialog():this.getTypeahead();if(i&&t!==i&&(i.isOpen()||i.isOpening())){i.close()}if(t&&!t.isOpen()&&!t.isOpening()){t.open(this._retrieveDelegateContent(t))}};function y(e){var t=e.getSource();this._retrieveDelegateContent(t,e.getParameter("contentId"))}function m(e){this.fireSwitchToValueHelp()}v.prototype.close=function(){var e=this.getTypeahead();var t=this.getDialog();if(e&&e.isOpen()){e.close()}if(t&&t.isOpen()){t.close()}};v.prototype.toggleOpen=function(e){var t=this.getTypeahead();var i=this.getDialog();if(!e&&!i&&t&&t.getUseAsValueHelp()){i=t}var n=t&&t.isOpen();var o=i&&i.isOpen();if(e&&n||!e&&o){this.close()}else if(e&&t||!e&&i){this.open(e)}};v.prototype.isOpen=function(){var e=this.getTypeahead();var t=this.getDialog();return!!(e&&e.isOpen()||t&&t.isOpen())};v.prototype.skipOpening=function(){var e=this.getTypeahead();var t=this.getDialog();if(e&&e.isOpening()){e.close()}if(t&&t.isOpening()){t.close()}};v.prototype.initBeforeOpen=function(e){};v.prototype.isTypeaheadSupported=function(){var e=this.getTypeahead();if(e){return this._retrieveDelegateContent(e).then(function(){return!!e&&e.isTypeaheadSupported()})}else{return Promise.resolve(false)}};v.prototype.shouldOpenOnClick=function(){var e=x.call(this);if(e){return e.shouldOpenOnClick()}return false};v.prototype.isFocusInHelp=function(){var e=x.call(this);return e&&e.isFocusInHelp()};v.prototype.removeFocus=function(){var e=this.getTypeahead();if(e){e.removeFocus()}};v.prototype.navigate=function(e){var t=this.getTypeahead();if(t){var i=function(){if(t.shouldOpenOnNavigate()&&!t.isOpening()&&!t.isOpen()){return t.open(true).then(function(){t.navigate(e)})}return t.navigate(e)};var n=this._retrievePromise("navigate");var o=n&&!n.isSettled()&&n.getInternalPromise();this._addPromise("navigate",o?o.then(i):this._retrieveDelegateContent(t).then(i))}};v.prototype.getTextForKey=function(e,t,i,n,o){return this.getItemForValue({parsedValue:e,value:e,context:t,bindingContext:i,conditionModel:n,conditionModelName:o,checkKey:true,exception:p,caseSensitive:true})};v.prototype.getKeyForText=function(e,t){return this.getItemForValue({value:e,context:t,checkDescription:true,exception:u,caseSensitive:true})};v.prototype.getItemForValue=function(e){var t=this.getTypeahead();if(t){var i=["getItemForValue",e.parsedValue||e.value,JSON.stringify(e.context),e.oBindingContext&&e.oBindingContext.getPath()];var n=i.join("_");return this._retrievePromise(n,function(){return this._retrieveDelegateContent(t).then(function(){e.caseSensitive=e.hasOwnProperty("caseSensitive")?e.caseSensitive:false;var i=t.getItemForValue(e);return i})}.bind(this))}else{return Promise.reject("No Typeahead")}};v.prototype.isValidationSupported=function(){var e=this.getTypeahead();return e&&e.isValidationSupported()};v.prototype.onControlChange=function(){if(this.bIsDestroyed){return}C.call(this,f.ControlChange);I.call(this)};v.prototype.getIcon=function(){var e=this.getTypeahead();var t=this.getDialog();if(t){return t.getValueHelpIcon()}else if(e){return e.getValueHelpIcon()}};v.prototype.getMaxConditions=function(){var e=this.getProperty("_config");return e&&e.maxConditions||-1};v.prototype.getDisplay=function(){};v.prototype.getDataType=function(){};v.prototype.valueHelpEnabled=function(){var e=this.getTypeahead();var t=this.getDialog();if(t){return true}else{return e&&e.getUseAsValueHelp()}};function C(e,t){var i=this.bDelegateInitialized&&this.getControlDelegate();if(i){i.onConditionPropagation(this._oPayload,this,e,t||this.getProperty("_config"))}}function O(e){var t=e.getParameter("condition");this.fireNavigated({condition:t,itemId:e.getParameter("itemId"),leaveFocus:e.getParameter("leaveFocus")})}function b(e){var t=e.getParameter("type");var i=e.getParameter("conditions")||[];var o;var r=this.getMaxConditions()===1;if(r){o=t===a.Remove?[]:i.slice(0,1)}if(t===a.Set){o=[].concat(r?i.slice(0,1):i)}if(t===a.Add){if(r){o=i.slice(0,1)}else{o=this.getConditions();for(var s=0;s<i.length;s++){o.push(i[s])}}}if(t===a.Remove){if(r){o=[]}else{o=this.getConditions();for(var l=0;l<i.length;l++){var p=n.indexOfCondition(i[l],o);if(p>=0){o.splice(p,1)}}}}if(o){this.setProperty("conditions",o,true)}}function P(e){if(this.getProperty("_valid")){var t=this.getMaxConditions()===1;var o=e.getParameter("close");var a=typeof o!=="undefined"?o:t;var r=this.getConditions();var s=!t&&!e.getSource().isMultiSelect();if(a){this.close()}r=i._removeEmptyConditions(r);r=i._removeInitialFlags(r);n.updateConditionsValues(r);this.fireSelect({conditions:r,add:s,close:a});C.call(this,f.Select)}}function _(e){this.close()}function D(e){}function V(e){this._removePromise("delegateContent");this._removePromise("navigate");this.fireClosed()}function T(e){if(["typeahead","dialog"].indexOf(e.name)!==-1){var t=e.child;var i=e.mutation==="insert";var n=i?t.attachEvent.bind(t):t.detachEvent.bind(t);n("select",b,this);n("requestDelegateContent",y,this);n("confirm",P,this);n("cancel",_,this);n("opened",D,this);n("closed",V,this);if(t.attachRequestSwitchToDialog){n("requestSwitchToDialog",m,this)}if(t.attachNavigated){n("navigated",O,this)}if(i){if(!this._oManagedObjectModel){this._oManagedObjectModel=new c(this)}t.setModel(this._oManagedObjectModel,"$valueHelp")}}}function I(){var e=this._oControl?this._oControl.getBindingContext():null;this.setBindingContext(e)}function x(){var e=this.getDialog();if(!e){var t=this.getTypeahead();if(t&&t.getUseAsValueHelp()){e=t}}return e}t.call(v.prototype);return v});
//# sourceMappingURL=ValueHelp.js.map