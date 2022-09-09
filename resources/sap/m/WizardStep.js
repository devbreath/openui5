/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/core/Control","sap/ui/core/InvisibleText","./WizardStepRenderer","./Button","./TitlePropagationSupport","sap/base/Log"],function(t,e,i,s,n,o,r){"use strict";var a=e.extend("sap.m.WizardStep",{metadata:{properties:{title:{type:"string",group:"Appearance",defaultValue:""},icon:{type:"sap.ui.core.URI",group:"Appearance",defaultValue:""},validated:{type:"boolean",group:"Behavior",defaultValue:true},optional:{type:"boolean",group:"Appearance",defaultValue:false}},events:{complete:{parameters:{}},activate:{parameters:{}}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.core.Control",multiple:true,singularName:"content"},_nextButton:{type:"sap.m.Button",multiple:false,visibility:"hidden"}},associations:{subsequentSteps:{type:"sap.m.WizardStep",multiple:true,singularName:"subsequentStep"},nextStep:{type:"sap.m.WizardStep",multiple:false}}}});var u=t.ButtonType;o.call(a.prototype,"content",function(){return this.getId()+"-title"});a.prototype.init=function(){this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.m");this._oNumberInvisibleText=new i({id:this.getId()+"-NumberedTitle"}).toStatic();this._createNextButton();this._initTitlePropagationSupport()};a.prototype._createNextButton=function(){this._oNextButton=new n(this.getId()+"-nextButton",{text:this._oResourceBundle.getText("WIZARD_STEP")+2,type:u.Emphasized,press:this._complete.bind(this)}).addStyleClass("sapMWizardNextButtonVisible");this.setAggregation("_nextButton",this._oNextButton)};a.prototype.setWizardContext=function(t){["bLast","bReviewStep","sButtonText","bParentAllowsButtonShow"].forEach(function(e){if(typeof t[e]!=="undefined"){this[e]=t[e]}}.bind(this));this._oNextButton.setText(this.sButtonText);this.setLast(this.bLast);this.setButtonVisibility()};a.prototype._getNumberInvisibleText=function(){return this._oNumberInvisibleText};a.prototype._setNumberInvisibleText=function(t){return this._oNumberInvisibleText.setText(this._oResourceBundle.getText("WIZARD_STEP")+t+" "+this.getTitle())};a.prototype.setValidated=function(t){this.setProperty("validated",t,true);this.setButtonVisibility();return this};a.prototype.setNextStep=function(t){this.setAssociation("nextStep",t,true);var e=this._getWizardParent();if(e!==null){e._checkCircularReference(this._getNextStepReference());e._updateProgressNavigator()}return this};a.prototype.setVisible=function(t){this.setProperty("visible",t,true);r.warning("Don't use the set visible method for wizard steps. If you need to show/hide steps based on some condition - use the branching property of the Wizard instead.");return this};a.prototype._isLeaf=function(){if(this.getNextStep()===null&&this.getSubsequentSteps().length===0){return true}return false};a.prototype._isBranched=function(){return this.getSubsequentSteps().length>1};a.prototype._getNextStepReference=function(){if(this.getNextStep()!==null){return sap.ui.getCore().byId(this.getNextStep())}if(this.getSubsequentSteps().length===1){return sap.ui.getCore().byId(this.getSubsequentSteps()[0])}return null};a.prototype._containsSubsequentStep=function(t){return this.getSubsequentSteps().some(function(e){return e===t})};a.prototype._getWizardParent=function(){var t=this.getParent();while(!(t instanceof sap.m.Wizard)){if(t===null){return null}t=t.getParent()}return t};a.prototype.setLast=function(t){this.bLast=t;this.toggleStyleClass("sapMWizardLastActivatedStep",t);this.setButtonVisibility()};a.prototype.setButtonVisibility=function(){var t=this.getValidated()&&this.bParentAllowsButtonShow&&this.bLast;if(typeof t==="undefined"){return}this.displayButton(t)};a.prototype.displayButton=function(t){this._oNextButton.toggleStyleClass("sapMWizardNextButtonHidden",!t);this._oNextButton.toggleStyleClass("sapMWizardNextButtonVisible",t);this._oNextButton.setVisible(t)};a.prototype._activate=function(){this.setLast(true);this.addStyleClass("sapMWizardStepActivated");this.fireActivate()};a.prototype._deactivate=function(){this.removeStyleClass("sapMWizardStepActivated")};a.prototype._complete=function(){var t=this._getWizardParent();this.setLast(this.bReviewStep||false);this.fireComplete();if(t!==null){t._handleNextButtonPress()}};a.prototype.exit=function(){this._oNumberInvisibleText.destroy();this._oNumberInvisibleText=null};return a});
//# sourceMappingURL=WizardStep.js.map