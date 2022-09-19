sap.ui.define(["../FeaturesRegistry","../config/Theme","../util/PopupUtils"],function(e,t,n){"use strict";const i=()=>{const sap=window.sap;const e=sap&&sap.ui&&typeof sap.ui.getCore==="function"&&sap.ui.getCore();return e};const o=()=>!!i();const r=()=>{const e=i();if(!e){return Promise.resolve()}return new Promise(t=>{e.attachInit(()=>{window.sap.ui.require(["sap/ui/core/LocaleData","sap/ui/core/Popup"],(e,i)=>{i.setInitialZIndex(n.getCurrentZIndex());t()})})})};const s=()=>{const e=i();if(!e){return}const t=e.getConfiguration();const n=window.sap.ui.require("sap/ui/core/LocaleData");return{animationMode:t.getAnimationMode(),language:t.getLanguage(),theme:t.getTheme(),rtl:t.getRTL(),calendarType:t.getCalendarType(),formatSettings:{firstDayOfWeek:n?n.getInstance(t.getLocale()).getFirstDayOfWeek():undefined}}};const a=()=>{const e=i();if(!e){return}const t=e.getConfiguration();const n=window.sap.ui.require("sap/ui/core/LocaleData");return n.getInstance(t.getLocale())._get()};const c=()=>{const e=i();const n=e.getConfiguration();e.attachThemeChanged(async()=>{await t.setTheme(n.getTheme())})};const u=()=>{const e=i();if(!e){return}c()};const g=()=>{const e=i();if(!e){return}const t=[...document.head.children].find(e=>e.id==="sap-ui-theme-sap.ui.core");if(!t){return}return!!t.href.match(/\/css(-|_)variables\.css/)};const d=()=>{const e=i();if(!e){return}const t=window.sap.ui.require("sap/ui/core/Popup");return t.getNextZIndex()};const p=()=>{const e=i();if(!e){return}const t=window.sap.ui.require("sap/ui/core/Popup");t.setInitialZIndex(n.getCurrentZIndex())};const f={isLoaded:o,init:r,getConfigurationSettingsObject:s,getLocaleDataObject:a,attachListeners:u,cssVariablesLoaded:g,getNextZIndex:d,setInitialZIndex:p};e.registerFeature("OpenUI5Support",f)});