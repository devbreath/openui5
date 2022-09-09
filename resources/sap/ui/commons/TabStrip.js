/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/base/Log","./library","sap/ui/core/Control","sap/ui/core/delegate/ItemNavigation","sap/ui/core/Icon","sap/ui/core/delegate/ScrollEnablement","sap/ui/Device","./TabStripRenderer","sap/ui/core/ResizeHandler","sap/ui/core/Title","./Tab","sap/ui/events/KeyCodes","sap/ui/dom/jquery/parentByAttribute","sap/ui/dom/jquery/zIndex","sap/ui/thirdparty/jqueryui/jquery-ui-position"],function(jQuery,e,t,i,s,r,o,a,n,l,h,f,p){"use strict";var d=i.extend("sap.ui.commons.TabStrip",{metadata:{library:"sap.ui.commons",deprecated:true,properties:{height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},selectedIndex:{type:"int",group:"Misc",defaultValue:0},enableTabReordering:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"tabs",aggregations:{tabs:{type:"sap.ui.commons.Tab",multiple:true,singularName:"tab"},_leftArrowControl:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_rightArrowControl:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},events:{select:{parameters:{index:{type:"int"}}},close:{parameters:{index:{type:"int"}}}}}});d.SCROLL_SIZE=320;d.ANIMATION_DURATION=sap.ui.getCore().getConfiguration().getAnimation()?200:0;d.SCROLL_ANIMATION_DURATION=sap.ui.getCore().getConfiguration().getAnimation()?500:0;d.prototype.init=function(){this._bInitialized=true;this._bRtl=sap.ui.getCore().getConfiguration().getRTL();this._iCurrentScrollLeft=0;this._iMaxOffsetLeft=null;this._scrollable=null;this._oScroller=new o(this,this.getId()+"-tablist",{horizontal:!this.getEnableTabReordering(),vertical:false,nonTouchScrolling:true});this.data("sap-ui-fastnavgroup","true",true)};d.prototype.setEnableTabReordering=function(e){this.setProperty("enableTabReordering",e,true);if(this._oScroller){this._oScroller.setHorizontal(!e)}return this};d.prototype.onBeforeRendering=function(){if(this._sResizeListenerId){l.deregister(this._sResizeListenerId);this._sResizeListenerId=null}};d.prototype.onAfterRendering=function(){if(this._oScroller){this._oScroller.setIconTabBar(this,jQuery.proxy(this._updateScrollingAppearance,this),null)}this._initItemNavigation();this._updateScrollingAppearance();this._sResizeListenerId=l.register(this.getDomRef(),jQuery.proxy(this._updateScrollingAppearance,this));var e=this.getTabs();var t=this.getSelectedIndex();var i=e[t];if(this._oScroller&&i&&i.$().length>0){if(!this._oScroller._$Container){this._oScroller.onAfterRendering()}this._scrollIntoView(i.$(),d.SCROLL_ANIMATION_DURATION)}for(var s=0;s<e.length;s++){e[s].onAfterRendering()}};d.prototype.createTab=function(e,t){var i=new h({text:e}),s=new f;s.setTitle(i);s.addContent(t);this.addTab(s);return s};d.prototype.selectTabByDomRef=function(e){var t=this.getItemIndex(e);if(t>-1){if(t!=this.getSelectedIndex()&&this.getTabs()[t].getEnabled()){var i=this.getSelectedIndex();this.setProperty("selectedIndex",t,true);this.rerenderPanel(i,true);this.oItemNavigation.setSelectedIndex(this.oItemNavigation.getFocusedIndex())}}};d.prototype.onsapspace=function(e){var t=e.target;this.selectTabByDomRef(t)};d.prototype.onsapspacemodifiers=d.prototype.onsapspace;d.prototype.onsapenter=d.prototype.onsapspace;d.prototype.onsapentermodifiers=d.prototype.onsapspace;d.prototype.onsapdelete=function(e){var t=e.target;var i=this.getItemIndex(t);if(i>-1&&this.getTabs()[i].getClosable()){this.fireClose({index:i})}};d.prototype.getFocusDomRef=function(){return this.getDomRef().firstChild};d.prototype.exit=function(){this._bInitialized=false;this._iCurrentScrollLeft=null;this._iMaxOffsetLeft=null;this._scrollable=null;if(this._oScroller){this._oScroller.destroy();this._oScroller=null}if(this._sResizeListenerId){l.deregister(this._sResizeListenerId);this._sResizeListenerId=null}if(this.oItemNavigation){this.removeDelegate(this.oItemNavigation);this.oItemNavigation.destroy();delete this.oItemNavigation}};d.prototype.getItemIndex=function(e){var t;if(!e.id||e.id.search("-close")!=-1){var i=jQuery(e).parentByAttribute("id");t=i.id}else{t=e.id}for(var s=0,r=this.getTabs();s<r.length;s++){if(t==r[s].getId()){return s}}return-1};d.prototype.removeTab=function(e){var t=e;if(typeof e=="string"){e=sap.ui.getCore().byId(e)}if(typeof e=="object"){t=this.indexOfTab(e)}var i=this.getTabs()[t];if(i.getVisible()){i.setProperty("visible",false,true);this.hideTab(t);i.setProperty("visible",true,true)}if(this.getSelectedIndex()>t){this.setProperty("selectedIndex",this.getSelectedIndex()-1,true)}return this.removeAggregation("tabs",t,true)};d.prototype.setSelectedIndex=function(e){var t=this.getSelectedIndex();if(e==t){return this}var i=this.getTabs();var s=i[e];if(this._oScroller&&s&&s.$().length>0){this._scrollIntoView(s.$(),d.SCROLL_ANIMATION_DURATION)}if(!s&&!this.getDomRef()){this.setProperty("selectedIndex",e,false)}else if(s&&s.getEnabled()&&s.getVisible()){this.setProperty("selectedIndex",e,true);if(this.getDomRef()&&!this.invalidated){this.rerenderPanel(t);if(this.oItemNavigation){var r=0;var o=-1;for(var a=0;a<i.length;a++){s=i[a];if(s.getVisible()===false){continue}if(a==e){o=r;break}r++}this.oItemNavigation.setSelectedIndex(o)}}}else{this._warningInvalidSelectedIndex(e,s)}return this};d.prototype.closeTab=function(e){var t=this.getTabs()[e];if(!t||!t.getClosable()||!t.getVisible()){return}t.setProperty("visible",false,true);this.hideTab(e)};d.prototype.hideTab=function(e){var t=this.getTabs()[e];if(!this.getDomRef()){return}var i=this.oItemNavigation.getFocusedIndex();var s=parseInt(t.$().attr("aria-posinset"))-1;var r=sap.ui.getCore().getCurrentFocusedControlId();t.$().remove();if(this.iVisibleTabs==1){this.setProperty("selectedIndex",-1,true);t.$("panel").remove()}else if(e==this.getSelectedIndex()){var o=e+1;while(o<this.getTabs().length&&(!this.getTabs()[o].getEnabled()||!this.getTabs()[o].getVisible())){o++}if(o==this.getTabs().length){o=e-1;while(o>=0&&(!this.getTabs()[o].getEnabled()||!this.getTabs()[o].getVisible())){o--}}this.setProperty("selectedIndex",o,true);this.rerenderPanel(e)}else{this.toggleTabClasses(this.getSelectedIndex(),this.getSelectedIndex())}this.iVisibleTabs--;var s=0;var a=[];var n=-1;var l=false;for(var h=0;h<this.getTabs().length;h++){var t=this.getTabs()[h];if(r==t.getId()){l=true}if(t.getVisible()===false){continue}if(h==this.getSelectedIndex()){n=s}s++;t.$().attr("aria-posinset",s).attr("aria-setsize",this.iVisibleTabs);a.push(t.getDomRef())}if(s<=i){i--}this.oItemNavigation.setItemDomRefs(a);this.oItemNavigation.setSelectedIndex(n);this.oItemNavigation.setFocusedIndex(i);if(l){this.oItemNavigation.focusItem(i)}this._updateScrollingAppearance()};d.prototype.rerenderPanel=function(e,t){var i=this.getTabs();var s=this.getSelectedIndex();var r=i[s];var o=i[e];setTimeout(function(){if(!this._bInitialized){return}var e=this.$().find(".sapUiTabPanel");if(r){if(e.length>0){var i=sap.ui.getCore().createRenderManager();this.getRenderer().renderTabContents(i,r);i.flush(e[0]);i.destroy()}var a=r.getId();e.attr("id",a+"-panel").attr("aria-labelledby",a)}else{e.empty()}o.setProperty("scrollTop",e.scrollTop(),true);o.setProperty("scrollLeft",e.scrollLeft(),true);if(r){r.onAfterRendering()}if(t){this.fireSelect({index:s})}}.bind(this),0);if(r){this.toggleTabClasses(e,s)}};d.prototype.toggleTabClasses=function(e,t){var i=this.getTabs();var s=i[e];if(s){s.$().toggleClass("sapUiTabSel sapUiTab").attr("aria-selected",false)}var r=e-1;while(r>=0&&!i[r].getVisible()){r--}if(r>=0){i[r].$().removeClass("sapUiTabBeforeSel")}var o=e+1;while(o<i.length&&!i[o].getVisible()){o++}if(o<i.length){i[o].$().removeClass("sapUiTabAfterSel")}s=i[t];if(s){s.$().toggleClass("sapUiTabSel sapUiTab").attr("aria-selected",true)}r=t-1;while(r>=0&&!i[r].getVisible()){r--}if(r>=0){i[r].$().addClass("sapUiTabBeforeSel")}o=t+1;while(o<i.length&&!i[o].getVisible()){o++}if(o<i.length){i[o].$().addClass("sapUiTabAfterSel")}};d.prototype.invalidate=function(){this.invalidated=true;i.prototype.invalidate.apply(this,arguments)};d.prototype._warningInvalidSelectedIndex=function(t,i){var s="";if(!i){s="Tab not exists"}else if(!i.getEnabled()){s="Tab disabled"}else if(!i.getVisible()){s="Tab not visible"}e.warning("SelectedIndex "+t+" can not be set",s,"sap.ui.commons.TabStrip")};d.prototype.onkeydown=function(e){if(e.which===p.ESCAPE){this._stopMoving()}};d.prototype.onclick=function(e){var t=e.target;var i=jQuery(t);if(t.className=="sapUiTabClose"){var s=this.getItemIndex(i.parentByAttribute("id"));if(s>-1){this.fireClose({index:s})}}};d.prototype.onmousedown=function(e){var t=!e.button;var i=this._isTouchMode(e);if(!i&&!t){return}var s=e.target;var r=jQuery(s);if(s.className=="sapUiTabClose"){e.preventDefault();e.stopPropagation();e.target=null;return}this.selectTabByDomRef(s);if(!this.getEnableTabReordering()){return}var o=r.closest(".sapUiTab, .sapUiTabSel, .sapUiTabDsbl");if(o.length===1){this._onTabMoveStart(o,e,i)}};d.prototype._onTabMoveStart=function(e,t,i){this._disableTextSelection();t.preventDefault();e.zIndex(this.$().zIndex()+10);var s=this.getItemIndex(t.target);var r=this.getTabs()[s];var o=this.$().find(".sapUiTabBarCnt").children();var a=jQuery.inArray(e[0],o);var n=e.outerWidth();this._dragContext={index:a,tabIndex:s,isTouchMode:i,startX:i?t.originalEvent.targetTouches[0].pageX:t.pageX,tab:r,tabWidth:n,tabCenter:e.position().left+n/2};this._aMovedTabIndexes=[];var l=jQuery(document);if(i){l.on("touchmove",jQuery.proxy(this._onTabMove,this));l.on("touchend",jQuery.proxy(this._onTabMoved,this))}else{l.on("mousemove",jQuery.proxy(this._onTabMove,this));l.on("mouseup",jQuery.proxy(this._onTabMoved,this))}};d.prototype._onTabMove=function(e){var t=this._dragContext;if(!t){return}var i=this._isTouchMode(e);if(i){e.preventDefault()}var s=i?e.targetTouches[0].pageX:e.pageX;var r=s-t.startX;t.tab.$().css({left:r});var o,a,n,l,h=this.$().find(".sapUiTabBarCnt").children(),f=this._aMovedTabIndexes,p=sap.ui.getCore().getConfiguration().getRTL();for(var d=0;d<h.length;d++){if(d==t.index){continue}o=jQuery(h[d]);a=o.position().left;n=parseFloat(o.css("left"));if(!isNaN(n)){a-=n}if(d<t.index!=p){l=a+o.outerWidth()>t.tabCenter+r;this._onAnimateTab(o,t.tabWidth,l,f,d)}else{l=a<t.tabCenter+r;this._onAnimateTab(o,-t.tabWidth,l,f,d)}}};d.prototype._onAnimateTab=function(e,t,i,s,r){var o=jQuery.inArray(r,s);var a=o!=-1;if(i&&!a){e.stop(true,true);e.animate({left:t},d.ANIMATION_DURATION);s.push(r)}else if(!i&&a){e.stop(true,true);e.animate({left:0},d.ANIMATION_DURATION);s.splice(o,1)}};d.prototype._onTabMoved=function(e){var t=this._dragContext;if(!t){return}this._stopMoving();var i=this._aMovedTabIndexes;if(i.length==0){return}var s=t.tab.$(),r,o=this.$().find(".sapUiTabBarCnt").children();var a=i[i.length-1],n=a,l=this.getItemIndex(o[a]);this.removeAggregation("tabs",t.tab,true);this.insertAggregation("tabs",t.tab,l,true);if(a>t.index){s.insertAfter(jQuery(o[a]))}else{s.insertBefore(jQuery(o[a]))}o=this.$().find(".sapUiTabBarCnt").children();if(!t.tab.getEnabled()){for(var h=0;h<o.length;h++){r=jQuery(o[h]);if(r.hasClass("sapUiTabSel")){n=h;l=this.getItemIndex(r[0]);break}}}this.setProperty("selectedIndex",l,true);o.removeClass("sapUiTabAfterSel");o.removeClass("sapUiTabBeforeSel");for(var h=0;h<o.length;h++){r=jQuery(o[h]);r.attr("aria-posinset",h+1);if(h==n-1){r.addClass("sapUiTabBeforeSel")}else if(h==n+1){r.addClass("sapUiTabAfterSel")}}s.trigger("focus");this._initItemNavigation()};d.prototype._stopMoving=function(){var e=this._dragContext;if(!e){return}var t=e.tab.$();t.css("z-index","");var i=this.$().find(".sapUiTabBarCnt").children();i.stop(true,true);i.css("left","");this._dragContext=null;var s=jQuery(document);if(e.isTouchMode){s.off("touchmove",this._onTabMove);s.off("touchend",this._onTabMoved)}else{s.off("mousemove",this._onTabMove);s.off("mouseup",this._onTabMoved)}this._enableTextSelection()};d.prototype._isTouchMode=function(e){return!!e.originalEvent["touches"]};d.prototype._initItemNavigation=function(){var e=this.getDomRef("tablist"),t=e.childNodes,i=[],r=-1;for(var o=0;o<t.length;o++){i.push(t[o]);if(jQuery(t[o]).hasClass("sapUiTabSel")){r=o}}if(!this.oItemNavigation){this.oItemNavigation=new s;this.oItemNavigation.attachEvent(s.Events.AfterFocus,this._onItemNavigationAfterFocus,this);this.oItemNavigation.setCycling(false);this.addDelegate(this.oItemNavigation)}this.oItemNavigation.setRootDomRef(e);this.oItemNavigation.setItemDomRefs(i);this.oItemNavigation.setSelectedIndex(r)};d.prototype._disableTextSelection=function(e){jQuery(e||document.body).attr("unselectable","on").addClass("sapUiTabStripNoSelection").bind("selectstart",function(e){e.preventDefault();return false})};d.prototype._enableTextSelection=function(e){jQuery(e||document.body).attr("unselectable","off").removeClass("sapUiTabStripNoSelection").unbind("selectstart")};d.prototype._getActualSelectedIndex=function(){var e=Math.max(0,this.getSelectedIndex());var t=this.getTabs();var i=t[e];if(i&&i.getVisible()&&i.getEnabled()){return e}for(var s=0;s<t.length;s++){var r=t[s];if(r.getVisible()&&r.getEnabled()){return s}}return 0};d.prototype._getLeftArrowControl=function(){var e=this.getAggregation("_leftArrowControl");var t=this;if(!e){e=new r({src:"sap-icon://navigation-left-arrow",noTabStop:true,useIconTooltip:false,tooltip:"",press:function(e){t._scroll(-d.SCROLL_SIZE,d.SCROLL_ANIMATION_DURATION)}}).addStyleClass("sapUiTabStripScrollIcon sapUiTabStripLeftScrollIcon");this.setAggregation("_leftArrowControl",e,true)}return e};d.prototype._getRightArrowControl=function(){var e=this.getAggregation("_rightArrowControl");var t=this;if(!e){e=new r({src:"sap-icon://navigation-right-arrow",noTabStop:true,useIconTooltip:false,tooltip:"",press:function(e){t._scroll(d.SCROLL_SIZE,d.SCROLL_ANIMATION_DURATION)}}).addStyleClass("sapUiTabStripScrollIcon sapUiTabStripRightScrollIcon");this.setAggregation("_rightArrowControl",e,true)}return e};d.prototype._scroll=function(e,t){var i=this.getDomRef("scrollCont").scrollLeft,s;if(this._bRtl&&a.browser.firefox){s=i-e;if(s<-this._iMaxOffsetLeft){s=-this._iMaxOffsetLeft}if(s>0){s=0}}else{s=i+e;if(s<0){s=0}if(s>this._iMaxOffsetLeft){s=this._iMaxOffsetLeft}}if(this._oScroller){this._oScroller.scrollTo(s,0,t)}this._iCurrentScrollLeft=s};d.prototype._scrollIntoView=function(e,t){var i=this.$("tablist"),s=i.innerWidth()-i.width(),r=e.outerWidth(true),o=e.position().left-s/2,n=this.getDomRef("scrollCont"),l=n.scrollLeft,h=this.$("scrollCont").width(),f=l;if(o<0||o>h-r){if(this._bRtl&&a.browser.firefox){if(o<0){f+=o+r-h}else{f+=o}}else{if(o<0){f+=o}else{f+=o+r-h}}this._iCurrentScrollLeft=f;if(this._oScroller){this._oScroller.scrollTo(f,0,t)}}};d.prototype._hasScrolling=function(){var e=this.getDomRef("tablist"),t=this.getDomRef("scrollCont"),i=e&&e.scrollWidth>t.clientWidth;this.$().toggleClass("sapUiTabStripScrollable",i);return i};d.prototype._updateScrollingAppearance=function(){var e=this.getDomRef("tablist"),t=this.getDomRef("scrollCont"),i,s,r,o=false,n=false;if(this._hasScrolling()&&e&&t){if(this._bRtl&&a.browser.firefox){i=-t.scrollLeft}else{i=t.scrollLeft}s=e.scrollWidth;r=t.clientWidth;if(Math.abs(s-r)===1){s=r}if(i>0){o=true}if(s>r&&i+r<s){n=true}}this.$().toggleClass("sapUiTabStripScrollBack",o).toggleClass("sapUiTabStripScrollForward",n);this._iMaxOffsetLeft=Math.abs(jQuery(t).width()-jQuery(e).width())};d.prototype._onItemNavigationAfterFocus=function(e){var t=e.getParameter("index"),i=e.getParameter("event");if(!i){return}var s=jQuery(i.target);if(!s||i.keyCode===undefined){return}if(t!==null&&t!==undefined){var r=jQuery(s.parent().children()[t]);if(r&&r.length){this._scrollIntoView(r,0)}}};return d});
//# sourceMappingURL=TabStrip.js.map