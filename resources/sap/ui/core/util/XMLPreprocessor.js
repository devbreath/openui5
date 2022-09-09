/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/util/deepExtend","sap/base/util/JSTokenizer","sap/base/util/ObjectPath","sap/ui/base/BindingParser","sap/ui/base/ManagedObject","sap/ui/base/SyncPromise","sap/ui/core/Component","sap/ui/core/XMLTemplateProcessor","sap/ui/model/BindingMode","sap/ui/model/CompositeBinding","sap/ui/model/Context","sap/ui/performance/Measurement"],function(e,t,n,r,i,o,a,u,s,f,c,l,d){"use strict";var g="http://schemas.sap.com/sapui5/extension/sap.ui.core.template/1",p="sap.ui.core.util.XMLPreprocessor",m=[p],h=p+"/getResolvedBinding",v=p+"/insertFragment",b=p+".process",y=a.resolve(),x=a.resolve(true),w=Object.prototype.toString,C={},N=o.extend("sap.ui.core.util._with",{metadata:{library:"sap.ui.core",properties:{any:"any"},aggregations:{child:{multiple:false,type:"sap.ui.core.util._with"}}},updateProperty:function(){this.setAny(this.mBindingInfos.any.binding.getExternalValue())}}),A=N.extend("sap.ui.core.util._repeat",{metadata:{library:"sap.ui.core",aggregations:{list:{multiple:true,type:"n/a",_doesNotRequireFactory:true}}},updateList:function(){}});function M(e,t,n,r){function i(t){if(!r){r=e.getBinding("any");if(r instanceof c){r=r.getBindings();if(n!==undefined){r=r[n]}}}return Array.isArray(r)?r[t]:r}function o(e){return e instanceof l?e.getPath():e.getModel().resolve(e.getPath(),e.getContext())}return{_slice:function(e,n){i(0);return!e&&n>=r.length?this:M(null,t,undefined,r.slice(e,n))},getInterface:function(e,n){var o,a,u;if(typeof e==="string"){n=e;e=undefined}i();if(Array.isArray(r)){if(e>=0&&e<r.length){a=r[e]}else{throw new Error("Invalid index of part: "+e)}}else if(e!==undefined){throw new Error("Not the root formatter of a composite binding")}else if(n){a=r}else{throw new Error("Missing path")}if(n){u=a.getModel();if(n.charAt(0)!=="/"){o=a instanceof l?a:u.createBindingContext(a.getPath(),a.getContext())}a=u.createBindingContext(n,o);if(!a){throw new Error("Model could not create binding context synchronously: "+u)}}return M(null,t,undefined,a)},getModel:function(e){var t=i(e);return t&&t.getModel()},getPath:function(e){var t=i(e);return t&&o(t)},getSetting:function(e){if(e==="bindingContexts"||e==="models"){throw new Error("Illegal argument: "+e)}return t[e]}}}function E(e,t,n,r,i){var o=false;function u(t,u){var s=t.formatter,c,l=t.model;if(t.path&&t.path.indexOf(">")>0){l=t.path.slice(0,t.path.indexOf(">"))}c=e.getModel(l);if(s&&s.requiresIContext===true){s=t.formatter=s.bind(null,M(e,n,u))}if(s&&i&&(c&&c.$$valueAsPromise||u===undefined&&o)){t.formatter=function(){var e=this;return a.all(arguments).then(function(t){return s.apply(e,t)})};t.formatter.textFragments=s.textFragments}t.mode=f.OneTime;t.parameters=t.parameters||{};t.parameters.scope=r;if(i&&c&&c.$$valueAsPromise){o=t.parameters.$$valueAsPromise=true}}try{if(t.parts){t.parts.forEach(u)}u(t);e.bindProperty("any",t);return e.getBinding("any")?a.resolve(e.getAny()):null}catch(e){return a.reject(e)}finally{e.unbindProperty("any",true)}}function P(e,t){var n=-1;function r(i){if(i){return e[n]}n+=1;if(n<e.length){return t(e[n],n,e).then(r)}}return e.length?r():y}function B(e){var t,n=e.attributes,r="<"+e.nodeName,i,o;for(i=0,o=n.length;i<o;i+=1){t=n.item(i);r+=" "+t.name+'="'+t.value+'"'}return r+(e.childNodes.length?">":"/>")}function I(e,t){return t.visitNode(e)}return{plugIn:function(t,n,r){var i=C[n];if(t!==null&&typeof t!=="function"||t===I){throw new Error("Invalid visitor: "+t)}if(!n||n===g||n==="sap.ui.core"||n.indexOf(" ")>=0){throw new Error("Invalid namespace: "+n)}e.debug("Plug-in visitor for namespace '"+n+"', local name '"+r+"'",t,p);if(r){n=n+" "+r;i=C[n]||i}C[n]=t;return i||I},visitNodeWrapper:I,process:function(o,c,M){var I=c.caller,F=e.isLoggable(e.Level.DEBUG,p),j=F,O=c.name,R={},S,$=0,L={},U=c._supportInfo,T=e.isLoggable(e.Level.WARNING,p);function q(e){return{find:function(e,t){try{return a.resolve(P(e,t))}catch(e){return a.reject(e)}},getContext:function(t){var n,r,o;t=t||"";if(t[0]==="{"){throw new Error("Must be a simple path, not a binding: "+t)}n=i.simpleParser("{"+t+"}");r=e.getModel(n.model);if(!r){throw new Error("Unknown model '"+n.model+"': "+t)}o=r.resolve(n.path,e.getBindingContext(n.model));if(!o){throw new Error("Cannot resolve path: "+t)}return r.createBindingContext(o)},getResult:function(t,n){return z(t,n,e,true)},getSettings:function(){return M},getViewInfo:function(){return t({},c)},insertFragment:function(t,n){return G(t,n,e)},visitAttribute:function(t,n){return ie(t,n,e)},visitAttributes:function(t){return oe(t,e)},visitChildNodes:function(t){return ae(t,e)},visitNode:function(t){try{return ue(t,e)}catch(e){return a.reject(e)}},with:function(t,n){var r,i=false,o,a=new N;if(!n){e.setChild(a)}for(o in t){r=t[o];i=true;a.setModel(r.getModel(),o);a.bindObject({model:o,path:r.getPath()})}return i||n?q(a):this}}}function k(t){if(F){e.debug(J()+Array.prototype.slice.call(arguments,1).join(" "),t&&B(t),p)}}function _(t){if(F){e.debug(J()+"Finished","</"+t.nodeName+">",p)}}function D(t,n){t=t+B(n);e.error(t,I,p);throw new Error(I+": "+t)}function X(e){var t,n=Array.prototype.filter.call(e.childNodes,a),r,i,o=false;function a(e){return e.nodeType===1}function u(e,t){return e.namespaceURI===g&&e.localName===t}if(!n.length||!u(n[0],"then")){return null}for(r=1,i=n.length;r<i;r+=1){t=n[r];if(o){D("Expected </"+e.prefix+":if>, but instead saw ",t)}if(u(t,"else")){o=true}else if(!u(t,"elseif")){D("Expected <"+e.prefix+":elseif> or <"+e.prefix+":else>, but instead saw ",n[r])}}return n}function J(){return($<10?"[ ":"[")+$+"] "}function W(e){return e&&e.charAt(0)==="."?r.get(e.slice(1),L):r.get(e||"",L)||r.get(e||"")}function z(e,t,n,r,o){var u,s;d.average(h,"",m);try{u=i.complexParser(e,L,r,true,true,true)||e}catch(e){return a.reject(e)}if(u.functionsNotFound){if(r){se(t,"Function name(s)",u.functionsNotFound.join(", "),"not found")}d.end(h);return null}if(typeof u==="object"){s=E(n,u,M,L,!c.sync);if(r&&!s){se(t,"Binding not ready")}else if(c.sync&&s&&s.isPending()){D("Async formatter in sync view in "+e+" of ",t)}}else{s=a.resolve(u);if(o){o()}}d.end(h);return s}function G(e,t,n){var r,i=c.sync?s.loadTemplate:s.loadTemplatePromise,o=O;n.$mFragmentContexts=n.$mFragmentContexts||{};if(n.$mFragmentContexts[e]){D("Cyclic reference to fragment '"+e+"' ",t)}$++;k(t,"fragmentName =",e);n.$mFragmentContexts[e]=true;O=e;d.average(v,"",m);r=R[e];if(!r){R[e]=r=a.resolve(i(e,"fragment"))}return r.then(function(e){e=t.ownerDocument.importNode(e,true);d.end(v);return K(e).then(function(){if(e.namespaceURI==="sap.ui.core"&&e.localName==="FragmentDefinition"){return V(e,n,t)}t.parentNode.insertBefore(e,t);return ue(e,n)})}).then(function(){t.parentNode.removeChild(t);O=o;n.$mFragmentContexts[e]=false;_(t);$-=1})}function V(e,t,n){return ae(e,t).then(function(){var t;n=n||e;while(t=e.firstChild){n.parentNode.insertBefore(t,n)}})}function H(e,t){var n=se.bind(null,e,"Constant test condition"),r=z(e.getAttribute("test"),e,t,true,n)||a.resolve(false);return r.catch(function(t){se(e,"Error in formatter:",t)}).then(function(t){var n=!!t&&t!=="false";if(F){if(typeof t==="string"){t=JSON.stringify(t)}else if(t===undefined){t="undefined"}else if(Array.isArray(t)){t="[object Array]"}k(e,"test ==",t,"--\x3e",n)}return n})}function K(e){var t={},r=e.getAttributeNodeNS(g,"require"),i,o;function u(){return new a(function(e,t){var n=o.map(sap.ui.require);if(n.every(Boolean)){e(n)}else{sap.ui.require(o,function(){e(arguments)},t)}}).then(function(e){Object.keys(t).forEach(function(t,n){L[t]=e[n]})})}if(r&&r.value){i=r.value;e.removeAttributeNode(r);if(i[0]==="{"){t=n.parseJS(i);o=Object.keys(t).map(function(e){return t[e]});return u()}o=i.split(" ").map(function(e){return e.replace(/\./g,"/")});if(!c.sync){return u()}o.forEach(sap.ui.requireSync)}return y}function Q(e,t,n){var r=z(t.value,e,n,false);if(!r){k(e,"Binding not ready for attribute",t.name);return y}return r.then(function(n){if(n===undefined){k(e,"Removed attribute",t.name);e.removeAttributeNode(t)}else if(n!==t.value){switch(typeof n){case"boolean":case"number":case"string":k(e,t.name,"=",n);t.value=n;break;default:k(e,"Ignoring",w.call(n),"value for attribute",t.name)}}},function(n){k(e,"Error in formatter of attribute",t.name,n)})}function Y(e,t){var n=e.getAttribute("name"),r,i,o=e.getAttribute("value");if(n&&n[0]==="."){n=n.slice(1)}if(!n||n.includes(".")){D("Missing proper relative name in ",e)}r=W(o);if(!r){D("Invalid value in ",e)}i=L[n];L[n]=r;return V(e,t).then(function(){e.parentNode.removeChild(e);L[n]=i})}function Z(e,t){var n=e.getAttribute("name"),r=z(n,e,t,true);if(!r){return x}return r.then(function(r){var i;if(r!==n){k(e,"name =",r)}i=u.getCustomizing(c.componentId,{extensionName:r,name:O,type:"sap.ui.viewExtensions"});if(i&&i.className==="sap.ui.core.Fragment"&&i.type==="XML"){return G(i.fragmentName,e,t)}return true},function(t){se(e,"Error in formatter:",t);return true})}function ee(e,t){var n=e.getAttribute("fragmentName"),r=z(n,e,t,true);if(!r){return y}return r.then(function(n){var r=L;L=Object.create(L);return G(n,e,t).then(function(){L=r})},function(t){se(e,"Error in formatter:",t)})}function te(e,t){$++;return P(X(e)||[e],function(n){if(n.localName==="else"){return x}if(n.localName==="then"){n=e}return H(n,t)}).then(function(n){return(n?V(n,t,e):y).then(function(){e.parentNode.removeChild(e);_(e);$-=1})})}function ne(e,t){var n=e.getAttribute("list")||"",r=i.complexParser(n,L,false,true,true,true),o,u,s,l,d,g=e.getAttribute("var");if(g===""){D("Missing variable name for ",e)}if(!r){D("Missing binding for ",e)}if(r.functionsNotFound){se(e,"Function name(s)",r.functionsNotFound.join(", "),"not found")}l=new A;t.setChild(l);r.mode=f.OneTime;l.bindAggregation("list",r);u=l.getBinding("list");l.unbindAggregation("list",true);s=r.model;if(!u){D("Missing model '"+s+"' in ",e)}u.enableExtendedChangeDetection();o=u.getContexts(r.startIndex,r.length||Infinity);if(!c.sync&&o.dataRequested){d=new a(function(e){u.attachEventOnce("change",e)}).then(function(){return u.getContexts(r.startIndex,r.length)})}else{d=a.resolve(o)}g=g||s;l.setModel(u.getModel(),g);$++;k(e,"Starting");return d.then(function(t){return P(t,function(n,r){var i=r===t.length-1?e:e.cloneNode(true);l.setBindingContext(n,g);k(e,g,"=",n.getPath());return V(i,l,e)}).then(function(){_(e);$-=1;e.parentNode.removeChild(e)})})}function re(e,t){var n,r,o,u,s=e.getAttribute("helper"),f,d=e.getAttribute("path"),g,p,m=e.getAttribute("var");if(m===""){D("Missing variable name for ",e)}o=new N;t.setChild(o);n=i.simpleParser("{"+d+"}");m=m||n.model;if(s||m){r=t.getModel(n.model);if(!r){D("Missing model '"+n.model+"' in ",e)}p=r.resolve(n.path,t.getBindingContext(n.model));if(!p){D("Cannot resolve path for ",e)}f=r.createBindingContext(p);if(s){u=W(s);if(typeof u!=="function"){D("Cannot resolve helper for ",e)}f=u(f)}g=a.resolve(f);if(c.sync&&g.isPending()){D("Async helper in sync view in ",e)}g=g.then(function(t){if(t instanceof l){r=t.getModel();p=t.getPath()}else if(t!==undefined){if(typeof t!=="string"||t===""){D("Illegal helper result '"+t+"' in ",e)}p=t}o.setModel(r,m);o.bindObject({model:m,path:p})})}else{p=d;o.bindObject(p);g=y}return g.then(function(){$++;k(e,m,"=",p);if(o.getBindingContext(m)===t.getBindingContext(m)){se(e,"Set unchanged path:",p);o=t}return V(e,o).then(function(){e.parentNode.removeChild(e);_(e);$-=1})})}function ie(e,t,n){if(U){U({context:undefined,env:{caller:"visitAttribute",before:{name:t.name,value:t.value}}})}return Q(e,t,n).then(function(){if(U){U({context:undefined,env:{caller:"visitAttribute",after:{name:t.name,value:t.value}}})}})}function oe(e,t){function n(e,t){return e.name.localeCompare(t.name)}return P(Array.prototype.slice.apply(e.attributes).sort(n),function(n){return ie(e,n,t)})}function ae(e,t){return P(Array.prototype.slice.apply(e.childNodes),function(e){return ue(e,t)})}function ue(e,t){var n;function r(){return oe(e,t).then(function(){return ae(e,t)}).then(function(){if(U){U({context:e,env:{caller:"visitNode",after:{name:e.tagName}}})}})}if(e.nodeType!==1){return y}if(U){U({context:e,env:{caller:"visitNode",before:{name:e.tagName}}})}if(e.namespaceURI===g){switch(e.localName){case"alias":return Y(e,t);case"if":return te(e,t);case"repeat":return ne(e,t);case"with":return re(e,t);default:D("Unexpected tag ",e)}}else if(e.namespaceURI==="sap.ui.core"){switch(e.localName){case"ExtensionPoint":return Z(e,t).then(function(e){if(e){return r()}});case"Fragment":if(e.getAttribute("type")==="XML"){return ee(e,t)}break}}else{n=C[e.namespaceURI+" "+e.localName]||C[e.namespaceURI];if(n){$++;k(e,"Calling visitor");return n(e,q(t)).then(function(t){if(t!==undefined){D("Unexpected return value from visitor for ",e)}_(e);$-=1})}}return r()}function se(t){if(T){if(!j){j=true;e.warning("Warning(s) during processing of "+I,null,p)}e.warning(J()+Array.prototype.slice.call(arguments,1).join(" "),t&&B(t),p)}}d.average(b,"",m);M=M||{};if(F){k(undefined,"Start processing",I);if(M.bindingContexts instanceof l){k(undefined,"undefined =",M.bindingContexts)}else{for(S in M.bindingContexts){k(undefined,S,"=",M.bindingContexts[S])}}}if(U){U({context:o,env:{caller:"view",viewinfo:t({},c),settings:t({},M),clone:o.cloneNode(true),type:"template"}})}return K(o).then(function(){return ue(o,new N({models:M.models,bindingContexts:M.bindingContexts}))}).then(function(){k(undefined,"Finished processing",I);d.end(b);return o}).unwrap()}}},true);
//# sourceMappingURL=XMLPreprocessor.js.map