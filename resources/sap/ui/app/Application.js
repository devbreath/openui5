/*
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/assert","./ApplicationMetadata","sap/ui/core/Component","sap/ui/core/ComponentContainer","sap/ui/model/Model","sap/ui/model/json/JSONModel","jquery.sap.sjax"],function(t,o,n,e,i,a,jQuery){"use strict";var s=n.extend("sap.ui.app.Application",{metadata:{abstract:true,properties:{root:"string",config:"any"},aggregations:{rootComponent:{type:"sap.ui.core.UIComponent",multiple:false}},publicMethods:["getView"],deprecated:true},constructor:function(t,o){if(this.onError){this.onWindowError=this.onError}if(this.onBeforeExit){this.onWindowBeforeUnload=this.onBeforeExit}if(this.onExit){this.onWindowUnload=this.onExit}n.apply(this,arguments);if(sap.ui.getApplication){throw new Error("Only one instance of sap.ui.app.Application is allowed")}sap.ui.getApplication=this._getInstance.bind(this);sap.ui.getCore().attachInit(function(){this._initRootComponent();this.main()}.bind(this))},_initRootComponent:function(){var t=this.createRootComponent();if(t){this.setRootComponent(t);var o=new e({component:t});o.placeAt(this.getRoot()||document.body)}},createRootComponent:function(){var t=this.getMetadata().getRootComponent();var o;if(t){o=sap.ui.component({name:t})}return o},getView:function(){return this.getRootComponent()},_getInstance:function(){return this},main:function(){},onBeforeExit:function(){},onExit:function(){},onError:null,setConfig:function(o){if(typeof o==="string"){var n=o;o=new a;var e=jQuery.sap.sjax({url:n,dataType:"json"});if(e.success){o.setData(e.data)}else{throw new Error("Could not load config file: "+n)}}if(typeof o==="object"&&!(o instanceof i)){o=new a(o)}t(o instanceof i,"the config property value must be a string, an object or an instance of sap.ui.model.Model");this.setProperty("config",o)},destroy:function(t){delete sap.ui.getApplication;n.prototype.destroy.apply(this,arguments)}},o);return s});
//# sourceMappingURL=Application.js.map