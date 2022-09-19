/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/library','sap/ui/core/Control','sap/ui/core/IconPool','sap/ui/base/ManagedObject','sap/m/Text','sap/m/Image','sap/m/Button','sap/m/Title','sap/m/Bar','sap/m/FormattedText','./MessagePageRenderer',"sap/ui/thirdparty/jquery"],function(l,c,C,I,M,T,a,B,b,d,F,e,q){"use strict";var f=c.TextAlign;var g=c.TextDirection;var h=l.ButtonType;var i=l.BarDesign;var j=c.TitleLevel;var k=C.extend("sap.m.MessagePage",{metadata:{library:"sap.m",properties:{text:{type:"string",group:"Misc",defaultValue:"No matching items found."},description:{type:"string",group:"Misc",defaultValue:"Check the filter settings."},title:{type:"string",group:"Misc",defaultValue:null},titleLevel:{type:"sap.ui.core.TitleLevel",group:"Appearance",defaultValue:j.Auto},showHeader:{type:"boolean",group:"Appearance",defaultValue:true},showNavButton:{type:"boolean",group:"Appearance",defaultValue:false},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:"sap-icon://documents"},iconAlt:{type:"string",group:"Misc",defaultValue:null},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:g.Inherit},enableFormattedText:{type:"boolean",group:"Appearance",defaultValue:false}},aggregations:{customText:{type:"sap.m.Link",multiple:false},customDescription:{type:"sap.m.Link",multiple:false},buttons:{type:"sap.m.Button",multiple:true},_internalHeader:{type:"sap.m.Bar",multiple:false,visibility:"hidden"},_formattedText:{type:"sap.m.FormattedText",multiple:false,visibility:"hidden"},_text:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_description:{type:"sap.m.Text",multiple:false,visibility:"hidden"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{navButtonPress:{}},designtime:"sap/m/designtime/MessagePage.designtime"}});k.ARIA_ROLE_DESCRIPTION="MESSAGE_PAGE_ROLE_DESCRIPTION";k.prototype.init=function(){var o=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oTitle=null;this._oNavButton=new B(this.getId()+"-navButton",{type:h.Back,press:q.proxy(function(){this.fireNavButtonPress();},this)});this.setAggregation("_internalHeader",new d(this.getId()+"-intHeader",{design:i.Header}));this.setProperty("text",o.getText("MESSAGE_PAGE_TEXT"),true);this.setProperty("description",o.getText("MESSAGE_PAGE_DESCRIPTION"),true);this._sAriaRoleDescription=o.getText(k.ARIA_ROLE_DESCRIPTION);};k.prototype.exit=function(){if(this._oNavButton){this._oNavButton.destroy();this._oNavButton=null;}if(this._oIconControl){this._oIconControl.destroy();this._oIconControl=null;}};k.prototype.setTitle=function(t){this.setProperty("title",t,true);this._getTitle().setText(t);return this;};k.prototype.setTitleLevel=function(t){this.setProperty("titleLevel",t,true);this._getTitle().setLevel(t);return this;};k.prototype.setText=function(t){this.setProperty("text",t,true);var o=this.getAggregation("_text");o&&o.setText(t);return this;};k.prototype.setDescription=function(D){this.setProperty("description",D,true);var o=this.getAggregation("_formattedText"),m=this.getAggregation("_description");o&&o.setHtmlText(D);m&&m.setText(D);return this;};k.prototype.setShowNavButton=function(s){this.setProperty("showNavButton",s,true);var H=this._getInternalHeader();if(s){H.addContentLeft(this._oNavButton);}else{H.removeAllContentLeft();}return this;};k.prototype.setIcon=function(s){var v=this.getIcon()||"";s=s||"";if(v!==s){var S=!!v&&!!s&&I.isIconURI(s)===I.isIconURI(v);this.setProperty("icon",s,S);if(S&&this._oIconControl){this._oIconControl.setSrc(s);}}return this;};k.prototype.setEnableFormattedText=function(E){var o;if(E){o=this._getFormattedText();o.setHtmlText(this.getDescription());}return this.setProperty("enableFormattedText",E);};k.prototype._getIconControl=function(){if(this._oIconControl){this._oIconControl.destroy();this._oIconControl=null;}this._oIconControl=I.createControlByURI({id:this.getId()+"-pageIcon",src:this.getIcon(),height:"8rem",width:"8rem",useIconTooltip:true,decorative:false,alt:this.getIconAlt()},a).addStyleClass("sapMMessagePageIcon");return this._oIconControl;};k.prototype._getText=function(){if(this.getAggregation("customText")){return this.getAggregation("customText");}if(!this.getAggregation("_text")){var t=new T(this.getId()+"-text",{id:this.getId()+"-customText",text:M.escapeSettingsValue(this.getText()),textAlign:f.Center,textDirection:this.getTextDirection()});this.setAggregation("_text",t);}return this.getAggregation("_text");};k.prototype._getTitle=function(){if(!this._oTitle){this._oTitle=new b(this.getId()+"-title",{level:this.getTitleLevel()});this._getInternalHeader().addContentMiddle(this._oTitle);}return this._oTitle;};k.prototype._getDescription=function(){if(this.getAggregation("customDescription")){return this.getAggregation("customDescription");}if(this.getEnableFormattedText()){return this._getFormattedText();}if(!this.getAggregation("_description")){var D=new T(this.getId()+"-description",{id:this.getId()+"-customDescription",text:M.escapeSettingsValue(this.getDescription()),textAlign:f.Center,textDirection:this.getTextDirection()});this.setAggregation("_description",D);}return this.getAggregation("_description");};k.prototype._getAnyHeader=function(){return this._getInternalHeader();};k.prototype._getInternalHeader=function(){return this.getAggregation("_internalHeader");};k.prototype._getFormattedText=function(){var o=this.getAggregation("_formattedText");if(!o){o=new F(this.getId()+"-formattedText");this.setAggregation("_formattedText",o);}return o;};return k;});
