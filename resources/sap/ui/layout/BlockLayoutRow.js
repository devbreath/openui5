/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","./library","sap/ui/layout/BlockLayoutCellData","./BlockLayoutRowRenderer","sap/base/Log"],function(t,e,a,r,o){"use strict";var n=e.BlockBackgroundType;var s=e.BlockRowColorSets;var l=t.extend("sap.ui.layout.BlockLayoutRow",{metadata:{library:"sap.ui.layout",properties:{scrollable:{type:"boolean",group:"Appearance",defaultValue:false},rowColorSet:{type:"sap.ui.layout.BlockRowColorSets",group:"Appearance"}},defaultAggregation:"content",aggregations:{content:{type:"sap.ui.layout.BlockLayoutCell",multiple:true,singularName:"content"}},associations:{accentCells:{type:"sap.ui.layout.BlockLayoutCell",multiple:true,singularName:"accentCell"}},designtime:"sap/ui/layout/designtime/BlockLayoutRow.designtime"},renderer:r});l.prototype.init=function(){this._applyLayoutData={}};l.prototype.addContent=function(t){this._ensureLayoutData(t);return this.addAggregation("content",t)};l.prototype.insertContent=function(t,e){this._ensureLayoutData(t);return this.insertAggregation("content",t,e)};l.prototype.onBeforeRendering=function(){var t=this.getContent(),e=this;t.forEach(function(t,a){e._ensureLayoutData(t);t._setParentRowScrollable(e.getScrollable())});this._calculateBreakpointRendering()};l.prototype.setRowColorSet=function(e){var a=Array.prototype.slice.call(arguments),r=t.prototype.setProperty.apply(this,["rowColorSet"].concat(a)),o="sapUiBlockLayoutBackground"+e,n=this.getParent(),l=n&&n.getBackground(),i=n&&n.indexOfAggregation("content",this),u=n&&n.getContent(),c=i&&u[i-1]||null,y=u&&u[i+1]||null,g=Object.keys(s).map(function(t){return s[t]}),p=false;if(c&&c._hasStyleClass(o,l,p,e)){o+="Inverted";p=true}g.forEach(function(t){var e="sapUiBlockLayoutBackground"+t,a=e+"Inverted";if(this._hasStyleClass(e,l,false,t)){this.removeStyleClass(e,true)}else if(this._hasStyleClass(a,l,true,t)){this.removeStyleClass(a,true)}},this);this.addStyleClass(o,true);if(y&&y._hasStyleClass(o,l,p,e)){y.setRowColorSet(e)}this.invalidate();return r};l.prototype.addAccentCell=function(t){var e,a=t&&t.getId?t.getId():t,r=this.getParent(),s=r&&(r.getBackground()||"");e=this.addAssociation("accentCells",t);if(!r){return this}if([n.Accent,n.Mixed].indexOf(s)===-1){o.warning(a+" was not set as accent cell. Accent cells could be set only for 'Accent' and 'Mixed' layout backgrounds.");return this}return e};l.prototype._ensureLayoutData=function(t){var e=t.getLayoutData();if(!e||!(e instanceof a)){t.setLayoutData(new a)}};l.prototype._onParentSizeChange=function(t){this._currentSize=t;this._calculateBreakpointRendering();this.invalidate()};l.prototype._getCellArangementForCurrentSize=function(){if(!this._arrangements||!this._currentSize){return null}return this._arrangements[this._currentSize]};l.prototype._calculateBreakpointRendering=function(){if(!this._currentSize){return}this._arrangements={S:this._calcArrangementForSize("S"),M:this._calcArrangementForSize("M"),L:this._calcArrangementForSize("L"),XL:this._calcArrangementForSize("Xl")}};l.prototype._calcArrangementForSize=function(t){var e=this.getContent();if(e.length>=3&&t==="M"&&e.length<5){return this._generateArrangementForMCase()}else{return this._generateArrangement(t)}};l.prototype._generateArrangement=function(t){var e,a=0,r=[],o=[],n=[[]],s=this.getContent();s.forEach(function(a){e=a.getLayoutData();o.push(e["breakRowOn"+t+"Size"]);r.push(e["get"+t+"Size"]())});r.forEach(function(t,e){n[a].push(t);if(o[e+1]){a++;n[a]=[]}});return n};l.prototype._generateArrangementForMCase=function(){var t=this.getContent();if(t.length===3&&this._isAllCellsHasSameWidth("M")){return[[1,1,1]]}else if(t.length===3){return[[1,1],[1]]}else if(t.length===4){return[[1,1],[1,1]]}};l.prototype._isAllCellsHasSameWidth=function(t){var e,a=this.getContent(),r=a[0].getLayoutData()["get"+t+"Size"]();for(var o=1;o<a.length;o++){e=a[o].getLayoutData()["get"+t+"Size"]();if(e!==r){return false}}return true};l.prototype._processMixedCellStyles=function(t,e){var a,r;if(!e||!e.length){return this}a=this.getParent();r=a&&(a.hasStyleClass("sapUiBlockLayoutSizeL")||a.hasStyleClass("sapUiBlockLayoutSizeXL"));e.forEach(function(e){var a,l;if(r&&e.getId()===t&&e.getWidth()===1){e.addStyleClass("sapContrast").addStyleClass("sapContrastPlus");a=s;l=this._hasStyleClass("sapUiBlockLayoutBackground"+a.ColorSet1,n.Mixed,false,a.ColorSet1)||this._hasStyleClass("sapUiBlockLayoutBackground"+a.ColorSet1,n.Mixed,true,a.ColorSet1);if(l){e.addStyleClass("sapUiBlockLayoutBackgroundContrast2")}}else if((!r||e.getId()!==t)&&(e.hasStyleClass("sapContrast")||e.hasStyleClass("sapContrastPlus"))){e.removeStyleClass("sapContrast").removeStyleClass("sapContrastPlus").removeStyleClass("sapUiBlockLayoutBackgroundContrast2");this.removeAssociation("accentCells",e);o.warning(t+" was removed as accent cell. Only one cell at a time could be accented for Mixed layout background")}},this);return this};l.prototype._processAccentCellStyles=function(t,e){var a,r,o,n=0,s=0,l=Array.prototype.slice.call(t);if(!t||!t.length){return this}for(n=0;n<e.length;n++){a=e[n];r=a.getId();if(!l.length){break}if(l.indexOf(r)>-1){s++;o="sapUiBlockLayoutBackgroundColorSetGray"+(s%2+1);if(a.hasStyleClass(o)){continue}l.splice(l.indexOf(r),1);a.removeStyleClass("sapUiBlockLayoutBackgroundColorSetGray1").removeStyleClass("sapUiBlockLayoutBackgroundColorSetGray2").addStyleClass(o)}}return this};l.prototype._hasStyleClass=function(t,e,a,r){var o=n,l=s,i,u,c;if([o.Light,o.Mixed].indexOf(e)===-1){return this.hasStyleClass(t)}else if(this.hasStyleClass(t)){return true}c=[[l.ColorSet1,l.ColorSet3],[l.ColorSet2,l.ColorSet4]];for(i=0;i<=c.length;i++){if(c[i]&&c[i].indexOf(r)>-1){break}}if(!c[i]){return false}u=c[i].map(function(t){return"sapUiBlockLayoutBackground"+t+(a?"Inverted":"")});return u.some(this.hasStyleClass,this)};return l});
//# sourceMappingURL=BlockLayoutRow.js.map