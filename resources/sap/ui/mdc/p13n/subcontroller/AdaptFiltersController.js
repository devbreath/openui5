/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseController","sap/ui/mdc/p13n/P13nBuilder","sap/base/util/merge"],function(t,e,r){"use strict";var i=t.extend("sap.ui.mdc.p13n.subcontroller.AdaptFiltersController",{constructor:function(){t.apply(this,arguments);this._bResetEnabled=true}});i.prototype.getUISettings=function(){return{verticalScrolling:false,title:sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc").getText("filterbar.ADAPT_TITLE"),afterClose:function(t){var e=t.getSource();if(e){e.getContent()[0].executeRemoves();e.removeAllContent();e.destroy()}}}};i.prototype.getBeforeApply=function(){var t=this.getAdaptationControl().getInbuiltFilter();var e=t?t.createConditionChanges():Promise.resolve([]);return e};i.prototype.getFilterControl=function(){return this.getAdaptationControl()};i.prototype.getChangeOperations=function(){return{add:"addFilter",remove:"removeFilter",move:"moveFilter"}};i.prototype.getAdaptationUI=function(t){return this.getAdaptationControl().retrieveInbuiltFilter().then(function(e){var r=this._getP13nModel(t);e.setP13nData(r.oData);e.setLiveMode(false);return e.createFilterFields().then(function(){return e})}.bind(this))};i.prototype.update=function(){t.prototype.update.apply(this,arguments);this.getAdaptationControl().getInbuiltFilter().createFilterFields()};i.prototype.mixInfoAndState=function(t){var r=this.getAdaptationControl().getCurrentState().filter||{};var i=this.getCurrentState();var n=e.arrayToMap(i);var o=e.prepareAdaptationData(t,function(t,e){var i=n[e.name];var o=r[e.name];t.visible=i?true:false;t.visibleInDialog=true;t.position=i?i.position:-1;t.isFiltered=o&&o.length>0?true:false;t.required=e.required;return!(e.hiddenFilter===true||e.name=="$search")},true);e.sortP13nData({visible:"visible",position:"position"},o.items);return o};return i});
//# sourceMappingURL=AdaptFiltersController.js.map