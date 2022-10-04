/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/rta/plugin/BaseCreate","sap/ui/fl/Utils","sap/ui/dt/Util","sap/base/util/uid"],function(t,e,a,r){"use strict";var n=t.extend("sap.ui.rta.plugin.CreateContainer",{metadata:{library:"sap.ui.rta",properties:{},associations:{},events:{}}});n.prototype.isEnabled=function(t,e){var a=t[0];var r=this.getCreateAction(e,a);return this.isActionEnabled(r,e,a)};n.prototype.getCreateContainerText=function(t,e){var a=this.getCreateAction(t,e);var r=this._getParentOverlay(t,e);var n=r.getDesignTimeMetadata();var i=r.getElement();var o="CTX_CREATE_CONTAINER";return this._getText(a,i,n,o)};n.prototype._getContainerTitle=function(t,e,a){var r="TITLE_CREATE_CONTAINER";return this._getText(t,e,a,r)};n.prototype.handleCreate=function(t,n){var i=this.getCreateAction(t,n);var o=this._getParentOverlay(t,n);var s=o.getElement();var g=o.getDesignTimeMetadata();var d=e.getViewForControl(s);var C;if(t){C=n.getElement()}var u=d.createId(r());var l=g.getAggregation(i.aggregation).getIndex;var h=this._determineIndex(s,C,i.aggregation,l);var c=this.getVariantManagementReference(o);return this.getCommandFactory().getCommandFor(s,"createContainer",{newControlId:u,label:this._getContainerTitle(i,s,g),index:h,parentId:s.getId()},g,c).then(function(t){this.fireElementModified({command:t,action:i,newControlId:u})}.bind(this)).catch(function(t){throw a.createError("CreateContainer#handleCreate",t,"sap.ui.rta")})};n.prototype.getMenuItems=function(t){var e=true;var a="CTX_CREATE_SIBLING_CONTAINER";var r=40;var n=[];var i=function(t,e){return this.isEnabled(e,t)}.bind(this);for(var o=0;o<2;o++){if(this.isAvailable(t,e)){n.push({id:a,text:this.getCreateContainerText.bind(this,e),handler:this.handleCreate.bind(this,e,t[0]),enabled:i.bind(this,e),icon:"sap-icon://add-folder",rank:r})}e=false;a="CTX_CREATE_CHILD_CONTAINER";r=50}return n};n.prototype.getActionName=function(){return"createContainer"};return n});
//# sourceMappingURL=CreateContainer.js.map