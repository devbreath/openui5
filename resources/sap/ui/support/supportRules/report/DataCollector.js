/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/LoaderExtensions",'sap/base/security/encodeXML',"sap/ui/core/Component","sap/ui/core/support/ToolsAPI","sap/ui/thirdparty/URI"],function(L,e,C,T,U){"use strict";var D=function(c){this._oCore=c;this._oSupportAssistantInfo={location:"",version:{},versionAsString:""};};D.prototype.setSupportAssistantLocation=function(l){this._oSupportAssistantInfo.location=l;};D.prototype.setSupportAssistantVersion=function(v){this._oSupportAssistantInfo.version=v;this._oSupportAssistantInfo.versionAsString="not available";if(v){this._oSupportAssistantInfo.versionAsString=e(v.version||"");this._oSupportAssistantInfo.versionAsString+=" (built at "+e(v.buildTimestamp||"");this._oSupportAssistantInfo.versionAsString+=", last change "+e(v.scmRevision||"")+")";}};D.prototype.getSupportAssistantInfo=function(){return this._oSupportAssistantInfo;};D.prototype.getAppInfo=function(){var a=[];C.registry.forEach(function(c){var s=c.getMetadata().getManifestEntry("sap.app"),S=c.getMetadata().getManifestEntry("sap.fiori");if(s){a.push(s);}if(S){a.push(S);}});return a;};D.prototype.getTechInfoJSON=function(){var c=T.getFrameworkInformation();var t={sapUi5Version:null,version:c.commonInformation.version,build:c.commonInformation.buildTime,change:c.commonInformation.lastChange,jquery:c.commonInformation.jquery,useragent:c.commonInformation.userAgent,docmode:c.commonInformation.documentMode,debug:c.commonInformation.debugMode,bootconfig:c.configurationBootstrap,config:c.configurationComputed,libraries:c.libraries,loadedLibraries:c.loadedLibraries,modules:c.loadedModules,uriparams:c.URLParameters,appurl:c.commonInformation.applicationHREF,title:c.commonInformation.documentTitle,statistics:c.commonInformation.statistics,resourcePaths:[],themePaths:[],locationsearch:document.location.search,locationhash:document.location.hash,supportAssistant:this._oSupportAssistantInfo};var m=L.getAllRequiredModules();var r=[];for(var i=0;i<m.length;i++){r.push({moduleName:m[i],relativePath:sap.ui.require.toUrl(m[i]),absolutePath:U(sap.ui.require.toUrl(m[i])).absoluteTo(document.location.origin+document.location.pathname).toString()});}t.resourcePaths=r;var l=this._oCore.getLoadedLibraries();r=[];for(var n in l){if(n===""){continue;}var p=this._oCore._getThemePath(n,this._oCore.oConfiguration.theme);r.push({theme:this._oCore.oConfiguration.theme,library:n,relativePath:p,absolutePath:U(p).absoluteTo(document.location.origin+document.location.pathname).toString()});}t.themePaths=r;try{t.sapUi5Version={version:sap.ui.getVersionInfo(),path:sap.ui.resource("","sap-ui-version.json")};}catch(a){t.sapUi5Version=null;}return t;};return D;},true);
