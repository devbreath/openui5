sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e,t){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;const i=(e,i,o)=>o?(0,t.html)`<${(0,t.scopeTag)("ui5-list",i,o)} .mode="${(0,t.ifDefined)(e.mode)}" .headerText="${(0,t.ifDefined)(e.headerText)}" .footerText="${(0,t.ifDefined)(e.footerText)}" .noDataText="${(0,t.ifDefined)(e.noDataText)}" .accessibleRole="${(0,t.ifDefined)(e._role)}" @ui5-item-click="${(0,t.ifDefined)(e._onListItemClick)}" @ui5-item-delete="${(0,t.ifDefined)(e._onListItemDelete)}" @ui5-selection-change="${(0,t.ifDefined)(e._onListSelectionChange)}" class="ui5-tree-root"><slot name="header" slot="header"></slot>${(0,t.repeat)(e._listItems,(e,t)=>e._id||t,(t,d)=>n(t,d,e,i,o))}</${(0,t.scopeTag)("ui5-list",i,o)}> `:(0,t.html)`<ui5-list .mode="${(0,t.ifDefined)(e.mode)}" .headerText="${(0,t.ifDefined)(e.headerText)}" .footerText="${(0,t.ifDefined)(e.footerText)}" .noDataText="${(0,t.ifDefined)(e.noDataText)}" .accessibleRole="${(0,t.ifDefined)(e._role)}" @ui5-item-click="${(0,t.ifDefined)(e._onListItemClick)}" @ui5-item-delete="${(0,t.ifDefined)(e._onListItemDelete)}" @ui5-selection-change="${(0,t.ifDefined)(e._onListSelectionChange)}" class="ui5-tree-root"><slot name="header" slot="header"></slot>${(0,t.repeat)(e._listItems,(e,t)=>e._id||t,(t,d)=>n(t,d,e,i,o))}</ui5-list> `;const n=(e,i,n,o,d)=>d?(0,t.html)`<${(0,t.scopeTag)("ui5-li-tree",o,d)} type="Active" level="${(0,t.ifDefined)(e.level)}" icon="${(0,t.ifDefined)(e.treeItem.icon)}" ?indeterminate="${e.treeItem.indeterminate}" additional-text="${(0,t.ifDefined)(e.treeItem.additionalText)}" additional-text-state="${(0,t.ifDefined)(e.treeItem.additionalTextState)}" title="${(0,t.ifDefined)(e.treeItem.title)}" ?_toggle-button-end="${(0,t.ifDefined)(n._toggleButtonEnd)}" ?_minimal="${(0,t.ifDefined)(n._minimal)}" .treeItem="${(0,t.ifDefined)(e.treeItem)}" .expanded="${(0,t.ifDefined)(e.treeItem.expanded)}" .selected="${(0,t.ifDefined)(e.treeItem.selected)}" .showToggleButton="${(0,t.ifDefined)(e.treeItem.requiresToggleButton)}" ._posinset="${(0,t.ifDefined)(e.posinset)}" ._setsize="${(0,t.ifDefined)(e.size)}" @ui5-toggle="${(0,t.ifDefined)(n._onListItemToggle)}" @ui5-step-in="${(0,t.ifDefined)(n._onListItemStepIn)}" @ui5-step-out="${(0,t.ifDefined)(n._onListItemStepOut)}" @mouseover="${n._onListItemMouseOver}" @mouseout="${n._onListItemMouseOut}" exportparts="icon, toggle-icon">${(0,t.ifDefined)(e.treeItem.text)}</${(0,t.scopeTag)("ui5-li-tree",o,d)}>`:(0,t.html)`<ui5-li-tree type="Active" level="${(0,t.ifDefined)(e.level)}" icon="${(0,t.ifDefined)(e.treeItem.icon)}" ?indeterminate="${e.treeItem.indeterminate}" additional-text="${(0,t.ifDefined)(e.treeItem.additionalText)}" additional-text-state="${(0,t.ifDefined)(e.treeItem.additionalTextState)}" title="${(0,t.ifDefined)(e.treeItem.title)}" ?_toggle-button-end="${(0,t.ifDefined)(n._toggleButtonEnd)}" ?_minimal="${(0,t.ifDefined)(n._minimal)}" .treeItem="${(0,t.ifDefined)(e.treeItem)}" .expanded="${(0,t.ifDefined)(e.treeItem.expanded)}" .selected="${(0,t.ifDefined)(e.treeItem.selected)}" .showToggleButton="${(0,t.ifDefined)(e.treeItem.requiresToggleButton)}" ._posinset="${(0,t.ifDefined)(e.posinset)}" ._setsize="${(0,t.ifDefined)(e.size)}" @ui5-toggle="${(0,t.ifDefined)(n._onListItemToggle)}" @ui5-step-in="${(0,t.ifDefined)(n._onListItemStepIn)}" @ui5-step-out="${(0,t.ifDefined)(n._onListItemStepOut)}" @mouseover="${n._onListItemMouseOver}" @mouseout="${n._onListItemMouseOut}" exportparts="icon, toggle-icon">${(0,t.ifDefined)(e.treeItem.text)}</ui5-li-tree>`;var o=i;e.default=o});
//# sourceMappingURL=TreeTemplate.lit.js.map