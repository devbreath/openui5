/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/rta/util/changeVisualization/categories/RenameVisualization","sap/ui/rta/util/changeVisualization/categories/MoveVisualization","sap/ui/rta/util/changeVisualization/categories/CombineVisualization","sap/ui/rta/util/changeVisualization/categories/SplitVisualization"],function(R,M,C,S){"use strict";var c={rename:R,move:M,combine:C,split:S};return function(i){var s=i.commandName;if(s==="settings"){s=i.commandCategory;}return c[s];};});
