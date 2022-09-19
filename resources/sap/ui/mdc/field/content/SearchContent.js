/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/field/content/DefaultContent","sap/ui/model/BindingMode"],function(D,B){"use strict";var S=Object.assign({},D,{getDisplayMultiValue:function(){return[null];},getDisplayMultiLine:function(){return[null];},getEdit:function(){return["sap/m/SearchField"];},getEditMultiValue:function(){return[null];},getEditMultiLine:function(){return[null];},getEditForHelp:function(){return[null];},getUseDefaultEnterHandler:function(){return false;},getUseDefaultFieldHelp:function(){return false;},createEdit:function(c,C,i){var a=C[0];var o=c.getConditionsType();c.setHideOperator(true);c.updateConditionType();var b=new a(i,{value:{path:"$field>/conditions",type:o,mode:B.OneWay},placeholder:"{$field>/placeholder}",width:"100%",tooltip:"{$field>/tooltip}",search:c.getHandleEnter(),change:c.getHandleContentChange(),liveChange:c.getHandleContentLiveChange()});c.setAriaLabelledBy(b);c.setBoundProperty("value");return[b];},createEditMultiValue:function(){throw new Error("sap.ui.mdc.field.content.SearchContent - createEditMultiValue not defined!");},createEditMultiLine:function(){throw new Error("sap.ui.mdc.field.content.SearchContent - createEditMultiLine not defined!");},createDisplayMultiValue:function(){throw new Error("sap.ui.mdc.field.content.SearchContent - createDisplayMultiValue not defined!");},createDisplayMultiLine:function(){throw new Error("sap.ui.mdc.field.content.SearchContent - createDisplayMultiLine not defined!");},createEditForHelp:function(){throw new Error("sap.ui.mdc.field.content.SearchContent - createEditForHelp not defined!");}});return S;});
