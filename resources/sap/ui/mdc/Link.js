/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/field/FieldInfoBase","sap/ui/thirdparty/jquery","sap/ui/model/BindingMode","sap/ui/model/json/JSONModel","sap/ui/mdc/link/Log","sap/base/Log","sap/ui/mdc/link/Panel","sap/ui/mdc/link/PanelItem","sap/ui/layout/form/SimpleForm","sap/ui/core/Title","sap/ui/layout/library"],function(F,q,B,J,L,S,P,a,b,C,l){"use strict";var R=l.form.SimpleFormLayout.ResponsiveGridLayout;var c=F.extend("sap.ui.mdc.Link",{metadata:{library:"sap.ui.mdc",properties:{enablePersonalization:{type:"boolean",defaultValue:true},delegate:{type:"object",defaultValue:{name:"sap/ui/mdc/LinkDelegate",payload:{}}}},associations:{sourceControl:{type:"sap.ui.core.Control",multiple:false}}}});c.prototype.applySettings=function(){F.prototype.applySettings.apply(this,arguments);this.initControlDelegate();};c.prototype.init=function(){var m=new J({contentTitle:undefined,linkItems:[]});m.setDefaultBindingMode(B.TwoWay);m.setSizeLimit(1000);this.setModel(m,"$sapuimdcLink");this.attachEvent("modelContextChange",this.fireDataUpdate,this);this._oLinkType=null;this._bLinkItemsFetched=false;this._aLinkItems=[];F.prototype.init.apply(this,arguments);};c.prototype.exit=function(){this._aLinkItems=undefined;this._bLinkItemsFetched=undefined;this._oLinkType=undefined;this._oUseDelegateItemsPromise=undefined;this._aAdditionalContent=undefined;this._oUseDelegateAdditionalContentPromise=undefined;F.prototype.exit.apply(this,arguments);};c.prototype.isTriggerable=function(){return this.retrieveLinkType().then(function(o){var r=o.runtimeType;var i=o.initialType?o.initialType:o;if(r&&r instanceof Promise){r.then(function(d){if(!this._oLinkType||d.linkType!==this._oLinkType.linkType){this._oLinkType=d;this.fireDataUpdate();}}.bind(this));}return this._oLinkType?this._oLinkType.type>0:i.type>0;}.bind(this));};c.prototype.getTriggerHref=function(){return this.getDirectLinkHrefAndTarget().then(function(o){return o?o.href:null;});};c.prototype.getDirectLinkHrefAndTarget=function(){return this._retrieveDirectLinkItem().then(function(d){this.addDependent(d);return d?{target:d.getTarget(),href:d.getHref()}:null;}.bind(this));};c.prototype._retrieveDirectLinkItem=function(){return this.retrieveLinkType().then(function(o){if(this._linkTypeHasDirectLink(this._oLinkType)){return this._oLinkType.directLink;}var d=o.initialType?o.initialType:o;if(this._linkTypeHasDirectLink(d)){return d.directLink;}return null;}.bind(this));};c.prototype._linkTypeHasDirectLink=function(o){return o&&o.type===1&&o.directLink;};c.prototype.getContent=function(g){var o=this.retrieveLinkItems();var A=this.retrieveAdditionalContent();return Promise.all([o,A]).then(function(v){var d=v[0];var e=v[1];return new Promise(function(r){sap.ui.require(['sap/ui/fl/Utils','sap/ui/fl/apply/api/FlexRuntimeInfoAPI'],function(U,f){this._setConvertedLinkItems(d);var m=this._getInternalModel().getProperty("/linkItems");var M=this._getInternalModel().getProperty("/baselineLinkItems");var p=!e.length&&!m.length?this._getNoContent():e;var s=this._createPanelId(U,f);var E=sap.ui.getCore().byId(s);if(E){if(E.getParent()&&E.getParent().close){E.getParent().close();}E.destroy();}var h=new P(s,{enablePersonalization:this.getEnablePersonalization(),items:M.map(function(i){return new a(i.key,{text:i.text,description:i.description,href:i.href,internalHref:i.internalHref,target:i.target,icon:i.icon,visible:true});}),additionalContent:p,beforeSelectionDialogOpen:function(){if(g&&g()){g().setModal(true);}},afterSelectionDialogClose:function(){if(g&&g()){g().setModal(false);}},beforeNavigationCallback:this._beforeNavigationCallback.bind(this),metadataHelperPath:"sap/ui/mdc/Link"});h.setModel(new J({metadata:q.extend(true,[],this._getInternalModel().getProperty("/linkItems")),baseline:q.extend(true,[],this._getInternalModel().getProperty("/baselineLinkItems"))}),"$sapuimdcLink");this._setAdditionalContent(undefined);return r(h);}.bind(this));}.bind(this));}.bind(this));};c.prototype.checkDirectNavigation=function(){var o=this.retrieveLinkItems();var A=this.retrieveAdditionalContent();return Promise.all([o,A]).then(function(v){var d=v[0];var e=v[1];this._setConvertedLinkItems(d);var m=this._getInternalModel().getProperty("/linkItems");if(m.length===1&&!e.length){P.navigate(m[0].href);return Promise.resolve(true);}return Promise.resolve(false);}.bind(this));};c.prototype._setConvertedLinkItems=function(d){var m=this._getInternalModel();var M=d.map(function(o){if(!o.getKey()){S.error("sap.ui.mdc.Link: undefined 'key' property of the LinkItem "+o.getId()+". The mandatory 'key' property should be defined due to personalization reasons.");}return{key:o.getKey(),text:o.getText(),description:o.getDescription(),href:o.getHref(),internalHref:o.getInternalHref(),target:o.getTarget(),icon:o.getIcon(),initiallyVisible:o.getInitiallyVisible(),visible:false};});m.setProperty("/linkItems/",M);var e=M.filter(function(o){return o.initiallyVisible;});m.setProperty("/baselineLinkItems/",e);};c.prototype._getNoContent=function(){var s=new b({layout:R,content:[new C({text:sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc").getText("info.POPOVER_MSG_NO_CONTENT")})]});s.addStyleClass("mdcbaseinfoPanelDefaultAdditionalContent");return s;};c.prototype._createPanelId=function(U,d){var f;if(this.getParent()){f=this.getParent();}var o=this._getSourceControl();if(!o){this.setSourceControl(f);o=f;}if(!d.isFlexSupported({element:this})||!d.isFlexSupported({element:o})){S.error("Invalid component. The mandatory 'sourceControl' association should be assigned to the app component due to personalization reasons.");return this.getId()+"-idInfoPanel";}var A=U.getAppComponentForControl(o)||U.getAppComponentForControl(f);return A.createId("idInfoPanel");};c.retrieveAllMetadata=function(p){if(!p.getModel||!p.getModel("$sapuimdcLink")){return[];}var m=p.getModel("$sapuimdcLink");return m.getProperty("/metadata").map(function(M){return{id:M.key,text:M.text,description:M.description,href:M.href,internalHref:M.internalHref,target:M.target,visible:M.visible};});};c.retrieveBaseline=function(p){if(!p.getModel||!p.getModel("$sapuimdcLink")){return[];}var m=p.getModel("$sapuimdcLink");return m.getProperty("/baseline").map(function(M){return{id:M.key,visible:true};});};c.prototype._getInfoLog=function(){if(this.getPayload()&&this.getPayload().semanticObjects){if(this._oInfoLog){return this._oInfoLog;}if(S.getLevel()>=S.Level.INFO){this._oInfoLog=new L();this._oInfoLog.initialize(this.getPayload().semanticObjects,this._getContextObject(this._getControlBindingContext()));return this._oInfoLog;}}return undefined;};c.prototype._getContextObject=function(o){return o?o.getObject(o.getPath()):undefined;};c.prototype.retrieveAdditionalContent=function(){if(this._aAdditionalContent){return Promise.resolve(this._aAdditionalContent);}else{this._oUseDelegateAdditionalContentPromise=this._useDelegateAdditionalContent();return this._oUseDelegateAdditionalContentPromise.then(function(){return Promise.resolve(this._aAdditionalContent);}.bind(this));}};c.prototype._useDelegateAdditionalContent=function(){if(this.awaitControlDelegate()){return this.awaitControlDelegate().then(function(){var p=Object.assign({},this.getPayload());return new Promise(function(r){this.getControlDelegate().fetchAdditionalContent(p,this).then(function(A){this._setAdditionalContent(A===null?[]:A);r();}.bind(this));}.bind(this));}.bind(this));}S.error("mdc.Link retrieveAdditionalContent: control delegate is not set - could not load AdditionalContent from delegate.");return Promise.resolve([]);};c.prototype._setAdditionalContent=function(A){this._aAdditionalContent=A;};c.prototype.retrieveLinkType=function(){if(this.awaitControlDelegate()){return this.awaitControlDelegate().then(function(){var p=Object.assign({},this.getPayload());return this.getControlDelegate().fetchLinkType(p,this);}.bind(this));}S.error("mdc.Link retrieveLinkType: control delegate is not set - could not load LinkType from delegate.");return Promise.resolve(null);};c.prototype.retrieveLinkItems=function(){var p=Object.assign({},this.getPayload());var o=this._getControlBindingContext();return this._retrieveUnmodifiedLinkItems().then(function(u){return this.getControlDelegate().modifyLinkItems(p,o,u).then(function(d){return d;});}.bind(this));};c.prototype._retrieveUnmodifiedLinkItems=function(){if(this._bLinkItemsFetched){return Promise.resolve(this._aLinkItems);}else{this._oUseDelegateItemsPromise=this._useDelegateItems();return this._oUseDelegateItemsPromise.then(function(){return Promise.resolve(this._aLinkItems);}.bind(this));}};c.prototype._useDelegateItems=function(){if(this.awaitControlDelegate()){return this.awaitControlDelegate().then(function(){var p=Object.assign({},this.getPayload());var o=this._getControlBindingContext();var i=this._getInfoLog();return new Promise(function(r){this.getControlDelegate().fetchLinkItems(p,o,i).then(function(d){this._setLinkItems(d===null?[]:d);this._bLinkItemsFetched=d!==null;r();}.bind(this));}.bind(this));}.bind(this));}S.error("mdc.Link _useDelegateItems: control delegate is not set - could not load LinkItems from delegate.");return Promise.resolve();};c.prototype._setLinkItems=function(d){var e=d.filter(function(o){return o.getParent()===null;});e.forEach(function(o){this.addDependent(o);}.bind(this));this._aLinkItems=d;};c.prototype._beforeNavigationCallback=function(e){if(this.awaitControlDelegate()){var p=Object.assign({},this.getPayload());return this.getControlDelegate().beforeNavigationCallback(p,e);}S.error("mdc.Link _beforeNavigationCallback: control delegate is not set - could not load beforeNavigationCallback from delegate.");return Promise.resolve();};c.prototype._getControlBindingContext=function(){var o=this._getSourceControl();return o&&o.getBindingContext()||this.getBindingContext();};c.prototype._getInternalModel=function(){return this.getModel("$sapuimdcLink");};c.prototype._getSourceControl=function(){return typeof this.getSourceControl()==="string"?sap.ui.getCore().byId(this.getSourceControl()):this.getSourceControl();};return c;});
