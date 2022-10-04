/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var e={apiVersion:2};var t=6;e.render=function(e,s){var a=s.getLastItemReplacement(),n=s.getDisplayStep(),p=s.getValueStep(),l=s.getFractions(),o=s.getInnerItems(),d=s.getLabel(),r=a!==-1?true:false,i=s.getItemMin(),c=s.getItemMax(),g=s.getSelectedValue(),M=g>=i&&g<=c||!o&&g===a,v=(g>=i+c&&g<c*2||g===a)&&o,u=[],S=[],f,C,T;for(C=i;C<=c-1;C++){u.push(C);if(o){S.push(C+c)}}u.push(r&&!o?a:c);if(o){S.push(r?a.toString().padStart(2,"0"):s._getMaxValue())}f=360/t/u.length;if(p*f>n){n=p*f}e.openStart("div",s.getId());e.class("sapMTPClock");if(o){e.class("sapMTPCInner")}e.attr("ondragstart","return false;");e.attr("ondrop","return false;");e.attr("aria-hidden","true");e.openEnd();e.openStart("div");e.class("sapMTPCDial");e.attr("data-label",d);e.openEnd();e.close("div");e.openStart("div");e.openEnd();for(C=1;C<=60;C++){e.openStart("div");e.class("sapMTPCItem");e.class("sapMTPCDeg"+C*t);T=C/f-1;e.openEnd();if(C%n!==0){if(l){e.openStart("span");e.class("sapMTPCMidDot");e.openEnd();e.close("span")}}else{e.openStart("span");e.class("sapMTPCDot");e.openEnd();e.close("span");e.openStart("span",s.getId()+"-"+(T+1));e.class("sapMTPCNumber");e.openEnd();e.text(u[T]);e.close("span");if(o){e.openStart("span",s.getId()+"-"+(T+c+1));e.class("sapMTPCNumber");if(T===11&&(g===0||g===24)&&s.getSupport2400()&&s._selectToggledElement){e.class("sapMTPCSelected")}e.openEnd();e.text(S[T]);e.close("span")}}e.close("div")}e.close("div");if(M||v){if(g===0){g=s._getMaxValue()}T=g-1;e.openStart("div");e.class("sapMTPCItem");C=v?g-c:g;e.class("sapMTPCDeg"+C*t*f);e.openEnd();e.openStart("div");e.class("sapMTPCMarker");e.openEnd();e.close("div");e.openStart("div");e.class("sapMTPCNumber");if(M){e.class("sapMTPCSelected");e.attr("id",s.getId()+"-selected")}else{e.class("sapMTPCInvisible")}e.openEnd();e.text(u[T]);e.close("div");if(v){e.openStart("div",s.getId()+"-selected");e.class("sapMTPCNumber");e.class("sapMTPCSelected");e.openEnd();e.text(S[T-c]);e.close("div")}e.close("div")}e.openStart("div",s.getId()+"-cover");e.class("sapMTPClockCover");e.openEnd();e.close("div");e.close("div")};return e});
//# sourceMappingURL=TimePickerClockRenderer.js.map