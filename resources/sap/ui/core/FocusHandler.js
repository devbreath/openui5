/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../base/Object","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/dom/_ready","sap/ui/dom/jquery/control"],function(B,L,q,_){"use strict";var E;var C;var F=B.extend("sap.ui.core.FocusHandler",{constructor:function(){B.apply(this);this.oCurrent=null;this.oLast=null;this.aEventQueue=[];this.oLastFocusedControlInfo=null;this.oPatchingControlFocusInfo=null;this.fnEventHandler=this.onEvent.bind(this);_().then(function(){var r=document.body;r.addEventListener("focus",this.fnEventHandler,true);r.addEventListener("blur",this.fnEventHandler,true);L.debug("FocusHandler setup on Root "+r.type+(r.id?": "+r.id:""),null,"sap.ui.core.FocusHandler");}.bind(this));}});F.prototype.getCurrentFocusedControlId=function(){var c=null;try{var A=q(document.activeElement);if(A.is(":focus")){c=A.control();}}catch(e){}return c&&c.length>0?c[0].getId():null;};F.prototype.getControlFocusInfo=function(c){var o;c=c||this.getCurrentFocusedControlId();if(!c){return null;}o=a(c);if(o){return{id:c,control:o,info:o.getFocusInfo(),type:o.getMetadata().getName(),focusref:o.getFocusDomRef()};}return null;};F.prototype.storePatchingControlFocusInfo=function(d){var A=document.activeElement;if(!A||!d.contains(A)){this.oPatchingControlFocusInfo=null;}else{this.oPatchingControlFocusInfo=this.getControlFocusInfo();if(this.oPatchingControlFocusInfo){this.oPatchingControlFocusInfo.patching=true;}}};F.prototype.getPatchingControlFocusInfo=function(){return this.oPatchingControlFocusInfo;};F.prototype.updateControlFocusInfo=function(c){if(c&&this.oLastFocusedControlInfo&&this.oLastFocusedControlInfo.control===c){var s=c.getId();this.oLastFocusedControlInfo=this.getControlFocusInfo(s);L.debug("Update focus info of control "+s,null,"sap.ui.core.FocusHandler");}};F.prototype.restoreFocus=function(c){var i=c||this.oLastFocusedControlInfo;if(!i){return;}var o=a(i.id);var f=i.focusref;if(o&&i.info&&o.getMetadata().getName()==i.type&&(i.patching||(o.getFocusDomRef()!=f&&(c||o!==i.control)))){L.debug("Apply focus info of control "+i.id,null,"sap.ui.core.FocusHandler");i.control=o;this.oLastFocusedControlInfo=i;delete this.oLastFocusedControlInfo.patching;o.applyFocusInfo(i.info);}else{L.debug("Apply focus info of control "+i.id+" not possible",null,"sap.ui.core.FocusHandler");}};F.prototype.destroy=function(e){var r=e.data.oRootRef;if(r){r.removeEventListener("focus",this.fnEventHandler,true);r.removeEventListener("blur",this.fnEventHandler,true);}};F.prototype.onEvent=function(b){var e=q.event.fix(b);L.debug("Event "+e.type+" reached Focus Handler (target: "+e.target+(e.target?e.target.id:"")+")",null,"sap.ui.core.FocusHandler");var c=(e.type=="focus"||e.type=="focusin")?"focus":"blur";this.aEventQueue.push({type:c,controlId:g(e.target)});if(this.aEventQueue.length==1){this.processEvent();}};F.prototype.processEvent=function(){var e=this.aEventQueue[0];if(!e){return;}try{if(e.type=="focus"){this.onfocusEvent(e.controlId);}else if(e.type=="blur"){this.onblurEvent(e.controlId);}}finally{this.aEventQueue.shift();if(this.aEventQueue.length>0){this.processEvent();}}};F.prototype.onfocusEvent=function(c){var o=a(c);if(o){this.oLastFocusedControlInfo=this.getControlFocusInfo(c);L.debug("Store focus info of control "+c,null,"sap.ui.core.FocusHandler");}this.oCurrent=c;if(!this.oLast){return;}if(this.oLast!=this.oCurrent){t(this.oLast,c);}this.oLast=null;};F.prototype.onblurEvent=function(c){if(!this.oCurrent){return;}this.oLast=c;this.oCurrent=null;setTimeout(this["checkForLostFocus"].bind(this),0);};F.prototype.checkForLostFocus=function(){if(this.oCurrent==null&&this.oLast!=null){t(this.oLast,null);}this.oLast=null;};var g=function(d){var i=q(d).closest("[data-sap-ui]").attr("id");if(i){return i;}return null;};var t=function(c,r){var o=a(c);if(o){var e=q.Event("sapfocusleave");e.target=o.getDomRef();var R=a(r);e.relatedControlId=R?R.getId():null;e.relatedControlFocusInfo=R?R.getFocusInfo():null;C=C||sap.ui.require("sap/ui/core/Core");if(C){var b=o.getUIArea();var u=null;if(b){u=C.getUIArea(b.getId());}else{var p=C.getStaticAreaRef();if(p.contains(e.target)){u=C.getUIArea(p.id);}}if(u){u._handleEvent(e);}}}};function a(c){var o;if(!E){E=sap.ui.require("sap/ui/core/Element");}if(E){o=E.registry.get(c);}return o||null;}return new F();});
