/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/library','sap/ui/core/IconPool','sap/ui/core/ShortcutHintsMixin','sap/m/library','sap/ui/core/InvisibleText','sap/ui/core/AccessKeysEnablement'],function(c,I,S,l,a,A){"use strict";var B=l.ButtonType;var b=l.ButtonAccessibilityType;var T=c.TextDirection;var d=l.BadgeState;var e=c.aria.HasPopup;var f={apiVersion:2};f.render=function(R,o){var s=o.getId();var t=o.getType();var E=o.getEnabled();var w=o.getWidth();var g=o._getTooltip();var h=o._getText();var i=o.getTextDirection();var j=(i===T.Inherit);var k=I.getIconURI("nav-back");var M;R.openStart("button",o);R.class("sapMBtnBase");R.attr("data-ui5-accesskey",o.getProperty("accesskey"));if(!o._isUnstyled()){R.class("sapMBtn");if((t===B.Back||t===B.Up)&&o._getAppliedIcon()&&!h){R.class("sapMBtnBack");}}var n=f.generateAccProps(o);if(this.renderAccessibilityAttributes){this.renderAccessibilityAttributes(R,o,n);}R.accessibilityState(o,n);if(!E){R.attr("disabled","disabled");if(!o._isUnstyled()){R.class("sapMBtnDisabled");}}else{switch(t){case B.Accept:case B.Reject:case B.Emphasized:case B.Attention:R.class("sapMBtnInverted");break;default:break;}}if(g&&!S.isDOMIDRegistered(s)){R.attr("title",g);}if(w!=""||w.toLowerCase()==="auto"){R.style("width",w);if(o._getAppliedIcon()&&h){M="4rem";}else{M="2.25rem";}R.style("min-width",M);}r(o,R);R.openEnd();R.openStart("span",s+"-inner");if(!o._isUnstyled()){R.class("sapMBtnInner");}if(o._isHoverable()){R.class("sapMBtnHoverable");}if(E){R.class("sapMFocusable");}if(!o._isUnstyled()){if(h){R.class("sapMBtnText");}if(t===B.Back||t===B.Up){R.class("sapMBtnBack");}if(o._getAppliedIcon()){if(o.getIconFirst()){R.class("sapMBtnIconFirst");}else{R.class("sapMBtnIconLast");}}}if(this.renderButtonAttributes){this.renderButtonAttributes(R,o);}if(!o._isUnstyled()&&t!==""){R.class("sapMBtn"+t);}r(o,R);R.openEnd();if(t===B.Back||t===B.Up){this.writeInternalIconPoolHtml(R,o,k);}if(o.getIconFirst()&&o._getAppliedIcon()){this.writeImgHtml(R,o);}if(h){R.openStart("span",s+"-content");R.class("sapMBtnContent");if(i!==T.Inherit){R.attr("dir",i.toLowerCase());}if(o.getProperty("highlightAccKeysRef")){R.class(A.CSS_CLASS);}R.openEnd();if(j){R.openStart("bdi",s+"-BDI-content");R.openEnd();}R.text(h);if(j){R.close("bdi");}R.close("span");}if(!o.getIconFirst()&&o._getAppliedIcon()){this.writeImgHtml(R,o);}R.close("span");if(g){R.openStart("span",s+"-tooltip");R.class("sapUiInvisibleText");R.openEnd();R.text(g);R.close("span");}R.close("button");};f.writeImgHtml=function(R,o){var t=o.getType(),h=o.getIcon(),i=(t===B.Back)||(t===B.Up);if(!h&&i){return;}R.renderControl(o._getImage(o.getId()+"-img",o._getAppliedIcon(),o.getActiveIcon(),o.getIconDensityAware()));};f.writeInternalIconPoolHtml=function(R,o,u){R.renderControl(o._getInternalIconBtn((o.getId()+"-iconBtn"),u));};function r(o,R){if(o._bExcludeFromTabChain){R.attr("tabindex",-1);}}var m={Accept:"BUTTON_ARIA_TYPE_ACCEPT",Reject:"BUTTON_ARIA_TYPE_REJECT",Attention:"BUTTON_ARIA_TYPE_ATTENTION",Emphasized:"BUTTON_ARIA_TYPE_EMPHASIZED",Critical:"BUTTON_ARIA_TYPE_CRITICAL",Negative:"BUTTON_ARIA_TYPE_NEGATIVE",Success:"BUTTON_ARIA_TYPE_SUCCESS"};f.getButtonTypeAriaLabelId=function(t){return a.getStaticId("sap.m",m[t]);};f.getBadgeTextId=function(o){return o._oBadgeData&&o._oBadgeData.value!==""&&o._oBadgeData.state!==d.Disappear?o._getBadgeInvisibleText().getId():"";};f.generateAccProps=function(o){var t=o._getText(),h=o.getAriaHasPopup(),g;if(t){g=f.generateTextButtonAccProps(o);}else{g=f.generateIconOnlyButtonAccProps(o);}g["disabled"]=null;g["haspopup"]=(h===e.None)?null:h.toLowerCase();return g;};f.generateIconOnlyButtonAccProps=function(o){var t=f.getButtonTypeAriaLabelId(o.getType()),s=this.getBadgeTextId(o),g=o._getTooltip(),h=o.getId()+"-tooltip",i=o._determineAccessibilityType(),j={},D;switch(i){case b.Default:j["label"]={value:g,append:true};break;case b.Described:j["label"]={value:g,append:true};D=(t+" "+s).trim();D&&(j["describedby"]={value:D,append:true});break;case b.Labelled:j["describedby"]={value:h,append:true};break;case b.Combined:j["describedby"]={value:(h+" "+t+" "+s).trim(),append:true};break;default:break;}return j;};f.generateTextButtonAccProps=function(o){var s=o.getId(),t=f.getButtonTypeAriaLabelId(o.getType()),g=this.getBadgeTextId(o),h=o._getTooltip()?s+"-tooltip":"",i=s+"-content",j=o._determineAccessibilityType(),p=o._determineSelfReferencePresence(),k={},D;switch(j){case b.Default:h&&(k["describedby"]={value:h,append:true});break;case b.Described:D=(h+" "+t+" "+g).trim();D&&(k["describedby"]={value:D,append:true});break;case b.Labelled:p&&(k["labelledby"]={value:i,append:true});h&&(k["describedby"]={value:h,append:true});break;case b.Combined:D=(h+" "+t+" "+g).trim();D&&(k["describedby"]={value:D,append:true});p&&(k["labelledby"]={value:i,append:true});break;default:break;}return k;};return f;},true);
