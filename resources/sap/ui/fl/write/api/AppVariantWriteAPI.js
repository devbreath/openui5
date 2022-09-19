/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/ChangesController","sap/ui/fl/write/_internal/SaveAs","sap/ui/fl/write/_internal/connectors/LrepConnector","sap/ui/fl/write/api/FeaturesAPI","sap/ui/fl/write/_internal/Versions"],function(C,S,L,F,V){"use strict";var _=function(f,p){if(!p.layer){return Promise.reject("Layer must be provided");}var o=C.getDescriptorFlexControllerInstance(p.selector);p.reference=o.getComponentName();p.url="/sap/bc/lrep";return L.appVariant[f](p);};var A={saveAs:function(p){if(!p.layer){return Promise.reject("Layer must be provided");}if(!p.id){return Promise.reject("App variant ID must be provided");}var f=C.getDescriptorFlexControllerInstance(p.selector);p.reference=f.getComponentName();return F.isVersioningEnabled(p.layer).then(function(v){if(v){p.parentVersion=V.getVersionsModel(p).getProperty("/displayedVersion");}return S.saveAs(p);});},deleteAppVariant:function(p){if(!p.layer){return Promise.reject("Layer must be provided");}var f=C.getDescriptorFlexControllerInstance(p.selector);p.id=f.getComponentName();return S.deleteAppVariant(p);},listAllAppVariants:function(p){if(!p.layer){return Promise.reject("Layer must be provided");}return _("list",p);},getManifest:function(p){if(!p.layer){return Promise.reject("Layer must be provided");}if(!p.appVarUrl){return Promise.reject("appVarUrl must be provided");}return L.appVariant.getManifest(p);},assignCatalogs:function(p){if(!p.layer){return Promise.reject("Layer must be provided");}if(!p.assignFromAppId){return Promise.reject("assignFromAppId must be provided");}if(!p.action){return Promise.reject("action must be provided");}return _("assignCatalogs",p);},unassignCatalogs:function(p){if(!p.layer){return Promise.reject("Layer must be provided");}if(!p.action){return Promise.reject("action must be provided");}return _("unassignCatalogs",p);}};return A;});
