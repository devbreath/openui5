/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/base/ManagedObject","sap/ui/support/supportRules/CommunicationBus","sap/ui/support/supportRules/WCBChannels","sap/ui/support/supportRules/Constants","sap/ui/thirdparty/URI"],function(o,i,t,e,n,s){"use strict";var r=null;var p;var u;var a;function l(o){var i=new s(o);var t=(i.protocol()||window.location.protocol.replace(":",""))+"://"+(i.host()||window.location.host);return t}function d(){return""+ +new Date}function c(o){var i=document.createElement("IFRAME");var t=i.style;i.id="sap-ui-supportToolsFrame";i.src=o;t.width="100%";t.height="28px";t.position="absolute";t.left="0";t.bottom="0";t.border="none";t.borderRadius="1px";t.zIndex="1001";t.boxShadow="1px -10px 42px -4px #888";document.body.appendChild(i);setInterval(function(){if(i.parentNode.nodeName!=="BODY"){document.body.appendChild(i);window.communicationWindows.supportTool=i.contentWindow}},1e3);window.communicationWindows.supportTool=i.contentWindow}function h(o){window.communicationWindows.supportTool=window.open(o,"sapUiSupportTool","width=1024,height=400,status=no,toolbar=no,menubar=no,resizable=yes,location=no,directories=no,scrollbars=no");window.communicationWindows.supportTool.window.onload=function(){window.communicationWindows.supportTool.document.title=n.SUPPORT_ASSISTANT_NAME}}var m=i.extend("sap.ui.support.IFrameController",{constructor:function(){if(!r){i.apply(this,arguments)}else{o.warning("Only one support tool allowed");return r}}});m.prototype._setCommunicationSubscriptions=function(){t.subscribe(e.ENSURE_FRAME_OPENED,function(){if(document.getElementById("sap-ui-supportToolsFrame").style.height==="28px"){this.resizeFrame(true);this.toggleHide()}},this);t.subscribe(e.RESIZE_FRAME,function(o){r.resizeFrame(o.bigger)})};m.prototype.injectFrame=function(o){u=d();a=sap.ui.require.toUrl("sap/ui/support/supportRules/ui/overlay.html")+"?sap-ui-xx-formfactor=compact&sap-ui-xx-support-origin="+window.location.protocol+"//"+window.location.host+"&"+"sap-ui-xx-frame-identifier="+u;p=l(a);window.communicationWindows=window.communicationWindows||{};if(o.indexOf("window")>-1){h(a)}else{c(a);this._setCommunicationSubscriptions()}};m.prototype.resizeFrame=function(o){var i=document.getElementById("sap-ui-supportToolsFrame").style;if(o){if(i.height==="50%"){i.height="100%"}else if(i.height==="28px"){i.height="50%"}}else{if(i.height==="100%"){i.height="50%"}else if(i.height==="50%"){i.height="28px"}}};m.prototype.toggleHide=function(o){var i=document.getElementById("sap-ui-supportToolsFrame").style;if(o){this._originalSize={width:i.width,height:i.height};i.width="170px";i.height="28px"}else{if(this._originalSize){i.width=this._originalSize.width;i.height=this._originalSize.height;this._originalSize=null}}};m.prototype._stop=function(){this._oCssLink.parentNode.removeChild(this._oCssLink);this._oDomRef.parentNode.removeChild(this._oCssLink);this._oCore=null};m.prototype.getCommunicationInfo=function(){return{origin:p,identifier:u,url:a}};r=new m;return r},true);
//# sourceMappingURL=IFrameController.js.map