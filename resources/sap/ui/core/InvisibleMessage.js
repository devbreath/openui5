/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./library","sap/ui/base/ManagedObject","sap/base/Log"],function(c,M,L){"use strict";var i;var I=c.InvisibleMessageMode;var a=M.extend("sap.ui.core.InvisibleMessage",{constructor:function(){if(i){L.warning('This is a singleton, therefore you are not able to create another instance of this class.');return i;}i=this;M.apply(this,arguments);}});a.getInstance=function(){if(!i){i=new a("__invisiblemessage",{});}return i;};a.prototype.init=function(){var C=sap.ui.getCore(),s=C.getStaticAreaRef();s.insertAdjacentHTML("beforeend",this.getPoliteInstance());s.insertAdjacentHTML("beforeend",this.getAssertiveInstance());};a.prototype.announce=function(t,m){var C=sap.ui.getCore(),s=C.getStaticAreaRef(),p=s.querySelector(".sapUiInvisibleMessagePolite"),A=s.querySelector(".sapUiInvisibleMessageAssertive");if(!p||!A){return;}var n=m===I.Assertive?A:p;n.textContent="";n.textContent=t;if(m!==I.Assertive&&m!==I.Polite){L.info('You have entered an invalid mode. Valid values are: '+'"Polite" '+'and "Assertive".'+' The framework will automatically set the mode to "Polite".');}setTimeout(function(){if(n.textContent===t){n.textContent="";}},3000);};a.prototype.getPoliteInstance=function(){var s=this.getId();return'<span id="'+s+'-polite'+'" data-sap-ui="'+s+'-polite'+'" class="sapUiInvisibleMessagePolite" role="status" aria-live="polite">'+'</span>';};a.prototype.getAssertiveInstance=function(){var s=this.getId();return'<span id="'+s+'-assertive'+'" data-sap-ui="'+s+'-assertive'+'" class="sapUiInvisibleMessageAssertive" role="status" aria-live="assertive">'+'</span>';};return a;});
