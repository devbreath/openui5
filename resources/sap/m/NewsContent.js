/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control','sap/m/FormattedText','sap/ui/Device','./NewsContentRenderer',"sap/ui/events/KeyCodes"],function(l,C,F,D,N,K){"use strict";var a=C.extend("sap.m.NewsContent",{metadata:{library:"sap.m",designtime:"sap/m/designtime/NewsContent.designtime",properties:{"size":{type:"sap.m.Size",group:"Misc",defaultValue:"Auto",deprecated:true},"contentText":{type:"string",group:"Misc",defaultValue:null},"subheader":{type:"string",group:"Misc",defaultValue:null}},defaultAggregation:"_contentText",aggregations:{"_contentText":{type:"sap.m.FormattedText",multiple:false,visibility:"hidden"},"_subHeaderText":{type:"sap.m.FormattedText",multiple:false,visibility:"hidden"}},events:{"press":{}}}});a.prototype.init=function(){this._oContentText=new F(this.getId()+"-content-text");this._oSubHeaderText=new F(this.getId()+"-subheader-text");this.setAggregation("_contentText",this._oContentText,true);this.setAggregation("_subHeaderText",this._oSubHeaderText,true);this.setTooltip("{AltText}");};a.prototype.onBeforeRendering=function(){this._setPointerOnContentText();this.$().off("mouseenter");this.$().off("mouseleave");};a.prototype.onAfterRendering=function(){this.$().on("mouseenter",this._addTooltip.bind(this));this.$().on("mouseleave",this._removeTooltip.bind(this));};a.prototype._addTooltip=function(){this.$().attr("title",this.getTooltip_AsString());};a.prototype._removeTooltip=function(){this.$().attr("title",null);};a.prototype._setPointerOnContentText=function(){var t=this.getAggregation("_contentText");if(t&&this.hasListeners("press")){t.addStyleClass("sapMPointer");}else if(t&&t.hasStyleClass("sapMPointer")){t.removeStyleClass("sapMPointer");}};a.prototype.getAltText=function(){var A="";var i=true;if(this.getContentText()){A+=this.getContentText();i=false;}if(this.getSubheader()){if(i){A+=""+this.getSubheader();}else{A+="\n"+this.getSubheader();}}return A;};a.prototype.getTooltip_AsString=function(){var t=this.getTooltip();var T=this.getAltText();if(typeof t==="string"||t instanceof String){T=t.split("{AltText}").join(T).split("((AltText))").join(T);return T;}if(t){return t;}else{return"";}};a.prototype.setContentText=function(t){this._oContentText.setHtmlText(t);return this.setProperty("contentText",t,true);};a.prototype.setSubheader=function(t){this._oSubHeaderText.setHtmlText(t);return this.setProperty("subheader",t,true);};a.prototype.ontap=function(e){if(D.browser.msie){this.$().trigger("focus");}this.firePress();};a.prototype.onkeydown=function(e){if(e.which===K.ENTER||e.which===K.SPACE){this.firePress();e.preventDefault();}};a.prototype.attachEvent=function(e,d,f,b){C.prototype.attachEvent.call(this,e,d,f,b);if(this.hasListeners("press")){this.$().attr("tabindex",0).addClass("sapMPointer");this._setPointerOnContentText();}return this;};a.prototype.detachEvent=function(e,f,b){C.prototype.detachEvent.call(this,e,f,b);if(!this.hasListeners("press")){this.$().removeAttr("tabindex").removeClass("sapMPointer");this._setPointerOnContentText();}return this;};return a;});
