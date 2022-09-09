sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/config/Theme", "./v5/lateness", "./v4/lateness"], function (_exports, _Theme, _lateness, _lateness2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "accData", {
    enumerable: true,
    get: function () {
      return _lateness.accData;
    }
  });
  _exports.default = void 0;
  Object.defineProperty(_exports, "ltr", {
    enumerable: true,
    get: function () {
      return _lateness.ltr;
    }
  });
  _exports.pathData = void 0;
  const pathData = (0, _Theme.isThemeFamily)("sap_horizon") ? _lateness.pathData : _lateness2.pathData;
  _exports.pathData = pathData;
  var _default = "lateness";
  _exports.default = _default;
});