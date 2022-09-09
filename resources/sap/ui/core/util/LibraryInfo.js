/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/base/Log","sap/base/util/fetch","sap/base/util/Version","sap/ui/thirdparty/jquery"],function(e,t,r,a,jQuery){"use strict";var n=e.extend("sap.ui.core.util.LibraryInfo",{constructor:function(){e.apply(this);this._oLibInfos={}},destroy:function(){e.prototype.destroy.apply(this,arguments);this._oLibInfos={}},getInterface:function(){return this}});n.prototype._loadLibraryMetadata=function(e,a){e=e.replace(/\//g,".");if(this._oLibInfos[e]){setTimeout(a.bind(window,this._oLibInfos[e]),0);return}var n=this,o,i,s=/themelib_(.*)/i.exec(e),l;if(!s){i=".library";o=sap.ui.require.toUrl(e.replace(/\./g,"/"))+"/"}else{i=".theme";o=sap.ui.require.toUrl("sap/ui/core/themes/"+s[1]+"/")}l=typeof n.getResourceUrl==="function"?n.getResourceUrl(o):o;function f(r){t.error("failed to load library details from '"+o+i+": "+r.message+", "+r);n._oLibInfos[e]={name:e,data:null,url:o};a(n._oLibInfos[e])}r(l+i,{headers:{Accept:r.ContentTypes.XML}}).then(function(t){if(t.ok){return t.text().then(function(t){var r=new DOMParser;var i=r.parseFromString(t,"text/xml");n._oLibInfos[e]={name:e,data:i,url:o};a(n._oLibInfos[e])})}else{throw new Error(t.statusText||t.status)}}).catch(f)};n.prototype._getLibraryInfo=function(e,t){this._loadLibraryMetadata(e,function(e){var r={libs:[],library:e.name,libraryUrl:e.url};if(e.data){var a=jQuery(e.data);r.vendor=a.find("vendor").text();r.copyright=a.find("copyright").text();r.version=a.find("version").text();r.documentation=a.find("documentation").text();r.releasenotes=a.find("releasenotes").attr("url");r.componentInfo=n.prototype._getLibraryComponentInfo(a)}t(r)})};n.prototype._getThirdPartyInfo=function(e,t){this._loadLibraryMetadata(e,function(e){var r={libs:[],library:e.name,libraryUrl:e.url};if(e.data){var a=jQuery(e.data).find("appData").find("thirdparty").children();a.each(function(t,a){if(a.nodeName==="lib"){var n=jQuery(a);var o=n.children("license");r.libs.push({displayName:n.attr("displayName"),homepage:n.attr("homepage"),license:{url:o.attr("url"),type:o.attr("type"),file:e.url+o.attr("file")}})}})}t(r)})};n.prototype._getDocuIndex=function(e,a){var n=this;this._loadLibraryMetadata(e,function(e){var o=e.name,i=e.url,s={docu:{},library:o,libraryUrl:i};if(!e.data){a(s);return}var l=jQuery(e.data).find("appData").find("documentation");var f=l.attr("indexUrl");if(!f){a(s);return}if(l.attr("resolve")=="lib"){f=e.url+f}if(typeof n.getResourceUrl==="function"){f=n.getResourceUrl(f)}r(f,{headers:{Accept:r.ContentTypes.JSON}}).then(function(e){if(e.ok){e.json().then(function(e){e.library=o;e.libraryUrl=i;a(e)})}else{throw new Error(e.statusText||e.status)}}).catch(function(e){t.error("failed to load library docu from '"+f+"': "+e.message+", "+e);a(s)})})};n.prototype._getReleaseNotes=function(e,n,o){var i=this;this._loadLibraryMetadata(e,function(s){if(!s.data){o({});return}var l=n.split(".").length===3&&!/-SNAPSHOT/.test(n);var f=a(n);var u=f.getMajor();var c=f.getMinor();var p=f.getPatch();var d=jQuery(s.data).find("appData").find("releasenotes");var h=d.attr("url");var y=typeof i.getResourceUrl==="function";if(!h){t.warning("failed to load release notes for library "+e);o({});return}if(f.getSuffix()==="-SNAPSHOT"){if(c%2!=0){c=c+1;p=0}n=u+"."+c+"."+p}var m=y?i.getResourceUrl(""):window.location.href,g=/\/\d.\d{1,2}.\d{1,2}\//;if(d.attr("resolve")=="lib"){if(g.test(m)||l===false){h=s.url+h}else{h="{major}.{minor}.{patch}/"+s.url+h}}h=h.replace(/\{major\}/g,u);h=h.replace(/\{minor\}/g,c);h=h.replace(/\{patch\}/g,p);if(y){h=i.getResourceUrl(h)}r(h,{headers:{Accept:r.ContentTypes.JSON}}).then(function(e){if(e.ok){return e.json().then(function(e){o(e,n)})}else{throw new Error(e.statusText||e.status)}}).catch(function(r){if(r.name==="SyntaxError"){t.error("failed to parse release notes for library '"+e+", "+r)}else{t.warning("failed to load release notes for library '"+e+", "+r)}o({})})})};n.prototype._getLibraryComponentInfo=function(e){var t={};var r=[];var a="";e.find("ownership > component").each(function(e,t){if(t.childElementCount===0){a=t.textContent}else{var n=t.getElementsByTagName("name");if(n&&n.length>0){n=n[0].textContent;var o=t.getElementsByTagName("module");if(n&&o&&o.length>0){var i=[];for(var s=0;s<o.length;s++){var l=o[s].textContent.replace(/\//g,".");if(l){i.push(l)}}if(i.length>0){r.push({component:n,modules:i})}}}}});t["defaultComponent"]=a;if(r&&r.length>0){t["specialCases"]=r}return t};n.prototype._getActualComponent=function(e,r){function a(e,t){e=e.toLowerCase();t=t.toLowerCase();return e===t||t.match(/\*$/)&&e.indexOf(t.slice(0,-1))===0||t.match(/\.\*$/)&&e===t.slice(0,-2)}if(r){for(var n in e){if(!e[n]){t.error("No library information deployed for "+n);continue}var o;if(r.indexOf(n)===0){o=e[n].defaultComponent}var i=e[n].specialCases;if(i){for(var s=0;s<i.length;s++){var l=i[s].modules;for(var f=0;f<l.length;f++){if(a(r,l[f])){o=i[s].component}}}}if(o){return o}}}};n.prototype._getDefaultComponent=function(e){return e&&e.componentInfo&&e.componentInfo.defaultComponent};return n});
//# sourceMappingURL=LibraryInfo.js.map