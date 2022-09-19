/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
(function(){"use strict";var u=window.sap&&window.sap.ui&&window.sap.ui.loader,c=window['sap-ui-config']||{},b,n,s,r,i,B,a,E=false;function f(S,e){var U=S&&S.getAttribute("src"),M=e.exec(U);if(M){b=M[1]||"";B=S;a=U;n=/sap-ui-core-nojQuery\.js(?:[?#]|$)/.test(U);return true;}}function d(p){return p&&p[p.length-1]!=='/'?p+'/':p;}if(u==null){throw new Error("ui5loader-autoconfig.js: ui5loader is needed, but could not be found");}if(!f(document.querySelector('SCRIPT[src][id=sap-ui-bootstrap]'),/^((?:[^?#]*\/)?resources\/)/)){r=/^([^?#]*\/)?(?:sap-ui-(?:core|custom|boot|merged)(?:-[^?#/]*)?|jquery.sap.global|ui5loader(?:-autoconfig)?)\.js(?:[?#]|$)/;s=document.scripts;for(i=0;i<s.length;i++){if(f(s[i],r)){break;}}}if(typeof c==='object'&&typeof c.resourceRoots==='object'&&typeof c.resourceRoots['']==='string'){b=c.resourceRoots[''];}if(b==null){throw new Error("ui5loader-autoconfig.js: could not determine base URL. No known script tag and no configuration found!");}(function(){var R;try{R=window.localStorage.getItem("sap-ui-reboot-URL");}catch(e){}if(/sap-bootstrap-debug=(true|x|X)/.test(location.search)){debugger;}if(R){var D=d(b)+'sap/ui/core/support/debugReboot.js';document.write("<script src=\""+D+"\"></script>");var o=new Error("This is not a real error. Aborting UI5 bootstrap and rebooting from: "+R);o.name="Restart";throw o;}})();(function(){var U=/(?:^|\?|&)sap-ui-debug=([^&]*)(?:&|$)/.exec(window.location.search),D=U&&decodeURIComponent(U[1]);try{D=D||window.localStorage.getItem("sap-ui-debug");}catch(e){}D=D||(B&&B.getAttribute("data-sap-ui-debug"));if(typeof D==='string'){if(/^(?:false|true|x|X)$/.test(D)){D=D!=='false';}}else{D=!!D;}if(/-dbg\.js([?#]|$)/.test(a)){window['sap-ui-loaddbg']=true;D=D||true;}window["sap-ui-debug"]=D;window["sap-ui-optimized"]=window["sap-ui-optimized"]||(/\.location/.test(_)&&!/oBootstrapScript/.test(_));if(window["sap-ui-optimized"]&&D){window['sap-ui-loaddbg']=true;if(D===true&&!window["sap-ui-debug-no-reboot"]){var j;if(a!=null){j=a.replace(/\/(?:sap-ui-cachebuster\/)?([^\/]+)\.js/,"/$1-dbg.js");}else{j=d(b)+'sap-ui-core.js';}u.config({amd:false});window["sap-ui-optimized"]=false;if(u.config().async){var k=document.createElement("script");k.src=j;document.head.appendChild(k);}else{document.write("<script src=\""+j+"\"></script>");}var R=new Error("This is not a real error. Aborting UI5 bootstrap and restarting from: "+j);R.name="Restart";throw R;}}function l(G){if(!/\/\*\*\/$/.test(G)){G=G.replace(/\/$/,'/**/');}return G.replace(/\*\*\/|\*|[[\]{}()+?.\\^$|]/g,function(M){switch(M){case'**/':return'(?:[^/]+/)*';case'*':return'[^/]*';default:return'\\'+M;}});}var I;if(typeof D==='string'){var p="^(?:"+D.split(/,/).map(l).join("|")+")",o=new RegExp(p);I=function(M){return o.test(M);};u._.logger.debug("Modules that should be excluded from preload: '"+p+"'");}else if(D===true){I=function(){return true;};u._.logger.debug("All modules should be excluded from preload");}u.config({debugSources:!!window['sap-ui-loaddbg'],ignoreBundledResources:I});})();function _(e,j,p){var k=window.location.search.match(new RegExp("(?:^\\??|&)sap-ui-"+e+"=([^&]*)(?:&|$)"));if(k&&(p==null||p.test(k[1]))){return k[1];}var l=B&&B.getAttribute("data-sap-ui-"+e.toLowerCase());if(l!=null&&(p==null||p.test(l))){return l;}if(Object.prototype.hasOwnProperty.call(c,e)&&(p==null||p.test(c[e]))){return c[e];}if(e.slice(0,3)!=="xx-"){return _("xx-"+e,j,p);}return j;}function g(e,j){return/^(?:true|x|X)$/.test(_(e,j,/^(?:true|x|X|false)$/));}if(g("async",false)){u.config({async:true});}E=g("amd",!g("noLoaderConflict",true));u.config({baseUrl:b,amd:E,map:{"*":{'blanket':'sap/ui/thirdparty/blanket','crossroads':'sap/ui/thirdparty/crossroads','d3':'sap/ui/thirdparty/d3','handlebars':'sap/ui/thirdparty/handlebars','hasher':'sap/ui/thirdparty/hasher','IPv6':'sap/ui/thirdparty/IPv6','jquery':'sap/ui/thirdparty/jquery','jszip':'sap/ui/thirdparty/jszip','less':'sap/ui/thirdparty/less','OData':'sap/ui/thirdparty/datajs','punycode':'sap/ui/thirdparty/punycode','SecondLevelDomains':'sap/ui/thirdparty/SecondLevelDomains','sinon':'sap/ui/thirdparty/sinon','signals':'sap/ui/thirdparty/signals','URI':'sap/ui/thirdparty/URI','URITemplate':'sap/ui/thirdparty/URITemplate','esprima':'sap/ui/documentation/sdk/thirdparty/esprima'}},shim:{'sap/ui/thirdparty/bignumber':{amd:true,exports:'BigNumber'},'sap/ui/thirdparty/blanket':{amd:true,exports:'blanket'},'sap/ui/thirdparty/caja-html-sanitizer':{amd:false,exports:'html'},'sap/ui/thirdparty/crossroads':{amd:true,exports:'crossroads',deps:['sap/ui/thirdparty/signals']},'sap/ui/thirdparty/d3':{amd:true,exports:'d3'},'sap/ui/thirdparty/datajs':{amd:true,exports:'OData'},'sap/ui/thirdparty/handlebars':{amd:true,exports:'Handlebars'},'sap/ui/thirdparty/hasher':{amd:true,exports:'hasher',deps:['sap/ui/thirdparty/signals']},'sap/ui/thirdparty/IPv6':{amd:true,exports:'IPv6'},'sap/ui/thirdparty/iscroll-lite':{amd:false,exports:'iScroll'},'sap/ui/thirdparty/iscroll':{amd:false,exports:'iScroll'},'sap/ui/thirdparty/jquery':{amd:true,exports:'jQuery',deps:['sap/ui/thirdparty/jquery-compat']},'sap/ui/thirdparty/jqueryui/jquery-ui-datepicker':{deps:['sap/ui/thirdparty/jqueryui/jquery-ui-core'],exports:'jQuery'},'sap/ui/thirdparty/jqueryui/jquery-ui-draggable':{deps:['sap/ui/thirdparty/jqueryui/jquery-ui-mouse'],exports:'jQuery'},'sap/ui/thirdparty/jqueryui/jquery-ui-droppable':{deps:['sap/ui/thirdparty/jqueryui/jquery-ui-mouse','sap/ui/thirdparty/jqueryui/jquery-ui-draggable'],exports:'jQuery'},'sap/ui/thirdparty/jqueryui/jquery-ui-effect':{deps:['sap/ui/thirdparty/jquery'],exports:'jQuery'},'sap/ui/thirdparty/jqueryui/jquery-ui-mouse':{deps:['sap/ui/thirdparty/jqueryui/jquery-ui-core','sap/ui/thirdparty/jqueryui/jquery-ui-widget'],exports:'jQuery'},'sap/ui/thirdparty/jqueryui/jquery-ui-position':{deps:['sap/ui/thirdparty/jquery'],exports:'jQuery'},'sap/ui/thirdparty/jqueryui/jquery-ui-resizable':{deps:['sap/ui/thirdparty/jqueryui/jquery-ui-mouse'],exports:'jQuery'},'sap/ui/thirdparty/jqueryui/jquery-ui-selectable':{deps:['sap/ui/thirdparty/jqueryui/jquery-ui-mouse'],exports:'jQuery'},'sap/ui/thirdparty/jqueryui/jquery-ui-sortable':{deps:['sap/ui/thirdparty/jqueryui/jquery-ui-mouse'],exports:'jQuery'},'sap/ui/thirdparty/jqueryui/jquery-ui-widget':{deps:['sap/ui/thirdparty/jquery'],exports:'jQuery'},'sap/ui/thirdparty/jquery-mobile-custom':{amd:true,deps:['sap/ui/thirdparty/jquery','sap/ui/Device'],exports:'jQuery.mobile'},'sap/ui/thirdparty/jszip':{amd:true,exports:'JSZip'},'sap/ui/thirdparty/less':{amd:true,exports:'less'},'sap/ui/thirdparty/mobify-carousel':{amd:false,exports:'Mobify'},'sap/ui/thirdparty/qunit-2':{amd:false,exports:'QUnit'},'sap/ui/thirdparty/punycode':{amd:true,exports:'punycode'},'sap/ui/thirdparty/RequestRecorder':{amd:true,exports:'RequestRecorder',deps:['sap/ui/thirdparty/URI','sap/ui/thirdparty/sinon']},'sap/ui/thirdparty/require':{exports:'define'},'sap/ui/thirdparty/SecondLevelDomains':{amd:true,exports:'SecondLevelDomains'},'sap/ui/thirdparty/signals':{amd:true,exports:'signals'},'sap/ui/thirdparty/sinon':{amd:true,exports:'sinon'},'sap/ui/thirdparty/sinon-4':{amd:true,exports:'sinon'},'sap/ui/thirdparty/sinon-server':{amd:true,exports:'sinon'},'sap/ui/thirdparty/URI':{amd:true,exports:'URI'},'sap/ui/thirdparty/URITemplate':{amd:true,exports:'URITemplate',deps:['sap/ui/thirdparty/URI']},'sap/ui/thirdparty/vkbeautify':{amd:false,exports:'vkbeautify'},'sap/ui/thirdparty/zyngascroll':{amd:false,exports:'Scroller'},'sap/ui/demokit/js/esprima':{amd:true,exports:'esprima'},'sap/ui/documentation/sdk/thirdparty/esprima':{amd:true,exports:'esprima'},'sap/viz/libs/canvg':{deps:['sap/viz/libs/rgbcolor']},'sap/viz/libs/rgbcolor':{},'sap/viz/libs/sap-viz':{deps:['sap/viz/library','sap/ui/thirdparty/jquery','sap/ui/thirdparty/d3','sap/viz/libs/canvg']},'sap/viz/libs/sap-viz-info-charts':{deps:['sap/viz/libs/sap-viz-info-framework']},'sap/viz/libs/sap-viz-info-framework':{deps:['sap/ui/thirdparty/jquery','sap/ui/thirdparty/d3']},'sap/viz/ui5/container/libs/sap-viz-controls-vizcontainer':{deps:['sap/viz/libs/sap-viz','sap/viz/ui5/container/libs/common/libs/rgbcolor/rgbcolor_static']},'sap/viz/ui5/controls/libs/sap-viz-vizframe/sap-viz-vizframe':{deps:['sap/viz/libs/sap-viz-info-charts']},'sap/viz/ui5/controls/libs/sap-viz-vizservices/sap-viz-vizservices':{deps:['sap/viz/libs/sap-viz-info-charts']},'sap/viz/resources/chart/templates/standard_fiori/template':{deps:['sap/viz/libs/sap-viz-info-charts']}}});var h=u._.defineModuleSync;h('ui5loader.js',null);h('ui5loader-autoconfig.js',null);if(n&&typeof jQuery==='function'){h('sap/ui/thirdparty/jquery.js',jQuery);if(jQuery.ui&&jQuery.ui.position){h('sap/ui/thirdparty/jqueryui/jquery-ui-position.js',jQuery);}}var m=B&&B.getAttribute('data-sap-ui-main');if(m){sap.ui.require(m.trim().split(/\s*,\s*/));}}());
