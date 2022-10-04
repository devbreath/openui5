/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ExpressionParser","sap/ui/model/BindingMode","sap/ui/model/Filter","sap/ui/model/Sorter","sap/base/Log","sap/base/util/JSTokenizer","sap/base/util/resolveReference"],function(t,e,r,n,i,o,s){"use strict";var a={_keepBindingStrings:false};var f=/^\{\s*('|"|)[a-zA-Z$_][a-zA-Z0-9$_]*\1\s*:/;var u=/(\\[\\\{\}])|(\{)/g;var c=/([\\\{\}])/g;function p(t,e){var r=t.some(function(t){return t.requiresIContext});function n(n){var i,o=t.length,s=arguments,a=new Array(o);for(i=0;i<o;i+=1){if(t[i].requiresIContext){s=arguments}else if(r){s=Array.prototype.slice.call(arguments,1)}a[i]=t[i].apply(this,s)}if(e){return e.apply(this,a)}return o>1?a.join(" "):a[0]}if(r){n.requiresIContext=true}n.textFragments=e&&e.textFragments||"sap.ui.base.BindingParser: composeFormatters";return n}function l(t){var e=function(){var e=[],r=t.length,n;for(n=0;n<r;n++){if(typeof t[n]==="number"){e.push(arguments[t[n]])}else{e.push(t[n])}}return e.join("")};e.textFragments=t;return e}function d(t){var e=t.indexOf(">"),r={path:t};if(e>0){r.model=t.slice(0,e);r.path=t.slice(e+1)}return r}function y(t,e){try{a.mergeParts(t)}catch(t){i.error("Cannot merge parts: "+t.message,e,"sap.ui.base.BindingParser")}}function h(t,e){var o=Object.assign({".":t.oContext},t.mLocals);function a(e,r){if(typeof e[r]==="string"){var n=e[r];e[r]=s(e[r],o,{preferDotContext:t.bPreferContext,bindDotContext:!t.bStaticContext});if(typeof e[r]!=="function"){if(t.bTolerateFunctionsNotFound){t.aFunctionsNotFound=t.aFunctionsNotFound||[];t.aFunctionsNotFound.push(n)}else{i.error(r+" function "+n+" not found!")}}}}function f(t){var e;var r=t.type;if(typeof r==="string"){e=s(r,o,{bindContext:false});if(typeof e==="function"){t.type=new e(t.formatOptions,t.constraints)}else{t.type=e}if(!t.type){i.error("Failed to resolve type '"+r+"'. Maybe not loaded or a typo?")}delete t.formatOptions;delete t.constraints}}function u(t){if(t!=null&&typeof t==="object"){for(var e in t){a(t,e)}}}function c(t,e){var n=t[e];if(Array.isArray(n)){n.forEach(function(t,e){c(n,e)});return}if(n&&typeof n==="object"){a(n,"test");c(n,"filters");c(n,"condition");t[e]=new r(n)}}function p(t,e){var r=t[e];if(Array.isArray(r)){r.forEach(function(t,e){p(r,e)});return}if(r&&typeof r==="object"){a(r,"group");a(r,"comparator");t[e]=new n(r)}}if(typeof e==="object"){if(Array.isArray(e.parts)){e.parts.forEach(function(e){h(t,e)})}f(e);c(e,"filters");p(e,"sorter");u(e.events);a(e,"formatter");a(e,"factory");a(e,"groupHeaderFactory")}return e}function x(t,e,r){var n=o.parseJS,i,s;if(f.test(e.slice(r))){i=n(e,r);h(t,i.result);return i}s=e.indexOf("}",r);if(s<r){throw new SyntaxError("no closing braces found in '"+e+"' after pos:"+r)}return{result:d(e.slice(r+1,s)),at:s+1}}a.simpleParser=function(t,e){if(t.startsWith("{")&&t.endsWith("}")){return d(t.slice(1,-1))}};a.simpleParser.escape=function(t){return t};a.complexParser=function(r,n,i,o,s,f,c){var p=false,d={parts:[]},h=false,g={oContext:n,mLocals:c,aFunctionsNotFound:undefined,bPreferContext:f,bStaticContext:s,bTolerateFunctionsNotFound:o},m=[],b,v=0,F,A;function C(e,i,o){var a=t.parse(x.bind(null,g),r,i,null,c||(s?n:null));function f(t,e){if(t.parts){t.parts.forEach(function(e,r){if(typeof e==="string"){e=t.parts[r]={path:e}}f(e,r)});p=p||e!==undefined}else{t.mode=o}}if(e.charAt(a.at)!=="}"){throw new SyntaxError("Expected '}' and instead saw '"+e.charAt(a.at)+"' in expression binding "+e+" at position "+a.at)}a.at+=1;if(a.result){f(a.result)}else{m[m.length-1]=String(a.constant);b=true}return a}u.lastIndex=0;while((F=u.exec(r))!==null){if(v<F.index){m.push(r.slice(v,F.index))}if(F[1]){m.push(F[1].slice(1));b=true}else{m.push(d.parts.length);if(r.indexOf(":=",F.index)===F.index+1){A=C(r,F.index+3,e.OneTime)}else if(r.charAt(F.index+1)==="="){A=C(r,F.index+2,e.OneWay)}else{A=x(g,r,F.index)}if(A.result){d.parts.push(A.result);h=h||"parts"in A.result}u.lastIndex=A.at}v=u.lastIndex}if(v<r.length){m.push(r.slice(v))}if(d.parts.length>0){if(m.length===1){d=d.parts[0];h=p}else{d.formatter=l(m)}if(h){y(d,r)}if(a._keepBindingStrings){d.bindingString=r}if(g.aFunctionsNotFound){d.functionsNotFound=g.aFunctionsNotFound}return d}else if(i&&b){return m.join("")}};a.complexParser.escape=function(t){return t.replace(c,"\\$1")};a.mergeParts=function(t){var e=[],r=[];t.parts.forEach(function(t){var n,i=function(){return t},o,s=r.length;function a(){return arguments[s]}if(t&&typeof t==="object"){if(t.parts){for(o in t){if(o!=="formatter"&&o!=="parts"){throw new Error("Unsupported property: "+o)}}r=r.concat(t.parts);n=r.length;if(t.formatter){if(t.formatter.requiresIContext===true){i=function(e){var r=Array.prototype.slice.call(arguments,s+1,n+1);r.unshift(e._slice(s,n));return t.formatter.apply(this,r)};i.requiresIContext=true}else{i=function(){return t.formatter.apply(this,Array.prototype.slice.call(arguments,s,n))}}}else if(n-s>1){i=function(){return Array.prototype.slice.call(arguments,s,n).join(" ")}}else{i=a}}else if("path"in t){r.push(t);i=a}}e.push(i)});t.parts=r;t.formatter=p(e,t.formatter)};a.parseExpression=function(e,r,n,i){n=n||{};if(i){n.mLocals=i}return t.parse(x.bind(null,n),e,r,i)};return a},true);
//# sourceMappingURL=BindingParser.js.map