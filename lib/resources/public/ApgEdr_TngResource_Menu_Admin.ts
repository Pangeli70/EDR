/** ---------------------------------------------------------------------------
 * @module [ApgEdr_Public]
 * @author [APG] Angeli Paolo Giusto
 * @version 1.0.0 [APG 2024/11/08]
 * @version 1.0.1 [APG 2024/12/24] Moving to Deno V2
 * ----------------------------------------------------------------------------
 */


import { Tng, Uts } from "../../deps.ts";
import { ApgEdr_Route_eShared } from "../../enums/ApgEdr_Route_eShared.ts";
import { ApgEdr_Shared_Links } from "../data/ApgEdr_Resources_Links.ts";
import { ApgEdr_TngResource_Menu } from "./ApgEdr_TngResource_Menu.ts";



 const ApgEdr_Menu_Admin = [

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.ADMIN_PAGE_USERS],


]



 const NavBar = [

    ApgEdr_Shared_Links[ApgEdr_Route_eShared.PAGE_MENU],

]



export class ApgEdr_TngResource_Menu_Admin
    extends ApgEdr_TngResource_Menu {

    override paths = [ApgEdr_Route_eShared.PAGE_MENU_ADMIN];

    override readonly RESOURCE_NAME = ApgEdr_TngResource_Menu_Admin.name;

    override readonly TITLE: Uts.ApgUts_IMultilanguage = {
        EN: "Administrator features",
        IT: "Funzioni amministratore"
    }

    override readonly MENU: Tng.ApgTng_IHyperlink[] = ApgEdr_Menu_Admin;

    override readonly TOP_MENU: Tng.ApgTng_IHyperlink[] = NavBar;

}
