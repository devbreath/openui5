/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/core/Control","sap/ui/core/ResizeHandler","./library","./DataSetRenderer","sap/ui/model/SelectionModel","sap/ui/commons/SegmentedButton","sap/ui/commons/SearchField","sap/ui/commons/Toolbar","sap/ui/commons/Button","sap/base/Log"],function(jQuery,e,t,i,r,o,s,n,l,a,h){"use strict";var d=e.extend("sap.ui.ux3.DataSet",{metadata:{deprecated:true,library:"sap.ui.ux3",properties:{showToolbar:{type:"boolean",group:"Misc",defaultValue:true},showFilter:{type:"boolean",group:"Misc",defaultValue:true},showSearchField:{type:"boolean",group:"Misc",defaultValue:true},multiSelect:{type:"boolean",group:"Behavior",defaultValue:false}},aggregations:{items:{type:"sap.ui.ux3.DataSetItem",multiple:true,singularName:"item",bindable:"bindable"},views:{type:"sap.ui.ux3.DataSetView",multiple:true,singularName:"view"},filter:{type:"sap.ui.core.Control",multiple:true,singularName:"filter"},_viewSwitches:{type:"sap.ui.core.Control",multiple:true,singularName:"_viewSwitch",visibility:"hidden"},_toolbar:{type:"sap.ui.commons.Toolbar",multiple:false,visibility:"hidden"}},associations:{selectedView:{type:"sap.ui.ux3.DataSetView",multiple:false}},events:{selectionChanged:{parameters:{oldLeadSelectedIndex:{type:"int"},newLeadSelectedIndex:{type:"int"}}},search:{parameters:{query:{type:"string"}}}}}});d.prototype.init=function(){var e=this,t;this.selectionModel=new o(o.SINGLE_SELECTION);this._oSegBut=new s;this._oSegBut.attachSelect(function(t){e.press(t)},e);this._oSegBut.show=false;this._oSearchField=new n(this.getId()+"-searchValue");this._oSearchField.setShowListExpander(false);this._oSearchField.setEnableListSuggest(false);this._oSearchField.setEnableFilterMode(true);this._oSearchField.setEnableClear(true);this._oSearchField.show=false;e=this;this._oSearchField.attachSearch(function(t){e.fireSearch(t.getParameters())});this.selectionModel.attachSelectionChanged(function(t){var i,r;var o=t.getParameters();if(o){r=o.leadIndex;i=o.oldIndex}e.fireSelectionChanged({oldLeadSelectedIndex:i,newLeadSelectedIndex:r});h.debug("Selection Change fired")});t=new l;this._setToolbar(t);this._iShiftStart=null};d.prototype.exit=function(){this._oSegBut.destroy();this._oSearchField.destroy();this.destroyAggregation("_toolbar")};d.prototype._prepareToolbar=function(){var e=this.getViews().length,t=this._getToolbar();if(e>1&&this._oSegBut.show==false){t.insertItem(this._oSegBut,0);this._oSegBut.show=true}else if(e<=1&&this._oSegBut.show){t.removeItem(this._oSegBut);this._oSegBut.show=false}if(this.getShowSearchField()&&this._oSearchField.show==false){t.insertRightItem(this._oSearchField,t.getRightItems().length);this._oSearchField.show=true}else if(!this.getShowSearchField()&&this._oSearchField.show==true){t.removeRightItem(this._oSearchField);this._oSearchField.show=false}};d.prototype.press=function(e,t){var i=e.getParameters().selectedButtonId,r=i.substring(i.lastIndexOf("-")+1),o=sap.ui.getCore().byId(this.getSelectedView());o.exitView(this.getItems());this.setSelectedView(r)};d.prototype.filter=function(){this.fireFilter({filterValue:this.getFilterValue()})};d.prototype.sort=function(){this.fireSort()};d.prototype.addSelectionInterval=function(e,t){this.selectionModel.addSelectionInterval(e,t);return this};d.prototype.setSelectionInterval=function(e,t){this.selectionModel.setSelectionInterval(e,t);return this};d.prototype.removeSelectionInterval=function(e,t){this.selectionModel.removeSelectionInterval(e,t);return this};d.prototype.getSelectedIndex=function(){return this.selectionModel.getLeadSelectedIndex()};d.prototype.getSelectedIndices=function(){return this.selectionModel.getSelectedIndices()||[]};d.prototype.clearSelection=function(){this.selectionModel.clearSelection();return this};d.prototype.selectItem=function(e){var t=e.getParameters(),i=e.getParameters().itemId,r=sap.ui.getCore().byId(i),o=this.getItems(),s=o.indexOf(r),n=this.getLeadSelection();if(!this.getMultiSelect()){if(n==s&&!t.shift){this.setLeadSelection(-1)}else{this.setLeadSelection(s)}this._iShiftStart=null}else{if(t.ctrl){if(!this.isSelectedIndex(s)){this.addSelectionInterval(s,s)}else{this.removeSelectionInterval(s,s)}if(this._iShiftStart>=0){this._iShiftStart=s}}if(t.shift){if(!this._iShiftStart&&this._iShiftStart!==0){this._iShiftStart=n}if(this._iShiftStart>=0&&t.ctrl){this.addSelectionInterval(this._iShiftStart,s)}else if(this._iShiftStart>=0&!t.ctrl){this.setSelectionInterval(this._iShiftStart,s)}else{this.setLeadSelection(s);this._iShiftStart=s}}if(!t.shift&&!t.ctrl){if(n==s&&s!=this._iShiftStart){this.setLeadSelection(-1)}else{this.setLeadSelection(s)}this._iShiftStart=null}}};d.prototype.prepareRendering=function(){var e,t=this.getViews().length;if(t==0){return}this._prepareToolbar();if(this._bDirty){e=sap.ui.getCore().byId(this.getSelectedView());if(e.exitView){e.exitView(this.getItems())}if(e.initView){e.initView(this.getItems())}this._bDirty=false}};d.prototype.getLeadSelection=function(){return this.selectionModel.getLeadSelectedIndex()};d.prototype.setLeadSelection=function(e){this.selectionModel.setLeadSelectedIndex(e)};d.prototype.isSelectedIndex=function(e){return this.selectionModel.isSelectedIndex(e)};d.prototype.getSelectedItemId=function(e){return this.getItems()[e].getId()};d.prototype.createViewSwitch=function(e,t){var i;if(e.getIcon()){i=new a({id:this.getId()+"-view-"+e.getId(),lite:true,icon:e.getIcon(),iconHovered:e.getIconHovered(),iconSelected:e.getIconSelected()})}else if(e.getName()){i=new a({id:this.getId()+"-view-"+e.getId(),text:e.getName(),lite:true})}else{i=new a({id:this.getId()+"-view-"+e.getId(),text:e.getId(),lite:true})}i._viewIndex=t;return i};d.prototype._rerenderToolbar=function(){var e=this.$("toolbar");this._prepareToolbar();if(e.length>0){var t=sap.ui.getCore().createRenderManager();r.renderToolbar(t,this);t.flush(e[0]);t.destroy()}};d.prototype._rerenderFilter=function(){var e=this.$("filter");if(e.length>0){var t=sap.ui.getCore().createRenderManager();r.renderFilterArea(t,this);t.flush(e[0]);if(this.getShowFilter()){e.removeClass("noPadding")}else{e.addClass("noPadding")}t.destroy()}};d.prototype.setMultiSelect=function(e){this.clearSelection();if(!e){this.setProperty("multiSelect",false);if(this.selectionModel){this.selectionModel.setSelectionMode(o.SINGLE_SELECTION)}}else{this.setProperty("multiSelect",true);if(this.selectionModel){this.selectionModel.setSelectionMode(o.MULTI_SELECTION)}}return this};d.prototype.removeItem=function(e){var t=this.removeAggregation("items",e,true);if(t){t.detachSelected(this.selectItem,this);t.destroyAggregation("_template",true);this._bDirty=true}return t};d.prototype.removeAllItems=function(){var e=this.getItems(),t;jQuery.each(e,function(e,t){t.destroyAggregation("_template",true);t.detachSelected(this.selectItem,this)});t=this.removeAllAggregation("items");this._bDirty=true;return t};d.prototype.destroyItems=function(){var e=this.destroyAggregation("items");this._bDirty=true;this.invalidate();return e};d.prototype.addItem=function(e){this.addAggregation("items",e,true);e.attachSelected(this.selectItem,this);this._bDirty=true;return this};d.prototype.insertItem=function(e,t){this.insertAggregation("items",e,t,true);e.attachSelected(this.selectItem,this);this._bDirty=true;return this};d.prototype.setFilterValue=function(e){this.setProperty("filterValue",e,true);return this};d.prototype.getFilterValue=function(){return this.getProperty("filterValue")};d.prototype.insertView=function(e,t){var i=this.createViewSwitch(e,t,true);if(!this.getSelectedView()){this.setSelectedView(e)}this.insertAggregation("views",e,t);this._oSegBut.insertButton(i,t);this._rerenderToolbar();return this};d.prototype.addView=function(e){var t=this.getViews().length,i=this.createViewSwitch(e,t);if(!this.getSelectedView()){this.setSelectedView(e)}this.addAggregation("views",e,true);this._oSegBut.addButton(i);this._rerenderToolbar();return this};d.prototype.removeView=function(e){var t=this.removeAggregation("views",e,true);if(t){if(this.getSelectedView()==t.getId()){this.setSelectedView(this.getViews()[0]);this._bDirty=true;t.invalidate()}else{this._rerenderToolbar()}this._oSegBut.removeButton(this.getId()+"-view-"+t.getId()).destroy()}return t};d.prototype.destroyViews=function(){this._oSegBut.destroyButtons();this.destroyAggregation("views");return this};d.prototype.removeAllViews=function(){var e=this.removeAllAggregation("views");this._oSegBut.destroyButtons();return e};d.prototype.setEnableSorting=function(e){this.setProperty("enableSorting",e,true);this._rerenderToolbar();return this};d.prototype.setEnableFiltering=function(e){this.setProperty("enableFiltering",e,true);this._rerenderToolbar();return this};d.prototype.setSelectedView=function(e){var t=this.getSelectedView();this.setAssociation("selectedView",e);if(t!=this.getSelectedView()){this._bDirty=true}if(this.getId()+"-view-"+this.getSelectedView()!==this._oSegBut.getSelectedButton()){this._oSegBut.setSelectedButton(this.getId()+"-view-"+this.getSelectedView())}return this};d.prototype.addToolbarItem=function(e){this._getToolbar().addItem(e);this._rerenderToolbar()};d.prototype.removeToolbarItem=function(e){this._getToolbar().removeItem(e);this._rerenderToolbar()};d.prototype.setShowToolbar=function(e){this.setProperty("showToolbar",e,true);this._rerenderToolbar();return this};d.prototype.setShowFilter=function(e){this.setProperty("showFilter",e,true);this._rerenderFilter();return this};d.prototype.setShowSearchField=function(e){this.setProperty("showSearchField",e,true);this._rerenderToolbar();return this};d.prototype._setToolbar=function(e){this.setAggregation("_toolbar",e,true);this._rerenderToolbar()};d.prototype._getToolbar=function(){return this.getAggregation("_toolbar")};d.prototype.refreshItems=function(){var e=this.getBinding("items"),t=sap.ui.getCore().byId(this.getSelectedView());e.bUseExtendedChangeDetection=true;if(t&&t.getItemCount&&t.getItemCount()){var i=Math.max(t.getItemCount(),this.getItems().length);if(i){e.getContexts(0,i)}else{e.getContexts()}}else{e.getContexts()}};d.prototype.updateItems=function(e){var t=this.mBindingInfos["items"],i=this.getMetadata().getAggregation("items"),r=sap.ui.getCore().byId(this.getSelectedView()),o=t.binding,s=t.factory,n,l,a,h,d=this,u=[];o.bUseExtendedChangeDetection=true;if(r&&r.getItemCount&&r.getItemCount()){var c=Math.max(r.getItemCount(),this.getItems().length);if(c){u=o.getContexts(0,c)}else{u=o.getContexts()}}else{u=o.getContexts()}if(u.diff&&e){var g=u.diff;for(var p=0;p<g.length;p++){l=this.getItems();h=g[p].index;if(g[p].type==="delete"){a=l[h];g[p].item=a;this.removeItem(a)}else if(u.diff[p].type==="insert"){a=s("",u[h]);a.setBindingContext(u[h],t.model);g[p].item=a;this.insertItem(a,h)}}if(r&&r.updateView){r.updateView(g)}}else{this[i._sDestructor]();jQuery.each(u,function(e,r){var o=d.getId()+"-"+e;n=s(o,r);n.setBindingContext(r,t.model);d[i._sMutator](n)})}l=this.getItems();for(var p=0,S=u.length;p<S;p++){l[p].setBindingContext(u[p],t.model)}};return d});
//# sourceMappingURL=DataSet.js.map