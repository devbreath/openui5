sap.ui.define(["sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/common/thirdparty/base/delegate/ItemNavigation","sap/ui/webc/common/thirdparty/base/types/CSSColor","sap/ui/webc/common/thirdparty/base/types/ItemNavigationBehavior","sap/ui/webc/common/thirdparty/base/Device","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/base/FeaturesRegistry","./generated/templates/ColorPaletteTemplate.lit","./generated/templates/ColorPaletteDialogTemplate.lit","./ColorPaletteItem","./Button","./generated/i18n/i18n-defaults","./generated/themes/ColorPalette.css","./generated/themes/ColorPaletteStaticArea.css"],function(e,t,o,s,i,r,l,a,n,h,c,u,C,g,p,f){"use strict";function m(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var d=m(e);var w=m(t);var _=m(s);var y=m(i);var v=m(r);const E={tag:"ui5-color-palette",managedSlots:true,properties:{showRecentColors:{type:Boolean},showMoreColors:{type:Boolean},showDefaultColor:{type:Boolean},defaultColor:{type:y},_selectedColor:{type:y},popupMode:{type:Boolean}},slots:{default:{propertyName:"colors",type:HTMLElement,invalidateOnChildChange:true,individualSlots:true}},events:{"item-click":{detail:{color:{type:String}}}}};class P extends d{static get metadata(){return E}static get render(){return w}static get styles(){return p}static get staticAreaStyles(){return f}static get template(){return h}static get staticAreaTemplate(){return c}static get dependencies(){const e=n.getFeature("ColorPaletteMoreColors");return[u,C].concat(e?e.dependencies:[])}static async onDefine(){const e=n.getFeature("ColorPaletteMoreColors");[P.i18nBundle]=await Promise.all([o.getI18nBundle("@ui5/webcomponents"),e?e.init():Promise.resolve()])}constructor(){super();this._itemNavigation=new _(this,{getItemsCallback:()=>this.displayedColors,rowSize:this.rowSize,behavior:v.Cyclic});this._itemNavigationRecentColors=new _(this,{getItemsCallback:()=>this.recentColorsElements,rowSize:this.rowSize,behavior:v.Static});this._recentColors=[]}onBeforeRendering(){this.displayedColors.forEach((e,t)=>{e.index=t+1});if(this.showMoreColors){const e=n.getFeature("ColorPaletteMoreColors");if(e){this.moreColorsFeature=new e}else{throw new Error(`You have to import "@ui5/webcomponents/dist/features/ColorPaletteMoreColors.js" module to use the more-colors functionality.`)}}}selectColor(e){if(!e.value){return}e.focus();if(this.displayedColors.includes(e)){this._itemNavigation.setCurrentItem(e)}this._setColor(e.value)}_setColor(e){this._selectedColor=e;if(this._recentColors[0]!==this._selectedColor){if(this._recentColors.includes(this._selectedColor)){this._recentColors.unshift(this._recentColors.splice(this._recentColors.indexOf(this._selectedColor),1)[0])}else{this._recentColors.unshift(this._selectedColor)}}this.fireEvent("item-click",{color:this._selectedColor})}_onclick(e){if(e.target.hasAttribute("ui5-color-palette-item")){this.selectColor(e.target)}}_onkeyup(e){if(a.isSpace(e)&&e.target.hasAttribute("ui5-color-palette-item")){e.preventDefault();this.selectColor(e.target)}}_onkeydown(e){if(a.isEnter(e)&&e.target.hasAttribute("ui5-color-palette-item")){this.selectColor(e.target)}}_onDefaultColorKeyDown(e){if(a.isTabNext(e)&&this.popupMode){e.preventDefault();this._onDefaultColorClick()}if(a.isDown(e)){e.stopPropagation();this.focusColorElement(this.colorPaletteNavigationElements[1],this._itemNavigation)}else if(a.isUp(e)){e.stopPropagation();const t=this.colorPaletteNavigationElements[this.colorPaletteNavigationElements.length-1];if(this.hasRecentColors){this.focusColorElement(t,this._itemNavigationRecentColors)}else if(this.showMoreColors){t.focus()}else{const e=this.displayedColors.length%this.rowSize*this.rowSize;this.focusColorElement(this.displayedColors[e],this._itemNavigation)}}}_onMoreColorsKeyDown(e){const t=this.colorPaletteNavigationElements.indexOf(e.target);const o=this.displayedColors.length%this.rowSize*this.rowSize;if(a.isUp(e)){e.stopPropagation();this.focusColorElement(this.displayedColors[o],this._itemNavigation)}else if(a.isDown(e)){e.stopPropagation();if(this.hasRecentColors){this.focusColorElement(this.colorPaletteNavigationElements[t+1],this._itemNavigationRecentColors)}else if(this.showDefaultColor){this.colorPaletteNavigationElements[0].focus()}else{this.focusColorElement(this.displayedColors[0],this._itemNavigation)}}}_onColorContainerKeyDown(e){const t=this.colorPaletteNavigationElements[this.colorPaletteNavigationElements.length-1];if(a.isTabNext(e)&&this.popupMode){e.preventDefault();this.selectColor(e.target)}if(a.isUp(e)&&e.target===this.displayedColors[0]&&this.colorPaletteNavigationElements.length>1){e.stopPropagation();if(this.showDefaultColor){this.colorPaletteNavigationElements[0].focus()}else if(!this.showDefaultColor&&this.hasRecentColors){this.focusColorElement(t,this._itemNavigationRecentColors)}else if(!this.showDefaultColor&&this.showMoreColors){t.focus()}}else if(a.isDown(e)&&e.target===this.displayedColors[this.displayedColors.length-1]&&this.colorPaletteNavigationElements.length>1){e.stopPropagation();const o=this.showDefaultColor&&!this.showMoreColors&&this.hasRecentColors||!this.showDefaultColor&&!this.showMoreColors&&this.hasRecentColors;if(this.showDefaultColor&&this.showMoreColors){this.colorPaletteNavigationElements[2].focus()}else if(this.showDefaultColor&&!this.showMoreColors&&(!this.showRecentColors||!this.recentColors[0])){this.colorPaletteNavigationElements[0].focus()}else if(o){this.focusColorElement(t,this._itemNavigationRecentColors)}else if(!this.showDefaultColor&&this.showMoreColors){this.colorPaletteNavigationElements[1].focus()}}}_onRecentColorsContainerKeyDown(e){if(a.isUp(e)){if(this.showMoreColors){this.colorPaletteNavigationElements[1+this.showDefaultColor].focus()}else if(!this.showMoreColors&&this.colorPaletteNavigationElements.length>1){const t=this.displayedColors.length%this.rowSize*this.rowSize;e.stopPropagation();this.focusColorElement(this.displayedColors[t],this._itemNavigation)}}else if(a.isDown(e)){if(this.showDefaultColor){this.colorPaletteNavigationElements[0].focus()}else{e.stopPropagation();this.focusColorElement(this.displayedColors[0],this._itemNavigation)}}}focusColorElement(e,t){t.setCurrentItem(e);t._focusCurrentItem()}async _chooseCustomColor(){const e=await this.getColorPicker();this._setColor(e.color);this._closeDialog()}async _closeDialog(){const e=await this._getDialog();e.close()}async _openMoreColorsDialog(){const e=await this._getDialog();e.show()}_onDefaultColorClick(){if(this.defaultColor){this._setColor(this.defaultColor)}}get selectedColor(){return this._selectedColor}get displayedColors(){return this.getSlottedNodes("colors").filter(e=>e.value).slice(0,15)}get colorContainerLabel(){return P.i18nBundle.getText(g.COLORPALETTE_CONTAINER_LABEL)}get colorPaleteMoreColorsText(){return P.i18nBundle.getText(g.COLOR_PALETTE_MORE_COLORS_TEXT)}get _showMoreColors(){return this.showMoreColors&&this.moreColorsFeature}get rowSize(){return 5}get hasRecentColors(){return this.showRecentColors&&this.recentColors[0]}get recentColors(){if(this._recentColors.length>this.rowSize){this._recentColors=this._recentColors.slice(0,this.rowSize)}while(this._recentColors.length<this.rowSize){this._recentColors.push("")}return this._recentColors}get recentColorsElements(){if(this.getDomRef()){return Array.from(this.getDomRef().querySelectorAll(".ui5-cp-recent-colors-wrapper [ui5-color-palette-item]")).filter(e=>e.value!=="")}return[]}get colorPaletteNavigationElements(){const e=[];const t=this.shadowRoot.querySelector(".ui5-cp-root");if(this.showDefaultColor){e.push(t.querySelector(".ui5-cp-default-color-button"))}e.push(this.displayedColors[0]);if(this.showMoreColors){e.push(t.querySelector(".ui5-cp-more-colors"))}if(this.showRecentColors&&!!this.recentColorsElements.length){e.push(this.recentColorsElements[0])}return e}get classes(){return{colorPaletteRoot:{"ui5-cp-root":true,"ui5-cp-root-phone":l.isPhone()}}}async _getDialog(){const e=await this.getStaticAreaItemDomRef();return e.querySelector("[ui5-dialog]")}async getColorPicker(){const e=await this._getDialog();return e.content[0].querySelector("[ui5-color-picker]")}}P.define();return P});