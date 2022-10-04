/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Select","sap/ui/core/InvisibleText","sap/ui/Device","sap/ui/core/Core","./ActionSelectRenderer"],function(t,e,o,s,i){"use strict";var n=t.extend("sap.m.ActionSelect",{metadata:{library:"sap.m",associations:{buttons:{type:"sap.m.Button",multiple:true,singularName:"button"}}},renderer:i});n.prototype.init=function(){t.prototype.init.call(this);this.getList().addEventDelegate({onfocusin:this.onfocusinList},this)};n.prototype.hasContent=function(){return t.prototype.hasContent.call(this)||!!this.getButtons().length};n.prototype.addContentToFlex=function(){var t=this.getSimpleFixFlex();this.getButtons().forEach(function(e){t.addFlexContent(s.byId(e))})};n.prototype._onBeforeRenderingPopover=function(){t.prototype._onBeforeRenderingPopover.call(this);var e=this.getPicker();e&&e._setAriaRoleApplication(true);this._updateTutorMessage()};n.prototype.onAfterRenderingPicker=function(){t.prototype.onAfterRenderingPicker.call(this);var e=this.getPicker(),o=this.getRenderer();e.addStyleClass(o.CSS_CLASS+"Picker");e.addStyleClass(o.ACTION_SELECT_CSS_CLASS+"Picker");e.addStyleClass(o.ACTION_SELECT_CSS_CLASS+"Picker-CTX")};n.prototype.createPickerCloseButton=function(){};n.prototype.removeButton=function(t){var e=this.getSimpleFixFlex();if(e){if(typeof t==="number"){t=this.getButtons()[t]}e.removeFlexContent(t)}return this.removeAssociation("buttons",t)};n.prototype.removeAllButtons=function(){var t=this.getSimpleFixFlex();if(t){this.getButtons().forEach(function(e){t.removeFlexContent(s.byId(e))})}return this.removeAllAssociation("buttons")};n.prototype.onsaptabprevious=function(t){var e=this.getButtons(),o=this.getPicker(),i;this._bProcessChange=false;if(t.isMarked()||!this.getEnabled()){return}t.setMarked();if(o&&o.isOpen()&&e.length>0){for(i=e.length-1;i>=0;i--){if(s.byId(e[i]).getEnabled()){s.byId(e[i]).focus();t.preventDefault();break}}}};n.prototype.onsaptabnext=function(t){var e=this.getButtons(),o=this.getPicker(),i;this._bProcessChange=false;if(t.isMarked()||!this.getEnabled()){return}t.setMarked();if(o&&o.isOpen()&&e.length>0){for(i=0;i<e.length;i++){if(s.byId(e[i]).getEnabled()){s.byId(e[i]).focus();t.preventDefault();break}}}};n.prototype.onsapfocusleave=function(e){var o=this.getButtons();var s=o.indexOf(e.relatedControlId)===-1;if(s){t.prototype.onsapfocusleave.apply(this,arguments)}this._toggleListFocusIndication(true)};n.prototype.onfocusinList=function(t){if(document.activeElement!==this.getList().getDomRef()&&!o.system.phone){this.focus()}};n.prototype.onfocusin=function(){t.prototype.onfocusin.apply(this,arguments);this._toggleListFocusIndication(false)};n.prototype._toggleListFocusIndication=function(t){var e=this.getSelectedItem();if(this.isOpen()&&e){e.$().toggleClass("sapMActionSelectItemWithoutFocus",t)}};n.prototype._updateTutorMessage=function(){var t=this.getPicker(),o=t.getAriaLabelledBy(),i=!!this.getButtons().length,n;if(!this._sTutorMessageId){this._sTutorMessageId=this._getTutorMessageId();this._oTutorMessageText=new e(this._sTutorMessageId,{text:s.getLibraryResourceBundle("sap.m").getText("ACTION_SELECT_TUTOR_MESSAGE")}).toStatic()}n=o.indexOf(this._sTutorMessageId)===-1;if(n&&i){t.addAriaLabelledBy(this._sTutorMessageId)}else{if(!i){t.removeAriaLabelledBy(this._sTutorMessageId)}}};n.prototype._getTutorMessageId=function(){return this.getId()+"-tutorMessage"};n.prototype.exit=function(){t.prototype.exit.call(this);if(this._oTutorMessageText){this._oTutorMessageText.destroy();this._oTutorMessageText=null}};return n});
//# sourceMappingURL=ActionSelect.js.map