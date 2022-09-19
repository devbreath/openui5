/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./BaseController','sap/ui/mdc/p13n/P13nBuilder','sap/m/p13n/GroupPanel'],function(B,P,G){"use strict";var a=B.extend("sap.ui.mdc.p13n.subcontroller.GroupController");a.prototype.getStateKey=function(){return"groupLevels";};a.prototype.getUISettings=function(){return{tabText:sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc").getText("p13nDialog.TAB_Group"),title:sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc").getText("group.PERSONALIZATION_DIALOG_TITLE")};};a.prototype.getDelta=function(p){return B.prototype.getDelta.apply(this,arguments);};a.prototype.getAdaptationUI=function(p){var g=new G();var A=this.mixInfoAndState(p);var o=this.getAdaptationControl();if(o.isA("sap.ui.mdc.Table")&&o._getStringType()==="ResponsiveTable"){g.setQueryLimit(1);}g.setP13nData(A.items);this._oPanel=g;return Promise.resolve(g);};a.prototype.model2State=function(){var i=[];this._oPanel.getP13nData(true).forEach(function(I){if(I.grouped){i.push({name:I.name});}});return i;};a.prototype.getChangeOperations=function(){return{add:"addGroup",remove:"removeGroup",move:"moveGroup"};};a.prototype._getPresenceAttribute=function(){return"grouped";};a.prototype.mixInfoAndState=function(p){var i=this.getCurrentState();var I=P.arrayToMap(i);var c=this.getAdaptationControl();var A=c.getAggregateConditions?c.getAggregateConditions()||{}:{};var o=P.prepareAdaptationData(p,function(m,b){var e=I[b.name];m.grouped=!!e;m.position=e?e.position:-1;return!(b.groupable===false||A[b.name]);});P.sortP13nData({visible:"grouped",position:"position"},o.items);o.presenceAttribute=this._getPresenceAttribute();o.items.forEach(function(b){delete b.position;});return o;};return a;});
