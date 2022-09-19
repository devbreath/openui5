/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./Splitter','./SplitterRenderer',"sap/base/Log"],function(S,a,L){"use strict";var A=S.extend("sap.ui.layout.AssociativeSplitter",{metadata:{associations:{associatedContentAreas:{type:"sap.ui.core.Control",multiple:true,singularName:"associatedContentArea"}}},renderer:a});A.prototype.init=function(){S.prototype.init.call(this);this._keyListeners={increase:this._onKeyboardResize.bind(this,"inc",1),decrease:this._onKeyboardResize.bind(this,"dec",1),increaseMore:this._onKeyboardResize.bind(this,"incMore",2),decreaseMore:this._onKeyboardResize.bind(this,"decMore",2),max:this._onKeyboardResize.bind(this,"max",1),min:this._onKeyboardResize.bind(this,"min",1)};this._enableKeyboardListeners();};A.prototype.addAssociatedContentArea=function(c){this._ensureLayoutData(c);return this.addAssociation("associatedContentAreas",c);};A.prototype._enableKeyboardListeners=function(){S.prototype._enableKeyboardListeners.call(this);this.onsaprightmodifiers=this._keyListeners.increase;this.onsapleftmodifiers=this._keyListeners.decrease;this.onsapupmodifiers=this._keyListeners.decrease;this.onsapdownmodifiers=this._keyListeners.increase;this.onsapright=this._keyListeners.increaseMore;this.onsapdown=this._keyListeners.increaseMore;this.onsapleft=this._keyListeners.decreaseMore;this.onsapup=this._keyListeners.decreaseMore;this.onsapend=this._keyListeners.max;this.onsaphome=this._keyListeners.min;this._keyboardEnabled=true;};A.prototype._getContentAreas=function(){var b=this.getAssociatedContentAreas()||[];var c=this.getContentAreas();var v=b.map(function(i){return sap.ui.getCore().byId(i);}).filter(function(C){return C;});return c.concat(v);};A.prototype.ondblclick=function(e){var i=this.getId(),b,c;if(!(e.target.contains(this._oLastDOMclicked)&&(this._oLastDOMclicked.id.indexOf(i+"-splitbar")>-1))){return;}b=parseInt(this._oLastDOMclicked.id.substr((i+"-splitbar-").length));c=this._getContentAreas()[b];c._currentPosition=this.getCalculatedSizes()[b];c._lastPosition=c._lastPosition||c._currentPosition;if(c._currentPosition===c._lastPosition){this._resizeContents(b,(this.getCalculatedSizes()[b])*-1,true);}else{this._resizeContents(b,c._lastPosition,true);c._lastPosition=null;}};A.prototype._resizeContents=function(l,p,f){var c,o,b,s,d,C,$,n,N,m,M,F,e,D,g=parseFloat(this._move.c1Size).toFixed(5),h=parseFloat(this._move.c2Size).toFixed(5),i=parseFloat(g),j=parseFloat(h);if(isNaN(p)){L.warning("Splitter: Received invalid resizing values - resize aborted.");return;}c=this._getContentAreas();o=c[l].getLayoutData();b=c[l+1].getLayoutData();s=o.getSize();d=b.getSize();C=this.$("content-"+l);$=this.$("content-"+(l+1));n=i+p;N=j-p;m=parseInt(o.getMinSize());M=parseInt(b.getMinSize());if(n<m){D=m-n;p+=D;n=m;N-=D;}else if(N<M){D=M-N;p-=D;N=M;n-=D;}if(f){var k=this._calcAvailableContentSize();if(s==="auto"&&d!=="auto"){e=this._pxToPercent(N,k);b.setSize(e);b._markModified();}else if(s!=="auto"&&d==="auto"){F=this._pxToPercent(n,k);o.setSize(F);o._markModified();}else{F=this._pxToPercent(n,k);e=this._pxToPercent(N,k);o.setSize(F);b.setSize(e);o._markModified();b._markModified();}}else{var t=this._getTotalSize();F=this._pxToPercent(n,t);e=this._pxToPercent(N,t);C.css(this._sizeType,F);$.css(this._sizeType,e);}};A.prototype._calcPercentBasedSizes=function(p,r){var c=this._getContentAreas(),b=this._calcAvailableContentSize();if(p.length===1&&c.length===1){this._calculatedSizes[p[0]]=b;r-=b;}else{r=S.prototype._calcPercentBasedSizes.apply(this,arguments);}var m=c.filter(function(o){return o.getLayoutData().getSize()==="auto";}).reduce(function(s,o){return s+o.getLayoutData().getMinSize();},0);if(r<m){var n=Math.abs(r-m);for(var i=p.length-1;i>=0;i--){var I=p[i],o=c[I],C=this._calculatedSizes[I],l=o.getLayoutData();if(l._isMarked()){var N=C-n;if(N<l.getMinSize()){N=l.getMinSize();}this._calculatedSizes[I]=N;var d=C-N;n-=d;r+=d;}if(n<=0){break;}}}return r;};A.prototype._pxToPercent=function(p,f){return(p*100)/f+"%";};A.prototype._logConstraintsViolated=function(){L.warning("The set sizes and minimal sizes of the splitter contents are bigger than the available space in the UI. "+"Consider enabling the pagination mechanism by setting the 'requiredParentWidth' property of the panes",null,"sap.ui.layout.ResponsiveSplitter");};A.prototype.containsControl=function(c){var C=this._getContentAreas(),o,i;for(i=0;i<C.length;i++){o=C[i];if(o.isA("sap.ui.layout.AssociativeSplitter")){if(o.containsControl(c)){return true;}}else{if(o.getId()===c){return true;}}}};return A;});
