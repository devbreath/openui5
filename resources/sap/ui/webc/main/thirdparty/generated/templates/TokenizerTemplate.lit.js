sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e,i){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;const n=(e,n,s)=>(0,i.html)`<div class="${(0,i.classMap)(e.classes.wrapper)}"><span id="${(0,i.ifDefined)(e._id)}-hiddenText" class="ui5-hidden-text">${(0,i.ifDefined)(e.tokenizerLabel)}</span><div class="${(0,i.classMap)(e.classes.content)}" @ui5-delete="${(0,i.ifDefined)(e._delete)}" @click="${e._click}" @mousedown="${e._onmousedown}" @keydown="${e._onkeydown}" role="listbox" aria-labelledby="${(0,i.ifDefined)(e._id)}-hiddenText">${(0,i.repeat)(e.tokens,(e,i)=>e._id||i,(i,t)=>d(i,t,e,n,s))}</div>${e.showNMore?t(e,n,s):undefined}</div>`;const d=(e,n,d,t,s)=>(0,i.html)`<slot name="${(0,i.ifDefined)(e._individualSlot)}"></slot>`;const t=(e,n,d)=>(0,i.html)`<span @click="${e._openOverflowPopover}" class="ui5-tokenizer-more-text" part="n-more-text">${(0,i.ifDefined)(e._nMoreText)}</span>`;var s=n;e.default=s});
//# sourceMappingURL=TokenizerTemplate.lit.js.map