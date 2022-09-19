/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/Extension","sap/base/Log"],function(B,L){"use strict";var E=B.extend("sap.ui.integration.editor.Extension");E.prototype.init=function(){B.prototype.init.apply(this,arguments);this._oEditorInterface=null;this._oEditor=null;};E.prototype.exit=function(){B.prototype.exit.apply(this,arguments);this._oEditorInterface=null;this._oEditor=null;};E.prototype.setFormatters=function(f){B.prototype.setFormatters.apply(this,arguments);if(!this._oEditor){return;}if(this._oEditor.getAggregation("_extension")!==this){L.error("Extension formatters must be set before the initialization of the editor. Do this inside Extension#init().");}};E.prototype.onEditorReady=function(){};E.prototype.getEditor=function(){return this._oEditorInterface;};E.prototype._setEditor=function(e,o){this._oEditor=e;this._oEditorInterface=o;};return E;});
