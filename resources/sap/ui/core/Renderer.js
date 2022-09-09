/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/base/util/isPlainObject","sap/base/util/ObjectPath","sap/base/assert","sap/base/util/extend"],function(e,r,t,n,a){"use strict";var i={};var s;function u(e,i){n(this!=null,"BaseRenderer must be a non-null object");n(typeof e==="string"&&e,"Renderer.extend must be called with a non-empty name for the new renderer");n(i==null||r(i)&&Object.keys(i).every(function(e){return i[e]!==undefined}),"oRendererInfo can be omitted or must be a plain object without any undefined property values");var s=Object.create(this);s.extend=u;a(s,i);t.set(e,s);return s}i.extend=function(e,r){if(typeof e==="string"){return u.call(this,e,r)}else if(this===i){var t=Object.create(e||null);t._super=e;t.extend=u;return t}else{throw new TypeError("The signature extend(BaseRenderer) without a name can only be called on sap.ui.core.Renderer")}};i.getTextAlign=function(r,t){s=sap.ui.require("sap/ui/core/library");if(!s){e.warning("Synchronous loading of a library.js. Ensure that 'sap/ui/core/library.js' is loaded"+" before sap.ui.core.Renderer#getTextAlign is called.","SyncXHR",null,function(){return{type:"SyncXHR",name:"renderer-getTextAlign"}});s=sap.ui.requireSync("sap/ui/core/library")}var n=s.TextAlign;var a=s.TextDirection;var i="",u=sap.ui.getCore().getConfiguration().getRTL();switch(r){case n.End:switch(t){case a.LTR:i="right";break;case a.RTL:i="left";break;default:i=u?"left":"right";break}break;case n.Begin:switch(t){case a.LTR:i="left";break;case a.RTL:i="right";break;default:i=u?"right":"left";break}break;case n.Right:if(!u||t==a.LTR){i="right"}break;case n.Center:i="center";break;case n.Left:if(u||t==a.RTL){i="left"}break}return i};return i},true);
//# sourceMappingURL=Renderer.js.map