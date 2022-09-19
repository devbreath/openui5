/* !
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/restricted/_pick","sap/base/util/ObjectPath","sap/ui/core/Core","sap/ui/fl/apply/_internal/flexObjects/AppDescriptorChange","sap/ui/fl/apply/_internal/flexObjects/CompVariant","sap/ui/fl/apply/_internal/flexObjects/ControllerExtensionChange","sap/ui/fl/apply/_internal/flexObjects/FlexObject","sap/ui/fl/apply/_internal/flexObjects/FlVariant","sap/ui/fl/Layer","sap/ui/fl/Utils"],function(_,O,C,A,a,b,F,c,L,U){"use strict";var d={BASE_FLEX_OBJECT:F,COMP_VARIANT_OBJECT:a,FL_VARIANT_OBJECT:c,CONTROLLER_EXTENSION:b,APP_DESCRIPTOR_CHANGE:A};function g(n){if(n.fileType==="variant"){return d.COMP_VARIANT_OBJECT;}else if(n.fileType==="ctrl_variant"){return d.FL_VARIANT_OBJECT;}else if(n.changeType==="codeExt"){return d.CONTROLLER_EXTENSION;}else if(n.appDescriptorChange){return d.APP_DESCRIPTOR_CHANGE;}return d.BASE_FLEX_OBJECT;}function e(p){var s=p.type||p.changeType;var h=p.fileName||p.id||U.createDefaultFileName(s);return{id:h,layer:p.layer,content:p.content,texts:p.texts,supportInformation:{service:p.ODataService,command:p.command,compositeCommand:p.compositeCommand,generator:p.generator,sapui5Version:C.getConfiguration().getVersion().toString(),sourceSystem:p.sourceSystem,sourceClient:p.sourceClient,originalLanguage:p.originalLanguage,user:p.user},flexObjectMetadata:{changeType:s,reference:p.reference,packageName:p.packageName}};}var f={};f.createFromFileContent=function(o,h){var n=Object.assign({},o);var i=h||g(n);if(!i){throw new Error("Unknown file type");}n.support=Object.assign({generator:"FlexObjectFactory.createFromFileContent",sapui5Version:C.getConfiguration().getVersion().toString()},n.support||{});var m=i.getMappingInfo();var j=F.mapFileContent(n,m);var p=Object.entries(j).reduce(function(P,l){O.set(l[0].split('.'),l[1],P);return P;},{});var k=new i(p);return k;};f.createAppDescriptorChange=function(p){p.compositeCommand=p.compositeCommand||p.support&&p.support.compositeCommand;var P=e(p);return new A(P);};f.createControllerExtensionChange=function(p){p.generator=p.generator||"FlexObjectFactory.createControllerExtensionChange";p.changeType="codeExt";p.content={codeRef:p.codeRef};var P=e(p);P.flexObjectMetadata.moduleName=p.moduleName;P.controllerName=p.controllerName;return new b(P);};f.createFlVariant=function(p){p.generator=p.generator||"FlexObjectFactory.createFlVariant";var P=e(p);P.variantManagementReference=p.variantManagementReference;P.variantReference=p.variantReference;P.contexts=p.contexts;P.texts={variantName:{value:p.variantName,type:"XFLD"}};return new c(P);};f.createCompVariant=function(o){o.generator=o.generator||"FlexObjectFactory.createCompVariant";o.user=O.get("support.user",o);var m=e(o);m.variantId=o.variantId||m.id;m.contexts=o.contexts;m.favorite=o.favorite;m.persisted=o.persisted;m.persistencyKey=o.persistencyKey||O.get("selector.persistencyKey",o);if(o.layer===L.VENDOR||o.layer===L.CUSTOMER_BASE){m.favorite=true;}if(o.executeOnSelection!==undefined){m.executeOnSelection=o.executeOnSelection;}else{m.executeOnSelection=m.content&&(m.content.executeOnSelect||m.content.executeOnSelection);}return new a(m);};return f;});
