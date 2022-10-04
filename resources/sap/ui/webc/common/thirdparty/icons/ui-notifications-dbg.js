sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/config/Theme", "./v5/ui-notifications", "./v4/ui-notifications"], function (_exports, _Theme, _uiNotifications, _uiNotifications2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "accData", {
    enumerable: true,
    get: function () {
      return _uiNotifications.accData;
    }
  });
  _exports.default = void 0;
  Object.defineProperty(_exports, "ltr", {
    enumerable: true,
    get: function () {
      return _uiNotifications.ltr;
    }
  });
  _exports.pathData = void 0;
  const pathData = (0, _Theme.isThemeFamily)("sap_horizon") ? _uiNotifications.pathData : _uiNotifications2.pathData;
  _exports.pathData = pathData;
  var _default = "ui-notifications";
  _exports.default = _default;
});