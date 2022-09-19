/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/includes","sap/base/util/values","sap/base/util/restricted/_omit","sap/base/Log","sap/ui/base/ManagedObject","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/dt/ElementUtil","sap/ui/fl/write/api/ChangesWriteAPI","sap/ui/fl/Utils"],function(i,v,_,L,M,J,E,C,F){"use strict";var a=M.extend("sap.ui.rta.util.changeVisualization.ChangeIndicatorRegistry",{metadata:{properties:{commandCategories:{type:"object",defaultValue:[]},rootControlId:{type:"string"}}},constructor:function(){M.prototype.constructor.apply(this,arguments);this._oChangeIndicatorData={};this._oChangeIndicators={};}});a.prototype.exit=function(){this.reset();};a.prototype.getChanges=function(){return v(this._oChangeIndicatorData||{}).map(function(c){return Object.assign({},c);});};a.prototype.getChangeIds=function(){return Object.keys(this._oChangeIndicatorData||{});};a.prototype.getChange=function(c){return this._oChangeIndicatorData[c]&&Object.assign({},this._oChangeIndicatorData[c]);};a.prototype.getChangeIndicatorData=function(){var c={};function d(s,A,o,D){if(c[s]===undefined){c[s]=[];}c[s].push(Object.assign({id:o.change.getId(),dependent:D,affectedElementId:A,payload:o.visualizationInfo.payload||{}},_(o,["visualizationInfo"])));}v(this._oChangeIndicatorData).forEach(function(o){o.visualizationInfo.displayElementIds.forEach(function(s,I){d(s,o.visualizationInfo.affectedElementIds[I],o,false);});o.visualizationInfo.dependentElementIds.forEach(function(s){d(s,s,o,true);});});return c;};a.prototype.getChangeIndicator=function(s){return this._oChangeIndicators[s];};a.prototype.getChangeIndicators=function(){return v(this._oChangeIndicators||{});};a.prototype.registerChange=function(c,s){var A=F.getAppComponentForControl(E.getElementInstance(this.getRootControlId()));return g(c,A).then(function(m){var d=this.getCommandCategories();var e;if(s==="settings"&&i(Object.keys(d),m.payload.category)){e=m.payload.category;}else{e=Object.keys(d).find(function(f){return i(d[f],s);});}this._oChangeIndicatorData[c.getId()]={change:c,commandName:s,commandCategory:e,visualizationInfo:m};}.bind(this));};function g(c,A){function d(s){if(!s){return undefined;}return s.map(function(S){var e=typeof S.getId==="function"?S:J.bySelector(S,A);return e&&e.getId();}).filter(Boolean);}return b(A,c).then(function(I){var V=I||{};var e=d(V.affectedControls||[c.getSelector()]);return{affectedElementIds:e,dependentElementIds:d(V.dependentControls)||[],displayElementIds:d(V.displayControls)||e,payload:V.payload||{}};});}function b(A,c){var o=J.bySelector(c.getSelector(),A);if(o){return C.getChangeHandler({changeType:c.getChangeType(),element:o,modifier:J,layer:c.getLayer()}).then(function(d){if(d&&typeof d.getChangeVisualizationInfo==="function"){return d.getChangeVisualizationInfo(c,A);}return undefined;}).catch(function(e){L.error(e);return undefined;});}return Promise.resolve();}a.prototype.registerChangeIndicator=function(s,c){this._oChangeIndicators[s]=c;};a.prototype.reset=function(){Object.keys(this._oChangeIndicatorData).forEach(function(k){this.removeChange(k);}.bind(this));v(this._oChangeIndicators).forEach(function(I){I.destroy();});this._oChangeIndicators={};};a.prototype.removeChange=function(c){delete this._oChangeIndicatorData[c];};return a;});
