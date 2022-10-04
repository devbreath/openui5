sap.ui.define(["exports", "sap/ui/webc/common/thirdparty/base/config/Theme", "./v5/contacts", "./v4/contacts"], function (_exports, _Theme, _contacts, _contacts2) {
  "use strict";

  Object.defineProperty(_exports, "__esModule", {
    value: true
  });
  Object.defineProperty(_exports, "accData", {
    enumerable: true,
    get: function () {
      return _contacts.accData;
    }
  });
  _exports.default = void 0;
  Object.defineProperty(_exports, "ltr", {
    enumerable: true,
    get: function () {
      return _contacts.ltr;
    }
  });
  _exports.pathData = void 0;
  const pathData = (0, _Theme.isThemeFamily)("sap_horizon") ? _contacts.pathData : _contacts2.pathData;
  _exports.pathData = pathData;
  var _default = "contacts";
  _exports.default = _default;
});