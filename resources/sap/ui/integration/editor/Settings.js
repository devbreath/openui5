/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/m/Popover","sap/ui/model/json/JSONModel","sap/m/Button","sap/m/SegmentedButton","sap/m/SegmentedButtonItem","sap/m/OverflowToolbar","sap/m/ToolbarSpacer","sap/m/VBox","sap/m/HBox","sap/m/Select","sap/ui/core/ListItem","sap/m/Label","sap/m/Text","sap/m/Title","sap/m/CheckBox","sap/m/Menu","sap/m/MenuItem","sap/m/Input","sap/ui/integration/util/ParameterMap","sap/base/util/merge","sap/ui/core/Core","sap/m/Table","sap/m/Column","sap/m/ColumnListItem","sap/m/ScrollContainer","sap/base/util/ObjectPath","sap/ui/integration/util/BindingHelper"],function(e,t,a,n,s,r,l,i,o,d,u,g,p,c,f,m,y,_,v,h,S,b,T,I,x,w,P,E){"use strict";var D=e.extend("sap.ui.integration.editor.Settings",{metadata:{library:"sap.ui.integration"},renderer:null});var C=b.getLibraryResourceBundle("sap.ui.integration"),V,M,O=null,R,A,L,N,U,$,j,B,F,H,K,G;D.prototype.setConfiguration=function(e){this._originalConfig=e;e=S({},e);var t=new a(e);this.setModel(t,"currentSettings");this.bindElement({path:"currentSettings>/"})};D.prototype.open=function(e,t,a,n,s,r,l){var i=this.getModel("currentSettings").getData();if(i.values){this.prepareFieldsInKey(i)}O=this;G=W(i,s);this.addDependent(G);this.oHost=n;this.fnApply=r;this.fnCancel=l;this._oOpener=s;M=true;e.addDependent(this);if(!i.allowDynamicValues&&i.values){b.byId("settings_scroll_container").setHeight("155px")}this.getModel("currentSettings").checkUpdate(true,true);ie(C.getText("EDITOR_SELECT_FROM_LIST"),[]);if(t){var o=!a||a.getDomRef()===null||a.getDomRef().offsetWidth===0?270:a.getDomRef().offsetWidth;var d=!a||a.getDomRef()===null||a.getDomRef().offsetHeight===0?350:a.getDomRef().offsetHeight;G.setContentWidth(o+"px");G.setContentHeight(d-50+"px");var u="Right";var g=e.getDomRef().getBoundingClientRect().x;var p=document.body.offsetWidth;if(2*g>p){u="Left"}G.setPlacement(u);N.setValue(e._label);G.openBy(e)}else{G.open()}V=this.getModel("currentSettings");if(V.getProperty("/_hasDynamicValue")){J()}else if(V.getProperty("/_hasSettings")){q()}else if(V.getProperty("/allowDynamicValues")){J()}else if(V.getProperty("/allowSettings")){q()}};D.prototype._applyCurrentSettings=function(){this.fnApply(V.getData())};D.prototype._cancelCurrentSettings=function(){this.fnCancel(this._originalConfig)};D.prototype.destroy=function(){this.removeDependent(G);return e.prototype.destroy.apply(this,arguments)};function W(e,a){var s=Y(),r=Z(e),o=te(),d=ae(),u=ne(e,a),g=new t({id:"settings_popover",showArrow:true,contentWidth:"400px",showHeader:false,horizontalScrolling:false,verticalScrolling:false,modal:false,footer:new l({content:[r,new i,new n({text:C.getText("EDITOR_MORE_OK"),type:"Emphasized",press:function(){if(e.values){var t=b.byId("settings_pav_table"),a=t.getSelectedContexts(),n=[];if(V.getProperty("/selectedValues")==="Partion"){for(var s=0;s<a.length;s++){var r=O.getKeyFromItem(a[s].getObject());n.push(r)}Q("pageAdminValues",n)}else{Q("pageAdminValues",[])}}O._applyCurrentSettings();M=false;g.close()}}),new n({text:C.getText("EDITOR_MORE_CANCEL"),press:function(){g.close()}})]}),afterClose:function(){if(M){O._cancelCurrentSettings()}M=true;g.destroy()},afterOpen:function(){window.requestAnimationFrame(function(){g.getDomRef()&&(g.getDomRef().style.opacity="1")});if(e.values){var t=b.byId("settings_pav_table"),a=V.getProperty("/_next/pageAdminValues");if(a!==undefined&&a.length>0){t.removeSelections();V.setProperty("/selectedValues","None");var n=V.getProperty("/_next/pageAdminValues"),s=t.getItems();for(var r=0;r<n.length;r++){for(var l=0;l<s.length;l++){var i=O.getKeyFromItem(s[l].getBindingContext().getObject());if(n[r]===i){t.setSelectedItem(s[l])}}}V.setProperty("/selectedValues","Partion")}else{t.selectAll();V.setProperty("/selectedValues","All")}}}});g.setCustomHeader(s);g.addContent(o);g.addContent(d);g.addContent(u);g.addStyleClass("sapUiIntegrationFieldSettings");return g}function k(){F=new r({text:C.getText("EDITOR_MORE_SETTINGS"),tooltip:C.getText("EDITOR_MORE_SETTINGS"),key:"settings",icon:"sap-icon://action-settings",width:"50%",press:q}).addStyleClass("setbtn");return F}function z(){F=k();H=new s("settings_Segment_btn",{width:"100%",visible:"{= ${currentSettings>allowDynamicValues} && ${currentSettings>allowSettings}}",items:[new r({text:C.getText("EDITOR_MORE_DYNAMICVALUES"),tooltip:C.getText("EDITOR_MORE_DYNAMICVALUES"),key:"dynamic",icon:"{= ${currentSettings>_hasDynamicValue} ? 'sap-icon://display-more' : 'sap-icon://enter-more'}",width:"50%",press:J}).addStyleClass("dynbtn sel"),F]});return H}function Y(){H=z();var e=new c({text:C.getText("EDITOR_MORE_DYNAMICVALUES"),tooltip:C.getText("EDITOR_MORE_DYNAMICVALUES"),visible:"{= ${currentSettings>allowDynamicValues} && !${currentSettings>allowSettings}}"}).addStyleClass("sapUiTinyMagin");var t=new c({text:C.getText("EDITOR_MORE_SETTINGS"),visible:"{= !${currentSettings>allowDynamicValues} && ${currentSettings>allowSettings}}"}).addStyleClass("sapUiTinyMagin");var a=new l({content:[H,e,t]}).addStyleClass("headertitle");return a}function Z(e){K=new n("settings_reset_to_default_btn",{type:"Transparent",text:C.getText("EDITOR_MORE_RESET"),enabled:"{= ${currentSettings>_next/visible} === (typeof(${currentSettings>visibleToUser}) === 'undefined' ? false : !${currentSettings>visibleToUser}) || ${currentSettings>_next/editable} === (typeof(${currentSettings>editableToUser}) === 'undefined' ? false : !${currentSettings>editableToUser}) || ${currentSettings>_next/allowDynamicValues} === (typeof(${currentSettings>allowDynamicValues}) === 'undefined' ? false : !${currentSettings>allowDynamicValues}) || ${currentSettings>_beforeValue} !== ${currentSettings>value}}",tooltip:C.getText("EDITOR_MORE_SETTINGS_P_ADMIN_RESET"),press:function(){var t=typeof V.getProperty("/visibleToUser")==="undefined"?true:V.getProperty("/visibleToUser");var a=typeof V.getProperty("/editableToUser")==="undefined"?true:V.getProperty("/editableToUser");var n=typeof V.getProperty("/allowDynamicValues")==="undefined"?true:V.getProperty("/allowDynamicValues");var s=b.byId("settings_popover");Q("visible",t);Q("editable",a);Q("allowDynamicValues",n);if(V.getProperty("/translatable")){if(V.getProperty("/_translatedDefaultValue")&&V.getProperty("/_translatedDefaultValue")!==""){V.setProperty("/value",V.getProperty("/_translatedDefaultValue"))}else if(V.getProperty("/_translatedDefaultPlaceholder")&&V.getProperty("/_translatedDefaultPlaceholder")!==""){V.setProperty("/value",V.getProperty("/_translatedDefaultPlaceholder"))}V.setProperty("/_changed",false)}else{V.setProperty("/value",V.getProperty("/_beforeValue"))}if(e.values){var r=b.byId("settings_pav_table"),l=V.getProperty("/_next/pageAdminValues"),i=r.getItems();if(l!==undefined&&l.length>0&&l.length<i.length){r.removeSelections();for(var o=0;o<l.length;o++){for(var d=0;d<i.length;d++){var u=O.getKeyFromItem(i[d].getBindingContext().getObject());if(l[o]===u){r.setSelectedItem(i[d])}}}V.setProperty("/selectedValues","Partion")}else{r.selectAll();V.setProperty("/selectedValues","All")}}s.getFooter().getContent()[2].firePress()}}).addStyleClass("resetbutton");return K}function q(){A.setVisible(true);R.setVisible(false);b.byId("settings_Segment_btn").setSelectedKey("settings");var e=b.byId("settings_current_value");e.setVisible(false)}function J(){A.setVisible(false);R.setVisible(true);b.byId("settings_Segment_btn").setSelectedKey("dynamic");var e=O.getModel("contextflat"),t=e._getValueObject(V.getProperty("/value"));if(t&&t.object.label){N.setValue(t.object.label);ie(t.object.description,t.object.tags);if(t.path==="empty"){N.setValue(t.object.label)}de(t)}var a=b.byId("settings_current_value");a.setVisible(true)}function Q(e,t){if(!V.getProperty("/_next")){V.setProperty("/_next",{})}V.setProperty("/_next/"+e,t)}function X(e,t){var a=[];for(var n in e){if(e[n]&&e[n].label){var s=new _({text:e[n].label});s.__data=e[n];e[n].pathvalue=(t+"/"+n).substring(1);a.push(s);var r=X(e[n],t+"/"+n);for(var l=0;l<r.length;l++){s.addItem(r[l])}}}return a}var ee=[{formatMethod:"format.DateTime",sourceTypes:["datetime","date"],label:"Relative date/datetime text of the value",description:"Should be applied to dynamic values of type date or datetime or string values that represent a datetime in the format 'yyyy-MM-ddZhh:mm:ss'",example:"4 weeks ago",syntax:"handlebars",binding:"{= format.dateTime('__|VALUE|__',{relative:true})}"},{formatMethod:"format.DateTime",sourceTypes:["datetime","date"],label:"Short date/datetime text of the value",description:"Should be applied to dynamic values of type date, date-time or text values that represent a datetime in the format 'yyyy-MM-ddZhh:mm:ss.sss'",example:"9/18/20, 2:09 PM",binding:"{= format.dateTime('__|VALUE|__',{style:'short'})}"},{formatMethod:"format.DateTime",sourceTypes:["datetime","date"],label:"Medium date/datetime text of the value",description:"Should be applied to dynamic values of type date, date-time or text values that represent a datetime in the format 'yyyy-MM-ddThh:mm:ss.sssZ'",example:"Sep 18, 2020, 2:09:04 PM",binding:"{= format.dateTime('__|VALUE|__',{style:'medium'})}"},{formatMethod:"format.DateTime",sourceTypes:["datetime","date"],label:"Long date, date-time text of the value",description:"Should be applied to dynamic values of type date or date-time or string values that represent a datetime in the format 'yyyy-MM-ddThh:mm:ss.sssZ'",example:"Sep 18, 2020, 2:09:04 PM",binding:"{= format.dateTime('__|VALUE|__',{style:'long'})}"}];function te(){R=new o({visible:true});R.addStyleClass("sapUiSmallMargin");N=new v({width:"100%",showValueHelp:true,valueHelpOnly:true,valueHelpRequest:function(){if(U){U.destroy()}U=new y({});$=X(R.getModel("context").getData(),"");for(var e=0;e<$.length;e++){U.addItem($[e])}U.attachItemSelected(function(e){var t=e.getParameter("item").__data;ie(t.description||"",t.tags||[]);N.setValue(t.placeholder||t.label);var a=O.getModel("contextflat");de(a._getPathObject(t.pathvalue))});N.addDependent(U);U.addStyleClass("sapUiIntegrationFieldSettingsMenu");U.openBy(N,false,null,null,"1 0")}});N.addStyleClass("selectvariable");var e=new p({text:"Select a dynamic value"});N.addAriaLabelledBy(e);var t=new o({items:[e,N]});R.addItem(t);L=new c({text:"",maxLines:6,renderWhitespace:true});t=new o({width:"100%",items:[L]});L.addStyleClass("description");R.addItem(t);if(ee.length===-1){j=new u({width:"100%",enabled:true,change:function(){B.setText(j.getSelectedItem()._data.description)}});t=new o({visible:false,items:[new p({text:"Customize the value..."}),j]});R.addItem(t);B=new c({text:"",maxLines:4,renderWhitespace:true});B.addStyleClass("description");t=new o({width:"100%",items:[B]});R.addItem(t);R.getItems()[2].getItems()[0].addStyleClass("sapUiTinyMarginTop")}R.getItems()[0].getItems()[0].addStyleClass("sapUiTinyMarginTop");return R}function ae(){var e=new c({text:C.getText("EDITOR_ACTUAL_VALUE")});var t=new v({value:{path:"currentSettings>_currentContextValue"},editable:false});t.addAriaLabelledBy(e);var a=new o("settings_current_value",{width:"100%",items:[e,t]});a.addStyleClass("currentval");return a}function ne(e,t){A=new o({visible:false});var s=(new o).addStyleClass("commonSettings");A.addItem(s);s.addItem(new f({text:C.getText("EDITOR_MORE_SETTINGS_P_ADMIN"),wrapping:true}).addStyleClass("stitle"));var r=new p({text:C.getText("EDITOR_MORE_SETTINGS_P_ADMIN_VISIBLE"),wrapping:true});var l=new m({selected:"{= ${currentSettings>_next/visible} !== false}",select:function(e){Q("visible",e.getParameter("selected"))}});l.addAriaLabelledBy(r);s.addItem(new d({items:[r,l]}).addStyleClass("cbrow"));var i=new p({text:C.getText("EDITOR_MORE_SETTINGS_P_ADMIN_EDIT"),wrapping:true});var u=new m({selected:"{= ${currentSettings>_next/editable} !== false}",enabled:"{= ${currentSettings>_next/visible} !== false}",select:function(e){Q("editable",e.getParameter("selected"))}});u.addAriaLabelledBy(i);s.addItem(new d({items:[i,u]}).addStyleClass("cbrow"));var g=new p({text:C.getText("EDITOR_MORE_SETTINGS_P_ADMIN_DYN"),wrapping:true});var y=new m({selected:"{= ${currentSettings>_next/allowDynamicValues} !== false}",enabled:"{= ${currentSettings>_next/visible} !== false && ${currentSettings>_next/editable} !== false}",select:function(e){Q("allowDynamicValues",e.getParameter("selected"))}});y.addAriaLabelledBy(g);s.addItem(new d({visible:"{= ${currentSettings>allowDynamicValues}!== false}",items:[g,y]}).addStyleClass("cbrow"));if(e.values){var _;if(e.values.data){var v=e.values.data.path,h;if(v&&v!=="/"){if(v.startsWith("/")){v=v.substring(1)}if(v.endsWith("/")){v=v.substring(0,v.length-1)}h=v.split("/");_=P.get(["_values",h],e)}else{_=P.get(["_values"],e)}}else if(t.getParent().getParent().getAggregation("_extension")){var S=e.values.path;if(S.length>1){S=S.substring(1)}_=P.get([S],t.getModel().getData())}s.addItem(new d({visible:"{= ${currentSettings>_next/visible} !== false && ${currentSettings>_next/editable} !== false}",items:[new p({text:C.getText("EDITOR_MORE_SETTINGS_P_ADMIN_VALUES_LIST"),tooltip:C.getText("EDITOR_MORE_SETTINGS_P_ADMIN_VALUES_LIST_TOOLTIPS"),wrapping:false}),new n({type:"Transparent",enabled:_!==undefined,icon:{path:"currentSettings>selectedValues",formatter:function(e){if(e==="All"){return"sap-icon://multiselect-all"}else if(e==="Partion"){return"sap-icon://multi-select"}else if(e==="None"){return"sap-icon://multiselect-none"}}},tooltip:{path:"currentSettings>selectedValues",formatter:function(e){if(e==="All"){return C.getText("EDITOR_MORE_SETTINGS_P_ADMIN_DESELECT_ALL")}else{return C.getText("EDITOR_MORE_SETTINGS_P_ADMIN_SELECT_ALL")}}},press:se})]}).addStyleClass("cbrow"));var b=new T({id:"settings_pav_table",mode:"MultiSelect",width:"84%",select:re,columns:[new I]}).addStyleClass("tableHdr");var D=e.values.item.text,V=new a(_);b.setModel(V);var M=(new x).addStyleClass("pavlistItem");if(_){for(var O=0;O<_.length;O++){M.addCell(new d({items:[new c({text:E.createBindingInfos(D)}).addStyleClass("pavTblCellText")]})).addStyleClass("pavlistItem")}}b.bindItems("/",M);var R=new w({id:"settings_scroll_container",height:"125px",width:"94%",vertical:true,horizontal:false,visible:"{= ${currentSettings>_next/visible} !== false && ${currentSettings>_next/editable} !== false}",content:[b]}).addStyleClass("SettingsPAVTable");A.addItem(R)}return A}function se(){var e=b.byId("settings_pav_table"),t=b.byId("settings_reset_to_default_btn"),a=V.getProperty("/selectedValues");if(a==="All"){e.removeSelections();V.setProperty("/selectedValues","None")}else{e.selectAll();V.setProperty("/selectedValues","All")}if(!t.getEnabled()){t.setEnabled(true)}}function re(e){var t=e.getSource(),a=t.getSelectedItems(),n=t.getItems(),s=b.byId("settings_reset_to_default_btn");if(a.length===n.length){V.setProperty("/selectedValues","All")}else if(a.length<n.length&&a.length>0){V.setProperty("/selectedValues","Partion")}else{V.setProperty("/selectedValues","None")}if(!s.getEnabled()){s.setEnabled(true)}}function le(e,t){e=e||[];j.removeAllItems();var a=[];j.addItem(new g({text:"No customizing needed",key:""}));for(var n=0;n<ee.length;n++){var s=ee[n],r=new g({text:s.label,key:"key"+n});r._data=s;if(s.sourceTypes.indexOf(t)>-1||e.indexOf(s.formatMethod)>-1){j.addItem(r)}else{a.push(r)}}for(var n=0;n<a.length;n++){j.addItem(a[n])}}function ie(e,t){t=t||[];if(t.indexOf("technical")>-1){e=e+"\n"+C.getText("EDITOR_MORE_DYNAMICVALUES_TECHHINT")}L.setText(e)}function oe(e){if(ee.length===-1){if(!e){j.removeAllItems();j.addItem(new g({text:"No customizing available for this value"}));B.setText("");j.setEnabled(false)}else{le(e.customize,e.type);j.setEnabled(true)}}}function de(e){if(e){V.setProperty("/_hasDynamicValue",true);var t=e.value;V.setProperty("/value",t);V.setProperty("/_contextpath",e.path);if(e.object&&e.object.value&&e.object.value.indexOf("{{")===0){V.setProperty("/_currentContextValue",h.processPredefinedParameter(e.object.value));oe(e.object)}else{if(e.path==="empty"){V.setProperty("/value","");V.setProperty("/_currentContextValue","");V.setProperty("/_hasDynamicValue",false);oe()}else{oe(e.object);if(e.object&&e.object.hasOwnProperty("value")){V.setProperty("/_currentContextValue",e.object.value)}else{O.oHost.getContextValue(e.path+"/value").then(function(t){if(t===null){V.setProperty("/_currentContextValue","(not available)")}else{V.setProperty("/_currentContextValue",t)}e.object&&(e.object.value=t)})}}}}}D._private=function(){return{oPopover:G,oSegmentedButton:H,oSettingsButton:F,oDynamicPanel:R,oSettingsPanel:A,oCurrentModel:V,updateCurrentValue:de,oCurrentInstance:O,oDynamicValueField:N,oResetToDefaultButton:K,getMenuItems:function(){return $},getMenu:function(){return U}}};D.prototype.prepareFieldsInKey=function(e){this._sKeySeparator=e.values.keySeparator;if(!this._sKeySeparator){this._sKeySeparator="#"}var t=e.values.item.key;this._aFields=t.split(this._sKeySeparator);for(var a in this._aFields){if(this._aFields[a].startsWith("{")){this._aFields[a]=this._aFields[a].substring(1)}if(this._aFields[a].endsWith("}")){this._aFields[a]=this._aFields[a].substring(0,this._aFields[a].length-1)}}};D.prototype.getKeyFromItem=function(e){var t="";this._aFields.forEach(function(a){t+=e[a].toString()+this._sKeySeparator}.bind(this));if(t.endsWith(this._sKeySeparator)){t=t.substring(0,t.length-this._sKeySeparator.length)}return t};return D});
//# sourceMappingURL=Settings.js.map