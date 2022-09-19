/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','sap/ui/core/Control','sap/ui/core/delegate/ItemNavigation','./library','./CollectionInspectorRenderer','sap/ui/commons/ToggleButton','sap/ui/commons/SegmentedButton','sap/ui/commons/Button'],function(q,C,I,l,a,T,S,B){"use strict";var b=C.extend("sap.ui.ux3.CollectionInspector",{metadata:{deprecated:true,library:"sap.ui.ux3",properties:{sidebarVisible:{type:"boolean",group:"Appearance",defaultValue:true},fitParent:{type:"boolean",group:"Appearance",defaultValue:true}},aggregations:{collections:{type:"sap.ui.ux3.Collection",multiple:true,singularName:"collection"},content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"}},associations:{selectedCollection:{type:"sap.ui.ux3.Collection",multiple:false}},events:{collectionSelected:{},itemSelectionChanged:{},editCollection:{}}}});b.prototype.init=function(){var t=this;if(!this._oItemNavigation){this._oItemNavigation=new I();this._oItemNavigation.setCycling(false);this.addDelegate(this._oItemNavigation);}var o=new T(this.getId()+"-toggleButton");o.setParent(this);o.setTooltip("This button opens and closes the sidebar");o.attachPress(function(){if(o.getPressed()){t.openSidebar();}else{t.closeSidebar();}});this._oToggleButton=o;var c=new S(this.getId()+"-selector");c.attachSelect(function(E){var i=this.indexOfButton(sap.ui.getCore().byId(this.getSelectedButton()));var d=t.getCollections()[i];t.setSelectedCollection(d);t.fireCollectionSelected({collection:d});t.openSidebar();});this._oCollectionSelector=c;var e=new B();e.addStyleClass("sapUiUx3EditCollectionButton");e.setText("Collection");e.setTooltip("This button opens an edit dialog for the current collection");e.attachPress(function(){t.fireEditCollection();});this._oEditButton=e;};b.prototype.exit=function(){this._oToggleButton.destroy();this._oToggleButton=null;this._oEditButton.destroy();this._oEditButton=null;this._oCollectionSelector.destroy();this._oCollectionSelector=null;if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation;}};b.prototype.onBeforeRendering=function(){this._oToggleButton.setPressed(this.getSidebarVisible());};b.prototype.onAfterRendering=function(){if(!this.getSelectedCollection()){if(this.getCollections().length>0){this.setSelectedCollection(this.getCollections()[0]);}}else{var s=sap.ui.getCore().byId(this.getSelectedCollection());if(s.getSelectedItems().length==0&&s.getItems().length>0){s.addSelectedItem(s.getItems()[0]);}}this.setElementsHeight();this.updateItemNavigation();this.refreshSelectionHighlighting();};b.prototype.onclick=function(e){var t=e.target;if(q(t).hasClass("sapUiUx3CICollectionListItem")){var s=sap.ui.getCore().byId(this.getSelectedCollection());if(s.getSelectedItems().indexOf(t.id)>=0){s.removeSelectedItem(t.id);}else{s.addSelectedItem(t.id);}this.refreshSelectionHighlighting();this.fireItemSelectionChanged({selectedItems:s.getSelectedItems()});}};b.prototype.getToggleButton=function(){return this._oToggleButton;};b.prototype.getCollectionSelector=function(){return this._oCollectionSelector;};b.prototype.rerenderSidebar=function(){var c=sap.ui.getCore().byId(this.getSelectedCollection());if(c&&c.getEditable()){this._oEditButton.setVisible(true);}else{this._oEditButton.setVisible(false);}var $=this.$("sidebar");if($.length>0){var r=sap.ui.getCore().createRenderManager();this.getRenderer().renderSidebar(r,this);r.flush($[0]);r.destroy();}if(c&&c.getEditable()){this.$("sidebar").addClass("sapUiUx3CIWithEditButton");}else{this.$("sidebar").removeClass("sapUiUx3CIWithEditButton");}this.updateItemNavigation();this.refreshSelectionHighlighting();};b.prototype.updateItemNavigation=function(){var i=[];var $=this.$("sidebar").find('li');q.each($,function(c,d){i.push(d);});this._oItemNavigation.setItemDomRefs(i);this._oItemNavigation.setRootDomRef(this.$("sidebar ul")[0]);};b.prototype.rerenderContent=function(){var c=this.$("content");if(c.length>0){var r=sap.ui.getCore().createRenderManager();this.getRenderer().renderContent(r,this);r.flush(c[0]);r.destroy();}this.setElementsHeight();};b.prototype.setElementsHeight=function(){if(this.getFitParent()){return;}var s=this.$("sidebar");var c=this.$("content");var i=c.outerHeight(true);var d=c.outerHeight(true)-c.height();var e=s.outerHeight(true)-s.height();s.height(Math.max(200,i)-e);c.height(Math.max(200,i)-d);};b.prototype.openSidebar=function(){var $=this.$();var s=this.$("sidebar");var c=this.$("content");s.stop(true,true).animate({width:150},300,function(){s.css('width','');});c.stop(true,true).animate({left:150},300,function(){c.css('left','');});$.removeClass("sapUiUx3CISidebarClosed");$.addClass("sapUiUx3CISidebarOpened");this._oToggleButton.setPressed(true);};b.prototype.closeSidebar=function(){var $=this.$();var s=this.$("sidebar");var c=this.$("content");s.stop(true,true).animate({width:0},300,function(){s.css('width','');});c.stop(true,true).animate({left:0},300,function(){c.css('left','');});$.removeClass("sapUiUx3CISidebarOpened");$.addClass("sapUiUx3CISidebarClosed");this._oToggleButton.setPressed(false);};b.prototype.insertCollection=function(c,i){var o=new B();o.setText(c.getTitle());c.attachEvent('_titleChanged',function(e){o.setText(e.getParameter("newTitle"));});var t=this;c.attachSelectionChanged(function(){t.refreshSelectionHighlighting();});c.attachPropertyChanged(function(){t.rerenderSidebar();});this._oCollectionSelector.insertButton(o,i);return this.insertAggregation("collections",c,i);};b.prototype.addCollection=function(c){var o=new B();o.setText(c.getTitle());c.attachEvent('_titleChanged',function(e){o.setText(e.getParameter("newTitle"));});var t=this;c.attachSelectionChanged(function(){t.refreshSelectionHighlighting();});c.attachPropertyChanged(function(){t.rerenderSidebar();});this._oCollectionSelector.addButton(o);return this.addAggregation("collections",c);};b.prototype.removeCollection=function(c){var i;if(typeof c=="object"){i=this.indexOfCollection(c);}else{i=this.indexOfCollection(sap.ui.getCore().byId(c));}var o=this._oCollectionSelector.getButtons()[i];this._oCollectionSelector.removeButton(o);var r=this.removeAggregation("collections",c);if(r&&this.getSelectedCollection()==r.getId()){this.setSelectedCollection(null);}return r;};b.prototype.removeAllCollections=function(){this._oCollectionSelector.removeAllButtons();this.setSelectedCollection(null);return this.removeAllAggregation("collections");};b.prototype.destroyCollections=function(){this._oCollectionSelector.destroyButtons();this.setSelectedCollection(null);return this.destroyAggregation("collections");};b.prototype.setSelectedCollection=function(c){this.setAssociation("selectedCollection",c,true);if(!c){this._oEditButton.setVisible(false);}else{this._oCollectionSelector.setSelectedButton(this._oCollectionSelector.getButtons()[this.indexOfCollection(c)]);var s=sap.ui.getCore().byId(this.getSelectedCollection());if(s.getSelectedItems().length==0&&s.getItems().length>0){s.addSelectedItem(s.getItems()[0]);}}this.rerenderSidebar();this.refreshSelectionHighlighting();return this;};b.prototype.insertContent=function(c,i){this.insertAggregation("content",c,i,true);this.rerenderContent();return this;};b.prototype.addContent=function(c){this.addAggregation("content",c,true);this.rerenderContent();return this;};b.prototype.removeContent=function(c){var r=this.removeAggregation("content",c,true);this.rerenderContent();return r;};b.prototype.removeAllContent=function(){var r=this.removeAllAggregation("content",true);this.rerenderContent();return r;};b.prototype.destroyContent=function(){this.destroyAggregation("content",true);this.rerenderContent();return this;};b.prototype.onfocusout=function(e){var t=q(e.target);if(t.hasClass("sapUiUx3CICollectionListItem")){t.removeClass("sapUiUx3CISidebarFoc");}};b.prototype.onfocusin=function(e){var t=q(e.target);if(t.hasClass("sapUiUx3CICollectionListItem")){t.addClass("sapUiUx3CISidebarFoc");}};b.prototype.onsapenter=function(e){var t=q(e.target);if(t.hasClass("sapUiUx3CISidebarFoc")){this.onclick(e);}e.stopPropagation();};b.prototype.onsapspace=function(e){var t=q(e.target);if(t.hasClass("sapUiUx3CISidebarFoc")){this.onclick(e);}e.stopPropagation();};b.prototype.refreshSelectionHighlighting=function(){var i=this.$("sidebar").find('.sapUiUx3CICollectionListItem');var s;if(this.getSelectedCollection()){s=sap.ui.getCore().byId(this.getSelectedCollection()).getSelectedItems();}else{s=[];}i.each(function(c,o){if(s.indexOf(o.id)>=0){q(o).addClass("sapUiUx3CICollectionListItemSelected");q(o).attr("aria-selected",true);}else{q(o).removeClass("sapUiUx3CICollectionListItemSelected");q(o).attr("aria-selected",false);}});};b.prototype.getEditButton=function(){return this._oEditButton;};return b;});
