sap.ui.define(['sap/ui/webc/common/thirdparty/base/types/DataType'], function (DataType) { 'use strict';

	function _interopDefaultLegacy (e) { return e && typeof e === 'object' && 'default' in e ? e['default'] : e; }

	var DataType__default = /*#__PURE__*/_interopDefaultLegacy(DataType);

	const IllustrationMessageSizes = {
		Auto: "Auto",
		Base: "Base",
		Spot: "Spot",
		Dialog: "Dialog",
		Scene: "Scene",
	};
	class IllustrationMessageSize extends DataType__default {
		static isValid(value) {
			return !!IllustrationMessageSizes[value];
		}
	}
	IllustrationMessageSize.generateTypeAccessors(IllustrationMessageSizes);

	return IllustrationMessageSize;

});
