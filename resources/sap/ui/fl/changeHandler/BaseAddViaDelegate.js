/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/condenser/Classification","sap/ui/fl/changeHandler/Base","sap/ui/fl/apply/api/DelegateMediatorAPI","sap/base/util/merge","sap/base/util/ObjectPath"],function(C,B,D,m,O){"use strict";function i(f){return typeof f==="function";}function g(c){if(c.modelType){return c.modelType;}else if(c.oDataServiceVersion){return"sap.ui.model.odata.v2.ODataModel";}}var a={createAddViaDelegateChangeHandler:function(A){function b(n){return n+A.fieldSuffix;}function c(o,S){if(i(A[S])){return!!A[S](o);}return!!A[S];}function s(o){return c(o,"skipCreateLabel");}function d(o){return c(o,"skipCreateLayout");}function f(e,p){var o=p.modifier.bySelector(e.getSelector(),p.appComponent);var M=g(e.getContent());return D.getDelegateForControl({control:o,modifier:p.modifier,modelType:M,supportsDefault:A.supportsDefault}).then(function(k){var l=!i(k.instance.createLayout);return l||d(e.getODataInformation());});}function h(o,e,k){var l=m({},e);l.fieldSelector.id=b(l.fieldSelector.id);return k.createControlForProperty(l).then(function(S){if(s(o)){return S;}var n=e.modifier.getId(S.control);e.labelFor=n;return k.createLabel(e).then(function(L){return{label:L,control:S.control,valueHelp:S.valueHelp};});});}function j(o,e,p,k){var l=m({aggregationName:A.aggregationName,payload:e.payload||{},parentSelector:o.parentId},p);var n=e.instance;return Promise.resolve().then(function(){if(i(n.createLayout)&&!d(k)){return n.createLayout(l);}}).then(function(L){if(O.get("control",L)){L.layoutControl=true;return L;}return h(k,l,n);});}return{applyChange:function(o,e,p){var k=p.appComponent;var l=o.getContent();var n=o.getODataInformation();var F=l.newFieldSelector;var q={appComponent:p.appComponent,view:p.view,fieldSelector:F,bindingPath:l.bindingPath,modifier:p.modifier,element:e};if(p.modifier.bySelector(F,k,p.view)){return B.markAsNotApplicable("Control to be created already exists:"+(F.id||F),true);}var r={newFieldSelector:F};o.setRevertData(r);var M=g(l);return D.getDelegateForControl({control:e,modifier:p.modifier,modelType:M,supportsDefault:A.supportsDefault}).then(function(t){return j(l,t,q,n);}).then(function(I){var t=m({},{control:e,innerControls:I,change:o},p);return Promise.resolve().then(function(){return A.addProperty(t);}).then(function(){if(I.valueHelp){var v=p.modifier.getSelector(p.modifier.getId(I.valueHelp),k);r.valueHelpSelector=v;}});});},revertChange:function(o,e,p){var k=p.appComponent;var M=p.modifier;var F=o.getRevertData().newFieldSelector;var v=o.getRevertData().valueHelpSelector;var n=M.bySelector(F,k);var P=o.getDependentControl(A.parentAlias,p)||e;return Promise.resolve().then(M.removeAggregation.bind(M,P,A.aggregationName,n)).then(M.destroy.bind(M,n)).then(function(){if(v){var V=M.bySelector(v,k);return Promise.resolve().then(M.removeAggregation.bind(M,P,"dependents",V)).then(M.destroy.bind(M,V));}}).then(function(){var l=m({},{control:e,change:o},p);if(i(A.revertAdditionalControls)){return Promise.resolve().then(function(){return A.revertAdditionalControls(l);}).then(function(){o.resetRevertData();});}});},completeChangeContent:function(o,S,p){var k=p.appComponent;var l={};if(S.parentId){if(i(A.mapParentIdIntoChange)){A.mapParentIdIntoChange(o,S,p);}else{o.addDependentControl(S.parentId,A.parentAlias,p);}try{l.parentId=p.modifier.getSelector(S.parentId,k);}catch(e){}}else{throw new Error("mSpecificChangeInfo.parentId attribute required");}if(S.bindingPath){l.bindingPath=S.bindingPath;}else{throw new Error("mSpecificChangeInfo.bindingPath attribute required");}if(S.newControlId){l.newFieldSelector=p.modifier.getSelector(S.newControlId,k);}else{throw new Error("mSpecificChangeInfo.newControlId attribute required");}if(S.index===undefined){throw new Error("mSpecificChangeInfo.targetIndex attribute required");}else{l.newFieldIndex=S.index;}if(S.oDataServiceVersion){l.oDataServiceVersion=S.oDataServiceVersion;}if(S.modelType&&A.supportsDefault){l.modelType=S.modelType;}o.setContent(l);},getChangeVisualizationInfo:function(o){var r=o.getRevertData();if(r&&r.labelSelector){return{affectedControls:[r.labelSelector]};}return{affectedControls:[o.getContent().newFieldSelector]};},getCondenserInfo:function(o,p){return f(o,p).then(function(e){if(!e){return undefined;}if(!o.getContent().newFieldSelector||!o.getContent().parentId||!A.aggregationName){return undefined;}return{affectedControl:o.getContent().newFieldSelector,classification:C.Create,targetContainer:o.getContent().parentId,targetAggregation:A.aggregationName,setTargetIndex:function(o,n){o.getContent().newFieldIndex=n;},getTargetIndex:function(o){return o.getContent().newFieldIndex;}};});}};}};return a;});
