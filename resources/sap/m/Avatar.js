/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/IconPool","./AvatarRenderer","sap/ui/events/KeyCodes","sap/base/Log","sap/ui/core/Icon","./library","sap/ui/core/library"],function(e,t,a,i,o,r,s,n){"use strict";var p=s.AvatarType;var l=s.AvatarImageFitType;var u=s.AvatarColor;var c=s.AvatarSize;var g=s.AvatarShape;var h=n.aria.HasPopup;var d=Object.keys(u).filter(function(e){return e.indexOf("Accent")!==-1});var f=e.extend("sap.m.Avatar",{metadata:{library:"sap.m",properties:{src:{type:"sap.ui.core.URI",group:"Data",defaultValue:null},initials:{type:"string",group:"Data",defaultValue:null},displayShape:{type:"sap.m.AvatarShape",group:"Appearance",defaultValue:g.Circle},displaySize:{type:"sap.m.AvatarSize",group:"Appearance",defaultValue:c.S},customDisplaySize:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"3rem"},customFontSize:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:"1.125rem"},imageFitType:{type:"sap.m.AvatarImageFitType",group:"Appearance",defaultValue:l.Cover},fallbackIcon:{type:"string",group:"Data",defaultValue:null},backgroundColor:{type:"sap.m.AvatarColor",group:"Appearance",defaultValue:u.Accent6},showBorder:{type:"boolean",group:"Appearance",defaultValue:false},badgeIcon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""},badgeTooltip:{type:"string",group:"Data",defaultValue:null},decorative:{type:"boolean",group:"Accessibility",defaultValue:false},ariaHasPopup:{type:"sap.ui.core.aria.HasPopup",group:"Accessibility",defaultValue:h.None}},aggregations:{detailBox:{type:"sap.m.LightBox",multiple:false,bindable:"bindable"},_badge:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"},_icon:{type:"sap.ui.core.Icon",multiple:false,visibility:"hidden"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{press:{}},dnd:{draggable:true,droppable:false},designtime:"sap/m/designtime/Avatar.designtime"}});f.DEFAULT_CIRCLE_PLACEHOLDER="sap-icon://person-placeholder";f.DEFAULT_SQUARE_PLACEHOLDER="sap-icon://product";f.AVATAR_BADGE_TOOLTIP={"sap-icon://zoom-in":sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("AVATAR_TOOLTIP_ZOOMIN"),"sap-icon://camera":sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("AVATAR_TOOLTIP_CAMERA"),"sap-icon://edit":sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("AVATAR_TOOLTIP_EDIT")};f.prototype.init=function(){this._sActualType=null;this._bIsDefaultIcon=true;this._sImageFallbackType=null;this._sPickedRandomColor=null;this._badgeRef=null};f.prototype.exit=function(){if(this._fnLightBoxOpen){this._fnLightBoxOpen=null}if(this._badgeRef){this._badgeRef.destroy()}this._sPickedRandomColor=null};f.prototype.setDetailBox=function(e){var t=this.getDetailBox();if(e){if(e===t){return this}if(t){this.detachPress(this._fnLightBoxOpen,t)}this._fnLightBoxOpen=e.open;this.attachPress(this._fnLightBoxOpen,e)}else if(this._fnLightBoxOpen){this.detachPress(this._fnLightBoxOpen,t);this._fnLightBoxOpen=null}return this.setAggregation("detailBox",e)};f.prototype.clone=function(){var t=e.prototype.clone.apply(this,arguments),a=t.getDetailBox();if(a){t.detachPress(this._fnLightBoxOpen,this.getDetailBox());t._fnLightBoxOpen=a.open;t.attachPress(t._fnLightBoxOpen,a)}return t};f.prototype.attachPress=function(){Array.prototype.unshift.apply(arguments,["press"]);e.prototype.attachEvent.apply(this,arguments);if(this.hasListeners("press")){this.$().attr("tabindex","0");this.$().attr("role","button")}return this};f.prototype.detachPress=function(){Array.prototype.unshift.apply(arguments,["press"]);e.prototype.detachEvent.apply(this,arguments);if(!this.hasListeners("press")){this.$().removeAttr("tabindex");this.$().attr("role","img")}return this};f.prototype.ontap=function(){this.firePress({})};f.prototype.onkeydown=function(e){if(e.which===i.SHIFT||e.which===i.ESCAPE){this._bShouldInterupt=this._bSpacePressed}if(e.which===i.SPACE){this._bSpacePressed=true;e.preventDefault()}if(e.which===i.ENTER){this.firePress({})}};f.prototype.onkeyup=function(e){if(e.which===i.SPACE){if(!this._bShouldInterupt){this.firePress({})}this._bShouldInterupt=false;this._bSpacePressed=false;e.stopPropagation()}};f.prototype._areInitialsValid=function(e){var t=/^[a-zA-Z]{1,2}$/;if(!t.test(e)){o.warning("Initials should consist of only 1 or 2 latin letters",this);this._sActualType=p.Icon;this._bIsDefaultIcon=true;return false}return true};f.prototype._validateSrc=function(e){if(t.isIconURI(e)){this._sActualType=p.Icon;this._bIsDefaultIcon=t.getIconInfo(e)?false:true}else{this._bIsDefaultIcon=true;this._sActualType=p.Image;this.preloadedImage=new window.Image;this.preloadedImage.src=e;this.preloadedImage.onload=this._onImageLoad.bind(this);this.preloadedImage.onerror=this._onImageError.bind(this)}return this};f.prototype._getDisplayIcon=function(e){return t.isIconURI(e)&&t.getIconInfo(e)?t.createControlByURI({src:e}):null};f.prototype._getActualDisplayType=function(){var e=this.getSrc(),t=this.getInitials();if(e){this._validateSrc(e)}else if(t&&this._areInitialsValid(t)){this._sActualType=p.Initials}else{o.warning("No src and initials were provided",this);this._sActualType=p.Icon;this._bIsDefaultIcon=true}return this._sActualType};f.prototype._getImageFallbackType=function(){var e=this.getInitials();this._sImageFallbackType=e&&this._areInitialsValid(e)?p.Initials:p.Icon;return this._sImageFallbackType};f.prototype._getDefaultIconPath=function(e){var a=null,i=this.getFallbackIcon();if(i&&t.isIconURI(i)){a=i}else if(e===g.Circle){a=f.DEFAULT_CIRCLE_PLACEHOLDER}else if(e===g.Square){a=f.DEFAULT_SQUARE_PLACEHOLDER}return a};f.prototype._getIcon=function(){var e=this.getSrc(),a=this.getAggregation("_icon"),i=this.getDisplayShape();if(this._bIsDefaultIcon){e=this._getDefaultIconPath(i)}if(!a){a=t.createControlByURI({alt:"Image placeholder",src:e});this.setAggregation("_icon",a)}else if(a.getSrc()!==e){a.setSrc(e)}return a};f.prototype._getDefaultTooltip=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("AVATAR_TOOLTIP")};f.prototype._getBadgeIconSource=function(){var e;if(this.getDetailBox()){e="sap-icon://zoom-in"}else if(this.getBadgeIcon()!==""){if(this._getDisplayIcon(this.getBadgeIcon())){e=this.getBadgeIcon()}else{o.warning("No valid Icon URI source for badge affordance was provided")}}return e};f.prototype._getBadgeTooltip=function(){var e=this._getDefaultTooltip(),t=this.getBadgeIcon();if(this.getBadgeTooltip()){e=this.getBadgeTooltip()}else if(t&&f.AVATAR_BADGE_TOOLTIP[this.getBadgeIcon()]){e=f.AVATAR_BADGE_TOOLTIP[t]}return e};f.prototype._getBadge=function(){var e=this._getBadgeIconSource(),t=this._getBadgeTooltip();if(!e){return}if(!this._badgeRef){this.setAggregation("_badge",new r({src:e,tooltip:t}))}this._badgeRef=this.getAggregation("_badge");return this._badgeRef};f.prototype._onImageLoad=function(){delete this.preloadedImage};f.prototype._onImageError=function(){var e=this._getImageFallbackType();this.$().removeClass("sapFAvatarImage").addClass("sapFAvatar"+e);delete this.preloadedImage};f.prototype._getActualBackgroundColor=function(){var e=this.getBackgroundColor();if(e===u.Random){if(this._sPickedRandomColor){return this._sPickedRandomColor}e=this._sPickedRandomColor=u[d[d.length*Math.random()<<0]]}else{this._sPickedRandomColor=null}return e};return f});
//# sourceMappingURL=Avatar.js.map