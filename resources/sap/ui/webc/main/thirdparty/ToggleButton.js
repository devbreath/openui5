sap.ui.define(["sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/base/Device","./Button","./generated/templates/ToggleButtonTemplate.lit","./generated/themes/ToggleButton.css"],function(e,t,s,a,i){"use strict";const n={tag:"ui5-toggle-button",altTag:"ui5-togglebutton",properties:{pressed:{type:Boolean}}};class r extends s{static get metadata(){return n}static get template(){return a}static get styles(){return[s.styles,i]}_onclick(){this.pressed=!this.pressed;if(t.isSafari()){this.getDomRef().focus()}}_onkeyup(t){if(e.isSpaceShift(t)){t.preventDefault();return}super._onkeyup(t)}}r.define();return r});