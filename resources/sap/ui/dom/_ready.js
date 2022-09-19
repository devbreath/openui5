/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/SyncPromise"],function(S){"use strict";return function(){return new S(function(r,a){if(document.readyState!=="loading"){r();}else{var d=function(b){document.removeEventListener("DOMContentLoaded",d);r();};document.addEventListener("DOMContentLoaded",d);}});};});
