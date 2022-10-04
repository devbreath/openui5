/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./CreationRowRenderer","./Column","./utils/TableUtils","sap/ui/core/Control","sap/m/library","sap/m/OverflowToolbar","sap/m/ToolbarSpacer","sap/m/Button"],function(e,t,r,l,a,o,i,n){"use strict";var s=l.extend("sap.ui.table.CreationRow",{metadata:{library:"sap.ui.table",properties:{applyEnabled:{type:"boolean",group:"Behavior",defaultValue:true}},aggregations:{cells:{type:"sap.ui.core.Control",multiple:true,singularName:"cell"},toolbar:{type:"sap.ui.core.Toolbar",multiple:false},_defaultToolbar:{type:"sap.ui.core.Toolbar",multiple:false,visibility:"hidden"}},events:{apply:{allowPreventDefault:true}}},renderer:e});s.prototype.setApplyEnabled=function(e){this.setProperty("applyEnabled",e,true);this._updateDefaultToolbar();return this};s.prototype.setVisible=function(e){var t=this.getVisible();var r=this.getTable();this.setProperty("visible",e);if(t!==e&&r){r.invalidate()}return this};s.prototype.setParent=function(e){l.prototype.setParent.apply(this,arguments);this._update();return this};s.prototype.resetFocus=function(){var e=r.getFirstInteractiveElement(this);if(e){e.focus();if(e instanceof window.HTMLInputElement){e.select()}return true}return false};s.prototype.getFocusDomRef=function(){var e=r.getFirstInteractiveElement(this);if(e){return e}return l.prototype.getFocusDomRef.apply(this,arguments)};s.prototype._fireApply=function(){var e=false;if(this.fireApply()){e=this.resetFocus()}return e};function u(e,t){var r=document.activeElement;e.getTable().getDomRef("focusDummy").focus();t.setMarked();window.setTimeout(function(){if(!e._fireApply()){r.focus()}},0)}s.prototype.onsapenter=function(e){if(this.getApplyEnabled()&&!e.isMarked()){u(this,e)}};s.prototype.onsapentermodifiers=function(e){if(this.getApplyEnabled()&&(e.metaKey||e.ctrlKey)){u(this,e)}};function p(e){return new o(e.getId()+"-tb",{content:[new i,new n(e.getId()+"-applyBtn",{text:r.getResourceText("TBL_CREATIONROW_APPLY"),enabled:e.getApplyEnabled(),press:function(){e._fireApply()}})],style:a.ToolbarStyle.Clear,ariaLabelledBy:[e.getId()+"-label"]})}s.prototype._getToolbar=function(){var e=this.getToolbar();if(!e){var t=this.getAggregation("_defaultToolbar");if(!t){t=p(this);this.setAggregation("_defaultToolbar",t,true)}e=t;if(e.data("sap-ui-table-invalid")){this._updateDefaultToolbar()}}return e};s.prototype._updateDefaultToolbar=function(){var e=this.getAggregation("_defaultToolbar");var t;if(this.getToolbar()){if(e){e.data("sap-ui-table-invalid",true)}return}if(!e){return}t=e.getContent()[1];t.setEnabled(this.getApplyEnabled());e.data("sap-ui-table-invalid",null)};s.prototype._getCell=function(e){var r=this.getCells();var l=r.filter(function(r){return t.ofCell(r).getIndex()===e})[0];if(!l){return null}return l};s.prototype._getCellDomRef=function(e){var t=this._getCell(e);var l=t?t.getDomRef():null;var a=r.getCell(this.getTable(),l,true);if(!a){return null}return a};s.prototype._focusCell=function(e){var t=this._getCellDomRef(e);var l=r.getInteractiveElements(t);if(l){l[0].focus();if(l[0]instanceof window.HTMLInputElement){l[0].select()}return true}return false};s.prototype._takeOverKeyboardHandling=function(e){var t=this.getTable();var l=t?t.getDomRef():null;if(!l||!l.contains(document.activeElement)){return false}var a=r.getCell(this.getTable(),document.activeElement);var o=r.getCellInfo(a);var i=false;if(o.columnIndex!=null&&o.columnIndex>=0){i=this._focusCell(o.columnIndex)}else{i=this.resetFocus()}if(i&&e){e.preventDefault()}return i};s.prototype._update=function(){var e=this.getTable();if(!e){this.removeAllCells();return}var t=e.getColumns();this.removeAllCells();for(var r=0,l=t.length;r<l;r++){if(t[r].getVisible()){this.addCell(t[r].getTemplateClone(r,"Creation"))}}};s.prototype.getTable=function(){var e=this.getParent();return r.isA(e,"sap.ui.table.Table")?e:null};return s});
//# sourceMappingURL=CreationRow.js.map