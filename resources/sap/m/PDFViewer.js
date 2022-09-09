/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/Device","sap/m/PDFViewerRenderManager","sap/m/MessageBox","sap/m/PDFViewerRenderer","sap/base/Log","sap/base/assert","sap/ui/thirdparty/jquery"],function(e,t,o,i,r,n,s,a,jQuery){"use strict";var p=e.PDFViewerDisplayType;var l=t.extend("sap.m.PDFViewer",{metadata:{library:"sap.m",properties:{height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},source:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},errorMessage:{type:"string",group:"Misc",defaultValue:null,deprecated:true},errorPlaceholderMessage:{type:"string",group:"Misc",defaultValue:null},popupHeaderTitle:{type:"string",group:"Misc",defaultValue:null,deprecated:true},title:{type:"string",group:"Misc",defaultValue:null},showDownloadButton:{type:"boolean",group:"Misc",defaultValue:true},displayType:{type:"sap.m.PDFViewerDisplayType",group:"Misc",defaultValue:p.Auto}},aggregations:{errorPlaceholder:{type:"sap.ui.core.Control",multiple:false},popupButtons:{type:"sap.m.Button",multiple:true,singularName:"popupButton"}},events:{loaded:{},error:{parameters:{target:{type:"any",defaultValue:null}}},sourceValidationFailed:{}}}});l.prototype.init=function(){this._objectsRegister={};this._bIsPopupOpen=false;this._initPopupControl();this._initPopupDownloadButtonControl();this._initPlaceholderMessagePageControl();this._initToolbarDownloadButtonControl();this._initOverflowToolbarControl();this._initControlState()};l.prototype._initControlState=function(){this._bRenderPdfContent=true};l.prototype.setWidth=function(e){this.setProperty("width",e,true);var t=this.$();if(t===null){return this}t.css("width",this._getRenderWidth());return this};l.prototype.setHeight=function(e){this.setProperty("height",e,true);var t=this.$();if(t===null){return this}t.css("height",this._getRenderHeight());return this};l.prototype.onBeforeRendering=function(){try{var e=this._getIframeDOMElement();e.remove()}catch(e){s.info(e)}};l.prototype.onAfterRendering=function(){var e=function(){var e=this._getIframeDOMElement();e.on("load",this._onLoadListener.bind(this));e.on("error",this._onErrorListener.bind(this))}.bind(this);try{this.setBusy(true);e()}catch(e){s.error(e);this.setBusy(false)}};l.prototype._fireErrorEvent=function(e){this._renderErrorState();this.fireError({target:e||null})};l.prototype._renderErrorState=function(){var e=this._objectsRegister.getToolbarDownloadButtonControl();e.setEnabled(false);var e=this._objectsRegister.getPopupDownloadButtonControl();e.setEnabled(false);this.setBusy(false);this._bRenderPdfContent=false;t.prototype.invalidate.call(this)};l.prototype._fireLoadedEvent=function(){this._bRenderPdfContent=true;this.setBusy(false);try{this._getIframeDOMElement().removeClass("sapMPDFViewerLoading")}catch(e){s.fatal("Iframe not founded in loaded event");s.fatal(e)}this.fireEvent("loaded")};l.prototype._onLoadListener=function(e){try{var t=jQuery(e.target),i=true;var r="application/pdf";try{var a=t[0].contentWindow.document.embeds;i=!!a&&a.length===1;if(i){r=a[0].attributes.getNamedItem("type").value}}catch(e){if(!o.browser.firefox&&this.fireEvent("sourceValidationFailed",{},true)){this._fireLoadedEvent();return}}if(i&&n._isSupportedMimeType(r)&&n._isPdfPluginEnabled()){this._fireLoadedEvent()}else{this._fireErrorEvent(e.target)}}catch(e){s.fatal(false,"Fatal error during the handling of load event happened.");s.fatal(false,e.message)}};l.prototype._onErrorListener=function(){this._fireErrorEvent()};l.prototype.downloadPDF=function(){var e=window.open(this.getSource());e.opener=null;e.focus()};l.prototype._onSourceValidationErrorMessageBoxCloseListener=function(e){if(e===r.Action.CANCEL){this._renderErrorState()}else{this._fireLoadedEvent()}};l.prototype._onAfterPopupClose=function(e){var t=this._objectsRegister.getPopup();t.removeAllContent();this._bIsPopupOpen=false};l.prototype._shouldRenderPdfContent=function(){return n._isPdfPluginEnabled()&&this._bRenderPdfContent&&this._isSourceValidToDisplay()};l.prototype._isSourceValidToDisplay=function(){var e=this.getSource();return e!==null&&e!==""&&typeof e!=="undefined"};l.prototype.invalidate=function(e){this._initControlState();t.prototype.invalidate.call(this,e)};l.prototype.open=function(){if(!this._isSourceValidToDisplay()){a(false,"The PDF file cannot be opened with the given source. Given source: "+this.getSource());return}else if(!n._isPdfPluginEnabled()){s.warning("The PDF plug-in is not available on this device.")}if(this._isEmbeddedModeAllowed()){this._openOnDesktop()}else{this._openOnMobile()}};l.prototype._openOnDesktop=function(){var e=this._objectsRegister.getPopup();if(this._bIsPopupOpen){return}this._initControlState();this._preparePopup(e);e.addContent(this);this._bIsPopupOpen=true;e.open()};l.prototype._openOnMobile=function(){var e=window.open(this.getSource());e.opener=null;e.focus()};l.prototype._getIframeDOMElement=function(){var e=this.$("iframe");if(e.length===0){throw Error("Underlying iframe was not found in DOM.")}if(e.length>1){s.fatal("Initialization of iframe fails. Reason: the control somehow renders multiple iframes")}return e};l.prototype._isEmbeddedModeAllowed=function(){return this._isDisplayTypeAuto()?o.system.desktop:this._isDisplayTypeEmbedded()};l.prototype._isDisplayTypeAuto=function(){return this.getDisplayType()===p.Auto};l.prototype._isDisplayTypeEmbedded=function(){return this.getDisplayType()===p.Embedded};l.prototype._isDisplayTypeLink=function(){return this.getDisplayType()===p.Link};l.prototype._isDisplayDownloadButton=function(){return this.getShowDownloadButton()||this._isDisplayTypeLink()||this._isDisplayTypeAuto()&&!this._isEmbeddedModeAllowed()};l.prototype._getLibraryResourceBundle=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.m")};l.prototype._getMessagePageErrorMessage=function(){return this.getErrorPlaceholderMessage()?this.getErrorPlaceholderMessage():this._getLibraryResourceBundle().getText("PDF_VIEWER_PLACEHOLDER_ERROR_TEXT")};l.prototype._getRenderWidth=function(){return this._bIsPopupOpen?"100%":this.getWidth()};l.prototype._getRenderHeight=function(){if(this._bIsPopupOpen){return"100%"}if(!this._isEmbeddedModeAllowed()){return"auto"}return this.getHeight()};l.prototype._showMessageBox=function(){r.show(this._getLibraryResourceBundle().getText("PDF_VIEWER_SOURCE_VALIDATION_MESSAGE_TEXT"),{icon:r.Icon.WARNING,title:this._getLibraryResourceBundle().getText("PDF_VIEWER_SOURCE_VALIDATION_MESSAGE_HEADER"),actions:[r.Action.OK,r.Action.CANCEL],defaultAction:r.Action.CANCEL,id:this.getId()+"-validationErrorSourceMessageBox",styleClass:"sapUiSizeCompact",contentWidth:"100px",onClose:this._onSourceValidationErrorMessageBoxCloseListener.bind(this)})};l.prototype.exit=function(){jQuery.each(this._objectsRegister,function(e,t){var o=t(true);if(o){o.destroy()}});try{var e=this._getIframeDOMElement();e.off()}catch(e){s.info(e)}};i.extendPdfViewer(l);return l});
//# sourceMappingURL=PDFViewer.js.map