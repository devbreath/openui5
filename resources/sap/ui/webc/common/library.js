/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/library","sap/ui/base/DataType","./Icons","./thirdparty/base/features/OpenUI5Support","./thirdparty/base/features/OpenUI5Enablement","./thirdparty/base/AssetRegistry","./thirdparty/base/CustomElementsScope","./thirdparty/base/CSP","./thirdparty/base/UI5Element"],function(e,t,s,i,a,r,n,o,p){"use strict";var u=sap.ui.getCore().initLibrary({name:"sap.ui.webc.common",version:"1.107.0",dependencies:["sap.ui.core"],noLibraryCSS:true,designtime:"sap/ui/webc/common/designtime/library.designtime",interfaces:[],types:[],controls:["sap.ui.webc.common.WebComponent"],elements:[],extensions:{}});n.setCustomElementsScopingSuffix("ui5");o.setUseLinks(!document.adoptedStyleSheets);o.setPreloadLinks(false);o.setPackageCSSRoot("@ui5/webcomponents-base",sap.ui.require.toUrl("sap/ui/webc/common/thirdparty/base/css/"));o.setPackageCSSRoot("@ui5/webcomponents-theming",sap.ui.require.toUrl("sap/ui/webc/common/thirdparty/theming/css/"));a.default.enrichBusyIndicatorSettings(p.default);return u});
//# sourceMappingURL=library.js.map