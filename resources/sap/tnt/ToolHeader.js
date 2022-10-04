/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/m/OverflowToolbar","sap/m/OverflowToolbarAssociativePopover","./ToolHeaderRenderer","sap/ui/Device","sap/m/library"],function(e,t,o,a,r,s){"use strict";var p=s.PlacementType;var n=t.extend("sap.tnt.ToolHeader",{metadata:{interfaces:["sap.tnt.IToolHeader"],library:"sap.tnt",properties:{},aggregations:{}},renderer:a});n.prototype.init=function(){t.prototype.init.apply(this,arguments);this.addStyleClass("sapTntToolHeader sapContrast sapContrastPlus")};n.prototype._getPopover=function(){var e=this.getAggregation("_popover");if(!e){e=new o(this.getId()+"-popover",{showHeader:false,showArrow:r.system.phone?false:true,modal:false,horizontalScrolling:r.system.phone?false:true,contentWidth:r.system.phone?"100%":"auto"}).addStyleClass("sapTntToolHeaderPopover sapContrast sapContrastPlus");if(r.system.phone){e.attachBeforeOpen(this._shiftPopupShadow,this);e.attachAfterOpen(this._shiftPopupShadow,this)}e.attachAfterClose(this._popOverClosedHandler,this);this.setAggregation("_popover",e,true)}return e};n.prototype._getBestActionSheetPlacement=function(){return p.Bottom};return n});
//# sourceMappingURL=ToolHeader.js.map