/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/Shortcut","sap/f/library","sap/f/DynamicPage","sap/f/DynamicPageTitle","sap/f/DynamicPageHeader","sap/m/OverflowToolbar","sap/m/ActionSheet","./SemanticTitle","./SemanticFooter","./SemanticShareMenu","./SemanticConfiguration","./SemanticPageRenderer"],function(C,S,l,D,a,b,O,A,c,d,e,f,g){"use strict";var h=l.DynamicPageTitleArea;var i=C.extend("sap.f.semantic.SemanticPage",{metadata:{library:"sap.f",properties:{headerExpanded:{type:"boolean",group:"Behavior",defaultValue:true},headerPinnable:{type:"boolean",group:"Behavior",defaultValue:true},preserveHeaderStateOnScroll:{type:"boolean",group:"Behavior",defaultValue:false},toggleHeaderOnTitleClick:{type:"boolean",group:"Behavior",defaultValue:true},showFooter:{type:"boolean",group:"Behavior",defaultValue:false},titlePrimaryArea:{type:"sap.f.DynamicPageTitleArea",group:"Appearance",defaultValue:h.Begin,deprecated:true},titleAreaShrinkRatio:{type:"sap.f.DynamicPageTitleShrinkRatio",group:"Appearance",defaultValue:"1:1.6:1.6"},fitContent:{type:"boolean",group:"Behavior",defaultValue:false}},defaultAggregation:"content",aggregations:{titleHeading:{type:"sap.ui.core.Control",multiple:false,defaultValue:null,forwarding:{getter:"_getTitle",aggregation:"heading"}},titleExpandedHeading:{type:"sap.ui.core.Control",multiple:false,defaultValue:null,forwarding:{getter:"_getTitle",aggregation:"expandedHeading"}},titleSnappedHeading:{type:"sap.ui.core.Control",multiple:false,defaultValue:null,forwarding:{getter:"_getTitle",aggregation:"snappedHeading"}},titleBreadcrumbs:{type:"sap.m.IBreadcrumbs",multiple:false,defaultValue:null,forwarding:{getter:"_getTitle",aggregation:"breadcrumbs"}},titleSnappedOnMobile:{type:"sap.m.Title",multiple:false,forwarding:{getter:"_getTitle",aggregation:"snappedTitleOnMobile"}},titleSnappedContent:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getTitle",aggregation:"snappedContent"}},titleExpandedContent:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getTitle",aggregation:"expandedContent"}},titleContent:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getTitle",aggregation:"content"}},titleMainAction:{type:"sap.f.semantic.TitleMainAction",multiple:false},editAction:{type:"sap.f.semantic.EditAction",multiple:false},deleteAction:{type:"sap.f.semantic.DeleteAction",multiple:false},copyAction:{type:"sap.f.semantic.CopyAction",multiple:false},addAction:{type:"sap.f.semantic.AddAction",multiple:false},flagAction:{type:"sap.f.semantic.FlagAction",multiple:false},favoriteAction:{type:"sap.f.semantic.FavoriteAction",multiple:false},fullScreenAction:{type:"sap.f.semantic.FullScreenAction",multiple:false},exitFullScreenAction:{type:"sap.f.semantic.ExitFullScreenAction",multiple:false},closeAction:{type:"sap.f.semantic.CloseAction",multiple:false},titleCustomTextActions:{type:"sap.m.Button",multiple:true},titleCustomIconActions:{type:"sap.m.OverflowToolbarButton",multiple:true},headerContent:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_getHeader",aggregation:"content"}},content:{type:"sap.ui.core.Control",multiple:false},footerMainAction:{type:"sap.f.semantic.FooterMainAction",multiple:false},messagesIndicator:{type:"sap.f.semantic.MessagesIndicator",multiple:false},draftIndicator:{type:"sap.m.DraftIndicator",multiple:false},positiveAction:{type:"sap.f.semantic.PositiveAction",multiple:false},negativeAction:{type:"sap.f.semantic.NegativeAction",multiple:false},footerCustomActions:{type:"sap.m.Button",multiple:true},discussInJamAction:{type:"sap.f.semantic.DiscussInJamAction",multiple:false},saveAsTileAction:{type:"sap.m.Button",multiple:false},shareInJamAction:{type:"sap.f.semantic.ShareInJamAction",multiple:false},sendMessageAction:{type:"sap.f.semantic.SendMessageAction",multiple:false},sendEmailAction:{type:"sap.f.semantic.SendEmailAction",multiple:false},printAction:{type:"sap.f.semantic.PrintAction",multiple:false},customShareActions:{type:"sap.m.Button",multiple:true},landmarkInfo:{type:"sap.f.DynamicPageAccessibleLandmarkInfo",multiple:false,forwarding:{getter:"_getPage",aggregation:"landmarkInfo"}},_dynamicPage:{type:"sap.f.DynamicPage",multiple:false,visibility:"hidden"}},dnd:{draggable:false,droppable:true},designtime:"sap/f/designtime/SemanticPage.designtime"}});i._EVENTS={SHARE_MENU_CONTENT_CHANGED:"_shareMenuContentChanged"};i._SAVE_AS_TILE_ACTION="saveAsTileAction";i.CONTENT_PADDING_CLASSES_TO_FORWARD={"sapUiNoContentPadding":true,"sapUiContentPadding":true,"sapUiResponsiveContentPadding":true};i.ARIA_ROLE_DESCRIPTION="SEMANTIC_PAGE_ROLE_DESCRIPTION";i.prototype.init=function(){this._bSPBeingDestroyed=false;this._initDynamicPage();this._attachShareMenuButtonChange();this._fnActionSubstituteParentFunction=function(){return this;}.bind(this);};i.prototype.exit=function(){this._bSPBeingDestroyed=true;this._cleanMemory();};i.prototype.setHeaderExpanded=function(H){this._getPage().setHeaderExpanded(H);return this;};i.prototype.getHeaderExpanded=function(){return this._getPage().getHeaderExpanded();};i.prototype.setHeaderPinnable=function(H){var o=this._getPage(),j=o.getHeader();j.setPinnable(H);return this.setProperty("headerPinnable",j.getPinnable(),true);};i.prototype.setPreserveHeaderStateOnScroll=function(p){var o=this._getPage();o.setPreserveHeaderStateOnScroll(p);return this.setProperty("preserveHeaderStateOnScroll",o.getPreserveHeaderStateOnScroll(),true);};i.prototype.setToggleHeaderOnTitleClick=function(t){this._getPage().setToggleHeaderOnTitleClick(t);return this.setProperty("toggleHeaderOnTitleClick",t,true);};i.prototype.setShowFooter=function(s){this._getPage().setShowFooter(s);return this.setProperty("showFooter",s,true);};i.prototype.setTitlePrimaryArea=function(p){var o=this._getTitle();o.setPrimaryArea(p);return this.setProperty("titlePrimaryArea",o.getPrimaryArea(),true);};i.prototype.setTitleAreaShrinkRatio=function(s){var o=this._getTitle();o.setAreaShrinkRatio(s);return this.setProperty("titleAreaShrinkRatio",o.getAreaShrinkRatio(),true);};i.prototype.setFitContent=function(F){this._getPage().setFitContent(F);return this.setProperty("fitContent",F,true);};i.prototype.addStyleClass=function(s,j){var o=this.getAggregation("_dynamicPage");if(i.CONTENT_PADDING_CLASSES_TO_FORWARD[s]){o.addStyleClass(s,true);}return C.prototype.addStyleClass.call(this,s,j);};i.prototype.removeStyleClass=function(s,j){var o=this.getAggregation("_dynamicPage");if(i.CONTENT_PADDING_CLASSES_TO_FORWARD[s]){o.removeStyleClass(s,true);}return C.prototype.removeStyleClass.call(this,s,j);};i.prototype.setAggregation=function(s,o,j){var k=this.mAggregations[s],t,p;if(k===o){return this;}o=this.validateAggregation(s,o,false);if(s===i._SAVE_AS_TILE_ACTION){t=i._SAVE_AS_TILE_ACTION;}else{t=this.getMetadata().getManagedAggregation(s).type;}if(f.isKnownSemanticType(t)){p=f.getPlacement(t);if(k){this._onRemoveAggregation(k,t);this._getSemanticContainer(p).removeContent(k,p);}if(o){o._getType=function(){return t;};this._getSemanticContainer(p).addContent(o,p);this._onAddAggregation(o,t);}return C.prototype.setAggregation.call(this,s,o,true);}return C.prototype.setAggregation.call(this,s,o,j);};i.prototype.destroyAggregation=function(s,j){var o=this.getMetadata().getAggregations()[s],k,p,t;if(s===i._SAVE_AS_TILE_ACTION){t=i._SAVE_AS_TILE_ACTION;}else{t=o&&o.type;}if(t&&f.isKnownSemanticType(t)){k=C.prototype.getAggregation.call(this,s);if(k){p=f.getPlacement(t);this._onRemoveAggregation(k,t);!this._bSPBeingDestroyed&&this._getSemanticContainer(p).removeContent(k,p);}}return C.prototype.destroyAggregation.call(this,s,j);};i.prototype.onBeforeRendering=function(){var s=this._getShareMenu(),v=s._getVisibleActions(),V=v.length;s._getShareMenuButton().setVisible(V>1);if(V===1){this._showSingleVisibleAction();}if(this._iVisibleShareMenuAction===1&V>1){this._hideSingleVisibleAction();this._iVisibleShareMenuAction=V;}};i.prototype._addShareMenuSingleAction=function(v){if(v){var I=f.isKnownSemanticType(v.getMetadata().getName());v._bIsSingleAction=true;this._getSemanticTitle().addContent(v,I?f._Placement.titleIcon:f._Placement.titleText);this._iVisibleShareMenuAction=1;this._oSingleVisibleAction=v;}};["getContent","setContent","destroyContent"].forEach(function(m){var j=/^(set|destroy)/.test(m);i.prototype[m]=function(o){var k=this._getPage();var r=k[m].apply(k,arguments);return j?this:r;};},this);["addTitleCustomTextAction","insertTitleCustomTextAction","indexOfTitleCustomTextAction","removeTitleCustomTextAction","removeAllTitleCustomTextActions","destroyTitleCustomTextActions","getTitleCustomTextActions"].forEach(function(m){var j=/^(add|insert|destroy)/.test(m);i.prototype[m]=function(){var s=this._getSemanticTitle(),k=m.replace(/TitleCustomTextAction?/,"CustomTextAction"),r;r=s[k].apply(s,arguments);return j?this:r;};},this);["addTitleCustomIconAction","insertTitleCustomIconAction","indexOfTitleCustomIconAction","removeTitleCustomIconAction","removeAllTitleCustomIconActions","destroyTitleCustomIconActions","getTitleCustomIconActions"].forEach(function(m){var j=/^(add|insert|destroy)/.test(m);i.prototype[m]=function(){var s=this._getSemanticTitle(),k=m.replace(/TitleCustomIconAction?/,"CustomIconAction"),r;r=s[k].apply(s,arguments);return j?this:r;};},this);["addFooterCustomAction","insertFooterCustomAction","indexOfFooterCustomAction","removeFooterCustomAction","removeAllFooterCustomActions","destroyFooterCustomActions","getFooterCustomActions"].forEach(function(m){var j=/^(add|insert|destroy)/.test(m);i.prototype[m]=function(){var s=this._getSemanticFooter(),k=m.replace(/FooterCustomAction?/,"CustomAction"),r;r=s[k].apply(s,arguments);return j?this:r;};},this);["addCustomShareAction","insertCustomShareAction","indexOfCustomShareAction","removeCustomShareAction","removeAllCustomShareActions","destroyCustomShareActions","getCustomShareActions"].forEach(function(m){var j=/^(add|insert|destroy)/.test(m);i.prototype[m]=function(){var s=this._getShareMenu(),k=m.replace(/CustomShareAction?/,"CustomAction"),r;r=s[k].apply(s,arguments);return j?this:r;};},this);i.prototype._onAddAggregation=function(o,t){if(t===i._SAVE_AS_TILE_ACTION){this._replaceParent(o);}};i.prototype._onRemoveAggregation=function(o,t){if(t===i._SAVE_AS_TILE_ACTION){this._restoreParent(o);}if(o._getType){delete o._getType;}};i.prototype._replaceParent=function(o){if(o._fnOriginalGetParent){return;}o._fnOriginalGetParent=o.getParent;o.getParent=this._fnActionSubstituteParentFunction;};i.prototype._restoreParent=function(o){if(o&&o._fnOriginalGetParent){o.getParent=o._fnOriginalGetParent;}};i.prototype._attachShareMenuButtonChange=function(){this.attachEvent(i._EVENTS.SHARE_MENU_CONTENT_CHANGED,this._onShareMenuContentChanged,this);};i.prototype._onShareMenuContentChanged=function(E){var s=E.getParameter("bEmpty"),o=this._getSemanticTitle(),j=this._getShareMenu(),k=j._getShareMenuButton();if(!k.getParent()){o.addContent(k,"shareIcon");return;}k.setVisible(!s);};i.prototype._getPage=function(){if(!this.getAggregation("_dynamicPage")){this._initDynamicPage();}return this.getAggregation("_dynamicPage");};i.prototype._initDynamicPage=function(){var o=new D(this.getId()+"-page",{title:this._getTitle(),header:this._getHeader(),footer:this._getFooter()}),s=sap.ui.getCore().getLibraryResourceBundle("sap.f").getText(i.ARIA_ROLE_DESCRIPTION);o._setAriaRoleDescription(s);this.setAggregation("_dynamicPage",o,true);};i.prototype._getTitle=function(){if(!this._oDynamicPageTitle){this._oDynamicPageTitle=this._getSemanticTitle()._getContainer();S.register(this._oDynamicPageTitle,"Ctrl+Shift+S",this._openShareMenu.bind(this));}return this._oDynamicPageTitle;};i.prototype._getHeader=function(){if(!this._oDynamicPageHeader){this._oDynamicPageHeader=new b(this.getId()+"-pageHeader");}return this._oDynamicPageHeader;};i.prototype._getFooter=function(){if(!this._oDynamicPageFooter){this._oDynamicPageFooter=this._getSemanticFooter()._getContainer();}return this._oDynamicPageFooter;};i.prototype._getSemanticTitle=function(){if(!this._oSemanticTitle){this._oSemanticTitle=new c(new a(this.getId()+"-pageTitle"),this);}return this._oSemanticTitle;};i.prototype._getShareMenu=function(){if(!this._oShareMenu){this._oShareMenu=new e(this._getActionSheet(),this);this.addDependent(this._oShareMenu._oContainer);this._oShareMenu.attachEvent("_visibleActionsChanged",this._onShareMenuActionsChanged.bind(this));}return this._oShareMenu;};i.prototype._onShareMenuActionsChanged=function(E){var v=E.getParameter("visibleActionsCount");if(this._iVisibleShareMenuAction!==v){if(v===1){this._showSingleVisibleAction();}if(v!==1){this._hideSingleVisibleAction();}}this._iVisibleShareMenuAction=v;};i.prototype._showSingleVisibleAction=function(){var s=this._getShareMenu(),v=s._getVisibleActions(),j=s._aShareMenuActions.concat(s._aCustomShareActions),o;if(v.length===1){o=j.filter(function(k){return(k._getControl&&k._getControl()===v[0])||k===v[0];})[0];this._addShareMenuSingleAction(o);}};i.prototype._hideSingleVisibleAction=function(){var p=f._Placement.shareMenu,s=this._getSemanticContainer(p),I;if(this._oSingleVisibleAction){I=f.isKnownSemanticType(this._oSingleVisibleAction.getMetadata().getName());this._oSingleVisibleAction._bIsSingleAction=false;this._getSemanticTitle().removeContent(this._oSingleVisibleAction,I?f._Placement.titleIcon:f._Placement.titleText);I?s.addContent(this._oSingleVisibleAction):s.insertCustomAction(this._oSingleVisibleAction,0);this._onAddAggregation(this._oSingleVisibleAction,p);this._oSingleVisibleAction=null;}};i.prototype._openShareMenu=function(){var s=this._getShareMenu()._getShareMenuButton(),o=this._getTitle().getAggregation("_actionsToolbar")._getOverflowButton();if(s.getVisible()){this._getActionSheet().openBy(!s._bInOverflow?s:o);}};i.prototype._getActionSheet=function(){if(!this._oActionSheet){this._oActionSheet=new A(this.getId()+"-shareMenu");}return this._oActionSheet;};i.prototype._getSemanticFooter=function(){if(!this._oSemanticFooter){this._oSemanticFooter=new d(this._getOverflowToolbar(),this);}return this._oSemanticFooter;};i.prototype._getOverflowToolbar=function(){if(!this._oOverflowToolbar){this._oOverflowToolbar=new O(this.getId()+"-pageFooter");}return this._oOverflowToolbar;};i.prototype._getSemanticContainer=function(p){var P=f._Placement;if(p===P.titleText||p===P.titleIcon){return this._getSemanticTitle();}else if(p===P.footerLeft||p===P.footerRight){return this._getSemanticFooter();}else if(p===P.shareMenu){return this._getShareMenu();}return null;};i.prototype._cleanMemory=function(){if(this._oShareMenu){this._oShareMenu.destroy();this._oShareMenu=null;}if(this._oActionSheet){this._oActionSheet.destroy();this._oActionSheet=null;}if(this._oSemanticTitle){this._oSemanticTitle.destroy();this._oSemanticTitle=null;}if(this._oDynamicPageTitle){this._oDynamicPageTitle.destroy();this._oDynamicPageTitle=null;}if(this._oDynamicPageHeader){this._oDynamicPageHeader.destroy();this._oDynamicPageHeader=null;}if(this._oSemanticFooter){this._oSemanticFooter.destroy();this._oSemanticFooter=null;}if(this._oDynamicPageFooter){this._oDynamicPageFooter.destroy();this._oDynamicPageFooter=null;}if(this._oOverflowToolbar){this._oOverflowToolbar.destroy();this._oOverflowToolbar=null;}};return i;});
