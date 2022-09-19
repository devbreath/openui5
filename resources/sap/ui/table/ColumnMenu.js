/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/unified/Menu','sap/ui/unified/MenuItem','sap/ui/unified/MenuTextFieldItem',"sap/ui/unified/MenuRenderer",'./utils/TableUtils',"sap/base/assert","sap/ui/thirdparty/jquery"],function(l,M,a,b,c,T,d,q){"use strict";var C=new window.WeakMap();var e=M.extend("sap.ui.table.ColumnMenu",{metadata:{library:"sap.ui.table"},renderer:c});e.prototype.init=function(){if(M.prototype.init){M.prototype.init.apply(this,arguments);}this.addStyleClass("sapUiTableColumnMenu");this._bInvalidated=true;this._iPopupClosedTimeoutId=null;this._oColumn=null;this._oTable=null;};e.prototype.exit=function(){if(M.prototype.exit){M.prototype.exit.apply(this,arguments);}window.clearTimeout(this._iPopupClosedTimeoutId);e._destroyColumnVisibilityMenuItem(this._oTable);this._oColumn=this._oTable=null;};e.prototype.onThemeChanged=function(){if(this.getDomRef()){this._invalidate();}};e.prototype.setParent=function(p){this._invalidate();this._updateReferences(p);return M.prototype.setParent.apply(this,arguments);};e.prototype._updateReferences=function(p){this._oColumn=p;if(this._oColumn){d(T.isA(this._oColumn,"sap.ui.table.Column"),"ColumnMenu.setParent: parent must be a subclass of sap.ui.table.Column");this._oTable=this._oColumn.getParent();if(this._oTable){d(T.isA(this._oTable,"sap.ui.table.Table"),"ColumnMenu.setParent: parent of parent must be subclass of sap.ui.table.Table");}}};e._destroyColumnVisibilityMenuItem=function(t){if(!t||!t._oColumnVisibilityMenuItem){return;}t._oColumnVisibilityMenuItem.destroy();t._oColumnVisibilityMenuItem=null;};e.prototype._removeColumnVisibilityFromAggregation=function(){if(!this._oTable||!this._oTable._oColumnVisibilityMenuItem){return;}this.removeAggregation("items",this._oTable._oColumnVisibilityMenuItem,true);};e.prototype._invalidate=function(){this._removeColumnVisibilityFromAggregation();this.destroyItems();this._bInvalidated=true;};e.prototype.open=function(){if(this._bInvalidated){this._bInvalidated=false;this._addMenuItems();}else if(this._oColumn){this._addColumnVisibilityMenuItem();}T.Hook.call(this._oTable,T.Hook.Keys.Table.OpenMenu,T.getCellInfo(arguments[4]),this);if(this.getItems().length>0){this._lastFocusedDomRef=arguments[4];M.prototype.open.apply(this,arguments);}};e.prototype._addMenuItems=function(){if(this._oColumn){this._addSortMenuItem(false);this._addSortMenuItem(true);this._addFilterMenuItem();this._addGroupMenuItem();this._addFreezeMenuItem();this._addColumnVisibilityMenuItem();}};e.prototype._addSortMenuItem=function(D){var o=this._oColumn;if(o.isSortableByMenu()){var s=D?"desc":"asc";var i=D?"sort-descending":"sort-ascending";this.addItem(this._createMenuItem(s,"TBL_SORT_"+s.toUpperCase(),i,function(E){o.sort(D,E.getParameter("ctrlKey")===true);}));}};e.prototype._addFilterMenuItem=function(){var o=this._oColumn;if(o.isFilterableByMenu()){var t=o.getParent();var h=t&&t.getEnableCustomFilter();if(h){this.addItem(this._createMenuItem("filter","TBL_FILTER_ITEM","filter",function(){t.fireCustomFilter({column:o});}));}else{this.addItem(this._createMenuTextFieldItem("filter","TBL_FILTER","filter",o.getFilterValue(),function(){o.filter(this.getValue());}));}}};e.prototype._addGroupMenuItem=function(){var o=this._oColumn;if(o.isGroupableByMenu()){var t=this._oTable;this.addItem(this._createMenuItem("group","TBL_GROUP",null,function(){t.setGroupBy(o);}));}};e.prototype._addFreezeMenuItem=function(){var o=this._oColumn;var t=this._oTable;var h=t&&t.getEnableColumnFreeze();if(h){var i=o.getIndex();var I=i+T.Column.getHeaderSpan(o)==t.getComputedFixedColumnCount();this.addItem(this._createMenuItem("freeze",I?"TBL_UNFREEZE":"TBL_FREEZE",null,function(){var E=t.fireColumnFreeze({column:o});if(E){if(I){t.setFixedColumnCount(0);}else{t.setFixedColumnCount(i+1);}}}));}};e.prototype._addColumnVisibilityMenuItem=function(){var t=this._oTable;if(t&&t.getShowColumnVisibilityMenu()){if(!t._oColumnVisibilityMenuItem||t._oColumnVisibilityMenuItem.bIsDestroyed){t._oColumnVisibilityMenuItem=this._createMenuItem("column-visibilty","TBL_COLUMNS");var o=new M(t._oColumnVisibilityMenuItem.getId()+"-menu");t._oColumnVisibilityMenuItem.setSubmenu(o);}this.addItem(t._oColumnVisibilityMenuItem);this._updateColumnVisibilityMenuItem();}};e.prototype._createColumnVisibilityMenuItem=function(o){var t=this._oTable;var s=T.Column.getHeaderText(t,o.getIndex());return new a({text:s,icon:o.getVisible()?"sap-icon://accept":null,ariaLabelledBy:[t.getId()+(o.getVisible()?"-ariahidecolmenu":"-ariashowcolmenu")],select:q.proxy(function(E){var v=!o.getVisible();if(v||T.getVisibleColumnCount(this._oTable)>1){var t=o.getParent();var h=true;if(T.isA(t,"sap.ui.table.Table")){h=t.fireColumnVisibility({column:o,newVisible:v});}if(h){o.setVisible(v);}}},this)});};e.prototype._createMenuItem=function(i,t,I,h){return new a(this.getId()+"-"+i,{text:T.getResourceText(t),icon:I?"sap-icon://"+I:null,select:h||function(){}});};e.prototype._createMenuTextFieldItem=function(i,t,I,v,h){h=h||function(){};return new b(this.getId()+"-"+i,{label:T.getResourceText(t),icon:I?"sap-icon://"+I:null,value:v,select:h||function(){}});};e.prototype._setFilterValue=function(v){var o=this.getParent();var t=(o?o.getParent():undefined);var F=sap.ui.getCore().byId(this.getId()+"-filter");if(F&&F.setValue&&(t&&!t.getEnableCustomFilter())){F.setValue(v);}return this;};e.prototype._setFilterState=function(F){var o=this.getParent();var t=(o?o.getParent():undefined);var h=sap.ui.getCore().byId(this.getId()+"-filter");if(h&&h.setValueState&&(t&&!t.getEnableCustomFilter())){h.setValueState(F);}return this;};function g(t){var h=t.getColumns();if(t.getColumnVisibilityMenuSorter&&typeof t.getColumnVisibilityMenuSorter==="function"){var s=t.getColumnVisibilityMenuSorter();if(typeof s==="function"){h=h.sort(s);}}return h;}function f(B,o){if(o.isA("sap.ui.table.AnalyticalColumn")){var Q=B.getAnalyticalQueryResult();var E=Q.getEntityType();var m=B.getModel().getProperty("/#"+E.getTypeDescription().name+"/"+o.getLeadingProperty()+"/sap:visible");if(m&&(m.value==="false"||m.value===false)){return true;}}return false;}e.prototype._updateColumnVisibilityMenuItem=function(){var t=this._oTable;if(!t||!t._oColumnVisibilityMenuItem){return;}var s=t._oColumnVisibilityMenuItem.getSubmenu();if(!s){return;}var h=g(t);var S=s.getItems();var v=t._getVisibleColumns();var B=t.getBinding();var A=T.isA(B,"sap.ui.model.analytics.AnalyticalBinding");for(var i=0;i<h.length;i++){var o=h[i];if(A){if(f(B,o)){continue;}}var I=C.get(o);if(!I||I.bIsDestroyed){var I=this._createColumnVisibilityMenuItem(o);s.insertItem(I,i);C.set(o,I);}else{var j=S.indexOf(I);if(i!==j){s.removeItem(I);s.insertItem(I,i);}}var V=v.indexOf(o)>-1;var k=V?"sap-icon://accept":"";S=s.getItems();S[i].setProperty("icon",k);S[i].setEnabled(!V||v.length>1);S[i].removeAllAriaLabelledBy();S[i].addAriaLabelledBy(t.getId()+(V?"-ariahidecolmenu":"-ariashowcolmenu"));}for(var i=S.length;i>h.length;i--){S[i-1].destroy();}};return e;});
