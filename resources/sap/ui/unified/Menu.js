/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Element","sap/ui/core/Control","sap/ui/Device","sap/ui/core/Popup","./MenuItemBase","./library","sap/ui/core/library","sap/ui/unified/MenuRenderer","sap/ui/dom/containsOrEquals","sap/ui/thirdparty/jquery","sap/ui/events/KeyCodes","sap/base/Log","sap/ui/events/ControlEvents","sap/ui/events/PseudoEvents","sap/ui/events/checkMouseEnterOrLeave"],function(e,t,i,n,o,s,r,u,a,jQuery,p,h,f,l,d){"use strict";var c=n.Dock;var g=r.OpenState;var m=t.extend("sap.ui.unified.Menu",{metadata:{interfaces:["sap.ui.core.IContextMenu"],library:"sap.ui.unified",properties:{enabled:{type:"boolean",group:"Behavior",defaultValue:true},ariaDescription:{type:"string",group:"Accessibility",defaultValue:null,deprecated:true},maxVisibleItems:{type:"int",group:"Behavior",defaultValue:0},pageSize:{type:"int",group:"Behavior",defaultValue:5}},defaultAggregation:"items",aggregations:{items:{type:"sap.ui.unified.MenuItemBase",multiple:true,singularName:"item"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{itemSelect:{parameters:{item:{type:"sap.ui.unified.MenuItemBase"}}}}}});(function(s){m.prototype.bCozySupported=true;m._DELAY_SUBMENU_TIMER=300;m._DELAY_SUBMENU_TIMER_EXT=400;m.prototype.init=function(){var e=this;this.bOpen=false;this.oOpenedSubMenu=null;this.oHoveredItem=null;this.oPopup=null;this._bOpenedAsContextMenu=false;this.fAnyEventHandlerProxy=jQuery.proxy(function(e){var t=this.getRootMenu();if(t!=this||!this.bOpen||!this.getDomRef()||e.type!="mousedown"&&e.type!="touchstart"){return}t.handleOuterEvent(this.getId(),e)},this);this.fOrientationChangeHandler=function(){e.close()};this.bUseTopStyle=false};m.prototype._setCustomEnhanceAccStateFunction=function(e){this._fnCustomEnhanceAccStateFunction=e};m.prototype.enhanceAccessibilityState=function(e,t){var i=typeof this._fnCustomEnhanceAccStateFunction==="function";if(i){this._fnCustomEnhanceAccStateFunction(e,t)}};m.prototype.exit=function(){if(this.oPopup){this.oPopup.detachClosed(this._menuClosed,this);this.oPopup.destroy();delete this.oPopup}f.unbindAnyEvent(this.fAnyEventHandlerProxy);if(this._bOrientationChangeBound){jQuery(s).off("orientationchange",this.fOrientationChangeHandler);this._bOrientationChangeBound=false}this._resetDelayedRerenderItems();this._detachResizeHandler()};m.prototype.invalidate=function(e){if(e instanceof o&&this.getDomRef()){this._delayedRerenderItems()}else{t.prototype.invalidate.apply(this,arguments)}};m.prototype.onBeforeRendering=function(){this._resetDelayedRerenderItems();this.$().off("mousemove")};m.prototype.onAfterRendering=function(){if(this.$().parent().attr("id")!="sap-ui-static"){h.error("sap.ui.unified.Menu: The Menu is popup based and must not be rendered directly as content of the page.");this.close();this.$().remove()}var e=this.getItems();for(var t=0;t<e.length;t++){if(e[t].onAfterRendering&&e[t].getDomRef()){e[t].onAfterRendering()}}if(this.oHoveredItem){this.oHoveredItem.hover(true,this)}b(this);this.$().on("mousemove",this._focusMenuItem.bind(this))};m.prototype._focusMenuItem=function(e){if(!i.system.desktop){return}var t=this.getItemByDomRef(e.target);if(!this.bOpen||!t){return}if(this.oOpenedSubMenu&&a(this.oOpenedSubMenu.getDomRef(),e.target)){return}this.setHoveredItem(t);t&&t.focus(this);this._openSubMenuDelayed(t)};m.prototype.onThemeChanged=function(){if(this.getDomRef()&&this.getPopup().getOpenState()===g.OPEN){b(this);this.getPopup()._applyPosition(this.getPopup()._oLastPosition)}};m.prototype.addItem=function(e){this.addAggregation("items",e,!!this.getDomRef());this._delayedRerenderItems();return this};m.prototype.insertItem=function(e,t){this.insertAggregation("items",e,t,!!this.getDomRef());this._delayedRerenderItems();return this};m.prototype.removeItem=function(e){this.removeAggregation("items",e,!!this.getDomRef());this._delayedRerenderItems();return this};m.prototype.removeAllItems=function(){var e=this.removeAllAggregation("items",!!this.getDomRef());this._delayedRerenderItems();return e};m.prototype.destroyItems=function(){this.destroyAggregation("items",!!this.getDomRef());this._delayedRerenderItems();return this};m.prototype._delayedRerenderItems=function(){if(!this.getDomRef()){return}this._resetDelayedRerenderItems();this._discardOpenSubMenuDelayed();this._itemRerenderTimer=setTimeout(function(){var e=this.getDomRef();if(e){var t=sap.ui.getCore().createRenderManager();u.renderItems(t,this);t.flush(e);t.destroy();this.onAfterRendering();this.getPopup()._applyPosition(this.getPopup()._oLastPosition)}}.bind(this),0)};m.prototype._resetDelayedRerenderItems=function(){if(this._itemRerenderTimer){clearTimeout(this._itemRerenderTimer);delete this._itemRerenderTimer}};m.prototype._detachResizeHandler=function(){if(this._hasResizeListener){i.resize.detachHandler(this._handleResizeChange,this);this._hasResizeListener=false}};m.prototype.open=function(e,t,n,o,r,u,a){var p;if(this.bOpen){return}y(this,true);this.oOpenerRef=t;this.bIgnoreOpenerDOMRef=false;this.getPopup().open(0,n,o,r,u||"0 0",a||"flipfit flipfit",function(e){var t=this.getPopup()._getOfDom(r);if(!t||!jQuery(t).is(":visible")||!v(t)){this.close()}else{this.getPopup()._applyPosition(e.lastPosition)}}.bind(this));this.bOpen=true;i.resize.attachHandler(this._handleResizeChange,this);this._hasResizeListener=true;if(e||this.getRootMenu().getId()===this.getId()){p=this.getNextSelectableItem(-1);this.setHoveredItem(p);p&&p.focus(this)}f.bindAnyEvent(this.fAnyEventHandlerProxy);if(i.support.orientation&&this.getRootMenu()===this){jQuery(s).on("orientationchange",this.fOrientationChangeHandler);this._bOrientationChangeBound=true}};m.prototype._handleResizeChange=function(){this.getPopup()._applyPosition(this.getPopup()._oLastPosition)};m.prototype.openAsContextMenu=function(t,i){var n,o,s,r,u;i=i instanceof e?i.getDomRef():i;if(t instanceof jQuery.Event){u=jQuery(i).offset();n=t.pageX-u.left;o=t.pageY-u.top;this._iX=t.clientX;this._iY=t.clientY}else{n=t.offsetX||0;o=t.offsetY||0;this._iX=t.left||0;this._iY=t.top||0}s=sap.ui.getCore().getConfiguration().getRTL();r=c;if(s){n=i.clientWidth-n}this._bOpenedAsContextMenu=true;this.open(true,i,r.BeginTop,r.BeginTop,i,n+" "+o,"fit")};m.prototype._handleOpened=function(){var e,t,i,n,o,r,u,a,p,h;if(!this._bOpenedAsContextMenu){return}e=this.$();t=jQuery(s);i=this._iX;n=this._iY;o=t.scrollLeft()+t.width();r=t.scrollTop()+t.height();u=sap.ui.getCore().getConfiguration().getRTL();a=false;p=e.width();h=e.height();if(n+h>r){n=n-h;a=true}if(u){if(o-i+p>o){i=o-(i+p);a=true}else{i=o-i;a=true}}else{if(i+p>o){i=i-p;a=true}}this._bOpenedAsContextMenu=false;a&&this.oPopup.setPosition("begin top","begin top",t,i+" "+n,"flipfit")};m.prototype.close=function(e){if(!this.bOpen||m._dbg){return}this._discardOpenSubMenuDelayed();y(this,false);delete this._bFixed;f.unbindAnyEvent(this.fAnyEventHandlerProxy);if(this._bOrientationChangeBound){jQuery(s).off("orientationchange",this.fOrientationChangeHandler);this._bOrientationChangeBound=false}this.bOpen=false;this.closeSubmenu();this.setHoveredItem();if(!e){this.bIgnoreOpenerDOMRef=true}this.getPopup().close(0);this._detachResizeHandler();this._resetDelayedRerenderItems();this.$().remove();this.bOutput=false;if(this.isSubMenu()){this.getParent().getParent().oOpenedSubMenu=null}};m.prototype._menuClosed=function(){if(this.oOpenerRef){if(!this.bIgnoreOpenerDOMRef){try{this.oOpenerRef.focus()}catch(e){h.warning("Menu.close cannot restore the focus on opener "+this.oOpenerRef+", "+e)}}this.oOpenerRef=undefined}};m.prototype.onclick=function(e){this.selectItem(this.getItemByDomRef(e.target),false,!!(e.metaKey||e.ctrlKey));e.preventDefault();e.stopPropagation()};m.prototype.onsapnext=function(e){var t,i,n=this.oHoveredItem?this.oHoveredItem.getSubmenu():undefined;if(e.keyCode!==p.ARROW_DOWN&&!e.metaKey&&!e.altKey){if(n&&this.checkEnabled(this.oHoveredItem)){if(n.bOpen){i=n.getNextSelectableItem(-1);n.setHoveredItem(i);i&&i.focus(this)}else{this.openSubmenu(this.oHoveredItem,true)}}return}if(n&&n.bOpen){this.closeSubmenu(false,true)}t=this.oHoveredItem?this.indexOfAggregation("items",this.oHoveredItem):-1;i=this.getNextSelectableItem(t);this.setHoveredItem(i);i&&i.focus(this);if(!e.metaKey&&!e.altKey){e.preventDefault();e.stopPropagation()}};m.prototype.onsapnextmodifiers=m.prototype.onsapnext;m.prototype.onsapprevious=function(e){var t=this.oHoveredItem?this.indexOfAggregation("items",this.oHoveredItem):-1,i=this.getPreviousSelectableItem(t),n=this.oHoveredItem?this.oHoveredItem.getSubmenu():null;if(e.keyCode!==p.ARROW_UP&&!e.metaKey&&!e.altKey){if(this.isSubMenu()){this.close(true)}e.preventDefault();e.stopPropagation();return}if(n&&n.bOpen){this.closeSubmenu(false,true)}this.setHoveredItem(i);i&&i.focus(this);if(!e.metaKey&&!e.altKey){e.preventDefault();e.stopPropagation()}};m.prototype.onsappreviousmodifiers=m.prototype.onsapprevious;m.prototype.onsaphome=function(e){var t=this.getNextSelectableItem(-1);this.setHoveredItem(t);t&&t.focus(this);e.preventDefault();e.stopPropagation()};m.prototype.onsapend=function(e){var t=this.getPreviousSelectableItem(this.getItems().length);this.setHoveredItem(t);t&&t.focus(this);e.preventDefault();e.stopPropagation()};m.prototype.onsappagedown=function(e){var t=this.oHoveredItem?this.indexOfAggregation("items",this.oHoveredItem):-1,i;if(this.getPageSize()<1){this.onsapend(e);return}t+=this.getPageSize();if(t>=this.getItems().length){this.onsapend(e);return}i=this.getNextSelectableItem(t-1);this.setHoveredItem(i);i&&i.focus(this);e.preventDefault();e.stopPropagation()};m.prototype.onsappageup=function(e){var t=this.oHoveredItem?this.indexOfAggregation("items",this.oHoveredItem):-1,i;if(this.getPageSize()<1){this.onsaphome(e);return}t-=this.getPageSize();if(t<0){this.onsaphome(e);return}i=this.getPreviousSelectableItem(t+1);this.setHoveredItem(i);i&&i.focus(this);e.preventDefault();e.stopPropagation()};m.prototype.onsapselect=function(e){this._sapSelectOnKeyDown=true;e.preventDefault();e.stopPropagation()};m.prototype.onkeyup=function(e){if(this.oHoveredItem&&jQuery(e.target).prop("tagName")!="INPUT"){var t=this.oHoveredItem.getDomRef();jQuery(t).trigger("focus")}if(!this._sapSelectOnKeyDown&&(e.key!==p.Space||!i.os.macintosh&&s.navigator.maxTouchPoints<=1)){return}else{this._sapSelectOnKeyDown=false}if(!l.events.sapselect.fnCheck(e)&&e.key!=="Enter"){return}this.selectItem(this.oHoveredItem,true,false);e.preventDefault();e.stopPropagation()};m.prototype.onsapbackspace=function(e){if(jQuery(e.target).prop("tagName")!="INPUT"){e.preventDefault()}};m.prototype.onsapbackspacemodifiers=m.prototype.onsapbackspace;m.prototype.onsapescape=function(e){this.close(true);e.preventDefault();e.stopPropagation()};m.prototype.onsaptabnext=function(e){if(this.isSubMenu()){e.preventDefault()}this.close(true);e.stopPropagation()};m.prototype.onsaptabprevious=m.prototype.onsaptabnext;m.prototype._openSubMenuDelayed=function(e){if(!e){return}this._discardOpenSubMenuDelayed();this._delayedSubMenuTimer=setTimeout(function(){this.checkEnabled(e)&&this.closeSubmenu(false,true);if(this.checkEnabled(e)&&e.getSubmenu()){this.setHoveredItem(e);e&&e.focus(this);this.openSubmenu(e,false,true)}}.bind(this),e.getSubmenu()&&this.checkEnabled(e)?m._DELAY_SUBMENU_TIMER:m._DELAY_SUBMENU_TIMER_EXT)};m.prototype._discardOpenSubMenuDelayed=function(e){if(this._delayedSubMenuTimer){clearTimeout(this._delayedSubMenuTimer);this._delayedSubMenuTimer=null}};m.prototype.onmouseout=function(e){if(!i.system.desktop){return}if(d(e,this.getDomRef())){this.setHoveredItem(null);if(!this.oOpenedSubMenu||!(this.oOpenedSubMenu.getParent()===this.oHoveredItem)){this.setHoveredItem(this.oHoveredItem)}this._discardOpenSubMenuDelayed()}};m.prototype.onsapfocusleave=function(e){if(this.oOpenedSubMenu||!this.bOpen){return}this.getRootMenu().handleOuterEvent(this.getId(),e)};m.prototype.handleOuterEvent=function(e,t){var n=false,o=i.support.touch||i.system.combi;this.bIgnoreOpenerDOMRef=false;if(t.type=="mousedown"||t.type=="touchstart"){if(o&&(t.isMarked("delayedMouseEvent")||t.isMarked("cancelAutoClose"))){return}var s=this;while(s&&!n){if(a(s.getDomRef(),t.target)){n=true}s=s.oOpenedSubMenu}}else if(t.type=="sapfocusleave"){if(o){return}if(t.relatedControlId){var s=this;while(s&&!n){if(s.oOpenedSubMenu&&s.oOpenedSubMenu.getId()==t.relatedControlId||a(s.getDomRef(),jQuery(document.getElementById(t.relatedControlId)).get(0))){n=true}s=s.oOpenedSubMenu}}if(!n){this.bIgnoreOpenerDOMRef=true}}if(!n){this.close()}};m.prototype.getItemByDomRef=function(e){var t=this.getItems(),i=t.length;for(var n=0;n<i;n++){var o=t[n],s=o.getDomRef();if(a(s,e)){return o}}return null};m.prototype.selectItem=function(e,t,n){if(!e||!(e instanceof o&&this.checkEnabled(e))){return}var s=e.getSubmenu();if(!s){this.getRootMenu().close(true)}else{if(!i.system.desktop&&this.oOpenedSubMenu===s){this.closeSubmenu()}else{this.openSubmenu(e,t)}}e.fireSelect({item:e,ctrlKey:n});this.getRootMenu().fireItemSelect({item:e})};m.prototype.isSubMenu=function(){return this.getParent()&&this.getParent().getParent&&this.getParent().getParent()instanceof m};m.prototype.getRootMenu=function(){var e=this;while(e.isSubMenu()){e=e.getParent().getParent()}return e};m.prototype.getMenuLevel=function(){var e=1;var t=this;while(t.isSubMenu()){t=t.getParent().getParent();e++}return e};m.prototype.getPopup=function(){if(!this.oPopup){this.oPopup=new n(this,false,true,false);this.oPopup.setDurations(0,0);this.oPopup.attachClosed(this._menuClosed,this);this.oPopup.attachOpened(this._handleOpened,this)}return this.oPopup};m.prototype.setHoveredItem=function(e){if(this.oHoveredItem){this.oHoveredItem.hover(false,this)}if(!e){this.oHoveredItem=null;return}this.oHoveredItem=e;e.hover(true,this);this.scrollToItem(this.oHoveredItem)};m.prototype.openSubmenu=function(e,t,i){var o=e.getSubmenu();if(!o){return}if(this.oOpenedSubMenu&&this.oOpenedSubMenu!==o){this.closeSubmenu()}if(this.oOpenedSubMenu){this.oOpenedSubMenu._bFixed=i&&this.oOpenedSubMenu._bFixed||!i&&!this.oOpenedSubMenu._bFixed;this.oOpenedSubMenu._bringToFront()}else{this.oOpenedSubMenu=o;var s=n.Dock;o.open(t,e,s.BeginTop,s.EndTop,e,"-4 4")}};m.prototype.closeSubmenu=function(e,t){if(this.oOpenedSubMenu){if(e&&this.oOpenedSubMenu._bFixed){return}if(t){this.oOpenedSubMenu.bIgnoreOpenerDOMRef=true}this.oOpenedSubMenu.close();this.oOpenedSubMenu=null}};m.prototype.scrollToItem=function(e){var t=this.getDomRef(),i=e?e.getDomRef():null;if(!i||!t){return}var n=t.scrollTop,o=i.offsetTop,s=jQuery(t).height(),r=jQuery(i).height();if(n>o){t.scrollTop=o}else if(o+r>n+s){t.scrollTop=Math.ceil(o+r-s)}};m.prototype._bringToFront=function(){jQuery(document.getElementById(this.getPopup().getId())).mousedown()};m.prototype.checkEnabled=function(e){return e&&e.getEnabled()&&this.getEnabled()};m.prototype.getNextSelectableItem=function(e){var t=null;var i=this.getItems();for(var n=e+1;n<i.length;n++){if(i[n].getVisible()&&this.checkEnabled(i[n])){t=i[n];break}}if(!t){for(var n=0;n<=e;n++){if(i[n].getVisible()&&this.checkEnabled(i[n])){t=i[n];break}}}return t};m.prototype.getPreviousSelectableItem=function(e){var t=null;var i=this.getItems();for(var n=e-1;n>=0;n--){if(i[n].getVisible()&&this.checkEnabled(i[n])){t=i[n];break}}if(!t){for(var n=i.length-1;n>=e;n--){if(i[n].getVisible()&&this.checkEnabled(i[n])){t=i[n];break}}}return t};m.prototype.setRootMenuTopStyle=function(e){this.getRootMenu().bUseTopStyle=e;m.rerenderMenu(this.getRootMenu())};m.rerenderMenu=function(e){var t=e.getItems();for(var i=0;i<t.length;i++){var n=t[i].getSubmenu();if(n){m.rerenderMenu(n)}}e.invalidate();e.rerender()};m.prototype.focus=function(){if(this.bOpen){t.prototype.focus.apply(this,arguments)}};m.prototype.isCozy=function(){if(!this.bCozySupported){return false}if(this.hasStyleClass("sapUiSizeCozy")){return true}if(r(this.oOpenerRef)){return true}if(r(this.getParent())){return true}return false};function r(e){if(!e){return false}e=e.$?e.$():jQuery(e);return e.closest(".sapUiSizeCompact,.sapUiSizeCondensed,.sapUiSizeCozy").hasClass("sapUiSizeCozy")}function y(e,t){var i=e.getParent();if(i&&i instanceof o){i.onSubmenuToggle(t)}}function b(e){var t=e.getMaxVisibleItems(),i=document.documentElement.clientHeight-10,n=e.$();if(t>0){var o=e.getItems();for(var s=0;s<o.length;s++){if(o[s].getDomRef()){i=Math.min(i,o[s].$().outerHeight(true)*t);break}}}if(n.outerHeight(true)>i){n.css("max-height",i+"px").toggleClass("sapUiMnuScroll",true)}else{n.css("max-height","").toggleClass("sapUiMnuScroll",false)}}function v(e){var t;if(!e){return false}if(e instanceof jQuery){e=e.get(0)}t=e.getBoundingClientRect();return t.top>=0&&t.left>=0&&t.bottom<=(s.innerHeight||document.documentElement.clientHeight)&&t.right<=(s.innerWidth||document.documentElement.clientWidth)}})(window);return m});
//# sourceMappingURL=Menu.js.map