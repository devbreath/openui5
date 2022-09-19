/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/InvisibleText","sap/ui/thirdparty/jquery","sap/ui/core/Control","sap/ui/core/library","./library","sap/base/Log","sap/ui/events/KeyCodes","sap/ui/dom/jquery/Focusable"],function(I,q,C,c,l,L,K){"use strict";var T=c.TitleLevel;var O=C.extend("sap.uxap.ObjectPageSectionBase",{metadata:{"abstract":true,library:"sap.uxap",properties:{title:{type:"string",group:"Appearance",defaultValue:null},titleLevel:{type:"sap.ui.core.TitleLevel",group:"Appearance",defaultValue:T.Auto},visible:{type:"boolean",group:"Appearance",defaultValue:true},importance:{type:"sap.uxap.Importance",group:"Behavior",defaultValue:l.Importance.High}},aggregations:{ariaLabelledBy:{type:"sap.ui.core.InvisibleText",multiple:false,visibility:"hidden"},customAnchorBarButton:{type:"sap.m.Button",multiple:false}}},renderer:null});O.prototype.init=function(){this._bInternalVisible=true;this._bInternalTitleVisible=true;this._sInternalTitle="";this._sInternalTitleLevel=T.Auto;this._isHidden=false;this._bRtl=sap.ui.getCore().getConfiguration().getRTL();};O.prototype.onAfterRendering=function(){if(this._getObjectPageLayout()){this._getObjectPageLayout()._requestAdjustLayout().catch(function(){L.debug("ObjectPageSectionBase :: cannot adjustLayout",this);});this._getObjectPageLayout()._setSectionsFocusValues();}};O.prototype.onBeforeRendering=function(){var a="ariaLabelledBy";this.setInvisibleTextLabelValue(this._getTitle());if(!this.getAggregation(a)){this.setAggregation(a,this._getAriaLabelledBy(),true);}};O.prototype.setCustomAnchorBarButton=function(b){var r=this.setAggregation("customAnchorBarButton",b,true);if(this._getObjectPageLayout()){this._getObjectPageLayout()._updateNavigation();}return r;};O.prototype.getSectionText=function(){return"";};O.prototype.setInvisibleTextLabelValue=function(v){var a=this.getAggregation("ariaLabelledBy"),s="";s=v||this.getSectionText();if(a){sap.ui.getCore().byId(a.getId()).setText(s);}return this;};O.prototype._getAriaLabelledBy=function(){var s="";s=this._getTitle()||this.getSectionText();return new I({text:s}).toStatic();};O.prototype._setInternalVisible=function(v,i){if(v!=this._bInternalVisible){this._bInternalVisible=v;if(i){this.invalidate();}}};O.prototype._getInternalVisible=function(){return this._bInternalVisible;};O.prototype._setInternalTitleVisible=function(v,i){if(v!=this._bInternalTitleVisible){this._bInternalTitleVisible=v;if(i){this.invalidate();}}};O.prototype._getInternalTitleVisible=function(){return this._bInternalTitleVisible;};O.prototype._setInternalTitle=function(v,i){if(v!=this._sInternalTitle){this._sInternalTitle=v;if(i){this.invalidate();}}};O.prototype._getTitle=function(){return this._getInternalTitle()||this.getTitle();};O.prototype._getInternalTitle=function(){return this._sInternalTitle;};O.prototype._getARIALevel=function(){var t=this._getTitleLevel();if(t===T.Auto){t=T.H2;}return t.slice(-1);};O.prototype._getTitleLevel=function(){var t=this.getTitleLevel();return(t===T.Auto)?this._getInternalTitleLevel():t;};O.prototype._setInternalTitleLevel=function(t,i){if(t!==this._sInternalTitleLevel){this._sInternalTitleLevel=t;if(i){this.invalidate();}}};O.prototype._getInternalTitleLevel=function(){return this._sInternalTitleLevel;};O.prototype._getObjectPageLayout=function(){return l.Utilities.getClosestOPL(this);};O.prototype._notifyObjectPageLayout=function(){if(this._getObjectPageLayout()&&this._getObjectPageLayout().$().length){this._getObjectPageLayout()._requestAdjustLayoutAndUxRules();}};["addAggregation","insertAggregation","removeAllAggregation","removeAggregation","destroyAggregation"].forEach(function(m){O.prototype[m]=function(a,o,i,s){if(["addAggregation","removeAggregation"].indexOf(m)>-1){s=i;}if(["removeAllAggregation","destroyAggregation"].indexOf(m)>-1){s=o;}var r=C.prototype[m].apply(this,arguments);if(s!==true){this._notifyObjectPageLayout();}return r;};});O.prototype.setVisible=function(v,s){if(this.getVisible()===v){return this;}if(!this._getObjectPageLayout()){return this.setProperty("visible",v,s);}this.setProperty("visible",v,true);this._notifyObjectPageLayout();this.invalidate();return this;};O.prototype.setTitle=function(v,s){this.setProperty("title",v,s);this._notifyObjectPageLayout();this.setInvisibleTextLabelValue(v);return this;};O.prototype._shouldBeHidden=function(){return O._importanceMap[this.getImportance()]>O._importanceMap[this._sCurrentLowestImportanceLevelToShow];};O._importanceMap={"Low":3,"Medium":2,"High":1};O.prototype._updateShowHideState=function(h){var o=this._getObjectPageLayout();this._isHidden=h;this.$().children(this._sContainerSelector).toggle(!h);if(o){o._requestAdjustLayout();}return this;};O.prototype._getIsHidden=function(){return this._isHidden;};O.prototype._expandSection=function(){return this._updateShowHideState(false);};O.prototype._showHideContent=function(){return this._updateShowHideState(!this._getIsHidden());};O.prototype._applyImportanceRules=function(s){this._sCurrentLowestImportanceLevelToShow=s;if(this.getDomRef()){this._updateShowHideState(this._shouldBeHidden());}else{this._isHidden=this._shouldBeHidden();}};O.PAGEUP_AND_PAGEDOWN_JUMP_SIZE=5;O.prototype.onkeydown=function(e){if(e.keyCode===K.SPACE&&e.srcControl.isA("sap.uxap.ObjectPageSection")){e.preventDefault();}if(e.keyCode===K.F7){var s=this.getSubSections(),f=s[0],o;if(s.length===1){o=f._oLastFocusedControlF7;if(o){o.$().trigger("focus");}else{f.$().firstFocusableDomRef().focus();}}else{if(f.getActions().length){f.getActions()[0].$().trigger("focus");}}}};O.prototype.onsapdown=function(e){this._handleFocusing(e,e.currentTarget.nextSibling);};O.prototype._handleFocusing=function(e,E){var s;if(this._targetIsCorrect(e)&&E){s=q(e.currentTarget).parent().children();e.preventDefault();E.focus();if(s.length>1){this._scrollParent(q(E).attr("id"));}}};O.prototype._targetIsCorrect=function(e){return e.srcControl===this;};O.prototype.onsapright=function(e){var m=this._bRtl?"onsapup":"onsapdown";this[m](e);};O.prototype.onsapup=function(e){this._handleFocusing(e,e.currentTarget.previousSibling);};O.prototype.onsapleft=function(e){var m=this._bRtl?"onsapdown":"onsapup";this[m](e);};O.prototype.onsaphome=function(e){this._handleFocusing(e,e.currentTarget.parentElement.firstChild);};O.prototype.onsapend=function(e){this._handleFocusing(e,e.currentTarget.parentElement.lastChild);};O.prototype.onsappageup=function(e){if(!this._targetIsCorrect(e)){return;}e.preventDefault();var n;var s=q(e.currentTarget).parent().children();var f;s.each(function(S,o){if(q(o).attr("id")===e.currentTarget.id){n=S-(O.PAGEUP_AND_PAGEDOWN_JUMP_SIZE+1);return;}});if(n&&s[n]){s[n].focus();f=q(s[n]).attr("id");}else if(s[0]){s[0].focus();f=q(s[0]).attr("id");}if(s.length>1){this._scrollParent(f);}};O.prototype.onsappagedown=function(e){if(!this._targetIsCorrect(e)){return;}e.preventDefault();var n;var s=q(e.currentTarget).parent().children();var f;s.each(function(S,o){if(q(o).attr("id")===e.currentTarget.id){n=S+O.PAGEUP_AND_PAGEDOWN_JUMP_SIZE+1;return;}});if(n&&s[n]){s[n].focus();f=q(s[n]).attr("id");}else if(s[s.length-1]){s[s.length-1].focus();f=q(s[s.length-1]).attr("id");}if(s.length>1){this._scrollParent(f);}};O.prototype._scrollParent=function(i){if(this._getObjectPageLayout()){this._getObjectPageLayout().scrollToSection(i,0,10);}};return O;});
