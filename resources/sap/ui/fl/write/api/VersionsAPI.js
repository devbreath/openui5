/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/apply/_internal/flexState/FlexState","sap/ui/fl/write/_internal/Versions","sap/ui/fl/Utils","sap/ui/fl/write/api/Version","sap/ui/fl/apply/_internal/flexState/ManifestUtils"],function(e,r,o,n,t){"use strict";function i(e){var r=t.getFlexReferenceForControl(e);if(!r){throw Error("The application ID could not be determined")}return r}function a(e){if(!e.control){throw Error("No control was provided")}if(!e.layer){throw Error("No layer was provided")}var n=i(e.control);return r.getVersionsModel({nonNormalizedReference:n,reference:o.normalizeReference(n),layer:e.layer})}var l={};l.initialize=function(e){if(!e.control){return Promise.reject("No control was provided")}if(!e.layer){return Promise.reject("No layer was provided")}var n=o.getAppComponentForControl(e.control);return r.initialize({reference:o.normalizeReference(i(n)),layer:e.layer})};l.isDraftAvailable=function(e){var r=a(e);var o=r.getProperty("/versions");var t=o.find(function(e){return e.version===n.Number.Draft});return!!t};l.isOldVersionDisplayed=function(e){var r=a(e);var o=r.getProperty("/displayedVersion");var t=r.getProperty("/activeVersion");return o!==n.Number.Draft&&o!==t};l.loadDraftForApplication=function(e){e.version=n.Number.Draft;return l.loadVersionForApplication(e)};l.loadVersionForApplication=function(r){if(!r.control){return Promise.reject("No control was provided")}if(!r.layer){return Promise.reject("No layer was provided")}if(r.version===undefined){var n=a(r);if(n){r.version=n.getProperty("/activeVersion")}}var t=o.getAppComponentForControl(r.control);var l=i(t);return e.clearAndInitialize({componentId:t.getId(),reference:l,version:r.version,allContexts:r.allContexts})};l.activate=function(e){if(!e.control){return Promise.reject("No control was provided")}if(!e.layer){return Promise.reject("No layer was provided")}if(!e.title){return Promise.reject("No version title was provided")}var n=i(e.control);return r.activate({nonNormalizedReference:n,reference:o.normalizeReference(n),layer:e.layer,title:e.title,appComponent:o.getAppComponentForControl(e.control),displayedVersion:e.displayedVersion})};l.discardDraft=function(n){if(!n.control){return Promise.reject("No control was provided")}if(!n.layer){return Promise.reject("No layer was provided")}var t=o.getAppComponentForControl(n.control);var a=i(t);return r.discardDraft({nonNormalizedReference:a,reference:o.normalizeReference(a),layer:n.layer}).then(function(r){if(r.backendChangesDiscarded){return e.clearAndInitialize({componentId:t.getId(),reference:a}).then(function(){return r})}return r})};l.publish=function(e){if(!e.selector){return Promise.reject("No selector was provided")}if(!e.layer){return Promise.reject("No layer was provided")}if(!e.version){return Promise.reject("No version was provided")}e.styleClass=e.styleClass||"";e.reference=i(e.selector);return r.publish(e)};return l});
//# sourceMappingURL=VersionsAPI.js.map