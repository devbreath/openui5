/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/table/columnmenu/QuickActionBase"],function(Q){"use strict";var a=Q.extend("sap.m.table.columnmenu.QuickActionContainer",{metadata:{library:"sap.m",aggregations:{quickActions:{type:"sap.m.table.columnmenu.QuickActionBase"}}}});a.prototype.getEffectiveQuickActions=function(){return this.getQuickActions().reduce(function(q,o){return q.concat(o.getEffectiveQuickActions());},[]);};return a;});
