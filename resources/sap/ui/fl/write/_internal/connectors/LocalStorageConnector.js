/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/util/merge","sap/ui/fl/write/api/connectors/ObjectStorageConnector"],function(m,O){"use strict";var L=m({},O,{storage:window.localStorage});L.loadFeatures=function(){return O.loadFeatures.apply(this,arguments).then(function(f){return m({isPublicLayerAvailable:true,isPublicFlVariantEnabled:true,isVariantAdaptationEnabled:true,isCondensingEnabled:false},f);});};return L;});
