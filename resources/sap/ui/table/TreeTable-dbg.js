/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */

// Provides control sap.ui.table.TreeTable.
sap.ui.define([
	'./Table',
	"./TableRenderer",
	'sap/ui/model/ClientTreeBindingAdapter',
	'sap/ui/model/TreeBindingCompatibilityAdapter',
	'./library',
	'./utils/TableUtils',
	"./plugins/BindingSelection",
	"sap/base/Log",
	"sap/base/assert"
],
	function(
		Table,
		TableRenderer,
		ClientTreeBindingAdapter,
		TreeBindingCompatibilityAdapter,
		library,
		TableUtils,
		BindingSelectionPlugin,
		Log,
		assert
	) {
	"use strict";

	var _private = TableUtils.createWeakMapFacade();

	/**
	 * Constructor for a new TreeTable.
	 *
	 * @param {string} [sId] id for the new control, generated automatically if no id is given
	 * @param {object} [mSettings] initial settings for the new control
	 *
	 * @class
	 * The TreeTable control provides a comprehensive set of features to display hierarchical data.
	 * @extends sap.ui.table.Table
	 * @version 1.107.0
	 *
	 * @constructor
	 * @public
	 * @alias sap.ui.table.TreeTable
	 * @see {@link topic:08197fa68e4f479cbe30f639cc1cd22c sap.ui.table}
	 * @see {@link topic:148892ff9aea4a18b912829791e38f3e Tables: Which One Should I Choose?}
	 * @see {@link fiori:/tree-table/ Tree Table}
	 */
	var TreeTable = Table.extend("sap.ui.table.TreeTable", /** @lends sap.ui.table.TreeTable.prototype */ { metadata : {

		library : "sap.ui.table",
		properties : {

			/**
			 * Specifies whether the first level is expanded.
			 *
			 * The value of the property is only taken into account if no parameter <code>numberOfExpandedLevels</code> is given in the binding information.
			 * Changes to this property after the table is bound do not have any effect unless an explicit (re-)bind of the <code>rows</code> aggregation is done.
			 *
			 * Example:
			 * <pre>
			 *   oTable.bindRows({
			 *     path: "...",
			 *     parameters: {
			 *       numberOfExpandedLevels: 1
			 *     }
			 *   });
			 * </pre>
			 *
			 * @deprecated As of version 1.46.3, replaced by the <code>numberOfExpandedLevels</code> binding parameter
			 */
			expandFirstLevel : {type : "boolean", defaultValue : false, deprecated: true},

			/**
			 * If group mode is enabled nodes with subitems are rendered as if they were group headers.
			 * This can be used to do the grouping for an OData service on the backend and visualize this in a table.
			 */
			useGroupMode : {type : "boolean", group : "Appearance", defaultValue : false},

			/**
			 * The property name of the rows data which will be displayed as a group header if the group mode is enabled
			 */
			groupHeaderProperty : {type : "string", group : "Data", defaultValue : null},

			/**
			 * Setting collapseRecursive to true means, that when collapsing a node all subsequent child nodes will also be collapsed.
			 * This property is only supported with sap.ui.model.odata.v2.ODataModel.
			 * <b>Note:</b> collapseRecursive is currently <b>not</b> supported if your OData service exposes the hierarchy annotation <code>hierarchy-node-descendant-count-for</code>.
			 * In this case the value of the collapseRecursive property is ignored.
			 * For more information about the OData hierarchy annotations, please see the <b>SAP Annotations for OData Version 2.0</b> specification.
			 *
			 * Example:
			 * <pre>
			 *   oTable.bindRows({
			 *     path: "...",
			 *     parameters: {
			 *       collapseRecursive: true
			 *     }
			 *   });
			 * </pre>
			 *
			 * @deprecated As of version 1.76, replaced by the <code>collapseRecursive</code> binding parameter
			 */
			collapseRecursive : {type: "boolean", defaultValue: true, deprecated: true},

			/**
			 * The root level is the level of the topmost tree nodes, which will be used as an entry point for OData services.
			 * This property is only supported when the TreeTable uses an underlying odata services with hierarchy annotations.
			 * This property is only supported with sap.ui.model.odata.v2.ODataModel
			 * The hierarchy annotations may also be provided locally as a parameter for the ODataTreeBinding.
			 *
			 * Example:
			 * <pre>
			 *   oTable.bindRows({
			 *     path: "...",
			 *     parameters: {
			 *       rootLevel: 1
			 *     }
			 *   });
			 * </pre>
			 *
			 * @deprecated As of version 1.76, replaced by the <code>rootLevel</code> binding parameter
			 */
			rootLevel : {type: "int", group: "Data", defaultValue: 0, deprecated: true}
		},
		events : {

			/**
			 * Fired when a row has been expanded or collapsed by user interaction. Only available in hierarchical mode.
			 */
			toggleOpenState : {
				parameters : {

					/**
					 * Index of the expanded/collapsed row
					 */
					rowIndex : {type : "int"},

					/**
					 * Binding context of the expanded/collapsed row
					 */
					rowContext : {type : "object"},

					/**
					 * Flag that indicates whether the row has been expanded or collapsed
					 */
					expanded : {type : "boolean"}
				}
			}
		}
	}, renderer: TableRenderer});


	/**
	 * Initialization of the TreeTable control
	 * @private
	 */
	TreeTable.prototype.init = function() {
		Table.prototype.init.apply(this, arguments);

		_private(this).bPendingRequest = false;

		TableUtils.Grouping.setToDefaultTreeMode(this);
		TableUtils.Hook.register(this, TableUtils.Hook.Keys.Row.UpdateState, updateRowState, this);
		TableUtils.Hook.register(this, TableUtils.Hook.Keys.Row.Expand, expandRow, this);
		TableUtils.Hook.register(this, TableUtils.Hook.Keys.Row.Collapse, collapseRow, this);
	};

	TreeTable.prototype._bindRows = function(oBindingInfo) {
		_private(this).bPendingRequest = false;

		if (!oBindingInfo.parameters) {
			oBindingInfo.parameters = {};
		}

		if (!("rootLevel" in oBindingInfo.parameters)) {
			oBindingInfo.parameters.rootLevel = this.getRootLevel();
		}

		if (!("collapseRecursive" in oBindingInfo.parameters)) {
			oBindingInfo.parameters.collapseRecursive = this.getCollapseRecursive();
		}

		if (!("numberOfExpandedLevels" in oBindingInfo.parameters)) {
			oBindingInfo.parameters.numberOfExpandedLevels = this.getExpandFirstLevel() ? 1 : 0;
		}

		return Table.prototype._bindRows.call(this, oBindingInfo);
	};

	function updateRowState(oState) {
		var oBinding = this.getBinding();
		var oNode = oState.context;

		oState.context = oNode.context; // The TreeTable requests nodes from the binding.

		if (!oState.context) {
			return;
		}

		oState.level = oNode.level + 1;

		if (oBinding.nodeHasChildren) {
			oState.expandable = oBinding.nodeHasChildren(oNode);
		} else {
			oState.expandable = oBinding.hasChildren(oNode.context);
		}

		oState.expanded = oNode.nodeState.expanded;

		if (TableUtils.Grouping.isInGroupMode(this)) {
			var sHeaderProp = this.getGroupHeaderProperty();

			if (sHeaderProp) {
				oState.title = oState.context.getProperty(sHeaderProp);
			}

			if (oState.expandable) {
				oState.type = oState.Type.GroupHeader;
				oState.contentHidden = true;
			}
		}
	}

	function expandRow(oRow) {
		var iIndex = oRow.getIndex();
		var bIsExpanded = toggleGroupHeader(this, iIndex, true);

		if (typeof bIsExpanded === "boolean") {
			this._onGroupHeaderChanged(iIndex, bIsExpanded);
		}
	}

	function collapseRow(oRow) {
		var iIndex = oRow.getIndex();
		var bIsExpanded = toggleGroupHeader(this, iIndex, false);

		if (typeof bIsExpanded === "boolean") {
			this._onGroupHeaderChanged(iIndex, bIsExpanded);
		}
	}

	/**
	 * Toggles or sets the expanded state of a single or multiple rows. Toggling only works for a single row.
	 *
	 * @param {sap.ui.table.Table} oTable Instance of the table.
	 * @param {int | int[]} vRowIndex A single index, or an array of indices of the rows to expand or collapse.
	 * @param {boolean} [bExpand] If defined, instead of toggling the desired state is set.
	 * @returns {boolean | null} The new expanded state in case an action was performed, otherwise <code>null</code>.
	 */
	function toggleGroupHeader(oTable, vRowIndex, bExpand) {
		var aIndices = [];
		var oBinding = oTable.getBinding();

		if (!oBinding || vRowIndex == null) {
			return null;
		}

		if (typeof vRowIndex === "number") {
			aIndices = [vRowIndex];
		} else if (Array.isArray(vRowIndex)) {
			if (bExpand == null && vRowIndex.length > 1) {
				// Toggling the expanded state of multiple rows seems to be an absurd task. Therefore we assume this is unintentional and
				// prevent the execution.
				return null;
			}
			aIndices = vRowIndex;
		}

		var iTotalRowCount = oTable._getTotalRowCount();
		var aValidSortedIndices = aIndices.filter(function(iIndex) {
			// Only indices of existing, expandable/collapsible nodes must be considered. Otherwise there might be no change event on the final
			// expand/collapse.
			var bIsExpanded = oBinding.isExpanded(iIndex);
			var bIsLeaf = true; // If the node state cannot be determined, we assume it is a leaf.

			if (oBinding.nodeHasChildren) {
				if (oBinding.getNodeByIndex) {
					bIsLeaf = !oBinding.nodeHasChildren(oBinding.getNodeByIndex(iIndex));
				} else {
					// The sap.ui.model.TreeBindingCompatibilityAdapter has no #getNodeByIndex function and #nodeHasChildren always returns true.
					bIsLeaf = false;
				}
			}

			return iIndex >= 0 && iIndex < iTotalRowCount
				   && !bIsLeaf
				   && bExpand !== bIsExpanded;
		}).sort(function(a, b) { return a - b; });

		if (aValidSortedIndices.length === 0) {
			return null;
		}

		// Operations need to be performed from the highest index to the lowest. This ensures correct results with OData bindings. The indices
		// are sorted ascending, so the array is iterated backwards.

		// Expand/Collapse all nodes except the first, and suppress the change event.
		for (var i = aValidSortedIndices.length - 1; i > 0; i--) {
			if (bExpand) {
				oBinding.expand(aValidSortedIndices[i], true);
			} else {
				oBinding.collapse(aValidSortedIndices[i], true);
			}
		}

		// Expand/Collapse the first node without suppressing the change event.
		if (bExpand === true) {
			oBinding.expand(aValidSortedIndices[0], false);
		} else if (bExpand === false) {
			oBinding.collapse(aValidSortedIndices[0], false);
		} else {
			oBinding.toggleIndex(aValidSortedIndices[0]);
		}

		return oBinding.isExpanded(aValidSortedIndices[0]);
	}

	/**
	 * Setter for property <code>fixedRowCount</code>.
	 *
	 * <b>This property is not supportd for the TreeTable and will be ignored!</b>
	 *
	 * Default value is <code>0</code>
	 *
	 * @param {int} iRowCount New value for property <code>fixedRowCount</code>
	 * @returns {this} <code>this</code> to allow method chaining
	 * @public
	 */
	TreeTable.prototype.setFixedRowCount = function(iRowCount) {
		// this property makes no sense for the TreeTable
		Log.warning("TreeTable: the property \"fixedRowCount\" is not supported and will be ignored!");
		return this;
	};


	TreeTable.prototype.isTreeBinding = function(sName) {
		sName = sName || "rows";
		if (sName === "rows") {
			return true;
		}
		return Table.prototype.isTreeBinding.apply(this, arguments);
	};

	TreeTable.prototype.getBinding = function(sName) {
		sName = sName == null ? "rows" : sName;
		var oBinding = Table.prototype.getBinding.call(this, sName);

		if (oBinding && sName === "rows" && !oBinding.getLength) {
			if (oBinding.isA("sap.ui.model.odata.ODataTreeBinding")) {
				// use legacy tree binding adapter
				TreeBindingCompatibilityAdapter(oBinding, this);
			} else if (oBinding.isA("sap.ui.model.odata.v2.ODataTreeBinding")) {
				oBinding.applyAdapterInterface();
			} else if (oBinding.isA("sap.ui.model.ClientTreeBinding")) {
				ClientTreeBindingAdapter.apply(oBinding);
			} else {
				Log.error("Binding not supported by sap.ui.table.TreeTable");
			}
		}

		return oBinding;
	};

	TreeTable.prototype._getContexts = function(iStartIndex, iLength, iThreshold) {
		var oBinding = this.getBinding();
		if (oBinding) {
			// first call getContexts to trigger data load but return nodes instead of contexts
			return oBinding.getNodes(iStartIndex, iLength, iThreshold);
		} else {
			return [];
		}
	};

	TreeTable.prototype._getRowContexts = function(iRequestLength) {
		return getRowContexts(this, iRequestLength);
	};

	function getRowContexts(oTable, iRequestLength, bSecondCall) {
		var iOldTotalRowCount = oTable._getTotalRowCount();
		var aRowContexts = Table.prototype._getRowContexts.call(oTable, iRequestLength);

		if (bSecondCall === true) {
			return aRowContexts;
		}

		var iNewTotalRowCount = oTable._getTotalRowCount();
		var iFirstVisibleRow = oTable._getFirstRenderedRowIndex();
		var iMaxRowIndex = oTable._getMaxFirstRenderedRowIndex();

		oTable._adjustToTotalRowCount();

		if (iMaxRowIndex < iFirstVisibleRow && oTable._bContextsAvailable) {
			// Get the contexts again, this time with the maximum possible value for the first visible row.
			aRowContexts = getRowContexts(oTable, iRequestLength, true);
		} else if (iOldTotalRowCount !== iNewTotalRowCount) {
			aRowContexts = getRowContexts(oTable, iRequestLength, true);
		}

		return aRowContexts;
	}

	TreeTable.prototype._onGroupHeaderChanged = function(iRowIndex, bExpanded) {
		this.fireToggleOpenState({
			rowIndex: iRowIndex,
			rowContext: this.getContextByIndex(iRowIndex),
			expanded: bExpanded
		});
	};

	/**
	 * Expands one or more rows.
	 *
	 * @param {int|int[]} vRowIndex A single index or an array of indices of the rows to be expanded
	 * @returns {this} <code>this</code> to allow method chaining
	 * @public
	 */
	TreeTable.prototype.expand = function(vRowIndex) {
		toggleGroupHeader(this, vRowIndex, true);
		return this;
	};

	/**
	 * Collapses one or more rows.
	 *
	 * @param {int|int[]} vRowIndex A single index or an array of indices of the rows to be collapsed
	 * @returns {this} <code>this</code> to allow method chaining
	 * @public
	 */
	TreeTable.prototype.collapse = function(vRowIndex) {
		toggleGroupHeader(this, vRowIndex, false);
		return this;
	};

	/**
	 * Collapses all nodes (and lower if collapseRecursive is activated)
	 *
	 * @returns {this} <code>this</code> to allow method chaining
	 * @public
	 */
	TreeTable.prototype.collapseAll = function() {
		var oBinding = this.getBinding();
		if (oBinding) {
			oBinding.collapseToLevel(0);
			this.setFirstVisibleRow(0);
		}

		return this;
	};

	/**
	 * Expands all nodes starting from the root level to the given level 'iLevel'.
	 *
	 * Only supported with ODataModel v2, when running in OperationMode.Client.
	 * Fully supported for <code>sap.ui.model.ClientTreeBinding</code>, e.g. if you are using a <code>sap.ui.model.json.JSONModel</code>.
	 *
	 * Please also see <code>sap.ui.model.odata.OperationMode</code>.
	 *
	 * @param {int} iLevel the level to which the trees shall be expanded
	 * @returns {this} a reference on the TreeTable control, can be used for chaining
	 * @public
	 */
	TreeTable.prototype.expandToLevel = function(iLevel) {
		var oBinding = this.getBinding();

		assert(oBinding && oBinding.expandToLevel, "TreeTable.expandToLevel is not supported with your current Binding. Please check if you are running on an ODataModel V2.");

		if (oBinding && oBinding.expandToLevel) {
			oBinding.expandToLevel(iLevel);
		}

		return this;
	};

	/**
	 * Checks whether the row is expanded or collapsed.
	 *
	 * @param {int} iRowIndex The index of the row to be checked
	 * @returns {boolean} <code>true</code> if the row is expanded, <code>false</code> if it is collapsed
	 * @public
	 */
	TreeTable.prototype.isExpanded = function(iRowIndex) {
		var oBinding = this.getBinding();
		if (oBinding) {
			return oBinding.isExpanded(iRowIndex);
		}
		return false;
	};

	/**
	 * Returns an array containing the row indices of all selected tree nodes (ordered ascending).
	 *
	 * Please be aware of the following:
	 * Due to performance/network traffic reasons, the getSelectedIndices function returns only all indices
	 * of actually selected rows/tree nodes. Unknown rows/nodes (as in "not yet loaded" to the client), will not be
	 * returned.
	 *
	 * @returns {int[]} an array containing all selected indices
	 * @public
	 * @function
	 * @name sap.ui.table.TreeTable#getSelectedIndices
	 */

	/**
	 * Sets the selection of the TreeTable to the given range (including boundaries).
	 * Beware: The previous selection will be lost/overridden. If this is not wanted, please use "addSelectionInterval"
	 * and "removeSelectionInterval".
	 * Please be aware, that the absolute row index only applies to the tree which is visualized by the TreeTable.
	 *
	 * @param {int} iFromIndex the start index of the selection range
	 * @param {int} iToIndex the end index of the selection range
	 * @returns {this} a reference on the TreeTable control, can be used for chaining
	 * @public
	 * @function
	 * @name sap.ui.table.TreeTable#setSelectionInterval
	 */

	/**
	 * Sets the selected index
	 * In a TreeTable you can only select indices, which correspond to the currently visualized tree.
	 * Invisible tree nodes (e.g. collapsed child nodes) can not be selected via Index, because they do not
	 * correspond to a TreeTable row.
	 *
	 * @param {int} iRowIndex The row index which will be selected (if existing)
	 * @returns {this} a reference on the TreeTable control, can be used for chaining
	 * @public
	 * @function
	 * @name sap.ui.table.TreeTable#setSelectedIndex
	 */

	/**
	 * Adds the given selection interval to the selection. In case of single selection, only <code>iIndexTo</code> is added to the selection.
	 * Invisible nodes (collapsed child nodes) will not be regarded.
	 *
	 * Please also take notice of the fact, that "addSelectionInterval" does not change any other selection.
	 * To override the current selection, please use "setSelectionInterval" or for a single entry use "setSelectedIndex".
	 *
	 * @param {int} iIndexFrom Index from which the selection should start
	 * @param {int} iIndexTo Index up to which to select
	 * @returns {this} Reference to <code>this</code> in order to allow method chaining
	 * @public
	 * @function
	 * @name sap.ui.table.TreeTable#addSelectionInterval
	 */

	/**
	 * Removes the given selection interval from the selection. In case of single selection, only <code>iIndexTo</code> is removed from the selection.
	 * Invisible nodes (collapsed child nodes) will not be regarded.
	 *
	 * @param {int} iIndexFrom Index from which the deselection should start
	 * @param {int} iIndexTo Index up to which to deselect
	 * @returns {this} Reference to <code>this</code> in order to allow method chaining
	 * @public
	 * @function
	 * @name sap.ui.table.TreeTable#removeSelectionInterval
	 */

	/**
	 * Selects all available nodes/rows.
	 *
	 * All rows/tree nodes that are locally stored on the client and that are part of the currently visible tree are selected.
	 * Additional rows or tree nodes that come into view through scrolling or paging are also selected immediately as soon as they get visible.
	 * However, <code>SelectAll</code> does not retrieve any data from the back end in order to improve performance and reduce the network traffic.
	 *
	 * @returns {this} a reference on the TreeTable control, can be used for chaining
	 * @public
	 * @function
	 * @name sap.ui.table.TreeTable#selectAll
	 */

	TreeTable.prototype.getContextByIndex = function(iRowIndex) {
		var oBinding = this.getBinding();
		if (oBinding) {
			return oBinding.getContextByIndex(iRowIndex);
		}
	};

	/*
	 * Set the rootLevel for the hierarchy
	 * The root level is the level of the topmost tree nodes, which will be used as an entry point for OData services.
	 * This setting has only effect when the binding is already initialized.
	 * @param {int} iRootLevel
	 * @returns {TreeTable}
	 */
	TreeTable.prototype.setRootLevel = function(iRootLevel) {
		this.setFirstVisibleRow(0);

		var oBinding = this.getBinding();
		if (oBinding) {
			assert(oBinding.setRootLevel, "rootLevel is not supported by the used binding");
			if (oBinding.setRootLevel) {
				oBinding.setRootLevel(iRootLevel);
			}
		}
		this.setProperty("rootLevel", iRootLevel, true);

		return this;
	};

	/*
	 * Sets the node hierarchy to collapse recursive. When set to true, all child nodes will get collapsed as well.
	 * This setting has only effect when the binding is already initialized.
	 * @param {boolean} bCollapseRecursive
	 */
	TreeTable.prototype.setCollapseRecursive = function(bCollapseRecursive) {
		var oBinding = this.getBinding();
		if (oBinding) {
			assert(oBinding.setCollapseRecursive, "Collapse Recursive is not supported by the used binding");
			if (oBinding.setCollapseRecursive) {
				oBinding.setCollapseRecursive(bCollapseRecursive);
			}
		}
		this.setProperty("collapseRecursive", !!bCollapseRecursive, true);
		return this;
	};

	TreeTable.prototype.setUseGroupMode = function(bGroup) {
		this.setProperty("useGroupMode", !!bGroup);
		updateHierarchyMode(this);
		return this;
	};

	/**
	 * The property <code>enableGrouping</code> is not supported by the <code>TreeTable</code> control.
	 *
	 * @deprecated Since version 1.28.
	 * @returns {boolean}
	 * @public
	 * @name sap.ui.table.TreeTable#getEnableGrouping
	 * @function
	 */

	/**
	 * The property <code>enableGrouping</code> is not supported by the <code>TreeTable</code> control.
	 *
	 * @deprecated Since version 1.28.
	 * To get a group-like visualization the <code>useGroupMode</code> property can be used.
	 * @param {boolean} bValue
	 * @returns {this} Reference to <code>this</code> in order to allow method chaining
	 * @see sap.ui.table.TreeTable#setUseGroupMode
	 * @public
	 */
	TreeTable.prototype.setEnableGrouping = function() {
		Log.warning("The property enableGrouping is not supported by the sap.ui.table.TreeTable control");
		return this;
	};

	/**
	 * The <code>groupBy</code> association is not supported by the <code>TreeTable</code> control.
	 *
	 * @deprecated Since version 1.28.
	 * @returns {sap.ui.core.ID}
	 * @public
	 * @name sap.ui.table.TreeTable#getGroupBy
	 * @function
	 */

	/**
	 * The <code>groupBy</code> association is not supported by the <code>TreeTable</code> control.
	 *
	 * @deprecated Since version 1.28.
	 * @param {sap.ui.table.Column|sap.ui.core.ID} oColumn
	 * @returns {this} Reference to <code>this</code> in order to allow method chaining
	 * @public
	 */
	TreeTable.prototype.setGroupBy = function() {
		Log.warning("The groupBy association is not supported by the sap.ui.table.TreeTable control");
		return this;
	};

	/**
	 * Allows to hide the tree structure (tree icons, indentation) in tree mode (property <code>useGroupMode</code> is set to <code>false</code>).
	 *
	 * This option might be useful in some scenarios when actually a tree table must be used but under certain conditions the data
	 * is not hierarchical, because it contains leafs only.
	 *
	 * <b>Note:</b> In flat mode the user of the table cannot expand or collapse certain nodes and the hierarchy is not
	 * visible to the user. The caller of this function has to ensure to use this option only with non-hierarchical data.
	 *
	 * @param {boolean} bFlat If set to <code>true</code>, the flat mode is enabled
	 *
	 * @returns {this} Reference to <code>this</code> in order to allow method chaining
	 * @protected
	 */
	TreeTable.prototype.setUseFlatMode = function(bFlat) {
		this._bFlatMode = !!bFlat;
		updateHierarchyMode(this);
		return this;
	};

	function updateHierarchyMode(oTable) {
		if (oTable.getUseGroupMode()) {
			TableUtils.Grouping.setHierarchyMode(oTable, TableUtils.Grouping.HierarchyMode.GroupedTree);
		} else if (oTable._bFlatMode) {
			TableUtils.Grouping.setToDefaultFlatMode(oTable);
		} else if (!oTable._bFlatMode) {
			TableUtils.Grouping.setToDefaultTreeMode(oTable);
		}
	}

	TreeTable.prototype._createLegacySelectionPlugin = function() {
		return new BindingSelectionPlugin();
	};

	// If the ODataTreeBindingFlat adapter is applied to the TreeBinding, the adapter fires a dataRequested event on every call of getNodes,
	// even if no request is sent. This can happen if the adapter ignores the request, because it finds out there is a pending request which
	// covers it. When a request is ignored, no dataReceived event is fired.
	// Therefore, a more limited method using a flag has to be used instead of a counter.

	TreeTable.prototype._onBindingDataRequested = function(oEvent) {
		_private(this).bPendingRequest = true;
		Table.prototype._onBindingDataRequested.apply(this, arguments);
	};

	TreeTable.prototype._onBindingDataReceived = function(oEvent) {
		_private(this).bPendingRequest = false;
		Table.prototype._onBindingDataReceived.apply(this, arguments);
	};

	TreeTable.prototype._hasPendingRequests = function() {
		return _private(this).bPendingRequest;
	};

	return TreeTable;
});