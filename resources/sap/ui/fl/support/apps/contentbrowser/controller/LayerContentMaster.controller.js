/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/UIComponent","sap/ui/model/Filter","sap/ui/model/FilterOperator","sap/ui/fl/support/apps/contentbrowser/lrepConnector/LRepConnector","sap/ui/fl/support/apps/contentbrowser/utils/DataUtils"],function(e,t,s,a,n,r){"use strict";return e.extend("sap.ui.fl.support.apps.contentbrowser.controller.LayerContentMaster",{sNamespace:"",sLayer:"",oDataUtils:r,onInit:function(){var e=t.getRouterFor(this);e.getRoute("LayerContentMaster").attachMatched(this._onRouteMatched,this)},_onRouteMatched:function(e){var t=this;var s=e.getParameter("arguments");this.sLayer=s.layer;this.sNamespace=s.namespace||"";var a=this.getView().getContent()[0];a.setBusy(true);t.sNamespace=decodeURIComponent(t.sNamespace);a.setTitle(this._shortenNamespace());n.getContent(t.sLayer,t.sNamespace).then(t._onContentReceived.bind(t,a),function(){a.setBusy(false)}).then(function(){n.requestPending=false})},_onContentReceived:function(e,t){var s=this.getView().getModel("content");s.setData(t);e.setBusy(false);this.filterListByQuery("");this.byId("search").setValue("")},onSearch:function(e){var t=e.getSource().getValue();this.filterListByQuery(t)},filterListByQuery:function(e){var t=[];if(e&&e.length>0){t=new s({filters:[new s("name",a.Contains,e),new s("fileType",a.Contains,e)],and:false})}var n=this.byId("masterComponentsList");var r=n.getBinding("items");r.filter(t,"content")},onContentSelected:function(e){var s=e.getSource();var a=s.getBindingContextPath().substring(1);var n=this.getView().getModel("content").getData();var r=n[a];var i=r.name;var o=n[a].fileType;var c=t.getRouterFor(this);this.sNamespace=this.sNamespace?this.sNamespace:"/";if(o){var p={layer:this.sLayer,namespace:encodeURIComponent(this.sNamespace),fileName:i,fileType:o};c.navTo("ContentDetails",p)}else{this.sNamespace+=i+"/";c.navTo("LayerContentMaster",{layer:this.sLayer,namespace:encodeURIComponent(this.sNamespace)})}},navBack:function(){var e=t.getRouterFor(this);if(!this.sNamespace||this.sNamespace==="/"){e.navTo("Layers")}else{var s=this.sNamespace.split("/");s.splice(-2,1);var a=s.join("/");e.navTo("LayerContentMaster",{layer:this.sLayer,namespace:encodeURIComponent(a)},true)}},_shortenNamespace:function(){if(!this.sNamespace||this.sNamespace==="/"){return"["+this.sLayer+"] /"}var e=this.sNamespace.split("/");var t=e.length;if(t>2){return"["+this.sLayer+"] .../"+e[t-2]}return"["+this.sLayer+"] /"+this.sNamespace[t-1]},handleMessagePopoverPress:function(e){var t=e.getSource();sap.ui.require(["sap/ui/fl/support/apps/contentbrowser/utils/ErrorUtils"],function(e){e.handleMessagePopoverPress(t)})}})});
//# sourceMappingURL=LayerContentMaster.controller.js.map