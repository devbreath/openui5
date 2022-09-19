/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/core/routing/Targets','./TargetHandler','./Target','./async/Targets','./sync/Targets',"sap/base/Log","sap/base/util/UriParameters"],function(T,a,b,c,s,L,U){"use strict";var M=T.extend("sap.m.routing.Targets",{constructor:function(o){if(!o.config){o.config={_async:false};}function d(){if(U.fromQuery(window.location.search).get("sap-ui-xx-asyncRouting")==="true"){L.warning("Activation of async view loading in routing via url parameter is only temporarily supported and may be removed soon","MobileTargets");return true;}return false;}if(o.config._async===undefined){o.config._async=(o.config.async===undefined)?d():o.config.async;}if(o.targetHandler){this._oTargetHandler=o.targetHandler;}else{this._oTargetHandler=new a();this._bHasOwnTargetHandler=true;}T.prototype.constructor.apply(this,arguments);var e=o.config._async?c:s;this._super={};for(var f in e){this._super[f]=this[f];this[f]=e[f];}},destroy:function(){T.prototype.destroy.apply(this,arguments);if(this._bHasOwnTargetHandler){this._oTargetHandler.destroy();}this._oTargetHandler=null;},getTargetHandler:function(){return this._oTargetHandler;},_constructTarget:function(o,p){return new b(o,this.getViews(),p,this._oTargetHandler);},_getLevel:function(t){var l;do{l=t._oOptions.hasOwnProperty("level")?t._oOptions.level:t._oOptions.viewLevel;if(l!==undefined){return l;}t=t._oParent;}while(t);return l;}});return M;});
