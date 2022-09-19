/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./ODataMetaModel','sap/ui/model/Context','sap/ui/model/ChangeReason','sap/ui/model/PropertyBinding',"sap/base/util/deepEqual",'sap/ui/model/ChangeReason'],function(O,C,a,P,d){"use strict";var b=P.extend("sap.ui.model.odata.ODataPropertyBinding",{constructor:function(m,p,c,e){P.apply(this,arguments);this.bInitial=true;this.oValue=this._getValue();this.vOriginalValue=undefined;this.getDataState().setValue(this.oValue);this.setIgnoreMessages(e&&e.ignoreMessages);this.bUseUndefinedIfUnresolved=e&&e.useUndefinedIfUnresolved;}});b.prototype.initialize=function(){if(this.oModel.oMetadata.isLoaded()&&this.bInitial){this.checkUpdate(true);this.bInitial=false;}};b.prototype.getValue=function(){return this.oValue;};b.prototype._getValue=function(){return this.oModel._getObject(this.sPath,this.oContext,undefined,this.bUseUndefinedIfUnresolved);};b.prototype.setValue=function(v){if(this.bSuspended){return;}if(!d(v,this.oValue)&&this.oModel.setProperty(this.sPath,v,this.oContext,true)){this.oValue=v;var D=this.getDataState();D.setValue(this.oValue);this.oModel.firePropertyChange({reason:a.Binding,path:this.sPath,context:this.oContext,value:v});}};b.prototype.setContext=function(c){var f,o=this.oContext;if(c&&c.isPreliminary()){return;}if(C.hasChanged(this.oContext,c)){this.oContext=c;if(this.isRelative()){f=!!(o!==c&&this.getDataState().getControlMessages().length);this.checkUpdate(f);}}};b.prototype.checkUpdate=function(f){var c,t=this;if(this.bSuspended&&!f){return;}c=O.getCodeListTerm(this.sPath);if(c){if(this.bInitial){this.oModel.getMetaModel().fetchCodeList(c).then(function(m){t.oValue=m;t._fireChange({reason:a.Change});},function(){});}return;}var D=this.getDataState();var e=false;var o=this.oModel.getOriginalProperty(this.sPath,this.oContext);if(f||!d(o,this.vOriginalValue)){this.vOriginalValue=o;D.setOriginalValue(o);e=true;}var v=this._getValue();if(f||!d(v,this.oValue)){this.oValue=v;D.setValue(this.oValue);this._fireChange({reason:a.Change});e=true;}if(e){this.checkDataState();}};b.prototype.checkDataState=function(p){var c=this.oModel.resolve(this.sPath,this.oContext,true)||this.getResolvedPath();this.getDataState().setLaundering(!!p&&!!(c in p));P.prototype._checkDataState.call(this,c,p);};b.prototype.supportsIgnoreMessages=function(){return true;};return b;});
