sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e,i){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;const t=(e,t,a)=>(0,i.html)`<li part="native-li" tabindex="${(0,i.ifDefined)(e._tabIndex)}" class="ui5-ghli-root ${(0,i.classMap)(e.classes.main)}" @focusin="${e._onfocusin}" @focusout="${e._onfocusout}" @keydown="${e._onkeydown}" aria-label="${(0,i.ifDefined)(e.ariaLabelText)}" aria-roledescription="${(0,i.ifDefined)(e.groupHeaderText)}" role="group"><div id="${(0,i.ifDefined)(e._id)}-content" class="ui5-li-content"><span class="ui5-ghli-title"><slot></slot></span></div></li>`;var a=t;e.default=a});
//# sourceMappingURL=GroupHeaderListItemTemplate.lit.js.map