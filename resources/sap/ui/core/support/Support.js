/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/base/EventProvider','./Plugin',"sap/base/util/UriParameters","sap/ui/thirdparty/jquery","sap/base/Log","sap/base/security/encodeURL"],function(E,P,U,q,L,a){"use strict";var S=E.extend("sap.ui.core.support.Support",{constructor:function(T){if(!_){throw Error();}E.apply(this);var e=this;this._sType=T;this._sLocalOrigin=window.location.protocol+"//"+window.location.host;var h=this._receiveEvent.bind(this);if(window.addEventListener){window.addEventListener("message",h,false);}else{window.attachEvent("onmessage",h);}switch(T){case t.APPLICATION:this._isOpen=false;this.attachEvent(m.TEAR_DOWN,function(o){e._isOpen=false;d(e._oRemoteWindow);e._oRemoteWindow=null;S.exitPlugins(e,false);});this.attachEvent(m.LIBS,function(o){var l=S.getDiagnosticLibraries(),f=[];for(var i=0;i<l.length;i++){f.push(l[i].name);}e.sendEvent(m.LIBS,f);});this.attachEvent(m.SETUP,function(o){e._isOpen=true;S.initPlugins(e,false);});break;case t.TOOL:this._oRemoteWindow=window.opener;this._sRemoteOrigin=U.fromQuery(window.location.search).get("sap-ui-xx-support-origin");q(window).on("unload",function(o){e.sendEvent(m.TEAR_DOWN);S.exitPlugins(e,true);});this.attachEvent(m.LIBS,function(o){var l=o.mParameters;if(!Array.isArray(l)){l=Object.keys(l).map(function(s){return l[s];});}sap.ui.getCore().loadLibraries(l,true).then(function(){q(function(){S.initPlugins(e,true).then(function(){e.sendEvent(m.SETUP);});});});});this.sendEvent(m.LIBS);break;}}});var t={APPLICATION:"APPLICATION",TOOL:"TOOL"};var m={LIBS:"sapUiSupportLibs",SETUP:"sapUiSupportSetup",TEAR_DOWN:"sapUiSupportTeardown"};S.StubType=t;S.EventType=m;var p=[];S.getStub=function(T){if(b){return b;}if(T!=t.APPLICATION&&T!=t.TOOL){T=t.APPLICATION;}_=true;b=new S(T);_=false;return b;};S.getToolPlugins=function(){var r=[];for(var i=0;i<p.length;i++){if(p[i]instanceof P&&p[i].isToolPlugin()){r.push(p[i]);}}return r;};S.getAppPlugins=function(){var r=[];for(var i=0;i<p.length;i++){if(p[i]instanceof P&&p[i].isAppPlugin()){r.push(p[i]);}}return r;};S.prototype.getType=function(){return this._sType;};S.prototype.isToolStub=function(){return this._sType===S.StubType.TOOL;};S.prototype.isAppStub=function(){return this._sType===S.StubType.APPLICATION;};S.prototype._receiveEvent=function(e){var D=e.data;if(typeof D==="string"&&D.indexOf("SAPUI5SupportTool*")===0){D=D.substr(18);}else{return;}if(e.source!=this._oRemoteWindow){return;}this._oRemoteOrigin=e.origin;var o=JSON.parse(D);var s=o.eventId;var f=o.params;this.fireEvent(s,f);};S.prototype.sendEvent=function(e,f){if(!this._oRemoteWindow){return;}f=f?f:{};var D={"eventId":e,"params":f};var s="SAPUI5SupportTool*"+JSON.stringify(D);this._oRemoteWindow.postMessage(s,this._sRemoteOrigin);};S.prototype.openSupportTool=function(){var T=sap.ui.require.toUrl("sap/ui/core/support/support.html");var s="?sap-ui-xx-noless=true&sap-ui-xx-support-origin="+a(this._sLocalOrigin);var B;if(this._sType===t.APPLICATION){var o=window.document.getElementById("sap-ui-bootstrap");if(o){var r=sap.ui.require.toUrl("");var e=o.getAttribute('src');if(typeof e==='string'&&e.indexOf(r)===0){B=e.substr(r.length);}}}if(B&&B!=='sap-ui-core.js'&&B.indexOf('/')===-1){s+="&sap-ui-xx-support-bootstrap="+a(B);}function f(u){return(u.indexOf(".")==0||u.indexOf("/")==0||u.indexOf("://")<0);}if(this._sType===t.APPLICATION){if(!this._isOpen){this._oRemoteWindow=c(T+s);this._sRemoteOrigin=f(T)?this._sLocalOrigin:T;}else{this._oRemoteWindow.focus();}}};S.prototype.toString=function(){return"sap.ui.core.support.Support";};var _=false;var b;function c(u){return window.open(u,"sapUiSupportTool","width=800,height=700,status=no,toolbar=no,menubar=no,resizable=yes,location=no,directories=no,scrollbars=yes");}function d(W){if(!W){return;}try{W.close();}catch(e){}}S.getDiagnosticLibraries=function(){var l=sap.ui.getCore().getLoadedLibraries(),e=[];for(var n in l){var o=l[n];if(o.extensions&&o.extensions["sap.ui.support"]&&o.extensions["sap.ui.support"].diagnosticPlugins){e.push(o);}}return e;};S.initPlugins=function(s,T){return new Promise(function(r,e){p=[];var l=S.getDiagnosticLibraries();for(var i=0;i<l.length;i++){var o=l[i],f=o.extensions["sap.ui.support"].diagnosticPlugins;if(Array.isArray(f)){for(var j=0;j<f.length;j++){if(p.indexOf(f[j])===-1){p.push(f[j]);}}}}var g=[],h=[],i;for(i=0;i<p.length;i++){if(typeof p[i]==="string"){g.push(p[i]);h.push(i);}}sap.ui.require(g,function(){var i,j,F;for(j=0;j<arguments.length;j++){F=arguments[j];i=h[j];if(s.isToolStub()&&F.prototype.isToolPlugin()){p[i]=new F(s);w(p[i]);}else if(s.isAppStub()&&F.prototype.isAppPlugin()){p[i]=new F(s);}}for(i=0;i<p.length;i++){if(p[i]instanceof P){if(s.isToolStub()&&p[i].isToolPlugin()){p[i].init(s);}else if(s.isAppStub()&&p[i].isAppPlugin()){p[i].init(s);}}}r();});});};S.exitPlugins=function(s,T){for(var i=0;i<p.length;i++){if(p[i]instanceof P){if(p[i].isToolPlugin()&&s.isToolStub()&&T){p[i].exit(s,true);}else if(p[i].isAppPlugin()&&s.isAppStub()&&!T){p[i].exit(s,false);}}}};function w(o){o.$().replaceWith("<div  id='"+o.getId()+"-Panel' class='sapUiSupportPnl'>"+"<div id='"+o.getId()+"-PanelHeader' class='sapUiSupportPnlHdr'>"+"<div id='"+o.getId()+"-PanelHandle' class='sapUiSupportPnlHdrHdl sapUiSupportPnlHdrHdlClosed'>"+"</div>"+"<div class='sapUiSupportPanelTitle'>"+o.getTitle()+"</div>"+"</div>"+"<div id='"+o.getId()+"-PanelContent' class='sapUiSupportPnlCntnt sapUiSupportHidden'>"+"<div id='"+o.getId()+"' class='sapUiSupportPlugin'></div>"+"</div>"+"</div>");o.$("PanelHeader").on("click",function(){var h=o.$("PanelHandle");if(h.hasClass("sapUiSupportPnlHdrHdlClosed")){h.removeClass("sapUiSupportPnlHdrHdlClosed");o.$("PanelContent").removeClass("sapUiSupportHidden");}else{h.addClass("sapUiSupportPnlHdrHdlClosed");o.$("PanelContent").addClass("sapUiSupportHidden");}});}S.initializeSupportMode=function(s,A){if(s.indexOf("true")>-1||s.indexOf("viewinfo")>-1){S._initializeSupportInfo(A);}};S._initializeSupportInfo=function(A){var s=[],f=[],g=[],D="support:data",h="support",j="http://schemas.sap.com/sapui5/extension/sap.ui.core.support.Support.info/1",k={};var H=(function(){var i="sap-ui-support.probe",n;try{localStorage.setItem(i,i);n=localStorage.getItem(i);localStorage.removeItem(i);return n===i;}catch(e){return false;}}());function l(){if(H){localStorage.setItem("sap-ui-support.aSupportInfosBreakpoints/"+document.location.href,JSON.stringify(f));}}function r(){if(H){localStorage.setItem("sap-ui-support.aSupportXMLModifications/"+document.location.href,JSON.stringify(g));}}if(H){var v=localStorage.getItem("sap-ui-support.aSupportInfosBreakpoints/"+document.location.href);if(v){f=JSON.parse(v);}var v=localStorage.getItem("sap-ui-support.aSupportXMLModifications/"+document.location.href);if(v){g=JSON.parse(v);}}S.info=function(i){i._idx=s.length;if(i._idx>0&&!i.context){i.context=s[s.length-1].context;}if(!i.context){L.debug("Support Info does not have a context and is ignored");return i;}if(i.context&&i.context.ownerDocument&&i.context.nodeType===1){var v=i._idx+"";if(!i.context.hasAttributeNS(j,"data")){i.context.setAttribute("xmlns:"+h,j);}else{v=i.context.getAttributeNS(j,"data")+","+v;}i.context.setAttributeNS(j,D,v);}s.push(i);if(f.indexOf(i._idx)>-1){L.info(i);L.info("To remove this breakpoint execute:","\nsap.ui.core.support.Support.info.removeBreakpointAt("+i._idx+")");debugger;}return i._idx;};S.info.getAll=function(C){if(C===undefined){return s;}else{return s.filter(function(o){return(o.env&&o.env.caller===C);});}};S.info.getInfos=function(I){if(I&&typeof I==="string"){I=I.split(",");}else{I=[];}var R=[];for(var i=0;i<I.length;i++){if(s[I[i]]){R.push(s[I[i]]);}}return R;};S.info.byIndex=function(i){return s[i];};S.info.getAllBreakpoints=function(){return f;};S.info.hasBreakpointAt=function(i){return f.indexOf(i)>-1;};S.info.addBreakpointAt=function(i){if(f.indexOf(i)>-1){return;}f.push(i);l();};S.info.removeBreakpointAt=function(i){var e=f.indexOf(i);if(e>-1){f.splice(e,1);l();}};S.info.removeAllBreakpoints=function(){f=[];l();};S.info.addSupportInfo=function(i,e){if(i&&e){if(k[i]){k[i]+=","+e;}else{k[i]=e;}}};S.info.byId=function(i){return k[i]||null;};S.info.getIds=function(e){var i=[];for(var n in k){var o=k[n];if(o&&o.indexOf(e)>-1){i.push(n);}}return i;};S.info.getElements=function(e){var C=[];for(var n in k){var o=k[n];if(o&&o.indexOf(e)===0){var i=sap.ui.getCore().byId(n);if(i){C.push(sap.ui.getCore().byId(n));}}}return C;};S.info.getAllXMLModifications=function(){return g;};S.info.hasXMLModifications=function(){return g.length>0;};S.info.addXMLModification=function(i,I,C){g.push({id:i,idx:I,change:C});r();};S.info.removeXMLModification=function(i){var e=g.indexOf(i);if(e>-1){g.splice(e,1);r();}};S.info.removeAllXMLModification=function(){g=[];r();};S.info.modifyXML=function(I,x){if(!S.info.hasXMLModifications()){return;}var n=x;if(!n||!n.nodeType||!(n.nodeType==1||n.nodeType==9)){return;}if(n.nodeType===9){n=n.firstChild;}var N=n.querySelectorAll("*");var e=[n];for(var i=0;i<N.length;i++){e.push(N[i]);}for(var i=0;i<g.length;i++){var o=g[i],C=o.change;if(o.id===I){var y=e[o.idx];if(y.nodeType===1&&C.setAttribute){var O=y.getAttribute(C.setAttribute[0]);y.setAttribute(C.setAttribute[0],C.setAttribute[1]);if(!y._modified){y._modified=[];}y._modified.push(C.setAttribute[0]);if(!y._oldValues){y._oldValues=[];}y._oldValues.push(O);}}}};S.info._breakAtProperty=function(K){return function(e){if(e.getParameter("name")===K){debugger;}};};S.info._breakAtMethod=function(e){return function(){debugger;return e.apply(this,arguments);};};var M=["sap/ui/base/ManagedObject","sap/ui/core/mvc/View","sap/ui/core/XMLTemplateProcessor","sap/ui/thirdparty/datajs"];function u(e,V,X,i){e._supportInfo=S.info;V._supportInfo=S.info;X._supportInfo=S.info;if(window.datajs){window.datajs._sap={_supportInfo:S.info};}L.info("sap.ui.core.support.Support.info initialized.");}if(A){sap.ui.require(M,u);}else{u.apply(null,M.map(sap.ui.requireSync));}};return S;});
