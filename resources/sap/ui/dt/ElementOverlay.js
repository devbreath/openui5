/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/dt/Overlay","sap/ui/dt/OverlayRegistry","sap/ui/dt/OverlayUtil","sap/ui/dt/ControlObserver","sap/ui/dt/ManagedObjectObserver","sap/ui/dt/ElementDesignTimeMetadata","sap/ui/dt/ElementUtil","sap/ui/dt/DOMUtil","sap/ui/dt/Util","sap/ui/core/Control","sap/ui/thirdparty/jquery","sap/base/Log","sap/base/util/isPlainObject","sap/base/util/merge","sap/base/util/restricted/_intersection","sap/base/util/restricted/_max"],function(e,t,i,r,a,s,n,o,l,d,jQuery,g,h,p,u,f){"use strict";var c="sapUiDtOverlayScrollContainer";var y=e.extend("sap.ui.dt.ElementOverlay",{metadata:{library:"sap.ui.dt",associations:{editableByPlugins:{type:"any[]",multiple:true,singularName:"editableByPlugin"}},aggregations:{aggregationBindingTemplateOverlays:{type:"sap.ui.dt.Overlay",multiple:true,defaultValue:[]}},properties:{selected:{type:"boolean",defaultValue:false},selectable:{type:"boolean",defaultValue:false},movable:{type:"boolean",defaultValue:false},editable:{type:"boolean",defaultValue:false},relevantOverlays:{type:"any[]",defaultValue:[]},metadataScope:{type:"string"},ignoreEnterKeyUpOnce:{type:"boolean",defaultValue:false}},events:{selectionChange:{parameters:{selected:{type:"boolean"}}},movableChange:{parameters:{movable:{type:"boolean"}}},selectableChange:{parameters:{selectable:{type:"boolean"}}},editableChange:{parameters:{editable:{type:"boolean"}}},elementModified:{parameters:{type:"string",name:"string",value:"any",oldValue:"any",target:"sap.ui.core.Element"}},elementDestroyed:{parameters:{targetId:"string"}}}},constructor:function(){this._aMetadataEnhancers=[];e.apply(this,arguments)}});y.prototype.asyncInit=function(){return(this.getDesignTimeMetadata()?Promise.resolve():this._loadDesignTimeMetadata()).then(function(){this.attachEvent("elementModified",function(e){var t=e.getParameters();var i=t.name;if(t.type==="propertyChanged"){if(i==="visible"){this.setRelevantOverlays([])}}else if(i){this.setRelevantOverlays([])}},this);this._initMutationObserver();this._initControlObserver()}.bind(this))};y.prototype._updateScrollContainer=function(e){if(this.getShouldBeDestroyed()||this.bIsDestroyed){return}var t=e.index;var i=this.getScrollContainerById(t);var r=this.getScrollContainers(true)[t];var a=[].concat(r.aggregations);var s=i.find(">:not(.sapUiDtDummyScrollContainer)").toArray();s.forEach(function(e){var t=e.getAttribute("data-sap-ui-dt-aggregation");if(r.aggregations.includes(t)){a.splice(a.indexOf(t),1)}else{i.get(0).removeChild(e);o.appendChild(this.getChildrenDomRef(),e)}}.bind(this));a.forEach(function(e){var t=this.getAggregationOverlay(e).getDomRef();this.getChildrenDomRef().removeChild(t);o.appendChild(i.get(0),t)}.bind(this))};y.prototype._onRootChanged=function(e){var t=e.getParameter("value");this._subscribeToMutationObserver(t)};y.prototype._initMutationObserver=function(){this._subscribeToMutationObserver(this.isRoot());this.attachEvent("isRootChanged",this._onRootChanged,this)};y.prototype._subscribeToMutationObserver=function(t){var i=e.getMutationObserver();var r=this.getAssociatedDomRef();this._sObservableNodeId=r&&r.get(0)&&r.get(0).id;if(this._sObservableNodeId){i.registerHandler(this._sObservableNodeId,this._domChangedCallback.bind(this),t);if(r.get(0).shadowRoot){i.addNode(r.get(0).shadowRoot)}}else if(t){g.error("sap.ui.dt.ElementOverlay#_subscribeToMutationObserver: please provide a root control with proper domRef and id to ensure that RTA is working properly")}};y.prototype._unsubscribeFromMutationObserver=function(){if(this._sObservableNodeId){var t=e.getMutationObserver();t.deregisterHandler(this._sObservableNodeId);delete this._sObservableNodeId}};y.prototype._initControlObserver=function(){if(this.getElement()instanceof d){this._oObserver=new r({target:this.getElement(),aggregations:this.getAggregationNames()})}else{this._oObserver=new a({target:this.getElement(),aggregations:this.getAggregationNames()})}this._oObserver.attachModified(this._onElementModified,this);this._oObserver.attachDestroyed(this._onElementDestroyed,this)};y.prototype._destroyControlObserver=function(){if(this._oObserver){this._oObserver.destroy()}};y.prototype._getAttributes=function(){return p({},e.prototype._getAttributes.apply(this,arguments),{"data-sap-ui-dt-for":this.getElement().getId(),draggable:this.getMovable()})};y.prototype.render=function(){this.addStyleClass("sapUiDtElementOverlay");return e.prototype.render.apply(this,arguments)};y.prototype.exit=function(){this._unsubscribeFromMutationObserver();this._destroyControlObserver();if(this._iApplyStylesRequest){window.cancelAnimationFrame(this._iApplyStylesRequest)}e.prototype.exit.apply(this,arguments)};y.prototype._loadDesignTimeMetadata=function(){return this.getElement().getMetadata().loadDesignTime(this.getElement(),this.getMetadataScope()).then(function(e){var t=this.getElement();if(!t||t.bIsDestroyed){throw l.createError("ElementOverlay#loadDesignTimeMetadata","Can't set metadata to overlay which element has been destroyed already")}this.setDesignTimeMetadata(e)}.bind(this)).catch(function(e){throw l.propagateError(e,"ElementOverlay#loadDesignTimeMetadata",l.printf("Can't load designtime metadata data for overlay with id='{1}', element id='{2}': {3}",this.getId(),this.getAssociation("element"),l.wrapError(e).message))}.bind(this))};y.prototype._setPosition=function(t,i,r,a){e.prototype._setPosition.apply(this,arguments);this.getScrollContainers().forEach(function(t,i){var r=this.getDesignTimeMetadata().getAssociatedDomRef(this.getElement(),t.domRef)||jQuery();var s=this.getScrollContainerById(i);if(r.length){var n=r.get(0);var l=o.getGeometry(n);this._setSize(s,l);e.prototype._setPosition.call(this,s,l,this.$());this._handleOverflowScroll(l,s,this,a);this._setZIndex(l,s);this._setClipPath(s,r)}else{s.css("display","none")}},this)};y.prototype._applySizes=function(){return e.prototype._applySizes.apply(this,arguments).then(function(){this._sortChildren(this.getChildrenDomRef());if(!this.bIsDestroyed){this.getScrollContainers().forEach(function(e,t){var i=this.getDesignTimeMetadata().getAssociatedDomRef(this.getElement(),e.domRef)||jQuery();var r=this.getScrollContainerById(t);if(i.length){this._sortChildren(r.get(0))}},this)}}.bind(this))};y.prototype._sortChildren=function(e){function t(e,t){var i=o.getGeometry(e);var r=o.getGeometry(t);var a=i&&i.position;var s=r&&r.position;if(a&&s){var n=a.top+i.size.height;var l=s.top+r.size.height;if(a.top<s.top){if(n>=l&&s.left<a.left){return 1}return-1}else if(a.top===s.top){if(a.left===s.left){if(i.size.height<r.size.height||i.size.width<r.size.width){return-1}else if(i.size.height>r.size.height||i.size.width>r.size.width){return 1}return 0}else if(a.left<s.left){return-1}return 1}else if(n<=l&&s.left>a.left){return-1}return 1}return 0}var i=jQuery(e).find(">:not(.sapUiDtDummyScrollContainer)").toArray();var r=i.slice().sort(t);var a=i.some(function(e,t){return e!==r[t]});if(a){r.forEach(function(t){o.appendChild(e,t)})}};y.prototype.placeInOverlayContainer=function(){if(this._bInit){if(this.isRoot()){if(!this.isRendered()){e.getOverlayContainer().append(this.render());this.applyStyles()}else{g.error("sap.ui.dt.ElementOverlay: overlay is already rendered and can't be placed in overlay container. Isn't it already there?")}}else{g.error("sap.ui.dt.ElementOverlay: it's not possible to place overlay inside overlay container while it's part of some hierarchy")}}else{g.error('sap.ui.dt.ElementOverlay: overlay is not ready yet. Please wait until "init" event happens')}};y.prototype.setDesignTimeMetadata=function(t){var i=this.getDesignTimeMetadata();var r;if(typeof t==="function"){if(!i){this._aMetadataEnhancers=this._aMetadataEnhancers.concat(t)}else{i.setData(t(p({},i.getData())));return}}else if(t instanceof s){i=t}else if(h(t)){r=t;var a;while(a=this._aMetadataEnhancers.shift()){r=a.call(this,r)}i=new s({data:r})}if(i){e.prototype.setDesignTimeMetadata.call(this,i)}};y.prototype.getScrollContainers=function(e){return this.getDesignTimeMetadata().getScrollContainers(this.getElement(),e,this._updateScrollContainer.bind(this))};y.prototype._renderChildren=function(){var t=e.prototype._renderChildren.apply(this,arguments);this.getScrollContainers().forEach(function(e,i){var r=jQuery("<div></div>",{class:c,"data-sap-ui-dt-scrollContainerIndex":i});if(e.aggregations){u(e.aggregations,this.getAggregationNames()).forEach(function(e){var a=this.getAggregationOverlay(e);var s=t.indexOf(a.$());a.setScrollContainerId(i);r.append(t[s]);t.splice(s,1)},this)}t.push(r)},this);return t};y.prototype.getScrollContainerById=function(e){return jQuery(this.getChildrenDomRef()).find(">."+c+'[data-sap-ui-dt-scrollcontainerindex="'+e+'"]')};y.prototype.getAssociatedDomRef=function(){var e=this.getDesignTimeMetadata();var t=e.getDomRef();var i=e.getAssociatedDomRef(this.getElement(),t);if(!i){i=n.getDomRef(this.getElement())}if(i){return jQuery(i)}return undefined};y.prototype.setSelectable=function(e){e=!!e;if(e!==this.isSelectable()){if(!e){this.setSelected(false)}this.toggleStyleClass("sapUiDtOverlaySelectable",e);this.setProperty("selectable",e);this.fireSelectableChange({selectable:e})}this.setFocusable(e);return this};y.prototype.setSelected=function(e){e=!!e;if(this.isSelectable()&&e!==this.isSelected()){this.setProperty("selected",e);this.toggleStyleClass("sapUiDtOverlaySelected",e);var r=i.getClosestBoundControl(this);if(r.overlayId){var a=t.getOverlay(r.overlayId);v(r,a)}this.fireSelectionChange({selected:e})}return this};function v(e,t,i){i=i===undefined?e.stack.length-1:i;var r=e.stack[i];var a=i===0;var s=e.stack.length===1;if(r){t.getChildren().forEach(function(t){if(t.getAggregationName()===r.aggregation){t.getChildren().some(function(t,n){if(a&&s){t.toggleStyleClass("sapUiDtOverlayHighlighted")}else if(a&&n===r.index){t.toggleStyleClass("sapUiDtOverlayHighlighted");return true}else if(!a){v(e,t,i-1)}return undefined})}})}}y.prototype.setMovable=function(e){e=!!e;if(this.getMovable()!==e){this.toggleStyleClass("sapUiDtOverlayMovable",e);this.setProperty("movable",e);this.fireMovableChange({movable:e});this.$()[e?"attr":"removeAttr"]("draggable",e)}return this};y.prototype.setEditable=function(e){e=!!e;if(this.getEditable()!==e){this.toggleStyleClass("sapUiDtOverlayEditable",e);this.setProperty("editable",e);this.fireEditableChange({editable:e})}return this};y.prototype.getAggregationNames=function(){var e=this.getElement();var t=this.getDesignTimeMetadata();var i=e.getMetadata().getAllAggregations();return[].concat(Object.keys(i),Object.keys(t.getAggregations())).filter(function(i,r,a){return r===a.indexOf(i)&&!t.isAggregationIgnored(e,i)})};y.prototype._onChildAdded=function(e){var t=e.getSource();if(this.isRendered()&&!t.isRendered()){var i=l.isInteger(t.getScrollContainerId())?this.getScrollContainerById(t.getScrollContainerId()):jQuery(this.getChildrenDomRef());i.append(t.render())}};y.prototype.addChild=function(t){t.detachChildAdded(this._onChildAdded,this);t.attachChildAdded(this._onChildAdded,this);e.prototype.addChild.apply(this,arguments)};y.prototype._onElementModified=function(e){if(e.getParameters().type==="afterRendering"){this._subscribeToMutationObserver(this.isRoot());this._oScrollbarSynchronizers.forEach(function(e){e.refreshListeners()})}this.fireElementModified(e.getParameters())};y.prototype._domChangedCallback=function(e){e.targetOverlay=this;if(this.isReady()){if(this._iApplyStylesRequest){window.cancelAnimationFrame(this._iApplyStylesRequest)}this._iApplyStylesRequest=window.requestAnimationFrame(function(){this.getGeometry(true);e.bSkipForceCalculation=true;this.fireApplyStylesRequired(e);delete this._iApplyStylesRequest}.bind(this))}};y.prototype._onElementDestroyed=function(e){var t=e.getSource().getTarget();this.fireElementDestroyed({targetId:t});if(this._bInit){this.destroy()}else{this._bShouldBeDestroyed=true}};y.prototype.getAggregationOverlays=function(){return this.getAggregation("children")||[]};y.prototype.getAggregationOverlay=function(e,t){var i="get"+(t||"Children");return this[i]().filter(function(t){return t.getAggregationName()===e}).pop()};y.prototype.getParentElementOverlay=function(){var e=this.getParentAggregationOverlay();if(e){return e.getParent()}return undefined};y.prototype.getParentAggregationOverlay=function(){var e=this.getParent();return e instanceof sap.ui.dt.AggregationOverlay?e:null};y.prototype.isSelected=function(){return this.getSelected()};y.prototype.isSelectable=function(){return this.getSelectable()};y.prototype.isMovable=function(){return this.getMovable()};y.prototype.isEditable=function(){return this.getEditable()};y.prototype._getElementInstanceVisible=function(){var e=this.getElement();if(e){var t=this.getGeometry();return t&&t.visible}return false};y.prototype.getElementVisibility=function(){var e=this.getElement();if(e instanceof sap.ui.core.Control){return e.getVisible()}var t=this.getDesignTimeMetadata();var i=t&&t.getData().isVisible;if(!i){return undefined}return i(this.getElement())};y.prototype.isElementVisible=function(){var e=this.getElement();var t=false;var i=this.getDesignTimeMetadata();var r=i.getData();if(i.isIgnored(e)){t=false}else if(typeof r.isVisible==="function"){t=r.isVisible(e)}else{var a=this.getGeometry();if(a){t=a.visible}else if(e instanceof d){t=!!e.getDomRef()&&e.getVisible()}}return t};y.prototype.isVisible=function(){return e.prototype.isVisible.apply(this,arguments)&&this.isElementVisible()};y.prototype.getRelevantContainer=function(e){var t=this.getDesignTimeMetadata();if(t&&t.getData().relevantContainer){return t.getData().relevantContainer}else if(e){return this.getElement()}var i=this.getParentElementOverlay();return i?i.getElement():undefined};y.prototype._hasSameSize=function(e,t){var i=this.getScrollContainers();var r;if(i.length){r=f(i.map(function(e,i){var r=o.getGeometry(this.getScrollContainerById(i).get(0));return r.size[t]},this))}else{r=this.getGeometry().size[t]}return e.size[t]===r};return y});
//# sourceMappingURL=ElementOverlay.js.map