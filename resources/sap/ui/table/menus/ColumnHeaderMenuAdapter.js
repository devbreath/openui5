/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["../utils/TableUtils","sap/ui/base/Object","sap/ui/base/EventProvider","sap/ui/base/ManagedObjectObserver"],function(e,n,t,r){"use strict";var i=new window.Map;var o={"sap.m.table.columnmenu.Menu":"MobileColumnHeaderMenuAdapter"};var u=n.extend("sap.ui.table.menus.ColumnHeaderMenuAdapter",{constructor:function(){n.apply(this,arguments);this._mInjectionTarget=null;this._oColumnHeaderMenuObserver=new r(function(e){this.onAfterMenuDestroyed(e.object)}.bind(this))}});u.activateFor=function(e){var n=e.getHeaderMenuInstance();var t=a(n);var r;if(!t||!e._getTable()){return Promise.resolve()}i.forEach(function(n,r){if(r!==t){c(e,r)}});if(!i.has(t)){r={adapter:s(t).then(function(e){r=i.get(t);r.adapter=new e;r.adapter._injectMenuItems(r.activeFor.getHeaderMenuInstance(),r.activeFor)}),columns:[e],activeFor:e};i.set(t,r)}else{r=i.get(t);r.activeFor=e;if(!r.columns.includes(e)){r.columns.push(e)}}if(r.adapter instanceof Promise){return r.adapter}r.adapter._injectMenuItems(n,e);return Promise.resolve()};u.unlink=function(e){c(e)};u.prototype._injectMenuItems=function(e,n){this._removeMenuItems();this._oColumnHeaderMenuObserver.observe(e,{destroy:true});this.injectMenuItems(e,n);this._mInjectionTarget={column:n,menu:e}};u.prototype._removeMenuItems=function(){if(!this._mInjectionTarget){return}this.removeMenuItems(this._mInjectionTarget.menu);this._mInjectionTarget=null};u.prototype.injectMenuItems=function(e,n){};u.prototype.removeMenuItems=function(e){};u.prototype.onAfterMenuDestroyed=function(e){};u.prototype.destroy=function(){n.prototype.destroy.apply(this,arguments);this._removeMenuItems();this._oColumnHeaderMenuObserver.disconnect();delete this._oColumnHeaderMenuObserver};function s(e){return new Promise(function(n,t){sap.ui.require(["sap/ui/table/menus/"+e],function(e){n(e)},function(e){t(e)})})}function a(n){for(var t in o){if(e.isA(n,t)){return o[t]}}return""}function c(e,n){var t;if(n){t=i.get(n)}else{i.forEach(function(r,i){if(r.columns.includes(e)){t=r;n=i}})}if(!t){return}if(t.adapter instanceof Promise){t.adapter.then(function(){c(e,n)})}else{if(t.columns.includes(e)){t.columns.splice(t.columns.indexOf(e),1)}if(t.columns.length===0){t.adapter.destroy();i.delete(n)}}}return u});
//# sourceMappingURL=ColumnHeaderMenuAdapter.js.map