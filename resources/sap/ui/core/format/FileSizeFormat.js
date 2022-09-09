/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/base/Object","sap/ui/core/Locale","sap/ui/core/LocaleData","sap/ui/core/format/NumberFormat"],function(t,e,a,i){"use strict";var r=[{binaryFactor:1,decimalFactor:1,decimalUnit:"Byte",binaryUnit:"Byte"},{binaryFactor:1,decimalFactor:1,decimalUnit:"Bytes",binaryUnit:"Bytes"},{binaryFactor:Math.pow(2,10),decimalFactor:1e3,decimalUnit:"Kilobyte",binaryUnit:"Kibibyte"},{binaryFactor:Math.pow(2,20),decimalFactor:1e6,decimalUnit:"Megabyte",binaryUnit:"Mebibyte"},{binaryFactor:Math.pow(2,30),decimalFactor:1e9,decimalUnit:"Gigabyte",binaryUnit:"Gibibyte"},{binaryFactor:Math.pow(2,40),decimalFactor:1e12,decimalUnit:"Terabyte",binaryUnit:"Tebibyte"},{binaryFactor:Math.pow(2,50),decimalFactor:1e15,decimalUnit:"Petabyte",binaryUnit:"Pebibyte"},{binaryFactor:Math.pow(2,60),decimalFactor:1e18,decimalUnit:"Exabyte",binaryUnit:"Exbibyte"},{binaryFactor:Math.pow(2,70),decimalFactor:1e21,decimalUnit:"Zettabyte",binaryUnit:"Zebibyte"},{binaryFactor:Math.pow(2,80),decimalFactor:1e24,decimalUnit:"Yottabyte",binaryUnit:"Yobibyte"}];var n=t.extend("sap.ui.core.format.FileSizeFormat",{constructor:function(t){throw new Error}});n.getInstance=function(t,e){return this.createInstance(t,e)};n.createInstance=function(t,r){var n=Object.create(this.prototype);if(t instanceof e){r=t;t=undefined}if(!r){r=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()}n.oLocale=r;n.oLocaleData=a.getInstance(r);n.oNumberFormat=i.getFloatInstance(t,r);n.oBundle=sap.ui.getCore().getLibraryResourceBundle("sap.ui.core",r.toString());n.bBinary=t?!!t.binaryFilesize:false;return n};n.prototype.format=function(t){var e=null,a;if(typeof t=="string"){try{if(/^\s*[\+-]?0[xX]/.test(t)){e=parseInt(t,16)}else{e=parseFloat(t,10)}}catch(t){}}else if(typeof t=="number"){e=t}if(e===null){return"NaN"}a=e;var i=o(e,this.bBinary),r=this.oNumberFormat.format(e/i.factor);if(!i.noSecondRounding){e=this.oNumberFormat.parse(r);if(this.bBinary&&Math.abs(e)>=1024||!this.bBinary&&Math.abs(e)>=1e3){i=o(e*i.factor,this.bBinary);r=this.oNumberFormat.format(a/i.factor)}}return this.oBundle.getText("FileSize."+i.unit,r)};n.prototype.parse=function(t){var e,a,i,n;if(!t){return NaN}for(var o=0;o<r.length;o++){e=r[o];a=s(this.oBundle,e.decimalUnit,t);if(a){n=false;break}else{a=s(this.oBundle,e.binaryUnit,t);if(a){n=true;break}}}if(!a){a=t;n=false;e=r[0]}i=this.oNumberFormat.parse(a);return i*(n?e.binaryFactor:e.decimalFactor)};function o(t,e){var a=Math.abs(t),i,n;for(var o=r.length-1;o>=2;o--){i=r[o];n=e?i.binaryFactor:i.decimalFactor;if(a>=n){return{factor:n,unit:e?i.binaryUnit:i.decimalUnit,noSecondRounding:o==r.length-1}}}return{factor:1,unit:r[a>=2?1:0].decimalUnit}}function s(t,e,a){var i=t.getText("FileSize."+e),r;if(i.startsWith("{0}")){r=i.substr(3,i.length);if(typeof r=="string"&&r!=""?a.toLowerCase().endsWith(r.toLowerCase()):false){return a.substr(0,a.length-r.length)}}else if(i.endsWith("{0}")){r=i.substr(0,i.length-3);if(typeof r=="string"&&r!=""?a.toLowerCase().startsWith(r.toLowerCase()):false){return a.substr(r.length,a.length)}}else{r=i.split("{0}");if(r.length==2&&(typeof r[0]=="string"&&r[0]!=""?a.toLowerCase().startsWith(r[0].toLowerCase()):false)&&(typeof r[1]=="string"&&r[1]!=""?a.toLowerCase().endsWith(r[1].toLowerCase()):false)){return a.substr(r[0].length,a.length-r[1].length)}}return null}return n});
//# sourceMappingURL=FileSizeFormat.js.map