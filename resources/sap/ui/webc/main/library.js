/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/library","./thirdparty/Assets","./library.config"],function(e){"use strict";var i=sap.ui.getCore().initLibrary({name:"sap.ui.webc.main",version:"1.107.1",dependencies:["sap.ui.core","sap.ui.webc.common"],noLibraryCSS:true,designtime:"sap/ui/webc/main/designtime/library.designtime",interfaces:["sap.ui.webc.main.IAvatar","sap.ui.webc.main.IBreadcrumbsItem","sap.ui.webc.main.IButton","sap.ui.webc.main.ICalendarDate","sap.ui.webc.main.IColorPaletteItem","sap.ui.webc.main.IComboBoxItem","sap.ui.webc.main.IIcon","sap.ui.webc.main.IInput","sap.ui.webc.main.IInputSuggestionItem","sap.ui.webc.main.IListItem","sap.ui.webc.main.IMenuItem","sap.ui.webc.main.IMultiComboBoxItem","sap.ui.webc.main.ISegmentedButtonItem","sap.ui.webc.main.ISelectOption","sap.ui.webc.main.ITab","sap.ui.webc.main.ITableCell","sap.ui.webc.main.ITableColumn","sap.ui.webc.main.ITableRow","sap.ui.webc.main.IToken","sap.ui.webc.main.ITreeItem"],types:["sap.ui.webc.main.AvatarColorScheme","sap.ui.webc.main.AvatarGroupType","sap.ui.webc.main.AvatarShape","sap.ui.webc.main.AvatarSize","sap.ui.webc.main.BreadcrumbsDesign","sap.ui.webc.main.BreadcrumbsSeparatorStyle","sap.ui.webc.main.BusyIndicatorSize","sap.ui.webc.main.ButtonDesign","sap.ui.webc.main.CalendarSelectionMode","sap.ui.webc.main.CarouselArrowsPlacement","sap.ui.webc.main.GrowingMode","sap.ui.webc.main.HasPopup","sap.ui.webc.main.InputType","sap.ui.webc.main.LinkDesign","sap.ui.webc.main.ListGrowingMode","sap.ui.webc.main.ListItemType","sap.ui.webc.main.ListMode","sap.ui.webc.main.ListSeparators","sap.ui.webc.main.MessageStripDesign","sap.ui.webc.main.PanelAccessibleRole","sap.ui.webc.main.PopoverHorizontalAlign","sap.ui.webc.main.PopoverPlacementType","sap.ui.webc.main.PopoverVerticalAlign","sap.ui.webc.main.Priority","sap.ui.webc.main.SemanticColor","sap.ui.webc.main.SwitchDesign","sap.ui.webc.main.TabLayout","sap.ui.webc.main.TableGrowingMode","sap.ui.webc.main.TableMode","sap.ui.webc.main.TableRowType","sap.ui.webc.main.TabsOverflowMode","sap.ui.webc.main.TitleLevel","sap.ui.webc.main.ToastPlacement","sap.ui.webc.main.WrappingType"],controls:["sap.ui.webc.main.Avatar","sap.ui.webc.main.AvatarGroup","sap.ui.webc.main.Badge","sap.ui.webc.main.Breadcrumbs","sap.ui.webc.main.BreadcrumbsItem","sap.ui.webc.main.BusyIndicator","sap.ui.webc.main.Button","sap.ui.webc.main.Calendar","sap.ui.webc.main.CalendarDate","sap.ui.webc.main.Card","sap.ui.webc.main.CardHeader","sap.ui.webc.main.Carousel","sap.ui.webc.main.CheckBox","sap.ui.webc.main.ColorPalette","sap.ui.webc.main.ColorPaletteItem","sap.ui.webc.main.ColorPalettePopover","sap.ui.webc.main.ColorPicker","sap.ui.webc.main.ComboBox","sap.ui.webc.main.ComboBoxGroupItem","sap.ui.webc.main.ComboBoxItem","sap.ui.webc.main.CustomListItem","sap.ui.webc.main.DatePicker","sap.ui.webc.main.DateRangePicker","sap.ui.webc.main.DateTimePicker","sap.ui.webc.main.Dialog","sap.ui.webc.main.FileUploader","sap.ui.webc.main.GroupHeaderListItem","sap.ui.webc.main.Icon","sap.ui.webc.main.Input","sap.ui.webc.main.Label","sap.ui.webc.main.Link","sap.ui.webc.main.List","sap.ui.webc.main.Menu","sap.ui.webc.main.MenuItem","sap.ui.webc.main.MessageStrip","sap.ui.webc.main.MultiComboBox","sap.ui.webc.main.MultiComboBoxGroupItem","sap.ui.webc.main.MultiComboBoxItem","sap.ui.webc.main.MultiInput","sap.ui.webc.main.Option","sap.ui.webc.main.Panel","sap.ui.webc.main.Popover","sap.ui.webc.main.ProgressIndicator","sap.ui.webc.main.RadioButton","sap.ui.webc.main.RangeSlider","sap.ui.webc.main.RatingIndicator","sap.ui.webc.main.ResponsivePopover","sap.ui.webc.main.SegmentedButton","sap.ui.webc.main.SegmentedButtonItem","sap.ui.webc.main.Select","sap.ui.webc.main.Slider","sap.ui.webc.main.SplitButton","sap.ui.webc.main.StandardListItem","sap.ui.webc.main.StepInput","sap.ui.webc.main.SuggestionGroupItem","sap.ui.webc.main.SuggestionItem","sap.ui.webc.main.Switch","sap.ui.webc.main.Tab","sap.ui.webc.main.TabContainer","sap.ui.webc.main.Table","sap.ui.webc.main.TableCell","sap.ui.webc.main.TableColumn","sap.ui.webc.main.TableGroupRow","sap.ui.webc.main.TableRow","sap.ui.webc.main.TabSeparator","sap.ui.webc.main.TextArea","sap.ui.webc.main.TimePicker","sap.ui.webc.main.Title","sap.ui.webc.main.Toast","sap.ui.webc.main.ToggleButton","sap.ui.webc.main.Token","sap.ui.webc.main.Tree","sap.ui.webc.main.TreeItem"],elements:[],extensions:{flChangeHandlers:{"sap.ui.webc.main.Avatar":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.Badge":"sap/ui/webc/main/flexibility/Badge","sap.ui.webc.main.BreadcrumbsItem":"sap/ui/webc/main/flexibility/BreadcrumbsItem","sap.ui.webc.main.BusyIndicator":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.Button":"sap/ui/webc/main/flexibility/Button","sap.ui.webc.main.Card":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.Carousel":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.CheckBox":"sap/ui/webc/main/flexibility/CheckBox","sap.ui.webc.main.CustomListItem":{hideControl:"default",unhideControl:"default",moveControls:"default"},"sap.ui.webc.main.DatePicker":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.DateTimePicker":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.Dialog":"sap/ui/webc/main/flexibility/Dialog","sap.ui.webc.main.Input":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.Label":"sap/ui/webc/main/flexibility/Label","sap.ui.webc.main.Link":"sap/ui/webc/main/flexibility/Link","sap.ui.webc.main.List":"sap/ui/webc/main/flexibility/List","sap.ui.webc.main.MultiInput":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.Panel":"sap/ui/webc/main/flexibility/Panel","sap.ui.webc.main.Popover":"sap/ui/webc/main/flexibility/Popover","sap.ui.webc.main.RadioButton":"sap/ui/webc/main/flexibility/RadioButton","sap.ui.webc.main.RangeSlider":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.RatingIndicator":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.ResponsivePopover":"sap/ui/webc/main/flexibility/ResponsivePopover","sap.ui.webc.main.Slider":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.StandardListItem":"sap/ui/webc/main/flexibility/StandardListItem","sap.ui.webc.main.Tab":"sap/ui/webc/main/flexibility/Tab","sap.ui.webc.main.TabContainer":"sap/ui/webc/main/flexibility/TabContainer","sap.ui.webc.main.Table":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.main.Title":"sap/ui/webc/main/flexibility/Title"}}});i.AvatarColorScheme={Accent1:"Accent1",Accent10:"Accent10",Accent2:"Accent2",Accent3:"Accent3",Accent4:"Accent4",Accent5:"Accent5",Accent6:"Accent6",Accent7:"Accent7",Accent8:"Accent8",Accent9:"Accent9",Placeholder:"Placeholder"};i.AvatarGroupType={Group:"Group",Individual:"Individual"};i.AvatarShape={Circle:"Circle",Square:"Square"};i.AvatarSize={L:"L",M:"M",S:"S",XL:"XL",XS:"XS"};i.BreadcrumbsDesign={NoCurrentPage:"NoCurrentPage",Standard:"Standard"};i.BreadcrumbsSeparatorStyle={BackSlash:"BackSlash",DoubleBackSlash:"DoubleBackSlash",DoubleGreaterThan:"DoubleGreaterThan",DoubleSlash:"DoubleSlash",GreaterThan:"GreaterThan",Slash:"Slash"};i.BusyIndicatorSize={Large:"Large",Medium:"Medium",Small:"Small"};i.ButtonDesign={Attention:"Attention",Default:"Default",Emphasized:"Emphasized",Negative:"Negative",Positive:"Positive",Transparent:"Transparent"};i.CalendarSelectionMode={Multiple:"Multiple",Range:"Range",Single:"Single"};i.CarouselArrowsPlacement={Content:"Content",Navigation:"Navigation"};i.GrowingMode={Button:"Button",None:"None",Scroll:"Scroll"};i.HasPopup={Dialog:"Dialog",Grid:"Grid",ListBox:"ListBox",Menu:"Menu",Tree:"Tree"};i.InputType={Email:"Email",Number:"Number",Password:"Password",Tel:"Tel",Text:"Text",URL:"URL"};i.LinkDesign={Default:"Default",Emphasized:"Emphasized",Subtle:"Subtle"};i.ListGrowingMode={Button:"Button",None:"None",Scroll:"Scroll"};i.ListItemType={Active:"Active",Detail:"Detail",Inactive:"Inactive"};i.ListMode={Delete:"Delete",MultiSelect:"MultiSelect",None:"None",SingleSelect:"SingleSelect",SingleSelectAuto:"SingleSelectAuto",SingleSelectBegin:"SingleSelectBegin",SingleSelectEnd:"SingleSelectEnd"};i.ListSeparators={All:"All",Inner:"Inner",None:"None"};i.MessageStripDesign={Information:"Information",Negative:"Negative",Positive:"Positive",Warning:"Warning"};i.PanelAccessibleRole={Complementary:"Complementary",Form:"Form",Region:"Region"};i.PopoverHorizontalAlign={Center:"Center",Left:"Left",Right:"Right",Stretch:"Stretch"};i.PopoverPlacementType={Bottom:"Bottom",Left:"Left",Right:"Right",Top:"Top"};i.PopoverVerticalAlign={Bottom:"Bottom",Center:"Center",Stretch:"Stretch",Top:"Top"};i.Priority={High:"High",Low:"Low",Medium:"Medium",None:"None"};i.SemanticColor={Critical:"Critical",Default:"Default",Negative:"Negative",Neutral:"Neutral",Positive:"Positive"};i.SwitchDesign={Graphical:"Graphical",Textual:"Textual"};i.TabLayout={Inline:"Inline",Standard:"Standard"};i.TableGrowingMode={Button:"Button",None:"None",Scroll:"Scroll"};i.TableMode={MultiSelect:"MultiSelect",None:"None",SingleSelect:"SingleSelect"};i.TableRowType={Active:"Active",Inactive:"Inactive"};i.TabsOverflowMode={End:"End",StartAndEnd:"StartAndEnd"};i.TitleLevel={H1:"H1",H2:"H2",H3:"H3",H4:"H4",H5:"H5",H6:"H6"};i.ToastPlacement={BottomCenter:"BottomCenter",BottomEnd:"BottomEnd",BottomStart:"BottomStart",MiddleCenter:"MiddleCenter",MiddleEnd:"MiddleEnd",MiddleStart:"MiddleStart",TopCenter:"TopCenter",TopEnd:"TopEnd",TopStart:"TopStart"};i.WrappingType={None:"None",Normal:"Normal"};return i});
//# sourceMappingURL=library.js.map