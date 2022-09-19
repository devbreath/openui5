/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/Device","sap/ui/base/DataType","sap/ui/base/EventProvider","sap/ui/core/Control","sap/base/util/ObjectPath","sap/ui/util/openWindow","sap/ui/core/library","sap/base/strings/capitalize","sap/ui/thirdparty/jquery","sap/base/assert","sap/base/Log","sap/base/util/defineLazyProperty","sap/base/security/encodeCSS","./AvatarShape","./AvatarSize","./AvatarType","./AvatarColor","./AvatarImageFitType","./IllustratedMessageSize","./IllustratedMessageType","./upload/UploaderHttpRequestMethod","sap/ui/core/theming/Parameters","sap/ui/core/LocaleData","./Support"],function(D,a,E,C,O,o,b,d,q,e,L,f,g,A,h,n,p,r,I,s,U,P,t){"use strict";var u=sap.ui.getCore().initLibrary({name:"sap.m",version:"1.105.1",dependencies:["sap.ui.core"],designtime:"sap/m/designtime/library.designtime",types:["sap.m.AvatarImageFitType","sap.m.AvatarShape","sap.m.AvatarSize","sap.m.AvatarType","sap.m.AvatarColor","sap.m.BackgroundDesign","sap.m.BadgeState","sap.m.BadgeAnimationType","sap.m.BarDesign","sap.m.BreadcrumbsSeparatorStyle","sap.m.ButtonType","sap.m.CarouselArrowsPlacement","sap.m.DateTimeInputType","sap.m.DeviationIndicator","sap.m.DialogRoleType","sap.m.DialogType","sap.m.DraftIndicatorState","sap.m.FacetFilterListDataType","sap.m.FacetFilterType","sap.m.FlexAlignContent","sap.m.FlexAlignItems","sap.m.FlexAlignSelf","sap.m.FlexDirection","sap.m.FlexJustifyContent","sap.m.FlexRendertype","sap.m.FlexWrap","sap.m.FrameType","sap.m.GenericTagDesign","sap.m.GenericTagValueState","sap.m.GenericTileMode","sap.m.Priority","sap.m.GenericTileScope","sap.m.HeaderLevel","sap.m.IBarHTMLTag","sap.m.IconTabDensityMode","sap.m.IconTabFilterDesign","sap.m.IconTabHeaderMode","sap.m.IllustratedMessageSize","sap.m.IllustratedMessageType","sap.m.ImageMode","sap.m.InputTextFormatMode","sap.m.InputType","sap.m.LabelDesign","sap.m.LightBoxLoadingStates","sap.m.LinkConversion","sap.m.LinkAccessibleRole","sap.m.ListGrowingDirection","sap.m.ListHeaderDesign","sap.m.ListKeyboardMode","sap.m.ListMode","sap.m.ListSeparators","sap.m.ListType","sap.m.LoadState","sap.m.MenuButtonMode","sap.m.MultiSelectMode","sap.m.ObjectHeaderPictureShape","sap.m.ObjectMarkerType","sap.m.ObjectMarkerVisibility","sap.m.OverflowToolbarPriority","sap.m.P13nPanelType","sap.m.P13nConditionOperation","sap.m.PageBackgroundDesign","sap.m.PanelAccessibleRole","sap.m.PDFViewerDisplayType","sap.m.PlacementType","sap.m.PlanningCalendarBuiltInView","sap.m.PlanningCalendarStickyMode","sap.m.PopinDisplay","sap.m.PopinLayout","sap.m.QuickViewGroupElementType","sap.m.RatingIndicatorVisualMode","sap.m.ScreenSize","sap.m.SelectColumnRatio","sap.m.SelectionDetailsActionLevel","sap.m.SelectListKeyboardNavigationMode","sap.m.SelectType","sap.m.Size","sap.m.SplitAppMode","sap.m.StandardDynamicDateRangeKeys","sap.m.StandardTileType","sap.m.StepInputStepModeType","sap.m.StepInputValidationMode","sap.m.Sticky","sap.m.StringFilterOperator","sap.m.SwipeDirection","sap.m.SwitchType","sap.m.TabsOverflowMode","sap.m.TileSizeBehavior","sap.m.TimePickerMaskMode","sap.m.TitleAlignment","sap.m.TokenizerRenderMode","sap.m.ToolbarDesign","sap.m.ToolbarStyle","sap.m.UploadState","sap.m.ValueColor","sap.m.ValueCSSColor","sap.m.VerticalPlacementType","sap.m.WrappingType","sap.m.WizardRenderMode","sap.m.semantic.SemanticRuleSetType","sap.m.upload.UploaderHttpRequestMethod"],interfaces:["sap.m.IBar","sap.m.IBadge","sap.m.IBreadcrumbs","sap.m.p13n.IContent","sap.m.IconTab","sap.m.IScale","sap.m.semantic.IGroup","sap.m.semantic.IFilter","sap.m.semantic.ISort","sap.m.ObjectHeaderContainer","sap.m.IOverflowToolbarContent","sap.m.IOverflowToolbarFlexibleContent","sap.m.IHyphenation"],controls:["sap.m.ActionListItem","sap.m.ActionSelect","sap.m.ActionSheet","sap.m.App","sap.m.Avatar","sap.m.Bar","sap.m.BusyDialog","sap.m.BusyIndicator","sap.m.Button","sap.m.Breadcrumbs","sap.m.Carousel","sap.m.CheckBox","sap.m.ColumnHeaderPopover","sap.m.ColumnListItem","sap.m.ColorPalette","sap.m.ColorPalettePopover","sap.m.ComboBox","sap.m.ComboBoxTextField","sap.m.ComboBoxBase","sap.m.CustomListItem","sap.m.CustomTile","sap.m.CustomTreeItem","sap.m.DatePicker","sap.m.DateRangeSelection","sap.m.DateTimeField","sap.m.DateTimeInput","sap.m.DateTimePicker","sap.m.Dialog","sap.m.DisplayListItem","sap.m.DraftIndicator","sap.m.DynamicDateRange","sap.m.ExpandableText","sap.m.FacetFilter","sap.m.FacetFilterItem","sap.m.FacetFilterList","sap.m.FeedContent","sap.m.FeedInput","sap.m.FeedListItem","sap.m.FlexBox","sap.m.FormattedText","sap.m.GenericTag","sap.m.GenericTile","sap.m.GroupHeaderListItem","sap.m.GrowingList","sap.m.HBox","sap.m.HeaderContainer","sap.m.IconTabBar","sap.m.IconTabBarSelectList","sap.m.IconTabFilterExpandButtonBadge","sap.m.IconTabHeader","sap.m.IllustratedMessage","sap.m.Image","sap.m.ImageContent","sap.m.Input","sap.m.InputBase","sap.m.InputListItem","sap.m.Label","sap.m.LightBox","sap.m.Link","sap.m.List","sap.m.ListBase","sap.m.ListItemBase","sap.m.MaskInput","sap.m.Menu","sap.m.MenuButton","sap.m.MessagePage","sap.m.MessagePopover","sap.m.MessageView","sap.m.MessageStrip","sap.m.MultiComboBox","sap.m.MultiEditField","sap.m.MultiInput","sap.m.NavContainer","sap.m.NewsContent","sap.m.NumericContent","sap.m.NotificationList","sap.m.NotificationListBase","sap.m.NotificationListItem","sap.m.NotificationListGroup","sap.m.PagingButton","sap.m.PlanningCalendarLegend","sap.m.ObjectAttribute","sap.m.ObjectHeader","sap.m.ObjectIdentifier","sap.m.ObjectListItem","sap.m.ObjectMarker","sap.m.ObjectNumber","sap.m.ObjectStatus","sap.m.OverflowToolbar","sap.m.OverflowToolbarButton","sap.m.OverflowToolbarToggleButton","sap.m.P13nColumnsPanel","sap.m.P13nGroupPanel","sap.m.P13nSelectionPanel","sap.m.P13nDimMeasurePanel","sap.m.P13nConditionPanel","sap.m.P13nDialog","sap.m.P13nFilterPanel","sap.m.P13nPanel","sap.m.P13nSortPanel","sap.m.Page","sap.m.Panel","sap.m.PDFViewer","sap.m.PlanningCalendar","sap.m.PlanningCalendarHeader","sap.m.Popover","sap.m.ProgressIndicator","sap.m.PullToRefresh","sap.m.QuickView","sap.m.QuickViewBase","sap.m.QuickViewCard","sap.m.QuickViewPage","sap.m.RadioButton","sap.m.RadioButtonGroup","sap.m.RangeSlider","sap.m.RatingIndicator","sap.m.ResponsivePopover","sap.m.ScrollContainer","sap.m.SearchField","sap.m.SegmentedButton","sap.m.Select","sap.m.SelectDialog","sap.m.SelectDialogBase","sap.m.SelectList","sap.m.SelectionDetails","sap.m.Shell","sap.m.SimpleFixFlex","sap.m.SinglePlanningCalendar","sap.m.SinglePlanningCalendarGrid","sap.m.SinglePlanningCalendarMonthGrid","sap.m.Slider","sap.m.SliderTooltip","sap.m.SliderTooltipBase","sap.m.SliderTooltipContainer","sap.m.SlideTile","sap.m.StepInput","sap.m.SplitApp","sap.m.SplitContainer","sap.m.StandardListItem","sap.m.StandardTreeItem","sap.m.StandardTile","sap.m.Switch","sap.m.Table","sap.m.TableSelectDialog","sap.m.TabContainer","sap.m.TabStrip","sap.m.Text","sap.m.TextArea","sap.m.Tile","sap.m.TileContainer","sap.m.TileContent","sap.m.TimePicker","sap.m.TimePickerInputs","sap.m.TimePickerClock","sap.m.TimePickerClocks","sap.m.TimePickerSliders","sap.m.Title","sap.m.ToggleButton","sap.m.Token","sap.m.Tokenizer","sap.m.Toolbar","sap.m.ToolbarSpacer","sap.m.ToolbarSeparator","sap.m.Tree","sap.m.TreeItemBase","sap.m.UploadCollection","sap.m.UploadCollectionToolbarPlaceholder","sap.m.upload.UploadSet","sap.m.upload.UploadSetToolbarPlaceholder","sap.m.VariantManagement","sap.m.VBox","sap.m.ViewSettingsDialog","sap.m.WheelSlider","sap.m.WheelSliderContainer","sap.m.Wizard","sap.m.WizardStep","sap.m.semantic.DetailPage","sap.m.semantic.SemanticPage","sap.m.semantic.ShareMenuPage","sap.m.semantic.FullscreenPage","sap.m.semantic.MasterPage","sap.m.p13n.AbstractContainer","sap.m.p13n.BasePanel","sap.m.p13n.Container","sap.m.p13n.GroupPanel","sap.m.p13n.QueryPanel","sap.m.p13n.SelectionPanel","sap.m.p13n.SortPanel","sap.m.p13n.Popup","sap.m.table.columnmenu.Menu"],elements:["sap.m.BadgeCustomData","sap.m.Column","sap.m.ColumnPopoverActionItem","sap.m.ColumnPopoverCustomItem","sap.m.ColumnPopoverItem","sap.m.ColumnPopoverSortItem","sap.m.CustomDynamicDateOption","sap.m.DynamicDateOption","sap.m.DynamicDateValueHelpUIType","sap.m.FlexItemData","sap.m.FeedListItemAction","sap.m.IconTabFilter","sap.m.IconTabSeparator","sap.m.LightBoxItem","sap.m.OverflowToolbarLayoutData","sap.m.MaskInputRule","sap.m.MenuItem","sap.m.MessageItem","sap.m.MessagePopoverItem","sap.m.PageAccessibleLandmarkInfo","sap.m.P13nFilterItem","sap.m.P13nItem","sap.m.PlanningCalendarRow","sap.m.PlanningCalendarView","sap.m.P13nColumnsItem","sap.m.P13nDimMeasureItem","sap.m.P13nGroupItem","sap.m.P13nSortItem","sap.m.QuickViewGroup","sap.m.QuickViewGroupElement","sap.m.ResponsiveScale","sap.m.SegmentedButtonItem","sap.m.SelectionDetailsItem","sap.m.SelectionDetailsItemLine","sap.m.SinglePlanningCalendarDayView","sap.m.SinglePlanningCalendarMonthView","sap.m.SinglePlanningCalendarWeekView","sap.m.SinglePlanningCalendarWorkWeekView","sap.m.SinglePlanningCalendarView","sap.m.StandardDynamicDateOption","sap.m.SuggestionItem","sap.m.TabContainerItem","sap.m.TabStripItem","sap.m.ToolbarLayoutData","sap.m.UploadCollectionItem","sap.m.UploadCollectionParameter","sap.m.upload.Uploader","sap.m.upload.UploadSetItem","sap.m.VariantItem","sap.m.ViewSettingsCustomItem","sap.m.ViewSettingsCustomTab","sap.m.ViewSettingsFilterItem","sap.m.ViewSettingsItem","sap.m.plugins.CellSelector","sap.m.plugins.ColumnResizer","sap.m.plugins.DataStateIndicator","sap.m.plugins.PasteProvider","sap.m.plugins.PluginBase","sap.m.p13n.AbstractContainerItem","sap.m.semantic.AddAction","sap.m.semantic.CancelAction","sap.m.semantic.DeleteAction","sap.m.semantic.DiscussInJamAction","sap.m.semantic.EditAction","sap.m.semantic.FavoriteAction","sap.m.semantic.FilterAction","sap.m.semantic.FilterSelect","sap.m.semantic.FlagAction","sap.m.semantic.ForwardAction","sap.m.semantic.GroupAction","sap.m.semantic.GroupSelect","sap.m.semantic.MainAction","sap.m.semantic.MessagesIndicator","sap.m.semantic.MultiSelectAction","sap.m.semantic.NegativeAction","sap.m.semantic.OpenInAction","sap.m.semantic.PositiveAction","sap.m.semantic.PrintAction","sap.m.semantic.SaveAction","sap.m.semantic.SemanticButton","sap.m.semantic.SemanticControl","sap.m.semantic.SemanticSelect","sap.m.semantic.SemanticToggleButton","sap.m.semantic.SendEmailAction","sap.m.semantic.SendMessageAction","sap.m.semantic.ShareInJamAction","sap.m.semantic.SortAction","sap.m.semantic.SortSelect","sap.m.table.columnmenu.Entry","sap.m.table.columnmenu.Item","sap.m.table.columnmenu.ItemBase","sap.m.table.columnmenu.QuickAction","sap.m.table.columnmenu.QuickActionBase"],extensions:{flChangeHandlers:{"sap.m.ActionSheet":{"moveControls":"default"},"sap.m.Avatar":"sap/m/flexibility/Avatar","sap.m.Bar":"sap/m/flexibility/Bar","sap.m.Button":"sap/m/flexibility/Button","sap.m.CheckBox":"sap/m/flexibility/CheckBox","sap.m.ColumnListItem":{"hideControl":"default","unhideControl":"default"},"sap.m.CustomListItem":{"hideControl":"default","unhideControl":"default","moveControls":"default"},"sap.m.DatePicker":{"hideControl":"default","unhideControl":"default"},"sap.m.Dialog":"sap/m/flexibility/Dialog","sap.m.ExpandableText":"sap/m/flexibility/ExpandableText","sap.m.FlexBox":{"hideControl":"default","unhideControl":"default","moveControls":"default"},"sap.m.HBox":{"hideControl":"default","unhideControl":"default","moveControls":"default"},"sap.m.IconTabBar":"sap/m/flexibility/IconTabBar","sap.m.IconTabFilter":"sap/m/flexibility/IconTabFilter","sap.m.Image":{"hideControl":"default","unhideControl":"default"},"sap.m.Input":{"hideControl":"default","unhideControl":"default"},"sap.m.InputBase":{"hideControl":"default","unhideControl":"default"},"sap.m.InputListItem":"sap/m/flexibility/InputListItem","sap.m.Label":"sap/m/flexibility/Label","sap.m.MultiInput":{"hideControl":"default","unhideControl":"default"},"sap.m.ListItemBase":{"hideControl":"default","unhideControl":"default"},"sap.m.Link":"sap/m/flexibility/Link","sap.m.List":{"hideControl":"default","unhideControl":"default","moveControls":"default"},"sap.m.ListBase":{"hideControl":"default","unhideControl":"default","moveControls":"default"},"sap.m.MaskInput":{"hideControl":"default","unhideControl":"default"},"sap.m.MenuButton":"sap/m/flexibility/MenuButton","sap.m.OverflowToolbar":"sap/m/flexibility/OverflowToolbar","sap.m.OverflowToolbarButton":"sap/m/flexibility/OverflowToolbarButton","sap.m.Page":"sap/m/flexibility/Page","sap.m.Panel":"sap/m/flexibility/Panel","sap.m.Popover":"sap/m/flexibility/Popover","sap.m.RadioButton":"sap/m/flexibility/RadioButton","sap.m.RatingIndicator":{"hideControl":"default","unhideControl":"default"},"sap.m.RangeSlider":{"hideControl":"default","unhideControl":"default"},"sap.m.ScrollContainer":{"hideControl":"default","moveControls":"default","unhideControl":"default"},"sap.m.Slider":{"hideControl":"default","unhideControl":"default"},"sap.m.StandardListItem":"sap/m/flexibility/StandardListItem","sap.m.Table":"sap/m/flexibility/Table","sap.m.Column":{"hideControl":"default","unhideControl":"default"},"sap.m.Text":"sap/m/flexibility/Text","sap.m.Title":"sap/m/flexibility/Title","sap.m.Toolbar":"sap/m/flexibility/Toolbar","sap.m.VBox":{"hideControl":"default","unhideControl":"default","moveControls":"default"}},"sap.ui.support":{publicRules:true,internalRules:true}}});u.upload=u.upload||{};u.upload.UploaderHttpRequestMethod=U;u.BackgroundDesign={Solid:"Solid",Transparent:"Transparent",Translucent:"Translucent"};u.BadgeState={Updated:"Updated",Appear:"Appear",Disappear:"Disappear"};u.BadgeAnimationType={Full:"Full",Update:"Update",None:"None"};u.EmptyIndicatorMode={On:"On",Off:"Off",Auto:"Auto"};u.BadgeStyle={Default:"Default",Attention:"Attention"};u.BarDesign={Auto:"Auto",Header:"Header",SubHeader:"SubHeader",Footer:"Footer"};u.BreadcrumbsSeparatorStyle={Slash:"Slash",BackSlash:"BackSlash",DoubleSlash:"DoubleSlash",DoubleBackSlash:"DoubleBackSlash",GreaterThan:"GreaterThan",DoubleGreaterThan:"DoubleGreaterThan"};u.ButtonType={Default:"Default",Back:"Back",Accept:"Accept",Reject:"Reject",Transparent:"Transparent",Ghost:"Ghost",Up:"Up",Unstyled:"Unstyled",Emphasized:"Emphasized",Critical:"Critical",Negative:"Negative",Success:"Success",Neutral:"Neutral",Attention:"Attention"};u.ButtonAccessibilityType={Default:"Default",Labelled:"Labelled",Described:"Described",Combined:"Combined"};u.CarouselArrowsPlacement={Content:"Content",PageIndicator:"PageIndicator"};u.PlanningCalendarBuiltInView={Hour:"Hour",Day:"Day",Month:"Month",Week:"Week",OneMonth:"One Month"};u.DateTimeInputType={Date:"Date",DateTime:"DateTime",Time:"Time"};u.DialogType={Standard:"Standard",Message:"Message"};u.DialogRoleType={Dialog:"dialog",AlertDialog:"alertdialog"};u.DeviationIndicator={Up:"Up",Down:"Down",None:"None"};u.DraftIndicatorState={Clear:"Clear",Saving:"Saving",Saved:"Saved"};u.FacetFilterListDataType={Date:"Date",DateTime:"DateTime",Time:"Time",Integer:"Integer",Float:"Float",String:"String",Boolean:"Boolean"};u.FacetFilterType={Simple:"Simple",Light:"Light"};u.FlexAlignItems={Start:"Start",End:"End",Center:"Center",Baseline:"Baseline",Stretch:"Stretch",Inherit:"Inherit"};u.FlexAlignSelf={Auto:"Auto",Start:"Start",End:"End",Center:"Center",Baseline:"Baseline",Stretch:"Stretch",Inherit:"Inherit"};u.FlexDirection={Row:"Row",Column:"Column",RowReverse:"RowReverse",ColumnReverse:"ColumnReverse",Inherit:"Inherit"};u.FlexJustifyContent={Start:"Start",End:"End",Center:"Center",SpaceBetween:"SpaceBetween",SpaceAround:"SpaceAround",Inherit:"Inherit"};u.FlexWrap={NoWrap:"NoWrap",Wrap:"Wrap",WrapReverse:"WrapReverse"};u.FlexAlignContent={Start:"Start",End:"End",Center:"Center",SpaceBetween:"SpaceBetween",SpaceAround:"SpaceAround",Stretch:"Stretch",Inherit:"Inherit"};u.FlexRendertype={Div:"Div",List:"List",Bare:"Bare"};u.FrameType={OneByOne:"OneByOne",TwoByOne:"TwoByOne",TwoThirds:"TwoThirds",Auto:"Auto",TwoByHalf:"TwoByHalf",OneByHalf:"OneByHalf",Stretch:"Stretch"};u.LinkConversion={None:"None",ProtocolOnly:"ProtocolOnly",All:"All"};u.LinkAccessibleRole={Default:"Default",Button:"Button"};u.InputTextFormatMode={Value:"Value",Key:"Key",ValueKey:"ValueKey",KeyValue:"KeyValue"};u.GenericTagDesign={Full:"Full",StatusIconHidden:"StatusIconHidden"};u.GenericTagValueState={None:"None",Error:"Error"};u.GenericTileMode={ContentMode:"ContentMode",HeaderMode:"HeaderMode",ActionMode:"ActionMode",ArticleMode:"ArticleMode",LineMode:"LineMode",IconMode:"IconMode"};u.Priority={VeryHigh:"VeryHigh",High:"High",Medium:"Medium",Low:"Low",None:"None"};u.GenericTileScope={Display:"Display",Actions:"Actions",ActionMore:"ActionMore",ActionRemove:"ActionRemove"};u.TabsOverflowMode={End:"End",StartAndEnd:"StartAndEnd"};u.TileSizeBehavior={Responsive:"Responsive",Small:"Small"};u.HeaderLevel={H1:"H1",H2:"H2",H3:"H3",H4:"H4",H5:"H5",H6:"H6"};u.IBarHTMLTag={Div:"Div",Header:"Header",Footer:"Footer"};u.IconTabHeaderMode={Standard:"Standard",Inline:"Inline"};u.IconTabDensityMode={Inherit:"Inherit",Compact:"Compact",Cozy:"Cozy"};u.IconTabFilterDesign={Horizontal:"Horizontal",Vertical:"Vertical"};u.ImageMode={Image:"Image",Background:"Background"};u.Size={XS:"XS",S:"S",M:"M",L:"L",Auto:"Auto",Responsive:"Responsive"};u.ValueColor={Neutral:"Neutral",Good:"Good",Critical:"Critical",Error:"Error",None:"None"};u.ValueCSSColor=a.createType("sap.m.ValueCSSColor",{isValid:function(v){var R=u.ValueColor.hasOwnProperty(v);if(R){return R;}else{R=b.CSSColor.isValid(v);if(R){return R;}else{return b.CSSColor.isValid(P.get(v));}}}},a.getType("string"));u.SelectColumnRatio=a.createType("sap.m.SelectColumnRatio",{isValid:function(v){return/^([0-9]+:[0-9]+)$/.test(v);}},a.getType("string"));u.InputType={Text:"Text",Date:"Date",Datetime:"Datetime",DatetimeLocale:"DatetimeLocale",Email:"Email",Month:"Month",Number:"Number",Tel:"Tel",Time:"Time",Url:"Url",Week:"Week",Password:"Password"};u.LabelDesign={Bold:"Bold",Standard:"Standard"};u.ListHeaderDesign={Standard:"Standard",Plain:"Plain"};u.ListMode={None:"None",SingleSelect:"SingleSelect",SingleSelectLeft:"SingleSelectLeft",SingleSelectMaster:"SingleSelectMaster",MultiSelect:"MultiSelect",Delete:"Delete"};u.ListKeyboardMode={Navigation:"Navigation",Edit:"Edit"};u.ListGrowingDirection={Downwards:"Downwards",Upwards:"Upwards"};u.ListSeparators={All:"All",Inner:"Inner",None:"None"};u.ListType={Inactive:"Inactive",Detail:"Detail",Navigation:"Navigation",Active:"Active",DetailAndActive:"DetailAndActive"};u.SelectListKeyboardNavigationMode={None:"None",Delimited:"Delimited"};u.LoadState={Loading:"Loading",Loaded:"Loaded",Failed:"Failed",Disabled:"Disabled"};u.MenuButtonMode={Regular:"Regular",Split:"Split"};u.OverflowToolbarPriority={NeverOverflow:"NeverOverflow",Never:"Never",High:"High",Low:"Low",Disappear:"Disappear",AlwaysOverflow:"AlwaysOverflow",Always:"Always"};u.ObjectHeaderPictureShape={Circle:"Circle",Square:"Square"};u.P13nPanelType={sort:"sort",filter:"filter",group:"group",columns:"columns",dimeasure:"dimeasure",selection:"selection"};u.P13nPopupMode={Dialog:"Dialog",ResponsivePopover:"ResponsivePopover"};u.P13nConditionOperation={BT:"BT",EQ:"EQ",Contains:"Contains",StartsWith:"StartsWith",EndsWith:"EndsWith",LT:"LT",LE:"LE",GT:"GT",GE:"GE",Initial:"Initial",Empty:"Empty",NotBT:"NotBT",NotEQ:"NotEQ",NotContains:"NotContains",NotStartsWith:"NotStartsWith",NotEndsWith:"NotEndsWith",NotLT:"NotLT",NotLE:"NotLE",NotGT:"NotGT",NotGE:"NotGE",NotInitial:"NotInitial",NotEmpty:"NotEmpty",Ascending:"Ascending",Descending:"Descending",GroupAscending:"GroupAscending",GroupDescending:"GroupDescending",Total:"Total",Average:"Average",Minimum:"Minimum",Maximum:"Maximum"};u.P13nConditionOperationType={Include:"Include",Exclude:"Exclude"};u.PageBackgroundDesign={Standard:"Standard",List:"List",Solid:"Solid",Transparent:"Transparent"};u.PanelAccessibleRole={Complementary:"Complementary",Form:"Form",Region:"Region"};u.PDFViewerDisplayType={Auto:"Auto",Embedded:"Embedded",Link:"Link"};u.PlacementType={Left:"Left",Right:"Right",Top:"Top",Bottom:"Bottom",Vertical:"Vertical",VerticalPreferedTop:"VerticalPreferedTop",VerticalPreferredTop:"VerticalPreferredTop",VerticalPreferedBottom:"VerticalPreferedBottom",VerticalPreferredBottom:"VerticalPreferredBottom",Horizontal:"Horizontal",HorizontalPreferedRight:"HorizontalPreferedRight",HorizontalPreferredRight:"HorizontalPreferredRight",HorizontalPreferedLeft:"HorizontalPreferedLeft",HorizontalPreferredLeft:"HorizontalPreferredLeft",PreferredLeftOrFlip:"PreferredLeftOrFlip",PreferredRightOrFlip:"PreferredRightOrFlip",PreferredTopOrFlip:"PreferredTopOrFlip",PreferredBottomOrFlip:"PreferredBottomOrFlip",Auto:"Auto"};u.StandardDynamicDateRangeKeys={DATE:"DATE",DATETIME:"DATETIME",TODAY:"TODAY",YESTERDAY:"YESTERDAY",TOMORROW:"TOMORROW",FIRSTDAYWEEK:"FIRSTDAYWEEK",LASTDAYWEEK:"LASTDAYWEEK",FIRSTDAYMONTH:"FIRSTDAYMONTH",LASTDAYMONTH:"LASTDAYMONTH",FIRSTDAYQUARTER:"FIRSTDAYQUARTER",LASTDAYQUARTER:"LASTDAYQUARTER",FIRSTDAYYEAR:"FIRSTDAYYEAR",LASTDAYYEAR:"LASTDAYYEAR",DATERANGE:"DATERANGE",DATETIMERANGE:"DATETIMERANGE",FROM:"FROM",TO:"TO",FROMDATETIME:"FROMDATETIME",TODATETIME:"TODATETIME",YEARTODATE:"YEARTODATE",DATETOYEAR:"DATETOYEAR",LASTDAYS:"LASTDAYS",LASTWEEKS:"LASTWEEKS",LASTMONTHS:"LASTMONTHS",LASTQUARTERS:"LASTQUARTERS",LASTYEARS:"LASTYEARS",NEXTDAYS:"NEXTDAYS",NEXTWEEKS:"NEXTWEEKS",NEXTMONTHS:"NEXTMONTHS",NEXTQUARTERS:"NEXTQUARTERS",NEXTYEARS:"NEXTYEARS",TODAYFROMTO:"TODAYFROMTO",THISWEEK:"THISWEEK",LASTWEEK:"LASTWEEK",NEXTWEEK:"NEXTWEEK",SPECIFICMONTH:"SPECIFICMONTH",SPECIFICMONTHINYEAR:"SPECIFICMONTHINYEAR",THISMONTH:"THISMONTH",LASTMONTH:"LASTMONTH",NEXTMONTH:"NEXTMONTH",THISQUARTER:"THISQUARTER",LASTQUARTER:"LASTQUARTER",NEXTQUARTER:"NEXTQUARTER",QUARTER1:"QUARTER1",QUARTER2:"QUARTER2",QUARTER3:"QUARTER3",QUARTER4:"QUARTER4",THISYEAR:"THISYEAR",LASTYEAR:"LASTYEAR",NEXTYEAR:"NEXTYEAR"};u.QuickViewGroupElementType={phone:"phone",mobile:"mobile",email:"email",link:"link",text:"text",pageLink:"pageLink"};u.VerticalPlacementType={Top:"Top",Bottom:"Bottom",Vertical:"Vertical"};u.PopinDisplay={Block:"Block",Inline:"Inline",WithoutHeader:"WithoutHeader"};u.PopinLayout={Block:"Block",GridSmall:"GridSmall",GridLarge:"GridLarge"};u.Sticky={ColumnHeaders:"ColumnHeaders",HeaderToolbar:"HeaderToolbar",InfoToolbar:"InfoToolbar"};u.RatingIndicatorVisualMode={Full:"Full",Half:"Half"};u.ScreenSize={Phone:"Phone",Tablet:"Tablet",Desktop:"Desktop",XXSmall:"XXSmall",XSmall:"XSmall",Small:"Small",Medium:"Medium",Large:"Large",XLarge:"XLarge",XXLarge:"XXLarge"};u.SelectionDetailsActionLevel={Item:"Item",List:"List",Group:"Group"};u.SelectType={Default:"Default",IconOnly:"IconOnly"};u.SplitAppMode={ShowHideMode:"ShowHideMode",StretchCompressMode:"StretchCompressMode",PopoverMode:"PopoverMode",HideMode:"HideMode"};u.StandardTileType={Create:"Create",Monitor:"Monitor",None:"None"};u.semantic=u.semantic||{};u.semantic.SemanticRuleSetType={Classic:"Classic",Optimized:"Optimized"};u.ObjectMarkerType={Flagged:"Flagged",Favorite:"Favorite",Draft:"Draft",Locked:"Locked",Unsaved:"Unsaved",LockedBy:"LockedBy",UnsavedBy:"UnsavedBy"};u.ObjectMarkerVisibility={IconOnly:"IconOnly",TextOnly:"TextOnly",IconAndText:"IconAndText"};u.SwipeDirection={LeftToRight:"LeftToRight",RightToLeft:"RightToLeft",BeginToEnd:"BeginToEnd",EndToBegin:"EndToBegin",Both:"Both"};u.SwitchType={Default:"Default",AcceptReject:"AcceptReject"};u.TokenizerRenderMode={Loose:"Loose",Narrow:"Narrow"};u.ToolbarDesign={Auto:"Auto",Transparent:"Transparent",Info:"Info",Solid:"Solid"};u.ToolbarStyle={Standard:"Standard",Clear:"Clear"};u.TimePickerMaskMode={On:"On",Off:"Off"};u.StringFilterOperator={Equals:"Equals",Contains:"Contains",StartsWith:"StartsWith",AnyWordStartsWith:"AnyWordStartsWith"};u.LightBoxLoadingStates={Loading:"LOADING",Loaded:"LOADED",TimeOutError:"TIME_OUT_ERROR",Error:"ERROR"};u.StepInputValidationMode={FocusOut:"FocusOut",LiveChange:"LiveChange"};u.StepInputStepModeType={AdditionAndSubtraction:"AdditionAndSubtraction",Multiple:"Multiple"};u.UploadState={Complete:"Complete",Error:"Error",Ready:"Ready",Uploading:"Uploading"};u.WrappingType={Normal:"Normal",Hyphenated:"Hyphenated"};u.PlanningCalendarStickyMode={None:"None",All:"All",NavBarAndColHeaders:"NavBarAndColHeaders"};u.TitleAlignment={None:"None",Auto:"Auto",Start:"Start",Center:"Center"};u.ExpandableTextOverflowMode={InPlace:"InPlace",Popover:"Popover"};u.AvatarShape=A;u.AvatarSize=h;u.AvatarType=n;u.AvatarColor=p;u.AvatarImageFitType=r;u.IllustratedMessageSize=I;u.IllustratedMessageType=s;u.WizardRenderMode={Scroll:"Scroll",Page:"Page"};u.ResetAllMode={Default:"Default",ServiceDefault:"ServiceDefault",ServiceReset:"ServiceReset"};u.MultiSelectMode={Default:"Default",ClearAll:"ClearAll"};(function(){sap.ui.lazyRequire("sap.m.DynamicDate");sap.ui.lazyRequire("sap.m.MessageToast","show");sap.ui.lazyRequire("sap.m.routing.RouteMatchedHandler");sap.ui.lazyRequire("sap.m.routing.Router");sap.ui.lazyRequire("sap.m.routing.Target");sap.ui.lazyRequire("sap.m.routing.TargetHandler");sap.ui.lazyRequire("sap.m.routing.Targets");}());if(/sap-ui-xx-formfactor=compact/.test(location.search)){q("html").addClass("sapUiSizeCompact");u._bSizeCompact=true;}if(/sap-ui-xx-formfactor=condensed/.test(location.search)){q("html").addClass("sapUiSizeCondensed");u._bSizeCondensed=true;}u.getInvalidDate=function(){return null;};u.getLocale=function(){var l=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();u.getLocale=function(){return l;};return l;};u.getLocaleData=function(){var l=t.getInstance(u.getLocale());u.getLocaleData=function(){return l;};return l;};u.isDate=function(v){return v&&Object.prototype.toString.call(v)=="[object Date]"&&!isNaN(v);};u.getIScroll=function(c){if(typeof window.iScroll!="function"||!(c instanceof C)){return;}var i,j;for(i=c;i=i.oParent;){j=i.getScrollDelegate?i.getScrollDelegate()._scroller:null;if(j&&j instanceof window.iScroll){return j;}}};u.getScrollDelegate=function(i,G){if(!(i instanceof C)){return;}var j=sap.ui.require("sap/ui/core/UIComponent");function k(c){if(!c){return;}return G&&j&&(c instanceof j)?c.oContainer:c.oParent;}for(var l=i;l=k(l);){if(l&&typeof l.getScrollDelegate=="function"){return l.getScrollDelegate(i);}}};u.ScreenSizes={phone:240,tablet:600,desktop:1024,xxsmall:240,xsmall:320,small:480,medium:560,large:768,xlarge:960,xxlarge:1120};f(u,"BaseFontSize",function(){u.BaseFontSize=q(document.documentElement).css("font-size")||"16px";return u.BaseFontSize;});u.closeKeyboard=function(){var c=document.activeElement;if(!D.system.desktop&&c&&/(INPUT|TEXTAREA)/i.test(c.tagName)){c.blur();}};u.touch=u.touch||{};u.touch.find=function(T,c){var i,j;if(!T){return;}if(c&&typeof c.identifier!=="undefined"){c=c.identifier;}else if(typeof c!=="number"){e(false,"sap.m.touch.find(): oTouch must be a touch object or a number");return;}j=T.length;for(i=0;i<j;i++){if(T[i].identifier===c){return T[i];}}};u.touch.countContained=function(T,v){var i,c=0,j,k,$;if(!T){return 0;}if(v instanceof Element){v=q(v);}else if(typeof v==="string"){v=q(document.getElementById(v));}else if(!(v instanceof q)){e(false,"sap.m.touch.countContained(): vElement must be a jQuery object or Element reference or a string");return 0;}k=v.children().length;j=T.length;for(i=0;i<j;i++){$=q(T[i].target);if((k===0&&$.is(v))||(v[0].contains($[0]))){c++;}}return c;};u.URLHelper=(function(){function i(v){return v&&Object.prototype.toString.call(v)=="[object String]";}function c(T){if(!i(T)){return"";}return T.replace(/[^0-9\+\*#]/g,"");}function j(T){if(!i(T)){return"";}T=T.split(/\r\n|\r|\n/g).join("\r\n");return encodeURIComponent(T);}return q.extend(new E(),{normalizeTel:function(T){return"tel:"+c(T);},normalizeSms:function(T){return"sms:"+c(T);},normalizeEmail:function(k,S,B,l,m){var v=[],w="mailto:",x=encodeURIComponent;i(k)&&(w+=x(k.trim()));i(S)&&v.push("subject="+x(S));i(B)&&v.push("body="+j(B));i(m)&&v.push("bcc="+x(m.trim()));i(l)&&v.push("cc="+x(l.trim()));if(v.length){w+="?"+v.join("&");}return w;},redirect:function(k,N){e(i(k),this+"#redirect: URL must be a string");this.fireEvent("redirect",k);if(!N){window.location.href=k;}else{o(k,"_blank");}},attachRedirect:function(F,l){return this.attachEvent("redirect",F,l);},detachRedirect:function(F,l){return this.detachEvent("redirect",F,l);},triggerTel:function(T){this.redirect(this.normalizeTel(T));},triggerSms:function(T){this.redirect(this.normalizeSms(T));},triggerEmail:function(k,S,B,l,m,N){var N=N||false;this.redirect(this.normalizeEmail.apply(0,[k,S,B,l,m]),N);},toString:function(){return"sap.m.URLHelper";}});}());u.BackgroundHelper={addBackgroundColorStyles:function(c,B,i,j){c.class(j||"sapUiGlobalBackgroundColor");if(B&&!a.getType("sap.ui.core.CSSColor").isValid(B)){L.warning(B+" is not a valid sap.ui.core.CSSColor type");B="";}if(B||i){c.style("background-image","none");c.style("filter","none");}if(B){c.style("background-color",B);}},renderBackgroundImageTag:function(c,j,v,B,R,k){c.openStart("div",j.getId()+"-BG");if(Array.isArray(v)){for(var i=0;i<v.length;i++){c.class(v[i]);}}else{c.class(v);}c.class("sapUiGlobalBackgroundImage");if(B){c.style("display","block");c.style("background-image","url("+g(B)+")");c.style("background-repeat",R?"repeat":"no-repeat");if(!R){c.style("background-size","cover");c.style("background-position","center");}else{c.style("background-position","left top");}}if(k!==1){if(k>1){k=1;}c.style("opacity",k);}c.openEnd();c.close("div");}};u.ImageHelper=(function(){function c(j,k,v){if(v!==undefined){var S=j["set"+d(k)];if(typeof(S)==="function"){S.call(j,v);return true;}}return false;}var i={getImageControl:function(j,m,v,w,x,y){e(w.src,"sap.m.ImageHelper.getImageControl: mProperties do not contain 'src'");if(m&&(m.getSrc()!=w.src)){m.destroy();m=undefined;}if(m&&(m instanceof sap.m.Image||m instanceof sap.ui.core.Icon)){for(var z in w){c(m,z,w[z]);}}else{var S=Object.assign({},w,{id:j});m=sap.ui.core.IconPool.createControlByURI(S,sap.m.Image);m.setParent(v,null,true);}if(y){for(var l=0,B=y.length;l!==B;l++){m.removeStyleClass(y[l]);}}if(x){for(var k=0,F=x.length;k!==F;k++){m.addStyleClass(x[k]);}}return m;}};return i;}());u.PopupHelper={calcPercentageSize:function(c,B){if(typeof c!=="string"){L.warning("sap.m.PopupHelper: calcPercentageSize, the first parameter"+c+"isn't with type string");return null;}if(c.indexOf("%")<=0){L.warning("sap.m.PopupHelper: calcPercentageSize, the first parameter"+c+"is not a percentage string (for example '25%')");return null;}var i=parseFloat(c)/100,j=parseFloat(B);return Math.floor(i*j)+"px";}};u.InputODataSuggestProvider=(function(){var _=function(i){var j=i.getSource();var v=j.data(j.getId()+"-#valueListAnnotation");var m=j.getModel();var k=j.getBinding("value");var w=m.resolve(k.getPath(),k.getContext());if(!v){return;}var R=i.getParameter("selectedRow");q.each(R.getCells(),function(x,y){var z=y.getBinding("text");q.each(v.outParameters,function(K,B){if(!B.displayOnly&&B.value==z.getPath()){var V=z.getValue();var F=m.resolve(K,k.getContext());if(V&&F!==w){m.setProperty(F,V);}}});});return true;};var c=function(v,R){var M=v.getModel();var w=M.oMetadata;var x=M.resolve(v.getBindingPath("value"),v.getBindingContext());var V={};V.searchSupported=false;V.collectionPath="";V.outParameters={};V.inParameters={};V.selection=[];var y=M.getProperty(x+"/#com.sap.vocabularies.Common.v1.ValueList");if(!y){return false;}var z=x.substr(x.lastIndexOf("/")+1);V.inProperty=z;q.each(y.record,function(i,B){q.each(B,function(j,F){if(F.property==="SearchSupported"&&F.bool){V.searchSupported=true;}if(F.property==="CollectionPath"){V.collectionPath=F.string;}if(F.property==="Parameters"){q.each(F.collection.record,function(k,G){if(G.type==="com.sap.vocabularies.Common.v1.ValueListParameterIn"){var H;q.each(G.propertyValue,function(m,J){if(J.property==="LocalDataProperty"){H=J.propertyPath;}});q.each(G.propertyValue,function(m,J){if(J.property==="ValueListProperty"){V.inParameters[H]={value:J.string};}});}else if(G.type==="com.sap.vocabularies.Common.v1.ValueListParameterInOut"){var H;q.each(G.propertyValue,function(m,J){if(J.property==="LocalDataProperty"){H=J.propertyPath;}});q.each(G.propertyValue,function(m,J){if(J.property==="ValueListProperty"){V.outParameters[H]={value:J.string};V.inParameters[H]={value:J.string};}});}else if(G.type==="com.sap.vocabularies.Common.v1.ValueListParameterOut"){var H;q.each(G.propertyValue,function(m,J){if(J.property==="LocalDataProperty"){H=J.propertyPath;}});q.each(G.propertyValue,function(m,J){if(J.property==="ValueListProperty"){V.outParameters[H]={value:J.string};}});}else if(G.type==="com.sap.vocabularies.Common.v1.ValueListParameterDisplayOnly"){var H;q.each(G.propertyValue,function(m,J){if(J.property==="ValueListProperty"){V.outParameters[J.string]={value:J.string,displayOnly:true};}});}});}});});V.resultEntity=w._getEntityTypeByPath("/"+V.collectionPath);V.listItem=new sap.m.ColumnListItem();q.each(V.outParameters,function(k,i){V.listItem.addCell(new sap.m.Text({text:"{"+i.value+"}",wrapping:false}));v.addSuggestionColumn(new sap.m.Column({header:new sap.m.Text({text:"{/#"+V.resultEntity.name+"/"+i.value+"/@sap:label}",wrapping:false})}));V.selection.push(i.value);});v.data(v.getId()+"-#valueListAnnotation",V);if(R){v.attachSuggestionItemSelected(_);}};var l={suggest:function(i,R,j,k){var v,m=i.getSource();R=R===undefined?true:R;j=j===undefined?true:j;if(!m.data(m.getId()+"-#valueListAnnotation")){c(m,j);}v=m.data(m.getId()+"-#valueListAnnotation");if(!v){return;}var w=function(i){var B=this.getLength();if(B&&B<=k){m.setShowTableSuggestionValueHelp(false);}else{m.setShowTableSuggestionValueHelp(true);}};if(v.searchSupported){var F=[];var S,x={};if(R){q.each(v.inParameters,function(K,y){if(K==v.inProperty){S=y.value;}else if(R){var V=m.getModel().getProperty(K,m.getBinding("value").getContext());if(V){F.push(new sap.ui.model.Filter(y.value,sap.ui.model.FilterOperator.StartsWith,V));}}});}x.search=i.getParameter("suggestValue");if(v.inParameters.length){if(S){x["search-focus"]=S;}else{e(false,"no search-focus defined");}}m.bindAggregation("suggestionRows",{path:"/"+v.collectionPath,length:k,filters:F,parameters:{select:v.selection.join(","),custom:x},events:{dataReceived:w},template:v.listItem});}else{var F=[];q.each(v.inParameters,function(K,y){if(K==v.inProperty){F.push(new sap.ui.model.Filter(y.value,sap.ui.model.FilterOperator.StartsWith,i.getParameter("suggestValue")));}else if(R){var V=m.getModel().getProperty(K,m.getBinding("value").getContext());if(V){F.push(new sap.ui.model.Filter(y.value,sap.ui.model.FilterOperator.StartsWith,V));}}});m.bindAggregation("suggestionRows",{path:"/"+v.collectionPath,filters:F,template:v.listItem,length:k,parameters:{select:v.selection.join(",")},events:{dataReceived:w}});}}};return l;}());O.set("sap.ui.layout.form.FormHelper",{createLabel:function(T,i){return new sap.m.Label(i,{text:T});},createButton:function(i,c,j){var B=new sap.m.Button(i,{type:u.ButtonType.Transparent});B.attachEvent("press",c,this);j.call(this,B);},setButtonContent:function(B,T,c,i,j){B.setText(T);B.setTooltip(c);B.setIcon(i);B.setActiveIcon(j);},addFormClass:function(){return"sapUiFormM";},setToolbar:function(T){var c=this.getToolbar();if(c&&c.setDesign){c.setDesign(c.getDesign(),true);}if(T&&T.setDesign){T.setDesign(sap.m.ToolbarDesign.Transparent,true);}return T;},getToolbarTitle:function(T){if(T){var c=T.getContent();for(var i=0;i<c.length;i++){var j=c[i];if(j.isA("sap.m.Title")){return j.getId();}}return T.getId();}},createDelimiter:function(c,i){return new sap.m.Text(i,{text:c,textAlign:b.TextAlign.Center});},createSemanticDisplayControl:function(T,i){return new sap.m.Text(i,{text:T});},updateDelimiter:function(T,c){T.setText(c);},updateSemanticDisplayControl:function(T,c){T.setText(c);},bArrowKeySupport:false,bFinal:true});O.set("sap.ui.unified.FileUploaderHelper",{createTextField:function(i){var T=new sap.m.Input(i);return T;},setTextFieldContent:function(T,w){T.setWidth(w);},createButton:function(i){var B=new sap.m.Button(i);return B;},addFormClass:function(){return"sapUiFUM";},bFinal:true});O.set("sap.ui.unified.ColorPickerHelper",{isResponsive:function(){return true;},factory:{createLabel:function(c){return new sap.m.Label(c);},createInput:function(i,c){return new sap.m.InputBase(i,c);},createSlider:function(i,c){return new sap.m.Slider(i,c);},createRadioButtonGroup:function(c){return new sap.m.RadioButtonGroup(c);},createRadioButtonItem:function(c){return new sap.m.RadioButton(c);},createButton:function(i,c){return new sap.m.Button(i,c);}},bFinal:true});O.set("sap.ui.table.TableHelper",{createLabel:function(c){return new sap.m.Label(c);},createTextView:function(c){return new sap.m.Label(c);},addTableClass:function(){return"sapUiTableM";},bFinal:true});O.set("sap.ui.layout.GridHelper",{getLibrarySpecificClass:function(){return"";},bFinal:true});if(D.os.android){q(window).on("resize",function(){var c=document.activeElement;var T=c?c.tagName:"";if(T=="INPUT"||T=="TEXTAREA"){setTimeout(function(){c.scrollIntoViewIfNeeded();},0);}});}if(!Number.MAX_SAFE_INTEGER){Number.MAX_SAFE_INTEGER=Math.pow(2,53)-1;}return u;});
