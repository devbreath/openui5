sap.ui.define(["./StaticArea","./updateShadowRoot","./Render","./util/getEffectiveContentDensity","./CustomElementsScopeUtils","./locale/getEffectiveDir"],function(t,e,i,s,n,a){"use strict";class r extends HTMLElement{constructor(){super();this._rendered=false;this.attachShadow({mode:"open"})}setOwnerElement(t){this.ownerElement=t;this.classList.add(this.ownerElement._id);if(this.ownerElement.hasAttribute("data-ui5-static-stable")){this.setAttribute("data-ui5-stable",this.ownerElement.getAttribute("data-ui5-static-stable"))}}update(){if(this._rendered){this._updateContentDensity();this._updateDirection();e(this.ownerElement,true)}}_updateContentDensity(){if(s(this.ownerElement)==="compact"){this.classList.add("sapUiSizeCompact");this.classList.add("ui5-content-density-compact")}else{this.classList.remove("sapUiSizeCompact");this.classList.remove("ui5-content-density-compact")}}_updateDirection(){const t=a(this.ownerElement);if(t){this.setAttribute("dir",t)}else{this.removeAttribute("dir")}}async getDomRef(){this._updateContentDensity();if(!this._rendered){this._rendered=true;e(this.ownerElement,true)}await i.renderFinished();return this.shadowRoot}static getTag(){const t="ui5-static-area-item";const e=n.getEffectiveScopingSuffixForTag(t);if(!e){return t}return`${t}-${e}`}static createInstance(){if(!customElements.get(r.getTag())){customElements.define(r.getTag(),r)}return document.createElement(this.getTag())}}return r});