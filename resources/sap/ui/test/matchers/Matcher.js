/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/test/_OpaLogger","sap/ui/base/ManagedObject"],function(_,M){"use strict";var a=M.extend("sap.ui.test.matchers.Matcher",{metadata:{publicMethods:["isMatching"]},constructor:function(){this._oLogger=_.getLogger(this.getMetadata().getName());return M.prototype.constructor.apply(this,arguments);},isMatching:function(c){return true;},_getApplicationWindow:function(){var O=sap.ui.require("sap/ui/test/Opa5");if(O){return O.getWindow();}else{return window;}}});return a;});
