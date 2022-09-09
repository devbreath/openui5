sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/config/Theme", "./v5/lead", "./v4/lead"], function (_exports, _Theme, _lead, _lead2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "accData", {
    enumerable: true,
    get: function () {
      return _lead.accData;
    }
  });
  _exports.default = void 0;
  Object.defineProperty(_exports, "ltr", {
    enumerable: true,
    get: function () {
      return _lead.ltr;
    }
  });
  _exports.pathData = void 0;
  const pathData = (0, _Theme.isThemeFamily)("sap_horizon") ? _lead.pathData : _lead2.pathData;
  _exports.pathData = pathData;
  var _default = "lead";
  _exports.default = _default;
});