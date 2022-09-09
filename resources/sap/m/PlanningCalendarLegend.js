/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/unified/CalendarLegend","sap/ui/unified/CalendarAppointment","sap/ui/core/Core","./PlanningCalendarLegendRenderer"],function(e,t,n,i){"use strict";var r=e.extend("sap.m.PlanningCalendarLegend",{metadata:{library:"sap.m",properties:{itemsHeader:{type:"string",group:"Appearance"},appointmentItemsHeader:{type:"string",group:"Appearance"}},aggregations:{appointmentItems:{type:"sap.ui.unified.CalendarLegendItem",multiple:true,singularName:"appointmentItem"}},designtime:"sap/m/designtime/PlanningCalendarLegend.designtime"}});r._COLUMN_WIDTH_DEFAULT="auto";r.prototype.init=function(){e.prototype.init.call(this);this.setProperty("columnWidth",r._COLUMN_WIDTH_DEFAULT);this.addStyleClass("sapMPlanCalLegend")};r.prototype.setColumnWidth=function(e){if(e==undefined){e=r._COLUMN_WIDTH_DEFAULT}return this.setProperty("columnWidth",e)};r.findLegendItemForItem=function(e,n){var i=e?e.getAppointmentItems():null,r=e?e.getItems():null,a=n instanceof t,p=a?i:r,s=a?n.getType():n.type,d,o,u;if(p&&p.length){for(u=0;u<p.length;u++){d=p[u];if(d.getType()===s){o=d.getText();break}}}if(!o){o=s}return o};r.prototype._getItemsHeader=function(){var e=this.getItemsHeader();if(e==undefined){return n.getLibraryResourceBundle("sap.m").getText("PLANNING_CALENDAR_LEGEND_ITEMS_HEADER")}return e};r.prototype._getAppointmentItemsHeader=function(){var e=this.getAppointmentItemsHeader();if(e==undefined){return n.getLibraryResourceBundle("sap.m").getText("PLANNING_CALENDAR_LEGEND_APPOINTMENT_ITEMS_HEADER")}return e};return r});
//# sourceMappingURL=PlanningCalendarLegend.js.map