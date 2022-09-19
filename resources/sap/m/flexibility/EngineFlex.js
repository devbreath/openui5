/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/HideControl","sap/ui/fl/changeHandler/UnhideControl","sap/m/p13n/handler/xConfigHandler"],function(H,U,x){"use strict";return{"hideControl":"default","unhideControl":"default",createItem:{layers:{USER:true},changeHandler:U},addItem:x.createHandler({aggregationBased:true,property:"visible"}),removeItem:x.createHandler({aggregationBased:true,property:"visible"}),moveItem:x.createHandler({aggregationBased:true,property:"position"}),addSort:x.createHandler({property:"sortConditions"}),removeSort:x.createHandler({property:"sortConditions"}),addGroup:x.createHandler({property:"groupConditions"}),removeGroup:x.createHandler({property:"groupConditions"})};},true);
