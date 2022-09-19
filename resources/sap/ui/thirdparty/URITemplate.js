/*!
 * URI.js - Mutating URLs
 * URI Template Support - http://tools.ietf.org/html/rfc6570
 *
 * Version: 1.19.11
 *
 * Author: Rodney Rehm
 * Web: http://medialize.github.io/URI.js/
 *
 * Licensed under
 *   MIT License http://www.opensource.org/licenses/mit-license
 *
 */
(function(r,f){'use strict';if(typeof module==='object'&&module.exports){module.exports=f(require('./URI'));}else if(typeof define==='function'&&define.amd){define(['./URI'],f);}else{r.URITemplate=f(r.URI,r);}}(this,function(U,r){'use strict';var _=r&&r.URITemplate;var h=Object.prototype.hasOwnProperty;function a(e){if(a._cache[e]){return a._cache[e];}if(!(this instanceof a)){return new a(e);}this.expression=e;a._cache[e]=this;return this;}function D(d){this.data=d;this.cache={};}var p=a.prototype;var o={'':{prefix:'',separator:',',named:false,empty_name_separator:false,encode:'encode'},'+':{prefix:'',separator:',',named:false,empty_name_separator:false,encode:'encodeReserved'},'#':{prefix:'#',separator:',',named:false,empty_name_separator:false,encode:'encodeReserved'},'.':{prefix:'.',separator:'.',named:false,empty_name_separator:false,encode:'encode'},'/':{prefix:'/',separator:'/',named:false,empty_name_separator:false,encode:'encode'},';':{prefix:';',separator:';',named:true,empty_name_separator:false,encode:'encode'},'?':{prefix:'?',separator:'&',named:true,empty_name_separator:true,encode:'encode'},'&':{prefix:'&',separator:'&',named:true,empty_name_separator:true,encode:'encode'}};a._cache={};a.EXPRESSION_PATTERN=/\{([^a-zA-Z0-9%_]?)([^\}]+)(\}|$)/g;a.VARIABLE_PATTERN=/^([^*:.](?:\.?[^*:.])*)((\*)|:(\d+))?$/;a.VARIABLE_NAME_PATTERN=/[^a-zA-Z0-9%_.]/;a.LITERAL_PATTERN=/[<>{}"`^| \\]/;a.expand=function(e,b,c){var f=o[e.operator];var t=f.named?'Named':'Unnamed';var v=e.variables;var g=[];var d,j,i;for(i=0;(j=v[i]);i++){d=b.get(j.name);if(d.type===0&&c&&c.strict){throw new Error('Missing expansion value for variable "'+j.name+'"');}if(!d.val.length){if(d.type){g.push('');}continue;}if(d.type>1&&j.maxlength){throw new Error('Invalid expression: Prefix modifier not applicable to variable "'+j.name+'"');}g.push(a['expand'+t](d,f,j.explode,j.explode&&f.separator||',',j.maxlength,j.name));}if(g.length){return f.prefix+g.join(f.separator);}else{return'';}};a.expandNamed=function(d,b,e,s,c,n){var f='';var g=b.encode;var j=b.empty_name_separator;var k=!d[g].length;var m=d.type===2?'':U[g](n);var q,i,l;for(i=0,l=d.val.length;i<l;i++){if(c){q=U[g](d.val[i][1].substring(0,c));if(d.type===2){m=U[g](d.val[i][0].substring(0,c));}}else if(k){q=U[g](d.val[i][1]);if(d.type===2){m=U[g](d.val[i][0]);d[g].push([m,q]);}else{d[g].push([undefined,q]);}}else{q=d[g][i][1];if(d.type===2){m=d[g][i][0];}}if(f){f+=s;}if(!e){if(!i){f+=U[g](n)+(j||q?'=':'');}if(d.type===2){f+=m+',';}f+=q;}else{f+=m+(j||q?'=':'')+q;}}return f;};a.expandUnnamed=function(d,b,e,s,c){var f='';var g=b.encode;var j=b.empty_name_separator;var k=!d[g].length;var m,n,i,l;for(i=0,l=d.val.length;i<l;i++){if(c){n=U[g](d.val[i][1].substring(0,c));}else if(k){n=U[g](d.val[i][1]);d[g].push([d.type===2?U[g](d.val[i][0]):undefined,n]);}else{n=d[g][i][1];}if(f){f+=s;}if(d.type===2){if(c){m=U[g](d.val[i][0].substring(0,c));}else{m=d[g][i][0];}f+=m;if(e){f+=(j||n?'=':'');}else{f+=',';}}f+=n;}return f;};a.noConflict=function(){if(r.URITemplate===a){r.URITemplate=_;}return a;};p.expand=function(d,b){var c='';if(!this.parts||!this.parts.length){this.parse();}if(!(d instanceof D)){d=new D(d);}for(var i=0,l=this.parts.length;i<l;i++){c+=typeof this.parts[i]==='string'?this.parts[i]:a.expand(this.parts[i],d,b);}return c;};p.parse=function(){var e=this.expression;var b=a.EXPRESSION_PATTERN;var P=a.VARIABLE_PATTERN;var n=a.VARIABLE_NAME_PATTERN;var c=a.LITERAL_PATTERN;var d=[];var f=0;var v,g,m;var j=function(k){if(k.match(c)){throw new Error('Invalid Literal "'+k+'"');}return k;};b.lastIndex=0;while(true){g=b.exec(e);if(g===null){d.push(j(e.substring(f)));break;}else{d.push(j(e.substring(f,g.index)));f=g.index+g[0].length;}if(!o[g[1]]){throw new Error('Unknown Operator "'+g[1]+'" in "'+g[0]+'"');}else if(!g[3]){throw new Error('Unclosed Expression "'+g[0]+'"');}v=g[2].split(',');for(var i=0,l=v.length;i<l;i++){m=v[i].match(P);if(m===null){throw new Error('Invalid Variable "'+v[i]+'" in "'+g[0]+'"');}else if(m[1].match(n)){throw new Error('Invalid Variable Name "'+m[1]+'" in "'+g[0]+'"');}v[i]={name:m[1],explode:!!m[3],maxlength:m[4]&&parseInt(m[4],10)};}if(!v.length){throw new Error('Expression Missing Variable(s) "'+g[0]+'"');}d.push({expression:g[0],operator:g[1],variables:v});}if(!d.length){d.push(j(e));}this.parts=d;return this;};D.prototype.get=function(k){var b=this.data;var d={type:0,val:[],encode:[],encodeReserved:[]};var i,l,v;if(this.cache[k]!==undefined){return this.cache[k];}this.cache[k]=d;if(String(Object.prototype.toString.call(b))==='[object Function]'){v=b(k);}else if(String(Object.prototype.toString.call(b[k]))==='[object Function]'){v=b[k](k);}else{v=b[k];}if(v===undefined||v===null){return d;}else if(String(Object.prototype.toString.call(v))==='[object Array]'){for(i=0,l=v.length;i<l;i++){if(v[i]!==undefined&&v[i]!==null){d.val.push([undefined,String(v[i])]);}}if(d.val.length){d.type=3;}}else if(String(Object.prototype.toString.call(v))==='[object Object]'){for(i in v){if(h.call(v,i)&&v[i]!==undefined&&v[i]!==null){d.val.push([i,String(v[i])]);}}if(d.val.length){d.type=2;}}else{d.type=1;d.val.push([undefined,String(v)]);}return d;};U.expand=function(e,d){var t=new a(e);var b=t.expand(d);return new U(b);};return a;}));
