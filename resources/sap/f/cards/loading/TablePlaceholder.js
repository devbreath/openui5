/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/Core"],function(e,a){"use strict";var r=e.extend("sap.f.cards.loading.TablePlaceholder",{metadata:{library:"sap.f",properties:{maxItems:{type:"int",group:"Misc"},itemHeight:{type:"sap.ui.core.CSSSize"},columns:{type:"int",group:"Misc"}}},renderer:{apiVersion:2,render:function(e,r){var t=r.getMaxItems(),s=r.getColumns(),o=a.getLibraryResourceBundle("sap.ui.core"),i=o.getText("BUSY_TEXT");e.openStart("div",r).class("sapFCardContentPlaceholder").class("sapFCardContentTablePlaceholder").attr("tabindex","0").attr("title",i);e.accessibilityState(r,{role:"progressbar",valuemin:"0",valuemax:"100"});e.openEnd();for(var l=0;l<t+1;l++){e.openStart("div").class("sapFCardTablePlaceholderItem").style("height",r.getItemHeight()).openEnd();e.openStart("div").class("sapFCardTablePlaceholderRows").openEnd();if(s>1){for(var n=0;n<s;n++){e.openStart("div").class("sapFCardTablePlaceholderColumns").class("sapFCardLoadingShimmer").openEnd();e.close("div")}}e.close("div");e.close("div")}e.close("div")}}});return r});
//# sourceMappingURL=TablePlaceholder.js.map