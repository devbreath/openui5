/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ColumnHeaderMenuAdapter","../utils/TableUtils","../library","sap/m/library","sap/m/table/columnmenu/QuickAction","sap/m/table/columnmenu/QuickActionContainer","sap/m/table/columnmenu/QuickSort","sap/m/table/columnmenu/QuickSortItem","sap/m/table/columnmenu/QuickGroup","sap/m/table/columnmenu/QuickGroupItem","sap/m/table/columnmenu/QuickTotal","sap/m/table/columnmenu/QuickTotalItem","sap/m/table/columnmenu/Item","sap/m/table/columnmenu/ItemContainer","sap/m/table/columnmenu/ActionItem","sap/m/Button","sap/m/Input","sap/ui/core/library","sap/ui/Device"],function(e,t,i,o,r,u,n,s,c,a,l,_,p,m,h,k,Q,d,C){"use strict";var g=e.extend("sap.ui.table.menus.MobileColumnHeaderMenuAdapter",{});g.prototype.injectMenuItems=function(e,t){this._oColumn=t;this._oMenu=e;this._prepareQuickActions(e,t);e.addAggregation("_quickActions",this._oQuickActionContainer);this._prepareItems(e,t);e.addAggregation("_items",this._oItemContainer)};g.prototype.removeMenuItems=function(e){delete this._oColumn;e.removeAllAggregation("_quickActions");e.removeAllAggregation("_items")};g.prototype.onAfterMenuDestroyed=function(e){if(e!==this._oMenu){return}delete this._oQuickActionContainer;delete this._oQuickSort;delete this._oQuickFreeze;delete this._oQuickFilter;delete this._oQuickGroup;delete this._oQuickTotal;delete this._oItemContainer;delete this._oCustomFilterItem};g.prototype.destroy=function(){e.prototype.destroy.apply(this,arguments);this._destroyQuickActions();this._destroyItems();delete this._oColumn};g.prototype._prepareQuickActions=function(e,t){var i=t._getTable();this._prepareQuickSort(e,t);if(!i.getEnableCustomFilter()){this._prepareQuickFilter(e,t)}this._prepareQuickGroup(e,t);this._prepareQuickTotal(e,t);this._prepareQuickFreeze(e,t);this._prepareQuickResize(e,t);if(!this._oQuickActionContainer){this._oQuickActionContainer=new u}this._oQuickActionContainer.addQuickAction(this._oQuickSort);this._oQuickActionContainer.addQuickAction(this._oQuickFilter);this._oQuickActionContainer.addQuickAction(this._oQuickGroup);this._oQuickActionContainer.addQuickAction(this._oQuickTotal);this._oQuickActionContainer.addQuickAction(this._oQuickFreeze);this._oQuickActionContainer.addQuickAction(this._oQuickResize)};g.prototype._prepareItems=function(e,t){var i=t._getTable();if(i.getEnableCustomFilter()){this._prepareCustomFilterItem(e,t)}if(!this._oItemContainer){this._oItemContainer=new m}this._oItemContainer.addItem(this._oCustomFilterItem)};g.prototype._destroyQuickActions=function(){if(this._oQuickActionContainer){this._oQuickActionContainer.destroy()}delete this._oQuickActionContainer;delete this._oQuickSort;delete this._oQuickFilter;delete this._oQuickGroup;delete this._oQuickTotal;delete this._oQuickFreeze};g.prototype._destroyItems=function(){if(this._oItemContainer){this._oItemContainer.destroy()}delete this._oItemContainer;delete this._oCustomFilterItem};g.prototype._prepareQuickSort=function(e,t){if(t.isSortableByMenu()){if(!this._oQuickSort){this._oQuickSort=this._createQuickSort(e)}this._oQuickSort.getItems()[0].setSortOrder(t.getSorted()?t.getSortOrder():d.SortOrder.None)}else if(this._oQuickSort){this._oQuickSort.destroy();delete this._oQuickSort}};g.prototype._createQuickSort=function(e){return new n({items:new s,change:[function(e){var t=e.getParameter("item").getSortOrder();if(t===d.SortOrder.None){this._oColumn._unsort()}else{this._oColumn.sort(t===d.SortOrder.Descending,true)}},this]})};g.prototype._prepareQuickFilter=function(e,t){if(t.getShowFilterMenuEntry()&&t.isFilterableByMenu()){if(!this._oQuickFilter){this._oQuickFilter=this._createQuickFilter(e,t)}var i=this._oQuickFilter.getContent()[0];i.setValue(t.getFilterValue());i.setValueState(t._getFilterState())}else if(this._oQuickFilter){this._oQuickFilter.destroy();delete this._oQuickFilter}};g.prototype._createQuickFilter=function(e,t){var i=sap.ui.getCore().getLibraryResourceBundle("sap.m");return new r({label:i.getText("table.COLUMNMENU_QUICK_FILTER"),content:new Q({submit:[function(e){this._oColumn.setFilterValue(e.getSource().getValue());var t=this._oColumn._getFilterState();if(t===d.ValueState.None){this._oColumn.filter(e.getSource().getValue());this._oMenu.close()}e.getSource().setValueState(t)},this]}),category:o.table.columnmenu.Category.Filter})};g.prototype._prepareQuickGroup=function(e,t){if(t.isGroupableByMenu()){if(!this._oQuickGroup){this._oQuickGroup=this._createQuickGroup(e)}this._oQuickGroup.getItems()[0].setGrouped(t.getGrouped())}else if(this._oQuickGroup){this._oQuickGroup.destroy();delete this._oQuickGroup}};g.prototype._createQuickGroup=function(e,t){return new c({items:new a,change:[function(e){this._oColumn._setGrouped(e.getParameter("item").getGrouped())},this]})};g.prototype._prepareQuickTotal=function(e,t){if(t._isAggregatableByMenu()){if(!this._oQuickTotal){this._oQuickTotal=this._createQuickTotal(e)}this._oQuickTotal.getItems()[0].setTotaled(t.getSummed())}else if(this._oQuickTotal){this._oQuickTotal.destroy();delete this._oQuickTotal}};g.prototype._createQuickTotal=function(e,t){return new l({items:new _,change:[function(e){this._oColumn.setSummed(e.getParameter("item").getTotaled())},this]})};g.prototype._prepareQuickFreeze=function(e,i){var o=i._getTable();if(o.getEnableColumnFreeze()){var r=i.getIndex()+t.Column.getHeaderSpan(i)===o.getComputedFixedColumnCount();var u=r?"TBL_UNFREEZE":"TBL_FREEZE";if(!this._oQuickFreeze){this._oQuickFreeze=this._createQuickFreeze(e,i)}this._oQuickFreeze.getContent()[0].setText(t.getResourceText(u))}else if(this._oQuickFreeze){this._oQuickFreeze.destroy();delete this._oQuickFreeze}};g.prototype._createQuickFreeze=function(e,i){return new r({content:new k({press:[function(e){var i=this._oColumn._getTable();var o=i.fireColumnFreeze({column:this._oColumn});if(o){var r=e.getSource().getText()===t.getResourceText("TBL_UNFREEZE");if(r){i.setFixedColumnCount(0)}else{i.setFixedColumnCount(this._oColumn.getIndex()+1)}}this._oMenu.close()},this]})})};g.prototype._prepareQuickResize=function(e,t){if(C.support.touch&&t.getResizable()){if(!this._oQuickResize){this._oQuickResize=this._createQuickResize(e,t)}}else if(this._oQuickResize){this._oQuickResize.destroy();delete this._oQuickResize}};g.prototype._createQuickResize=function(e,t){return new r({content:new k({icon:"sap-icon://resize-horizontal",press:[function(e){this._startColumnResize(t);this._oMenu.close()},this]})})};g.prototype._startColumnResize=function(e){var t=e._getTable();t.$().toggleClass("sapUiTableResizing",true);t._$colResize=t.$("rsz");t._$colResize.toggleClass("sapUiTableColRszActive",true)};g.prototype._removeHeaderCellColumnResizer=function(e){var t=e&&e.$().find(".sapUiTableCHT .sapUiTableCellTouchMenu");if(t.length){t.parent().find(".sapUiTableCellInner").show();t.remove()}};g.prototype._prepareCustomFilterItem=function(e,t){if(t.getShowFilterMenuEntry()){if(!this._oCustomFilterItem){this._oCustomFilterItem=this._createCustomFilterItem(e)}}else if(this._oCustomFilterItem){this._oCustomFilterItem.destroy();delete this._oCustomFilterItem}};g.prototype._createCustomFilterItem=function(e,i){return new h({label:t.getResourceText("TBL_FILTER_ITEM"),icon:"sap-icon://filter",press:[function(e){this._oColumn._getTable().fireCustomFilter({column:this._oColumn})},this]})};return g});
//# sourceMappingURL=MobileColumnHeaderMenuAdapter.js.map