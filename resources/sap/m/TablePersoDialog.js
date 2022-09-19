/*
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./Text','./Title','./Label','./Column','./Button','./Dialog','./ColumnListItem','./Table','./Toolbar','./Bar','sap/ui/base/ManagedObject','sap/ui/base/ManagedObjectRegistry','sap/base/Log','sap/base/util/deepExtend','sap/m/library','sap/ui/Device','sap/ui/model/Sorter','sap/ui/model/Filter','sap/ui/model/FilterOperator','sap/ui/model/json/JSONModel','sap/m/SearchField'],function(T,a,L,C,B,D,b,c,d,e,M,f,g,h,l,i,S,F,j,J,k){"use strict";var m=l.ButtonType;var n=l.ListMode;var W=l.WrappingType;var o=M.extend("sap.m.TablePersoDialog",{constructor:function(I,s){M.apply(this,arguments);},metadata:{properties:{"contentWidth":{type:"sap.ui.core.CSSSize"},"contentHeight":{type:"sap.ui.core.CSSSize",since:"1.22"},"persoMap":{type:"object"},"columnInfoCallback":{type:"object",since:"1.22"},"initialColumnState":{type:"object",since:"1.22"},"hasGrouping":{type:"boolean",since:"1.22"},"showSelectAll":{type:"boolean",since:"1.22"},"showResetAll":{type:"boolean",since:"1.22"}},aggregations:{"persoService":{type:"Object",multiple:false,deprecated:true}},associations:{"persoDialogFor":"sap.m.Table"},events:{confirm:{},cancel:{}},library:"sap.m"}});f.apply(o,{onDuplicate:function(I,p,q){if(p._sapui_candidateForDestroy){g.debug("destroying dangling template "+p+" when creating new object with same ID");p.destroy();}else{var s="adding TablePersoDialog with duplicate id '"+I+"'";if(sap.ui.getCore().getConfiguration().getNoDuplicateIds()){g.error(s);throw new Error("Error: "+s);}else{g.warning(s);}}}});o.prototype.init=function(){var t=this,p=0;this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oP13nModel=new J();this._oP13nModel.setSizeLimit(Number.MAX_VALUE);this._oColumnItemTemplate=new b(this.getId()+"-cli",{selected:"{Personalization>visible}",type:"Active",cells:[new L({wrapping:true,wrappingType:W.Hyphenated,text:"{Personalization>text}"})],press:function(E){this._oSelectedItem=E.oSource;this._fnUpdateArrowButtons.call(this);}.bind(this)}).addStyleClass("sapMPersoDialogLI");this._oButtonUp=new B(this.getId()+"-buttonUp",{icon:"sap-icon://navigation-up-arrow",enabled:false,tooltip:t._oRb.getText('PERSODIALOG_UP'),press:function(){t._moveItem(-1);}});this._oButtonDown=new B(this.getId()+"-buttonDown",{icon:"sap-icon://navigation-down-arrow",enabled:false,tooltip:t._oRb.getText('PERSODIALOG_DOWN'),press:function(){t._moveItem(1);}});this._fnUpdateArrowButtons=function(){if(this.getHasGrouping()){return;}var q=this._oInnerTable.getModel("Personalization").getProperty("/aColumns");var r,u;if(!this._oSelectedItem){r=false;u=false;}else{var I=q.indexOf(this._oSelectedItem.getBindingContext("Personalization").getObject());r=I>0?true:false;u=I<q.length-1?true:false;}this._updateMarkedItem();t._oButtonUp.setEnabled(r);t._oButtonDown.setEnabled(u);}.bind(this);this._fnAfterDialogOpen=function(){t._fnUpdateArrowButtons.call(t);};this._oInnerTable=new c(this.getId()+"-colTable",{noDataText:this._oRb.getText('PERSODIALOG_NO_DATA'),mode:n.MultiSelect,width:"100%",sticky:["ColumnHeaders"],columns:[new C({header:new T({text:this._oRb.getText("PERSODIALOG_SELECT_ALL")})})]});this._oSearchField=new k(this.getId()+"-searchField",{width:"100%",liveChange:function(E){var v=E.getSource().getValue(),q=(v?300:0);clearTimeout(p);if(q){p=setTimeout(function(){t._executeSearch();},q);}else{t._executeSearch();}},search:function(){t._executeSearch();}});this._resetAllButton=new B(this.getId()+"-buttonUndo",{text:this._oRb.getText("VIEWSETTINGS_RESET"),press:function(){this._resetAll();}.bind(this)}).addStyleClass("sapMPersoDialogResetBtn");var H=new e({contentLeft:new a(this.getId()+"-Dialog-title",{text:this._oRb.getText("PERSODIALOG_COLUMNS_TITLE")}),contentRight:this._resetAllButton});var s=new d(this.getId()+"-toolbar",{active:false,content:[this._oSearchField,this._oButtonUp,this._oButtonDown]});this._oDialog=new D(this.getId()+"-Dialog",{title:this._oRb.getText("PERSODIALOG_COLUMNS_TITLE"),customHeader:H,draggable:true,resizable:true,stretch:i.system.phone,horizontalScrolling:false,verticalScrolling:true,initialFocus:(i.system.desktop?this._oInnerTable:null),content:[this._oInnerTable],subHeader:s,leftButton:new B(this.getId()+"-buttonOk",{text:this._oRb.getText("PERSODIALOG_OK"),press:function(){t._oDialog.close();t._oSelectedItem=null;t._oSearchField.setValue("");t.fireConfirm();},type:m.Emphasized}),rightButton:new B(this.getId()+"-buttonCancel",{text:this._oRb.getText("PERSODIALOG_CANCEL"),press:function(){t._oDialog.close();t._oSelectedItem=null;t._oSearchField.setValue("");t.fireCancel();}}),afterOpen:this._fnAfterDialogOpen}).addStyleClass("sapMPersoDialog");this._oDialog.setTitle=function(q){this.setProperty("title",q);this.getCustomHeader().getContentLeft()[0].setText(q);};};o.prototype._updateMarkedItem=function(){if(!this._oSelectedItem){this._oSelectedItem=this._oInnerTable&&this._oInnerTable.getItems().length>0?this._oInnerTable.getItems()[0]:null;}if(this._oSelectedItem){this._oInnerTable.getItems().forEach(function(I){if(I.hasStyleClass("sapMPersoDialogItemSelected")){I.removeStyleClass("sapMPersoDialogItemSelected");}});this._oSelectedItem.addStyleClass("sapMPersoDialogItemSelected");}};o.prototype.retrievePersonalizations=function(){return this._oP13nModel.getData();};o.prototype.open=function(){var s=null;if(this.getHasGrouping()){s=[new S('group',false,true)];}this._readCurrentSettingsFromTable();this._oDialog.setModel(this._oP13nModel,"Personalization");this._oInnerTable.bindAggregation("items",{path:"Personalization>/aColumns",key:"text",sorter:s,template:this._oColumnItemTemplate});if(!this._oInnerTable.getSelectedItem()){var I=this._oInnerTable.getItems();if(this.getHasGrouping()){I=I.filter(function(p){return p.getMetadata().getName()!="sap.m.GroupHeaderListItem";});}if(I.length>0){this._sLastSelectedItemId=I[0].getBindingContext('Personalization').getProperty('id');}}this._fnUpdateArrowButtons.call(this);this._oDialog.open();};o.prototype.setContentHeight=function(H){H=H?H:"28rem";this.setProperty("contentHeight",H,true);this._oDialog.setContentHeight(H);return this;};o.prototype.setContentWidth=function(w){w=w?w:"25rem";this.setProperty("contentWidth",w,true);this._oDialog.setContentWidth(w);return this;};o.prototype.exit=function(){this._oRb=null;this._oP13nModel=null;this._oSelectedItem=null;if(this._oColumnItemTemplate){this._oColumnItemTemplate.destroy();this._oColumnItemTemplate=null;}if(this._oInnerTable){this._oInnerTable.destroy();this._oInnerTable=null;}if(this._oSearchField){this._oSearchField.destroy();this._oSearchField=null;}if(this._oDialog){this._oDialog.destroy();this._oDialog=null;}if(this._oButtonDown){this._oButtonDown.destroy();this._oButtonDown=null;}if(this._oButtonUp){this._oButtonUp.destroy();this._oButtonUp=null;}};o.prototype._resetAll=function(){if(this.getInitialColumnState()){var I=h([],this.getInitialColumnState()),t=this;var p=this._oInnerTable.getSelectedItem();this._sLastSelectedItemId=p&&p.getBindingContext('Personalization')&&p.getBindingContext('Personalization').getProperty('id');if(this._mColumnCaptions){I.forEach(function(q){q.text=t._mColumnCaptions[q.id];});}this._oP13nModel.getData().aColumns=I;this._oP13nModel.updateBindings();sap.ui.getCore().applyChanges();}};o.prototype._moveItem=function(p){var s=this._oSelectedItem;if(!s){return;}var I=this._oInnerTable.getItems();var q=this._oInnerTable.getModel("Personalization").getProperty("/aColumns");var O=q.indexOf(s.getBindingContext("Personalization").getObject());var N=O+p;N=q.indexOf(I[N].getBindingContext("Personalization").getObject());if(N==O){return;}q.splice(N,0,q.splice(O,1)[0]);q.forEach(function(r,t){r.order=t;});this._oInnerTable.getModel("Personalization").setProperty("/aColumns",q);this._oSelectedItem=I[N];this._scrollToItem(this._oSelectedItem);this._fnUpdateArrowButtons.call(this);};o.prototype._scrollToItem=function(I){sap.ui.getCore().applyChanges();if(I.getDomRef()){var N=this._oInnerTable.getItems().indexOf(I);var p=I.getDomRef().getBoundingClientRect();var q=this._oDialog.getDomRef("cont").getBoundingClientRect();var v=q.top;var V=q.bottom;var E=p.top;if(E<v+18){this._oInnerTable.scrollToIndex(N);}else if(E>V-18){this._oInnerTable.scrollToIndex(N);}}};o.prototype._readCurrentSettingsFromTable=function(){var t=sap.ui.getCore().byId(this.getPersoDialogFor()),p=this,q=this.getColumnInfoCallback().call(this,t,this.getPersoMap());this._oP13nModel.setData({aColumns:q});this._mColumnCaptions={};q.forEach(function(r){p._mColumnCaptions[r.id]=r.text;});};o.prototype._executeSearch=function(){var v=this._oSearchField.getValue(),p=new F("text",j.Contains,v),q=this._oInnerTable.getBinding("items");q.filter([p]);this._fnUpdateArrowButtons.call(this);return this;};o.prototype.setHasGrouping=function(H){this.setProperty("hasGrouping",H,true);var p=this._oDialog.getSubHeader();if(!H){if(p.getContent().length===1){p.addContent(this._oButtonDown);p.addContent(this._oButtonUp);}}else{p.removeContent(this._oButtonUp);p.removeContent(this._oButtonDown);}return this;};o.prototype.setShowSelectAll=function(s){this.setProperty("showSelectAll",s,true);var t=s?this._oRb.getText("PERSODIALOG_SELECT_ALL"):this._oRb.getText("PERSODIALOG_COLUMNS_TITLE");this._oInnerTable.getColumns()[0].setHeader(new T({text:t}));this._oInnerTable.bPreventMassSelection=!s;return this;};o.prototype.setShowResetAll=function(s){this.setProperty("showResetAll",s,true);this._resetAllButton.setVisible(s);return this;};return o;});
