/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/dt/OverlayRegistry"],function(M,O){"use strict";var P=M.extend("sap.ui.dt.Plugin",{metadata:{"abstract":true,library:"sap.ui.dt",properties:{designTime:{type:"object",multiple:false},busy:{type:"boolean",defaultValue:false}},events:{processingStatusChange:{parameters:{processing:{type:"boolean"}}}}}});P.prototype._bProcessingCounter=0;P.prototype._oBusyPromise={};P.prototype.init=function(){};P.prototype.exit=function(){this.setDesignTime(null);};P.prototype.setDesignTime=function(d){var o=this.getDesignTime();if(o){this._deregisterOverlays(o);}this.setProperty("designTime",d);if(d){this._registerOverlays(d);}return this;};P.prototype._registerOverlays=function(d){if(this.registerElementOverlay||this.registerAggregationOverlay){var e=d.getElementOverlays();this.setProcessingStatus(true);e.forEach(this.callElementOverlayRegistrationMethods.bind(this));this.setProcessingStatus(false);}};P.prototype._deregisterOverlays=function(d){if(this.deregisterElementOverlay||this.deregisterAggregationOverlay){var o=d.getElementOverlays();o.forEach(this._callElementOverlayDeregestrationMethods.bind(this));}};P.prototype.callAggregationOverlayRegistrationMethods=function(e){if(this.registerAggregationOverlay){var a=e.getAggregationOverlays();a.forEach(this.registerAggregationOverlay.bind(this));}};P.prototype.callElementOverlayRegistrationMethods=function(e){if(this.registerElementOverlay){this.registerElementOverlay(e);}this.callAggregationOverlayRegistrationMethods(e);};P.prototype._callElementOverlayDeregestrationMethods=function(e){if(this.deregisterElementOverlay){this.deregisterElementOverlay(e);}if(this.deregisterAggregationOverlay){var a=e.getAggregationOverlays();a.forEach(this.deregisterAggregationOverlay.bind(this));}};P.prototype._onElementOverlayCreated=function(e){var o=e.getParameter("elementOverlay");this.callElementOverlayRegistrationMethods(o);};P.prototype.getMenuItems=function(){return[];};P.prototype.getActionName=function(){};P.prototype.isBusy=P.prototype.getBusy;P.prototype.setBusy=function(b){if(b&&!this.getBusy()){this._oBusyPromise.promise=new Promise(function(r){this._oBusyPromise.resolveFunction=r;}.bind(this));}else if(!b&&this.getBusy()&&this._oBusyPromise.resolveFunction){this._oBusyPromise.resolveFunction();}this.setProperty("busy",b);return this;};P.prototype.waitForBusyAction=function(){return this._oBusyPromise.promise||Promise.resolve();};P.prototype.setProcessingStatus=function(p){this._bProcessingCounter=p?this._bProcessingCounter+1:this._bProcessingCounter-1;if((p===true&&this._bProcessingCounter===1)||(p===false&&this._bProcessingCounter===0)){this.fireProcessingStatusChange({processing:p});}};P.prototype.getAction=function(o){return o.getDesignTimeMetadata()?o.getDesignTimeMetadata().getAction(this.getActionName(),o.getElement()):null;};P.prototype.getSelectedOverlays=function(){return this.getDesignTime().getSelectionManager().get();};P.prototype.getActionText=function(o,a,p){var n=a.name;var e=o.getElement();if(n){if(typeof n==="function"){return n(e);}return o.getDesignTimeMetadata()?o.getDesignTimeMetadata().getLibraryText(e,n):"";}return sap.ui.getCore().getLibraryResourceBundle('sap.ui.rta').getText(p);};P.prototype.isAvailable=function(){return false;};P.prototype.handler=function(){};P.prototype.isEnabled=function(e){if(!Array.isArray(e)||e.length>1){return false;}var E=e[0];var a=this.getAction(E);if(!a){return false;}var o=E.getElement();if(a.isEnabled===undefined){return true;}if(typeof a.isEnabled==="function"){return a.isEnabled(o);}return a.isEnabled;};P.prototype._getMenuItems=function(e,p){var m=this.enhanceItemWithResponsibleElement({id:p.pluginId,handler:this.handler.bind(this),enabled:this.isEnabled.bind(this),rank:p.rank,icon:p.icon,group:p.group},e);var r=m.responsible||e;var R=r[0];var a=this.getAction(R);if(!a||!this.isAvailable(r)){return[];}m.text=this.getActionText(R,a,p.pluginId);return[m];};P.prototype.isResponsibleElementActionAvailable=function(e,a){var d=e.getDesignTimeMetadata();if(d){return d.isResponsibleActionAvailable(a||this.getActionName());}return false;};P.prototype.getResponsibleElementOverlay=function(e){var E=e.getElement();var d=e.getDesignTimeMetadata();if(d){var r=d.getResponsibleElement(E);if(r){try{return O.getOverlay(r);}catch(o){return e;}}}return e;};P.prototype.enhanceItemWithResponsibleElement=function(m,e,a){var r=[];var A=a||[this.getActionName()];var E=A.some(function(s){if(this.isResponsibleElementActionAvailable(e[0],s)){r=e.map(this.getResponsibleElementOverlay.bind(this));return true;}}.bind(this));return Object.assign(m,E&&{responsible:r});};return P;});
