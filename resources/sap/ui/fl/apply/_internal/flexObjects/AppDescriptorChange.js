/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexObjects/FlexObject"],function(F){"use strict";var A=F.extend("sap.ui.fl.apply._internal.flexObjects.AppDescriptorChange",{metadata:{properties:{appDescriptorChange:{type:"boolean",defaultValue:true}}}});A.getMappingInfo=function(){return Object.assign(F.getMappingInfo(),{appDescriptorChange:"appDescriptorChange"});};A.prototype.getMappingInfo=function(){return A.getMappingInfo();};A.prototype.getSelector=function(){return{};};A.prototype.isValidForDependencyMap=function(){return false;};A.prototype.getVariantReference=function(){return undefined;};return A;});
