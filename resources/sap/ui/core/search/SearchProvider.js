/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/Element',"sap/base/Log",'sap/ui/core/library'],function(E,L){"use strict";var S=E.extend("sap.ui.core.search.SearchProvider",{metadata:{"abstract":true,library:"sap.ui.core",properties:{icon:{type:"string",group:"Misc",defaultValue:null}}}});S.prototype.suggest=function(v,c){L.warning("sap.ui.core.search.SearchProvider is the abstract base class for all SearchProviders. Do not create instances of this class, but use a concrete sub class instead.");};return S;});
