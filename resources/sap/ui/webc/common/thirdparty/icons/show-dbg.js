sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/config/Theme", "./v5/show", "./v4/show"], function (_exports, _Theme, _show, _show2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "accData", {
    enumerable: true,
    get: function () {
      return _show.accData;
    }
  });
  _exports.default = void 0;
  Object.defineProperty(_exports, "ltr", {
    enumerable: true,
    get: function () {
      return _show.ltr;
    }
  });
  _exports.pathData = void 0;
  const pathData = (0, _Theme.isThemeFamily)("sap_horizon") ? _show.pathData : _show2.pathData;
  _exports.pathData = pathData;
  var _default = "show";
  _exports.default = _default;
});