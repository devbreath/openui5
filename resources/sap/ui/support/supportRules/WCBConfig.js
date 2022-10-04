/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/UriParameters","sap/ui/thirdparty/URI"],function(i,r){"use strict";var n="_unnamed_frame_-_use_message_origin_";var t=function(i){this._sModulePath=i.modulePath;this._sReceivingWindow=i.receivingWindow;if(i.uriParams){this._sURIOrigin=i.uriParams&&i.uriParams.origin;this._sURIFrameId=i.uriParams&&i.uriParams.frameId;this._sOrigin=this.getOriginURIParameter(i.uriParams.origin)}return this};t.prototype.getOrigin=function(){if(this._sOrigin){return this._sOrigin}var i=new r(sap.ui.require.toUrl(this._sModulePath));var n=i.protocol()||window.location.protocol.replace(":","");var t=i.host()||window.location.host;this._sOrigin=n+"://"+t;return this._sOrigin};t.prototype.getFrameId=function(){return i.fromQuery(window.location.search).get(this._sURIFrameId)||n};t.prototype.getOriginURIParameter=function(){return i.fromQuery(window.location.search).get(this._sURIOrigin)};t.prototype.getReceivingWindow=function(){if(window.communicationWindows&&window.communicationWindows.hasOwnProperty(this._sReceivingWindow)){return window.communicationWindows[this._sReceivingWindow]}return window.opener||window.parent};return t},true);
//# sourceMappingURL=WCBConfig.js.map