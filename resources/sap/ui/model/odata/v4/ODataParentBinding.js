/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Context","./ODataBinding","./lib/_Helper","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/model/ChangeReason"],function(e,t,n,r,i,o){"use strict";function s(){t.call(this);this.mAggregatedQueryOptions={};this.bAggregatedQueryOptionsInitial=true;this.aChildCanUseCachePromises=[];this.bHasPathReductionToParent=false;this.iPatchCounter=0;this.bPatchSuccess=true;this.oReadGroupLock=undefined;this.oRefreshPromise=null;this.oResumePromise=undefined}t(s.prototype);var a="sap.ui.model.odata.v4.ODataParentBinding";s.prototype.attachPatchCompleted=function(e,t){return this.attachEvent("patchCompleted",e,t)};s.prototype.detachPatchCompleted=function(e,t){return this.detachEvent("patchCompleted",e,t)};s.prototype.doSuspend=function(){};s.prototype.firePatchCompleted=function(e){if(this.iPatchCounter===0){throw new Error("Completed more PATCH requests than sent")}this.iPatchCounter-=1;this.bPatchSuccess=this.bPatchSuccess&&e;if(this.iPatchCounter===0){this.fireEvent("patchCompleted",{success:this.bPatchSuccess});this.bPatchSuccess=true}};s.prototype.attachPatchSent=function(e,t){return this.attachEvent("patchSent",e,t)};s.prototype.detachPatchSent=function(e,t){return this.detachEvent("patchSent",e,t)};s.prototype.firePatchSent=function(){this.iPatchCounter+=1;if(this.iPatchCounter===1){this.fireEvent("patchSent")}};s.prototype._findEmptyPathParentContext=function(e){if(this.sPath===""&&this.oContext.getBinding){return this.oContext.getBinding()._findEmptyPathParentContext(this.oContext)}return e};s.prototype.aggregateQueryOptions=function(e,t,r,i){var o=n.merge({},r&&this.mLateQueryOptions||this.mAggregatedQueryOptions),s=this;function a(e,t,n,o,h){function u(i){var o=!e.$expand[i],h=n+"/"+i;if(o){e.$expand[i]={};if(r&&s.oModel.getMetaModel().fetchObject(h).getResult().$isCollection){return false}}return a(e.$expand[i],t.$expand[i],h,true,o)}function c(t){if(!e.$select.includes(t)){e.$select.push(t)}return true}return(i||!o||Object.keys(e).every(function(e){return e in t||e==="$count"||e==="$expand"||e==="$select"}))&&Object.keys(t).every(function(n){switch(n){case"$count":if(t.$count){e.$count=true}return true;case"$expand":e.$expand=e.$expand||{};return Object.keys(t.$expand).every(u);case"$select":e.$select=e.$select||[];return t.$select.every(c);default:if(h){e[n]=t[n];return true}return t[n]===e[n]}})}if(a(o,e,t)){if(!r){this.mAggregatedQueryOptions=o}else{this.mLateQueryOptions=o}return true}return false};s.prototype.changeParameters=function(e){var t=Object.assign({},this.mParameters),r,i,s=this;function a(n){if(s.oModel.bAutoExpandSelect&&(n==="$expand"||n==="$select")){throw new Error("Cannot change "+n+" parameter in auto-$expand/$select mode: "+JSON.stringify(e[n])+" !== "+JSON.stringify(t[n]))}if(n==="$filter"||n==="$search"){r=o.Filter}else if(n==="$orderby"&&r!==o.Filter){r=o.Sort}else if(!r){r=o.Change}}if(!e){throw new Error("Missing map of binding parameters")}for(i in e){if(i.startsWith("$$")){if(e[i]===t[i]){continue}throw new Error("Unsupported parameter: "+i)}if(e[i]===undefined&&t[i]!==undefined){a(i);delete t[i]}else if(t[i]!==e[i]){a(i);if(typeof e[i]==="object"){t[i]=n.clone(e[i])}else{t[i]=e[i]}}}if(r){if(this.hasPendingChanges(true)){throw new Error("Cannot change parameters due to pending changes")}this.applyParameters(t,r)}};s.prototype.checkUpdateInternal=function(e){var t=this;function n(){return i.all(t.getDependentBindings().map(function(e){return e.checkUpdateInternal()}))}if(e!==undefined){throw new Error("Unsupported operation: "+a+"#checkUpdateInternal must not"+" be called with parameters")}return this.oCachePromise.then(function(e){if(e&&t.bRelative){return t.fetchResourcePath(t.oContext).then(function(r){if(e.getResourcePath()===r){return n()}return t.refreshInternal("")})}return n()})};s.prototype.createInCache=function(e,t,r,i,o,s,a,h){var u=this;return this.oCachePromise.then(function(c){var d;if(c){d=n.getRelativePath(r,u.getResolvedPath());return c.create(e,t,d,i,o,s,a,h).then(function(e){if(u.mCacheByResourcePath){delete u.mCacheByResourcePath[c.getResourcePath()]}return e})}return u.oContext.getBinding().createInCache(e,t,r,i,o,s,a,h)})};s.prototype.createReadGroupLock=function(e,t,n){var i,o=this;function s(){o.oModel.addPrerenderingTask(function(){n-=1;if(n>0){Promise.resolve().then(s)}else if(o.oReadGroupLock===i){r.debug("Timeout: unlocked "+i,null,a);o.removeReadGroupLock()}})}this.removeReadGroupLock();this.oReadGroupLock=i=this.lockGroup(e,t);if(t){n=2+(n||0);s()}};s.prototype.createRefreshPromise=function(e){var t,n;t=new Promise(function(e){n=e});t.$preventBubbling=e;t.$resolve=n;this.oRefreshPromise=t;return t};s.prototype.deleteFromCache=function(e,t,n,r,i,o){return this.withCache(function(n,s){return n._delete(e,t,s,r,i,o)},n,true)};s.prototype.destroy=function(){this.aChildCanUseCachePromises=[];this.removeReadGroupLock();this.oResumePromise=undefined;t.prototype.destroy.call(this)};s.prototype.fetchIfChildCanUseCache=function(t,o,s,h){var u=this.getBaseForPathReduction(),c=n.getMetaPath(t.getPath()),d,p,f=t.getPath().includes("(...)"),g=t.getIndex(),l=o[0]==="#",P=this.oModel.getMetaModel(),m,y=this.oModel.resolve(o,t),C=this;function v(){if(l){return P.fetchObject(c+"/")}return n.fetchPropertyAndType(C.oModel.oInterface.fetchMetadata,R(y))}function R(e){var t;e=n.getMetaPath(e);t=e.indexOf("@");return t>0?e.slice(0,t):e}if(f&&!y.includes("/$Parameter/")||this.getRootBinding().isSuspended()||n.isDataAggregation(this.mParameters)){return i.resolve(y)}d=this.oCachePromise.isRejected()||g!==undefined&&g!==e.VIRTUAL||t.isKeepAlive()||this.oCache===null||this.oCache&&this.oCache.hasSentRequest();m=[this.doFetchQueryOptions(this.oContext),v(),s];p=i.all(m).then(function(e){var t=e[2],i,o=e[0],p=e[1],g,m;if(Array.isArray(p)){return undefined}m=P.getReducedPath(y,u);g=n.getRelativePath(R(m),c);if(g===undefined){C.bHasPathReductionToParent=true;return C.oContext.getBinding().fetchIfChildCanUseCache(C.oContext,n.getRelativePath(y,C.oContext.getPath()),s)}if(f||g==="$count"||g.endsWith("/$count")){return m}if(C.bAggregatedQueryOptionsInitial){C.selectKeyProperties(o,c);C.mAggregatedQueryOptions=n.clone(o);C.bAggregatedQueryOptionsInitial=false}if(l){i={$select:[g.slice(1)]};return C.aggregateQueryOptions(i,c,d,h)?m:undefined}if(g===""||p&&(p.$kind==="Property"||p.$kind==="NavigationProperty")){i=n.wrapChildQueryOptions(c,g,t,C.oModel.oInterface.fetchMetadata);if(i){return C.aggregateQueryOptions(i,c,d,h)?m:undefined}return undefined}if(g==="value"){return C.aggregateQueryOptions(t,c,d,h)?m:undefined}r.error("Failed to enhance query options for auto-$expand/$select as the path '"+y+"' does not point to a property",JSON.stringify(p),a);return undefined}).then(function(e){if(C.mLateQueryOptions){if(C.oCache){C.oCache.setLateQueryOptions(C.mLateQueryOptions)}else if(C.oCache===null){return C.oContext.getBinding().fetchIfChildCanUseCache(C.oContext,C.sPath,i.resolve(C.mLateQueryOptions)).then(function(t){return t&&e})}}return e});this.aChildCanUseCachePromises.push(p);this.oCachePromise=i.all([this.oCachePromise,p]).then(function(e){var r=e[0];if(!d&&r&&!r.hasSentRequest()&&!C.oOperation){if(C.bSharedRequest){r.setActive(false);r=C.createAndSetCache(C.mAggregatedQueryOptions,r.getResourcePath(),t)}else{r.setQueryOptions(n.merge({},C.oModel.mUriParameters,C.mAggregatedQueryOptions))}}return r});this.oCachePromise.catch(function(e){C.oModel.reportError(C+": Failed to enhance query options for "+"auto-$expand/$select for child "+o,a,e)});return p};s.prototype.fetchResolvedQueryOptions=function(e){var t,r,o,s=this.oModel,a=this.getQueryOptionsFromParameters();if(!(s.bAutoExpandSelect&&a.$select)){return i.resolve(a)}t=s.oInterface.fetchMetadata;o=n.getMetaPath(s.resolve(this.sPath,e));r=Object.assign({},a,{$select:[]});return i.all(a.$select.map(function(e){var i=o+"/"+e;if(i.endsWith(".*")){i=i.slice(0,-1)}return n.fetchPropertyAndType(t,i).then(function(){var i=n.wrapChildQueryOptions(o,e,{},t);if(i){n.aggregateExpandSelect(r,i)}else{n.addToSelect(r,[e])}})})).then(function(){return r})};s.prototype.getBaseForPathReduction=function(){var e,t;if(!this.isRoot()){e=this.oContext.getBinding();t=e.getUpdateGroupId();if(t===this.getUpdateGroupId()||!this.oModel.isApiGroup(t)){return e.getBaseForPathReduction()}}return this.getResolvedPath()};s.prototype.getInheritableQueryOptions=function(){if(this.mLateQueryOptions){return n.merge({},this.mCacheQueryOptions,this.mLateQueryOptions)}return this.mCacheQueryOptions||n.getQueryOptionsForPath(this.oContext.getBinding().getInheritableQueryOptions(),this.sPath)};s.prototype.getGeneration=function(){return this.bRelative&&this.oContext.getGeneration&&this.oContext.getGeneration()||0};s.prototype.getQueryOptionsForPath=function(e,t){if(Object.keys(this.mParameters).length){return n.getQueryOptionsForPath(this.getQueryOptionsFromParameters(),e)}t=t||this.oContext;if(!this.bRelative||!t.getQueryOptionsForPath){return{}}return t.getQueryOptionsForPath(n.buildPath(this.sPath,e))};s.prototype.getResumePromise=function(){return this.oResumePromise};s.prototype.hasPendingChangesInDependents=function(e){return this.getDependentBindings().some(function(t){var n=t.oCache,r,i=e;if(i){if(t.oContext.isKeepAlive()){return false}if(t.oContext.getIndex()!==undefined){i=false}}if(n!==undefined){if(n&&n.hasPendingChangesForPath("",false,i&&t.mParameters&&t.mParameters.$$ownRequest)){return true}}else if(t.hasPendingChangesForPath("")){return true}if(t.mCacheByResourcePath){r=Object.keys(t.mCacheByResourcePath).some(function(e){var r=t.mCacheByResourcePath[e];return r!==n&&r.hasPendingChangesForPath("")});if(r){return true}}return t.hasPendingChangesInDependents(i)})||this.oModel.withUnresolvedBindings("hasPendingChangesInCaches",this.getResolvedPath().slice(1))};s.prototype.isPatchWithoutSideEffects=function(){return this.mParameters.$$patchWithoutSideEffects||!this.isRoot()&&this.oContext&&this.oContext.getBinding().isPatchWithoutSideEffects()};s.prototype.isMeta=function(){return false};s.prototype.isRefreshWithoutBubbling=function(){return this.oRefreshPromise&&this.oRefreshPromise.$preventBubbling};s.prototype.onDelete=function(e){var t=this.findContextForCanonicalPath(e);if(t){this.resetChangesForPath(this.getRelativePath(t.getPath()),[]);this.oModel.getDependentBindings(t).forEach(function(e){e.resetChanges()});this._delete(null,e.slice(1),t)}};s.prototype.refreshDependentListBindingsWithoutCache=function(){return i.all(this.getDependentBindings().map(function(e){if(e.filter&&e.oCache===null){return e.refreshInternal("")}if(e.refreshDependentListBindingsWithoutCache){return e.refreshDependentListBindingsWithoutCache()}}))};s.prototype.removeReadGroupLock=function(){if(this.oReadGroupLock){this.oReadGroupLock.unlock(true);this.oReadGroupLock=undefined}};s.prototype.resetChangesInDependents=function(e){this.getDependentBindings().forEach(function(t){e.push(t.oCachePromise.then(function(e){if(e){e.resetChangesForPath("")}t.resetInvalidDataState()}).unwrap());if(t.mCacheByResourcePath){Object.keys(t.mCacheByResourcePath).forEach(function(e){t.mCacheByResourcePath[e].resetChangesForPath("")})}t.resetChangesInDependents(e)})};s.prototype.resolveRefreshPromise=function(e){if(this.oRefreshPromise){this.oRefreshPromise.$resolve(e.catch(function(e){if(!e.canceled){throw e}}));this.oRefreshPromise=null}return e};s.prototype._resume=function(e){var t=this;function n(){t.bSuspended=false;if(t.oResumePromise){t.resumeInternal(true);t.oResumePromise.$resolve();t.oResumePromise=undefined}}if(this.oOperation){throw new Error("Cannot resume an operation binding: "+this)}if(!this.isRoot()){throw new Error("Cannot resume a relative binding: "+this)}if(!this.bSuspended){throw new Error("Cannot resume a not suspended binding: "+this)}if(e){this.createReadGroupLock(this.getGroupId(),true,1);this.oModel.addPrerenderingTask(n)}else{this.createReadGroupLock(this.getGroupId(),true);n()}};s.prototype.resume=function(){this._resume(false)};s.prototype.resumeAsync=function(){this._resume(true);return Promise.resolve(this.oResumePromise)};s.prototype.selectKeyProperties=function(e,t){n.selectKeyProperties(e,this.oModel.getMetaModel().getObject(t+"/"))};s.prototype.suspend=function(){var e;if(this.oOperation){throw new Error("Cannot suspend an operation binding: "+this)}if(!this.isRoot()){throw new Error("Cannot suspend a relative binding: "+this)}if(this.bSuspended){throw new Error("Cannot suspend a suspended binding: "+this)}if(this.hasPendingChanges(true)){throw new Error("Cannot suspend a binding with pending changes: "+this)}this.bSuspended=true;this.oResumePromise=new i(function(t){e=t});this.oResumePromise.$resolve=e;this.removeReadGroupLock();this.doSuspend()};s.prototype.updateAggregatedQueryOptions=function(e){var t=Object.keys(e),n=this;if(this.mAggregatedQueryOptions){t=t.concat(Object.keys(this.mAggregatedQueryOptions));t.forEach(function(t){if(n.bAggregatedQueryOptionsInitial||t!=="$select"&&t!=="$expand"){if(e[t]===undefined){delete n.mAggregatedQueryOptions[t]}else{n.mAggregatedQueryOptions[t]=e[t]}}})}};s.prototype.visitSideEffects=function(e,t,r,i,o){var s=r?this.oModel.getDependentBindings(r):this.getDependentBindings();s.forEach(function(r){var s=n.buildPath(o,n.getMetaPath(r.getPath())),a;if(r.oCache){a=n.stripPathPrefix(s,t);if(a.length){i.push(r.requestSideEffects(e,a))}}else{r.visitSideEffects(e,t,null,i,s)}})};function h(e){if(this){s.apply(this,arguments)}else{Object.assign(e,s.prototype)}}["adjustPredicate","destroy","doDeregisterChangeListener","getGeneration","hasPendingChangesForPath"].forEach(function(e){h.prototype[e]=s.prototype[e]});return h},false);
//# sourceMappingURL=ODataParentBinding.js.map