/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/propertyEditor/BasePropertyEditor","sap/base/util/deepClone","sap/base/util/deepEqual","sap/base/util/ObjectPath","sap/ui/model/json/JSONModel","sap/base/util/restricted/_merge","sap/ui/integration/designtime/baseEditor/util/binding/resolveBinding","sap/ui/integration/designtime/baseEditor/util/unset","sap/base/util/restricted/_isNil","sap/base/strings/formatMessage","sap/base/util/isEmptyObject"],function(B,d,a,O,J,_,r,u,b,f,i){"use strict";var A=B.extend("sap.ui.integration.designtime.baseEditor.propertyEditor.arrayEditor.ArrayEditor",{xmlFragment:"sap.ui.integration.designtime.baseEditor.propertyEditor.arrayEditor.ArrayEditor",metadata:{library:"sap.ui.integration",properties:{value:{type:"any"}}},renderer:B.getMetadata().getRenderer().render});A.configMetadata=Object.assign({},B.configMetadata,{allowAddAndRemove:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"},allowSorting:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"},collapsibleItems:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"},showItemLabel:{defaultValue:true,mergeStrategy:"mostRestrictiveWins"},template:{defaultValue:{}},typeLabel:{defaultValue:"BASE_EDITOR.TYPES.ARRAY"}});A.prototype.init=function(){B.prototype.init.apply(this,arguments);this._itemsModel=new J();this._itemsModel.setDefaultBindingMode("OneWay");this.setModel(this._itemsModel,"itemsModel");};A.prototype.setValue=function(v){v=Array.isArray(v)?v:[];B.prototype.setValue.call(this,v);this._handleValueChange(this.getValue());};A.prototype._handleValueChange=function(v){var c=this.getConfig();var I=[];(v||[]).forEach(function(V,e){var o=d(V);var D=this.getNestedDesigntimeMetadata(e);var m={itemLabel:c.itemLabel||this.getI18nProperty("BASE_EDITOR.ARRAY.ITEM_LABEL"),index:e,total:v.length,properties:Object.keys(c.template).map(function(k){var t=c.template[k];var P=e+"/"+t.path;var g=O.get(P.split("/"),v);if(typeof g==="undefined"){O.set(t.path.split('/'),d(t.defaultValue),o);}return _({},t,{path:P,value:g,designtime:(D||{})[k]});},this)};var p=new J(o);m.properties=r(m.properties,{"":p},{"":p.getContext("/")},["template","value","itemLabel"]);m.itemLabel=r({itemLabel:m.itemLabel},{"":p},{"":p.getContext("/")}).itemLabel||f(this.getI18nProperty("BASE_EDITOR.ARRAY.NEW_ITEM_LABEL"),[c.addItemLabel||this.getI18nProperty("BASE_EDITOR.ARRAY.ITEM_LABEL")]);p.destroy();I.push(m);},this);this._itemsModel.setData(I);};A.prototype.onBeforeConfigChange=function(c){if(!c.collapsibleItems){this.setFragment("sap.ui.integration.designtime.baseEditor.propertyEditor.arrayEditor.ArrayEditorPlain");}return c;};A.prototype.getExpectedWrapperCount=function(v){return v.length;};A.prototype._removeItem=function(e){var I=e.getSource().data("index");var v=(this.getValue()||[]).slice();v.splice(I,1);this.setValue(v);};A.prototype._addItem=function(){var c=this.getConfig();var v=(this.getValue()||[]).slice();var D={};Object.keys(c.template).forEach(function(k){var p=c.template[k];if(p.type==="array"){D[k]=[];}});v.push(D);this.setValue(v);};A.prototype._moveUp=function(e){var I=e.getSource().data("index");if(I>0){var v=this.getValue().slice();var R=v.splice(I,1)[0];v.splice(I-1,0,R);this.setValue(v);}};A.prototype._moveDown=function(e){var I=e.getSource().data("index");var v=this.getValue().slice();if(I<v.length-1){var R=v.splice(I,1)[0];v.splice(I+1,0,R);this.setValue(v);}};A.prototype._propertyEditorsChange=function(e){e.getParameter("previousPropertyEditors").forEach(function(p){p.detachValueChange(this._onPropertyValueChange,this);p.detachDesigntimeMetadataChange(this._onDesigntimeMetadataChange,this);},this);e.getParameter("propertyEditors").forEach(function(p){p.attachValueChange(this._onPropertyValueChange,this);p.attachDesigntimeMetadataChange(this._onDesigntimeMetadataChange,this);},this);};A.prototype._onPropertyValueChange=function(e){var p=e.getSource();var E=d(this.getValue()||[]);var P=e.getParameter("path");var c=P.split("/");var v=e.getParameter("value");O.set(c,v,E);if(typeof v==="undefined"||a(v,p.getConfig().defaultValue)){u(E,c,c.length-2);}this.setValue(E);};A.prototype._onDesigntimeMetadataChange=function(e){var n={};O.set(e.getParameter("path").split("/"),e.getParameter("value"),n);this.setDesigntimeMetadata(_({},this.getDesigntimeMetadata(),n));this.setValue(this.getValue());};A.prototype._isNewItem=function(m){return(m&&m.properties||[]).every(function(o){var v=o.value;return b(v)||Array.isArray(v)&&v.length===0||i(v);});};A.prototype.formatAddItemText=function(s,I,F){return f(s,[I||F]);};return A;});
