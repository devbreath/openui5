/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseContentRenderer","../library"],function(B,l){"use strict";var T=B.extend("sap.ui.integration.cards.TableContentRenderer",{apiVersion:2});T.getMinHeight=function(c,C,o){var m=o.getContentPageSize(c);if(!m){return this.DEFAULT_MIN_HEIGHT;}var i=this.isCompact(C),r=i?2:2.75,t=i?2:2.75;return(m*r+t)+"rem";};T.getItemMinHeight=function(c,C){if(!c||!c.row){return 0;}var i=this.isCompact(C);return i?2:2.75;};return T;});
