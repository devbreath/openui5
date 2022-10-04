/*!
* OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["sap/base/util/merge","sap/base/strings/capitalize","sap/base/Log","sap/ui/test/Opa5","sap/ui/test/actions/Action","sap/ui/test/actions/Press","sap/ui/test/actions/EnterText","sap/ui/test/matchers/Matcher","sap/ui/test/matchers/MatcherFactory","sap/ui/test/pipelines/MatcherPipeline","sap/ui/test/pipelines/ActionPipeline"],function(t,n,e,r,i,o,u,s,a,c,f){"use strict";function p(){return t.apply(this,[{}].concat(Array.prototype.slice.call(arguments)))}function h(t,n,e){var r=Array.isArray(n)?n:[n];return r.reduce(function(n,r){if(n){return true}if(r===null||r===undefined){return t===r}if(t===null||t===undefined){return!!e}if(typeof r==="function"){if(r===Boolean){return typeof t==="boolean"}if(r===Array){return Array.isArray(t)}if(r===String){return typeof t==="string"||t instanceof String}if(r===Object){return typeof t==="object"&&t.constructor===Object}return t instanceof r}return typeof t===r},false)}function l(t){return Object.prototype.toString.call(t)==="[object Arguments]"}function d(t){var n=Array.prototype.slice.call(arguments,1);if(n.length===1&&l(n[0])){n=Array.prototype.slice.call(n[0],0)}return t.reduce(function(t,e){if(h(n[0],e,true)){t.push(n.shift())}else{t.push(undefined)}return t},[])}function g(t,n,e){if(n===undefined){n=[]}else if(!Array.isArray(n)){n=[n]}else{n=n.slice(0)}if(Array.isArray(t)){n=e?t.slice(0).concat(n):n.concat(t)}else if(t!==undefined){if(e){n.unshift(t)}else{n.push(t)}}return n}function y(t,n,e){if(!h(t,Function)){throw new Error("not a function")}if(!h(n,Function)){return t}if(e){return function(e){return n(e)&&t(e)}}return function(e){n(e);t(e)}}function m(t){if(h(t,B)){return function(){return t.execute()}}if(!h(t,Function)){return function(){r.assert.ok(true,t||"Success")}}return t}function A(t){var n="";n+=t.controlType||"Control";n+="#"+(t.id||"<undefined>");n+=t.matchers?" with "+(h(t.matchers,Array)?t.matchers.length:1)+" additional matcher(s)":"";n+=" not found";return n}function v(t,e){if(!t){return null}var r=t["get"+n(e,0)];if(!r){throw new Error("Object '"+t+"' does not have an aggregation called '"+e+"'")}return r.call(t)}function O(t,n){if(t&&n){E.process({actions:t,control:n})}}function b(t,n){return F.process({matchers:I.getFilteringMatchers({matchers:t}),control:n})}function M(t){var n=t.indexOf(">"),e=n===-1?undefined:t.substring(0,n),r=n===-1?t:t.substring(n+1);return{model:e,path:r}}function w(t){if(h(t,Boolean)){return t?B.Matchers.TRUE:B.Matchers.FALSE}return B.Matchers.match(t)}var x={autoWait:true,visible:true},I=new a,F=new c,E=new f;var B=function(t,n){var e=d([r,Object],t,n);this._oOpaInstance=e[0];return this.options(x,e[1])};B.defaultOptions=function(t){if(arguments.length>0){x=p(t)}return p(x)};B.create=function(t,n,e,o,u,a,c){var f=d([r,[String,RegExp],String,Boolean,[s,Function,Array,Object],[i,Function,Array],Object],t,n,e,o,u,a,c);return new B(f[0]).hasId(f[1]).hasType(f[2]).isDialogElement(!!f[3]).has(f[4]).do(f[5]).options(f[6])};B.prototype.options=function(t){this._oOptions=p.apply(this,[this._oOptions].concat(Array.prototype.slice.call(arguments)));return this};B.prototype.viewId=function(t){return this.options({viewId:t})};B.prototype.viewName=function(t){return this.options({viewName:t})};B.prototype.viewNamespace=function(t){return this.options({viewNamespace:t})};B.prototype.fragmentId=function(t){return this.options({fragmentId:t})};B.prototype.timeout=function(t){return this.options({timeout:t})};B.prototype.debugTimeout=function(t){return this.options({debugTimeout:t})};B.prototype.pollingInterval=function(t){return this.options({pollingInterval:t})};B.prototype.hasId=function(t){return this.options({id:t})};B.prototype.hasType=function(t){return this.options({controlType:t})};B.prototype.has=function(t,n){return this.options({matchers:n?t:g(t,this._oOptions.matchers)})};B.prototype.hasProperties=function(t){return this.has(B.Matchers.properties(t))};B.prototype.hasI18NText=function(t,n,e){return this.has(B.Matchers.i18n.apply(B.Matchers,arguments))};B.prototype.hasAggregation=function(t,n){return this.has(B.Matchers.aggregationMatcher(t,n))};B.prototype.hasAggregationProperties=function(t,n){return this.hasAggregation(t,B.Matchers.properties(n))};B.prototype.hasAggregationLength=function(t,n){return this.has(B.Matchers.aggregationLength(t,n))};B.prototype.hasChildren=function(t,n){return this.has(B.Matchers.childrenMatcher(t,n))};B.prototype.hasConditional=function(t,n,e){return this.has(B.Matchers.conditional(t,n,e))};B.prototype.hasSome=function(t){return this.has(B.Matchers.some.apply(B.Matchers,arguments))};B.prototype.mustBeEnabled=function(t){return this.options({enabled:arguments.length?!!t:true})};B.prototype.mustBeVisible=function(t){return this.options({visible:arguments.length?!!t:true})};B.prototype.mustBeReady=function(t){return this.options({autoWait:arguments.length?!!t:true})};B.prototype.isDialogElement=function(t){return this.options({searchOpenDialogs:arguments.length?!!t:true})};B.prototype.check=function(t,n){return this.options({check:n?t:y(t,this._oOptions.check,true)})};B.prototype.checkNumberOfMatches=function(t){return this.check(function(n){if(!n){return t===0}if(!h(n,Array)){n=[n]}return n.length===t})};B.prototype.do=function(t,n){if(h(t,B)){e.error("(deprecated) OpaBuilder instance is incorrectly used in .do function - use .success instead");return this.success(t)}return this.options({actions:n?t:g(t,this._oOptions.actions)})};B.prototype.doConditional=function(t,n,r){if(h(n,B)||h(r,B)){e.error("(deprecated) OpaBuilder instance is incorrectly used in .doConditional function - use .success instead");return this.success(B.Actions.conditional(t,n,r))}return this.do(B.Actions.conditional(t,n,r))};B.prototype.doPress=function(t){return this.do(B.Actions.press(t))};B.prototype.doEnterText=function(t,n,e,r,i){return this.do(B.Actions.enterText(t,n,e,r,i))};B.prototype.doOnAggregation=function(t,n,e){if(arguments.length<3){e=n;n=undefined}var r=B.Matchers.filter(n),i=O.bind(this,e);return this.do(function(n){r(v(n,t)).forEach(i)})};B.prototype.doOnChildren=function(t,n,e){var r=d([[s,Function,Array,Object,B],[i,Function,Array],Boolean],t,n,e);t=r[0];n=r[1];e=r[2];if(!h(t,B)){t=new B(this.getOpaInstance()).has(r[0])}if(n){t.do(n)}return this.do(function(n){var r=t.build(),i=B.Matchers.children(t,e)(n);return B.Actions.executor(r.actions)(i)})};B.prototype.description=function(t){return this.success(t+" - OK").error(t+" - FAILURE")};B.prototype.success=function(t,n){var e=m(t);return this.options({success:n?e:y(e,this._oOptions.success)})};B.prototype.error=function(t,n){if(h(t,String)){return this.options({errorMessage:t})}return this.options({error:n?t:y(t,this._oOptions.error)})};B.prototype.build=function(){if(!this._oOptions.errorMessage){this.error(A(this._oOptions))}return p(this._oOptions)};B.prototype.execute=function(t){if(h(t,r)){this.setOpaInstance(t)}return this.getOpaInstance().waitFor(this.build())};B.prototype.setOpaInstance=function(t){if(!h(t,r,true)){throw new Error("Opa5 instance expected")}this._oOpaInstance=t};B.prototype.getOpaInstance=function(){if(!h(this._oOpaInstance,r)){this.setOpaInstance(new r)}return this._oOpaInstance};B.Matchers={TRUE:function(){return true},FALSE:function(){return false},not:function(t){var n=B.Matchers.match(t);return function(t){return!n(t)}},ancestor:function(t,n){return{ancestor:[[t,n]]}},descendant:function(t,n){return{descendant:[[t,n]]}},properties:function(t){return{properties:t}},i18n:function(t,n,e){var r=M(n),i=r.model||"i18n",o=r.path;if(arguments.length>3||e&&!Array.isArray(e)){e=Array.prototype.slice.call(arguments,2)}return{i18NText:{propertyName:t,modelName:i,key:o,parameters:e}}},resourceBundle:function(t,n,e,r){if(arguments.length>4||r&&!Array.isArray(r)){r=Array.prototype.slice.call(arguments,3)}return function(i){var o=sap.ui.getCore().getLibraryResourceBundle(n),u=o.getText(e,r),s={};s[t]=u;return b({properties:s},i)}},labelFor:function(t,n,e,r){var i=3,o;if(!h(n,Boolean)){i=2;r=e;e=n;n=false}if(n){return{labelFor:{propertyName:t,text:e}}}o=M(e);if(arguments.length>i+1||r&&!Array.isArray(r)){r=Array.prototype.slice.call(arguments,i)}return{labelFor:{propertyName:t,modelName:o.model||"i18n",key:o.path,parameters:r}}},children:function(t,n){var e=d([[s,Function,Array,Object,B],Boolean],t,n);t=e[0];n=e[1];if(!h(t,B)){t=(new B).has(t)}return function(e){var i=t.build(),o=r.getPlugin().getMatchingControls(i),u=g(B.Matchers.ancestor(e,n),i.matchers,true);return B.Matchers.filter(u)(o)}},childrenMatcher:function(t,n){var e=B.Matchers.children(t,n);return function(t){return e(t).length>0}},aggregation:function(t,n){var e=B.Matchers.filter(n);return function(n){return e(v(n,t))}},aggregationMatcher:function(t,n){var e=B.Matchers.aggregation(t,n);return function(t){return e(t).length>0}},aggregationLength:function(t,n){return{aggregationLengthEquals:{name:t,length:n}}},aggregationAtIndex:function(t,n){return function(e){var r=v(e,t);return r&&n<r.length?r[n]:undefined}},bindingProperties:function(t,n){if(!n){n=t;t=undefined}return function(e){var r=e.getBindingContext(t)||e.getModel(t),i,o,u=false;if(!r){return false}if(r.isA("sap.ui.model.Model")){u=true}for(i in n){o=r.getProperty(u?"/"+i:i);if(o!==n[i]){return false}}return true}},bindingPath:function(t,n){var e=M(t);return{bindingPath:{modelName:e.model,path:e.path,propertyPath:n}}},customData:function(t){if(!t){return B.Matchers.TRUE}return function(n){if(!n||typeof n.data!=="function"){return false}return Object.keys(t).reduce(function(e,r){return e&&n.data(r)===t[r]},true)}},conditional:function(t,n,e){var r=w(t);return function(t){if(r(t)){return b(n,t)}return e?b(e,t):true}},focused:function(t){return function(n){var e=n&&n.isA("sap.ui.core.Element")&&n.$();return e&&(e.is(":focus")||e.hasClass("sapMFocus")||t&&e.find(":focus").length>0)||false}},some:function(t){if(t.length>1||t&&!Array.isArray(t)){t=Array.prototype.slice.call(arguments,0)}return function(n){var e=false;if(t.some(function(t){e=b(t,n);return e})){return e}return false}},filter:function(t){return function(n){if(n===null||n===undefined){return[]}if(!h(n,Array)){n=[n]}return b(t,n)||[]}},match:function(t){return function(n){if(n===null||n===undefined){return false}var e=b(t,[n]);return e.length?e[0]:false}}};B.Actions={press:function(t){return new o({idSuffix:t})},enterText:function(t,n,e,r,i){var o=d([String,Boolean,Boolean,Boolean,String],arguments);return new u({text:o[0],clearTextFirst:o[1],keepFocus:o[2],pressEnterKey:o[3],idSuffix:o[4]})},conditional:function(t,n,e){var r=w(t),i=n,o=e;if(h(n,B)){i=function(){return n.execute()}}if(e&&h(e,B)){o=function(){return e.execute()}}return function(t){if(r(t)){return O(i,t)}else if(o){return O(o,t)}}},executor:function(t){return function(n){if(!n){return}if(h(n,Array)){return n.map(function(n){return O(t,n)})}return O(t,n)}}};return B});
//# sourceMappingURL=OpaBuilder.js.map