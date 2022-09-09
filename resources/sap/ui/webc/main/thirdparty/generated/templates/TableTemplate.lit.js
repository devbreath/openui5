sap.ui.define(["exports","sap/ui/webc/common/thirdparty/base/renderer/LitRenderer"],function(e,i){"use strict";Object.defineProperty(e,"__esModule",{value:true});e.default=void 0;const t=(e,t,s)=>(0,i.html)`<div class="ui5-table-root" @focusin="${e._onfocusin}"><div id="${(0,i.ifDefined)(e._id)}-before" tabindex="0" class="ui5-table-focusarea"></div>${e.busy?a(e,t,s):undefined}<table border="0" cellspacing="0" cellpadding="0" @keydown="${e._onkeydown}" role="table" aria-label="${(0,i.ifDefined)(e.tableAriaLabelText)}"><thead><tr id="${(0,i.ifDefined)(e._columnHeader.id)}" role="row" class="ui5-table-header-row" aria-label="${(0,i.ifDefined)(e.ariaLabelText)}" tabindex="${(0,i.ifDefined)(e._columnHeader._tabIndex)}" @click="${e._onColumnHeaderClick}" @focusin="${e._onColumnHeaderFocused}" @keydown="${e._onColumnHeaderKeydown}">${e.isMultiSelect?n(e,t,s):undefined}${(0,i.repeat)(e.visibleColumns,(e,i)=>e._id||i,(i,a)=>l(i,a,e,t,s))}</tr></thead><tbody>${(0,i.repeat)(e.rows,(e,i)=>e._id||i,(i,a)=>d(i,a,e,t,s))}${!e.rows.length?o(e,t,s):undefined}${e.growsWithButton?u(e,t,s):undefined}${e.growsOnScroll?c(e,t,s):undefined}</tbody></table><div id="${(0,i.ifDefined)(e._id)}-after" tabindex="0" class="ui5-table-focusarea"></div></div> `;const a=(e,t,a)=>a?(0,i.html)`<div tabindex="-1" class="ui5-table-busy-row"><${(0,i.scopeTag)("ui5-busy-indicator",t,a)} delay="${(0,i.ifDefined)(e.busyDelay)}" class="ui5-table-busy-ind" style="${(0,i.styleMap)(e.styles.busy)}" active size="Medium" data-sap-focus-ref></${(0,i.scopeTag)("ui5-busy-indicator",t,a)}></div>`:(0,i.html)`<div tabindex="-1" class="ui5-table-busy-row"><ui5-busy-indicator delay="${(0,i.ifDefined)(e.busyDelay)}" class="ui5-table-busy-ind" style="${(0,i.styleMap)(e.styles.busy)}" active size="Medium" data-sap-focus-ref></ui5-busy-indicator></div>`;const n=(e,t,a)=>a?(0,i.html)`<th class="ui5-table-select-all-column" role="presentation" aria-hidden="true"><${(0,i.scopeTag)("ui5-checkbox",t,a)} class="ui5-table-select-all-checkbox" ?checked="${e._allRowsSelected}" @ui5-change="${(0,i.ifDefined)(e._selectAll)}" aria-label="${(0,i.ifDefined)(e.ariaLabelSelectAllText)}" tabindex="-1"></${(0,i.scopeTag)("ui5-checkbox",t,a)}></th>`:(0,i.html)`<th class="ui5-table-select-all-column" role="presentation" aria-hidden="true"><ui5-checkbox class="ui5-table-select-all-checkbox" ?checked="${e._allRowsSelected}" @ui5-change="${(0,i.ifDefined)(e._selectAll)}" aria-label="${(0,i.ifDefined)(e.ariaLabelSelectAllText)}" tabindex="-1"></ui5-checkbox></th>`;const l=(e,t,a,n,l)=>(0,i.html)`<slot name="${(0,i.ifDefined)(e._individualSlot)}"></slot>`;const d=(e,t,a,n,l)=>(0,i.html)`<slot name="${(0,i.ifDefined)(e._individualSlot)}"></slot>`;const o=(e,t,a)=>(0,i.html)`${!e.hideNoData?s(e,t,a):undefined}`;const s=(e,t,a)=>(0,i.html)`<tr class="ui5-table-no-data-row-root" role="row"><td colspan="${(0,i.ifDefined)(e.visibleColumnsCount)}" role="cell"><div class="ui5-table-no-data-row"><span>${(0,i.ifDefined)(e.noDataText)}</span></div></td></tr>`;const u=(e,t,a)=>(0,i.html)`<tr><td colspan="${(0,i.ifDefined)(e.visibleColumnsCount)}"><div growing-button><div id="${(0,i.ifDefined)(e._id)}-growingButton" tabindex="0" role="button" aria-labelledby="${(0,i.ifDefined)(e.loadMoreAriaLabelledBy)}" ?active="${e._loadMoreActive}" @click="${e._onLoadMoreClick}" @keydown="${e._onLoadMoreKeydown}" @keyup="${e._onLoadMoreKeyup}" growing-button-inner><span id="${(0,i.ifDefined)(e._id)}-growingButton-text" growing-button-text>${(0,i.ifDefined)(e._growingButtonText)}</span>${e.growingButtonSubtext?r(e,t,a):undefined}</div></div></td></tr>`;const r=(e,t,a)=>(0,i.html)`<span id="${(0,i.ifDefined)(e._id)}-growingButton-subtext" growing-button-subtext>${(0,i.ifDefined)(e.growingButtonSubtext)}</span>`;const c=(e,t,a)=>(0,i.html)`<tr tabindex="-1" class="ui5-table-end-row"><td tabindex="-1"><span tabindex="-1" aria-hidden="true" class="ui5-table-end-marker"></span></td></tr>`;var b=t;e.default=b});
//# sourceMappingURL=TableTemplate.lit.js.map