/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/each"],function(t){"use strict";var e=function(e,n){Object.assign(e,{_init:function(t){this._bExpandFirstLevel=t;this.mContextInfo={};this._initContexts();if(t&&!this._bFirstLevelExpanded){this._expandFirstLevel()}},_initContexts:function(t){this.aContexts=this.getRootContexts(0,Number.MAX_VALUE);for(var e=0,n=this.aContexts.length;e<n;e++){var i=this._getContextInfo(this.aContexts[e]);this._setContextInfo({oContext:this.aContexts[e],iLevel:0,bExpanded:i?i.bExpanded:false})}if(this._bExpandFirstLevel&&!this._bFirstLevelExpanded){this._expandFirstLevel(t)}},_expandFirstLevel:function(e){var n=this;if(this.aContexts&&this.aContexts.length>0){t(this.aContexts.slice(),function(t,i){if(!e){n._loadChildContexts(i)}n._getContextInfo(i).bExpanded=true});this._bFirstLevelExpanded=true}},_fnFireFilter:e._fireFilter,_fireFilter:function(){this._fnFireFilter.apply(this,arguments);this._initContexts(true);this._restoreContexts(this.aContexts)},_fnFireChange:e._fireChange,_fireChange:function(){this._fnFireChange.apply(this,arguments);this._initContexts(true);this._restoreContexts(this.aContexts)},_restoreContexts:function(e){var n=this;var i=[];t(e.slice(),function(t,e){var o=n._getContextInfo(e);if(o&&o.bExpanded){i.push.apply(i,n._loadChildContexts(e))}});if(i.length>0){this._restoreContexts(i)}},_loadChildContexts:function(t){var e=this._getContextInfo(t);var n=this.aContexts?this.aContexts.indexOf(t):-1;var i=this.getNodeContexts(t,0,Number.MAX_VALUE);for(var o=0,s=i.length;o<s;o++){this.aContexts.splice(n+o+1,0,i[o]);var a=this._getContextInfo(i[o]);this._setContextInfo({oParentContext:t,oContext:i[o],iLevel:e.iLevel+1,bExpanded:a?a.bExpanded:false})}return i},_getContextInfo:function(t){return t?this.mContextInfo[t.getPath()]:undefined},_setContextInfo:function(t){if(t&&t.oContext){this.mContextInfo[t.oContext.getPath()]=t}},getLength:function(){return this.aContexts?this.aContexts.length:0},getContexts:function(t,e){return this.aContexts.slice(t,t+e)},getNodes:function(t,e){var n=this.getContexts(t,t+e);var i=[];for(var o=0;o<n.length;o++){var s=this._getContextInfo(n[o])||{};var a=n[o];i.push({context:a,level:s.iLevel,parent:s.oParentContext,nodeState:{expanded:s.bExpanded,collapsed:!s.bExpanded,selected:false}})}return i},hasChildren:function(){return true},nodeHasChildren:function(){return true},getContextByIndex:function(t){return this.aContexts[t]},getLevel:function(t){var e=this._getContextInfo(t);return e?e.iLevel:-1},isExpanded:function(t){var e=this.getContextByIndex(t);var n=this._getContextInfo(e);return n?n.bExpanded:false},expandContext:function(t){var e=this._getContextInfo(t);if(e&&!e.bExpanded){this.storeSelection();this._loadChildContexts(t);e.bExpanded=true;this._fireChange();this.restoreSelection()}},expand:function(t){this.expandContext(this.getContextByIndex(t))},collapseContext:function(t,e){var n=this._getContextInfo(t);if(n&&n.bExpanded){this.storeSelection();for(var i=this.aContexts.length-1;i>0;i--){if(this._getContextInfo(this.aContexts[i]).oParentContext===t){this.aContexts.splice(i,1)}}n.bExpanded=false;if(!e){this._fireChange()}this.restoreSelection()}},collapse:function(t){this.collapseContext(this.getContextByIndex(t))},collapseToLevel:function(t){if(!t||t<0){t=0}var e=this.aContexts.slice();for(var n=e.length-1;n>=0;n--){var i=this.getLevel(e[n]);if(i!=-1&&i>=t){this.collapseContext(e[n],true)}}this._fireChange()},toggleContext:function(t){var e=this._getContextInfo(t);if(e){if(e.bExpanded){this.collapseContext(t)}else{this.expandContext(t)}}},toggleIndex:function(t){this.toggleContext(this.getContextByIndex(t))},storeSelection:function(){var e=n.getSelectedIndices();var i=[];t(e,function(t,e){i.push(n.getContextByIndex(e))});this._aSelectedContexts=i},restoreSelection:function(){n.clearSelection();var e=this._aSelectedContexts;t(this.aContexts,function(t,i){if((e?e.indexOf(i):-1)>=0){n.addSelectionInterval(t,t)}});this._aSelectedContexts=undefined},attachSelectionChanged:function(){return undefined},detachSelectionChanged:function(){},clearSelection:function(){n._oSelection.clearSelection()},attachSort:function(){},detachSort:function(){}});e._init(n.getExpandFirstLevel())};return e},true);
//# sourceMappingURL=TreeBindingCompatibilityAdapter.js.map