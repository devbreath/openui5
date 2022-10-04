sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"], function (_exports, _LitRenderer) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  _exports.default = void 0;

  /* eslint no-unused-vars: 0 */
  const block0 = (context, tags, suffix) => suffix ? (0, _LitRenderer.html)`<section dir="${(0, _LitRenderer.ifDefined)(context.effectiveDir)}" class="ui5-color-picker-root"><div class="ui5-color-picker-main-color" style="${(0, _LitRenderer.styleMap)(context.styles.mainColor)}" @mousedown="${context._handleMouseDown}" @mouseup="${context._handleMouseUp}" @mousemove="${context._handleMouseMove}" @mouseout="${context._handleMouseOut}"><div class="ui5-color-picker-circle" style="${(0, _LitRenderer.styleMap)(context.styles.circle)}"></div></div><div class="ui5-color-picker-sliders-wrapper"><${(0, _LitRenderer.scopeTag)("ui5-slider", tags, suffix)} disabled="${(0, _LitRenderer.ifDefined)(context.inputsDisabled)}" class="ui5-color-picker-hue-slider" min="0" max="1530" value="${(0, _LitRenderer.ifDefined)(context._hue)}" accessible-name="${(0, _LitRenderer.ifDefined)(context.hueSliderLabel)}" @ui5-input="${(0, _LitRenderer.ifDefined)(context._handleHueInput)}"></${(0, _LitRenderer.scopeTag)("ui5-slider", tags, suffix)}><${(0, _LitRenderer.scopeTag)("ui5-slider", tags, suffix)} disabled="${(0, _LitRenderer.ifDefined)(context.inputsDisabled)}" class="ui5-color-picker-alpha-slider" min="0" max="1" step="0.01" value="${(0, _LitRenderer.ifDefined)(context._alpha)}" accessible-name="${(0, _LitRenderer.ifDefined)(context.alphaSliderLabel)}" @ui5-input="${(0, _LitRenderer.ifDefined)(context._handleAlphaInput)}"></${(0, _LitRenderer.scopeTag)("ui5-slider", tags, suffix)}></div><div class="ui5-color-picker-current-color"><div class="ui5-color-picker-colors-wrapper"><span class="ui5-color-picker-white"></span><span class="ui5-color-picker-color"><div class="ui5-color-picker-color-inner" style="${(0, _LitRenderer.styleMap)(context.styles.colorSpan)}"></div></span></div><div class="ui5-color-picker-hex-input-wrapper"><${(0, _LitRenderer.scopeTag)("ui5-label", tags, suffix)}>Hex</${(0, _LitRenderer.scopeTag)("ui5-label", tags, suffix)}><${(0, _LitRenderer.scopeTag)("ui5-input", tags, suffix)} class="ui5-color-picker-hex-input" value="${(0, _LitRenderer.ifDefined)(context.hex)}" @keydown="${context._onkeydown}" accessible-name="${(0, _LitRenderer.ifDefined)(context.hexInputLabel)}" @ui5-change="${(0, _LitRenderer.ifDefined)(context._handleHEXChange)}" value-state="${(0, _LitRenderer.ifDefined)(context.hexInputErrorState)}"></${(0, _LitRenderer.scopeTag)("ui5-input", tags, suffix)}></div></div><div class="ui5-color-picker-rgb-wrapper" @ui5-change="${(0, _LitRenderer.ifDefined)(context._handleRGBInputsChange)}"><div class="ui5-color-picker-rgb"><${(0, _LitRenderer.scopeTag)("ui5-input", tags, suffix)} id="red" class="ui5-color-picker-rgb-input" disabled="${(0, _LitRenderer.ifDefined)(context.inputsDisabled)}" accessible-name="${(0, _LitRenderer.ifDefined)(context.redInputLabel)}" value="${(0, _LitRenderer.ifDefined)(context._color.r)}"></${(0, _LitRenderer.scopeTag)("ui5-input", tags, suffix)}><${(0, _LitRenderer.scopeTag)("ui5-label", tags, suffix)}>R</${(0, _LitRenderer.scopeTag)("ui5-label", tags, suffix)}></div><div class="ui5-color-picker-rgb"><${(0, _LitRenderer.scopeTag)("ui5-input", tags, suffix)} id="green" class="ui5-color-picker-rgb-input" disabled="${(0, _LitRenderer.ifDefined)(context.inputsDisabled)}" accessible-name="${(0, _LitRenderer.ifDefined)(context.greenInputLabel)}" value="${(0, _LitRenderer.ifDefined)(context._color.g)}"></${(0, _LitRenderer.scopeTag)("ui5-input", tags, suffix)}><${(0, _LitRenderer.scopeTag)("ui5-label", tags, suffix)}>G</${(0, _LitRenderer.scopeTag)("ui5-label", tags, suffix)}></div><div class="ui5-color-picker-rgb"><${(0, _LitRenderer.scopeTag)("ui5-input", tags, suffix)} id="blue" class="ui5-color-picker-rgb-input" disabled="${(0, _LitRenderer.ifDefined)(context.inputsDisabled)}" accessible-name="${(0, _LitRenderer.ifDefined)(context.blueInputLabel)}" value="${(0, _LitRenderer.ifDefined)(context._color.b)}"></${(0, _LitRenderer.scopeTag)("ui5-input", tags, suffix)}><${(0, _LitRenderer.scopeTag)("ui5-label", tags, suffix)}>B</${(0, _LitRenderer.scopeTag)("ui5-label", tags, suffix)}></div><div class="ui5-color-picker-rgb"><${(0, _LitRenderer.scopeTag)("ui5-input", tags, suffix)} id="alpha" disabled="${(0, _LitRenderer.ifDefined)(context.inputsDisabled)}" class="ui5-color-picker-rgb-input" value="${(0, _LitRenderer.ifDefined)(context._alpha)}" accessible-name="${(0, _LitRenderer.ifDefined)(context.alphaInputLabel)}" @ui5-input="${(0, _LitRenderer.ifDefined)(context._handleAlphaInput)}" @ui5-change="${(0, _LitRenderer.ifDefined)(context._handleAlphaChange)}"></${(0, _LitRenderer.scopeTag)("ui5-input", tags, suffix)}><${(0, _LitRenderer.scopeTag)("ui5-label", tags, suffix)}>A</${(0, _LitRenderer.scopeTag)("ui5-label", tags, suffix)}></div></div></section>` : (0, _LitRenderer.html)`<section dir="${(0, _LitRenderer.ifDefined)(context.effectiveDir)}" class="ui5-color-picker-root"><div class="ui5-color-picker-main-color" style="${(0, _LitRenderer.styleMap)(context.styles.mainColor)}" @mousedown="${context._handleMouseDown}" @mouseup="${context._handleMouseUp}" @mousemove="${context._handleMouseMove}" @mouseout="${context._handleMouseOut}"><div class="ui5-color-picker-circle" style="${(0, _LitRenderer.styleMap)(context.styles.circle)}"></div></div><div class="ui5-color-picker-sliders-wrapper"><ui5-slider disabled="${(0, _LitRenderer.ifDefined)(context.inputsDisabled)}" class="ui5-color-picker-hue-slider" min="0" max="1530" value="${(0, _LitRenderer.ifDefined)(context._hue)}" accessible-name="${(0, _LitRenderer.ifDefined)(context.hueSliderLabel)}" @ui5-input="${(0, _LitRenderer.ifDefined)(context._handleHueInput)}"></ui5-slider><ui5-slider disabled="${(0, _LitRenderer.ifDefined)(context.inputsDisabled)}" class="ui5-color-picker-alpha-slider" min="0" max="1" step="0.01" value="${(0, _LitRenderer.ifDefined)(context._alpha)}" accessible-name="${(0, _LitRenderer.ifDefined)(context.alphaSliderLabel)}" @ui5-input="${(0, _LitRenderer.ifDefined)(context._handleAlphaInput)}"></ui5-slider></div><div class="ui5-color-picker-current-color"><div class="ui5-color-picker-colors-wrapper"><span class="ui5-color-picker-white"></span><span class="ui5-color-picker-color"><div class="ui5-color-picker-color-inner" style="${(0, _LitRenderer.styleMap)(context.styles.colorSpan)}"></div></span></div><div class="ui5-color-picker-hex-input-wrapper"><ui5-label>Hex</ui5-label><ui5-input class="ui5-color-picker-hex-input" value="${(0, _LitRenderer.ifDefined)(context.hex)}" @keydown="${context._onkeydown}" accessible-name="${(0, _LitRenderer.ifDefined)(context.hexInputLabel)}" @ui5-change="${(0, _LitRenderer.ifDefined)(context._handleHEXChange)}" value-state="${(0, _LitRenderer.ifDefined)(context.hexInputErrorState)}"></ui5-input></div></div><div class="ui5-color-picker-rgb-wrapper" @ui5-change="${(0, _LitRenderer.ifDefined)(context._handleRGBInputsChange)}"><div class="ui5-color-picker-rgb"><ui5-input id="red" class="ui5-color-picker-rgb-input" disabled="${(0, _LitRenderer.ifDefined)(context.inputsDisabled)}" accessible-name="${(0, _LitRenderer.ifDefined)(context.redInputLabel)}" value="${(0, _LitRenderer.ifDefined)(context._color.r)}"></ui5-input><ui5-label>R</ui5-label></div><div class="ui5-color-picker-rgb"><ui5-input id="green" class="ui5-color-picker-rgb-input" disabled="${(0, _LitRenderer.ifDefined)(context.inputsDisabled)}" accessible-name="${(0, _LitRenderer.ifDefined)(context.greenInputLabel)}" value="${(0, _LitRenderer.ifDefined)(context._color.g)}"></ui5-input><ui5-label>G</ui5-label></div><div class="ui5-color-picker-rgb"><ui5-input id="blue" class="ui5-color-picker-rgb-input" disabled="${(0, _LitRenderer.ifDefined)(context.inputsDisabled)}" accessible-name="${(0, _LitRenderer.ifDefined)(context.blueInputLabel)}" value="${(0, _LitRenderer.ifDefined)(context._color.b)}"></ui5-input><ui5-label>B</ui5-label></div><div class="ui5-color-picker-rgb"><ui5-input id="alpha" disabled="${(0, _LitRenderer.ifDefined)(context.inputsDisabled)}" class="ui5-color-picker-rgb-input" value="${(0, _LitRenderer.ifDefined)(context._alpha)}" accessible-name="${(0, _LitRenderer.ifDefined)(context.alphaInputLabel)}" @ui5-input="${(0, _LitRenderer.ifDefined)(context._handleAlphaInput)}" @ui5-change="${(0, _LitRenderer.ifDefined)(context._handleAlphaChange)}"></ui5-input><ui5-label>A</ui5-label></div></div></section>`;

  var _default = block0;
  _exports.default = _default;
});