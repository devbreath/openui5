/*!
* OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
*/
sap.ui.define(["sap/base/Log","sap/ui/base/ManagedObject","sap/ui/testrecorder/CommunicationBus"],function(L,M,C){"use strict";var u=null;var c=null;var r=null;var R=null;var a=M.extend("sap.ui.testrecorder.Recorder",{constructor:function(){if(!R){M.apply(this,arguments);}else{L.warning("Only one Recorder allowed");return R;}}});a.prototype.start=function(t){if(this._hasStarted){return;}this._hasStarted=true;this._testRecorderConfig=t||sap.ui.getCore().getConfiguration().getTestRecorderMode();if(this._testRecorderConfig&&!this._testRecorderConfig.indexOf("silent")>-1&&!this._isInIframe()){sap.ui.require(["sap/ui/testrecorder/UIContextInjector","sap/ui/testrecorder/inspector/ControlInspector","sap/ui/testrecorder/interaction/RecordListener"],function(U,b,d){u=U;c=b;r=d;u.injectFrame(this._testRecorderConfig,this._stop.bind(this));C.allowFrame(u.getCommunicationInfo());c.init();r.init();}.bind(this));}};a.prototype._stop=function(){this._hasStarted=false;c.stop();r.stop();};a.prototype._isInIframe=function(){try{if(window.self!==window.top){var t="#sap-ui-test-recorder-frame";if(window.top.$&&window.top.$(t).length&&window.top.$(t)[0].contentWindow===window.self){return true;}else{return false;}}}catch(e){return true;}};R=new a();return R;},true);
