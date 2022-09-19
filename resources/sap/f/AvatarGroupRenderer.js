/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/f/library"],function(l){"use strict";var A=l.AvatarSize;var a={apiVersion:2};a.render=function(r,o){var s="sapFAvatarGroup",g=o.getGroupType(),b=o.getAvatarDisplaySize(),c=o.getAvatarCustomDisplaySize(),d=o.getAvatarCustomFontSize(),e=s+g,I=o.getItems(),S=o._shouldShowMoreButton(),f=o.getProperty("_interactive");r.openStart("div",o).class(s).class(e).class(s+b);if(S){r.class("sapFAvatarGroupShowMore");}if(!f){r.class("sapFAvatarGroupNonInteractive");}if(o._bAutoWidth){r.style("width","auto");}if(g==="Group"){r.attr("role","button");}if(b===A.Custom){r.style("height",c);r.style("min-width",c);r.style("font-size",d);r.style("line-height",c);}r.openEnd();for(var i=0;i<o._iAvatarsToShow;i++){r.renderControl(I[i]);}if(S){r.renderControl(o._oShowMoreButton);}r.close("div");};return a;},true);
