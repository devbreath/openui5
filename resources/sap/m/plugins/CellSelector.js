/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./PluginBase","sap/ui/events/KeyCodes","sap/ui/core/Core","sap/ui/thirdparty/jquery","sap/base/Log"],function(e,t,o,jQuery,n){"use strict";var i={NEXT:1,PREVIOUS:2};var s="sapMPluginsCellSelector";var r=e.extend("sap.m.plugins.CellSelector",{metadata:{library:"sap.m",properties:{},events:{}}});r.prototype.onActivate=function(e){e.addDelegate(this,true,this);this._oSession={};this._oSession.oCanvas={};var t=this.getConfig("scrollEvent");t&&e.attachEvent(t,this._handleScroll,this)};r.prototype.onDeactivate=function(e){e.removeDelegate(this,this);this._oSession={};this._oSession.oCanvas={};var t=this.getConfig("scrollEvent");t&&e.detachEvent(t,this._handleScroll,this)};r.prototype.getSelectedCells=function(){if(!this._bSelecting){return{}}var e=l(this._oSession.mSource,this._oSession.mTarget);var t={};for(var o=e.from.rowIndex;o<e.to.rowIndex;o++){var n=this.getConfig("contextByIndex",this.getControl(),o),i=[];for(var s=e.from.colIndex;s<e.to.colIndex;s++){var r=this.getConfig("columnByIndex",this.getControl(),s);if(r){i.push(s)}}t[o]={rowContext:n,columnIndices:i}}return t};r.prototype.onsapspace=function(e){if(e.isMarked()){return}else if(!this.getConfig("isSelectionEnabled",this.getControl())){n.error("Cell selection is inactive, because preconditions are not met.");return}var t=e.target;var o=this.getConfig("getCellInfo",this.getControl(),t);if(o){this._bSelecting=true;if(this._oSession.mSource){if(this._oSession.mSource.rowIndex!==o.rowIndex||this._oSession.mSource.colIndex!==o.colIndex){this._oSession.mSource=null;this._oSession.mTarget=null}}this._oSession.mSource=o;this._oSession.mStart=o;this._selectCells(this._oSession.mSource,o,{info:{focus:o}});e.preventDefault();e.setMarked()}};r.prototype.onsapnext=r.prototype.onsapprevious=function(e){if(!this._bSelecting){return}this._clearSelection()};r.prototype.onsaphome=r.prototype.onsapend=r.prototype.onsapnext;r.prototype.onsapnextmodifiers=function(e){this._selectNextCell(e,false,1)};r.prototype.onsappreviousmodifiers=function(e){this._selectNextCell(e,true.valueOf,-1)};r.prototype._selectNextCell=function(e,o,n){if(!this._bSelecting||!e.shiftKey||e.isMarked()||!this._isInSelectionArea(e.target)){return}var s=this.getConfig("getCellInfo",this.getControl(),e.target);var r=Object.assign({},this._oSession.mSource);var l=Object.assign({},this._oSession.mTarget);var a=o?t.ARROW_UP:t.ARROW_DOWN,f=o?i.PREVIOUS:i.NEXT;var c=e.keyCode==a?"row":"col";l[c+"Index"]+=n;s[c+"Index"]+=n;if(!this.getConfig("isNavigatableCell",this.getControl(),l)){return}this._selectCells(r,l,{info:{focus:s,direction:f}});e.preventDefault();e.setMarked()};r.prototype.onsapspacemodifiers=function(e){if(!this._bSelecting||e.isMarked()){return}var t=Object.assign({},this._oSession.mTarget);var o=this.getConfig("getCellInfo",this.getControl(),e.target);if(e.shiftKey){this._oSession.mSource.colIndex=-Infinity;t.colIndex=Infinity;this._selectCells(this._oSession.mSource,t,{info:{focus:o,boundaryChange:true}})}else if(e.ctrlKey||e.metaKey){this._oSession.mSource.rowIndex=-Infinity;t.rowIndex=Infinity;this._selectCells(this._oSession.mSource,t,{info:{focus:o,boundaryChange:true}})}e.preventDefault();e.setMarked()};r.prototype.onsaphomemodifiers=function(e){if(!this._bSelecting||e.isMarked()||!e.shiftKey||!this._isInSelectionArea(e.target)){return}var t=Object.assign({},this._oSession.mTarget);t.colIndex=-Infinity;this._selectCells(this._oSession.mSource,t,{info:{focus:t,boundaryChange:true}});e.setMarked()};r.prototype.onsapendmodifiers=function(e){if(!this._bSelecting||e.isMarked()||!e.shiftKey||!this._isInSelectionArea(e.target)){return}var t=Object.assign({},this._oSession.mTarget);t.colIndex=Infinity;this._selectCells(this._oSession.mSource,t,{info:{focus:t,boundaryChange:true}});e.setMarked()};r.prototype.onkeydown=function(e){if(this._bSelecting){if(a(e,t.A,true,true)){this._clearSelection()}e.preventDefault();e.setMarked()}};r.prototype.onkeyup=function(e){if(!this._bSelecting){return}e.setMarked()};r.prototype._isInSelectionArea=function(e){var t=this.getConfig("getCellInfo",this.getControl(),e);var o=false;if(t){var n=l(this._oSession.mSource,this._oSession.mTarget);var i=this.getControl().getRows();o=!(t.rowIndex<n.from.rowIndex||t.rowIndex>n.to.rowIndex||t.colIndex<n.from.colIndex||t.colIndex>n.to.colIndex)||t.rowIndex==i[0].getIndex()||t.rowIndex==i[i.length-1].getIndex()}return o};r.prototype._selectCells=function(e,t,o){if(!this._bSelecting){return}this._oSession.aCells=[];this._savePreviousSelectionAreas();this._eraseSelection();if(!this._oSession.mTarget){this._oSession.mTarget=t}if(!e){this._oSession.mSource=e=t}if(!o){o={}}var n=l(e,t);var i=this.getConfig("selectCells",this.getControl(),n,o);this._oSession.aCells=i.cells;this._drawSelection(i.bounds,i.borderOptions);if(o&&o.info&&!o.info.boundaryChange){this._oSession.mSource=e;this._oSession.mTarget=t}else{this._oSession.mSource=n.from;this._oSession.mTarget=n.to}};r.prototype._drawSelection=function(e,t){var o=this.getConfig("getSelectionAreas",this.getControl(),e.from,e.to);o.forEach(function(e,n){var i=this.getControl().getDomRef(e.container),s=this.getConfig("getCellRef",this.getControl(),e.from),r=this.getConfig("getCellRef",this.getControl(),e.to);var l,a,f;var c={};if(!s||!r){return}l=s.getBoundingClientRect();a=r.getBoundingClientRect();f=i.getBoundingClientRect();var d=e.hasOffset?f.left:0;c.left=Math.min(l.left,a.left)-d;c.top=Math.min(l.top,a.top)-f.top;c.width=Math.max(a.right,l.right)-c.left-d;c.height=Math.max(a.bottom,l.bottom)-c.top-f.top;c.noBorderTop=!t.top;c.noBorderBottom=!t.bottom;c.noBorderRight=o.length>1&&n<o.length-1?true:false;c.noBorderLeft=o.length>1&&n>0?true:false;this._drawSelectionArea(c,e.container)}.bind(this))};r.prototype._drawSelectionArea=function(e,t){if(!this._oSession.oCanvas[t]){this._oSession.oCanvas[t]=document.createElement("div");this._oSession.oCanvas[t].className=s+"Canvas"}if(!this._oSession.oCanvas[t].isConnected){this.getControl().getDomRef(t).append(this._oSession.oCanvas[t])}var o=this._oSession.oCanvas[t].style;o.left=e.left+"px";o.top=e.top+"px";o.width=e.width+"px";o.height=e.height+"px";o.display="block";o.borderTop=e.noBorderTop?"0px":"";o.borderBottom=e.noBorderBottom?"0px":"";o.borderRight=e.noBorderRight?"0px":"";o.borderLeft=e.noBorderLeft?"0px":""};r.prototype._clearSelection=function(){this._bSelecting=false;this._eraseSelection();this._oSession.mSource=null;this._oSession.mTarget=null};r.prototype._eraseSelection=function(){Object.values(this._oSession.oCanvas).forEach(function(e){e.style=""})};r.prototype._handleScroll=function(e){if(!this._bSelecting){return}this._selectCells(this._oSession.mSource,this._oSession.mTarget)};r.prototype._savePreviousSelectionAreas=function(){Object.entries(this._oSession.oCanvas).forEach(function(e){var t=e[0],o=e[1];if(o.style.left&&o.style.top&&o.style.width&&o.style.height){if(!this._oSession.previousSelection){this._oSession.previousSelection={}}this._oSession.previousSelection[t]={top:parseFloat(o.style.top),left:parseFloat(o.style.left),width:parseFloat(o.style.width),height:parseFloat(o.style.height)}}}.bind(this))};function l(e,t){return{from:{rowIndex:Math.min(e.rowIndex,t.rowIndex),colIndex:Math.min(e.colIndex,t.colIndex)},to:{rowIndex:Math.max(e.rowIndex,t.rowIndex),colIndex:Math.max(e.colIndex,t.colIndex)}}}function a(e,t,o,n){return e.keyCode==t&&e.shiftKey==o&&(e.ctrlKey==n||e.metaKey==n)}e.setConfigs({"sap.m.Table":{selectableCells:".sapMListTblCell:not([aria-hidden=true])"},"sap.ui.table.Table":{container:"tableCtrlCnt",selectableCells:".sapUiTableDataCell",scrollEvent:"firstVisibleRowChanged",isSelectionEnabled:function(e){return!(e.getSelectionBehavior()!=="RowSelector"||e.getSelectionMode()=="None")},getCellRef:function(e,t){var o=this._getRowByIndex(e,t.rowIndex);if(o){var n=this._getColumns(e)[t.colIndex];var i=n&&o.getCells()[t.colIndex];if(i){return i.$().closest(".sapUiTableDataCell")[0]}}},getCellInfo:function(e,t){return{rowIndex:this.rowIndex(null,t),colIndex:this.colIndex(e,t)}},getSelectionAreas:function(e,t,o){var n=[],i=e.getFixedColumnCount();if(i>0&&(t.colIndex<i||t.colIndex===-Infinity)){var s=o.colIndex===Infinity?i-1:Math.min(o.colIndex,i-1);var r={rowIndex:t.rowIndex,colIndex:t.colIndex},l={rowIndex:o.rowIndex,colIndex:s};n.push({container:"sapUiTableCtrlScrFixed",from:r,to:l})}if(o.colIndex>=i||o.colIndex===Infinity){n.push({container:this.container,from:t,to:o,hasOffset:true})}return n},selectCells:function(e,t,o){var n={},i={top:true,bottom:true};n.from=Object.assign({},t.from);n.to=Object.assign({},t.to);var s=[];if(o&&o.info){if(o.info.focus.rowIndex===-Infinity){o.info.focus.rowIndex=0}else if(o.info.focus.rowIndex===Infinity){o.info.focus.rowIndex=e._getTotalRowCount()}if(o.info.focus.colIndex===-Infinity){o.info.focus.colIndex=0}else if(o.info.focus.colIndex===Infinity){o.info.focus.colIndex=this._getColumns(e).length-1}this._focusCell(e,o.info.focus,o.info.direction)}var r=e.getFirstVisibleRow()+e.getFixedRowCount();var l=r+e.getVisibleRowCount()-e.getFixedBottomRowCount()-e.getFixedRowCount()-1;var a=r+e.getVisibleRowCount()-e.getFixedRowCount()-e.getFixedBottomRowCount();if((n.from.rowIndex<r&&n.to.rowIndex<r||n.from.rowIndex>l&&n.to.rowIndex>l)&&!(n.from.rowIndex<e.getFixedRowCount()||n.to.rowIndex>=a)){n.from={};n.to={}}else{if(n.from.rowIndex<r&&n.from.rowIndex>e.getFixedRowCount()-1||n.from.rowIndex===-Infinity){n.from.rowIndex=r;i.top=n.from.rowIndex==0?true:false;if(t.from.rowIndex===-Infinity){t.from.rowIndex=0;n.from.rowIndex=e.getFixedRowCount()>0?0:r}}if(n.to.rowIndex>l&&n.to.rowIndex<e._getTotalRowCount()-e.getFixedBottomRowCount()||n.to.rowIndex===Infinity){n.to.rowIndex=l;i.bottom=n.to.rowIndex==e._getTotalRowCount()-1?true:false;if(t.to.rowIndex===Infinity){t.to.rowIndex=e._getTotalRowCount()-1;n.to.rowIndex=e.getFixedRowCount()>0?e._getTotalRowCount()-1:l}}}if(n.from.colIndex===-Infinity&&n.from.colIndex===Infinity){n.from.rowIndex=o.info.focus.rowIndex;t.from.rowIndex=o.info.focus.rowIndex}var f=this._getColumns(e);n.from.colIndex=t.from.colIndex=Math.max(t.from.colIndex,0);n.to.colIndex=t.to.colIndex=Math.min(t.to.colIndex,f.length-1);for(var c=t.from.rowIndex;c<=t.to.rowIndex;c++){var d=this._getRowByIndex(e,c);if(d){for(var u=t.from.colIndex;u<=t.to.colIndex;u++){s.push([c,u])}}}return{bounds:n,borderOptions:i,cells:s}},rowIndex:function(e,t){return jQuery(t).control(0,true).getIndex()},colIndex:function(e,t){return this._getColumns(e).indexOf(o.byId(t.getAttribute("data-sap-ui-colid")))},contextByIndex:function(e,t){return e.getContextByIndex(t)},columnByIndex:function(e,t){var o=this._getColumns(e)[t];if(!o.getVisible()){return}return o},isNavigatableCell:function(e,t){if(t.rowIndex<0||t.rowIndex>=e._getTotalRowCount()||t.colIndex<0||t.colIndex>=this._getColumns(e).length){return false}return true},_scrollRow:function(e,t,o){var n=e.getFirstVisibleRow();if(o>=0&&o<e._getTotalRowCount()){if(e.getFixedRowCount()>0&&o==e.getFixedRowCount()){e.setFirstVisibleRow(0)}else{t==i.NEXT?n++:n--;e.setFirstVisibleRow(n)}}},_focusCell:function(e,t,o){var n=this.getCellRef(e,t);if(!n){this._scrollRow(e,o,t.rowIndex);n=this.getCellRef(e,t)}n&&n.focus()},_getColumns:function(e){return e.getColumns().filter(function(e){return e.shouldRender()})},_getRowByIndex:function(e,t){var o=e.getRows();for(var n=0;n<o.length;n++){if(o[n].getIndex()==t){return o[n]}}}}},r);return r});
//# sourceMappingURL=CellSelector.js.map