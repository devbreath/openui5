/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/integration/designtime/baseEditor/validator/IsPatternMatch"],function(I){"use strict";return{async:false,errorMessage:"BASE_EDITOR.VALIDATOR.FAILED_PATTERN_TEST",validate:function(v,c){return(v||[]).every(function(V){return I.validate(V,c);});}};});
