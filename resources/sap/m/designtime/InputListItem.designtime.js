/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";return{aggregations:{content:{domRef:":sap-domref > .sapMLIBContent",actions:{move:"moveControls"}}},actions:{rename:{changeType:"rename",domRef:function(c){return c.$().find(".sapMLIBContent > .sapMILILabel")[0];}}},name:{singular:"LIST_ITEM_BASE_NAME",plural:"LIST_ITEM_BASE_NAME_PLURAL"}};});
