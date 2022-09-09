/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","./library","sap/ui/core/Core","sap/ui/thirdparty/jquery"],function(e,t,r,jQuery){"use strict";var a="sap-ui-illustration-pool",s="-Patterns",o="sapIllus",i=sap.ui.require.toUrl("sap/m/themes/base/illustrations/"),n=Object.keys(t.IllustratedMessageType);var l=Object.create(null);l[o]={sPath:i,aSymbols:n,bIsPending:false};var u=[],d=Object.create(null),f=Object.create(null),c=Object.create(null);var b={};b.loadAsset=function(t,r){var a;if(t===""){e.error("ID of the asset can not be blank/empty.");return}if(r){c[r]=t}if(d[t]){e.info("The asset with ID '"+t+"' is either loaded or being loaded.");if(r&&f[t]){b._updateDOMPool()}return}a=t.split("-")[0];if(!l[a]){e.error("The illustration set '"+a+"' is not registered. Please register it before requiring one of its assets.");return}d[t]=true;b._requireSVG(a,t,r)};b.loadRestOfTheAssets=function(e){var t;if(!l[e]){throw new Error("The illustration set '"+e+"' is not registered. Please register it before requiring rest of its assets.")}t=l[e].aSymbols;if(Array.isArray(t)){t.forEach(function(t){b.loadAsset(e+"-Spot-"+t);b.loadAsset(e+"-Dialog-"+t);b.loadAsset(e+"-Scene-"+t)})}};b.registerIllustrationSet=function(t,r){var a=t.setFamily,s=t.setURI;if(l[a]){if(l[a].bIsPending){e.warning("Illustration Set is currently being loaded.")}else{e.warning("Illustration Set already registered.")}return}if(s.substr(s.length-1)!=="/"){s+="/"}l[a]=Object.create(null);l[a].sPath=s;l[a].bIsPending=true;b._loadMetadata(a,s,r)};b._addAssetToDOMPool=function(e,t){b._getDOMPool().insertAdjacentHTML("beforeend",e);if(t){u.push(t)}};b._getDOMPool=function(){var e=document.getElementById(a);if(e===null){e=document.createElement("div");e.id=a;e.setAttribute("aria-hidden","true");r.getStaticAreaRef().appendChild(e);b.loadAsset(o+s)}return e};b._loadMetadata=function(t,r,a){var s=r+"metadata.json";return new Promise(function(r){jQuery.ajax(s,{type:"GET",dataType:"json",success:function(s){e.info("Metadata for illustration set ("+t+") successfully loaded");b._metadataLoaded(t,s,a);r(s)},error:function(a,o){if(o!=="abort"){e.error("Metadata from: "+s+" file path could not be loaded");delete l[t];r()}}})})};b._metadataLoaded=function(e,t,r){var a=t.symbols,o=t.requireCustomPatterns;l[e].aSymbols=a;if(o){b.loadAsset(e+s)}if(r){b.loadRestOfTheAssets(e)}l[e].bIsPending=false};b._removeAssetFromDOMPool=function(e){var t=document.getElementById(a),r;if(t!==null){r=document.getElementById(e);if(r!==null){t.removeChild(r);u.splice(u.indexOf(e),1)}}};b._requireSVG=function(t,r,a){return new Promise(function(o){jQuery.ajax(l[t].sPath+r+".svg",{type:"GET",dataType:"html",success:function(e){if(r.indexOf(s)===-1){f[r]=e;if(a){b._updateDOMPool()}}else{b._addAssetToDOMPool(e)}o(e)},error:function(t,a){if(a!=="abort"){delete d[r];e.error(r+" asset could not be loaded");o()}}})})};b._updateDOMPool=function(){var e=Object.create(null),t=Object.create(null),r,a;for(var s in c){r=c[s];a=u.indexOf(r);if(a===-1){t[r]=true}else{e[r]=true}}for(var o=0;o<u.length;o++){r=u[o];if(!e[r]){b._removeAssetFromDOMPool(r);o--}}for(var i in t){r=f[i];if(r){b._addAssetToDOMPool(r,i)}}};return b},true);
//# sourceMappingURL=IllustrationPool.js.map