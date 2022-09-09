/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Control","./ActionToolbar","./table/TableSettings","./table/GridTableType","./table/ResponsiveTableType","./table/PropertyHelper","./mixin/FilterIntegrationMixin","./library","sap/m/Text","sap/m/Title","sap/m/ColumnHeaderPopover","sap/m/ColumnPopoverSelectListItem","sap/m/OverflowToolbar","sap/m/library","sap/m/table/Util","sap/m/table/columnmenu/Menu","sap/ui/core/Core","sap/ui/core/format/NumberFormat","sap/ui/core/dnd/DragDropInfo","sap/ui/core/Item","sap/ui/core/format/ListFormat","sap/ui/core/library","sap/ui/events/KeyCodes","sap/ui/model/Sorter","sap/base/strings/capitalize","sap/base/util/deepEqual","sap/base/util/Deferred","sap/base/util/UriParameters","sap/ui/core/InvisibleMessage","sap/ui/core/InvisibleText","sap/ui/mdc/p13n/subcontroller/ColumnController","sap/ui/mdc/p13n/subcontroller/SortController","sap/ui/mdc/p13n/subcontroller/FilterController","sap/ui/mdc/p13n/subcontroller/GroupController","sap/ui/mdc/p13n/subcontroller/AggregateController","sap/ui/mdc/p13n/subcontroller/ColumnWidthController","sap/ui/mdc/actiontoolbar/ActionToolbarAction","sap/ui/mdc/table/menu/QuickActionContainer","sap/ui/mdc/table/menu/ItemContainer"],function(t,e,i,o,n,r,s,a,l,u,h,p,d,g,c,f,b,_,T,y,m,v,C,P,I,S,E,x,A,M,B,D,w,R,F,N,L,O,H){"use strict";var z=a.SelectionMode;var V=a.TableType;var k=a.TableP13nMode;var G=g.ToolbarDesign;var U=g.ToolbarStyle;var j=g.IllustratedMessageType;var W=a.MultiSelectMode;var q=v.TitleLevel;var Q=v.SortOrder;var K=new window.WeakMap;var X=function(t){if(!K.has(t)){K.set(t,{oFilterInfoBar:null})}return K.get(t)};function $(t,e){sap.ui.require(["sap/m/MessageToast"],function(i){var o=b.getLibraryResourceBundle("sap.ui.mdc");i.show(o.getText(t,e))})}var J=t.extend("sap.ui.mdc.Table",{metadata:{library:"sap.ui.mdc",designtime:"sap/ui/mdc/designtime/table/Table.designtime",interfaces:["sap.ui.mdc.IFilterSource","sap.ui.mdc.IxState"],defaultAggregation:"columns",properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null,invalidate:true},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null,invalidate:true},p13nMode:{type:"sap.ui.mdc.TableP13nMode[]",defaultValue:[]},delegate:{type:"object",defaultValue:{name:"sap/ui/mdc/TableDelegate",payload:{}}},headerLevel:{type:"sap.ui.core.TitleLevel",group:"Appearance",defaultValue:q.Auto},autoBindOnInit:{type:"boolean",group:"Misc",defaultValue:true},header:{type:"string",group:"Misc",defaultValue:null},headerVisible:{type:"boolean",group:"Misc",defaultValue:true},selectionMode:{type:"sap.ui.mdc.SelectionMode",defaultValue:z.None},showRowCount:{type:"boolean",group:"Misc",defaultValue:true},threshold:{type:"int",group:"Appearance",defaultValue:-1},noDataText:{type:"string"},sortConditions:{type:"object"},filterConditions:{type:"object",defaultValue:{}},groupConditions:{type:"object"},aggregateConditions:{type:"object"},enableExport:{type:"boolean",defaultValue:false},busyIndicatorDelay:{type:"int",defaultValue:100},enableColumnResize:{type:"boolean",group:"Behavior",defaultValue:true},showPasteButton:{type:"boolean",group:"Behavior",defaultValue:false},enablePaste:{type:"boolean",group:"Behavior",defaultValue:true},multiSelectMode:{type:"sap.ui.mdc.MultiSelectMode",group:"Behavior",defaultValue:W.Default},enableAutoColumnWidth:{type:"boolean",group:"Behavior",defaultValue:false}},aggregations:{_content:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},type:{type:"sap.ui.mdc.table.TableTypeBase",altTypes:["sap.ui.mdc.TableType"],multiple:false},columns:{type:"sap.ui.mdc.table.Column",multiple:true},creationRow:{type:"sap.ui.mdc.table.CreationRow",multiple:false},actions:{type:"sap.ui.core.Control",multiple:true,forwarding:{getter:"_createToolbar",aggregation:"actions"}},variant:{type:"sap.ui.fl.variants.VariantManagement",multiple:false},quickFilter:{type:"sap.ui.core.Control",multiple:false},rowSettings:{type:"sap.ui.mdc.table.RowSettings",multiple:false},dataStateIndicator:{type:"sap.m.plugins.DataStateIndicator",multiple:false},noData:{type:"sap.ui.core.Control",multiple:false,altTypes:["string"]}},associations:{filter:{type:"sap.ui.mdc.IFilter",multiple:false}},events:{rowPress:{parameters:{bindingContext:{type:"sap.ui.model.Context"}}},selectionChange:{parameters:{bindingContext:{type:"sap.ui.model.Context"},selected:{type:"boolean"},selectAll:{type:"boolean"}}},beforeExport:{parameters:{exportSettings:{type:"object"},userExportSettings:{type:"object"}}},paste:{parameters:{data:{type:"string[][]"}}}}},constructor:function(){this._oTableReady=new E;this._oFullInitialize=new E;this._bUseColumnMenu=x.fromQuery(window.location.search).get("sap-ui-xx-columnmenu")==="true";t.apply(this,arguments);this.bCreated=true;this._doOneTimeOperations();this._initializeContent()},renderer:{apiVersion:2,render:function(t,e){t.openStart("div",e);t.class("sapUiMdcTable");t.style("height",e.getHeight());t.style("width",e.getWidth());t.openEnd();t.renderControl(e.getAggregation("_content"));t.close("div")}}});var Y=["variant","quickFilter"];s.call(J.prototype);Y.forEach(function(t){var e=I(t),i="_o"+e,o="get"+e,n="set"+e,r="destroy"+e;J.prototype[o]=function(){return this[i]};J.prototype[r]=function(){var t=this[i];this[n]();if(t){t.destroy()}return this};J.prototype[n]=function(e){this.validateAggregation(t,e,false);var n=this._createToolbar(),r=e!==this[i];if(!e||r){n.removeBetween(this[o]());this[i]=e}if(r&&e){this._setToolbarBetween(n)}return this}});J.prototype.init=function(){t.prototype.init.apply(this,arguments);this.mSkipPropagation={rowSettings:true};this._bForceRebind=true;this._aSupportedP13nModes=Object.keys(k);this._updateAdaptation()};J.prototype.applySettings=function(){this._setPropertyHelperClass(r);t.prototype.applySettings.apply(this,arguments);this.initControlDelegate()};J.prototype._setToolbarBetween=function(t){[this._oVariant,this._oQuickFilter].forEach(function(e){if(e){t.addBetween(e)}})};J.prototype.initialized=function(){return this._oTableReady.promise};J.prototype._fullyInitialized=function(){return this._oFullInitialize.promise};J.prototype.getDataStateIndicatorPluginOwner=function(t){return this._oTable||this._oFullInitialize.promise};J.prototype.setDataStateIndicator=function(t){this._handleDataStateEvents(this.getDataStateIndicator(),"detach");this.setAggregation("dataStateIndicator",t,true);this._handleDataStateEvents(this.getDataStateIndicator(),"attach");return this};J.prototype._handleDataStateEvents=function(t,e){if(t){t[e+"ApplyFilter"](this._onApplyMessageFilter,this);t[e+"ClearFilter"](this._onClearMessageFilter,this);t[e+"Event"]("filterInfoPress",dt,this)}};J.prototype._onApplyMessageFilter=function(t){this._oMessageFilter=t.getParameter("filter");t.preventDefault();this._rebind()};J.prototype._onClearMessageFilter=function(t){this._oMessageFilter=null;t.preventDefault();this._rebind()};J.prototype._getStringType=function(t){var e,i=e=t||this.getType();if(!i){e=V.Table}else if(typeof i==="object"){if(i.isA("sap.ui.mdc.table.ResponsiveTableType")){e=V.ResponsiveTable}else{e=V.Table}}return e};J.prototype._isOfType=function(t){return this._getStringType()===t};J.prototype._updateTypeSettings=function(){var t=this.getType();if(t&&typeof t==="object"){t.updateTableSettings()}else{if(t==="ResponsiveTable"){t=n}else{t=o}t.updateDefault(this._oTable)}};J.prototype.scrollToIndex=function(t){return new Promise(function(e,i){if(!this._oTable){return i()}if(typeof t!=="number"){return i("The iIndex parameter has to be a number")}if(this._isOfType(V.ResponsiveTable)){this._oTable.scrollToIndex(t).then(e).catch(i)}else{if(t===-1){t=this._getRowCount(false)}if(this._oTable._setFirstVisibleRowIndex(t)){this._oTable.attachEventOnce("rowsUpdated",function(){e()})}else{e()}}}.bind(this))};J.prototype.focusRow=function(t,e){return this.scrollToIndex(t).then(function(){return this._oTable._setFocus(t,e)}.bind(this))};J.prototype.setType=function(t){var e=this._getStringType(t);var i=this._getStringType();this.setAggregation("type",t,true);if(e===i&&this._oTable){this._updateTypeSettings();return this}if(this.bCreated){if(this._oTable){if(i==="ResponsiveTable"){this._oTable.setHeaderToolbar()}else{this._oTable.removeExtension(this._oToolbar)}var o=this.getNoData();this.setNoData();this._vNoData=o;this._oTable.destroy("KeepDom");this._oTable=null;this._bTableExists=false}else{this._onAfterTableCreated();this._onAfterFullInitialization()}if(this._oTemplate){this._oTemplate.destroy();this._oTemplate=null}this._oTableReady=new E;this._oFullInitialize=new E;this._bFullyInitialized=false;this._initializeContent()}return this};J.prototype.setRowSettings=function(t){this.setAggregation("rowSettings",t,true);if(this._oTable){this._oRowActions={};if(this._isOfType(V.ResponsiveTable)){n.updateRowSettings(this,t,this._onResponsiveRowActionPress)}else{o.updateRowSettings(this._oTable,t,[this._onRowActionPress,this])}this._bForceRebind=true;this._rebind()}return this};J.prototype.setHeaderLevel=function(t){if(this.getHeaderLevel()===t){return this}this.setProperty("headerLevel",t,true);this._oTitle&&this._oTitle.setLevel(t);return this};J.prototype.focus=function(t){if(this._oTable){this._oTable.focus(t)}};J.prototype.setBusy=function(t){this.setProperty("busy",t,true);if(this._oTable){this._oTable.setBusy(t)}return this};J.prototype.setBusyIndicatorDelay=function(t){this.setProperty("busyIndicatorDelay",t,true);if(this._oTable){this._oTable.setBusyIndicatorDelay(t)}return this};J.prototype.setSelectionMode=function(t){var e=this.getSelectionMode();this.setProperty("selectionMode",t,true);if(this._oTable&&e!=this.getSelectionMode()){this._updateSelectionBehavior()}return this};J.prototype.setMultiSelectMode=function(t){var e=this.getMultiSelectMode();this.setProperty("multiSelectMode",t,true);if(this._oTable&&e!=this.getMultiSelectMode()){this._updateMultiSelectMode()}return this};J.prototype.setCreationRow=function(t){this.setAggregation("creationRow",t,true);if(t){t.update()}return this};J.prototype.setEnableColumnResize=function(t){var e=this.getEnableColumnResize();this.setProperty("enableColumnResize",t,true);if(this.getEnableColumnResize()!==e){this._updateColumnResizer();this._updateAdaptation()}return this};J.prototype._onModifications=function(){this.getColumns().forEach(function(t){t._onModifications()})};J.prototype.setP13nMode=function(t){var e=this.getP13nMode();var i=[];if(t&&t.length>1){var o=t.reduce(function(t,e,i){t[e]=true;return t},{});if(o.Column){i.push("Column")}if(o.Sort){i.push("Sort")}if(o.Filter){i.push("Filter")}if(o.Group){i.push("Group")}if(o.Aggregate){i.push("Aggregate")}}else{i=t}this.setProperty("p13nMode",i,true);this._updateAdaptation();if(!S(e.sort(),this.getP13nMode().sort())){Z(this)}return this};J.prototype._updateAdaptation=function(){var t={controller:{}};var e={Column:B,Sort:D,Group:R,Filter:w,Aggregate:F,ColumnWidth:N};this.getActiveP13nModes().forEach(function(i){t.controller[i]=e[i]});if(this.getEnableColumnResize()){t.controller["ColumnWidth"]=e["ColumnWidth"]}this.getEngine().registerAdaptation(this,t)};function Z(t){if(t._oToolbar){t._oToolbar.destroyEnd();t._getP13nButtons().forEach(function(e){t._oToolbar.addEnd(e)})}if(t._oTable){var e=t._oTable.getDragDropConfig()[0];if(e){e.setEnabled(t.getActiveP13nModes().indexOf("Column")>-1)}}if(t.isFilteringEnabled()){et(t)}tt(t)}J.prototype.setFilterConditions=function(t){this.setProperty("filterConditions",t,true);var e=this.getInbuiltFilter();if(e){e.setFilterConditions(t)}tt(this);return this};function tt(t){var e=nt(t);var i=rt(t);var o=st(t);if(!e){return}if(o.length===0){var n=e.getDomRef();if(n&&n.contains(document.activeElement)){t.focus()}e.setVisible(false);it(t).setText("");return}t._fullyInitialized().then(function(){var n=t.getPropertyHelper();var r=o.map(function(t){return n.hasProperty(t)?n.getProperty(t).label:""});var s=b.getLibraryResourceBundle("sap.ui.mdc");var a=m.getInstance();var l;if(r.length>1){l=s.getText("table.MULTIPLE_FILTERS_ACTIVE",[r.length,a.format(r)])}else{l=s.getText("table.ONE_FILTER_ACTIVE",r[0])}if(!e.getVisible()){e.setVisible(true)}i.setText(l);it(t).setText(l)})}function et(t){if(!t._oTable){return}var e=nt(t);if(!e){e=ot(t)}if(t._bMobileTable){if(t._oTable.getInfoToolbar()!==e){t._oTable.setInfoToolbar(e)}}else if(t._oTable.indexOfExtension(e)===-1){t._oTable.insertExtension(e,1)}var i=it(t);t._oTable.addAriaLabelledBy(i.getId())}function it(t){if(!t){return null}if(!t._oFilterInfoBarInvisibleText){t._oFilterInfoBarInvisibleText=(new M).toStatic()}return t._oFilterInfoBarInvisibleText}function ot(t){var e=t.getId()+"-filterInfoBar";var i=X(t).oFilterInfoBar;if(i&&!i.bIsDestroyed){i.destroy()}i=new d({id:e,active:true,design:G.Info,visible:false,content:[new l({id:e+"-text",wrapping:false})],press:[dt,t]});i.focus=function(){if(this.getDomRef()){d.prototype.focus.apply(this,arguments)}else{t.focus()}};X(t).oFilterInfoBar=i;tt(t);return i}function nt(t){var e=X(t).oFilterInfoBar;if(e&&(e.bIsDestroyed||e.bIsBeingDestroyed)){return null}return X(t).oFilterInfoBar}function rt(t){var e=nt(t);return e?e.getContent()[0]:null}J.prototype.setThreshold=function(t){this.setProperty("threshold",t,true);if(!this._oTable){return this}t=this.getThreshold()>-1?this.getThreshold():undefined;if(this._bMobileTable){this._oTable.setGrowingThreshold(t)}else{this._oTable.setThreshold(t)}return this};J.prototype._onFilterProvided=function(t){this._updateInnerTableNoData()};J.prototype._onFilterRemoved=function(t){this._updateInnerTableNoData()};J.prototype._onFiltersChanged=function(t){if(this.isTableBound()&&t.getParameter("conditionsBased")){this._oTable.setShowOverlay(true)}};J.prototype._onFilterSearch=function(t){this._bIgnoreChange=true;this._bAnnounceTableUpdate=true};J.prototype.setNoData=function(t){this._vNoData=this.validateAggregation("noData",t,false);if(!this._oTable){return this}if(t&&t.isA&&t.isA("sap.m.IllustratedMessage")){this._sLastNoDataTitle="";t.setEnableVerticalResponsiveness(!this._bMobileTable);var e=this._oTable.getAggregation("_noColumnsMessage");if(!e){var o=i.showPanel.bind(i,this,"Columns");e=c.getNoColumnsIllustratedMessage(o);e.setEnableVerticalResponsiveness(!this._bMobileTable);this._oTable.setAggregation("_noColumnsMessage",e)}}this._oTable.setNoData(t);this._updateInnerTableNoData();return this};J.prototype.getNoData=function(){return this._vNoData&&!this._vNoData.bIsDestroyed?this._vNoData:null};J.prototype.destroyNoData=function(){if(this._oTable){this._oTable.destroyNoData(true);this._vNoData=null}return this};J.prototype._updateInnerTableNoData=function(){var t=this.getNoData();if(!t||typeof t=="string"){return this._updateInnerTableNoDataText()}if(!t.isA("sap.m.IllustratedMessage")||this._sLastNoDataTitle!=t.getTitle()){return}var e=b.getLibraryResourceBundle("sap.ui.mdc");if(!this.isTableBound()){t.setDescription(" ");if(this.getFilter()){t.setTitle(e.getText("table.NO_DATA_WITH_FILTERBAR"));t.setIllustrationType(j.SearchEarth)}else{t.setIllustrationType(j.EmptyList);t.setTitle(e.getText("table.NO_DATA"))}}else{if(lt(this)){t.setTitle(e.getText("table.NO_RESULTS_TITLE"));t.setDescription(e.getText("table.NO_RESULTS_DESCRIPTION"));t.setIllustrationType(j.NoFilterResults)}else{t.setTitle(e.getText("table.NO_DATA")).setDescription(" ");t.setIllustrationType(j.NoEntries)}}this._sLastNoDataTitle=t.getTitle()};J.prototype.setNoDataText=function(t){this.setProperty("noDataText",t,true);this._updateInnerTableNoDataText();return this};J.prototype._updateInnerTableNoDataText=function(){if(this._oTable){this._oTable.setNoData(this._getNoDataText())}};J.prototype._getNoDataText=function(){var t=this.getNoDataText();if(t){return t}var e=this.getNoData();if(e&&typeof e=="string"){return e}var i=b.getLibraryResourceBundle("sap.ui.mdc");if(!this.isTableBound()){return i.getText(this.getFilter()?"table.NO_DATA_WITH_FILTERBAR":"table.NO_DATA")}if(lt(this)){return i.getText("table.NO_RESULTS")}return i.getText("table.NO_DATA")};J.prototype._updateRowAction=function(){if(!this._oTable){return}var t=this._bMobileTable?n:o;t.updateRowActions(this,this.getRowSettings(),this._bMobileTable?this._onResponsiveRowActionPress:this._onRowActionPress)};J.prototype._initializeContent=function(){var t,e=this._getStringType();if(this._isOfType(V.ResponsiveTable)){t=n}else{t=o}var i=[this.awaitControlDelegate(),t.loadTableModules()];if(this.isFilteringEnabled()){i.push(this.retrieveInbuiltFilter())}Promise.all(i).then(function(){if(this.bIsDestroyed){return}var t=this.getControlDelegate();this._aSupportedP13nModes=t.getSupportedP13nModes(this);this._updateAdaptation();if(t.preInit){this._pDelegatePreInit=t.preInit(this)}if(!this._bTableExists&&e===this._getStringType()){this._bMobileTable=e==="ResponsiveTable";this._createContent();this._bTableExists=true}}.bind(this)).catch(function(t){this._onAfterTableCreated();throw t}.bind(this))};J.prototype._doOneTimeOperations=function(){if(!this.bColumnsOrdered){this.bColumnsOrdered=true;this._orderColumns()}};J.prototype._onAfterTableCreated=function(t){this._oTableReady[t?"resolve":"reject"](this)};J.prototype._onAfterFullInitialization=function(t){this._oFullInitialize[t?"resolve":"reject"](this)};J.prototype._createContent=function(){this._createToolbar();this._createTable();this._updateColumnResizer();this._updateRowAction();this.getColumns().forEach(this._insertInnerColumn,this);this.setAggregation("_content",this._oTable);this._onAfterTableCreated(true);var t=this.initialized().then(function(){this.initPropertyHelper();var t=this.getCreationRow();if(t){t.update()}if(this.getAutoBindOnInit()){this.rebind()}return this.awaitPropertyHelper()}.bind(this));Promise.all([t,this._pDelegatePreInit]).then(function(){delete this._pDelegatePreInit;this._bFullyInitialized=true;this._onAfterFullInitialization(true)}.bind(this)).catch(function(t){this._onAfterFullInitialization();throw t}.bind(this))};J.prototype.setHeader=function(t){this.setProperty("header",t,true);this._updateHeaderText();this._updateExportState(true);return this};J.prototype.setHeaderVisible=function(t){this.setProperty("headerVisible",t,true);if(this._oTitle){this._oTitle.setWidth(this.getHeaderVisible()?undefined:"0px")}return this};J.prototype.setShowRowCount=function(t){this.setProperty("showRowCount",t,true);this._updateHeaderText();return this};J.prototype.setEnableExport=function(t){if(t!==this.getEnableExport()){this.setProperty("enableExport",t,true);if(t&&!this._oExportButton&&this._oToolbar){this._oToolbar.addEnd(this._getExportButton())}else if(this._oExportButton){this._oExportButton.setVisible(t)}}return this};J.prototype.setShowPasteButton=function(t){if((t=!!t)==this.getShowPasteButton()){return this}this.setProperty("showPasteButton",t,true);if(t&&!this._oPasteButton&&this._oToolbar){this._oToolbar.insertEnd(this._getPasteButton(),0);this._oPasteButton.setEnabled(this.getEnablePaste())}else if(this._oPasteButton){this._oPasteButton.setVisible(t);this._oPasteButton.setEnabled(this.getEnablePaste())}return this};J.prototype.setEnablePaste=function(t){this.setProperty("enablePaste",t,true);if(this._oPasteButton){this._oPasteButton.setEnabled(this.getEnablePaste())}return this};J.prototype._createToolbar=function(){if(this.isDestroyStarted()||this.isDestroyed()){return}if(!this._oToolbar){this._oTitle=new u(this.getId()+"-title",{text:this.getHeader(),width:this.getHeaderVisible()?undefined:"0px",level:this.getHeaderLevel()});this._oToolbar=new e(this.getId()+"-toolbar",{design:G.Transparent,begin:[this._oTitle],end:[this._getPasteButton(),this._getP13nButtons(),this._getExportButton()]})}this._oToolbar.setStyle(this._bMobileTable?U.Standard:U.Clear);return this._oToolbar};J.prototype._getVisibleProperties=function(){var t=[],e;this.getColumns().forEach(function(i,o){e=i&&i.getDataProperty();if(e){t.push({name:e})}});return t};J.prototype.getConditions=function(){return this.getInbuiltFilter()?this.getInbuiltFilter().getConditions():[]};J.prototype._getSortedProperties=function(){return this.getSortConditions()?this.getSortConditions().sorters:[]};J.prototype._getGroupedProperties=function(){return this.getGroupConditions()?this.getGroupConditions().groupLevels:[]};J.prototype._getAggregatedProperties=function(){return this.getAggregateConditions()?this.getAggregateConditions():{}};J.prototype._getXConfig=function(){return this.getEngine().readXConfig(this)};function st(t){return t.isFilteringEnabled()?ut(t.getFilterConditions()):[]}function at(t){var e=b.byId(t.getFilter());return e?ut(e.getConditions()):[]}function lt(t){var e=b.byId(t.getFilter());return st(t).length>0||at(t).length>0||e&&e.getSearch()!==""}function ut(t){return Object.keys(t||{}).filter(function(e){return t[e].length>0})}J.prototype.getCurrentState=function(){var t={};var e=this.getActiveP13nModes();if(e.indexOf("Column")>-1){t.items=this._getVisibleProperties()}if(this.isSortingEnabled()){t.sorters=this._getSortedProperties()}if(this.isFilteringEnabled()){t.filter=this.getFilterConditions()}if(this.isGroupingEnabled()){t.groupLevels=this._getGroupedProperties()}if(this.isAggregationEnabled()){t.aggregations=this._getAggregatedProperties()}if(this.getEnableColumnResize()){t.xConfig=this._getXConfig()}return t};J.prototype.isFilteringEnabled=function(){return this.getActiveP13nModes().includes(k.Filter)};J.prototype.isSortingEnabled=function(){return this.getActiveP13nModes().includes(k.Sort)};J.prototype.isGroupingEnabled=function(){return this.getActiveP13nModes().includes(k.Group)};J.prototype.isAggregationEnabled=function(){return this.getActiveP13nModes().includes(k.Aggregate)};J.prototype.getSupportedP13nModes=function(){return this._aSupportedP13nModes||[]};J.prototype.getActiveP13nModes=function(){var t=this.getP13nMode();var e=this.getSupportedP13nModes();t=t.filter(function(t){return e.includes(t)});return t};J.prototype._getP13nButtons=function(){var t=this.getActiveP13nModes();var e=[];var o=t.length===1&&t[0]==="Aggregate";if(t.length>0&&!o){e.push(i.createSettingsButton(this.getId(),[pt,this]))}return e};J.prototype._getPasteButton=function(){if(this.getShowPasteButton()){if(!this._oPasteButton){this._oPasteButton=i.createPasteButton(this.getId())}return this._oPasteButton}};J.prototype._getExportButton=function(){if(!this.getEnableExport()){return null}if(!this._oExportButton){this._oExportButton=i.createExportButton(this.getId(),{default:[function(){this._onExport()},this],exportAs:[function(){this._onExport(true)},this]})}this._updateExportState();return this._oExportButton};J.prototype._updateExportState=function(t){if(this._oExportButton){this._oExportButton.setEnabled(this._getRowCount(false)>0);if(t&&this._cachedExportSettings){this._cachedExportSettings.fileName=this.getHeader()}}};J.prototype._createExportColumnConfiguration=function(){var t=this.getColumns();return this._fullyInitialized().then(function(){var e=this.getPropertyHelper();var i=[];t.forEach(function(t){var o=e.getColumnExportSettings(t);i=i.concat(o)},this);return i}.bind(this))};J.prototype._getColumnLabel=function(t){var e=this.getPropertyHelper();var i=e.getProperty(t);return i&&i.label};J.prototype._onExport=function(t){var e=this;return this._createExportColumnConfiguration().then(function(i){if(!i||!i.length){sap.ui.require(["sap/m/MessageBox"],function(t){t.error(b.getLibraryResourceBundle("sap.ui.mdc").getText("table.NO_COLS_EXPORT"),{styleClass:this.$()&&this.$().closest(".sapUiSizeCompact").length?"sapUiSizeCompact":""})}.bind(e));return}var o=e._getRowBinding();var n=e._getColumnLabel.bind(e);var r={workbook:{columns:i,context:{title:e.getHeader()}},dataSource:o,fileName:e.getHeader()};e._loadExportLibrary().then(function(){sap.ui.require(["sap/ui/export/ExportHandler"],function(i){var o;e.getControlDelegate().fetchExportCapabilities(e).then(function(s){if(!e._oExportHandler){o=new i(s);o.attachBeforeExport(function(t){e.fireBeforeExport({exportSettings:t.getParameter("exportSettings"),userExportSettings:t.getParameter("userExportSettings")})});e._oExportHandler=o}if(t){e._oExportHandler.exportAs(r,n)}else{e._oExportHandler.export(r,n)}})})})})};J.prototype._loadExportLibrary=function(){if(!this._oExportLibLoadPromise){this._oExportLibLoadPromise=b.loadLibrary("sap.ui.export",true)}return this._oExportLibLoadPromise};J.prototype.onkeydown=function(t){if(t.isMarked()){return}if((t.metaKey||t.ctrlKey)&&t.shiftKey&&t.which===C.E){if(this.getEnableExport()&&this._oExportButton&&this._oExportButton.getEnabled()){this._onExport(true);t.setMarked();t.preventDefault()}}if((t.metaKey||t.ctrlKey)&&t.which===C.COMMA){var e=b.byId(this.getId()+"-settings");if(e&&e.getEnabled()&&e.getVisible()){e.firePress();t.setMarked();t.preventDefault()}}};J.prototype._createTable=function(){var t=this.getThreshold()>-1?this.getThreshold():undefined;var e=this.getRowSettings()?this.getRowSettings().getAllSettings():{};if(this._bMobileTable){this._oTable=n.createTable(this.getId()+"-innerTable",{autoPopinMode:true,contextualWidth:"Auto",growing:true,sticky:["ColumnHeaders","HeaderToolbar","InfoToolbar"],itemPress:[this._onItemPress,this],selectionChange:[this._onSelectionChange,this],growingThreshold:t,noData:this._getNoDataText(),headerToolbar:this._oToolbar,ariaLabelledBy:[this._oTitle]});this._oTemplate=n.createTemplate(this.getId()+"-innerTableRow",e);this._sAggregation="items";this._oTable.bindRows=this._oTable.bindItems;this._oTable.bActiveHeaders=true;this._oTable.attachEvent("columnPress",this._onResponsiveTableColumnPress,this)}else{this._oTable=o.createTable(this.getId()+"-innerTable",{enableBusyIndicator:true,enableColumnReordering:false,threshold:t,cellClick:[this._onCellClick,this],noData:this._getNoDataText(),extension:[this._oToolbar],ariaLabelledBy:[this._oTitle],plugins:[o.createMultiSelectionPlugin(this,[this._onRowSelectionChange,this])],columnSelect:[this._onGridTableColumnPress,this],rowSettingsTemplate:e});this._sAggregation="rows"}this._updateTypeSettings();this._updateSelectionBehavior();this._updateMultiSelectMode();var i=new T({sourceAggregation:"columns",targetAggregation:"columns",dropPosition:"Between",enabled:this.getActiveP13nModes().includes(k.Column),drop:[this._onColumnRearrange,this]});i.bIgnoreMetadataCheck=true;this._oTable.addDragDropConfig(i);this._oTable.setBusyIndicatorDelay(this.getBusyIndicatorDelay());if(this.getNoData()){this.setNoData(this.getNoData())}this._oTable.attachPaste(this._onInnerTablePaste,this);if(this.isFilteringEnabled()){et(this)}};J.prototype._updateColumnResizer=function(){if(!this._oTable){return}var t=this.getEnableColumnResize();var e=this._bMobileTable?n:o;if(t){e.enableColumnResizer(this,this._oTable)}else{e.disableColumnResizer(this,this._oTable)}};J.prototype._updateSelectionBehavior=function(){var t=this._bMobileTable?n:o;t.updateSelection(this)};J.prototype._updateMultiSelectMode=function(){if(this._bMobileTable){n.updateMultiSelectMode(this)}};J.prototype._onColumnRearrange=function(t){var e=t.getParameter("draggedControl");var o=t.getParameter("droppedControl");if(e===o){return}var n=t.getParameter("dropPosition");var r=this._oTable.indexOfColumn(e);var s=this._oTable.indexOfColumn(o);var a=s+(n=="Before"?0:1)+(r<s?-1:0);i.moveColumn(this,r,a)};J.prototype._onColumnPress=function(t){if(this._bSuppressOpenMenu){return}var e=t.getParent(),i=e.indexOfColumn(t),o=this.getColumns()[i];this._fullyInitialized().then(function(){if(this._bUseColumnMenu){if(!this._oColumnHeaderMenu){this._oQuickActionContainer=new O({table:this});this._oItemContainer=new H({table:this});this._oColumnHeaderMenu=new f({_quickActions:[this._oQuickActionContainer],_items:[this._oItemContainer]})}this._oQuickActionContainer.setAssociation("column",o);Promise.all([this._oQuickActionContainer.initializeQuickActions(),this._oItemContainer.initializeItems()]).then(function(){if(this._oQuickActionContainer.hasQuickActions()||this._oItemContainer.hasItems()){this._oColumnHeaderMenu.openBy(t)}}.bind(this))}else{var e=b.getLibraryResourceBundle("sap.ui.mdc"),i=this._bMobileTable&&this.getEnableColumnResize();if(this._oPopover){this._oPopover.destroy();this._oPopover=null}if(this.isSortingEnabled()){var r=[],s=[];var a=this.getPropertyHelper().getProperty(o.getDataProperty()).getSortableProperties();a.forEach(function(t){r.push(new y({text:t.label,key:t.name}));s.push(new y({text:t.label,key:t.name}))});if(r.length>0){this._oPopover=new h({items:[new p({items:r,label:e.getText("table.SETTINGS_ASCENDING"),icon:"sap-icon://sort-ascending",action:[Q.Ascending,this._onCustomSort,this]}),new p({items:s,label:e.getText("table.SETTINGS_DESCENDING"),icon:"sap-icon://sort-descending",action:[Q.Descending,this._onCustomSort,this]})]});t.addDependent(this._oPopover)}}var l=[];var u=this.getControlDelegate();var d=u.addColumnMenuItems&&u.addColumnMenuItems(this,o)||[];this.getPropertyHelper().getFilterableProperties(o.getDataProperty()).forEach(function(t){l.push(new y({text:t.label,key:t.name}))});if(this.isFilteringEnabled()&&l.length){var g=new p({label:e.getText("table.SETTINGS_FILTER"),icon:"sap-icon://filter",action:[dt,this]});d.unshift(g)}if(i){var c=n.startColumnResize(this._oTable,t);c&&d.push(c)}d.forEach(function(e){this._createPopover(e,t)},this);this._oPopover&&this._oPopover.openBy(t)}}.bind(this))};J.prototype._createPopover=function(t,e){if(this._oPopover){this._oPopover.addItem(t)}else{this._oPopover=new h({items:t});e.addDependent(this._oPopover)}};J.prototype._onCustomSort=function(t,e){var o=t.getParameter("property");this.getCurrentState().sorters.forEach(function(t){if(t.name===o){if(t.descending&&e===Q.Descending||!t.descending&&e===Q.Ascending){e=Q.None}}});i.createSort(this,o,e,true)};J.prototype._onColumnResize=function(t){var e=t.getParameter("column");var o=t.getParameter("width");var n=this._oTable.indexOfColumn(e);var r=this.getColumns()[n];var s=r.getDataProperty();i.createColumnWidth(this,s,o)};J.prototype._onCustomGroup=function(t){i.createGroup(this,t)};J.prototype._onCustomAggregate=function(t){i.createAggregation(this,t)};J.prototype._insertInnerColumn=function(t,e){if(!this._oTable){return}var i=t.getInnerColumn();this._setMobileColumnTemplate(t,e);this._bForceRebind=true;if(e===undefined){this._oTable.addColumn(i)}else{this._oTable.insertColumn(i,e)}};J.prototype._orderColumns=function(){var t,e=[],i=this.getColumns();i.forEach(function(i){t=i.getInitialIndex();if(t>-1){e.push({index:t,column:this.removeColumn(i)})}},this);e.sort(function(t,e){return t-e});e.forEach(function(t){this.insertColumn(t.column,t.index)},this)};J.prototype.moveColumn=function(t,e){t._bIsBeingMoved=true;this.removeAggregation("columns",t,true);this.insertAggregation("columns",t,e,true);delete t._bIsBeingMoved;if(this._oTable){var i=t.getInnerColumn();this._oTable.removeColumn(i);this._oTable.insertColumn(i,e);this._updateMobileColumnTemplate(t,e)}};J.prototype.removeColumn=function(t){t=this.removeAggregation("columns",t,true);this._updateMobileColumnTemplate(t,-1);return t};J.prototype.addColumn=function(t){this.addAggregation("columns",t,true);this._insertInnerColumn(t);return this};J.prototype.insertColumn=function(t,e){this.insertAggregation("columns",t,e,true);this._insertInnerColumn(t,e);return this};J.prototype._setMobileColumnTemplate=function(t,e){if(!this._bMobileTable){return}var i=t.getTemplateClone();if(e>=0){this._oTemplate.insertCell(i,e);this._oTable.getItems().forEach(function(t){if(t.isA("sap.m.GroupHeaderListItem")){return}t.insertAggregation("cells",new M,e,true)})}else{this._oTemplate.addCell(i)}};J.prototype._updateMobileColumnTemplate=function(t,e){if(!this._bMobileTable){return}var i,o;if(this._oTemplate){i=t.getTemplateClone();o=this._oTemplate.indexOfCell(i);ht(this._oTemplate,o,e)}if(o>-1){this._oTable.getItems().forEach(function(t){if(t.removeCell){ht(t,o,e)}})}};function ht(t,e,i){var o=t.removeCell(e);if(o){if(i>-1){t.insertCell(o,i)}else{o.destroy()}}}J.prototype._onItemPress=function(t){if(this.getSelectionMode()!==a.SelectionMode.SingleMaster){this.fireRowPress({bindingContext:t.getParameter("listItem").getBindingContext()})}n._onRowActionPress.apply(this,[t])};J.prototype._onSelectionChange=function(t){var e=t.getParameter("selectAll");this.fireSelectionChange({bindingContext:t.getParameter("listItem").getBindingContext(),selected:t.getParameter("selected"),selectAll:e});if(e){var i=this.getRowBinding();if(i&&this._oTable){var o=i.getLength();var n=this._oTable.getItems().filter(function(t){return!t.isGroupHeader()}).length;var r=i.isLengthFinal();if(n!=o||!r){$("table.SELECTION_LIMIT_MESSAGE",[n])}}}};J.prototype._onResponsiveTableColumnPress=function(t){this._onColumnPress(t.getParameter("column"))};J.prototype._onCellClick=function(t){if(this.getSelectionMode()===a.SelectionMode.SingleMaster){return}this.fireRowPress({bindingContext:t.getParameter("rowBindingContext")})};J.prototype._onRowSelectionChange=function(t){if(!this._bSelectionChangedByAPI){this.fireSelectionChange({bindingContext:t.getParameter("rowContext"),selected:t.getSource().isIndexSelected(t.getParameter("rowIndex")),selectAll:t.getParameter("selectAll")})}};J.prototype._onGridTableColumnPress=function(t){t.preventDefault();this._onColumnPress(t.getParameter("column"))};J.prototype.getSelectedContexts=function(){if(this._oTable){if(this._bMobileTable){return this._oTable.getSelectedContexts()}var t=this._oTable.getPlugins()[0].getSelectedIndices();return t.map(function(t){return this._oTable.getContextByIndex(t)},this)}return[]};J.prototype.clearSelection=function(){if(this._oTable){if(this._bMobileTable){this._oTable.removeSelections(true)}else{this._bSelectionChangedByAPI=true;this._oTable.getPlugins()[0].clearSelection();this._bSelectionChangedByAPI=false}}};J.prototype._registerInnerFilter=function(t){t.attachSearch(function(){this._rebind()},this)};J.prototype.isTableBound=function(){return this._oTable?this._oTable.isBound(this._bMobileTable?"items":"rows"):false};J.prototype.bindRows=function(){if(!this.bDelegateInitialized||!this._oTable){return}var t={};this.getControlDelegate().updateBindingInfo(this,t);if(t.path){this._oTable.setShowOverlay(false);if(this._bMobileTable&&this._oTemplate){t.template=this._oTemplate}else{delete t.template}J._addBindingListener(t,"dataRequested",this._onDataRequested.bind(this));J._addBindingListener(t,"dataReceived",this._onDataReceived.bind(this));J._addBindingListener(t,"change",this._onBindingChange.bind(this));this._updateColumnsBeforeBinding();this.getControlDelegate().updateBinding(this,t,this._bForceRebind?null:this.getRowBinding());this._updateInnerTableNoData();this._bForceRebind=false}};J.prototype._onDataRequested=function(){this._bIgnoreChange=true};J.prototype._onDataReceived=function(){this._bIgnoreChange=false;this._updateHeaderText();this._updateExportState()};J.prototype._onBindingChange=function(){if(this._bIgnoreChange){return}this._updateHeaderText()};J.prototype._updateHeaderText=function(){var t,e;if(!this._oNumberFormatInstance){this._oNumberFormatInstance=_.getFloatInstance()}if(this._oTitle&&this.getHeader()){t=this.getHeader();if(this.getShowRowCount()){e=this._getRowCount(true);if(e>0){var i=this._oNumberFormatInstance.format(e);t+=" ("+i+")"}}this._oTitle.setText(t)}if(!this._bIgnoreChange&&this._bAnnounceTableUpdate){this._bAnnounceTableUpdate=false;this._announceTableUpdate(e)}};J.prototype._announceTableUpdate=function(t){var e=A.getInstance();if(e){var i=b.getLibraryResourceBundle("sap.ui.mdc");var o=this.getHeader();if(t===undefined&&this._getRowCount(false)>0){e.announce(i.getText("table.ANNOUNCEMENT_TABLE_UPDATED",[o]))}else if(t>1){e.announce(i.getText("table.ANNOUNCEMENT_TABLE_UPDATED_MULT",[o,t]))}else if(t===1){e.announce(i.getText("table.ANNOUNCEMENT_TABLE_UPDATED_SING",[o,t]))}else{e.announce(i.getText("table.ANNOUNCEMENT_TABLE_UPDATED_NOITEMS",[o]))}}};J.prototype._updateColumnsBeforeBinding=function(){var t=this.getColumns();var e=this.getPropertyHelper();t.forEach(function(t){var i=t.getInnerColumn();var o=e.getProperty(t.getDataProperty());var n=o?o.getSortableProperties().map(function(t){return t.name}):[];var r=this._getSortedProperties().find(function(t){return n.includes(t.name)});var s=r&&r.descending?Q.Descending:Q.Ascending;if(this._bMobileTable){i.setSortIndicator(r?s:Q.None)}else{i.setSorted(!!r).setSortOrder(s)}},this)};J.prototype._getRowCount=function(t){var e=this._getRowBinding();if(!e){return t?undefined:0}var i;if(!t){i=e.getLength()}else if(typeof e.getCount==="function"){i=e.getCount()}else if(e.isLengthFinal()){i=e.getLength()}if(i<0||i==="0"){i=0}return i};J.prototype.getRowBinding=function(){return this._getRowBinding()};J.prototype._getRowBinding=function(){if(this._oTable){return this._oTable.getBinding(this._sAggregation)}};J._addBindingListener=function(t,e,i){if(!t.events){t.events={}}if(!t.events[e]){t.events[e]=i}else{var o=t.events[e];t.events[e]=function(){i.apply(this,arguments);o.apply(this,arguments)}}};J.prototype._rebind=function(){if(this._bFullyInitialized){this.bindRows()}else{this._fullyInitialized().then(this._rebind.bind(this))}};function pt(t){i.showPanel(this,"Columns",t.getSource())}function dt(t){i.showPanel(this,"Filter",t.getSource())}J.prototype._getSorters=function(){var t=this.getSortConditions()?this.getSortConditions().sorters:[];var e=[],i=this.getPropertyHelper();t.forEach(function(t){if(i.hasProperty(t.name)){var o=i.getProperty(t.name).path;e.push(new P(o,t.descending))}});return e};J.prototype._onInnerTablePaste=function(t){if(!this.getEnablePaste()){return}this.firePaste({data:t.getParameter("data")})};J.prototype.invalidate=function(e){if(e==="InvalidationSuppressedByMDCFlex"&&this._oTable){this._oTable.invalidate()}t.prototype.invalidate.apply(this,arguments)};J.prototype.exit=function(){if(this._oTemplate){this._oTemplate.destroy()}this._oTemplate=null;this._oTable=null;if(this._oToolbar&&!this._bTableExists){this._oToolbar.destroy()}this._oToolbar=null;this._oTitle=null;this._vNoData=null;this._oNumberFormatInstance=null;Y.forEach(function(t){var e=I(t),i="_o"+e;this[i]=null},this);this._oTableReady=null;this._oFullInitialize=null;this._oPasteButton=null;if(this._oFilterInfoBarInvisibleText){this._oFilterInfoBarInvisibleText.destroy();this._oFilterInfoBarInvisibleText=null}t.prototype.exit.apply(this,arguments)};J.prototype.addAction=function(e){if(e.getMetadata().getName()!=="sap.ui.mdc.actiontoolbar.ActionToolbarAction"){e=new L(e.getId()+"-action",{action:e})}return t.prototype.addAggregation.apply(this,["actions",e])};return J});
//# sourceMappingURL=Table.js.map