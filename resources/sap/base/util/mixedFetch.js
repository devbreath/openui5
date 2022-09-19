/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./fetch","sap/ui/base/SyncPromise"],function(f,S){"use strict";function m(r,i,s){var I;if(s===true){I={promiseImpl:S};}return f(r,i,I);}m.ContentTypes=f.ContentTypes;return m;});
