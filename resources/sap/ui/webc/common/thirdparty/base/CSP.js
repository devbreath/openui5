sap.ui.define(["exports"],function(e){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.shouldUseLinks=e.shouldPreloadLinks=e.setUseLinks=e.setPreloadLinks=e.setPackageCSSRoot=e.getUrl=void 0;const s=new Map;let t=false;let o=true;const n=(e,t)=>{s.set(e,t)};e.setPackageCSSRoot=n;const l=(e,t)=>`${s.get(e)}${t}`;e.getUrl=l;const i=e=>{t=e};e.setUseLinks=i;const a=e=>{o=e};e.setPreloadLinks=a;const c=()=>t;e.shouldUseLinks=c;const d=()=>o;e.shouldPreloadLinks=d});
//# sourceMappingURL=CSP.js.map