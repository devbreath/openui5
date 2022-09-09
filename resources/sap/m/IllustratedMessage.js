/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/m/Text","sap/m/Title","sap/m/FormattedText","sap/m/Illustration","sap/ui/core/Control","sap/ui/core/Core","sap/ui/core/library","sap/ui/core/ResizeHandler","sap/ui/thirdparty/jquery","./IllustratedMessageRenderer"],function(e,t,i,s,a,o,r,l,n,jQuery,p){"use strict";var u=e.IllustratedMessageSize;var T=e.IllustratedMessageType;var d=l.TextAlign;var I=o.extend("sap.m.IllustratedMessage",{metadata:{library:"sap.m",properties:{description:{type:"string",group:"Misc",defaultValue:""},enableFormattedText:{type:"boolean",group:"Appearance",defaultValue:false},enableVerticalResponsiveness:{type:"boolean",group:"Appearance",defaultValue:false},illustrationSize:{type:"sap.m.IllustratedMessageSize",group:"Appearance",defaultValue:u.Auto},illustrationType:{type:"string",group:"Appearance",defaultValue:T.NoSearchResults},title:{type:"string",group:"Misc",defaultValue:""}},aggregations:{additionalContent:{type:"sap.m.Button",multiple:true},_formattedText:{type:"sap.m.FormattedText",multiple:false,visibility:"hidden"},_illustration:{type:"sap.m.Illustration",visibility:"hidden",multiple:false},_text:{type:"sap.m.Text",multiple:false,visibility:"hidden"},_title:{type:"sap.m.Title",multiple:false,visibility:"hidden"}},associations:{illustrationAriaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"illustrationAriaLabelledBy"}},dnd:{draggable:false,droppable:true}}});I.ORIGINAL_TEXTS={UnableToLoad:"UnableToLoad",UnableToUpload:"UnableToUpload",NoActivities:"NoActivities",BeforeSearch:"BeforeSearch",NoSearchResults:"NoSearchResults",NoEntries:"NoEntries",NoData:"NoData",NoNotifications:"NoNotifications",BalloonSky:"BalloonSky",SuccessScreen:"SuccessScreen",NoMail:"NoMail",NoSavedItems:"NoSavedItems",NoTasks:"NoTasks"};I.FALLBACK_TEXTS={ReloadScreen:I.ORIGINAL_TEXTS.UnableToLoad,Connection:I.ORIGINAL_TEXTS.UnableToLoad,ErrorScreen:I.ORIGINAL_TEXTS.UnableToUpload,EmptyCalendar:I.ORIGINAL_TEXTS.NoActivities,SearchEarth:I.ORIGINAL_TEXTS.BeforeSearch,SearchFolder:I.ORIGINAL_TEXTS.NoSearchResults,EmptyList:I.ORIGINAL_TEXTS.NoEntries,Tent:I.ORIGINAL_TEXTS.NoData,SleepingBell:I.ORIGINAL_TEXTS.NoNotifications,SimpleBalloon:I.ORIGINAL_TEXTS.BalloonSky,SimpleBell:I.ORIGINAL_TEXTS.NoNotifications,SimpleCalendar:I.ORIGINAL_TEXTS.NoActivities,SimpleCheckMark:I.ORIGINAL_TEXTS.SuccessScreen,SimpleConnection:I.ORIGINAL_TEXTS.UnableToLoad,SimpleEmptyDoc:I.ORIGINAL_TEXTS.NoData,SimpleEmptyList:I.ORIGINAL_TEXTS.NoEntries,SimpleError:I.ORIGINAL_TEXTS.UnableToUpload,SimpleMagnifier:I.ORIGINAL_TEXTS.BeforeSearch,SimpleMail:I.ORIGINAL_TEXTS.NoMail,SimpleNoSavedItems:I.ORIGINAL_TEXTS.NoSavedItems,SimpleNotFoundMagnifier:I.ORIGINAL_TEXTS.NoSearchResults,SimpleReload:I.ORIGINAL_TEXTS.UnableToLoad,SimpleTask:I.ORIGINAL_TEXTS.NoTasks,SuccessBalloon:I.ORIGINAL_TEXTS.BalloonSky,SuccessCheckMark:I.ORIGINAL_TEXTS.SuccessScreen,SuccessHighFive:I.ORIGINAL_TEXTS.BalloonSky};I.PREPENDS={DESCRIPTION:"IllustratedMessage_DESCRIPTION_",TITLE:"IllustratedMessage_TITLE_"};I.BREAK_POINTS={DIALOG:679,SPOT:319,BASE:259};I.BREAK_POINTS_HEIGHT={DIALOG:451,SPOT:296,BASE:154};I.MEDIA={BASE:"sapMIllustratedMessage-Base",SPOT:"sapMIllustratedMessage-Spot",DIALOG:"sapMIllustratedMessage-Dialog",SCENE:"sapMIllustratedMessage-Scene"};I.RESIZE_HANDLER_ID={CONTENT:"_sContentResizeHandlerId"};I.prototype.init=function(){this._sLastKnownMedia=null;this._updateInternalIllustrationSetAndType(this.getIllustrationType())};I.prototype.onBeforeRendering=function(){this._detachResizeHandlers()};I.prototype.onAfterRendering=function(){this._updateDomSize();this._attachResizeHandlers();this._preventWidowWords(this._getTitle().getDomRef());this._preventWidowWords(this._getDescription().getDomRef())};I.prototype.exit=function(){this._detachResizeHandlers()};I.prototype.setIllustrationType=function(e){if(this.getIllustrationType()===e){return this}this._updateInternalIllustrationSetAndType(e);return this.setProperty("illustrationType",e)};I.prototype._getDefaultDescription=function(){return this._findDefaultText(I.PREPENDS.DESCRIPTION)};I.prototype._getDefaultTitle=function(){return this._findDefaultText(I.PREPENDS.TITLE)};I.prototype._findDefaultText=function(e){var t=this._getResourceBundle();return t.getText(e+this._sIllustrationType,null,true)||t.getText(e+this._sIllustrationType.substr(0,this._sIllustrationType.indexOf("_v")),null,true)||t.getText(e+I.FALLBACK_TEXTS[this._sIllustrationType],null,true)};I.prototype._getDescription=function(){return this.getEnableFormattedText()?this._getFormattedText():this._getText()};I.prototype._getFormattedText=function(){var e=this.getDescription(),t=this.getAggregation("_formattedText");if(!t){t=new s({textAlign:d.Center});this.setAggregation("_formattedText",t)}if(e){t.setHtmlText(e)}else{t.setHtmlText(this._getDefaultDescription())}return t};I.prototype._getIllustration=function(){var e=this.getAggregation("_illustration");if(!e){e=new a;this.setAggregation("_illustration",e)}return e};I.prototype._getResourceBundle=function(){return r.getLibraryResourceBundle("sap.m")};I.prototype._getText=function(){var e=this.getDescription(),i=this.getAggregation("_text");if(!i){i=new t({textAlign:d.Center});this.setAggregation("_text",i)}if(e){i.setText(e)}else{i.setText(this._getDefaultDescription())}return i};I.prototype._getTitle=function(){var e=this.getTitle(),t=this.getAggregation("_title");if(!t){t=new i({wrapping:true});this.setAggregation("_title",t)}if(e){t.setText(e)}else{t.setText(this._getDefaultTitle())}return t};I.prototype._preventWidowWords=function(e){var t,i,s=window.HTMLElement;if(!(s&&e instanceof s)){return}t=jQuery(e);i=t.html();i=i.replace(/ ([^ ]*)$/,"&nbsp;$1");t.html(i)};I.prototype._updateDomSize=function(){var e=this.getDomRef(),t,i;if(e){t=this.getIllustrationSize();if(t===u.Auto){this._updateMedia(e.getBoundingClientRect().width,e.getBoundingClientRect().height)}else{i=I.MEDIA[t.toUpperCase()];this._updateMediaStyle(i);this._updateSymbol(i)}}};I.prototype._updateInternalIllustrationSetAndType=function(e){var t=e.split("-");this._sIllustrationSet=t[0];this._sIllustrationType=t[1]};I.prototype._onResize=function(e){var t=e.size.width,i=e.size.height;this._updateMedia(t,i)};I.prototype._updateMedia=function(e,t){var i=this.getEnableVerticalResponsiveness(),s;if(!e&&!t){return}if(e<=I.BREAK_POINTS.BASE||t<=I.BREAK_POINTS_HEIGHT.BASE&&i){s=I.MEDIA.BASE}else if(e<=I.BREAK_POINTS.SPOT||t<=I.BREAK_POINTS_HEIGHT.SPOT&&i){s=I.MEDIA.SPOT}else if(e<=I.BREAK_POINTS.DIALOG||t<=I.BREAK_POINTS_HEIGHT.DIALOG&&i){s=I.MEDIA.DIALOG}else{s=I.MEDIA.SCENE}this._updateMediaStyle(s);this._updateSymbol(s)};I.prototype._updateMediaStyle=function(e){if(this._sLastKnownMedia!==e){this._sLastKnownMedia=e}else{return}Object.keys(I.MEDIA).forEach(function(t){var i=e===I.MEDIA[t];this.toggleStyleClass(I.MEDIA[t],i)},this)};I.prototype._updateSymbol=function(e){var t=e.substring(e.indexOf("-")+1);if(e!==I.MEDIA.BASE){this._getIllustration().setSet(this._sIllustrationSet,true).setMedia(t,true).setType(this._sIllustrationType)}};I.prototype._attachResizeHandlers=function(){var e=this.getIllustrationSize();if(this.getDomRef()&&e===u.Auto){this._registerResizeHandler(I.RESIZE_HANDLER_ID.CONTENT,this,this._onResize.bind(this))}};I.prototype._detachResizeHandlers=function(){this._deRegisterResizeHandler(I.RESIZE_HANDLER_ID.CONTENT)};I.prototype._registerResizeHandler=function(e,t,i){if(!this[e]){this[e]=n.register(t,i)}};I.prototype._deRegisterResizeHandler=function(e){if(this[e]){n.deregister(this[e]);this[e]=null}};I.prototype.getAccessibilityReferences=function(){return{title:this._getTitle().getId(),description:this._getDescription().getId()}};I.prototype.getAccessibilityInfo=function(){var e=this._getTitle().getText(),t=this._getDescription().getText(),i=this.getAdditionalContent();return{type:this._getResourceBundle().getText("ACC_CTR_ILLUSTRATED_MESSAGE"),description:e+". "+t,focusable:!!i.length,children:i}};I.prototype.addIllustrationAriaLabelledBy=function(e){this.addAssociation("ariaLabelledBy",e,true);var t=this._getIllustration();t.addAriaLabelledBy(e);return this};I.prototype.removeIllustrationAriaLabelledBy=function(e){this.removeAssociation("ariaLabelledBy",e,true);var t=this._getIllustration();t.removeAriaLabelledBy(e);return this};I.prototype.removeAllAriaLabelledBy=function(e){this.removeAssociation("ariaLabelledBy",e,true);var t=this._getIllustration();t.removeAllAriaLabelledBy(e);return this};return I});
//# sourceMappingURL=IllustratedMessage.js.map