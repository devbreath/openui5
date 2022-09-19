sap.ui.define(["sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/base/util/getActiveElement","sap/ui/webc/common/thirdparty/base/util/TabbableElements","./CheckBox","./types/TableMode","./types/TableRowType","./generated/templates/TableRowTemplate.lit","./generated/i18n/i18n-defaults","./generated/themes/TableRow.css"],function(e,t,i,s,n,o,l,r,a,c,u,h){"use strict";function p(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var d=p(e);var f=p(i);var m=p(n);const b={tag:"ui5-table-row",managedSlots:true,slots:{default:{propertyName:"cells",type:HTMLElement,individualSlots:true}},properties:{mode:{type:r,defaultValue:r.None},type:{type:a,defaultValue:a.Inactive},selected:{type:Boolean},active:{type:Boolean},_columnsInfo:{type:Object,multiple:true},_tabIndex:{type:String,defaultValue:"-1"},_busy:{type:Boolean},_ariaPosition:{type:String,defaultValue:"",noAttribute:true}},events:{"row-click":{},_focused:{},"selection-requested":{},"f7-pressed":{}}};class v extends d{static get metadata(){return b}static get styles(){return h}static get render(){return f}static get template(){return c}static get dependencies(){return[l]}constructor(){super();const e=e=>{this.activate()};this._ontouchstart={handleEvent:e,passive:true}}_onmouseup(){this.deactivate()}_onkeydown(e){const t=m();const i=this.type===a.Active;const n=this.isSingleSelect;const l=n||this.isMultiSelect;const r=this._activeElementHasAttribute("ui5-table-row");const c=e.target.classList.contains("ui5-multi-select-checkbox");if(s.isTabNext(e)&&t===(o.getLastTabbableElement(this)||this.root)){this.fireEvent("_forward-after",{target:t})}if(s.isTabPrevious(e)&&t===this.root){this.fireEvent("_forward-before",{target:t})}if(s.isSpace(e)&&e.target.tagName.toLowerCase()==="tr"){e.preventDefault()}if(r&&!c){if(s.isSpace(e)&&l||s.isEnter(e)&&n){this.fireEvent("selection-requested",{row:this})}if(s.isEnter(e)&&i){this.fireEvent("row-click",{row:this});if(!n){this.activate()}}}if(s.isF7(e)){e.preventDefault();this.fireEvent("f7-pressed",{row:this})}}_onkeyup(e){if(s.isSpace(e)||s.isEnter(e)){this.deactivate()}}_ontouchend(){this.deactivate()}_onfocusout(){this.deactivate()}_onfocusin(e,t=false){if(t||this._activeElementHasAttribute("ui5-table-cell")){this.root.focus();this.activate()}this.fireEvent("_focused",e)}_onrowclick(e){const t=e.target.classList.contains("ui5-multi-select-checkbox");if(e.isMarked==="button"){return}if(!this.contains(this.getRootNode().activeElement)){this._onfocusin(e,true);this.deactivate()}if(this._activeElementHasAttribute("ui5-table-row")){if(this.isSingleSelect){this._handleSelection()}if(this.type===a.Active&&!t){this.fireEvent("row-click",{row:this})}}}_handleSelection(){this.fireEvent("selection-requested",{row:this})}_activeElementHasAttribute(e){return this.getRootNode().activeElement.hasAttribute(e)}activate(){if(this.type===a.Active){this.active=true}}deactivate(){if(this.active){this.active=false}}get shouldPopin(){return this._columnsInfo.filter(e=>e.demandPopin||!e.visible).length}get allColumnsPoppedIn(){return this._columnsInfo.every(e=>e.demandPopin&&!e.visible)}onBeforeRendering(){if(!this.shouldPopin){return}this.visibleCells=[];this.popinCells=[];if(this.cells.length===0){return}const e=this.allColumnsPoppedIn?"all-columns-popped-in":"";this._columnsInfo.forEach((t,i)=>{const s=this.cells[i];if(!s){return}if(t.visible){this.visibleCells.push(s);s.popined=false}else if(t.demandPopin){const i=this.popinCells.length===0?"popin-header":"";this.popinCells.push({cell:s,popinText:t.popinText,classes:`ui5-table-popin-row ${e} ${i}`});s.popined=true}else{s.popined=false}},this);const t=this.visibleCells[this.visibleCells.length-1];if(t){t.lastInRow=true}}get visibleCellsCount(){let e=this.visibleCells.length;if(this.isMultiSelect){e+=1}return e}get ariaLabelText(){const e=this.cells.map((e,t)=>{const i=this.getColumnTextByIdx(t);const s=this.getCellText(e);return`${i} ${s}`}).join(" ");return`${e}. ${this._ariaPosition}`}get ariaLabelRowSelection(){return v.i18nBundle.getText(u.ARIA_LABEL_ROW_SELECTION)}get isSingleSelect(){return this.mode==="SingleSelect"}get isMultiSelect(){return this.mode==="MultiSelect"}get root(){return this.shadowRoot.querySelector(".ui5-table-row-root")}getCellText(e){return this.getNormilzedTextContent(e.textContent)}getColumnTextByIdx(e){const t=this._columnsInfo[e];if(!t){return""}return this.getNormilzedTextContent(t.text)}getNormilzedTextContent(e){return e.replace(/[\n\r\t]/g,"").trim()}static async onDefine(){v.i18nBundle=await t.getI18nBundle("@ui5/webcomponents")}}v.define();return v});