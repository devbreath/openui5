/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexObjects/FlexObjectFactory","sap/ui/fl/apply/_internal/flexObjects/States","sap/ui/fl/apply/_internal/flexObjects/UpdatableChange","sap/ui/fl/apply/_internal/flexState/compVariants/CompVariantMerger"],function(F,S,U,C){"use strict";function g(m,p){m[p]=m[p]||{byId:{},variants:[],nonPersistedVariants:[],changes:[],defaultVariants:[],standardVariantChange:undefined,standardVariant:undefined};return m[p];}function i(m,p,v){v=v||[];var M=g(m,p);M.nonPersistedVariants.forEach(function(V){delete M.byId[V.getId()];});M.nonPersistedVariants=v.map(function(V){var o=Object.assign({id:V.id,persisted:false},V);o=C.createVariant(p,o);M.byId[V.id]=o;return o;});return M;}function b(c,s,m){var f=c[s].map(function(o){var a;if(s==="variants"){a=F.createCompVariant(o);}else{a=new U(o);}a.setState(S.PERSISTED);return a;});f.forEach(function(o){var p=o.getPersistencyKey?o.getPersistencyKey():o.getSelector().persistencyKey;g(m,p).byId[o.getId()]=o;switch(s){case"standardVariants":g(m,p).standardVariantChange=o;break;default:g(m,p)[s].push(o);}});}return function(p){var c={};c._getOrCreate=g.bind(undefined,c);c._initialize=i.bind(undefined,c);if(p.storageResponse.changes.comp){["variants","changes","defaultVariants","standardVariants"].forEach(function(s){b(p.storageResponse.changes.comp,s,c);});}return c;};});
