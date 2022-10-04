/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/each","sap/ui/commons/Label","sap/ui/commons/Link","sap/ui/commons/TextView","sap/ui/commons/layout/MatrixLayout","sap/ui/commons/layout/MatrixLayoutCell","sap/ui/commons/layout/MatrixLayoutRow","sap/ui/core/Control","sap/ui/core/Element","sap/ui/model/odata/ODataModel","sap/ui/ux3/QuickView"],function(e,t,n,i,r,a,o,s,u,l,d){"use strict";var c={createQuickView:function(e,t,n,i){var r=new l(e,false);var a=new d({firstTitle:"{title}",firstTitleHref:"{titleLinkURL}",type:"{Thing/text}",icon:"{imageURL}"});a.setModel(r);a.bindObject("/QuickviewConfigs(name='"+t+"',thingKey='"+n+"')",{expand:"Thing,QVAttributes/Attribute,QVActions/Action"});var o=new g;o.bindAggregation("items",{path:"QVAttributes",factory:function(e,t){var n=new f(e,{label:"{Attribute/label}",link:"{valueLinkURL}",order:"{order}"});n.bindProperty("value","value",i&&i[t.getProperty("Attribute/name")]);return n}});a.addContent(o);return a},createQuickViewData:function(e,t,n,i,r){var a=new l(t,false);e.removeAllContent();e.setModel(a);e.bindProperty("firstTitle","title");e.bindProperty("firstTitleHref","titleLinkURL");e.bindProperty("type","Thing/text");e.bindProperty("icon","imageURL");e.bindObject("/QuickviewConfigs(name='"+n+"',thingKey='"+i+"')",{expand:"Thing,QVAttributes/Attribute,QVActions/Action"});var o=new g;o.bindAggregation("items",{path:"QVAttributes",factory:function(e,t){var n=new f(e,{label:"{Attribute/label}",link:"{valueLinkURL}",order:"{order}"});n.bindProperty("value","value",r&&r[t.getProperty("Attribute/name")]);return n}});e.addContent(o)},createDataSetQuickView:function(e,t,n,i,r){var a=new l(e,false);if(r){a.setSizeLimit(r)}var o=new d({type:n,showActionBar:false});o.setModel(a);o.addContent(this._createDSContent(o,t,i));return o},createDataSetQuickViewData:function(e,t,n,i,r,a){var o=new l(t,false);if(a){o.setSizeLimit(a)}e.removeAllContent();e.setType(i);e.setShowActionBar(false);e.setModel(o);e.addContent(this._createDSContent(e,n,r))},_createDSContent:function(t,s,u){var l=new r;var d=new o;e(u,function(e,t){var r;if(t.href){r=new n({text:t.value,href:t.href})}else{r=new i({text:t.value})}var o=new a({content:[r]});o.addStyleClass("quickViewDS");d.addCell(o)});l.bindAggregation("rows",s,d);return l}};var f=u.extend("sap.ui.suite.hcm.QvItem",{metadata:{library:"sap.ui.suite",properties:{label:"string",value:"string",link:"string",order:"string",type:"string"}}});var g=s.extend("sap.ui.suite.hcm.QvContent",{metadata:{library:"sap.ui.suite",aggregations:{items:{type:"sap.ui.suite.hcm.QvItem",multiple:true}}},init:function(){this._sorted=false},exit:function(){if(this._oML){this._oML.destroy()}},renderer:{apiVersion:2,render:function(e,t){e.openStart("div",t);e.openEnd();e.renderControl(t._createQVContent(t));e.close("div")}},_createQVContent:function(e){var s=new r({widths:["75px"]}),u=e.getItems(),l,d,c,f,g;if(this._oML){this._oML.destroy()}e._sortItems(e);for(var p=0;p<u.length;p++){l=new o;d=new a({vAlign:"Top"});c=new t({text:u[p].getLabel()+":"});d.addContent(c);l.addCell(d);d=new a;if(u[p].getLink()){g=new n({text:u[p].getValue(),href:u[p].getLink()});d.addContent(g)}else{f=new i({text:u[p].getValue()});d.addContent(f)}l.addCell(d);s.addRow(l)}this._oML=s;return s},_sortItems:function(e){if(!e._sorted){var t=e.removeAllAggregation("items",true);t.sort(function(e,t){return parseInt(e.getOrder())-parseInt(t.getOrder())});t.forEach(function(t){e.addAggregation("items",t,false)});e._sorted=true}}});return c},true);
//# sourceMappingURL=QuickViewUtils.js.map