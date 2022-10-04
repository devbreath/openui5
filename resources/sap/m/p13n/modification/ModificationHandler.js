/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/util/reflection/JsControlTreeModifier"],function(e,n){"use strict";var t;var r=e.extend("sap.m.p13n.modification.ModificationHandler");var i=new WeakMap;r.prototype.processChanges=function(e,t){var r=[];e.forEach(function(e){var t=e.changeSpecificData.content;var i=e.selectorElement;var o=e.changeSpecificData.changeType;var a={getContent:function(){return t},getChangeType:function(){return o},getControl:function(){return i},setRevertData:function(){}};var c=new Promise(function(e){sap.ui.require(["sap/m/flexibility/EngineFlex"],function(t){var r=t[o].changeHandler.applyChange(a,i,{modifier:n});e(r)})});r.push(c)});return Promise.all(r)};r.prototype.waitForChanges=function(e,n){return Promise.resolve()};r.prototype.reset=function(e,n){var t=e.selector;return sap.m.p13n.Engine.getInstance().applyState(t,i.get(t),true)};r.prototype.initialize=function(e){var n,t;n=sap.m.p13n.Engine.getInstance().retrieveState(e).then(function(n){t=n;i.set(e,t)});return n};r.prototype.isModificationSupported=function(e,n){return false};r.prototype.initialize=function(e){return Promise.resolve()};r.getInstance=function(){if(!t){t=new r}return t};return r});
//# sourceMappingURL=ModificationHandler.js.map