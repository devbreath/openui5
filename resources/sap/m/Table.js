/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","./library","./ListBase","./ListItemBase","./CheckBox","./TableRenderer","sap/ui/base/Object","sap/ui/core/ResizeHandler","sap/ui/core/util/PasteHelper","sap/ui/thirdparty/jquery","sap/m/ListBaseRenderer","sap/ui/core/Icon","sap/m/table/Util","sap/ui/dom/jquery/Selectors"],function(C,l,L,a,b,T,B,R,P,q,c,I,U){"use strict";var d=l.ListKeyboardMode;var e=l.ListGrowingDirection;var f=l.BackgroundDesign;var g=l.PopinLayout;var S=l.ScreenSizes;var h=L.extend("sap.m.Table",{metadata:{library:"sap.m",properties:{backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:f.Translucent},fixedLayout:{type:"any",group:"Behavior",defaultValue:true},showOverlay:{type:"boolean",group:"Appearance",defaultValue:false},alternateRowColors:{type:"boolean",group:"Appearance",defaultValue:false},popinLayout:{type:"sap.m.PopinLayout",group:"Appearance",defaultValue:g.Block},contextualWidth:{type:"string",group:"Behavior",defaultValue:"Inherit"},autoPopinMode:{type:"boolean",group:"Behavior",defaultValue:false},hiddenInPopin:{type:"sap.ui.core.Priority[]",group:"Behavior"}},aggregations:{columns:{type:"sap.m.Column",multiple:true,singularName:"column",dnd:{draggable:true,droppable:true,layout:"Horizontal"}},_noColumnsMessage:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"}},events:{beforeOpenContextMenu:{allowPreventDefault:true,parameters:{listItem:{type:"sap.m.ColumnListItem"},column:{type:"sap.m.Column"}}},paste:{allowPreventDefault:true,parameters:{data:{type:"string[][]"}}},popinChanged:{parameters:{hasPopin:{type:"boolean"},visibleInPopin:{type:"sap.m.Column[]"},hiddenInPopin:{type:"sap.m.Column[]"}}}},designtime:"sap/m/designtime/Table.designtime"}});h.prototype.sNavItemClass="sapMListTblRow";h.prototype.init=function(){this._iItemNeedsColumn=0;L.prototype.init.call(this);};h.prototype.setContextualWidth=function(w){var o=this.getContextualWidth();if(w==o){return this;}if(typeof w==="number"){this._sContextualWidth=w+"px";this._sContextualWidth=this._sContextualWidth.toLowerCase();}else{var i=w.toLowerCase(),W=S[i];if(W){this._sContextualWidth=W+"px";}else{this._sContextualWidth=w;}}var j=this._validateContextualWidth(this._sContextualWidth);this._iLastContextualWidth=o;if(j){this.setProperty("contextualWidth",w,true);}else{return this;}if(this._iLastContextualWidth.toLowerCase()==="auto"){this._deregisterResizeHandler();}if(this._sContextualWidth.toLowerCase()==="auto"){this._registerResizeHandler();this._applyContextualWidth(this.$().width());}else{this._applyContextualWidth(this._sContextualWidth);}return this;};h.prototype._validateContextualWidth=function(w){if(!w){return;}if(typeof w!="string"){throw new Error('expected string for property "contextualWidth" of '+this);}if(w.toLowerCase()==="auto"||w.toLowerCase()==="inherit"){return true;}if(!/^\d+(\.\d+)?(px)$/i.test(w)){throw new Error('invalid CSS size("px", "Auto", "auto", Inherit", "inherit" required) or sap.m.ScreenSize enumeration for property "contextualWidth" of '+this);}return true;};h.prototype._applyContextualWidth=function(w){w=parseFloat(w)||0;if(Math.abs(this._oContextualSettings.contextualWidth-w)<=16){return;}if(w&&this._oContextualSettings.contextualWidth!=w){this._applyContextualSettings({contextualWidth:w});}};h.prototype.setNoData=function(n){L.prototype.setNoData.apply(this,arguments);if(n&&typeof n!=="string"&&n.isA("sap.m.IllustratedMessage")){var N=this.getAggregation("_noColumnsMessage");if(!N){N=U.getNoColumnsIllustratedMessage();this.setAggregation("_noColumnsMessage",N);}}return this;};h.prototype._onResize=function(p){this._applyContextualWidth(p.size.width);};h.prototype._registerResizeHandler=function(){if(!this._iResizeHandlerId){var t=this;window.requestAnimationFrame(function(){t._iResizeHandlerId=R.register(t,t._onResize.bind(t));});}};h.prototype._deregisterResizeHandler=function(){if(this._iResizeHandlerId){R.deregister(this._iResizeHandlerId);this._iResizeHandlerId=null;}};h.prototype.onBeforeRendering=function(){L.prototype.onBeforeRendering.call(this);this._bHasDynamicWidthCol=this._hasDynamicWidthColumn();if(this.getAutoPopinMode()){this._configureAutoPopin();}this._applyContextualWidth(this._sContextualWidth);this._ensureColumnsMedia();this._notifyColumns("ItemsRemoved");};h.prototype._hasDynamicWidthColumn=function(o,s){if(this.getFixedLayout()!="Strict"){return true;}return this.getColumns().some(function(i){if(i.getVisible()&&!i.isPopin()){var w=o&&o==i?s:i.getWidth();return!w||w=="auto";}});};h.prototype._ensureColumnsMedia=function(){this.getColumns().forEach(function(o){if(o._bShouldAddMedia){o._addMedia();}});};h.prototype.onAfterRendering=function(){L.prototype.onAfterRendering.call(this);this.updateSelectAllCheckbox();this._renderOverlay();if(this._bFirePopinChanged){this._firePopinChangedEvent();this._bFirePopinChanged=false;}else{var p=this._getPopins();if(this._aPopins&&this.getVisibleItems().length){if(this._aPopins.length!=p.length||!p.every(function(o){return this._aPopins.indexOf(o)>-1;},this)){this._aPopins=p;this._firePopinChangedEvent();}}else if(this._aPopins==null){this._aPopins=p;}}if(this._bCheckLastColumnWidth&&C.isThemeApplied()){window.requestAnimationFrame(this._checkLastColumnWidth.bind(this));}};h.prototype.setHiddenInPopin=function(p){var o=this.getHiddenInPopin()||[],n=p||[];this.setProperty("hiddenInPopin",p);if(n.length!==o.length){this._bFirePopinChanged=true;}else{this._bFirePopinChanged=!n.every(function(s){return o.includes(s);});}this._aPopins=this._getPopins();return this;};h.prototype._renderOverlay=function(){var $=this.$(),i=$.find(".sapMTableOverlay"),s=this.getShowOverlay();if(s&&i.length===0){i=q("<div>").addClass("sapUiOverlay sapMTableOverlay").css("z-index","1");$.append(i);}else if(!s){i.remove();}};h.prototype._checkLastColumnWidth=function(){var $=this.$();var t=this.getTableDomRef();if(!$.length||!t){return;}if($[0].clientWidth<t.clientWidth){$.find(".sapMListTblCell:visible").eq(0).addClass("sapMTableLastColumn").width("");}this._bCheckLastColumnWidth=false;};h.prototype.setShowOverlay=function(s){this.setProperty("showOverlay",s,true);this._renderOverlay();return this;};h.prototype.exit=function(){L.prototype.exit.call(this);if(this._selectAllCheckBox){this._selectAllCheckBox.destroy();this._selectAllCheckBox=null;}if(this._clearAllButton){this._clearAllButton.destroy();this._clearAllButton=null;}if(this._aPopinHeaders){this._aPopinHeaders.forEach(function(p){p.destroy();});this._aPopinHeaders=null;}};h.prototype.destroyItems=function(){this._notifyColumns("ItemsRemoved");return L.prototype.destroyItems.apply(this,arguments);};h.prototype.removeAllItems=function(){this._notifyColumns("ItemsRemoved");return L.prototype.removeAllItems.apply(this,arguments);};h.prototype.removeSelections=function(){L.prototype.removeSelections.apply(this,arguments);this.updateSelectAllCheckbox();return this;};h.prototype.selectAll=function(){L.prototype.selectAll.apply(this,arguments);this.updateSelectAllCheckbox();return this;};h.prototype.getColumns=function(s){var i=this.getAggregation("columns",[]);if(s){i.sort(function(j,k){return j.getOrder()-k.getOrder();});}return i;};h.prototype.setFixedLayout=function(F){if(F==undefined||F=="true"){F=true;}else if(F=="false"){F=false;}if(typeof F=="boolean"||F=="Strict"){return this.setProperty("fixedLayout",F);}throw new Error('"'+F+'" is an invalid value, expected false, true or "Strict" for the property fixedLayout of '+this);};h.prototype.onBeforePageLoaded=function(){if(this.getAlternateRowColors()){this._sAlternateRowColorsClass=this._getAlternateRowColorsClass();}L.prototype.onBeforePageLoaded.apply(this,arguments);};h.prototype.onAfterPageLoaded=function(){this.updateSelectAllCheckbox();if(this.getAlternateRowColors()&&this._sAlternateRowColorsClass!=this._getAlternateRowColorsClass()){var $=this.$("tblBody").removeClass(this._sAlternateRowColorsClass);$.addClass(this._getAlternateRowColorsClass());}L.prototype.onAfterPageLoaded.apply(this,arguments);};h.prototype.shouldRenderItems=function(){return this.getColumns().some(function(o){return o.getVisible();});};h.prototype.shouldGrowingSuppressInvalidation=function(){if(this.getAutoPopinMode()){return false;}return L.prototype.shouldGrowingSuppressInvalidation.call(this);};h.prototype.onItemTypeColumnChange=function(i,n){this._iItemNeedsColumn+=(n?1:-1);if(this._iItemNeedsColumn==1&&n){this._setTypeColumnVisibility(true);}else if(this._iItemNeedsColumn==0){this._setTypeColumnVisibility(false);}};h.prototype.onItemSelectedChange=function(i,s){L.prototype.onItemSelectedChange.apply(this,arguments);setTimeout(function(){this.updateSelectAllCheckbox();}.bind(this),0);};h.prototype.getTableDomRef=function(){return this.getDomRef("listUl");};h.prototype.getItemsContainerDomRef=function(){return this.getDomRef("tblBody");};h.prototype.setNavigationItems=function(i){var H=this.$("tblHeader");var F=this.$("tblFooter");var r=this.$("tblBody").children(".sapMLIB");var j=H.add(r).add(F).get();i.setItemDomRefs(j);if(i.getFocusedIndex()==-1){if(this.getGrowing()&&this.getGrowingDirection()==e.Upwards){i.setFocusedIndex(j.length-1);}else{i.setFocusedIndex(H[0]?1:0);}}};h.prototype.checkGrowingFromScratch=function(){if(this.hasPopin()){return false;}return this.getColumns().some(function(o){return o.getVisible()&&o.getMergeDuplicates();});};h.prototype.onColumnPress=function(o){var m=o.getColumnHeaderMenu();m&&m.openBy(o);(this.bActiveHeaders||m)&&this.fireEvent("columnPress",{column:o});};h.prototype.onColumnResize=function(o){if(!this.hasPopin()&&!this._mutex){var i=this.getColumns().some(function(k){return k.isPopin();});if(!i){o.setDisplay(this.getTableDomRef(),!o.isHidden());this._firePopinChangedEvent();this._oGrowingDelegate&&this._oGrowingDelegate.adaptTriggerButtonWidth(this);return;}}this._dirty=this._getMediaContainerWidth()||window.innerWidth;if(!this._mutex){var j=this._getMediaContainerWidth()||window.innerWidth;this._mutex=true;this._bFirePopinChanged=true;this.rerender();setTimeout(function(){if(this._dirty!=j){this._dirty=0;this._bFirePopinChanged=true;this.rerender();}this._mutex=false;}.bind(this),200);}};h.prototype.setTableHeaderVisibility=function(i){if(!this.getDomRef()){return;}if(!this.shouldRenderItems()){return this.invalidate();}var $=this.$("tblHeader"),H=!$.hasClass("sapMListTblHeaderNone"),v=$.find(".sapMListTblCell:visible"),j=v.eq(0);if(v.length==1){if(this.getFixedLayout()=="Strict"){this._checkLastColumnWidth();}else{j.width("");}}else{j.removeClass("sapMTableLastColumn");v.each(function(){this.style.width=this.getAttribute("data-sap-width")||"";});}this._colCount=v.length+3+!!c.ModeOrder[this.getMode()];this.$("tblBody").find(".sapMGHLICell").attr("colspan",this.getColSpan());this.$("nodata-text").attr("colspan",this.getColCount());if(this.hasPopin()){this.$("tblBody").find(".sapMListTblSubRowCell").attr("colspan",this.getColSpan());}if(!i&&H){$[0].className="sapMListTblRow sapMLIBFocusable sapMListTblHeader";this._headerHidden=false;}else if(i&&!H&&!v.length){$[0].className="sapMListTblHeaderNone";this._headerHidden=true;}};h.prototype._setTypeColumnVisibility=function(v){q(this.getTableDomRef()).toggleClass("sapMListTblHasNav",v);};h.prototype._notifyColumns=function(A,p,v){this.getColumns().forEach(function(o){o["on"+A](p,v);});};h.prototype._getClearAllButton=function(){if(!this._clearAllButton){this._clearAllButton=new I({id:this.getId()+"-clearSelection",src:"sap-icon://clear-all",tooltip:C.getLibraryResourceBundle("sap.m").getText("TABLE_CLEARBUTTON_TOOLTIP"),decorative:false,press:this.removeSelections.bind(this,false,true,false)}).setParent(this,null,true).addEventDelegate({onAfterRendering:function(){this._clearAllButton.getDomRef().setAttribute("tabindex",-1);}},this);}return this._clearAllButton;};h.prototype._getSelectAllCheckbox=function(){if(this.bPreventMassSelection){return;}if(!this._selectAllCheckBox){this._selectAllCheckBox=new b({id:this.getId("sa"),activeHandling:false}).addStyleClass("sapMLIBSelectM").setParent(this,null,true).attachSelect(function(){if(this._selectAllCheckBox.getSelected()){this.selectAll(true);}else{this.removeSelections(false,true);}},this).setTabIndex(-1);}this._selectAllCheckBox.useEnabledPropagator(false);return this._selectAllCheckBox;};h.prototype.updateSelectAllCheckbox=function(){if(this.getMode()!=="MultiSelect"){return;}if(this._selectAllCheckBox&&this.getMultiSelectMode()=="Default"){var i=this.getItems(),s=this.getSelectedItems().length,j=i.filter(function(o){return o.isSelectable();}).length;this._selectAllCheckBox.setSelected(i.length>0&&s==j);}else if(this._clearAllButton){this._clearAllButton.toggleStyleClass("sapMTableDisableClearAll",!this.getSelectedItems().length);}};h.prototype.enhanceAccessibilityState=function(E,A){if(E==this._clearAllButton){A.label=C.getLibraryResourceBundle("sap.m").getText("TABLE_ICON_DESELECT_ALL");}else if(E==this._selectAllCheckBox){A.label=C.getLibraryResourceBundle("sap.m").getText("TABLE_CHECKBOX_SELECT_ALL");}};h.prototype.getColSpan=function(){var i=this.shouldRenderDummyColumn()?3:2;return(this._colCount||1)-i;};h.prototype.getColCount=function(){return(this._colCount||0);};h.prototype.shouldRenderDummyColumn=function(){return!this._bHasDynamicWidthCol&&this.shouldRenderItems();};h.prototype.hasPopin=function(){return!!this._hasPopin;};h.prototype.isHeaderRowEvent=function(E){var H=this.$("tblHeader");return!!q(E.target).closest(H,this.getTableDomRef()).length;};h.prototype.isFooterRowEvent=function(E){var F=this.$("tblFooter");return!!q(E.target).closest(F,this.getTableDomRef()).length;};h.prototype.getAccessibilityType=function(){return C.getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_TABLE");};h.prototype._setHeaderAnnouncement=function(){var o=C.getLibraryResourceBundle("sap.m"),A=o.getText("ACC_CTR_TYPE_HEADER_ROW")+" ";if(this.isAllSelectableSelected()){A+=o.getText("LIST_ALL_SELECTED");}var H=this._getHiddenInPopin();this.getColumns(true).forEach(function(j,i){if(!j.getVisible()||H.indexOf(j)>-1){return;}var k=j.getHeader();if(k&&k.getVisible()){A+=a.getAccessibilityText(k)+" . ";}});this.updateInvisibleText(A);};h.prototype._setFooterAnnouncement=function(){var A=C.getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_FOOTER_ROW")+" ";this.getColumns(true).forEach(function(o,i){if(!o.getVisible()){return;}var F=o.getFooter();if(F&&F.getVisible()){var H=o.getHeader();if(H&&H.getVisible()){A+=a.getAccessibilityText(H)+" ";}A+=a.getAccessibilityText(F)+" ";}});this.updateInvisibleText(A);};h.prototype._setNoColumnsMessageAnnouncement=function(t){if(!this.shouldRenderItems()){var n=this.getNoData();if(n&&typeof n!=="string"&&n.isA("sap.m.IllustratedMessage")){var D=a.getAccessibilityText(this.getAggregation("_noColumnsMessage"));this.updateInvisibleText(D,t);}}};h.prototype.onsapspace=function(E){if(E.isMarked()){return;}if(E.target.id==this.getId("tblHeader")){E.preventDefault();var m=this.getMultiSelectMode();if(this._selectAllCheckBox&&m=="Default"){this._selectAllCheckBox.setSelected(!this._selectAllCheckBox.getSelected()).fireSelect();E.setMarked();}else if(this._clearAllButton&&m=="ClearAll"&&!this._clearAllButton.hasStyleClass("sapMTableDisableClearAll")){this._clearAllButton.firePress();E.setMarked();}}};h.prototype.onsaptabnext=function(E){if(E.isMarked()||this.getKeyboardMode()==d.Edit){return;}var r=q();if(E.target.id==this.getId("nodata")){r=this.$("nodata");}else if(this.isHeaderRowEvent(E)){r=this.$("tblHeader");}else if(this.isFooterRowEvent(E)){r=this.$("tblFooter");}var o=r.find(":sapTabbable").get(-1)||r[0];if(E.target===o){this.forwardTab(true);E.setMarked();}};h.prototype.onsaptabprevious=function(E){if(E.isMarked()||this.getKeyboardMode()==d.Edit){return;}var t=E.target.id;if(t==this.getId("nodata")||t==this.getId("tblHeader")||t==this.getId("tblFooter")){this.forwardTab(false);}else if(t==this.getId("trigger")){this.focusPrevious();E.preventDefault();}};h.prototype.focus=function(F){this._oFocusInfo=F;L.prototype.focus.apply(this,arguments);delete this._oFocusInfo;};h.prototype.getFocusDomRef=function(){var H=this._oFocusInfo&&this._oFocusInfo.targetInfo&&B.isA(this._oFocusInfo.targetInfo,"sap.ui.core.message.Message");if(H){var t=this.$("tblHeader");var v=t.find(".sapMListTblCell:visible");if(v.length){return t[0];}var n=this.$("nodata");if(n.length){return n[0];}}return L.prototype.getFocusDomRef.apply(this,arguments);};h.prototype.onfocusin=function(E){var t=E.target;if(t.id==this.getId("tblHeader")){if(!this.hasPopin()&&this.shouldRenderDummyColumn()){t.classList.add("sapMTableRowCustomFocus");}this._setHeaderAnnouncement();this._setFirstLastVisibleCells(t);}else if(t.id==this.getId("tblFooter")){this._setFooterAnnouncement();this._setFirstLastVisibleCells(t);}else if(t.id==this.getId("nodata")){this._setFirstLastVisibleCells(t);}L.prototype.onfocusin.call(this,E);this._setNoColumnsMessageAnnouncement(t);};h.prototype.onThemeChanged=function(){L.prototype.onThemeChanged.call(this);if(this._bCheckLastColumnWidth){this._checkLastColumnWidth();}};h.prototype._getAlternateRowColorsClass=function(){if(this.isGrouped()){return"sapMListTblAlternateRowColorsGrouped";}if(this.hasPopin()){return"sapMListTblAlternateRowColorsPopin";}return"sapMListTblAlternateRowColors";};h.prototype.onpaste=function(E){if(E.isMarked()||(/^(input|textarea)$/i.test(E.target.tagName))){return;}var D=P.getPastedDataAs2DArray(E.originalEvent);if(!D||D.length===0||D[0].length===0){return;}this.firePaste({data:D});};h.prototype.ondragenter=function(E){var D=E.dragSession;if(!D||!D.getDropControl()||!D.getDropControl().isA("sap.m.Column")){return;}D.setIndicatorConfig({height:this.getTableDomRef().clientHeight});};h.prototype._configureAutoPopin=function(){if(this._mutex){return;}var v=this.getColumns(true).filter(function(o){return o.getVisible();});if(!v.length){return;}var i=this.getItems();var p={High:[],Medium:[],Low:[]};v.forEach(function(o){var s=o.getImportance();if(s==="None"){s="Medium";}p[s].push(o);});var j=Object.values(p);var m=j.find(String)[0];j.reduce(function(t,k){return h._updateAccumulatedWidth(k,m,t);},this._getInitialAccumulatedWidth(i));};h.prototype._getInitialAccumulatedWidth=function(i){var j=this.getInset()?4:0;var $=this.$(),t=3;if($.closest(".sapUiSizeCompact").length||q(document.body).hasClass("sapUiSizeCompact")){t=2;}else{var k=false;$.find(".sapMTableTH[aria-hidden=true]:not(.sapMListTblHighlightCol):not(.sapMListTblDummyCell):not(.sapMListTblNavigatedCol)").get().forEach(function(o){var w=q(o).width();if(!k&&w>0){t=w/parseFloat(l.BaseFontSize);k=true;}});}var s=c.ModeOrder[this.getMode()]?t:0;var A=i.some(function(o){var m=o.getType();return m==="Detail"||m==="DetailAndActive"||m==="Navigation";})?t:0;return j+s+A+0.65;};h._updateAccumulatedWidth=function(i,m,A){i.forEach(function(o){var w=o.getWidth();var u=w.replace(/[^a-z]/ig,"");var s=parseFloat(l.BaseFontSize)||16;if(u==="px"){A+=parseFloat((parseFloat(w).toFixed(2)/s).toFixed(2));}else if(u==="em"||u==="rem"){A+=parseFloat(w);}else{A+=o.getAutoPopinWidth();}o.setDemandPopin(o!==m);o.setMinScreenWidth(o!==m?A+"rem":"");});return A;};h.prototype._getHiddenInPopin=function(){return this._getPopins().filter(function(p){return!p.isPopin();});};h.prototype._getVisiblePopin=function(){return this._getPopins().filter(function(p){return p.isPopin();});};h.prototype._getPopins=function(){var v=this.getColumns().filter(function(o){return o.getVisible()&&o.getDemandPopin();});return v.filter(function(V){return V._media&&!V._media.matches;});};h.prototype._firePopinChangedEvent=function(){this.fireEvent("popinChanged",{hasPopin:this.hasPopin(),visibleInPopin:this._getVisiblePopin(),hiddenInPopin:this._getHiddenInPopin()});};h.prototype._fireUpdateFinished=function(i){L.prototype._fireUpdateFinished.apply(this,arguments);var v=this.getVisibleItems().length;if(!this._iVisibleItemsLength&&v>0){this._iVisibleItemsLength=v;this._firePopinChangedEvent();}else if(this._iVisibleItemsLength>0&&!v){this._iVisibleItemsLength=v;this._firePopinChangedEvent();}};h.prototype.onItemFocusIn=function(i,F){L.prototype.onItemFocusIn.apply(this,arguments);if(i!=F||!C.getConfiguration().getAccessibility()){return;}this._setFirstLastVisibleCells(i.getDomRef());};h.prototype._setFirstLastVisibleCells=function(D){var $=q(D);if(!$.hasClass("sapMTableRowCustomFocus")){return;}$.find(".sapMTblLastVisibleCell").removeClass("sapMTblLastVisibleCell");$.find(".sapMTblFirstVisibleCell").removeClass("sapMTblFirstVisibleCell");for(var F=D.firstChild;F&&!F.clientWidth;F=F.nextSibling){}for(var o=D.lastChild.previousSibling;o&&!o.clientWidth;o=o.previousSibling){}q(F).addClass("sapMTblFirstVisibleCell");q(o).addClass("sapMTblLastVisibleCell");};h.prototype.getAriaRole=function(){return"";};h.prototype.setLastGroupHeader=function(){};return h;});
