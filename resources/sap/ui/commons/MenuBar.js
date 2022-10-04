/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","./Menu","./MenuItem","./MenuItemBase","./library","sap/ui/core/Control","./MenuBarRenderer","sap/ui/core/ResizeHandler","sap/ui/core/Popup","sap/ui/events/checkMouseEnterOrLeave","sap/ui/events/KeyCodes","sap/ui/core/Configuration"],function(jQuery,e,t,r,i,n,s,o,u,a,l,f){"use strict";var p=u.Dock;var d=i.MenuBarDesign;var v=n.extend("sap.ui.commons.MenuBar",{metadata:{library:"sap.ui.commons",deprecated:true,properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},design:{type:"sap.ui.commons.MenuBarDesign",group:"Appearance",defaultValue:d.Standard}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.unified.MenuItem",multiple:true,singularName:"item"}}}});var g=t.extend("sap.ui.commons._DelegatorMenuItem",{constructor:function(e){t.apply(this);this.oAlterEgoItm=e;this.bNoSubMenu=true;var r=this.oAlterEgoItm.getSubmenu();if(r){var i=this;r.getRootMenu=function(){return i.getParent()};this.bNoSubMenu=false}},exit:function(){if(!this.bNoSubMenu){this.oAlterEgoItm.getSubmenu().getRootMenu=e.prototype.getRootMenu}this.bNoSubMenu=true;this.oAlterEgoItm=null},getText:function(){return this.oAlterEgoItm.getText()},getIcon:function(){return this.oAlterEgoItm.getIcon()},getEnabled:function(){return this.oAlterEgoItm.getEnabled()},getVisible:function(){return this.oAlterEgoItm.getVisible()},getSubmenu:function(){return this.oAlterEgoItm.getSubmenu()}});v.prototype.init=function(){this.oOvrFlwMnu=null;this.sCurrentFocusedItemRefId=null;this.data("sap-ui-fastnavgroup","true",true)};v.prototype.exit=function(){if(this.oOvrFlwMnu){this.oOvrFlwMnu.destroy()}this.oOvrFlwMnu=null;if(this.sResizeListenerId){o.deregister(this.sResizeListenerId);this.sResizeListenerId=null}};v.prototype.doBeforeRendering=function(){var e=this.getItems();for(var t=0;t<e.length;t++){var r=e[t].getSubmenu();if(r){r.setRootMenuTopStyle(this.getDesign()==d.Header)}}if(this.oOvrFlwMnu){this.oOvrFlwMnu.setRootMenuTopStyle(this.getDesign()==d.Header)}if(this.sResizeListenerId){o.deregister(this.sResizeListenerId);this.sResizeListenerId=null}};v.prototype.onAfterRendering=function(){this.sResizeListenerId=o.register(this.getDomRef(),jQuery.proxy(this.onresize,this));this.onresize()};v.prototype.onresize=function(e){b(this)};v.prototype.onfocusin=function(e){var t=this.getId();var r=jQuery(e.target);var i=r.attr("id");if(!i||i==t||i==t+"-area"){var n=this.$("area").children();this.sCurrentFocusedItemRefId=n.length==0?null:jQuery(n.get(0)).attr("id")}else{this.sCurrentFocusedItemRefId=i}var s=this.sCurrentFocusedItemRefId?document.getElementById(this.sCurrentFocusedItemRefId):null;if(s){s.focus()}this.$().attr("tabindex","-1")};v.prototype.onfocusout=function(e){this.$().attr("tabindex","0")};v.prototype.onmousedown=function(e){var t=I(this,e);if(t==="ovrflw"){this._bOvrFlwMnuSkipOpen=this.oOvrFlwMnu&&this.oOvrFlwMnu.bOpen}else if(t){var r=t.getSubmenu();t._bSkipOpen=r&&r.bOpen}};v.prototype.onmouseout=function(e){var t=I(this,e);if(t==="ovrflw"){var r=m(this,e);if(this._bOvrFlwMnuSkipOpen&&a(e,r[0])){this._bOvrFlwMnuSkipOpen=false}}else if(t){var r=m(this,e);if(t._bSkipOpen&&a(e,r[0])){t._bSkipOpen=false}}};v.prototype.onclick=function(e){c(this,e,false)};v.prototype.onsapselect=function(e){c(this,e,true)};v.prototype.onsapdown=function(e){c(this,e,true)};v.prototype.onsapdownmodifiers=function(e){if(e.altKey){c(this,e,true)}};v.prototype.onsapprevious=function(e){if(e.keyCode!=l.ARROW_UP){y(this,e,"prev")}};v.prototype.onsapnext=function(e){if(e.keyCode!=l.ARROW_DOWN){y(this,e,"next")}};v.prototype.onsaphome=function(e){y(this,e,"first")};v.prototype.onsapend=function(e){y(this,e,"last")};var c=function(e,t,r){t.preventDefault();t.stopPropagation();if(e.getEnabled()){var i=I(e,t);if(i==="ovrflw"){var n=m(e,t);if(e.oOvrFlwMnu&&!e._bOvrFlwMnuSkipOpen){var s=p;e.oOvrFlwMnu.open(r,n.get(0),s.EndTop,s.EndBottom,n.get(0))}}else if(i){if(i.getEnabled()){var n=m(e,t);var o=i.getSubmenu();if(o&&!i._bSkipOpen){var s=p;o.open(r,n.get(0),s.BeginTop,s.BeginBottom,n.get(0))}else if(!o){i.fireSelect({item:i})}}}}e._bOvrFlwMnuSkipOpen=false;var u=e.getItems();for(var a=0;a<u.length;a++){u[a]._bSkipOpen=false}};var m=function(e,t){var r=jQuery(t.target);if(!r.attr("itemidx")){r=r.parent()}return r.attr("itemidx")?r:null};var I=function(e,t){var r=m(e,t);if(r){var i=r.attr("itemidx");if(i){if(i=="ovrflw"){return"ovrflw"}else{var n=parseInt(i);var s=e.getItems()[n];return s}}}return null};var h=function(e){var t=0;var r=e.$("area");var i=r.children();var n=f.getRTL();var s=n?1e5:0;i.each(function(r){if(r==0){return true}var i=this.offsetLeft;var o=n?i>=s:i<=s;if(o){t=r;return false}else if(jQuery(this).attr("id")==e.getId()+"-ovrflw"){t=r;return false}else{s=i;return true}});return t};var b=function(t){var r=h(t);var i=r;var n=t.$("area");var s=n.children();var o=t.$("ovrflw");var u=false;if(r<s.length-1){o.attr("style","display:block;");if(!t.oOvrFlwMnu){t.oOvrFlwMnu=new e(t.getId()+"-ovrflwmnu");t.oOvrFlwMnu.bUseTopStyle=t.getDesign()==d.Header;t.oOvrFlwMnu.attachItemSelect(function(t){var r=t.getParameter("item");if(!(r instanceof g)){var i=e.prototype.getRootMenu.apply(r.getParent());i.fireItemSelect({item:r})}else if(r.bNoSubMenu&&r instanceof g){r.oAlterEgoItm.fireSelect({item:r.oAlterEgoItm})}})}t.oOvrFlwMnu.destroyItems();var a=t.getItems();for(var l=0;l<a.length;l++){var p=a[l];if(r!=0){if(p.getVisible()){r--}if(r==0){t.sLastVisibleItemId=p.getId()}}else{t.oOvrFlwMnu.addItem(new g(p));if(p.getId()==t.sCurrentFocusedItemRefId){u=true}}}if(f.getAccessibility()){s.attr("aria-setsize",i+1);o.attr("aria-posinset",i+1)}}else{o.attr("style","display:none;");if(t.oOvrFlwMnu){t.oOvrFlwMnu.destroyItems()}t.sLastVisibleItemId=null;if(f.getAccessibility()){s.attr("aria-setsize",i);o.attr("aria-posinset",0)}}n.scrollTop(0);if(u){t.sCurrentFocusedItemRefId=t.sLastVisibleItemId;document.getElementById(t.sLastVisibleItemId).focus()}};var y=function(e,t,r){t.stopPropagation();t.preventDefault();if(!e.sCurrentFocusedItemRefId){return}var i=null;if(e.sLastVisibleItemId&&(e.sCurrentFocusedItemRefId==e.sLastVisibleItemId&&r=="next"||r=="last")){i=e.getId()+"-ovrflw"}else if(e.sLastVisibleItemId&&e.sCurrentFocusedItemRefId==e.getId()+"-ovrflw"&&r=="prev"){i=e.sLastVisibleItemId}else{var n=r+"All";var s=false;if(r=="first"){n="prevAll";s=true}else if(r=="last"){n="nextAll";s=true}var o=jQuery(document.getElementById(e.sCurrentFocusedItemRefId));var u=o[n](":visible");i=jQuery(u.get(s?u.length-1:0)).attr("id")}if(i){e.sCurrentFocusedItemRefId=i;document.getElementById(i).focus()}};return v});
//# sourceMappingURL=MenuBar.js.map