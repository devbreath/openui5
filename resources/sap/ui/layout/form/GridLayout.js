/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/layout/library','./FormLayout','./GridLayoutRenderer'],function(l,F,G){"use strict";var a=F.extend("sap.ui.layout.form.GridLayout",{metadata:{library:"sap.ui.layout",deprecated:true,properties:{singleColumn:{type:"boolean",group:"Misc",defaultValue:false}}}});a.prototype.toggleContainerExpanded=function(c){this.invalidate();};a.prototype.onAfterRendering=function(){var f=this.getParent();if(f){var c=f.getVisibleFormContainers();for(var i=0;i<c.length;i++){var C=c[i];if(C.getExpandable()&&C._oExpandButton){C._oExpandButton.$().attr("tabindex","-1");}}}};a.prototype.onLayoutDataChange=function(e){if(this.getDomRef()){this.invalidate();}};a.prototype.onsaptabnext=function(e){this.tabForward(e);};a.prototype.onsaptabprevious=function(e){this.tabBack(e);};a.prototype.findFieldOfElement=function(e,s,L){if(!L){return F.prototype.findPrevFieldOfElement.apply(this,arguments);}if(!e.isVisible()){return null;}var f=e.getFieldsForRendering();var n;var I=f.length;s=I-1;for(var i=s;i>=0;i--){var o=f[i];var b=o.$().offset().left;if(L<b&&i!=0){continue;}var d=this._getDomRef(o);if((!o.getEnabled||o.getEnabled())&&d){n=d;break;}}return n;};a.prototype.findFieldBelow=function(c,e){var C=e.getParent();var b=C.indexOfFormElement(e);var n;if(C.isVisible()){var E=C.getFormElements();var m=E.length;var i=b+1;var L=c.$().offset().left;while(!n&&i<m){var N=E[i];n=this.findFieldOfElement(N,0,L);i++;}}if(!n){var f=C.getParent();b=f.indexOfFormContainer(C);n=this.findFirstFieldOfFirstElementInNextContainer(f,b+1);}return n;};a.prototype.findFieldAbove=function(c,e){var C=e.getParent();var b=C.indexOfFormElement(e);var n;if(C.isVisible()){var E=C.getFormElements();var i=b-1;var L=c.$().offset().left;while(!n&&i>=0){var N=E[i];n=this.findFieldOfElement(N,0,L);i--;}}if(!n){var f=C.getParent();b=f.indexOfFormContainer(C);n=this.findLastFieldOfLastElementInPrevContainer(f,b-1);}return n;};a.prototype.getContainerRenderedDomRef=function(c){return null;};a.prototype.getElementRenderedDomRef=function(e){if(this.getDomRef()){var s=this.getSingleColumn();var c=e.getParent();var C=this.getLayoutDataForElement(c,"sap.ui.layout.form.GridContainerData");if((s||!C||!C.getHalfGrid())&&!this.getRenderer().checkFullSizeElement(this,e)){return e.getDomRef();}}return null;};return a;});
