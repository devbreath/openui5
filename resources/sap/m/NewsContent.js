/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/m/FormattedText","sap/ui/Device","./NewsContentRenderer","sap/ui/events/KeyCodes"],function(t,e,i,s,n,o){"use strict";var r=e.extend("sap.m.NewsContent",{metadata:{library:"sap.m",designtime:"sap/m/designtime/NewsContent.designtime",properties:{size:{type:"sap.m.Size",group:"Misc",defaultValue:"Auto",deprecated:true},contentText:{type:"string",group:"Misc",defaultValue:null},subheader:{type:"string",group:"Misc",defaultValue:null}},defaultAggregation:"_contentText",aggregations:{_contentText:{type:"sap.m.FormattedText",multiple:false,visibility:"hidden"},_subHeaderText:{type:"sap.m.FormattedText",multiple:false,visibility:"hidden"}},events:{press:{}}}});r.prototype.init=function(){this._oContentText=new i(this.getId()+"-content-text");this._oSubHeaderText=new i(this.getId()+"-subheader-text");this.setAggregation("_contentText",this._oContentText,true);this.setAggregation("_subHeaderText",this._oSubHeaderText,true);this.setTooltip("{AltText}")};r.prototype.onBeforeRendering=function(){this._setPointerOnContentText();this.$().off("mouseenter");this.$().off("mouseleave")};r.prototype.onAfterRendering=function(){this.$().on("mouseenter",this._addTooltip.bind(this));this.$().on("mouseleave",this._removeTooltip.bind(this))};r.prototype._addTooltip=function(){this.$().attr("title",this.getTooltip_AsString())};r.prototype._removeTooltip=function(){this.$().attr("title",null)};r.prototype._setPointerOnContentText=function(){var t=this.getAggregation("_contentText");if(t&&this.hasListeners("press")){t.addStyleClass("sapMPointer")}else if(t&&t.hasStyleClass("sapMPointer")){t.removeStyleClass("sapMPointer")}};r.prototype.getAltText=function(){var t="";var e=true;if(this.getContentText()){t+=this.getContentText();e=false}if(this.getSubheader()){if(e){t+=""+this.getSubheader()}else{t+="\n"+this.getSubheader()}}return t};r.prototype.getTooltip_AsString=function(){var t=this.getTooltip();var e=this.getAltText();if(typeof t==="string"||t instanceof String){e=t.split("{AltText}").join(e).split("((AltText))").join(e);return e}if(t){return t}else{return""}};r.prototype.setContentText=function(t){this._oContentText.setHtmlText(t);return this.setProperty("contentText",t,true)};r.prototype.setSubheader=function(t){this._oSubHeaderText.setHtmlText(t);return this.setProperty("subheader",t,true)};r.prototype.ontap=function(t){if(s.browser.msie){this.$().trigger("focus")}this.firePress()};r.prototype.onkeydown=function(t){if(t.which===o.ENTER||t.which===o.SPACE){this.firePress();t.preventDefault()}};r.prototype.attachEvent=function(t,i,s,n){e.prototype.attachEvent.call(this,t,i,s,n);if(this.hasListeners("press")){this.$().attr("tabindex",0).addClass("sapMPointer");this._setPointerOnContentText()}return this};r.prototype.detachEvent=function(t,i,s){e.prototype.detachEvent.call(this,t,i,s);if(!this.hasListeners("press")){this.$().removeAttr("tabindex").removeClass("sapMPointer");this._setPointerOnContentText()}return this};return r});
//# sourceMappingURL=NewsContent.js.map