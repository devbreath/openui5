sap.ui.define(["sap/ui/webc/common/thirdparty/base/asset-registries/Themes","sap/ui/webc/common/thirdparty/theming/generated/themes/sap_fiori_3/parameters-bundle.css","./sap_fiori_3/parameters-bundle.css"],function(e,i,a){"use strict";function t(e){return e&&typeof e==="object"&&"default"in e?e["default"]:e}var r=t(i);e.registerThemePropertiesLoader("@ui5/webcomponents-theming","sap_fiori_3",()=>r);e.registerThemePropertiesLoader("@ui5/webcomponents-fiori","sap_fiori_3",()=>a);var d={packageName:"@ui5/webcomponents-fiori",fileName:"themes/Wizard.css",content:".ui5-hidden-text{position:absolute;clip:rect(1px,1px,1px,1px);user-select:none;left:-1000px;top:-1000px;pointer-events:none;font-size:0}:host(:not([hidden])){display:block;height:100%;width:100%;overflow:auto}.ui5-wiz-root{height:100%;width:100%;position:relative}.ui5-wiz-content{position:relative;overflow:auto;height:calc(100% - 4rem);box-sizing:border-box;background:var(--sapBackgroundColor)}.ui5-wiz-content-item{display:block;box-sizing:border-box;padding:1rem 2rem}.ui5-wiz-content-item-wrapper{display:block;padding:var(--_ui5_wiz_content_item_wrapper_padding);background-color:var(--_ui5_wiz_content_item_wrapper_bg);border-radius:var(--sapElement_BorderCornerRadius)}.ui5-wiz-content-item[hidden]{display:none}.ui5-wiz-content-item[stretch]{min-height:100%}[ui5-wizard-tab][data-ui5-wizard-expanded-tab=true]+[ui5-wizard-tab][data-ui5-wizard-expanded-tab=false]{width:2rem;padding-left:.5rem}[ui5-wizard-tab][data-ui5-wizard-expanded-tab=false]{width:.25rem;padding:0}.ui5-wiz-nav-list{display:table;table-layout:fixed;position:relative;list-style:none;margin:0;box-sizing:border-box;width:100%;height:2rem;padding:0}[ui5-wizard-tab]{display:table-cell;position:relative}.ui5-wiz-nav{box-sizing:border-box;height:4rem;padding:1rem 2rem;-webkit-user-select:none;-moz-user-select:none;user-select:none;background-color:var(--sapObjectHeader_Background);font-size:.875rem;box-shadow:var(--sapContent_HeaderShadow);outline:none;display:flex;align-items:center}[ui5-wizard-tab][data-ui5-wizard-expanded-tab=false]+[ui5-wizard-tab][data-ui5-wizard-expanded-tab=false]{width:.25rem}[ui5-wizard-tab][data-ui5-wizard-expanded-tab-prev=true],[ui5-wizard-tab][data-ui5-wizard-expanded-tab=false]+[ui5-wizard-tab][data-ui5-wizard-expanded-tab-prev=true]{width:2rem;padding-right:.75rem}"};return d});