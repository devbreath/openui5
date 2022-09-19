/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Fragment","sap/base/util/restricted/_difference","sap/base/util/deepEqual","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/Control","sap/ui/dt/OverlayRegistry","sap/ui/dt/ElementUtil","sap/ui/fl/write/api/PersistenceWriteAPI","sap/ui/fl/Layer","sap/ui/fl/Utils","sap/ui/model/resource/ResourceModel","sap/ui/model/json/JSONModel","sap/ui/rta/util/changeVisualization/ChangeIndicator","sap/ui/rta/util/changeVisualization/ChangeIndicatorRegistry"],function(F,d,a,J,C,O,E,P,L,b,R,c,e,f){"use strict";var V={add:["createContainer","addDelegateProperty","reveal","addIFrame"],move:["move"],rename:["rename"],combinesplit:["combine","split"],remove:["remove"]};var g="all";var h={all:"sap-icon://show",add:"sap-icon://add",move:"sap-icon://move",rename:"sap-icon://edit",combinesplit:"sap-icon://combine",remove:"sap-icon://less"};function _(){var p=this.getPopover();if(p&&p.isOpen()){p.close();}}var i=C.extend("sap.ui.rta.util.changeVisualization.ChangeVisualization",{metadata:{library:"sap.ui.rta",properties:{rootControlId:{type:"string"},isActive:{type:"boolean",defaultValue:false}},aggregations:{popover:{type:"sap.m.Popover",multiple:false}}},constructor:function(){this._oChangeIndicatorRegistry=new f({commandCategories:V});C.prototype.constructor.apply(this,arguments);this._oTextBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");this.setModel(new R({bundle:this._oTextBundle}),"i18n");this._oChangeVisualizationModel=new c({active:this.getIsActive()});this._oChangeVisualizationModel.setDefaultBindingMode("OneWay");this._sSelectedCommandCategory="all";this._bSetModeChanged=false;this._fnOnClickHandler=_.bind(this);}});i.prototype.setRootControlId=function(r){if(this.getRootControlId()&&this.getRootControlId()!==r){this._reset();}this.setProperty("rootControlId",r);this._oChangeIndicatorRegistry.setRootControlId(r);};i.prototype._getComponent=function(){return b.getAppComponentForControl(E.getElementInstance(this.getRootControlId()));};i.prototype.setIsActive=function(A){if(A===this.getIsActive()){return;}this.setProperty("isActive",A);if(this._oChangeVisualizationModel){this._updateVisualizationModel({active:A});}};i.prototype.exit=function(){this._oChangeIndicatorRegistry.destroy();this._toggleRootOverlayClickHandler(false);};i.prototype._reset=function(){this._oChangeIndicatorRegistry.reset();};i.prototype._updateVisualizationModelMenuData=function(){var v=this._oChangeVisualizationModel.getData().visualizedChanges;var H=[];var r=this._oChangeIndicatorRegistry.getChanges();r.forEach(function(o){var k=v.find(function(k){return o.change.getId()===k.id;});if(!k&&!o.dependent){H.push(o);}});var j=Object.keys(V).map(function(s){var t=this._getCommandCategoryLabel(s,this._getChangesForCommandCategory(s,v).length);return{key:s,count:this._getChangesForCommandCategory(s,v).length,title:t,icon:h[s]};}.bind(this));j.unshift({key:g,count:this._getChangesForCommandCategory(g,v).length,title:this._getCommandCategoryLabel(g,this._getChangesForCommandCategory(g,v).length),icon:h[g]});this._updateVisualizationModel({commandCategories:j,hiddenChanges:H,popupInfoMessage:this._oTextBundle.getText("MSG_CHANGEVISUALIZATION_HIDDEN_CHANGES_INFO",[H.length])});};i.prototype._getChangesForCommandCategory=function(s,j){return j.filter(function(o){return s===g?o.commandCategory!==undefined:s===o.commandCategory;});};i.prototype._getCommandCategoryLabel=function(s,j){var l="TXT_CHANGEVISUALIZATION_OVERVIEW_"+s.toUpperCase();return this._oTextBundle.getText(l,[j]);};i.prototype._getCommandCategoryButton=function(s){var B="BTN_CHANGEVISUALIZATION_OVERVIEW_"+s.toUpperCase();return this._oTextBundle.getText(B);};i.prototype.openChangeCategorySelectionPopover=function(o){if(!this._oToolbarButton){this._oToolbarButton=sap.ui.getCore().byId(o.getParameter("id"));}var p=this.getPopover();if(!p){F.load({name:"sap.ui.rta.util.changeVisualization.ChangeIndicatorCategorySelection",id:this._getComponent().createId("changeVisualization_changesListPopover"),controller:this}).then(function(p){this._oToolbarButton.addDependent(p);p.setModel(this._oChangeVisualizationModel,"visualizationModel");p.openBy(this._oToolbarButton);this.setPopover(p);}.bind(this));return;}if(p.isOpen()){p.close();}else{p.openBy(this._oToolbarButton);}};i.prototype.onCommandCategorySelection=function(o){var s=o.getSource().getBindingContext("visualizationModel").getObject().key;this._selectCommandCategory(s);};i.prototype._selectCommandCategory=function(s){this._sSelectedCommandCategory=s;var j=this._getCommandCategoryButton(s);this._updateVisualizationModel({commandCategory:s,commandCategoryText:j});this._updateChangeIndicators();this._setFocusedIndicator();};i.prototype._getCommandForChange=function(o){var s=o.getDefinition().support.command;if(s){return s;}var j=this._getComponent();var S=J.bySelector(o.getSelector(),j);var l=o.getDependentSelectorList().slice(-1)[0];var k=J.bySelector(l,j);function m(n,A){var p=n.getElement();var s=n.getDesignTimeMetadata().getCommandName(o.getChangeType(),p,A);if(s){return s;}var q=n.getParentElementOverlay();var r=n.getParentAggregationOverlay();if(n.getElement().getId()===S.getId()||!q){return undefined;}return m(q,r&&r.getAggregationName());}return S&&k&&m(O.getOverlay(k));};i.prototype._collectChanges=function(){var o=this._getComponent();var p={selector:o,invalidateCache:false,currentLayer:L.CUSTOMER,includeDirtyChanges:true,onlyCurrentVariants:true};return P._getUIChanges(p);};i.prototype._updateChangeRegistry=function(){return this._collectChanges().then(function(j){var r=this._oChangeIndicatorRegistry.getChangeIds();var o=j.filter(function(l){return l.getFileType()==="change";}).reduce(function(l,m){l[m.getId()]=m;return l;},{});var k=Object.keys(o);d(r,k).forEach(function(s){this._oChangeIndicatorRegistry.removeChange(s);}.bind(this));var p=[];d(k,r).forEach(function(s){var l=o[s];var m=this._getCommandForChange(l);p.push(this._oChangeIndicatorRegistry.registerChange(l,m));}.bind(this));return Promise.all(p);}.bind(this));};i.prototype.selectChange=function(o){var s=o.getParameter("changeId");this._selectChange(s);};i.prototype._selectChange=function(s){var D=this._oChangeIndicatorRegistry.getChange(s).visualizationInfo.dependentElementIds;D.forEach(function(j){var o=O.getOverlay(j).getDomRef();o.scrollIntoViewIfNeeded();o.classList.add("sapUiRtaChangeIndicatorDependent");o.addEventListener("animationend",function(){o.classList.remove("sapUiRtaChangeIndicatorDependent");},{once:true});});};i.prototype._updateVisualizationModel=function(D){this._oChangeVisualizationModel.setData(Object.assign({},this._oChangeVisualizationModel.getData(),D));};i.prototype._updateChangeIndicators=function(){var s=this._oChangeIndicatorRegistry.getChangeIndicatorData();var I={};var v=[];Object.keys(s).forEach(function(S){var r=this._filterRelevantChanges(s[S]);var o=O.getOverlay(S);if(!o){r.some(function(m){var n=O.getOverlay(m.affectedElementId);var p=n&&n.getRelevantContainer();if(p){o=O.getOverlay(p);return true;}return false;});}if(!o||!o.getDomRef()||!o.isVisible()){return undefined;}var j=o.getDomRef().getClientRects()[0]||{left:0,top:0};r.forEach(function(m){v.push(m);});I[S]={posX:parseInt(j.left),posY:parseInt(j.top),changes:r};var k=this._oChangeIndicatorRegistry.getChangeIndicator(S);var l=o.getId();if(!k){this._createChangeIndicator(o,S);}else if(k.getOverlayId()!==l){k.setOverlayId(l);}return undefined;}.bind(this));if(!a(I,this._oChangeVisualizationModel.getData().content)||!a(v,this._oChangeVisualizationModel.getData().visualizedChanges)){this._updateVisualizationModel({content:I,visualizedChanges:v});}};i.prototype._filterRelevantChanges=function(j){if(!Array.isArray(j)){return j;}var r=this._oChangeVisualizationModel.getData();return j.filter(function(o){return(!o.dependent&&o.commandCategory&&(r.commandCategory===g||r.commandCategory===o.commandCategory));});};i.prototype._createChangeIndicator=function(o,s){var j=new e({changes:"{changes}",posX:"{posX}",posY:"{posY}",visible:"{= ${/active} && (${changes} || []).length > 0}",overlayId:o.getId(),selectorId:s,selectChange:this.selectChange.bind(this)});j.setModel(this._oChangeVisualizationModel);j.bindElement("/content/"+s);j.setModel(this.getModel("i18n"),"i18n");this._oChangeIndicatorRegistry.registerChangeIndicator(s,j);};i.prototype._setFocusedIndicator=function(){sap.ui.getCore().applyChanges();var v=this._oChangeIndicatorRegistry.getChangeIndicators().filter(function(I){return I.getVisible();}).sort(function(I,o){var D=I.getPosY()-o.getPosY();var j=I.getPosX()-o.getPosX();return D||j;});if(v.length===0){return;}v.forEach(function(I,j){I.getDomRef().tabIndex=j+2;});v[0].focus();};i.prototype._toggleRootOverlayClickHandler=function(j){var r=this.oRootOverlay&&this.oRootOverlay.getDomRef();if(r){if(j){r.addEventListener("click",this._fnOnClickHandler,{capture:true});}else{r.removeEventListener("click",this._fnOnClickHandler,{capture:true});}}};i.prototype.triggerModeChange=function(r,t){this.oMenuButton=t.getControl("toggleChangeVisualizationMenuButton");this.oRootOverlay=O.getOverlay(r);if(this.getIsActive()){this.setIsActive(false);this._toggleRootOverlayClickHandler(false);return;}this._toggleRootOverlayClickHandler(true);if(!this.getRootControlId()){this.setRootControlId(r);}this.setIsActive(true);this._updateChangeRegistry().then(function(){this._selectCommandCategory(this._sSelectedCommandCategory);this._updateVisualizationModelMenuData();t.setModel(this._oChangeVisualizationModel,"visualizationModel");}.bind(this));};return i;});
