sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/common/thirdparty/base/types/CSSColor","./generated/templates/ColorPalettePopoverTemplate.lit","./generated/themes/ColorPalettePopover.css","./generated/themes/ResponsivePopoverCommon.css","./generated/i18n/i18n-defaults","./Button","./Title","./ResponsivePopover","./ColorPalette"],function(e,t,o,r,s,l,n,i,a,p,u,c,d){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;t=v(t);o=v(o);s=v(s);l=v(l);n=v(n);i=v(i);p=v(p);u=v(u);c=v(c);d=v(d);function v(e){return e&&e.__esModule?e:{default:e}}const P={tag:"ui5-color-palette-popover",managedSlots:true,properties:{showRecentColors:{type:Boolean},showMoreColors:{type:Boolean},showDefaultColor:{type:Boolean},defaultColor:{type:s.default}},slots:{default:{type:HTMLElement,propertyName:"colors",individualSlots:true}},events:{"item-click":{detail:{color:{type:String}}}}};class h extends t.default{static get metadata(){return P}static get render(){return o.default}static get styles(){return[i.default,n.default]}static get template(){return l.default}static get dependencies(){return[c.default,p.default,u.default,d.default]}static async onDefine(){h.i18nBundle=await(0,r.getI18nBundle)("@ui5/webcomponents")}constructor(){super()}_respPopover(){this.responsivePopover=this.shadowRoot.querySelector("[ui5-responsive-popover]");return this.responsivePopover}_colorPalette(){return this.responsivePopover.content[0].querySelector("[ui5-color-palette]")}showAt(e){this._openPopover(e)}openPopover(e){console.warn("The method 'openPopover' is deprecated and will be removed in future, use 'showAt' instead.");this._openPopover(e)}_openPopover(e){this._respPopover();this.responsivePopover.showAt(e,true);if(this.showDefaultColor){this._colorPalette().colorPaletteNavigationElements[0].focus()}else{this._colorPalette().focusColorElement(this._colorPalette().colorPaletteNavigationElements[0],this._colorPalette()._itemNavigation)}}closePopover(){this.responsivePopover.close()}onSelectedColor(e){this.closePopover();this.fireEvent("item-click",e.detail)}isOpen(){this._respPopover();return this.responsivePopover.opened}get colorPaletteColors(){return this.getSlottedNodes("colors")}get _colorPaletteTitle(){return h.i18nBundle.getText(a.COLORPALETTE_POPOVER_TITLE)}get _cancelButtonLabel(){return h.i18nBundle.getText(a.COLOR_PALETTE_DIALOG_CANCEL_BUTTON)}}h.define();var f=h;e.default=f});
//# sourceMappingURL=ColorPalettePopover.js.map