/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/security/encodeURLParameters"],function(e){"use strict";var s=0;var t=function(e,s){var t=new Error(e.statusText);t.status=e.status;t.userMessage=s;return t};var n=function(e){return sap.ui.getCore().getLibraryResourceBundle("sap.ui.fl").getText(e)};return{addLanguageInfo:function(e){if(!e){e={}}e["sap-language"]=sap.ui.getCore().getConfiguration().getLanguage()},addSAPLogonLanguageInfo:function(e){if(!e){e={}}e["sap-language"]=sap.ui.getCore().getConfiguration().getSAPLogonLanguage()},getUrl:function(s,t,n){if(!s||!t.url){throw new Error("Not all necessary parameters were passed")}var r=t.url+s;if(t.cacheKey){r+="~"+t.cacheKey+"~/"}if(t.reference){r+=t.reference}else if(t.fileName){r+=t.fileName}if(n){Object.keys(n).forEach(function(e){if(n[e]===undefined){delete n[e]}});var a=e(n);if(a.length>0){r+="?"+a}}return r},sendRequest:function(e,r,a){r=r||"GET";r=r.toUpperCase();return new Promise(function(o,i){var u=new XMLHttpRequest;u.open(r,e);u.timeout=s;if((r==="GET"||r==="HEAD")&&(!a||!a.xsrfToken)){u.setRequestHeader("X-CSRF-Token","fetch")}if((r==="POST"||r==="PUT"||r==="DELETE")&&a&&a.xsrfToken){u.setRequestHeader("X-CSRF-Token",a.xsrfToken)}if(a&&a.contentType){u.setRequestHeader("Content-Type",a.contentType)}if(a&&a.siteId){u.setRequestHeader("X-LRep-Site-Id",a.siteId)}if(a&&a.sAppDescriptorId){u.setRequestHeader("X-LRep-AppDescriptor-Id",a.sAppDescriptorId)}if(a&&a.dataType){u.responseType=a.dataType}u.onload=function(){if(u.status>=200&&u.status<400){try{var e={};if(u.status!==204&&u.status!==205){if(!u.response&&u.responseText){u.response=u.responseText}e.response=u.response;if(e.response&&typeof e.response==="string"&&u.getResponseHeader("content-type")&&u.getResponseHeader("content-type").indexOf("json")>0){e.response=JSON.parse(e.response)}}e.status=u.status;if(u.getResponseHeader("X-CSRF-Token")){e.xsrfToken=u.getResponseHeader("X-CSRF-Token")}if(u.getResponseHeader("Etag")){e.etag=u.getResponseHeader("Etag")}o(e)}catch(e){e.userMessage=n("MSG_LOADING_SERVER_RESPONSE_ERROR");i(e)}}else{var s="";try{var r=typeof u.response==="string"?JSON.parse(u.response):u.response;if(Array.isArray(r.messages)&&r.messages.length){s=r.messages.reduce(function(e,s){return e.concat(s.severity==="Error"?s.text+"\n":"")},s)}}catch(e){}i(t(u,s))}};u.ontimeout=function(){i(t(u,n("MSG_CONNECTION_TIMEOUT_ERROR")))};u.onerror=function(){i(t(u,n("MSG_NETWORK_ERROR")))};if(a&&a.payload){u.send(a.payload)}else{u.send()}})}}});
//# sourceMappingURL=Utils.js.map