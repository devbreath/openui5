sap.ui.define(["exports","./escapeRegex","sap/base/security/encodeXML"],function(e,t,n){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;t=u(t);n=u(n);function u(e){return e&&e.__esModule?e:{default:e}}function r(e,n,u,r){return e.replace(new RegExp((0,t.default)(n),`${r?"i":""}g`),u)}function i(e,t){if(!e||!t){return e}const u=n=>{const[u,r]=n.split("");while(e.indexOf(n)>=0||t.indexOf(n)>=0){n=`${u}${n}${r}`}return n};const i=u("12");const c=u("34");let f=(0,n.default)(r(e,t,e=>`${i}${e}${c}`,true));[[i,"<b>"],[c,"</b>"]].forEach(([e,t])=>{f=r(f,e,t)});return f}var c=i;e.default=c});
//# sourceMappingURL=generateHighlightedMarkup.js.map