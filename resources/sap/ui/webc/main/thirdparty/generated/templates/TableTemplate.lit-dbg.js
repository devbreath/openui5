sap.ui.define(['sap/ui/webc/common/thirdparty/base/renderer/LitRenderer'], function (litRender) { 'use strict';

	const block0 = (context, tags, suffix) => litRender.html`<div class="ui5-table-root" @focusin="${context._onfocusin}"><div id="${litRender.ifDefined(context._id)}-before" tabindex="0" class="ui5-table-focusarea"></div>${ context.busy ? block1(context, tags, suffix) : undefined }<table border="0" cellspacing="0" cellpadding="0" @keydown="${context._onkeydown}" role="table" aria-label="${litRender.ifDefined(context.tableAriaLabelText)}"><thead><tr id="${litRender.ifDefined(context._columnHeader.id)}" role="row" class="ui5-table-header-row" aria-label="${litRender.ifDefined(context.ariaLabelText)}" tabindex="${litRender.ifDefined(context._columnHeader._tabIndex)}" @click="${context._onColumnHeaderClick}" @focusin="${context._onColumnHeaderFocused}" @keydown="${context._onColumnHeaderKeydown}">${ context.isMultiSelect ? block2(context, tags, suffix) : undefined }${ litRender.repeat(context.visibleColumns, (item, index) => item._id || index, (item, index) => block3(item)) }</tr></thead><tbody>${ litRender.repeat(context.rows, (item, index) => item._id || index, (item, index) => block4(item)) }${ !context.rows.length ? block5(context) : undefined }${ context.growsWithButton ? block7(context) : undefined }${ context.growsOnScroll ? block9() : undefined }</tbody></table><div id="${litRender.ifDefined(context._id)}-after" tabindex="0" class="ui5-table-focusarea"></div></div> `;
	const block1 = (context, tags, suffix) => suffix ? litRender.html`<div tabindex="-1" class="ui5-table-busy-row"><${litRender.scopeTag("ui5-busy-indicator", tags, suffix)} delay="${litRender.ifDefined(context.busyDelay)}" class="ui5-table-busy-ind" style="${litRender.styleMap(context.styles.busy)}" active size="Medium" data-sap-focus-ref></${litRender.scopeTag("ui5-busy-indicator", tags, suffix)}></div>` : litRender.html`<div tabindex="-1" class="ui5-table-busy-row"><ui5-busy-indicator delay="${litRender.ifDefined(context.busyDelay)}" class="ui5-table-busy-ind" style="${litRender.styleMap(context.styles.busy)}" active size="Medium" data-sap-focus-ref></ui5-busy-indicator></div>`;
	const block2 = (context, tags, suffix) => suffix ? litRender.html`<th class="ui5-table-select-all-column" role="presentation" aria-hidden="true"><${litRender.scopeTag("ui5-checkbox", tags, suffix)} class="ui5-table-select-all-checkbox" ?checked="${context._allRowsSelected}" @ui5-change="${litRender.ifDefined(context._selectAll)}" aria-label="${litRender.ifDefined(context.ariaLabelSelectAllText)}" tabindex="-1"></${litRender.scopeTag("ui5-checkbox", tags, suffix)}></th>` : litRender.html`<th class="ui5-table-select-all-column" role="presentation" aria-hidden="true"><ui5-checkbox class="ui5-table-select-all-checkbox" ?checked="${context._allRowsSelected}" @ui5-change="${litRender.ifDefined(context._selectAll)}" aria-label="${litRender.ifDefined(context.ariaLabelSelectAllText)}" tabindex="-1"></ui5-checkbox></th>`;
	const block3 = (item, index, context, tags, suffix) => litRender.html`<slot name="${litRender.ifDefined(item._individualSlot)}"></slot>`;
	const block4 = (item, index, context, tags, suffix) => litRender.html`<slot name="${litRender.ifDefined(item._individualSlot)}"></slot>`;
	const block5 = (context, tags, suffix) => litRender.html`${ !context.hideNoData ? block6(context) : undefined }`;
	const block6 = (context, tags, suffix) => litRender.html`<tr class="ui5-table-no-data-row-root" role="row"><td colspan="${litRender.ifDefined(context.visibleColumnsCount)}" role="cell"><div class="ui5-table-no-data-row"><span>${litRender.ifDefined(context.noDataText)}</span></div></td></tr>`;
	const block7 = (context, tags, suffix) => litRender.html`<tr><td colspan="${litRender.ifDefined(context.visibleColumnsCount)}"><div growing-button><div id="${litRender.ifDefined(context._id)}-growingButton" tabindex="0" role="button" aria-labelledby="${litRender.ifDefined(context.loadMoreAriaLabelledBy)}" ?active="${context._loadMoreActive}" @click="${context._onLoadMoreClick}" @keydown="${context._onLoadMoreKeydown}" @keyup="${context._onLoadMoreKeyup}" growing-button-inner><span id="${litRender.ifDefined(context._id)}-growingButton-text" growing-button-text>${litRender.ifDefined(context._growingButtonText)}</span>${ context.growingButtonSubtext ? block8(context) : undefined }</div></div></td></tr>`;
	const block8 = (context, tags, suffix) => litRender.html`<span id="${litRender.ifDefined(context._id)}-growingButton-subtext" growing-button-subtext>${litRender.ifDefined(context.growingButtonSubtext)}</span>`;
	const block9 = (context, tags, suffix) => litRender.html`<tr tabindex="-1" class="ui5-table-end-row"><td tabindex="-1"><span tabindex="-1" aria-hidden="true" class="ui5-table-end-marker"></span></td></tr>`;

	return block0;

});
