/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ButtonRenderer","sap/ui/core/Renderer"],function(e,t){"use strict";var s=t.extend(e);s.renderButtonAttributes=function(e,t){e.addClass("sapUiToggleBtn");if(t.getPressed()){e.addClass("sapUiToggleBtnPressed");e.writeAttribute("aria-pressed",true)}else{e.writeAttribute("aria-pressed",false)}};s.onactivePressed=function(e){e.$().addClass("sapUiToggleBtnPressed").attr("aria-pressed",true)};s.ondeactivePressed=function(e){e.$().removeClass("sapUiToggleBtnPressed").attr("aria-pressed",false)};s.updateImage=function(e){e.$("img").attr("src",this._getIconForState(e,"base"))};s._getIconForState=function(e,t){var s;switch(t){case"mouseout":case"focus":case"blur":case"base":return e.getPressed()&&e.getIconSelected()?e.getIconSelected():e.getIcon();case"active":s=e.getIconSelected();return s?s:e.getIcon();case"mouseover":case"deactive":s=e.getIconHovered();if(s){return s}else if(e.getPressed()&&e.getIconSelected()){return e.getIconSelected()}else{return e.getIcon()}}return e.getIcon()};return s},true);
//# sourceMappingURL=ToggleButtonRenderer.js.map