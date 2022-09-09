/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/library","sap/ui/mdc/field/FieldBase","sap/ui/mdc/field/FieldBaseRenderer","sap/ui/mdc/condition/Condition","sap/ui/mdc/enum/ConditionValidated"],function(t,e,i,n,o){"use strict";var a=e.extend("sap.ui.mdc.MultiValueField",{metadata:{library:"sap.ui.mdc",designtime:"sap/ui/mdc/designtime/field/MultiValueField.designtime",properties:{delegate:{type:"object",defaultValue:{name:"sap/ui/mdc/field/MultiValueFieldDelegate",payload:{}}}},aggregations:{items:{type:"sap.ui.mdc.field.MultiValueFieldItem",multiple:true,singularName:"item"}},defaultAggregation:"items",events:{change:{parameters:{items:{type:"sap.ui.mdc.field.MultiValueFieldItem[]"},valid:{type:"boolean"},promise:{type:"Promise"}}}}},renderer:i});a.prototype.init=function(){e.prototype.init.apply(this,arguments);this._oObserver.observe(this,{aggregations:["items"]})};a.prototype.exit=function(){e.prototype.exit.apply(this,arguments);if(this._iConditionUpdateTimer){clearTimeout(this._iConditionUpdateTimer);delete this._iConditionUpdateTimer}};a.prototype.bindAggregation=function(t,i){if(t==="items"&&!i.formatter){s.call(this,i)}e.prototype.bindAggregation.apply(this,arguments)};function s(t){if(t.template&&t.template.mBindingInfos.key){var e=t.template.mBindingInfos.key;if(e.type&&(!this._oDataType||this._oDataType.getMetadata().getName()!==e.type.getMetadata().getName())){this._oContentFactory.setDataType(e.type);this.invalidate()}}}a.prototype._handleModelContextChange=function(t){e.prototype._handleModelContextChange.apply(this,arguments);if(!this._oDataType){var i=this.getBinding("items");if(i){s.call(this,i)}}};a.prototype._initDataType=function(){e.prototype._initDataType.apply(this,arguments);var t=this.getBindingInfo("items");if(t){s.call(this,t)}};a.prototype.setMaxConditions=function(t){if(t===1){throw new Error("Multiple Conditions needed on MultiValueField "+this)}return this.setProperty("maxConditions",t,true)};a.prototype._observeChanges=function(t){e.prototype._observeChanges.apply(this,arguments);if(t.name==="items"){r.call(this,t.child,t.mutation)}if(t.name==="key"){d.call(this)}if(t.name==="description"){d.call(this)}if(t.name==="conditions"){p.call(this,t.current)}};function r(t,e){if(e==="insert"){this._oObserver.observe(t,{properties:true})}else{this._oObserver.unobserve(t)}if(!this._bMyItemUpdate){d.call(this)}}function p(t){if(this._bConditionsUpdateFromItems){return}if(!this.bDelegateInitialized){this.awaitControlDelegate().then(function(){if(!this.bIsDestroyed){p.call(this.getConditions())}}.bind(this));return}this.getControlDelegate().updateItems(this.getPayload(),t,this)}function d(){if(!this.bDelegateInitialized){this.awaitControlDelegate().then(function(){if(!this.bIsDestroyed){d.call(this)}}.bind(this));return}if(!this._iConditionUpdateTimer){this._iConditionUpdateTimer=setTimeout(function(){l.call(this);this._iConditionUpdateTimer=undefined}.bind(this),0)}}function l(){var t=this.getItems();var e=[];for(var i=0;i<t.length;i++){var a=t[i];var s=n.createItemCondition(a.getKey(),a.getDescription());s.validated=o.Validated;e.push(s)}this._bConditionsUpdateFromItems=true;this.setConditions(e);this._bConditionsUpdateFromItems=false}a.prototype._fireChange=function(t,e,i,n){this.fireChange({items:this.getItems(),valid:e,promise:n})};a.prototype._getResultForPromise=function(t){return this.getItems()};a.prototype._getOperators=function(){return["EQ"]};a.prototype._checkCreateInternalContent=function(){if(!this.bIsDestroyed&&this._oContentFactory.getDataType()&&!this._isPropertyInitial("editMode")){e.prototype._checkCreateInternalContent.apply(this,arguments)}};return a});
//# sourceMappingURL=MultiValueField.js.map