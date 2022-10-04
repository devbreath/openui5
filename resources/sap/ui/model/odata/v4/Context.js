/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./lib/_Helper","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/model/Context"],function(e,t,n,i){"use strict";var r="sap.ui.model.odata.v4.Context",o=0,s,h=-9007199254740991,a=i.extend("sap.ui.model.odata.v4.Context",{constructor:u});function d(e,t,i,r){var o,s=[e.fetchValue(t,null,r)],h=e.oModel.resolve(t,e);if(i){s.push(e.oModel.getMetaModel().fetchUI5Type(h))}return n.all(s).then(function(e){var t=e[1],n=e[0];if(n&&typeof n==="object"){o=new Error("Accessed value is not primitive: "+h);o.isNotPrimitive=true;throw o}return i?t.formatValue(n,"string"):n})}function u(e,t,n,r,o,s,h){if(n[0]!=="/"){throw new Error("Not an absolute path: "+n)}if(n.endsWith("/")){throw new Error("Unsupported trailing slash: "+n)}i.call(this,e,n);this.oBinding=t;this.oCreatedPromise=o&&Promise.resolve(o).then(function(){});this.oSyncCreatePromise=o;this.bDeleted=false;this.iGeneration=s||0;this.bInactive=h||undefined;this.iIndex=r;this.bKeepAlive=false;this.fnOnBeforeDestroy=undefined}a.prototype._delete=function(e,t,n){var i=this;if(!e){return this.oBinding._delete(null,"n/a",this,null,true)}return this.fetchCanonicalPath().then(function(r){return i.oBinding._delete(e,r.slice(1),i,t,n)})};a.prototype.adjustPredicate=function(e,t,n){var i=this.sPath;this.sPath=i.replace(e,t);if(n){n(i,this.sPath)}this.oModel.getDependentBindings(this).forEach(function(n){n.adjustPredicate(e,t)})};a.prototype.checkUpdate=function(){this.oModel.getDependentBindings(this).forEach(function(e){e.checkUpdate()})};a.prototype.checkUpdateInternal=function(){return n.all(this.oModel.getDependentBindings(this).map(function(e){return e.checkUpdateInternal()}))};a.prototype.collapse=function(){switch(this.getProperty("@$ui5.node.level")===0?undefined:this.isExpanded()){case true:this.oBinding.collapse(this);break;case false:throw new Error("Already collapsed: "+this);default:throw new Error("Not expandable: "+this)}};a.prototype.created=function(){return this.oCreatedPromise};a.prototype.delete=function(t,n){var i=null,o=this.oModel,s=this;if(this.isDeleted()){throw new Error("Must not delete twice: "+this)}this.oBinding.checkSuspended();if(this.isTransient()){t=null}else if(t===null){if(!(this.bKeepAlive&&this.iIndex===undefined)){throw new Error("Cannot delete "+this)}}if(t===null){n=true}else{e.checkGroupId(t);i=this.oBinding.lockGroup(t,true,true)}this.bDeleted=true;return Promise.resolve(this._delete(i,null,n)).then(function(){var e=s.sPath.slice(1);s.bDeleted=false;o.getAllBindings().forEach(function(t){t.removeCachesAndMessages(e,true)})}).catch(function(e){if(i){i.unlock(true)}o.reportError("Failed to delete "+s,r,e);s.bDeleted=false;s.checkUpdate();throw e})};a.prototype.destroy=function(){var e=this.fnOnBeforeDestroy;if(e){this.fnOnBeforeDestroy=undefined;e()}this.oModel.getDependentBindings(this).forEach(function(e){e.setContext(undefined)});this.oBinding=undefined;this.oCreatedPromise=undefined;this.oSyncCreatePromise=undefined;this.bInactive=undefined;this.bKeepAlive=undefined;this.oModel=undefined;i.prototype.destroy.call(this)};a.prototype.doSetProperty=function(t,n,i,o,s){var h=this.oModel,a=h.getMetaModel(),d,u,c=this;if(this.isDeleted()){if(i){i.unlock()}throw new Error("must not modify a deleted entity: "+this)}if(i&&this.isTransient()&&!this.isInactive()){u=this.getValue();d=u&&e.getPrivateAnnotation(u,"transient");if(d instanceof Promise){i.unlock();i=i.getUnlockedCopy();this.doSetProperty(t,n,null,true,true).catch(this.oModel.getReporter());return d.then(function(e){return e&&c.created()}).then(function(){return c.doSetProperty(t,n,i,o)})}}if(this.oModel.bAutoExpandSelect){t=a.getReducedPath(this.oModel.resolve(t,this),this.oBinding.getBaseForPathReduction())}return this.withCache(function(d,u,l){return l.doSetProperty(u,n,i)||a.fetchUpdateData(t,c,!i).then(function(u){var f=e.getRelativePath(u.entityPath,l.oReturnValueContext?l.oReturnValueContext.getPath():l.getResolvedPath()),p=false;function g(e){h.reportError("Failed to update path "+h.resolve(t,c),r,e);P(false)}function P(e){if(p){l.firePatchCompleted(e);p=false}}function y(){p=true;l.firePatchSent()}if(!i){return d.setProperty(u.propertyPath,n,f,s)}if(c.isInactive()){l.fireCreateActivate(c);c.bInactive=false}return d.update(i,u.propertyPath,n,o?undefined:g,u.editUrl,f,a.getUnitOrCurrencyPath(c.oModel.resolve(t,c)),l.isPatchWithoutSideEffects(),y,c.isKeepAlive.bind(c)).then(function(){P(true)},function(e){P(false);throw e})})},t,false,true)};a.prototype.expand=function(){switch(this.isExpanded()){case false:this.oBinding.expand(this).catch(this.oModel.getReporter());break;case true:throw new Error("Already expanded: "+this);default:throw new Error("Not expandable: "+this)}};a.prototype.fetchCanonicalPath=function(){return this.oModel.getMetaModel().fetchCanonicalPath(this)};a.prototype.fetchValue=function(e,t,i){var r=this.oBinding;if(this.iIndex===h){return n.resolve()}if(r.getHeaderContext&&r.getHeaderContext()===this){if(e&&e.startsWith(this.sPath)){e=e.slice(this.sPath.length+1)}if(!e){return r.fetchValue(this.sPath,t,i).then(function(e){return{$count:e.$count}})}else if(e!=="$count"){throw new Error("Invalid header path: "+e)}}if(!e||e[0]!=="/"){e=this.oModel.resolve(e,this);if(this.oModel.bAutoExpandSelect){e=this.oModel.getMetaModel().getReducedPath(e,this.oBinding.getBaseForPathReduction())}}return this.oBinding.fetchValue(e,t,i)};a.prototype.getBinding=function(){return this.oBinding};a.prototype.getCanonicalPath=e.createGetMethod("fetchCanonicalPath",true);a.prototype.getGeneration=function(e){if(this.iGeneration||e){return this.iGeneration}return this.oBinding.getGeneration()};a.prototype.getGroupId=function(){return this.oBinding.getGroupId()};a.prototype.getIndex=function(){if(this.iIndex===undefined){return undefined}if(this.oBinding.isFirstCreateAtEnd()){if(this.iIndex<0){return this.oBinding.bLengthFinal?this.oBinding.iMaxLength-this.iIndex-1:-this.iIndex-1}return this.iIndex}return this.getModelIndex()};a.prototype.getModelIndex=function(){if(this.iIndex!==undefined&&this.oBinding.iCreatedContexts){return this.iIndex+this.oBinding.iCreatedContexts}return this.iIndex};a.prototype.getObject=function(t){return e.publicClone(this.getValue(t))};a.prototype.getProperty=function(e,n){var i,o;this.oBinding.checkSuspended();o=d(this,e,n,true);if(o.isRejected()){o.caught();i=o.getResult();if(i.isNotPrimitive){throw i}else if(!i.$cached){t.warning(i.message,e,r)}}return o.isFulfilled()?o.getResult():undefined};a.prototype.getQueryOptionsForPath=function(e){return this.oBinding.getQueryOptionsForPath(e)};a.prototype.getUpdateGroupId=function(){return this.oBinding.getUpdateGroupId()};a.prototype.getValue=function(e){var t,n=this;this.oBinding.checkSuspended();t=this.fetchValue(e,null,true).catch(function(e){if(!e.$cached){n.oModel.reportError("Unexpected error",r,e)}});if(t.isFulfilled()){return t.getResult()}};a.prototype.hasPendingChanges=function(){return this.isTransient()||this.isDeleted()||this.getBinding().hasPendingChangesForPath(this.sPath)||this.oModel.getDependentBindings(this).some(function(e){return e.oCache?e.hasPendingChanges():e.hasPendingChangesInDependents()})||this.oModel.withUnresolvedBindings("hasPendingChangesInCaches",this.sPath.slice(1))};a.prototype.isDeleted=function(){return this.bDeleted};a.prototype.isExpanded=function(){return this.getProperty("@$ui5.node.isExpanded")};a.prototype.isInactive=function(){return this.bInactive};a.prototype.isKeepAlive=function(){return this.bKeepAlive};a.prototype.isTransient=function(){return this.oSyncCreatePromise&&this.oSyncCreatePromise.isPending()};a.prototype.patch=function(e){return this.withCache(function(t,n){t.patch(n,e)},"")};a.prototype.refresh=function(e,t){this.requestRefresh.apply(this,arguments).catch(this.oModel.getReporter())};a.prototype.refreshDependentBindings=function(e,t,i,r){return n.all(this.oModel.getDependentBindings(this).map(function(n){return n.refreshInternal(e,t,i,r)}))};a.prototype.replaceWith=function(t){var n;this.oBinding.checkSuspended();if(this.isTransient()){throw new Error("Cannot replace "+this)}if(t.oBinding!==this.oBinding||t.iIndex!==undefined||!t.bKeepAlive){throw new Error("Cannot replace with "+t)}n=t.getValue();this.oBinding.doReplaceWith(this,n,e.getPrivateAnnotation(n,"predicate"))};a.prototype.requestCanonicalPath=e.createRequestMethod("fetchCanonicalPath");a.prototype.requestObject=function(t){this.oBinding.checkSuspended();return Promise.resolve(this.fetchValue(t)).then(e.publicClone)};a.prototype.requestProperty=function(e,i){var o=Array.isArray(e)?e:[e],s=this;this.oBinding.checkSuspended();return Promise.all(o.map(function(e){return s.oBinding.fetchIfChildCanUseCache(s,e,n.resolve({})).then(function(n){if(n){return d(s,n,i)}t.error("Not a valid property path: "+e,undefined,r)})})).then(function(t){return Array.isArray(e)?t:t[0]})};a.prototype.requestRefresh=function(t,n){var i;e.checkGroupId(t);this.oBinding.checkSuspended();if(this.hasPendingChanges()){throw new Error("Cannot refresh entity due to pending changes: "+this)}if(this.oBinding.refreshSingle){i=this.oBinding.refreshSingle(this,this.oBinding.lockGroup(t,true),n)}else{if(arguments.length>1){throw new Error("Unsupported parameter bAllowRemoval: "+n)}i=this.oBinding.refreshReturnValueContext(this,t)||this.oBinding.requestRefresh(t)}this.oModel.withUnresolvedBindings("removeCachesAndMessages",this.sPath.slice(1));return Promise.resolve(i).then(function(){})};a.prototype.requestSideEffects=function(t,i){var r,o=this.oModel.getMetaModel(),s=[],h=[],a,d,u=this;function c(e){if(!e){return false}if(e==="*"){return true}if(e.endsWith("/*")){e=e.slice(0,-2)}return!e.includes("*")}this.oBinding.checkSuspended();e.checkGroupId(i);if(this.isTransient()){throw new Error("Unsupported context: "+this)}if(!t||!t.length){throw new Error("Missing edm:(Navigation)PropertyPath expressions")}if(!this.oBinding.isResolved()){throw new Error("Cannot request side effects of unresolved binding's context: "+this)}r=o.getObject("/$EntityContainer");if(!r){throw new Error("Missing metadata")}r="/"+r+"/";t.map(function(e){if(e&&typeof e==="object"){if(c(e.$PropertyPath)){return e.$PropertyPath}if(typeof e.$NavigationPropertyPath==="string"&&!e.$NavigationPropertyPath.includes("*")){return e.$NavigationPropertyPath}}else if(typeof e==="string"&&(!e||c(e))){return e}throw new Error("Not an edm:(Navigation)PropertyPath expression: "+JSON.stringify(e))}).forEach(function(e){if(e[0]==="/"){if(!e.startsWith(r)){throw new Error("Path must start with '"+r+"': "+e)}h.push(e.slice(r.length-1))}else{s.push(e)}});a=this.oBinding.getRootBinding();d=a.getResolvedPath();s=s.reduce(function(t,n){return t.concat(o.getAllPathReductions(e.buildPath(u.getPath(),n),d))},[]);s=e.filterPaths(h,s);i=i||this.getUpdateGroupId();return Promise.resolve(n.resolve(this.oModel.isAutoGroup(i)&&this.oModel.oRequestor.waitForRunningChangeRequests(i).then(function(){u.oModel.oRequestor.relocateAll("$parked."+i,i)})).then(function(){return n.all([u.oModel.requestSideEffects(i,h),u.requestSideEffectsInternal(s,i)])})).then(function(){})};a.prototype.requestSideEffectsInternal=function(t,i){var r=this,o,s=r,h,a=[],d,u=[],c,l=[];if(!t.length){return undefined}for(;;){o=s.getBinding();c=o.getPath();d=o.getContext();if(o.oCache&&(!h||o.oCache.hasChangeListeners())){h=s}if(h&&c){break}if(!o.getBoundContext){throw new Error("Not a context binding: "+o)}s=d}o=h.getBinding();t.forEach(function(t){var n=e.getRelativePath(t,h.getPath());if(n===undefined){u.push(t)}else{a.push(n)}});if(u.length){l.push(o.getContext().requestSideEffectsInternal(u,i))}if(a.length&&o.oCache!==undefined){l.push(o.requestSideEffects(i,a,h))}return n.all(l)};a.prototype.resetKeepAlive=function(){this.bKeepAlive=false};a.prototype.setNewGeneration=function(){o+=1;this.iGeneration=o};a.prototype.setKeepAlive=function(t,n,i){var r=this;if(this.isTransient()){throw new Error("Unsupported transient context "+this)}e.getPredicateIndex(this.sPath);this.oBinding.checkKeepAlive(this);if(t&&i){if(!this.oModel.bAutoExpandSelect){throw new Error("Missing parameter autoExpandSelect at model")}this.bKeepAlive=t;this.oModel.getMetaModel().fetchObject(e.getMetaPath(this.sPath)+"/@com.sap.vocabularies.Common.v1.Messages/$Path").then(function(e){if(!e){throw new Error("Missing @com.sap.vocabularies.Common.v1.Messages")}return r.oBinding.fetchIfChildCanUseCache(r,e,{})}).then(function(e){return r.fetchValue(e)}).catch(this.oModel.getReporter())}this.bKeepAlive=t;this.fnOnBeforeDestroy=t?n:undefined};a.prototype.setProperty=function(t,n,i,o){var s=null,h=this.oModel,a=this;this.oBinding.checkSuspended();if(typeof n==="function"||n&&typeof n==="object"){throw new Error("Not a primitive value")}if(i!==null){e.checkGroupId(i);s=this.oBinding.lockGroup(i,true,true)}return Promise.resolve(this.doSetProperty(t,n,s,!o)).catch(function(e){if(s){s.unlock(true)}h.reportError("Failed to update path "+h.resolve(t,a),r,e);throw e})};a.prototype.toString=function(){var e="";if(!this.oModel){e=";destroyed"}else if(this.bDeleted){e=";deleted"}if(this.iIndex!==undefined){if(!e){switch(this.isTransient()){case false:e=";createdPersisted";break;case true:e=this.bInactive?";inactive":";transient";break}}e="["+this.iIndex+e+"]"}return this.sPath+e};a.prototype.withCache=function(e,t,i,r){if(this.iIndex===h){return n.resolve()}return this.oBinding.withCache(e,this.oModel.resolve(t,this),i,r)};s={create:function(e,t,n,i,r,o){return new a(e,t,n,i,r,0,o)},createNewContext:function(e,t,n){o+=1;return new a(e,t,n,undefined,undefined,o)}};Object.defineProperty(s,"VIRTUAL",{value:h});return s},false);
//# sourceMappingURL=Context.js.map