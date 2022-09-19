/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","./TableTypeBase","../library","sap/m/Button","sap/ui/Device","sap/m/plugins/ColumnResizer","sap/m/SegmentedButton","sap/m/SegmentedButtonItem"],function(C,T,l,B,D,a,S,b){"use strict";var I,c,d;var G=l.GrowingMode;var R=l.RowAction;var e=T.extend("sap.ui.mdc.table.ResponsiveTableType",{metadata:{library:"sap.ui.mdc",properties:{growingMode:{type:"sap.ui.mdc.GrowingMode",defaultValue:G.Basic},showDetailsButton:{type:"boolean",group:"Misc",defaultValue:false},detailsButtonSetting:{type:"sap.ui.core.Priority[]",group:"Behavior"},popinLayout:{type:"sap.m.PopinLayout",group:"Appearance",defaultValue:"Block"}}}});e.prototype.setDetailsButtonSetting=function(p){this.setProperty("detailsButtonSetting",p,true);return this;};e.prototype.updateRelevantTableProperty=function(t,p,v){if(t&&t.isA("sap.m.Table")){if(p==="growingMode"){t.setGrowingScrollToLoad(v===G.Scroll);t.setGrowing(v!==G.None);}else if(p==="showDetailsButton"){this.updateShowDetailsButton(t,v);}else if(p==="popinLayout"){t.setPopinLayout(v);}}};e.updateDefault=function(t){if(t){t.setGrowing(true);t.setGrowingScrollToLoad(false);}};e.prototype.updateShowDetailsButton=function(t,v){if(v&&!this._oShowDetailsButton){t.getHeaderToolbar().insertEnd(this._getShowDetailsButton(),0);t.attachEvent("popinChanged",this._onPopinChanged,this);t.setHiddenInPopin(this._getImportanceToHide());}else if(!v&&this._oShowDetailsButton){t.detachEvent("popinChanged",this._onPopinChanged,this);t.getHeaderToolbar().removeEnd(this._oShowDetailsButton);t.setHiddenInPopin([]);this._oShowDetailsButton.destroy();delete this._oShowDetailsButton;}};e.loadTableModules=function(){if(!I){return new Promise(function(r,f){sap.ui.require(["sap/m/Table","sap/m/Column","sap/m/ColumnListItem"],function(g,h,i){I=g;c=h;d=i;r();},function(){f("Failed to load some modules");});});}else{return Promise.resolve();}};e.createTable=function(i,s){return new I(i,s);};e.createColumn=function(i,s){return new c(i,s);};e.createTemplate=function(i,s){return new d(i,s);};e.updateSelection=function(t){t._oTable.setMode(T.getSelectionMode(t));};e.updateMultiSelectMode=function(t){t._oTable.setMultiSelectMode(t.getMultiSelectMode());};e.updateRowSettings=function(t,r,f){var o=t._oTemplate;o.unbindProperty("navigated");o.unbindProperty("highlight");o.unbindProperty("highlightText");this.updateRowActions(t,r,f);var s=r.getAllSettings();o.applySettings(s);};e.updateRowActions=function(t,r){t._oTemplate.unbindProperty("type");var s=t.hasListeners("rowPress")?"Active":"Inactive";if(!r){t._oTemplate.setType(s);return;}var v,V,f,o=r.getAllActions();if("templateInfo"in o){var g=o.templateInfo;f=g.visible.formatter;V=typeof g.visible=="object";v=g.visible;}else if(o&&o.items){var _;if(o.items.length==0){t._oTemplate.setType(s);return;}_=o.items.find(function(h){return h.getType()=="Navigation";});if(!_&&o.items.length>0){throw new Error("No RowAction of type 'Navigation' found. sap.m.Table only accepts RowAction of type 'Navigation'.");}t._oTemplate.data("rowAction",_);V=_.isBound("visible");v=V?_.getBindingInfo("visible"):_.getVisible();f=v.formatter;}if(f){v.formatter=function(h){var i=f(h);return i?R.Navigation:s;};}else{v=v?R.Navigation:s;}if(V){t._oTemplate.bindProperty("type",v);}else{t._oTemplate.setProperty("type",v);}};e.disableColumnResizer=function(t,i){var o=a.getPlugin(i);if(o){o.setEnabled(false);o.detachColumnResize(t._onColumnResize,t);}};e.enableColumnResizer=function(t,i){i.setFixedLayout("Strict");var o=a.getPlugin(i);if(!o){var f=new a();i.addDependent(f);f.attachColumnResize(t._onColumnResize,t);}else{o.setEnabled(true);o.detachColumnResize(t._onColumnResize,t);o.attachColumnResize(t._onColumnResize,t);}};e.startColumnResize=function(i,o,f){var g=a.getPlugin(i);if(!g){return;}if(f&&f.isA("sap.m.table.columnmenu.Menu")){return g.getColumnResizeQuickAction(o,f);}else{return g.getColumnResizeButton(o);}};e.prototype._toggleShowDetails=function(v){if(!this._oShowDetailsButton||(v===this.bHideDetails)){return;}var t=this.getRelevantTable();this.bHideDetails=v;if(this.bHideDetails){t.setHiddenInPopin(this._getImportanceToHide());}else{t.setHiddenInPopin([]);}};e.prototype._getShowDetailsButton=function(){if(!this._oShowDetailsButton){var r=C.getLibraryResourceBundle("sap.ui.mdc");this.bHideDetails=true;var t=this.getRelevantTable();this._oShowDetailsButton=new S(t.getId()+"-showHideDetails",{visible:false,selectedKey:"hideDetails",items:[new b({icon:"sap-icon://detail-more",key:"showDetails",tooltip:r.getText("table.SHOWDETAILS_TEXT"),press:[function(){this._toggleShowDetails(false);},this]}),new b({icon:"sap-icon://detail-less",key:"hideDetails",tooltip:r.getText("table.HIDEDETAILS_TEXT"),press:[function(){this._toggleShowDetails(true);},this]})]});}return this._oShowDetailsButton;};e.prototype._getImportanceToHide=function(){var f=this.getDetailsButtonSetting()||[];if(f.length){return f;}else{return D.system.phone?["Low","Medium"]:["Low"];}};e.prototype._onPopinChanged=function(E){var h=E.getParameter("hasPopin");var H=E.getParameter("hiddenInPopin");var v=E.getSource().getVisibleItems().length;if(v&&(H.length||(h&&!this.bHideDetails))){this._oShowDetailsButton.setVisible(true);}else{this._oShowDetailsButton.setVisible(false);}};e._onRowActionPress=function(E){var i=E.getParameter("listItem");var o=i.getBindingContext();if(i.getType()!=="Navigation"){return;}var r=this.getRowSettings();var f=r.getAllActions();if(this.getRowSettings().isBound("rowActions")){var A=f.items.model;if(!this._oRowActionItem){this._oRowActionItem=f.items.template.clone();}this._oRowActionItem.setModel(this.getModel(A),A);this.getRowSettings().addDependent(this._oRowActionItem);}else{this._oRowActionItem=i.data("rowAction");}this._oRowActionItem.setType("Navigation");this._oRowActionItem.firePress({bindingContext:o});};return e;});
