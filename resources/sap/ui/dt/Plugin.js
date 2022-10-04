/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/dt/OverlayRegistry"],function(e,t){"use strict";var i=e.extend("sap.ui.dt.Plugin",{metadata:{abstract:true,library:"sap.ui.dt",properties:{designTime:{type:"object",multiple:false},busy:{type:"boolean",defaultValue:false}},events:{processingStatusChange:{parameters:{processing:{type:"boolean"}}}}}});i.prototype._bProcessingCounter=0;i.prototype._oBusyPromise={};i.prototype.init=function(){};i.prototype.exit=function(){this.setDesignTime(null)};i.prototype.setDesignTime=function(e){var t=this.getDesignTime();if(t){this._deregisterOverlays(t)}this.setProperty("designTime",e);if(e){this._registerOverlays(e)}return this};i.prototype._registerOverlays=function(e){if(this.registerElementOverlay||this.registerAggregationOverlay){var t=e.getElementOverlays();this.setProcessingStatus(true);t.forEach(this.callElementOverlayRegistrationMethods.bind(this));this.setProcessingStatus(false)}};i.prototype._deregisterOverlays=function(e){if(this.deregisterElementOverlay||this.deregisterAggregationOverlay){var t=e.getElementOverlays();t.forEach(this._callElementOverlayDeregestrationMethods.bind(this))}};i.prototype.callAggregationOverlayRegistrationMethods=function(e){if(this.registerAggregationOverlay){var t=e.getAggregationOverlays();t.forEach(this.registerAggregationOverlay.bind(this))}};i.prototype.callElementOverlayRegistrationMethods=function(e){if(this.registerElementOverlay){this.registerElementOverlay(e)}this.callAggregationOverlayRegistrationMethods(e)};i.prototype._callElementOverlayDeregestrationMethods=function(e){if(this.deregisterElementOverlay){this.deregisterElementOverlay(e)}if(this.deregisterAggregationOverlay){var t=e.getAggregationOverlays();t.forEach(this.deregisterAggregationOverlay.bind(this))}};i.prototype._onElementOverlayCreated=function(e){var t=e.getParameter("elementOverlay");this.callElementOverlayRegistrationMethods(t)};i.prototype.getMenuItems=function(){return[]};i.prototype.getActionName=function(){};i.prototype.isBusy=i.prototype.getBusy;i.prototype.setBusy=function(e){if(e&&!this.getBusy()){this._oBusyPromise.promise=new Promise(function(e){this._oBusyPromise.resolveFunction=e}.bind(this))}else if(!e&&this.getBusy()&&this._oBusyPromise.resolveFunction){this._oBusyPromise.resolveFunction()}this.setProperty("busy",e);return this};i.prototype.waitForBusyAction=function(){return this._oBusyPromise.promise||Promise.resolve()};i.prototype.setProcessingStatus=function(e){this._bProcessingCounter=e?this._bProcessingCounter+1:this._bProcessingCounter-1;if(e===true&&this._bProcessingCounter===1||e===false&&this._bProcessingCounter===0){this.fireProcessingStatusChange({processing:e})}};i.prototype.getAction=function(e){return e.getDesignTimeMetadata()?e.getDesignTimeMetadata().getAction(this.getActionName(),e.getElement()):null};i.prototype.getSelectedOverlays=function(){return this.getDesignTime().getSelectionManager().get()};i.prototype.getActionText=function(e,t,i){var r=t.name;var s=e.getElement();if(r){if(typeof r==="function"){return r(s)}return e.getDesignTimeMetadata()?e.getDesignTimeMetadata().getLibraryText(s,r):""}return sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta").getText(i)};i.prototype.isAvailable=function(){return false};i.prototype.handler=function(){};i.prototype.isEnabled=function(e){if(!Array.isArray(e)||e.length>1){return false}var t=e[0];var i=this.getAction(t);if(!i){return false}var r=t.getElement();if(i.isEnabled===undefined){return true}if(typeof i.isEnabled==="function"){return i.isEnabled(r)}return i.isEnabled};i.prototype._getMenuItems=function(e,t){var i=this.enhanceItemWithResponsibleElement({id:t.pluginId,handler:this.handler.bind(this),enabled:this.isEnabled.bind(this),rank:t.rank,icon:t.icon,group:t.group},e);var r=i.responsible||e;var s=r[0];var n=this.getAction(s);if(!n||!this.isAvailable(r)){return[]}i.text=this.getActionText(s,n,t.pluginId);return[i]};i.prototype.isResponsibleElementActionAvailable=function(e,t){var i=e.getDesignTimeMetadata();if(i){return i.isResponsibleActionAvailable(t||this.getActionName())}return false};i.prototype.getResponsibleElementOverlay=function(e){var i=e.getElement();var r=e.getDesignTimeMetadata();if(r){var s=r.getResponsibleElement(i);if(s){try{return t.getOverlay(s)}catch(t){return e}}}return e};i.prototype.enhanceItemWithResponsibleElement=function(e,t,i){var r=[];var s=i||[this.getActionName()];var n=s.some(function(e){if(this.isResponsibleElementActionAvailable(t[0],e)){r=t.map(this.getResponsibleElementOverlay.bind(this));return true}}.bind(this));return Object.assign(e,n&&{responsible:r})};return i});
//# sourceMappingURL=Plugin.js.map