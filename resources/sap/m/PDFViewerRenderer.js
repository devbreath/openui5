/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/Device',"sap/base/Log","sap/base/security/URLListValidator"],function(D,L,U){"use strict";function s(c){return(!!c.getTitle()||c._isDisplayDownloadButton())&&!c._bIsPopupOpen;}var a=Object.freeze(["application/pdf","application/x-google-chrome-pdf"]);var P={apiVersion:2};P._isSupportedMimeType=function(m){var f=a.indexOf(m);return f>-1;};P._isPdfPluginEnabled=function(){var i=true;if(D.browser.firefox){return i;}if(typeof navigator.pdfViewerEnabled!=="undefined"){if(navigator.pdfViewerEnabled||/HeadlessChrome/.test(window.navigator.userAgent)){return i;}else{i=false;}}else{var m=navigator.mimeTypes;i=a.some(function(A){var M=m.namedItem(A);return M!==null;});}return i;};P.render=function(r,c){r.openStart("div",c);r.style("width",c._getRenderWidth());r.style("height",c._getRenderHeight());this._writeAccessibilityTags(r,c);r.openEnd();if(s(c)){r.renderControl(c._objectsRegister.getOverflowToolbarControl());}if(c._isEmbeddedModeAllowed()&&this._isPdfPluginEnabled()){this.renderPdfContent(r,c);}r.close("div");};P._writeAccessibilityTags=function(r,c){r.attr("role","document");r.attr("aria-label",c._getLibraryResourceBundle().getText("PDF_VIEWER_ACCESSIBILITY_LABEL"));};P.renderPdfContent=function(r,c){if(c._shouldRenderPdfContent()&&!(/HeadlessChrome/.test(window.navigator.userAgent))){r.openStart("iframe",c.getId()+"-iframe");var p=c.getSource();var C=c.getSource().indexOf("#");if(C>-1){p=p.substr(0,C);}if(!(D.browser.safari&&p.startsWith("blob:"))){p+="#view=FitH";}if(!U.validate(p)){p=encodeURI(p);}if(U.validate(p)){r.attr("src",p);}else{c._fireErrorEvent();}r.class("sapMPDFViewerContent");r.class("sapMPDFViewerLoading");r.attr("aria-label",c._getLibraryResourceBundle().getText("PDF_VIEWER_CONTENT_ACCESSIBILITY_LABEL"));if(s(c)){r.class("sapMPDFViewerReducedContent");}r.openEnd();r.close("iframe");}else{this.renderErrorContent(r,c);if(!P._isPdfPluginEnabled()){L.warning("The PDF plug-in is not available on this device.");c.fireEvent("error",{},true);}}};P.renderErrorContent=function(r,c){var e=c.getErrorPlaceholder()?c.getErrorPlaceholder():c._objectsRegister.getPlaceholderMessagePageControl();r.openStart("div");r.class("sapMPDFViewerError");if(!c._bIsPopupOpen){r.class("sapMPDFViewerEmbeddedContent");}r.openEnd();r.renderControl(e);r.close("div");};return P;},true);
