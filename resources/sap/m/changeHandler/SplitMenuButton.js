/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/Component","sap/ui/fl/util/ManagedObjectModel"],function(J,C){"use strict";var S={};var a="sourceControl";S.applyChange=function(c,o,p){if(p.modifier.targets!=="jsControlTree"){return Promise.reject(new Error("Split change can't be applied on XML tree"));}var b=c.getContent();var m=p.modifier;var v=p.view;var A=p.appComponent;var s=c.getDependentControl(a,p);var M;var d;var P;var i;var n;var r;var e;var f;var g;return Promise.resolve().then(function(){return m.getAggregation(s,"menu");}).then(function(R){M=R;return m.getAggregation(M,"items");}).then(function(R){d=R;g=m.getParent(s);return m.getParentAggregationName(s,g);}).then(function(R){P=R;return m.findIndexInParentAggregation(s);}).then(function(R){i=R;n=b.newElementIds;r={parentAggregation:P,insertIndex:i,insertedButtons:[]};return d.reduce(function(h,j,k){var l;var I;var B;return h.then(function(){I=k;l=n[I];return m.createControl("sap.m.Button",A,v,l);}).then(function(q){B=q;r.insertedButtons.push(l);e="$sap.m.flexibility.SplitButtonsModel";return m.createControl("sap.ui.fl.util.ManagedObjectModel",A,v,Object.assign({},l,{id:l.id+'-managedObjectModel'}),{object:j,name:e});}).then(function(q){f=q;return m.insertAggregation(B,"dependents",f,0,v);}).then(function(){m.bindProperty(B,"text",e+">/text");m.bindProperty(B,"icon",e+">/icon");m.bindProperty(B,"enabled",e+">/enabled");m.bindProperty(B,"visible",e+">/visible");return m.createControl("sap.ui.core.CustomData",A,v,Object.assign({},l,{id:l.id+'-customData'}),{key:{path:e+">key"},value:{path:e+">value"}});}).then(function(t){return m.bindAggregation(B,"customData",{path:e+">/customData",template:t,templateShareable:false});}).then(function(){return m.attachEvent(B,"press","sap.m.changeHandler.SplitMenuButton.pressHandler",{selector:m.getSelector(j,A),appComponentId:A.getId(),menu:M});}).then(function(){return m.insertAggregation(g,P,B,i+I,v);});},Promise.resolve());}).then(function(){return Promise.resolve().then(m.removeAggregation.bind(m,g,P,s)).then(m.insertAggregation.bind(m,g,"dependents",s,0,v)).then(function(){c.setRevertData(r);});});};S.revertChange=function(c,o,p){var m=p.modifier;var r=c.getRevertData();var s=c.getDependentControl(a,p);var A=p.appComponent;var v=p.view;var P=m.getParent(s);var b=r.parentAggregation;var i=r.insertIndex;var I=[];return Promise.resolve().then(function(){r.insertedButtons.forEach(function(d){I.push(m.bySelector(d,A,v));});return I.reduce(function(d,B){return d.then(function(){return m.removeAggregation(P,b,B);}).then(function(){return m.destroy(B);});},Promise.resolve());}).then(m.insertAggregation.bind(m,P,b,s,i,v)).then(function(){c.resetRevertData();});};S.completeChangeContent=function(c,s,p){var m=p.modifier;var A=p.appComponent;if(!s.newElementIds){throw new Error("Split of MenuButton cannot be applied : oSpecificChangeInfo.newElementIds attribute required");}if(!s.sourceControlId){throw new Error("Split of MenuButton cannot be applied : oSpecificChangeInfo.sourceControlId attribute required");}c.addDependentControl(s.sourceControlId,a,p);var o={};o.sourceSelector=m.getSelector(s.sourceControlId,A);o.newElementIds=s.newElementIds.map(function(e){return m.getSelector(e,A);});c.setContent(o);};S.pressHandler=function(e,p){var m=J.bySelector(p.selector,C.get(p.appComponentId));m.firePress();p.menu.fireItemSelected({item:m});};return S;},true);
