/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/dom/getScrollbarSize"],function(e,t){"use strict";var i={apiVersion:2};i.render=function(i,s){var l=sap.ui.getCore().getConfiguration().getRTL();i.openStart("div",s);i.class("sapUiScrollBar");var o;if(e.support.touch){o="sapUiScrollBarTouch";i.class(o)}var n=s.getVertical();var r=s.getSize();var d=s.getContentSize();var p=t(o);var a=p.width;var h=p.height;if(n){i.style("overflow","hidden");i.style("width",a+"px");i.style("height",r);i.openEnd();i.openStart("div",s.getId()+"-sb");i.style("width",a*2+"px");i.style("height","100%");i.style("overflow-y","scroll");i.style("overflow-x","hidden");if(l){i.style("margin-right","-"+a+"px")}else{i.style("margin-left","-"+a+"px")}i.openEnd();i.openStart("div",s.getId()+"-sbcnt");i.style("width",a+"px");i.style("height",d);i.openEnd();i.close("div");i.close("div");i.openStart("div");i.openEnd();i.openStart("span",s.getId()+"-ffsize");i.style("position","absolute");i.style("top","-9000px");i.style("left","-9000px");i.style("visibility","hidden");i.style("line-height","normal");i.openEnd();i.text("FF Size");i.close("span");i.close("div")}else{i.style("overflow","hidden");i.style("height",h+"px");i.style("width",r);i.openEnd();i.openStart("div",s.getId()+"-sb");i.style("height",h*2+"px");i.style("margin-top","-"+h+"px");i.style("overflow-x","scroll");i.style("overflow-y","hidden");i.openEnd();i.openStart("div",s.getId()+"-sbcnt");i.style("height",h+"px");i.style("width",d);i.openEnd();i.close("div");i.close("div")}i.close("div")};return i},true);
//# sourceMappingURL=ScrollBarRenderer.js.map