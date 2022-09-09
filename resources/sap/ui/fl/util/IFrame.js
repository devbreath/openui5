/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../library","sap/ui/core/Control","sap/ui/model/json/JSONModel","./getContainerUserInfo","sap/base/util/extend","sap/base/util/restricted/_CancelablePromise","sap/base/security/URLListValidator","sap/base/Log","sap/ui/core/library","./IFrameRenderer"],function(e,t,i,r,s,o,n,a){"use strict";function l(e){if(e.parts&&e.formatter){return e.formatter.apply(null,e.parts.map(function(e){if(e.model){return"{"+e.model+">"+e.path+"}"}return"{"+e.path+"}"}))}return e}var u=t.extend("sap.ui.fl.util.IFrame",{metadata:{library:"sap.ui.fl",properties:{url:{type:"sap.ui.core.URI",group:"Misc",defaultValue:""},width:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:"100%"},height:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:"100%"},title:{type:"string",group:"Misc",defaultValue:undefined},_settings:{type:"object",group:"Data",defaultValue:null}},designtime:"sap/ui/fl/designtime/util/IFrame.designtime"},init:function(){if(t.prototype.init){t.prototype.init.apply(this,arguments)}this._oInitializePromise=r().then(function(e){this._oUserModel=new i(e);this.setModel(this._oUserModel,"$user")}.bind(this))},waitForInit:function(){return this._oInitializePromise?this._oInitializePromise:Promise.reject()},setUrl:function(e){var t=decodeURI(e)===e?encodeURI(e):e;if(u.isValidUrl(t)){if(this._oSetUrlPromise){this._oSetUrlPromise.cancel();delete this._oSetUrlPromise}this.setProperty("url","");this._oSetUrlPromise=new o(function(e,t,i){i.shouldReject=false;setTimeout(e,0)});this._oSetUrlPromise.then(function(){this.setProperty("url",t)}.bind(this))}else{a.error("Provided URL is not valid as an IFrame src")}return this},applySettings:function(e){t.prototype.applySettings.apply(this,arguments);if(e){var i=this.getProperty("_settings")||{};if(e._settings){s(i,e._settings)}else{Object.keys(e).filter(function(t){return!!e[t]}).forEach(function(t){i[t]=l(e[t])})}this.setProperty("_settings",i)}},exit:function(){if(this._oUserModel){this._oUserModel.destroy();delete this._oUserModel}}});u.isValidUrl=function(e){return!n.entries().some(function(e){return/javascript/i.test(e.protocol)})&&n.validate(e)};return u});
//# sourceMappingURL=IFrame.js.map