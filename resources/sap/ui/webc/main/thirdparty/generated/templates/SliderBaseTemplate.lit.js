sap.ui.define(["sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e){"use strict";const s=(s,l,t)=>e.html`<div class="ui5-slider-root ${e.classMap(s.classes.root)}" @mousedown="${s._onmousedown}" @touchstart="${s._ontouchstart}" @mouseover="${s._onmouseover}" @mouseout="${s._onmouseout}" @keydown="${s._onkeydown}" @keyup="${s._onkeyup}" part="root-container"><div class="ui5-slider-inner">${s.step?i(s):undefined}</div><span id="${e.ifDefined(s._id)}-accName" class="ui5-hidden-text">${e.ifDefined(s.accessibleName)}</span><span id="${e.ifDefined(s._id)}-sliderDesc" class="ui5-hidden-text">${e.ifDefined(s._ariaLabelledByText)}</span></div> `;const i=(s,i,t)=>e.html`${s.showTickmarks?l(s):undefined}`;const l=(s,i,l)=>e.html`<ul class="ui5-slider-tickmarks">${e.repeat(s.tickmarksObject,(e,s)=>e._id||s,(e,s)=>t(e))}</ul>${s.labelInterval?o(s):undefined}`;const t=(s,i,l,t,o)=>e.html`${s?a():n()}`;const a=(s,i,l,t,a)=>e.html`<li class="ui5-slider-tickmark ui5-slider-tickmark-in-range"></li>`;const n=(s,i,l,t,a)=>e.html`<li class="ui5-slider-tickmark"></li>`;const o=(s,i,l)=>e.html`<ul class="ui5-slider-labels ${e.classMap(s.classes.labelContainer)}" style="${e.styleMap(s.styles.labelContainer)}">${e.repeat(s._labels,(e,s)=>e._id||s,(e,i)=>d(e,i,s))}</ul>`;const d=(s,i,l,t,a)=>e.html`<li style="${e.styleMap(l.styles.label)}">${e.ifDefined(s)}</li>`;return s});