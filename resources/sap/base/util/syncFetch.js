/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./fetch","sap/ui/base/SyncPromise"],function(f,S){"use strict";function a(){this.text=t;this.json=j;}function t(){return S.resolve(this.xhr.responseText).unwrap();}function j(){if(this.xhr.responseType==="json"){return S.resolve(this.xhr.response).unwrap();}else{try{return S.resolve(JSON.parse(this.xhr.responseText)).unwrap();}catch(e){return S.reject(e).unwrap();}}}function s(r,i){return f(r,i,{promiseImpl:S,responseMixin:a}).unwrap();}s.ContentTypes=f.ContentTypes;return s;});
