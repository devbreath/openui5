/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/includes","sap/base/util/restricted/_omit","sap/base/Log","sap/ui/core/util/reflection/JsControlTreeModifier","sap/ui/core/Component","sap/ui/core/Element","sap/ui/fl/apply/_internal/appVariant/DescriptorChangeTypes","sap/ui/fl/apply/_internal/changes/Applier","sap/ui/fl/apply/_internal/changes/Reverter","sap/ui/fl/apply/_internal/flexObjects/FlexObjectFactory","sap/ui/fl/apply/_internal/ChangesController","sap/ui/fl/descriptorRelated/api/DescriptorChangeFactory","sap/ui/fl/initial/_internal/changeHandlers/ChangeHandlerStorage","sap/ui/fl/write/_internal/appVariant/AppVariantInlineChangeFactory"],function(i,_,L,J,C,E,D,A,R,F,a,b,c,d){"use strict";var e={create:function(p){var f;if(i(D.getChangeTypes(),p.changeSpecificData.changeType)){f=a.getDescriptorFlexControllerInstance(p.selector);var r=f.getComponentName();var l;if(p.changeSpecificData.layer){l=p.changeSpecificData.layer;delete p.changeSpecificData.layer;}var I={changeType:p.changeSpecificData.changeType,content:p.changeSpecificData.content};if(p.changeSpecificData.texts){I.texts=p.changeSpecificData.texts;}return d.createDescriptorInlineChange(I).then(function(o){return new b().createNew(r,o,l,p.selector);}).catch(function(o){L.error("the change could not be created.",o.message);throw o;});}if(p.changeSpecificData.changeType==="codeExt"){return F.createControllerExtensionChange(p.changeSpecificData);}if(p.selector.name&&p.selector.view){f=a.getFlexControllerInstance(p.selector.view);}else{f=a.getFlexControllerInstance(p.selector);}if(p.selector instanceof C){return f.createBaseChange(p.changeSpecificData,p.selector);}if(p.selector.name&&p.selector.view){return f.createChangeWithExtensionPointSelector(p.changeSpecificData,p.selector);}return f.createChangeWithControlSelector(p.changeSpecificData,p.selector);},apply:function(p){if(!(p.element instanceof E)){return Promise.reject("Please provide an Element");}var f=a.getFlexControllerInstance(p.element);p.appComponent=a.getAppComponentForSelector(p.element);if(!p.modifier){p.modifier=J;}return A.applyChangeOnControl(p.change,p.element,_(p,["element","change"])).then(function(r){var g=f.checkForOpenDependenciesForControl(p.change.getSelector(),p.appComponent);if(g){return e.revert({change:p.change,element:p.element}).then(function(){throw Error("The following Change cannot be applied because of a dependency: "+p.change.getId());});}return r;});},revert:function(p){var o;if(p.element instanceof E){o=a.getAppComponentForSelector(p.element);}var r={modifier:J,appComponent:o};return R.revertChangeOnControl(p.change,p.element,r);},getChangeHandler:function(p){var s=p.controlType||p.modifier.getControlType(p.element);return c.getChangeHandler(p.changeType,s,p.element,p.modifier,p.layer);}};return e;});
