/**
* OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["sap/ui/support/library","sap/ui/support/supportRules/IssueManager","sap/ui/support/supportRules/RuleSetLoader","sap/ui/support/supportRules/report/StringHistoryFormatter","sap/ui/support/supportRules/report/AbapHistoryFormatter"],function(e,t,s,r,o){"use strict";var a=[];var i=function(e,t){var s=null;if(e.rulePreset){s={id:e.rulePreset.id,title:e.rulePreset.title,description:e.rulePreset.description,dateExported:e.rulePreset.dateExported}}return{loadedLibraries:{},analysisInfo:{duration:e.analysisDuration,date:e.date,executionScope:e.scope.executionScope,rulePreset:s},analysisMetadata:e.analysisMetadata,applicationInfo:e.application,technicalInfo:e.technical,totalIssuesCount:0,issues:e.onlyIssues}};var u=function(e,t,s){e.loadedLibraries[t]={};var r=e.loadedLibraries[t];r["rules"]={};r["issueCount"]=s.rules[t].issueCount;r["allRulesSelected"]=true;e.totalIssuesCount+=s.rules[t].issueCount};var n=function(e,t,s,r){var o=r.rules[t][s];e.loadedLibraries[t]["rules"][s]={id:s,library:t,name:o.title,selected:o.selected,issuesCount:o.issueCount,issues:l(r,t,s),resolution:o.resolution,minVersion:o.minversion,categories:o.categories,audiences:o.audiences,description:o.description};if(o.selected===false){e.loadedLibraries[t]["allRulesSelected"]=false}};var l=function(e,t,s){var r=[];if(e.issues[t]&&e.issues[t][s]){e.issues[t][s].forEach(function(e){var t={context:e.context,details:e.details,name:e.name,severity:e.severity};r.push(t)})}return r};var c={getRuns:function(){return a.slice()},saveAnalysis:function(e){var r=t.groupIssues(t.getIssuesModel()),o=t.getIssues(),i=s.getRuleSets(),u=e._oSelectedRulesIds,n=e._oSelectedRulePreset;a.push({date:(new Date).toUTCString(),issues:r,onlyIssues:o,application:e._oDataCollector.getAppInfo(),technical:e._oDataCollector.getTechInfoJSON(),rules:t.getRulesViewModel(i,u,r),rulePreset:n,scope:{executionScope:{type:e._oExecutionScope.getType(),selectors:e._oExecutionScope._getContext().parentId||e._oExecutionScope._getContext().components}},analysisDuration:e._oAnalyzer.getElapsedTimeString(),analysisMetadata:e._oAnalysisMetadata||null})},clearHistory:function(){a=[]},getHistory:function(){var e=[];a.forEach(function(t){var s=i(t);for(var r in t.rules){u(s,r,t);for(var o in t.rules[r]){n(s,r,o,t)}}e.push(s)});return e},getFormattedHistory:function(t){var s,a=this.getHistory();switch(t){case e.HistoryFormats.Abap:s=o.format(a);break;default:s=r.format(a)}return s}};return c},true);
//# sourceMappingURL=History.js.map