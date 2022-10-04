/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/base/EventProvider","sap/ui/core/InvisibleText","sap/ui/core/ValueStateSupport","sap/m/library","sap/ui/core/library","sap/m/List","sap/m/inputUtils/scrollToItem","sap/m/inputUtils/SuggestionsPopoverDialogMixin","sap/m/inputUtils/SuggestionsPopoverPopoverMixin"],function(t,e,a,s,o,i,n,r,u,l){"use strict";var p=o.ListMode;var c=o.ListSeparators;var d="sapMSuggestionsPopover",h="sapUiNoContentPadding";var f=i.ValueState;var g=e.extend("sap.m.SuggestionsPopover",{constructor:function(){e.apply(this,arguments);this._sPopoverContentWidth=null;this._sOldValueState=f.None;if(t.system.phone){u.apply(g.prototype)}else{l.apply(g.prototype)}},destroy:function(){this._destroySuggestionPopup()}});g.M_EVENTS={SELECTION_CHANGE:"selectionChange"};g.prototype.isOpen=function(){var t=this.getPopover();return t&&t.isOpen()};g.prototype.setPopover=function(t){this._oPopover=t};g.prototype.getPopover=function(){return this._oPopover};g.prototype.destroyPopover=function(){if(this._oPopover){this._oPopover.destroy()}this._oPopover=null};g.prototype.setInputLabels=function(t){this._fnInputLabels=t};g.prototype.createSuggestionPopup=function(t,e,s){var o,i=this.getItemsContainer();e=e||[];o=this.createPopover(t,e,s);this.setPopover(o);o.addStyleClass(d);o.addStyleClass(h);o.addAriaLabelledBy(a.getStaticId("sap.m","INPUT_AVALIABLE_VALUES"));if(i){this.addContent(i)}};g.prototype.initContent=function(t,e){var a=e,s=this.getPopover();if(!s){return}if(!a){a=new n(t+"-popup-list",{showNoData:false,mode:p.SingleSelectMaster,rememberSelections:false,width:"100%",showSeparators:c.None,busyIndicatorDelay:0});a.applyAriaRole("listbox")}this.addContent(a)};g.prototype._destroySuggestionPopup=function(){this.destroyPopover();this._oValueStateHeader=null};g.prototype.addContent=function(t){this.getPopover().addContent(t)};g.prototype.getItemsContainer=function(){var t=this.getPopover(),e=t&&t.getContent();return e&&e.filter(function(t){return t.isA("sap.m.List")&&t.getId().indexOf("-popup-list")>-1||t.isA("sap.m.Table")})[0]};g.prototype.handleListNavigation=function(e,a){var s=this.getPopover();if(a.isMarked()){return}if(!e.getEnabled()||!e.getEditable()){return}if(!s||!s.isOpen()){return}a.preventDefault();a.stopPropagation();var o=this.getItemsContainer(),i=this._getValueStateHeader(),n=i&&i.getVisible(),u=e.hasStyleClass("sapMFocus"),l=o&&o.getItems().filter(function(t){return t.getVisible&&t.getVisible()}),p=l.indexOf(this.getFocusedListItem()),c;switch(a.type){case"sapdown":c=this.handleArrowDown(l,p,u,n);break;case"sapup":c=this.handleArrowUp(l,p,u,n);break;case"sapend":c=this.handleEnd(l,n);break;case"saphome":c=this.handleHome(l,n);break;case"sappagedown":c=this.handlePageDown(l,p,n);break;case"sappageup":c=this.handlePageUp(l,p,n);break}this.updateFocus(e,c);if(e.handleSelectionFromList){e.handleSelectionFromList(c)}else{this.handleSelectionFromList(c)}this.updateAriaActiveDescendant(e,c);if(t.system.desktop&&c){r(c,this.getPopover())}};g.prototype.handleArrowDown=function(t,e,a,s){if(a&&!s){return t[0]}if(!a&&!this.getValueStateActiveState()){if(e===t.length-1){return t[e]}return t[e+1]}if(this.getValueStateActiveState()){this.setValueStateActiveState(false);return t[0]}else{this.setValueStateActiveState(true)}};g.prototype.handleArrowUp=function(t,e,a,s){if(a){return}if(e>0){return t[e-1]}if(s){this.setValueStateActiveState(!this.getValueStateActiveState())}};g.prototype.handleEnd=function(t,e){if(e){this.setValueStateActiveState(false)}return t.length&&t[t.length-1]};g.prototype.handleHome=function(t,e){if(e){this.setValueStateActiveState(true);return}return t.length&&t[0]};g.prototype.handlePageDown=function(t,e,a){if(a){this.setValueStateActiveState(false)}return t[Math.min(t.length-1,e+10)]};g.prototype.handlePageUp=function(t,e,a){if(e-10>=0){return t[e-10]}if(a){this.setValueStateActiveState(true);return}return t[0]};g.prototype.updateFocus=function(t,e){var a=this.getItemsContainer(),s=this.getFocusedListItem(),o=this._getValueStateHeader(),i=o&&o.getVisible();a&&a.removeStyleClass("sapMListFocus");s&&s.removeStyleClass("sapMLIBFocused");t.hasStyleClass("sapMFocus")&&t.removeStyleClass("sapMFocus");i&&o.removeStyleClass("sapMPseudoFocus");if(e){e.addStyleClass("sapMLIBFocused");a.addStyleClass("sapMListFocus");this.updateListDataAttributes(a)}else if(this.getValueStateActiveState()){o.addStyleClass("sapMPseudoFocus")}else{t.addStyleClass("sapMFocus")}};g.prototype.updateListDataAttributes=function(t){if(!t){return}var e=t.getVisibleItems();if(!e){return}e.forEach(function(t){var e=t.getDomRef();if(e&&e.hasAttribute("data-sap-ui-first-suggestion-item")){e.removeAttribute("data-sap-ui-first-suggestion-item")}if(e&&e.hasAttribute("data-sap-ui-last-suggestion-item")){e.removeAttribute("data-sap-ui-last-suggestion-item")}});if(e[0]){var a=e[0].getDomRef();a&&a.setAttribute("data-sap-ui-first-suggestion-item","")}if(e[e.length-1]){var s=e[e.length-1].getDomRef();s&&s.setAttribute("data-sap-ui-last-suggestion-item","")}};g.prototype.handleSelectionFromList=function(t){var e=this.getItemsContainer(),a=this.getFocusedListItem(),s=t&&t.isA("sap.m.GroupHeaderListItem");if(!t||s){e.removeSelections(true)}else{e.setSelectedItem(t,true)}this.fireEvent(g.M_EVENTS.SELECTION_CHANGE,{previousItem:a,newItem:t})};g.prototype.updateAriaActiveDescendant=function(t,e){var a=t.getFocusDomRef(),s=this._getValueStateHeader(),o=s&&s.getFormattedText(),i;if(t.hasStyleClass("sapMFocus")){a.removeAttribute("aria-activedescendant");return}if(e){a.setAttribute("aria-activedescendant",e.getId());return}if(this.getValueStateActiveState()){i=o?o.getId():s.getId();a.setAttribute("aria-activedescendant",i)}};g.prototype.getFocusedListItem=function(){var t=this.getItemsContainer(),e=t&&t.getItems()||[];for(var a=0;a<e.length;a++){if(e[a].hasStyleClass("sapMLIBFocused")){return e[a]}}};g.prototype.setValueStateActiveState=function(t){this.bMessageValueStateActive=t};g.prototype.getValueStateActiveState=function(){return this.bMessageValueStateActive};g.prototype.updateValueState=function(t,e,a){var o=a&&t!==f.None;e=e||s.getAdditionalText(t);if(!this.getPopover()){return this}if(this.getInput()){this.getInput().setValueState(t)}var i=this._getValueStateHeader();i.setValueState(t);if(i&&typeof e==="string"){i.setText(e)}else if(i&&typeof e==="object"){i.setFormattedText(e)}if(i){i.setVisible(o)}this._alignValueStateStyles(t);return this};g.prototype._handleValueStateLinkNav=function(t,e){if(!this.getValueStateActiveState()||this.getValueStateActiveState()&&document.activeElement.tagName==="A"){return}var a=this.getValueStateLinks(),s=a[a.length-1];e.preventDefault();a[0].focus();this._getValueStateHeader().removeStyleClass("sapMPseudoFocus");a.forEach(function(e){e.addDelegate({onsapup:function(e){t.getFocusDomRef().focus();this.handleListNavigation(t,e)},onsapdown:function(e){t.getFocusDomRef().focus();this.handleListNavigation(t,e)}},this)},this);s.addDelegate({onsaptabnext:function(e){this.setValueStateActiveState(false);t.onsapfocusleave(e);this.getPopover().close();setTimeout(function(){t.closeValueStateMessage()},0)}},this);a[0].addDelegate({onsaptabprevious:function(e){e.preventDefault();t.getFocusDomRef().focus();this._getValueStateHeader().addStyleClass("sapMPseudoFocus");t.removeStyleClass("sapMFocus")}},this)};g.prototype.getValueStateLinks=function(){var t=this._getValueStateHeader(),e=t&&typeof t.getFormattedText==="function"&&t.getFormattedText(),a=e&&typeof e.getControls==="function"&&e.getControls();return a||[]};g.prototype._alignValueStateStyles=function(t){var e=d+"ValueState",a=d+this._sOldValueState+"State",s=d+t+"State",o=this.getPopover();o.addStyleClass(e);o.removeStyleClass(a);o.addStyleClass(s);this._sOldValueState=t};g.prototype.decorateParent=function(t){t.addEventDelegate({onsaptabnext:this._handleValueStateLinkNav.bind(this,t),onsaptabprevious:this._handleValueStateLinkNav.bind(this,t)},this)};g.prototype.getInput=function(){return null};g.prototype.getPickerTitle=function(){return null};g.prototype.getOkButton=function(){return null};g.prototype.getCancelButton=function(){return null};g.prototype.getFilterSelectedButton=function(){return null};g.prototype.setOkPressHandler=function(){return null};g.prototype.setCancelPressHandler=function(){return null};g.prototype.setShowSelectedPressHandler=function(){return null};g.prototype.resizePopup=function(){};g.prototype._getValueStateHeader=function(){return null};g.prototype._createValueStateHeader=function(){return null};return g});
//# sourceMappingURL=SuggestionsPopover.js.map