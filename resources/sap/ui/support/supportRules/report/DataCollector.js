/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/LoaderExtensions","sap/base/security/encodeXML","sap/ui/core/Component","sap/ui/core/support/ToolsAPI","sap/ui/thirdparty/URI"],function(o,t,n,i,e){"use strict";var s=function(o){this._oCore=o;this._oSupportAssistantInfo={location:"",version:{},versionAsString:""}};s.prototype.setSupportAssistantLocation=function(o){this._oSupportAssistantInfo.location=o};s.prototype.setSupportAssistantVersion=function(o){this._oSupportAssistantInfo.version=o;this._oSupportAssistantInfo.versionAsString="not available";if(o){this._oSupportAssistantInfo.versionAsString=t(o.version||"");this._oSupportAssistantInfo.versionAsString+=" (built at "+t(o.buildTimestamp||"");this._oSupportAssistantInfo.versionAsString+=", last change "+t(o.scmRevision||"")+")"}};s.prototype.getSupportAssistantInfo=function(){return this._oSupportAssistantInfo};s.prototype.getAppInfo=function(){var o=[];n.registry.forEach(function(t){var n=t.getMetadata().getManifestEntry("sap.app"),i=t.getMetadata().getManifestEntry("sap.fiori");if(n){o.push(n)}if(i){o.push(i)}});return o};s.prototype.getTechInfoJSON=function(){var t=i.getFrameworkInformation();var n={sapUi5Version:null,version:t.commonInformation.version,build:t.commonInformation.buildTime,change:t.commonInformation.lastChange,jquery:t.commonInformation.jquery,useragent:t.commonInformation.userAgent,docmode:t.commonInformation.documentMode,debug:t.commonInformation.debugMode,bootconfig:t.configurationBootstrap,config:t.configurationComputed,libraries:t.libraries,loadedLibraries:t.loadedLibraries,modules:t.loadedModules,uriparams:t.URLParameters,appurl:t.commonInformation.applicationHREF,title:t.commonInformation.documentTitle,statistics:t.commonInformation.statistics,resourcePaths:[],themePaths:[],locationsearch:document.location.search,locationhash:document.location.hash,supportAssistant:this._oSupportAssistantInfo};var s=o.getAllRequiredModules();var r=[];for(var a=0;a<s.length;a++){r.push({moduleName:s[a],relativePath:sap.ui.require.toUrl(s[a]),absolutePath:e(sap.ui.require.toUrl(s[a])).absoluteTo(document.location.origin+document.location.pathname).toString()})}n.resourcePaths=r;var u=this._oCore.getLoadedLibraries();r=[];for(var p in u){if(p===""){continue}var c=this._oCore._getThemePath(p,this._oCore.getConfiguration().getTheme());r.push({theme:this._oCore.getConfiguration().getTheme(),library:p,relativePath:c,absolutePath:e(c).absoluteTo(document.location.origin+document.location.pathname).toString()})}n.themePaths=r;try{n.sapUi5Version={version:sap.ui.getVersionInfo(),path:sap.ui.resource("","sap-ui-version.json")}}catch(o){n.sapUi5Version=null}return n};return s},true);
//# sourceMappingURL=DataCollector.js.map