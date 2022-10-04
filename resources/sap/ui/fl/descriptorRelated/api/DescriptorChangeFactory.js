/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexObjects/FlexObjectFactory","sap/ui/fl/ChangePersistenceFactory","sap/base/util/merge"],function(e,t,n){"use strict";var r=function(e,t){this._mChangeFile=e;this._mChangeFile.packageName="";this._oInlineChange=t};r.prototype.submit=function(){this.store();var e=this._getChangePersistence(this._mChangeFile.reference);return e.saveDirtyChanges()};r.prototype.store=function(){var e=this._mChangeFile.reference;var t=this._getChangePersistence(e);var n=this._getChangeToSubmit();t.addChange(n);return n};r.prototype._getChangePersistence=function(e){return t.getChangePersistenceForComponent(e)};r.prototype._getChangeToSubmit=function(){return e.createAppDescriptorChange(this._getMap())};r.prototype._getMap=function(){var e=this._oInlineChange.getMap();this._mChangeFile.content=e.content;this._mChangeFile.texts=e.texts;return this._mChangeFile};r.prototype.getJson=function(){return n({},this._getMap())};var i=function(){};i.prototype.createNew=function(e,t,n,i,a){if(t["setHostingIdForTextKey"]){t.setHostingIdForTextKey(e)}var o={};o.changeType=t._getChangeType();o.componentName=e;o.reference=e;o.generator=a;o.support=t.getMap().support;o.layer=n||"CUSTOMER";return Promise.resolve(new r(o,t))};return i});
//# sourceMappingURL=DescriptorChangeFactory.js.map