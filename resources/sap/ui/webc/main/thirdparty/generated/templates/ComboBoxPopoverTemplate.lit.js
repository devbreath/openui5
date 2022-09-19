sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const s=(s,t,a)=>a?e.html`<${e.scopeTag("ui5-responsive-popover",t,a)} class="${e.classMap(s.classes.popover)}" hide-arrow content-only-on-desktop _disable-initial-focus placement-type="Bottom" horizontal-align="Left" style="${e.styleMap(s.styles.suggestionsPopover)}" @ui5-after-open=${e.ifDefined(s._afterOpenPopover)} @ui5-after-close=${e.ifDefined(s._afterClosePopover)}><${e.scopeTag("ui5-busy-indicator",t,a)} ?active=${s.loading} size="Medium" class="ui5-combobox-busy"></${e.scopeTag("ui5-busy-indicator",t,a)}><div slot="header" class="ui5-responsive-popover-header"><div class="row"><span>${e.ifDefined(s._headerTitleText)}</span><${e.scopeTag("ui5-button",t,a)} class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${s._closeRespPopover}"></${e.scopeTag("ui5-button",t,a)}></div><div class="row"><div class="input-root-phone" value-state="${e.ifDefined(s.valueState)}"><input class="ui5-input-inner-phone" .value="${e.ifDefined(s.value)}" inner-input placeholder="${e.ifDefined(s.placeholder)}" value-state="${e.ifDefined(s.valueState)}" @input="${s._input}" @change="${s._inputChange}" @keydown="${s._keydown}" aria-autocomplete="both" /></div></div>${s.hasValueStateText?i(s,t,a):undefined}</div>${!s._isPhone?n(s,t,a):undefined}<${e.scopeTag("ui5-list",t,a)} separators="None" @ui5-item-click=${e.ifDefined(s._selectItem)} @ui5-item-focused=${e.ifDefined(s._onItemFocus)} @mousedown=${s._itemMousedown} mode="SingleSelect">${e.repeat(s._filteredItems,(e,s)=>e._id||s,(e,i)=>c(e,i,s,t,a))}</${e.scopeTag("ui5-list",t,a)}><div slot="footer" class="ui5-responsive-popover-footer"><${e.scopeTag("ui5-button",t,a)} design="Transparent" @click="${s._closeRespPopover}">OK</${e.scopeTag("ui5-button",t,a)}></div></${e.scopeTag("ui5-responsive-popover",t,a)}>${s.shouldOpenValueStateMessagePopover?v(s,t,a):undefined}`:e.html`<ui5-responsive-popover class="${e.classMap(s.classes.popover)}" hide-arrow content-only-on-desktop _disable-initial-focus placement-type="Bottom" horizontal-align="Left" style="${e.styleMap(s.styles.suggestionsPopover)}" @ui5-after-open=${e.ifDefined(s._afterOpenPopover)} @ui5-after-close=${e.ifDefined(s._afterClosePopover)}><ui5-busy-indicator ?active=${s.loading} size="Medium" class="ui5-combobox-busy"></ui5-busy-indicator><div slot="header" class="ui5-responsive-popover-header"><div class="row"><span>${e.ifDefined(s._headerTitleText)}</span><ui5-button class="ui5-responsive-popover-close-btn" icon="decline" design="Transparent" @click="${s._closeRespPopover}"></ui5-button></div><div class="row"><div class="input-root-phone" value-state="${e.ifDefined(s.valueState)}"><input class="ui5-input-inner-phone" .value="${e.ifDefined(s.value)}" inner-input placeholder="${e.ifDefined(s.placeholder)}" value-state="${e.ifDefined(s.valueState)}" @input="${s._input}" @change="${s._inputChange}" @keydown="${s._keydown}" aria-autocomplete="both" /></div></div>${s.hasValueStateText?i(s,t,a):undefined}</div>${!s._isPhone?n(s,t,a):undefined}<ui5-list separators="None" @ui5-item-click=${e.ifDefined(s._selectItem)} @ui5-item-focused=${e.ifDefined(s._onItemFocus)} @mousedown=${s._itemMousedown} mode="SingleSelect">${e.repeat(s._filteredItems,(e,s)=>e._id||s,(e,i)=>c(e,i,s,t,a))}</ui5-list><div slot="footer" class="ui5-responsive-popover-footer"><ui5-button design="Transparent" @click="${s._closeRespPopover}">OK</ui5-button></div></ui5-responsive-popover>${s.shouldOpenValueStateMessagePopover?v(s,t,a):undefined}`;const i=(s,i,o)=>o?e.html`<div class="${e.classMap(s.classes.popoverValueState)}" style="${e.styleMap(s.styles.popoverValueStateMessage)}"><${e.scopeTag("ui5-icon",i,o)} class="ui5-input-value-state-message-icon" name="${e.ifDefined(s._valueStateMessageIcon)}"></${e.scopeTag("ui5-icon",i,o)}>${s.shouldDisplayDefaultValueStateMessage?t(s):a(s)}</div>`:e.html`<div class="${e.classMap(s.classes.popoverValueState)}" style="${e.styleMap(s.styles.popoverValueStateMessage)}"><ui5-icon class="ui5-input-value-state-message-icon" name="${e.ifDefined(s._valueStateMessageIcon)}"></ui5-icon>${s.shouldDisplayDefaultValueStateMessage?t(s):a(s)}</div>`;const t=(s,i,t)=>e.html`${e.ifDefined(s.valueStateText)}`;const a=(s,i,t)=>e.html`${e.repeat(s.valueStateMessageText,(e,s)=>e._id||s,(e,s)=>o(e))}`;const o=(s,i,t,a,o)=>e.html`${e.ifDefined(s)}`;const n=(s,i,t)=>e.html`${s.hasValueStateText?l(s,i,t):undefined}`;const l=(s,i,t)=>t?e.html`<div class="ui5-responsive-popover-header ${e.classMap(s.classes.popoverValueState)}" ?focused=${s._isValueStateFocused} tabindex="0" style="${e.styleMap(s.styles.suggestionPopoverHeader)}"><${e.scopeTag("ui5-icon",i,t)} class="ui5-input-value-state-message-icon" name="${e.ifDefined(s._valueStateMessageIcon)}"></${e.scopeTag("ui5-icon",i,t)}>${s.shouldDisplayDefaultValueStateMessage?u(s):p(s)}</div>`:e.html`<div class="ui5-responsive-popover-header ${e.classMap(s.classes.popoverValueState)}" ?focused=${s._isValueStateFocused} tabindex="0" style="${e.styleMap(s.styles.suggestionPopoverHeader)}"><ui5-icon class="ui5-input-value-state-message-icon" name="${e.ifDefined(s._valueStateMessageIcon)}"></ui5-icon>${s.shouldDisplayDefaultValueStateMessage?u(s):p(s)}</div>`;const u=(s,i,t)=>e.html`${e.ifDefined(s.valueStateText)}`;const p=(s,i,t)=>e.html`${e.repeat(s.valueStateMessageText,(e,s)=>e._id||s,(e,s)=>d(e))}`;const d=(s,i,t,a,o)=>e.html`${e.ifDefined(s)}`;const c=(s,i,t,a,o)=>e.html`${s.isGroupItem?r(s,i,t,a,o):f(s,i,t,a,o)}`;const r=(s,i,t,a,o)=>o?e.html`<${e.scopeTag("ui5-li-groupheader",a,o)} ?focused=${s.focused}>${e.ifDefined(s.text)}</${e.scopeTag("ui5-li-groupheader",a,o)}>`:e.html`<ui5-li-groupheader ?focused=${s.focused}>${e.ifDefined(s.text)}</ui5-li-groupheader>`;const f=(s,i,t,a,o)=>o?e.html`<${e.scopeTag("ui5-li",a,o)} type="Active" additional-text=${e.ifDefined(s.additionalText)} group-name=${e.ifDefined(s.groupName)} ._tabIndex=${e.ifDefined(s.itemTabIndex)} .mappedItem=${e.ifDefined(s)} ?selected=${s.selected} ?focused=${s.focused}>${e.ifDefined(s.text)}</${e.scopeTag("ui5-li",a,o)}>`:e.html`<ui5-li type="Active" additional-text=${e.ifDefined(s.additionalText)} group-name=${e.ifDefined(s.groupName)} ._tabIndex=${e.ifDefined(s.itemTabIndex)} .mappedItem=${e.ifDefined(s)} ?selected=${s.selected} ?focused=${s.focused}>${e.ifDefined(s.text)}</ui5-li>`;const v=(s,i,t)=>t?e.html`<${e.scopeTag("ui5-popover",i,t)} skip-registry-update _disable-initial-focus prevent-focus-restore hide-arrow class="ui5-valuestatemessage-popover" horizontal-align="${e.ifDefined(s._valueStatePopoverHorizontalAlign)}" placement-type="Bottom"><div slot="header" class="${e.classMap(s.classes.popoverValueState)}" style="${e.styleMap(s.styles.popoverHeader)}"><${e.scopeTag("ui5-icon",i,t)} class="ui5-input-value-state-message-icon" name="${e.ifDefined(s._valueStateMessageIcon)}"></${e.scopeTag("ui5-icon",i,t)}>${s.shouldDisplayDefaultValueStateMessage?$(s):g(s)}</div></${e.scopeTag("ui5-popover",i,t)}>`:e.html`<ui5-popover skip-registry-update _disable-initial-focus prevent-focus-restore hide-arrow class="ui5-valuestatemessage-popover" horizontal-align="${e.ifDefined(s._valueStatePopoverHorizontalAlign)}" placement-type="Bottom"><div slot="header" class="${e.classMap(s.classes.popoverValueState)}" style="${e.styleMap(s.styles.popoverHeader)}"><ui5-icon class="ui5-input-value-state-message-icon" name="${e.ifDefined(s._valueStateMessageIcon)}"></ui5-icon>${s.shouldDisplayDefaultValueStateMessage?$(s):g(s)}</div></ui5-popover>`;const $=(s,i,t)=>e.html`${e.ifDefined(s.valueStateText)}`;const g=(s,i,t)=>e.html`${e.repeat(s.valueStateMessageText,(e,s)=>e._id||s,(e,s)=>m(e))}`;const m=(s,i,t,a,o)=>e.html`${e.ifDefined(s)}`;return s});