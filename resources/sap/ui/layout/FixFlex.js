/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/ResizeHandler","sap/ui/core/delegate/ScrollEnablement","sap/ui/layout/library","./FixFlexRenderer"],function(C,E,R,S){"use strict";var F=C.extend("sap.ui.layout.FixFlex",{metadata:{library:"sap.ui.layout",properties:{vertical:{type:"boolean",group:"Appearance",defaultValue:true},fixFirst:{type:"boolean",group:"Misc",defaultValue:true},fixContentSize:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"auto"},minFlexSize:{type:"int",defaultValue:0}},aggregations:{fixContent:{type:"sap.ui.core.Control",multiple:true,singularName:"fixContent"},flexContent:{type:"sap.ui.core.Control",multiple:false}},designtime:"sap/ui/layout/designtime/FixFlex.designtime",dnd:{draggable:false,droppable:true}}});E.call(F.prototype);F.prototype.init=function(){this._scroller=new S(this,null,{scrollContainerId:this.getId()});this._innerScroller=new S(this,this.getId()+"-FlexibleContainer",{scrollContainerId:this.getId()+"-Flexible"});};F.prototype.exit=function(){this._deregisterControl();if(this._scroller){this._scroller.destroy();this._scroller=null;}if(this._innerScroller){this._innerScroller.destroy();this._innerScroller=null;}};F.prototype.onBeforeRendering=function(){this._deregisterControl();this._scroller.setVertical(false);this._scroller.setHorizontal(false);var s=this.getMinFlexSize()!==0;this._innerScroller.setVertical(s);this._innerScroller.setHorizontal(s);};F.prototype.onAfterRendering=function(){if(this.getMinFlexSize()!==0){this.sResizeListenerFixFlexScroll=R.register(this.getDomRef(),this._changeScrolling.bind(this));this.sResizeListenerFixFlexScrollFlexPart=R.register(this.getDomRef("Fixed"),this._changeScrolling.bind(this));var f=this.getDomRef("FlexibleContainer").firstChild;if(f){this.sResizeListenerFixFlexContainerScroll=R.register(f,this._changeFlexibleContainerScroll.bind(this));}this._changeScrolling();}};F.prototype.getScrollDelegate=function(){return this._innerScroller;};F.prototype._deregisterControl=function(){if(this.sResizeListenerFixFlexScroll){R.deregister(this.sResizeListenerFixFlexScroll);this.sResizeListenerFixFlexScroll=null;}if(this.sResizeListenerFixFlexScrollFlexPart){R.deregister(this.sResizeListenerFixFlexScrollFlexPart);this.sResizeListenerFixFlexScrollFlexPart=null;}if(this.sResizeListenerFixFlexContainerScroll){R.deregister(this.sResizeListenerFixFlexContainerScroll);this.sResizeListenerFixFlexContainerScroll=null;}};F.prototype._changeScrolling=function(){var f,d,$=this.$(),m=this.getMinFlexSize(),i=this.getVertical();if(i){f=this.$().height()-this.$("Fixed").height();d="height";}else{f=this.$().width()-this.$("Fixed").width();d="width";}if(f<=parseInt(this.getMinFlexSize())){$.addClass("sapUiFixFlexScrolling");$.removeClass("sapUiFixFlexInnerScrolling");if(i){this._scroller.setVertical(true);this._innerScroller.setVertical(false);}else{this._scroller.setHorizontal(true);this._innerScroller.setHorizontal(false);}if(this.$("FlexibleContainer").children().height()>m){this.$("Flexible").attr("style","min-"+d+":"+m+"px");}else{this.$("Flexible").attr("style",d+":"+m+"px");}}else{$.addClass("sapUiFixFlexInnerScrolling");$.removeClass("sapUiFixFlexScrolling");if(i){this._scroller.setVertical(false);this._innerScroller.setVertical(true);}else{this._scroller.setHorizontal(false);this._innerScroller.setHorizontal(true);}this._changeFlexibleContainerScroll();this.$("Flexible").removeAttr("style");}};F.prototype._changeFlexibleContainerScroll=function(){var $=this.$("FlexibleContainer"),c=$.height(),a=$.children().height();if(c==a){return;}if(c>a){$.removeClass('sapUiFixFlexFlexibleContainerGrowing');}else{$.addClass('sapUiFixFlexFlexibleContainerGrowing');}};return F;});
