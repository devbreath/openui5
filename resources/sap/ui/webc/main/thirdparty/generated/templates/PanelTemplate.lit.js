sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const i=(i,n,t)=>e.html`<div class="ui5-panel-root" role="${e.ifDefined(i.accRole)}" aria-label="${e.ifDefined(i.effectiveAccessibleName)}"><div @click="${i._headerClick}" @keydown="${i._headerKeyDown}" @keyup="${i._headerKeyUp}" class="ui5-panel-header" tabindex="${e.ifDefined(i.headerTabIndex)}" role="${e.ifDefined(i.accInfo.role)}" aria-expanded="${e.ifDefined(i.accInfo.ariaExpanded)}" aria-controls="${e.ifDefined(i.accInfo.ariaControls)}" aria-labelledby="${e.ifDefined(i.accInfo.ariaLabelledby)}" part="header">${!i.fixed?a(i,n,t):undefined}${i._hasHeader?c():s(i)}</div><div class="ui5-panel-content" id="${e.ifDefined(i._id)}-content" tabindex="-1" style="${e.styleMap(i.styles.content)}" part="content"><slot></slot></div></div>`;const a=(i,a,c)=>e.html`<div class="ui5-panel-header-button-root">${i._hasHeader?n(i,a,c):t(i,a,c)}</div>`;const n=(i,a,n)=>n?e.html`<${e.scopeTag("ui5-button",a,n)} design="Transparent" class="ui5-panel-header-button ui5-panel-header-button-with-icon" @click="${i._toggleButtonClick}" .accessibilityAttributes=${e.ifDefined(i.accInfo.button.accessibilityAttributes)} tooltip="${e.ifDefined(i.accInfo.button.title)}" accessible-name="${e.ifDefined(i.accInfo.button.ariaLabelButton)}"><div class="ui5-panel-header-icon-wrapper"><${e.scopeTag("ui5-icon",a,n)} class="ui5-panel-header-icon ${e.classMap(i.classes.headerBtn)}" name="slim-arrow-right"></${e.scopeTag("ui5-icon",a,n)}></div></${e.scopeTag("ui5-button",a,n)}>`:e.html`<ui5-button design="Transparent" class="ui5-panel-header-button ui5-panel-header-button-with-icon" @click="${i._toggleButtonClick}" .accessibilityAttributes=${e.ifDefined(i.accInfo.button.accessibilityAttributes)} tooltip="${e.ifDefined(i.accInfo.button.title)}" accessible-name="${e.ifDefined(i.accInfo.button.ariaLabelButton)}"><div class="ui5-panel-header-icon-wrapper"><ui5-icon class="ui5-panel-header-icon ${e.classMap(i.classes.headerBtn)}" name="slim-arrow-right"></ui5-icon></div></ui5-button>`;const t=(i,a,n)=>n?e.html`<${e.scopeTag("ui5-icon",a,n)} class="ui5-panel-header-button ui5-panel-header-icon ${e.classMap(i.classes.headerBtn)}" name="slim-arrow-right"></${e.scopeTag("ui5-icon",a,n)}>`:e.html`<ui5-icon class="ui5-panel-header-button ui5-panel-header-icon ${e.classMap(i.classes.headerBtn)}" name="slim-arrow-right"></ui5-icon>`;const c=(i,a,n)=>e.html`<slot name="header"></slot>`;const s=(i,a,n)=>e.html`<div id="${e.ifDefined(i._id)}-header-title" role="heading" aria-level="${e.ifDefined(i.headerAriaLevel)}" class="ui5-panel-header-title">${e.ifDefined(i.headerText)}</div>`;return i});