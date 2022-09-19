/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/mdc/actiontoolbar/ActionToolbarAction","../Util"],function(A,U){"use strict";var d={description:"{description}",name:"{name}",aggregations:{action:{propagateMetadata:function(i){return{actions:{rename:{changeType:"rename",domRef:function(c){return c.$();},getTextMutators:function(c){return{getText:function(){return c.getDomRef().textContent;},setText:function(n){c.getDomRef().textContent=n;}};}},remove:null,reveal:null}};}}},properties:{},actions:{}},a=["action"],b=[];return U.getDesignTime(A,b,a,d);});
