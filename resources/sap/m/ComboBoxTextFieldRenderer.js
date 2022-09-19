/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./InputBaseRenderer','sap/ui/core/Renderer'],function(I,R){"use strict";var C=R.extend(I);C.apiVersion=2;C.CSS_CLASS_COMBOBOXTEXTFIELD="sapMComboBoxTextField";C.writeInnerAttributes=function(r,c){r.attr("role","combobox");r.attr("aria-haspopup","listbox");r.attr("aria-autocomplete","both");r.attr("aria-expanded","false");r.attr("autocomplete","off");r.attr("autocorrect","off");r.attr("autocapitalize","off");r.attr("type","text");};C.getAriaRole=function(){};C.addOuterStyles=function(r,c){r.style("max-width",c.getMaxWidth());};C.writeIcons=function(r,i){r.openStart("div").attr("tabindex","-1").attr("aria-hidden","true").class("sapMInputBaseIconContainer").openEnd();i.forEach(r.renderControl,r);r.close("div");};return C;},true);
