/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/rta/plugin/Plugin","sap/ui/dt/OverlayRegistry","sap/ui/dt/OverlayUtil","sap/base/util/includes","sap/base/util/restricted/_debounce","sap/ui/thirdparty/jquery"],function(P,O,a,b,_,q){"use strict";var S=P.extend("sap.ui.rta.plugin.Stretch",{metadata:{library:"sap.ui.rta",properties:{},associations:{stretchCandidates:{type:"sap.ui.core.Control",multiple:true}},events:{}}});S.STRETCHSTYLECLASS="sapUiRtaStretchPaddingTop";function s(p,o){return(p&&p.getGeometry()&&o.getGeometry()&&p.getGeometry().position.top===o.getGeometry().position.top&&p.getGeometry().position.left===o.getGeometry().position.left);}function t(o,A){var e=o.getElement();if(e.addStyleClass&&e.removeStyleClass){if(A){e.addStyleClass(S.STRETCHSTYLECLASS);}else{e.removeStyleClass(S.STRETCHSTYLECLASS);}}else{var E=o.getAssociatedDomRef();if(E){if(A){E.addClass(S.STRETCHSTYLECLASS);}else{E.removeClass(S.STRETCHSTYLECLASS);}}}}function c(r,C,i){var p=r.getGeometry();if(!p){return false;}var h=p.size.height;if(i){h-=parseInt(q(p.domRef).css("padding-top"));}var e=Math.round(p.size.width)*Math.round(h);C=C||a.getAllChildOverlays(r);var f=C.map(function(j){return j.getGeometry();});var o=a.getGeometry(f);if(!o){return false;}var g=Math.round(o.size.width)*Math.round(o.size.height);return g===e;}function d(r,C){var A=C.some(function(o){return o.getEditable()&&o.getGeometry();});if(A){return true;}var e=[];C.forEach(function(o){e=e.concat(a.getAllChildOverlays(o));});if(!e.length){return false;}if(c(r,e)){return d(r,e);}return false;}S.prototype.setDesignTime=function(D){P.prototype.setDesignTime.apply(this,arguments);if(D){D.attachEventOnce("synced",this._onDTSynced,this);}};S.prototype.exit=function(){if(this.getDesignTime()){this.getDesignTime().detachEvent("elementOverlayAdded",this._onElementOverlayChanged);this.getDesignTime().detachEvent("elementOverlayMoved",this._onElementOverlayChanged);this.getDesignTime().detachEvent("elementPropertyChanged",this._onElementPropertyChanged);this.getDesignTime().detachEvent("elementOverlayEditableChanged",this._onElementOverlayEditableChanged);this.getDesignTime().detachEvent("elementOverlayDestroyed",this._onElementOverlayDestroyed);}};S.prototype.addStretchCandidate=function(o){var e=o.getElement();if(!b(this.getStretchCandidates(),e.getId())){this.addAssociation("stretchCandidates",e);}};S.prototype.removeStretchCandidate=function(o){this.removeAssociation("stretchCandidates",o.getElement());t(o,false);};S.prototype.registerElementOverlay=function(o){this._checkParentAndAddToStretchCandidates(o);o.attachElementModified(this._onElementModified,this);P.prototype.registerElementOverlay.apply(this,arguments);};S.prototype.deregisterElementOverlay=function(o){t(o,false);};S.prototype._isEditable=function(){return false;};S.prototype._onDTSynced=function(){this._setStyleClassForAllStretchCandidates();this.getDesignTime().attachEvent("elementOverlayAdded",this._onElementOverlayChanged,this);this.getDesignTime().attachEvent("elementOverlayMoved",this._onElementOverlayChanged,this);this.getDesignTime().attachEvent("elementPropertyChanged",this._onElementPropertyChanged,this);this.getDesignTime().attachEvent("elementOverlayEditableChanged",this._onElementOverlayEditableChanged,this);this.getDesignTime().attachEvent("elementOverlayDestroyed",this._onElementOverlayDestroyed,this);};S.prototype._onElementModified=function(e){if(this.getDesignTime().getBusyPlugins().length){return;}var p=e.getParameters();var o=e.getSource();if(p.type==="afterRendering"){if(!this.fnDebounced){this.fnDebounced=_(function(){this._setStyleClassForAllStretchCandidates(this._getNewStretchCandidates(this._aOverlaysCollected));this._aOverlaysCollected=[];this.fnDebounced=undefined;}.bind(this),16);}if(!this._aOverlaysCollected){this._aOverlaysCollected=[];}if(!b(this._aOverlaysCollected,o)){this._aOverlaysCollected.push(o);this.fnDebounced();}}};S.prototype._onElementOverlayDestroyed=function(e){if(this.getDesignTime().getBusyPlugins().length){return;}var n=[];var p=e.getParameters().elementOverlay.getParentElementOverlay();if(p&&!p._bIsBeingDestroyed){var r=this._getRelevantOverlays(p).filter(function(o){return o.getElement();});n=this._getNewStretchCandidates(r);}this._setStyleClassForAllStretchCandidates(n);};S.prototype._onElementOverlayEditableChanged=function(e){var o=O.getOverlay(e.getParameters().id);if(this.getDesignTime().getBusyPlugins().length||!o){return;}var f=this._getRelevantOverlaysOnEditableChange(o);this._setStyleClassForAllStretchCandidates(f);};S.prototype._onElementPropertyChanged=function(e){var o=O.getOverlay(e.getParameters().id);if(this.getDesignTime().getBusyPlugins().length||!o){return;}var r=this._getRelevantOverlays(o);var D=_(function(){if(!this.bIsDestroyed&&!o.bIsDestroyed){var n=this._getNewStretchCandidates(r).concat(this._getRelevantOverlaysOnEditableChange(o));n=n.filter(function(i,p,A){return A.indexOf(i)===p;});this._setStyleClassForAllStretchCandidates(n);}}.bind(this));r.forEach(function(o){o.attachEventOnce("geometryChanged",D);});};S.prototype._onElementOverlayChanged=function(e){var o=O.getOverlay(e.getParameters().id);if(this.getDesignTime().getBusyPlugins().length||!o){return;}var r=this._getRelevantOverlays(o);var n=this._getNewStretchCandidates(r);this._setStyleClassForAllStretchCandidates(n);};S.prototype._getRelevantOverlaysOnEditableChange=function(o){var r=b(this.getStretchCandidates(),o.getElement().getId())?[o.getElement().getId()]:[];var p=o.getParentAggregationOverlay();if(!p){return r;}var e=p.getChildren();e.splice(e.indexOf(o),1);var A=e.some(function(o){return o.getEditable()&&o.getGeometry();});if(A){return r;}return r.concat(this._getRelevantParents(o));};S.prototype._getRelevantParents=function(o){var r=[];for(var i=0;i<25;i++){o=o.getParentElementOverlay();if(!o){return r;}if(!b(this.getStretchCandidates(),o.getElement().getId())){return r;}r.push(o.getElement().getId());}};S.prototype._getNewStretchCandidates=function(o){var n=[];o.forEach(function(e){if(this._reevaluateStretching(e)){n.push(e.getElement().getId());}},this);return n;};S.prototype._reevaluateStretching=function(o){if(!o.bIsDestroyed){var e=o.getAssociatedDomRef();if(e){var i=e.hasClass(S.STRETCHSTYLECLASS);var f=c(o,undefined,i);if(i&&!f){this.removeStretchCandidate(o);}else if(!i&&f){this.addStretchCandidate(o);return true;}}}};S.prototype._checkParentAndAddToStretchCandidates=function(o){var p=o.getParentElementOverlay();var $=p&&p.getAssociatedDomRef();if($){if(s(p,o)){if(c(p)){this.addStretchCandidate(p);}}}};S.prototype._setStyleClassForAllStretchCandidates=function(e){if(!Array.isArray(e)){e=this.getStretchCandidates();}e.forEach(function(E){var o=O.getOverlay(E);var C=a.getAllChildOverlays(o);var A=o.getEditable()&&d(o,C);t(o,A);},this);};return S;});
