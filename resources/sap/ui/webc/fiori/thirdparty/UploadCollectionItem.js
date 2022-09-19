sap.ui.define(["sap/ui/webc/common/thirdparty/base/i18nBundle","sap/ui/webc/main/thirdparty/types/ListItemType","sap/ui/webc/main/thirdparty/Button","sap/ui/webc/main/thirdparty/Input","sap/ui/webc/main/thirdparty/Label","sap/ui/webc/main/thirdparty/Link","sap/ui/webc/main/thirdparty/ProgressIndicator","sap/ui/webc/main/thirdparty/ListItem","sap/ui/webc/common/thirdparty/base/types/Integer","sap/ui/webc/common/thirdparty/base/util/getFileExtension","sap/ui/webc/common/thirdparty/base/Render","sap/ui/webc/common/thirdparty/base/Keys","./types/UploadState","sap/ui/webc/common/thirdparty/icons/refresh","sap/ui/webc/common/thirdparty/icons/stop","sap/ui/webc/common/thirdparty/icons/edit","./generated/i18n/i18n-defaults","./generated/templates/UploadCollectionItemTemplate.lit","./generated/themes/UploadCollectionItem.css"],function(e,t,i,n,a,r,o,s,u,l,p,d,c,h,m,g,f,T,_){"use strict";function y(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var E=y(t);var B=y(i);var I=y(n);var R=y(a);var O=y(r);var L=y(o);var w=y(s);var C=y(u);var b=y(l);const N={tag:"ui5-upload-collection-item",languageAware:true,properties:{file:{type:Object,defaultValue:null},fileName:{type:String},fileNameClickable:{type:Boolean},disableDeleteButton:{type:Boolean},hideDeleteButton:{type:Boolean},hideRetryButton:{type:Boolean},hideTerminateButton:{type:Boolean},progress:{type:C,defaultValue:0},uploadState:{type:c,defaultValue:c.Ready},_editing:{type:Boolean}},slots:{default:{type:Node},thumbnail:{type:HTMLElement}},events:{"file-name-click":{},rename:{},terminate:{},retry:{},"_focus-requested":{}}};class D extends w{static get metadata(){return N}static get styles(){return[w.styles,_]}static get template(){return T}static get dependencies(){return[...w.dependencies,B,I,O,R,L]}static async onDefine(){[D.i18nFioriBundle]=await Promise.all([e.getI18nBundle("@ui5/webcomponents-fiori"),super.onDefine()])}onBeforeRendering(){}async _initInputField(){await p.renderFinished();const e=this.shadowRoot.getElementById("ui5-uci-edit-input");e.value=this._fileNameWithoutExtension;await p.renderFinished();const t=e.getFocusDomRef();if(t){t.focus();t.setSelectionRange(0,this._fileNameWithoutExtension.length)}}async onDetailClick(e){super.onDetailClick(e);this._editing=true;await this._initInputField()}_onDetailKeyup(e){if(d.isSpace(e)){this.onDetailClick(e)}}_onInputFocusin(e){e.stopPropagation()}_onInputKeyDown(e){if(d.isEscape(e)){this._onRenameCancel(e)}else if(d.isEnter(e)){this._onRename()}else if(d.isSpace(e)){e.stopImmediatePropagation()}}_onRename(e){const t=this.shadowRoot.getElementById("ui5-uci-edit-input");this.fileName=t.value+this._fileExtension;this.fireEvent("rename");this._editing=false;this._focus()}_onRenameKeyup(e){if(d.isSpace(e)){this._onRename(e)}}async _onRenameCancel(e){this._editing=false;if(d.isEscape(e)){await p.renderFinished();this.shadowRoot.getElementById(`${this._id}-editing-button`).focus()}else{this._focus()}}_onRenameCancelKeyup(e){if(d.isSpace(e)){this._onRenameCancel(e)}}_focus(){this.fireEvent("_focus-requested")}_onFileNameClick(e){this.fireEvent("file-name-click")}_onRetry(e){this.fireEvent("retry")}_onRetryKeyup(e){if(d.isSpace(e)){this._onRetry(e)}}_onTerminate(e){this.fireEvent("terminate")}_onTerminateKeyup(e){if(d.isSpace(e)){this._onTerminate(e)}}getFocusDomRef(){return this.getDomRef()}get list(){return this.assignedSlot.parentElement}get classes(){const e=super.classes;return{main:{...e.main,"ui5-uci-root":true,"ui5-uci-root-editing":this._editing,"ui5-uci-root-uploading":this.uploadState===c.Uploading}}}get renderDeleteButton(){return!this.hideDeleteButton}get placeSelectionElementAfter(){return true}get placeSelectionElementBefore(){return false}get _fileNameWithoutExtension(){return this.fileName.substring(0,this.fileName.length-this._fileExtension.length)}get _fileExtension(){return b(this.fileName)}get _renameBtnText(){return D.i18nFioriBundle.getText(f.UPLOADCOLLECTIONITEM_RENAMEBUTTON_TEXT)}get _cancelRenameBtnText(){return D.i18nFioriBundle.getText(f.UPLOADCOLLECTIONITEM_CANCELBUTTON_TEXT)}get _showProgressIndicator(){return this.uploadState!==c.Complete}get _progressText(){if(this.uploadState===c.Uploading){return D.i18nFioriBundle.getText(f.UPLOADCOLLECTIONITEM_UPLOADING_STATE)}if(this.uploadState===c.Error){return D.i18nFioriBundle.getText(f.UPLOADCOLLECTIONITEM_ERROR_STATE)}return D.i18nFioriBundle.getText(f.UPLOADCOLLECTIONITEM_READY_STATE)}get _showRetry(){return!this.hideRetryButton&&this.uploadState===c.Error}get _showTerminate(){return!this.hideTerminateButton&&this.uploadState===c.Uploading}get _retryButtonTooltip(){return D.i18nFioriBundle.getText(f.UPLOADCOLLECTIONITEM_RETRY_BUTTON_TEXT)}get _terminateButtonTooltip(){return D.i18nFioriBundle.getText(f.UPLOADCOLLECTIONITEM_TERMINATE_BUTTON_TEXT)}get _editButtonTooltip(){return D.i18nFioriBundle.getText(f.UPLOADCOLLECTIONITEM_EDIT_BUTTON_TEXT)}get valueStateName(){if(this.uploadState===c.Error){return"Error"}if(this.uploadState===c.Ready||this.uploadState===c.Uploading){return"Information"}return undefined}get typeDetail(){return false}get showEditButton(){return this.type===E.Detail}}D.define();return D});