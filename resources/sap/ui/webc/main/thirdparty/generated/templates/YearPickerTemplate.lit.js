sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e,i){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;const a=(e,a,d)=>(0,i.html)`<div class="ui5-yp-root" role="grid" aria-readonly="false" aria-multiselectable="false" @keydown=${e._onkeydown} @keyup=${e._onkeyup} @click=${e._selectYear} @focusin=${e._onfocusin}>${(0,i.repeat)(e._years,(e,i)=>e._id||i,(i,s)=>t(i,s,e,a,d))}</div>`;const t=(e,a,t,s,r)=>(0,i.html)`<div class="ui5-yp-interval-container">${(0,i.repeat)(e,(e,i)=>e._id||i,(e,i)=>d(e,i,t,s,r))}</div>`;const d=(e,a,t,d,s)=>(0,i.html)`<div data-sap-timestamp="${(0,i.ifDefined)(e.timestamp)}" tabindex="${(0,i.ifDefined)(e._tabIndex)}" ?data-sap-focus-ref="${e.focusRef}" class="${(0,i.ifDefined)(e.classes)}" role="gridcell" aria-selected="${(0,i.ifDefined)(e.ariaSelected)}">${(0,i.ifDefined)(e.year)}</div>`;var s=a;e.default=s});
//# sourceMappingURL=YearPickerTemplate.lit.js.map