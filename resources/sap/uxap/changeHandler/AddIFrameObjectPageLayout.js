/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/Utils","sap/base/Log","sap/ui/fl/changeHandler/AddIFrame","sap/ui/fl/changeHandler/common/getTargetAggregationIndex","sap/ui/fl/changeHandler/common/createIFrame"],function(e,t,n,r,a){"use strict";var i=Object.assign({},n);i.applyChange=function(e,t,i){var o=i.modifier;var s=e.getContent();var g=s.targetAggregation;if(g!=="sections"){return Promise.resolve().then(n.applyChange.bind(n,e,t,i))}var c=i.view;var u=i.appComponent;var f=s.selector;var l=sap.ui.getCore().getLibraryResourceBundle("sap.uxap").getText("SECTION_TITLE_FOR_IFRAME");var d;var p;return Promise.resolve().then(o.createControl.bind(o,"sap.uxap.ObjectPageSection",u,c,f,{title:l},false)).then(function(e){d=e;var t=Object.create(f);t.id+="-subSection";return o.createControl("sap.uxap.ObjectPageSubSection",u,c,t,{title:l},false)}).then(function(e){p=e;return o.insertAggregation(d,"subSections",p,0,c)}).then(function(){var t=Object.create(f);t.id+="-iframe";return a(e,i,t)}).then(function(e){return o.insertAggregation(p,"blocks",e,0,c)}).then(r.bind(null,e,t,i)).then(function(e){return o.insertAggregation(t,"sections",d,e,c)}).then(function(){e.setRevertData([o.getId(d)])})};i.getCondenserInfo=function(e){var t=Object.assign({},n.getCondenserInfo(e));var r=e.getContent();var a=r.targetAggregation;if(a==="sections"){t.updateControl=Object.assign({},t.affectedControl);t.updateControl.id=t.affectedControl.id+"-iframe"}return t};return i},true);
//# sourceMappingURL=AddIFrameObjectPageLayout.js.map