/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./library","./CalendarLegendRenderer","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/unified/CalendarLegendItem"],function(e,t,r,n,jQuery,a){"use strict";var i=t.CalendarDayType;var d=t.StandardCalendarLegendItem;var s=e.extend("sap.ui.unified.CalendarLegend",{metadata:{library:"sap.ui.unified",properties:{standardItems:{type:"string[]",group:"Misc",defaultValue:["Today","Selected","WorkingDay","NonWorkingDay"]},columnWidth:{type:"sap.ui.core.CSSSize",group:"Misc",defaultValue:"120px"}},aggregations:{items:{type:"sap.ui.unified.CalendarLegendItem",multiple:true,singularName:"item"},_standardItems:{type:"sap.ui.unified.CalendarLegendItem",multiple:true,visibility:"hidden"}},designtime:"sap/ui/unified/designtime/CalendarLegend.designtime"},constructor:function(t,r){e.prototype.constructor.apply(this,arguments);if(typeof t!=="string"){r=t}if(!r||r&&!r.standardItems){this._addStandardItems(this.getStandardItems())}this._bShouldRenderStandardItems=true},renderer:r});s.prototype.setStandardItems=function(e){var t;if(e&&e.length===1&&e[0]===""){e=[]}if(e&&e.length){e=this.validateProperty("standardItems",e);for(t=0;t<e.length;t++){if(!d[e[t]]){throw new Error("Invalid value '"+e[t]+"'. Property standardItems must contain values from sap.ui.unified.StandardCalendarLegendItem.")}}}this.setProperty("standardItems",e);this._addStandardItems(this.getStandardItems(),true);return this};s.prototype._addStandardItems=function(e,t){var r,n=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified"),i=this.getId();if(t){this.destroyAggregation("_standardItems")}for(r=0;r<e.length;r++){var d=new a(i+"-"+e[r],{text:n.getText(s._Standard_Items_TextKeys[e[r]])});this.addAggregation("_standardItems",d)}};s._Standard_Items_TextKeys={Today:"LEGEND_TODAY",Selected:"LEGEND_SELECTED",WorkingDay:"LEGEND_NORMAL_DAY",NonWorkingDay:"LEGEND_NON_WORKING_DAY"};s.prototype._getItemType=function(e,t){var r=e.getType(),a,d;if(r&&r!==i.None){return r}d=this._getUnusedItemTypes(t);a=t.filter(function(e){return!e.getType()||e.getType()===i.None}).indexOf(e);if(a<0){n.error("Legend item is not in the legend",this);return r}if(d[a]){r=d[a]}else{r="Type"+(Object.keys(i).length+a-d.length-1)}return r};s.prototype._getItemByType=function(e){var t,r=this.getItems(),n;for(n=0;n<r.length;n++){if(this._getItemType(r[n],r)===e){t=r[n];break}}return t};s.prototype._getUnusedItemTypes=function(e){var t=jQuery.extend({},i),r,n;delete t[i.None];delete t[i.NonWorking];for(n=0;n<e.length;n++){r=e[n].getType();if(t[r]){delete t[r]}}return Object.keys(t)};return s});
//# sourceMappingURL=CalendarLegend.js.map