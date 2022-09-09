/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor"],function(e){"use strict";var t=e.extend("sap.ui.integration.designtime.baseEditor.propertyEditor.selectEditor.SelectEditor",{xmlFragment:"sap.ui.integration.designtime.baseEditor.propertyEditor.selectEditor.SelectEditor",metadata:{library:"sap.ui.integration"},renderer:e.getMetadata().getRenderer().render});t.configMetadata=Object.assign({},e.configMetadata,{allowBindings:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"},allowCustomValues:{defaultValue:false,mergeStrategy:"mostRestrictiveWins",mostRestrictiveValue:true}});t.prototype.getDefaultValidators=function(){var t=this.getConfig();return Object.assign({},e.prototype.getDefaultValidators.call(this),{isValidBinding:{type:"isValidBinding",isEnabled:t.allowBindings},notABinding:{type:"notABinding",isEnabled:!t.allowBindings},isSelectedKey:{type:"isSelectedKey",config:{keys:function(e){return e.getConfig().items.map(function(e){return e.key})}},isEnabled:!t.allowCustomValues}})};t.prototype._onChange=function(){var e=this.getContent();var t=e.getSelectedKey();var i=e.getValue();this.setValue(t||i)};t.prototype._getItemTitle=function(e){var t=this.getConfig()&&this.getConfig().items||[];var i=t.find(function(t){return t.key===e});return(i||{}).title||e};return t});
//# sourceMappingURL=SelectEditor.js.map