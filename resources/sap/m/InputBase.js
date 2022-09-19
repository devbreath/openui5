/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Control','sap/ui/core/EnabledPropagator','sap/ui/core/IconPool','./delegate/ValueStateMessage','sap/ui/core/message/MessageMixin','sap/ui/core/InvisibleMessage','sap/ui/core/library','sap/ui/Device','./InputBaseRenderer','sap/base/Log',"sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/cursorPos","sap/ui/dom/jquery/getSelectedText","sap/ui/dom/jquery/selectText"],function(l,C,E,I,V,M,a,c,D,b,d,K,q){"use strict";var T=c.TextDirection;var f=c.TextAlign;var g=c.ValueState;var h=C.extend("sap.m.InputBase",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.m",properties:{value:{type:"string",group:"Data",defaultValue:null,bindable:"bindable"},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},enabled:{type:"boolean",group:"Behavior",defaultValue:true},valueState:{type:"sap.ui.core.ValueState",group:"Appearance",defaultValue:g.None},name:{type:"string",group:"Misc",defaultValue:null},placeholder:{type:"string",group:"Misc",defaultValue:null},editable:{type:"boolean",group:"Behavior",defaultValue:true},valueStateText:{type:"string",group:"Misc",defaultValue:null},showValueStateMessage:{type:"boolean",group:"Misc",defaultValue:true},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:f.Initial},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:T.Inherit},required:{type:"boolean",group:"Misc",defaultValue:false}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}},events:{change:{parameters:{value:{type:"string"}}}},aggregations:{formattedValueStateText:{type:"sap.m.FormattedText",multiple:false,defaultValue:null},_invisibleFormattedValueStateText:{type:"sap.m.FormattedText",multiple:false,visibility:"hidden",defaultValue:null},_endIcon:{type:"sap.ui.core.Icon",multiple:true,visibility:"hidden"},_beginIcon:{type:"sap.ui.core.Icon",multiple:true,visibility:"hidden"}},designtime:"sap/m/designtime/InputBase.designtime"}});E.call(h.prototype);I.insertFontFaceStyle();M.call(h.prototype);h.ICON_PRESSED_CSS_CLASS="sapMInputBaseIconPressed";h.ICON_CSS_CLASS="sapMInputBaseIcon";h.prototype.bShowLabelAsPlaceholder=!D.support.input.placeholder;h.prototype._getPlaceholder=function(){return this.getPlaceholder()||"";};h.prototype._getInputValue=function(v){return(v===undefined)?this.$("inner").val()||"":v.toString();};h.prototype._getInputElementTagName=function(){if(!this._sInputTagElementName){this._sInputTagElementName=this._$input&&this._$input.get(0)&&this._$input.get(0).tagName;}return this._sInputTagElementName;};h.prototype.init=function(){this.setLastValue("");this.bRenderingPhase=false;this._oValueStateMessage=new V(this);this._bIsComposingCharacter=false;this.setLastValueStateText("");this.setErrorMessageAnnouncementState(false);this.fnCloseValueStateOnClick=function(){this.closeValueStateMessage();};};h.prototype.oncompositionstart=function(){this._bIsComposingCharacter=true;};h.prototype.oncompositionend=function(e){this._bIsComposingCharacter=false;if(!D.browser.firefox){this._bCheckDomValue=true;}};h.prototype.isComposingCharacter=function(){return this._bIsComposingCharacter;};h.prototype.onBeforeRendering=function(){var F=this.getFocusDomRef();var o=this.getFormattedValueStateText();var e;if(!this._oInvisibleMessage){this._oInvisibleMessage=a.getInstance();}if(this._bCheckDomValue&&!this.bRenderingPhase){if(this.isActive()){this._sDomValue=this._getInputValue();}else{this._bCheckDomValue=false;}}if(!o){e=false;}else{var i=this.getAggregation("_invisibleFormattedValueStateText");e=o.getHtmlText()!==(i&&i.getHtmlText());}if(this.getValueState()===g.Error&&F){var v=e||this.getValueStateText()!==this.getLastValueStateText();this.setErrorMessageAnnouncementState(!F.hasAttribute('aria-invalid')||v);}if(e){i&&i.destroy();this.setAggregation("_invisibleFormattedValueStateText",o.clone());}this.bRenderingPhase=true;};h.prototype.onAfterRendering=function(){var v=this.getValueState();var i=this.getFocusDomRef()===document.activeElement;var e=v===g.None;var s=document.getElementById(this.getValueStateMessageId()+'-sr');if(this._bCheckDomValue&&this._sDomValue!==this._getInputValue()){this.$("inner").val(this._sDomValue);}if(this.getErrorMessageAnnouncementState()&&this.hasStyleClass("sapMFocus")){s&&this._oInvisibleMessage.announce(s.textContent);this.setErrorMessageAnnouncementState(false);}this.$("message").text(this.getValueStateText());this._bCheckDomValue=false;this.bRenderingPhase=false;if(i){this[e?"closeValueStateMessage":"openValueStateMessage"]();}if(this.getAggregation("_invisibleFormattedValueStateText")){this.getAggregation("_invisibleFormattedValueStateText").getControls().forEach(function(o){o.getDomRef()&&o.getDomRef().setAttribute("tabindex",-1);});}this.setLastValueStateText(this.getValueStateText());};h.prototype.exit=function(){if(this._oValueStateMessage){this._oValueStateMessage.destroy();}if(this._oInvisibleMessage){this._oInvisibleMessage.destroy();this._oInvisibleMessage=null;}this._oValueStateMessage=null;};h.prototype.ontouchstart=function(e){e.setMarked();};h.prototype.onfocusin=function(e){this.addStyleClass("sapMFocus");this.openValueStateMessage();};h.prototype.onfocusout=function(e){this.removeStyleClass("sapMFocus");if(!this._bClickOnValueStateLink(e)){this.closeValueStateMessage();}};h.prototype.onsapfocusleave=function(e){if(!this.preventChangeOnFocusLeave(e)){this.onChange(e);}};h.prototype.preventChangeOnFocusLeave=function(e){return this.bFocusoutDueRendering;};h.prototype.getChangeEventParams=function(){return{};};h.prototype.ontap=function(e){return;};h.prototype.onChange=function(e,p,n){p=p||this.getChangeEventParams();if(this.getDomRef()&&(!this.getEditable()||!this.getEnabled())){return;}var v=this._getInputValue(n);if(v!==this.getLastValue()){this.setValue(v);v=this.getValue();this.setLastValue(v);this.fireChangeEvent(v,p);return true;}else{this._bCheckDomValue=false;}};h.prototype.fireChangeEvent=function(v,p){var o=q.extend({value:v,newValue:v},p);this.fireChange(o);};h.prototype.onValueRevertedByEscape=function(v,p){this.fireEvent("liveChange",{value:v,escPressed:true,previousValue:p,newValue:v});};h.prototype.onsapenter=function(e){if(D.browser.safari&&this.isComposingCharacter()){e.setMarked("invalid");return;}this.onChange(e);};h.prototype.onsapescape=function(e){var v=this._getInputValue();if(v!==this.getLastValue()){e.setMarked();e.preventDefault();this.updateDomValue(this.getLastValue());this.onValueRevertedByEscape(this.getLastValue(),v);}};h.prototype.oninput=function(e){this._bCheckDomValue=true;};h.prototype.onkeydown=function(e){if(this.getDomRef("inner")&&this.getDomRef("inner").getAttribute("readonly")&&e.keyCode==K.BACKSPACE){e.preventDefault();}};h.prototype.oncut=function(e){};h.prototype.selectText=function(s,S){this.$("inner").selectText(s,S);return this;};h.prototype.getSelectedText=function(){return this.$("inner").getSelectedText();};h.prototype.setProperty=function(p,v,s){if(p=="value"){this._bCheckDomValue=false;}return C.prototype.setProperty.apply(this,arguments);};h.prototype.getFocusInfo=function(){var F=C.prototype.getFocusInfo.call(this),o=this.getFocusDomRef();q.extend(F,{cursorPos:0,selectionStart:0,selectionEnd:0});if(o){F.cursorPos=q(o).cursorPos();try{F.selectionStart=o.selectionStart;F.selectionEnd=o.selectionEnd;}catch(e){}}return F;};h.prototype.applyFocusInfo=function(F){C.prototype.applyFocusInfo.call(this,F);this.$("inner").cursorPos(F.cursorPos);this.selectText(F.selectionStart,F.selectionEnd);return this;};h.prototype.updateDomValue=function(v){var i=this.getFocusDomRef();if(!this.isActive()){return this;}v=this._getInputValue(v);if(this._getInputValue()===v){return this;}this._bCheckDomValue=true;if(this._bPreferUserInteraction){this.handleInputValueConcurrency(v);}else{i.value=v;}return this;};h.prototype._aValueStateLinks=function(){if(this.getFormattedValueStateText()&&this.getFormattedValueStateText().getHtmlText()&&this.getFormattedValueStateText().getControls().length){return this.getFormattedValueStateText().getControls();}else{return[];}};h.prototype._bClickOnValueStateLink=function(e){var v=this._aValueStateLinks();return v.some(function(L){return e.relatedTarget===L.getDomRef();});};h.prototype._attachValueStateLinkPress=function(){this._aValueStateLinks().forEach(function(L){L.attachPress(this.fnCloseValueStateOnClick,this);},this);};h.prototype._detachValueStateLinkPress=function(){this._aValueStateLinks().forEach(function(L){L.detachPress(this.fnCloseValueStateOnClick,this);},this);};h.prototype.handleInputValueConcurrency=function(v){var i=this.getFocusDomRef(),s=i&&this._getInputValue(),e=this.getProperty("value"),j=document.activeElement===i,B=this.isBound("value")&&this.getBindingInfo("value").skipModelUpdate;if(j&&B&&s&&(e!==s)){return this;}i.value=v;if(j&&B&&!s){i.select();}};h.prototype._setPreferUserInteraction=function(p){this._bPreferUserInteraction=p;};h.prototype.closeValueStateMessage=function(){setTimeout(function(){if(this._oValueStateMessage){this._detachValueStateLinkPress();this._oValueStateMessage.close();}}.bind(this),0);};h.prototype.getDomRefForValueStateMessage=function(){return this.getDomRef("content");};h.prototype.getPopupAnchorDomRef=function(){return this.getDomRef();};h.prototype.iOpenMessagePopupDuration=0;h.prototype.getValueStateMessageId=function(){return this.getId()+"-message";};h.prototype.getErrorMessageAnnouncementState=function(){return this._bErrorStateShouldBeAnnounced;};h.prototype.setErrorMessageAnnouncementState=function(A){this._bErrorStateShouldBeAnnounced=A;};h.prototype.setLastValueStateText=function(v){this._sLastValueStateText=v;};h.prototype.getLastValueStateText=function(){return this._sLastValueStateText;};h.prototype.getLabels=function(){var L=this.getAriaLabelledBy().map(function(s){return sap.ui.getCore().byId(s);});var o=sap.ui.require("sap/ui/core/LabelEnablement");if(o){L=L.concat(o.getReferencingLabels(this).map(function(s){return sap.ui.getCore().byId(s);}));}return L;};h.prototype.openValueStateMessage=function(){if(this._oValueStateMessage&&this.shouldValueStateMessageBeOpened()){setTimeout(function(){if(!this.bIsDestroyed){this._detachValueStateLinkPress();this._attachValueStateLinkPress();this._oValueStateMessage.open();}}.bind(this),0);}};h.prototype.shouldValueStateMessageBeOpened=function(){return(this.getValueState()!==g.None)&&this.getEditable()&&this.getEnabled()&&this.getShowValueStateMessage();};h.prototype._calculateIconsSpace=function(){var e=this.getAggregation("_endIcon")||[],B=this.getAggregation("_beginIcon")||[],i=e.concat(B),j,k;return i.reduce(function(A,o){j=o&&o.getDomRef()?parseFloat(getComputedStyle(o.getDomRef()).marginRight):0;k=o&&o.getDomRef()?o.getDomRef().offsetWidth:0;return A+k+j;},0);};h.prototype.setValue=function(v){v=this.validateProperty("value",v);v=this._getInputValue(v);this.updateDomValue(v);if(v!==this.getProperty("value")){this.setLastValue(v);}this.setProperty("value",v,true);return this;};h.prototype.getFocusDomRef=function(){return this.getDomRef("inner");};h.prototype.getIdForLabel=function(){return this.getId()+"-inner";};h.prototype.getAccessibilityInfo=function(){var r=this.getRequired()?'Required':'',R=this.getRenderer();return{role:R.getAriaRole(this),type:sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_INPUT"),description:[this.getValueDescriptionInfo(),R.getLabelledByAnnouncement(this),R.getDescribedByAnnouncement(this),r].join(" ").trim(),focusable:this.getEnabled(),enabled:this.getEnabled(),editable:this.getEnabled()&&this.getEditable()};};h.prototype.getValueDescriptionInfo=function(){return this.getValue()||sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("INPUTBASE_VALUE_EMPTY");};h.prototype._addIcon=function(i,o,p){if(["begin","end"].indexOf(i)===-1){d.error('icon position is not "begin", neither "end", please check again the passed setting');return null;}var e=I.createControlByURI(o).addStyleClass(h.ICON_CSS_CLASS);if(p!==undefined){this.insertAggregation("_"+i+"Icon",e,p);}else{this.addAggregation("_"+i+"Icon",e);}return e;};h.prototype.addBeginIcon=function(i){return this._addIcon("begin",i);};h.prototype.addEndIcon=function(i,p){return this._addIcon("end",i,p);};Object.defineProperty(h.prototype,"_$input",{get:function(){return this.$("inner");}});h.prototype.setLastValue=function(v){this._lastValue=v;return this;};h.prototype.getLastValue=function(){return this._lastValue;};return h;});
