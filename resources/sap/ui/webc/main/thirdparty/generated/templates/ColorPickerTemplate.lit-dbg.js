sap.ui.define(['sap/ui/webc/common/thirdparty/base/renderer/LitRenderer'], function (litRender) { 'use strict';

	const block0 = (context, tags, suffix) => suffix ? litRender.html`<section dir="${litRender.ifDefined(context.effectiveDir)}" class="ui5-color-picker-root"><div class="ui5-color-picker-main-color" style="${litRender.styleMap(context.styles.mainColor)}" @mousedown="${context._handleMouseDown}" @mouseup="${context._handleMouseUp}" @mousemove="${context._handleMouseMove}" @mouseout="${context._handleMouseOut}"><div class="ui5-color-picker-circle" style="${litRender.styleMap(context.styles.circle)}"></div></div><div class="ui5-color-picker-sliders-wrapper"><${litRender.scopeTag("ui5-slider", tags, suffix)} disabled="${litRender.ifDefined(context.inputsDisabled)}" class="ui5-color-picker-hue-slider" min="0" max="1530" value="${litRender.ifDefined(context._hue)}" accessible-name="${litRender.ifDefined(context.hueSliderLabel)}" @ui5-input="${litRender.ifDefined(context._handleHueInput)}"></${litRender.scopeTag("ui5-slider", tags, suffix)}><${litRender.scopeTag("ui5-slider", tags, suffix)} disabled="${litRender.ifDefined(context.inputsDisabled)}" class="ui5-color-picker-alpha-slider" min="0" max="1" step="0.01" value="${litRender.ifDefined(context._alpha)}" accessible-name="${litRender.ifDefined(context.alphaSliderLabel)}" @ui5-input="${litRender.ifDefined(context._handleAlphaInput)}"></${litRender.scopeTag("ui5-slider", tags, suffix)}></div><div class="ui5-color-picker-current-color"><div class="ui5-color-picker-colors-wrapper"><span class="ui5-color-picker-white"></span><span class="ui5-color-picker-color"><div class="ui5-color-picker-color-inner" style="${litRender.styleMap(context.styles.colorSpan)}"></div></span></div><div class="ui5-color-picker-hex-input-wrapper"><${litRender.scopeTag("ui5-label", tags, suffix)}>Hex</${litRender.scopeTag("ui5-label", tags, suffix)}><${litRender.scopeTag("ui5-input", tags, suffix)} class="ui5-color-picker-hex-input" value="${litRender.ifDefined(context.hex)}" @keydown="${context._onkeydown}" accessible-name="${litRender.ifDefined(context.hexInputLabel)}" @ui5-change="${litRender.ifDefined(context._handleHEXChange)}" value-state="${litRender.ifDefined(context.hexInputErrorState)}"></${litRender.scopeTag("ui5-input", tags, suffix)}></div></div><div class="ui5-color-picker-rgb-wrapper" @ui5-change="${litRender.ifDefined(context._handleRGBInputsChange)}"><div class="ui5-color-picker-rgb"><${litRender.scopeTag("ui5-input", tags, suffix)} id="red" class="ui5-color-picker-rgb-input" disabled="${litRender.ifDefined(context.inputsDisabled)}" accessible-name="${litRender.ifDefined(context.redInputLabel)}" value="${litRender.ifDefined(context._color.r)}"></${litRender.scopeTag("ui5-input", tags, suffix)}><${litRender.scopeTag("ui5-label", tags, suffix)}>R</${litRender.scopeTag("ui5-label", tags, suffix)}></div><div class="ui5-color-picker-rgb"><${litRender.scopeTag("ui5-input", tags, suffix)} id="green" class="ui5-color-picker-rgb-input" disabled="${litRender.ifDefined(context.inputsDisabled)}" accessible-name="${litRender.ifDefined(context.greenInputLabel)}" value="${litRender.ifDefined(context._color.g)}"></${litRender.scopeTag("ui5-input", tags, suffix)}><${litRender.scopeTag("ui5-label", tags, suffix)}>G</${litRender.scopeTag("ui5-label", tags, suffix)}></div><div class="ui5-color-picker-rgb"><${litRender.scopeTag("ui5-input", tags, suffix)} id="blue" class="ui5-color-picker-rgb-input" disabled="${litRender.ifDefined(context.inputsDisabled)}" accessible-name="${litRender.ifDefined(context.blueInputLabel)}" value="${litRender.ifDefined(context._color.b)}"></${litRender.scopeTag("ui5-input", tags, suffix)}><${litRender.scopeTag("ui5-label", tags, suffix)}>B</${litRender.scopeTag("ui5-label", tags, suffix)}></div><div class="ui5-color-picker-rgb"><${litRender.scopeTag("ui5-input", tags, suffix)} id="alpha" disabled="${litRender.ifDefined(context.inputsDisabled)}" class="ui5-color-picker-rgb-input" value="${litRender.ifDefined(context._alpha)}" accessible-name="${litRender.ifDefined(context.alphaInputLabel)}" @ui5-input="${litRender.ifDefined(context._handleAlphaInput)}" @ui5-change="${litRender.ifDefined(context._handleAlphaChange)}"></${litRender.scopeTag("ui5-input", tags, suffix)}><${litRender.scopeTag("ui5-label", tags, suffix)}>A</${litRender.scopeTag("ui5-label", tags, suffix)}></div></div></section>` : litRender.html`<section dir="${litRender.ifDefined(context.effectiveDir)}" class="ui5-color-picker-root"><div class="ui5-color-picker-main-color" style="${litRender.styleMap(context.styles.mainColor)}" @mousedown="${context._handleMouseDown}" @mouseup="${context._handleMouseUp}" @mousemove="${context._handleMouseMove}" @mouseout="${context._handleMouseOut}"><div class="ui5-color-picker-circle" style="${litRender.styleMap(context.styles.circle)}"></div></div><div class="ui5-color-picker-sliders-wrapper"><ui5-slider disabled="${litRender.ifDefined(context.inputsDisabled)}" class="ui5-color-picker-hue-slider" min="0" max="1530" value="${litRender.ifDefined(context._hue)}" accessible-name="${litRender.ifDefined(context.hueSliderLabel)}" @ui5-input="${litRender.ifDefined(context._handleHueInput)}"></ui5-slider><ui5-slider disabled="${litRender.ifDefined(context.inputsDisabled)}" class="ui5-color-picker-alpha-slider" min="0" max="1" step="0.01" value="${litRender.ifDefined(context._alpha)}" accessible-name="${litRender.ifDefined(context.alphaSliderLabel)}" @ui5-input="${litRender.ifDefined(context._handleAlphaInput)}"></ui5-slider></div><div class="ui5-color-picker-current-color"><div class="ui5-color-picker-colors-wrapper"><span class="ui5-color-picker-white"></span><span class="ui5-color-picker-color"><div class="ui5-color-picker-color-inner" style="${litRender.styleMap(context.styles.colorSpan)}"></div></span></div><div class="ui5-color-picker-hex-input-wrapper"><ui5-label>Hex</ui5-label><ui5-input class="ui5-color-picker-hex-input" value="${litRender.ifDefined(context.hex)}" @keydown="${context._onkeydown}" accessible-name="${litRender.ifDefined(context.hexInputLabel)}" @ui5-change="${litRender.ifDefined(context._handleHEXChange)}" value-state="${litRender.ifDefined(context.hexInputErrorState)}"></ui5-input></div></div><div class="ui5-color-picker-rgb-wrapper" @ui5-change="${litRender.ifDefined(context._handleRGBInputsChange)}"><div class="ui5-color-picker-rgb"><ui5-input id="red" class="ui5-color-picker-rgb-input" disabled="${litRender.ifDefined(context.inputsDisabled)}" accessible-name="${litRender.ifDefined(context.redInputLabel)}" value="${litRender.ifDefined(context._color.r)}"></ui5-input><ui5-label>R</ui5-label></div><div class="ui5-color-picker-rgb"><ui5-input id="green" class="ui5-color-picker-rgb-input" disabled="${litRender.ifDefined(context.inputsDisabled)}" accessible-name="${litRender.ifDefined(context.greenInputLabel)}" value="${litRender.ifDefined(context._color.g)}"></ui5-input><ui5-label>G</ui5-label></div><div class="ui5-color-picker-rgb"><ui5-input id="blue" class="ui5-color-picker-rgb-input" disabled="${litRender.ifDefined(context.inputsDisabled)}" accessible-name="${litRender.ifDefined(context.blueInputLabel)}" value="${litRender.ifDefined(context._color.b)}"></ui5-input><ui5-label>B</ui5-label></div><div class="ui5-color-picker-rgb"><ui5-input id="alpha" disabled="${litRender.ifDefined(context.inputsDisabled)}" class="ui5-color-picker-rgb-input" value="${litRender.ifDefined(context._alpha)}" accessible-name="${litRender.ifDefined(context.alphaInputLabel)}" @ui5-input="${litRender.ifDefined(context._handleAlphaInput)}" @ui5-change="${litRender.ifDefined(context._handleAlphaChange)}"></ui5-input><ui5-label>A</ui5-label></div></div></section>`;

	return block0;

});
