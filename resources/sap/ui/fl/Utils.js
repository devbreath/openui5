/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/strings/formatMessage","sap/base/util/isPlainObject","sap/base/util/uid","sap/base/util/UriParameters","sap/base/Log","sap/ui/base/SyncPromise","sap/ui/base/ManagedObject","sap/ui/core/util/reflection/BaseTreeModifier","sap/ui/core/Component","sap/ui/fl/Scenario","sap/ui/thirdparty/hasher","sap/ui/thirdparty/jquery"],function(f,a,u,U,L,S,M,B,C,b,h,q){"use strict";var c={APP_ID_AT_DESIGN_TIME:"${pro"+"ject.art"+"ifactId}",VARIANT_MODEL_NAME:"$FlexVariants",formatAndLogMessage:function(l,m,v,s){var d=m.join(' ');d=f(d,v);L[l](d,s||"");},isVariantByStartupParameter:function(o){if(o){var A=this.getAppComponentForControl(o);if(A){return!!this._getComponentStartUpParameter(A,"sap-app-id");}}return false;},getAppDescriptor:function(o){var m=null;var d=null;var e=null;if(o){d=this.getAppComponentForControl(o);if(d&&d.getMetadata){e=d.getMetadata();if(e&&e.getManifest){m=e.getManifest();}}}return m;},getSiteIdByComponentData:function(o){return this._getStartUpParameter(o,"hcpApplicationId");},isBinding:function(p){return((typeof p==="string"&&!!M.bindingParser(p))||(a(p)&&((p.hasOwnProperty("path")||p.hasOwnProperty("parts"))&&!p.hasOwnProperty("ui5object"))));},isChangeRelatedToVariants:function(o){return o.getFileType()==="ctrl_variant_change"||o.getFileType()==="ctrl_variant_management_change"||o.getFileType()==="ctrl_variant"||o.getVariantReference();},_getComponentStartUpParameter:function(o,p){var s=null;if(p){if(o&&o.getComponentData){s=this._getStartUpParameter(o.getComponentData(),p);}}return s;},_getStartUpParameter:function(o,p){if(o&&o.startupParameters&&p){if(Array.isArray(o.startupParameters[p])){return o.startupParameters[p][0];}}},_getComponent:function(s){var o;if(s){o=C.get(s);}return o;},_getComponentIdForControl:function(o){var s=c._getOwnerIdForControl(o);if(!s){if(o&&typeof o.getParent==="function"){var p=o.getParent();if(p){return c._getComponentIdForControl(p);}}}return s||"";},getComponentForControl:function(o){return c._getComponentForControl(o);},getAppComponentForControl:function(o){var d=o instanceof C?o:this._getComponentForControl(o);return this._getAppComponentForComponent(d);},getAppDescriptorComponentObjectForControl:function(o){var A=this.getAppComponentForControl(o);var m=A.getManifest();return{name:this.getAppIdFromManifest(m)};},_getComponentForControl:function(o){var d=null;var s=null;if(o){s=c._getComponentIdForControl(o);if(s){d=c._getComponent(s);}}return d;},_getAppComponentForComponent:function(o){var s=null;if(o&&o.getAppComponent&&o.getAppComponent()instanceof C){return o.getAppComponent();}if(o&&o.oComponentData&&o.oComponentData.appComponent){return o.oComponentData.appComponent;}if(o&&o.getManifestEntry){s=o.getManifestEntry("sap.app");}else{return o;}if(s&&s.type&&s.type!=="application"){if(o instanceof C){o=this._getComponentForControl(o);}return this.getAppComponentForControl(o);}return o;},getViewForControl:function(o){return c.getFirstAncestorOfControlWithControlType(o,sap.ui.core.mvc.View);},getFirstAncestorOfControlWithControlType:function(o,d){if(o instanceof d){return o;}if(o&&typeof o.getParent==="function"){o=o.getParent();return c.getFirstAncestorOfControlWithControlType(o,d);}},_getOwnerIdForControl:function(o){return C.getOwnerIdFor(o);},getClient:function(){var o;var s;o=this._getUriParameters();s=o.get("sap-client");return s||undefined;},_getUriParameters:function(){return U.fromQuery(window.location.search);},isHotfixMode:function(){var o;var i;o=this._getUriParameters();i=o.get("hotfix");return(i==="true");},getLrepUrl:function(){var F=sap.ui.getCore().getConfiguration().getFlexibilityServices();var l=F.find(function(s){return s.connector==="LrepConnector";});return l?l.url:"";},getCurrentLanguage:function(){var l=sap.ui.getCore().getConfiguration().getLanguage();return c.convertBrowserLanguageToISO639_1(l);},convertBrowserLanguageToISO639_1:function(s){if(!s||typeof s!=="string"){return"";}var n=s.indexOf("-");if((n<0)&&(s.length<=2)){return s.toUpperCase();}if(n>0&&n<=2){return s.substring(0,n).toUpperCase();}return"";},getControlType:function(o){var m;if(o&&typeof o.getMetadata==="function"){m=o.getMetadata();if(m&&typeof m.getElementName==="function"){return m.getElementName();}}},asciiToString:function(d){var e=d.split(",");var p="";q.each(e,function(i,g){p+=String.fromCharCode(g);});return p;},stringToAscii:function(s){var d="";for(var i=0;i<s.length;i++){d+=s.charCodeAt(i)+",";}d=d.substring(0,d.length-1);return d;},checkControlId:function(v,A){if(!A){v=v instanceof M?v:sap.ui.getCore().byId(v);A=c.getAppComponentForControl(v);}return B.checkControlId(v,A);},hasLocalIdSuffix:B.hasLocalIdSuffix,_getAllUrlParameters:function(){return window.location.search.substring(1);},getParsedURLHash:function(o){if(o){return o.parseShellHash(h.getHash())||{};}return{};},getUrlParameter:function(p){return U.fromQuery(window.location.search).get(p);},getUshellContainer:function(){return sap.ushell&&sap.ushell.Container;},createDefaultFileName:function(n){var F=u().replace(/-/g,"_");if(n){F+='_'+n;}return F;},createNamespace:function(p,F){var s="changes";if(F==="ctrl_variant"){s="variants";}var r=p.reference.replace('.Component','');var n='apps/'+r+"/"+s+"/";return n;},buildLrepRootNamespace:function(s,d,p){var r="apps/";var e=new Error("Error in sap.ui.fl.Utils#buildLrepRootNamespace: ");if(!s){e.message+="for every scenario you need a base ID";throw e;}switch(d){case b.VersionedAppVariant:if(!p){e.message+="in a versioned app variant scenario you additionally need a project ID";throw e;}r+=s+"/appVariants/"+p+"/";break;case b.AppVariant:if(!p){e.message+="in an app variant scenario you additionally need a project ID";throw e;}r+=s+"/appVariants/"+p+"/";break;case b.AdaptationProject:if(!p){e.message+="in a adaptation project scenario you additionally need a project ID";throw e;}r+=s+"/adapt/"+p+"/";break;case b.FioriElementsFromScratch:case b.UiAdaptation:default:r+=s+"/";}return r;},_getComponentTypeFromManifest:function(m){return m&&m.getEntry&&m.getEntry("sap.app")&&m.getEntry("sap.app").type;},_getComponentTypeFromRawManifest:function(m){return m&&m["sap.app"]&&m["sap.app"].type;},isApplication:function(m,i){var s=i?c._getComponentTypeFromRawManifest(m):c._getComponentTypeFromManifest(m);return s==="application";},isApplicationComponent:function(o){return o instanceof C&&c.isApplication(o.getManifestObject());},isEmbeddedComponent:function(o){return o instanceof C&&c._getComponentTypeFromManifest(o.getManifestObject())==="component";},getAppIdFromManifest:function(m){if(m){var s=(m.getEntry)?m.getEntry("sap.app"):m["sap.app"];var A=s&&s.id;if(A===c.APP_ID_AT_DESIGN_TIME){if(m.getComponentName){return m.getComponentName();}if(m.name){return m.name;}}return A;}throw new Error("No Manifest received, descriptor changes are not possible");},indexOfObject:function(A,o){var O=-1;A.some(function(d,i){var k;var K;if(!d){k=[];}else{k=Object.keys(d);}if(!o){K=[];}else{K=Object.keys(o);}var s=k.length===K.length;var e=s&&!k.some(function(g){return d[g]!==o[g];});if(e){O=i;}return e;});return O;},execPromiseQueueSequentially:function(p,t,A){if(p.length===0){if(A){return Promise.resolve();}return new c.FakePromise();}var P=p.shift();if(typeof P==="function"){var r;try{r=P();}catch(e){r=Promise.reject(e);}return r.then(function(){if(!A&&r instanceof Promise){A=true;}}).catch(function(e){var E="Error during execPromiseQueueSequentially processing occured";E+=e?": "+e.message:"";L.error(E,e);if(t){throw new Error(E);}}).then(function(){return this.execPromiseQueueSequentially(p,t,A);}.bind(this));}L.error("Changes could not be applied, promise not wrapped inside function.");return this.execPromiseQueueSequentially(p,t,A);},FakePromise:function(i,e,I){c.FakePromise.fakePromiseIdentifier="sap.ui.fl.Utils.FakePromise";this.vValue=i;this.vError=e;this.bContinueWithFakePromise=arguments.length<3||(I===c.FakePromise.fakePromiseIdentifier);var r=function(p,d){try{var R=d(p,c.FakePromise.fakePromiseIdentifier);if(S.isThenable(R)){return R;}return new c.FakePromise(R);}catch(E){var v=E;return new c.FakePromise(undefined,v);}};c.FakePromise.prototype.then=function(s,E){if(!this.bContinueWithFakePromise){return Promise.resolve(s(this.vValue));}if(!this.vError){return r(this.vValue,s);}else if(E){return r(this.vError,E);}return this;};c.FakePromise.prototype.catch=function(d){if(!this.bContinueWithFakePromise){return Promise.reject(d(this.vError));}if(this.vError){return r(this.vError,d);}return this;};if(this.vValue instanceof Promise||this.vValue instanceof c.FakePromise){return this.vValue;}},getChangeFromChangesMap:function(m,s){var r;Object.keys(m).forEach(function(d){m[d].some(function(o){if(o.getId()===s){r=o;return true;}});});return r;},requireAsync:function(m){var o=sap.ui.require(m);if(o){return Promise.resolve(o);}return new Promise(function(r,R){sap.ui.require([m],function(o){r(o);},function(e){R(e);});});},normalizeReference:function(r){return r.replace(/(.Component)$/g,"");},handleUrlParameters:function(p,P,s,o){if(this.hasParameterAndValue(P,s,o)){if(p.startsWith("?")){p=p.substr(1,p.length);}var F=p.split("&").filter(function(d){return d!==P+"="+s;});p="";if(F.length>0){p="?"+F.toString();}}else{p+=(p.length>0?'&':'?')+P+"="+s;}return p;},hasParameterAndValue:function(p,P,o){return this.getParameter(p,o)===P;},getParameter:function(p,o){if(o){var P=c.getParsedURLHash(o);return P.params&&P.params[p]&&P.params[p][0];}return c.getUrlParameter(p);},findAggregation:function(o,A){if(o){if(o.getMetadata){var m=o.getMetadata();var d=m.getAllAggregations();if(d){return d[A];}}}return undefined;},getAggregation:function(p,A){var o=c.findAggregation(p,A);if(o){return p[o._sGetter]();}return undefined;},getProperty:function(o,p){var m=o.getMetadata().getPropertyLikeSetting(p);if(m){var P=m._sGetter;return o[P]();}return undefined;},getUShellService:function(s){if(s){var o=this.getUshellContainer();if(o){return o.getServiceAsync(s);}}return Promise.resolve();},getUShellServices:function(s){var d=s.map(function(e){return this.getUShellService(e);}.bind(this));return Promise.all(d).then(function(e){return s.reduce(function(m,g,i){m[g]=e&&e[i];return m;},{});});}};return c;},true);
