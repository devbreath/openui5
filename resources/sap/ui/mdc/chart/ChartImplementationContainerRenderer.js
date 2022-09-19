/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var C={apiVersion:2};C.CSS_CLASS="sapUiMDCChart";C.render=function(r,c){r.openStart("div",c);r.attr("id",c.getId());r.style("height","100%");r.style("width","100%");r.style("min-height","200px");r.openEnd();r.renderControl(c.getContent());r.close("div");};return C;},true);
