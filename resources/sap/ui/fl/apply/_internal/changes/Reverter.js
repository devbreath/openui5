/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/base/Log","sap/ui/fl/apply/_internal/changes/FlexCustomData","sap/ui/fl/apply/_internal/changes/Utils","sap/ui/fl/Utils"],function(L,F,U,a){"use strict";var R={};function _(c){if(!c.isApplyProcessFinished()&&c.hasApplyProcessStarted()){return c.addPromiseForApplyProcessing().then(function(o){if(o&&o.error){c.markRevertFinished(o.error);throw Error(o.error);}});}return Promise.resolve();}function r(c,C,m,p){return R.revertChangeOnControl(c,C,m).then(function(v){return F.destroyAppliedCustomData(v||C,c,p.modifier).then(function(){return!!v;});}).then(function(s){if(s){p.flexController._oChangePersistence._deleteChangeInMap(c);}});}R.revertChangeOnControl=function(c,C,p){var m=U.getControlIfTemplateAffected(c,C,p);var o;return U.getChangeHandler(c,m,p).then(function(b){o=b;}).then(_.bind(null,c)).then(function(){if(c.isSuccessfullyApplied()){c.startReverting();return o.revertChange(c,m.control,p);}throw Error("Change was never applied");}).then(function(){m.control=p.modifier.bySelector(c.getSelector(),p.appComponent,p.view);if(m.bTemplateAffected){return p.modifier.updateAggregation(m.control,c.getContent().boundAggregation);}return undefined;}).then(function(){c.markRevertFinished();return m.control;}).catch(function(e){var E="Change could not be reverted: "+e.message;L.error(E);c.markRevertFinished(E);return false;});};R.revertMultipleChanges=function(c,p){var P=[];c.forEach(function(C){C.setQueuedForRevert();P.push(function(){var s=C.getSelector&&C.getSelector();var o=p.modifier.bySelector(s,p.appComponent);if(!o){L.warning("A flexibility change tries to revert changes on a nonexistent control with id "+s.id);return new a.FakePromise();}var m={modifier:p.modifier,appComponent:p.appComponent,view:a.getViewForControl(o)};return r(C,o,m,p);});});return a.execPromiseQueueSequentially(P);};return R;});
