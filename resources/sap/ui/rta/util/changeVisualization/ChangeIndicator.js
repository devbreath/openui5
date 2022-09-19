/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Fragment","sap/ui/model/json/JSONModel","sap/ui/core/Control","sap/ui/core/format/DateFormat","sap/ui/events/KeyCodes","sap/ui/rta/util/changeVisualization/categories/getVisualizationCategory","sap/ui/fl/Utils","sap/ui/fl/util/resolveBinding","sap/ui/rta/util/changeVisualization/ChangeVisualizationUtils","sap/ui/core/Core"],function(F,J,C,D,K,g,a,r,b,c){"use strict";var d={add:"sap-icon://add",move:"sap-icon://move",rename:"sap-icon://edit",combinesplit:"sap-icon://combine",remove:"sap-icon://less"};var e=C.extend("sap.ui.rta.util.changeVisualization.ChangeIndicator",{metadata:{library:"sap.ui.rta",properties:{changes:{type:"array",defaultValue:[]},posX:{type:"int"},posY:{type:"int"},overlayId:{type:"string"},selectorId:{type:"string"}},aggregations:{_popover:{type:"sap.m.Popover",multiple:false,visibility:"hidden"}},events:{selectChange:{parameters:{changeId:{type:"string"}}},keyPress:{parameters:{originalEvent:{type:"object"}}}}},renderer:{apiVersion:2,render:function(R,o){R.openStart("div",o);R.class("sapUiRtaChangeIndicator");R.class("sapUiRtaChangeIndicatorChange");if(o.getChanges().length>4){R.class("sapUiRtaChangeIndicatorColorDark");}else if(o.getChanges().length>1){R.class("sapUiRtaChangeIndicatorColorMedium");}else{R.class("sapUiRtaChangeIndicatorColorLight");}R.openEnd();R.close("div");}},constructor:function(){this._oDetailModel=new J();this._oDetailModel.setDefaultBindingMode("OneWay");C.prototype.constructor.apply(this,arguments);this._fnHoverTrue=this._toggleHoverStyleClasses.bind(this,true);this._fnHoverFalse=this._toggleHoverStyleClasses.bind(this,false);this._bEventAttachedToElement=false;}});function h(E,s){E[s]("click",this._onSelect,this);E[s]("tap",this._onSelect,this);E[s]("keydown",this._onKeyDown,this);E[s]("mouseout",this._fnHoverFalse);E[s]("focusout",this._fnHoverFalse);E[s]("mouseover",this._fnHoverTrue);E[s]("focusin",this._fnHoverTrue);}function f(I){var o=I.getDomRef();var O=c.byId(I.getOverlayId()).getDomRef().offsetHeight;var l=o.offsetHeight;if(O<l*5){I.addStyleClass("sapUiRtaChangeIndicatorVerticallyCentered");}}function i(m,R,o){var A=c.byId(m.affectedElementId);var p=Object.keys(m.payload||{}).reduce(function(p,w){var x=m.payload[w];var I=a.isBinding(x);var V=I?r(x,A):x;p[w]=V;return p;},{});var P={appComponent:a.getAppComponentForControl(A)};var O=c.byId(o);var v=g(m);var E=O.getDesignTimeMetadata().getLabel(A);var l=v&&v.getDescription(p,E,P);E=E&&"'"+E+"'";var s=b.shortenString(E);var n=("TXT_CHANGEVISUALIZATION_CHANGE_"+m.commandName.toUpperCase());var q;var t;if(p.description&&m.commandName==="settings"){q=p.description;t=p.descriptionTooltip||"";}else{if(l){q=l.descriptionText;t=l.descriptionTooltip;}else{q=R.getText(n,s);t=R.getText(n,E);}t=q.length<t.length?t:null;}var u=l&&l.buttonText;return{description:q,tooltip:t,buttonText:u};}function j(m,R){var s=m.change.getCreation();var o=new Date(s);var l=R.getText("TXT_CHANGEVISUALIZATION_CREATED_IN_SESSION_DATE");return{fullDate:s?D.getDateTimeInstance().format(o):l,relativeDate:s?D.getDateTimeInstance({relative:"true"}).format(o):l};}function k(o,m){var R=c.getLibraryResourceBundle("sap.ui.rta");var t=i(m,R,o);var l=j(m,R);return{id:m.id,change:m,description:t.description,descriptionTooltip:t.tooltip,fullDate:l.fullDate,relativeDate:l.relativeDate,detailButtonText:t.buttonText,icon:d[m.commandCategory]};}e.prototype.init=function(){this._iOldTabIndex=0;h.call(this,this,"attachBrowserEvent");};e.prototype.setVisible=function(v){C.prototype.setVisible.apply(this,arguments);var o=c.byId(this.getOverlayId());if(o){if(v&&!this._bEventAttachedToElement){h.call(this,o,"attachBrowserEvent");this._bEventAttachedToElement=true;}if(!v){h.call(this,o,"detachBrowserEvent");this._bEventAttachedToElement=false;if(this.getAggregation("_popover")){this.getAggregation("_popover").destroy();}}}return this;};e.prototype.focus=function(){if(this.getDomRef()){C.prototype.focus.apply(this,arguments);this._bScheduledForFocus=false;return;}this._bScheduledForFocus=true;};e.prototype.setOverlayId=function(o){var l=this.getDomRef();if(l){l.parentNode.removeChild(l);}this.placeAt(c.getStaticAreaRef());this.setProperty("overlayId",o);return this;};e.prototype.onAfterRendering=function(){var o=c.getElementById(this.getOverlayId());if(o){o.getDomRef().appendChild(this.getDomRef());f(this);}this.getDomRef().tabIndex=this._iOldTabIndex;if(this._bScheduledForFocus){this.focus();this._toggleHoverStyleClasses(true);}};e.prototype.exit=function(){var o=this.getDomRef();var O=c.byId(this.getOverlayId());if(o){o.parentNode.removeChild(o);}if(O){if(this.getAggregation("_popover")){this.getAggregation("_popover").destroy();}h.call(this,O,"detachBrowserEvent");}h.call(this,this,"detachBrowserEvent");};e.prototype.setChanges=function(l){this.setProperty("changes",l);this._oDetailModel.setData((l||[]).reverse().map(k.bind(this,this.getOverlayId())));};e.prototype._onSelect=function(E){this.focus();E.stopPropagation();this._openDetailPopover();};e.prototype._onKeyDown=function(E){if(E.keyCode===K.ENTER){this._onSelect(E);}this.fireKeyPress({originalEvent:E});};e.prototype._toggleHoverStyleClasses=function(A,E){if(E){E.stopPropagation();E.preventDefault();}var o=c.byId(this.getOverlayId());if(o.getMetadata().getName()!=="sap.ui.dt.ElementOverlay"){return;}var s=A?"addStyleClass":"removeStyleClass";o[s]("sapUiRtaChangeIndicatorHovered");this[s]("sapUiRtaHover");};e.prototype._openDetailPopover=function(){if(!this.getAggregation("_popover")){this._iOldTabIndex=this.getDomRef().getAttribute("tabindex");F.load({name:"sap.ui.rta.util.changeVisualization.ChangeIndicatorPopover",controller:this}).then(function(p){p._bOpenedByChangeIndicator=true;this.setAggregation("_popover",p);p.setModel(this._oDetailModel,"details");p.openBy(this);}.bind(this));}else{if(this.getAggregation("_popover").isOpen()){return this.getAggregation("_popover").close();}this.getAggregation("_popover").openBy(this);}};e.prototype._showDependentElements=function(E){this.getAggregation("_popover").close();var s=this.getChanges().length>1?E.getSource().getBindingContext("details").getObject().id:this.getChanges()[0].id;this.fireSelectChange({changeId:s});};return e;});
