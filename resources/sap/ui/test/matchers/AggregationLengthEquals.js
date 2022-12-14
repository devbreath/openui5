/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/test/matchers/Matcher","sap/base/strings/capitalize"],function(M,c){"use strict";return M.extend("sap.ui.test.matchers.AggregationLengthEquals",{metadata:{publicMethods:["isMatching"],properties:{name:{type:"string"},length:{type:"int"}}},isMatching:function(C){var a=this.getName(),A=C["get"+c(a,0)];if(!A){this._oLogger.error("Control '"+C+"' does not have an aggregation called '"+a+"'");return false;}var v=A.call(C);var b=Array.isArray(v)?v:[v];var i=b.length;var e=this.getLength();var I=i===e;if(!I){this._oLogger.debug("Control '"+C+"' has "+i+" Objects in the aggregation '"+a+"' but it should have "+e);}return I;}});});
