/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";return{_place:function(d){var p=this._super._place.apply(this,arguments),r=d&&d.routeConfig||{},t=this;return this._oTargetHandler._chainNavigation(function(){return p.then(function(v){t._oTargetHandler.addNavigation({navigationIdentifier:t._oOptions._name,transition:t._oOptions.transition,transitionParameters:t._oOptions.transitionParameters,eventData:d,targetControl:v.control,view:v.view,layout:r.layout,placeholderConfig:v.placeholderConfig});return v;});},this._oOptions._name);},showPlaceholder:function(s){return this._oTargetHandler.showPlaceholder(s);},hidePlaceholder:function(s){}};},true);
