/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides the design-time metadata for the sap.ui.webc.main.ResponsivePopover control
sap.ui.define([],
	function () {
		"use strict";

		return {
			name: {
				singular: "RESPONSIVE_POPOVER_NAME",
				plural: "RESPONSIVE_POPOVER_NAME_PLURAL"
			},
			actions: {
				remove: {
					changeType: "hideControl"
				},
				rename: {
					changeType: "rename",
					domRef: function (oControl) {
						return oControl.getDomRef().shadowRoot.querySelector(".ui5-popup-header-text");
					},
					getTextMutators: function (oControl) {
						return {
							getText: function () {
								return oControl.getDomRef().getAttribute("header-text");
							},
							setText: function (sNewText) {
								oControl.getDomRef().setAttribute("header-text", sNewText);
							}
						};
					}
				},
				reveal: {
					changeType: "unhideControl"
				}
			}
		};
	});