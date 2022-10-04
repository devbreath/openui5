/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/ManagedObject","sap/ui/core/IconPool","sap/ui/core/Core","sap/m/library","sap/m/Popover","sap/m/Text","sap/ui/layout/form/SimpleForm","sap/m/Button","sap/m/Label","sap/m/Link","sap/ui/core/HTML","sap/ui/core/Title","sap/ui/thirdparty/jquery"],function(t,e,a,n,r,s,i,o,p,l,c,d,jQuery){"use strict";var u=n.PlacementType;var v=t.extend("sap.ui.core.support.controls.InteractionTree",{metadata:{library:"sap.ui.core"},constructor:function(){this.start=0;this.end=1}});v.expandIcon="sap-icon://navigation-right-arrow";v.collapseIcon="sap-icon://navigation-down-arrow";v.prototype.setInteractions=function(t){this.interactions=t;this.start=0;this.end=1;this.updateRanges()};v.prototype.setRange=function(t,e){this.start=t;this.end=e;this.updateRanges();this.update()};v.prototype.updateRanges=function(){var t=this.interactions;if(!t||!t.length){return}this.startTime=t[0].start;this.endTime=t[t.length-1].end;var e=this.endTime-this.startTime;this.actualStartTime=this.startTime+this.start*e;this.actualEndTime=this.startTime+this.end*e;this.timeRange=this.actualEndTime-this.actualStartTime};v.prototype.update=function(){if(!this.parent){return}jQuery(this.parent).find("#"+this.getId()).remove();this.renderAt(this.parent)};v.prototype.renderAt=function(t){this.parent=t;var e=a.createRenderManager();this.render(e);e.flush(t,true);e.destroy();this.attachEvents();this.attachInteractionDetailsPopover();this.attachRequestDetailsPopover()};v.prototype.render=function(t){t.openStart("div",this.getId()).class("sapUiInteractionTreeContainer").class("sapUiSizeCompact").openEnd();t.openStart("div").class("sapUiInteractionGridLinesContainer").openEnd().close("div");t.openStart("ul").class("sapUiInteractionTree").openEnd();this.renderHeaders(t);var e,a=this.interactions;if(!a||!a.length){return}for(var n=0;n<a.length;n++){e=a[n];this.renderInteraction(t,e,n)}t.close("ul");t.close("div")};v.prototype.attachEvents=function(){var t=this,e=jQuery(".sapUiInteractionTreeContainer .sapUiInteractionTree");this.gridContainer=jQuery(".sapUiInteractionTreeContainer .sapUiInteractionGridLinesContainer");this.gridContainerWidth=0;e.on("click",function(e){var a=jQuery(e.target);if(a.hasClass("sapUiInteractionLeft")){t.handleInteractionClick(a)}});this.gridContainer.on("resize",function(e){t.updateGridLines()});jQuery(window).on("resize",function(e){t.updateGridLines()});t.updateGridLines()};v.prototype.updateGridLines=function(){var t=this.gridContainer,e=this.timeRange,n=this.gridContainer.width(),r=a.createRenderManager();if(this.gridContainerWidth===n){return}r.openStart("div").style("left",this.getPosition(n,e,0)+6+"px").class("sapUiInteractionGridLineIntervalText").openEnd().text(this.formatGridLineDuration(0)).close("div");var s=this.calculateInterval(n,e);for(var i=s;i<e;i+=s){var o=this.getPosition(n,e,i);if(i+s<e){r.openStart("div").style("left",o+6+"px").class("sapUiInteractionGridLineIntervalText").openEnd().text(this.formatGridLineDuration(i)).close("div")}r.openStart("div").style("left",o+"px").class("sapUiInteractionGridLine").openEnd().close("div")}t.empty();r.flush(t[0],true);r.destroy();this.gridContainerWidth=n};v.prototype.calculateInterval=function(t,e){var a=4;var n=Math.max(t*a/200,1);var r=e/n;var s=Math.pow(10,Math.floor(Math.log(r)/Math.LN10));var i=[10,5,2,1];for(var o=0;o<i.length;o++){var p=i[o];var l=s*p;if(n<e/l){break}r=l}return r};v.prototype.getPosition=function(t,e,a){var n=t/e*a;return n};v.prototype.handleInteractionClick=function(t){var e=t.find(".sapUiInteractionTreeIcon");if(!e.length){return}var n=e.attr("expanded")=="true";var r=e.parent();e.remove();var s=a.createRenderManager();this.renderIcon(s,!n);s.flush(r[0],false,true);s.destroy();var i=r.parent().parent();i.toggleClass("sapUiInteractionItemExpanded");var o=parseInt(i.attr("data-interaction-index"));this.interactions[o].isExpanded=!n;var p=i.find("ul");var l=n?"slideUp":"slideDown";p.stop(true,true)[l]("fast",function(){p.toggleClass("sapUiHiddenUiInteractionItems")})};v.prototype.renderHeaders=function(t){t.openStart("li").openEnd();t.openStart("div").class("sapUiInteractionTreeItem").class("sapUiInteractionItemDiv").class("sapUiInteractionHeader").openEnd();t.openStart("div").class("sapUiInteractionTreeItemLeft").openEnd();t.openStart("div").openEnd();t.openStart("span").class("sapUiInteractionItemComponentText").openEnd().text("Component").close("span");t.voidStart("br").voidEnd();t.openStart("span").class("sapUiInteractionItemTriggerText").openEnd().text("Trigger").close("span");t.close("div");t.close("div");t.openStart("div").class("sapUiInteractionTreeItemRight").openEnd().close("div");t.close("div");t.close("li")};v.prototype.isInteractionVisible=function(t){var e=t.start;var a=t.end;if(this.actualStartTime>a||this.actualEndTime<e){return false}if(this.actualStartTime<e+t.duration&&this.actualEndTime>e){return true}return this.hasVisibleRequests(t)};v.prototype.hasVisibleRequests=function(t){var e,a,n,r=t.requests;for(var s=0;s<r.length;s++){e=r[s];a=e.fetchStartOffset+e.startTime;n=e.fetchStartOffset+e.startTime+this.getRequestDuration(e);if(this.actualStartTime<n&&this.actualEndTime>a){return true}}return false};v.prototype.renderInteraction=function(t,e,a){var n,r=e.requests;if(!this.isInteractionVisible(e)){return}t.openStart("li").attr("data-interaction-index",a);if(e.isExpanded){t.class("sapUiInteractionItemExpanded")}t.openEnd();this.renderInteractionDiv(t,e);t.openStart("ul");t.class("sapUiInteractionItem");if(!e.isExpanded){t.class("sapUiHiddenUiInteractionItems")}t.openEnd();for(var s=0;s<r.length;s++){n=r[s];this.renderRequest(t,e,n,s)}t.close("ul");t.close("li")};v.prototype.renderInteractionDiv=function(t,e){t.openStart("div");t.class("sapUiInteractionTreeItem");t.class("sapUiInteractionItemDiv");t.openEnd();t.openStart("div").class("sapUiInteractionLeft").class("sapUiInteractionTreeItemLeft").openEnd();t.openStart("div").openEnd();t.openStart("span").class("sapUiInteractionItemComponentText").openEnd();t.text(e.component!=="undetermined"?e.component:"Initial Loading");t.close("span");t.voidStart("br").voidEnd();t.openStart("span").class("sapUiInteractionItemTriggerText").openEnd().text(e.trigger+" / "+e.event).close("span");t.close("div");if(e.requests.length){this.renderIcon(t,e.isExpanded)}if(e.sapStatistics.length&&e.requests.length){t.openStart("div").class("sapUiInteractionHeaderIcon").openEnd();t.voidStart("img").class("sapUiInteractionSvgImage").attr("src","HeaderIcon.svg").voidEnd();t.close("div")}t.close("div");t.openStart("div").class("sapUiInteractionTreeItemRight").openEnd();var a=Math.round(e.start+e.duration);this.renderInteractionPart(t,e.start,a,"sapUiInteractionBlue");t.close("div");t.close("div")};v.prototype.renderInteractionPart=function(t,e,a,n){if(this.actualStartTime>a||this.actualEndTime<e){return}a=Math.min(a,this.actualEndTime);e=Math.max(e,this.actualStartTime);var r=100/this.timeRange*(e-this.actualStartTime);var s=100/this.timeRange*(a-this.actualStartTime);var i=s-r;t.openStart("span").style("margin-left",r+"%").style("width",i+"%").class("sapUiInteractionTimeframe").class("sapUiInteractionTimeInteractionFrame").class(n).openEnd().close("span")};v.prototype.renderRequest=function(t,e,a,n){var r=a.fetchStartOffset;var s=r+a.startTime;var i=r+a.startTime+this.getRequestDuration(a);if(this.actualStartTime>i||this.actualEndTime<s){return}t.openStart("li").attr("data-request-index",n).class("sapUiInteractionTreeItem").class("sapUiInteractionRequest").openEnd();t.openStart("div").class("sapUiInteractionTreeItemLeft").class("sapUiInteractionRequestLeft").openEnd();var o=a.initiatorType||a.entryType;var p=this.getRequestColorClass(o);t.openStart("span").class("sapUiInteractionRequestIcon").class(p).openEnd().close("span");t.openStart("span").class("sapUiInteractionItemEntryTypeText").openEnd().text(o).close("span");if(this.getRequestSapStatistics(e,a)){t.openStart("div").class("sapUiInteractionRequestHeaderIcon").openEnd();t.voidStart("img").class("sapUiInteractionSvgImage").attr("src","HeaderIcon.svg").voidEnd();t.close("div")}t.close("div");t.openStart("div").class("sapUiInteractionTreeItemRight").openEnd();var l=this.getRequestRequestStart(a)+r;var c=this.getRequestResponseStart(a)+r;this.renderRequestPart(t,s,l,p+"70");this.renderRequestPart(t,l,c,p);this.renderRequestPart(t,c,i,p+"70");t.close("div");t.close("li")};v.prototype.getRequestSapStatistics=function(t,e){var a,n=t.sapStatistics;for(var r=0;r<n.length;r++){if(n[r].timing&&e.startTime===n[r].timing.startTime){a=n[r];return a}}return false};v.prototype.getRequestColorClass=function(t){var e;switch(t){case"xmlhttprequest":e="sapUiPurple";break;case"OData":e="sapUiRed";break;case"link":case"css":e="sapUiAccent1";break;default:e="sapUiAccent8";break}return e};v.prototype.attachRequestDetailsPopover=function(){var t,n,v,h,S,f,I,m,T,g,x,y,U,R,C,q,E;var w=this;var b=jQuery(".sapUiInteractionRequest.sapUiInteractionTreeItem .sapUiInteractionTreeItemRight");if(b.length){var L=A();for(var D=0;D<b.length;D++){b[D].addEventListener("click",function(t){M.call(this);P.call(this);var e=jQuery(this).children()[0];L.openBy(e);O.call(this)})}}function P(){var e=jQuery(this);var a=e.parents("li[data-request-index]");var n=e.parents("li[data-interaction-index]");var r=parseInt(n.attr("data-interaction-index"));var s=parseInt(a.attr("data-request-index"));var i=w.interactions[r];var o=i.requests[s];if(!i||!o){return}var p=w.getRequestSapStatistics(i,o);if(p){if(!x.getParent()){t.addContent(x);t.addContent(y);t.addContent(U);t.addContent(R);t.addContent(C);t.addContent(q);t.addContent(E)}var l=p.statistics;U.setText(w.formatDuration(parseFloat(l.substring(l.indexOf("total=")+"total=".length,l.indexOf(",")))));l=l.substring(l.indexOf(",")+1);C.setText(w.formatDuration(parseFloat(l.substring(l.indexOf("fw=")+"fw=".length,l.indexOf(",")))));l=l.substring(l.indexOf(",")+1);E.setText(w.formatDuration(parseFloat(l.substring(l.indexOf("app=")+"app=".length,l.indexOf(",")))))}else if(x.getParent()){t.removeContent(x);t.removeContent(y);t.removeContent(U);t.removeContent(R);t.removeContent(C);t.removeContent(q);t.removeContent(E)}}function M(){var t=w.getRequestFromElement(jQuery(this));S.setText(t.initiatorType||"");f.setText(t.entryType||"");I.setText(t.name);I.setHref(t.name);var e=w.getRequestDuration(t);var a=t.fetchStartOffset+t.startTime;var n=a+e;m.setText(w.formatTime(a));T.setText(w.formatTime(n));g.setText(w.formatDuration(e))}function O(){var t=a.createRenderManager();var e=w.getRequestFromElement(jQuery(this));var n=e.fetchStartOffset;var r=w.getRequestDuration(e);var s=n+e.startTime;var i=s+r;var o=w.getRequestRequestStart(e)+n;var p=w.getRequestResponseStart(e)+n;var l=o-s;var c=p-o;var d=i-p;var u=Math.floor(100*c/r);var v=Math.floor(100*d/r);var h=Math.floor(100*l/r);t.openStart("div").class("sapUiInteractionTitle").openEnd();[["PREPROCESSING",w.formatDuration(l)],["SERVER",w.formatDuration(c)],["CLIENT",w.formatDuration(d)]].forEach(function(e){t.openStart("span").class("sapUiInteractionTitleSection").openEnd();t.openStart("div").class("sapUiInteractionTitleText").openEnd().text(e[0]).close("div");t.openStart("div").class("sapUiInteractionTitleSubText").openEnd().text(e[1]).close("div");t.close("span")});t.close("div");t.flush(jQuery(".sapUiSupportPopoverTitle")[0],true);t.destroy();var S=e.initiatorType||e.entryType;var f=w.getRequestColorClass(S);var I=f+"70";t=a.createRenderManager();t.openStart("div").class("sapUiSupportIntProgressBarParent").openEnd();t.openStart("span").class("sapUiSupportIntProgressBar").class(I).style("width","calc("+h+"% - 1px)").openEnd().close("span");t.openStart("span").class("sapUiSupportIntProgressBarSeparator").openEnd().close("span");t.openStart("span").class("sapUiSupportIntProgressBar").class(f).style("width","calc("+u+"% - 1px)").openEnd().close("span");t.openStart("span").class("sapUiSupportIntProgressBarSeparator").openEnd().close("span");t.openStart("span").class("sapUiSupportIntProgressBar").class(I).style("width","calc("+v+"% - 1px)").openEnd().close("span");t.close("div");t.flush(jQuery(".sapUiSupportPopoverProgressBar")[0],true);t.destroy()}function A(){var t=new r({placement:u.Auto,contentWidth:"400px",showHeader:false,showArrow:true,verticalScrolling:true,horizontalScrolling:false,content:[k()]}).addStyleClass("sapUiSupportPopover");t.attachAfterOpen(function(t){t.getSource().$().trigger("focus")});return t}function k(){n=new c({content:'<div class="sapUiSupportPopoverTitle"></div>',preferDOM:false});v=new c({content:'<div class="sapUiSupportPopoverProgressBar"></div>',preferDOM:false});h=new o({icon:e.getIconURI("decline"),type:"Transparent",press:function(){L.close()}}).addStyleClass("sapUiSupportReqPopoverCloseButton");h.setTooltip("Close");S=(new s).addStyleClass("sapUiSupportIntRequestText");f=(new s).addStyleClass("sapUiSupportIntRequestText");I=new l({target:"_blank",wrapping:true}).addStyleClass("sapUiSupportIntRequestLink");m=(new s).addStyleClass("sapUiSupportIntRequestText");T=(new s).addStyleClass("sapUiSupportIntRequestText");g=(new s).addStyleClass("sapUiSupportIntRequestText");x=new d({text:"SAP STATISTICS FOR ODATA CALLS"});y=new p({text:"Gateway Total"}).addStyleClass("sapUiSupportIntRequestLabel");U=(new s).addStyleClass("sapUiSupportIntRequestText");R=new p({text:"Framework"}).addStyleClass("sapUiSupportIntRequestLabel");C=(new s).addStyleClass("sapUiSupportIntRequestText");q=new p({text:"Application"}).addStyleClass("sapUiSupportIntRequestLabel");E=(new s).addStyleClass("sapUiSupportIntRequestText");t=new i({maxContainerCols:2,minWidth:400,labelMinWidth:100,editable:false,layout:"ResponsiveGridLayout",labelSpanM:3,emptySpanM:0,columnsM:1,breakpointM:0,content:[new d({text:"REQUEST DATA"}),new p({text:"Initiator Type"}).addStyleClass("sapUiSupportIntRequestLabel"),S,new p({text:"Entry Type"}).addStyleClass("sapUiSupportIntRequestLabel"),f,new p({text:"Name"}).addStyleClass("sapUiSupportIntRequestLabel"),I,new p({text:"Start Time"}).addStyleClass("sapUiSupportIntRequestLabel"),m,new p({text:"End Time"}).addStyleClass("sapUiSupportIntRequestLabel"),T,new p({text:"Duration"}).addStyleClass("sapUiSupportIntRequestLabel"),g]});return[n,v,h,t]}};v.prototype.getRequestFromElement=function(t){var e=t.parents("li[data-request-index]");var a=t.parents("li[data-interaction-index]");var n=parseInt(a.attr("data-interaction-index"));var r=parseInt(e.attr("data-request-index"));var s=this.interactions[n].requests[r];return s};v.prototype.attachInteractionDetailsPopover=function(){var t,a,n,l,c,v,h,S,f;var I=this;var m=jQuery(".sapUiInteractionItemDiv.sapUiInteractionTreeItem .sapUiInteractionTreeItemRight");if(m.length){var T=y();for(var g=0;g<m.length;g++){m[g].addEventListener("click",function(t){x.call(this);var e=jQuery(this).children()[0];T.openBy(e)})}}function x(){var t=jQuery(this).parent().parent();var e=parseInt(t.attr("data-interaction-index"));var a=I.interactions[e];if(!a){return}n.setText(I.formatDuration(a.duration));l.setText(I.formatDuration(a.duration-a.roundtrip));c.setText(I.formatDuration(a.requestTime));v.setText(I.formatDuration(a.roundtrip));h.setText(a.bytesReceived);S.setText(a.requests.length);f.setText(I.formatTime(a.start))}function y(){var t=new r({placement:u.Auto,contentWidth:"350px",showHeader:false,showArrow:true,verticalScrolling:true,horizontalScrolling:false,content:[U()]}).addStyleClass("sapUiSupportPopover");t.attachAfterOpen(function(t){t.getSource().$().trigger("focus")});return t}function U(){a=new o({icon:e.getIconURI("decline"),type:"Transparent",press:function(){T.close()}}).addStyleClass("sapUiSupportIntPopoverCloseButton");a.setTooltip("Close");n=(new s).addStyleClass("sapUiSupportIntRequestText");l=(new s).addStyleClass("sapUiSupportIntRequestText");c=(new s).addStyleClass("sapUiSupportIntRequestText");v=(new s).addStyleClass("sapUiSupportIntRequestText");h=(new s).addStyleClass("sapUiSupportIntRequestText");S=(new s).addStyleClass("sapUiSupportIntRequestText");f=(new s).addStyleClass("sapUiSupportIntRequestText");t=new i({maxContainerCols:2,minWidth:400,labelMinWidth:100,editable:false,layout:"ResponsiveGridLayout",labelSpanM:7,emptySpanM:0,columnsM:1,breakpointM:0,content:[new d({text:"INTERACTION DATA"}),new p({text:"Duration"}).addStyleClass("sapUiSupportIntRequestLabel"),n,new p({text:"Client Processing Duration"}).addStyleClass("sapUiSupportIntRequestLabel"),l,new p({text:"Total Requests Duration"}).addStyleClass("sapUiSupportIntRequestLabel"),c,new p({text:"Roundtrip Duration"}).addStyleClass("sapUiSupportIntRequestLabel"),v,new p({text:"Bytes Received"}).addStyleClass("sapUiSupportIntRequestLabel"),h,new p({text:"Request Count"}).addStyleClass("sapUiSupportIntRequestLabel"),S,new p({text:"Start Time"}).addStyleClass("sapUiSupportIntRequestLabel"),f]}).addStyleClass("sapUiSupportIntPopoverForm");return[a,t]}};v.prototype.renderRequestPart=function(t,e,a,n){if(this.actualStartTime>a||this.actualEndTime<e){return}a=Math.min(a,this.actualEndTime);e=Math.max(e,this.actualStartTime);var r=100/this.timeRange*(e-this.actualStartTime);var s=100/this.timeRange*(a-this.actualStartTime);var i=s-r;t.openStart("span").style("margin-left",r+"%").style("width",i+"%").class("sapUiInteractionTimeframe").class("sapUiInteractionTimeRequestFrame").class(n).openEnd().close("span")};v.prototype.getRequestDuration=function(t){if(t.duration>0){return t.duration}var e=t.responseStart||t.requestStart||t.fetchStart;return e-t.startTime};v.prototype.getRequestRequestStart=function(t){if(t.requestStart>0){return t.requestStart}return t.fetchStart||t.startTime};v.prototype.getRequestResponseStart=function(t){if(t.responseStart>0){return t.responseStart}return t.requestStart||t.fetchStart||t.startTime};v.prototype.pad0=function(t,e){return("000"+String(t)).slice(-e)};v.prototype.formatGridLineDuration=function(t){var e=this.actualStartTime-this.startTime;t+=e;return t>100?(t/1e3).toFixed(2)+" s":t.toFixed(0)+" ms"};v.prototype.formatDuration=function(t){t=Math.max(t,0);if(t<3){return t.toFixed(2)+" ms"}return t>=1e3?(t/1e3).toFixed(3)+" s":t.toFixed(0)+" ms"};v.prototype.formatTime=function(t){var e=new Date(t);return this.pad0(e.getHours(),2)+":"+this.pad0(e.getMinutes(),2)+":"+this.pad0(e.getSeconds(),2)+"."+this.pad0(e.getMilliseconds(),3)};v.prototype.renderIcon=function(t,a){var n=a?v.collapseIcon:v.expandIcon;t.openStart("span").attr("aria-hidden","true").attr("expanded",a).class("sapUiIcon").class("sapUiInteractionTreeIcon");if(r&&!r.suppressMirroring){t.class("sapUiIconMirrorInRTL")}var r=e.getIconInfo(n);if(r){t.attr("data-sap-ui-icon-content",r.content);t.style("font-family","SAP-icons")}t.openEnd().close("span")};return v});
//# sourceMappingURL=InteractionTree.js.map