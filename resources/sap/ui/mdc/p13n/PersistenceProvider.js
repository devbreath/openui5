/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/fl/variants/VariantManagement","sap/ui/fl/Utils","sap/ui/mdc/enum/PersistenceMode","sap/ui/layout/VerticalLayout"],function(C,V,U,m,a){"use strict";var P=C.extend("sap.ui.mdc.p13n.PersistenceProvider",{metadata:{library:"sap.ui.mdc",designtime:"sap/ui/mdc/designtime/p13n/PersistenceProvider.designtime",properties:{mode:{type:"sap.ui.mdc.enum.PersistenceMode",group:"Data",defaultValue:m.Auto}},associations:{"for":{type:"sap.ui.core.Control",multiple:true}}},renderer:{apiVersion:2,render:function(r,c){r.openStart("div",c);r.openEnd();r.close("div");}}});P.prototype.init=function(){C.prototype.init.apply(this,arguments);this.attachModelContextChange(this._setModel,this);this._oModelPromise=new Promise(function(r,b){this._fnResolveModel=r;}.bind(this));};P.prototype._setModel=function(){var M=this.getModel(U.VARIANT_MODEL_NAME);if(M){this._fnResolveModel(M);}};P.prototype.applySettings=function(){C.prototype.applySettings.apply(this,arguments);this._bmodeLocked=true;if(this.getMode()===m.Transient){var v=new V(this.getId()+"--vm",{"for":this.getAssociation("for")});this._oModelPromise.then(function(M){v.setModel(M,U.VARIANT_MODEL_NAME);});this._oWrapper=new a(this.getId()+"--accWrapper",{visible:true,content:[v]});this._oWrapper.onAfterRendering=function(){a.prototype.onAfterRendering.apply(this,arguments);this.getDomRef().setAttribute("aria-hidden",true);};var s=sap.ui.getCore().getUIArea(sap.ui.getCore().getStaticAreaRef());s.addContent(this._oWrapper);}return this;};P.prototype.addFor=function(c){this.addAssociation("for",c);var v=sap.ui.getCore().byId(this.getId()+"--vm");if(this.getMode()===m.Transient&&v){v.addFor(c);}return this;};P.prototype.removeFor=function(c){this.removeAssociation("for",c);var v=sap.ui.getCore().byId(this.getId()+"--vm");if(this.getMode()===m.Transient&&v){v.removeFor(c);}return this;};P.prototype.setMode=function(v){if(this._bmodeLocked&&v!==this.getMode()){throw new Error("mode is a final property.");}this.setProperty("mode",v);return this;};P.prototype.exit=function(){if(this._oWrapper){var s=sap.ui.getCore().getUIArea(sap.ui.getCore().getStaticAreaRef());s.removeContent(this._oWrapper);this._oWrapper.destroy();this._oWrapper=null;}this._oModelPromise=null;this._fnResolveModel=null;this._bmodeLocked=null;C.prototype.exit.apply(this,arguments);};return P;});
