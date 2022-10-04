/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/thirdparty/adaptivecards","sap/ui/integration/cards/adaptivecards/overwrites/inputsGeneralOverwrites"],function(e,t){"use strict";function n(){e.NumberInput.apply(this,arguments)}n.prototype=Object.create(e.NumberInput.prototype);n.prototype.overrideInternalRender=function(){var n=e.TextInput.prototype.overrideInternalRender.call(this,arguments);t.overwriteLabel(this);t.overwriteRequired(this);return n};n.prototype.internalRender=function(){this._numberInputElement=document.createElement("ui5-step-input");this._numberInputElement.id=this.id;this._numberInputElement.placeholder=this.placeholder||"";this._numberInputElement.value=this.defaultValue||"";this._numberInputElement.min=this.min;this._numberInputElement.max=this.max;this._numberInputElement.style.width="13.125rem";t.createValueStateElement(this,this._numberInputElement);this._numberInputElement.addEventListener("input",function(e){this.valueChanged()}.bind(this));return this._numberInputElement};Object.defineProperty(n.prototype,"value",{get:function(){return this._numberInputElement?this._numberInputElement.value:undefined}});n.prototype.updateInputControlAriaLabelledBy=function(){t.overwriteAriaLabelling(this,"accessible-name-ref")};n.prototype.showValidationErrorMessage=function(){if(this.renderedInputControlElement){this.renderedInputControlElement.valueState="Error"}};n.prototype.resetValidationFailureCue=function(){e.TextInput.prototype.resetValidationFailureCue.call(this,arguments);if(this.renderedInputControlElement){this.renderedInputControlElement.valueState="None"}};return n});
//# sourceMappingURL=UI5InputNumber.js.map