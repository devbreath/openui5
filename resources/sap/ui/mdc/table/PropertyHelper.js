/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../util/PropertyHelper","sap/m/table/Util"],function(P,T){"use strict";var a=P.extend("sap.ui.mdc.table.PropertyHelper",{constructor:function(p,e,o,E){var A=["filterable","sortable","groupable","key","unit","text","exportSettings","propertyInfos","visualSettings"];P.call(this,p,e,o,A,E);}});function i(c){return!!(c&&c.isA&&c.isA("sap.ui.mdc.table.Column"));}function g(w){if(w.indexOf("em")>0){return Math.round(parseFloat(w));}if(w.indexOf("px")>0){return Math.round(parseInt(w)/16);}return"";}a.prototype.prepareProperty=function(p){P.prototype.prepareProperty.apply(this,arguments);p.aggregatable=false;};a.prototype.getColumnExportSettings=function(c){var C=[];if(!i(c)){return C;}var p=this.getProperty(c.getDataProperty());if(!p){return C;}var e=p.exportSettings;if(e===null){return C;}var d=[];var o;var f;if(!p.isComplex()){o=b(c,p,e);o.property=p.path;C.push(o);return C;}f=p.getSimpleProperties();if(Object.keys(e).length){o=b(c,p,e);f.forEach(function(p){d.push(p.path);});o.property=d;C.push(o);}else{f.forEach(function(p,I){var h=p.exportSettings,j=b(c,p,h);j.property=p.path;if(I>0){j.columnId=c.getId()+"-additionalProperty"+I;}if(h||j.property){C.push(j);}});}return C;};function b(c,p,e){var E=Object.assign({columnId:c.getId(),label:p.label,width:g(c.getWidth()),textAlign:c.getHAlign(),type:"String"},e);return E;}a.prototype.calculateColumnWidth=function(m){var p=m.getDataProperty();var o=this.getProperty(p);if(!o){return null;}var c=o.visualSettings;if(c&&c.widthCalculation===null){return null;}return this._calcColumnWidth(o,m.getHeader());};a.prototype._calcColumnWidth=function(p,h){var w=Object.assign({gap:0,includeLabel:true,truncateLabel:true,excludeProperties:[]},p.visualSettings&&p.visualSettings.widthCalculation);var t=[];if(p.isComplex()){t=p.getSimpleProperties().flatMap(function(o){var m=o.visualSettings?o.visualSettings.widthCalculation:undefined;return m===null||w.excludeProperties.includes(o.name)?[]:[[o.typeConfig.typeInstance,m]];});}else{t.push(p.typeConfig.typeInstance);}if(p.unit){w.gap+=2.5;}h=(w.includeLabel)?h||p.label:"";return T.calcColumnWidth(t,h,w);};return a;});
