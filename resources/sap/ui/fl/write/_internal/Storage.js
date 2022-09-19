/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/initial/_internal/StorageUtils","sap/ui/fl/write/_internal/StorageFeaturesMerger","sap/ui/fl/apply/_internal/flexObjects/States","sap/base/util/ObjectPath"],function(S,a,b,O){"use strict";var W="sap/ui/fl/write/_internal/connectors/";function _(){return S.getConnectors(W,false);}function f(l,C){var F=C.filter(function(o){return o.layers.indexOf("ALL")!==-1||o.layers.indexOf(l)!==-1;});if(F.length===1){return F[0];}if(F.length===0){throw new Error("No Connector configuration could be found to write into layer: "+l);}if(F.length>1){throw new Error("sap.ui.core.Configuration 'flexibilityServices' has a misconfiguration: Multiple Connector configurations were found to write into layer: "+l);}}function c(C){var j=C.map(function(o){return o.writeConnectorModule.loadFeatures({url:o.url}).then(function(F){return{features:F,layers:o.layers};}).catch(S.logAndResolveDefault.bind(null,{features:{},layers:o.layers},o,"loadFeatures"));});return Promise.all(j);}function d(l){if(!l){return Promise.reject("No layer was provided");}return _().then(f.bind(this,l));}function e(p){if(p.draft){return new Promise(function(r,j){sap.ui.require(["sap/ui/fl/write/api/FeaturesAPI"],function(F){F.isVersioningEnabled(p.layer).then(function(D){if(D){r();}else{j("Draft is not supported for the given layer: "+p.layer);}});});});}return Promise.resolve();}function g(p){var C;if(p.allChanges&&p.allChanges.length&&p.condensedChanges){C={namespace:p.allChanges[0].convertToFileContent().namespace,layer:p.layer,"delete":{change:[]},update:{change:[]},reorder:{change:[]},create:{change:[],ctrl_variant_change:[],ctrl_variant_management_change:[]}};var o=0;var A=false;p.allChanges.forEach(function(j,k){if(j.getFileType()==="ctrl_variant"){return;}var l=C.create[j.getFileType()].length;if(j.condenserState){var D=false;if(j.condenserState==="delete"){if(j.getState()===b.PERSISTED){C.delete.change.push(j.getId());}o++;}else if(p.condensedChanges.length){D=p.allChanges[k].getId()!==p.condensedChanges[k-o].getId();}if((j.condenserState==="select"||j.condenserState==="update")&&D&&!A){var r=p.condensedChanges.slice(k-o).map(function(j){return j.getId();});C.reorder.change=r;A=true;}if(j.condenserState==="select"&&j.getState()===b.NEW){C.create.change[l]={};C.create.change[l][j.getId()]=j.getDefinition();}else if(j.condenserState==="update"){var m=C.update.change.length;C.update.change[m]={};C.update.change[m][j.getId()]={content:j.getContent()};}delete j.condenserState;}else if(j.getState()===b.NEW){C.create[j.getFileType()][l]={};C.create[j.getFileType()][l][j.getId()]=j.getDefinition();}});}return C;}function h(A,p){return e(p).then(d.bind(undefined,p.layer)).then(function(C){p.url=C.url;var o=O.get(A,C.writeConnectorModule);return o.call(C.writeConnectorModule,p);});}var i={};i.write=function(p){return h("write",p);};i.condense=function(p){p.flexObjects=g(p);if(!p.flexObjects){return Promise.reject("No changes were provided");}return h("condense",p);};i.remove=function(p){return h("remove",p);};i.update=function(p){return h("update",p);};i.reset=function(p){return h("reset",p);};i.getFlexInfo=function(p){return h("getFlexInfo",p);};i.getContexts=function(p){return h("getContexts",p);};i.loadContextDescriptions=function(p){return h("loadContextDescriptions",p);};i.isContextSharingEnabled=function(p){return h("isContextSharingEnabled",p);};i.loadFeatures=function(){return _().then(c).then(a.mergeResults);};i.publish=function(p){return h("publish",p);};i.versions={load:function(p){return _().then(h.bind(undefined,"versions.load",p));},activate:function(p){return _().then(h.bind(undefined,"versions.activate",p));},discardDraft:function(p){return _().then(h.bind(undefined,"versions.discardDraft",p));},publish:function(p){return _().then(h.bind(undefined,"versions.publish",p));}};i.translation={getSourceLanguages:function(p){return _().then(h.bind(undefined,"translation.getSourceLanguages",p));},getTexts:function(p){return _().then(h.bind(undefined,"translation.getTexts",p));},postTranslationTexts:function(p){return _().then(h.bind(undefined,"translation.postTranslationTexts",p));}};return i;});
