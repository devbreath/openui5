/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/Core','sap/ui/core/Control','sap/ui/core/EnabledPropagator','sap/ui/core/delegate/ItemNavigation',"sap/ui/core/InvisibleText",'sap/ui/core/ResizeHandler','sap/ui/Device','sap/m/Button','sap/m/IconTabFilter','sap/m/IconTabSeparator','sap/m/IconTabBarDragAndDropUtil','sap/ui/core/library','sap/m/IconTabHeaderRenderer',"sap/ui/thirdparty/jquery","sap/base/Log","sap/ui/events/KeyCodes"],function(l,C,a,E,I,b,R,D,B,c,d,e,f,g,q,L,K){"use strict";var h=f.dnd.DropPosition;var k=l.BackgroundDesign;var m=l.IconTabHeaderMode;var n=l.IconTabDensityMode;var T=l.TabsOverflowMode;var o=a.extend("sap.m.IconTabHeader",{metadata:{library:"sap.m",properties:{showSelection:{type:"boolean",group:"Misc",defaultValue:true,deprecated:true},selectedKey:{type:"string",group:"Data",defaultValue:null},visible:{type:"boolean",group:"Behavior",defaultValue:true},mode:{type:"sap.m.IconTabHeaderMode",group:"Appearance",defaultValue:m.Standard},showOverflowSelectList:{type:"boolean",group:"Appearance",defaultValue:false,deprecated:true},backgroundDesign:{type:"sap.m.BackgroundDesign",group:"Appearance",defaultValue:k.Solid},enableTabReordering:{type:"boolean",group:"Behavior",defaultValue:false},maxNestingLevel:{type:"int",group:"Behavior",defaultValue:0},tabDensityMode:{type:"sap.m.IconTabDensityMode",group:"Appearance",defaultValue:n.Cozy},ariaTexts:{type:"object",group:"Accessibility",defaultValue:null},tabsOverflowMode:{type:"sap.m.TabsOverflowMode",group:"Behavior",defaultValue:T.End}},aggregations:{items:{type:"sap.m.IconTab",multiple:true,singularName:"item",dnd:{draggable:true,droppable:true,layout:"Horizontal"}},_overflow:{type:"sap.m.IconTabFilter",multiple:false,visibility:"hidden"},_startOverflow:{type:"sap.m.IconTabFilter",multiple:false,visibility:"hidden"}},events:{select:{parameters:{item:{type:"sap.m.IconTabFilter"},key:{type:"string"},previousKey:{type:"string"}}}}}});var r=C.getLibraryResourceBundle("sap.m");E.apply(o.prototype,[true]);o.prototype.init=function(){this._bFireSelectEvent=false;this._aTabKeys=[];this._oAriaHeadText=null;this._bIsRendered=false;};o.prototype.exit=function(){if(this._oItemNavigation){this.removeDelegate(this._oItemNavigation);this._oItemNavigation.destroy();delete this._oItemNavigation;}if(this._sResizeListenerId){R.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}if(this._aTabKeys){this._aTabKeys=null;}if(this._oOverflow){this._oOverflow.removeEventDelegate(this._oOverflowEventDelegate);this._oOverflowEventDelegate=null;this._oOverflow=null;}if(this._oStartOverflow){this._oStartOverflow.removeEventDelegate(this._oStartOverflowEventDelegate);this._oStartOverflowEventDelegate=null;this._oStartOverflow=null;}if(this._oAriaHeadText){this._oAriaHeadText.destroy();this._oAriaHeadText=null;}this._bRtl=null;};o.prototype.onBeforeRendering=function(){this._bIsRendered=false;this._bRtl=C.getConfiguration().getRTL();if(this._sResizeListenerId){R.deregister(this._sResizeListenerId);this._sResizeListenerId=null;}this._updateSelection();this.destroyDragDropConfig();this._setsDragAndDropConfigurations();};o.prototype.onAfterRendering=function(){this._applyTabDensityMode();if(this.oSelectedItem){this._applySelectionToFilters();this.oSelectedItem._hideBadge();}if(C.isThemeApplied()){this._setItemsForStrip();}else{C.attachThemeChanged(this._handleThemeLoad,this);}this._initItemNavigation();this._sResizeListenerId=R.register(this.getDomRef(),q.proxy(this._fnResize,this));this.getItems().forEach(function(i){if(i._onAfterParentRendering){i._onAfterParentRendering();}});this._bIsRendered=true;};o.prototype._isRendered=function(){return this._bIsRendered;};o.prototype._getSelectList=function(){return this._getOverflow()._getSelectList();};o.prototype._getOverflow=function(){var O=this.getAggregation("_overflow");if(!O){O=new c({id:this.getId()+'-overflow',text:r.getText("ICONTABHEADER_OVERFLOW_MORE")});O._bIsOverflow=true;this._oOverflowEventDelegate={onsapnext:O.onsapdown};O.addEventDelegate(this._oOverflowEventDelegate,O);this.setAggregation("_overflow",O);this._oOverflow=O;}return O;};o.prototype._getStartOverflow=function(){var s=this.getAggregation("_startOverflow");if(!s){s=new c({id:this.getId()+'-startOverflow',text:r.getText("ICONTABHEADER_OVERFLOW_MORE")});s._bIsStartOverflow=true;this._oStartOverflowEventDelegate={onsapprevious:s.onsapdown};s.addEventDelegate(this._oStartOverflowEventDelegate,s);this.setAggregation("_startOverflow",s);this._oStartOverflow=s;}return s;};o.prototype._getInvisibleHeadText=function(){var A=this.getAriaTexts()||{};if(!this._oAriaHeadText){this._oAriaHeadText=new b({id:this.getId()+"-ariaHeadText"});}this._oAriaHeadText.setText(A.headerDescription);return this._oAriaHeadText;};o.prototype._onItemNavigationFocusLeave=function(){if(!this.oSelectedItem){return;}var j=this.getItems();var p=-1;var s;for(var i=0;i<j.length;i++){s=j[i];if(!s.isA("sap.m.IconTabFilter")||!s.getVisible()){continue;}p++;if((this.oSelectedItem._getRootTab()||this.oSelectedItem)===s){break;}}this._oItemNavigation.setFocusedIndex(p);};o.prototype.getTabFilters=function(){var t=[];this.getItems().forEach(function(i){if(i instanceof c){t.push(i);}});return t;};o.prototype._setsDragAndDropConfigurations=function(){if(this.getEnableTabReordering()&&!this.getDragDropConfig().length){e.setDragDropAggregations(this,"Horizontal",this._getDropPosition());}};o.prototype._getDropPosition=function(){return this.getMaxNestingLevel()===0?h.Between:h.OnOrBetween;};o.prototype.setSelectedKey=function(s){if(s===this.getSelectedKey()){if(this._isInsideIconTabBar()){this.getParent().setProperty("selectedKey",s,true);}return this;}var i=this.getTabFilters(),j=this._isInsideIconTabBar(),A=true,S;if(i.length>0){s=s||i[0]._getNonEmptyKey();}if(this.$().length){S=this._findItemByKey(s);if(S){this.setSelectedItem(S,A);}else if(!j&&s){this.setSelectedItem(null);}}this.setProperty("selectedKey",s,true);return this;};o.prototype.setSelectedItem=function(i,A){if(!i){if(this.oSelectedItem){this._removeSelectionFromFilters();this.oSelectedItem=null;}return this;}if(this._isUnselectable(i)){return this;}var p=this.getParent();var j=this._isInsideIconTabBar();var P=this.getSelectedKey();var s=false;if(i.getContent().length===0&&this.oSelectedItem&&this.oSelectedItem.getContent().length===0){s=true;}if(this.oSelectedItem&&this.oSelectedItem.getVisible()&&(!A&&j&&p.getExpandable()||this.oSelectedItem!==i)){this._removeSelectionFromFilters();}if(i.getVisible()){if(this.oSelectedItem===i){if(!A&&j&&p.getExpandable()){p._toggleExpandCollapse();}}else{if(j){p.$("content").attr('aria-labelledby',i.sId);}this.oSelectedItem=i;this._applySelectionToFilters();this.setProperty("selectedKey",this.oSelectedItem._getNonEmptyKey(),true);if(j&&(p.getExpandable()||p.getExpanded())){var S=this.oSelectedItem.getContent();if(S.length>0){p._rerenderContent(S);}else{if(!s){p._rerenderContent(p.getContent());}}if(!A&&p.getExpandable()&&!p.getExpanded()){p._toggleExpandCollapse(true);}}}}this.oSelectedItem=i;var t=this.oSelectedItem._getNonEmptyKey();this.setProperty("selectedKey",t,true);if(j){p.setProperty("selectedKey",t,true);}if(j){A=A&&!p._bFireSelectEvent;}else{A=A&&!this._bFireSelectEvent;}if(!A){if(j){p.fireSelect({selectedItem:this.oSelectedItem,selectedKey:t,item:this.oSelectedItem,key:t,previousKey:P});}else{this.fireSelect({selectedItem:this.oSelectedItem,selectedKey:t,item:this.oSelectedItem,key:t,previousKey:P});}}this.oSelectedItem._startBadgeHiding();var u=this.oSelectedItem._getRootTab().getDomRef();if(!u||u.classList.contains("sapMITBFilterHidden")||this.getTabsOverflowMode()===T.End){this._setItemsForStrip();}return this;};o.prototype.getVisibleTabFilters=function(){return this.getTabFilters().filter(function(F){return F.getVisible();});};o.prototype._initItemNavigation=function(){var t=[],s=-1,S=this.oSelectedItem&&this.oSelectedItem._getRootTab();if(this.$().hasClass("sapMITHStartOverflowList")){var i=this._getStartOverflow().getFocusDomRef();i.setAttribute("tabindex","-1");t.push(i);}this.getTabFilters().forEach(function(j){var p=this.getFocusDomRef(j);if(!p){return;}p.setAttribute("tabindex","-1");t.push(p);if(j===S||j===this.oSelectedItem){s=t.indexOf(p);}}.bind(this));if(this.$().hasClass("sapMITHEndOverflowList")){var O=this._getOverflow().getFocusDomRef();O.setAttribute("tabindex","-1");t.push(O);}if(!this._oItemNavigation){this._oItemNavigation=new I().setCycling(false).attachEvent(I.Events.FocusLeave,this._onItemNavigationFocusLeave,this).setDisabledModifiers({sapnext:["alt","meta"],sapprevious:["alt","meta"]});this.addDelegate(this._oItemNavigation);}this._oItemNavigation.setRootDomRef(this.getDomRef()).setItemDomRefs(t).setPageSize(t.length).setSelectedIndex(s);};o.prototype.onThemeChanged=function(){this._applyTabDensityMode();};o.prototype._applyTabDensityMode=function(){var t=this.getTabDensityMode();this.$().removeClass("sapUiSizeCompact");switch(t){case n.Compact:this.$().addClass("sapUiSizeCompact");break;case n.Inherit:if(this.$().closest(".sapUiSizeCompact").length){this.$().addClass("sapUiSizeCompact");}break;}};o.prototype._handleThemeLoad=function(){setTimeout(this._setItemsForStrip.bind(this),350);C.detachThemeChanged(this._handleThemeLoad,this);};o.prototype.destroyItems=function(){this.oSelectedItem=null;this._aTabKeys=[];this.destroyAggregation("items");return this;};o.prototype.addItem=function(i){if(!(i instanceof d)){var s=i.getKey();if(this._aTabKeys.indexOf(s)!==-1){L.warning("sap.m.IconTabHeader: duplicate key '"+s+"' inside the IconTabFilter. Please use unique keys.");}this._aTabKeys.push(s);}this.addAggregation("items",i);this._invalidateParentIconTabBar();return this;};o.prototype.insertItem=function(i,j){if(!(i instanceof d)){var s=i.getKey();if(this._aTabKeys.indexOf(s)!==-1){L.warning("sap.m.IconTabHeader: duplicate key '"+s+"' inside the IconTabFilter. Please use unique keys.");}this._aTabKeys.push(s);}this.insertAggregation("items",i,j);this._invalidateParentIconTabBar();};o.prototype.removeAllItems=function(){var i=this.removeAllAggregation("items");this._aTabKeys=[];this.oSelectedItem=null;this._invalidateParentIconTabBar();return i;};o.prototype.removeItem=function(i){i=this.removeAggregation("items",i);if(i&&!(i instanceof d)){var s=i.getKey();this._aTabKeys.splice(this._aTabKeys.indexOf(s),1);}if(this.oSelectedItem===i){this.oSelectedItem=null;}this._invalidateParentIconTabBar();return i;};o.prototype.updateAggregation=function(){this.oSelectedItem=null;a.prototype.updateAggregation.apply(this,arguments);this.invalidate();};o.prototype.removeAggregation=function(A,O,s){var i=this.getTabFilters();var j=a.prototype.removeAggregation.apply(this,arguments);if(s){return j;}if(!this._getPreserveSelection()&&j&&j==this.oSelectedItem&&A=='items'){var p=(i?Array.prototype.indexOf.call(i,j):-1);i=this.getTabFilters();p=Math.max(0,Math.min(p,i.length-1));var S=i[p];if(S){this.setSelectedItem(S,true);}else{var t=this.getParent();if(this._isInsideIconTabBar()&&t.getExpanded()){t.$("content").children().remove();}}}return j;};o.prototype.removeAllAggregation=function(A,s){if(A=='items'){var i=this.getParent();if(this._isInsideIconTabBar()&&i.getExpanded()){i.$("content").children().remove();}}return a.prototype.removeAllAggregation.apply(this,arguments);};o.prototype._getPreserveSelection=function(){return this._bPreserveSelection;};o.prototype._setPreserveSelection=function(p){this._bPreserveSelection=p;};o.prototype._getDisplayText=function(i){var t=i.getText();if(this.isInlineMode()){var s=i.getCount();if(s){if(this._bRtl){t='('+s+') '+t;}else{t+=' ('+s+')';}}}return t;};o.prototype.isInlineMode=function(){return this.getMode()===m.Inline;};o.prototype._checkTextOnly=function(){this._bTextOnly=this.getItems().every(function(i){return i instanceof d||!i.getIcon();});return this._bTextOnly;};o.prototype._checkNoText=function(j){if(j.length>0){for(var i=0;i<j.length;i++){if(!(j[i]instanceof d)){if(j[i].getText().length>0){return false;}}}}return true;};o.prototype._checkInLine=function(j){var p;if(j.length>0){for(var i=0;i<j.length;i++){p=j[i];if(!(p instanceof d)){if(p.getIcon()||p.getCount()){this._bInLine=false;return false;}}}}this._bInLine=true;return true;};o.prototype._getItemsInStrip=function(){return this.getItems().filter(function(i){var j=i.getDomRef();return j&&!j.classList.contains("sapMITBFilterHidden");});};o.prototype._setItemsForStrip=function(){var t=this.getVisibleTabFilters();if(!C.isThemeApplied()||!t.length){return;}var i=this.getDomRef("head");if(!i){return;}var s=this._getStartOverflow(),O=this._getOverflow(),j=this.getItems().filter(function(v){return v.getDomRef();}).map(function(v){return v.getDomRef();}),S=(this.oSelectedItem&&this.oSelectedItem.getVisible())?this.oSelectedItem:t[0],p=(S._getRootTab()||S).getDomRef();if(!j.length||!p){return;}s.$().removeClass("sapMITHOverflowVisible");O.$().removeClass("sapMITHOverflowVisible");this.$().removeClass("sapMITHStartOverflowList");this.$().removeClass("sapMITHEndOverflowList");j.forEach(function(v){v.classList.remove("sapMITBFilterHidden");});var u=j.reduce(function(v,w){return v+q(w).outerWidth(true);},0),H=u>i.offsetWidth;if(!H){return;}switch(this.getTabsOverflowMode()){case T.StartAndEnd:this._updateStartAndEndOverflow(j,p);break;case T.End:default:this._updateEndOverflow(j,p);break;}};o.prototype._updateEndOverflow=function(j,s){var O=this._getOverflow(),t=this.getDomRef("head"),p,u,S,i;O.$().addClass("sapMITHOverflowVisible");this.$().addClass("sapMITHEndOverflowList");p=t.offsetWidth;S=this._getSelectedItemIndexAndSize(j,s);u=this._findLastVisibleItem(j,p,S.width);for(i=u+1;i<j.length;i++){j[i].classList.add("sapMITBFilterHidden");}O._updateExpandButtonBadge();};o.prototype._updateStartAndEndOverflow=function(j,s){var S=this._getStartOverflow(),O=this._getOverflow(),t=this.getDomRef("head"),p=t.offsetWidth,u=this._getSelectedItemIndexAndSize(j,s),H=this._hasStartOverflow(p,j,u),v=this._hasEndOverflow(p,j,u),F,w,i;if(!H){O.$().addClass("sapMITHOverflowVisible");this.$().addClass("sapMITHEndOverflowList");p=t.offsetWidth;w=this._findLastVisibleItem(j,p,u.width);for(i=w+1;i<j.length;i++){j[i].classList.add("sapMITBFilterHidden");}O._updateTabCountText();O._updateExpandButtonBadge();return;}if(!v){S.$().addClass("sapMITHOverflowVisible");this.$().addClass("sapMITHStartOverflowList");p=t.offsetWidth;F=this._findFirstVisibleItem(j,p,u.width);for(i=F-1;i>=0;i--){j[i].classList.add("sapMITBFilterHidden");}S._updateTabCountText();S._updateExpandButtonBadge();return;}S.$().addClass("sapMITHOverflowVisible");this.$().addClass("sapMITHStartOverflowList");O.$().addClass("sapMITHOverflowVisible");this.$().addClass("sapMITHEndOverflowList");p=t.offsetWidth;F=this._findFirstVisibleItem(j,p,u.width,u.index-1);w=this._findLastVisibleItem(j,p,u.width,F);for(i=F-1;i>=0;i--){j[i].classList.add("sapMITBFilterHidden");}for(i=w+1;i<j.length;i++){j[i].classList.add("sapMITBFilterHidden");}S._updateExpandButtonBadge();S._updateTabCountText();O._updateTabCountText();O._updateExpandButtonBadge();};o.prototype._hasStartOverflow=function(t,j,s){if(s.index===0){return false;}var i,p=0;for(i=s.index-1;i>=0;i--){p+=this._getItemSize(j[i]);}var H=t<p+s.width;if(!H){this._getOverflow().$().addClass("sapMITHOverflowVisible");this.$().addClass("sapMITHEndOverflowList");t=this.getDomRef("head").offsetWidth;H=t<p+s.width;this._getOverflow().$().removeClass("sapMITHOverflowVisible");this.$().removeClass("sapMITHEndOverflowList");}return H;};o.prototype._hasEndOverflow=function(t,j,s){if(s.index>=j.length){return false;}var i,p=0;for(i=s.index;i<j.length;i++){p+=this._getItemSize(j[i]);}var H=t<p+s.width;if(!H){this._getStartOverflow().$().addClass("sapMITHOverflowVisible");this.$().addClass("sapMITHStartOverflowList");t=this.getDomRef("head").offsetWidth;H=t<p+s.width;this._getStartOverflow().$().removeClass("sapMITHOverflowVisible");this.$().removeClass("sapMITHStartOverflowList");}return H;};o.prototype._getSelectedItemIndexAndSize=function(i,s){var S=i.indexOf(s),j=this._getItemSize(s),p;if(i[S-1]&&i[S-1].classList.contains("sapMITBSep")){p=i[S-1];j+=this._getItemSize(p);}i.splice(S,1);if(p){i.splice(S-1,1);S--;}return{index:S,width:j};};o.prototype._findFirstVisibleItem=function(i,t,s,S){var j,p,u;if(S===undefined){S=i.length-1;}j=S+1;for(p=S;p>=0;p--){u=this._getItemSize(i[p]);if(t<s+u){break;}s+=u;j=p;}return j;};o.prototype._findLastVisibleItem=function(i,t,s,S){var j,p,u;S=S||0;j=S-1;for(p=S;p<i.length;p++){u=this._getItemSize(i[p]);if(t<s+u){break;}s+=u;j=p;}var P=i[p-1];if(P&&P.classList.contains("sapMITBSep")){j-=1;}return j;};o.prototype._getItemSize=function(i){var s=window.getComputedStyle(i),w=i.offsetWidth,M=Number.parseInt(s.marginLeft)+Number.parseInt(s.marginRight);return w+M;};o.prototype._handleActivation=function(i){var t=i.target.id,j=i.srcControl,s,$=q(i.target);if(j instanceof B){return;}var p=q(document.getElementById(t));if(p.parents()&&Array.prototype.indexOf.call(p.parents(),this.$("content")[0])>-1){}else{if(t){i.preventDefault();if($.hasClass('sapMITBFilterIcon')||$.hasClass('sapMITBCount')||$.hasClass('sapMITBText')||$.hasClass('sapMITBTab')||$.hasClass('sapMITBContentArrow')||$.hasClass('sapMITBSep')||$.hasClass('sapMITBSepIcon')){s=i.srcControl.getId().replace(/-icon$/,"");j=C.byId(s);if(j.getMetadata().isInstanceOf("sap.m.IconTab")&&!(j instanceof d)){if(this._isUnselectable(j)){if(j.getItems().length||j._isOverflow()){j._expandButtonPress();}return;}if((j===this._getOverflow())||(j===this._getStartOverflow())){j._expandButtonPress();return;}this.setSelectedItem(j);}}else if(j.getMetadata().isInstanceOf("sap.m.IconTab")&&!(j instanceof d)){if(this._isUnselectable(j)){if(j.getItems().length||j._isOverflow()){j._expandButtonPress();}return;}if((j===this._getOverflow())||(j===this._getStartOverflow())){j._expandButtonPress();return;}this.setSelectedItem(j);}}else{if(j.getMetadata().isInstanceOf("sap.m.IconTab")&&!(j instanceof d)){if(this._isUnselectable(j)){if(j.getItems().length||j._isOverflow()){j._expandButtonPress();}return;}if((j===this._getOverflow())||(j===this._getStartOverflow())){j._expandButtonPress();return;}this.setSelectedItem(j);}}}};o.prototype._fnResize=function(){if(this._getOverflow()._oPopover){this._getOverflow()._oPopover.close();}if(this._getStartOverflow()._oPopover){this._getStartOverflow()._oPopover.close();}this._setItemsForStrip();this._initItemNavigation();};o.prototype._isUnselectable=function(i){var F=i._getRealTab();return!F.getEnabled()||(this._isInsideIconTabBar()&&!this.getParent().getContent().length&&F._getNestedLevel()===1&&F.getItems().length&&!F.getContent().length)||F._isOverflow();};o.prototype._isInsideIconTabBar=function(){var p=this.getParent();return p instanceof a&&p.isA('sap.m.IconTabBar');};o.prototype._isInsideToolHeader=function(){var p=this.getParent();return p instanceof a&&p.isA('sap.tnt.ToolHeader');};o.prototype._invalidateParentIconTabBar=function(){if(this._isInsideIconTabBar()){this.getParent().invalidate();}};o.prototype.getFocusDomRef=function(F){var t=F||this.oSelectedItem;if(!t){return null;}return t.getDomRef();};o.prototype.applyFocusInfo=function(F){if(F.focusDomRef){q(F.focusDomRef).trigger("focus");}};o.prototype._updateSelection=function(){var j=this.getItems(),s=this.getSelectedKey(),i=0,p=this._isInsideIconTabBar(),t=this._isInsideToolHeader();if(!j.length){return;}if(!this.oSelectedItem||s&&s!==this.oSelectedItem._getNonEmptyKey()){if(s){this.oSelectedItem=this._findItemByKey(s);}if(!this.oSelectedItem&&(p||!s)){for(i=0;i<j.length;i++){if(!(j[i]instanceof d)&&j[i].getVisible()){this.oSelectedItem=j[i];break;}}}}if(!t&&this.oSelectedItem&&!this.oSelectedItem.getVisible()){for(i=0;i<j.length;i++){if(!(j[i]instanceof d)&&j[i].getVisible()){this.oSelectedItem=j[i];break;}}}if(!this.oSelectedItem){return;}if(this._isUnselectable(this.oSelectedItem)){this.setSelectedItem(this.oSelectedItem._getFirstAvailableSubFilter(),true);return;}this.setProperty("selectedKey",this.oSelectedItem._getNonEmptyKey(),true);};o.prototype._findItemByKey=function(s){var t=this.getTabFilters(),S;for(var i=0;i<t.length;i++){if(t[i]._getNonEmptyKey()===s){return t[i];}S=t[i]._getAllSubFilters();for(var j=0;j<S.length;j++){if(S[j]._getNonEmptyKey()===s){return S[j];}}}};o.prototype._applySelectionToFilters=function(){if(this._isInsideIconTabBar()&&!this.getParent().getExpanded()){return;}this.oSelectedItem.$().addClass("sapMITBSelected").attr({'aria-selected':true});if(this.oSelectedItem._getNestedLevel()!==1){var s=this.oSelectedItem._getRootTab();s.$().addClass("sapMITBSelected").attr({"aria-selected":true});}};o.prototype._removeSelectionFromFilters=function(){this.oSelectedItem.$().removeClass("sapMITBSelected").attr({'aria-selected':false});if(this.oSelectedItem._getNestedLevel()!==1){var s=this.oSelectedItem._getRootTab();s.$().removeClass("sapMITBSelected").attr({"aria-selected":false});}};o.prototype._getItemsForOverflow=function(i,t){var j=this._getItemsInStrip(),p=this.getTabsOverflowMode()===T.StartAndEnd,s,u=this.getItems(),v=[];if(p){s=u.indexOf(j[0]);u=i?u.slice(0,s):u.slice(s,u.length);}u.forEach(function(w){if(!D.system.phone&&j.indexOf(w)>-1){return;}v.push(w);if(w.isA("sap.m.IconTabFilter")&&!t){w._getAllSubItems().forEach(function(S){v.push(S);});}});return v;};o.prototype.ontouchstart=function(i){var t=i.targetTouches[0];this._iActiveTouch=t.identifier;};o.prototype.ontouchend=function(i){if(this._iActiveTouch===undefined){return;}var M=0;var j=1;var p;if(i.which===p||i.which===M||i.which===j){this._handleActivation(i);}this._iActiveTouch=undefined;};o.prototype.ontouchcancel=o.prototype.ontouchend;o.prototype.onkeydown=function(i){switch(i.which){case K.ENTER:this._handleActivation(i);i.preventDefault();break;case K.SPACE:i.preventDefault();break;}};o.prototype.onkeyup=function(i){if(i.which===K.SPACE){this._handleActivation(i);}};o.prototype._handleDragAndDrop=function(i){var j=i.getParameter("dropPosition"),p=i.getParameter("draggedControl"),s=i.getParameter("droppedControl"),t=this,u=this.getMaxNestingLevel();if(j===h.On){t=s._getRealTab();}e.handleDrop(t,j,p._getRealTab(),s,false,u);if(p._getNestedLevel()>1){p._getRootTab()._closePopover();}this._setItemsForStrip();this._initItemNavigation();this._getOverflow()._setSelectListItems();this._getStartOverflow()._setSelectListItems();this._getSelectList()._initItemNavigation();p._getRealTab().$().trigger("focus");if(j===h.On){s._getRealTab().$().trigger("focus");}};o.prototype._moveTab=function(t,i,M){e.moveItem.call(this,t,i,M);this._setItemsForStrip();this._initItemNavigation();};o.prototype.ondragrearranging=function(i){if(!this.getEnableTabReordering()){return;}var t=i.srcControl,j=this.indexOfItem(this._getItemsInStrip().pop());this._moveTab(t,i.keyCode,j);t.$().trigger("focus");};o.prototype.onsaphomemodifiers=o.prototype.ondragrearranging;o.prototype.onsapendmodifiers=o.prototype.ondragrearranging;o.prototype.onsapincreasemodifiers=o.prototype.ondragrearranging;o.prototype.onsapdecreasemodifiers=o.prototype.ondragrearranging;return o;});
