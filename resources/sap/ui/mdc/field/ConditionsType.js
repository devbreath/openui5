/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/field/ConditionType","sap/ui/model/SimpleType","sap/ui/model/FormatException","sap/ui/model/ParseException","sap/ui/model/ValidateException","sap/base/util/merge","sap/ui/base/SyncPromise"],function(t,e,i,o,n,r,s){"use strict";var a=e.extend("sap.ui.mdc.field.ConditionsType",{constructor:function(i,o){e.apply(this,arguments);this.sName="Conditions";i=u(i);this._oConditionType=new t(i,this.oConstraints);this._oResourceBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.mdc")}});a.prototype.destroy=function(){e.prototype.destroy.apply(this,arguments);if(this._oConditionType){this._oConditionType.destroy();this._oConditionType=undefined}this._bDestroyed=true};a.prototype.setFormatOptions=function(t){e.prototype.setFormatOptions.apply(this,arguments);t=u(t);if(this._oConditionType){this._oConditionType.setFormatOptions(t)}};function u(t){t=r({},t);if(t.asyncParsing){delete t.asyncParsing}return t}a.prototype.setConstraints=function(t){e.prototype.setConstraints.apply(this,arguments);if(this._oConditionType){this._oConditionType.setConstraints(this.oConstraints)}};a.prototype.formatValue=function(t,e){if(t==undefined||t==null||this._bDestroyed){return null}if(!Array.isArray(t)){throw new i("No valid conditions provided")}var o;if(!e||e==="string"||e==="any"){o=""}else if(e==="float"||e==="int"){o=0}var n=h.call(this);var r=[];var a=function(t,e){return s.resolve().then(function(){return this._oConditionType.formatValue(t,e)}.bind(this))};for(var u=0;u<t.length;u++){r.push(a.call(this,t[u],e));if(n>0&&u>=n-1){break}}return s.all(r).then(function(t){return p.call(this,t,o)}.bind(this)).unwrap()};function p(t,e){for(var i=0;i<t.length;i++){if(e){e=e+this._oResourceBundle.getText("field.SEPARATOR")+t[i]}else{e=t[i]}}return e}a.prototype.parseValue=function(t,e){if(this._bDestroyed){return null}if(h.call(this)!==1){throw new o("Only one condition supported for parsing")}var i=s.resolve().then(function(){return this._oConditionType.parseValue(t,e)}.bind(this)).then(function(t){return l.call(this,t)}.bind(this)).unwrap();if(i instanceof Promise&&this.oFormatOptions.asyncParsing){this.oFormatOptions.asyncParsing(i)}return i};function l(t){var e=d(this.oFormatOptions.valueType);if(e&&this.oFormatOptions.getConditions){var i=t&&t.values[0][1];var o=t&&t.inParameters;var n=t&&t.outParameters;var r=this.oFormatOptions.getConditions();for(var s=0;s<r.length;s++){r[s].values[0][1]=i;if(i===undefined){r[s].values[0][0]=t.values[0][0]}r[s].values[0].splice(2);if(r[s].operator==="BT"){r[s].values[1][1]=i;if(i===undefined){r[s].values[1][0]=t.values[0][0]}r[s].values[1].splice(2)}if(o||r[s].inParameters){r[s].inParameters=o}if(n||r[s].outParameters){r[s].outParameters=n}}if(r.length===0){r.push(t)}return r}else if(t){return[t]}else{return[]}}a.prototype.validateValue=function(t){if(t===undefined||t===null||this._bDestroyed){return}if(!Array.isArray(t)){throw new n("No valid conditions provided")}for(var e=0;e<t.length;e++){var i=t[e];this._oConditionType.validateValue(i)}var o=h.call(this);if(t.length===0&&o===1){this._oConditionType.validateValue(null)}};function h(){var t=1;if(this.oFormatOptions.hasOwnProperty("maxConditions")){t=this.oFormatOptions.maxConditions}return t}function d(t){if(t&&t.isA("sap.ui.model.CompositeType")){var e=t.getFormatOptions();var i=!e||!e.hasOwnProperty("showMeasure")||e.showMeasure;var o=!e||!e.hasOwnProperty("showNumber")||e.showNumber;var n=!e||!e.hasOwnProperty("showTimezone")||e.showTimezone;var r=!e||!e.hasOwnProperty("showDate")||e.showDate;var s=!e||!e.hasOwnProperty("showTime")||e.showTime;if(i&&!o||n&&!r&&!s){return true}}return false}return a});
//# sourceMappingURL=ConditionsType.js.map