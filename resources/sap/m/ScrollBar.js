/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./ScrollBarRenderer"],function(t,o){"use strict";var e=t.extend("sap.m.ScrollBar",{metadata:{library:"sap.m",properties:{scrollPosition:{type:"int",group:"Behavior",defaultValue:0},contentSize:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null}},events:{scroll:{}}},renderer:o});e.prototype.init=function(){this._onScrollHandler=this._onscroll.bind(this)};e.prototype.onBeforeRendering=function(){if(this._$ScrollRef&&this._$ScrollRef.length){this._$ScrollRef.off("scroll",this._onScrollHandler);this._$ScrollRef=null}};e.prototype.onAfterRendering=function(){this._$ScrollRef=this.$("sb");this._$ScrollRef.on("scroll",this._onScrollHandler);this._setScrollPosition(this.getScrollPosition())};e.prototype.onThemeChanged=function(){this.invalidate()};e.prototype.setScrollPosition=function(t){var o=Math.round(Math.max(t,0));this._setScrollPosition(o);return this.setProperty("scrollPosition",o,true)};e.prototype.setContentSize=function(t){var o=this.$("sbcnt");if(o.length){o.height(t)}return this.setProperty("contentSize",t)};e.prototype._onscroll=function(t){var o=Math.abs(Math.round(this._$ScrollRef.scrollTop()));this.setProperty("scrollPosition",o,true);this.fireScroll({pos:o});t.preventDefault();t.stopPropagation();return false};e.prototype._setScrollPosition=function(t){if(this._$ScrollRef&&this._$ScrollRef.length){this._$ScrollRef.scrollTop(t)}};return e});
//# sourceMappingURL=ScrollBar.js.map