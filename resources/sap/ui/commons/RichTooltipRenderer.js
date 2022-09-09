/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/ValueStateSupport","sap/ui/core/library"],function(t,i){"use strict";var e=i.ValueState;var a={};a.render=function(i,a){var r=a.getId();i.write("<div ");i.writeControlData(a);i.addClass("sapUiRtt");i.writeClasses();i.write(" ><div><div>");i.write("<div class='sapUiRttTopL'></div><div class='sapUiRttTopR'></div>");i.write("<div class='sapUiRttCL'>");i.write("<div class='sapUiRttCR'>");i.write("<div class='sapUiRttContent'>");var s=a.getTitle();if(s){i.write("<div id='"+r+"-title' role='tooltip' class='sapUiRttTitle'>");i.writeEscaped(s);i.write("</div>");i.write("<div class='sapUiRttSep'></div>")}var d=t.getAdditionalText(a.getParent());var v=a.getAggregation("individualStateText");if(d||v){i.write('<div class="sapUiRttValueStateContainer">');if(d){var l=a.getParent().getValueState();var p=l!==e.None?"ValueState_"+l+".png":"";if(p!==""){p=sap.ui.require.toUrl("sap/ui/commons/themes/"+sap.ui.getCore().getConfiguration().getTheme()+"/img/richtooltip/"+p);i.write('<img id="'+r+'-valueStateImage" class="sapUiRttValueStateImage" src="');i.writeEscaped(p);i.write('">')}}if(v){i.renderControl(v)}else{i.write('<div id="'+r+'-valueStateText" class="sapUiRttValueStateText">');i.writeEscaped(d);i.write("</div>")}i.write("</div>");i.write("<div class='sapUiRttSep'></div>")}i.write('<div class="sapUiRttContentContainer">');var o=a.getImageSrc();if(o){var n=a.getImageAltText();i.write('<img id="'+r+'-image" class="sapUiRttImage"');i.writeAttributeEscaped("alt",n);i.writeAttributeEscaped("src",o);i.write(">")}var w=a.getAggregation("formattedText");if(w){i.renderControl(w)}i.write("</div>");i.write("</div></div></div>");i.write("<div class='sapUiRttBotL'></div>");i.write("<div class='sapUiRttBotR'></div>");i.write("</div></div></div>")};return a},true);
//# sourceMappingURL=RichTooltipRenderer.js.map