sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/config/Theme", "./v5/status-inactive", "./v4/status-inactive"], function (_exports, _Theme, _statusInactive, _statusInactive2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "accData", {
    enumerable: true,
    get: function () {
      return _statusInactive.accData;
    }
  });
  _exports.default = void 0;
  Object.defineProperty(_exports, "ltr", {
    enumerable: true,
    get: function () {
      return _statusInactive.ltr;
    }
  });
  _exports.pathData = void 0;
  const pathData = (0, _Theme.isThemeFamily)("sap_horizon") ? _statusInactive.pathData : _statusInactive2.pathData;
  _exports.pathData = pathData;
  var _default = "status-inactive";
  _exports.default = _default;
});