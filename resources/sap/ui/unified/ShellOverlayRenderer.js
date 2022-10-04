/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Configuration"],function(e){"use strict";var i={};i.render=function(t,r){t.write("<div");t.writeControlData(r);t.addClass("sapUiUfdShellOvrly");if(r._opening){t.addClass("sapUiUfdShellOvrlyCntntHidden");t.addClass("sapUiUfdShellOvrlyOpening")}if(r._getAnimActive()){t.addClass("sapUiUfdShellOvrlyAnim")}t.writeClasses();if(e.getAccessibility()){t.writeAccessibilityState(r,{role:"dialog"})}t.write("><span id='",r.getId(),"-focfirst' tabindex='0'></span><div id='",r.getId(),"-inner'>");t.write("<header class='sapUiUfdShellOvrlyHead'>");t.write("<hr class='sapUiUfdShellOvrlyBrand'>");t.write("<div class='sapUiUfdShellOvrlyHeadCntnt'");if(e.getAccessibility()){t.writeAttribute("role","toolbar")}t.write("><div id='"+r.getId()+"-hdr-center' class='sapUiUfdShellOvrlyHeadCenter'>");i.renderSearch(t,r);t.write("</div>");var d=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified"),a=d.getText("SHELL_OVERLAY_CLOSE");t.write("<a tabindex='0' href='#' id='"+r.getId()+"-close' class='sapUiUfdShellOvrlyHeadClose'");t.writeAttributeEscaped("title",a);if(e.getAccessibility()){t.writeAttribute("role","button")}t.write(">");t.writeEscaped(a);t.write("</a></div></header>");t.write("<div id='"+r.getId()+"-cntnt' class='sapUiUfdShellOvrlyCntnt'>");i.renderContent(t,r);t.write("</div>");t.write("</div><span id='",r.getId(),"-foclast' tabindex='0'></span></div>")};i.renderSearch=function(e,i){var t=i._getSearchWidth();e.write("<div id='"+i.getId()+"-search' class='sapUiUfdShellOvrlySearch' ");if(t>0&&i._opening){e.addStyle("width",t+"px'");e.writeStyles()}e.write("><div>");var r=i.getSearch();if(r){e.renderControl(r)}e.write("</div></div>")};i.renderContent=function(e,i){e.write("<div>");var t=i.getContent();for(var r=0;r<t.length;r++){e.renderControl(t[r])}e.write("</div>")};return i},true);
//# sourceMappingURL=ShellOverlayRenderer.js.map