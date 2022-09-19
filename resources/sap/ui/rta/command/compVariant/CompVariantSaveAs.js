/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/write/api/SmartVariantManagementWriteAPI","sap/ui/rta/command/BaseCommand","sap/ui/rta/library"],function(S,B,r){"use strict";var C=B.extend("sap.ui.rta.command.compVariant.CompVariantSaveAs",{metadata:{library:"sap.ui.rta",properties:{newVariantProperties:{type:"object"},previousDirtyFlag:{type:"boolean"},previousVariantId:{type:"string"},previousDefault:{type:"string"}}}});C.prototype.prepare=function(f,v,c){this.mInformation={layer:f.layer,command:c,generator:r.GENERATOR_NAME};return true;};C.prototype.getPreparedChange=function(){return this._oVariant;};C.prototype.execute=function(){var n=this.getNewVariantProperties();var p={changeSpecificData:{id:this._oVariant?this._oVariant.getVariantId():undefined,type:n.type,texts:{variantName:n.text},content:n.content,executeOnSelection:n.executeOnSelection,favorite:true,contexts:n.contexts,layer:this.mInformation.layer},control:this.getElement(),command:this.mInformation.command,generator:this.mInformation.generator};this._oVariant=S.addVariant(p);if(n.default){S.setDefaultVariantId(Object.assign({},this.mInformation,{control:this.getElement(),defaultVariantId:this._oVariant.getVariantId()}));}this.getElement().addVariant(this._oVariant,n.default);this.getElement().activateVariant(this._oVariant.getVariantId());return Promise.resolve();};C.prototype.undo=function(){S.removeVariant({id:this._oVariant.getVariantId(),control:this.getElement(),revert:true});if(this.getNewVariantProperties().default){S.setDefaultVariantId(Object.assign({},this.mInformation,{control:this.getElement(),defaultVariantId:this.getPreviousDefault()}));}this.getElement().removeWeakVariant({previousDirtyFlag:this.getPreviousDirtyFlag(),previousVariantId:this.getPreviousVariantId(),previousDefault:this.getPreviousDefault(),variantId:this._oVariant.getVariantId()});return Promise.resolve();};return C;});
