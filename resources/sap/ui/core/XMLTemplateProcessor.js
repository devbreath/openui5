/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/DataType","sap/ui/base/BindingInfo","sap/ui/core/CustomData","sap/ui/core/Component","./mvc/View","./mvc/ViewType","./mvc/XMLProcessingMode","./mvc/EventHandlerResolver","./ExtensionPoint","./StashedControlSupport","sap/ui/base/SyncPromise","sap/base/Log","sap/base/util/ObjectPath","sap/base/util/values","sap/base/assert","sap/base/util/LoaderExtensions","sap/base/util/JSTokenizer","sap/base/util/each","sap/base/util/isEmptyObject","sap/ui/core/Configuration"],function(e,n,t,r,i,a,o,s,u,l,c,f,d,p,g,m,v,h,w,b){"use strict";function y(t,r,i,a,o){var s=n.parse(r,a,true,false,false,false,o);if(s&&typeof s==="object"){return s}var u=r=typeof s==="string"?s:r;var l=e.getType(t);if(l){if(l instanceof e){u=l.parseValue(r,{context:a,locals:o});if(!l.isValid(u)){f.error("Value '"+r+"' is not valid for type '"+l.getName()+"'.")}}}else{throw new Error("Property "+i+" has unknown type "+t)}return typeof u==="string"?n.escape(u):u}function C(e){return e.localName||e.nodeName}var A="http://www.w3.org/1999/xhtml";var _="http://www.w3.org/2000/xmlns/";var N="http://www.w3.org/2000/svg";var M="sap.ui.core";var x="sap.ui.core.mvc";var V="http://schemas.sap.com/sapui5/extension/sap.ui.core.CustomData/1";var I="http://schemas.sap.com/sapui5/extension/sap.ui.core.support.Support.info/1";var E="http://schemas.sap.com/sapui5/extension/sap.ui.core.xmlcomposite/1";var S="http://schemas.sap.com/sapui5/extension/sap.ui.core.Internal/1";var P="http://schemas.sap.com/sapui5/preprocessorextension/";var R=["controllerName","resourceBundleName","resourceBundleUrl","resourceBundleLocale","resourceBundleAlias"];var T=/^(?:area|base|br|col|embed|hr|img|input|link|meta|param|source|track|wbr)$/;function L(e,n){function t(e,t){var r,i=[];for(var a=0;a<e.childNodes.length;a++){r=n(e,e.childNodes[a],t);if(r){i.push(r.unwrap())}}return c.resolve(i)}function r(e,t){var r=Promise.resolve(),i=[t.chain];for(var a=0;a<e.childNodes.length;a++){r=r.then(n.bind(null,e,e.childNodes[a],t));i.push(r)}return Promise.all(i)}return e?r:t}var X={};X.loadTemplate=function(e,n){var t=e.replace(/\./g,"/")+("."+(n||"view")+".xml");return m.loadResource(t).documentElement};X.loadTemplatePromise=function(e,n){var t=e.replace(/\./g,"/")+("."+(n||"view")+".xml");return m.loadResource(t,{async:true}).then(function(e){return e.documentElement})};X.parseViewAttributes=function(e,n){var t,r;for(t=0;t<e.attributes.length;t++){r=e.attributes[t];if(R.includes(r.name)){n["_"+r.name]=r.value}}};X.enrichTemplateIds=function(e,n){X.enrichTemplateIdsPromise(e,n,false);return e};X.enrichTemplateIdsPromise=function(e,n,t){return j(e,n,true,t).then(function(){return e})};X.parseTemplate=function(e,n,t){return X.parseTemplatePromise(e,n,false,{settings:t}).unwrap()};X.parseTemplatePromise=function(e,n,t,r){return j(e,n,false,t,r).then(function(e){if(n.isA("sap.ui.core.mvc.View")){var t,r;for(r=e.length-1;r>=0;r--){t=e[r];if(t&&t._isExtensionPoint){var i=[r,1].concat(t._aControls);Array.prototype.splice.apply(e,i)}}}return e})};function O(e){var n,t=/^[a-zA-Z_$][a-zA-Z0-9_$]*$/;if(!e||typeof e!=="object"){n="core:require in XMLView can't be parsed to a valid object"}else{Object.keys(e).some(function(r){if(!t.test(r)){n="core:require in XMLView contains invalid identifier: '"+r+"'";return true}if(!e[r]||typeof e[r]!=="string"){n="core:require in XMLView contains invalid value '"+e[r]+"'under key '"+r+"'";return true}})}return n}function B(e,n){var t=e.getAttributeNS(M,"require"),r,i,a;if(t){try{r=v.parseJS(t)}catch(n){f.error("Require attribute can't be parsed on Node: ",e.nodeName);throw n}a=O(r);if(a){throw new Error(a+" on Node: "+e.nodeName)}if(!w(r)){i={};if(n){return new Promise(function(e,n){var t=Object.keys(r).reduce(function(e,n){i[n]=sap.ui.require(r[n]);return e&&i[n]!==undefined},true);if(t){e(i);return}sap.ui.require(p(r),function(){var n=arguments;Object.keys(r).forEach(function(e,t){i[e]=n[t]});e(i)},n)})}else{Object.keys(r).forEach(function(e){i[e]=sap.ui.requireSync(r[e])});return c.resolve(i)}}}}function q(e,n,t){var r=c.resolve();if(!w(t)){var i=[];var a;if(e){r=new Promise(function(e){a=e})}Object.keys(t).forEach(function(e){var r=t[e];r.forEach(function(e){e.targetControl=n;var t=sap.ui.require(e.providerClass);if(t){i.push(t.applyExtensionPoint(e))}else{var r=new Promise(function(n,t){sap.ui.require([e.providerClass],function(e){n(e)},t)}).then(function(n){return n.applyExtensionPoint(e)});i.push(r)}})});if(e){Promise.all(i).then(a)}}return r}function U(e,n,t){var r=t;for(var i=0;i<100;i++){var a=e.lookupNamespaceURI(r);if(a==null||a===n){return r}r=t+i}throw new Error("Could not find an unused namespace prefix after 100 tries, giving up")}function j(e,p,m,v,O){var j=[],k=U(e,S,"__ui5"),F=B(e,v)||c.resolve(),W={openStart:function(e,n){j.push(["openStart",[e,n]])},voidStart:function(e,n){j.push(["voidStart",[e,n]])},style:function(e,n){j.push(["style",[e,n]])},class:function(e){j.push(["class",[e]])},attr:function(e,n){j.push(["attr",[e,n]])},openEnd:function(){j.push(["openEnd"])},voidEnd:function(){j.push(["voidEnd"])},text:function(e){j.push(["text",[e]])},unsafeHtml:function(e){j.push(["unsafeHtml",[e]])},close:function(e){j.push(["close",[e]])},renderControl:function(e){j.push(e)}};v=v&&!!p._sProcessingMode;f.debug("XML processing mode is "+(p._sProcessingMode||"default")+".","","XMLTemplateProcessor");f.debug("XML will be processed "+(v?"asynchronously":"synchronously")+".","","XMLTemplateProcessor");var H=b.getDesignMode();if(H){p._sapui_declarativeSourceInfo={xmlNode:e,xmlRootNode:p._oContainingView===p?e:p._oContainingView._sapui_declarativeSourceInfo.xmlRootNode}}if(!p.isSubView()){e.setAttributeNS(_,"xmlns:"+k,S)}var D=Y(e,F);var K=0;function z(){for(;K<j.length;K++){var e=j[K];if(e&&typeof e.then==="function"){return e.then($).then(z)}}return j}function $(e){var n=[K,1].concat(e);Array.prototype.splice.apply(j,n)}return F.then(z).then(function(n){if(D){var t=e.parentNode;t.removeChild(e);if(t.parentNode){t.parentNode.replaceChild(e,t)}}return n});function J(e){return e}function Z(e){return p._oContainingView.createId(e)}function G(e,n){var t=p.getMetadata().isA("sap.ui.core.mvc.View")?"View":"Fragment";var r=e.outerHTML?e.cloneNode(false).outerHTML:e.textContent;return"Error found in "+t+" (id: '"+p.getId()+"').\nXML node: '"+r+"':\n"+n}function Q(e){var n=C(e),t;if(p.isA("sap.ui.core.mvc.XMLView")&&(e.namespaceURI===A||e.namespaceURI===N)){t=e.ownerDocument.createElementNS(x,"View")}else if(p.isA("sap.ui.core.Fragment")&&(n!=="FragmentDefinition"||e.namespaceURI!==M)){t=e.ownerDocument.createElementNS(M,"FragmentDefinition")}if(t){var r=e.parentNode;if(r){r.replaceChild(t,e)}t.appendChild(e)}return t}function Y(e,n){var t=false,r=p.sViewName||p._sFragmentName,i,a;if(!r){var o=p;var s=0;while(++s<1e3&&o&&o!==o._oContainingView){o=o._oContainingView}r=o.sViewName}i=Q(e);if(i){e=i;t=true}a=C(e);if(p.isA("sap.ui.core.mvc.XMLView")){if(a!=="View"&&a!=="XMLView"||e.namespaceURI!==x){f.error("XMLView's root node must be 'View' or 'XMLView' and have the namespace 'sap.ui.core.mvc'"+(r?" (View name: "+r+")":""))}F=n.then(function(){return re(e,p.getMetadata().getClass(),n,null,{rootArea:true,rootNode:true})})}else{var u=L(v,function(e,n,t){if(n.nodeType===1){return ne(n,t.chain,null,undefined,{rootArea:true})}});F=n.then(function(){return u(e,{chain:n})})}return t}function ee(e,n){var t;var r=sap.ui.getCore().getLoadedLibraries();h(r,function(r,i){if(e===i.namespace||e===i.name){t=i.name+"."+(i.tagNames&&i.tagNames[n]||n)}});t=t||e+"."+n;function i(e){if(!e){f.error("Control '"+t+"' did not return a class definition from sap.ui.define.","","XMLTemplateProcessor");e=d.get(t)}if(!e){f.error("Can't find object class '"+t+"' for XML-view","","XMLTemplateProcessor")}return e}var a=t.replace(/\./g,"/");var o=sap.ui.require(a);if(!o){if(v){return new Promise(function(e,n){sap.ui.require([a],function(n){n=i(n);e(n)},n)})}else{o=sap.ui.requireSync(a);o=i(o)}}return o}function ne(e,n,t,r,i){var a=i&&i.rootArea,o=i&&i.rootNode&&p.isSubView(),s=C(e),u=a&&(p.isA("sap.ui.core.Fragment")||r&&r.name==="content"),l,d;if(e.nodeType===1){if(e.namespaceURI===A||e.namespaceURI===N){if(a){if(r&&r.name!=="content"){f.error(G(e,"XHTML nodes can only be added to the 'content' aggregation and not to the '"+r.name+"' aggregation."));return c.resolve([])}if(i&&i.contentBound){throw new Error(G(e,"No XHTML or SVG node is allowed because the 'content' aggregation is bound."))}var g=e.namespaceURI===A;var h=e.getAttribute("id");if(h!=null){h=ae(p,e)}else{h=o?p.getId():undefined}if(s==="style"){var w=e.attributes;var b=e.textContent;e=document.createElement(s);e.textContent=b;for(d=0;d<w.length;d++){var y=w[d];if(!y.prefix){e.setAttribute(y.name,y.value)}}if(h!=null){e.setAttribute("id",h)}if(o){e.setAttribute("data-sap-ui-preserve",p.getId())}W.unsafeHtml(e.outerHTML);return c.resolve([])}var _=T.test(s);if(_){W.voidStart(s,h)}else{W.openStart(s,h)}for(d=0;d<e.attributes.length;d++){var M=e.attributes[d];if(M.name!=="id"){W.attr(g?M.name.toLowerCase():M.name,M.value)}}if(o){W.attr("data-sap-ui-preserve",p.getId())}if(_){W.voidEnd();if(e.firstChild){f.error("Content of void HTML element '"+s+"' will be ignored")}}else{W.openEnd();var x=e instanceof HTMLTemplateElement?e.content:e;var V=L(v,function(e,n,t){return ne(n,t.chain,t.closestBinding,t.aggregation,t.config)});l=V(x,{chain:n,closestBinding:t,aggregation:r,config:{rootArea:a}});return l.then(function(e){W.close(s);return e.reduce(function(e,n){if(Array.isArray(n)){n.forEach(function(n){e.push(n)})}return e},[])})}}else{var I=e.attributes["id"]?e.attributes["id"].textContent||e.attributes["id"].text:null;if(m){return X.enrichTemplateIdsPromise(e,p,v).then(function(){return[]})}else{var E=function(n){var t={id:I?ae(p,e,I):undefined,xmlNode:e,containingView:p._oContainingView,processingMode:p._sProcessingMode};if(p.fnScopedRunWithOwner){return p.fnScopedRunWithOwner(function(){return new n(t)})}return new n(t)};return n.then(function(){if(v){return new Promise(function(e,n){sap.ui.require(["sap/ui/core/mvc/XMLView"],function(n){e([E(n)])},n)})}else{var e=sap.ui.requireSync("sap/ui/core/mvc/XMLView");return[E(e)]}})}}}else{l=te(e,n,t);if(u){W.renderControl(l)}return l}}else if(e.nodeType===3&&u){if(!i||!i.contentBound){W.text(e.textContent)}else if(e.textContent.trim()){throw new Error(G(e,"Text node isn't allowed because the 'content' aggregation is bound."))}}return c.resolve([])}function te(e,n,t){if(C(e)==="ExtensionPoint"&&e.namespaceURI===M){if(m){return c.resolve([])}else{var r=p instanceof i?p._oContainingView:p;var a=u._factory.bind(null,r,e.getAttribute("name"),function(){var r=c.resolve();var i=[];var a=e.childNodes;for(var o=0;o<a.length;o++){var s=a[o];if(s.nodeType===1){r=r.then(ne.bind(null,s,n,t));i.push(r)}}return c.all(i).then(function(e){var n=[];e.forEach(function(e){n=n.concat(e)});return n})},undefined,undefined,v);return c.resolve(p.fnScopedRunWithOwner?p.fnScopedRunWithOwner(a):a())}}else{var o=C(e);var s=o;var l=o.lastIndexOf(".");if(l>=0){s=o.substring(l+1,o.length)}if(/^[a-z].*/.test(s)){var d=p.sViewName||p._sFragmentName||p.getId();f.warning("View or Fragment '"+d+"' contains a Control tag that starts with lower case '"+s+"'",p.getId(),"sap.ui.core.XMLTemplateProcessor#lowerCase")}var g=ee(e.namespaceURI,o);if(g&&typeof g.then==="function"){return g.then(function(r){return re(e,r,n,t)})}else{return re(e,g,n,t)}}}function re(e,u,d,h,b){var A=e.namespaceURI,_={},N={},x="",T=[],U=null,j=null,k=e.getAttribute("stashed")==="true",F=b&&b.rootArea,W=b&&b.rootNode,D;if(!m){e.removeAttribute("stashed")}if(!u){return c.resolve([])}if(W){_.id=p.getId()}var K=u.getMetadata();var z=K.getAllSettings();var $=!F?B(e,v):undefined;if($){d=c.all([d,$]).then(function(e){return Object.assign({},e[0],e[1])})}d=d.then(function(r){if(w(r)){r=null}D=r;if(!m){for(var i=0;i<e.attributes.length;i++){var a=e.attributes[i],o=a.name,l=a.namespaceURI,c=z[o],d=a.value;if(W&&R.includes(o)){continue}if(o==="id"&&!W){_[o]=ae(p,e,d)}else if(o==="class"){x+=d}else if(o==="viewName"){_[o]=d}else if(o==="fragmentName"){_[o]=d;_["containingView"]=p._oContainingView}else if(o==="binding"&&!c||o==="objectBindings"){if(!k){var v=n.parse(d,p._oContainingView.oController);if(v){_.objectBindings=_.objectBindings||{};_.objectBindings[v.model||undefined]=v}}}else if(o==="metadataContexts"){if(!k){var h=null;try{h=X._calculatedModelMapping(d,p._oContainingView.oController,true)}catch(e){f.error(p+":"+e.message)}if(h){_.metadataContexts=h;if(X._preprocessMetadataContexts){X._preprocessMetadataContexts(u.getMetadata().getName(),_,p._oContainingView.oController)}}}}else if(o.indexOf(":")>-1){l=a.namespaceURI;if(l===V){var b=C(a);T.push(new t({key:b,value:y("any",d,b,p._oContainingView.oController,r)}))}else if(l===I){j=d}else if(l&&l.startsWith(P)){f.debug(p+": XMLView parser ignored preprocessor attribute '"+o+"' (value: '"+d+"')")}else if(l===S&&C(a)==="invisible"){c=z.visible;if(c&&c._iKind===0&&c.type==="boolean"){_.visible=false}}else if(l===M||l===S||o.startsWith("xmlns:")){}else{if(!U){U={}}if(!U.hasOwnProperty(a.namespaceURI)){U[a.namespaceURI]={}}U[a.namespaceURI][C(a)]=a.nodeValue;f.debug(p+": XMLView parser encountered unknown attribute '"+o+"' (value: '"+d+"') with unknown namespace, stored as sap-ui-custom-settings of customData")}}else if(c&&c._iKind===0){_[o]=y(c.type,d,o,p._oContainingView.oController,r)}else if(c&&c._iKind===1&&c.altTypes){if(!k){_[o]=y(c.altTypes[0],d,o,p._oContainingView.oController,r)}}else if(c&&c._iKind===2){if(!k){var v=n.parse(d,p._oContainingView.oController,false,false,false,false,r);if(v){_[o]=v}else{f.error(p+": aggregations with cardinality 0..n only allow binding paths as attribute value (wrong value: "+o+"='"+d+"')")}}}else if(c&&c._iKind===3){if(!k){_[o]=Z(d)}}else if(c&&c._iKind===4){if(!k){_[o]=d.split(/[\s,]+/g).filter(J).map(Z)}}else if(c&&c._iKind===5){if(!k){var A=[];s.parse(d).forEach(function(e){var n=s.resolveEventHandler(e,p._oContainingView.oController,r);if(n){A.push(n)}else{f.warning(p+': event handler function "'+e+'" is not a function or does not exist in the controller.')}});if(A.length){_[o]=A}}}else if(c&&c._iKind===-1){if(K.isA("sap.ui.core.mvc.View")&&o=="async"){_[o]=y(c.type,d,o,p._oContainingView.oController,r)}else{f.warning(p+": setting '"+o+"' for class "+K.getName()+" (value:'"+d+"') is not supported")}}else{g(o==="xmlns",p+": encountered unknown setting '"+o+"' for class "+K.getName()+" (value:'"+d+"')");if(X._supportInfo){X._supportInfo({context:e,env:{caller:"createRegularControls",error:true,info:"unknown setting '"+o+"' for class "+K.getName()}})}}}if(U){T.push(new t({key:"sap-ui-custom-settings",value:U}))}if(T.length>0){_.customData=T}}return r}).catch(function(n){if(!n.isEnriched){n=new Error(G(e,n));n.isEnriched=true;f.error(n)}if(v&&p._sProcessingMode!==o.SequentialLegacy){throw n}});var Q=L(v,Y);function Y(e,n,t){var r=t.aggregation,i=t.allAggregations,a=t.chain,o=t.closestBinding,s=t.config,u,f;if(n.nodeType===1){if(n.namespaceURI===E){_[C(n)]=n.querySelector("*");return undefined}u=n.namespaceURI===A&&i&&i[C(n)];if(u){return Q(n,{aggregation:u,allAggregations:null,chain:a,closestBinding:o,config:s})}else if(r){if(n.getAttribute("stashed")==="true"&&!m){var d=n;n=n.cloneNode();d.removeAttribute("stashed");f=function(){var t=ae(p,n);l.createStashedControl({wrapperId:t,fnCreate:function(){var n=v;v=false;try{return Y(e,d,{aggregation:r,allAggregations:i,chain:c.resolve(D),closestBinding:o}).unwrap()}finally{v=n}}})};if(p.fnScopedRunWithOwner){p.fnScopedRunWithOwner(f)}else{f()}n.removeAttribute("visible");ie(n,"invisible")}if(_[r.name]&&typeof _[r.name].path==="string"){o={aggregation:r.name,id:_.id};if(W&&r.name==="content"){s=s||{};s.contentBound=true}}return ne(n,a,o,r,s).then(function(e){for(var n=0;n<e.length;n++){var t=e[n];var i=r.name;if(t._isExtensionPoint){if(!_[i]){_[i]=[]}var a=N[i];if(!a){a=N[i]=[]}t.index=_[i].length;t.aggregationName=i;t.closestAggregationBindingCarrier=o&&o.id;t.closestAggregationBinding=o&&o.aggregation;var s=a[a.length-1];if(s){s._nextSibling=t}a.push(t)}else if(r.multiple){if(!_[i]){_[i]=[]}if(typeof _[i].path==="string"){g(!_[i].template,"list bindings support only a single template object");_[i].template=t}else{_[i].push(t)}}else{g(!_[i],"multiple aggregates defined for aggregation with cardinality 0..1");_[i]=t}}return e})}else{throw new Error(G(n,"Cannot add direct child without default aggregation defined for control "+K.getElementName()))}}else if(n.nodeType===3){if(s&&s.rootArea){ne(n,a,o,r,s)}else{var h=n.textContent||n.text;if(h&&h.trim()){throw new Error(G(n,"Cannot add text nodes as direct child of an aggregation. For adding text to an aggregation, a surrounding html tag is needed."))}}}}var ee=K.getDefaultAggregation();var te=K.getAllAggregations();return Q(e,{aggregation:ee,allAggregations:te,chain:d,closestBinding:h,config:b}).then(function(){var n;var t=c.resolve();var o=c.resolve();var s=e.getAttribute("type");var l=r.getOwnerComponentFor(p);var f=l&&l.isA("sap.ui.core.IAsyncContentCreation");if(m){if(!F&&e.hasAttribute("id")){oe(p,e)}}else if(!W&&u.getMetadata().isA("sap.ui.core.mvc.View")){var d=function(){if(!u._sType&&!_.viewName){_.viewName="module:"+u.getMetadata().getName().replace(/\./g,"/")}if(f&&v){if(_.async===false){throw new Error("A nested view contained in a Component implementing 'sap.ui.core.IAsyncContentCreation' is processed asynchronously by default and cannot be processed synchronously.\n"+"Affected Component '"+l.getMetadata().getComponentName()+"' and View '"+_.viewName+"'.")}_.type=u._sType||s;o=i.create(_)}else{if(u.getMetadata().isA("sap.ui.core.mvc.XMLView")&&p._sProcessingMode){_.processingMode=p._sProcessingMode}return i._create(_,undefined,u._sType||s)}};if(p.fnScopedRunWithOwner){n=p.fnScopedRunWithOwner(d)}else{n=d()}}else if(u.getMetadata().isA("sap.ui.core.Fragment")&&v){if(s!==a.JS){_.processingMode=p._sProcessingMode}var g="sap/ui/core/Fragment";var h=sap.ui.require(g);_.name=_.name||_.fragmentName;if(h){o=h.load(_)}else{o=new Promise(function(e,n){sap.ui.require([g],function(n){n.load(_).then(function(n){e(n)})},n)})}}else{var w=function(){var e;if(W){e=p;if(!v){if(O&&O.settings){Object.keys(_).forEach(function(e){if(O.settings.hasOwnProperty(e)){O.settings[e]=_[e];delete _[e]}})}}p.applySettings(_)}else if(p.fnScopedRunWithOwner){e=p.fnScopedRunWithOwner(function(){var e=new u(_);return e})}else{e=new u(_)}t=q(v,e,N);return e};if(O&&O.fnRunWithPreprocessor){n=O.fnRunWithPreprocessor(w)}else{n=w()}}return o.then(function(e){return e||n}).then(function(n){if(x&&n.addStyleClass){n.addStyleClass(x)}if(!n){n=[]}else if(!Array.isArray(n)){n=[n]}if(X._supportInfo&&n){for(var r=0,i=n.length;r<i;r++){var a=n[r];if(a&&a.getId()){var o=X._supportInfo({context:e,env:{caller:"createRegularControls",nodeid:e.getAttribute("id"),controlid:a.getId()}}),s=j?j+",":"";s+=o;X._supportInfo.addSupportInfo(a.getId(),s)}}}if(H){n.forEach(function(n){if(K.getCompositeAggregationName){var t=e.getElementsByTagName(n.getMetadata().getCompositeAggregationName());for(var r=0;r<t.length;r++){e.removeChild(t[0])}}n._sapui_declarativeSourceInfo={xmlNode:e,xmlRootNode:p._sapui_declarativeSourceInfo.xmlRootNode,fragmentName:K.getName()==="sap.ui.core.Fragment"?_["fragmentName"]:null}})}return t.then(function(){return n})})})}function ie(e,n){var t=U(e,S,k);e.setAttributeNS(S,t+":"+n,"true")}function ae(e,n,t){if(n.getAttributeNS(S,"id")){return n.getAttribute("id")}else{return Z(t?t:n.getAttribute("id"))}}function oe(e,n){n.setAttribute("id",Z(n.getAttribute("id")));ie(n,"id")}}X._preprocessMetadataContexts=null;X._calculatedModelMapping=function(e,t,r){var i,a={},o=n.parse(e,t);function s(e){if(e.length%2===0){throw new Error("The last entry is no binding")}for(var n=1;n<=e.length;n=n+2){if(typeof e[n-1]=="string"){throw new Error("Binding expected not a string")}if(e[n]){if(typeof e[n]!="string"||e[n]!=","){throw new Error("Missing delimiter ','")}}}}if(o){if(!o.formatter){i=o;o={parts:[i]}}else{s(o.formatter.textFragments)}for(var u=0;u<o.parts.length;u++){i=o.parts[u];a[i.model]=a[i.model]||(r?[]:null);if(Array.isArray(a[i.model])){a[i.model].push(i)}else{a[i.model]=i}}}return a};return X},true);
//# sourceMappingURL=XMLTemplateProcessor.js.map