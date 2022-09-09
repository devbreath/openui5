/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BarInPageEnabler","./library","sap/ui/core/Control","sap/ui/core/ResizeHandler","sap/ui/Device","./BarRenderer","sap/ui/thirdparty/jquery"],function(t,e,i,r,s,o,jQuery){"use strict";var a=e.BarDesign;var n=e.TitleAlignment;var l=i.extend("sap.m.Bar",{metadata:{interfaces:["sap.m.IBar"],library:"sap.m",properties:{enableFlexBox:{type:"boolean",group:"Misc",defaultValue:false,deprecated:true},translucent:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},design:{type:"sap.m.BarDesign",group:"Appearance",defaultValue:a.Auto},titleAlignment:{type:"sap.m.TitleAlignment",group:"Misc",defaultValue:n.None}},aggregations:{contentLeft:{type:"sap.ui.core.Control",multiple:true,singularName:"contentLeft"},contentMiddle:{type:"sap.ui.core.Control",multiple:true,singularName:"contentMiddle"},contentRight:{type:"sap.ui.core.Control",multiple:true,singularName:"contentRight"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},designtime:"sap/m/designtime/Bar.designtime",dnd:{draggable:false,droppable:true}}});l.prototype.onBeforeRendering=function(){var t=this.getTitleAlignment(),e;this._removeAllListeners();for(e in n){if(e!==t){this.removeStyleClass("sapMBarTitleAlign"+e)}else{this.addStyleClass("sapMBarTitleAlign"+e)}}};l.prototype.onAfterRendering=function(){this._handleResize()};l.prototype.init=function(){this.data("sap-ui-fastnavgroup","true",true);this._sPrevTitleAlignmentClass=""};l.prototype.exit=function(){this._removeAllListeners();if(this._oflexBox){this._oflexBox.destroy();this._oflexBox=null}this._$MidBarPlaceHolder=null;this._$RightBar=null;this._$LeftBar=null};l._aResizeHandlers=["_sResizeListenerId","_sResizeListenerIdMid","_sResizeListenerIdRight","_sResizeListenerIdLeft"];l.prototype._removeAllListeners=function(){var t=this;l._aResizeHandlers.forEach(function(e){t._removeListenerFailsave(e)})};l.prototype._removeListenerFailsave=function(t){if(this[t]){r.deregister(this[t]);this[t]=null}};l.prototype._handleResize=function(){this._removeAllListeners();var t=!!this.getContentLeft().length,e=!!this.getContentMiddle().length||this._oflexBox&&!!this._oflexBox.getItems().length,i=!!this.getContentRight().length;if(!this.getVisible()){return}if(!t&&!e&&!i){return}this._$LeftBar=this.$("BarLeft");this._$RightBar=this.$("BarRight");this._$MidBarPlaceHolder=this.$("BarPH");this._updatePosition(t,e,i);this._sResizeListenerId=r.register(this.getDomRef(),jQuery.proxy(this._handleResize,this));if(this.getEnableFlexBox()){return}if(t){this._sResizeListenerIdLeft=r.register(this._$LeftBar[0],jQuery.proxy(this._handleResize,this))}if(e){this._sResizeListenerIdMid=r.register(this._$MidBarPlaceHolder[0],jQuery.proxy(this._handleResize,this))}if(i){this._sResizeListenerIdRight=r.register(this._$RightBar[0],jQuery.proxy(this._handleResize,this))}};l.prototype._updatePosition=function(t,e,i){if(t&&!e&&!i){return}if(!t&&!e&&i){return}var r=this.$().outerWidth(true);this._$RightBar.css({width:""});this._$LeftBar.css({width:""});this._$MidBarPlaceHolder.css({position:"",width:"",visibility:"hidden"});var s=this._$RightBar.outerWidth(true);if(s>r){if(t){this._$LeftBar.css({width:"0px"})}if(e){this._$MidBarPlaceHolder.css({width:"0px"})}this._$RightBar.css({width:r+"px"});return}var o=this._getBarContainerWidth(this._$LeftBar);if(r<o+s){o=r-s;this._$LeftBar.css({width:o+"px"});this._$MidBarPlaceHolder.css({width:"0px"});return}this._$MidBarPlaceHolder.css(this._getMidBarCss(s,r,o))};l.prototype._getMidBarCss=function(t,e,i){var r=this._$MidBarPlaceHolder.outerWidth(true),s=sap.ui.getCore().getConfiguration().getRTL(),o=s?"right":"left",a=s?"left":"right",l={visibility:""},p=parseInt(this._$LeftBar.css("padding-"+o)),h=parseInt(this._$RightBar.css("padding-"+a)),d=parseInt(this._$MidBarPlaceHolder.css("padding-"+o)),g=parseInt(this._$MidBarPlaceHolder.css("padding-"+a)),u=!this.getContentLeft().length,f=!this.getContentRight().length,_=p-d,y=h-g,c=e-(f?y:t)-(u?_:i),B=e/2-r/2,R=i>B,x=e/2+r/2,C=e-t<x,L=this.getTitleAlignment();if(L!==n.None&&L!==n.Center||c>0&&(R||C)){l.position="absolute";l.width=c+"px";l[o]=u?_:i}if(u&&f){l.width="100%"}return l};l.prototype._getBarContainerWidth=function(t){var e,i=0,r=t.children(),o=0;if(s.browser.webkit||s.browser.firefox){for(e=0;e<r.length;e++){o+=jQuery(r[e]).outerWidth(true)}i=t.outerWidth(true)}else{var a;for(e=0;e<r.length;e++){a=window.getComputedStyle(r[e]);if(a.width=="auto"){o+=jQuery(r[e]).width()+1}else{o+=parseFloat(a.width)}o+=parseFloat(a.marginLeft);o+=parseFloat(a.marginRight);o+=parseFloat(a.paddingLeft);o+=parseFloat(a.paddingRight)}var n=window.getComputedStyle(t[0]);i+=parseFloat(n.width);i+=parseFloat(n.marginLeft);i+=parseFloat(n.marginRight);i+=parseFloat(n.paddingLeft);i+=parseFloat(n.paddingRight)}if(i<o){i=o}return i};var p=t.extend("sap.m.BarInAnyContentEnabler",{});p.mContexts={dialogFooter:{contextClass:"sapMFooter-CTX",tag:"Footer"}};p.prototype.getContext=function(){var e=t.prototype.getContext.call();for(var i in p.mContexts){e[i]=p.mContexts[i]}return e};l.prototype.getContext=p.prototype.getContext;l.prototype.isContextSensitive=p.prototype.isContextSensitive;l.prototype.setHTMLTag=p.prototype.setHTMLTag;l.prototype.getHTMLTag=p.prototype.getHTMLTag;l.prototype.applyTagAndContextClassFor=p.prototype.applyTagAndContextClassFor;l.prototype._applyContextClassFor=p.prototype._applyContextClassFor;l.prototype._applyTag=p.prototype._applyTag;l.prototype._getContextOptions=p.prototype._getContextOptions;l.prototype._setRootAccessibilityRole=p.prototype._setRootAccessibilityRole;l.prototype._getRootAccessibilityRole=p.prototype._getRootAccessibilityRole;l.prototype._setRootAriaLevel=p.prototype._setRootAriaLevel;l.prototype._getRootAriaLevel=p.prototype._getRootAriaLevel;return l});
//# sourceMappingURL=Bar.js.map