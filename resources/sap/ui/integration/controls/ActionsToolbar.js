/*!
* OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["./ActionsToolbarRenderer","sap/base/strings/capitalize","sap/ui/core/Control","sap/m/library","sap/ui/core/library","sap/m/Button","sap/m/ActionSheet","sap/ui/base/ManagedObjectObserver","sap/ui/core/Core","sap/ui/integration/cards/actions/CardActions"],function(t,e,i,n,o,s,r,a,c,u){"use strict";var p=n.ButtonType;var g=o.aria.HasPopup;function h(t,e,i,n){return new Promise(function(o){var s;if(typeof i==="function"){s=i(n);if(s instanceof Promise){s.then(function(i){t.setProperty(e,i);o()});return}}else{s=i}t.setProperty(e,s);o()})}var l=i.extend("sap.ui.integration.controls.ActionsToolbar",{metadata:{library:"sap.ui.integration",properties:{},aggregations:{actionDefinitions:{type:"sap.ui.integration.ActionDefinition",multiple:true},_toolbar:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},_actionSheet:{type:"sap.m.ActionSheet",multiple:false,visibility:"hidden"}},events:{visibilityChange:{parameters:{visible:{type:"boolean"}}}}},renderer:t});l.prototype.init=function(){this.setAggregation("_actionSheet",new r);this._aActions=[];this._mActionObservers=new Map;this._oObserver=new a(this._observeActionsAggregation.bind(this));this._oObserver.observe(this,{aggregations:["actionDefinitions"]})};l.prototype.exit=function(){this._oCard=null;this._aActions=null;this._oObserver.disconnect();this._oObserver=null;this._mActionObservers.clear();this._mActionObservers=null};l.prototype.onBeforeRendering=function(){this._updateVisibility()};l.prototype.initializeContent=function(t){var e=this,i,n=[],o=[],s=this.getAggregation("_actionSheet"),r=t.getHostInstance(),a=t.getAggregation("_extension");if(r){o=o.concat(r.getActions()||[])}if(a){o=o.concat(a.getActions()||[])}this._aActions=o;o.forEach(function(t){i=e._createActionButton(t,false);n.push(i)});if(this._aButtons){this._aButtons.forEach(function(t){t.destroy()})}n.forEach(s.addButton,s);this._aButtons=n;this._refreshButtons().then(this._updateVisibility.bind(this))};l.prototype.setCard=function(t){this._oCard=t};l.prototype._open=function(){this._refreshButtons().then(function(){this.getAggregation("_actionSheet").openBy(this._getToolbar())}.bind(this))};l.prototype._getToolbar=function(){var t=this.getAggregation("_toolbar");if(!t){t=new s({id:this.getId()+"-overflowButton",icon:"sap-icon://overflow",type:p.Transparent,ariaHasPopup:g.Menu,press:function(t){this._open()}.bind(this)});this.setAggregation("_toolbar",t)}return t};l.prototype._refreshButtons=function(){var t=this._aActions,e=this._oCard,i=this._aButtons,n,o,s,r=[];for(s=0;s<t.length;s++){n=t[s];o=i[s];r.push(h(o,"enabled",n.enabled,e));r.push(h(o,"visible",n.visible,e))}return Promise.all(r)};l.prototype._createActionButton=function(t,e){var i=e?this._getActionConfig(t):t;var n=new s({icon:i.icon,text:i.text,tooltip:i.tooltip,type:i.buttonType,visible:e?i.visible:false,press:function(i){var n=e?this._getActionConfig(t):t;u.fireAction({card:this._oCard,host:this._oCard.getHostInstance(),action:n,parameters:n.parameters,source:i.getSource()})}.bind(this)});if(e){n.setEnabled(i.enabled)}return n};l.prototype._updateVisibility=function(){var t=this.getAggregation("_actionSheet").getButtons().some(function(t){return t.getVisible()});this.fireVisibilityChange({visible:t});this.setVisible(t)};l.prototype._getActionConfig=function(t){var i=["visible","enabled","icon","text","tooltip","parameters","buttonType","type"].reduce(function(i,n){i[n]=t["get"+e(n)]();return i},{});i.action=function(){t.firePress()};return i};l.prototype._observeActionsAggregation=function(t){var e=t.child;if(t.mutation==="insert"){var i=this._createActionButton(e,true);this.getAggregation("_actionSheet").insertButton(i,this.indexOfActionDefinition(e));e.setAssociation("_menuButton",i);var n=new a(this._observeSingleAction.bind(this));n.observe(e,{properties:true,aggregations:["tooltip"]});this._mActionObservers.set(e.getId(),n);this._updateVisibility()}else if(t.mutation==="remove"){c.byId(e.getAssociation("_menuButton")).destroy();this._mActionObservers.get(e.getId()).disconnect();this._mActionObservers.delete(e.getId())}};l.prototype._observeSingleAction=function(t){var i=t.object,n=t.name,o=c.byId(i.getAssociation("_menuButton")),s=t.current;if(["type","parameters"].indexOf(n)!==-1){return}if(t.type==="aggregation"){s=t.child}if(n==="buttonType"){n="type"}o["set"+e(n)](s);this._updateVisibility()};return l});
//# sourceMappingURL=ActionsToolbar.js.map