sap.ui.define(["exports","../getSharedResource","../assets-meta/IconCollectionsAlias","../config/Icons"],function(e,t,a,o){"use strict";const c=new Map;const s=t("SVGIcons.registry",new Map);const r=t("SVGIcons.promises",new Map);const n="ICON_NOT_FOUND";const i=async(e,t)=>{throw new Error("This method has been removed. Use `registerIconLoader` instead.")};const l=async(e,t)=>{c.set(e,t)};const g=async e=>{if(!r.has(e)){if(!c.has(e)){throw new Error(`No loader registered for the ${e} icons collection. Probably you forgot to import the "AllIcons.js" module for the respective package.`)}const t=c.get(e);r.set(e,t(e))}return r.get(e)};const p=e=>{Object.keys(e.data).forEach(t=>{const a=e.data[t];f(t,{pathData:a.path,ltr:a.ltr,accData:a.acc,collection:e.collection,packageName:e.packageName})})};const f=(e,{pathData:t,ltr:a,accData:c,collection:r,packageName:n}={})=>{if(!r){r=o.getEffectiveDefaultIconCollection()}const i=`${r}/${e}`;s.set(i,{pathData:t,ltr:a,accData:c,packageName:n})};const u=e=>{if(e.startsWith("sap-icon://")){e=e.replace("sap-icon://","")}let t;[e,t]=e.split("/").reverse();t=t||o.getEffectiveDefaultIconCollection();t=m(t);e=e.replace("icon-","");const a=`${t}/${e}`;return{name:e,collection:t,registryKey:a}};const y=e=>{const{registryKey:t}=u(e);return s.get(t)};const h=async e=>{const{collection:t,registryKey:a}=u(e);let o=n;try{o=await g(t)}catch(e){console.error(e.message)}if(o===n){return o}if(!s.has(a)){p(o)}return s.get(a)};const d=async()=>{await h("edit");await h("tnt/arrow");await h("business-suite/3d");return Array.from(s.keys())};const m=e=>{if(a[e]){return a[e]}return e};e._getRegisteredNames=d;e.getIconData=h;e.getIconDataSync=y;e.registerIcon=f;e.registerIconBundle=i;e.registerIconLoader=l;Object.defineProperty(e,"__esModule",{value:true})});