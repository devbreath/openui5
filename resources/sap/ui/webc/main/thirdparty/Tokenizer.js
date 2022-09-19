sap.ui.define(["sap/ui/webc/common/thirdparty/base/UI5Element","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer","sap/ui/webc/common/thirdparty/base/delegate/ResizeHandler","sap/ui/webc/common/thirdparty/base/delegate/ItemNavigation","sap/ui/webc/common/thirdparty/base/delegate/ScrollEnablement","sap/ui/webc/common/thirdparty/base/types/Integer","sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/common/thirdparty/base/Keys","sap/ui/webc/common/thirdparty/base/Device","sap/ui/webc/common/thirdparty/base/types/ValueState","./ResponsivePopover","./List","./Title","./Button","./StandardListItem","./generated/templates/TokenizerTemplate.lit","./generated/templates/TokenizerPopoverTemplate.lit","./generated/i18n/i18n-defaults","./generated/themes/Tokenizer.css","./generated/themes/TokenizerPopover.css","./generated/themes/ResponsivePopoverCommon.css","./generated/themes/ValueStateMessage.css","./generated/themes/Suggestions.css"],function(e,t,n,s,i,r,o,a,l,h,u,c,d,g,p,f,m,v,_,S,k,T,w){"use strict";function E(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var y=E(e);var b=E(t);var N=E(n);var C=E(s);var I=E(i);var R=E(r);var x=E(h);const O={tag:"ui5-tokenizer",languageAware:true,managedSlots:true,slots:{default:{propertyName:"tokens",type:HTMLElement,individualSlots:true},valueStateMessage:{propertyName:"valueStateMessage",type:HTMLElement}},properties:{showMore:{type:Boolean},disabled:{type:Boolean},expanded:{type:Boolean},morePopoverOpener:{type:Object},popoverMinWidth:{type:R},valueState:{type:x,defaultValue:x.None},_nMoreCount:{type:R}},events:{"token-delete":{detail:{ref:{type:HTMLElement}}},"show-more-items-press":{detail:{ref:{type:HTMLElement}}}}};class D extends y{static get metadata(){return O}static get render(){return b}static get template(){return f}static get styles(){return _}static get staticAreaStyles(){return[k,T,w,S]}static get staticAreaTemplate(){return m}_handleResize(){this._nMoreCount=this.overflownTokens.length}constructor(){super();this._resizeHandler=this._handleResize.bind(this);this._itemNav=new C(this,{currentIndex:"-1",getItemsCallback:this._getVisibleTokens.bind(this)});this._scrollEnablement=new I(this)}async onBeforeRendering(){if(this.showPopover&&!this._getTokens().length){const e=await this.getPopover();e.close()}this._nMoreCount=this.overflownTokens.length}onEnterDOM(){N.register(this.shadowRoot.querySelector(".ui5-tokenizer--content"),this._resizeHandler)}onExitDOM(){N.deregister(this.shadowRoot.querySelector(".ui5-tokenizer--content"),this._resizeHandler)}async _openOverflowPopover(){if(this.showPopover){const e=await this.getPopover();e.showAt(this.morePopoverOpener||this)}this.fireEvent("show-more-items-press")}_getTokens(){return this.getSlottedNodes("tokens")}get _tokens(){return this.getSlottedNodes("tokens")}get showPopover(){return Object.keys(this.morePopoverOpener).length}_getVisibleTokens(){if(this.disabled){return[]}return this._tokens.filter((e,t)=>t<this._tokens.length-this._nMoreCount)}onAfterRendering(){this._scrollEnablement.scrollContainer=this.expanded?this.contentDom:this}_delete(e){if(this._selectedTokens.length){this._selectedTokens.forEach(t=>this._tokenDelete(e,t))}else{this._tokenDelete(e)}}_tokenDelete(e,t){let n;const s=this._getVisibleTokens();const i=t?s.indexOf(t):s.indexOf(e.target);const r=s.filter(e=>!e.selected);if(e.detail&&e.detail.backSpace){n=i===0?i+1:i-1}else{n=i===s.length-1?i-1:i+1}let o=s[n];if(r.length>1){while(o&&o.selected){o=e.detail.backSpace?s[--n]:s[++n]}}else{o=r[0]}if(o&&!l.isPhone()){this._itemNav.setCurrentItem(o);setTimeout(()=>{o.focus()},0)}this.fireEvent("token-delete",{ref:t||e.target})}itemDelete(e){const t=e.detail.item.tokenRef;this.fireEvent("token-delete",{ref:t})}_onkeydown(e){if(a.isSpaceShift(e)){e.preventDefault()}if(a.isSpace(e)||a.isSpaceCtrl(e)){e.preventDefault();return this._handleTokenSelection(e,false)}if(a.isHomeShift(e)){this._handleHomeShift(e)}if(a.isEndShift(e)){this._handleEndShift(e)}this._handleItemNavigation(e,this._tokens)}_handleItemNavigation(e,t){const n=!!(e.metaKey||e.ctrlKey);if(a.isLeftCtrl(e)||a.isRightCtrl(e)||a.isDownCtrl(e)||a.isUpCtrl(e)){return this._handleArrowCtrl(e,e.target,t,a.isRightCtrl(e)||a.isDownCtrl(e))}if(a.isLeftShift(e)||a.isRightShift(e)||a.isUpShift(e)||a.isDownShift(e)||a.isLeftShiftCtrl(e)||a.isRightShiftCtrl(e)){e.preventDefault();return this._handleArrowShift(e.target,t,a.isRightShift(e)||a.isRightShiftCtrl(e)||a.isDownShift(e))}if(a.isHome(e)||a.isEnd(e)||a.isHomeCtrl(e)||a.isEndCtrl(e)){e.preventDefault();return this._handleHome(t,a.isEnd(e)||a.isEndCtrl(e))}if(n&&e.key.toLowerCase()==="a"){e.preventDefault();return this._toggleTokenSelection(t)}}_handleHome(e,t){if(!e||!e.length){return-1}const n=t?e.length-1:0;e[n].focus();this._itemNav.setCurrentItem(e[n])}_handleHomeShift(e){const t=this.tokens;const n=t.indexOf(e.target);t.filter((e,t)=>t<=n).forEach(e=>{e.selected=true});t[0].focus();this._itemNav.setCurrentItem(t[0])}_handleEndShift(e){const t=this.tokens;const n=t.indexOf(e.target);t.filter((e,t)=>t>=n).forEach(e=>{e.selected=true});t[t.length-1].focus();this._itemNav.setCurrentItem(t[t.length-1])}_calcNextTokenIndex(e,t,n){if(!t.length){return-1}const s=t.indexOf(e);let i=n?s+1:s-1;if(i>=t.length){i=t.length-1}if(i<0){i=0}return i}_handleArrowCtrl(e,t,n,s){const i=this._calcNextTokenIndex(t,n,s);e.preventDefault();if(i===-1){return}setTimeout(()=>n[i].focus(),0);this._itemNav.setCurrentItem(n[i])}_handleArrowShift(e,t,n){const s=t.indexOf(e);const i=n?s+1:s-1;if(i===-1||i===t.length){return}e.selected=true;t[i].selected=true;setTimeout(()=>t[i].focus(),0);this._itemNav.setCurrentItem(t[i])}_click(e){this._handleTokenSelection(e)}_onmousedown(e){this._itemNav.setCurrentItem(e.target)}_toggleTokenSelection(e){if(!e||!e.length){return}const t=e.every(e=>e.selected);e.forEach(e=>{e.selected=!t})}_handleTokenSelection(e,t=true){if(e.target.hasAttribute("ui5-token")){const n=t?this._tokens:[e.target];n.forEach(t=>{if(t!==e.target){t.selected=false}})}}_fillClipboard(e,t){const n=t.filter(e=>e.selected).map(e=>e.text).join("\r\n");const s=e=>{if(e.clipboardData){e.clipboardData.setData("text/plain",n)}else{e.originalEvent.clipboardData.setData("text/plain",n)}e.preventDefault()};document.addEventListener(e,s);document.execCommand(e);document.removeEventListener(e,s)}scrollToStart(){this.contentDom.scrollLeft=0}async closeMorePopover(){const e=await this.getPopover();e.close()}get _nMoreText(){return D.i18nBundle.getText(v.MULTIINPUT_SHOW_MORE_TOKENS,this._nMoreCount)}get showNMore(){return!this.expanded&&this.showMore&&this.overflownTokens.length}get contentDom(){return this.shadowRoot.querySelector(".ui5-tokenizer--content")}get tokenizerLabel(){return D.i18nBundle.getText(v.TOKENIZER_ARIA_LABEL)}get morePopoverTitle(){return D.i18nBundle.getText(v.TOKENIZER_POPOVER_REMOVE)}get overflownTokens(){if(!this.contentDom){return[]}this._getTokens().forEach(e=>{e.overflows=false});return this._getTokens().filter(e=>{const t=this.effectiveDir==="rtl";const n=t?"left":"right";const s=this.contentDom.getBoundingClientRect();const i=e.getBoundingClientRect();const r=parseInt(i[n]);const o=parseInt(s[n]);e.overflows=t?r<o&&!this.expanded:r>o&&!this.expanded;return e.overflows})}get hasValueState(){return this.valueState===x.None||this.valueState===x.Success}get valueStateMessageText(){return this.getSlottedNodes("valueStateMessage").map(e=>e.cloneNode(true))}get _valueStateMessageIcon(){const e={Error:"error",Warning:"alert",Success:"sys-enter-2",Information:"information"};return this.valueState!==x.None?e[this.valueState]:""}get _isPhone(){return l.isPhone()}get _selectedTokens(){return this._getTokens().filter(e=>e.selected)}get classes(){return{wrapper:{"ui5-tokenizer-root":true,"ui5-tokenizer-nmore--wrapper":this.showMore,"ui5-tokenizer-no-padding":!this._getTokens().length},content:{"ui5-tokenizer--content":true,"ui5-tokenizer-nmore--content":this.showMore},popoverValueState:{"ui5-valuestatemessage-root":true,"ui5-responsive-popover-header":this.showPopover,"ui5-valuestatemessage--success":this.valueState===x.Success,"ui5-valuestatemessage--error":this.valueState===x.Error,"ui5-valuestatemessage--warning":this.valueState===x.Warning,"ui5-valuestatemessage--information":this.valueState===x.Information}}}get styles(){return{popover:{"min-width":`${this.popoverMinWidth}px`},popoverValueStateMessage:{width:l.isPhone()?"100%":`${this.popoverMinWidth}px`,"min-height":"2rem"},popoverHeader:{"min-height":"2rem"},popoverHeaderTitle:{"justify-content":"left"}}}_tokensCountText(){const e=this._getTokens().length;if(e===0){return D.i18nBundle.getText(v.TOKENIZER_ARIA_CONTAIN_TOKEN)}if(e===1){return D.i18nBundle.getText(v.TOKENIZER_ARIA_CONTAIN_ONE_TOKEN)}return D.i18nBundle.getText(v.TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS,e)}_focusLastToken(){if(this.tokens.length===0){return}const e=this.tokens[this.tokens.length-1];e.focus();this._itemNav.setCurrentItem(e)}static get dependencies(){return[u,c,p,d,g]}static async onDefine(){D.i18nBundle=await o.getI18nBundle("@ui5/webcomponents")}async getPopover(){return(await this.getStaticAreaItemDomRef()).querySelector("[ui5-responsive-popover]")}}D.define();return D});