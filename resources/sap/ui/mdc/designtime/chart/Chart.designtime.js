/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/p13n/Engine"],function(E){"use strict";return{actions:{settings:function(){return{handler:function(c,p){var P=c.getP13nMode();var i=P.indexOf("Type");if(i>-1){P.splice(i,1);}if(c.isPropertyHelperFinal()){return E.getInstance().getRTASettingsActionHandler(c,p,P);}else{return c.finalizePropertyHelper().then(function(){return E.getInstance().getRTASettingsActionHandler(c,p,P);});}}};}},properties:{width:{ignore:true},height:{ignore:true},delegate:{ignore:true},header:{ignore:true},noDataText:{ignore:true},p13nMode:{ignore:true},legendVisible:{ignore:true},ignoreToolbarActions:{ignore:true},minWidth:{ignore:true},minHeight:{ignore:true},sortConditions:{ignore:true},filterConditions:{ignore:true},showChartTooltip:{ignore:true},autoBindOnInit:{ignore:true},chartType:{ignore:true},showSelectionDetails:{ignore:true},propertyInfo:{ignore:true},headerLevel:{ignore:false}},aggregations:{items:{ignore:true},actions:{ignore:true},selectionDetailsActions:{ignore:true},_toolbar:{ignore:false},_breadcrumbs:{ignore:true},_innerChart:{ignore:true}}};});
