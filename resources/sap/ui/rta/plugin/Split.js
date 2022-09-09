/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/rta/plugin/Plugin","sap/ui/dt/Util","sap/ui/fl/Utils","sap/base/util/uid"],function(t,e,n,i){"use strict";var r=t.extend("sap.ui.rta.plugin.Split",{metadata:{library:"sap.ui.rta",properties:{},associations:{},events:{}}});r.prototype._isEditable=function(t){var e=this.getAction(t);if(e&&e.changeOnRelevantContainer){return this._checkChangeHandlerAndStableId(t)}return Promise.resolve(false)};r.prototype.isAvailable=function(t){if(t.length!==1){return false}var e=t[0];if(!this._isEditableByPlugin(e)){return false}var n=this.getAction(e);var i=e.getElement();if(n&&n.getControlsCount(i)<=1){return false}return true};r.prototype.isEnabled=function(t){var e=t[0];var n=this.getAction(e);if(!n||!this.isAvailable(t)){return false}var i=true;if(typeof n.isEnabled!=="undefined"){if(typeof n.isEnabled==="function"){i=n.isEnabled(e.getElement())}else{i=n.isEnabled}}return i};r.prototype.handleSplit=function(t){var r=t.getElement();var a=r.getParent();var o=t.getDesignTimeMetadata();var s=this.getAction(t).getControlsCount(r);var l=n.getViewForControl(r);var u=[];for(var p=0;p<s;p++){u.push(l.createId(i()))}var c=this.getAction(t);var d=this.getVariantManagementReference(t,c);return this.getCommandFactory().getCommandFor(r,"split",{newElementIds:u,source:r,parentElement:a},o,d).then(function(t){this.fireElementModified({command:t})}.bind(this)).catch(function(t){throw e.propagateError(t,"Split#handleSplit","Error occurred during handleSplit execution","sap.ui.rta.plugin")})};r.prototype.getMenuItems=function(t){return this._getMenuItems(t,{pluginId:"CTX_UNGROUP_FIELDS",rank:100,icon:"sap-icon://split"})};r.prototype.getActionName=function(){return"split"};r.prototype.handler=function(t){this.handleSplit(t[0])};return r});
//# sourceMappingURL=Split.js.map