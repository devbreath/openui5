/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./BaseFilter","sap/m/Select","sap/ui/core/ListItem","sap/ui/model/json/JSONModel","sap/ui/integration/util/BindingResolver"],function(B,S,L,J,a){"use strict";var b=B.extend("sap.ui.integration.cards.filters.SelectFilter",{metadata:{library:"sap.ui.integration",aggregations:{_select:{type:"sap.m.Select",multiple:false,visibility:"hidden"}}},renderer:{apiVersion:2}});b.prototype.exit=function(){B.prototype.exit.apply(this,arguments);if(this._oItemTemplate){this._oItemTemplate.destroy();}};b.prototype.getField=function(){return this._getSelect();};b.prototype.onDataChanged=function(){var s=this._getSelect();s.setSelectedKey(this.getValue().value);};b.prototype.getValueForModel=function(){var s=this._getSelect().getSelectedItem();if(s){return{value:s.getKey(),selectedItem:{title:s.getText(),key:s.getKey()}};}return{value:this._getSelect().getSelectedKey()};};b.prototype.getStaticConfiguration=function(){var c=this.getConfig();var p="/";var I=this.getModel().getProperty(p);var r=[];if(c.item&&c.item.path){p=c.item.path;}for(var i=0;i<I.length;i++){if(p==="/"){r.push(a.resolveValue(c.item,this,p+i));}else{r.push(a.resolveValue(c.item,this,p+"/"+i));}}var s=Object.assign({},c);delete s.item;s.items=r;return s;};b.prototype._getSelect=function(){var c=this.getAggregation("_select");if(!c){c=this._createSelect();this.setAggregation("_select",c);}return c;};b.prototype._createSelect=function(){var s=new S(),i,I,c="/",C=this.getConfig(),l=this.createLabel(C);s.attachChange(function(e){this._setValue();}.bind(this));if(C&&C.item){c=C.item.path||c;}if(C&&C.item&&C.item.template){i=C.item.template.key;I=C.item.template.title;}if(C&&C.items){i="{key}";I="{title}";this.setModel(new J(C.items));}this._oItemTemplate=new L({key:i,text:I});s.bindItems({path:c,template:this._oItemTemplate});s.setSelectedKey(a.resolveValue(C.value,this.getCardInstance()));if(l){s.addAriaLabelledBy(l);}return s;};return b;});
