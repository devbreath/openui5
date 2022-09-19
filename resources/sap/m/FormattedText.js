/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(['./library','sap/ui/core/library','sap/ui/core/Control','./FormattedTextAnchorGenerator','./FormattedTextRenderer',"sap/base/Log","sap/base/security/URLListValidator","sap/base/security/sanitizeHTML","sap/ui/util/openWindow",'sap/ui/core/Core'],function(l,c,C,F,a,L,U,s,o,b){"use strict";var d=l.LinkConversion,T=c.TextDirection,e=c.TextAlign;var f=C.extend("sap.m.FormattedText",{metadata:{library:"sap.m",properties:{htmlText:{type:"string",group:"Misc",defaultValue:""},width:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},convertLinksToAnchorTags:{type:"sap.m.LinkConversion",group:"Behavior",defaultValue:d.None},convertedLinksDefaultTarget:{type:"string",group:"Behavior",defaultValue:"_blank"},height:{type:"sap.ui.core.CSSSize",group:"Appearance",defaultValue:null},textDirection:{type:"sap.ui.core.TextDirection",group:"Appearance",defaultValue:T.Inherit},textAlign:{type:"sap.ui.core.TextAlign",group:"Appearance",defaultValue:e.Begin}},aggregations:{controls:{type:"sap.m.Link",multiple:true,singularName:"control"}}}});var _={ATTRIBS:{'style':1,'class':1,'a::href':1,'a::target':1,'dir':1},ELEMENTS:{'a':{cssClass:'sapMLnk'},'abbr':1,'bdi':1,'blockquote':1,'br':1,'cite':1,'code':1,'em':1,'h1':{cssClass:'sapMTitle sapMTitleStyleH1'},'h2':{cssClass:'sapMTitle sapMTitleStyleH2'},'h3':{cssClass:'sapMTitle sapMTitleStyleH3'},'h4':{cssClass:'sapMTitle sapMTitleStyleH4'},'h5':{cssClass:'sapMTitle sapMTitleStyleH5'},'h6':{cssClass:'sapMTitle sapMTitleStyleH6'},'p':1,'pre':1,'strong':1,'span':1,'u':1,'dl':1,'dt':1,'dd':1,'ol':1,'ul':1,'li':1}},g={ATTRIBS:{'a::href':1,'a::target':1},ELEMENTS:{'a':{cssClass:'sapMLnk'},'br':1,'em':1,'strong':1,'u':1}};f.prototype._renderingRules=_;f.prototype.init=function(){};function S(t,k){var w;var m,v,n=t==="a";var q=this._renderingRules.ELEMENTS[t].cssClass||"";for(var i=0;i<k.length;i+=2){m=k[i];v=k[i+1];if(!this._renderingRules.ATTRIBS[m]&&!this._renderingRules.ATTRIBS[t+"::"+m]){w='FormattedText: <'+t+'> with attribute ['+m+'="'+v+'"] is not allowed';L.warning(w,this);k[i+1]=null;continue;}if(m=="href"){if(!U.validate(v)){L.warning("FormattedText: incorrect href attribute:"+v,this);k[i+1]="#";n=false;}}if(m=="target"){n=false;}if(q&&m.toLowerCase()=="class"){k[i+1]=q+" "+v;q="";}}if(n){k.push("target");k.push("_blank");}if(q){k.push("class");k.push(q);}return k;}function p(t,i){if(this._renderingRules.ELEMENTS[t]){return S.call(this,t,i);}else{var w='<'+t+'> is not allowed';L.warning(w,this);}}function h(t){return s(t,{tagPolicy:p.bind(this),uriRewriter:function(u){if(U.validate(u)){return u;}}});}function j(E){E.preventDefault();var i=b.byId(E.currentTarget.id);if(i&&i.isA('sap.m.Link')&&i.getAccessibleRole()===l.LinkAccessibleRole.Button){return;}o(E.currentTarget.href,E.currentTarget.target);}f.prototype.onAfterRendering=function(){this.$().find('a').on("click",j);};f.prototype.onBeforeRendering=function(){this.$().find('a').off("click",j);};f.prototype._getDisplayHtml=function(){var t=this.getHtmlText(),A=this.getConvertLinksToAnchorTags();if(A===d.None){return t;}t=F.generateAnchors(t,A,this.getConvertedLinksDefaultTarget());return h.call(this,t);};f.prototype.setHtmlText=function(t){return this.setProperty("htmlText",h.call(this,t));};f.prototype._setUseLimitedRenderingRules=function(i){this._renderingRules=i?g:_;};f.prototype.getFocusDomRef=function(){return this.getDomRef()&&this.getDomRef().querySelector("a");};return f;});
