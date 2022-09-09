/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/FlexController","sap/ui/fl/Utils","sap/ui/fl/Layer","sap/ui/fl/apply/_internal/changes/Applier","sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/apply/_internal/flexState/ManifestUtils","sap/ui/fl/variants/VariantModel","sap/base/Log","sap/ui/performance/Measurement"],function(e,n,t,r,o,a,i,s,l){"use strict";var p={};p._instanceCache={};p._componentInstantiationPromises=new WeakMap;p.create=function(n){var t=p._instanceCache[n];if(!t){t=new e(n);p._instanceCache[n]=t}return t};p.createForControl=function(e){try{var t=n.getAppComponentForControl(e);var r=a.getFlexReferenceForControl(t||e);return p.create(r)}catch(e){s.error(e.message,undefined,"sap.ui.fl.FlexControllerFactory")}};function c(e,r){if(n.getUshellContainer()){return Promise.resolve(e)}var o=window.sessionStorage.getItem("sap.ui.rta.restart."+t.CUSTOMER);if(o){var i=a.getFlexReferenceForControl(r);if(o!==i&&o!=="true"){s.error("an application component was started "+"which does not match the component for which the restart was triggered:\n"+"Triggering component: "+o+"\n"+"Started component: "+i);return Promise.resolve(e)}window.sessionStorage.removeItem("sap.ui.rta.restart."+t.CUSTOMER);return new Promise(function(n,t){Promise.all([sap.ui.getCore().loadLibrary("sap.ui.rta",{async:true}),r.rootControlLoaded()]).then(function(){sap.ui.require(["sap/ui/rta/api/startKeyUserAdaptation"],function(t){t({rootControl:r});n(e)})}).catch(function(e){t(e)})})}return Promise.resolve(e)}p.getChangesAndPropagate=function(e,t){if(n.isApplicationComponent(e)){var r=e.getId();o.clearFilteredResponse(a.getFlexReferenceForControl(e));var i=o.initialize({componentId:r,asyncHints:t.asyncHints}).then(u.bind(this,e));p._componentInstantiationPromises.set(e,i);return i}else if(n.isEmbeddedComponent(e)){var s=n.getAppComponentForControl(e);if(s&&n.isApplicationComponent(s)){var l=Promise.resolve();if(p._componentInstantiationPromises.has(s)){l=p._componentInstantiationPromises.get(s)}return l.then(function(){var e=s.getModel(n.VARIANT_MODEL_NAME);if(!e){return u(s)}return e}).then(function(t){e.setModel(t,n.VARIANT_MODEL_NAME)})}return Promise.resolve()}};function u(e){var t=e.getManifestObject();var o=p.createForControl(e,t);var a;return o._oChangePersistence.loadChangesMapForComponent(e).then(function(n){var t=r.applyAllChangesForControl.bind(r,n,e,o);t._bIsSapUiFlFlexControllerApplyChangesOnControl=true;e.addPropagationListener(t);a=new i({},{flexController:o,appComponent:e});return a.initialize()}).then(function(){e.setModel(a,n.VARIANT_MODEL_NAME);l.end("flexProcessing");return a}).then(function(n){return c(n,e)})}return p},true);
//# sourceMappingURL=FlexControllerFactory.js.map