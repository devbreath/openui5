/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/base/ManagedObjectObserver","sap/ui/core/Control","sap/ui/Device","sap/ui/core/ResizeHandler","./ToolPageRenderer"],function(e,t,i,n,s,r){"use strict";var o=i.extend("sap.tnt.ToolPage",{metadata:{library:"sap.tnt",properties:{sideExpanded:{type:"boolean",group:"Misc",defaultValue:true}},aggregations:{header:{type:"sap.tnt.IToolHeader",multiple:false},subHeader:{type:"sap.tnt.IToolHeader",multiple:false},sideContent:{type:"sap.tnt.SideNavigation",multiple:false},mainContents:{type:"sap.ui.core.Control",multiple:true,singularName:"mainContent"}},events:{}},renderer:r});o.prototype.init=function(){this._oContentObserver=new t(this._onContentChange.bind(this));this._oContentObserver.observe(this,{aggregations:["subHeader","sideContent"]});this._oContentVisibilityObserver=new t(this._onContentVisibilityChange.bind(this));this._deregisterControl()};o.prototype.exit=function(){this._deregisterControl();if(this._oContentObserver){this._oContentObserver.disconnect();this._oContentObserver=null}if(this._oContentVisibilityObserver){this._oContentVisibilityObserver.disconnect();this._oContentVisibilityObserver=null}};o.prototype.onBeforeRendering=function(){this._deregisterControl()};o.prototype.onAfterRendering=function(){this._ResizeHandler=s.register(this.getDomRef(),this._mediaQueryHandler.bind(this));this._updateLastMediaQuery()};o.prototype.toggleSideContentMode=function(){return this.setSideExpanded(!this.getSideExpanded())};o.prototype.setSideExpanded=function(e){this.setProperty("sideExpanded",e,true);var t=this.getSideContent();if(t){var i=n.system.phone?true:e;t.setExpanded(i)}else{return this}var s=this.getDomRef();if(!s){return this}if(e){s.querySelector(".sapTntToolPageContentWrapper").classList.remove("sapTntToolPageAsideCollapsed")}else{s.querySelector(".sapTntToolPageContentWrapper").classList.add("sapTntToolPageAsideCollapsed")}return this};o.prototype._deregisterControl=function(){if(this._ResizeHandler){s.deregister(this._ResizeHandler);this._ResizeHandler=null}};o.prototype._mediaQueryHandler=function(){var e=this.getSideContent();if(e===null){return}this._currentMediaQuery=this._getDeviceAsString();if(this._getLastMediaQuery()===this._currentMediaQuery){return}switch(this._currentMediaQuery){case"Combi":this.setSideExpanded(true);break;case"Tablet":this.setSideExpanded(false);break;case"Phone":this.setSideExpanded(false);e.setExpanded(true);break;default:this.setSideExpanded(true)}this._updateLastMediaQuery()};o.prototype._getLastMediaQuery=function(){return this._lastMediaQuery};o.prototype._updateLastMediaQuery=function(){this._lastMediaQuery=this._getDeviceAsString();return this};o.prototype._getDeviceAsString=function(){if(n.system.combi){return"Combi"}if(n.system.phone){return"Phone"}if(n.system.tablet){return"Tablet"}return"Desktop"};o.prototype._onContentChange=function(e){switch(e.mutation){case"insert":this._oContentVisibilityObserver.observe(e.child,{properties:["visible"]});break;case"remove":this._oContentVisibilityObserver.unobserve(e.child,{properties:["visible"]});break}};o.prototype._onContentVisibilityChange=function(e){this.invalidate()};return o});
//# sourceMappingURL=ToolPage.js.map