/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/mvc/Controller","sap/ui/core/Core"],function(F,C){"use strict";var a=F.extend("sap.ui.integration.editor.fields.fragment.Controller",{});a.prototype.init=function(){};a.prototype.setField=function(f){this._oField=f;};a.prototype.saveValue=function(v){var l=C.getConfiguration().getLanguage().replaceAll('_','-');var c=this._oField.getConfiguration();if(c.type==="string"&&c.translatable){this._oField.setTranslationValueInTexts(l,c.manifestpath,v);}else{this._oField._settingsModel.setProperty(c.manifestpath,v);}};return a;});
