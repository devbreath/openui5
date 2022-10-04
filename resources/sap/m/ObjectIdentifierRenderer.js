/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Core"],function(e,t){"use strict";var n={apiVersion:2};var o=e.EmptyIndicatorMode;var s=t.getLibraryResourceBundle("sap.m");n.render=function(e,t){var n;if(!t.getVisible()){return}e.openStart("div",t);e.class("sapMObjectIdentifier");n=t.getTooltip_AsString();if(n){e.attr("title",n)}e.openEnd();e.openStart("div");e.class("sapMObjectIdentifierTopRow");if(!t._hasTopRow()){e.style("display","none")}e.openEnd();e.openStart("div",t.getId()+"-title");e.class("sapMObjectIdentifierTitle");e.openEnd();if(t.getTitle()){e.renderControl(t._getTitleControl())}e.close("div");e.openStart("div");e.class("sapMObjectIdentifierIcons");e.openEnd();if(t.getBadgeAttachments()){e.openStart("span");e.class("sapMObjectIdentifierIconSpan");e.openEnd();e.renderControl(t._getAttachmentsIcon());e.close("span")}if(t.getBadgeNotes()){e.openStart("span");e.class("sapMObjectIdentifierIconSpan");e.openEnd();e.renderControl(t._getNotesIcon());e.close("span")}if(t.getBadgePeople()){e.openStart("span");e.class("sapMObjectIdentifierIconSpan");e.openEnd();e.renderControl(t._getPeopleIcon());e.close("span")}e.close("div");e.close("div");if(t.getEmptyIndicatorMode()!==o.Off&&!t.getText()){this.renderEmptyIndicator(e,t)}else{e.openStart("div",t.getId()+"-text");e.class("sapMObjectIdentifierText");if(t.getProperty("text")&&t.getProperty("title")){e.class("sapMObjectIdentifierTextBellow")}e.openEnd();if(t.getText()){e.renderControl(t._getTextControl())}e.close("div")}e.close("div")};n.renderEmptyIndicator=function(e,t){e.openStart("span");e.class("sapMEmptyIndicator");if(t.getEmptyIndicatorMode()===o.Auto){e.class("sapMEmptyIndicatorAuto")}e.openEnd();e.openStart("span");e.attr("aria-hidden",true);e.openEnd();e.text(s.getText("EMPTY_INDICATOR"));e.close("span");e.openStart("span");e.class("sapUiPseudoInvisibleText");e.openEnd();e.text(s.getText("EMPTY_INDICATOR_TEXT"));e.close("span");e.close("span")};return n},true);
//# sourceMappingURL=ObjectIdentifierRenderer.js.map