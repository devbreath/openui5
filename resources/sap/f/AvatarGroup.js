/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/delegate/ItemNavigation","sap/ui/dom/units/Rem","./AvatarGroupRenderer","sap/m/Button","sap/m/library","sap/ui/core/ResizeHandler","sap/ui/events/KeyCodes","sap/ui/core/Core"],function(t,e,i,o,r,a,s,n,u,h){"use strict";var p=t.AvatarGroupType;var l=s.AvatarColor;var v=s.AvatarSize;var _={XS:2,S:3,M:4,L:5,XL:7};var g={XS:.75,S:1.25,M:1.625,L:2,XL:2.75};var f={XS:.0625,S:.125,M:.125,L:.125,XL:.25,Custom:.125};var y=e.extend("sap.f.AvatarGroup",{metadata:{library:"sap.f",properties:{groupType:{type:"sap.f.AvatarGroupType",group:"Appearance",defaultValue:p.Group},avatarDisplaySize:{type:"sap.m.AvatarSize",group:"Appearance",defaultValue:v.S},avatarCustomDisplaySize:{type:"sap.ui.core.AbsoluteCSSSize",group:"Appearance",defaultValue:"3rem"},avatarCustomFontSize:{type:"sap.ui.core.AbsoluteCSSSize",group:"Appearance",defaultValue:"1.125rem"},_interactive:{type:"boolean",group:"Behavior",defaultValue:true,visibility:"hidden"}},defaultAggregation:"items",aggregations:{items:{type:"sap.f.AvatarGroupItem",multiple:true}},events:{press:{parameters:{groupType:{type:"string"},overflowButtonPressed:{type:"boolean"},avatarsDisplayed:{type:"int"}}}}},renderer:r});y.prototype.init=function(){this._oShowMoreButton=new a;this._oShowMoreButton.addStyleClass("sapFAvatarGroupMoreButton");this._oShowMoreButton.addStyleClass("sapFAvatarGroupMoreButton"+this.getAvatarDisplaySize());this._bFirstRendering=true;this._onResizeRef=this._onResize.bind(this);this._iCurrentAvatarColorNumber=1;this._bShowMoreButton=false};y.prototype.exit=function(){this._detachResizeHandlers();this._destroyItemNavigation();this._oShowMoreButton.destroy();this._oShowMoreButton=null};y.prototype._destroyItemNavigation=function(){if(this._oItemNavigation){this.removeEventDelegate(this._oItemNavigation);this._oItemNavigation.destroy();this._oItemNavigation=null}};y.prototype.onBeforeRendering=function(){if(this._bFirstRendering){this._iAvatarsToShow=this.getItems().length;this._bFirstRendering=false}};y.prototype.onAfterRendering=function(){var t=this.getProperty("_interactive"),e,o=[];if(!this._oItemNavigation&&t){this._oItemNavigation=new i(null,null);this._oItemNavigation.setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"]});this.addEventDelegate(this._oItemNavigation)}if(t){e=this.getDomRef();this._oItemNavigation.setRootDomRef(e)}if(t&&this.getGroupType()===p.Individual){this.getItems().forEach(function(t){o.push(t.getDomRef())});this._oItemNavigation.setItemDomRefs(o)}this._detachResizeHandlers();this._attachResizeHandlers();if(h.isThemeApplied()){this._onResize()}if(this._shouldShowMoreButton()){this._oShowMoreButton.$().attr("role","button");if(this.getGroupType()===p.Group){this._oShowMoreButton.$().attr("tabindex","-1")}else{this._oShowMoreButton.$().attr("aria-label",this._getResourceBundle().getText("AVATARGROUP_POPUP"))}}this._updateAccState()};y.prototype.onThemeChanged=function(){if(!this.getDomRef()){return}this._onResize()};y.prototype._getResourceBundle=function(){return sap.ui.getCore().getLibraryResourceBundle("sap.f")};y.prototype._updateAccState=function(){var t=this._getResourceBundle(),e=t.getText("AVATARGROUP_NUMBER_OF_AVATARS",[this._iAvatarsToShow,this.getItems().length-this._iAvatarsToShow]),i=t.getText("AVATARGROUP_POPUP");if(this.getGroupType()===p.Group){this.$().attr("aria-label",i+" "+e)}};y.prototype._attachResizeHandlers=function(){this._iResizeHandlerId=n.register(this,this._onResizeRef)};y.prototype._detachResizeHandlers=function(){if(this._iResizeHandlerId){n.deregister(this._iResizeHandlerId);this._iResizeHandlerId=null}};y.prototype.setGroupType=function(t){this.getItems().forEach(function(e){e._setGroupType(t)});return this.setProperty("groupType",t)};y.prototype.addItem=function(t){t._setDisplaySize(this.getAvatarDisplaySize());t._setCustomDisplaySize(this.getAvatarCustomDisplaySize());t._setCustomFontSize(this.getAvatarCustomFontSize());t._setAvatarColor(l["Accent"+this._iCurrentAvatarColorNumber]);t._setGroupType(this.getGroupType());t._setInteractive(this.getProperty("_interactive"));this.addAggregation("items",t);this._iAvatarsToShow=this.getItems().length;this._iCurrentAvatarColorNumber++;if(this._iCurrentAvatarColorNumber>10){this._iCurrentAvatarColorNumber=1}return this};y.prototype.setAvatarDisplaySize=function(t){var e=this.getAvatarDisplaySize();this._oShowMoreButton.removeStyleClass("sapFAvatarGroupMoreButton"+e);this._oShowMoreButton.addStyleClass("sapFAvatarGroupMoreButton"+t);if(e===t){return this}this.getItems().forEach(function(e){e._setDisplaySize(t)});return this.setProperty("avatarDisplaySize",t)};y.prototype.setAvatarCustomDisplaySize=function(t){var e=this.getAvatarCustomDisplaySize();if(e===t){return this}this.setProperty("avatarCustomDisplaySize",t);this.getItems().forEach(function(e){e._setCustomDisplaySize(t)});return this};y.prototype.setAvatarCustomFontSize=function(t){var e=this.getAvatarCustomFontSize();if(e===t){return this}this.setProperty("avatarCustomFontSize",t);this.getItems().forEach(function(e){e._setCustomFontSize(t)});return this};y.prototype.ontap=function(t){if(!this.getProperty("_interactive")){return}var e=t.srcControl;this.firePress({groupType:this.getGroupType(),eventSource:e,overflowButtonPressed:e===this._oShowMoreButton,avatarsDisplayed:this._iAvatarsToShow})};y.prototype.onsapspace=function(t){this.ontap(t)};y.prototype.onsapenter=function(t){this.ontap(t)};y.prototype.onkeyup=function(t){if(t.shiftKey&&t.keyCode==u.ENTER||t.shiftKey&&t.keyCode==u.SPACE){t.preventDefault()}};y.prototype._getAvatarMargin=function(t){var e=this.getGroupType(),i=this.getAvatarDisplaySize(),o;if(i===v.Custom&&e===p.Group){o=this._getAvatarWidth(v.Custom)*.4}else if(e===p.Group){o=g[t]}else{o=f[t]}return o};y.prototype._getAvatarWidth=function(t){var e,i=this.getAvatarCustomDisplaySize(),r=/.*[pP][xX]/.test(i);if(t!==v.Custom){e=_[t]}else{e=parseFloat(r?o.fromPx(i):i)}return e};y.prototype._getAvatarNetWidth=function(t,e){var i=this.getGroupType();if(i===p.Group){return t-e}else{return t+e}};y.prototype._getAvatarsToShow=function(t,e,i){var r=o.toPx(1),a=t-e*r,s=Math.floor(a/(i*r));return s+1};y.prototype._adjustAvatarsToShow=function(t){if(t-this._iAvatarsToShow>99){this._iAvatarsToShow-=2}else{this._iAvatarsToShow--}};y.prototype._getWidth=function(){return Math.ceil(this.$().width())};y.prototype._onResize=function(){var t=this._getWidth(),e=this.getItems(),i=e.length,o=this.getAvatarDisplaySize(),r=this._getAvatarWidth(o),a=this._getAvatarMargin(o),s=this._getAvatarNetWidth(r,a),n=this.$().children(".sapFAvatarGroupItem").length;if(t===0){return}this._iAvatarsToShow=this._getAvatarsToShow(t,r,s);if(o===v.Custom){this.getDomRef().style.setProperty("--sapUiAvatarGroupCustomMarginRight",r*-.4+"rem")}if(i>this._iAvatarsToShow&&i>0){this._bShowMoreButton=true;this._bAutoWidth=false;this._adjustAvatarsToShow(i);if(n!=this._iAvatarsToShow){this._oShowMoreButton.setText("+"+(i-this._iAvatarsToShow));this.invalidate()}}else{this._bAutoWidth=true;this.getDomRef().style.width="auto";if(this._bShowMoreButton){this._bShowMoreButton=false;this.invalidate()}}};y.prototype._setInteractive=function(t){if(!t){this._destroyItemNavigation()}this.getItems().forEach(function(e){e._setInteractive(t)});return this.setProperty("_interactive",t)};y.prototype._shouldShowMoreButton=function(){return this._bShowMoreButton};return y});
//# sourceMappingURL=AvatarGroup.js.map