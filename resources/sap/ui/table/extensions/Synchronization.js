/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ExtensionBase","../utils/TableUtils","../library","sap/base/Log"],function(e,t,r,n){"use strict";var o={setRowSelection:function(e,r){var n=this.getTable();var o=n.getRows()[e];if(o&&r!=null){t.toggleRowSelection(n,o.getIndex(),r)}},setRowHover:function(e,t){var r=this.getTable();var n=r.getRows()[e];if(n&&t!=null){n._setHovered(t)}},addVerticalScrollingListener:function(e){var t=this.getTable();var r=t._getSyncExtension();var n=t._getScrollExtension();var l={scrollDirection:n.constructor.ScrollDirection.VERTICAL};o.removeVerticalScrollingListener.call(this);if(!e){return}if(e.wheelAreas){r._mMouseWheelEventListener=n.registerForMouseWheel(e.wheelAreas,l);r._mMouseWheelEventListener.areas=e.wheelAreas}if(e.touchAreas){r._mTouchEventListener=n.registerForTouch(e.touchAreas,l);r._mTouchEventListener.areas=e.touchAreas}},removeVerticalScrollingListener:function(){var e=this.getTable();var t=e._getSyncExtension();function r(e,t){for(var r in t){var n=t[r];if(n){for(var o=0;o<e.length;o++){e[o].removeEventListener(r,n)}}}}if(t._mMouseWheelEventListener){r(t._mMouseWheelEventListener.areas,t._mMouseWheelEventListener);delete t._mMouseWheelEventListener}if(t._mTouchEventListener){r(t._mTouchEventListener.areas,t._mTouchEventListener);delete t._mTouchEventListener}},placeVerticalScrollbarAt:function(e){var t=this.getTable();var n=t._getScrollExtension();if(!e){throw new Error("The HTMLElement in which the vertical scrollbar should be placed must be specified.")}if(!n.isVerticalScrollbarExternal()){var o=sap.ui.getCore().createRenderManager();t.getRenderer().renderVSbExternal(o,t);o.flush(e);var l=e.querySelector("#"+t.getId()+"-"+r.SharedDomRef.VerticalScrollBar);n.markVerticalScrollbarAsExternal(l);t.invalidate()}else{e.appendChild(n.getVerticalScrollbar().parentElement);n.restoreVerticalScrollPosition()}},renderHorizontalScrollbar:function(e,t,r){var n=this.getTable();if(t==null){throw new Error("The id must be specified.")}n.getRenderer().renderHSbExternal(e,n,t,r)}};var l={onBeforeRendering:function(e){var t=this._getSyncExtension();var r=e&&e.isMarked("renderRows");var n=this.getDomRef("tableCCnt");if(!r&&n&&t._onTableContainerScrollEventHandler){n.removeEventListener("scroll",t._onTableContainerScrollEventHandler);delete t._onTableContainerScrollEventHandler}},onAfterRendering:function(e){var t=this._getScrollExtension();var r=e&&e.isMarked("renderRows");var n=this.getDomRef("tableCCnt");if(t.isVerticalScrollbarExternal()&&!r){t.updateVerticalScrollbarHeight();t.updateVerticalScrollHeight()}if(!r){var o=this._getSyncExtension();o.syncInnerVerticalScrollPosition(n.scrollTop);if(!o._onTableContainerScrollEventHandler){o._onTableContainerScrollEventHandler=function(e){o.syncInnerVerticalScrollPosition(e.target.scrollTop)}}n.addEventListener("scroll",o._onTableContainerScrollEventHandler)}}};var i=e.extend("sap.ui.table.extensions.Synchronization",{_init:function(e,r,n){this._delegate=l;this._oPublicInterface={syncRowSelection:o.setRowSelection.bind(this),syncRowHover:o.setRowHover.bind(this),registerVerticalScrolling:o.addVerticalScrollingListener.bind(this),deregisterVerticalScrolling:o.removeVerticalScrollingListener.bind(this),placeVerticalScrollbarAt:o.placeVerticalScrollbarAt.bind(this),renderHorizontalScrollbar:o.renderHorizontalScrollbar.bind(this)};t.addDelegate(e,this._delegate,e);return"SyncExtension"},destroy:function(){var t=this.getTable();if(t){t.removeEventDelegate(this._delegate)}o.removeVerticalScrollingListener.call(this);this._delegate=null;this._oPublicInterface=null;e.prototype.destroy.apply(this,arguments)}});i.prototype.syncRowCount=function(e){this.callInterfaceHook("rowCount",arguments)};i.prototype.syncRowSelection=function(e,t){this.callInterfaceHook("rowSelection",arguments)};i.prototype.syncRowHover=function(e,t){this.callInterfaceHook("rowHover",arguments)};i.prototype.syncRowHeights=function(e){return this.callInterfaceHook("rowHeights",arguments)};i.prototype.syncInnerVerticalScrollPosition=function(e){this.callInterfaceHook("innerVerticalScrollPosition",arguments)};i.prototype.syncLayout=function(e){this.callInterfaceHook("layout",arguments)};i.prototype.callInterfaceHook=function(e,r){var o={};o[e]=Array.prototype.slice.call(r);n.debug("sap.ui.table.extensions.Synchronization","Sync "+e+"("+o[e]+")",this.getTable());return t.dynamicCall(this._oPublicInterface,o)};i.prototype.getInterface=function(){return this._oPublicInterface};return i});
//# sourceMappingURL=Synchronization.js.map