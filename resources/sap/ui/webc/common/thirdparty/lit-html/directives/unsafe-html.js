sap.ui.define(["exports","../lit-html","../directive"],function(t,e,i){"use strict";
/**
	 * @license
	 * Copyright 2017 Google LLC
	 * SPDX-License-Identifier: BSD-3-Clause
	 */class r extends i.Directive{constructor(t){if(super(t),this.it=e.nothing,t.type!==i.PartType.CHILD)throw Error(this.constructor.directiveName+"() can only be used in child bindings")}render(t){if(t===e.nothing||null==t)return this.ft=void 0,this.it=t;if(t===e.noChange)return t;if("string"!=typeof t)throw Error(this.constructor.directiveName+"() called with a non-string value");if(t===this.it)return this.ft;this.it=t;const i=[t];return i.raw=i,this.ft={_$litType$:this.constructor.resultType,strings:i,values:[]}}}r.directiveName="unsafeHTML",r.resultType=1;const s=i.directive(r);t.UnsafeHTMLDirective=r;t.unsafeHTML=s;Object.defineProperty(t,"__esModule",{value:true})});