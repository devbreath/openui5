/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./ButtonRenderer','sap/ui/core/Renderer'],function(B,R){"use strict";var M=R.extend(B);M.renderButtonAttributes=function(r,c){if(sap.ui.getCore().getConfiguration().getAccessibility()){r.writeAttribute("aria-haspopup","true");}};M.renderButtonContentAfter=function(r,c){r.write("<span class=\"sapUiMenuButtonIco\"></span>");};return M;},true);
