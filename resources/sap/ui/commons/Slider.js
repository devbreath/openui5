/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery","sap/base/Log","sap/ui/dom/containsOrEquals","sap/ui/events/ControlEvents","./library","sap/ui/core/Control","sap/ui/core/EnabledPropagator","sap/ui/core/ResizeHandler","./SliderRenderer"],function(jQuery,t,i,e,s,a,h,r,o){"use strict";var l=a.extend("sap.ui.commons.Slider",{metadata:{interfaces:["sap.ui.core.IFormContent"],library:"sap.ui.commons",deprecated:true,properties:{width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"},min:{type:"float",group:"Appearance",defaultValue:0},max:{type:"float",group:"Appearance",defaultValue:100},value:{type:"float",group:"Appearance",defaultValue:50},smallStepWidth:{type:"float",group:"Appearance",defaultValue:null},totalUnits:{type:"int",group:"Appearance",defaultValue:null},stepLabels:{type:"boolean",group:"Appearance",defaultValue:false},editable:{type:"boolean",group:"Behavior",defaultValue:true},enabled:{type:"boolean",group:"Behavior",defaultValue:true},labels:{type:"string[]",group:"Misc",defaultValue:null},vertical:{type:"boolean",group:"Appearance",defaultValue:false},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:"100%"}},associations:{ariaDescribedBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaDescribedBy"},ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"}},events:{change:{parameters:{value:{type:"float"}}},liveChange:{parameters:{value:{type:"float"}}}}}});h.call(l.prototype);l.prototype.exit=function(){if(this.sResizeListenerId){r.deregister(this.sResizeListenerId);this.sResizeListenerId=null}};l.prototype.onBeforeRendering=function(){if(this.sResizeListenerId){r.deregister(this.sResizeListenerId);this.sResizeListenerId=null}var i=this.getMin();var e=this.getMax();if(i>e){t.warning("Property wrong: Min:"+i+" > Max:"+e+"; values switched",this);this.setMin(e);this.setMax(i);e=i;i=this.getMin()}};l.prototype.onAfterRendering=function(){this.oGrip=this.getDomRef("grip");this.oBar=this.getDomRef("bar");this.oHiLi=this.getDomRef("hili");this.bRtl=sap.ui.getCore().getConfiguration().getRTL();this.bAcc=sap.ui.getCore().getConfiguration().getAccessibility();this.bTextLabels=this.getLabels()&&this.getLabels().length>0;this.oMovingGrip=this.oGrip;if(this.bTextLabels&&this.getLabels().length-1!=this.getTotalUnits()){t.warning("label count should be one more than total units",this)}this.iDecimalFactor=this.calcDecimalFactor(this.getSmallStepWidth());this.iShiftGrip=Math.round(this.getOffsetWidth(this.oGrip)/2);var i=this.getValue();var e=this.getMin();var s=this.getMax();if(i>s){t.warning("Property wrong: value:"+i+" > Max:"+s+"; value set to Max",this);i=s}else if(i<e){t.warning("Property wrong: value:"+i+" < Min:"+e+"; value set to Min",this);i=e}var a=(i-this.getMin())/(this.getMax()-this.getMin())*this.getBarWidth();if(this.bRtl||this.getVertical()){a=this.getBarWidth()-a}this.changeGrip(i,a,this.oGrip);this.repositionTicksAndLabels();this.allowTextSelection(false);this.oDomRef=this.getDomRef();this.sResizeListenerId=r.register(this.oDomRef,jQuery.proxy(this.onresize,this))};l.prototype.onclick=function(t){var i=this.oMovingGrip;if(this.getEditable()&&this.getEnabled()){var e;var s=t.target.getAttribute("ID");var a=this.getValue();var h=this.getOffsetLeft(this.oGrip)+this.iShiftGrip;var r=0;var o=0;var l=0;switch(s){case this.oBar.id:case this.oHiLi.id:if(this.getVertical()){e=this.getBarWidth()-this.getOffsetX(t)}else{e=this.getOffsetX(t)}if(s==this.oHiLi.id){if(this.getVertical()){e-=this.getOffsetLeft(this.oHiLi)}else{e+=this.getOffsetLeft(this.oHiLi)}}a=this.convertRtlValue(this.getMin()+(this.getMax()-this.getMin())/this.getBarWidth()*e);h=this.getOffsetX(t);if(s==this.oHiLi.id){h+=this.getOffsetLeft(this.oHiLi)}if(this.oStartTarget&&this.targetIsGrip(this.oStartTarget.id)){i=this.oStartTarget}else if(this.targetIsGrip(s)){i=t.target}else{i=this.getNearestGrip(h)}break;case this.getId()+"-left":h=0;if(this.getVertical()){a=this.getMax();i=this.getRightGrip()}else{a=this.getMin();i=this.getLeftGrip()}break;case this.getId()+"-right":h=this.getBarWidth();if(!this.getVertical()){a=this.getMax();i=this.getRightGrip()}else{a=this.getMin();i=this.getLeftGrip()}break;default:if(this.targetIsGrip(s)){return}r=s.search("-tick");if(r>=0){var n=parseInt(s.slice(this.getId().length+5));h=this.fTickDist*n;var g;if(this.bTextLabels){g=this.getLabels().length-1}else{g=this.getTotalUnits()}a=this.convertRtlValue(this.getMin()+(this.getMax()-this.getMin())/g*n);if(this.oStartTarget&&this.targetIsGrip(this.oStartTarget.id)){i=this.oStartTarget}else if(this.targetIsGrip(s)){i=t.target}else{i=this.getNearestGrip(h)}break}o=jQuery(this.oBar).offset();l=jQuery(t.target).offset();if(this.getVertical()){h=this.getOffsetX(t)-(o.top-l.top)}else{h=this.getOffsetX(t)-(o.left-l.left)}if(h<=0){h=0;if(this.getVertical()){a=this.getMax()}else{a=this.getMin()}}else{if(h>=this.getBarWidth()){h=this.getBarWidth();if(this.getVertical()){a=this.getMin()}else{a=this.getMax()}}else{if(this.getVertical()){e=this.getBarWidth()-h}else{e=h}a=this.getMin()+(this.getMax()-this.getMin())/this.getBarWidth()*e}}a=this.convertRtlValue(a);if(this.oStartTarget&&this.targetIsGrip(this.oStartTarget.id)){i=this.oStartTarget}else if(this.targetIsGrip(s)){i=t.target}else{i=this.getNearestGrip(h)}break}var f=this.validateNewPosition(a,h,i,this.getValueForGrip(i)>a);a=f.fNewValue;h=f.iNewPos;this.changeGrip(a,h,i);this.handleFireChange()}i.focus();this.oMovingGrip=i;this.oStartTarget=null};l.prototype.onmousedown=function(t){if(this.getEditable()&&this.getEnabled()&&!this._cancelMousedown){var i=t.target.getAttribute("ID");if(this.targetIsGrip(i)){this.bGripMousedown=true;if(t.targetTouches){this.iStartDragX=t.targetTouches[0].pageX;this.iStartDragY=t.targetTouches[0].pageY}else{this.iStartDragX=t.pageX;this.iStartDragY=t.pageY}this.iStartLeft=this.getOffsetLeft(t.target)+this.iShiftGrip;this.oMovingGrip=t.target;var s=this;this.handleMoveCall=function(t){s.handleMove(t)};this.preventSelect=function(t){return false};if(!t.targetTouches){jQuery(window.document).on("mousemove",this.handleMoveCall);jQuery(window.document).on("selectstart",this.preventSelect);e.bindAnyEvent(jQuery.proxy(this.onAnyEvent,this))}}this.oStartTarget=null}};function n(t){return t.originalEvent&&t.originalEvent.type&&t.originalEvent.type.startsWith("mouse")||t.handleObj&&t.handleObj.origType&&t.handleObj.origType.startsWith("mouse")}l.prototype.ontouchstart=function(t){if(n(t)){return}this._cancelMousedown=false;this.onmousedown(t);this._cancelMousedown=true};l.prototype.onmouseup=function(t){if(this.getEditable()&&this.getEnabled()){this.bGripMousedown=false;if(this.handleMoveCall){jQuery(window.document).off("mousemove",this.handleMoveCall);jQuery(window.document).off("selectstart",this.preventSelect);e.unbindAnyEvent(this.onAnyEvent);if(this.iStartLeft!=this.getOffsetLeft(this.oMovingGrip)+this.iShiftGrip){this.handleFireChange(true)}this.handleMoveCall=null;this.iStartDragX=null;this.iStartDragY=null;this.iStartLeft=null}}};l.prototype.ontouchend=function(t){if(n(t)){return}this.onmouseup(t)};l.prototype.handleMove=function(t){if(this.getEditable()&&this.getEnabled()&&this.bGripMousedown){t=t||window.event;var i,e;if(t.targetTouches){i=t.targetTouches[0].pageX;e=t.targetTouches[0].pageY}else{i=t.pageX;e=t.pageY}var s;var a;if(this.getVertical()){s=this.iStartLeft+e-this.iStartDragY}else{s=this.iStartLeft+i-this.iStartDragX}if(s<=0){s=0;if(this.getVertical()){a=this.getMax()}else{a=this.getMin()}}else{if(s>=this.getBarWidth()){s=this.getBarWidth();if(this.getVertical()){a=this.getMin()}else{a=this.getMax()}}else{var h;if(this.getVertical()){h=this.getBarWidth()-s}else{h=s}a=this.getMin()+(this.getMax()-this.getMin())/this.getBarWidth()*h}}a=this.convertRtlValue(a);var r=this.getValueForGrip(this.oMovingGrip);var o=this.validateNewPosition(a,s,this.oMovingGrip,r>a);a=o.fNewValue;s=o.iNewPos;this.changeGrip(a,s,this.oMovingGrip);a=this.getValueForGrip(this.oMovingGrip);this.fireLiveChangeForGrip(this.oMovingGrip,a,r);this.oStartTarget=this.oMovingGrip}t.cancelBubble=true;return false};l.prototype.ontouchmove=function(t){if(n(t)){return}this.handleMove(t);t.preventDefault()};l.prototype.fireLiveChangeForGrip=function(t,i,e){if(t==this.oGrip){if(e!=i){this.fireLiveChange({value:i})}}};l.prototype.onAnyEvent=function(e){t.debug('onAnyEvent fired: "'+e.type+'"');if(!this.getEditable()||!this.getEnabled()||!this.bGripMousedown){return}var s=e.target;if((!i(this.oDomRef,s)||s.tagName=="BODY")&&e.type=="mouseup"){this.onmouseup(e)}};l.prototype.onsapright=function(t){if(this.getEditable()&&this.getEnabled()){var i=this.convertRtlValue(this.getValueForGrip(this.oMovingGrip));var e=this.getOffsetLeft(this.oMovingGrip)+this.iShiftGrip;if(this.getSmallStepWidth()>0){var s=this.getBarWidth()/(this.getMax()-this.getMin())*this.getSmallStepWidth();if(s>1){i=i+this.getSmallStepWidth();if(this.getVertical()){e=e-s}else{e=e+s}}else{i=i+1/s*this.getSmallStepWidth();if(this.getVertical()){e=e-1}else{e=e+1}}}else{i=i+(this.getMax()-this.getMin())/this.getBarWidth();if(this.getVertical()){e=e-1}else{e=e+1}}i=this.convertRtlValue(i);var a=this.validateNewPosition(i,e,this.oMovingGrip,!this.getVertical()&&this.bRtl);i=a.fNewValue;e=a.iNewPos;this.changeGrip(i,e,this.oMovingGrip);this.handleFireChange()}t.preventDefault();t.stopPropagation()};l.prototype.onsapleft=function(t){if(this.getEditable()&&this.getEnabled()){var i=this.convertRtlValue(this.getValueForGrip(this.oMovingGrip));var e=this.getOffsetLeft(this.oMovingGrip)+this.iShiftGrip;if(this.getSmallStepWidth()>0){var s=this.getBarWidth()/(this.getMax()-this.getMin())*this.getSmallStepWidth();if(s>1){i=i-this.getSmallStepWidth();if(this.getVertical()){e=e+s}else{e=e-s}}else{i=i-1/s*this.getSmallStepWidth();if(this.getVertical()){e=e+1}else{e=e-1}}}else{i=i-(this.getMax()-this.getMin())/this.getBarWidth();if(this.getVertical()){e=e+1}else{e=e-1}}i=this.convertRtlValue(i);var a=this.validateNewPosition(i,e,this.oMovingGrip,this.getVertical()||!this.bRtl);i=a.fNewValue;e=a.iNewPos;this.changeGrip(i,e,this.oMovingGrip);this.handleFireChange()}t.preventDefault();t.stopPropagation()};l.prototype.onsapup=function(t){if(this.bRtl&&!this.getVertical()){this.onsapleft(t)}else{this.onsapright(t)}};l.prototype.onsapdown=function(t){if(this.bRtl&&!this.getVertical()){this.onsapright(t)}else{this.onsapleft(t)}};l.prototype.onsapexpand=function(t){if(!this.bRtl){this.onsapright(t)}else{this.onsapleft(t)}};l.prototype.onsapcollapse=function(t){if(!this.bRtl){this.onsapleft(t)}else{this.onsapright(t)}};l.prototype.onsaphome=function(t){if(this.getEditable()&&this.getEnabled()){var i=0;if(this.getVertical()||this.bRtl&&!this.getVertical()){i=this.getBarWidth()}this.changeGrip(this.getMin(),i,this.oMovingGrip);this.handleFireChange()}t.preventDefault();t.stopPropagation()};l.prototype.onsapend=function(t){if(this.getEditable()&&this.getEnabled()){var i=this.getBarWidth();if(this.getVertical()||this.bRtl&&!this.getVertical()){i=0}this.changeGrip(this.getMax(),i,this.oMovingGrip);this.handleFireChange()}t.preventDefault();t.stopPropagation()};l.prototype.onsaprightmodifiers=function(t){if(this.getEditable()&&this.getEnabled()){if(!this.fPageSize){if(this.getTotalUnits()>0){this.fPageSize=(this.getMax()-this.getMin())/this.getTotalUnits()}else{this.fPageSize=(this.getMax()-this.getMin())/10}}var i;if(!this.bRtl||this.getVertical()){i=this.getValueForGrip(this.oMovingGrip)+this.fPageSize}else{i=this.getValueForGrip(this.oMovingGrip)-this.fPageSize}var e=(i-this.getMin())/(this.getMax()-this.getMin())*this.getBarWidth();if(this.bRtl&&!this.getVertical()){e=this.getBarWidth()-e}if(this.getVertical()){if(e>this.getBarWidth()){e=this.getBarWidth()}e=this.getBarWidth()-e}var s=this.validateNewPosition(i,e,this.oMovingGrip,!this.getVertical()&&this.bRtl);i=s.fNewValue;e=s.iNewPos;this.changeGrip(i,e,this.oMovingGrip);this.handleFireChange()}t.preventDefault();t.stopPropagation()};l.prototype.onsapleftmodifiers=function(t){if(this.getEditable()&&this.getEnabled()){if(!this.fPageSize){if(this.getTotalUnits()>0){this.fPageSize=(this.getMax()-this.getMin())/this.getTotalUnits()}else{this.fPageSize=(this.getMax()-this.getMin())/10}}var i;if(!this.bRtl||this.getVertical()){i=this.getValueForGrip(this.oMovingGrip)-this.fPageSize}else{i=this.getValueForGrip(this.oMovingGrip)+this.fPageSize}var e=(i-this.getMin())/(this.getMax()-this.getMin())*this.getBarWidth();if(this.bRtl&&!this.getVertical()){e=this.getBarWidth()-e}if(this.getVertical()){if(e<0){e=0}e=this.getBarWidth()-e}var s=this.validateNewPosition(i,e,this.oMovingGrip,this.getVertical()||!this.bRtl);i=s.fNewValue;e=s.iNewPos;this.changeGrip(i,e,this.oMovingGrip);this.handleFireChange()}t.preventDefault();t.stopPropagation()};l.prototype.onsapdownmodifiers=function(t){if(this.bRtl&&!this.getVertical()){this.onsaprightmodifiers(t)}else{this.onsapleftmodifiers(t)}};l.prototype.onsapupmodifiers=function(t){if(this.bRtl&&!this.getVertical()){this.onsapleftmodifiers(t)}else{this.onsaprightmodifiers(t)}};l.prototype.onresize=function(t){if(!this.getDomRef()){if(this.sResizeListenerId){r.deregister(this.sResizeListenerId);this.sResizeListenerId=null}return}var i=this.getValue();var e=(i-this.getMin())/(this.getMax()-this.getMin())*this.getBarWidth();if(this.getVertical()||this.bRtl){e=this.getBarWidth()-e}this.changeGrip(i,e,this.oGrip);this.repositionTicksAndLabels()};l.prototype.repositionTicksAndLabels=function(){var t;if(this.bTextLabels){t=this.getLabels().length-1}else{t=this.getTotalUnits()}if(t>0){var i=null;var e=null;this.fTickDist=this.getBarWidth()/t;for(var s=0;s<=t;s++){i=this.getDomRef("tick"+s);var a=0;if(!this.bRtl||this.getVertical()){a=Math.round(this.fTickDist*s)-Math.ceil(this.getOffsetWidth(i)/2)}else{a=Math.round(this.fTickDist*s)-Math.floor(this.getOffsetWidth(i)/2)}if(this.getVertical()){a=this.getBarWidth()-a-this.getOffsetWidth(i)}this.setLeft(a,i);if(this.getStepLabels()&&s>0&&s<t){e=this.getDomRef("text"+s);if(this.getSmallStepWidth()>0&&this.iDecimalFactor>0&&!this.bTextLabels){jQuery(e).text(Math.round(parseFloat(jQuery(e).text())*this.iDecimalFactor)/this.iDecimalFactor)}if(!this.bRtl||this.getVertical()){a=Math.round(this.fTickDist*s)-Math.round(this.getOffsetWidth(e)/2)}else{a=Math.round(this.fTickDist*(t-s))-Math.round(this.getOffsetWidth(e)/2)}if(this.getVertical()){a=this.getBarWidth()-a-this.getOffsetWidth(e)}this.setLeft(a,e)}}}};l.prototype.onThemeChanged=function(t){if(this.getDomRef()){this.iShiftGrip=Math.round(this.getOffsetWidth(this.oGrip)/2);this.onresize()}};l.prototype.changeGrip=function(i,e,s){if(e!=this.getOffsetLeft(s)+this.iShiftGrip){if(this.getSmallStepWidth()>0){var a=parseInt((i-this.getMin())/this.getSmallStepWidth());var h=a*this.getSmallStepWidth()+this.getMin();var r=(a+1)*this.getSmallStepWidth()+this.getMin();if(r>this.getMax()){r=this.getMax()}var o=this.getBarWidth()/(this.getMax()-this.getMin())*this.getSmallStepWidth();if(i-h<r-i){i=h;e=a*o}else{i=r;e=(a+1)*o;if(e>this.getBarWidth()){e=this.getBarWidth()}}if(this.getVertical()||this.bRtl){e=this.getBarWidth()-e}i=Math.round(i*this.iDecimalFactor)/this.iDecimalFactor}var l=Math.round(e-this.iShiftGrip);if(isNaN(l)){return}t.debug("iNewPos: "+e+" - iLeft: "+l+" - iShiftGrip: "+this.iShiftGrip);this.updateValueProperty(i,s);if(this.bTextLabels){s.title=this.getNearestLabel(i)}else{s.title=i}this.setLeft(l,s);this.adjustHighlightBar(e,s);if(this.bAcc){this.setAriaState()}}};l.prototype.updateValueProperty=function(t,i){this.setProperty("value",t,true)};l.prototype.adjustHighlightBar=function(t,i){if(this.bRtl){if(this.getVertical()){this.oHiLi.style.height=this.getBarWidth()-Math.round(t)+"px"}else{this.oHiLi.style.width=this.getBarWidth()-Math.round(t)+"px"}}else{if(this.getVertical()){this.oHiLi.style.height=this.getBarWidth()-Math.round(t)+"px"}else{this.oHiLi.style.width=Math.round(t)+"px"}}};l.prototype.calcDecimalFactor=function(t){var i=1;if(!(t>0)){return i}var e=String(t);var s=0;if(e.indexOf(".")>=0){s=e.length-e.indexOf(".")-1}else{if(e.indexOf("e-")>=0){s=e.slice(e.indexOf("e-")+2)}else{return i}}for(var a=1;a<=s;a++){i=i*10}return i};l.prototype.setEditable=function(t){this.setProperty("editable",t,true);if(this.oDomRef&&this.getEnabled()){if(t){jQuery(this.oDomRef).removeClass("sapUiSliRo").addClass("sapUiSliStd");if(this.bAcc){jQuery(this.oGrip).attr("aria-disabled",false).attr("aria-readonly",false)}}else{jQuery(this.oDomRef).removeClass("sapUiSliStd").addClass("sapUiSliRo");if(this.bAcc){jQuery(this.oGrip).attr("aria-disabled",true).attr("aria-readonly",true)}}}return this};l.prototype.setEnabled=function(t){this.setProperty("enabled",t,true);if(this.oDomRef){jQuery(this.oDomRef).toggleClass("sapUiSliDsbl",!t);if(t){jQuery(this.oGrip).attr("tabindex","0");if(this.getEditable()){jQuery(this.oDomRef).addClass("sapUiSliStd");if(this.bAcc){jQuery(this.oGrip).attr("aria-disabled",false)}}else{jQuery(this.oDomRef).addClass("sapUiSliRo");if(this.bAcc){jQuery(this.oGrip).attr("aria-disabled",true)}}}else{jQuery(this.oGrip).attr("tabindex","-1").attr("aria-disabled",true);if(this.getEditable()){jQuery(this.oDomRef).removeClass("sapUiSliStd")}else{jQuery(this.oDomRef).removeClass("sapUiSliRo")}}}return this};l.prototype.setTotalUnits=function(t){this.setProperty("totalUnits",t,false);this.fPageSize=false;return this};l.prototype.setValue=function(t){var i,e,s,a,h,r=parseFloat(t);this.setProperty("value",t,true);this._lastValue=t;if(!this.oBar||isNaN(t)){return this}e=this.getMin();s=this.getMax();a=this.getBarWidth();h=this.getVertical();if(r>s){r=s;i=a}else if(r<e){r=e;i=0}else{i=(r-e)/(s-e)*a}if(this.bRtl||h){i=a-i}this.changeGrip(r,i,this.oGrip);this._lastValue=r;return this};l.prototype.handleFireChange=function(t){var i=this.getValue();if(i!==this._lastValue){this.fireChange({value:i});if(!t){this.fireLiveChange({value:i})}this._lastValue=i}};l.prototype.setAriaState=function(){var t=this.getValue();if(this.bTextLabels){t=this.getNearestLabel(t)}this.oGrip.setAttribute("aria-valuenow",t)};l.prototype.getValueForGrip=function(t){return this.getValue()};l.prototype.validateNewPosition=function(t,i,e,s){if(!this.bRtl||this.getVertical()){if(s){if(t<=this.getMin()||i<=0){t=this.getMin();if(this.getVertical()){i=this.getBarWidth()}else{i=0}}}else{if(t>=this.getMax()||i>this.getBarWidth()){t=this.getMax();if(!this.getVertical()){i=this.getBarWidth()}else{i=0}}}}else{if(s){if(t<=this.getMin()||i>this.getBarWidth()){t=this.getMin();i=this.getBarWidth()}}else{if(t>=this.getMax()||i<=0){t=this.getMax();i=0}}}return{fNewValue:t,iNewPos:i}};l.prototype.getNearestLabel=function(t){var i=Math.round((this.getLabels().length-1)/(this.getMax()-this.getMin())*(t-this.getMin()));if(this.bRtl){i=this.getLabels().length-1-i}return this.getLabels()[i]};l.prototype.getNearestGrip=function(t){return this.oGrip};l.prototype.getLeftGrip=function(){return this.oGrip};l.prototype.getRightGrip=function(){return this.oGrip};l.prototype.setLeft=function(t,i){if(i==undefined){return}if(this.getVertical()){i.style.top=t+"px"}else{i.style.left=t+"px"}};l.prototype.getOffsetWidth=function(t){if(this.getVertical()){return t.offsetHeight}else{return t.offsetWidth}};l.prototype.getBarWidth=function(){if(this.getVertical()){return this.oBar.clientHeight}else{return this.oBar.clientWidth}};l.prototype.getOffsetLeft=function(t){if(this.getVertical()){return t.offsetTop}else{return t.offsetLeft}};l.prototype.getOffsetX=function(t){if(this.getVertical()){return t.getOffsetY()}else{if(this.bRtl){return t.getOffsetX()}else{return t.getOffsetX()}}};l.prototype.convertRtlValue=function(t){if(this.bRtl&&!this.getVertical()){t=this.getMax()-t+this.getMin()}return t};l.prototype.targetIsGrip=function(t){if(t==this.oGrip.id){return true}return false};l.prototype.getFocusDomRef=function(){return this.oGrip};l.prototype.getIdForLabel=function(){return this.getId()+"-grip"};return l});
//# sourceMappingURL=Slider.js.map