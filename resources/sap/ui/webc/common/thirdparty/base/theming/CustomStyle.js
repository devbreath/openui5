sap.ui.define(["exports","../Render","../getSharedResource","../EventProvider"],function(e,t,n,s){"use strict";const o=n("CustomStyle.eventProvider",new s);const r="CustomCSSChange";const u=e=>{o.attachEvent(r,e)};const a=e=>{o.detachEvent(r,e)};const c=e=>o.fireEvent(r,e);const C=n("CustomStyle.customCSSFor",{});let S;u(e=>{if(!S){t.reRenderAllUI5Elements({tag:e})}});const l=(e,n)=>{if(!C[e]){C[e]=[]}C[e].push(n);S=true;try{c(e)}finally{S=false}return t.reRenderAllUI5Elements({tag:e})};const d=e=>C[e]?C[e].join(""):"";e.addCustomCSS=l;e.attachCustomCSSChange=u;e.detachCustomCSSChange=a;e.getCustomCSS=d;Object.defineProperty(e,"__esModule",{value:true})});