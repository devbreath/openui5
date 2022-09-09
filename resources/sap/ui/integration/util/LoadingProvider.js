/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../cards/ListContentRenderer","sap/ui/integration/library","sap/ui/core/Element","sap/f/cards/loading/GenericPlaceholder","sap/f/cards/loading/ListPlaceholder","sap/f/cards/loading/CalendarPlaceholder","sap/f/cards/loading/ObjectPlaceholder","sap/f/cards/loading/TablePlaceholder","sap/f/cards/loading/TimelinePlaceholder","../cards/TableContentRenderer","../cards/TimelineContentRenderer"],function(e,t,a,n,i,o,r,s,l,d,h){"use strict";var c=a.extend("sap.ui.integration.util.LoadingProvider",{metadata:{library:"sap.ui.integration",properties:{loading:{type:"boolean",defaultValue:false}}}});c.prototype.setLoading=function(e){if(this.isDataProviderJson()||this._bAwaitPagination&&!e){return this}return this.setProperty("loading",e)};c.prototype.isDataProviderJson=function(){return!!(this._oDataProvider&&this._oDataProvider.getSettings()&&this._oDataProvider.getSettings()["json"])};c.prototype.setDataProvider=function(e){this._oDataProvider=e};c.prototype.destroy=function(){if(this._oContentPlaceholder){this._oContentPlaceholder.destroy();this._oContentPlaceholder=null}this._oDataProvider=null;a.prototype.destroy.apply(this,arguments)};c.prototype.createContentPlaceholder=function(t,a,c){switch(a){case"List":this._oContentPlaceholder=new i({maxItems:c?c.getContentPageSize(t)||2:2,item:t.item,itemHeight:e.getItemMinHeight(t,c||this)+"rem"});break;case"Calendar":this._oContentPlaceholder=new o({maxItems:t.maxItems?parseInt(t.maxItems):2,maxLegendItems:t.maxLegendItems?parseInt(t.maxLegendItems):2,item:t.item?t.item.template:{},legendItem:t.legendItem?t.legendItem.template:{}});break;case"Object":this._oContentPlaceholder=new r;break;case"Table":this._oContentPlaceholder=new s({maxItems:c?c.getContentPageSize(t)||2:2,itemHeight:d.getItemMinHeight(t,c||this)+"rem",columns:t.row?t.row.columns.length||2:2});break;case"Timeline":this._oContentPlaceholder=new l({maxItems:c?c.getContentPageSize(t)||2:2,item:t.item,itemHeight:h.getItemMinHeight(t,c||this)+"rem"});break;default:this._oContentPlaceholder=new n}return this._oContentPlaceholder};return c});
//# sourceMappingURL=LoadingProvider.js.map