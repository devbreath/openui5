/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/fl/write/_internal/Storage","sap/ui/fl/Change"],function(S,C){"use strict";var a;a={createOrUpdateCodeExtChange:function(p,o){if(!p.content||!p.content.codeRef){throw new Error("no code reference passed for the code extension change");}if(!p.selector||!p.selector.id){throw new Error("no controller name passed for the code extension change");}if(!p.reference){throw new Error("no reference passed for the code extension change");}p.changeType=p.changeType||"codeExt";var c=C.createInitialFileContent(p);return S.write({layer:c.layer,transport:o.transportId,flexObjects:[c]});},createCodeExtChanges:function(c,o){c=c||[];if(c.length===0){return Promise.resolve();}var p=[];c.forEach(function(b){b.changeType=b.changeType||"codeExt";b.packageName=o.packageName;b.content={codeRef:o.codeRef};p.push(C.createInitialFileContent(b));});return S.write({layer:p[0].layer,transport:o.transportId,flexObjects:p});},deleteCodeExtChange:function(c,o){if(c.changeType!=="codeExt"||c.fileType!=="change"){throw new Error("the change is not of type 'code extension'");}if(!c.fileName){throw new Error("the extension does not contains a file name");}if(c.namespace===undefined){throw new Error("the extension does not contains a namespace");}return S.remove({layer:c.layer,transport:o.transportId,flexObject:c});}};return a;});
