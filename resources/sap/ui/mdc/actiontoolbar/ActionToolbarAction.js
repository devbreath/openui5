/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/mdc/actiontoolbar/ActionToolbarActionRenderer","sap/ui/mdc/enum/ActionToolbarActionAlignment"],function(C,A,a){"use strict";var b=C.extend("sap.ui.mdc.actiontoolbar.ActionToolbarAction",{metadata:{library:"sap.ui.mdc",designtime:"sap/ui/mdc/designtime/actiontoolbar/ActionToolbarAction.designtime",interfaces:["sap.m.IOverflowToolbarContent"],properties:{layoutInformation:{type:"object",defaultValue:{aggregationName:"end",alignment:a.Begin}}},defaultAggregation:"action",aggregations:{action:{type:"sap.ui.core.Control",multiple:false}},renderer:A}});b.prototype.getOverflowToolbarConfig=function(){var c={canOverflow:true};c.onBeforeEnterOverflow=this._onBeforeEnterOverflow.bind(this);c.onAfterExitOverflow=this._onAfterExitOverflow.bind(this);return c;};b.prototype._onBeforeEnterOverflow=function(){if(this.getParent()){this.getParent()._updateSeparators();}};b.prototype._onAfterExitOverflow=function(){if(this.getParent()){this.getParent()._updateSeparators();}};b.prototype.getLabel=function(){var o=this.getAction();return o&&o.getText?o.getText():this.getId();};return b;});
