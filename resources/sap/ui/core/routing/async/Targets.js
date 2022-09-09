/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log"],function(e){"use strict";return{display:function(e,t,a){var r=Promise.resolve();return this._display(e,t,a,r)},_display:function(e,t,a,r){var i=this,n=[];if(!Array.isArray(e)){e=[e]}this._attachTitleChanged(e,a);return this._alignTargetsInfo(e).reduce(function(e,a){var r={prefix:a.prefix,propagateTitle:a.propagateTitle||false,ignoreInitialHash:a.ignoreInitialHash,placeholder:a.placeholder,repeatedRoute:a.repeatedRoute,routeRelevant:a.routeRelevant||false};return i._displaySingleTarget(a,t,e,r).then(function(e){e=e||{};e.targetInfo=a;n.push(e)})},r).then(function(){return n})},_addDynamicTargetToRoute:function(e){if(this._oRouter){var t=this._oRouter._getLastMatchedRouteName();var a,r;if(t){a=this._oRouter.getRoute(t);if(a&&a._oConfig&&a._oConfig.target){r=this._alignTargetsInfo(a._oConfig.target).some(function(t){return t.name===e.name});if(!r){a._oConfig.dynamicTarget=a._oConfig.dynamicTarget||[];a._oConfig.dynamicTarget.push(e)}}}}},_displaySingleTarget:function(t,a,r,i){var n=t.name,o=this.getTarget(n);if(o!==undefined){if(t.routeRelevant){this._addDynamicTargetToRoute(t)}return o._display(a,r,i)}else{var s='The target with the name "'+n+'" does not exist!';e.error(s,this);return Promise.resolve({name:n,error:s})}}}});
//# sourceMappingURL=Targets.js.map