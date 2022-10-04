/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./delegate/GridItemNavigation","./GridListRenderer","./GridNavigationMatrix","./library","sap/m/ListBase","sap/ui/base/ManagedObjectObserver","sap/ui/core/Core","sap/ui/Device","sap/ui/layout/cssgrid/GridLayoutDelegate","sap/ui/layout/cssgrid/GridLayoutBase"],function(t,e,i,o,a,r,s,n,p,d){"use strict";var u=o.NavigationDirection;var g=a.extend("sap.f.GridList",{metadata:{library:"sap.f",interfaces:["sap.ui.layout.cssgrid.IGridConfigurable","sap.f.dnd.IGridDroppable"],aggregations:{customLayout:{type:"sap.ui.layout.cssgrid.GridLayoutBase",multiple:false}},events:{borderReached:{parameters:{event:{type:"jQuery.Event"},direction:{type:"sap.f.NavigationDirection"},row:{type:"int"},column:{type:"int"}}}}},renderer:e});g.prototype.init=function(){a.prototype.init.apply(this,arguments);this._oItemDelegate={onAfterRendering:this._onAfterItemRendering};this._addGridLayoutDelegate();this._oGridObserver=new r(g.prototype._onGridChange.bind(this));this._oGridObserver.observe(this,{aggregations:["items"]})};g.prototype.exit=function(){this._removeGridLayoutDelegate();if(this._oGridObserver){this._oGridObserver.disconnect();this._oGridObserver=null}a.prototype.exit.apply(this,arguments)};g.prototype.onAfterPageLoaded=function(){a.prototype.onAfterPageLoaded.apply(this,arguments);if(this._oItemNavigation){this._oItemNavigation.resetFocusPosition()}};g.prototype.onItemNavigationBorderReached=function(t){var e=this.getGrowingInfo();if(t.direction===u.Down&&e&&e.actual!==e.total){return}this.fireEvent("borderReached",t)};g.prototype.getGridDomRefs=function(){return[this.getItemsContainerDomRef()]};g.prototype.focusItemByDirection=function(t,e,i){this._oItemNavigation.focusItemByDirection(this,t,e,i)};g.prototype.getNavigationMatrix=function(){if(!s.isThemeApplied()){return null}var t=this.getItems().reduce(function(t,e){if(e.getVisible()){t.push(e.getDomRef())}return t},[]);return i.create(this.getItemsContainerDomRef(),t,this._getActiveLayoutSizes())};g.prototype.getGridLayoutConfiguration=g.prototype.getCustomLayout;g.prototype._startItemNavigation=function(e){if(!n.system.desktop){return}if(!this._oItemNavigation){this._oItemNavigation=new t;this._oItemNavigation.setCycling(false).setDisabledModifiers({sapnext:["alt"],sapprevious:["alt"]}).setFocusedIndex(0);this.addDelegate(this._oItemNavigation);this._setItemNavigationTabIndex(0)}a.prototype._startItemNavigation.apply(this,arguments)};g.prototype._addGridLayoutDelegate=function(){if(!this.oGridLayoutDelegate){this.oGridLayoutDelegate=new p;this.addEventDelegate(this.oGridLayoutDelegate,this)}};g.prototype._removeGridLayoutDelegate=function(){if(this.oGridLayoutDelegate){this.removeEventDelegate(this.oGridLayoutDelegate);this.oGridLayoutDelegate.destroy();this.oGridLayoutDelegate=null}};g.prototype._onGridChange=function(t){var e;if(t.name!=="items"||!t.child){return}if(t.mutation==="insert"){e=!t.child.isA("sap.ui.core.HTML");t.child.addDelegate(this._oItemDelegate,e,t.child)}else if(t.mutation==="remove"){t.child.removeEventDelegate(this._oItemDelegate,t.child)}};g.prototype._onAfterItemRendering=function(){d.setItemStyles(this)};g.prototype.updateItems=function(){a.prototype.updateItems.apply(this,arguments);this.invalidate()};g.prototype.onLayoutDataChange=function(t){d.setItemStyles(t.srcControl)};g.prototype._getActiveLayoutSizes=function(){var t=this.getItemsContainerDomRef(),e=window.getComputedStyle(t);return{gap:parseFloat(e.rowGap),rows:e.gridTemplateRows.split(/\s+/),columns:e.gridTemplateColumns.split(/\s+/)}};return g});
//# sourceMappingURL=GridList.js.map