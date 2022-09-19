/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Core"],function(C){"use strict";var S={apiVersion:2};var r=C.getLibraryResourceBundle("sap.tnt");S.render=function(a,c){this.startSideNavigation(a,c);this.renderArrowUp(a,c);this.renderItem(a,c);this.renderArrowDown(a,c);this.renderFixedItem(a,c);this.renderFooter(a,c);this.endSideNavigation(a,c);};S.startSideNavigation=function(a,c){var i=c.getAggregation('item');var f=c.getAggregation('fixedItem');var b=c.getExpanded();var A=c.getAriaLabel();a.openStart('div',c);a.attr("role",'navigation');a.attr('aria-roledescription',r.getText("SIDENAVIGATION_ROLE_DESCRIPTION"));if(A){a.accessibilityState(c,{label:A});}a.class('sapTntSideNavigation');a.class("sapContrast");a.class("sapContrastPlus");if(!b){a.class('sapTntSideNavigationNotExpanded');a.class('sapTntSideNavigationNotExpandedWidth');}if(!b&&i){i.setExpanded(false);}if(!b&&f){f.setExpanded(false);}a.openEnd();};S.endSideNavigation=function(a,c){a.close('div');};S.renderArrowUp=function(a,c){a.renderControl(c._getTopArrowControl());};S.renderArrowDown=function(a,c){a.renderControl(c._getBottomArrowControl());};S.renderItem=function(a,c){var i=c.getAggregation('item');a.openStart('div',c.getId()+'-Flexible');a.attr('tabindex','-1');a.class('sapTntSideNavigationFlexible');a.class('sapTntSideNavigationVerticalScrolling');a.openEnd();a.openStart('div',c.getId()+'-Flexible-Content');a.class('sapTntSideNavigationFlexibleContent');a.openEnd();a.renderControl(i);a.close('div');a.close('div');};S.renderFixedItem=function(a,c){var f=c.getAggregation('fixedItem');if(f===null){return;}if(f.getExpanded()===false){f.setExpanded(false);}a.openStart('div');a.attr('role','separator');a.attr('aria-roledescription',r.getText("SIDENAVIGATION_ROLE_DESCRIPTION_SEPARATOR"));a.attr('aria-orientation','horizontal');a.class('sapTntSideNavigationSeparator');a.openEnd();a.close('div');a.openStart('div');a.class('sapTntSideNavigationFixed');a.openEnd();a.renderControl(f);a.close('div');};S.renderFooter=function(a,c){if(c.getAggregation('footer')){a.openStart('footer');a.class('sapTntSideNavigationFooter');a.openEnd();a.renderControl(c.getAggregation('footer'));a.close('footer');}};return S;},true);
