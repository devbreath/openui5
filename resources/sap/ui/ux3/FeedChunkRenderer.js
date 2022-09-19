/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/theming/Parameters","sap/base/security/encodeXML","sap/base/security/URLListValidator"],function(P,e,U){"use strict";var F={};F.render=function(r,c){if(c.getParent()instanceof sap.ui.ux3.FeedChunk){c.bComment=true;}else{c.bComment=false;}var m=c.getId();r.write('<article');r.writeControlData(c);r.addClass('sapUiFeedChunk');if(c.bComment){r.addClass('sapUiFeedChunkComment');}r.writeClasses();r.write('>');r.write('<img id='+m+'-thumb');var t=c.getThumbnailSrc();if(!t){t=P._getThemeImage('_sap_ui_ux3_FeedChunk_PersonPlaceholder');}r.writeAttributeEscaped('src',t);r.writeAttributeEscaped('alt',c.getSender());r.writeClasses();r.write('>');r.write('<div class= "sapUiFeedChunkText" >');r.write('<a id='+m+'-sender ');r.writeAttribute('href','#');r.write('>');r.writeEscaped(c.getSender());r.write('</a> ');if(c.oHCMMenuButton){r.renderControl(c.oHCMMenuButton);}this.renderText(r,c);r.write('</div>');if(!c.bComment){r.write('<ul class= "sapUiFeedChunkStatusIcons" >');if(c.getFlagged()){r.write('<li class= "sapUiFeedChunkFlagged" title="'+c.rb.getText('FEED_FLAGGED')+'" >&#9873</li>');}if(c.getFavorite()){r.write('<li class= "sapUiFeedChunkFavorite" title="'+c.rb.getText('FEED_FAVORITE')+'" >&#9733</li>');}if(c.getShared()){r.write('<li class= "sapUiFeedChunkShared" title="'+c.rb.getText('FEED_SHARED')+'" >&#8635</li>');}r.write('</ul>');}r.write('<span class= "sapUiFeedChunkByline" >');r.writeEscaped(c.getTimestamp());r.write('</span>');if(!c.bComment){if(c.oToolsButton){r.renderControl(c.oToolsButton);}if(c.getEnableShare()){r.write('<button type = "button" id='+m+'-ActShare class= "sapUiFeedChunkAct sapUiFeedChunkActShare" title="'+c.rb.getText('FEED_ACT_SHARE')+'" >&#8635</BUTTON>');}if(c.getEnableInspect()){r.write('<button type = "button" id='+m+'-ActInspect class= "sapUiFeedChunkAct sapUiFeedChunkActInspect" title="'+c.rb.getText('FEED_ACT_INSPECT')+'" >i</BUTTON>');}if(c.getEnableFavorite()){r.write('<button type = "button" id='+m+'-ActFavorite class= "sapUiFeedChunkAct sapUiFeedChunkActFavorite" title="'+c.rb.getText('FEED_ACT_FAVORITE')+'" >&#9733</BUTTON>');}if(c.getEnableFlag()){r.write('<button type = "button" id='+m+'-ActFlag class= "sapUiFeedChunkAct sapUiFeedChunkActFlag" title="'+c.rb.getText('FEED_ACT_FLAG')+'" >&#9873</BUTTON>');}if(c.getEnableComment()){r.write('<button type = "button" id='+m+'-ActComment class= "sapUiFeedChunkAct sapUiFeedChunkActComment" title="'+c.rb.getText('FEED_ACT_COMMENT')+'" >C</BUTTON>');}}if(c.getDeletionAllowed()&&c.bComment){r.write('<button type = "button" id='+m+'-delete class= "sapUiFeedChunkDel" title="'+c.rb.getText('FEED_DELETE')+'" >X</BUTTON>');}if(c.getComments().length>0||c.showCommentFeeder){r.write("<section>");this.renderComments(r,c);r.write("</section>");}r.write('</article>');};F.renderText=function(r,c){var t=c.getText();var i=0;var p=0;do{p=t.search(/\s/);var s="",w="";if(p<0){w=t;}else{w=t.slice(0,p);s=t.slice(p,p+1);t=t.slice(p+1);}if(/^@/.test(w)){r.write('<a id='+c.getId()+'-Ref'+i);r.writeAttribute('href','#');r.write('>');r.writeEscaped(w,true);r.write('</a>',s);i++;}else if(/^(https?|ftp):\/\//i.test(w)&&U.validate(w)){r.write('<a');r.writeAttribute('href',e(w));r.write('>');r.writeEscaped(w,true);r.write('</a>',s);}else if(/^(www\.)/i.test(w)&&U.validate("http://"+w)){r.write('<a');r.writeAttribute('href',e("http://"+w));r.write('>');r.writeEscaped(w,true);r.write('</a>',s);}else if(/^[\w\.=-]+@[\w\.-]+\.[\w]{2,5}$/.test(w)){r.write('<a');r.writeAttribute('href',"mailto:"+e(w));r.write('>');r.writeEscaped(w,true);r.write('</a>',s);}else{r.writeEscaped(w+s,true);}}while(p>=0);};F.renderComments=function(r,c){var C=c.getComments();var l=C.length;r.write('<header class= "sapUiFeedChunkComments" >');if(c.rb){r.write(c.rb.getText('FEED_NO_COMMENTS',[l]));if(l>c.maxComments){r.write('<a id='+c.getId()+'-all ');r.writeAttribute('href','#');r.write('>');if(!c.allComments){r.write(c.rb.getText('FEED_ALL_COMMENTS'));}else{r.write(c.rb.getText('FEED_MAX_COMMENTS'));}r.write('</a>');}}r.write("</header>");var n=l;if(!c.allComments&&c.maxComments<n){n=c.maxComments;}for(var i=0;i<n;i++){r.renderControl(C[l-n+i]);}if(c.oCommentFeeder){r.renderControl(c.oCommentFeeder);}};F.renderExpander=function(c){if(c.expanded){return"<button id= '"+c.getId()+"-exp' class='sapUiFeedChunkCollapse' title='"+c.rb.getText("FEED_COLLAPS")+"'>&#9660</button>";}else{return"<button id= '"+c.getId()+"-exp' class='sapUiFeedChunkExpand' title='"+c.rb.getText("FEED_EXPAND")+"'>&#9660</button>";}};return F;},true);
