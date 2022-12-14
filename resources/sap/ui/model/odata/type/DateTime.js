/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/model/odata/type/DateTimeBase"],function(L,D){"use strict";function a(t,c){var A={};if(c){switch(c.displayFormat){case"Date":A.isDateOnly=true;break;case undefined:break;default:L.warning("Illegal displayFormat: "+c.displayFormat,null,t.getName());}A.nullable=c.nullable;}return A;}var b=D.extend("sap.ui.model.odata.type.DateTime",{constructor:function(f,c){D.call(this,f,a(this,c));}});b.prototype.getConstraints=function(){var c=D.prototype.getConstraints.call(this);if(c.isDateOnly){c.displayFormat="Date";delete c.isDateOnly;}return c;};b.prototype.getName=function(){return"sap.ui.model.odata.type.DateTime";};return b;});
