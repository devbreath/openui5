sap.ui.define(["sap/ui/webc/common/thirdparty/base/types/DataType"],function(e){"use strict";function t(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var a=t(e);const i={Default:"Default",Positive:"Positive",Negative:"Negative",Critical:"Critical",Neutral:"Neutral"};class s extends a{static isValid(e){return!!i[e]}}s.generateTypeAccessors(i);return s});