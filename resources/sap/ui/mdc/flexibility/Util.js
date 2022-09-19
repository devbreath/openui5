/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/util/loadModules"],function(l){"use strict";var U={};U.APPLY="apply";U.REVERT="revert";U.createChangeHandler=function(s){var a=s.apply instanceof Function&&s.apply;var r=s.revert instanceof Function&&s.revert;var c=s.complete instanceof Function&&s.complete;if(!a||!r){throw new Error("Please provide atleast an apply and revert function!");}return{"changeHandler":{applyChange:function(C,o,p){return a(C,o,p,U.APPLY);},completeChangeContent:function(C,m,p){if(c){c(C,m,p);}},revertChange:function(C,o,p){return r(C,o,p,U.REVERT);},onAfterXMLChangeProcessing:function(C,p){p.modifier.getProperty(C,"delegate").then(function(d){l(d.name).then(function(m){var d=m[0];if(d.onAfterXMLChangeProcessing instanceof Function){d.onAfterXMLChangeProcessing(C,p);}});});}},"layers":{"USER":true}};};return U;});
