/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/editor/fields/viz/VizBase","sap/m/SegmentedButton","sap/m/SegmentedButtonItem","sap/base/util/merge"],function(V,S,a,m){"use strict";var b=V.extend("sap.ui.integration.editor.fields.viz.ShapeSelect",{metadata:{library:"sap.ui.integration",properties:{value:{type:"string",defaultValue:"Circle"}}},renderer:V.getMetadata().getRenderer()});b.prototype.onInit=function(){this._oControl=new S({items:[new a({icon:"sap-icon://circle-task",key:"Circle"}),new a({icon:"sap-icon://border",key:"Square"})]});};b.prototype.applyStyle=function(r){r.addClass("sapUiIntegrationShapeSelect");};b.prototype.bindPropertyToControl=function(p,B){if(p==="editable"){var c=m({},B);this._oControl.bindProperty("enabled",c);}if(p==="value"){var c=m({},B);this._oControl.bindProperty("selectedKey",c);}};return b;});
