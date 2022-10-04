/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/dt/plugin/ElementMover","sap/ui/dt/OverlayUtil","sap/ui/dt/ElementUtil","sap/ui/rta/Utils","sap/ui/rta/command/CommandFactory","sap/ui/rta/plugin/Plugin","sap/ui/dt/OverlayRegistry"],function(e,t,n,r,a,i,o){"use strict";var s=e.extend("sap.ui.rta.plugin.RTAElementMover",{metadata:{library:"sap.ui.rta",properties:{commandFactory:{type:"any",defaultValue:a},movableTypes:{type:"string[]",defaultValue:["sap.ui.core.Element"]}},associations:{},events:{}}});s.prototype.init=function(){this.oBasePlugin=new i({commandFactory:this.getCommandFactory()})};s.prototype.exit=function(){this.oBasePlugin.destroy()};s.prototype.setCommandFactory=function(e){this.setProperty("commandFactory",e);this.oBasePlugin.setCommandFactory(e)};s.prototype.isEditable=function(e,t){var n=e.getElement();if(!this.isMovableType(n)){return Promise.resolve(false)}return this.checkMovable(e,t).then(function(t){e.setMovable(t);return t})};function l(e,t){var r=e.getDesignTimeMetadata();var a=e.getParentElementOverlay();var i=r.markedAsNotAdaptable();if(!r||!a||i){return Promise.resolve(false)}var s=e.getElement();if(n.isElementDirectTemplateChild(s)){return Promise.resolve(false)}var l=e.getRelevantContainer();var v=o.getOverlay(l);if(!v){return Promise.resolve(false)}return this.isMoveAvailableOnRelevantContainer(e).then(function(t){if(t){t=this.oBasePlugin.hasStableId(e)&&this.oBasePlugin.hasStableId(a)&&this.oBasePlugin.hasStableId(v)}return t}.bind(this)).then(function(n){if(n){return u.call(this,e,v,t)}return n}.bind(this))}function u(e,n,r){var a=t.findAllUniqueAggregationOverlaysInContainer(e,n);var i=a.map(function(t){return this.checkTargetZone(t,e,r).then(function(e){return e?t:undefined})}.bind(this));return Promise.all(i).then(function(e){e=e.filter(function(e){return!!e});if(e.length<1){return false}else if(e.length===1){var t=e[0].getChildren().filter(function(e){var t=e.getElement();return t&&t.getVisible()&&t.getParent()});return t.length>1}return true})}e.prototype._getMoveAction=function(e){var t;var n=e.getParentAggregationOverlay();if(n){t=n.getDesignTimeMetadata()}return t?t.getAction("move",e.getElement()):undefined};e.prototype.isMovableType=function(){return true};s.prototype.checkMovable=function(e,t){return l.call(this,e,t)};s.prototype.checkTargetZone=function(e,t,n){var a=t||this.getMovedOverlay();return r.checkTargetZone(e,a,this.oBasePlugin,n)};s.prototype.isMoveAvailableOnRelevantContainer=function(e){var t;var n=this._getMoveAction(e);if(n&&n.changeType){t=e.getRelevantContainer();var r=o.getOverlay(t);if(!this.oBasePlugin.hasStableId(r)){return Promise.resolve(false)}return this.oBasePlugin.hasChangeHandler(n.changeType,t)}return Promise.resolve(false)};s.prototype.isMoveAvailableForChildren=function(e){var t=e.getDesignTimeMetadata();var n=t.getAggregationNamesWithAction("move");var r=[];n.forEach(function(t){var n=e.getAggregationOverlay(t);if(n){var a=n.getChildren();var i=a.map(this.checkMovable.bind(this));r=r.concat(i)}else{r.push(Promise.resolve(false))}}.bind(this));return Promise.all(r).then(function(e){return e.some(function(e){return e})})};s.prototype.buildMoveCommand=function(){var e=this.getMovedOverlay();var n=e.getParentAggregationOverlay();var r=e.getElement();var a=this._getSource();var i=e.getRelevantContainer();var o=t.getParentInformation(e);var s=a.index;var l=o.index;var u=this._compareSourceAndTarget(a,o);if(u){return Promise.resolve()}delete a.index;delete o.index;var v=this.oBasePlugin.getVariantManagementReference(e);return this.getCommandFactory().getCommandFor(i,"Move",{movedElements:[{element:r,sourceIndex:s,targetIndex:l}],source:a,target:o},n.getDesignTimeMetadata(),v)};return s});
//# sourceMappingURL=RTAElementMover.js.map