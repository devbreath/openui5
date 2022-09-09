/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./Tile","./library","sap/ui/core/IconPool","sap/ui/core/library","sap/ui/Device","./StandardTileRenderer"],function(e,t,r,a,o,i){"use strict";var n=t.ImageHelper;var u=t.StandardTileType;var l=a.ValueState;var p=e.extend("sap.m.StandardTile",{metadata:{library:"sap.m",deprecated:true,properties:{title:{type:"string",group:"Misc",defaultValue:null},info:{type:"string",group:"Misc",defaultValue:null},icon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},activeIcon:{type:"sap.ui.core.URI",group:"Misc",defaultValue:null},number:{type:"string",group:"Misc",defaultValue:null},numberUnit:{type:"string",group:"Misc",defaultValue:null},infoState:{type:"sap.ui.core.ValueState",group:"Misc",defaultValue:l.None},type:{type:"sap.m.StandardTileType",group:"Misc",defaultValue:u.None},iconDensityAware:{type:"boolean",group:"Appearance",defaultValue:true}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"}}}});p.prototype.exit=function(){if(this._oImageControl){this._oImageControl.destroy();this._oImageControl=null}};p.prototype.ontap=function(){e.prototype.ontap.apply(this,arguments)};p.prototype.getIcon=function(){if(!this.getProperty("icon")&&this.getType()==="Create"){return r.getIconURI("add")}else{return this.getProperty("icon")}};p.prototype._getImage=function(){var e=this.getId()+"-img";var t=o.system.phone?"1.3rem":"2rem";var r={src:this.getIcon(),height:t,width:t,size:t,densityAware:this.getIconDensityAware(),useIconTooltip:false};this._oImageControl=n.getImageControl(e,this._oImageControl,this,r);return this._oImageControl};return p});
//# sourceMappingURL=StandardTile.js.map