/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/restricted/_pick","sap/ui/fl/apply/_internal/flexObjects/States","sap/ui/fl/apply/_internal/flexObjects/Variant","sap/ui/fl/LayerUtils","sap/ui/fl/Layer","sap/ui/fl/registry/Settings","sap/ui/fl/Utils"],function(_,S,V,L,a,b,U){"use strict";var C=V.extend("sap.ui.fl.apply._internal.flexObjects.CompVariant",{metadata:{properties:{persisted:{type:"boolean",defaultValue:true},persistencyKey:{type:"string"}},aggregations:{revertData:{type:"sap.ui.fl.apply._internal.flexObjects.CompVariantRevertData",multiple:true,singularName:"revertData",defaultValue:[]},changes:{type:"sap.ui.fl.Change",multiple:true,defaultValue:[]}}},constructor:function(p){V.apply(this,arguments);this.setFileType("variant");if(p.favorite!==undefined){this.setFavorite(!!p.favorite);}else if(p.layer===a.VENDOR||p.layer===a.CUSTOMER_BASE){this.setFavorite(true);}}});C.STANDARD_VARIANT_ID="*standard*";C.getMappingInfo=function(){return Object.assign(V.getMappingInfo(),{persistencyKey:"selector.persistencyKey",variantId:"variantId"});};C.prototype.getMappingInfo=function(){return C.getMappingInfo();};function i(A){var s=b.getInstanceOrUndef();var u=s&&s.getUserId();return!u||u.toUpperCase()===A.toUpperCase();}function c(l,A,u){if(A){return l===A;}else if(l===a.USER){return true;}var s=b.getInstanceOrUndef();if(L.isSapUiLayerParameterProvided()){A=L.getCurrentLayer();}else if(!A){A=s.isPublicLayerAvailable()?a.PUBLIC:a.CUSTOMER;}var f=l===A;var g=s.isKeyUser()||i(u);return f&&g;}function d(o){return!o||U.getCurrentLanguage()===o;}function e(s,f){var o=b.getInstanceOrUndef();if(!o){return true;}if(!s||!f){return true;}var g=o.getSystem();var h=o.getClient();return g===s&&f===h;}C.prototype.getPackage=function(){return this.getFlexObjectMetadata().packageName;};C.prototype.isVariant=function(){return true;};C.prototype.isRenameEnabled=function(l){return!this.getStandardVariant()&&this.isEditEnabled(l)&&d(this.getSupportInformation().originalLanguage);};C.prototype.isEditEnabled=function(A){var D=A&&L.isDeveloperLayer(A);var o=e(this.getSupportInformation().sourceSystem,this.getSupportInformation().sourceClient);var u=c(this.getLayer(),A,this.getOwnerId());return D||o&&u;};C.prototype.isDeleteEnabled=function(l){var o=e(this.getSupportInformation().sourceSystem,this.getSupportInformation().sourceClient);return o&&c(this.getLayer(),l,this.getOwnerId())&&!this.getStandardVariant();};C.prototype.storeFavorite=function(f){if(f!==this.getFavorite()){this.setState(S.DIRTY);this.setFavorite(f);}};C.prototype.getOwnerId=function(){return this.getSupportInformation().user||"";};C.prototype.storeContent=function(o){this.setContent(o);};C.prototype.storeExecuteOnSelection=function(E){if(E!==this.getExecuteOnSelection()){this.setState(S.DIRTY);this.setExecuteOnSelection(E);}};C.prototype.storeName=function(n){this.setName(n);};C.prototype.storeContexts=function(m){this.setContexts(m);this.setState(S.DIRTY);};return C;});
