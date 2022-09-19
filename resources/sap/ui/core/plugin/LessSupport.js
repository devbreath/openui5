/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(){"use strict";function d(){sap.ui.define('sap/ui/core/plugin/LessSupport',['sap/ui/thirdparty/jquery','sap/ui/core/ThemeCheck','sap/base/Log','sap/base/util/syncFetch','sap/base/util/UriParameters','sap/ui/core/Core'],function(q,T,L,s,U){var a="library.source";var C="library";var b=function(){};b.prototype.startPlugin=function(c,o){L.info("Starting LessSupport plugin.");L.warning("  NOT FOR PRODUCTIVE USAGE! LessSupport is an experimental feature which might change in future!");var u=U.fromQuery(window.location.search);var n=u.get("sap-ui-xx-noless");if(n){n=n.toLowerCase();}try{if(n!=="false"&&(window.top.JsUnit||(window.sap.ui.test&&window.sap.ui.test.qunit))){L.info("  LessSupport has been deactivated for JSUnit Testrunner or QUnit.");return;}}catch(e){}if(n&&n!=="false"){L.info("  LessSupport has been deactivated by URL parameter.");return;}else{L.info("  LessSupport can be deactivated by adding the following parameter to your URL: \"sap-ui-xx-noless=X\".");}window.less=window.less||{env:"development",relativeUrls:true,errorReporting:function(m,i,r){if(m==="add"&&window.console){window.console.error("Failed to parse: "+r,i);}}};sap.ui.requireSync("sap/ui/thirdparty/less");this.oCore=c;this.bActive=true;this.oCore.includeLibraryTheme=this.includeLibraryTheme.bind(this);this.oCore.applyTheme=this.applyTheme.bind(this);var f=this,g=false;var l=[];q("link[id^=sap-ui-theme-]").each(function(){var _=f.initLink(this);g=_||g;if(_){l.push(this.id.substr(13));}});this.refreshLess(g);var j=0;function k(){var m=true;var p;for(var i=0;i<l.length;i++){p=T.checkStyle("less:"+l[i],true);if(p){q(document.getElementById("sap-ui-theme-"+l[i])).attr("data-sap-ui-ready","true");}m=m&&p;}j++;if(j>100){m=true;L.warning("LessSupport: Max theme check cycles reached.");}if(m){T.themeLoaded=true;setTimeout(function(){c.fireThemeChanged({theme:c.sTheme});},0);}else{f.iCheckThemeAppliedTimeout=setTimeout(k,100);}}if(g){this.iCheckThemeAppliedTimeout=setTimeout(k,100);}};b.prototype.stopPlugin=function(){L.info("Stopping LessSupport plugin.");if(this.bActive){clearTimeout(this.iCheckThemeAppliedTimeout);delete this.iCheckThemeAppliedTimeout;q("link[id^=sap-ui-theme-]").each(function(){var l=this.id.substr(13);q(document.getElementById("less:"+l)).remove();});delete this.oCore.includeLibraryTheme;delete this.oCore.applyTheme;this.oCore=null;}};b.prototype.initLink=function(l){var u=this.updateLink(l);q("<style>").attr("id","less:"+l.id.substr(13)).attr("type","text/css").attr("media",this.media||"screen").insertAfter(l);return u;};b.prototype.updateLink=function(l){var c=l.id.substr(13);var p;if((p=c.indexOf("-["))>0){c=c.substr(0,p);}var B=this.oCore._getThemePath(c,this.oCore.sTheme);var i=this.getLastModified(B+a+".less");var e=this.getLastModified(B+C+".css");var u=(i==0&&e>0)||i>e;if(!u){var f=this.oCore._getThemePath(c,"base");var g=this.getLastModified(f+a+".less");var j=this.getLastModified(f+C+".css");u=(g==0&&j>0)||g>j;}var F=(u)?a:C;L.debug("LessSupport.updateLink: "+B+F+": "+(u?"LESS":"CSS"));if(!u){if(l.title){delete l.title;}l.rel="stylesheet";l.href=B+F+".css";this.unregisterLink(l);return false;}l.title=c;l.rel="stylesheet/less";l.href=B+F+".less";this.registerLink(l);return true;};b.prototype.getLastModified=function(u){var l;try{var r=s(u,{method:"HEAD"});if(r.ok){var c=r.headers.get("Last-Modified");l=c?Date.parse(c):0;}else{throw Error("HTTP status error: "+r.status);}}catch(e){l=-1;}L.debug("CSS/LESS head-check: "+u+"; last-modified: "+l);return l;};b.prototype.applyTheme=function(c,e){sap.ui.core.Core.prototype.applyTheme.apply(this.oCore,arguments);var f=this,u=false;q("link[id^=sap-ui-theme-]").each(function(){u=f.updateLink(this)||u;});this.refreshLess(u);};b.prototype.includeLibraryTheme=function(l){sap.ui.core.Core.prototype.includeLibraryTheme.apply(this.oCore,arguments);var c=this,u=false;q("link[id='sap-ui-theme-"+l+"']").each(function(){u=c.initLink(this)||u;});this.refreshLess(u);};b.prototype.registerLink=function(l){if(window.less&&window.less.sheets){var i=window.less.sheets.indexOf(l);if(i===-1){window.less.sheets.push(l);}}};b.prototype.unregisterLink=function(l){if(window.less&&window.less.sheets){var c=l.id.substr(13);var i=window.less.sheets.indexOf(l);if(i>=0){window.less.sheets.splice(i,1);q(document.getElementById("less:"+c)).html("");}}};b.prototype.refreshLess=function(u){if(u){if(!document.getElementById("sap-ui-ide-less-mode")){q("<span>").attr("id","sap-ui-ide-less-mode").css("position","absolute").css("right","10px").css("bottom","10px").css("padding","10px").css("border","3px solid red").css("border-radius","10px").css("opacity","0.75").css("color","black").css("background-color","white").css("font-weight","bold").css("z-index","99999").append(q("<span>").text("LESS MODE").css({"display":"block","text-align":"center"})).append(q("<a>").attr("href","#").text("Deactivate").attr("title","Less mode is active. Click to deactivate it (requires page refresh).").css({"float":"left","clear":"left","font-size":"0.75em","text-decoration":"underline","margin-right":"0.5em"}).bind("click",function(e){e.preventDefault();if(window.confirm("Deactivating the Less Mode refreshes the page. Do you want to proceed?")){var S=window.location.search;window.location.search=(S.charAt(0)==="?"?(S+"&"):"?")+"sap-ui-xx-noless=true";}})).append(q("<a>").attr("href","#").text("Hide").attr("title","Less mode is active. Click to hide this information.").css({"float":"right","font-size":"0.75em","text-decoration":"underline"}).bind("click",function(e){e.preventDefault();q(this).parent().css("display","none");})).appendTo(window.document.body);}}else{q("#sap-ui-ide-less-mode").remove();}if(window.less&&window.less.refresh&&window.less.sheets.length>0){var l={};var m={};q(window.less.sheets).each(function(){m[this.href]=q(this).attr("id").substr(13);});var f=window.less.tree.Rule.prototype.eval;window.less.tree.Rule.prototype.eval=function(e){if(this.variable&&typeof this.name==="string"&&this.name.indexOf("@_PRIVATE_")!==0){var c=m[this.currentFileInfo.rootFilename];if(!c){L.warning("LessSupport: could not find libary ("+this.currentFileInfo.rootFilename+")");}var v=l[c];if(!v){v=l[c]={};}try{v[this.name.substr(1)]=this.value.eval(e).toCSS(e);}catch(g){}}return f.apply(this,arguments);};window.less.refresh();var P=sap.ui.requireSync('sap/ui/core/theming/Parameters');P._setOrLoadParameters(l);window.less.tree.Rule.prototype.eval=f;}};var t=new b();sap.ui.getCore().registerPlugin(t);b.refresh=function(){t.refreshLess(true);if(t.oCore.oThemeCheck){t.oCore.oThemeCheck.fireThemeChangedEvent(false);}};return b;},true);}if(!(window.sap&&window.sap.ui&&window.sap.ui.define)){var h=function(){document.removeEventListener("DOMContentLoaded",h,false);d();};document.addEventListener("DOMContentLoaded",h,false);}else{d();}}());
