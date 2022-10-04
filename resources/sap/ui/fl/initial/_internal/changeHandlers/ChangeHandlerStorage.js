/*!
* OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["sap/base/util/each","sap/base/Log","sap/ui/fl/Layer","sap/ui/fl/initial/_internal/changeHandlers/ChangeRegistryItem","sap/ui/fl/registry/Settings","sap/ui/fl/requireAsync"],function(e,r,n,a,t,i){"use strict";var o={};var l={};var s={};var u={};function f(e,r){var n={};if(!r||!r.changeHandler){n.changeHandler=r}else{n=r}if(n.changeHandler==="default"){n.changeHandler=u.defaultChangeHandlers[e]}else if(Object.keys(u.developerChangeHandlers||{}).includes(e)){throw Error("You can't use a custom change handler for the following Developer Mode change type: "+e+". Please use 'default' instead.")}return n}function c(r){s={};e(r,function(e,r){var n=new a({controlType:"defaultActiveForAll",changeHandler:r,layers:t.getDeveloperModeLayerPermissions(),changeType:e});s[e]=n})}function g(r,n,i){i=f(n,i);var o=Object.assign({},t.getDefaultLayerPermissions());if(i.layers){e(i.layers,function(e,r){if(o[e]===undefined){throw Error("The Layer '"+e+"' is not supported. Please only use supported layers")}o[e]=r})}var l={controlType:r,changeHandler:i.changeHandler,layers:o,changeType:n};return new a(l)}function d(e,r,n){var a=g(e,r,n);l[e]=l[e]||{};l[e][r]=a}function h(n,a){var t=Promise.resolve(a);var o="ChangeHandlerStorage.registerChangeHandlersForControl.skip_next_then";if(typeof a==="string"){t=i(a+".flexibility").catch(function(e){r.error("Flexibility change handler registration failed.\nControlType: "+n+"\n"+e.message);return Promise.resolve(o)})}return t.then(function(r){if(r!==o){e(r,function(e,r){d(n,e,r)})}}).catch(function(e){r.error(e.message)})}function y(e,r,a){var t=l[e]&&l[e][r]||s[r];if(!t){throw Error("No Change handler registered for the Control and Change type")}a=a===n.PUBLIC?n.USER:a;if(!t.getLayers()[a]){throw Error("Change type "+r+" not enabled for layer "+a)}return t}function p(e,n,a,t){var o=t.getChangeHandlerModulePath(a);if(typeof o!=="string"){return Promise.resolve(undefined)}return i(o).then(function(r){var a=r[e];if(a){return g(n,e,a)}}).catch(function(e){r.error("Flexibility registration for control "+t.getId(a)+" failed to load module "+o+"\n"+e.message)})}o.getChangeHandler=function(e,r,n,a,t){return p(e,r,n,a).then(function(n){var a=n||y(r,e,t);return a.getChangeHandler()})};o.registerPredefinedChangeHandlers=function(e,r){u.defaultChangeHandlers=e;u.developerChangeHandlers=r;c(r)};o.registerChangeHandlersForLibrary=function(r){var n=[];e(r,function(e,r){n.push(h(e,r))});return Promise.all(n)};o.clearAll=function(){l={};s={};u={}};o.registerChangeHandlersForControl=function(e,r){return h(e,r)};return o});
//# sourceMappingURL=ChangeHandlerStorage.js.map