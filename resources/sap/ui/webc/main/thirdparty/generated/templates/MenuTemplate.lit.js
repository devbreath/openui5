sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const i=(i,t,a)=>a?e.html`<${e.scopeTag("ui5-responsive-popover",t,a)} id="${e.ifDefined(i._id)}-menu-rp" class="ui5-menu-rp" horizontal-align="Left" placement-type=${e.ifDefined(i.placementType)} vertical-align=${e.ifDefined(i.verticalAlign)} hide-arrow allow-target-overlap ?sub-menu=${i._isSubMenu} @before-close=${i._beforePopoverClose}>${i.isPhone?n(i,t,a):undefined}<div id="${e.ifDefined(i._id)}-menu-main">${i._currentItems.length?s(i,t,a):undefined}</div></${e.scopeTag("ui5-responsive-popover",t,a)}><div class="ui5-menu-submenus"></div>`:e.html`<ui5-responsive-popover id="${e.ifDefined(i._id)}-menu-rp" class="ui5-menu-rp" horizontal-align="Left" placement-type=${e.ifDefined(i.placementType)} vertical-align=${e.ifDefined(i.verticalAlign)} hide-arrow allow-target-overlap ?sub-menu=${i._isSubMenu} @before-close=${i._beforePopoverClose}>${i.isPhone?n(i,t,a):undefined}<div id="${e.ifDefined(i._id)}-menu-main">${i._currentItems.length?s(i,t,a):undefined}</div></ui5-responsive-popover><div class="ui5-menu-submenus"></div>`;const n=(i,n,s)=>s?e.html`<div slot="header" class="ui5-menu-dialog-header">${i.isSubMenuOpened?t(i,n,s):undefined}<div class="ui5-menu-dialog-title"><div>${e.ifDefined(i.menuHeaderTextPhone)}</div></div><${e.scopeTag("ui5-button",n,s)} icon="decline" design="Transparent" aria-label="${e.ifDefined(i.labelClose)}" @click=${i.close}></${e.scopeTag("ui5-button",n,s)}></div>`:e.html`<div slot="header" class="ui5-menu-dialog-header">${i.isSubMenuOpened?t(i,n,s):undefined}<div class="ui5-menu-dialog-title"><div>${e.ifDefined(i.menuHeaderTextPhone)}</div></div><ui5-button icon="decline" design="Transparent" aria-label="${e.ifDefined(i.labelClose)}" @click=${i.close}></ui5-button></div>`;const t=(i,n,t)=>t?e.html`<${e.scopeTag("ui5-button",n,t)} icon="nav-back" class="ui5-menu-back-button" design="Transparent" aria-label="${e.ifDefined(i.labelBack)}" @click=${i._navigateBack}></${e.scopeTag("ui5-button",n,t)}>`:e.html`<ui5-button icon="nav-back" class="ui5-menu-back-button" design="Transparent" aria-label="${e.ifDefined(i.labelBack)}" @click=${i._navigateBack}></ui5-button>`;const s=(i,n,t)=>t?e.html`<${e.scopeTag("ui5-list",n,t)} id="${e.ifDefined(i._id)}-menu-list" mode="None" separators="None" accessible-role="menu" @ui5-item-click=${e.ifDefined(i._itemClick)}>${e.repeat(i._currentItems,(e,i)=>e._id||i,(e,s)=>a(e,s,i,n,t))}</${e.scopeTag("ui5-list",n,t)}>`:e.html`<ui5-list id="${e.ifDefined(i._id)}-menu-list" mode="None" separators="None" accessible-role="menu" @ui5-item-click=${e.ifDefined(i._itemClick)}>${e.repeat(i._currentItems,(e,i)=>e._id||i,(e,s)=>a(e,s,i,n,t))}</ui5-list>`;const a=(i,n,t,s,a)=>a?e.html`<${e.scopeTag("ui5-li",s,a)} .associatedItem="${e.ifDefined(i.item)}" class="ui5-menu-item" id="${e.ifDefined(t._id)}-menu-item-${n}" icon="${e.ifDefined(i.item.icon)}" accessible-role="menuitem" ._ariaHasPopup=${e.ifDefined(i.ariaHasPopup)} ?disabled=${i.item.disabled} ?starts-section=${i.item.startsSection} ?selected=${i.item.subMenuOpened} ?is-phone=${t.isPhone} @mouseover=${t._itemMouseOver} @mouseout=${t._itemMouseOut} @keydown=${t._itemKeyDown}>${i.item.hasDummyIcon?o():undefined}${e.ifDefined(i.item.text)}${i.item.hasChildren?u(i,n,t,s,a):d(i)}</${e.scopeTag("ui5-li",s,a)}>`:e.html`<ui5-li .associatedItem="${e.ifDefined(i.item)}" class="ui5-menu-item" id="${e.ifDefined(t._id)}-menu-item-${n}" icon="${e.ifDefined(i.item.icon)}" accessible-role="menuitem" ._ariaHasPopup=${e.ifDefined(i.ariaHasPopup)} ?disabled=${i.item.disabled} ?starts-section=${i.item.startsSection} ?selected=${i.item.subMenuOpened} ?is-phone=${t.isPhone} @mouseover=${t._itemMouseOver} @mouseout=${t._itemMouseOut} @keydown=${t._itemKeyDown}>${i.item.hasDummyIcon?o():undefined}${e.ifDefined(i.item.text)}${i.item.hasChildren?u(i,n,t,s,a):d(i)}</ui5-li>`;const o=(i,n,t,s,a)=>e.html`<div class="ui5-menu-item-dummy-icon"></div>`;const u=(i,n,t,s,a)=>a?e.html`<${e.scopeTag("ui5-icon",s,a)} part="icon" name="slim-arrow-right" class="ui5-menu-item-icon-end"></${e.scopeTag("ui5-icon",s,a)}>`:e.html`<ui5-icon part="icon" name="slim-arrow-right" class="ui5-menu-item-icon-end"></ui5-icon>`;const d=(i,n,t,s,a)=>e.html`${i.item._siblingsWithChildren?l():undefined}`;const l=(i,n,t,s,a)=>e.html`<div class="ui5-menu-item-no-icon-end"></div>`;return i});