/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Core","sap/ui/core/Control","sap/ui/Device","sap/ui/core/ResizeHandler","sap/ui/core/library","sap/m/IllustratedMessage","sap/m/IllustratedMessageType","./CarouselRenderer","sap/ui/events/KeyCodes","sap/base/Log","sap/ui/events/F6Navigation","sap/ui/thirdparty/jquery","sap/ui/thirdparty/mobify-carousel","sap/ui/core/IconPool","./CarouselLayout"],function(e,t,i,s,o,a,r,n,u,h,g,f,jQuery){"use strict";var l=a.BusyIndicatorSize;var p=e.ImageHelper;var d=e.CarouselArrowsPlacement;var c=e.PlacementType;var _=i.extend("sap.m.Carousel",{metadata:{library:"sap.m",designtime:"sap/m/designtime/Carousel.designtime",properties:{height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},loop:{type:"boolean",group:"Misc",defaultValue:false},showPageIndicator:{type:"boolean",group:"Appearance",defaultValue:true},pageIndicatorPlacement:{type:"sap.m.PlacementType",group:"Appearance",defaultValue:c.Bottom},showBusyIndicator:{type:"boolean",group:"Appearance",defaultValue:true,deprecated:true},arrowsPlacement:{type:"sap.m.CarouselArrowsPlacement",group:"Appearance",defaultValue:d.Content}},defaultAggregation:"pages",aggregations:{pages:{type:"sap.ui.core.Control",multiple:true,singularName:"page"},customLayout:{type:"sap.m.CarouselLayout",multiple:false},_emptyPage:{type:"sap.m.IllustratedMessage",multiple:false,visibility:"hidden"}},associations:{activePage:{type:"sap.ui.core.Control",multiple:false}},events:{loadPage:{deprecated:true,parameters:{pageId:{type:"string"}}},unloadPage:{deprecated:true,parameters:{pageId:{type:"string"}}},pageChanged:{parameters:{oldActivePageId:{type:"string"},newActivePageId:{type:"string"},activePages:{type:"array"}}},beforePageChanged:{parameters:{activePages:{type:"array"}}}}}});_._INNER_SELECTOR=".sapMCrslInner";_._PAGE_INDICATOR_SELECTOR=".sapMCrslBulleted";_._PAGE_INDICATOR_ARROWS_SELECTOR=".sapMCrslIndicatorArrow";_._CONTROLS=".sapMCrslControls";_._ITEM_SELECTOR=".sapMCrslItem";_._LEFTMOST_CLASS="sapMCrslLeftmost";_._RIGHTMOST_CLASS="sapMCrslRightmost";_._LATERAL_CLASSES="sapMCrslLeftmost sapMCrslRightmost";_._MODIFIERNUMBERFORKEYBOARDHANDLING=10;_._BULLETS_TO_NUMBERS_THRESHOLD=9;_._PREVIOUS_CLASS_ARROW="sapMCrslPrev";_._NEXT_CLASS_ARROW="sapMCrslNext";_.prototype.init=function(){this._fnAdjustAfterResize=function(){var e=this.$().find(_._INNER_SELECTOR);this._oMobifyCarousel.resize(e);if(this.getPages().length>1){this._setWidthOfPages(this._getNumberOfItemsToShow())}}.bind(this);this._aOrderOfFocusedElements=[];this._aAllActivePages=[];this._aAllActivePagesIndexes=[];this._onBeforePageChangedRef=this._onBeforePageChanged.bind(this);this._onAfterPageChangedRef=this._onAfterPageChanged.bind(this);this.data("sap-ui-fastnavgroup","true",true);this._oRb=t.getLibraryResourceBundle("sap.m")};_.prototype.exit=function(){if(this._oMobifyCarousel){this._oMobifyCarousel.destroy();delete this._oMobifyCarousel}if(this._oArrowLeft){this._oArrowLeft.destroy();delete this._oArrowLeft}if(this._oArrowRight){this._oArrowRight.destroy();delete this._oArrowRight}if(this._sResizeListenerId){o.deregister(this._sResizeListenerId);this._sResizeListenerId=null}this.$().off("afterSlide");this._fnAdjustAfterResize=null;this._$InnerDiv=null;this._aOrderOfFocusedElements=null;this._aAllActivePages=null;this._aAllActivePagesIndexes=null};_.prototype.ontouchstart=function(e){if(this._oMobifyCarousel){if(e.target instanceof HTMLImageElement){e.preventDefault()}this._oMobifyCarousel.touchstart(e)}};_.prototype.ontouchmove=function(e){if(this._oMobifyCarousel){this._oMobifyCarousel.touchmove(e)}};_.prototype.ontouchend=function(e){if(this._oMobifyCarousel){if(this._oMobifyCarousel.hasActiveTransition()){this._oMobifyCarousel.onTransitionComplete()}this._oMobifyCarousel.touchend(e)}};_.prototype.onBeforeRendering=function(){var e=this.getActivePage();if(!e&&this.getPages().length>0){this.setAssociation("activePage",this.getPages()[0].getId(),true)}if(this._sResizeListenerId){o.deregister(this._sResizeListenerId);this._sResizeListenerId=null}this.$().off("beforeSlide",this._onBeforePageChangedRef);this.$().off("afterSlide",this._onAfterPageChangedRef);return this};_.prototype._getNumberOfItemsToShow=function(){var e=this.getPages().length,t=this.getCustomLayout(),i=1;if(t&&t.isA("sap.m.CarouselLayout")){i=Math.max(t.getVisiblePagesCount(),1)}if(i>1&&e<i){return e}return i};_.prototype.onAfterRendering=function(){if(this._oMobifyCarousel){this._oMobifyCarousel.unbind();setTimeout(function(){if(this._oMobifyCarousel){this._oMobifyCarousel.onTransitionComplete()}}.bind(this),0)}var e=this._getNumberOfItemsToShow();this.$().carousel(undefined,{numberOfItemsToShow:e});this._oMobifyCarousel=this.getDomRef()._carousel;this._oMobifyCarousel.setLoop(this.getLoop());this._oMobifyCarousel.setRTL(t.getConfiguration().getRTL());if(e>1){this._setWidthOfPages(e)}var i=this.getActivePage();if(i){this._updateActivePages(i);var s=this._getPageNumber(i);if(isNaN(s)||s==0){if(this.getPages().length>0){this.setAssociation("activePage",this.getPages()[0].getId(),true);this._adjustHUDVisibility(1)}}else{if(t.isThemeApplied()){this._moveToPage(s+1)}else{t.attachThemeChanged(this._handleThemeLoad,this)}if(this.getParent()&&this.getParent().isA("sap.zen.commons.layout.PositionContainer")){if(this._isCarouselUsedWithCommonsLayout===undefined){setTimeout(this["invalidate"].bind(this),0);this._isCarouselUsedWithCommonsLayout=true}}}}this.$().on("beforeSlide",this._onBeforePageChangedRef);this.$().on("afterSlide",this._onAfterPageChangedRef);this._$InnerDiv=this.$().find(_._INNER_SELECTOR)[0];this._sResizeListenerId=o.register(this._$InnerDiv,this._fnAdjustAfterResize);var a=this.getParent();while(a){if(a.isA("sap.m.IconTabBar")){var r=this;a.attachExpand(function(e){var t=e.getParameter("expand");if(t&&s>0){r._moveToPage(s+1)}});break}a=a.getParent()}};_.prototype._onBeforePageChanged=function(e,t,i){if(e.target!==this.getDomRef()){return}var s=this.getPages()[i-1].getId();this._updateActivePages(s);this.fireBeforePageChanged({activePages:this._aAllActivePagesIndexes})};_.prototype._onAfterPageChanged=function(e,t,i){var s=this.getPages().length>0;if(e.target!==this.getDomRef()){return}if(s&&i>0){this._changePage(t,i)}};_.prototype._setWidthOfPages=function(e){var t=this.$().find(".sapMCrslItem"),i;if(!t.length){return}i=this._calculatePagesWidth(e);t.each(function(e,t){t.style.width=i+"%"})};_.prototype._calculatePagesWidth=function(e){var t=this.$().width(),i=this.getDomRef().querySelector(".sapMCrslFluid .sapMCrslItem"),s=parseFloat(window.getComputedStyle(i).marginRight),o=(t-s*(e-1))/e,a=o/t*100;return a};_.prototype._handleThemeLoad=function(){var e=this.getActivePage();if(e){var i=this._getPageNumber(e);if(i>0){this._moveToPage(i+1)}}t.detachThemeChanged(this._handleThemeLoad,this)};_.prototype._moveToPage=function(e){this._oMobifyCarousel.changeAnimation("sapMCrslNoTransition");this._oMobifyCarousel.move(e);this._changePage(undefined,e)};_.prototype._changePage=function(e,t){this._adjustHUDVisibility(t);var i=this.getActivePage();if(e){i=this.getPages()[e-1].getId()}var o=this.getPages()[t-1].getId();this.setAssociation("activePage",o,true);var a=this._getPageIndicatorText(t);g.debug("sap.m.Carousel: firing pageChanged event: old page: "+i+", new page: "+o);if(!s.system.desktop){jQuery(document.activeElement).trigger("blur")}if(this._oMobifyCarousel&&this._oMobifyCarousel.getShouldFireEvent()){this.firePageChanged({oldActivePageId:i,newActivePageId:o,activePages:this._aAllActivePagesIndexes})}this._oMobifyCarousel.$items.each(function(e,t){t.className.indexOf("sapMCrslActive")<=-1?t.setAttribute("aria-selected",false):t.setAttribute("aria-selected",true)});this.$("slide-number").text(a)};_.prototype._getPageIndicatorText=function(e){return this._oRb.getText("CAROUSEL_PAGE_INDICATOR_TEXT",[e,this.getPages().length-this._getNumberOfItemsToShow()+1])};_.prototype._adjustHUDVisibility=function(e){var t=this._getNumberOfItemsToShow();if(s.system.desktop&&!this.getLoop()&&this.getPages().length>1){var i=this.$("hud");i.removeClass(_._LATERAL_CLASSES);if(e===1){i.addClass(_._LEFTMOST_CLASS);this._focusCarouselContainer(i,_._PREVIOUS_CLASS_ARROW)}if(e+t-1===this.getPages().length){i.addClass(_._RIGHTMOST_CLASS);this._focusCarouselContainer(i,_._NEXT_CLASS_ARROW)}}};_.prototype._focusCarouselContainer=function(e,t){if(e.find("."+t)[0]===document.activeElement){this.focus()}};_.prototype.setActivePage=function(e){var t=null;if(typeof e=="string"){t=e}else if(e instanceof i){t=e.getId()}if(t){if(t===this.getActivePage()){return this}var s=this._getPageNumber(t);if(!isNaN(s)){if(this._oMobifyCarousel){this._oMobifyCarousel.setShouldFireEvent(true);this._oMobifyCarousel.move(s+1)}}}this.setAssociation("activePage",t,true);return this};_.prototype._getNavigationArrow=function(e){if(!this["_oArrow"+e]){this["_oArrow"+e]=p.getImageControl(this.getId()+"-arrowScroll"+e,this["_oArrow"+e],this,{src:"sap-icon://slim-arrow-"+e.toLowerCase(),useIconTooltip:false})}return this["_oArrow"+e]};_.prototype._getEmptyPage=function(){if(!this.getAggregation("_emptyPage")){var e=new r({illustrationType:n.NoData});this.setAggregation("_emptyPage",e)}return this.getAggregation("_emptyPage")};_.prototype.previous=function(){if(this._oMobifyCarousel){this._oMobifyCarousel.setShouldFireEvent(true);this._oMobifyCarousel.prev()}else{g.warning("Unable to execute sap.m.Carousel.previous: carousel must be rendered first.")}return this};_.prototype.next=function(){if(this._oMobifyCarousel){this._oMobifyCarousel.setShouldFireEvent(true);this._oMobifyCarousel.next()}else{g.warning("Unable to execute sap.m.Carousel.next: carousel must be rendered first.")}return this};_.prototype._getPageNumber=function(e){var t,i;for(t=0;t<this.getPages().length;t++){if(this.getPages()[t].getId()==e){i=t;break}}return i};_.prototype.onsaptabprevious=function(e){this._bDirection=false;this._fnOnTabPress(e)};_.prototype.onsaptabnext=function(e){this._bDirection=true;this._fnOnTabPress(e)};_.prototype.onfocusin=function(e){this.saveLastFocusReference(e);this._bDirection=undefined};_.prototype.onsapskipforward=function(e){e.preventDefault();this._handleGroupNavigation(e,false)};_.prototype.onsapskipback=function(e){e.preventDefault();this._handleGroupNavigation(e,true)};_.prototype.onkeydown=function(e){if(e.keyCode==h.F7){this._handleF7Key(e);return}if(e.target!=this.getDomRef()){return}switch(e.keyCode){case 189:case h.NUMPAD_MINUS:this._fnSkipToIndex(e,-1);break;case h.PLUS:case h.NUMPAD_PLUS:this._fnSkipToIndex(e,1);break}};_.prototype.onsapescape=function(e){var t;if(e.target===this.$()[0]&&this._lastActivePageNumber){t=this._lastActivePageNumber+1;this._oMobifyCarousel.move(t);this._changePage(undefined,t)}};_.prototype.onsapright=function(e){this._fnSkipToIndex(e,1)};_.prototype.onsapup=function(e){this._fnSkipToIndex(e,-1)};_.prototype.onsapleft=function(e){this._fnSkipToIndex(e,-1)};_.prototype.onsapdown=function(e){this._fnSkipToIndex(e,1)};_.prototype.onsaphome=function(e){this._fnSkipToIndex(e,0)};_.prototype.onsapend=function(e){this._fnSkipToIndex(e,this.getPages().length)};_.prototype.onsaprightmodifiers=function(e){if(e.ctrlKey){this._fnSkipToIndex(e,_._MODIFIERNUMBERFORKEYBOARDHANDLING)}};_.prototype.onsapupmodifiers=function(e){if(e.ctrlKey){this._fnSkipToIndex(e,_._MODIFIERNUMBERFORKEYBOARDHANDLING)}};_.prototype.onsappageup=function(e){this._fnSkipToIndex(e,_._MODIFIERNUMBERFORKEYBOARDHANDLING)};_.prototype.onsapleftmodifiers=function(e){if(e.ctrlKey){this._fnSkipToIndex(e,-_._MODIFIERNUMBERFORKEYBOARDHANDLING)}};_.prototype.onsapdownmodifiers=function(e){if(e.ctrlKey){this._fnSkipToIndex(e,-_._MODIFIERNUMBERFORKEYBOARDHANDLING)}};_.prototype.onsappagedown=function(e){this._fnSkipToIndex(e,-_._MODIFIERNUMBERFORKEYBOARDHANDLING)};_.prototype._fnOnTabPress=function(e){if(e.target===this.$()[0]){this._lastActivePageNumber=this._getPageNumber(this.getActivePage())}};_.prototype._handleGroupNavigation=function(e,t){var i=jQuery.Event("keydown");e.preventDefault();this.$().trigger("focus");i.target=e.target;i.key="F6";i.shiftKey=t;f.handleF6GroupNavigation(i)};_.prototype.saveLastFocusReference=function(e){var t=jQuery(e.target).closest(".sapMCrsPage").control(0),i;if(this._bDirection===undefined){return}if(this._lastFocusablePageElement===undefined){this._lastFocusablePageElement={}}if(t){i=t.getId();this._lastFocusablePageElement[i]=e.target;this._updateFocusedPagesOrder(i)}};_.prototype._getActivePageLastFocusedElement=function(){if(this._lastFocusablePageElement){return this._lastFocusablePageElement[this._getLastFocusedActivePage()]}};_.prototype._updateFocusedPagesOrder=function(e){var t=this._aOrderOfFocusedElements.indexOf(e);if(t>-1){this._aOrderOfFocusedElements.splice(0,0,this._aOrderOfFocusedElements.splice(t,1)[0])}else{this._aOrderOfFocusedElements.unshift(e)}};_.prototype._updateActivePages=function(e){var t=this._getPageNumber(e),i=this._getNumberOfItemsToShow(),s=t+i,o=this.getPages();if(s>o.length){s=o.length-i}this._aAllActivePages=[];this._aAllActivePagesIndexes=[];for(var a=t;a<s;a++){this._aAllActivePages.push(o[a].getId());this._aAllActivePagesIndexes.push(a)}};_.prototype._getLastFocusedActivePage=function(){for(var e=0;e<this._aOrderOfFocusedElements.length;e++){var t=this._aOrderOfFocusedElements[e];if(this._aAllActivePages.indexOf(t)>-1){return t}}return this.getActivePage()};_.prototype._fnSkipToIndex=function(e,t){var i=t;if(e.target!==this.getDomRef()){return}e.preventDefault();if(this._oMobifyCarousel.hasActiveTransition()){this._oMobifyCarousel.onTransitionComplete()}this._oMobifyCarousel.setShouldFireEvent(true);if(t!==0){i=this._getPageNumber(this.getActivePage())+1+t}this._oMobifyCarousel.move(i)};_.prototype._handleF7Key=function(e){var t=this._getActivePageLastFocusedElement();if(e.target===this.$()[0]&&t){t.focus()}else{this.$().trigger("focus")}};_.prototype.setShowBusyIndicator=function(){g.warning("sap.m.Carousel: Deprecated function 'setShowBusyIndicator' called. Does nothing.");return this};_.prototype.getShowBusyIndicator=function(){g.warning("sap.m.Carousel: Deprecated function 'getShowBusyIndicator' called. Does nothing.");return false};_.prototype.setBusyIndicatorSize=function(e){if(!(e in l)){e=l.Medium}return i.prototype.setBusyIndicatorSize.call(this,e)};return _});
//# sourceMappingURL=Carousel.js.map