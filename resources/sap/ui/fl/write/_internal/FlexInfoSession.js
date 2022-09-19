/*
 * ! OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexState/ManifestUtils"],function(M){"use strict";var F={};var P="sap.ui.fl.info.";function g(r){return P+(r||"true");}F.get=function(c){var r=M.getFlexReferenceForControl(c);return F.getByReference(r);};F.getByReference=function(r){return JSON.parse(window.sessionStorage.getItem(g(r)));};F.set=function(i,c){var r=M.getFlexReferenceForControl(c);F.setByReference(i,r);};F.setByReference=function(i,r){window.sessionStorage.setItem(g(r),JSON.stringify(i));};F.remove=function(c){var r=M.getFlexReferenceForControl(c);window.sessionStorage.removeItem(g(r));};return F;});
