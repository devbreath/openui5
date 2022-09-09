/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ListItemBase","./Link","./library","./FormattedText","sap/ui/core/IconPool","sap/m/Button","sap/ui/Device","./FeedListItemRenderer","sap/m/Avatar","sap/m/AvatarShape","sap/m/AvatarSize"],function(t,e,i,o,s,a,n,r,l,p,h){"use strict";var g=i.ListType;var u=i.LinkConversion;var d=i.ButtonType;var c=t.extend("sap.m.FeedListItem",{metadata:{library:"sap.m",designtime:"sap/m/designtime/FeedListItem.designtime",properties:{icon:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},iconDisplayShape:{type:"sap.m.AvatarShape",defaultValue:p.Circle},iconInitials:{type:"string",defaultValue:""},iconSize:{type:"sap.m.AvatarSize",defaultValue:h.S},activeIcon:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},sender:{type:"string",group:"Data",defaultValue:null},text:{type:"string",group:"Data",defaultValue:null},moreLabel:{type:"string",group:"Data",defaultValue:null},lessLabel:{type:"string",group:"Data",defaultValue:null},info:{type:"string",group:"Data",defaultValue:null},timestamp:{type:"string",group:"Data",defaultValue:null},senderActive:{type:"boolean",group:"Behavior",defaultValue:true},iconActive:{type:"boolean",group:"Behavior",defaultValue:true},iconDensityAware:{type:"boolean",defaultValue:true},showIcon:{type:"boolean",group:"Behavior",defaultValue:true},convertLinksToAnchorTags:{type:"sap.m.LinkConversion",group:"Behavior",defaultValue:u.None},convertedLinksDefaultTarget:{type:"string",group:"Behavior",defaultValue:"_blank"},maxCharacters:{type:"int",group:"Behavior",defaultValue:null}},defaultAggregation:"actions",aggregations:{actions:{type:"sap.m.FeedListItemAction",multiple:true},_text:{type:"sap.m.FormattedText",multiple:false,visibility:"hidden"},_actionSheet:{type:"sap.m.ActionSheet",multiple:false,visibility:"hidden"},_actionButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"},_avatar:{type:"sap.m.Avatar",multiple:false,visibility:"hidden"}},events:{senderPress:{parameters:{domRef:{type:"string"},getDomRef:{type:"function"}}},iconPress:{parameters:{domRef:{type:"string"},getDomRef:{type:"function"}}}}}});c._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.m");c._nMaxCharactersMobile=300;c._nMaxCharactersDesktop=500;c._sTextShowMore=c._oRb.getText("TEXT_SHOW_MORE");c._sTextShowLess=c._oRb.getText("TEXT_SHOW_LESS");c.prototype.init=function(){t.prototype.init.apply(this);this.setAggregation("_text",new o(this.getId()+"-formattedText"),true);this.setAggregation("_actionButton",new a({id:this.getId()+"-actionButton",type:d.Transparent,icon:"sap-icon://overflow",press:[this._onActionButtonPress,this]}),true)};c.prototype._onActionButtonPress=function(){sap.ui.require(["sap/m/ActionSheet"],this._openActionSheet.bind(this))};c.prototype._openActionSheet=function(t){var e=this.getAggregation("_actionSheet");var i=this.getActions();var o;if(!(e&&e instanceof t)){e=new t({id:this.getId()+"-actionSheet",beforeOpen:[this._onBeforeOpenActionSheet,this]});this.setAggregation("_actionSheet",e,true)}e.destroyAggregation("buttons",true);for(var s=0;s<i.length;s++){o=i[s];e.addButton(new a({icon:o.getIcon(),text:o.getText(),visible:o.getVisible(),enabled:o.getEnabled(),press:o.firePress.bind(o,{item:this})}))}e.openBy(this.getAggregation("_actionButton"))};c.prototype._onBeforeOpenActionSheet=function(t){var e,i;if(n.system.phone){return}i=sap.ui.getCore().getConfiguration().getTheme();e=t.getSource().getParent();e.removeStyleClass("sapContrast sapContrastPlus");if(i==="sap_belize"){e.addStyleClass("sapContrast")}else if(i==="sap_belize_plus"){e.addStyleClass("sapContrastPlus")}};c.prototype.invalidate=function(){t.prototype.invalidate.apply(this,arguments);var e=c._sTextShowMore;if(this.getMoreLabel()){e=this.getMoreLabel()}delete this._bTextExpanded;if(this._oLinkExpandCollapse){this._oLinkExpandCollapse.setProperty("text",e,true)}};c.prototype.onBeforeRendering=function(){this.$("realtext").find('a[target="_blank"]').off("click");var t=this.getAggregation("_text");t.setProperty("convertLinksToAnchorTags",this.getConvertLinksToAnchorTags(),true);t.setProperty("convertedLinksDefaultTarget",this.getConvertedLinksDefaultTarget(),true);if(this.getConvertLinksToAnchorTags()===u.None){t.setHtmlText(this.getText())}else{t.setProperty("htmlText",this.getText(),true)}this._sFullText=t._getDisplayHtml().replace(/\n/g,"<br>");this._sShortText=this._getCollapsedText();if(this._sShortText){this._sShortText=this._sShortText.replace(/<br>/g," ")}this._bEmptyTagsInShortTextCleared=false};c.prototype.onAfterRendering=function(){if(document.getElementById(this.getAggregation("_actionButton"))){document.getElementById(this.getAggregation("_actionButton").getId()).setAttribute("aria-haspopup","menu")}if(this._checkTextIsExpandable()&&!this._bTextExpanded){this._clearEmptyTagsInCollapsedText()}var t=this.$("realtext");o.prototype.onAfterRendering.apply({$:function(){return t}})};c.prototype.exit=function(){this.$("realtext").find('a[target="_blank"]').off("click");if(this._oLinkControl){this._oLinkControl.destroy()}if(this.oAvatar){this.oAvatar.destroy()}if(this._oLinkExpandCollapse){this._oLinkExpandCollapse.destroy()}t.prototype.exit.apply(this)};c.prototype.ontap=function(e){if(e.srcControl){if(!this.getIconActive()&&this.oAvatar&&e.srcControl.getId()===this.oAvatar.getId()||!this.getSenderActive()&&this._oLinkControl&&e.srcControl.getId()===this._oLinkControl.getId()||(!this.oAvatar||e.srcControl.getId()!==this.oAvatar.getId()&&(!this._oLinkControl||e.srcControl.getId()!==this._oLinkControl.getId())&&(!this._oLinkExpandCollapse||e.srcControl.getId()!==this._oLinkExpandCollapse.getId()))){t.prototype.ontap.apply(this,[e])}}};c.prototype.onfocusin=function(t){var e=t.srcControl,i=e.getDomRef(),o=this.getParent().getAccessbilityPosition(e);if(e instanceof c){i.setAttribute("aria-posinset",o.posInset);i.setAttribute("aria-setsize",o.setSize)}};c.prototype._getAvatar=function(){var t=this.getIcon();var e=this.getId()+"-icon";this.oAvatar=this.getAggregation("_avatar");this.oAvatar=this.oAvatar||new l(e);this.oAvatar.applySettings({src:t,displayShape:this.getIconDisplayShape(),initials:this.getIconInitials(),displaySize:this.getIconSize(),ariaLabelledBy:this.getSender()});var i=this;if(this.getIconActive()){this.oAvatar.addStyleClass("sapMFeedListItemImage");if(!this.oAvatar.hasListeners("press")){this.oAvatar.attachPress(function(){i.fireIconPress({domRef:this.getDomRef(),getDomRef:this.getDomRef.bind(this)})})}}else{this.oAvatar.addStyleClass("sapMFeedListItemImageInactive")}this.setAggregation("_avatar",this.oAvatar);return this.oAvatar};c.prototype._getLinkSender=function(t){if(!this._oLinkControl){var i=this;this._oLinkControl=new e({press:function(){i.fireSenderPress({domRef:this.getDomRef(),getDomRef:this.getDomRef.bind(this)})}});this._oLinkControl.setParent(this,null,true)}if(t){this._oLinkControl.setProperty("text",this.getSender()+c._oRb.getText("COLON"),true)}else{this._oLinkControl.setProperty("text",this.getSender(),true)}this._oLinkControl.setProperty("enabled",this.getSenderActive(),true);return this._oLinkControl};c.prototype._activeHandlingInheritor=function(){var t=this.getActiveIcon();if(this.oAvatar&&t){this.oAvatar.setSrc(t)}};c.prototype._inactiveHandlingInheritor=function(){var t=this.getIcon()?this.getIcon():s.getIconURI("person-placeholder");if(this.oAvatar){this.oAvatar.setSrc(t)}};c.prototype._getCollapsedText=function(){this._nMaxCollapsedLength=this.getMaxCharacters();if(this._nMaxCollapsedLength===0){if(n.system.phone){this._nMaxCollapsedLength=c._nMaxCharactersMobile}else{this._nMaxCollapsedLength=c._nMaxCharactersDesktop}}var t=this._convertHtmlToPlainText(this._sFullText);var e=null;if(t&&t.length>this._nMaxCollapsedLength){var i=t.substring(0,this._nMaxCollapsedLength);var o=i.lastIndexOf(" ");if(o>0){i=i.substr(0,o)}if(t.length===this._sFullText.length){e=i}else{e=this._convertPlainToHtmlText(i)}}return e};c.prototype._clearEmptyTagsInCollapsedText=function(){var t;if(this._bEmptyTagsInShortTextCleared){return}this._bEmptyTagsInShortTextCleared=true;do{t=this.$("realtext").find(":empty").remove()}while(t.length>0);this._sShortText=this.$("realtext").html()};c.prototype._toggleTextExpanded=function(){var t=this.$("realtext");var e=this.$("threeDots");var i=c._sTextShowMore;var o=c._sTextShowLess;if(this.getMoreLabel()){i=this.getMoreLabel()}if(this.getLessLabel()){o=this.getLessLabel()}if(this._bTextExpanded){t.html(this._sShortText.replace(/&#xa;/g,"<br>"));e.text(" ... ");this._oLinkExpandCollapse.setText(i);this._bTextExpanded=false;this._clearEmptyTagsInCollapsedText()}else{t.html(this._sFullText.replace(/&#xa;/g,"<br>"));e.text("  ");this._oLinkExpandCollapse.setText(o);this._bTextExpanded=true}};c.prototype._getLinkExpandCollapse=function(){var t=c._sTextShowMore;if(this.getMoreLabel()){t=this.getMoreLabel()}if(!this._oLinkExpandCollapse){this._oLinkExpandCollapse=new e({text:t,press:[this._toggleTextExpanded,this]});this._bTextExpanded=false;this._oLinkExpandCollapse.setParent(this,null,true)}return this._oLinkExpandCollapse};c.prototype._convertHtmlToPlainText=function(t){var e=/(<([^>]+)>)/gi;return t.replace(e,"")};c.prototype._convertPlainToHtmlText=function(t){var e=this._sFullText;var i=/(<([^>]+)>)/gi;var o=e.split(i);var s="";for(var a=0;a<o.length;a++){if(o[a].length===0){continue}if(t.length>0&&o[a].indexOf(t.trim())!==-1){o[a]=t}if(/^<.+>$/.test(o[a])){s=s+o[a];o[a+1]="";continue}if(t.indexOf(o[a].trim())===-1){continue}else{t=t.replace(o[a],"")}s=s+o[a]}return s};c.prototype._checkTextIsExpandable=function(){return this._sShortText!==null};c.prototype.setType=function(t){if(this.getType()!==t){if(t===g.Navigation){this.setProperty("type",g.Active)}else{this.setProperty("type",t)}}return this};return c});
//# sourceMappingURL=FeedListItem.js.map