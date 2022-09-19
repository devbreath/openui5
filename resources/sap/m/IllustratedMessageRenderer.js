/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var I={apiVersion:2};I.render=function(r,i){var o=i._getIllustration(),s=i._getTitle(),a=i._getDescription(),b=i.getAdditionalContent(),c=i.getEnableVerticalResponsiveness();r.openStart("figure",i);r.class("sapMIllustratedMessage");if(c){r.class("sapMIllustratedMessageScalable");}r.openEnd();r.renderControl(o);r.openStart("figcaption").openEnd();r.renderControl(s);r.renderControl(a.addStyleClass("sapMIllustratedMessageDescription"));r.close("figcaption");r.openStart("div");r.class("sapMIllustratedMessageAdditionalContent");r.openEnd();b.forEach(function(C){r.renderControl(C);});r.close("div");r.close("figure");};return I;},true);
