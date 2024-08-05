/** ---------------------------------------------------------------------------
 * @module [ApgEdr/srv]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0 APG 20240701 Cleanup and alignment to ApgCdn
 * ----------------------------------------------------------------------------
 */

import {
    Tng, Edr
} from "../deps.ts";
import {
    ApgEdr_eRoutes
} from "../enums/ApgEdr_eRoute.ts";



/**
 * Menu principale del microservizio ApgEdr
 */
export const ApgEdr_MainMenu: Tng.ApgTng_IHyperlink[] = [
    {
        url: Edr.ApgEdr_Route_eShared.PAGE_TOOLS,
        label: {
            IT: "Strumenti",
            EN: "Tools"
        },
        title: {
            IT: "Strumenti di sviluppo per i microservizi Apg",
            EN: "Development tools for Apg microservices"
        },
        reserved: false
    },
    {
        url: ApgEdr_eRoutes.API_TEST,
        label: {
            IT: "Test Rest API",
            EN: "Rest API test"
        },
        title: {
            IT: "Test della classe base per una risorsa REST",
            EN: "Test of the base class for REST resource"
        },
        reserved: false
    },
    {
        url: ApgEdr_eRoutes.TEMPLATE_TEST,
        label: {
            IT: "Template test",
            EN: "Template test"
        },
        title: {
            IT: "Test della risorsa per servire i templates ad altri servizi",
            EN: "Test for the resource used to serve templates to other services"
        },
        reserved: false
    },
    {
        url: Edr.ApgEdr_Route_eShared.PAGE_LANGUAGE,
        label: {
            IT: "Lingua",
            EN: "Language"
        },
        title: {
            IT: "Imposta il cookie per la lingua di utilizzo del microservizio",
            EN: "Set the cookie for the language of use of the microservice"
        },
        reserved: false
    },
    {
        url: Edr.ApgEdr_Route_eShared.PAGE_LOGIN,
        label: {
            IT: "Accedi",
            EN: "Log in"
        },
        title: {
            IT: "Accesso alle pagine riservate del servizio",
            EN: "Access to the reserved pages of the service"
        },
        reserved: false
    },
    {
        url: Edr.ApgEdr_Route_eShared.PAGE_LOGOUT,
        label: {
            IT: "Esci",
            EN: "Log out"
        },
        title: {
            IT: "Rinuncia all'accesso alle pagine riservate del servizio",
            EN: "Recede the access to the reserved pages of the service"
        },
        reserved: true
    },
    {
        url: ApgEdr_eRoutes.RESERVED_PAGE_USER_TEST,
        label: {
            IT: "Pagina utente",
            EN: "User page"
        },
        title: {
            IT: "Esempio di pagina riservata per gli utenti",
            EN: "Example of reserved page for users"
        },
        reserved: true
    },
    {
        url: ApgEdr_eRoutes.RESERVED_PAGE_ADMIN_TEST,
        label: {
            IT: "Pagina amminst.",
            EN: "Admin page"
        },
        title: {
            IT: "Esempio di pagina riservata per gli amministratori",
            EN: "Example of reserved page for administrators"
        },
        reserved: true
    },
    {
        url: Edr.ApgEdr_Route_eShared.RESERVED_PAGE_ERRORS,
        label: {
            IT: "Registro Errori",
            EN: "Errors log"
        },
        title: {
            IT: "Elenco degli errori riscontrati dal riavvio del servizio",
            EN: "List of the errors encountered from the service restart"
        },
        reserved: true
    },
    {
        url: Edr.ApgEdr_Route_eShared.RESERVED_PAGE_LOG,
        label: {
            IT: "Registro chiamate",
            EN: "Requests' log"
        },
        title: {
            IT: "Elenco delle chiamate ricevute dal riavvio del servizio",
            EN: "List of the calls received from the service restart"
        },
        reserved: true
    },
    {
        url: Edr.ApgEdr_Route_eShared.RESERVED_PAGE_TNG_TEMPLATES,
        label: {
            IT: "Tng Templates",
            EN: "Tng Templates"
        },
        title: {
            IT: "Modelli di pagine disponibili per il template engine",
            EN: "Available page templates for the template engine"
        },
        reserved: true
    },
    {
        url: Edr.ApgEdr_Route_eShared.RESERVED_PAGE_TNG_CACHES,
        label: {
            IT: "Tng Caches",
            EN: "Tng Caches"
        },
        title: {
            IT: "Dettagli della cache utilizzata dal template engine",
            EN: "Details of the cache used by the template engine"
        },
        reserved: true
    },
];
