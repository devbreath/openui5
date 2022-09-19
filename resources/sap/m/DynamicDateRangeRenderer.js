/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var D={apiVersion:2};D.render=function(r,c){r.openStart("div",c);r.class("sapMDynamicDateRange");if(c.getHideInput()){r.class("sapMDDRHiddenInput");}r.openEnd();r.renderControl(c._oInput);r.close("div");};return D;});
