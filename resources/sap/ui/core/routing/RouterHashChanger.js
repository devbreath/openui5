/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./HashChangerBase'],function(H){"use strict";var R=H.extend("sap.ui.core.routing.RouterHashChanger",{constructor:function(s){if(!s||!s.parent){throw new Error("sap.ui.core.routing.RouterHashChanger can't be instantiated without a parent");}this.parent=s.parent;this.hash=s.hash||"";this.subHashMap=s.subHashMap;this.key=s.key||"";H.apply(this);}});R.InvalidHash=Object.create(null);R.prototype.init=function(){this.parent.init();};R.prototype._generatePrefixedKey=function(k){return this.key?(this.key+"-"+k):k;};R.prototype.createSubHashChanger=function(k){this.children=this.children||{};var p=this._generatePrefixedKey(k);if(this.children[p]){return this.children[p];}var c=new R({key:p,parent:this,subHashMap:this.subHashMap,hash:(this.subHashMap&&this.subHashMap[p])||""});c.attachEvent("hashSet",this._onChildHashChanged.bind(this,p));c.attachEvent("hashReplaced",this._onChildHashChanged.bind(this,p));this.children[p]=c;return c;};R.prototype.fireHashChanged=function(h,s,u){var k,o=this.hash;this.hash=h;this.subHashMap=s;if(!u&&h!==o){this.fireEvent("hashChanged",{newHash:h,oldHash:o});}if(this.children){k=Object.keys(this.children);k.forEach(function(c){var C=(s[c]===undefined?"":s[c]);this.children[c].fireHashChanged(C,s,u);}.bind(this));}};R.prototype._onChildHashChanged=function(k,e){var c=e.getParameter("key")||k,h=e.getParameter("hash"),n=e.getParameter("nestedHashInfo"),d=e.getParameter("deletePrefix");if(this._bCollectMode){this._collectHash(c,h,d);}else{this.fireEvent(e.getId(),{hash:h,key:c,nestedHashInfo:n,deletePrefix:d});}};R.prototype._collectHash=function(k,h,d){this._aCollectedHashInfo=this._aCollectedHashInfo||[];this._aCollectedHashInfo.push({key:k,hash:h,deletePrefix:d});};R.prototype._hasRouterAttached=function(){return this.hasListeners("hashChanged");};R.prototype._collectActiveDescendantPrefix=function(){if(this.children){var k=Object.keys(this.children);return k.reduce(function(p,K){var c=this.children[K];if(c._hasRouterAttached()){p.push(K);Array.prototype.push.apply(p,c._collectActiveDescendantPrefix());}return p;}.bind(this),[]);}else{return[];}};R.prototype.getHash=function(){if(this._isUnderCollectMode()){return R.InvalidHash;}else{return this.hash;}};R.prototype._setActiveRouter=function(r){if(r.getHashChanger()===this){this._oActiveRouter=r;}return this;};R.prototype.resetHash=function(r){if(r&&this._oActiveRouter===r){this.hash=undefined;}return this;};R.prototype.setHash=function(h,p,s){if(!(p instanceof Promise)){s=p;p=null;}return this._modifyHash(h,p,s);};R.prototype.replaceHash=function(h,d,p,s){if(typeof d!=="string"){s=p;p=d;d=undefined;}if(!(p instanceof Promise)){s=p;p=null;}return this._modifyHash(h,p,s,true,d);};R.prototype._modifyHash=function(h,p,s,r,d){var e=r?"hashReplaced":"hashSet",t=this,P={hash:h};if(r&&d){P.direction=d;}if(!s){P.deletePrefix=this._collectActiveDescendantPrefix();}if(p){this._bCollectMode=true;return p.then(function(){P.nestedHashInfo=t._aCollectedHashInfo;t.fireEvent(e,P);t._aCollectedHashInfo=null;t._bCollectMode=false;});}else{this.fireEvent(e,P);}};R.prototype._isUnderCollectMode=function(){return this.parent instanceof R&&this.parent._isInCollectMode();};R.prototype._isInCollectMode=function(){return this._bCollectMode||(this.parent instanceof R&&this.parent._isInCollectMode());};R.prototype.destroy=function(){this.parent.deregisterRouterHashChanger(this);if(this.children){Object.keys(this.children).forEach(function(k){var c=this.children[k];c.destroy();}.bind(this));delete this.children;}delete this.hash;delete this.subHashMap;delete this.parent;delete this.key;H.prototype.destroy.apply(this,arguments);};R.prototype.deregisterRouterHashChanger=function(r){if(this.children){Object.keys(this.children).some(function(k){var c=this.children[k];if(c===r){delete this.children[k];return true;}}.bind(this));}};return R;});
