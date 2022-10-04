/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/field/ConditionType","sap/ui/model/SimpleType","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/ValidateException","sap/base/util/merge","sap/ui/base/SyncPromise"],function(t,i,e,o,n,r,s){"use strict";var a=i.extend("sap.ui.mdc.field.ConditionsType",{constructor:function(e,o){i.apply(this,arguments);this.sName="Conditions";e=u(e);this._oConditionType=new t(e,this.oConstraints);this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc")}});a.prototype.destroy=function(){i.prototype.destroy.apply(this,arguments);if(this._oConditionType){this._oConditionType.destroy();this._oConditionType=undefined}this._bDestroyed=true};a.prototype.setFormatOptions=function(t){i.prototype.setFormatOptions.apply(this,arguments);t=u(t);if(this._oConditionType){this._oConditionType.setFormatOptions(t)}};function u(t){t=r({},t);if(t.asyncParsing){delete t.asyncParsing}return t}a.prototype.setConstraints=function(t){i.prototype.setConstraints.apply(this,arguments);if(this._oConditionType){this._oConditionType.setConstraints(this.oConstraints)}};a.prototype.formatValue=function(t,i){if(t==undefined||t==null||this._bDestroyed){return null}if(!Array.isArray(t)){throw new e("No valid conditions provided")}var o;if(!i||i==="string"||i==="any"){o=""}else if(i==="float"||i==="int"){o=0}var n=d.call(this);var r=[];var a=function(t,i){return s.resolve().then(function(){return this._oConditionType.formatValue(t,i)}.bind(this))};for(var u=0;u<t.length;u++){r.push(a.call(this,t[u],i));if(n>0&&u>=n-1){break}}return s.all(r).then(function(t){return p.call(this,t,o)}.bind(this)).unwrap()};function p(t,i){for(var e=0;e<t.length;e++){if(i){i=i+this._oResourceBundle.getText("field.SEPARATOR")+t[e]}else{i=t[e]}}return i}a.prototype.parseValue=function(t,i){if(this._bDestroyed){return null}if(d.call(this)!==1){throw new o("Only one condition supported for parsing")}var e=s.resolve().then(function(){return this._oConditionType.parseValue(t,i)}.bind(this)).then(function(t){return l.call(this,t)}.bind(this)).unwrap();if(e instanceof Promise&&this.oFormatOptions.asyncParsing){this.oFormatOptions.asyncParsing(e)}return e};function l(t){var i=h(this.oFormatOptions.valueType);var e=i&&this.oFormatOptions.getConditions&&this.oFormatOptions.getConditions();if(i&&this.oFormatOptions.getConditions&&e.length>1){var o=t&&t.values[0][1];var n=t&&t.inParameters;var r=t&&t.outParameters;var s=t&&t.payload;for(var a=0;a<e.length;a++){e[a].values[0][1]=o;if(o===undefined){e[a].values[0][0]=t.values[0][0]}e[a].values[0].splice(2);if(e[a].operator==="BT"){e[a].values[1][1]=o;if(o===undefined){e[a].values[1][0]=t.values[0][0]}e[a].values[1].splice(2)}if(n||e[a].inParameters){e[a].inParameters=n}if(r||e[a].outParameters){e[a].outParameters=r}if(s||e[a].payload){e[a].payload=s}}if(e.length===0){e.push(t)}return e}else if(t){return[t]}else{return[]}}a.prototype.validateValue=function(t){if(t===undefined||t===null||this._bDestroyed){return}if(!Array.isArray(t)){throw new n("No valid conditions provided")}for(var i=0;i<t.length;i++){var e=t[i];this._oConditionType.validateValue(e)}var o=d.call(this);if(t.length===0&&o===1){this._oConditionType.validateValue(null)}};function d(){var t=1;if(this.oFormatOptions.hasOwnProperty("maxConditions")){t=this.oFormatOptions.maxConditions}return t}function h(t){if(t&&t.isA("sap.ui.model.CompositeType")){var i=t.getFormatOptions();var e=!i||!i.hasOwnProperty("showMeasure")||i.showMeasure;var o=!i||!i.hasOwnProperty("showNumber")||i.showNumber;var n=!i||!i.hasOwnProperty("showTimezone")||i.showTimezone;var r=!i||!i.hasOwnProperty("showDate")||i.showDate;var s=!i||!i.hasOwnProperty("showTime")||i.showTime;if(e&&!o||n&&!r&&!s){return true}}return false}return a});
//# sourceMappingURL=ConditionsType.js.map