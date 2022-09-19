/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/util/reflection/JsControlTreeModifier","sap/base/Log"],function(J,L){"use strict";var R={};R.applyChange=function(c,C,p){var m=p.modifier;var v=p.view;var a=p.appComponent;var t=c.getTexts();var o=c.getContent();var s=o.elementSelector||o.sRenameId;var r=m.bySelector(s,a,v);if(t&&t.formText&&this._isProvided(t.formText.value)){if(!C){return Promise.reject(new Error("no Control provided for renaming"));}return m.getProperty(r,"text").then(function(P){c.setRevertData(P);var V=t.formText.value;m.setProperty(r,"text",V);});}else{return Promise.resolve();}};R.revertChange=function(c,C,p){var o=c.getRevertData();var a=p.appComponent;var b=c.getContent();var v=p.view;var m=p.modifier;var s=b.elementSelector||b.sRenameId;var r=m.bySelector(s,a,v);if(o||o===""){m.setProperty(r,"text",o);r.getParent().invalidate();c.resetRevertData();}else{L.error("Change doesn't contain sufficient information to be reverted. Most Likely the Change didn't go through applyChange.");}};R.completeChangeContent=function(c,s,p){var C={};if(!s.changeType){throw new Error("oSpecificChangeInfo.changeType attribute required");}if(s.renamedElement&&s.renamedElement.id){var r=sap.ui.getCore().byId(s.renamedElement.id);var S;if(s.changeType==="renameLabel"){S=r.getLabel();}else if(s.changeType==="renameTitle"){S=r.getTitle();}C.elementSelector=J.getSelector(S,p.appComponent);c.addDependentControl(S,"elementSelector",p);}else{throw new Error("oSpecificChangeInfo.renamedElement attribute required");}if(this._isProvided(s.value)){c.setText("formText",s.value,"XFLD");}else{throw new Error("oSpecificChangeInfo.value attribute required");}c.setContent(C);};R._isProvided=function(s){return typeof(s)==="string";};R.getChangeVisualizationInfo=function(c,a){var e=c.getContent().elementSelector;var A=J.bySelector(e,a).getParent().getId();return{affectedControls:[A],payload:{originalLabel:c.getRevertData(),newLabel:c.getTexts().formText.value}};};return R;},true);
