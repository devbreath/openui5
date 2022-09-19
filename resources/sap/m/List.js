/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","./ListBase","./ListRenderer"],function(l,L,a){"use strict";var B=l.BackgroundDesign;var b=L.extend("sap.m.List",{metadata:{library:"sap.m",properties:{backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:B.Solid}}}});b.prototype.getAriaRole=function(){return this._sAriaRole||"list";};b.prototype.applyAriaRole=function(r){this._sAriaRole=r;};b.prototype.enhanceAccessibilityState=function(e,A){L.prototype.enhanceAccessibilityState.apply(this,arguments);if(this.getAriaRole()==="listbox"&&e.isA("sap.m.ListItemBase")){A.roledescription=null;A.role="option";A.owns=null;if(e.isSelectable()){A.selected=e.getSelected();}}};return b;});
