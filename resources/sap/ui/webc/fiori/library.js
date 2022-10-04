/*!
 * OpenUI5
 * (c) Copyright 2009-2022 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/webc/common/library","./thirdparty/Assets","./library.config"],function(e){"use strict";var i=sap.ui.getCore().initLibrary({name:"sap.ui.webc.fiori",version:"1.107.0",dependencies:["sap.ui.core","sap.ui.webc.common"],noLibraryCSS:true,designtime:"sap/ui/webc/main/designtime/library.designtime",interfaces:["sap.ui.webc.fiori.IBar","sap.ui.webc.fiori.IFilterItem","sap.ui.webc.fiori.IFilterItemOption","sap.ui.webc.fiori.IMediaGalleryItem","sap.ui.webc.fiori.INotificationAction","sap.ui.webc.fiori.INotificationListItem","sap.ui.webc.fiori.IProductSwitchItem","sap.ui.webc.fiori.IShellBarItem","sap.ui.webc.fiori.ISideNavigationItem","sap.ui.webc.fiori.ISideNavigationSubItem","sap.ui.webc.fiori.ISortItem","sap.ui.webc.fiori.ITimelineItem","sap.ui.webc.fiori.IUploadCollectionItem","sap.ui.webc.fiori.IWizardStep"],types:["sap.ui.webc.fiori.BarDesign","sap.ui.webc.fiori.FCLLayout","sap.ui.webc.fiori.IllustrationMessageSize","sap.ui.webc.fiori.IllustrationMessageType","sap.ui.webc.fiori.MediaGalleryItemLayout","sap.ui.webc.fiori.MediaGalleryLayout","sap.ui.webc.fiori.MediaGalleryMenuHorizontalAlign","sap.ui.webc.fiori.MediaGalleryMenuVerticalAlign","sap.ui.webc.fiori.PageBackgroundDesign","sap.ui.webc.fiori.SideContentFallDown","sap.ui.webc.fiori.SideContentPosition","sap.ui.webc.fiori.SideContentVisibility","sap.ui.webc.fiori.TimelineLayout","sap.ui.webc.fiori.UploadState"],controls:["sap.ui.webc.fiori.Bar","sap.ui.webc.fiori.BarcodeScannerDialog","sap.ui.webc.fiori.DynamicSideContent","sap.ui.webc.fiori.FilterItem","sap.ui.webc.fiori.FilterItemOption","sap.ui.webc.fiori.FlexibleColumnLayout","sap.ui.webc.fiori.IllustratedMessage","sap.ui.webc.fiori.MediaGallery","sap.ui.webc.fiori.MediaGalleryItem","sap.ui.webc.fiori.NotificationAction","sap.ui.webc.fiori.NotificationListGroupItem","sap.ui.webc.fiori.NotificationListItem","sap.ui.webc.fiori.Page","sap.ui.webc.fiori.ProductSwitch","sap.ui.webc.fiori.ProductSwitchItem","sap.ui.webc.fiori.ShellBar","sap.ui.webc.fiori.ShellBarItem","sap.ui.webc.fiori.SideNavigation","sap.ui.webc.fiori.SideNavigationItem","sap.ui.webc.fiori.SideNavigationSubItem","sap.ui.webc.fiori.SortItem","sap.ui.webc.fiori.Timeline","sap.ui.webc.fiori.TimelineItem","sap.ui.webc.fiori.UploadCollection","sap.ui.webc.fiori.UploadCollectionItem","sap.ui.webc.fiori.ViewSettingsDialog","sap.ui.webc.fiori.Wizard","sap.ui.webc.fiori.WizardStep"],elements:[],extensions:{flChangeHandlers:{"sap.ui.webc.fiori.NotificationListItem":{hideControl:"default",unhideControl:"default",moveControls:"default"},"sap.ui.webc.fiori.Page":{moveControls:"default"},"sap.ui.webc.fiori.SideNavigation":{hideControl:"default",unhideControl:"default"},"sap.ui.webc.fiori.SideNavigationItem":"sap/ui/webc/fiori/flexibility/SideNavigationItem","sap.ui.webc.fiori.SideNavigationSubItem":"sap/ui/webc/fiori/flexibility/SideNavigationSubItem","sap.ui.webc.fiori.UploadCollection":{hideControl:"default",unhideControl:"default",moveControls:"default"},"sap.ui.webc.fiori.UploadCollectionItem":"sap/ui/webc/fiori/flexibility/UploadCollectionItem"}}});i.BarDesign={FloatingFooter:"FloatingFooter",Footer:"Footer",Header:"Header",Subheader:"Subheader"};i.FCLLayout={EndColumnFullScreen:"EndColumnFullScreen",MidColumnFullScreen:"MidColumnFullScreen",OneColumn:"OneColumn",ThreeColumnsEndExpanded:"ThreeColumnsEndExpanded",ThreeColumnsMidExpanded:"ThreeColumnsMidExpanded",ThreeColumnsMidExpandedEndHidden:"ThreeColumnsMidExpandedEndHidden",ThreeColumnsStartExpandedEndHidden:"ThreeColumnsStartExpandedEndHidden",TwoColumnsMidExpanded:"TwoColumnsMidExpanded",TwoColumnsStartExpanded:"TwoColumnsStartExpanded"};i.IllustrationMessageSize={Auto:"Auto",Base:"Base",Dialog:"Dialog",Scene:"Scene",Spot:"Spot"};i.IllustrationMessageType={AddColumn:"AddColumn",AddPeople:"AddPeople",BalloonSky:"BalloonSky",BeforeSearch:"BeforeSearch",Connection:"Connection",EmptyCalendar:"EmptyCalendar",EmptyList:"EmptyList",EmptyPlanningCalendar:"EmptyPlanningCalendar",ErrorScreen:"ErrorScreen",FilterTable:"FilterTable",GroupTable:"GroupTable",NoActivities:"NoActivities",NoData:"NoData",NoEntries:"NoEntries",NoFilterResults:"NoFilterResults",NoMail:"NoMail",NoMail_v1:"NoMail_v1",NoNotifications:"NoNotifications",NoSavedItems:"NoSavedItems",NoSavedItems_v1:"NoSavedItems_v1",NoSearchResults:"NoSearchResults",NoTasks:"NoTasks",NoTasks_v1:"NoTasks_v1",PageNotFound:"PageNotFound",ReloadScreen:"ReloadScreen",ResizeColumn:"ResizeColumn",SearchEarth:"SearchEarth",SearchFolder:"SearchFolder",SimpleBalloon:"SimpleBalloon",SimpleBell:"SimpleBell",SimpleCalendar:"SimpleCalendar",SimpleCheckMark:"SimpleCheckMark",SimpleConnection:"SimpleConnection",SimpleEmptyDoc:"SimpleEmptyDoc",SimpleEmptyList:"SimpleEmptyList",SimpleError:"SimpleError",SimpleMagnifier:"SimpleMagnifier",SimpleMail:"SimpleMail",SimpleNoSavedItems:"SimpleNoSavedItems",SimpleNotFoundMagnifier:"SimpleNotFoundMagnifier",SimpleReload:"SimpleReload",SimpleTask:"SimpleTask",SleepingBell:"SleepingBell",SortColumn:"SortColumn",SuccessBalloon:"SuccessBalloon",SuccessCheckMark:"SuccessCheckMark",SuccessHighFive:"SuccessHighFive",SuccessScreen:"SuccessScreen",Tent:"Tent",TntChartArea:"TntChartArea",TntChartArea2:"TntChartArea2",TntChartBar:"TntChartBar",TntChartBPMNFlow:"TntChartBPMNFlow",TntChartBullet:"TntChartBullet",TntChartDoughnut:"TntChartDoughnut",TntChartFlow:"TntChartFlow",TntChartGantt:"TntChartGantt",TntChartOrg:"TntChartOrg",TntChartPie:"TntChartPie",TntCodePlaceholder:"TntCodePlaceholder",TntCompany:"TntCompany",TntComponents:"TntComponents",TntExternalLink:"TntExternalLink",TntFaceID:"TntFaceID",TntFingerprint:"TntFingerprint",TntLock:"TntLock",TntMission:"TntMission",TntNoApplications:"TntNoApplications",TntNoFlows:"TntNoFlows",TntNoUsers:"TntNoUsers",TntRadar:"TntRadar",TntSecrets:"TntSecrets",TntServices:"TntServices",TntSessionExpired:"TntSessionExpired",TntSessionExpiring:"TntSessionExpiring",TntSuccess:"TntSuccess",TntSuccessfulAuth:"TntSuccessfulAuth",TntSystems:"TntSystems",TntTeams:"TntTeams",TntTools:"TntTools",TntUnableToLoad:"TntUnableToLoad",TntUnlock:"TntUnlock",TntUnsuccessfulAuth:"TntUnsuccessfulAuth",TntUser2:"TntUser2",UnableToLoad:"UnableToLoad",UnableToLoadImage:"UnableToLoadImage",UnableToUpload:"UnableToUpload",UploadCollection:"UploadCollection"};i.MediaGalleryItemLayout={Square:"Square",Wide:"Wide"};i.MediaGalleryLayout={Auto:"Auto",Horizontal:"Horizontal",Vertical:"Vertical"};i.MediaGalleryMenuHorizontalAlign={Left:"Left",Right:"Right"};i.MediaGalleryMenuVerticalAlign={Bottom:"Bottom",Top:"Top"};i.PageBackgroundDesign={List:"List",Solid:"Solid",Transparent:"Transparent"};i.SideContentFallDown={BelowL:"BelowL",BelowM:"BelowM",BelowXL:"BelowXL",OnMinimumWidth:"OnMinimumWidth"};i.SideContentPosition={End:"End",Start:"Start"};i.SideContentVisibility={AlwaysShow:"AlwaysShow",NeverShow:"NeverShow",ShowAboveL:"ShowAboveL",ShowAboveM:"ShowAboveM",ShowAboveS:"ShowAboveS"};i.TimelineLayout={Horizontal:"Horizontal",Vertical:"Vertical"};i.UploadState={Complete:"Complete",Error:"Error",Ready:"Ready",Uploading:"Uploading"};return i});
//# sourceMappingURL=library.js.map