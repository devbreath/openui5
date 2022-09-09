/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/Device","./library","./Column","./utils/TableUtils","./extensions/ExtensionBase","sap/ui/core/Renderer","sap/ui/core/IconPool","sap/base/Log"],function(e,t,a,i,r,n,s,l,o){"use strict";var d=a.VisibleRowCountMode;var c=a.SortOrder;var p=r.Column;var g={Begin:"flex-start",End:"flex-end",Left:undefined,Right:undefined,Center:"center"};var b={apiVersion:2};b.render=function(e,i){delete i._iHeaderRowCount;g.Left=i._bRtlMode?"flex-end":"flex-start";g.Right=i._bRtlMode?"flex-start":"flex-end";r.getResourceBundle();e.openStart("div",i);i._getAccRenderExtension().writeAriaAttributesFor(e,i,"ROOT");e.class("sapUiTable");if(t.browser.chrome&&window.devicePixelRatio<1){e.class("sapUiTableZoomout")}if("ontouchstart"in document){e.class("sapUiTableTouch")}e.class("sapUiTableSelMode"+i.getSelectionMode());if(i.getColumnHeaderVisible()){e.class("sapUiTableCHdr")}if(r.hasRowHeader(i)){e.class("sapUiTableRowSelectors")}if(r.hasRowHighlights(i)){e.class("sapUiTableRowHighlights")}var n=a.TableHelper.addTableClass();if(n){e.class(n)}var s=i._getScrollExtension();if(s.isVerticalScrollbarRequired()&&!s.isVerticalScrollbarExternal()){e.class("sapUiTableVScr")}if(i.getEditable()){e.class("sapUiTableEdt")}if(r.hasRowActions(i)){var l=i.getRowActionCount();e.class(l==1?"sapUiTableRActS":"sapUiTableRAct")}else if(r.hasRowNavigationIndicators(i)){e.class("sapUiTableRowNavIndicator")}if(r.isNoDataVisible(i)&&!i._hasPendingRequests()){e.class("sapUiTableEmpty")}if(i.getShowOverlay()){e.class("sapUiTableOverlay")}var o=r.Grouping.getModeCssClass(i);if(o){e.class(o)}e.style("width",i.getWidth());i._getRowMode().applyTableStyles(e);if(i._bFirstRendering){e.class("sapUiTableNoOpacity")}e.openEnd();this.renderTabElement(e,"sapUiTableOuterBefore");e.openStart("div",i.getId()+"-before");e.openEnd();e.renderControl(i.getAggregation("_messageStrip"));if(i.getTitle()){this.renderHeader(e,i,i.getTitle())}if(i.getToolbar()){this.renderToolbar(e,i,i.getToolbar())}if(i.getExtension()&&i.getExtension().length>0){this.renderExtensions(e,i,i.getExtension())}e.close("div");e.openStart("div",i.getId()+"-sapUiTableCnt");e.class("sapUiTableCnt");e.attr("data-sap-ui-fastnavgroup","true");e.attr("data-sap-ui-pasteregion","true");i._getAccRenderExtension().writeAriaAttributesFor(e,i,"CONTAINER");e.openEnd();e.openStart("div",i.getId()+"-sapUiTableGridCnt");i._getAccRenderExtension().writeAriaAttributesFor(e,i,"CONTENT");e.openEnd();this.renderColRsz(e,i);this.renderColHdr(e,i);this.renderTable(e,i);e.close("div");var c=i.getCreationRow();if(c&&c.getVisible()){e.renderControl(c);this.renderHSbBackground(e,i);this.renderHSb(e,i)}i._getAccRenderExtension().writeHiddenAccTexts(e,i);e.openStart("div",i.getId()+"-overlay");e.class("sapUiTableOverlayArea");e.attr("tabindex","0");i._getAccRenderExtension().writeAriaAttributesFor(e,i,"OVERLAY");e.openEnd();e.close("div");e.close("div");e.openStart("div",i.getId()+"-after");e.openEnd();if(i.getFooter()){this.renderFooter(e,i,i.getFooter())}if(i.getVisibleRowCountMode()==d.Interactive){this.renderVariableHeight(e,i)}this.renderBottomPlaceholder(e,i);e.close("div");this.renderTabElement(e,"sapUiTableOuterAfter");e.close("div")};b.renderHeader=function(e,t,a){e.openStart("div");e.class("sapUiTableHdr");t._getAccRenderExtension().writeAriaAttributesFor(e,t,"TABLEHEADER");e.openEnd();e.renderControl(a);e.close("div")};b.renderToolbar=function(e,t,a){if(!r.isA(a,"sap.ui.core.Toolbar")){return}e.openStart("div");e.class("sapUiTableTbr");if(typeof a.getStandalone==="function"&&a.getStandalone()){a.setStandalone(false)}if(a.isA("sap.m.Toolbar")){a.setDesign("Transparent",true);a.addStyleClass("sapMTBHeader-CTX");e.class("sapUiTableMTbr")}t._getAccRenderExtension().writeAriaAttributesFor(e,t,"TABLESUBHEADER");e.openEnd();e.renderControl(a);e.close("div")};b.renderExtensions=function(e,t,a){for(var i=0,r=a.length;i<r;i++){this.renderExtension(e,t,a[i])}};b.renderExtension=function(e,t,a){e.openStart("div");e.class("sapUiTableExt");t._getAccRenderExtension().writeAriaAttributesFor(e,t,"TABLESUBHEADER");e.openEnd();e.renderControl(a);e.close("div")};b.renderTable=function(e,t){var a=t.getRows().length>0;this.renderTabElement(e,"sapUiTableCtrlBefore",a?"0":"-1");e.openStart("div",t.getId()+"-tableCCnt");t._getRowMode().applyRowContainerStyles(e);e.class("sapUiTableCCnt");e.openEnd();this.renderTableCCnt(e,t);e.close("div");this.renderTabElement(e,"sapUiTableCtrlAfter",a?"0":"-1");this.renderTabElement(e,null,"-1",t.getId()+"-focusDummy");var i=t.getCreationRow();if(!i||!i.getVisible()){this.renderHSbBackground(e,t);this.renderHSb(e,t)}};b.renderTableCCnt=function(t,a){this.renderTableCtrl(t,a);this.renderRowHdr(t,a);this.renderRowActions(t,a);if(!a._getScrollExtension().isVerticalScrollbarExternal()){this.renderVSb(t,a)}t.openStart("div",a.getId()+"-noDataCnt");t.class("sapUiTableCtrlEmpty");t.attr("tabindex","0");a._getAccRenderExtension().writeAriaAttributesFor(t,a,"NODATA");t.openEnd();var i=r.getNoContentMessage(a);if(i instanceof e){t.renderControl(i)}else{t.openStart("span",a.getId()+"-noDataMsg");t.class("sapUiTableCtrlEmptyMsg");t.openEnd();t.text(r.getNoDataText(a));t.close("span")}t.close("div")};b.renderFooter=function(e,t,a){e.openStart("div");e.class("sapUiTableFtr");t._getAccRenderExtension().writeAriaAttributesFor(e,t,"TABLEFOOTER");e.openEnd();e.renderControl(a);e.close("div")};b.renderVariableHeight=function(e,t){e.openStart("div",t.getId()+"-sb");e.attr("tabindex","-1");e.class("sapUiTableHeightResizer");e.style("height","5px");e.openEnd();e.close("div")};b.renderBottomPlaceholder=function(e,t){var a=t._getRowMode().getTableBottomPlaceholderStyles();if(a===undefined){return}e.openStart("div",t.getId()+"-placeholder-bottom");e.class("sapUiTablePlaceholder");t._getRowMode().applyTableBottomPlaceholderStyles(e);e.openEnd();e.close("div")};b.renderColHdr=function(e,t){var a=r.getHeaderRowCount(t);var i=t.getColumns();var n=t.getComputedFixedColumnCount();e.openStart("div");e.class("sapUiTableColHdrCnt");e.openEnd();this.renderColRowHdr(e,t);if(n>0){e.openStart("div");e.class("sapUiTableCHA");e.class("sapUiTableCtrlScrFixed");e.class("sapUiTableNoOpacity");e.openEnd();this.renderTableControlCnt(e,t,true,0,n,true,false,0,a,true);e.close("div")}e.openStart("div",t.getId()+"-sapUiTableColHdrScr");e.class("sapUiTableCHA");e.class("sapUiTableCtrlScr");if(i.length==0){e.class("sapUiTableHasNoColumns")}if(n>0){if(t._bRtlMode){e.style("margin-right","0")}else{e.style("margin-left","0")}}e.openEnd();this.renderTableControlCnt(e,t,false,n,i.length,false,false,0,a,true);e.close("div");e.openStart("div");e.class("sapUiTableVSbHeader");e.openEnd();e.close("div");if(r.hasRowActions(t)){e.openStart("div",t.getId()+"-rowacthdr");t._getAccRenderExtension().writeAriaAttributesFor(e,t,"ROWACTIONHEADER");e.class("sapUiTableCell");e.class("sapUiTableHeaderCell");e.class("sapUiTableRowActionHeaderCell");e.openEnd();e.openStart("span");e.openEnd();e.text(r.getResourceText("TBL_ROW_ACTION_COLUMN_LABEL"));e.close("span");e.close("div")}e.close("div")};b.renderColRowHdr=function(e,t){var i=false;var n=false;var s=t._getSelectionPlugin().getRenderConfig();e.openStart("div",t.getId()+"-selall");e.class("sapUiTableCell");e.class("sapUiTableHeaderCell");e.class("sapUiTableRowSelectionHeaderCell");var l;if(s.headerSelector.visible){var o=r.areAllRowsSelected(t);if(s.headerSelector.type==="toggle"){l=o?"TBL_DESELECT_ALL":"TBL_SELECT_ALL"}else if(s.headerSelector.type==="clear"){l="TBL_DESELECT_ALL";if(!s.headerSelector.enabled){e.class("sapUiTableSelAllDisabled");e.attr("aria-disabled","true")}}if(t._getShowStandardTooltips()&&l){e.attr("title",r.getResourceText(l))}if(!o){e.class("sapUiTableSelAll")}else{n=true}e.class("sapUiTableSelAllVisible");i=true}e.attr("tabindex","-1");var d={enabled:i,checked:n};t._getAccRenderExtension().writeAriaAttributesFor(e,t,"COLUMNROWHEADER",d);e.openEnd();if(s.headerSelector.visible){if(s.headerSelector.type==="clear"&&s.headerSelector.icon){e.renderControl(s.headerSelector.icon)}else{e.openStart("div");e.class("sapUiTableSelectAllCheckBox");e.openEnd();e.close("div")}}if(r.hasRowHeader(t)&&t._getSelectionPlugin()._getSelectionMode()===a.SelectionMode.None){e.openStart("span",t.getId()+"-rowselecthdr");e.class("sapUiPseudoInvisibleText");e.openEnd();e.text(r.getResourceText("TBL_ROW_SELECTION_COLUMN_LABEL"));e.close("span")}e.close("div")};b.renderCol=function(e,t,a,i,n,l,o,d,p){var b,T=!n,f=a.getIndex(),u=a.getMultiLabels();if(u.length>0){b=u[i]}else if(i==0){b=a.getLabel()}var C=a.getId();if(i===0){e.openStart("td",a)}else{C=C+"_"+i;e.openStart("td",C)}e.attr("data-sap-ui-related",a.getId());e.attr("data-sap-ui-colid",a.getId());e.attr("data-sap-ui-colindex",f);e.attr("tabindex","-1");var h={column:a,headerId:C,index:f};if(n>1){e.attr("colspan",n);h.colspan=true}if(p){var R=a.getFiltered();var v=a.getSorted();if(R){e.class("sapUiTableColFiltered")}if(v){e.class("sapUiTableColSorted");if(a.getSortOrder()===c.Descending){e.class("sapUiTableColSortedD")}}}t._getAccRenderExtension().writeAriaAttributesFor(e,t,"COLUMNHEADER",h);e.class("sapUiTableCell");e.class("sapUiTableHeaderCell");e.class("sapUiTableHeaderDataCell");if(t.getEnableColumnReordering()||t.hasListeners("columnSelect")||a._menuHasItems()){e.class("sapUiTableHeaderCellActive")}if(l){e.class("sapUiTableCellFirst")}if(o){e.class("sapUiTableCellLastFixed")}if(d){e.class("sapUiTableCellLast")}if(T){e.class("sapUiTableHidden")}if(t.getColumnHeaderHeight()>0){e.style("height",t.getColumnHeaderHeight()+"px")}var S=a.getTooltip_AsString();if(S){e.attr("title",S)}e.openEnd();e.openStart("div",C+"-inner");e.class("sapUiTableCellInner");if(!r.hasRowHeader(t)&&l&&!r.hasRowHighlights(t)&&!r.Grouping.isInTreeMode(t)){e.class("sapUiTableFirstColumnCell")}var E=a.getHAlign();var w=s.getTextAlign(E);if(w){e.style("text-align",w)}e.openEnd();e.openStart("div");e.style("justify-content",g[E]);e.openEnd();if(b){e.renderControl(b)}e.close("div");e.close("div");e.close("td")};b.renderColRsz=function(e,t){e.openStart("div",t.getId()+"-rsz");e.class("sapUiTableColRsz");e.openEnd();e.close("div")};b.renderRowHdr=function(e,t){e.openStart("div",t.getId()+"-sapUiTableRowHdrScr");t._getAccRenderExtension().writeAriaAttributesFor(e,t,"PRESENTATION");e.class("sapUiTableRowHdrScr");e.class("sapUiTableNoOpacity");t._getAccRenderExtension().writeAriaAttributesFor(e,t,"ROWHEADER_COL");e.openEnd();for(var a=0,i=t.getRows().length;a<i;a++){this.renderRowAddon(e,t,t.getRows()[a],a,true)}e.close("div")};b.renderRowActions=function(e,t){if(!r.hasRowActions(t)&&!r.hasRowNavigationIndicators(t)){return}e.openStart("div",t.getId()+"-sapUiTableRowActionScr");t._getAccRenderExtension().writeAriaAttributesFor(e,t,"PRESENTATION");r.hasRowActions(t)?e.class("sapUiTableRowWithAction"):e.class("sapUiTableRowActionScr");e.class("sapUiTableNoOpacity");e.openEnd();for(var a=0,i=t.getRows().length;a<i;a++){this.renderRowAddon(e,t,t.getRows()[a],a,false)}e.close("div")};b.addRowCSSClasses=function(e,t,a){var i=t._getRowCounts();var n=r.getFirstFixedBottomRowIndex(t);if(a===0){e.class("sapUiTableFirstRow")}else if(a===t.getRows().length-1){e.class("sapUiTableLastRow")}if(i.fixedTop>0){if(a==i.fixedTop-1){e.class("sapUiTableRowLastFixedTop")}if(a==i.fixedTop){e.class("sapUiTableRowFirstScrollable")}}if(n>=0&&n===a){e.class("sapUiTableRowFirstFixedBottom")}else if(n>=1&&n-1===a){e.class("sapUiTableRowLastScrollable")}};b.renderRowAddon=function(e,t,a,i,n){var s=t._getSelectionPlugin().isIndexSelected(a.getIndex());e.openStart("div");var l=a.getAggregation("_settings");var o={index:i,rowHidden:a.isEmpty(),rowNavigated:l?l.getNavigated():false};t._getAccRenderExtension().writeAriaAttributesFor(e,t,"TR",o);e.attr("data-sap-ui-related",a.getId());e.attr("data-sap-ui-rowindex",i);e.class("sapUiTableRow");e.class("sapUiTableContentRow");if(a.isContentHidden()){e.class("sapUiTableRowHidden")}else if(s){e.class("sapUiTableRowSel")}if(i%2!=0&&t.getAlternateRowColors()&&!r.Grouping.isInTreeMode(t)){e.class("sapUiTableRowAlternate")}this.addRowCSSClasses(e,t,i);e.openEnd();e.openStart("div",t.getId()+(n?"-rowsel":"-rowact")+i);e.class("sapUiTableCell");e.class("sapUiTableContentCell");e.class(n?"sapUiTableRowSelectionCell":"sapUiTableRowActionCell");t._getRowMode().renderRowStyles(e);e.attr("tabindex","-1");o={rowSelected:s,rowHidden:a.isEmpty()};t._getAccRenderExtension().writeAriaAttributesFor(e,t,n?"ROWHEADER":"ROWACTION",o);e.openEnd();if(n){this.writeRowHighlightContent(e,t,a,i);this.writeRowSelectorContent(e,t,a,i)}else{var d=a.getRowAction();if(d){e.renderControl(d)}this.writeRowNavigationContent(e,t,a,i)}e.close("div");e.close("div")};b.renderTableCtrl=function(e,t){if(t.getComputedFixedColumnCount()>0){e.openStart("div",t.getId()+"-sapUiTableCtrlScrFixed");e.class("sapUiTableCtrlScrFixed");e.openEnd();this.renderTableControl(e,t,true);e.close("div")}e.openStart("div",t.getId()+"-sapUiTableCtrlScr");e.class("sapUiTableCtrlScr");if(t.getComputedFixedColumnCount()>0){if(t._bRtlMode){e.style("margin-right","0")}else{e.style("margin-left","0")}}e.openEnd();e.openStart("div",t.getId()+"-tableCtrlCnt");e.class("sapUiTableCtrlCnt");e.openEnd();this.renderTableControl(e,t,false);e.close("div");e.close("div")};b.renderTableControl=function(e,t,a){var i,r;if(a){i=0;r=t.getComputedFixedColumnCount()}else{i=t.getComputedFixedColumnCount();r=t.getColumns().length}var n=t._getRowCounts();var s=t.getRows();if(n.fixedTop>0){this.renderTableControlCnt(e,t,a,i,r,true,false,0,n.fixedTop)}this.renderTableControlCnt(e,t,a,i,r,false,false,n.fixedTop,s.length-n.fixedBottom);if(n.fixedBottom>0&&s.length>0){this.renderTableControlCnt(e,t,a,i,r,false,true,s.length-n.fixedBottom,s.length)}};b.renderTableControlCnt=function(e,t,a,i,n,s,l,o,d,c){var p=c?"-header":"-table";var g=t.getId()+p;var b=[];if(a){g+="-fixed";b.push("sapUiTableCtrlFixed")}else{b.push("sapUiTableCtrlScroll")}if(s){g+="-fixrow";b.push("sapUiTableCtrlRowFixed")}else if(l){g+="-fixrow-bottom";b.push("sapUiTableCtrlRowFixedBottom")}else{b.push("sapUiTableCtrlRowScroll")}e.openStart("table",g);b.forEach(function(t){e.class(t)});t._getAccRenderExtension().writeAriaAttributesFor(e,t,c?"COLUMNHEADER_TABLE":"TABLE");e.class("sapUiTableCtrl");if(c){e.class("sapUiTableCHT")}e.style(a?"width":"min-width",t._getColumnsWidth(i,n)+"px");e.openEnd();e.openStart("thead").openEnd();e.openStart("tr");e.class("sapUiTableCtrlCol");if(o==0){e.class("sapUiTableCtrlFirstCol")}if(c){e.class("sapUiTableCHTHR")}e.openEnd();var T=t.getColumns();var f=new Array(n);var u;var C;var h=!a&&n>i;for(u=i;u<n;u++){C=T[u];var R={shouldRender:!!(C&&C.shouldRender())};if(R.shouldRender){var v=C.getWidth();if(r.isVariableWidth(v)){h=false;if(a){C._iFixWidth=C._iFixWidth||160;v=C._iFixWidth+"px"}}else if(a){delete C._iFixWidth}R.width=v}f[u]=R}if(T.length===0){e.openStart("th").openEnd().close("th")}for(u=i;u<n;u++){p=c?"_hdr":"_col";C=T[u];R=f[u];if(R.shouldRender){if(o==0){e.openStart("th",t.getId()+p+u);t._getAccRenderExtension().writeAriaAttributesFor(e,t,"TH",{column:C})}else{e.openStart("th")}e.style("width",R.width);e.attr("data-sap-ui-headcolindex",u);e.attr("data-sap-ui-colid",C.getId());e.openEnd();if(o==0&&r.getHeaderRowCount(t)==0&&!c){if(C.getMultiLabels().length>0){e.renderControl(C.getMultiLabels()[0])}else{e.renderControl(C.getLabel())}}e.close("th")}}if(h){e.openStart("th",c&&t.getId()+"-dummycolhdr");t._getAccRenderExtension().writeAriaAttributesFor(e,t,"PRESENTATION");e.openEnd().close("th")}e.close("tr");e.close("thead");e.openStart("tbody").openEnd();var S=t._getVisibleColumns();var E=t.getRows();var w;var A;if(c){for(w=o,A=d;w<A;w++){this.renderColumnHeaderRow(e,t,w,a,i,n,h,w===A-1)}}else{var x=t._getAccExtension().getAriaTextsForSelectionMode(true);var U=r.isRowSelectionAllowed(t);var _=t.getDragDropConfig().some(function(e){return e.getMetadata().isInstanceOf("sap.ui.core.dnd.IDragInfo")&&e.getSourceAggregation()==="rows"});var H=this.getLastFixedColumnIndex(t);for(w=o,A=d;w<A;w++){this.renderTableRow(e,t,E[w],w,a,i,n,false,S,H,h,x,U,_)}}e.close("tbody");e.close("table")};b.writeRowSelectorContent=function(e,t,a,i){t._getAccRenderExtension().writeAccRowSelectorText(e,t,a,i);if(r.Grouping.isInGroupMode(t)){e.openStart("div");e.class("sapUiTableGroupShield");e.openEnd();e.close("div");e.openStart("div",a.getId()+"-groupHeader");e.class("sapUiTableGroupIcon");e.openEnd();e.close("div");if(r.Grouping.showGroupMenuButton(t)){var n=l.getIconInfo("sap-icon://drop-down-list");e.openStart("div").class("sapUiTableGroupMenuButton").openEnd();e.text(n.content);e.close("div")}}};b.writeRowHighlightContent=function(e,t,a,i){if(!r.hasRowHighlights(t)){return}var n=a.getAggregation("_settings");var s=n._getHighlightCSSClassName();e.openStart("div",a.getId()+"-highlight");e.class("sapUiTableRowHighlight");e.class(s);e.openEnd();t._getAccRenderExtension().writeAccRowHighlightText(e,t,a,i);e.close("div")};b.writeRowNavigationContent=function(e,t,a,i){if(!r.hasRowNavigationIndicators(t)){return}var n=a.getAggregation("_settings");e.openStart("div",a.getId()+"-navIndicator");if(n.getNavigated()){e.class("sapUiTableRowNavigated")}e.openEnd();e.close("div")};b.renderColumnHeaderRow=function(e,t,a,i,r,n,s,l){e.openStart("tr");e.class("sapUiTableRow");e.class("sapUiTableHeaderRow");e.class("sapUiTableColHdrTr");t._getAccRenderExtension().writeAriaAttributesFor(e,t,"COLUMNHEADER_ROW");e.openEnd();var o=this.getColumnsToRender(t,r,n),d=0,c=-1;function g(e,t,i){var r=p.getHeaderSpan(e,a),n;if(d<1){if(r>1){n=e.getIndex();r=i.slice(t+1,t+r).reduce(function(e,t){return t.getIndex()-n<r?e+1:e},1)}e._nSpan=d=r;c=t}else{e._nSpan=0}d--}o.forEach(g);function b(r,n){this.renderCol(e,t,r,a,r._nSpan,n===0,i&&n==c,!i&&n==c,r._nSpan===1&&!r._bIconsRendered);r._bIconsRendered=r._bIconsRendered||r._nSpan===1;delete r._nSpan;if(l){delete r._bIconsRendered}}o.forEach(b.bind(this));if(!i&&s&&o.length>0){e.openStart("td").class("sapUiTableCellDummy");t._getAccRenderExtension().writeAriaAttributesFor(e,t,"PRESENTATION");e.openEnd().close("td")}e.close("tr")};b.renderTableRow=function(e,t,a,i,n,s,l,o,d,c,p,g,b,T){if(!a){return}var f=t._getSelectionPlugin();if(n){e.openStart("tr",a.getId()+"-fixed");e.attr("data-sap-ui-related",a.getId())}else{e.openStart("tr",a)}if(a._bDummyRow){e.style("opacity","0")}e.class("sapUiTableRow");e.class("sapUiTableContentRow");e.class("sapUiTableTr");if(a.isContentHidden()){e.class("sapUiTableRowHidden")}else{if(T&&n){e.attr("draggable",true)}if(f.isIndexSelected(a.getIndex())){e.class("sapUiTableRowSel")}}if(i%2!=0&&t.getAlternateRowColors()&&!r.Grouping.isInTreeMode(t)){e.class("sapUiTableRowAlternate")}this.addRowCSSClasses(e,t,i);e.attr("data-sap-ui-rowindex",i);t._getRowMode().renderRowStyles(e);var u=a.getAggregation("_settings");var C={index:i,rowHidden:a.isEmpty(),rowNavigated:u?u.getNavigated():false};t._getAccRenderExtension().writeAriaAttributesFor(e,t,"TR",C);e.openEnd();var h=!a.isEmpty()&&f.isIndexSelected(a.getIndex());var R=a.getCells();for(var v=0,S=R.length;v<S;v++){this.renderTableCell(e,t,a,R[v],v,n,s,l,d,c,h)}if(!n&&p&&R.length>0){e.openStart("td").class("sapUiTableCellDummy");t._getAccRenderExtension().writeAriaAttributesFor(e,t,"PRESENTATION");e.openEnd();e.close("td")}e.close("tr")};b.renderTableCell=function(e,t,a,n,l,o,d,c,p,g,b){var T=i.ofCell(n);var f=T.getIndex();if(T.shouldRender()&&d<=f&&c>f){var u=a.getId()+"-col"+l;e.openStart("td",u);e.attr("tabindex","-1");e.attr("data-sap-ui-colid",T.getId());var C=p.length;var h=C>0&&p[0]===T;var R=C>0&&p[C-1]===T;var v=o&&g===f;var S={index:f,column:T,row:a,fixed:o,rowSelected:b};t._getAccRenderExtension().writeAriaAttributesFor(e,t,"DATACELL",S);var E=s.getTextAlign(T.getHAlign());if(E){e.style("text-align",E)}e.class("sapUiTableCell");e.class("sapUiTableContentCell");e.class("sapUiTableDataCell");if(h){e.class("sapUiTableCellFirst")}if(v){e.class("sapUiTableCellLastFixed")}if(R){e.class("sapUiTableCellLast")}if(h&&r.Grouping.isInTreeMode(t)){e.class("sapUiTableCellFlex")}e.openEnd();e.openStart("div");e.class("sapUiTableCellInner");if(!r.hasRowHeader(t)&&h&&!r.hasRowHighlights(t)&&!r.Grouping.isInTreeMode(t)){e.class("sapUiTableFirstColumnCell")}t._getRowMode().renderCellContentStyles(e);e.openEnd();this.renderTableCellControl(e,t,n,h);e.close("div");e.close("td")}};b.renderTableCellControl=function(e,t,a,i){if(i&&r.Grouping.isInTreeMode(t)){var n=a.getParent();e.openStart("span",n.getId()+"-treeicon");e.class("sapUiTableTreeIcon");e.attr("tabindex","-1");t._getAccRenderExtension().writeAriaAttributesFor(e,t,"TREEICON",{row:n});e.openEnd();e.close("span")}e.renderControl(a)};b.renderVSb=function(e,t,a){var i=t._getScrollExtension();var r=t._getRowCounts();a=Object.assign({tabIndex:true},a);e.openStart("div");e.class("sapUiTableVSbContainer");if(!i.isVerticalScrollbarRequired()){e.class("sapUiTableHidden")}e.class(a.cssClass);e.openEnd();e.openStart("div",t.getId()+"-vsb");e.class("sapUiTableVSb");e.style("max-height",i.getVerticalScrollbarHeight()+"px");if(r.fixedTop>0){e.style("top",r.fixedTop*t._getBaseRowHeight()-1+"px")}if(a.tabIndex){e.attr("tabindex","-1")}e.openEnd();e.openStart("div");e.class("sapUiTableVSbContent");e.style("height",i.getVerticalScrollHeight()+"px");e.openEnd();e.close("div");e.close("div");e.close("div")};b.renderVSbExternal=function(e,t){if(n.isEnrichedWith(t,"sap.ui.table.extensions.Synchronization")){this.renderVSb(e,t,{cssClass:"sapUiTableVSbExternal",tabIndex:false})}else{o.error("This method can only be used with synchronization enabled.",t,"TableRenderer.renderVSbExternal")}};b.renderHSb=function(e,t,a){a=Object.assign({id:t.getId()+"-hsb",cssClass:"sapUiTableHSb",tabIndex:true,hidden:true,scrollWidth:0},a);e.openStart("div",a.id);e.class(a.cssClass);if(a.hidden){e.class("sapUiTableHidden")}if(a.tabIndex){e.attr("tabindex","-1")}e.openEnd();e.openStart("div",a.id+"-content");e.class("sapUiTableHSbContent");if(a.scrollWidth>0){e.style("width",a.scrollWidth+"px")}e.openEnd();e.close("div");e.close("div")};b.renderHSbExternal=function(e,t,a,i){if(n.isEnrichedWith(t,"sap.ui.table.extensions.Synchronization")){this.renderHSb(e,t,{id:a,cssClass:"sapUiTableHSbExternal",tabIndex:false,hidden:false,scrollWidth:i})}else{o.error("This method can only be used with synchronization enabled.",t,"TableRenderer.renderVSbExternal")}};b.renderHSbBackground=function(e,t){e.openStart("div",t.getId()+"-hsb-bg");e.class("sapUiTableHSbBg");e.openEnd().close("div")};b.renderTabElement=function(e,t,a,i){e.openStart("div");if(t){e.class(t)}if(i){e.attr("id",i)}e.attr("tabindex",a==null?"0":a);e.openEnd().close("div")};b.getColumnsToRender=function(e,t,a){return e.getColumns().slice(t,a).filter(function(e){return e&&e.shouldRender()})};b.getLastFixedColumnIndex=function(e){var t=e.getComputedFixedColumnCount();var a=e.getColumns();var i,r;for(var n=t-1;n>=0;n--){i=a[n];if(i.shouldRender()){r=n;break}}return r};return b},true);
//# sourceMappingURL=TableRenderer.js.map