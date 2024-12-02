/** ---------------------------------------------------------------------------
 * @module [ApgEdr/lib]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240729
 * @version 1.1 APG 20240731 ApgEdr_Service.GetTemplateData
 * @version 1.2 APG 20240813 Moved to lib
 * ----------------------------------------------------------------------------
 */


import {
    ApgEdr_Request
} from "../../classes/ApgEdr_Request.ts";
import {
    Drash, Uts
} from "../../deps.ts";
import {
    ApgEdr_eCookie
} from "../../enums/ApgEdr_eCookie.ts";
import {
    ApgEdr_Route_eShared
} from "../../enums/ApgEdr_Route_eShared.ts";
import { Tng } from "../../monorepo.ts";
import {
    ApgEdr_Service
} from "../../services/ApgEdr_Service.ts";
import {
    ApgEdr_HtmlPageResource
} from "./ApgEdr_HtmlPageResource.ts";






enum _etranslations {

    GET_Page_Title = "GET_Page_Title",
    GET_Intro_Label = "GET_Intro_Label",
    GET_Language_Options = "GET_Language_Options",
    GET_Select_Language = "GET_Select_Language",
    POST_Message = "POST_Message",
}



const _Translations = {
    [_etranslations.GET_Page_Title]: {
        EN: "Select your language",
        ES: "Elija su idioma",
        DE: "Waehle deine Sprache",
        FR: "Choisissez votre langue",
        IT: "Seleziona la tua lingua",
    },
    [_etranslations.GET_Intro_Label]: {
        EN: "Language",
        ES: "Idioma",
        DE: "Sprache",
        FR: "Langue",
        IT: "Lingua",
    },
    [_etranslations.GET_Language_Options]: {
        EN: "English",
        ES: "Español",
        DE: "Deutsch",
        FR: "Français",
        IT: "Italiano",
    },
    [_etranslations.POST_Message]: {
        EN: "The site language has been changed to ",
        ES: "El idioma del sitio ha sido cambiado a ",
        DE: "Die Sprache des Sites wurde auf ",
        FR: "La langue du site a été changée à ",
        IT: "La lingua del sito è stata cambiata a ",
    },

}


const _Translator = new Uts.ApgUts_Translator(_Translations);



export class ApgEdr_HtmlPageResource_Language

    extends ApgEdr_HtmlPageResource {

    static readonly PAGE_DATA: Tng.ApgTng_IHyperlink = {
        url: ApgEdr_Route_eShared.PAGE_LANGUAGE,
        label: {
            IT: "Lingua",
            EN: "Language"
        },
        title: {
            IT: "Imposta il cookie per la lingua di utilizzo del microservizio",
            EN: "Set the cookie for the language of use of the microservice"
        },
        isReserved: false
    };


    override readonly RESOURCE_NAME = ApgEdr_HtmlPageResource_Language.name;
    override readonly TNG_TEMPLATES = {
        GET: "/pages/ApgEdr_HtmlPageTemplate_Language_GET_01.html",
        POST: "/pages/ApgEdr_HtmlPageTemplate_Language_POST_01.html",
    };
    override readonly ARE_TEMPLATES_FROM_CDN = true;

    readonly BODY_PARAM_LANG = "lang";
    readonly MAX_COOKIE_AGE = 5 * 365 * 24 * 60 * 60;  // 5 years in seconds

    override paths = [ApgEdr_Route_eShared.PAGE_LANGUAGE];


    async GET(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);

        const pageTitle = _Translator.get(_etranslations.GET_Page_Title, edr.language);

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            pageTitle,
            this.TNG_TEMPLATES.GET,
            this.ARE_TEMPLATES_FROM_CDN
        )

        templateData.page.data = {
            action: ApgEdr_Route_eShared.PAGE_LANGUAGE,
            languageOptions: this.#getCurrentLanguageOptions(edr),
        }
        templateData.page.translations = {
            [_etranslations.GET_Intro_Label]: _Translator.get(_etranslations.GET_Intro_Label, edr.language)
        }

        const { html, events } = await ApgEdr_Service.RenderPageUsingTng(templateData);
        edr.LogEvents(events);
        response.html(html);
    }



    async POST(
        request: Drash.Request,
        response: Drash.Response
    ) {

        const edr = ApgEdr_Service.GetEdr(request);

        const rawLang = await request.bodyParam(this.BODY_PARAM_LANG) as string;

        const cookie: Uts.Std.Cookie = {
            name: ApgEdr_eCookie.LANGUAGE,
            value: rawLang,
            path: '/',
            maxAge: this.MAX_COOKIE_AGE,
            httpOnly: true
        };
        response.setCookie(cookie);

        edr.language = rawLang as Uts.ApgUts_TLanguage;

        const templateData = ApgEdr_Service.GetTemplateData(
            edr,
            _Translator.get(_etranslations.GET_Page_Title, edr.language),
            this.TNG_TEMPLATES.POST,
            true
        )

        templateData.page.data = {
            okLink: ApgEdr_Route_eShared.PAGE_MENU_USER
        }
        templateData.page.translations = _Translator.getAll(edr.language);

        const { html, events } = await ApgEdr_Service.RenderPageUsingTng(templateData);
        edr.LogEvents(events)
        response.html(html);
    }



    #getCurrentLanguageOptions(aedr: ApgEdr_Request) {

        const r: string[] = [];

        const options = _Translations[_etranslations.GET_Language_Options];
        for (const lang in options) {
            const selected = lang === aedr.language ? " selected" : "";
            const caption = options[lang as Uts.ApgUts_TLanguage];
            r.push(`<option value="${lang}"${selected}>${caption}</option>`);
        }

        return r.join("\n");
    }

}