/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/util/reflection/JsControlTreeModifier","sap/base/Log"],function(e,t){"use strict";var n={};var r=function(e,t){var n=t.getControlType(e);return n==="sap.ui.core.Title"||n==="sap.m.Title"||n==="sap.m.Toolbar"||n==="sap.m.OverflowToolbar"};var o=function(e,t){var n;for(n=0;n<e.length;++n){if(r(e[n],t)){return e[n]}}return undefined};function i(e){return e.modifier.targets==="xmlTree"}function a(e){return e.getTitle()||e.getToolbar()}n.applyChange=function(e,n,a){var l=a.modifier;var s=a.view;var u=a.appComponent;if(i(a)){return Promise.reject(Error("Change cannot be applied in XML. Retrying in JS."))}var g=e.getContent();var f=l.bySelector(g.elementSelector||g.sHideId,u,s);var c;return this._getState(n,l,u).then(function(t){e.setRevertData(t);return l.getAggregation(n,"content")}).then(function(e){c=e;return l.removeAllAggregation(n,"content")}).then(function(){return c.reduce(function(e,t,r){return e.then(l.insertAggregation.bind(l,n,"content",t,r,s))},Promise.resolve())}).then(function(){var t=-1;var i=e.getChangeType();if(i==="hideSimpleFormField"){c.some(function(e,n){if(e===f){t=n;l.setVisible(e,false)}if(t>=0&&n>t){if(l.getControlType(e)==="sap.m.Label"||l.getControlType(e)==="sap.ui.comp.smartfield.SmartLabel"||r(e,l)){return true}else{l.setVisible(e,false)}}})}else if(i==="removeSimpleFormGroup"){var a=[];var u=o(c,l);var g=u&&!f;c.some(function(e,o){if(!u){l.setVisible(e,false)}else if(g){t=0;l.setVisible(e,false);g=false}else{if(e===f){t=o}if(t>=0&&o>t){if(r(e,l)){if(t===0){a.push(function(){return Promise.resolve().then(l.removeAggregation.bind(l,n,"content",e,s))});a.push(function(){return Promise.resolve().then(l.insertAggregation.bind(l,n,"content",e,0,s))})}return true}else{l.setVisible(e,false)}}}});if(f){a.push(function(){return Promise.resolve().then(l.removeAggregation.bind(l,n,"content",f,s))});a.push(function(){return Promise.resolve().then(l.insertAggregation.bind(l,n,"dependents",f,0,s))})}if(a.length>0){return a.reduce(function(e,t){return e.then(t)},Promise.resolve())}}return Promise.resolve()}).catch(function(n){e.resetRevertData();t.error(n.message||n.name)})};n._getStableElement=function(e){if(e.getMetadata().getName()==="sap.ui.layout.form.FormContainer"){return e.getTitle()||e.getToolbar()}else if(e.getMetadata().getName()==="sap.ui.layout.form.FormElement"){return e.getLabel()}else{return e}};n.completeChangeContent=function(t,n,r){if(n.removedElement&&n.removedElement.id){var o=this._getStableElement(sap.ui.getCore().byId(n.removedElement.id));t.setContent({elementSelector:e.getSelector(o,r.appComponent)});t.addDependentControl(o,"elementSelector",r)}else{throw new Error("oSpecificChangeInfo.removedElement.id attribute required")}};n._getState=function(e,t,n){return Promise.resolve().then(function(){return t.getAggregation(e,"content")}).then(function(e){if(!e){return Promise.reject(new Error("Cannot get control state: 'content' aggregation doesn't exist"))}return{content:e.map(function(r){return{elementSelector:t.getSelector(t.getId(r),n),visible:r.getVisible?r.getVisible():undefined,index:e.indexOf(r)}})}})};n.revertChange=function(e,t,n){var r=e.getRevertData();var o=n.appComponent;var i=n.modifier;return Promise.resolve().then(i.removeAllAggregation.bind(i,t,"content")).then(function(){return r.content.reduce(function(e,r){var a=i.bySelector(r.elementSelector,o,n.view);var l=i.getId(a);return e.then(i.getAggregation.bind(i,t,"dependents")).then(function(e){var r=Promise.resolve();e.some(function(e){var o=i.getId(e);if(o===l){r=r.then(i.removeAggregation.bind(i,t,"dependents",e,n.view));return true}});return r}).then(i.insertAggregation.bind(i,t,"content",a,r.index,n.view)).then(function(){i.setProperty(a,"visible",r.visible)})},Promise.resolve()).then(function(){e.resetRevertData()})})};n.getChangeVisualizationInfo=function(t,n){var r=t.getContent().elementSelector;var o=e.bySelector(r,n);var i=t.getChangeType()==="hideSimpleFormField"?a(o.getParent().getParent()).getId():o.getId();return{affectedControls:[r],displayControls:[i],hasParentWithUnstableId:true}};return n},true);
//# sourceMappingURL=HideSimpleForm.js.map