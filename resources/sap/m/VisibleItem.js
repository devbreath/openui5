/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Item',"sap/ui/thirdparty/jquery"],function(l,I,q){"use strict";var V=I.extend("sap.m.VisibleItem",{metadata:{library:"sap.m",properties:{visible:{type:"boolean",group:"Behavior",defaultValue:true}}}});V.prototype._getRefs=function(){var p=this.getParent(),$,t=this;if(p&&p.$("content")){$=p.$("content").find("li").filter(function(){return q(this).html()===t.getText();});}return $;};V.prototype.setVisible=function(v){if(this.getVisible()===v){return this;}var $=this._getRefs();if($){if(v){$.removeClass('TPSliderItemHidden');}else{$.addClass('TPSliderItemHidden');}}return this.setProperty('visible',v,true);};return V;});
