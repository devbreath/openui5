/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/includes","sap/base/util/restricted/_omit","sap/base/Log","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/Component","sap/ui/core/Element","sap/ui/fl/apply/_internal/appVariant/DescriptorChangeTypes","sap/ui/fl/apply/_internal/changes/Applier","sap/ui/fl/apply/_internal/changes/Reverter","sap/ui/fl/apply/_internal/flexObjects/FlexObjectFactory","sap/ui/fl/apply/_internal/ChangesController","sap/ui/fl/descriptorRelated/api/DescriptorChangeFactory","sap/ui/fl/initial/_internal/changeHandlers/ChangeHandlerStorage","sap/ui/fl/write/_internal/appVariant/AppVariantInlineChangeFactory","sap/ui/core/Core"],function(e,n,t,a,r,c,i,o,l,p,s,g,f,h,u){"use strict";var C={create:function(n){var a;if(e(i.getChangeTypes(),n.changeSpecificData.changeType)){a=s.getDescriptorFlexControllerInstance(n.selector);var c=a.getComponentName();var o;if(n.changeSpecificData.layer){o=n.changeSpecificData.layer;delete n.changeSpecificData.layer}var l={changeType:n.changeSpecificData.changeType,content:n.changeSpecificData.content};if(n.changeSpecificData.texts){l.texts=n.changeSpecificData.texts}return h.createDescriptorInlineChange(l).then(function(e){return(new g).createNew(c,e,o,n.selector)}).catch(function(e){t.error("the change could not be created.",e.message);throw e})}if(n.changeSpecificData.changeType==="codeExt"){return p.createControllerExtensionChange(n.changeSpecificData)}if(n.selector.name&&n.selector.view){a=s.getFlexControllerInstance(n.selector.view)}else{a=s.getFlexControllerInstance(n.selector)}if(n.selector instanceof r){return a.createBaseChange(n.changeSpecificData,n.selector)}if(n.selector.name&&n.selector.view){return a.createChangeWithExtensionPointSelector(n.changeSpecificData,n.selector)}return a.createChangeWithControlSelector(n.changeSpecificData,n.selector)},apply:function(e){if(!(e.element instanceof c)){return Promise.reject("Please provide an Element")}var t=s.getFlexControllerInstance(e.element);e.appComponent=s.getAppComponentForSelector(e.element);if(!e.modifier){e.modifier=a}return o.applyChangeOnControl(e.change,e.element,n(e,["element","change"])).then(function(n){var a=t.getOpenDependentChangesForControl(e.change.getSelector(),e.appComponent);if(a.length>0){return C.revert({change:e.change,element:e.element}).then(function(){var n=u.getLibraryResourceBundle("sap.ui.fl");var t=a.map(function(e){return e.getId()}).join(", ");throw Error(n.getText("MSG_DEPENDENT_CHANGE_ERROR",[e.change.getId(),t]))})}return n})},revert:function(e){var n;if(e.element instanceof c){n=s.getAppComponentForSelector(e.element)}var t={modifier:a,appComponent:n};return l.revertChangeOnControl(e.change,e.element,t)},getChangeHandler:function(e){var n=e.controlType||e.modifier.getControlType(e.element);return f.getChangeHandler(e.changeType,n,e.element,e.modifier,e.layer)}};return C});
//# sourceMappingURL=ChangesWriteAPI.js.map