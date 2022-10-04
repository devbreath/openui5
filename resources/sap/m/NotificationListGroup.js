/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Core","./NotificationListBase","sap/ui/core/InvisibleText","sap/ui/core/IconPool","sap/ui/core/library","sap/ui/Device","sap/m/Button","./NotificationListGroupRenderer"],function(e,t,i,o,r,s,n,a,p){"use strict";var u=s.Priority;var l=e.ButtonType;var g=t.getLibraryResourceBundle("sap.m"),I=g.getText("NOTIFICATION_LIST_GROUP_EXPAND"),T=g.getText("NOTIFICATION_LIST_GROUP_COLLAPSE"),h=g.getText("NOTIFICATION_LIST_GROUP_READ"),c=g.getText("NOTIFICATION_LIST_GROUP_UNREAD"),f="sap-icon://slim-arrow-right",y="sap-icon://slim-arrow-down";var _=n.system.desktop?400:100;var d=i.extend("sap.m.NotificationListGroup",{metadata:{library:"sap.m",properties:{collapsed:{type:"boolean",group:"Behavior",defaultValue:false},autoPriority:{type:"boolean",group:"Behavior",defaultValue:true},showEmptyGroup:{type:"boolean",group:"Behavior",defaultValue:false},enableCollapseButtonWhenEmpty:{type:"boolean",group:"Behavior",defaultValue:false},showItemsCounter:{type:"boolean",group:"Behavior",defaultValue:true},authorName:{type:"string",group:"Appearance",defaultValue:"",deprecated:true},authorPicture:{type:"sap.ui.core.URI",multiple:false,deprecated:true},datetime:{type:"string",group:"Appearance",defaultValue:"",deprecated:true}},defaultAggregation:"items",aggregations:{items:{type:"sap.m.NotificationListItem",multiple:true,singularName:"item"},_collapseButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},events:{onCollapse:{parameters:{collapsed:{type:"boolean"}}}}},renderer:p});d.prototype._getCollapseButton=function(){var e=this.getAggregation("_collapseButton"),t=this.getCollapsed();if(!e){e=new a(this.getId()+"-collapseButton",{type:l.Transparent,press:function(){var e=!this.getCollapsed();this.setCollapsed(e);this.fireOnCollapse({collapsed:e});this.getAggregation("_collapseButton").focus()}.bind(this)});this.setAggregation("_collapseButton",e,true)}e.setIcon(t?f:y);e.setTooltip(t?I:T);return e};d.prototype.init=function(){this._groupTitleInvisibleText=new o({id:this.getId()+"-invisibleGroupTitleText"})};d.prototype.exit=function(){i.prototype.exit.apply(this,arguments);if(this._groupTitleInvisibleText){this._groupTitleInvisibleText.destroy();this._groupTitleInvisibleText=null}};d.prototype.getVisibleItems=function(){var e=this.getItems().filter(function(e){return e.getVisible()});return e};d.prototype._getVisibleItemsCount=function(){return this.getVisibleItems().length};d.prototype._getGroupTitleInvisibleText=function(){var e=this.getUnread()?c:h,t,i=this.getPriority(),o,r=[e];if(i!==u.None){t=g.getText("NOTIFICATION_LIST_GROUP_PRIORITY",i);r.push(t)}if(this.getShowItemsCounter()){o=g.getText("LIST_ITEM_COUNTER",[this._getVisibleItemsCount()]);r.push(o)}return this._groupTitleInvisibleText.setText(r.join(" "))};d.prototype.getPriority=function(){if(!this.getAutoPriority()){return this.getProperty("priority")}var e=this.getAggregation("items");var t=u.None;if(e){e.forEach(function(e){t=m(t,e.getPriority())})}else{t=this.getProperty("priority")}return t};function m(e,t){if(e==t){return e}if(e=="None"){return t}if(e=="Low"&&t!="None"){return t}if(e=="Medium"&&(t!="None"&&t!="Low")){return t}return e}d.prototype.onBeforeRendering=function(){i.prototype.onBeforeRendering.apply(this,arguments);this._getCollapseButton().setVisible(this.getEnableCollapseButtonWhenEmpty()||this._getVisibleItemsCount()>0)};d.prototype._isMaxNumberReached=function(){return this.getItems().length>_};d.prototype._getMaxNumberReachedMsg=function(){return{title:g.getText("NOTIFICATION_LIST_GROUP_MAX_NOTIFICATIONS_TITLE",this.getItems().length-_),description:g.getText("NOTIFICATION_LIST_GROUP_MAX_NOTIFICATIONS_BODY")}};return d});
//# sourceMappingURL=NotificationListGroup.js.map