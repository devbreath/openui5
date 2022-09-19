/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["./HashChangerBase","./RouterHashChanger",'sap/ui/thirdparty/hasher',"sap/base/Log","sap/base/util/ObjectPath","sap/ui/performance/trace/Interaction"],function(H,R,h,L,O,I){"use strict";var a=H.extend("sap.ui.core.routing.HashChanger",{constructor:function(){H.apply(this);}});a.prototype.init=function(){if(this._initialized){L.info("this HashChanger instance has already been initialized.");return false;}this._initialized=true;h.changed.add(this.fireHashChanged,this);if(!h.isActive()){h.initialized.addOnce(this.fireHashChanged,this);h.init();}else{this.fireHashChanged(h.getHash());}return this._initialized;};a.prototype.fireHashChanged=function(n,o){this.fireEvent("hashChanged",{newHash:n,oldHash:o});};a.prototype.createRouterHashChanger=function(){if(!this._oRouterHashChanger){var p=this._parseHash(this.getHash());this._oRouterHashChanger=new R({parent:this,hash:p.hash,subHashMap:p.subHashMap});this._registerListenerToRelevantEvents();this._oRouterHashChanger.attachEvent("hashSet",this._onHashModified,this);this._oRouterHashChanger.attachEvent("hashReplaced",this._onHashModified,this);}this._oRouterHashChanger.attachEvent("hashChanged",function(){I.notifyNavigation();});return this._oRouterHashChanger;};a.prototype._registerListenerToRelevantEvents=function(){if(!this._mEventListeners){this._mEventListeners={};this.getRelevantEventsInfo().forEach(function(e){var E=e.name,l=this._onHashChangedForRouterHashChanger.bind(this,e);this._mEventListeners[E]=l;this.attachEvent(E,l,this);}.bind(this));}};a.prototype._deregisterListenerFromRelevantEvents=function(){if(this._mEventListeners){var e=Object.keys(this._mEventListeners);e.forEach(function(E){this.detachEvent(E,this._mEventListeners[E],this);}.bind(this));delete this._mEventListeners;}};a.prototype._onHashChangedForRouterHashChanger=function(e,E){if(this._oRouterHashChanger){var p=e.paramMapping||{},P=p["newHash"]||"newHash",n=E.getParameter(P)||"",o=this._parseHash(n);this._oRouterHashChanger.fireHashChanged(o.hash,o.subHashMap,!!e.updateHashOnly);}};a.prototype._onHashModified=function(e){var E=e.getId(),b=[e.getParameter("hash")],k=[e.getParameter("key")],n=e.getParameter("nestedHashInfo"),d=e.getParameter("deletePrefix")||[];if(Array.isArray(n)){n.forEach(function(o){b.push(o.hash);k.push(o.key);if(Array.isArray(o.deletePrefix)){o.deletePrefix.forEach(function(D){if(d.indexOf(D)===-1){d.push(D);}});}});}if(E==="hashSet"){this._setSubHash(k,b,d);}else{this._replaceSubHash(k,b,d);}};a.prototype._setSubHash=function(k,s,c){var b=this._reconstructHash(k,s,c);this.setHash(b);};a.prototype._replaceSubHash=function(k,s,c){var b=this._reconstructHash(k,s,c);this.replaceHash(b);};a.prototype._reconstructHash=function(k,v,d){var p=this.getHash().split("&/"),t=p.shift();k.forEach(function(K,b){if(d){d=d.filter(function(D){return D!==K;});}var V=v[b];if(K===undefined){t=V+"";}else{var f=p.some(function(P,i,p){if(P.startsWith(K)){if(V){p[i]=K+"/"+V;}else{d.push(K);}return true;}});if(!f){p.push(K+"/"+V);}}});if(d&&d.length>0){p=p.filter(function(P){return!d.some(function(s){return P.startsWith(s);});});}p.unshift(t);return p.join("&/");};a.prototype._parseHash=function(s){var p=s.split("&/");return{hash:p.shift(),subHashMap:p.reduce(function(m,P){var S=P.indexOf("/");if(S===-1){m[P]="";}else{m[P.substring(0,S)]=P.substring(S+1);}return m;},{})};};a.prototype.setHash=function(s){H.prototype.setHash.apply(this,arguments);h.setHash(s);};a.prototype.replaceHash=function(s){H.prototype.replaceHash.apply(this,arguments);h.replaceHash(s);};a.prototype.getHash=function(){return h.getHash();};a.prototype.getRelevantEventsInfo=function(){return[{name:"hashChanged",paramMapping:{fullHash:"newHash"}}];};a.prototype.destroy=function(){if(this._oRouterHashChanger){this._deregisterListenerFromRelevantEvents();this._oRouterHashChanger.destroy();this._oRouterHashChanger=undefined;}delete this._initialized;h.changed.remove(this.fireHashChanged,this);H.prototype.destroy.apply(this,arguments);};a.prototype.deregisterRouterHashChanger=function(){this._deregisterListenerFromRelevantEvents();delete this._oRouterHashChanger;};(function(){var _=null;a.getInstance=function(){if(!_){_=new a();}return _;};function e(o){var E,b,n;for(E in _.mEventRegistry){if(_.mEventRegistry.hasOwnProperty(E)){b=_.mEventRegistry[E];n=o.mEventRegistry[E];if(n){o.mEventRegistry[E]=b.concat(n);}else{o.mEventRegistry[E]=b;}}}}a.replaceHashChanger=function(o){if(_&&o){var g=O.get("sap.ui.core.routing.History.getInstance"),b;if(g){b=g();b._setHashChanger(o);}if(_._oRouterHashChanger){_._oRouterHashChanger.detachEvent("hashSet",_._onHashModified,_);_._oRouterHashChanger.detachEvent("hashReplaced",_._onHashModified,_);_._deregisterListenerFromRelevantEvents();o._oRouterHashChanger=_._oRouterHashChanger;o._oRouterHashChanger.parent=o;delete _._oRouterHashChanger;o._oRouterHashChanger.attachEvent("hashSet",o._onHashModified,o);o._oRouterHashChanger.attachEvent("hashReplaced",o._onHashModified,o);o._registerListenerToRelevantEvents();}e(o);_.destroy();}_=o;};}());return a;});
