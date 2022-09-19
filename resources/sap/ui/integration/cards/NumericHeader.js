/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core","sap/base/util/extend","sap/base/util/isEmptyObject","sap/f/cards/NumericHeader","sap/f/cards/NumericHeaderRenderer","sap/f/cards/NumericSideIndicator","sap/ui/model/json/JSONModel","sap/ui/integration/util/BindingResolver","sap/ui/integration/util/LoadingProvider"],function(C,e,i,F,a,N,J,B,L){"use strict";var b=F.extend("sap.ui.integration.cards.NumericHeader",{constructor:function(c,A){c=c||{};this._bIsEmpty=i(c);var s={title:c.title,titleMaxLines:c.titleMaxLines,subtitle:c.subTitle,subtitleMaxLines:c.subTitleMaxLines,dataTimestamp:c.dataTimestamp};if(c.status&&c.status.text&&!c.status.text.format){s.statusText=c.status.text;}e(s,{unitOfMeasurement:c.unitOfMeasurement,details:c.details,detailsMaxLines:c.detailsMaxLines,sideIndicatorsAlignment:c.sideIndicatorsAlignment});if(c.mainIndicator){s.number=c.mainIndicator.number;s.scale=c.mainIndicator.unit;s.trend=c.mainIndicator.trend;s.state=c.mainIndicator.state;}if(c.sideIndicators){s.sideIndicators=c.sideIndicators.map(function(I){return new N(I);});}s.toolbar=A;F.call(this,s);if(A&&A.isA("sap.ui.integration.controls.ActionsToolbar")){A.attachVisibilityChange(this._handleToolbarVisibilityChange.bind(this));}},metadata:{library:"sap.ui.integration",properties:{interactive:{type:"boolean",defaultValue:false}},aggregations:{_loadingProvider:{type:"sap.ui.core.Element",multiple:false,visibility:"hidden"}},associations:{card:{type:"sap.ui.integration.widgets.Card",multiple:false}}},renderer:a});b.prototype.init=function(){F.prototype.init.call(this);this._bReady=false;this.setAggregation("_loadingProvider",new L());this._aReadyPromises=[];this._awaitEvent("_dataReady");Promise.all(this._aReadyPromises).then(function(){this._bReady=true;this.fireEvent("_ready");}.bind(this));};b.prototype.exit=function(){F.prototype.exit.call(this);this._oServiceManager=null;this._oDataProviderFactory=null;if(this._oDataProvider){this._oDataProvider.destroy();this._oDataProvider=null;}if(this._oActions){this._oActions.destroy();this._oActions=null;}};b.prototype._isInteractive=function(){return this.getInteractive();};b.prototype.isReady=function(){return this._bReady;};b.prototype.isLoading=function(){var l=this.getAggregation("_loadingProvider"),c=this.getCardInstance(),d=c&&c.isA("sap.ui.integration.widgets.Card")?c.isLoading():false;return!l.isDataProviderJson()&&(l.getLoading()||d);};b.prototype._awaitEvent=function(E){this._aReadyPromises.push(new Promise(function(r){this.attachEventOnce(E,function(){r();});}.bind(this)));};b.prototype.setServiceManager=function(s){this._oServiceManager=s;return this;};b.prototype.setDataProviderFactory=function(d){this._oDataProviderFactory=d;return this;};b.prototype._setDataConfiguration=function(d){var c=this.getCardInstance(),p="/",m;if(d&&d.path){p=B.resolveValue(d.path,this.getCardInstance());}this.bindObject(p);if(this._oDataProvider){this._oDataProvider.destroy();}this._oDataProvider=c.getDataProviderFactory().create(d,this._oServiceManager);this.getAggregation("_loadingProvider").setDataProvider(this._oDataProvider);if(d&&d.name){m=c.getModel(d.name);}else if(this._oDataProvider){m=new J();this.setModel(m);}if(this._oDataProvider){this._oDataProvider.attachDataRequested(function(){this.showLoadingPlaceholders();}.bind(this));this._oDataProvider.attachDataChanged(function(E){m.setData(E.getParameter("data"));this.onDataRequestComplete();}.bind(this));this._oDataProvider.attachError(function(E){this._handleError(E.getParameter("message"));this.onDataRequestComplete();}.bind(this));this._oDataProvider.triggerDataUpdate();}else{this.fireEvent("_dataReady");}};b.prototype._handleError=function(l){this.fireEvent("_error",{logMessage:l});};b.prototype._handleToolbarVisibilityChange=function(E){var t=E.getParameter("visible");if(this._bIsEmpty&&this.getVisible()!==t){this.setVisible(t);}};b.prototype.refreshData=function(){if(this._oDataProvider){this._oDataProvider.triggerDataUpdate();}};b.prototype.showLoadingPlaceholders=function(){this.getAggregation("_loadingProvider").setLoading(true);};b.prototype.hideLoadingPlaceholders=function(){this.getAggregation("_loadingProvider").setLoading(false);};b.prototype.onDataRequestComplete=function(){this.fireEvent("_dataReady");this.hideLoadingPlaceholders();};b.prototype.getCardInstance=function(){return C.byId(this.getCard());};return b;});
