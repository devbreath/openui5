/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/fl/changeHandler/condenser/Classification","sap/ui/fl/Utils"],function(e,r,t){"use strict";var n={};n.SOURCE_ALIAS="source";n.TARGET_ALIAS="target";n.MOVED_ELEMENTS_ALIAS="movedElements";function o(e,r,t,n){if(!e){return Promise.reject(new Error("No change instance"))}var o=e.getContent();if(!o||!o.movedElements||o.movedElements.length===0){return Promise.reject(new Error("Change format invalid"))}if(!o.source||!o.source.selector){return Promise.reject(new Error("No source supplied for move"))}if(!o.target||!o.target.selector){return Promise.reject(new Error("No target supplied for move"))}if(!r.bySelector(o.source.selector,n,t)){return Promise.reject(new Error("Move source parent not found"))}if(!r.bySelector(o.target.selector,n,t)){return Promise.reject(new Error("Move target parent not found"))}if(!o.source.selector.aggregation){return Promise.reject(new Error("No source aggregation supplied for move"))}if(!o.target.selector.aggregation){return Promise.reject(new Error("No target aggregation supplied for move"))}return Promise.resolve()}function a(e,r,t,n){if(!e.selector&&!e.id){return Promise.reject(new Error("Change format invalid - moveElements element has no id attribute"))}if(typeof e.targetIndex!=="number"){return Promise.reject(new Error("Missing targetIndex for element with id '"+e.selector.id+"' in movedElements supplied"))}return Promise.resolve().then(r.bySelector.bind(r,e.selector||e.id,t,n)).then(function(r){if(!r){return Promise.reject(new Error("Control to move was not found. Id: '"+e.selector.id+"'"))}return r})}function i(e){if(!e.movedElements){return Promise.reject(new Error("mSpecificChangeInfo.movedElements attribute required"))}if(e.movedElements.length===0){return Promise.reject(new Error("MovedElements array is empty"))}e.movedElements.forEach(function(e){if(!e.id){throw new Error("MovedControls element has no id attribute")}if(typeof e.sourceIndex!=="number"){throw new Error("SourceIndex attribute at MovedElements element is no number")}if(typeof e.targetIndex!=="number"){throw new Error("TargetIndex attribute at MovedElements element is no number")}});return Promise.resolve()}function s(e,r,t){delete r.source.publicAggregation;delete r.target.publicAggregation;var n;var o;return Promise.resolve().then(function(){return r.source.parent||e.bySelector(r.source.id,t)}).then(function(o){n=o;return r.target.parent||e.bySelector(r.target.id,t)}).then(function(a){o=a;var i=r.source.aggregation;var s=r.target.aggregation;var g={aggregation:r.source.aggregation,type:e.getControlType(n)};var u={aggregation:r.target.aggregation,type:e.getControlType(o)};var c={source:{id:n.getId(),aggregation:i,type:g.type,selector:e.getSelector(r.source.id,t,g)},target:{id:o.getId(),aggregation:s,type:u.type,selector:e.getSelector(r.target.id,t,u)},movedElements:r.movedElements};return c})}n.applyChange=function(e,r,n){var i=n.modifier;var s=n.view;var g=n.appComponent;var u;var c;var l;var d;var m;var v;var f;var h=false;var E=e.getContent();var p=[];var C=[];return o(e,i,s,g).then(function(){E.movedElements.forEach(function(e){var r=function(){return Promise.resolve().then(a.bind(null,e,i,g,s)).then(function(e){u=e;c=i.getParent(u);return n.sourceAggregation||i.getParentAggregationName(u,c)}).then(function(e){d=e;return i.bySelector(E.target.selector,g,s)}).then(function(e){l=e;m=n.targetAggregation||E.target.selector.aggregation;return i.findIndexInParentAggregation(u)}).then(function(r){v=r;f=e.targetIndex;if(v>-1){if(v===f&&d===m&&i.getParent(u)===l){v=e.sourceIndex;d=n.sourceAggregation||E.source.selector.aggregation;h=true;return i.bySelector(E.source.selector,g,s)}}return Promise.resolve()}).then(function(e){if(e){c=e}if(v>-1){p.unshift({index:v,aggregation:d,sourceParent:i.getSelector(c,g)})}if(!h){return Promise.resolve().then(i.removeAggregation.bind(i,c,d,u)).then(i.insertAggregation.bind(i,l,m,u,f,s))}return Promise.resolve()})};C.push(r)},this);return t.execPromiseQueueSequentially(C,true,true)}.bind(this)).then(function(){e.setRevertData(p)})};n.revertChange=function(r,n,i){var s=i.modifier;var g=i.view;var u=i.appComponent;var c=r.getContent();var l;var d;var m;var v;var f;var h;return o(r,s,g,u).then(s.bySelector.bind(s,c.source.selector,u,g)).then(function(e){l=e;m=c.source.selector.aggregation;v=c.target.selector.aggregation;return s.bySelector(c.target.selector,u,g)}).then(function(n){d=n;var o=r.getRevertData();c.movedElements.reverse();var i=[];c.movedElements.forEach(function(r,t){var n=function(){return Promise.resolve().then(a.bind(this,r,s,u,g)).then(function(n){f=n;if(!f){e.warning("Element to move not found");return Promise.reject()}h=r.sourceIndex;if(o){var a=o[t];m=a.aggregation;h=a.index;return s.bySelector(a.sourceParent,u,g)}return Promise.resolve()}).then(function(e){if(e){l=e}return s.removeAggregation(d,v,f)}).then(function(){return s.insertAggregation(l,m,f,h,g)})}.bind(this);i.push(n)},this);return t.execPromiseQueueSequentially(i,true,true)}.bind(this)).then(function(){r.resetRevertData()})};n.completeChangeContent=function(e,r,t){var o=t.modifier;var a=t.appComponent;return i(r).then(s.bind(this,o,r,a)).then(function(r){var i={movedElements:[],source:{selector:r.source.selector},target:{selector:r.target.selector}};var s=[];r.movedElements.forEach(function(g){var u=Promise.resolve().then(function(){return g.element||o.bySelector(g.id,a)}).then(function(s){i.movedElements.push({selector:o.getSelector(s,a),sourceIndex:g.sourceIndex,targetIndex:g.targetIndex});e.addDependentControl(r.source.id,n.SOURCE_ALIAS,t);e.addDependentControl(r.target.id,n.TARGET_ALIAS,t);e.addDependentControl(r.movedElements.map(function(e){return e.id}),n.MOVED_ELEMENTS_ALIAS,t)});s.push(u)});return Promise.all(s).then(function(){e.setContent(i)})})};n.getCondenserInfo=function(e){var t=e.getContent();var n=e.getRevertData()[0];return{affectedControl:t.movedElements[0].selector,classification:r.Move,sourceContainer:n.sourceParent,targetContainer:t.target.selector,sourceIndex:n.index,sourceAggregation:n.aggregation,targetAggregation:t.target.selector.aggregation,setTargetIndex:function(e,r){var t=e.getContent();t.movedElements[0].targetIndex=r;e.setContent(t)},getTargetIndex:function(e){return e.getContent().movedElements[0].targetIndex}}};n.getChangeVisualizationInfo=function(e){var r=e.getContent();var t=e.getRevertData()[0];return{affectedControls:[r.movedElements[0].selector],dependentControls:[r.source.selector],payload:{sourceParentContainer:t.sourceParent,targetParentContainer:r.target.selector}}};return n},true);
//# sourceMappingURL=MoveControls.js.map