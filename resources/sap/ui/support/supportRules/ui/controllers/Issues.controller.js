/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/supportRules/ui/controllers/BaseController","sap/ui/model/json/JSONModel","sap/ui/support/supportRules/CommunicationBus","sap/ui/support/supportRules/ui/models/SharedModel","sap/ui/support/supportRules/ui/external/ElementTree","sap/ui/support/supportRules/IssueManager","sap/ui/support/supportRules/WCBChannels","sap/ui/support/supportRules/ui/models/formatter","sap/ui/support/supportRules/Constants","sap/m/OverflowToolbarAssociativePopoverControls","sap/base/util/deepExtend"],function(e,t,s,i,o,r,l,n,u,a,d){"use strict";var p={severityIcons:{High:"sap-icon://message-error",Medium:"sap-icon://message-warning",Low:"sap-icon://message-information",All:"sap-icon://multiselect-all"}};return e.extend("sap.ui.support.supportRules.ui.controllers.Issues",{ISSUES_LIMIT:1e3,formatter:n,onInit:function(){this.model=i;this.setCommunicationSubscriptions();this.getView().setModel(this.model);this.clearFilters();this._initElementTree();this.treeTable=this.byId("issuesList");this.issueTable=this.byId("issueTable");this.toolHeader=this.byId("toolHeader");this.toolHeader.removeStyleClass("sapTntToolHeader sapContrast sapContrastPlus");this.model.setProperty("/bEnabledFilterButton",false);var e=this.toolHeader._getPopover();e.removeStyleClass("sapTntToolHeaderPopover sapContrast sapContrastPlus");a._mSupportedControls["sap.ui.layout.VerticalLayout"]={canOverflow:true,listenForEvents:[],noInvalidationProps:[]}},setCommunicationSubscriptions:function(){s.subscribe(l.ON_ANALYZE_FINISH,function(e){var t=this;var s={};t.data=e;e.issues.forEach(function(e){if(!e.context||!e.context.id){return}if(!s[e.context.id]){s[e.context.id]=[e.name]}else{s[e.context.id].push(e.name)}});this.model.setSizeLimit(this.ISSUES_LIMIT);this.model.setProperty("/issues",e.issues);this.model.setProperty("/analyzePressed",true);this.model.setProperty("/issuesCount",this.data.issues.length);this.model.setProperty("/selectedIssue",null);this.elementTree.setData({controls:e.elementTree,issuesIds:s});this.clearFilters()},this);s.subscribe(l.GET_ISSUES,function(e){this.structuredIssuesModel=e.groupedIssues;this.model.setProperty("/issues",e.issuesModel);if(e.issuesModel[0]){this._setSelectedRule(e.issuesModel[0][0]);this.treeTable.setSelectedIndex(1);this.issueTable.setSelectedIndex(0)}},this)},_initElementTree:function(){var e=this;this.elementTree=new o(null,{onIssueCountClicked:function(t){e.clearFilters();e.model.setProperty("/elementFilter",t);e.updateIssuesVisibility()},onHoverChanged:function(e){s.publish(l.TREE_ELEMENT_MOUSE_ENTER,e)},onMouseOut:function(){s.publish(l.TREE_ELEMENT_MOUSE_OUT)}})},onAfterRendering:function(){this.elementTree.setContainerId(this.byId("elementTreeContainer").getId())},clearFilters:function(){this.model.setProperty("/severityFilter",u.FILTER_VALUE_ALL);this.model.setProperty("/categoryFilter",u.FILTER_VALUE_ALL);this.model.setProperty("/elementFilter",u.FILTER_VALUE_ALL);this.model.setProperty("/audienceFilter",u.FILTER_VALUE_ALL);if(this.data){this.model.setProperty("/issues",this.data.issues);this.setToolbarHeight()}this.model.setProperty("/bEnabledFilterButton",false);this.updateIssuesVisibility()},clearFiltersAndElementSelection:function(){this.clearFilters();this.elementTree.clearSelection()},onIssuePressed:function(e){var t=this.model.getProperty("/selectedIssue");this.elementTree.setSelectedElement(t.context.id,false)},onRowSelectionChanged:function(e){if(e.getParameter("rowContext")){var t=e.getParameter("rowContext").getObject(),s=u.MAX_VISIBLE_ISSUES_FOR_RULE;if(t.type==="rule"){this._setSelectedRule(t)}else{this.model.setProperty("/selectedIssue",null)}if(t.issueCount<s){s=t.issueCount}this.model.setProperty("/visibleRowCount",s)}},openDocumentation:function(e){var t=sap.ui.getCore().byId(e.mParameters.id),i=t.getBindingContext().getProperty("href");s.publish(l.OPEN_URL,i)},updateIssuesVisibility:function(){if(this.data){var e=this.data.issues.filter(this.filterIssueListItems,this);s.publish(l.REQUEST_ISSUES,e);this.model.setProperty("/visibleIssuesCount",e.length)}this.setToolbarHeight()},filterIssueListItems:function(e){var t=this.model.getProperty("/severityFilter"),s=e.severity===t||t===u.FILTER_VALUE_ALL,i=this.model.getProperty("/categoryFilter"),o=e.categories&&e.categories.indexOf(i)>-1||i===u.FILTER_VALUE_ALL,r=this.model.getProperty("/elementFilter"),l=r===e.context.id||r===u.FILTER_VALUE_ALL,n=this.model.getProperty("/audienceFilter"),a=e.audiences&&e.audiences.indexOf(n)>-1||n===u.FILTER_VALUE_ALL,d=t===u.FILTER_VALUE_ALL&&i===u.FILTER_VALUE_ALL&&n===u.FILTER_VALUE_ALL&&r===u.FILTER_VALUE_ALL;this.model.setProperty("/bEnabledFilterButton",!d);return s&&o&&l&&a},setToolbarHeight:function(){this.model.setProperty("/filterBarHeight","4rem")},onReportPress:function(e){var t=e.getParameter("item"),i=t.getText(),o=this._getReportData();if(i==="View"){s.publish(l.ON_SHOW_REPORT_REQUEST,o)}else{s.publish(l.ON_DOWNLOAD_REPORT_REQUEST,o)}},_getReportData:function(){return{executionScopes:this.model.getProperty("/executionScopes"),executionScopeTitle:this.model.getProperty("/executionScopeTitle"),analysisDurationTitle:this.model.getProperty("/analysisDurationTitle")}},onRowSelection:function(e){if(e.getParameter("rowContext")){var t=e.getParameter("rowContext").getObject();this.elementTree.setSelectedElement(t.context.id,false);this.model.setProperty("/selectedIssue/details",t.details)}},_setSelectedRule:function(e){var t,s;if(this.model.getProperty("/visibleIssuesCount")>0){t=this.structuredIssuesModel[e.ruleLibName][e.ruleId];s=d({},e);s.issues=t;s.resolutionUrls=t[0].resolutionUrls;this.issueTable.setSelectedIndex(0);this.model.setProperty("/selectedIssue/details",s.details);this.model.setProperty("/selectedIssue",s);this._setIconAndColorToIssue(s.issues)}else{this.model.setProperty("/selectedIssue",null)}},_setIconAndColorToIssue:function(e){e.forEach(function(e){switch(e.severity){case u.SUPPORT_ASSISTANT_ISSUE_SEVERITY_LOW:e.severityIcon=p.severityIcons.Low;e.severityColor=u.SUPPORT_ASSISTANT_SEVERITY_LOW_COLOR;break;case u.SUPPORT_ASSISTANT_ISSUE_SEVERITY_MEDIUM:e.severityIcon=p.severityIcons.Medium;e.severityColor=u.SUPPORT_ASSISTANT_SEVERITY_MEDIUM_COLOR;break;case u.SUPPORT_ASSISTANT_ISSUE_SEVERITY_HIGH:e.severityIcon=p.severityIcons.High;e.severityColor=u.SUPPORT_ASSISTANT_SEVERITY_HIGH_COLOR;break}})}})});
//# sourceMappingURL=Issues.controller.js.map