/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/routing/Targets','./TargetHandler','./Target','./async/Targets'],function(T,a,b,c){"use strict";var M=T.extend("sap.f.routing.Targets",{constructor:function(o){o.config._async=true;if(o.targetHandler){this._oTargetHandler=o.targetHandler;}else{this._oTargetHandler=new a();this._bHasOwnTargetHandler=true;}T.prototype.constructor.apply(this,arguments);var d=c;this._super={};for(var f in d){this._super[f]=this[f];this[f]=d[f];}},destroy:function(){T.prototype.destroy.apply(this,arguments);if(this._bHasOwnTargetHandler){this._oTargetHandler.destroy();}this._oTargetHandler=null;},getTargetHandler:function(){return this._oTargetHandler;},_constructTarget:function(o,p){return new b(o,this.getViews(),p,this._oTargetHandler);},_getLevel:function(t){var l;do{l=t._oOptions.hasOwnProperty("level")?t._oOptions.level:t._oOptions.viewLevel;if(l!==undefined){return l;}t=t._oParent;}while(t);return l;}});return M;});
