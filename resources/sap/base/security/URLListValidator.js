/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var r=/^(?:([^:\/?#]+):)?((?:\/\/((?:\[[^\]]+\]|[^\/?#:]+))(?::([0-9]+))?)?([^?#]*))(?:\?([^#]*))?(?:#(.*))?$/;var a=/^([a-z0-9-._~!$&'()*+,;=:@]|%[0-9a-f]{2})*$/i;var b=/^([a-z0-9-._~!$&'()*+,;=:@\/?]|%[0-9a-f]{2})*$/i;var c=b;var d=/^([a-z0-9!$'*+:^_`{|}~-]|%[0-9a-f]{2})+(?:\.([a-z0-9!$'*+:^_`{|}~-]|%[0-9a-f]{2})+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/i;var e=/^([0-9]{1,3}\.){3}[0-9]{1,3}$/;var f=/^(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])$/;var g=/^\[[^\]]+\]$/;var h=/^\[(((([0-9a-f]{1,4}:){6}|(::([0-9a-f]{1,4}:){5})|(([0-9a-f]{1,4})?::([0-9a-f]{1,4}:){4})|((([0-9a-f]{1,4}:){0,1}[0-9a-f]{1,4})?::([0-9a-f]{1,4}:){3})|((([0-9a-f]{1,4}:){0,2}[0-9a-f]{1,4})?::([0-9a-f]{1,4}:){2})|((([0-9a-f]{1,4}:){0,3}[0-9a-f]{1,4})?::[0-9a-f]{1,4}:)|((([0-9a-f]{1,4}:){0,4}[0-9a-f]{1,4})?::))(([0-9a-f]{1,4}:[0-9a-f]{1,4})|(([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9][0-9]|2[0-4][0-9]|25[0-5])))|((([0-9a-f]{1,4}:){0,5}[0-9a-f]{1,4})?::[0-9a-f]{1,4})|((([0-9a-f]{1,4}:){0,6}[0-9a-f]{1,4})?::))\]$/i;var j=/^([a-z0-9]([a-z0-9\-]*[a-z0-9])?\.)*[a-z0-9]([a-z0-9\-]*[a-z0-9])?$/i;var u={};u._createEntry=function(p,i,k,l){return new U(p,i,k,l);};function U(p,i,k,l){Object.defineProperties(this,{protocol:{value:p&&p.toUpperCase(),enumerable:true},host:{value:i&&i.toUpperCase(),enumerable:true},port:{value:k,enumerable:true},path:{value:l,enumerable:true}});}var A=[];u.clear=function(){A=[];};u.add=function(p,i,k,l){var E=this._createEntry(p,i,k,l);A.push(E);};u._delete=function(E){A.splice(A.indexOf(E),1);};u.entries=function(){return A.slice();};u.validate=function(s){var k=r.exec(s);if(!k){return false;}var p=k[1],B=k[2],H=k[3],P=k[4],l=k[5],q=k[6],m=k[7];if(p){p=p.toUpperCase();if(A.length<=0){if(!/^(https?|ftp)/i.test(p)){return false;}}}if(H){if(e.test(H)){if(!f.test(H)){return false;}}else if(g.test(H)){if(!h.test(H)){return false;}}else if(!j.test(H)){return false;}H=H.toUpperCase();}if(l){if(p==="MAILTO"){var n=B.split(",");for(var i=0;i<n.length;i++){if(!d.test(n[i])){return false;}}}else{var C=l.split("/");for(var i=0;i<C.length;i++){if(!a.test(C[i])){return false;}}}}if(q){if(!b.test(q)){return false;}}if(m){if(!c.test(m)){return false;}}if(A.length>0){var F=false;for(var i=0;i<A.length;i++){if(!p||!A[i].protocol||p==A[i].protocol){var o=false;if(H&&A[i].host&&/^\*/.test(A[i].host)){if(!A[i]._hostRegexp){var t=A[i].host.slice(1).replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");A[i]._hostRegexp=RegExp(t+"$");}var v=A[i]._hostRegexp;if(v.test(H)){o=true;}}else if(!H||!A[i].host||H==A[i].host){o=true;}if(o){if((!H&&!P)||!A[i].port||P==A[i].port){if(A[i].path&&/\*$/.test(A[i].path)){if(!A[i]._pathRegexp){var w=A[i].path.slice(0,-1).replace(/[-[\]{}()*+?.,\\^$|#\s]/g,"\\$&");A[i]._pathRegexp=RegExp("^"+w);}var v=A[i]._pathRegexp;if(v.test(l)){F=true;}}else if(!A[i].path||l==A[i].path){F=true;}}}}if(F){break;}}if(!F){return false;}}return true;};return u;});
