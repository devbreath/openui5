/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./ButtonRenderer','sap/ui/core/Renderer'],function(B,R){"use strict";var T=R.extend(B);T.renderButtonAttributes=function(r,t){r.addClass("sapUiToggleBtn");if(t.getPressed()){r.addClass("sapUiToggleBtnPressed");r.writeAttribute('aria-pressed',true);}else{r.writeAttribute('aria-pressed',false);}};T.onactivePressed=function(t){t.$().addClass("sapUiToggleBtnPressed").attr('aria-pressed',true);};T.ondeactivePressed=function(t){t.$().removeClass("sapUiToggleBtnPressed").attr('aria-pressed',false);};T.updateImage=function(t){t.$("img").attr('src',this._getIconForState(t,"base"));};T._getIconForState=function(b,s){var i;switch(s){case"mouseout":case"focus":case"blur":case"base":return b.getPressed()&&b.getIconSelected()?b.getIconSelected():b.getIcon();case"active":i=b.getIconSelected();return i?i:b.getIcon();case"mouseover":case"deactive":i=b.getIconHovered();if(i){return i;}else if(b.getPressed()&&b.getIconSelected()){return b.getIconSelected();}else{return b.getIcon();}}return b.getIcon();};return T;},true);
