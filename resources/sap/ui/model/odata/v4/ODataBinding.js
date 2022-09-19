/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./lib/_Helper","sap/ui/base/SyncPromise","sap/ui/model/ChangeReason","sap/ui/model/odata/OperationMode","sap/ui/model/odata/v4/Context"],function(_,S,C,O,a){"use strict";var c=[C.Context,C.Change,C.Refresh,C.Sort,C.Filter],r=/\/\d|\(\$uid=/;function h(s,e){return c.indexOf(s)>c.indexOf(e);}function b(){this.mCacheByResourcePath=undefined;this.oCache=null;this.oCachePromise=S.resolve(null);this.mCacheQueryOptions=undefined;this.oFetchCacheCallToken=undefined;this.mLateQueryOptions=undefined;this.sReducedPath=undefined;this.sResumeChangeReason=undefined;}b.prototype.adjustPredicate=function(t,p){this.sReducedPath=this.sReducedPath.replace(t,p);};b.prototype.assertSameCache=function(e){var E;if(this.oCache!==e){E=new Error(this+" is ignoring response from inactive cache: "+e);E.canceled=true;throw E;}};b.prototype.checkBindingParameters=function(p,A){var t=this;Object.keys(p).forEach(function(k){var v=p[k];if(!k.startsWith("$$")){return;}if(!A.includes(k)){throw new Error("Unsupported binding parameter: "+k);}switch(k){case"$$aggregation":break;case"$$groupId":case"$$updateGroupId":t.oModel.checkGroupId(v,false,"Unsupported value for binding parameter '"+k+"': ");break;case"$$ignoreMessages":if(v!==true&&v!==false){throw new Error("Unsupported value for binding parameter "+"'$$ignoreMessages': "+v);}break;case"$$inheritExpandSelect":if(v!==true&&v!==false){throw new Error("Unsupported value for binding parameter "+"'$$inheritExpandSelect': "+v);}if(!t.oOperation){throw new Error("Unsupported binding parameter $$inheritExpandSelect: "+"binding is not an operation binding");}if(p.$expand){throw new Error("Must not set parameter $$inheritExpandSelect on a binding "+"which has a $expand binding parameter");}break;case"$$operationMode":if(v!==O.Server){throw new Error("Unsupported operation mode: "+v);}break;case"$$getKeepAliveContext":if(t.isRelative()&&!p.$$ownRequest){throw new Error("$$getKeepAliveContext requires $$ownRequest in a relative binding");}["$$aggregation","$$canonicalPath","$$sharedRequest"].forEach(function(f){if(f in p){throw new Error("Cannot combine $$getKeepAliveContext and "+f);}});case"$$canonicalPath":case"$$noPatch":case"$$ownRequest":case"$$patchWithoutSideEffects":case"$$sharedRequest":if(v!==true){throw new Error("Unsupported value for binding parameter '"+k+"': "+v);}break;default:throw new Error("Unknown binding-specific parameter: "+k);}});};b.prototype.checkSuspended=function(i){var R=this.getRootBinding();if(R&&R.isSuspended()&&(!i||this.isRoot()||this.getResumeChangeReason())){throw new Error("Must not call method when the binding's root binding is suspended: "+this);}};b.prototype.checkUpdate=function(f){if(arguments.length>1){throw new Error("Only the parameter bForceUpdate is supported");}this.checkUpdateInternal(f).catch(this.oModel.getReporter());};b.prototype.createAndSetCache=function(q,R,o,g,e){var f,D,G;this.mCacheQueryOptions=Object.assign({},this.oModel.mUriParameters,q);if(this.bRelative){if(o.isTransient&&o.isTransient()&&o.getProperty("@$ui5.context.isTransient")){this.oCache=null;return null;}f=this.mCacheByResourcePath&&this.mCacheByResourcePath[R];G=o.getGeneration&&o.getGeneration()||0;if(f&&f.$generation>=G){f.setActive(true);}else{D=this.oModel.resolve(this.sPath,o).slice(1);f=this.doCreateCache(R,this.mCacheQueryOptions,o,D,g,e);if(!(this.mParameters&&this.mParameters.$$sharedRequest)){this.mCacheByResourcePath=this.mCacheByResourcePath||{};this.mCacheByResourcePath[R]=f;}f.$deepResourcePath=D;f.$generation=G;}}else{f=this.doCreateCache(R,this.mCacheQueryOptions,undefined,undefined,g,e);}if(e&&e!==f){e.deregisterChangeListener("",this);e.setActive(false);}if(this.mLateQueryOptions){f.setLateQueryOptions(this.mLateQueryOptions);}this.oCache=f;return f;};b.prototype.destroy=function(){var t=this;this.mCacheByResourcePath=undefined;this.oCachePromise.then(function(o){if(o){o.deregisterChangeListener("",t);o.setActive(false);}},function(){});this.oCache=null;this.oCachePromise=S.resolve(null);this.mCacheQueryOptions=undefined;this.oContext=undefined;this.oFetchCacheCallToken=undefined;};b.prototype.doDeregisterChangeListener=function(p,l){this.oCache.deregisterChangeListener(p,l);};b.prototype.fetchCache=function(o,i,k,g){var e=this.oCache,f={oOldCache:e===undefined?this.oFetchCacheCallToken.oOldCache:e},p,t=this;if(!this.bRelative){o=undefined;}if(!e&&k){if(e===undefined){throw new Error("Unsupported bKeepQueryOptions while oCachePromise is pending");}return;}this.oCache=undefined;this.oFetchCacheCallToken=f;if(k){this.oCachePromise=S.resolve(Promise.resolve()).then(function(){return t.createAndSetCache(t.mCacheQueryOptions,e.getResourcePath(),o,g,e);});return;}p=[this.fetchQueryOptionsForOwnCache(o,i),this.oModel.oRequestor.ready()];this.mCacheQueryOptions=undefined;this.oCachePromise=S.all(p).then(function(R){var q=R[0].mQueryOptions;t.sReducedPath=R[0].sReducedPath;if(q&&!(o&&o.iIndex===a.VIRTUAL)){return t.fetchResourcePath(o).then(function(s){var E;if(t.oFetchCacheCallToken!==f){E=new Error("Cache discarded as a new cache has been created");E.canceled=true;throw E;}return t.createAndSetCache(q,s,o,g,f.oOldCache);});}t.oCache=null;return null;});this.oCachePromise.catch(this.oModel.getReporter());};b.prototype.fetchQueryOptionsForOwnCache=function(o,i){var H,q,R=this.oModel.resolve(this.sPath,o),t=this;function w(Q,s){return S.resolve(Q).then(function(m){return{mQueryOptions:m,sReducedPath:s||R};});}if(this.oOperation||this.bRelative&&!o||this.isMeta()){return w(undefined);}q=this.doFetchQueryOptions(o);if(this.oModel.bAutoExpandSelect&&this.aChildCanUseCachePromises&&!_.isDataAggregation(this.mParameters)){q=S.all([q,Promise.resolve().then(function(){return S.all(t.aChildCanUseCachePromises);})]).then(function(e){t.aChildCanUseCachePromises=[];t.updateAggregatedQueryOptions(e[0]);return t.mAggregatedQueryOptions;});}if(i||!this.bRelative||!o.fetchValue){return w(q);}if(this.oModel.bAutoExpandSelect){H=this.mParameters&&Object.keys(t.mParameters).some(function(k){return k[0]!=="$"||k[1]==="$";});if(H){return w(q);}return o.getBinding().fetchIfChildCanUseCache(o,t.sPath,q,!this.mParameters).then(function(s){return w(s?undefined:q,s);});}if(this.mParameters&&Object.keys(this.mParameters).length){return w(q);}return q.then(function(Q){return w(Object.keys(Q).length?Q:undefined);});};b.prototype.fetchResourcePath=function(o){var e,s,f,t=this;if(!this.bRelative){return S.resolve(this.sPath.slice(1));}o=o||this.oContext;if(!o){return S.resolve();}s=o.getPath();e=o.fetchCanonicalPath&&(this.mParameters&&this.mParameters.$$canonicalPath||r.test(s));f=e?o.fetchCanonicalPath():S.resolve(s);return f.then(function(g){return _.buildPath(g,t.sPath).slice(1);});};b.prototype.getGroupId=function(){return this.sGroupId||(this.bRelative&&this.oContext&&this.oContext.getGroupId&&this.oContext.getGroupId())||this.oModel.getGroupId();};b.prototype.getRelativePath=function(p){var R;if(p[0]==="/"){R=_.getRelativePath(p,this.getResolvedPath());if(R===undefined&&this.oReturnValueContext){R=_.getRelativePath(p,this.oReturnValueContext.getPath());}return R;}return p;};b.prototype.getResumeChangeReason=function(){var s=this.sResumeChangeReason;this.getDependentBindings().forEach(function(D){var e=D.getResumeChangeReason();if(e&&h(e,s)){s=e;}});return s;};b.prototype.getRootBinding=function(){if(this.bRelative){if(!this.oContext){return undefined;}if(this.oContext.getBinding){return this.oContext.getBinding().getRootBinding();}}return this;};b.prototype.getRootBindingResumePromise=function(){var R=this.getRootBinding();return R&&R.getResumePromise()||S.resolve();};b.prototype.getUpdateGroupId=function(){return this.sUpdateGroupId||(this.bRelative&&this.oContext&&this.oContext.getUpdateGroupId&&this.oContext.getUpdateGroupId())||this.oModel.getUpdateGroupId();};b.prototype.hasPendingChanges=function(i){return this.isResolved()&&(this.hasPendingChangesForPath("",i)||this.hasPendingChangesInDependents(i));};b.prototype.hasPendingChangesForPath=function(p,i){return this.withCache(function(o,s,B){return o.hasPendingChangesForPath(s,i,i&&(B.isRoot()||B.mParameters.$$ownRequest));},p,true).unwrap();};b.prototype.hasPendingChangesInCaches=function(R){var t=this;if(!this.mCacheByResourcePath){return false;}return Object.keys(this.mCacheByResourcePath).some(function(s){var o=t.mCacheByResourcePath[s];return o.$deepResourcePath.startsWith(R)&&o.hasPendingChangesForPath("");});};b.prototype.isInitial=function(){throw new Error("Unsupported operation: isInitial");};b.prototype.isRoot=function(){return!this.bRelative||this.oContext&&!this.oContext.getBinding;};b.prototype.isRootBindingSuspended=function(){var R=this.getRootBinding();return R&&R.isSuspended();};b.prototype.lockGroup=function(g,l,m,f){g=g||(m?this.getUpdateGroupId():this.getGroupId());return this.oModel.lockGroup(g,this,l,m,f);};b.prototype.refresh=function(g){if(typeof g==="boolean"){throw new Error("Unsupported parameter bForceUpdate");}this.requestRefresh(g).catch(this.oModel.getReporter());};b.prototype.refreshSuspended=function(g){if(g&&g!==this.getGroupId()){throw new Error(this+": Cannot refresh a suspended binding with group ID '"+g+"' (own group ID is '"+this.getGroupId()+"')");}this.setResumeChangeReason(C.Refresh);};b.prototype.removeCachesAndMessages=function(R,e){var t=this;if(!e&&this.oCache){this.oCache.removeMessages();}if(this.mCacheByResourcePath){Object.keys(this.mCacheByResourcePath).forEach(function(s){var o=t.mCacheByResourcePath[s],D=o.$deepResourcePath;if(_.hasPathPrefix(D,R)){if(!e){o.removeMessages();}delete t.mCacheByResourcePath[s];}});}};b.prototype.requestAbsoluteSideEffects=function(g,A){var p=[],m=_.getMetaPath(this.getResolvedPath());A.some(function(s){var R=_.getRelativePath(s,m);if(R!==undefined){p.push(R);}else if(_.hasPathPrefix(m,s)){p=[""];return true;}});if(p.length){if(this.requestSideEffects){return this.requestSideEffects(g,p);}return this.refreshInternal("",g,true,true);}};b.prototype.requestRefresh=function(g){if(!this.isRoot()){throw new Error("Refresh on this binding is not supported");}if(this.hasPendingChanges(true)){throw new Error("Cannot refresh due to pending changes");}this.oModel.checkGroupId(g);return Promise.resolve(this.refreshInternal("",g,true)).then(function(){});};b.prototype.resetChanges=function(){var p=[];this.checkSuspended();this.resetChangesForPath("",p);this.resetChangesInDependents(p);this.resetInvalidDataState();return Promise.all(p).then(function(){});};b.prototype.resetChangesForPath=function(p,P){P.push(this.withCache(function(o,s){o.resetChangesForPath(s);},p).unwrap());};b.prototype.resetInvalidDataState=function(){};b.prototype.setResumeChangeReason=function(s){if(h(s,this.sResumeChangeReason)){this.sResumeChangeReason=s;}};b.prototype.toString=function(){return this.getMetadata().getName()+": "+(this.bRelative?this.oContext+"|":"")+this.sPath;};b.prototype.withCache=function(p,P,s,w){var o=s?S.resolve(this.oCache):this.oCachePromise,R,t=this;P=P||"";return o.then(function(e){if(e){R=t.getRelativePath(P);if(R!==undefined){return p(e,R,t);}}else if(e===undefined){return undefined;}else if(t.oOperation){return w?p(null,t.getRelativePath(P),t):undefined;}if(t.bRelative&&t.oContext&&t.oContext.withCache){return t.oContext.withCache(p,P[0]==="/"?P:_.buildPath(t.sPath,P),s,w);}return undefined;});};function d(p){if(this){b.apply(this,arguments);}else{Object.assign(p,b.prototype);}}["adjustPredicate","destroy","doDeregisterChangeListener","hasPendingChangesForPath"].forEach(function(m){d.prototype[m]=b.prototype[m];});return d;},false);
