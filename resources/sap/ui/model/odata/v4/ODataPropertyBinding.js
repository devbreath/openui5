/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ODataBinding","./lib/_Cache","./lib/_Helper","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/model/BindingMode","sap/ui/model/ChangeReason","sap/ui/model/odata/v4/Context","sap/ui/model/PropertyBinding"],function(a,_,b,L,S,B,C,c,P){"use strict";var s="sap.ui.model.odata.v4.ODataPropertyBinding",i=Object.freeze([]),m={AggregatedDataStateChange:true,change:true,dataReceived:true,dataRequested:true,DataStateChange:true},v="/"+c.VIRTUAL,O=P.extend("sap.ui.model.odata.v4.ODataPropertyBinding",{constructor:d});function d(M,p,o,e){P.call(this,M,p);a.call(this);if(p.endsWith("/")){throw new Error("Invalid path: "+p);}if(e){this.checkBindingParameters(e,["$$groupId","$$ignoreMessages","$$noPatch"]);this.sGroupId=e.$$groupId;this.bNoPatch=e.$$noPatch;this.setIgnoreMessages(e.$$ignoreMessages);}else{this.sGroupId=undefined;this.bNoPatch=false;}this.oCheckUpdateCallToken=undefined;this.oContext=o;this.bHasDeclaredType=undefined;this.bInitial=true;this.mQueryOptions=this.oModel.buildQueryOptions(b.clone(e),p.endsWith("$count"));this.vValue=undefined;this.fetchCache(o);M.bindingCreated(this);}a(O.prototype);O.prototype.attachEvent=function(e,f,g,h){if(!(e in m)){throw new Error("Unsupported event '"+e+"': v4.ODataPropertyBinding#attachEvent");}return P.prototype.attachEvent.apply(this,arguments);};O.prototype.checkUpdateInternal=function(f,e,g,V){var D=false,h=this.sPath.indexOf("##"),I=h>=0,M=this.oModel.getMetaModel(),p={data:{}},r=this.getResolvedPath(),o={forceUpdate:r&&(f||f===undefined&&this.getDataState().getControlMessages().length>0||this.oCheckUpdateCallToken&&this.oCheckUpdateCallToken.forceUpdate)},t=this.oType,j=this;this.oCheckUpdateCallToken=o;if(this.bHasDeclaredType===undefined){this.bHasDeclaredType=!!t;}if(r&&!this.bHasDeclaredType&&this.sInternalType!=="any"&&!I){t=M.fetchUI5Type(r);}if(V===undefined){V=this.oCachePromise.then(function(k){var l,n;if(k){return k.fetchValue(j.lockGroup(g||j.getGroupId()),undefined,function(){D=true;j.fireDataRequested();},j).then(function(R){j.assertSameCache(k);return R;});}if(!j.sReducedPath||!j.isResolved()){return undefined;}if(r.includes(v)){o.forceUpdate=false;}if(!I){return j.oContext.fetchValue(j.sReducedPath,j);}l=j.sPath.slice(0,h);n=j.sPath.slice(h+2);if(n[0]==="/"){n="."+n;}return M.fetchObject(n,M.getMetaContext(j.oModel.resolve(l,j.oContext)));}).then(function(V){if(!V||typeof V!=="object"){return V;}if(j.sInternalType==="any"&&(j.getBindingMode()===B.OneTime||(j.sPath[j.sPath.lastIndexOf("/")+1]==="#"&&!I))){if(I){return V;}else if(j.bRelative){return b.publicClone(V);}}L.error("Accessed value is not primitive",r,s);},function(E){j.oModel.reportError("Failed to read path "+r,s,E);if(E.canceled){o.forceUpdate=false;return j.vValue;}p={error:E};});if(f&&V.isFulfilled()){if(t&&t.isFulfilled&&t.isFulfilled()){this.setType(t.getResult(),this.sInternalType);}this.vValue=V.getResult();}V=Promise.resolve(V);}return S.all([V,t]).then(function(R){var T=R[1],V=R[0];if(o===j.oCheckUpdateCallToken){j.oCheckUpdateCallToken=undefined;j.setType(T,j.sInternalType);if(o.forceUpdate||j.vValue!==V){j.bInitial=false;j.vValue=V;j._fireChange({reason:e||C.Change});}j.checkDataState();}if(D){j.fireDataReceived(p);}if(p.error){throw p.error;}});};O.prototype.deregisterChangeListener=function(){var t=this;this.withCache(function(e,p,o){o.doDeregisterChangeListener(p,t);},"",false,true).catch(this.oModel.getReporter());};O.prototype.destroy=function(){this.deregisterChangeListener();this.oModel.bindingDestroyed(this);this.oCheckUpdateCallToken=undefined;this.mQueryOptions=undefined;this.vValue=undefined;a.prototype.destroy.call(this);P.prototype.destroy.apply(this,arguments);};O.prototype.doCreateCache=function(r,q){return _.createProperty(this.oModel.oRequestor,r,q);};O.prototype.doFetchQueryOptions=function(){return this.isRoot()?S.resolve(this.mQueryOptions):S.resolve({});};O.prototype.getDependentBindings=function(){return i;};O.prototype.getResumePromise=function(){};O.prototype.getValue=function(){return this.vValue;};O.prototype.getValueListType=function(){var r=this.getResolvedPath();if(!r){throw new Error(this+" is unresolved");}return this.getModel().getMetaModel().getValueListType(r);};O.prototype.hasPendingChangesInDependents=function(){return false;};O.prototype.initialize=function(){if(this.isResolved()){if(this.getRootBinding().isSuspended()){this.sResumeChangeReason=C.Change;}else{this.checkUpdate(true);}}};O.prototype.isMeta=function(){return this.sPath.includes("##");};O.prototype.onChange=function(V){this.checkUpdateInternal(undefined,undefined,undefined,V).catch(this.oModel.getReporter());};O.prototype.onDelete=function(){};O.prototype.refreshInternal=function(e,g,f,k){var t=this;if(this.isRootBindingSuspended()){this.refreshSuspended(g);return S.resolve();}return this.oCachePromise.then(function(){if(t.oCache&&t.oCache.reset){t.oCache.reset();}else{t.fetchCache(t.oContext,false,true,k);}if(f){return t.checkUpdateInternal(undefined,C.Refresh,g);}});};O.prototype.requestValue=function(){var t=this;return Promise.resolve(this.checkUpdateInternal(false).then(function(){return t.getValue();}));};O.prototype.requestValueListInfo=function(A){var r=this.getResolvedPath();if(!r){throw new Error(this+" is unresolved");}return this.getModel().getMetaModel().requestValueListInfo(r,A,this.oContext);};O.prototype.requestValueListType=function(){var r=this.getResolvedPath();if(!r){throw new Error(this+" is unresolved");}return this.getModel().getMetaModel().requestValueListType(r);};O.prototype.resetChangesInDependents=function(){};O.prototype.resetInvalidDataState=function(){if(this.getDataState().isControlDirty()){this._fireChange({reason:C.Change});}};O.prototype.resume=function(){throw new Error("Unsupported operation: resume");};O.prototype.resumeInternal=function(e,p){var r=this.sResumeChangeReason;this.sResumeChangeReason=undefined;this.fetchCache(this.oContext);if(e){this.checkUpdateInternal(p?undefined:false,r).catch(this.oModel.getReporter());}};O.prototype.setContext=function(o){if(this.oContext!==o){if(this.bRelative){this.checkSuspended(true);this.deregisterChangeListener();}this.oContext=o;this.sResumeChangeReason=undefined;if(this.bRelative){this.fetchCache(this.oContext);this.checkUpdateInternal(this.bInitial||undefined,C.Context).catch(this.oModel.getReporter());}}};O.prototype.setType=function(t,e){var o=this.oType;if(t&&t.getName()==="sap.ui.model.odata.type.DateTimeOffset"){t.setV4();}P.prototype.setType.apply(this,arguments);if(!this.bInitial&&o!==t){this._fireChange({reason:C.Change});}};O.prototype.setValue=function(V,g){var G,t=this;function r(e){t.oModel.reportError("Failed to update path "+t.getResolvedPath(),s,e);return e;}this.checkSuspended();if(this.bNoPatch&&g){throw r(new Error("Must not specify a group ID ("+g+") with $$noPatch"));}this.oModel.checkGroupId(g);if(typeof V==="function"||(V&&typeof V==="object")){throw r(new Error("Not a primitive value"));}if(!this.bNoPatch&&this.vValue===undefined){throw r(new Error("Must not change a property before it has been read"));}if(this.vValue!==V){if(this.oCache){r(new Error("Cannot set value on this binding as it is not relative"+" to a sap.ui.model.odata.v4.Context"));return;}G=this.bNoPatch?null:this.lockGroup(g,true,true);this.oContext.doSetProperty(this.sPath,V,G).catch(function(e){if(G){G.unlock(true);}r(e);});}};O.prototype.supportsIgnoreMessages=function(){return true;};O.prototype.suspend=function(){throw new Error("Unsupported operation: suspend");};O.prototype.visitSideEffects=function(){};return O;});
