/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/ui/core/Control","./library","sap/ui/core/ResizeHandler","./AlignedFlowLayoutRenderer","sap/ui/dom/units/Rem"],function(e,t,i,s,n,r){"use strict";var o=t.extend("sap.ui.layout.AlignedFlowLayout",{metadata:{library:"sap.ui.layout",properties:{minItemWidth:{type:"sap.ui.core.AbsoluteCSSSize",defaultValue:"12rem"},maxItemWidth:{type:"sap.ui.core.AbsoluteCSSSize",defaultValue:"24rem"}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true},endContent:{type:"sap.ui.core.Control",multiple:true}}},renderer:n});o.prototype.init=function(){if(typeof ResizeObserver==="function"){this.oResizeObserver=new ResizeObserver(this.onResize.bind(this));this.fLayoutWidth=0;this.fEndItemWidth=0}else{this._sResizeHandlerContainerListenerID=s.register(this,this.onResizeHandler.bind(this))}this.fnReflow=this.reflow.bind(this);this.bReflowSuspended=false};o.prototype.exit=function(){this.fnReflow=null;this.disconnectResizeObserver();this.oResizeObserver=null;this.fLayoutWidth=undefined;this.fEndItemWidth=undefined;this.disconnectResizeHandler();this._sResizeHandlerContainerListenerID="";this._sResizeHandlerEndItemListenerID=""};o.prototype.onAfterRenderingOrThemeChanged=function(){window.requestAnimationFrame(function(){var t=this.getDomRef(),i=this.getDomRef("endItem"),s=!!(this.hasContent()&&t&&i);if(s){var n=window.getComputedStyle(t,null),r=n.getPropertyValue("padding-top"),o=i.style;if(e.getConfiguration().getRTL()){o.left=n.getPropertyValue("padding-left")}else{o.right=n.getPropertyValue("padding-right")}o.bottom=r}var f={domRef:t,endItemDomRef:i};this.reflow(f)}.bind(this))};o.prototype.onBeforeRendering=function(){this.disconnectResizeObserver();this.disconnectResizeHandlerForEndItem()};o.prototype.onAfterRendering=function(){this.observeSizeChangesIfRequired();this.onAfterRenderingOrThemeChanged()};o.prototype.onThemeChanged=o.prototype.onAfterRenderingOrThemeChanged;o.prototype.onResizeHandler=function(e){if(e.size.width!==e.oldSize.width){this.reflow()}};o.prototype.onResize=function(e){var t=this.getDomRef();this.bReflowSuspended=this.bReflowSuspended||this.unobserveSizeChangesIfReflowSuspended(t);if(this.bReflowSuspended){return}var i,s=e[0],n=f(this.fLayoutWidth,s,t),r=s.contentRect.width,o=s.contentRect.height;if(n){this.fLayoutWidth=r;this.fLayoutHeight=o}else{i=this.getDomRef("endItem");n=f(this.fEndItemWidth,s,i);if(n){this.fEndItemWidth=r;this.fLayoutHeight=o}else if(this.fLayoutHeight!==o){this.fLayoutHeight=o}else{return}}window.requestAnimationFrame(function(){var e={domRef:t,endItemDomRef:i};this.reflow(e)}.bind(this))};o.prototype.reflow=function(t){if(this.bReflowSuspended){this.bReflowSuspended=false;if(this.oResizeObserver){this.observeSizeChangesIfRequired()}}var i=this.getContent();if(i.length===0||!i[0].isActive()){return}t=t||{};var s=t.domRef||this.getDomRef();if(!s){return}var n=t.endItemDomRef||this.getDomRef("endItem"),r=this.getLastItemDomRef();if(!n||!r){if(!s.offsetParent){return}this.toggleDisplayOfSpacers(s);return}var o=s.lastElementChild;h(s,o);if(!s.offsetParent){return}var f=o.style,a=n.offsetHeight,d=n.offsetWidth,u=r.offsetTop,l=r.offsetLeft,p,g;if(e.getConfiguration().getRTL()){g=l}else{var m=Number.parseFloat(window.getComputedStyle(r).marginRight);var R=l+r.offsetWidth+m;g=s.offsetWidth-R}var c=Number.parseFloat(window.getComputedStyle(n).marginRight);var v=g>=d+c;if(v){if(this.checkItemsWrapping(s)){if(n.offsetTop<u){f.height=Math.max(0,a-u)+"px";if(r.offsetTop>=n.offsetTop){p=n.offsetLeft;l=r.offsetLeft;if(p>=l&&p<=l+r.offsetWidth){f.height=a+"px"}}f.display="block"}else{f.height="0";f.display=""}}else{if(n.offsetTop<u){f.height=a+"px"}f.display="block"}}else{f.height=a+"px";f.display="block"}var y=d+"px";f.width=y;f.minWidth=y;this.toggleDisplayOfSpacers(s)};o.prototype.toggleDisplayOfSpacers=function(e){var t=this.getRenderer().CSS_CLASS+"OneLine",i=true;if(this.checkItemsWrapping(e,i)){e.classList.remove(t)}else{e.classList.add(t)}};function f(e,t,i){var s=.25,n=t.contentRect.width;return i===t.target&&Math.abs(n-e)>=s}function h(e,t){var i=t&&t.style;if(i){i.width="";i.height="";i.display=""}e.classList.remove(e.classList.item(0)+"OneLine")}o.prototype.checkItemsWrapping=function(e,t){e=e||this.getDomRef();if(!e){return false}var i=e.firstElementChild,s=this.getLastItemDomRef();if(!i||!s){return false}var n=i.offsetTop,r=s.offsetTop,o=i.offsetHeight;if(r>=n+o){return true}if(t){return false}var f=this.getDomRef("endItem");return!!f&&f.offsetTop>=n+o};o.prototype.getLastItemDomRef=function(){var e=this.getContent(),t=e.length;if(t){var i=e[t-1],s=i.getDomRef();if(s){return s.parentElement}}return null};o.prototype.getLastVisibleDomRef=function(){return this.getDomRef("endItem")||this.getLastItemDomRef()};o.prototype.computeNumberOfSpacers=function(){var e=this.getContent().length;if(e===0){return 0}var t=e,i=this.getMinItemWidth(),s;if(i.lastIndexOf("rem")!==-1){s=r.toPx(i)}else if(i.lastIndexOf("px")!==-1){s=parseFloat(i)}if(s){var n=Math.max(document.documentElement.clientWidth,window.screen.width);t=Math.abs(n/s)}t=Math.min(t,e-1);t=Math.max(1,t);t=Math.floor(t);return t};o.prototype.observeSizeChangesIfRequired=function(){if(this.hasContent()){this.observeSizeChanges()}};o.prototype.observeSizeChanges=function(){var e=this.getDomRef();if(!e){return}var t=this.getDomRef("endItem");if(this.oResizeObserver){this.oResizeObserver.observe(e);if(t){this.oResizeObserver.observe(t)}return}if(t){this._sResizeHandlerEndItemListenerID=s.register(t,this.onResizeHandler.bind(this))}};o.prototype.unobserveSizeChanges=function(e){if(this.oResizeObserver&&e){this.oResizeObserver.unobserve(e)}};o.prototype.unobserveSizeChangesIfReflowSuspended=function(e){var t=s.isSuspended(e,this.fnReflow);if(t){this.unobserveSizeChanges(e);this.unobserveSizeChanges(this.getDomRef("endItem"));return true}return false};o.prototype.disconnectResizeObserver=function(){if(this.oResizeObserver){this.oResizeObserver.disconnect()}};o.prototype.disconnectResizeHandler=function(){if(this._sResizeHandlerContainerListenerID){s.deregister(this._sResizeHandlerContainerListenerID)}this.disconnectResizeHandlerForEndItem()};o.prototype.disconnectResizeHandlerForEndItem=function(){if(this._sResizeHandlerEndItemListenerID){s.deregister(this._sResizeHandlerEndItemListenerID)}};o.prototype.hasContent=function(){return this.getContent().length>0};return o});
//# sourceMappingURL=AlignedFlowLayout.js.map