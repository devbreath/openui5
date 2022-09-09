/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/util/reflection/JsControlTreeModifier","sap/base/Log"],function(e,t){"use strict";var r={};r.applyChange=function(e,t,r){var n=r.modifier;var a=r.view;var o=r.appComponent;var i=e.getTexts();var l=e.getContent();var v=l.elementSelector||l.sRenameId;var f=n.bySelector(v,o,a);if(i&&i.formText&&this._isProvided(i.formText.value)){if(!t){return Promise.reject(new Error("no Control provided for renaming"))}return n.getProperty(f,"text").then(function(t){e.setRevertData(t);var r=i.formText.value;n.setProperty(f,"text",r)})}else{return Promise.resolve()}};r.revertChange=function(e,r,n){var a=e.getRevertData();var o=n.appComponent;var i=e.getContent();var l=n.view;var v=n.modifier;var f=i.elementSelector||i.sRenameId;var s=v.bySelector(f,o,l);if(a||a===""){v.setProperty(s,"text",a);s.getParent().invalidate();e.resetRevertData()}else{t.error("Change doesn't contain sufficient information to be reverted. Most Likely the Change didn't go through applyChange.")}};r.completeChangeContent=function(t,r,n){var a={};if(!r.changeType){throw new Error("oSpecificChangeInfo.changeType attribute required")}if(r.renamedElement&&r.renamedElement.id){var o=sap.ui.getCore().byId(r.renamedElement.id);var i;if(r.changeType==="renameLabel"){i=o.getLabel()}else if(r.changeType==="renameTitle"){i=o.getTitle()}a.elementSelector=e.getSelector(i,n.appComponent);t.addDependentControl(i,"elementSelector",n)}else{throw new Error("oSpecificChangeInfo.renamedElement attribute required")}if(this._isProvided(r.value)){t.setText("formText",r.value,"XFLD")}else{throw new Error("oSpecificChangeInfo.value attribute required")}t.setContent(a)};r._isProvided=function(e){return typeof e==="string"};r.getChangeVisualizationInfo=function(t,r){var n=t.getContent().elementSelector;var a=e.bySelector(n,r).getParent().getId();return{affectedControls:[a],payload:{originalLabel:t.getRevertData(),newLabel:t.getTexts().formText.value}}};return r},true);
//# sourceMappingURL=RenameSimpleForm.js.map