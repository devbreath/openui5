/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/testrecorder/interaction/Commands"],function(B,C){"use strict";var p=null;var P=B.extend("sap.ui.testrecorder.codeSnippets.POMethodUtil",{constructor:function(){if(!p){B.apply(this,arguments);}else{return p;}}});P.prototype.getPOMethod=function(s,S,a){if(S&&S.formatAsPOMethod){var b=s.map(function(b){return b.replace(/^/gm,"    ");}).join("\n\n");if(a){return this._getMethodName(S)+": async () => {\n"+b+"\n}";}else{return this._getMethodName(S)+": function () {\n"+b+"\n}";}}else{return s.join("\n\n");}};P.prototype._getMethodName=function(s){if(s.multipleSnippets){switch(s.action){case C.PRESS:case C.ENTER_TEXT:return"iInteractWithTheControls";default:return"iAssertTheUIState";}}else{switch(s.action){case C.PRESS:return"iPressTheControl";case C.ENTER_TEXT:return"iEnterTextInTheControl";default:return"iAssertTheControlState";}}};p=new P();return p;});
