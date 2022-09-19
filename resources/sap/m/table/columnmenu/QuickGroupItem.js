/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./QuickActionItem"],function(Q){"use strict";var a=Q.extend("sap.m.table.columnmenu.QuickGroupItem",{metadata:{library:"sap.m",properties:{grouped:{type:"boolean",defaultValue:false}}}});a.prototype.setGrouped=function(g){this.setProperty("grouped",g);var q=this.getParent();if(q){q._updateContent();}};return a;});
