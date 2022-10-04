/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/ResponsivePopover","sap/m/Button","sap/m/Toolbar","sap/m/ToolbarSpacer","sap/m/library","sap/ui/Device","sap/ui/core/Control","sap/ui/core/Core","sap/ui/core/library","sap/ui/thirdparty/jquery","sap/ui/dom/containsOrEquals","sap/ui/events/ControlEvents","sap/base/strings/capitalize","sap/m/p13n/AbstractContainerItem","sap/m/p13n/Container","sap/m/table/columnmenu/MenuRenderer","sap/ui/layout/form/Form","sap/ui/layout/GridData","sap/ui/layout/form/ResponsiveGridLayout","sap/ui/layout/form/FormContainer","sap/ui/layout/form/FormElement","sap/m/Label"],function(t,e,i,n,o,r,s,a,u,jQuery,l,c,p,f,g,h,d,m,v,_,y,C){"use strict";var I=u.aria.HasPopup;var b=u.VerticalAlign;var A=o.table.columnmenu.Category;var E=s.extend("sap.m.table.columnmenu.Menu",{metadata:{library:"sap.m",interfaces:["sap.ui.core.IColumnHeaderMenu"],aggregations:{quickActions:{type:"sap.m.table.columnmenu.QuickActionBase"},items:{type:"sap.m.table.columnmenu.ItemBase"},_quickActions:{type:"sap.m.table.columnmenu.QuickActionBase",visibility:"hidden"},_items:{type:"sap.m.table.columnmenu.ItemBase",visibility:"hidden"}},events:{beforeOpen:{}}},renderer:h});var w="$default";var P=I.Dialog;var k="500px";E.prototype.init=function(){this.fAnyEventHandlerProxy=jQuery.proxy(function(t){if(!this.isOpen()||!this.getDomRef()||t.type!="mousedown"&&t.type!="touchstart"){return}this.handleOuterEvent(this.getId(),t)},this)};E.prototype.applySettings=function(t){if(t){this._addAllToPrivateAggregation(t,"_quickActions");this._addAllToPrivateAggregation(t,"_items")}s.prototype.applySettings.apply(this,arguments)};E.prototype.openBy=function(t){if(!this.getParent()){a.getUIArea(a.getStaticAreaRef()).addContent(this,true)}this._initPopover();this._createQuickActionGrids();if(this._oItemsContainer){this._oItemsContainer.destroy();this._oItemsContainer=null}this._initItemsContainer();if(!this.isOpen()){this.fireBeforeOpen();this._oPopover.openBy(t)}c.bindAnyEvent(this.fAnyEventHandlerProxy)};E.prototype.getAriaHasPopupType=function(){return P};E.prototype.isOpen=function(){return this._oPopover&&this._oPopover.isOpen()};E.prototype.close=function(){this._previousView=null;if(this._oPopover){this._oPopover.close()}c.unbindAnyEvent(this.fAnyEventHandlerProxy)};E.prototype.exit=function(){s.prototype.exit.apply(this,arguments);if(this._oPopover){delete this._oPopover}if(this._oItemsContainer){delete this._oItemsContainer}c.unbindAnyEvent(this.fAnyEventHandlerProxy)};E.prototype._addAllToPrivateAggregation=function(t,e){if(t[e]){t[e].forEach(function(t){this.addAggregation(e,t)}.bind(this));delete t[e]}};E.prototype._initPopover=function(){if(this._oPopover){return}this._oPopover=new t({showArrow:false,showHeader:r.system.phone,placement:o.PlacementType.Bottom,content:new S({control:this,height:true}),contentWidth:k,horizontalScrolling:false,verticalScrolling:false,afterClose:[this.close,this]});this.addDependent(this._oPopover);this._oPopover.addEventDelegate({onAfterRendering:this._focusItem},this);if(this.getItems().length===0&&!this.getAggregation("_items")){this._oPopover.attachAfterOpen(this._focusInitialQuickAction.bind(this))}else{this._oPopover.attachAfterOpen(function(){var t=this._oItemsContainer._getNavigationList().getItems().find(function(t){return t.getVisible()});t&&t.focus()}.bind(this))}this._oPopover._oControl.oPopup.setAutoClose(false)};E.prototype.onsapfocusleave=function(t){if(!this.isOpen()){return}this.handleOuterEvent(this.getId(),t)};E.prototype.handleOuterEvent=function(t,e){var i=false,n=r.support.touch||r.system.combi;if(e.type=="mousedown"||e.type=="touchstart"){if(n&&(e.isMarked("delayedMouseEvent")||e.isMarked("cancelAutoClose"))){return}if(l(this.getDomRef(),e.target)||l(a.getStaticAreaRef(),e.target)||B(this,a.byId(e.target.id))){i=true}}else if(e.type=="sapfocusleave"){if(n){return}if(e.relatedControlId){if(l(this.getDomRef(),jQuery(document.getElementById(e.relatedControlId)).get(0))||B(this,a.byId(e.relatedControlId))){i=true}}}if(!i){this.close()}};function B(t,e){if(!t||!e){return false}var i=e.getParent();if(!i){return false}else if(i===t){return true}return B(t,i)}E.prototype._initItemsContainer=function(){var t=this._getAllEffectiveItems();var e=this._hasQuickActions();var i=this._hasItems();if(!this._oItemsContainer){this._createItemsContainer()}t.forEach(function(t,n){this._addView(t);if(e&&i&&n===0){this._oItemsContainer.addSeparator()}}.bind(this))};var S=s.extend("sap.m.table.columnmenu.AssociativeControl",{metadata:{final:true,properties:{height:{type:"boolean",defaultValue:false}},associations:{control:{type:"sap.ui.core.Control"}}},renderer:{apiVersion:2,render:function(t,e){t.openStart("div",e);e.getHeight()&&t.style("height","100%");t.openEnd();t.renderControl(sap.ui.getCore().byId(e.getControl()));t.close("div")}}});E.prototype._addView=function(t){var e=new f({content:new S({control:t.getContent(),height:true}),key:t.getId(),text:t.getLabel(),icon:t.getIcon()});this._oItemsContainer.addView(e);this._setItemVisibility(t,t.getVisible())};E.prototype._createItemsContainer=function(){var t=this;this._oBtnCancel=new e({text:this._getResourceText("table.COLUMNMENU_CANCEL"),press:function(){var e=t._oItemsContainer.getCurrentViewKey();if(t._fireEvent(a.byId(e),"cancel")){t.close()}}});this._oBtnOk=new e({text:this._getResourceText("table.COLUMNMENU_CONFIRM"),type:o.ButtonType.Emphasized,press:function(){var e=t._oItemsContainer.getCurrentViewKey();if(t._fireEvent(a.byId(e),"confirm")){t.close()}}});t._oItemsContainer=new g({listLayout:true,defaultView:w,footer:new i({content:[new n,this._oBtnOk,this._oBtnCancel]}),beforeViewSwitch:function(e){var i=e.getParameters();if(i.target!=="$default"){var n=t._oItemsContainer.getView(i.target);var o=t._getItemFromContainerItem(n);if(o&&!t._fireEvent(o,"press")){e.preventDefault()}}},afterViewSwitch:function(e){var i=e.getParameters();this.oLayout.setShowFooter(i.target!=="$default");t._previousView=i.source;if(i.target!=="$default"){var n=t._oItemsContainer.getView(i.target);if(n){var o=t._getItemFromContainerItem(n);t._updateButtonState(o);t._focusItem()}}else{t._focusItem();this._oPopover&&this._oPopover.invalidate()}}});t._oItemsContainer.getHeader().addContentRight(new e({text:this._getResourceText("table.COLUMNMENU_RESET"),press:function(){t._fireEvent(a.byId(t._oItemsContainer.getCurrentViewKey()),"reset",false)}}));this._oPopover.addDependent(t._oItemsContainer);t.addDependent(t._oItemsContainer)};E.prototype._fireEvent=function(t,e,i){var n=t["on"+p(e)];if(i!==false){var o=jQuery.Event(e);n.call(t,o);return!o.isDefaultPrevented()}else{n.call(t);return true}};E.prototype._getResourceText=function(t,e){this.oResourceBundle=this.oResourceBundle?this.oResourceBundle:sap.ui.getCore().getLibraryResourceBundle("sap.m");return t?this.oResourceBundle.getText(t,e):this.oResourceBundle};var V={};V[A.Sort]=0;V[A.Filter]=1;V[A.Group]=2;V[A.Aggregate]=3;V[A.Generic]=4;E.prototype._getAllEffectiveQuickActions=function(t){var e=(this.getAggregation("_quickActions")||[]).concat(this.getQuickActions());e=e.reduce(function(t,e){return t.concat(e?e.getEffectiveQuickActions():[])},[]);if(!t){e.sort(function(t,e){return V[t.getCategory()]-V[e.getCategory()]})}return e};E.prototype._hasQuickActions=function(){return this._getAllEffectiveQuickActions(true).length>0};E.prototype._getAllEffectiveItems=function(){var t=(this.getAggregation("_items")||[]).concat(this.getItems());return t.reduce(function(t,e){return t.concat(e.getEffectiveItems())},[]).filter(function(t){return t.getVisible()})};E.prototype._hasItems=function(){return this._getAllEffectiveItems().length>0};E.prototype._getItemFromContainerItem=function(t){return this._getAllEffectiveItems().find(function(e){return e.getId()===t.getKey()})};E.prototype._updateButtonState=function(t){if(!this._oItemsContainer){return}if(this._oItemsContainer.getCurrentViewKey()===w){return}this._oItemsContainer.getHeader().getContentRight()[0].setVisible(t.getButtonSettings()["reset"]["visible"]);this._oItemsContainer.getHeader().getContentRight()[0].setEnabled(t.getButtonSettings()["reset"]["enabled"]);this._oBtnOk.setVisible(t.getButtonSettings()["confirm"]["visible"]);this._oBtnCancel.setVisible(t.getButtonSettings()["cancel"]["visible"])};E.prototype._focusItem=function(){if(this._previousView==w){this._oItemsContainer._getNavBackBtn().focus()}else{var t=this._oItemsContainer._getNavigationList().getItems().find(function(t){return t.getVisible()&&t._key===this._previousView}.bind(this));t&&t.focus()}};E.prototype._focusInitialQuickAction=function(){if(this.getItems().length===0&&!this.getAggregation("_items")){var t=[];if(this.getAggregation("_quickActions")){t=this.getAggregation("_quickActions")[0].getEffectiveQuickActions()}else if(this.getQuickActions().length>0){t=this.getQuickActions()[0].getEffectiveQuickActions()}t.length>0&&t[0].getContent()[0].focus()}};E.prototype._setItemVisibility=function(t,e){var i=this._oItemsContainer._getNavigationList().getItems();var n=i.find(function(e){return e._key==t.getId()});n&&n.setVisible(e)};E.prototype._createQuickActionGrids=function(){var t;if(this._oForm){t=this._oForm.getFormContainers()[0];t.destroyFormElements()}else{t=new _;this._oForm=new d({layout:new v({labelSpanXL:3,labelSpanL:3,labelSpanM:3,labelSpanS:12,adjustLabelSpan:false}),editable:true,formContainers:t});this._oForm.addEventDelegate({onAfterRendering:function(){this.getDomRef().classList.remove("sapUiFormLblColon")}},this._oForm)}this._getAllEffectiveQuickActions().forEach(function(e){if(!e.getVisible()){return}var i=new m({span:"XL4 L4 M4 S12"});var n=e.getLabel();var o=new C({text:n,layoutData:i,vAlign:b.Middle,wrapping:true,width:"100%",showColon:n!==""&&!(e.getParent()&&e.getParent().isA("sap.m.table.columnmenu.QuickSortItem"))&&e._bHideLabelColon!==true});o.addStyleClass("sapMTCMenuQALabel");var r=[];var s=e.getContent();s.forEach(function(t){if(t.getLayoutData()){i=t.getLayoutData().clone()}else{var e=Math.floor(8/s.length);var n=s.length>2?12:Math.floor(12/s.length);i=new m({spanS:n,spanM:e,spanL:e,spanXL:e})}var o=new S({control:t.setWidth("100%")});o.setLayoutData(i);r.push(o)},this);t.addFormElement(new y({label:o,fields:r}))},this);this.addDependent(this._oForm)};return E});
//# sourceMappingURL=Menu.js.map