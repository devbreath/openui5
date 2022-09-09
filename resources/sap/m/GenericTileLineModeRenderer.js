/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/library","sap/base/security/encodeCSS","sap/ui/thirdparty/jquery"],function(e,t,jQuery){"use strict";var s=e.GenericTileScope;var n=e.LoadState;var a=sap.ui.getCore().getLibraryResourceBundle("sap.m");var r={apiVersion:2};r.render=function(e,r){var o=r._getTooltipText(),i=r._isScreenLarge(),p=r._getAriaText(),c=r.getScope(),l,d=false,S=r.hasListeners("press"),f=r.getState(),g=r.getAriaRoleDescription(),h=r.getAriaRole();var T=r.getUrl()&&!r._isInActionScope()&&f!==n.Disabled;this._bRTL=sap.ui.getCore().getConfiguration().getRTL();if(c===s.Actions){if(f!==n.Disabled){l=t("sapMGTScopeActions")}}else if(c===s.ActionMore||c===s.ActionRemove){d=true;if(f!==n.Disabled){l=t("sapMGTScopeSingleAction")}}else{l=t("sapMGTScopeDisplay")}if(T){e.openStart("a",r);e.attr("href",r.getUrl());e.attr("rel","noopener noreferrer")}else{e.openStart("span",r)}e.attr("aria-label",p);if(g){e.attr("aria-roledescription",g)}else{e.attr("aria-roledescription",a.getText("GENERIC_TILE_ROLE_DESCRIPTION"))}if(h){e.attr("role",h)}else if(!T){e.attr("role",S?"button":"presentation")}else{e.attr("role","link")}e.class("sapMGT");e.class(l);if(c===s.ActionMore){e.style("padding-right","3.3rem")}if(f!==n.Disabled&&c===s.ActionRemove){e.class("sapMGTAcionRemove")}e.class("sapMGTLineMode");if(r.getSystemInfo()||r.getAppShortcut()){e.class("sapMGTInfoRendered");if(!i){e.class("sapMGTLineModeSmall")}}this._writeDirection(e);if(o){e.attr("title",o)}if(f!==n.Disabled){if(!r.isInActionRemoveScope()){e.class("sapMPointer");e.style("pointer-events","auto")}e.attr("tabindex","0")}else{e.class("sapMGTDisabled")}if(f===n.Failed){e.class("sapMGTFailed")}e.openEnd();if(r.getState()!==n.Disabled){this._renderFocusDiv(e,r)}if(i){e.openStart("div",r.getId()+"-startMarker");e.class("sapMGTStartMarker");e.openEnd();e.close("div");this._renderFailedIcon(e,r);e.openStart("span",r.getId()+"-lineWrapper");e.class("sapMGTLineWrapper");e.openEnd();e.openStart("span",r.getId()+"-headerWrapper");e.class("sapMGTHeaderWrapper");e.openEnd();this._renderHeader(e,r);if(r.getSubheader()){this._renderSubheader(e,r)}e.close("span");if(r.getSystemInfo()||r.getAppShortcut()){this._renderInfoContainer(e,r)}e.close("span");e.openStart("div",r.getId()+"-endMarker");e.class("sapMGTEndMarker");e.openEnd();if(r._isInActionScope()){this._renderActionsScope(e,r,d)}e.close("div");e.openStart("div",r.getId()+"-styleHelper");e.class("sapMGTStyleHelper");e.openEnd();e.close("div")}else if(r.getSystemInfo()||r.getAppShortcut()){e.openStart("div",r.getId()+"-touchArea");e.class("sapMGTTouchArea");e.openEnd();this._renderFailedIcon(e,r);e.openStart("span",r.getId()+"-lineModeHelpContainer");e.class("sapMGTLineModeHelpContainer");e.openEnd();e.openStart("span",r.getId()+"-headerWrapper");e.class("sapMGTHeaderWrapper");e.openEnd();this._renderHeader(e,r);if(r.getSubheader()){this._renderSubheader(e,r)}e.close("span");if(r.getSystemInfo()||r.getAppShortcut()){this._renderInfoContainer(e,r)}e.close("span");if(r._isInActionScope()){this._renderActionsScope(e,r,d)}e.close("div")}else{e.openStart("div",r.getId()+"-touchArea");e.class("sapMGTTouchArea");e.openEnd();this._renderFailedIcon(e,r);e.openStart("span",r.getId()+"-lineModeHelpContainer");e.class("sapMGTLineModeHelpContainer");e.openEnd();this._renderHeader(e,r);if(r.getSubheader()){this._renderSubheader(e,r)}e.close("span");if(r._isInActionScope()){this._renderActionsScope(e,r,d)}e.close("div")}if(r._isInActionScope()&&r.getState()!==n.Disabled){e.renderControl(r._oRemoveButton)}if(T){e.close("a")}else{e.close("span")}};r._renderInfoContainer=function(e,t){e.openStart("span",t.getId()+"-sapMGTTInfoWrapper");e.class("sapMGTTInfoWrapper").openEnd();e.openStart("span",t.getId()+"-sapMGTTInfo");e.class("sapMGTTInfo");if(!(t.getSystemInfo()&&t.getAppShortcut())){e.class("sapMGTInfoNotContainsSeperator")}e.openEnd();if(t.getAppShortcut()){e.openStart("span",t.getId()+"-appShortcut");e.class("sapMGTAppShortcutText").openEnd();e.renderControl(t._oAppShortcut);e.close("span")}if(t.getSystemInfo()){this._renderSystemInfo(e,t)}e.close("span");e.close("span")};r._writeDirection=function(e){if(this._bRTL){e.attr("dir","rtl")}};r._renderSystemInfo=function(e,t){e.openStart("span",t.getId()+"-systemInfoText");this._writeDirection(e);e.class("sapMGTSystemInfoText");if(t.getSystemInfo()&&t.getAppShortcut()){e.class("sapMGTSeperatorPresent")}e.openEnd();e.text(t._oSystemInfo.getText());e.close("span")};r._renderFailedIcon=function(e,t){if(t.getState()===n.Failed){if(t._isCompact()){t._oWarningIcon.setSize("1.25rem")}else{t._oWarningIcon.setSize("1.375rem")}e.renderControl(t._oWarningIcon.addStyleClass("sapMGTLineModeFailedIcon"))}};r._renderHeader=function(e,t){e.openStart("span",t.getId()+"-hdr-text");this._writeDirection(e);e.class("sapMGTHdrTxt");e.openEnd();e.text(t._oTitle.getText());e.close("span")};r._renderSubheader=function(e,t){e.openStart("span",t.getId()+"-subHdr-text");this._writeDirection(e);e.class("sapMGTSubHdrTxt");e.openEnd();e.text(t._oSubTitle.getText());e.close("span")};r._renderActionsScope=function(e,t,s){if(t.getState()!==n.Disabled){e.openStart("span",t.getId()+"-actions");e.class("sapMGTActionsContainer");if(s){e.class("sapMGTScopeSingleActionContainer")}e.openEnd();e.renderControl(t._oMoreIcon);e.close("span")}};r._updateHoverStyle=function(){var e=this.$("styleHelper");e.empty();if(!this._oStyleData||this.$().is(":hidden")){return}if(this._oStyleData.rtl){e.css("right",-this._oStyleData.positionRight)}else{e.css("left",-this._oStyleData.positionLeft)}this._oStyleData.lines.forEach(function(t){var s=jQuery("<div class='sapMGTLineStyleHelper'><div class='sapMGTLineStyleHelperInner'></div></div>");if(this._oStyleData.rtl){s.css("right",t.offset.x+"px")}else{s.css("left",t.offset.x+"px")}s.css({top:t.offset.y+"px",width:t.width+"px"});e.append(s)},this)};r._renderFocusDiv=function(e,t){e.openStart("div",t.getId()+"-focus");e.class("sapMGTFocusDiv");e.openEnd();e.close("div")};r._getCSSPixelValue=function(e,t){var s=e instanceof jQuery?e:e.$(),n=(s.css(t)||"").match(/([^a-zA-Z\%]*)(.*)/),a=parseFloat(n[1]),r=n[2];return r==="px"?a:a*16};return r},true);
//# sourceMappingURL=GenericTileLineModeRenderer.js.map