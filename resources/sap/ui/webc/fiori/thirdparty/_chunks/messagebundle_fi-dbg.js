sap.ui.define(['exports'], function (exports) { 'use strict';

	var messagebundle_fi = {
		BARCODE_SCANNER_DIALOG_CANCEL_BUTTON_TXT: "Peruuta",
		BARCODE_SCANNER_DIALOG_LOADING_TXT: "Ladataan",
		FCL_START_COLUMN_TXT: "Ensimmäinen sarake",
		FCL_MIDDLE_COLUMN_TXT: "Keskisarake",
		FCL_END_COLUMN_TXT: "Viimeinen sarake",
		FCL_START_COLUMN_EXPAND_BUTTON_TOOLTIP: "Laajenna ensimmäinen sarake",
		FCL_START_COLUMN_COLLAPSE_BUTTON_TOOLTIP: "Tiivistä ensimmäinen sarake",
		FCL_END_COLUMN_EXPAND_BUTTON_TOOLTIP: "Laajenna viimeinen sarake",
		FCL_END_COLUMN_COLLAPSE_BUTTON_TOOLTIP: "Tiivistä viimeinen sarake",
		NOTIFICATION_LIST_ITEM_TXT: "Ilmoitus",
		NOTIFICATION_LIST_ITEM_SHOW_MORE: "Näytä enemmän",
		NOTIFICATION_LIST_ITEM_SHOW_LESS: "Näytä vähemmän",
		NOTIFICATION_LIST_ITEM_OVERLOW_BTN_TITLE: "Enemmän",
		NOTIFICATION_LIST_ITEM_CLOSE_BTN_TITLE: "Sulje",
		NOTIFICATION_LIST_ITEM_READ: "Luettu",
		NOTIFICATION_LIST_ITEM_UNREAD: "Lukematon",
		NOTIFICATION_LIST_ITEM_HIGH_PRIORITY_TXT: "Korkea prioriteetti",
		NOTIFICATION_LIST_ITEM_MEDIUM_PRIORITY_TXT: "Keskitasoinen prioriteetti",
		NOTIFICATION_LIST_ITEM_LOW_PRIORITY_TXT: "Alhainen prioriteetti",
		NOTIFICATION_LIST_GROUP_ITEM_TXT: "Ilmoitusryhmä",
		NOTIFICATION_LIST_GROUP_ITEM_COUNTER_TXT: "Laskuri",
		NOTIFICATION_LIST_GROUP_ITEM_CLOSE_BTN_TITLE: "Sulje kaikki",
		NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_COLLAPSE_TITLE: "Tiivistä ryhmä",
		NOTIFICATION_LIST_GROUP_ITEM_TOGGLE_BTN_EXPAND_TITLE: "Laajenna ryhmä",
		TIMELINE_ARIA_LABEL: "Aikajana",
		UPLOADCOLLECTIONITEM_CANCELBUTTON_TEXT: "Peruuta",
		UPLOADCOLLECTIONITEM_RENAMEBUTTON_TEXT: "Nimeä uudelleen",
		UPLOADCOLLECTIONITEM_ERROR_STATE: "Lopetettu",
		UPLOADCOLLECTIONITEM_READY_STATE: "Odottaa",
		UPLOADCOLLECTIONITEM_UPLOADING_STATE: "Ladataan",
		UPLOADCOLLECTIONITEM_TERMINATE_BUTTON_TEXT: "Lopeta",
		UPLOADCOLLECTIONITEM_RETRY_BUTTON_TEXT: "Yritä uudelleen",
		UPLOADCOLLECTIONITEM_EDIT_BUTTON_TEXT: "Muokkaa",
		UPLOADCOLLECTION_NO_DATA_TEXT: "Tiedostoja ei löytynyt.",
		UPLOADCOLLECTION_NO_DATA_DESCRIPTION: "Pudota tiedostot niiden lataamiseksi palvelimeen tai käytä ”Lataa palvelimeen”-painiketta.",
		UPLOADCOLLECTION_ARIA_ROLE_DESCRIPTION: "Lataa kokoelma palvelimeen",
		UPLOADCOLLECTION_DRAG_FILE_INDICATOR: "Vedä tiedostot tähän.",
		UPLOADCOLLECTION_DROP_FILE_INDICATOR: "Pudota tiedostot tähän niiden lataamiseksi palvelimeen.",
		SHELLBAR_LABEL: "Shell-palkki",
		SHELLBAR_LOGO: "Logo",
		SHELLBAR_COPILOT: "CoPilot",
		SHELLBAR_NOTIFICATIONS: "{0} Ilmoitukset",
		SHELLBAR_PROFILE: "Profiili",
		SHELLBAR_PRODUCTS: "Tuotteet",
		PRODUCT_SWITCH_CONTAINER_LABEL: "Tuotteet",
		SHELLBAR_SEARCH: "Hae",
		SHELLBAR_OVERFLOW: "Enemmän",
		SHELLBAR_CANCEL: "Peruuta",
		WIZARD_NAV_ARIA_LABEL: "Avustajan etenemispalkki",
		WIZARD_LIST_ARIA_LABEL: "Avustajan prosessiaskeleet",
		WIZARD_LIST_ARIA_DESCRIBEDBY: "Aktivoi painamalla välilyönti- tai Enter-näppäintä",
		WIZARD_ACTIONSHEET_STEPS_ARIA_LABEL: "Askeleet",
		WIZARD_OPTIONAL_STEP_ARIA_LABEL: "Valinnainen",
		WIZARD_STEP_ACTIVE: "Aktiivinen",
		WIZARD_STEP_INACTIVE: "Ei-aktiivinen",
		WIZARD_STEP_ARIA_LABEL: "Askel {0}",
		WIZARD_NAV_ARIA_ROLE_DESCRIPTION: "Avustaja",
		WIZARD_NAV_STEP_DEFAULT_HEADING: "Askel",
		VSD_DIALOG_TITLE_SORT: "Näytä asetukset",
		VSD_SUBMIT_BUTTON: "OK",
		VSD_CANCEL_BUTTON: "Keskeytä",
		VSD_RESET_BUTTON: "Palauta",
		VSD_SORT_ORDER: "Lajittelujärjestys",
		VSD_FILTER_BY: "Suodatusperuste",
		VSD_SORT_BY: "Lajitteluperuste",
		VSD_ORDER_ASCENDING: "Nouseva",
		VSD_ORDER_DESCENDING: "Laskeva",
		IM_TITLE_BEFORESEARCH: "Haetaan tuloksia.",
		IM_SUBTITLE_BEFORESEARCH: "Aloita antamalla hakukriteerit.",
		IM_TITLE_NOACTIVITIES: "Et ole vielä lisännyt toimintoja.",
		IM_SUBTITLE_NOACTIVITIES: "Haluatko lisätä toiminnon?",
		IM_TITLE_NODATA: "Tietoja ei vielä ole.",
		IM_SUBTITLE_NODATA: "Tiedot tulevat tähän näkymään.",
		IM_TITLE_NOMAIL: "Ei uusia viestejä.",
		IM_SUBTITLE_NOMAIL: "Tarkista myöhemmin uudelleen.",
		IM_TITLE_NOENTRIES: "Ei vielä päivityksiä.",
		IM_SUBTITLE_NOENTRIES: "Päivitykset tulevat tähän näkymään.",
		IM_TITLE_NONOTIFICATIONS: "Sinulla ei ole uusia ilmoituksia",
		IM_SUBTITLE_NONOTIFICATIONS: "Tarkista myöhemmin uudelleen.",
		IM_TITLE_NOSAVEDITEMS: "Et ole vielä lisännyt toimintoja.",
		IM_SUBTITLE_NOSAVEDITEMS: "Haluatko luoda listan suosikkikohteistasi?",
		IM_TITLE_NOSEARCHRESULTS: "Tuloksia ei löytynyt",
		IM_SUBTITLE_NOSEARCHRESULTS: "Kokeile hakuehtojen muokkaamista.",
		IM_TITLE_NOTASKS: "Sinulla ei ole uusia tehtäviä",
		IM_SUBTITLE_NOTASKS: "Kun sinulla on, näet ne tässä.",
		IM_TITLE_UNABLETOLOAD: "Tietoja ei voida ladata.",
		IM_SUBTITLE_UNABLETOLOAD: "Tarkista Internet-yhteytesi. Jos tämä ei auta, yritä ladata uudelleen. Jos sekään ei auta, ota yhteys pääkäyttäjään.",
		IM_TITLE_UNABLETOLOADIMAGE: "Kuvaa ei voi ladata",
		IM_SUBTITLE_UNABLETOLOADIMAGE: "Kuvaa ei löydy määritetystä sijainnista tai palvelin ei vastaa.",
		IM_TITLE_UNABLETOUPLOAD: "Tietoja ei voida ladata.",
		IM_SUBTITLE_UNABLETOUPLOAD: "Tarkista Internet-yhteytesi. Jos tämä ei auta, tarkista tiedostomuoto ja tiedoston koko. Jos sekään ei auta, ota yhteys pääkäyttäjään.",
		IM_TITLE_ADDCOLUMN: "Vapaata tilaa näyttää olevan",
		IM_SUBTITLE_ADDCOLUMN: "Voit lisätä sarakkeita taulukon asetuksissa.",
		IM_TITLE_ADDPEOPLE: "Et ole vielä lisännyt ketään kalenteriin.",
		IM_SUBTITLE_ADDPEOPLE: "Haluatko lisätä jonkun nyt?",
		IM_TITLE_BALLOONSKY: "Olet saanut kiitosta!",
		IM_SUBTITLE_BALLOONSKY: "Jatka hyvää työtä!",
		IM_TITLE_EMPTYPLANNINGCALENDAR: "Ei vielä suunnitelmia",
		IM_SUBTITLE_EMPTYPLANNINGCALENDAR: "Tällä aikavälillä ei ole toimintoja.",
		IM_TITLE_FILTERTABLE: "Suodatusvaihtoehtoja on käytettävissä",
		IM_SUBTITLE_FILTERTABLE: "Suodattimet auttavat keskittymään tärkeimpiin asioihin",
		IM_TITLE_GROUPTABLE: "Kokeile kohteiden ryhmittelyä paremman yleiskatsauksen saamiseksi",
		IM_SUBTITLE_GROUPTABLE: "Voit valita ryhmittelyluokkia ryhmäasetuksissa.",
		IM_TITLE_NOFILTERRESULTS: "Tuloksia ei löytynyt",
		IM_SUBTITLE_NOFILTERRESULTS: "Yritä säätää suodatusperusteita.",
		IM_TITLE_PAGENOTFOUND: "Sivua ei valitettavasti löytynyt",
		IM_SUBTITLE_PAGENOTFOUND: "Tarkista URL, jota käytät sovelluksen kutsumiseen.",
		IM_TITLE_RESIZECOLUMN: "Valitse oma sarakeleveys",
		IM_SUBTITLE_RESIZECOLUMN: "Voit muuttaa sarakkeiden kokoa vetämällä sarakkeen reunaa.",
		IM_TITLE_SORTCOLUMN: "Etkö näe kaikkein tärkeimpiä asioita ensimmäisinä?",
		IM_SUBTITLE_SORTCOLUMN: "Valitse lajitteluperusteet lajitteluasetuksissa.",
		IM_TITLE_SUCCESSSCREEN: "Hienoa!",
		IM_SUBTITLE_SUCCESSSCREEN: "Suoritit kaikki oppimistehtäväsi loppuun.",
		IM_TITLE_UPLOADCOLLECTION: "Pudota tiedostot tähän",
		IM_SUBTITLE_UPLOADCOLLECTION: "Voit ladata myös useita tiedostoja kerralla.",
		DSC_SIDE_ARIA_LABEL: "Sivusisältö"
	};

	exports.default = messagebundle_fi;

});
