/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./Metadata',"sap/base/Log"],function(M,L){"use strict";var B=M.createClass("sap.ui.base.Object",{constructor:function(){if(!(this instanceof B)){throw Error("Cannot instantiate object: \"new\" is missing!");}}});B.prototype.destroy=function(){};B.prototype.getInterface=function(){var i=new B._Interface(this,this.getMetadata().getAllPublicMethods());this.getInterface=function(){return i;};return i;};B.defineClass=function(c,s,F){var m=new(F||M)(c,s);var C=m.getClass();C.getMetadata=C.prototype.getMetadata=function(){return m;};if(!m.isFinal()){C.extend=function(S,o,f){return M.createClass(C,S,o,f||F);};}L.debug("defined class '"+c+"'"+(m.getParent()?" as subclass of "+m.getParent().getName():""));return m;};B.prototype.isA=function(t){return this.getMetadata().isA(t);};B.isA=function(o,t){return o instanceof B&&o.isA(t);};B._Interface=function(o,m,_){if(!o){return o;}function c(o,s){return function(){var t=o[s].apply(o,arguments);if(_){return this;}else{return(t instanceof B)?t.getInterface():t;}};}if(!m){return{};}var s;for(var i=0,a=m.length;i<a;i++){s=m[i];if(!o[s]||typeof o[s]==="function"){this[s]=c(o,s);}}};return B;},true);
