/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/ui/fl/write/api/FieldExtensibility","sap/ui/fl/Utils","sap/ui/fl/Layer","sap/ui/fl/LayerUtils","sap/ui/dt/OverlayUtil","sap/ui/dt/DOMUtil","sap/ui/dt/ElementUtil","sap/ui/dt/MetadataPropagationUtil","sap/ui/rta/util/hasStableId","sap/m/MessageBox","sap/ui/rta/util/BindingsExtractor","sap/base/util/restricted/_omit","sap/ui/model/json/JSONModel","sap/ui/core/Fragment"],function(q,F,a,L,b,O,D,E,M,h,c,B,_,J,d){"use strict";var U={};U.RESOLVED_PROMISE=Promise.resolve(true);U._sFocusableOverlayClass=".sapUiDtOverlaySelectable";U._sRtaStyleClassName='';U.getRtaStyleClassName=function(){return U._sRtaStyleClassName;};U.setRtaStyleClassName=function(l){if(l===L.USER){U._sRtaStyleClassName="";}else if(b.getLayerIndex(l)>-1){U._sRtaStyleClassName="sapUiRTABorder";}};U.isServiceUpToDate=function(C){return F.isExtensibilityEnabled(C).then(function(e){if(e){var o=C.getModel();if(o&&o.sServiceUrl){return F.isServiceOutdated(o.sServiceUrl).then(function(s){if(s){F.setServiceValid(o.sServiceUrl);sap.ui.getCore().getEventBus().publish("sap.ui.core.UnrecoverableClientStateCorruption","RequestReload",{});}});}}});};U.openRemoveConfirmationDialog=function(e,t){var T=sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta");var s;return new Promise(function(r){s=T.getText("CTX_REMOVE_TITLE");var f={messageText:t,titleText:s,icon:"sap-icon://question-mark",removeText:T.getText("BTN_FREP_REMOVE"),cancelText:T.getText("BTN_FREP_CANCEL")};var o=new J();o.setData(f);var g;var C=function(){if(g){g.close();g.destroy();g=null;}};var i={removeField:function(){C();r(true);},closeDialog:function(){C();r(false);}};if(!g){d.load({name:"sap.ui.rta.view.RemoveElementDialog",controller:i}).then(function(j){g=j;g.setModel(o);g.addStyleClass(U.getRtaStyleClassName());g.open();});}else{g.addStyleClass(U.getRtaStyleClassName());g.open();}});};U.isOverlaySelectable=function(o){return o.isSelectable()&&D.isVisible(o.getDomRef());};U.getPropertyValue=function(e,p){var o=e.getMetadata().getPropertyLikeSetting(p);var P=o._sGetter;return e[P]();};U.getOverlayInstanceForDom=function(o){var i=q(o).attr("id");if(i){return sap.ui.getCore().byId(i);}};U.getFocusedOverlay=function(){if(document.activeElement){var e=sap.ui.getCore().byId(document.activeElement.id);if(e&&e.isA("sap.ui.dt.ElementOverlay")){return e;}}};U.getFocusableParentOverlay=function(o){if(!o){return undefined;}var f=o.getParentElementOverlay();while(f&&!f.getSelectable()){f=f.getParentElementOverlay();}return f;};U.getFirstFocusableDescendantOverlay=function(o){return O.getFirstDescendantByCondition(o,this.isOverlaySelectable);};U.getLastFocusableDescendantOverlay=function(o){return O.getLastDescendantByCondition(o,this.isOverlaySelectable);};U.getNextFocusableSiblingOverlay=function(o){var N=true;var n=O.getNextSiblingOverlay(o);while(n&&!this.isOverlaySelectable(n)){n=O.getNextSiblingOverlay(n);}if(!n){n=this._findSiblingOverlay(o,N);}return n;};U.getPreviousFocusableSiblingOverlay=function(o){var P=false;var p=O.getPreviousSiblingOverlay(o);while(p&&!this.isOverlaySelectable(p)){p=O.getPreviousSiblingOverlay(p);}if(!p){p=this._findSiblingOverlay(o,P);}return p;};U._findSiblingOverlay=function(o,n){var p=o.getParentElementOverlay();if(p){var s=n?O.getNextSiblingOverlay(p):O.getPreviousSiblingOverlay(p);if(!s){return this._findSiblingOverlay(p,n);}var e=n?this.getFirstFocusableDescendantOverlay(s):this.getLastFocusableDescendantOverlay(s);return e;}return undefined;};U.getIndex=function(p,C,A,g){var i;if(g&&typeof g==="function"){i=g(p,C);}else{var o=p.getMetadata();var e=o.getAggregation(A);var G=e._sGetter;var f=p[G]();if(Array.isArray(f)&&C){i=f.indexOf(C)+1;}else{i=0;}}return i;};U.createFieldLabelId=function(p,e,s){return(p.getId()+"_"+e+"_"+s).replace("/","_");};U.getElementBindingPaths=function(e){var p={};if(e.mBindingInfos){for(var i in e.mBindingInfos){var P=e.mBindingInfos[i].parts[0].path?e.mBindingInfos[i].parts[0].path:"";P=P.split("/")[P.split("/").length-1];p[P]={valueProperty:i};}}return p;};U.isOriginalFioriToolbarAccessible=function(){var r=U.getFiori2Renderer();return r&&r.getRootControl&&r.getRootControl().getOUnifiedShell().getHeader();};U.getFiori2Renderer=function(){var C=a.getUshellContainer()||{};return typeof C.getRenderer==="function"?C.getRenderer("fiori2"):undefined;};U.extendWith=function(e,s,C){if(!(typeof C==="function")){throw new Error('In order to use extendWith() utility function fnCustomizer should be provided!');}for(var S in s){if(s.hasOwnProperty(S)){if(C(e[S],s[S],S,e,s)){e[S]=s[S];}}}};U.isElementInViewport=function(o){if(o instanceof q){o=o.get(0);}var r=o.getBoundingClientRect();return(r.top>=0&&r.left>=0&&r.bottom<=(window.innerHeight||document.documentElement.clientHeight)&&r.right<=(window.innerWidth||document.documentElement.clientWidth));};U.showMessageBox=function(s,e,p){return sap.ui.getCore().getLibraryResourceBundle("sap.ui.rta",true).then(function(r){p=p||{};var f=r.getText(e,p.error?[p.error.userMessage||p.error.message||p.error]:undefined);var t=p.titleKey&&r.getText(p.titleKey);var o=_(p,["titleKey","error"]);o.title=t;o.styleClass=U.getRtaStyleClassName();return m(s,f,o);});};function m(s,e,o){return new Promise(function(r){o.onClose=r;c[s](e,o);});}U.checkSourceTargetBindingCompatibility=function(s,t,o){o=o||s.getModel();var S=B.collectBindingPaths(s,o);var e;var T;if(S.bindingPaths.length===0){return true;}e=B.getBindingContextPath(s);T=B.getBindingContextPath(t);if(e===T){return true;}return false;};U.doIfAllControlsAreAvailable=function(C,f){if(C.every(function(o){return o&&!o._bIsBeingDestroyed;})){return f();}};U.buildHashMapFromArray=function(A,k,v){return A.reduce(function(e,i){e[i[k]]=i[v];return e;},{});};U.checkTargetZone=function(A,o,p,e){function H(A,f,r,p){var g=A.getDesignTimeMetadata();var i=g.getAction("move",f);if(!i){return Promise.resolve(false);}return p.hasChangeHandler(i.changeType,r);}return E.checkTargetZone(A,o,e).then(function(t){if(!t){return false;}var f=o.getElement();var T=A.getParent();var g=o.getRelevantContainer();if(!f||!T){return false;}var i=T.getElement();var j=A.getDesignTimeMetadata();var v=M.getRelevantContainerForPropagation(j.getData(),f);v=v||i;if(!g||!v||!h(T)||g!==v){return false;}if(o.getParent().getElement()!==i&&!U.checkSourceTargetBindingCompatibility(f,i)){return false;}return H(A,f,v,p);});};return U;},true);
