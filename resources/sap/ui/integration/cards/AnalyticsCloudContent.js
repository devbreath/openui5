/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./AnalyticsCloudContentRenderer","./BaseContent","sap/ui/integration/library","sap/ui/core/HTML","sap/ui/integration/util/BindingResolver","sap/base/Log"],function(A,B,l,H,a,L){"use strict";var b=l.CardActionArea;var c=B.extend("sap.ui.integration.cards.AnalyticsCloudContent",{metadata:{library:"sap.ui.integration"},renderer:A});c.prototype.init=function(){B.prototype.init.apply(this,arguments);var i=this.getId()+"-highchartContainer";this._oHighchartContainer=new H(i,{content:"<div id="+i+" class='sapFCardAnalyticsCloudContentHCC'></div>"});this.setAggregation("_content",this._oHighchartContainer);};c.prototype.exit=function(){B.prototype.exit.apply(this,arguments);if(this._oHighchart){this._oHighchart.destroy();this._oHighchart=null;}if(this._oHighchartContainer){this._oHighchartContainer.destroy();this._oHighchartContainer=null;}};c.prototype.loadDependencies=function(C){return this._loadHighcharts();};c.prototype.setConfiguration=function(C){B.prototype.setConfiguration.apply(this,arguments);C=this.getParsedConfiguration();this.fireEvent("_actionContentReady");this._oActions.attach({area:b.Content,actions:C.actions,control:this});};c.prototype.onAfterRendering=function(){this._createHighchart();};c.prototype._loadHighcharts=function(){var C=this.getCardInstance(),d=c.SAC_DESTINATION_KEY,p=C.resolveDestination(d);return p.then(function(u){return c.loadHighcharts(u);},function(r){return Promise.reject("Destination with key '"+d+"' is required for AnalyticsCloud card. It could not be resolved. Reason: '"+r+"'");});};c.prototype._createHighchart=function(){if(this._bIsBeingDestroyed){return;}var C=this.getCardInstance(),o=this.getParsedConfiguration(),d=this.getBindingContext(),p,e;if(!C.isReady()){C.attachEventOnce("_ready",this._createHighchart,this);return;}if(!window.Highcharts){this.handleError("There was a problem with loading Highcharts library. Could not initialize AnalyticsCloud card content.");return;}if(!this._oHighchartContainer){L.error("Highcharts container is not created or destroyed.");return;}if(d){p=d.getPath();}e=a.resolveValue(o.options,this,p);this._oHighchart=new window.Highcharts.Chart(this._oHighchartContainer.getId(),e);};c.SAC_DESTINATION_KEY="sac";c.HIGHCHART_MODULES={"highcharts/highstock":{amd:true,exports:'Highcharts'},"highcharts/highcharts-more":{deps:["highcharts/highstock"]},"highcharts/solid-gauge":{deps:["highcharts/highstock"]},"highcharts/histogram-bellcurve":{deps:["highcharts/highstock"]},"highcharts/no-data-to-display":{deps:["highcharts/highstock"]},"highcharts/wordcloud":{deps:["highcharts/highstock"]},"highcharts/variable-pie":{deps:["highcharts/highstock"]},"highcharts/heatmap":{deps:["highcharts/highstock"]},"highcharts/treemap":{deps:["highcharts/highstock"]},"highcharts/variwide":{deps:["highcharts/highstock"]},"highcharts/pattern-fill":{deps:["highcharts/highstock"]},"highcharts/highcharts-3d":{deps:["highcharts/highstock"]},"highcharts/grouped-categories":{deps:["highcharts/highstock"]}};c.loadHighcharts=function(s){var S=s.trim().replace(/\/$/,""),f=S,i=this._isHighchartsIncluded(f),I=this._isHighchartsIncludedByThirdParty();if(i){return this._pLoadModules;}if(I){return Promise.resolve();}this._sIncludedFrom=f;this._pLoadModules=this._loadModules(f);return this._pLoadModules;};c._isHighchartsIncluded=function(s){var i=this._sIncludedFrom;if(i&&i===s){return true;}if(i&&i!==s){L.warning("Highcharts library is already included from '"+i+"'. The included version will be used and will not load from '"+s+"'","sap.ui.integration.widgets.Card#AnalyticsCloud");return true;}return false;};c._isHighchartsIncludedByThirdParty=function(){if(window.Highcharts){L.warning("Highcharts library is already included on the page. The included version will be used and will not load another one.","sap.ui.integration.widgets.Card#AnalyticsCloud");return true;}return false;};c._loadModules=function(s){var S=this.HIGHCHART_MODULES,m=Object.getOwnPropertyNames(S);sap.ui.loader.config({paths:{"highcharts":s+"/highcharts"},async:true,shim:S});return this._require(m).catch(function(){return Promise.reject("There was a problem with loading of the Highcharts library files.");});};c._require=function(m){return new Promise(function(r,R){sap.ui.require(m,function(){r(arguments);},function(e){R(e);});});};return c;});
