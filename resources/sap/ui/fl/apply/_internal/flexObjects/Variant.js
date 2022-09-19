/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexObjects/FlexObject"],function(F){"use strict";var V=F.extend("sap.ui.fl.apply._internal.flexObjects.Variant",{metadata:{properties:{favorite:{type:"boolean",defaultValue:false},executeOnSelection:{type:"boolean",defaultValue:false},standardVariant:{type:"boolean",defaultValue:false},contexts:{type:"object",defaultValue:{}},variantId:{type:"string"}}},constructor:function(){F.apply(this,arguments);if(!this.getVariantId()){this.setVariantId(this.getId());}}});V.getMappingInfo=function(){return Object.assign(F.getMappingInfo(),{favorite:"favorite",executeOnSelection:"executeOnSelection",standardVariant:"standardVariant",contexts:"contexts"});};V.prototype.getMappingInfo=function(){return V.getMappingInfo();};V.prototype.getName=function(){return this.getText("variantName");};V.prototype.setName=function(n,s){this.setText("variantName",n,"XFLD",s);};return V;});
