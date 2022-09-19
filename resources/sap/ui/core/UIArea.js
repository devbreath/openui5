/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['sap/ui/base/ManagedObject','./Element','./RenderManager','./FocusHandler','sap/ui/performance/trace/Interaction',"sap/ui/util/ActivityDetection","sap/ui/events/KeyCodes","sap/base/Log","sap/base/assert","sap/ui/performance/Measurement",'sap/ui/events/jquery/EventExtension',"sap/ui/events/ControlEvents","sap/ui/events/F6Navigation","sap/ui/thirdparty/jquery","sap/ui/dom/jquery/control"],function(M,E,R,F,I,A,K,L,a,b,c,C,d,q){"use strict";c.apply();q(document).on("keydown",function(e){d.handleF6GroupNavigation(e,null);});var r=L.getLogger("sap.ui.Rendering",((window["sap-ui-config"]&&(window["sap-ui-config"]["xx-debugRendering"]||window["sap-ui-config"]["xx-debugrendering"]))||/sap-ui-xx-debug(R|-r)endering=(true|x|X)/.test(document.location.search))?L.Level.DEBUG:Math.min(L.Level.INFO,L.getLevel())),D=function(o){return o;},f=function(){},g=function(){};if(r.isLoggable()){D=function(o){var l;try{throw new Error();}catch(e){l=e.stack||e.stacktrace||(e.sourceURL?e.sourceURL+":"+e.line:null);l=l?l.split(/\n\s*/g).slice(2):undefined;}return{obj:o,location:l};};f=function(t,m){var o=sap.ui.getCore(),e={},n,i;for(n in m){i=o.byId(n);e[n]={type:i?i.getMetadata().getName():(m[n].obj===t?"UIArea":"(no such control)"),location:m[n].location,reason:m[n].reason};}r.debug("  UIArea '"+t.getId()+"', pending updates: "+JSON.stringify(e,null,"\t"));};g=function(B,m){var n;for(n in m){if(B[n]!=null){if(B[n].obj!==m[n].obj){m[n].reason="replaced during rendering";}else{m[n].reason="invalidated again during rendering";}}else{m[n].reason="invalidated during rendering";}}};}var U=M.extend("sap.ui.core.UIArea",{constructor:function(o,e){if(arguments.length===0){return;}M.apply(this);this.oCore=o;this.bLocked=false;this.bInitial=true;this.aContentToRemove=[];this.bNeedsRerendering=false;if(e!=null){this.setRootNode(e);this.bNeedsRerendering=this.bNeedsRerendering&&!document.getElementById(e.id+"-Init");}this.mInvalidatedControls={};if(!this.bNeedsRerendering){this.bRenderSelf=false;}else{this.oCore.addInvalidatedUIArea(this);}},metadata:{publicMethods:["setRootNode","getRootNode","setRootControl","getRootControl","lock","unlock","isLocked","_handleEvent"],aggregations:{content:{name:"content",type:"sap.ui.core.Control",multiple:true,singularName:"content"},dependents:{name:"dependents",type:"sap.ui.core.Control",multiple:true}}},insertDependent:function(e,i){return this.insertAggregation("dependents",e,i,true);},addDependent:function(e){return this.addAggregation("dependents",e,true);},removeDependent:function(e){return this.removeAggregation("dependents",e,true);},removeAllDependents:function(){return this.removeAllAggregation("dependents",true);},destroyDependents:function(){return this.destroyAggregation("dependents",true);}});U.prototype.isInvalidateSuppressed=function(){return this.iSuppressInvalidate>0;};U.prototype.getId=function(){return this.oRootNode?this.oRootNode.id:null;};U.prototype.getUIArea=function(){return this;};U.prototype.setRootNode=function(o){if(this.oRootNode===o){return;}a(!o||(o.nodeType===1&&!q(o).attr("data-sap-ui-area")),"UIArea root node must be a DOMElement");if(this.oRootNode){this._ondetach();}this.oRootNode=o;if(this.getContent().length>0){this.invalidate();}if(this.oRootNode){this._onattach();}};U.prototype.getRootNode=function(){return this.oRootNode;};U.prototype.setRootControl=function(o){this.removeAllContent();this.addContent(o);};U.prototype.getRootControl=function(i){var e=this.getContent();if(e.length>0){if(i>=0&&i<e.length){return e[i];}return e[0];}return null;};U.prototype._addRemovedContent=function(o){if(this.oRootNode&&o){this.aContentToRemove.push(o);}};U.prototype.addContent=function(o,_){this.addAggregation("content",o,_);if(_!==true){this.invalidate();}return this;};U.prototype.removeContent=function(e,_){var o=this.removeAggregation("content",e,_);if(!_){var i;if(o&&o.getDomRef){i=o.getDomRef();}this._addRemovedContent(i);}return o;};U.prototype.removeAllContent=function(){var e=this.removeAllAggregation("content");for(var i=0;i<e.length;i++){var o;var j=e[i];if(j&&j.getDomRef){o=j.getDomRef();}this._addRemovedContent(o);}return e;};U.prototype.destroyContent=function(){var e=this.getContent();for(var i=0;i<e.length;i++){var o;var j=e[i];if(j&&j.getDomRef){o=j.getDomRef();}this._addRemovedContent(o);}this.destroyAggregation("content");return this;};U.prototype.lock=function(){this.bLocked=true;};U.prototype.unlock=function(){if(this.bLocked&&this.bNeedsRerendering){this.oCore.addInvalidatedUIArea(this);}this.bLocked=false;};U.prototype.isLocked=function(){return this.bLocked;};U.prototype.getBindingContext=function(){return null;};U.prototype.getEventingParent=function(){return this.oCore._getEventProvider();};U.prototype.isActive=function(){return!!this.getId()&&document.getElementById(this.getId())!=null;};U.prototype.invalidate=function(){this.addInvalidatedControl(this);};U.prototype.addInvalidatedControl=function(o){if(this.bRenderSelf){return;}if(!this.bNeedsRerendering){this.oCore.addInvalidatedUIArea(this);}var i=o.getId();if(o===this){this.bRenderSelf=true;this.bNeedsRerendering=true;this.mInvalidatedControls={};this.mInvalidatedControls[i]=D(this);return;}if(this.mInvalidatedControls[i]){return;}if(!this.bRenderSelf){this.mInvalidatedControls[i]=D(o);this.bNeedsRerendering=true;}};U.prototype.rerender=function(j){var t=this;function k(){t.bRenderSelf=false;t.aContentToRemove=[];t.mInvalidatedControls={};t.bNeedsRerendering=false;}if(j){this.bNeedsRerendering=true;}if(this.bLocked||!this.bNeedsRerendering){return false;}var l=this.bRenderSelf,m=this.aContentToRemove,o=this.mInvalidatedControls,u=false;k();b.pause("renderPendingUIUpdates");b.start(this.getId()+"---rerender","Rerendering of "+this.getMetadata().getName());f(this,o);if(l){if(this.oRootNode){r.debug("Full Rendering of UIArea '"+this.getId()+"'");R.preserveContent(this.oRootNode,false,this.bInitial);this.bInitial=false;var s=function(H,J){var y=H.length;var N;for(var i=0;i<y;i++){N=J?H[i].getDomRef():H[i];if(N&&!R.isPreservedContent(N)&&t.oRootNode===N.parentNode){q(N).remove();}}return y;};var w=document.activeElement;var S=F.getControlFocusInfo();s(m);var x=this.getContent();var y=s(x,true);var z=document.activeElement;for(var i=0;i<y;i++){if(x[i]&&x[i].getParent()===this){this.oCore.oRenderManager.render(x[i],this.oRootNode,true);}}u=true;if(w&&w!=z&&z===document.activeElement){try{F.restoreFocus(S);}catch(e){L.warning("Problems while restoring the focus after full UIArea rendering: "+e,null,this);}}}else{r.debug("Full Rendering of UIArea '"+this.getId()+"' postponed, no root node");}}else{var B=function(H){for(;;){if(H.getMetadata&&H.getMetadata().isInstanceOf("sap.ui.core.PopupInterface")){break;}H=H.getParent();if(!H||H===t){return false;}if(o.hasOwnProperty(H.getId())){return true;}}};for(var n in o){var G=this.oCore.byId(n);if(G&&!B(G)){G.rerender();u=true;}}}g(o,this.mInvalidatedControls);b.end(this.getId()+"---rerender");b.resume("renderPendingUIUpdates");return u;};U.prototype._onControlRendered=function(o){var i=o.getId();if(this.mInvalidatedControls[i]){delete this.mInvalidatedControls[i];}};U.rerenderControl=function(o){var e=null;if(o){e=o.getDomRef();if(!e||R.isPreservedContent(e)){e=document.getElementById(R.RenderPrefixes.Invisible+o.getId());}}var i=e&&e.parentNode;if(i){var u=o.getUIArea();var j=u?u.oCore.oRenderManager:sap.ui.getCore().createRenderManager();r.debug("Rerender Control '"+o.getId()+"'"+(u?"":" (using a temp. RenderManager)"));R.preserveContent(e,true,false,o);j.render(o,i);}else{var u=o.getUIArea();u&&u._onControlRendered(o);r.warning("Couldn't rerender '"+o.getId()+"', as its DOM location couldn't be determined");}};var h=/^(mousedown|mouseup|click|keydown|keyup|keypress|touchstart|touchend|tap)$/;var p=[],P=[];var v={mousemove:1,mouseover:1,mouseout:1,scroll:1,dragover:1,dragenter:1,dragleave:1};U.addEventPreprocessor=function(e){p.push(e);};U.getEventPreprocessors=function(){return p;};U.addEventPostprocessor=function(e){P.push(e);};U.getEventPostprocessors=function(){return P;};U.configureEventLogging=function(e){Object.assign(v,e);return Object.assign({},v);};U.prototype._handleEvent=function(e){var t,o,j;t=o=q(e.target).control(0);A.refresh();if(t==null){return;}if(e.isMarked("delayedMouseEvent")){return;}var H=e.getMark("handledByUIArea"),s=this.getId();if(H&&H!==s){e.setMark("firstUIArea",false);return;}e.setMarked("firstUIArea");e.srcControl=t;if(e.type==="contextmenu"&&e.shiftKey&&e.altKey&&(e.metaKey||e.ctrlKey)){L.info("Suppressed forwarding the contextmenu event as control event because CTRL+SHIFT+ALT is pressed!");return;}p.forEach(function(w){w(e);});this.oCore._handleControlEvent(e,s);if(this.bLocked||this.oCore.isLocked()){return;}if(I.getActive()){j=e.type.match(h);if(j){I.notifyEventStart(e);}}var k=[];if(e.getPseudoTypes){k=e.getPseudoTypes();}k.push(e.type);var G=false;while(o instanceof E&&o.isActive()&&!e.isPropagationStopped()){var S=e.getMark("scopeCheckId"),l=S&&window.document.getElementById(S),m=o.getDomRef();if(!l||(m&&m.contains(l))){for(var i=0,n=k.length;i<n;i++){var T=k[i];e.type=T;e.currentTarget=o.getDomRef();o._handleEvent(e);if(e.isImmediatePropagationStopped()){break;}}if(!G&&!e.isMarked("enterKeyConsumedAsContent")){G=this._handleGroupChange(e,o);}if(e.isPropagationStopped()){break;}if(o.bStopEventBubbling){break;}m=o.getDomRef();if(!m){break;}}m=m.parentNode;o=null;if(e.isMarked("fromMouseout")&&(m&&m.contains(e.relatedTarget))){break;}while(m&&m!==this.getRootNode()){if(m.id){o=q(m).control(0);if(o){break;}}m=m.parentNode;}}P.forEach(function(w){w(e);});if(j){I.notifyEventEnd(e);}e.currentTarget=this.getRootNode();e.setMark("handledByUIArea",s);if(e.isPropagationStopped()){L.debug("'"+e.type+"' propagation has been stopped");}var u=e.type;if(!v[u]){if(t){L.debug("Event fired: '"+u+"' on "+t,"","sap.ui.core.UIArea");}else{L.debug("Event fired: '"+u+"'","","sap.ui.core.UIArea");}}};U.prototype._onattach=function(){var o=this.getRootNode();if(o==null){return;}q(o).attr("data-sap-ui-area",o.id).on(C.events.join(" "),this._handleEvent.bind(this));};U.prototype._ondetach=function(){var o=this.getRootNode();if(o==null){return;}q(o).removeAttr("data-sap-ui-area").off();};U.prototype.clone=function(){throw new Error("UIArea can't be cloned");};U.prototype._handleGroupChange=function(e,o){var k=U._oFieldGroupValidationKey;if(e.type==="focusin"||e.type==="focusout"){if(e.type==="focusout"){o=q(document.activeElement).control(0);}if(U._iFieldGroupDelayTimer){clearTimeout(U._iFieldGroupDelayTimer);U._iFieldGroupDelayTimer=null;}U._iFieldGroupDelayTimer=setTimeout(this.setFieldGroupControl.bind(this,o),0);return true;}else if(this.getFieldGroupControl()&&e.type==="keyup"&&e.keyCode===k.keyCode&&e.shiftKey===k.shiftKey&&e.altKey===k.altKey&&e.ctrlKey===k.ctrlKey){if(U._iFieldGroupTriggerDelay){clearTimeout(U._iFieldGroupTriggerDelay);}var i=this.getFieldGroupControl(),j=(i?i._getFieldGroupIds():[]);if(j.length>0){i.triggerValidateFieldGroup(j);}return true;}return false;};U.prototype.setFieldGroupControl=function(e){var o=e;while(o&&!(o instanceof E&&o.isA("sap.ui.core.Control"))){o=o.getParent();}var i=this.getFieldGroupControl();if(o!=i){var j=(i?i._getFieldGroupIds():[]),n=(o?o._getFieldGroupIds():[]),t=j.filter(function(s){return n.indexOf(s)<0;});if(t.length>0){i.triggerValidateFieldGroup(t);}U._oFieldGroupControl=o;}return this;};U.prototype.getFieldGroupControl=function(){if(U._oFieldGroupControl&&!U._oFieldGroupControl.bIsDestroyed){return U._oFieldGroupControl;}return null;};U._oFieldGroupControl=null;U._iFieldGroupDelayTimer=null;U._oFieldGroupValidationKey={keyCode:K.ENTER,shiftKey:false,altKey:false,ctrlKey:false};U._oRenderLog=r;return U;});
