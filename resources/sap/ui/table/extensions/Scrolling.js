/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./ExtensionBase","../utils/TableUtils","../library","sap/ui/Device","sap/ui/performance/trace/Interaction","sap/base/Log","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/scrollLeftRTL"],function(e,r,t,o,l,i,jQuery){"use strict";var n=t.SharedDomRef;var a=r.Hook.Keys;var s=r.createWeakMapFacade();var c=1e6;var f=2;var d={HORIZONAL:"HORIZONTAL",VERTICAL:"VERTICAL",BOTH:"BOTH"};function u(e,r){i.debug("sap.ui.table.extensions.Scrolling",e,r)}function p(e,r){var t=true;var o=false;var l=[];var i={cancel:function(){if(this.isCancelled()||!this.isRunning()){return}o=true;for(var e=0;e<l.length;e++){l[e]()}u("Process cancelled: "+r.id)},isCancelled:function(){return o},addCancelListener:function(e){l.push(e)},isRunning:function(){return t},getInfo:function(){return r},onPromiseCreated:function(e){}};var n;u("Process started: "+r.id);if(typeof e==="function"){n=new Promise(function(){e.apply(this,Array.prototype.slice.call(arguments).concat(i))})}else{n=Promise.resolve()}Object.assign(n,i);n.then(function(){if(i.isCancelled()){u("Process finished due to cancellation: "+r.id)}else{u("Process finished: "+r.id)}t=false});i.onPromiseCreated(n);return n}function g(){this.iIndex=0;this.nOffset=0;this.sOffsetType=g.OffsetType.Pixel;this.bIsInitial=true}g.OffsetType={Pixel:"Pixel",Percentage:"Percentage",PercentageOfViewport:"PercentageOfViewport"};g.prototype.getIndex=function(){return this.iIndex};g.prototype.getOffset=function(){return this.nOffset};g.prototype.getOffsetType=function(){return this.sOffsetType};g.prototype.isOffsetInPixel=function(){return this.sOffsetType===g.OffsetType.Pixel};g.prototype.isInitial=function(){return this.bIsInitial};g.prototype.setPosition=function(e,r,t){u("ScrollPosition#setPosition(index: "+e+", offset: "+r+", offsetType: "+t+")");if(!g._isPositiveNumber(e)){return}if(!g._isPositiveNumber(r)){this.nOffset=0}this.setIndex(e);this.setOffset(r,t)};g.prototype.setIndex=function(e){u("ScrollPosition#setIndex(index: "+e+")");if(!g._isPositiveNumber(e)){return}this.bIsInitial=false;this.iIndex=e};g.prototype.setOffset=function(e,r){u("ScrollPosition#setOffset(offset: "+e+", offsetType: "+r+")");if(!g._isPositiveNumber(e)){return}this.bIsInitial=false;this.sOffsetType=r in g.OffsetType?r:g.OffsetType.Pixel;if(this.isOffsetInPixel()){this.nOffset=Math.round(e)}else{this.nOffset=Math.min(e,1)}};g.prototype.scrollRows=function(e){var r=this.getIndex()+e;var t=this.getOffset();if(!this.isOffsetInPixel()||r<0){t=0}this.setPosition(Math.max(0,r),t)};g._isPositiveNumber=function(e){return typeof e==="number"&&!isNaN(e)&&e>=0};var S={UpdateFromFirstVisibleRow:{id:"UpdateFromFirstVisibleRow",rank:6},UpdateFromScrollPosition:{id:"UpdateFromScrollPosition",rank:5},RestoreScrollPosition:{id:"RestoreScrollPosition",rank:4},AdjustToTotalRowCount:{id:"AdjustToTotalRowCount",rank:3},OnRowsUpdated:{id:"OnRowsUpdated",rank:3},UpdateFromScrollbar:{id:"UpdateFromScrollbar",rank:2},UpdateFromViewport:{id:"UpdateFromViewport",rank:1},canStart:function(e,r){var t=s(e).pVerticalScrollUpdateProcess;var o=t?t.getInfo():null;if(t&&t.isRunning()&&o.rank>r.rank){u("Cannot start update process "+r.id+" - A higher-ranked update process is currently running ("+o.id+")",e);return false}return true},start:function(e,r,t){if(!S.canStart(e,r)){return}if(s(e).pVerticalScrollUpdateProcess){s(e).pVerticalScrollUpdateProcess.cancel()}s(e).pVerticalScrollUpdateProcess=new p(t,r)}};var v={onScrollbarScroll:function(e){var r=e.target.scrollLeft;var t=e.target._scrollLeft;l.notifyScrollEvent&&l.notifyScrollEvent(e);if(r!==t){var o=v.getScrollAreas(this);e.target._scrollLeft=r;for(var i=0;i<o.length;i++){var n=o[i];if(n!==e.target&&n.scrollLeft!==r){n.scrollLeft=r;n._scrollLeft=r}}s(this).iHorizontalScrollPosition=r}},restoreScrollPosition:function(e){var r=e._getScrollExtension();var t=r.getHorizontalScrollbar();if(t&&s(e).iHorizontalScrollPosition!==null){var o=v.getScrollAreas(e);for(var l=0;l<o.length;l++){var i=o[l];delete i._scrollLeft}if(t.scrollLeft!==s(e).iHorizontalScrollPosition){t.scrollLeft=s(e).iHorizontalScrollPosition}else{var n=jQuery.Event("scroll");n.target=t;v.onScrollbarScroll.call(e,n)}}},updateScrollbar:function(e){var r=e._getScrollExtension();var t=r.getHorizontalScrollbar();if(!t){return}var l=e._collectTableSizes();var i=e.$();var n=l.tableCtrlScrollWidth;if(o.browser.safari){n=Math.max(n,e._getColumnsWidth(e.getComputedFixedColumnCount()))}var a=n>l.tableCtrlScrWidth;if(a){if(!r.isHorizontalScrollbarVisible()){i.addClass("sapUiTableHScr");t.classList.remove("sapUiTableHidden");if(o.browser.safari){var s=i.find(".sapUiTableCtrlScroll, .sapUiTableColHdrScr > .sapUiTableColHdr");s.outerWidth(n)}}var c=l.tableCtrlFixedWidth;if(i.find(".sapUiTableRowHdrScr").length>0){c+=l.tableRowHdrScrWidth}if(e._bRtlMode){t.style.marginRight=c+"px";t.style.marginLeft=""}else{t.style.marginLeft=c+"px";t.style.marginRight=""}var f=e.getDomRef("hsb-content");if(f){f.style.width=n+"px"}}if(!a&&r.isHorizontalScrollbarVisible()){i.removeClass("sapUiTableHScr");t.classList.add("sapUiTableHidden");if(o.browser.safari){i.find(".sapUiTableCtrlScroll, .sapUiTableColHdr").css("width","")}}},onScrollbarMouseDown:function(e){this._getKeyboardExtension().setActionMode(false)},addEventListeners:function(e){var r=e._getScrollExtension();var t=r.getHorizontalScrollbar();var o=v.getScrollAreas(e);if(!r._onHorizontalScrollEventHandler){r._onHorizontalScrollEventHandler=v.onScrollbarScroll.bind(e)}for(var l=0;l<o.length;l++){o[l].addEventListener("scroll",r._onHorizontalScrollEventHandler)}if(t){if(!r._onHorizontalScrollbarMouseDownEventHandler){r._onHorizontalScrollbarMouseDownEventHandler=v.onScrollbarMouseDown.bind(e)}t.addEventListener("mousedown",r._onHorizontalScrollbarMouseDownEventHandler)}},removeEventListeners:function(e){var r=e._getScrollExtension();var t=r.getHorizontalScrollbar();var o=v.getScrollAreas(e);if(r._onHorizontalScrollEventHandler){for(var l=0;l<o.length;l++){o[l].removeEventListener("scroll",r._onHorizontalScrollEventHandler);delete o[l]._scrollLeft}delete r._onHorizontalScrollEventHandler}if(t&&r._onHorizontalScrollbarMouseDownEventHandler){t.removeEventListener("mousedown",r._onHorizontalScrollbarMouseDownEventHandler);delete r._onHorizontalScrollbarMouseDownEventHandler}},getScrollAreas:function(e){var r=e.getDomRef();var t;if(r){t=Array.prototype.slice.call(e.getDomRef().querySelectorAll(".sapUiTableCtrlScr"))}var o=[e._getScrollExtension().getHorizontalScrollbar()].concat(t);return o.filter(function(e){return e!=null})}};var h={performUpdateFromFirstVisibleRow:function(e,t){u("VerticalScrollingHelper.performUpdateFromFirstVisibleRow",e);S.start(e,S.UpdateFromFirstVisibleRow,function(o,l,i){r.Hook.call(e,a.Signal,"StartTableUpdate");i.onPromiseCreated=function(t){t.finally(function(){r.Hook.call(e,a.Signal,"EndTableUpdate")})};if(t===true){var n=function(){u("VerticalScrollingHelper.performUpdateFromFirstVisibleRow (async: rows update)",e);h._performUpdateFromFirstVisibleRow(e,i).then(o);return false};h.addOnRowsUpdatedPreprocessor(e,n);i.addCancelListener(function(){var r=h.removeOnRowsUpdatedPreprocessor(e,n);if(r){o()}})}else{h._performUpdateFromFirstVisibleRow(e,i).then(o)}})},_performUpdateFromFirstVisibleRow:function(e,r){return h.adjustScrollPositionToFirstVisibleRow(e,r).then(function(){return h.fixTemporaryFirstVisibleRow(e,null,r)}).then(function(){return h.fixScrollPosition(e,r)}).then(function(){return Promise.all([h.scrollViewport(e,r),h.scrollScrollbar(e,r)])})},performUpdateFromScrollPosition:function(e){u("VerticalScrollingHelper.performUpdateFromScrollPosition",e);S.start(e,S.UpdateFromScrollPosition,function(t,o,l){r.Hook.call(e,a.Signal,"StartTableUpdate");l.onPromiseCreated=function(t){t.finally(function(){r.Hook.call(e,a.Signal,"EndTableUpdate")})};h.adjustFirstVisibleRowToScrollPosition(e,null,l).then(function(){if(l.isCancelled()){return}var t=s(e).oVerticalScrollPosition;u("VerticalScrollingHelper.performUpdateFromScrollPosition (async: firstVisibleRow update)",e);if(t.getIndex()>e.getFirstVisibleRow()){t.setIndex(e.getFirstVisibleRow());if(r.isVariableRowHeightEnabled(e)){t.setOffset(1,g.OffsetType.Percentage)}else{t.setOffset(0)}}}).then(function(){return h.fixScrollPosition(e,l)}).then(function(){return Promise.all([h.scrollViewport(e,l),h.scrollScrollbar(e,l)])}).then(t)})},performUpdateFromScrollbar:function(e){u("VerticalScrollingHelper.performUpdateFromScrollbar",e);clearTimeout(s(e).mTimeouts.largeDataScrolling);delete s(e).mTimeouts.largeDataScrolling;S.start(e,S.UpdateFromScrollbar,function(t,o,l){r.Hook.call(e,a.Signal,"StartTableUpdate");l.onPromiseCreated=function(t){t.finally(function(){r.Hook.call(e,a.Signal,"EndTableUpdate")})};e._getKeyboardExtension().setActionMode(false);if(e._bLargeDataScrolling){s(e).mTimeouts.largeDataScrolling=setTimeout(function(){delete s(e).mTimeouts.largeDataScrolling;if(e._getScrollExtension().getVerticalScrollbar()!=null){u("VerticalScrollingHelper.performUpdateFromScrollbar (async: large data scrolling)",e);h._performUpdateFromScrollbar(e,l).then(t)}else{u("VerticalScrollingHelper.performUpdateFromScrollbar (async: large data scrolling): No scrollbar",e)}},300);l.addCancelListener(function(){if(s(e).mTimeouts.largeDataScrolling!=null){clearTimeout(s(e).mTimeouts.largeDataScrolling);delete s(e).mTimeouts.largeDataScrolling;t()}})}else{h._performUpdateFromScrollbar(e,l).then(t)}})},_performUpdateFromScrollbar:function(e,r){return h.adjustScrollPositionToScrollbar(e,r).then(function(){return h.adjustFirstVisibleRowToScrollPosition(e,null,r)}).then(function(){return h.fixScrollPosition(e,r)}).then(function(){return h.scrollViewport(e,r)})},performUpdateFromViewport:function(e){u("VerticalScrollingHelper.performUpdateFromViewport",e);S.start(e,S.UpdateFromViewport,function(t,o,l){r.Hook.call(e,a.Signal,"StartTableUpdate");l.onPromiseCreated=function(t){t.finally(function(){r.Hook.call(e,a.Signal,"EndTableUpdate")})};h.adjustScrollPositionToViewport(e,l).then(function(){return h.adjustFirstVisibleRowToScrollPosition(e,true,l)}).then(function(){return h.scrollScrollbar(e,l)}).then(t)})},onScrollbarScroll:function(e){l.notifyScrollEvent&&l.notifyScrollEvent(e);var r=e.target.scrollTop;var t=e.target._scrollTop;var o=r!==t;delete e.target._scrollTop;if(r===0&&!e.target.isConnected){u("VerticalScrollingHelper.onScrollbarScroll: Scrollbar is not connected with the DOM",this)}else if(o){u("VerticalScrollingHelper.onScrollbarScroll: Scroll position changed to "+r+" by interaction",this);h.performUpdateFromScrollbar(this)}else{u("VerticalScrollingHelper.onScrollbarScroll: Scroll position changed to "+r+" by API",this)}},onViewportScroll:function(e){if(!S.canStart(this,S.UpdateFromViewport)){return}var r=e.target.scrollTop;var t=e.target._scrollTop;delete e.target._scrollTop;if(r!==t){u("VerticalScrollingHelper.onViewportScroll: Scroll position changed to "+r+" by interaction",this);h.performUpdateFromViewport(this)}else{u("VerticalScrollingHelper.onViewportScroll: Scroll position changed to "+r+" by API",this)}},adjustFirstVisibleRowToScrollPosition:function(e,r,t){if(t&&t.isCancelled()){return Promise.resolve()}r=r===true;var o=s(e).oVerticalScrollPosition;var l=o.getOffsetType()===g.OffsetType.PercentageOfViewport;var i=o.getIndex();var n=e.getFirstVisibleRow();var a=h.isIndexInBuffer(e,i);var c=a||l;u("VerticalScrollingHelper.adjustFirstVisibleRowToScrollPosition:"+' Set "firstVisibleRow" from '+n+" to "+i,e);var f=e._setFirstVisibleRowIndex(i,{onScroll:true,suppressEvent:c,suppressRendering:r});if(!f){if(c){return h.fixTemporaryFirstVisibleRow(e,true,t)}return Promise.resolve()}return new Promise(function(r){var o=function(o){u("VerticalScrollingHelper.adjustFirstVisibleRowToScrollPosition (async: rows updated):"+" Reason "+o.getParameters().reason,this);if(c){h.fixTemporaryFirstVisibleRow(e,true,t).then(r)}else{r()}return false};h.addOnRowsUpdatedPreprocessor(e,o);if(t){t.addCancelListener(function(){var t=h.removeOnRowsUpdatedPreprocessor(e,o);if(t){r()}})}})},fixTemporaryFirstVisibleRow:function(e,r,t){if(t&&t.isCancelled()){return Promise.resolve()}r=r===true;var o=s(e).oVerticalScrollPosition;var l=o.getOffsetType()===g.OffsetType.PercentageOfViewport;var i=o.getIndex();var n=h.isIndexInBuffer(e,i);var a=n||l;if(!a){u("VerticalScrollingHelper.fixTemporaryFirstVisibleRow: Aborted - The index is already final",e);return Promise.resolve()}var c=i;var f=h.getScrollRangeOfViewport(e);var d=e._getMaxFirstRenderedRowIndex();var p=e._aRowHeights;var S;u("VerticalScrollingHelper.fixTemporaryFirstVisibleRow",e);if(l){var v=f*o.getOffset();if(n){c=d}for(S=0;S<p.length;S++){var b=v-p[S];if(b>=0){v=b;c++}else{break}}}else if(n){var T=Math.max(0,Math.min(p.length-1,i-d));var m=0;for(S=0;S<T;S++){m+=p[S];if(m>f){c=d+S;break}}}if(i!==c||r){u('VerticalScrollingHelper.fixTemporaryFirstVisibleRow: Set "firstVisibleRow" to '+c,e);e._setFirstVisibleRowIndex(c,{onScroll:true,forceEvent:r,suppressRendering:true})}return Promise.resolve()},adjustScrollPositionToFirstVisibleRow:function(e,r){if(r&&r.isCancelled()){return Promise.resolve()}u("VerticalScrollingHelper.adjustScrollPositionToFirstVisibleRow",e);s(e).oVerticalScrollPosition.setPosition(e.getFirstVisibleRow());return Promise.resolve()},adjustScrollPositionToScrollbar:function(e,t){if(t&&t.isCancelled()){return Promise.resolve()}var o=s(e).oVerticalScrollPosition;var l=h.getScrollPositionOfScrollbar(e);var i=h.getScrollRange(e);var n=h.getScrollRangeRowFraction(e);var a=0;var c=0;var f=g.OffsetType.Percentage;var d;u("VerticalScrollingHelper.adjustScrollPositionToScrollbar",e);if(r.isVariableRowHeightEnabled(e)){if(h.isScrollPositionOfScrollbarInBuffer(e)){var p=h.getScrollRangeBuffer(e);var S=i-p;var v=l-S;var b=v/p;a=e._getMaxFirstRenderedRowIndex();if(h.isIndexInBuffer(e,o.getIndex())){var T=h.getScrollRangeOfViewport(e);var m=T*b;var V=e._aRowHeights;for(var w=0;w<V.length;w++){var R=m-V[w];if(R>=0){m=R;a++}else{c=Math.round(m);f=g.OffsetType.Pixel;break}}}else{c=b;f=g.OffsetType.PercentageOfViewport}}else{d=l/n;a=Math.floor(d);c=d-a}}else{var P=i-l;var H=P<1;if(H){a=e._getMaxFirstVisibleRowIndex();c=0;f=g.OffsetType.Pixel}else{d=l/n;a=Math.floor(d);c=d-a}}o.setPosition(a,c,f);return Promise.resolve()},adjustScrollPositionToViewport:function(e,r){if(r&&r.isCancelled()){return Promise.resolve()}var t=s(e).oVerticalScrollPosition;var o=e._aRowHeights;var l=e._getFirstRenderedRowIndex();var i=0;var n=h.getScrollPositionOfViewport(e);u("VerticalScrollingHelper.adjustScrollPositionToViewport",e);for(var a=0;a<o.length;a++){var c=n-o[a];if(c>=0){n=c;l++}else{i=Math.round(n);break}}t.setPosition(l,i);return Promise.resolve()},fixScrollPosition:function(e,t){if(t&&t.isCancelled()){return Promise.resolve()}var o=s(e).oVerticalScrollPosition;var l=e.getDomRef("tableCCnt");var i=h.getScrollRangeOfViewport(e);var n=e._aRowHeights;if(!l||!e.getBinding()){u("VerticalScrollingHelper.fixScrollPosition: Aborted - Viewport or binding not available",e);return Promise.resolve()}u("VerticalScrollingHelper.fixScrollPosition",e);var a=o.getIndex();var c=o.getOffset();var f=0;var d;var p=e._getFirstRenderedRowIndex();switch(o.getOffsetType()){case g.OffsetType.Pixel:case g.OffsetType.Percentage:var S=o.getIndex();var v=0;var b=o.getOffsetType();if(h.isIndexInBuffer(e,S)){var T=0;f=Math.max(0,Math.min(n.length-1,S-p));for(d=0;d<f;d++){T+=n[d];if(T>i){a=p+d;c=i-v;b=g.OffsetType.Pixel;f=d;break}else{v=T}}}if(b===g.OffsetType.Pixel){c=Math.min(c,n[f])}else{c=n[f]*c}v+=c;if(v>i&&r.isVariableRowHeightEnabled(e)){c-=v-i}break;case g.OffsetType.PercentageOfViewport:var m=i*o.getOffset();for(d=0;d<n.length;d++){var V=m-n[d];if(V>=0){m=V;f++}else{a=p+f;c=Math.round(m);break}}break;default:}o.setPosition(a,c);return Promise.resolve()},scrollViewport:function(e,t){if(t&&t.isCancelled()){return Promise.resolve()}if(!r.isVariableRowHeightEnabled(e)){u("VerticalScrollingHelper.scrollViewport: Aborted - Variable row height not enabled",e);return Promise.resolve()}var o=s(e).oVerticalScrollPosition;var l=e.getDomRef("tableCCnt");var i=h.getScrollRangeOfViewport(e);var n=e._aRowHeights;var a=0;if(i===0){u("VerticalScrollingHelper.scrollViewport: Aborted - No overflow in viewport",e);l.scrollTop=a;l._scrollTop=l.scrollTop;return Promise.resolve()}u("VerticalScrollingHelper.scrollViewport",e);switch(o.getOffsetType()){case g.OffsetType.Pixel:var c=o.getIndex();var f=Math.max(0,Math.min(n.length-1,c-e._getFirstRenderedRowIndex()));for(var d=0;d<f;d++){a+=n[d]}a+=o.getOffset();break;default:u("VerticalScrollingHelper.scrollViewport: The viewport can only be scrolled if the offset is in pixel",e);return Promise.resolve()}u("VerticalScrollingHelper.scrollViewport: Scroll from "+l.scrollTop+" to "+a,e);l.scrollTop=a;l._scrollTop=l.scrollTop;return Promise.resolve()},scrollScrollbar:function(e,r){if(r&&r.isCancelled()){return Promise.resolve()}var t=s(e).oVerticalScrollPosition;var o=t.getIndex();var l=h.getScrollRangeBuffer(e);var i=h.getScrollRange(e);var n=i-l;var a=0;var c=0;var f=h.getScrollRangeOfViewport(e);var d=e._aRowHeights;var p;u("VerticalScrollingHelper.scrollScrollbar",e);if(i===0||d.length===0){u("VerticalScrollingHelper.scrollScrollbar: No scrollable content",e);return Promise.resolve()}switch(t.getOffsetType()){case g.OffsetType.Pixel:if(h.isIndexInBuffer(e,o)){var S=0;p=Math.max(0,Math.min(d.length-1,o-e._getMaxFirstRenderedRowIndex()));for(var v=0;v<p;v++){S+=d[v]}S+=Math.min(d[p],t.getOffset());var b=Math.min(S/f,1);var T=l*b;a=n+T}else{var m=h.getScrollRangeRowFraction(e);a=o*m;p=Math.max(0,Math.min(d.length-1,o-e._getFirstRenderedRowIndex()));a+=m*Math.min(t.getOffset()/d[p],1)}break;default:u("VerticalScrollingHelper.scrollViewport: The scrollbar can only be scrolled if the offset is in pixel",e);return Promise.resolve()}if(a>0&&a<.5){c=1}else if(a>=i-.5&&a<i){c=i-1}else{c=Math.round(a)}var V=e._getScrollExtension().getVerticalScrollbar();if(V){u("VerticalScrollingHelper.scrollScrollbar: Scroll from "+V.scrollTop+" to "+c,e);V.scrollTop=c;V._scrollTop=V.scrollTop}else{u("VerticalScrollingHelper.scrollScrollbar: Not scrolled - No scrollbar available",e)}return Promise.resolve()},getScrollRange:function(e){var r=e._getScrollExtension();var t=r.getVerticalScrollHeight()-r.getVerticalScrollbarHeight();return Math.max(0,t)},getScrollRangeBuffer:function(e){if(!r.isVariableRowHeightEnabled(e)){return 0}return f*e._getBaseRowHeight()},getScrollPositionOfScrollbar:function(e){var r=e._getScrollExtension();if(r.isVerticalScrollbarVisible()){return r.getVerticalScrollbar().scrollTop}else{return 0}},getScrollPositionOfViewport:function(e){var r=e?e.getDomRef("tableCCnt"):null;return r?r.scrollTop:0},getScrollRangeRowFraction:function(e){var t=e._getScrollExtension();var o=e._getTotalRowCount()-e._getRowCounts()._fullsize;var l;if(r.isVariableRowHeightEnabled(e)){l=h.getScrollRange(e)-h.getScrollRangeBuffer(e);var i=t.getVerticalScrollHeight()===c;if(!i){l+=e._getBaseRowHeight()}}else{l=h.getScrollRange(e)}return l/Math.max(1,o)},isScrollPositionOfScrollbarInBuffer:function(e){if(!r.isVariableRowHeightEnabled(e)){return false}var t=h.getScrollRange(e);var o=h.getScrollPositionOfScrollbar(e);var l=h.getScrollRangeBuffer(e);return t-o<=l},isIndexInBuffer:function(e,t){if(!r.isVariableRowHeightEnabled(e)){return false}return t>=e._getMaxFirstRenderedRowIndex()},getScrollRangeOfViewport:function(e){if(!e||!e._aRowHeights){return 0}var r=e._aRowHeights;var t=e._getBaseRowHeight()*e._getRowCounts()._fullsize;if(e._getRowCounts()._fullsize>=e._getTotalRowCount()){r=r.slice(0,e._getTotalRowCount())}var o=r.reduce(function(e,r){return e+r},0)-t;if(o>0){o=Math.ceil(o)}return Math.max(0,o)},addOnRowsUpdatedPreprocessor:function(e,r){s(e).aOnRowsUpdatedPreprocessors.push(r)},removeOnRowsUpdatedPreprocessor:function(e,r){if(!r){s(e).aOnRowsUpdatedPreprocessors=[];return false}var t=s(e).aOnRowsUpdatedPreprocessors.indexOf(r);if(t>-1){s(e).aOnRowsUpdatedPreprocessors.splice(t,1);return true}return false},onRowsUpdated:function(e){u("VerticalScrollingHelper.onRowsUpdated: Reason "+e.getParameters().reason,this);h.updateScrollbarVisibility(this);if(s(this).aOnRowsUpdatedPreprocessors.length>0){u("VerticalScrollingHelper.onRowsUpdated (preprocessors)",this);var t=s(this).aOnRowsUpdatedPreprocessors.reduce(function(r,t){var o=t.call(this,e);return!(r&&!o)},true);h.removeOnRowsUpdatedPreprocessor(this);if(!t){u("VerticalScrollingHelper.onRowsUpdated (preprocessors): Default prevented",this);return}}if(!r.isVariableRowHeightEnabled(this)){u("VerticalScrollingHelper.onRowsUpdated: Aborted - Variable row heights not enabled",this);return}var o=this;S.start(this,S.OnRowsUpdated,function(e,t,l){r.Hook.call(o,a.Signal,"StartTableUpdate");l.onPromiseCreated=function(e){e.finally(function(){r.Hook.call(o,a.Signal,"EndTableUpdate")})};h.fixScrollPosition(o,l).then(function(){return Promise.all([h.adjustFirstVisibleRowToScrollPosition(o,true,l),h.scrollViewport(o,l),h.scrollScrollbar(o,l)])}).then(e)})},restoreScrollPosition:function(e,t){u("VerticalScrollingHelper.restoreScrollPosition",e);S.start(e,S.RestoreScrollPosition,function(o,l,i){r.Hook.call(e,a.Signal,"StartTableUpdate");i.onPromiseCreated=function(t){t.then(function(){if(!i.isCancelled()){h._restoreScrollPosition(e)}}).finally(function(){r.Hook.call(e,a.Signal,"EndTableUpdate")})};if(t!==true){o();return}var n=function(){u("VerticalScrollingHelper.restoreScrollPosition (async: rows updated)",e);o();return false};h.addOnRowsUpdatedPreprocessor(e,n);i.addCancelListener(function(){var r=h.removeOnRowsUpdatedPreprocessor(e,n);if(r){o()}})})},_restoreScrollPosition:function(e){var r=s(e).oVerticalScrollPosition;var t=r.isInitial();u("VerticalScrollingHelper.restoreScrollPosition: "+"Scroll position is"+(t?" ":" not ")+"initial",e);if(t){h.performUpdateFromFirstVisibleRow(e)}else{h.performUpdateFromScrollPosition(e)}},onTotalRowCountChanged:function(){h.adjustToTotalRowCount(this)},adjustToTotalRowCount:function(e){var t=e._getScrollExtension();u("VerticalScrollingHelper.adjustToTotalRowCount",e);h.updateScrollbarVisibility(e);v.updateScrollbar(e);t.updateVerticalScrollHeight();S.start(e,S.AdjustToTotalRowCount,function(t,o,l){r.Hook.call(e,a.Signal,"StartTableUpdate");l.onPromiseCreated=function(t){t.then(function(){if(l.isCancelled()||s(e).oVerticalScrollPosition.isInitial()){return}h.performUpdateFromScrollPosition(e)}).finally(function(){r.Hook.call(e,a.Signal,"EndTableUpdate")})};if(s(e).oVerticalScrollPosition.isInitial()){t()}else{var i=function(){u("VerticalScrollingHelper.adjustToTotalRowCount (async: rows updated)",e);t();return false};h.addOnRowsUpdatedPreprocessor(e,i);l.addCancelListener(function(){var r=h.removeOnRowsUpdatedPreprocessor(e,i);if(r){t()}})}})},onUpdateTableSizes:function(e){h.updateScrollbarVisibility(this);v.updateScrollbar(this)},updateScrollbarVisibility:function(e){var r=e._getScrollExtension();var t=r.getVerticalScrollbar();var o=e?e.getDomRef():null;if(!t||!o){return}var l=r.isVerticalScrollbarRequired();o.classList.toggle("sapUiTableVScr",l&&!r.isVerticalScrollbarExternal());t.parentElement.classList.toggle("sapUiTableHidden",!l)},addEventListeners:function(e){var r=e._getScrollExtension();var t=h.getScrollAreas(e);var o=e.getDomRef("tableCCnt");if(!r._onVerticalScrollEventHandler){r._onVerticalScrollEventHandler=h.onScrollbarScroll.bind(e)}for(var l=0;l<t.length;l++){t[l].addEventListener("scroll",r._onVerticalScrollEventHandler)}if(o){if(!r._onViewportScrollEventHandler){r._onViewportScrollEventHandler=h.onViewportScroll.bind(e)}o.addEventListener("scroll",r._onViewportScrollEventHandler)}e.attachRowsUpdated(h.onRowsUpdated)},removeEventListeners:function(e){var r=e._getScrollExtension();var t=h.getScrollAreas(e);var o=e.getDomRef("tableCCnt");if(r._onVerticalScrollEventHandler){for(var l=0;l<t.length;l++){t[l].removeEventListener("scroll",r._onVerticalScrollEventHandler)}delete r._onVerticalScrollEventHandler}if(o&&r._onViewportScrollEventHandler){o.removeEventListener("scroll",r._onViewportScrollEventHandler);delete r._onViewportScrollEventHandler}e.detachRowsUpdated(h.onRowsUpdated)},getScrollAreas:function(e){var r=[e._getScrollExtension().getVerticalScrollbar()];return r.filter(function(e){return e!=null})}};var b={onMouseWheelScrolling:function(e,t){var o=this._getScrollExtension();var l=Math.abs(t.deltaY)>Math.abs(t.deltaX);var i=l?t.deltaY:t.deltaX;var n=l&&t.shiftKey||!l;var a=i>0;var c=false;if(i===0){return}if(n&&(e.scrollDirection===d.HORIZONAL||e.scrollDirection===d.BOTH)){var f=o.getHorizontalScrollbar();if(t.deltaMode!==window.WheelEvent.DOM_DELTA_PIXEL){var u=r.Column.getMinColumnWidth();i=a?u:-u}if(a){c=f.scrollLeft===f.scrollWidth-f.offsetWidth}else{c=f.scrollLeft===0}if(o.isHorizontalScrollbarVisible()&&!c){t.preventDefault();t.stopPropagation();this._getKeyboardExtension().setActionMode(false);f.scrollLeft=f.scrollLeft+i}}else if(!n&&(e.scrollDirection===d.VERTICAL||e.scrollDirection===d.BOTH)){var p=o.getVerticalScrollbar();var g=s(this).oVerticalScrollPosition;if(a){c=p.scrollTop===p.scrollHeight-p.offsetHeight}else{c=p.scrollTop===0}if(!o.isVerticalScrollbarVisible()||c){return}t.preventDefault();t.stopPropagation();if(t.deltaMode===window.WheelEvent.DOM_DELTA_PIXEL){var S=i/this._getDefaultRowHeight();if(S>=0){g.scrollRows(Math.max(1,Math.floor(S)))}else{g.scrollRows(Math.min(-1,Math.ceil(S)))}}else if(t.deltaMode===window.WheelEvent.DOM_DELTA_LINE){g.scrollRows(i)}else if(t.deltaMode===window.WheelEvent.DOM_DELTA_PAGE){g.scrollRows(i*this._getRowCounts()._scrollSize)}this._getKeyboardExtension().setActionMode(false);h.performUpdateFromScrollPosition(this)}},onTouchStart:function(e,r){if(r.type==="touchstart"||r.pointerType==="touch"){var t=this._getScrollExtension();var o=t.getHorizontalScrollbar();var l=t.getVerticalScrollbar();var i=r.touches?r.touches[0]:r;s(this).mTouchSessionData={initialPageX:i.pageX,initialPageY:i.pageY,initialScrollTop:l?l.scrollTop:0,initialScrollLeft:o?o.scrollLeft:0,initialScrolledToEnd:null,touchMoveDirection:null}}},onTouchMoveScrolling:function(e,r){if(r.type!=="touchmove"&&r.pointerType!=="touch"){return}var t=this._getScrollExtension();var o=s(this).mTouchSessionData;if(!o){return}var l=r.touches?r.touches[0]:r;var i=l.pageX-o.initialPageX;var n=l.pageY-o.initialPageY;var a=false;if(!o.touchMoveDirection){if(i===0&&n===0){return}o.touchMoveDirection=Math.abs(i)>Math.abs(n)?"horizontal":"vertical"}switch(o.touchMoveDirection){case"horizontal":var c=t.getHorizontalScrollbar();if(c&&(e.scrollDirection===d.HORIZONAL||e.scrollDirection===d.BOTH)){this._getKeyboardExtension().setActionMode(false);if(o.initialScrolledToEnd==null){if(i<0){o.initialScrolledToEnd=c.scrollLeft===c.scrollWidth-c.offsetWidth}else{o.initialScrolledToEnd=c.scrollLeft===0}}if(!o.initialScrolledToEnd){c.scrollLeft=o.initialScrollLeft-i;a=true}}break;case"vertical":var f=t.getVerticalScrollbar();if(f&&(e.scrollDirection===d.VERTICAL||e.scrollDirection===d.BOTH)){this._getKeyboardExtension().setActionMode(false);if(o.initialScrolledToEnd==null){if(n<0){o.initialScrolledToEnd=f.scrollTop===f.scrollHeight-f.offsetHeight}else{o.initialScrolledToEnd=f.scrollTop===0}}if(!o.initialScrolledToEnd){f.scrollTop=o.initialScrollTop-n;a=true}}break;default:}if(a){r.preventDefault()}},addEventListeners:function(e){var r=e._getScrollExtension();var t=b.getEventListenerTargets(e);r._mMouseWheelEventListener=this.addMouseWheelEventListener(t,e,{scrollDirection:d.BOTH});r._mTouchEventListener=this.addTouchEventListener(t,e,{scrollDirection:d.BOTH})},addMouseWheelEventListener:function(e,r,t){var o=b.onMouseWheelScrolling.bind(r,t);for(var l=0;l<e.length;l++){e[l].addEventListener("wheel",o)}return{wheel:o}},addTouchEventListener:function(e,r,t){var l=b.onTouchStart.bind(r,t);var i=b.onTouchMoveScrolling.bind(r,t);var n={};for(var a=0;a<e.length;a++){if(o.support.pointer&&o.system.desktop){e[a].addEventListener("pointerdown",l);e[a].addEventListener("pointermove",i,o.browser.chrome?{passive:true}:false)}else if(o.support.touch){e[a].addEventListener("touchstart",l);e[a].addEventListener("touchmove",i)}}if(o.support.pointer&&o.system.desktop){n={pointerdown:l,pointermove:i}}else if(o.support.touch){n={touchstart:l,touchmove:i}}return n},removeEventListeners:function(e){var r=e._getScrollExtension();var t=b.getEventListenerTargets(e);function o(e,r){for(var t in r){var o=r[t];if(o){e.removeEventListener(t,o)}}}for(var l=0;l<t.length;l++){o(t[l],r._mMouseWheelEventListener);o(t[l],r._mTouchEventListener)}delete r._mMouseWheelEventListener;delete r._mTouchEventListener},getEventListenerTargets:function(e){var r=[e.getDomRef("tableCCnt")];return r.filter(function(e){return e!=null})}};var T={onBeforeRendering:function(e){this._getScrollExtension()._clearCache()},onAfterRendering:function(e){var r=this._getScrollExtension();var t=e!=null&&e.isMarked("renderRows");if(t){r.updateVerticalScrollbarHeight();r.updateVerticalScrollHeight()}h.restoreScrollPosition(this,this.getBinding()!=null);v.restoreScrollPosition(this)},onfocusin:function(e){var t;var l=r.getCellInfo(e.target);var i=this._getScrollExtension().getHorizontalScrollbar();if(l.isOfType(r.CELLTYPE.DATACELL)){t=this.getDomRef("sapUiTableCtrlScr")}else if(l.isOfType(r.CELLTYPE.COLUMNHEADER)){t=this.getDomRef("sapUiTableColHdrScr")}if(t&&i&&l.columnIndex>=this.getComputedFixedColumnCount()){var n=jQuery(i);var s=l.cell[0];var c=this._bRtlMode?n.scrollLeftRTL():i.scrollLeft;var f=t.clientWidth;var d=s.offsetLeft;var u=d+s.offsetWidth;var p=d-c;var g=u-f-c;var S;if(p<0&&g<0){S=c+p}else if(g>0&&p>0){S=c+g}if(S!=null){if(this._bRtlMode){n.scrollLeftRTL(S)}else{i.scrollLeft=S}}}var v=r.getParentCell(this,e.target);if(v){var h=this;var b=function(){var e=v.find(".sapUiTableCellInner");if(e.length>0){if(h._bRtlMode){e.scrollLeftRTL(e[0].scrollWidth-e[0].clientWidth)}else{e[0].scrollLeft=0}e[0].scrollTop=0}r.Hook.call(h,a.Signal,"EndFocusHandling");r.Hook.call(h,a.Signal,"EndTableUpdate")};r.Hook.call(this,a.Signal,"StartTableUpdate");r.Hook.call(this,a.Signal,"StartFocusHandling");Promise.resolve().then(function(){if(o.browser.safari){window.setTimeout(b,0)}else{b()}})}}};var m=e.extend("sap.ui.table.extensions.Scrolling",{_init:function(e,t,o){var l=s(e);l.oHorizontalScrollbar=null;l.iHorizontalScrollPosition=null;l.oVerticalScrollbar=null;l.oVerticalScrollPosition=new g(e);l.pVerticalScrollUpdateProcess=null;l.oExternalVerticalScrollbar=null;l.bIsVerticalScrollbarExternal=false;l.mTimeouts={};l.mAnimationFrames={};l.mTouchSessionData=null;l.aOnRowsUpdatedPreprocessors=[];r.addDelegate(e,T,e);return"ScrollExtension"},_attachEvents:function(){var e=this.getTable();v.addEventListeners(e);h.addEventListeners(e);b.addEventListeners(e);r.Hook.register(e,r.Hook.Keys.Table.TotalRowCountChanged,h.onTotalRowCountChanged,e);r.Hook.register(e,r.Hook.Keys.Table.UpdateSizes,h.onUpdateTableSizes,e)},_detachEvents:function(){var e=this.getTable();v.removeEventListeners(e);h.removeEventListeners(e);b.removeEventListeners(e);r.Hook.deregister(e,r.Hook.Keys.Table.TotalRowCountChanged,h.onTotalRowCountChanged,e);r.Hook.deregister(e,r.Hook.Keys.Table.UpdateSizes,h.onUpdateTableSizes,e)},destroy:function(){var t=this.getTable();this._clearCache();if(t){r.removeDelegate(t,T);if(s(t).pVerticalScrollUpdateProcess){s(t).pVerticalScrollUpdateProcess.cancel();s(t).pVerticalScrollUpdateProcess=null}}e.prototype.destroy.apply(this,arguments)}});m.prototype.scrollVertically=function(e,r){var t=this.getTable();if(!t){return}var o=t._getRowCounts();var l=t._getFirstRenderedRowIndex();var i=r===true?o.scrollable:1;if(e===true){s(t).oVerticalScrollPosition.setPosition(l+i,1,g.OffsetType.PercentageOfViewport)}else{s(t).oVerticalScrollPosition.setPosition(Math.max(0,l-i))}h.performUpdateFromScrollPosition(t)};m.prototype.scrollVerticallyMax=function(e){var r=this.getTable();if(!r){return}if(e===true){s(r).oVerticalScrollPosition.setPosition(r._getMaxFirstRenderedRowIndex(),1,g.OffsetType.PercentageOfViewport)}else{s(r).oVerticalScrollPosition.setPosition(0)}h.performUpdateFromScrollPosition(r)};m.prototype.getHorizontalScrollbar=function(){var e=this.getTable();if(!e){return null}if(!e._bInvalid&&!s(e).oHorizontalScrollbar){s(e).oHorizontalScrollbar=e.getDomRef(n.HorizontalScrollBar)}return s(e).oHorizontalScrollbar};m.prototype.getVerticalScrollbar=function(){var e=this.getTable();var r=this.isVerticalScrollbarExternal();if(!e){return null}if(!e._bInvalid&&!s(e).oVerticalScrollbar){s(e).oVerticalScrollbar=e.getDomRef(n.VerticalScrollBar);if(!s(e).oVerticalScrollbar&&r){s(e).oVerticalScrollbar=s(e).oExternalVerticalScrollbar}}var t=s(e).oVerticalScrollbar;if(t&&!r&&!t.isConnected){return null}return t};m.prototype.isHorizontalScrollbarVisible=function(){var e=this.getHorizontalScrollbar();return e!=null&&!e.classList.contains("sapUiTableHidden")};m.prototype.isVerticalScrollbarVisible=function(){var e=this.getVerticalScrollbar();return e!=null&&!e.parentElement.classList.contains("sapUiTableHidden")};m.prototype.isVerticalScrollbarExternal=function(){var e=this.getTable();return e?s(e).bIsVerticalScrollbarExternal:false};m.prototype.markVerticalScrollbarAsExternal=function(e){var r=this.getTable();if(r&&e){s(r).bIsVerticalScrollbarExternal=true;s(r).oExternalVerticalScrollbar=e}};m.prototype.updateVerticalScrollbarHeight=function(){var e=this.getTable();var r=this.getVerticalScrollbar();if(!e||!r){return}r.style.maxHeight=this.getVerticalScrollbarHeight()+"px";r._scrollTop=r.scrollTop};m.prototype.getVerticalScrollbarHeight=function(){var e=this.getTable();if(!e){return 0}return e._getRowCounts()._scrollSize*e._getBaseRowHeight()};m.prototype.updateVerticalScrollPosition=function(e){var r=this.getTable();if(!r){return}e=e===true;if(e||r.getBinding()){h.performUpdateFromFirstVisibleRow(r,e)}else{h.adjustScrollPositionToFirstVisibleRow(r)}};m.prototype.restoreVerticalScrollPosition=function(){h.restoreScrollPosition(this.getTable())};m.prototype.updateVerticalScrollHeight=function(){var e=this.getVerticalScrollbar();var r=e?e.firstChild:null;if(!r){return}r.style.height=this.getVerticalScrollHeight()+"px";e._scrollTop=e.scrollTop};m.prototype.getVerticalScrollHeight=function(e){var t=this.getTable();if(!t){return 0}var o=t._getTotalRowCount();var l=t._getRowCounts();var i=Math.max(o,l.count);var n=t._getBaseRowHeight();var a;if(r.isVariableRowHeightEnabled(t)){a=n*(i-1)+h.getScrollRangeBuffer(t)}else{a=n*i}if(e===true){return a}else{return Math.min(c,a)}};m.prototype.isVerticalScrollbarRequired=function(){var e=this.getTable();if(!e){return false}return r.isVariableRowHeightEnabled(e)&&h.getScrollRangeOfViewport(e)>0||e._getTotalRowCount()>e._getRowCounts()._fullsize};m.prototype.registerForMouseWheel=function(r,t){var o=this.getTable();if(e.isEnrichedWith(o,"sap.ui.table.extensions.Synchronization")){return b.addMouseWheelEventListener(r,o,t)}else{i.error("This method can only be used with synchronization enabled.",o,"sap.ui.table.extensions.Scrolling#registerForMouseWheel");return null}};m.prototype.registerForTouch=function(r,t){var o=this.getTable();if(e.isEnrichedWith(o,"sap.ui.table.extensions.Synchronization")){return b.addTouchEventListener(r,o,t)}else{i.error("This method can only be used with synchronization enabled.",o,"sap.ui.table.extensions.Scrolling#registerForTouch");return null}};m.prototype._clearCache=function(){var e=this.getTable();if(!e){return}s(e).oVerticalScrollbar=null;s(e).oHorizontalScrollbar=null};m.ScrollDirection=d;return m});
//# sourceMappingURL=Scrolling.js.map