/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/changeHandler/BaseAddXml"],function(B){"use strict";var A={};A.applyChange=function(c,C,p){var o=c.getContent();var m={aggregationName:o.targetAggregation,index:o.index};return B.applyChange(c,C,p,m);};A.revertChange=B.revertChange;A.completeChangeContent=function(c,s){var C={};if(s.targetAggregation){C.targetAggregation=s.targetAggregation;}else{B._throwMissingAttributeError("targetAggregation");}if(s.index!==undefined){C.index=s.index;}else{B._throwMissingAttributeError("index");}B.completeChangeContent(c,s,C);};return A;},true);
