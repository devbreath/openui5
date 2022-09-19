/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/DataType","sap/ui/Global","sap/ui/core/library","sap/m/library","sap/f/library","sap/ui/unified/library","sap/ui/layout/library"],function(D){"use strict";var t=sap.ui.getCore().initLibrary({name:"sap.ui.integration",version:"1.105.1",dependencies:["sap.ui.core","sap.f","sap.m","sap.ui.unified","sap.ui.layout"],types:["sap.ui.integration.CardActionType","sap.ui.integration.CardDataMode","sap.ui.integration.CardMenuAction"],controls:["sap.ui.integration.widgets.Card","sap.ui.integration.cards.filters.FilterBar","sap.ui.integration.cards.Header","sap.ui.integration.cards.NumericHeader","sap.ui.integration.controls.ListContentItem"],elements:["sap.ui.integration.ActionDefinition","sap.ui.integration.Host"],customElements:{"card":"sap/ui/integration/customElements/CustomElementCard"}});t.CardActionType={Navigation:"Navigation",Submit:"Submit",Custom:"Custom",DateChange:"DateChange",MonthChange:"MonthChange",ShowCard:"ShowCard",HideCard:"HideCard"};t.CardDataMode={Active:"Active",Inactive:"Inactive",Auto:"Auto"};t.CardActionArea={None:"None",Content:"Content",ContentItem:"ContentItem",ActionsStrip:"ActionsStrip",ContentItemDetail:"ContentItemDetail",Header:"Header"};t.CardArea={Header:"Header",Filters:"Filters",Content:"Content"};t.AttributesLayoutType={OneColumn:"OneColumn",TwoColumns:"TwoColumns"};t.CardMenuAction=D.createType("sap.ui.integration.CardMenuAction",{isValid:function(v){var p=["type","text","icon","tooltip","buttonType","enabled","visible","action","parameters","target","url"];return Object.keys(v).every(function(k){return p.indexOf(k)!==-1;});}},"object");return t;});
