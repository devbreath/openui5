/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","./library","./ListBase","./ListItemBase","./CheckBox","./TableRenderer","sap/ui/base/Object","sap/ui/core/ResizeHandler","sap/ui/core/util/PasteHelper","sap/ui/thirdparty/jquery","sap/m/ListBaseRenderer","sap/ui/core/Icon","sap/m/table/Util","sap/ui/dom/jquery/Selectors"],function(t,e,i,s,o,n,r,a,l,jQuery,h,u,p){"use strict";var d=e.ListKeyboardMode;var c=e.ListGrowingDirection;var f=e.BackgroundDesign;var g=e.PopinLayout;var C=e.ScreenSizes;var y=i.extend("sap.m.Table",{metadata:{library:"sap.m",properties:{backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:f.Translucent},fixedLayout:{type:"any",group:"Behavior",defaultValue:true},showOverlay:{type:"boolean",group:"Appearance",defaultValue:false},alternateRowColors:{type:"boolean",group:"Appearance",defaultValue:false},popinLayout:{type:"sap.m.PopinLayout",group:"Appearance",defaultValue:g.Block},contextualWidth:{type:"string",group:"Behavior",defaultValue:"Inherit"},autoPopinMode:{type:"boolean",group:"Behavior",defaultValue:false},hiddenInPopin:{type:"sap.ui.core.Priority[]",group:"Behavior"}},aggregations:{columns:{type:"sap.m.Column",multiple:true,singularName:"column",dnd:{draggable:true,droppable:true,layout:"Horizontal"}},_noColumnsMessage:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},events:{beforeOpenContextMenu:{allowPreventDefault:true,parameters:{listItem:{type:"sap.m.ColumnListItem"},column:{type:"sap.m.Column"}}},paste:{allowPreventDefault:true,parameters:{data:{type:"string[][]"}}},popinChanged:{parameters:{hasPopin:{type:"boolean"},visibleInPopin:{type:"sap.m.Column[]"},hiddenInPopin:{type:"sap.m.Column[]"}}}},designtime:"sap/m/designtime/Table.designtime"}});y.prototype.sNavItemClass="sapMListTblRow";y.prototype.init=function(){this._iItemNeedsColumn=0;i.prototype.init.call(this)};y.prototype.setContextualWidth=function(t){var e=this.getContextualWidth();if(t==e){return this}if(typeof t==="number"){this._sContextualWidth=t+"px";this._sContextualWidth=this._sContextualWidth.toLowerCase()}else{var i=t.toLowerCase(),s=C[i];if(s){this._sContextualWidth=s+"px"}else{this._sContextualWidth=t}}var o=this._validateContextualWidth(this._sContextualWidth);this._iLastContextualWidth=e;if(o){this.setProperty("contextualWidth",t,true)}else{return this}if(this._iLastContextualWidth.toLowerCase()==="auto"){this._deregisterResizeHandler()}if(this._sContextualWidth.toLowerCase()==="auto"){this._registerResizeHandler();this._applyContextualWidth(this.$().width())}else{this._applyContextualWidth(this._sContextualWidth)}return this};y.prototype._validateContextualWidth=function(t){if(!t){return}if(typeof t!="string"){throw new Error('expected string for property "contextualWidth" of '+this)}if(t.toLowerCase()==="auto"||t.toLowerCase()==="inherit"){return true}if(!/^\d+(\.\d+)?(px)$/i.test(t)){throw new Error('invalid CSS size("px", "Auto", "auto", Inherit", "inherit" required) or sap.m.ScreenSize enumeration for property "contextualWidth" of '+this)}return true};y.prototype._applyContextualWidth=function(t){t=parseFloat(t)||0;if(Math.abs(this._oContextualSettings.contextualWidth-t)<=16){return}if(t&&this._oContextualSettings.contextualWidth!=t){this._applyContextualSettings({contextualWidth:t})}};y.prototype.setNoData=function(t){i.prototype.setNoData.apply(this,arguments);if(t&&typeof t!=="string"&&t.isA("sap.m.IllustratedMessage")){var e=this.getAggregation("_noColumnsMessage");if(!e){e=p.getNoColumnsIllustratedMessage();this.setAggregation("_noColumnsMessage",e)}}return this};y.prototype._onResize=function(t){this._applyContextualWidth(t.size.width)};y.prototype._registerResizeHandler=function(){if(!this._iResizeHandlerId){var t=this;window.requestAnimationFrame(function(){t._iResizeHandlerId=a.register(t,t._onResize.bind(t))})}};y.prototype._deregisterResizeHandler=function(){if(this._iResizeHandlerId){a.deregister(this._iResizeHandlerId);this._iResizeHandlerId=null}};y.prototype.onBeforeRendering=function(){i.prototype.onBeforeRendering.call(this);this._bHasDynamicWidthCol=this._hasDynamicWidthColumn();if(this.getAutoPopinMode()){this._configureAutoPopin()}this._applyContextualWidth(this._sContextualWidth);this._ensureColumnsMedia();this._notifyColumns("ItemsRemoved")};y.prototype._hasDynamicWidthColumn=function(t,e){if(this.getFixedLayout()!="Strict"){return true}return this.getColumns().some(function(i){if(i.getVisible()&&!i.isPopin()){var s=t&&t==i?e:i.getWidth();return!s||s=="auto"}})};y.prototype._ensureColumnsMedia=function(){this.getColumns().forEach(function(t){if(t._bShouldAddMedia){t._addMedia()}})};y.prototype.onAfterRendering=function(){i.prototype.onAfterRendering.call(this);this.updateSelectAllCheckbox();this._renderOverlay();if(this._bFirePopinChanged){this._firePopinChangedEvent();this._bFirePopinChanged=false}else{var e=this._getPopins();if(this._aPopins&&this.getVisibleItems().length){if(this._aPopins.length!=e.length||!e.every(function(t){return this._aPopins.indexOf(t)>-1},this)){this._aPopins=e;this._firePopinChangedEvent()}}else if(this._aPopins==null){this._aPopins=e}}if(this._bCheckLastColumnWidth&&t.isThemeApplied()){window.requestAnimationFrame(this._checkLastColumnWidth.bind(this))}};y.prototype.setHiddenInPopin=function(t){var e=this.getHiddenInPopin()||[],i=t||[];this.setProperty("hiddenInPopin",t);if(i.length!==e.length){this._bFirePopinChanged=true}else{this._bFirePopinChanged=!i.every(function(t){return e.includes(t)})}this._aPopins=this._getPopins();return this};y.prototype._renderOverlay=function(){var t=this.$(),e=t.find(".sapMTableOverlay"),i=this.getShowOverlay();if(i&&e.length===0){e=jQuery("<div>").addClass("sapUiOverlay sapMTableOverlay").css("z-index","1");t.append(e)}else if(!i){e.remove()}};y.prototype._checkLastColumnWidth=function(){var t=this.$();var e=this.getTableDomRef();if(!t.length||!e){return}if(t[0].clientWidth<e.clientWidth){t.find(".sapMListTblCell:visible").eq(0).addClass("sapMTableLastColumn").width("")}this._bCheckLastColumnWidth=false};y.prototype.setShowOverlay=function(t){this.setProperty("showOverlay",t,true);this._renderOverlay();return this};y.prototype.exit=function(){i.prototype.exit.call(this);if(this._selectAllCheckBox){this._selectAllCheckBox.destroy();this._selectAllCheckBox=null}if(this._clearAllButton){this._clearAllButton.destroy();this._clearAllButton=null}if(this._aPopinHeaders){this._aPopinHeaders.forEach(function(t){t.destroy()});this._aPopinHeaders=null}};y.prototype.destroyItems=function(){this._notifyColumns("ItemsRemoved");return i.prototype.destroyItems.apply(this,arguments)};y.prototype.removeAllItems=function(){this._notifyColumns("ItemsRemoved");return i.prototype.removeAllItems.apply(this,arguments)};y.prototype.removeSelections=function(){i.prototype.removeSelections.apply(this,arguments);this.updateSelectAllCheckbox();return this};y.prototype.selectAll=function(){i.prototype.selectAll.apply(this,arguments);this.updateSelectAllCheckbox();return this};y.prototype.getColumns=function(t){var e=this.getAggregation("columns",[]);if(t){e.sort(function(t,e){return t.getOrder()-e.getOrder()})}return e};y.prototype.setFixedLayout=function(t){if(t==undefined||t=="true"){t=true}else if(t=="false"){t=false}if(typeof t=="boolean"||t=="Strict"){return this.setProperty("fixedLayout",t)}throw new Error('"'+t+'" is an invalid value, expected false, true or "Strict" for the property fixedLayout of '+this)};y.prototype.onBeforePageLoaded=function(){if(this.getAlternateRowColors()){this._sAlternateRowColorsClass=this._getAlternateRowColorsClass()}i.prototype.onBeforePageLoaded.apply(this,arguments)};y.prototype.onAfterPageLoaded=function(){this.updateSelectAllCheckbox();if(this.getAlternateRowColors()&&this._sAlternateRowColorsClass!=this._getAlternateRowColorsClass()){var t=this.$("tblBody").removeClass(this._sAlternateRowColorsClass);t.addClass(this._getAlternateRowColorsClass())}i.prototype.onAfterPageLoaded.apply(this,arguments)};y.prototype.shouldRenderItems=function(){return this.getColumns().some(function(t){return t.getVisible()})};y.prototype.shouldGrowingSuppressInvalidation=function(){if(this.getAutoPopinMode()){return false}return i.prototype.shouldGrowingSuppressInvalidation.call(this)};y.prototype.onItemTypeColumnChange=function(t,e){this._iItemNeedsColumn+=e?1:-1;if(this._iItemNeedsColumn==1&&e){this._setTypeColumnVisibility(true)}else if(this._iItemNeedsColumn==0){this._setTypeColumnVisibility(false)}};y.prototype.onItemSelectedChange=function(t,e){i.prototype.onItemSelectedChange.apply(this,arguments);setTimeout(function(){this.updateSelectAllCheckbox()}.bind(this),0)};y.prototype.getTableDomRef=function(){return this.getDomRef("listUl")};y.prototype.getItemsContainerDomRef=function(){return this.getDomRef("tblBody")};y.prototype.setNavigationItems=function(t){var e=this.$("tblHeader");var i=this.$("tblFooter");var s=this.$("tblBody").children(".sapMLIB");var o=e.add(s).add(i).get();t.setItemDomRefs(o);if(t.getFocusedIndex()==-1){if(this.getGrowing()&&this.getGrowingDirection()==c.Upwards){t.setFocusedIndex(o.length-1)}else{t.setFocusedIndex(e[0]?1:0)}}};y.prototype.checkGrowingFromScratch=function(){if(this.hasPopin()){return false}return this.getColumns().some(function(t){return t.getVisible()&&t.getMergeDuplicates()})};y.prototype.onColumnPress=function(t){var e=t.getColumnHeaderMenu();e&&e.openBy(t);(this.bActiveHeaders||e)&&this.fireEvent("columnPress",{column:t})};y.prototype.onColumnResize=function(t){if(!this.hasPopin()&&!this._mutex){var e=this.getColumns().some(function(t){return t.isPopin()});if(!e){t.setDisplay(this.getTableDomRef(),!t.isHidden());this._firePopinChangedEvent();this._oGrowingDelegate&&this._oGrowingDelegate.adaptTriggerButtonWidth(this);return}}this._dirty=this._getMediaContainerWidth()||window.innerWidth;if(!this._mutex){var i=this._getMediaContainerWidth()||window.innerWidth;this._mutex=true;this._bFirePopinChanged=true;this.rerender();setTimeout(function(){if(this._dirty!=i){this._dirty=0;this._bFirePopinChanged=true;this.rerender()}this._mutex=false}.bind(this),200)}};y.prototype.setTableHeaderVisibility=function(t){if(!this.getDomRef()){return}if(!this.shouldRenderItems()){return this.invalidate()}var e=this.$("tblHeader"),i=!e.hasClass("sapMListTblHeaderNone"),s=e.find(".sapMListTblCell:visible"),o=s.eq(0);if(s.length==1){if(this.getFixedLayout()=="Strict"){this._checkLastColumnWidth()}else{o.width("")}}else{o.removeClass("sapMTableLastColumn");s.each(function(){this.style.width=this.getAttribute("data-sap-width")||""})}this._colCount=s.length+3+!!h.ModeOrder[this.getMode()];this.$("tblBody").find(".sapMGHLICell").attr("colspan",this.getColSpan());this.$("nodata-text").attr("colspan",this.getColCount());if(this.hasPopin()){this.$("tblBody").find(".sapMListTblSubRowCell").attr("colspan",this.getColSpan())}if(!t&&i){e[0].className="sapMListTblRow sapMLIBFocusable sapMListTblHeader";this._headerHidden=false}else if(t&&!i&&!s.length){e[0].className="sapMListTblHeaderNone";this._headerHidden=true}};y.prototype._setTypeColumnVisibility=function(t){jQuery(this.getTableDomRef()).toggleClass("sapMListTblHasNav",t)};y.prototype._notifyColumns=function(t,e,i){this.getColumns().forEach(function(s){s["on"+t](e,i)})};y.prototype._getClearAllButton=function(){if(!this._clearAllButton){this._clearAllButton=new u({id:this.getId()+"-clearSelection",src:"sap-icon://clear-all",tooltip:t.getLibraryResourceBundle("sap.m").getText("TABLE_CLEARBUTTON_TOOLTIP"),decorative:false,press:this.removeSelections.bind(this,false,true,false)}).setParent(this,null,true).addEventDelegate({onAfterRendering:function(){this._clearAllButton.getDomRef().setAttribute("tabindex",-1)}},this)}return this._clearAllButton};y.prototype._getSelectAllCheckbox=function(){if(this.bPreventMassSelection){return}if(!this._selectAllCheckBox){this._selectAllCheckBox=new o({id:this.getId("sa"),activeHandling:false}).addStyleClass("sapMLIBSelectM").setParent(this,null,true).attachSelect(function(){if(this._selectAllCheckBox.getSelected()){this.selectAll(true)}else{this.removeSelections(false,true)}},this).setTabIndex(-1)}this._selectAllCheckBox.useEnabledPropagator(false);return this._selectAllCheckBox};y.prototype.updateSelectAllCheckbox=function(){if(this.getMode()!=="MultiSelect"){return}if(this._selectAllCheckBox&&this.getMultiSelectMode()=="Default"){var t=this.getItems(),e=this.getSelectedItems().length,i=t.filter(function(t){return t.isSelectable()}).length;this._selectAllCheckBox.setSelected(t.length>0&&e==i)}else if(this._clearAllButton){this._clearAllButton.toggleStyleClass("sapMTableDisableClearAll",!this.getSelectedItems().length)}};y.prototype.enhanceAccessibilityState=function(e,i){if(e==this._clearAllButton){i.label=t.getLibraryResourceBundle("sap.m").getText("TABLE_ICON_DESELECT_ALL")}else if(e==this._selectAllCheckBox){i.label=t.getLibraryResourceBundle("sap.m").getText("TABLE_CHECKBOX_SELECT_ALL")}};y.prototype.getColSpan=function(){var t=this.shouldRenderDummyColumn()?3:2;return(this._colCount||1)-t};y.prototype.getColCount=function(){return this._colCount||0};y.prototype.shouldRenderDummyColumn=function(){return!this._bHasDynamicWidthCol&&this.shouldRenderItems()};y.prototype.hasPopin=function(){return!!this._hasPopin};y.prototype.isHeaderRowEvent=function(t){var e=this.$("tblHeader");return!!jQuery(t.target).closest(e,this.getTableDomRef()).length};y.prototype.isFooterRowEvent=function(t){var e=this.$("tblFooter");return!!jQuery(t.target).closest(e,this.getTableDomRef()).length};y.prototype.getAccessibilityType=function(){return t.getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_TABLE")};y.prototype._setHeaderAnnouncement=function(){var e=t.getLibraryResourceBundle("sap.m"),i=e.getText("ACC_CTR_TYPE_HEADER_ROW")+" ";if(this.isAllSelectableSelected()){i+=e.getText("LIST_ALL_SELECTED")}var o=this._getHiddenInPopin();this.getColumns(true).forEach(function(t,e){if(!t.getVisible()||o.indexOf(t)>-1){return}var n=t.getHeader();if(n&&n.getVisible()){i+=s.getAccessibilityText(n)+" . "}});this.updateInvisibleText(i)};y.prototype._setFooterAnnouncement=function(){var e=t.getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_FOOTER_ROW")+" ";this.getColumns(true).forEach(function(t,i){if(!t.getVisible()){return}var o=t.getFooter();if(o&&o.getVisible()){var n=t.getHeader();if(n&&n.getVisible()){e+=s.getAccessibilityText(n)+" "}e+=s.getAccessibilityText(o)+" "}});this.updateInvisibleText(e)};y.prototype._setNoColumnsMessageAnnouncement=function(t){if(!this.shouldRenderItems()){var e=this.getNoData();if(e&&typeof e!=="string"&&e.isA("sap.m.IllustratedMessage")){var i=s.getAccessibilityText(this.getAggregation("_noColumnsMessage"));this.updateInvisibleText(i,t)}}};y.prototype.onsapspace=function(t){if(t.isMarked()){return}if(t.target.id==this.getId("tblHeader")){t.preventDefault();var e=this.getMultiSelectMode();if(this._selectAllCheckBox&&e=="Default"){this._selectAllCheckBox.setSelected(!this._selectAllCheckBox.getSelected()).fireSelect();t.setMarked()}else if(this._clearAllButton&&e=="ClearAll"&&!this._clearAllButton.hasStyleClass("sapMTableDisableClearAll")){this._clearAllButton.firePress();t.setMarked()}}};y.prototype.onsaptabnext=function(t){if(t.isMarked()||this.getKeyboardMode()==d.Edit){return}var e=jQuery();if(t.target.id==this.getId("nodata")){e=this.$("nodata")}else if(this.isHeaderRowEvent(t)){e=this.$("tblHeader")}else if(this.isFooterRowEvent(t)){e=this.$("tblFooter")}var i=e.find(":sapTabbable").get(-1)||e[0];if(t.target===i){this.forwardTab(true);t.setMarked()}};y.prototype.onsaptabprevious=function(t){if(t.isMarked()||this.getKeyboardMode()==d.Edit){return}var e=t.target.id;if(e==this.getId("nodata")||e==this.getId("tblHeader")||e==this.getId("tblFooter")){this.forwardTab(false)}else if(e==this.getId("trigger")){this.focusPrevious();t.preventDefault()}};y.prototype.focus=function(t){this._oFocusInfo=t;i.prototype.focus.apply(this,arguments);delete this._oFocusInfo};y.prototype.getFocusDomRef=function(){var t=this._oFocusInfo&&this._oFocusInfo.targetInfo&&r.isA(this._oFocusInfo.targetInfo,"sap.ui.core.message.Message");if(t){var e=this.$("tblHeader");var s=e.find(".sapMListTblCell:visible");if(s.length){return e[0]}var o=this.$("nodata");if(o.length){return o[0]}}return i.prototype.getFocusDomRef.apply(this,arguments)};y.prototype.onfocusin=function(t){var e=t.target;if(e.id==this.getId("tblHeader")){if(!this.hasPopin()&&this.shouldRenderDummyColumn()){e.classList.add("sapMTableRowCustomFocus")}this._setHeaderAnnouncement();this._setFirstLastVisibleCells(e)}else if(e.id==this.getId("tblFooter")){this._setFooterAnnouncement();this._setFirstLastVisibleCells(e)}else if(e.id==this.getId("nodata")){this._setFirstLastVisibleCells(e)}i.prototype.onfocusin.call(this,t);this._setNoColumnsMessageAnnouncement(e)};y.prototype.onThemeChanged=function(){i.prototype.onThemeChanged.call(this);if(this._bCheckLastColumnWidth){this._checkLastColumnWidth()}};y.prototype._getAlternateRowColorsClass=function(){if(this.isGrouped()){return"sapMListTblAlternateRowColorsGrouped"}if(this.hasPopin()){return"sapMListTblAlternateRowColorsPopin"}return"sapMListTblAlternateRowColors"};y.prototype.onpaste=function(t){if(t.isMarked()||/^(input|textarea)$/i.test(t.target.tagName)){return}var e=l.getPastedDataAs2DArray(t.originalEvent);if(!e||e.length===0||e[0].length===0){return}this.firePaste({data:e})};y.prototype.ondragenter=function(t){var e=t.dragSession;if(!e||!e.getDropControl()||!e.getDropControl().isA("sap.m.Column")){return}e.setIndicatorConfig({height:this.getTableDomRef().clientHeight})};y.prototype._configureAutoPopin=function(){if(this._mutex){return}var t=this.getColumns(true).filter(function(t){return t.getVisible()});if(!t.length){return}var e=this.getItems();var i={High:[],Medium:[],Low:[]};t.forEach(function(t){var e=t.getImportance();if(e==="None"){e="Medium"}i[e].push(t)});var s=Object.values(i);var o=s.find(String)[0];s.reduce(function(t,e){return y._updateAccumulatedWidth(e,o,t)},this._getInitialAccumulatedWidth(e))};y.prototype._getInitialAccumulatedWidth=function(t){var i=this.getInset()?4:0;var s=this.$(),o=3;if(s.closest(".sapUiSizeCompact").length||jQuery(document.body).hasClass("sapUiSizeCompact")){o=2}else{var n=false;s.find(".sapMTableTH[aria-hidden=true]:not(.sapMListTblHighlightCol):not(.sapMListTblDummyCell):not(.sapMListTblNavigatedCol)").get().forEach(function(t){var i=jQuery(t).width();if(!n&&i>0){o=i/parseFloat(e.BaseFontSize);n=true}})}var r=h.ModeOrder[this.getMode()]?o:0;var a=t.some(function(t){var e=t.getType();return e==="Detail"||e==="DetailAndActive"||e==="Navigation"})?o:0;return i+r+a+.65};y._updateAccumulatedWidth=function(t,i,s){t.forEach(function(t){var o=t.getWidth();var n=o.replace(/[^a-z]/gi,"");var r=parseFloat(e.BaseFontSize)||16;if(n==="px"){s+=parseFloat((parseFloat(o).toFixed(2)/r).toFixed(2))}else if(n==="em"||n==="rem"){s+=parseFloat(o)}else{s+=t.getAutoPopinWidth()}t.setDemandPopin(t!==i);t.setMinScreenWidth(t!==i?s+"rem":"")});return s};y.prototype._getHiddenInPopin=function(){return this._getPopins().filter(function(t){return!t.isPopin()})};y.prototype._getVisiblePopin=function(){return this._getPopins().filter(function(t){return t.isPopin()})};y.prototype._getPopins=function(){var t=this.getColumns().filter(function(t){return t.getVisible()&&t.getDemandPopin()});return t.filter(function(t){return t._media&&!t._media.matches})};y.prototype._firePopinChangedEvent=function(){this.fireEvent("popinChanged",{hasPopin:this.hasPopin(),visibleInPopin:this._getVisiblePopin(),hiddenInPopin:this._getHiddenInPopin()})};y.prototype._fireUpdateFinished=function(t){i.prototype._fireUpdateFinished.apply(this,arguments);var e=this.getVisibleItems().length;if(!this._iVisibleItemsLength&&e>0){this._iVisibleItemsLength=e;this._firePopinChangedEvent()}else if(this._iVisibleItemsLength>0&&!e){this._iVisibleItemsLength=e;this._firePopinChangedEvent()}};y.prototype.onItemFocusIn=function(e,s){i.prototype.onItemFocusIn.apply(this,arguments);if(e!=s||!t.getConfiguration().getAccessibility()){return}this._setFirstLastVisibleCells(e.getDomRef())};y.prototype._setFirstLastVisibleCells=function(t){var e=jQuery(t);if(!e.hasClass("sapMTableRowCustomFocus")){return}e.find(".sapMTblLastVisibleCell").removeClass("sapMTblLastVisibleCell");e.find(".sapMTblFirstVisibleCell").removeClass("sapMTblFirstVisibleCell");for(var i=t.firstChild;i&&!i.clientWidth;i=i.nextSibling){}for(var s=t.lastChild.previousSibling;s&&!s.clientWidth;s=s.previousSibling){}jQuery(i).addClass("sapMTblFirstVisibleCell");jQuery(s).addClass("sapMTblLastVisibleCell")};y.prototype.getAriaRole=function(){return""};y.prototype.setLastGroupHeader=function(){};return y});
//# sourceMappingURL=Table.js.map