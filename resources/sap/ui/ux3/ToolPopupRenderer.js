/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var i={};i.render=function(i,t){var e=sap.ui.getCore().getLibraryResourceBundle("sap.ui.ux3");var s=t.getId();var a=t.getContent();var r=t.getButtons();var d=t.getTitle();var n=sap.ui.resource("sap.ui.core","themes/base/img/1x1.gif");i.write("<div");i.writeControlData(t);i.addClass("sapUiUx3TP");if(d===""){i.addClass("sapUiUx3TPNoTitle")}if(r.length===0){i.addClass("sapUiUx3TPNoButtons")}if(t.isInverted()){i.addClass("sapUiTPInverted");i.addClass("sapUiInverted-CTX")}i.writeClasses();i.write(" aria-labelledby='",s,"-title ",s,"-acc' role='dialog'");i.writeAttribute("tabindex","-1");i.write(">");i.write("<div id='"+s+"-arrow' class='sapUiUx3TPArrow sapUiUx3TPArrowLeft'><div class='sapUiUx3TPArrowBorder'></div></div>");i.write("<span style='display:none;' id='",s,"-acc'>");i.writeEscaped(e.getText("DIALOG_CLOSE_HELP"));i.write("</span>");i.write('<span id="'+s+"-firstFocusable"+'" tabindex="0" class="sapUiUxTPFocus">');i.write('<img src="'+n+'">');i.write("</span>");if(d&&d.length!==""){i.write('<div class="sapUiUx3TPTitle" id="'+s+'-title">');i.write('<span class="sapUiUx3TPTitleText">');i.writeEscaped(d);i.write("</span>");i.write("</div>");i.write('<div class="sapUiUx3TPTitleSep" id="'+s+'-title-separator"></div>')}else{var l=t.getTooltip_AsString();if(l){i.write("<h1 id='"+s+"-title' style='display:none;'>");i.writeEscaped(l);i.write("</h1>")}}i.write('<div id="'+s+'-content"');i.addClass("sapUiUx3TPContent");i.writeClasses();i.write(">");for(var o=0;o<a.length;o++){i.renderControl(a[o])}i.write("</div>");if(r.length>0){i.write('<div class="sapUiUx3TPButtonsSep" id="'+s+'-buttons-separator"></div>');i.write('<div class="sapUiUx3TPBtnRow" id="'+s+'-buttons">');for(var o=0;o<r.length;o++){i.renderControl(r[o].addStyleClass("sapUiUx3TPBtn"))}}else{i.write('<div class="sapUiUx3TPButtonsSep sapUiUx3TPButtonRowHidden" id="'+s+'-buttons-separator"></div>');i.write('<div class="sapUiUx3TPBtnRow sapUiUx3TPButtonRowHidden" id="'+s+'-buttons">')}i.write("</div>");i.write('<span id="'+s+"-lastFocusable"+'" tabindex="0" class="sapUiUxTPFocus">');i.write('<img src="'+n+'">');i.write("</span>");i.write("</div>")};return i},true);
//# sourceMappingURL=ToolPopupRenderer.js.map