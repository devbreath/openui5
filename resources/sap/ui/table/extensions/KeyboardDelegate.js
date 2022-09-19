/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../utils/TableUtils","../library","sap/ui/base/Object","sap/ui/Device","sap/ui/events/KeyCodes","sap/ui/thirdparty/jquery"],function(T,l,B,D,K,q){"use strict";var C=T.CELLTYPE;var S=l.SelectionMode;var M={CTRL:1,SHIFT:2,ALT:4};var H=5;var a="1rem";function p(i,P){i.setMarked("sapUiTableSkipItemNavigation",P!==false);}function h(i){if(T.getCellInfo(i.target).isOfType(C.ANY)){i.preventDefault();i.stopPropagation();}}var b=B.extend("sap.ui.table.extensions.KeyboardDelegate",{constructor:function(i){B.call(this);},destroy:function(){B.prototype.destroy.apply(this,arguments);},getInterface:function(){return this;}});function n(i,G){if(!e(i,G)){return;}var I=T.getCellInfo(T.getCell(i,G.target));if(I.isOfType(C.ANYCOLUMNHEADER)){_(i,I,G);}else if(I.isOfType(C.ANYCONTENTCELL)){c(i,I,G);}}function _(i,G,I){var J=T.getHeaderRowCount(i);if(T.isNoDataVisible(i)){var L=T.getFocusedItemInfo(i);if(L.row-J<=1){p(I);}}else if(G.isOfType(C.COLUMNROWHEADER)&&J>1){p(I);T.focusItem(i,J*(T.getVisibleColumnCount(i)+1),I);}}function c(i,G,I){var J=i._getKeyboardExtension();var L=J.isInActionMode();var N=b._isKeyCombination(I,null,M.CTRL);var O=N||L;var P=T.getParentCell(i,I.target);if(!O&&P){P.trigger("focus");return;}p(I);if(T.isLastScrollableRow(i,G.cell)){var Q=s(i,I);if(Q){I.preventDefault();return;}}if(G.rowIndex===i.getRows().length-1){if(!L&&P){P.trigger("focus");}else{var R=i.getCreationRow();if(!R||!R._takeOverKeyboardHandling(I)){J.setActionMode(false);}}return;}A(i,G.type,G.rowIndex+1,G.columnIndex,O);I.preventDefault();}function d(i,G){var I=T.getCellInfo(T.getCell(i,G.target));if(!I.isOfType(C.ANYCONTENTCELL)||!e(i,G)){return;}var J=b._isKeyCombination(G,null,M.CTRL);var L=i._getKeyboardExtension();var N=L.isInActionMode();var O=J||N;var P=T.getParentCell(i,G.target);if(!O&&P){P.trigger("focus");return;}p(G);if(T.isFirstScrollableRow(i,I.cell)){var Q=g(i,G);if(Q){G.preventDefault();return;}}if(I.rowIndex===0){p(G,I.isOfType(C.ROWACTION)||O);if(!N&&P){P.trigger("focus");}else{L.setActionMode(false);}return;}A(i,I.type,I.rowIndex-1,I.columnIndex,O);G.preventDefault();}function e(i,G){var I=b._isKeyCombination(G,null,M.CTRL);return!G.isMarked()&&(I||!(G.target instanceof window.HTMLInputElement)&&!(G.target instanceof window.HTMLTextAreaElement));}function f(i,G){if(G.isMarked()){return;}var I=T.getCellInfo(T.getCell(i,G.target));var J=sap.ui.getCore().getConfiguration().getRTL();if(!I.isOfType(C.COLUMNHEADER)||!J){return;}var L=T.getFocusedItemInfo(i);var N=L.cellInRow-(T.hasRowHeader(i)?1:0);var O=T.getVisibleColumnCount(i);if(T.hasRowActions(i)&&N===O-1){p(G);}}function s(i,G,P,I){var J=i._getFirstRenderedRowIndex()===i._getMaxFirstRenderedRowIndex();if(J){return null;}j(i,G,true,P,I);return true;}function g(i,G,P,I){var J=i._getFirstRenderedRowIndex()===0;if(J){return false;}j(i,G,false,P,I);return true;}function j(i,G,I,P,J){var L=T.getCellInfo(T.getCell(i,G.target));var N=i._getKeyboardExtension().isInActionMode();var O=b._isKeyCombination(G,null,M.CTRL);var Q=O||N;var R=N&&L.isOfType(C.DATACELL);if(R){i._getKeyboardExtension().setSilentFocus(i.getDomRef("focusDummy"));setTimeout(function(){i._getScrollExtension().scrollVertically(I===true,P);},0);}else{i._getScrollExtension().scrollVertically(I===true,P);}if(Q||J){i.attachEventOnce("rowsUpdated",function(){if(J){J();}else{A(i,L.type,L.rowIndex,L.columnIndex,true);}});}}function k(i,G){var R=i._getRowCounts();var I=s(i,G,false,function(){m(i,R.fixedTop+R.scrollable-1);});if(I){return;}if(R.fixedBottom>0){m(i,R.fixedTop+R.scrollable);}else{i._getKeyboardExtension().setActionMode(false);}}function m(i,R){var G=i.getRows()[R];var I=G.isGroupHeader()||T.isRowSelectorSelectionAllowed(i);if(I){A(i,C.ROWHEADER,R);}else{var $=b._getFirstInteractiveElement(G);if($){b._focusElement(i,$[0]);}else{A(i,C.DATACELL,R,0,false,true);if(G.getIndex()===i._getTotalRowCount()-1){i._getKeyboardExtension().setActionMode(false);}}}}function o(i,G){var R=i._getRowCounts();var I=g(i,G,false,function(){r(i,R.fixedTop);});if(I){return;}if(R.fixedTop>0){r(i,R.fixedTop-1);}else{i._getKeyboardExtension().setActionMode(false);}}function r(i,R){var G=i.getRows()[R];var I=G.isGroupHeader()||T.isRowSelectorSelectionAllowed(i);var $=b._getLastInteractiveElement(G);if($){b._focusElement(i,$[0]);}else if(I){A(i,C.ROWHEADER,R);}else{A(i,C.DATACELL,R,0,false,true);if(G.getIndex()===0){i._getKeyboardExtension().setActionMode(false);}}}function t(i,G){var I=T.getFocusedItemInfo(i);var L=i._getKeyboardExtension().getLastFocusedCellInfo();T.focusItem(i,I.cellInRow+(I.columnCount*L.row),G);}function u(i,G){var I=T.getFocusedItemInfo(i);T.focusItem(i,I.cellInRow,G);}function v(i,G){i._getKeyboardExtension().setSilentFocus(i.$().find("."+G));}b._isKeyCombination=function(i,G,I){if(I==null){I=0;}var J=typeof G==="string"?String.fromCharCode(i.charCode):i.keyCode;var L=0;L|=(D.os.macintosh?i.metaKey:i.ctrlKey)&&G!==K.CONTROL?M.CTRL:0;L|=i.shiftKey&&G!==K.SHIFT?M.SHIFT:0;L|=i.altKey&&G!==K.ALT?M.ALT:0;var V=G==null||J===G;var N=I===L;return V&&N;};function w(i,G){var $=T.getCell(i,G);var I=T.getCellInfo($);return i.getRows()[I.rowIndex];}function x(i,G){var I=T.getCellInfo(G.target);if(I.isOfType(C.COLUMNROWHEADER)){i._getSelectionPlugin().onHeaderSelectorPress();}else if(b._allowsToggleExpandedState(i,G.target)){w(i,G.target).toggleExpandedState();}else if(I.isOfType(C.ROWHEADER)){L();}else if(I.isOfType(C.DATACELL|C.ROWACTION)){var J=!i.hasListeners("cellClick");if(!i._findAndfireCellEvent(i.fireCellClick,G)){if(T.isRowSelectionAllowed(i)){L();J=false;}}if(J){var $=T.getInteractiveElements(G.target);if($){i._getKeyboardExtension().setActionMode(true);}}}function L(){var N=null;if(i._legacyMultiSelection){N=function(R){i._legacyMultiSelection(R,G);return true;};}T.toggleRowSelection(i,G.target,null,N);}}function y(i,N){var G=i.getParent();var V=G._getVisibleColumns();var I=V.indexOf(i);var J;if(N&&I<V.length-1){J=G.indexOfColumn(V[I+1])+1;}else if(!N&&I>0){J=G.indexOfColumn(V[I-1]);}if(J!=null){T.Column.moveColumnTo(i,J);}}function z(G,I){var V=G.getColumns().filter(function(I){return I.getVisible()||I.getGrouped();});for(var i=0;i<V.length;i++){var J=V[i];if(J===I){return i;}}return-1;}b._focusElement=function(i,G,I){if(!i||!G){return;}if(I==null){I=false;}if(I){i._getKeyboardExtension().setSilentFocus(G);}else{G.focus();}if(G instanceof window.HTMLInputElement){G.select();}};function A(i,G,R,I,J,L){if(!i||G==null||R==null||R<0||R>=i.getRows().length){return;}var N=i.getRows()[R];var O;if(G===C.ROWHEADER){i._getKeyboardExtension().setFocus(i.getDomRef("rowsel"+R));return;}else if(G===C.ROWACTION){O=i.getDomRef("rowact"+R);}else if(G===C.DATACELL&&(I!=null&&I>=0)){var P=i.getColumns()[I];var Q=z(i,P);if(Q>=0){O=N.getDomRef("col"+Q);}}if(!O){return;}if(J){var $=T.getInteractiveElements(O);if($){b._focusElement(i,$[0]);return;}}if(L){i._getKeyboardExtension()._bStayInActionMode=true;}O.focus();}function E(i){return i.classList.contains("sapUiTableTreeIconNodeOpen")||i.classList.contains("sapUiTableTreeIconNodeClosed");}b._allowsToggleExpandedState=function(i,G){return T.Grouping.isInGroupHeaderRow(G)||(T.Grouping.isInTreeMode(i)&&G.classList.contains("sapUiTableCellFirst")&&(G.querySelector(".sapUiTableTreeIconNodeOpen")||G.querySelector(".sapUiTableTreeIconNodeClosed")))||E(G);};b._isElementInteractive=function(i){if(!i){return false;}return q(i).is(T.INTERACTIVE_ELEMENT_SELECTORS);};b._getFirstInteractiveElement=function(R){var i=T.getFirstInteractiveElement(R,true);if(!i){return null;}return q(i);};b._getLastInteractiveElement=function(R){if(!R){return null;}var G=R.getParent();var I=R.getCells();var $;var J;if(T.hasRowActions(G)){I.push(R.getRowAction());}for(var i=I.length-1;i>=0;i--){$=T.getParentCell(G,I[i].getDomRef());J=T.getInteractiveElements($);if(J){return J.last();}}return null;};b._getPreviousInteractiveElement=function(G,I){if(!G||!I){return null;}var $=q(I);if(!this._isElementInteractive($)){return null;}var J=T.getParentCell(G,I);var L;var N;var O;var P;var Q;var R;var U;L=T.getInteractiveElements(J);if(L[0]!==$[0]){return L.eq(L.index(I)-1);}N=T.getCellInfo(J);P=G.getRows()[N.rowIndex].getCells();if(N.isOfType(C.ROWACTION)){U=P.length-1;}else{Q=G.getColumns()[N.columnIndex];R=z(G,Q);U=R-1;}for(var i=U;i>=0;i--){O=P[i].getDomRef();J=T.getParentCell(G,O);L=T.getInteractiveElements(J);if(L){return L.last();}}return null;};b._getNextInteractiveElement=function(G,I){if(!G||!I){return null;}var $=q(I);if(!this._isElementInteractive($)){return null;}var J=T.getParentCell(G,I);var L;var N;var O;var P;var Q;var R;var U;L=T.getInteractiveElements(J);if(L.get(-1)!==$[0]){return L.eq(L.index(I)+1);}N=T.getCellInfo(J);if(N.isOfType(C.ROWACTION)){return null;}R=G.getRows()[N.rowIndex];P=R.getCells();Q=G.getColumns()[N.columnIndex];U=z(G,Q);for(var i=U+1;i<P.length;i++){O=P[i].getDomRef();J=T.getParentCell(G,O);L=T.getInteractiveElements(J);if(L){return L.first();}}if(T.hasRowActions(G)){J=T.getParentCell(G,R.getRowAction().getDomRef());L=T.getInteractiveElements(J);if(L.get(-1)!==$[0]){return L.eq(L.index(I)+1);}}return null;};function F(i){var G=T.getRowIndexOfFocusedCell(i);var I=i.getRows()[G].getIndex();var J=i._getSelectionPlugin();i._oRangeSelection={startIndex:I,selected:J.isIndexSelected(I)};}b.prototype.enterActionMode=function(){var i=this._getKeyboardExtension();var G=document.activeElement;var I=T.getInteractiveElements(G);var $=T.getParentCell(this,G);var J=T.getCellInfo($);if(J.isOfType(C.ANYCOLUMNHEADER)){return false;}if(I){i.suspendItemNavigation();G.tabIndex=-1;b._focusElement(this,I[0],true);return true;}else if($){this._getKeyboardExtension().suspendItemNavigation();return true;}return false;};b.prototype.leaveActionMode=function(i){i=i==null?true:i;var G=this._getKeyboardExtension();var I=document.activeElement;var $=T.getParentCell(this,I);G.resumeItemNavigation();if(i){if($){b._focusElement(this,$[0],true);}else{var J=this._getItemNavigation();if(J){var L=J.aItemDomRefs;var N=L.indexOf(I);if(N>-1){J.setFocusedIndex(N);}}G.setSilentFocus(I);}}};b.prototype.onfocusin=function(i){if(i.isMarked("sapUiTableIgnoreFocusIn")){return;}var $=q(i.target);if($.hasClass("sapUiTableOuterBefore")||$.hasClass("sapUiTableOuterAfter")||(i.target!=this.getDomRef("overlay")&&this.getShowOverlay())){this.$("overlay").trigger("focus");}else if($.hasClass("sapUiTableCtrlBefore")){var N=T.isNoDataVisible(this);if(!N||N&&this.getColumnHeaderVisible()){u(this,i);}else{this._getKeyboardExtension().setSilentFocus(this.$("noDataCnt"));}}else if($.hasClass("sapUiTableCtrlAfter")){if(!T.isNoDataVisible(this)){t(this,i);}}var G=T.getCellInfo(i.target);var I=G.isOfType(C.ROWHEADER)&&T.Grouping.isInGroupHeaderRow(i.target);var J=G.isOfType(C.ROWHEADER)&&!I&&T.isRowSelectorSelectionAllowed(this);var L=G.isOfType(C.DATACELL)&&this._getKeyboardExtension()._bStayInActionMode;var P=T.getCellInfo(T.getParentCell(this,i.target)).isOfType(C.ANYCONTENTCELL);var O=b._isElementInteractive(i.target);var Q=this._getKeyboardExtension().isInActionMode();var R=(Q&&(I||J||L)||(O&&P));if(L){this._getKeyboardExtension()._bStayInActionMode=false;}this._getKeyboardExtension().setActionMode(R,false);};b.prototype.onkeydown=function(i){if(i.isMarked()){return;}var G=this._getKeyboardExtension();var I=T.getCellInfo(i.target);var J=this.getSelectionMode();var L=this._getSelectionPlugin();if(b._isKeyCombination(i,K.F2)){var N=G.isInActionMode();var $=T.getCell(this,i.target);var O=T.getParentCell(this,i.target)!=null;I=T.getCellInfo($);if(!N&&O){$.trigger("focus");}else if(I.isOfType(C.ANYCOLUMNHEADER)){var P=T.getInteractiveElements($);if(P){P[0].focus();}}else{G.setActionMode(!N);}return;}if(b._isKeyCombination(i,K.F4)&&b._allowsToggleExpandedState(this,i.target)){w(this,i.target).toggleExpandedState();return;}if(b._isKeyCombination(i,K.SPACE)&&E(i.target)){i.preventDefault();return;}if(this._getKeyboardExtension().isInActionMode()||!I.isOfType(C.ANY)){return;}if(b._isKeyCombination(i,K.SPACE)){i.preventDefault();}if(b._isKeyCombination(i,K.SHIFT)&&J===S.MultiToggle&&(I.isOfType(C.ROWHEADER)&&T.isRowSelectorSelectionAllowed(this)||(I.isOfType(C.DATACELL|C.ROWACTION)))){F(this);}else if(b._isKeyCombination(i,K.A,M.CTRL)){i.preventDefault();if(I.isOfType(C.ANYCONTENTCELL|C.COLUMNROWHEADER)&&J===S.MultiToggle){L.onKeyboardShortcut("toggle");}}else if(b._isKeyCombination(i,K.A,M.CTRL+M.SHIFT)){if(I.isOfType(C.ANYCONTENTCELL|C.COLUMNROWHEADER)){L.onKeyboardShortcut("clear");}}else if(b._isKeyCombination(i,K.F4)){if(I.isOfType(C.DATACELL)){G.setActionMode(true);}}};b.prototype.onkeypress=function(i){if(i.isMarked()){return;}var G=this._getKeyboardExtension();var I=T.getCellInfo(i.target);if(b._isKeyCombination(i,"+")){if(b._allowsToggleExpandedState(this,i.target)){w(this,i.target).expand();}else if(I.isOfType(C.DATACELL|C.ROWACTION)){G.setActionMode(true);}}else if(b._isKeyCombination(i,"-")){if(b._allowsToggleExpandedState(this,i.target)){w(this,i.target).collapse();}else if(I.isOfType(C.DATACELL|C.ROWACTION)){G.setActionMode(true);}}};b.prototype.oncontextmenu=function(i){if(i.isMarked("handledByPointerExtension")){return;}var G=T.getCellInfo(document.activeElement);if(G.isOfType(C.ANY)){i.preventDefault();T.Menu.openContextMenu(this,i.target,i);}};b.prototype.onkeyup=function(i){if(i.isMarked()){return;}var G=T.getCellInfo(i.target);if(b._isKeyCombination(i,K.SHIFT)){delete this._oRangeSelection;}if(G.isOfType(C.COLUMNHEADER)){if(b._isKeyCombination(i,K.SPACE)||b._isKeyCombination(i,K.ENTER)){T.Menu.openContextMenu(this,i.target);}}else if(b._isKeyCombination(i,K.SPACE)){x(this,i);}else if(b._isKeyCombination(i,K.SPACE,M.SHIFT)){T.toggleRowSelection(this,this.getRows()[G.rowIndex].getIndex());F(this);}else if(this._legacyMultiSelection&&!G.isOfType(C.COLUMNROWHEADER)&&(b._isKeyCombination(i,K.SPACE,M.CTRL)||b._isKeyCombination(i,K.ENTER,M.CTRL))){x(this,i);}};b.prototype.onsaptabnext=function(G){var I=this._getKeyboardExtension();var J=T.getCellInfo(G.target);var $;if(I.isInActionMode()){var L;$=T.getCell(this,G.target);J=T.getCellInfo($);if(!J.isOfType(C.ANYCONTENTCELL)){return;}var R=this.getRows()[J.rowIndex];var N=b._getLastInteractiveElement(R);var O=N===null||N[0]===G.target;if(O){var P=R.getIndex();var Q=T.isLastScrollableRow(this,$);var U=this._getTotalRowCount()-1===P;var V=T.isRowSelectorSelectionAllowed(this);G.preventDefault();if(U){I.setActionMode(false);}else if(Q){k(this,G);}else{var W=J.rowIndex;if(V){A(this,C.ROWHEADER,W+1);}else{var X=this.getRows().length;var Y=false;for(var i=J.rowIndex+1;i<X;i++){W=i;R=this.getRows()[W];L=b._getFirstInteractiveElement(R);Y=R.isGroupHeader();if(L||Y){break;}}if(L){b._focusElement(this,L[0]);}else if(Y){A(this,C.ROWHEADER,W);}else{k(this,G);}}}}else if(J.isOfType(C.ROWHEADER)){G.preventDefault();L=b._getFirstInteractiveElement(R);b._focusElement(this,L[0]);}else{G.preventDefault();L=b._getNextInteractiveElement(this,G.target);b._focusElement(this,L[0]);}}else if(J.isOfType(C.ANYCOLUMNHEADER)){if(T.isNoDataVisible(this)){this.$("noDataCnt").trigger("focus");G.preventDefault();}else if(this.getRows().length>0){t(this,G);G.preventDefault();}}else if(J.isOfType(C.ANYCONTENTCELL)){v(this,"sapUiTableCtrlAfter");}else if(G.target===this.getDomRef("overlay")){I.setSilentFocus(this.$().find(".sapUiTableOuterAfter"));}else if(!J.isOfType(C.ANY)){$=T.getParentCell(this,G.target);if($){G.preventDefault();$.trigger("focus");}}};b.prototype.onsaptabprevious=function(G){var I=this._getKeyboardExtension();var J=T.getCellInfo(G.target);var $;if(I.isInActionMode()){var L;$=T.getCell(this,G.target);J=T.getCellInfo($);if(!J.isOfType(C.ANYCONTENTCELL)){return;}var R=this.getRows()[J.rowIndex];var N=R.getIndex();var O=b._getFirstInteractiveElement(R);var P=O!==null&&O[0]===G.target;var Q=T.isRowSelectorSelectionAllowed(this);var U=Q||R.isGroupHeader();if(P&&U){G.preventDefault();A(this,C.ROWHEADER,J.rowIndex);}else if((P&&!U)||J.isOfType(C.ROWHEADER)||O===null){var V=T.isFirstScrollableRow(this,$);var W=N===0;G.preventDefault();if(W){I.setActionMode(false);}else if(V){o(this,G);}else{var X=J.rowIndex;var Y=false;for(var i=J.rowIndex-1;i>=0;i--){X=i;R=this.getRows()[X];L=b._getLastInteractiveElement(R);Y=R.isGroupHeader();if(L||U||Y){break;}}if(L){b._focusElement(this,L[0]);}else if(Y||U){A(this,C.ROWHEADER,X);}else{o(this,G);}}}else{G.preventDefault();L=b._getPreviousInteractiveElement(this,G.target);b._focusElement(this,L[0]);}}else if(J.isOfType(C.ANYCONTENTCELL)||G.target===this.getDomRef("noDataCnt")){if(this.getColumnHeaderVisible()&&!J.isOfType(C.ROWACTION)){u(this,G);G.preventDefault();}else{v(this,"sapUiTableCtrlBefore");}}else if(G.target===this.getDomRef("overlay")){this._getKeyboardExtension().setSilentFocus(this.$().find(".sapUiTableOuterBefore"));}else if(!J.isOfType(C.ANY)){$=T.getParentCell(this,G.target);if($){G.preventDefault();$.trigger("focus");}}};b.prototype.onsapdown=function(i){h(i);n(this,i);};b.prototype.onsapdownmodifiers=function(i){h(i);if(b._isKeyCombination(i,null,M.CTRL)){n(this,i);return;}var G=this._getKeyboardExtension();if(b._isKeyCombination(i,null,M.ALT)&&b._allowsToggleExpandedState(this,i.target)){p(i);w(this,i.target).expand();return;}if(G.isInActionMode()){return;}var I=T.getCellInfo(i.target);if(b._isKeyCombination(i,null,M.SHIFT)){if(I.isOfType(C.ANYCONTENTCELL)){if(!this._oRangeSelection){p(i);return;}var J=T.getRowIndexOfFocusedCell(this);var L=this.getRows()[J].getIndex();if(L===this._getTotalRowCount()-1){return;}if(T.isLastScrollableRow(this,i.target)){var N=s(this,i);if(N){p(i);}}if(this._oRangeSelection.startIndex<=L){L++;if(this._oRangeSelection.selected){T.toggleRowSelection(this,L,true);}else{T.toggleRowSelection(this,L,false);}}else{T.toggleRowSelection(this,L,false);}}else{p(i);}}if(b._isKeyCombination(i,null,M.ALT)){if(I.isOfType(C.DATACELL)){G.setActionMode(true);}p(i);}};b.prototype.onsapup=function(i){h(i);d(this,i);};b.prototype.onsapupmodifiers=function(i){h(i);if(b._isKeyCombination(i,null,M.CTRL)){d(this,i);return;}if(b._isKeyCombination(i,null,M.ALT)&&b._allowsToggleExpandedState(this,i.target)){p(i);w(this,i.target).collapse();return;}var G=this._getKeyboardExtension();if(G.isInActionMode()){return;}var I=T.getCellInfo(i.target);if(b._isKeyCombination(i,null,M.SHIFT)){if(I.isOfType(C.ANYCONTENTCELL)){if(!this._oRangeSelection){p(i);return;}var J=T.getRowIndexOfFocusedCell(this);var L=this.getRows()[J].getIndex();if(L===0){p(i);return;}if(T.isFirstScrollableRow(this,i.target)){var N=g(this,i);if(N){p(i);}}if(this._oRangeSelection.startIndex>=L){L--;if(this._oRangeSelection.selected){T.toggleRowSelection(this,L,true);}else{T.toggleRowSelection(this,L,false);}}else{T.toggleRowSelection(this,L,false);}}else{p(i);}}if(b._isKeyCombination(i,null,M.ALT)){if(I.isOfType(C.DATACELL)){G.setActionMode(true);}p(i);}};b.prototype.onsapleft=function(i){h(i);f(this,i);};b.prototype.onsapleftmodifiers=function(G){h(G);if(this._getKeyboardExtension().isInActionMode()){return;}var I=T.getCellInfo(G.target);var J=sap.ui.getCore().getConfiguration().getRTL();if(b._isKeyCombination(G,null,M.SHIFT)){if(I.isOfType(C.DATACELL)){if(!this._oRangeSelection){p(G);return;}var L=T.getFocusedItemInfo(this);var N=T.hasRowHeader(this)&&L.cellInRow===1;if(N&&!T.isRowSelectorSelectionAllowed(this)){p(G);}}else if(I.isOfType(C.ROWACTION)){if(!this._oRangeSelection){p(G);}}else if(I.isOfType(C.ROWHEADER)&&J){if(!T.isRowSelectionAllowed(this)){p(G);}}else if(I.isOfType(C.COLUMNROWHEADER)&&J){p(G);}else if(I.isOfType(C.COLUMNHEADER)){var R=-T.convertCSSSizeToPixel(a);var O=0;if(J){R=R*-1;}for(var i=I.columnIndex;i<I.columnIndex+I.columnSpan;i++){O+=T.Column.getColumnWidth(this,i);}T.Column.resizeColumn(this,I.columnIndex,O+R,true,I.columnSpan);p(G);}}else if(b._isKeyCombination(G,null,M.CTRL)){if(I.isOfType(C.COLUMNHEADER)){p(G);y(this.getColumns()[I.columnIndex],J);}}else if(b._isKeyCombination(G,null,M.ALT)){p(G);}};b.prototype.onsaprightmodifiers=function(G){h(G);if(this._getKeyboardExtension().isInActionMode()){return;}var I=T.getCellInfo(G.target);var J=sap.ui.getCore().getConfiguration().getRTL();if(b._isKeyCombination(G,null,M.SHIFT)){if(I.isOfType(C.DATACELL)){if(!this._oRangeSelection){p(G);}}else if(I.isOfType(C.ROWHEADER)){if(!T.isRowSelectionAllowed(this)){p(G);}}else if(I.isOfType(C.ROWACTION)&&J){if(!this._oRangeSelection){p(G);}}else if(I.isOfType(C.COLUMNHEADER)){var R=T.convertCSSSizeToPixel(a);var L=0;if(J){R=R*-1;}for(var i=I.columnIndex;i<I.columnIndex+I.columnSpan;i++){L+=T.Column.getColumnWidth(this,i);}T.Column.resizeColumn(this,I.columnIndex,L+R,true,I.columnSpan);p(G);}else if(I.isOfType(C.COLUMNROWHEADER)){p(G);}}else if(b._isKeyCombination(G,null,M.CTRL)){if(I.isOfType(C.COLUMNHEADER)){p(G);y(this.getColumns()[I.columnIndex],!J);}}else if(b._isKeyCombination(G,null,M.ALT)){p(G);}};b.prototype.onsaphome=function(i){h(i);if(this._getKeyboardExtension().isInActionMode()){return;}if(T.Grouping.isInGroupHeaderRow(i.target)){p(i);return;}var G=T.getCellInfo(i.target);if(G.isOfType(C.DATACELL|C.ROWACTION|C.COLUMNHEADER)){var I=T.getFocusedItemInfo(this);var J=I.cell;var L=I.cellInRow;var N=this.getComputedFixedColumnCount();var O=T.hasRowHeader(this);var R=O?1:0;if(T.hasFixedColumns(this)&&L>N+R){p(i);T.focusItem(this,J-L+N+R,null);}else if(O&&L>1){p(i);T.focusItem(this,J-L+R,null);}}};b.prototype.onsapend=function(i){h(i);if(this._getKeyboardExtension().isInActionMode()){return;}if(T.Grouping.isInGroupHeaderRow(i.target)){p(i);return;}var G=T.getCellInfo(i.target);if(G.isOfType(C.ANY)){var I=T.getFocusedItemInfo(this);var J=I.cell;var L=I.columnCount;var N=this.getComputedFixedColumnCount();var O=I.cellInRow;var P=T.hasRowHeader(this);var R=P?1:0;var Q=false;if(G.isOfType(C.COLUMNHEADER)&&T.hasFixedColumns(this)){var U=parseInt(G.cell.attr("colspan")||1);if(U>1&&O+U-R===N){Q=true;}}if(P&&O===0){p(i);T.focusItem(this,J+1,null);}else if(T.hasFixedColumns(this)&&O<N-1+R&&!Q){p(i);T.focusItem(this,J+N-O,null);}else if(T.hasRowActions(this)&&G.isOfType(C.DATACELL)&&O<L-2){p(i);T.focusItem(this,J-O+L-2,null);}}};b.prototype.onsaphomemodifiers=function(i){h(i);if(this._getKeyboardExtension().isInActionMode()){return;}if(b._isKeyCombination(i,null,M.CTRL)){var G=T.getCellInfo(i.target);if(G.isOfType(C.ANYCONTENTCELL|C.COLUMNHEADER)){p(i);var I=T.getFocusedItemInfo(this);var J=I.row;if(J>0){var L=I.cell;var N=I.columnCount;var O=T.getHeaderRowCount(this);var R=this._getRowCounts();if(J<O+R.fixedTop){if(G.isOfType(C.ROWACTION)){T.focusItem(this,L-N*(J-O),i);}else{T.focusItem(this,L-N*J,i);}}else if(J>=O+R.fixedTop&&J<O+T.getNonEmptyRowCount(this)-R.fixedBottom){this._getScrollExtension().scrollVerticallyMax(false);if(R.fixedTop>0||G.isOfType(C.ROWACTION)){T.focusItem(this,L-N*(J-O),i);}else{T.focusItem(this,L-N*J,i);}}else{this._getScrollExtension().scrollVerticallyMax(false);T.focusItem(this,L-N*(J-O-R.fixedTop),i);}}}}};b.prototype.onsapendmodifiers=function(i){h(i);if(this._getKeyboardExtension().isInActionMode()){return;}if(b._isKeyCombination(i,null,M.CTRL)){var G=T.getCellInfo(i.target);if(G.isOfType(C.ANY)){var I=T.getFocusedItemInfo(this);var J=I.row;var L=T.getHeaderRowCount(this);var N=T.getNonEmptyRowCount(this);var R=this._getRowCounts();p(i);if(R.fixedBottom===0||J<L+N-1||(T.isNoDataVisible(this)&&J<L-1)){var O=I.cell;var P=I.columnCount;if(T.isNoDataVisible(this)){T.focusItem(this,O+P*(L-J-1),i);}else if(J<L){if(R.fixedTop>0){T.focusItem(this,O+P*(L+R.fixedTop-J-1),i);}else{this._getScrollExtension().scrollVerticallyMax(true);T.focusItem(this,O+P*(L+N-R.fixedBottom-J-1),i);}}else if(J>=L&&J<L+R.fixedTop){this._getScrollExtension().scrollVerticallyMax(true);T.focusItem(this,O+P*(L+N-R.fixedBottom-J-1),i);}else if(J>=L+R.fixedTop&&J<L+N-R.fixedBottom){this._getScrollExtension().scrollVerticallyMax(true);T.focusItem(this,O+P*(L+N-J-1),i);}else{T.focusItem(this,O+P*(L+N-J-1),i);}}}}};b.prototype.onsappageup=function(i){h(i);if(this._getKeyboardExtension().isInActionMode()){return;}var G=T.getCellInfo(i.target);if(G.isOfType(C.ANYCONTENTCELL|C.COLUMNHEADER)){var I=T.getFocusedItemInfo(this);var J=I.row;var L=T.getHeaderRowCount(this);var R=this._getRowCounts();if(R.fixedTop===0&&J>=L||R.fixedTop>0&&J>L){p(i);var N=I.cell;var O=I.columnCount;if(J<L+R.fixedTop){T.focusItem(this,N-O*(J-L),i);}else if(J===L+R.fixedTop){var P=T.getNonEmptyRowCount(this)-R.fixedTop-R.fixedBottom;var Q=this.getFirstVisibleRow();g(this,i,true);if(Q<P){if(R.fixedTop>0||G.isOfType(C.ROWACTION)){T.focusItem(this,N-O*(J-L),i);}else{T.focusItem(this,N-O*L,i);}}}else if(J>L+R.fixedTop&&J<L+T.getNonEmptyRowCount(this)){T.focusItem(this,N-O*(J-L-R.fixedTop),i);}else{T.focusItem(this,N-O*(J-L-T.getNonEmptyRowCount(this)+1),i);}}if(G.isOfType(C.ROWACTION)&&J===L&&R.fixedTop>0){p(i);}}};b.prototype.onsappagedown=function(i){h(i);if(this._getKeyboardExtension().isInActionMode()){return;}var G=T.getCellInfo(i.target);if(G.isOfType(C.ANY)){var I=T.getFocusedItemInfo(this);var J=I.row;var L=T.getHeaderRowCount(this);var N=T.getNonEmptyRowCount(this);var R=this._getRowCounts();p(i);if((T.isNoDataVisible(this)&&J<L-1)||R.fixedBottom===0||J<L+N-1){var O=I.cell;var P=I.columnCount;if(J<L-1&&!G.isOfType(C.COLUMNROWHEADER)){T.focusItem(this,O+P*(L-J-1),i);}else if(J<L){if(!T.isNoDataVisible(this)){T.focusItem(this,O+P*(L-J),i);}}else if(J>=L&&J<L+N-R.fixedBottom-1){T.focusItem(this,O+P*(L+N-R.fixedBottom-J-1),i);}else if(J===L+N-R.fixedBottom-1){var Q=T.getNonEmptyRowCount(this)-R.fixedTop-R.fixedBottom;var U=this._getTotalRowCount()-R.fixedBottom-this.getFirstVisibleRow()-Q*2;s(this,i,true);if(U<Q&&R.fixedBottom>0){T.focusItem(this,O+P*(L+N-J-1),i);}}else{T.focusItem(this,O+P*(L+N-J-1),i);}}}};b.prototype.onsappageupmodifiers=function(i){h(i);if(this._getKeyboardExtension().isInActionMode()){return;}if(b._isKeyCombination(i,null,M.ALT)){var G=T.getCellInfo(i.target);var I=T.getFocusedItemInfo(this);if(G.isOfType(C.DATACELL|C.COLUMNHEADER)){var J=I.cell;var L=I.cellInRow;var N=T.hasRowHeader(this);var R=N?1:0;var P=H;p(i);if(N&&(T.Grouping.isInGroupHeaderRow(i.target)||L===1)){T.focusItem(this,J-L,null);}else if(L-R<P){T.focusItem(this,J-L+R,null);}else{T.focusItem(this,J-P,null);}}else if(G.isOfType(C.ROWACTION)){T.focusItem(this,I.cell-1,null);}}};b.prototype.onsappagedownmodifiers=function(i){h(i);if(this._getKeyboardExtension().isInActionMode()){return;}if(b._isKeyCombination(i,null,M.ALT)){var G=T.getCellInfo(i.target);if(G.isOfType(C.DATACELL|C.ROWHEADER|C.ANYCOLUMNHEADER)){var I=T.getFocusedItemInfo(this);var J=I.cellInRow;var L=T.hasRowHeader(this);var R=L?1:0;var V=T.getVisibleColumnCount(this);var N=parseInt(G.cell.attr("colspan")||1);p(i);if(J+N-R<V){var O=I.cell;var P=H;if(L&&J===0){T.focusItem(this,O+1,null);}else if(N>P){T.focusItem(this,O+N,null);}else if(J+N-R+P>V){T.focusItem(this,O+V-J-1+R,null);}else if(!T.Grouping.isInGroupHeaderRow(i.target)){T.focusItem(this,O+P,null);}}else if(G.isOfType(C.DATACELL)&&T.hasRowActions(this)&&J===I.columnCount-2){T.focusItem(this,I.cell+1,null);}}}};b.prototype.onsapenter=function(i){x(this,i);};return b;});
