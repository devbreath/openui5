/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/WebComponent","./library","sap/ui/core/EnabledPropagator","./thirdparty/SegmentedButtonItem"],function(e,t,a){"use strict";var i=t.ButtonDesign;var n=e.extend("sap.ui.webc.main.SegmentedButtonItem",{metadata:{library:"sap.ui.webc.main",tag:"ui5-segmented-button-item-ui5",interfaces:["sap.ui.webc.main.ISegmentedButtonItem"],properties:{accessibilityAttributes:{type:"object",defaultValue:{}},accessibleName:{type:"string"},design:{type:"sap.ui.webc.main.ButtonDesign",defaultValue:i.Default},enabled:{type:"boolean",defaultValue:true,mapping:{type:"attribute",to:"disabled",formatter:"_mapEnabled"}},icon:{type:"string",defaultValue:""},iconEnd:{type:"boolean",defaultValue:false},pressed:{type:"boolean",defaultValue:false},submits:{type:"boolean",defaultValue:false},text:{type:"string",defaultValue:"",mapping:"textContent"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,mapping:{type:"property",to:"accessibleNameRef",formatter:"_getAriaLabelledByForRendering"}}},events:{click:{parameters:{}}}}});a.call(n.prototype);return n});
//# sourceMappingURL=SegmentedButtonItem.js.map