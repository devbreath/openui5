/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/thirdparty/jquery"],function(jQuery){"use strict";return{set:function(e,t,i,r){t=t==="/"?"":t;var n=t.split("/"),s=n.length,o;if(s>0){for(o=0;e&&o<s-1;o++){if(!e[n[o]]){e[n[o]]={}}if(e[n[o]]){e=e[n[o]]}}if(typeof e[n[s-1]]!=="undefined"||n[s-1]===""||r){if(typeof e[n[s-1]]!=="object"){e[n[s-1]]=i}else{e[n[s-1]][""]=i}}}},get:function(e,t){t=t==="/"?"":t;var i=t.split("/"),r=i.length,n;if(r>0){for(n=0;e&&n<r-1;n++){if(!e[i[n]]){return false}e=e[i[n]]}return e[i[r-1]]}},modulesToHierarchy:function(e,t){var i=e.modules,r=window["sap-ui-debug"];jQuery.each(i,function(e){this.set(t,e,false,true)}.bind(this));if(r===true||r==="x"||r==="X"){this.set(t,"/",true)}else if(r&&typeof r==="string"){r.split(/,/).forEach(function(e){if(/\*/.test(e)){var r=new RegExp("^(?:"+this.makeRegExp(e)+")");var n={};Object.keys(i).forEach(function(e){var t=e.split("/").slice(0,-1).join("/")+"/";n[t]=""});for(var s in i){n[s]=i[s]}jQuery.each(n,function(e){if(r.test(e)){this.set(t,e,true)}}.bind(this))}else{this.set(t,e,true)}}.bind(this))}},toTreeModel:function(e){var t={},i={text:"All"},r;this.modulesToHierarchy(e,t);r=this.setTreeNode(t,i,0,window["sap-ui-debug"]===true);if(!r){r=0}return{tree:i,depth:r}},setTreeNode:function(e,t,i,r){var n,s;r=e===true||e[""]||r;t.nodes=[];t.selected=r;if(r){n=i}for(var o in e){if(o===""){continue}var f={text:o};s=this.setTreeNode(e[o],f,i+1,r);if(s>n||!n){n=s}t.nodes.push(f)}return n},toHierarchy:function(e){var t={};e.selected=this.isNodeSelected(e);this.setHierarchyNode(t,e);return t},isNodeSelected:function(e){var t=0,i;for(var r=0;r<e.nodes.length;r++){i=e.nodes[r];if(i.nodes.length){i.selected=this.isNodeSelected(i)}if(i.selected){t++}}return t===e.nodes.length},setHierarchyNode:function(e,t){if(t.selected){e[""]=true}for(var i=0;i<t.nodes.length;i++){e[t.nodes[i].text]={};if(t.nodes[i].nodes.length){this.setHierarchyNode(e[t.nodes[i].text],t.nodes[i])}else{e[t.nodes[i].text]=t.nodes[i].selected}}},toDebugInfo:function(e,t){var i=this.toHierarchy(e),r=[];function n(e,t){var i,s;if(typeof t==="object"){if(t[""]){r.push(e+"/");return}i=Object.keys(t);s=i.length}if(s){i.forEach(function(i){if(i===""){return}if(t[i]===true){r.push((e?e+"/":"")+i)}else if(typeof t[i]==="object"){n((e?e+"/":"")+i,t[i])}})}}if(this.get(i,"/")){return true}n("",i);return r.length>0?r.join(t||","):false},makeRegExp:function(e){if(!/\/\*\*\/$/.test(e)){e=e.replace(/\/$/,"/**/")}return e.replace(/\*\*\/|\*|[[\]{}()+?.\\^$|]/g,function(e){switch(e){case"**/":return"(?:[^/]+/)*";case"*":return"[^/]*";default:return"\\"+e}})},getSelectionCount:function(e){var t=this.toDebugInfo(e);if(t===true){return 1}else if(t){return t.split(",").length}return 0},recursiveSelect:function(e,t){e.selected=t;for(var i=0;i<e.nodes.length;i++){this.recursiveSelect(e.nodes[i],t)}}}});
//# sourceMappingURL=moduleTreeHelper.js.map