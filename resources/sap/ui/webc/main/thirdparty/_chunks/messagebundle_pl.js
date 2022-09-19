sap.ui.define(["exports"],function(E){"use strict";var _={ARIA_LABEL_CARD_CONTENT:"Zawartość karty",ARIA_ROLEDESCRIPTION_CARD:"Karta",ARIA_ROLEDESCRIPTION_CARD_HEADER:"Nagłówek karty",ARIA_ROLEDESCRIPTION_INTERACTIVE_CARD_HEADER:"Nagłówek interaktywnej karty",AVATAR_TOOLTIP:"Awatar",AVATAR_GROUP_DISPLAYED_HIDDEN_LABEL:"Wyświetlone: {0}, ukryte: {1}.",AVATAR_GROUP_SHOW_COMPLETE_LIST_LABEL:"Aktywuj dla kompletnej listy.",AVATAR_GROUP_ARIA_LABEL_INDIVIDUAL:"Indywidualne awatary.",AVATAR_GROUP_ARIA_LABEL_GROUP:"Połączone awatary.",AVATAR_GROUP_MOVE:"Aby przesunąć, użyj klawiszy ze strzałkami.",BADGE_DESCRIPTION:"Odznaka",BREADCRUMB_ITEM_POS:"{0} z {1}",BREADCRUMBS_ARIA_LABEL:"Ścieżka nawigacji",BREADCRUMBS_OVERFLOW_ARIA_LABEL:"Więcej",BREADCRUMBS_CANCEL_BUTTON:"Anuluj",BUSY_INDICATOR_TITLE:"Czekaj",BUTTON_ARIA_TYPE_ACCEPT:"Czynność pozytywna",BUTTON_ARIA_TYPE_REJECT:"Czynność negatywna",BUTTON_ARIA_TYPE_EMPHASIZED:"Podświetlone",CAROUSEL_OF_TEXT:"z",CAROUSEL_DOT_TEXT:"Wyświetlanie elementu {0} z {1}",CAROUSEL_PREVIOUS_ARROW_TEXT:"Poprzednia strona",CAROUSEL_NEXT_ARROW_TEXT:"Następna strona",COLORPALETTE_CONTAINER_LABEL:"Paleta kolorów - kolory predefiniowane",COLORPALETTE_POPOVER_TITLE:"Paleta kolorów",COLORPALETTE_COLOR_LABEL:"Kolor",COLOR_PALETTE_DIALOG_CANCEL_BUTTON:"Anuluj",COLOR_PALETTE_DIALOG_OK_BUTTON:"OK",COLOR_PALETTE_DIALOG_TITLE:"Zmiana koloru",COLOR_PALETTE_MORE_COLORS_TEXT:"Więcej kolorów...",COLORPICKER_ALPHA_SLIDER:"Suwak alfa",COLORPICKER_HUE_SLIDER:"Suwak odcienia",COLORPICKER_HEX:"System szesnastkowy",COLORPICKER_RED:"Czerwony",COLORPICKER_GREEN:"Zielony",COLORPICKER_BLUE:"Niebieski",COLORPICKER_ALPHA:"Alfa",DATEPICKER_OPEN_ICON_TITLE:"Otwórz selektor",DATEPICKER_DATE_DESCRIPTION:"Wpis daty",DATETIME_DESCRIPTION:"Wpis daty i godziny",DATERANGE_DESCRIPTION:"Wpis zakresu dat",DELETE:"Usuń",FILEUPLOAD_BROWSE:"Przeglądaj...",FILEUPLOADER_TITLE:"Prześlij plik",GROUP_HEADER_TEXT:"Nagłówek grupy",SELECT_ROLE_DESCRIPTION:"Wybierz pole kombi",SELECT_OPTIONS:"Wybierz opcje",INPUT_SUGGESTIONS:"Dostępne propozycje",INPUT_SUGGESTIONS_TITLE:"Wybierz",INPUT_SUGGESTIONS_ONE_HIT:"1 wynik dostępny",INPUT_SUGGESTIONS_MORE_HITS:"Liczba dostępnych wyników: {0}",INPUT_SUGGESTIONS_NO_HIT:"Brak wyników",LINK_SUBTLE:"Delikatne",LINK_EMPHASIZED:"Podświetlone",LIST_ITEM_POSITION:"Pozycja listy {0} z {1}",LIST_ITEM_SELECTED:"Wybrane",LIST_ITEM_NOT_SELECTED:"Niewybrane",ARIA_LABEL_LIST_ITEM_CHECKBOX:"Tryb wielokrotnego wyboru",ARIA_LABEL_LIST_ITEM_RADIO_BUTTON:"Wybór pozycji",ARIA_LABEL_LIST_SELECTABLE:"Zawiera elementy możliwe do wyboru",ARIA_LABEL_LIST_MULTISELECTABLE:"Zawiera elementy do wyboru wielokrotnego",ARIA_LABEL_LIST_DELETABLE:"Zawiera elementy możliwe do usunięcia",MESSAGE_STRIP_CLOSE_BUTTON:"Zamknięcie paska informacji",MESSAGE_STRIP_CLOSABLE:"Możliwe do zamknięcia",MESSAGE_STRIP_ERROR:"Pasek informacji - Błąd",MESSAGE_STRIP_WARNING:"Pasek informacji - Ostrzeżenie",MESSAGE_STRIP_SUCCESS:"Pasek informacji - Sukces",MESSAGE_STRIP_INFORMATION:"Pasek informacji",MULTICOMBOBOX_DIALOG_OK_BUTTON:"OK",VALUE_STATE_ERROR_ALREADY_SELECTED:"Ta wartość jest już wybrana.",MULTIINPUT_ROLEDESCRIPTION_TEXT:"Wprowadzanie wielu wartości",MULTIINPUT_SHOW_MORE_TOKENS:"{0} więcej",PANEL_ICON:"Rozwiń/zwiń",RANGE_SLIDER_ARIA_DESCRIPTION:"Zakres",RANGE_SLIDER_START_HANDLE_DESCRIPTION:"Lewy uchwyt",RANGE_SLIDER_END_HANDLE_DESCRIPTION:"Prawy uchwyt",RATING_INDICATOR_TOOLTIP_TEXT:"Ocena",RATING_INDICATOR_TEXT:"Wskaźnik oceny",RESPONSIVE_POPOVER_CLOSE_DIALOG_BUTTON:"Odrzuć",SEGMENTEDBUTTON_ARIA_DESCRIPTION:"Grupa przycisków podzielonych na segmenty",SEGMENTEDBUTTON_ARIA_DESCRIBEDBY:"Aby wybrać pozycję, naciśnij spację lub Enter",SEGMENTEDBUTTONITEM_ARIA_DESCRIPTION:"Przycisk podzielony na segmenty",SLIDER_ARIA_DESCRIPTION:"Uchwyt suwaka",LOAD_MORE_TEXT:"Więcej",TABLE_HEADER_ROW_TEXT:"Linia nagłówka",TABLE_ROW_POSITION:"{0} z {1}",TABLE_GROUP_ROW_ARIA_LABEL:"Linia nagłówka grupy",ARIA_LABEL_ROW_SELECTION:"Wybór pozycji",ARIA_LABEL_SELECT_ALL_CHECKBOX:"Wybierz wszystkie wiersze",TABCONTAINER_NEXT_ICON_ACC_NAME:"Następne",TABCONTAINER_PREVIOUS_ICON_ACC_NAME:"Poprzednie",TABCONTAINER_OVERFLOW_MENU_TITLE:"Menu przepełnienia",TABCONTAINER_END_OVERFLOW:"Więcej",TABCONTAINER_POPOVER_CANCEL_BUTTON:"Anuluj",TEXTAREA_CHARACTERS_LEFT:"Pozostała następująca liczba znaków: {0}",TEXTAREA_CHARACTERS_EXCEEDED:"Przekroczono o następującą liczbę znaków: {0}",TIMEPICKER_HOURS_LABEL:"Godziny",TIMEPICKER_MINUTES_LABEL:"Minuty",TIMEPICKER_SECONDS_LABEL:"Sekundy",TIMEPICKER_PERIODS_LABEL:"AM/PM",TIMEPICKER_SUBMIT_BUTTON:"OK",TIMEPICKER_CANCEL_BUTTON:"Anuluj",TIMEPICKER_INPUT_DESCRIPTION:"Wpis czasu",DURATION_INPUT_DESCRIPTION:"Wpis czasu trwania",DATETIME_PICKER_DATE_BUTTON:"Data",DATETIME_PICKER_TIME_BUTTON:"Czas",TOKEN_ARIA_DELETABLE:"Usuwalne",TOKENIZER_ARIA_CONTAIN_TOKEN:"Brak tokenów",TOKENIZER_ARIA_CONTAIN_ONE_TOKEN:"Zawiera 1 token",TOKENIZER_ARIA_CONTAIN_SEVERAL_TOKENS:"Zawiera następującą liczbę tokenów: {0}",TOKENIZER_ARIA_LABEL:"Generator tokenów",TOKENIZER_POPOVER_REMOVE:"Usuń",TREE_ITEM_ARIA_LABEL:"Element drzewa",TREE_ITEM_EXPAND_NODE:"Rozwiń węzeł",TREE_ITEM_COLLAPSE_NODE:"Zwiń węzeł",VALUE_STATE_ERROR:"Nieprawidłowy wpis",VALUE_STATE_WARNING:"Wyprowadzono ostrzeżenie",VALUE_STATE_INFORMATION:"Wpis informacyjny",VALUE_STATE_SUCCESS:"Pomyślnie zweryfikowano wpis",CALENDAR_HEADER_NEXT_BUTTON:"Następne",CALENDAR_HEADER_PREVIOUS_BUTTON:"Poprzednie",DAY_PICKER_WEEK_NUMBER_TEXT:"Numer tygodnia",DAY_PICKER_NON_WORKING_DAY:"Dzień wolny od pracy",DAY_PICKER_TODAY:"Dzisiaj",STEPINPUT_DEC_ICON_TITLE:"Zmniejsz",STEPINPUT_INC_ICON_TITLE:"Zwiększ",SPLIT_BUTTON_DESCRIPTION:"Przycisk podzielony na dwie części",SPLIT_BUTTON_KEYBOARD_HINT:"Naciśnij spację lub Enter, aby wywołać domyślną czynność, i strzałkę w dół lub F4, aby wywołać czynność strzałki",MENU_BACK_BUTTON_ARIA_LABEL:"Wstecz",MENU_CLOSE_BUTTON_ARIA_LABEL:"Odrzuć"};E.default=_});