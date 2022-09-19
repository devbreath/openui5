/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/m/library','sap/ui/core/Item'],function(l,I){"use strict";var V=I.extend("sap.m.VariantItem",{metadata:{library:"sap.m",properties:{sharing:{type:"string",group:"Misc",defaultValue:"private"},remove:{type:"boolean",group:"Misc",defaultValue:false},favorite:{type:"boolean",group:"Misc",defaultValue:true},originalFavorite:{type:"boolean",group:"Misc",defaultValue:true},executeOnSelect:{type:"boolean",group:"Misc",defaultValue:false},originalExecuteOnSelect:{type:"boolean",group:"Misc",defaultValue:false},rename:{type:"boolean",group:"Misc",defaultValue:true},title:{type:"string",group:"Misc",defaultValue:null},originalTitle:{type:"string",group:"Misc",defaultValue:null},visible:{type:"boolean",group:"Misc",defaultValue:true},changeable:{type:"boolean",group:"Misc",defaultValue:false},author:{type:"string",group:"Misc",defaultValue:null},contexts:{type:"object",group:"Misc",defaultValue:{}},originalContexts:{type:"object",group:"Misc",defaultValue:{}}}}});return V;});
