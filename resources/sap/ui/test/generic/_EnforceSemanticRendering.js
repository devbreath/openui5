/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";var _={run:function(l){var L=l.library;var E=l.excludes||[];return new Promise(function(r,a){sap.ui.getCore().loadLibrary(L,{async:true}).then(function(b){var c=(b&&b.controls)||[];var p=[];c.forEach(function(C){p.push(new Promise(function(r,a){var i={control:C};var s=C.replace(/\./g,"/");sap.ui.require([s],function(d){try{var R=d.getMetadata().getRenderer();if(R){i.version=Object.prototype.hasOwnProperty.call(R,"apiVersion")?R.apiVersion:1;if(E.includes(C)){if(i.version==2){i.wrongExclude=true;i.description="defined in the excludes";}else{i.skip=true;}}}else{i.description="No Renderer Class available";i.skip=true;}}catch(e){i.description="No Renderer Class available";i.skip=true;}r(i);},function(){i.description="Control Class could not be loaded";if(E.includes(C)){i.skip=true;}r(i);});}));});r(p);});}).then(function(p){return new Promise(function(r,a){Promise.all(p).then(function(i){QUnit.module("EnforceSemanticRendering Tests: "+l.library);QUnit.test("library controls loaded",function(b){b.ok(i,i.length+" controls loaded");});i.forEach(function(I){QUnit[I.skip?"skip":"test"](I.control+" "+(I.description||""),function(b){if(I.wrongExclude){b.ok(false,"The control '"+I.control+"' is maintained in the exclude configuration, but its renderer is configured with apiVersion 2.");}else{b.equal(I.version,2,"Semantic Rendering enabled.");}});});r();});});});}};return _;});
