sap.ui.define(["exports"],function(E){"use strict";const T={key:"ARIA_LABEL_CARD_CONTENT",defaultText:"Card Content"};const _={key:"ARIA_ROLEDESCRIPTION_CARD",defaultText:"Card"};const e={key:"ARIA_ROLEDESCRIPTION_CARD_HEADER",defaultText:"Card Header"};const t={key:"ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER",defaultText:"Interactive Card Header"};const A={key:"AVATAR_TOOLTIP",defaultText:"Avatar"};const I={key:"AVATAR_GROUP_DISPLAYED_HIDDEN_LABEL",defaultText:"{0} displayed, {1} hidden."};const R={key:"AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL",defaultText:"Activate for complete list."};const O={key:"AVATAR_GROUP_ARIA_LABEL_INDIVIDUAL",defaultText:"Individual avatars."};const L={key:"AVATAR_GROUP_ARIA_LABEL_GROUP",defaultText:"Conjoined avatars."};const N={key:"AVATAR_GROUP_MOVE",defaultText:"Press ARROW keys to move."};const C={key:"BADGE_DESCRIPTION",defaultText:"Badge"};const S={key:"BREADCRUMB_ITEM_POS",defaultText:"{0} of {1}"};const a={key:"BREADCRUMBS_ARIA_LABEL",defaultText:"Breadcrumb Trail"};const o={key:"BREADCRUMBS_OVERFLOW_ARIA_LABEL",defaultText:"More"};const P={key:"BREADCRUMBS_CANCEL_BUTTON",defaultText:"Cancel"};const n={key:"BUSY_INDICATOR_TITLE",defaultText:"Please wait"};const l={key:"BUTTON_ARIA_TYPE_ACCEPT",defaultText:"Positive Action"};const D={key:"BUTTON_ARIA_TYPE_REJECT",defaultText:"Negative Action"};const s={key:"BUTTON_ARIA_TYPE_EMPHASIZED",defaultText:"Emphasized"};const d={key:"CAROUSEL_OF_TEXT",defaultText:"of"};const B={key:"CAROUSEL_DOT_TEXT",defaultText:"Item {0} of {1} displayed"};const c={key:"CAROUSEL_PREVIOUS_ARROW_TEXT",defaultText:"Previous Page"};const u={key:"CAROUSEL_NEXT_ARROW_TEXT",defaultText:"Next Page"};const U={key:"COLORPALETTE_CONTAINER_LABEL",defaultText:"Color Palette - Predefined Colors"};const f={key:"COLORPALETTE_POPOVER_TITLE",defaultText:"Color Palette"};const y={key:"COLORPALETTE_COLOR_LABEL",defaultText:"Color"};const k={key:"COLOR_PALETTE_DIALOG_CANCEL_BUTTON",defaultText:"Cancel"};const x={key:"COLOR_PALETTE_DIALOG_OK_BUTTON",defaultText:"OK"};const M={key:"COLOR_PALETTE_DIALOG_TITLE",defaultText:"Change Color"};const r={key:"COLOR_PALETTE_MORE_COLORS_TEXT",defaultText:"More Colors..."};const G={key:"COLORPICKER_ALPHA_SLIDER",defaultText:"Alpha control"};const i={key:"COLORPICKER_HUE_SLIDER",defaultText:"Hue control"};const K={key:"COLORPICKER_HEX",defaultText:"Hexadecimal"};const H={key:"COLORPICKER_RED",defaultText:"Red"};const V={key:"COLORPICKER_GREEN",defaultText:"Green"};const X={key:"COLORPICKER_BLUE",defaultText:"Blue"};const W={key:"COLORPICKER_ALPHA",defaultText:"Alpha"};const m={key:"DATEPICKER_OPEN_ICON_TITLE",defaultText:"Open Picker"};const p={key:"DATEPICKER_DATE_DESCRIPTION",defaultText:"Date Input"};const Y={key:"DATETIME_DESCRIPTION",defaultText:"Date Time Input"};const g={key:"DATERANGE_DESCRIPTION",defaultText:"Date Range Input"};const v={key:"DELETE",defaultText:"Delete"};const F={key:"FILEUPLOAD_BROWSE",defaultText:"Browse..."};const b={key:"FILEUPLOADER_TITLE",defaultText:"Upload File"};const Z={key:"GROUP_HEADER_TEXT",defaultText:"Group Header"};const h={key:"SELECT_ROLE_DESCRIPTION",defaultText:"Select Combo Box"};const w={key:"SELECT_OPTIONS",defaultText:"Select Options"};const z={key:"INPUT_SUGGESTIONS",defaultText:"Suggestions Available"};const j={key:"INPUT_SUGGESTIONS_TITLE",defaultText:"Select"};const J={key:"INPUT_SUGGESTIONS_ONE_HIT",defaultText:"1 result available"};const q={key:"INPUT_SUGGESTIONS_MORE_HITS",defaultText:"{0} results are available"};const Q={key:"INPUT_SUGGESTIONS_NO_HIT",defaultText:"No results"};const $={key:"LINK_SUBTLE",defaultText:"Subtle"};const EE={key:"LINK_EMPHASIZED",defaultText:"Emphasized"};const TE={key:"LIST_ITEM_POSITION",defaultText:"List item {0} of {1}"};const _E={key:"LIST_ITEM_SELECTED",defaultText:"Selected"};const eE={key:"LIST_ITEM_NOT_SELECTED",defaultText:"Not Selected"};const tE={key:"ARIA_LABEL_LIST_ITEM_CHECKBOX",defaultText:"Multiple Selection Mode"};const AE={key:"ARIA_LABEL_LIST_ITEM_RADIO_BUTTON",defaultText:"Item Selection."};const IE={key:"ARIA_LABEL_LIST_SELECTABLE",defaultText:"Contains Selectable Items"};const RE={key:"ARIA_LABEL_LIST_MULTISELECTABLE",defaultText:"Contains Multi-Selectable Items"};const OE={key:"ARIA_LABEL_LIST_DELETABLE",defaultText:"Contains Deletable Items"};const LE={key:"MESSAGE_STRIP_CLOSE_BUTTON",defaultText:"Information Bar Close"};const NE={key:"MESSAGE_STRIP_CLOSABLE",defaultText:"Closable"};const CE={key:"MESSAGE_STRIP_ERROR",defaultText:"Error Information Bar"};const SE={key:"MESSAGE_STRIP_WARNING",defaultText:"Warning Information Bar"};const aE={key:"MESSAGE_STRIP_SUCCESS",defaultText:"Success Information Bar"};const oE={key:"MESSAGE_STRIP_INFORMATION",defaultText:"Information Bar"};const PE={key:"MULTICOMBOBOX_DIALOG_OK_BUTTON",defaultText:"OK"};const nE={key:"VALUE_STATE_ERROR_ALREADY_SELECTED",defaultText:"This value is already selected."};const lE={key:"MULTIINPUT_ROLEDESCRIPTION_TEXT",defaultText:"Multi Value Input"};const DE={key:"MULTIINPUT_SHOW_MORE_TOKENS",defaultText:"{0} More"};const sE={key:"PANEL_ICON",defaultText:"Expand/Collapse"};const dE={key:"RANGE_SLIDER_ARIA_DESCRIPTION",defaultText:"Range"};const BE={key:"RANGE_SLIDER_START_HANDLE_DESCRIPTION",defaultText:"Left handle"};const cE={key:"RANGE_SLIDER_END_HANDLE_DESCRIPTION",defaultText:"Right handle"};const uE={key:"RATING_INDICATOR_TOOLTIP_TEXT",defaultText:"Rating"};const UE={key:"RATING_INDICATOR_TEXT",defaultText:"Rating Indicator"};const fE={key:"RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON",defaultText:"Decline"};const yE={key:"SEGMENTEDBUTTON_ARIA_DESCRIPTION",defaultText:"Segmented button group"};const kE={key:"SEGMENTEDBUTTON_ARIA_DESCRIBEDBY",defaultText:"Press SPACE or ENTER to select an item"};const xE={key:"SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION",defaultText:"Segmented button"};const ME={key:"SLIDER_ARIA_DESCRIPTION",defaultText:"Slider handle"};const rE={key:"LOAD_MORE_TEXT",defaultText:"More"};const GE={key:"TABLE_HEADER_ROW_TEXT",defaultText:"Header Row"};const iE={key:"TABLE_ROW_POSITION",defaultText:"{0} of {1}"};const KE={key:"TABLE_GROUP_ROW_ARIA_LABEL",defaultText:"Group Header Row"};const HE={key:"ARIA_LABEL_ROW_SELECTION",defaultText:"Item Selection"};const VE={key:"ARIA_LABEL_SELECT_ALL_CHECKBOX",defaultText:"Select All Rows"};const XE={key:"TABCONTAINER_NEXT_ICON_ACC_NAME",defaultText:"Next"};const WE={key:"TABCONTAINER_PREVIOUS_ICON_ACC_NAME",defaultText:"Previous"};const mE={key:"TABCONTAINER_OVERFLOW_MENU_TITLE",defaultText:"Overflow Menu"};const pE={key:"TABCONTAINER_END_OVERFLOW",defaultText:"More"};const YE={key:"TABCONTAINER_POPOVER_CANCEL_BUTTON",defaultText:"Cancel"};const gE={key:"TEXTAREA_CHARACTERS_LEFT",defaultText:"{0} characters remaining"};const vE={key:"TEXTAREA_CHARACTERS_EXCEEDED",defaultText:"{0} characters over limit"};const FE={key:"TIMEPICKER_HOURS_LABEL",defaultText:"Hours"};const bE={key:"TIMEPICKER_MINUTES_LABEL",defaultText:"Minutes"};const ZE={key:"TIMEPICKER_SECONDS_LABEL",defaultText:"Seconds"};const hE={key:"TIMEPICKER_PERIODS_LABEL",defaultText:"AM/PM"};const wE={key:"TIMEPICKER_SUBMIT_BUTTON",defaultText:"OK"};const zE={key:"TIMEPICKER_CANCEL_BUTTON",defaultText:"Cancel"};const jE={key:"TIMEPICKER_INPUT_DESCRIPTION",defaultText:"Time Input"};const JE={key:"DURATION_INPUT_DESCRIPTION",defaultText:"Duration Input"};const qE={key:"DATETIME_PICKER_DATE_BUTTON",defaultText:"Date"};const QE={key:"DATETIME_PICKER_TIME_BUTTON",defaultText:"Time"};const $E={key:"TOKEN_ARIA_DELETABLE",defaultText:"Deletable"};const ET={key:"TOKENIZER_ARIA_CONTAIN_TOKEN",defaultText:"No Tokens"};const TT={key:"TOKENIZER_ARIA_CONTAIN_ONE_TOKEN",defaultText:"Contains 1 token"};const _T={key:"TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS",defaultText:"Contains {0} tokens"};const eT={key:"TOKENIZER_ARIA_LABEL",defaultText:"Tokenizer"};const tT={key:"TOKENIZER_POPOVER_REMOVE",defaultText:"Remove"};const AT={key:"TREE_ITEM_ARIA_LABEL",defaultText:"Tree Item"};const IT={key:"TREE_ITEM_EXPAND_NODE",defaultText:"Expand Node"};const RT={key:"TREE_ITEM_COLLAPSE_NODE",defaultText:"Collapse Node"};const OT={key:"VALUE_STATE_ERROR",defaultText:"Invalid entry"};const LT={key:"VALUE_STATE_WARNING",defaultText:"Warning issued"};const NT={key:"VALUE_STATE_INFORMATION",defaultText:"Informative entry"};const CT={key:"VALUE_STATE_SUCCESS",defaultText:"Entry successfully validated"};const ST={key:"CALENDAR_HEADER_NEXT_BUTTON",defaultText:"Next"};const aT={key:"CALENDAR_HEADER_PREVIOUS_BUTTON",defaultText:"Previous"};const oT={key:"DAY_PICKER_WEEK_NUMBER_TEXT",defaultText:"Week Number"};const PT={key:"DAY_PICKER_NON_WORKING_DAY",defaultText:"Non-Working Day"};const nT={key:"DAY_PICKER_TODAY",defaultText:"Today"};const lT={key:"STEPINPUT_DEC_ICON_TITLE",defaultText:"Decrease"};const DT={key:"STEPINPUT_INC_ICON_TITLE",defaultText:"Increase"};const sT={key:"SPLIT_BUTTON_DESCRIPTION",defaultText:"Split Button"};const dT={key:"SPLIT_BUTTON_KEYBOARD_HINT",defaultText:"Press Space or Enter to trigger default action and Alt + Arrow Down or F4 to trigger arrow action"};const BT={key:"MENU_BACK_BUTTON_ARIA_LABEL",defaultText:"Back"};const cT={key:"MENU_CLOSE_BUTTON_ARIA_LABEL",defaultText:"Decline"};E.ARIA_LABEL_CARD_CONTENT=T;E.ARIA_LABEL_LIST_DELETABLE=OE;E.ARIA_LABEL_LIST_ITEM_CHECKBOX=tE;E.ARIA_LABEL_LIST_ITEM_RADIO_BUTTON=AE;E.ARIA_LABEL_LIST_MULTISELECTABLE=RE;E.ARIA_LABEL_LIST_SELECTABLE=IE;E.ARIA_LABEL_ROW_SELECTION=HE;E.ARIA_LABEL_SELECT_ALL_CHECKBOX=VE;E.ARIA_ROLEDESCRIPTION_CARD=_;E.ARIA_ROLEDESCRIPTION_CARD_HEADER=e;E.ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER=t;E.AVATAR_GROUP_ARIA_LABEL_GROUP=L;E.AVATAR_GROUP_ARIA_LABEL_INDIVIDUAL=O;E.AVATAR_GROUP_DISPLAYED_HIDDEN_LABEL=I;E.AVATAR_GROUP_MOVE=N;E.AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL=R;E.AVATAR_TOOLTIP=A;E.BADGE_DESCRIPTION=C;E.BREADCRUMBS_ARIA_LABEL=a;E.BREADCRUMBS_CANCEL_BUTTON=P;E.BREADCRUMBS_OVERFLOW_ARIA_LABEL=o;E.BREADCRUMB_ITEM_POS=S;E.BUSY_INDICATOR_TITLE=n;E.BUTTON_ARIA_TYPE_ACCEPT=l;E.BUTTON_ARIA_TYPE_EMPHASIZED=s;E.BUTTON_ARIA_TYPE_REJECT=D;E.CALENDAR_HEADER_NEXT_BUTTON=ST;E.CALENDAR_HEADER_PREVIOUS_BUTTON=aT;E.CAROUSEL_DOT_TEXT=B;E.CAROUSEL_NEXT_ARROW_TEXT=u;E.CAROUSEL_OF_TEXT=d;E.CAROUSEL_PREVIOUS_ARROW_TEXT=c;E.COLORPALETTE_COLOR_LABEL=y;E.COLORPALETTE_CONTAINER_LABEL=U;E.COLORPALETTE_POPOVER_TITLE=f;E.COLORPICKER_ALPHA=W;E.COLORPICKER_ALPHA_SLIDER=G;E.COLORPICKER_BLUE=X;E.COLORPICKER_GREEN=V;E.COLORPICKER_HEX=K;E.COLORPICKER_HUE_SLIDER=i;E.COLORPICKER_RED=H;E.COLOR_PALETTE_DIALOG_CANCEL_BUTTON=k;E.COLOR_PALETTE_DIALOG_OK_BUTTON=x;E.COLOR_PALETTE_DIALOG_TITLE=M;E.COLOR_PALETTE_MORE_COLORS_TEXT=r;E.DATEPICKER_DATE_DESCRIPTION=p;E.DATEPICKER_OPEN_ICON_TITLE=m;E.DATERANGE_DESCRIPTION=g;E.DATETIME_DESCRIPTION=Y;E.DATETIME_PICKER_DATE_BUTTON=qE;E.DATETIME_PICKER_TIME_BUTTON=QE;E.DAY_PICKER_NON_WORKING_DAY=PT;E.DAY_PICKER_TODAY=nT;E.DAY_PICKER_WEEK_NUMBER_TEXT=oT;E.DELETE=v;E.DURATION_INPUT_DESCRIPTION=JE;E.FILEUPLOADER_TITLE=b;E.FILEUPLOAD_BROWSE=F;E.GROUP_HEADER_TEXT=Z;E.INPUT_SUGGESTIONS=z;E.INPUT_SUGGESTIONS_MORE_HITS=q;E.INPUT_SUGGESTIONS_NO_HIT=Q;E.INPUT_SUGGESTIONS_ONE_HIT=J;E.INPUT_SUGGESTIONS_TITLE=j;E.LINK_EMPHASIZED=EE;E.LINK_SUBTLE=$;E.LIST_ITEM_NOT_SELECTED=eE;E.LIST_ITEM_POSITION=TE;E.LIST_ITEM_SELECTED=_E;E.LOAD_MORE_TEXT=rE;E.MENU_BACK_BUTTON_ARIA_LABEL=BT;E.MENU_CLOSE_BUTTON_ARIA_LABEL=cT;E.MESSAGE_STRIP_CLOSABLE=NE;E.MESSAGE_STRIP_CLOSE_BUTTON=LE;E.MESSAGE_STRIP_ERROR=CE;E.MESSAGE_STRIP_INFORMATION=oE;E.MESSAGE_STRIP_SUCCESS=aE;E.MESSAGE_STRIP_WARNING=SE;E.MULTICOMBOBOX_DIALOG_OK_BUTTON=PE;E.MULTIINPUT_ROLEDESCRIPTION_TEXT=lE;E.MULTIINPUT_SHOW_MORE_TOKENS=DE;E.PANEL_ICON=sE;E.RANGE_SLIDER_ARIA_DESCRIPTION=dE;E.RANGE_SLIDER_END_HANDLE_DESCRIPTION=cE;E.RANGE_SLIDER_START_HANDLE_DESCRIPTION=BE;E.RATING_INDICATOR_TEXT=UE;E.RATING_INDICATOR_TOOLTIP_TEXT=uE;E.RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON=fE;E.SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION=xE;E.SEGMENTEDBUTTON_ARIA_DESCRIBEDBY=kE;E.SEGMENTEDBUTTON_ARIA_DESCRIPTION=yE;E.SELECT_OPTIONS=w;E.SELECT_ROLE_DESCRIPTION=h;E.SLIDER_ARIA_DESCRIPTION=ME;E.SPLIT_BUTTON_DESCRIPTION=sT;E.SPLIT_BUTTON_KEYBOARD_HINT=dT;E.STEPINPUT_DEC_ICON_TITLE=lT;E.STEPINPUT_INC_ICON_TITLE=DT;E.TABCONTAINER_END_OVERFLOW=pE;E.TABCONTAINER_NEXT_ICON_ACC_NAME=XE;E.TABCONTAINER_OVERFLOW_MENU_TITLE=mE;E.TABCONTAINER_POPOVER_CANCEL_BUTTON=YE;E.TABCONTAINER_PREVIOUS_ICON_ACC_NAME=WE;E.TABLE_GROUP_ROW_ARIA_LABEL=KE;E.TABLE_HEADER_ROW_TEXT=GE;E.TABLE_ROW_POSITION=iE;E.TEXTAREA_CHARACTERS_EXCEEDED=vE;E.TEXTAREA_CHARACTERS_LEFT=gE;E.TIMEPICKER_CANCEL_BUTTON=zE;E.TIMEPICKER_HOURS_LABEL=FE;E.TIMEPICKER_INPUT_DESCRIPTION=jE;E.TIMEPICKER_MINUTES_LABEL=bE;E.TIMEPICKER_PERIODS_LABEL=hE;E.TIMEPICKER_SECONDS_LABEL=ZE;E.TIMEPICKER_SUBMIT_BUTTON=wE;E.TOKENIZER_ARIA_CONTAIN_ONE_TOKEN=TT;E.TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS=_T;E.TOKENIZER_ARIA_CONTAIN_TOKEN=ET;E.TOKENIZER_ARIA_LABEL=eT;E.TOKENIZER_POPOVER_REMOVE=tT;E.TOKEN_ARIA_DELETABLE=$E;E.TREE_ITEM_ARIA_LABEL=AT;E.TREE_ITEM_COLLAPSE_NODE=RT;E.TREE_ITEM_EXPAND_NODE=IT;E.VALUE_STATE_ERROR=OT;E.VALUE_STATE_ERROR_ALREADY_SELECTED=nE;E.VALUE_STATE_INFORMATION=NT;E.VALUE_STATE_SUCCESS=CT;E.VALUE_STATE_WARNING=LT;Object.defineProperty(E,"__esModule",{value:true})});