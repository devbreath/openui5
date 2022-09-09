sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/config/Theme", "./v5/umbrella", "./v4/umbrella"], function (_exports, _Theme, _umbrella, _umbrella2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "accData", {
    enumerable: true,
    get: function () {
      return _umbrella.accData;
    }
  });
  _exports.default = void 0;
  Object.defineProperty(_exports, "ltr", {
    enumerable: true,
    get: function () {
      return _umbrella.ltr;
    }
  });
  _exports.pathData = void 0;
  const pathData = (0, _Theme.isThemeFamily)("sap_horizon") ? _umbrella.pathData : _umbrella2.pathData;
  _exports.pathData = pathData;
  var _default = "umbrella";
  _exports.default = _default;
});