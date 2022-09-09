/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./TextFieldRenderer","sap/ui/core/Renderer","sap/ui/core/library"],function(e,t,i){"use strict";var r=i.ValueState;var d=t.extend(e);d.renderOuterAttributes=function(e,t){e.addClass("sapUiTfCombo");this.renderComboARIAInfo(e,t)};d.renderOuterContentBefore=function(e,t){this.renderExpander(e,t);this.renderSelectBox(e,t,"-1")};d.renderExpander=function(e,t){e.write("<div");e.writeAttributeEscaped("id",t.getId()+"-icon");e.writeAttribute("unselectable","on");if(sap.ui.getCore().getConfiguration().getAccessibility()){e.writeAttribute("role","presentation")}e.addClass("sapUiTfComboIcon");e.writeClasses();e.write(">&#9660;</div>")};d.renderSelectBox=function(e,t,i){if(t.mobile){e.write("<select");e.writeAttributeEscaped("id",t.getId()+"-select");e.writeAttribute("tabindex",i);if(!t.getEnabled()||!t.getEditable()){e.writeAttribute("disabled","disabled")}e.write(">");for(var r=0;r<t.getItems().length;r++){var d=t.getItems()[r];e.write("<option");e.writeAttributeEscaped("id",t.getId()+"-"+d.getId());if(!d.getEnabled()){e.writeAttribute("disabled","disabled")}e.write(">");e.writeEscaped(d.getText());e.write("</option>")}e.write("</select>")}};d.renderOuterContent=function(e,t){if(t.getDisplaySecondaryValues()){e.write('<span id="'+t.getId()+'-SecVal" style="display: none;"></span>')}};d.renderInnerAttributes=function(e,t){if(t.mobile){e.writeAttribute("autocapitalize","off");e.writeAttribute("autocorrect","off")}};d.renderComboARIAInfo=function(e,t){var i=t.getListBox();if(!i&&t._oListBox){i=t._oListBox.getId()}var r={role:"combobox",owns:t.getId()+"-input "+i};if(!t.getEnabled()){r["disabled"]=true}e.writeAccessibilityState(null,r)};d.renderARIAInfo=function(e,t){var i=-1;if(t.getSelectedItemId()){for(var d=0;d<t.getItems().length;d++){var a=t.getItems()[d];if(a.getId()==t.getSelectedItemId()){i=d+1;break}}}var n={autocomplete:"inline",live:"polite",setsize:t.getItems().length,posinset:i>=0?i:undefined};if(t.getValueState()==r.Error){n["invalid"]=true}if(t.getDisplaySecondaryValues()){n["describedby"]={value:t.getId()+"-SecVal",append:true}}e.writeAccessibilityState(t,n)};d.setEditable=function(t,i){if(t.mobile){var r=t.$("select");if(i&&t.getEnabled()){r.removeAttr("disabled")}else{r.attr("disabled","disabled")}}e.setEditable.apply(this,arguments)};d.setEnabled=function(t,i){if(t.mobile){var r=t.$("select");if(i&&t.getEditable()){r.removeAttr("disabled")}else{r.attr("disabled","disabled")}}e.setEnabled.apply(this,arguments)};return d},true);
//# sourceMappingURL=ComboBoxRenderer.js.map