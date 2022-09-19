/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/thirdparty/jquery','./library','sap/ui/core/Control','sap/ui/core/delegate/ItemNavigation','./ImageMapRenderer','./Area'],function(q,l,C,I,a,A){"use strict";var b=C.extend("sap.ui.commons.ImageMap",{metadata:{library:"sap.ui.commons",deprecated:true,properties:{name:{type:"string",group:"Misc",defaultValue:null}},aggregations:{areas:{type:"sap.ui.commons.Area",multiple:true,singularName:"area"}},events:{press:{parameters:{areaId:{type:"string"}}}}}});b.prototype.createArea=function(){var o=new A();for(var i=0;i<arguments.length;i++){var c=arguments[i];var o;if(c instanceof A){o=c;}else{o=new A(c);}this.addArea(o);}return this;};b.prototype.onAfterRendering=function(){this.oDomRef=this.getDomRef();if(!this.oItemNavigation){this.oItemNavigation=new I();}this.addDelegate(this.oItemNavigation);this.oItemNavigation.setRootDomRef(this.oDomRef);var c=[];var d=this.getAreas();for(var i=0;i<d.length;i++){var D=d[i].getFocusDomRef();if(D){c.push(D);}}this.oItemNavigation.setItemDomRefs(c);this.oItemNavigation.setCycling(true);this.oItemNavigation.setSelectedIndex(-1);this.oItemNavigation.setFocusedIndex(-1);};b.prototype.exit=function(){if(this.oItemNavigation){this.removeDelegate(this.oItemNavigation);this.oItemNavigation.destroy();delete this.oItemNavigation;}};return b;});
