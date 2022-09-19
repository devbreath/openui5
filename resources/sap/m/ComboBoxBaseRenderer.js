/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./ComboBoxTextFieldRenderer','sap/ui/core/Renderer'],function(C,R){"use strict";var a=R.extend(C);a.apiVersion=2;a.CSS_CLASS_COMBOBOXBASE="sapMComboBoxBase";a.getAccessibilityState=function(c){var A=C.getAccessibilityState.call(this,c),l=c._getList();if(l){A.controls=l.getId();}return A;};a.addOuterClasses=function(r,c){C.addOuterClasses.apply(this,arguments);var b=a.CSS_CLASS_COMBOBOXBASE;r.class(b);if(!c.getEnabled()){r.class(b+"Disabled");}if(!c.getEditable()){r.class(b+"Readonly");}};a.addButtonClasses=function(r,c){C.addButtonClasses.apply(this,arguments);r.class(a.CSS_CLASS_COMBOBOXBASE+"Arrow");};return a;},true);
