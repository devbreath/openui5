/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./Binding','./Filter','./Sorter'],function(B,F,S){"use strict";var T=B.extend("sap.ui.model.TreeBinding",{constructor:function(M,p,c,f,P,s){B.call(this,M,p,c,P);this.aFilters=[];this.aSorters=m(s,S);this.aApplicationFilters=m(f,F);this.oCombinedFilter=null;this.bDisplayRootNode=P&&P.displayRootNode===true;},metadata:{"abstract":true,publicMethods:["getRootContexts","getNodeContexts","hasChildren","filter"]}});function m(a,b){if(Array.isArray(a)){return a;}return a instanceof b?[a]:[];}T.prototype.getChildCount=function(c){if(!c){return this.getRootContexts().length;}return this.getNodeContexts(c).length;};T.prototype.attachFilter=function(f,l){this.attachEvent("_filter",f,l);};T.prototype.detachFilter=function(f,l){this.detachEvent("_filter",f,l);};T.prototype._fireFilter=function(p){this.fireEvent("_filter",p);};T.prototype.getFilterInfo=function(i){if(this.oCombinedFilter){return this.oCombinedFilter.getAST(i);}return null;};return T;});
