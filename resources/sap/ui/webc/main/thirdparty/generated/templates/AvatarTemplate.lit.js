sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e,i){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;const a=(e,a,o)=>(0,i.html)`<div class="ui5-avatar-root" tabindex="${(0,i.ifDefined)(e.tabindex)}" data-sap-focus-ref @keyup=${e._onkeyup} @keydown=${e._onkeydown} @focusout=${e._onfocusout} @focusin=${e._onfocusin} @click=${e._onclick} role="${(0,i.ifDefined)(e._role)}" aria-haspopup="${(0,i.ifDefined)(e._ariaHasPopup)}">${e.hasImage?n(e,a,o):s(e,a,o)}</div>`;const n=(e,a,n)=>(0,i.html)`<slot></slot>`;const s=(e,a,n)=>(0,i.html)`${e.icon?o(e,a,n):c(e,a,n)}`;const o=(e,a,n)=>n?(0,i.html)`<${(0,i.scopeTag)("ui5-icon",a,n)} class="ui5-avatar-icon" name="${(0,i.ifDefined)(e.icon)}" accessible-name="${(0,i.ifDefined)(e.accessibleNameText)}"></${(0,i.scopeTag)("ui5-icon",a,n)}>`:(0,i.html)`<ui5-icon class="ui5-avatar-icon" name="${(0,i.ifDefined)(e.icon)}" accessible-name="${(0,i.ifDefined)(e.accessibleNameText)}"></ui5-icon>`;const c=(e,a,n)=>(0,i.html)`${e.initials?t(e,a,n):undefined}`;const t=(e,a,n)=>(0,i.html)`<span class="ui5-avatar-initials">${(0,i.ifDefined)(e.validInitials)}</span>`;var l=a;e.default=l});
//# sourceMappingURL=AvatarTemplate.lit.js.map