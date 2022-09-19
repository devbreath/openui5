/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/table/columnmenu/QuickActionBase","sap/m/ToggleButton"],function(Q,T){"use strict";var a=Q.extend("sap.m.table.columnmenu.QuickGroup",{metadata:{library:"sap.m",aggregations:{items:{type:"sap.m.table.columnmenu.QuickGroupItem",multiple:true}},events:{change:{parameters:{key:{type:"string"},grouped:{type:"boolean"}}}}}});a.prototype.exit=function(){this.destroyContent();};a.prototype.getLabel=function(){var b=sap.ui.getCore().getLibraryResourceBundle("sap.m");return b.getText("table.COLUMNMENU_QUICK_GROUP");};a.prototype.getContent=function(){if(!this._aContent){this._aContent=this.createContent(this.getItems());this._aContent.forEach(function(i){this.addDependent(i);}.bind(this));}return this._aContent;};a.prototype.addItem=function(i){this.destroyContent();return this.addAggregation("items",i);};a.prototype.insertItem=function(i,I){this.destroyContent();return this.insertAggregation("items",i,I);};a.prototype.removeItem=function(i){this.destroyContent();return this.removeAggregation("items",i);};a.prototype.removeAllItems=function(){this.destroyContent();return this.removeAllAggregation("items");};a.prototype.destroyItems=function(){this.destroyContent();return this.destroyAggregation("items");};a.prototype.createContent=function(i){return i.map(function(I){return new T({text:I.getLabel(),pressed:I.getGrouped(),press:[I,this.onChange,this]});},this);};a.prototype.destroyContent=function(){if(this._aContent){this._aContent.forEach(function(c){c.destroy();});delete this._aContent;}};a.prototype._updateContent=function(){var I=this.getItems();var c=this.getContent();var o,b;for(var i=0;i<I.length;i++){o=I[i];b=c[i];if(!b){b=new T({press:[o,this.onChange,this]});}b.setText(o.getLabel());b.setPressed(o.getGrouped());}for(var i=I.length;i<c.length;i++){c[i].destroy();}};a.prototype.onChange=function(e,i){i.setProperty("grouped",e.getParameters().pressed,true);this.fireChange({item:i});this.getMenu().close();};return a;});
