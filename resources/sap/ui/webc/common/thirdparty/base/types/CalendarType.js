sap.ui.define(["exports","./DataType"],function(e,a){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;a=s(a);function s(e){return e&&e.__esModule?e:{default:e}}const t={Gregorian:"Gregorian",Islamic:"Islamic",Japanese:"Japanese",Buddhist:"Buddhist",Persian:"Persian"};class i extends a.default{static isValid(e){return!!t[e]}}i.generateTypeAccessors(t);var r=i;e.default=r});
//# sourceMappingURL=CalendarType.js.map