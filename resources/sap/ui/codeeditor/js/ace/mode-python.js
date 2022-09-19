ace.define("ace/mode/python_highlight_rules",[],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text_highlight_rules").TextHighlightRules;var P=function(){var k=("and|as|assert|break|class|continue|def|del|elif|else|except|exec|"+"finally|for|from|global|if|import|in|is|lambda|not|or|pass|print|"+"raise|return|try|while|with|yield|async|await|nonlocal");var b=("True|False|None|NotImplemented|Ellipsis|__debug__");var a=("abs|divmod|input|open|staticmethod|all|enumerate|int|ord|str|any|"+"eval|isinstance|pow|sum|basestring|execfile|issubclass|print|super|"+"binfile|bin|iter|property|tuple|bool|filter|len|range|type|bytearray|"+"float|list|raw_input|unichr|callable|format|locals|reduce|unicode|"+"chr|frozenset|long|reload|vars|classmethod|getattr|map|repr|xrange|"+"cmp|globals|max|reversed|zip|compile|hasattr|memoryview|round|"+"__import__|complex|hash|min|apply|delattr|help|next|setattr|set|"+"buffer|dict|hex|object|slice|coerce|dir|id|oct|sorted|intern|"+"ascii|breakpoint|bytes");var c=this.createKeywordMapper({"invalid.deprecated":"debugger","support.function":a,"variable.language":"self|cls","constant.language":b,"keyword":k},"identifier");var s="[uU]?";var d="[rR]";var f="[fF]";var g="(?:[rR][fF]|[fF][rR])";var h="(?:(?:[1-9]\\d*)|(?:0))";var i="(?:0[oO]?[0-7]+)";var j="(?:0[xX][\\dA-Fa-f]+)";var l="(?:0[bB][01]+)";var n="(?:"+h+"|"+i+"|"+j+"|"+l+")";var p="(?:[eE][+-]?\\d+)";var q="(?:\\.\\d+)";var t="(?:\\d+)";var u="(?:(?:"+t+"?"+q+")|(?:"+t+"\\.))";var v="(?:(?:"+u+"|"+t+")"+p+")";var w="(?:"+v+"|"+u+")";var x="\\\\(x[0-9A-Fa-f]{2}|[0-7]{3}|[\\\\abfnrtv'\"]|U[0-9A-Fa-f]{8}|u[0-9A-Fa-f]{4})";this.$rules={"start":[{token:"comment",regex:"#.*$"},{token:"string",regex:s+'"{3}',next:"qqstring3"},{token:"string",regex:s+'"(?=.)',next:"qqstring"},{token:"string",regex:s+"'{3}",next:"qstring3"},{token:"string",regex:s+"'(?=.)",next:"qstring"},{token:"string",regex:d+'"{3}',next:"rawqqstring3"},{token:"string",regex:d+'"(?=.)',next:"rawqqstring"},{token:"string",regex:d+"'{3}",next:"rawqstring3"},{token:"string",regex:d+"'(?=.)",next:"rawqstring"},{token:"string",regex:f+'"{3}',next:"fqqstring3"},{token:"string",regex:f+'"(?=.)',next:"fqqstring"},{token:"string",regex:f+"'{3}",next:"fqstring3"},{token:"string",regex:f+"'(?=.)",next:"fqstring"},{token:"string",regex:g+'"{3}',next:"rfqqstring3"},{token:"string",regex:g+'"(?=.)',next:"rfqqstring"},{token:"string",regex:g+"'{3}",next:"rfqstring3"},{token:"string",regex:g+"'(?=.)",next:"rfqstring"},{token:"keyword.operator",regex:"\\+|\\-|\\*|\\*\\*|\\/|\\/\\/|%|@|<<|>>|&|\\||\\^|~|<|>|<=|=>|==|!=|<>|="},{token:"punctuation",regex:",|:|;|\\->|\\+=|\\-=|\\*=|\\/=|\\/\\/=|%=|@=|&=|\\|=|^=|>>=|<<=|\\*\\*="},{token:"paren.lparen",regex:"[\\[\\(\\{]"},{token:"paren.rparen",regex:"[\\]\\)\\}]"},{token:"text",regex:"\\s+"},{include:"constants"}],"qqstring3":[{token:"constant.language.escape",regex:x},{token:"string",regex:'"{3}',next:"start"},{defaultToken:"string"}],"qstring3":[{token:"constant.language.escape",regex:x},{token:"string",regex:"'{3}",next:"start"},{defaultToken:"string"}],"qqstring":[{token:"constant.language.escape",regex:x},{token:"string",regex:"\\\\$",next:"qqstring"},{token:"string",regex:'"|$',next:"start"},{defaultToken:"string"}],"qstring":[{token:"constant.language.escape",regex:x},{token:"string",regex:"\\\\$",next:"qstring"},{token:"string",regex:"'|$",next:"start"},{defaultToken:"string"}],"rawqqstring3":[{token:"string",regex:'"{3}',next:"start"},{defaultToken:"string"}],"rawqstring3":[{token:"string",regex:"'{3}",next:"start"},{defaultToken:"string"}],"rawqqstring":[{token:"string",regex:"\\\\$",next:"rawqqstring"},{token:"string",regex:'"|$',next:"start"},{defaultToken:"string"}],"rawqstring":[{token:"string",regex:"\\\\$",next:"rawqstring"},{token:"string",regex:"'|$",next:"start"},{defaultToken:"string"}],"fqqstring3":[{token:"constant.language.escape",regex:x},{token:"string",regex:'"{3}',next:"start"},{token:"paren.lparen",regex:"{",push:"fqstringParRules"},{defaultToken:"string"}],"fqstring3":[{token:"constant.language.escape",regex:x},{token:"string",regex:"'{3}",next:"start"},{token:"paren.lparen",regex:"{",push:"fqstringParRules"},{defaultToken:"string"}],"fqqstring":[{token:"constant.language.escape",regex:x},{token:"string",regex:"\\\\$",next:"fqqstring"},{token:"string",regex:'"|$',next:"start"},{token:"paren.lparen",regex:"{",push:"fqstringParRules"},{defaultToken:"string"}],"fqstring":[{token:"constant.language.escape",regex:x},{token:"string",regex:"'|$",next:"start"},{token:"paren.lparen",regex:"{",push:"fqstringParRules"},{defaultToken:"string"}],"rfqqstring3":[{token:"string",regex:'"{3}',next:"start"},{token:"paren.lparen",regex:"{",push:"fqstringParRules"},{defaultToken:"string"}],"rfqstring3":[{token:"string",regex:"'{3}",next:"start"},{token:"paren.lparen",regex:"{",push:"fqstringParRules"},{defaultToken:"string"}],"rfqqstring":[{token:"string",regex:"\\\\$",next:"rfqqstring"},{token:"string",regex:'"|$',next:"start"},{token:"paren.lparen",regex:"{",push:"fqstringParRules"},{defaultToken:"string"}],"rfqstring":[{token:"string",regex:"'|$",next:"start"},{token:"paren.lparen",regex:"{",push:"fqstringParRules"},{defaultToken:"string"}],"fqstringParRules":[{token:"paren.lparen",regex:"[\\[\\(]"},{token:"paren.rparen",regex:"[\\]\\)]"},{token:"string",regex:"\\s+"},{token:"string",regex:"'[^']*'"},{token:"string",regex:'"[^"]*"'},{token:"function.support",regex:"(!s|!r|!a)"},{include:"constants"},{token:'paren.rparen',regex:"}",next:'pop'},{token:'paren.lparen',regex:"{",push:"fqstringParRules"}],"constants":[{token:"constant.numeric",regex:"(?:"+w+"|\\d+)[jJ]\\b"},{token:"constant.numeric",regex:w},{token:"constant.numeric",regex:n+"[lL]\\b"},{token:"constant.numeric",regex:n+"\\b"},{token:["punctuation","function.support"],regex:"(\\.)([a-zA-Z_]+)\\b"},{token:c,regex:"[a-zA-Z_$][a-zA-Z0-9_$]*\\b"}]};this.normalizeRules();};o.inherits(P,T);e.PythonHighlightRules=P;});ace.define("ace/mode/folding/pythonic",[],function(r,e,m){"use strict";var o=r("../../lib/oop");var B=r("./fold_mode").FoldMode;var F=e.FoldMode=function(a){this.foldingStartMarker=new RegExp("([\\[{])(?:\\s*)$|("+a+")(?:\\s*)(?:#.*)?$");};o.inherits(F,B);(function(){this.getFoldWidgetRange=function(s,f,a){var l=s.getLine(a);var b=l.match(this.foldingStartMarker);if(b){if(b[1])return this.openingBracketBlock(s,b[1],a,b.index);if(b[2])return this.indentationBlock(s,a,b.index+b[2].length);return this.indentationBlock(s,a);}};}).call(F.prototype);});ace.define("ace/mode/python",[],function(r,e,m){"use strict";var o=r("../lib/oop");var T=r("./text").Mode;var P=r("./python_highlight_rules").PythonHighlightRules;var a=r("./folding/pythonic").FoldMode;var R=r("../range").Range;var M=function(){this.HighlightRules=P;this.foldingRules=new a("\\:");this.$behaviour=this.$defaultBehaviour;};o.inherits(M,T);(function(){this.lineCommentStart="#";this.getNextLineIndent=function(s,l,t){var i=this.$getIndent(l);var c=this.getTokenizer().getLineTokens(l,s);var d=c.tokens;if(d.length&&d[d.length-1].type=="comment"){return i;}if(s=="start"){var f=l.match(/^.*[\{\(\[:]\s*$/);if(f){i+=t;}}return i;};var b={"pass":1,"return":1,"raise":1,"break":1,"continue":1};this.checkOutdent=function(s,l,i){if(i!=="\r\n"&&i!=="\r"&&i!=="\n")return false;var t=this.getTokenizer().getLineTokens(l.trim(),s).tokens;if(!t)return false;do{var c=t.pop();}while(c&&(c.type=="comment"||(c.type=="text"&&c.value.match(/^\s+$/))));if(!c)return false;return(c.type=="keyword"&&b[c.value]);};this.autoOutdent=function(s,d,c){c+=1;var i=this.$getIndent(d.getLine(c));var t=d.getTabString();if(i.slice(-t.length)==t)d.remove(new R(c,i.length-t.length,c,i.length));};this.$id="ace/mode/python";this.snippetFileId="ace/snippets/python";}).call(M.prototype);e.Mode=M;});(function(){ace.require(["ace/mode/python"],function(m){if(typeof module=="object"&&typeof exports=="object"&&module){module.exports=m;}});})();
