/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexObjects/FlexObject"],function(F){"use strict";var C=F.extend("sap.ui.fl.apply._internal.flexObjects.ControllerExtensionChange",{metadata:{properties:{controllerName:{type:"string"}}}});C.getMappingInfo=function(){return Object.assign(F.getMappingInfo(),{controllerName:"selector.controllerName"});};C.prototype.getMappingInfo=function(){return C.getMappingInfo();};C.prototype.getSelector=function(){return{controllerName:this.getControllerName()};};C.prototype.getVariantReference=function(){return undefined;};C.prototype.isValidForDependencyMap=function(){return false;};C.prototype.setInitialApplyState=function(){};C.prototype.getModuleName=function(){return this.getFlexObjectMetadata().moduleName;};return C;});
