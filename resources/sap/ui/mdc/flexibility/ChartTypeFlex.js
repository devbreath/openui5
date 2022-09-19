/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/flexibility/Util"],function(U){"use strict";var C={};var s=function(c,o,p){var m=p.modifier;return Promise.resolve().then(m.getProperty.bind(m,o,"chartType")).then(function(O){c.setRevertData(O);m.setProperty(o,"chartType",c.getContent().chartType);});};var r=function(c,o,p){p.modifier.setProperty(o,"chartType",c.getRevertData());c.resetRevertData();};C.setChartType=U.createChangeHandler({apply:s,revert:r});return C;});
