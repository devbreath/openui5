/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./Binding'],function(B){"use strict";var C=B.extend("sap.ui.model.ContextBinding",{constructor:function(m,p,c,P,e){B.call(this,m,p,c,P,e);this.oElementContext=null;this.bInitial=true;},metadata:{publicMethods:["getBoundContext"]}});C.prototype.checkUpdate=function(f){};C.prototype.getBoundContext=function(){return this.oElementContext;};return C;});
