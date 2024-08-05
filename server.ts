/** ---------------------------------------------------------------------------
 * @module [ApgEdr]
 * @author [APG] Angeli Paolo Giusto
 * @version 0.1 APG 20220909 Alpha version
 * @version 0.2 APG 20230416 Moved to its own microservice
 * @version 0.3 APG 20240106 Revamped
 * @version 0.4 APG 20240710 New Middlewares
 * @version 0.5 APG 20240713 Private packages
 * ----------------------------------------------------------------------------
 */

import { loadSync } from "https://deno.land/std@0.224.0/dotenv/mod.ts";
loadSync({ export: true });


const env = Deno.env.toObject();
for (const k in env) {
    console.log(`${k}=${env[k]}`);
}

const GHPAC = Deno.env.get("APG_EDR_GITHUB_PRIVATE_KEY");

if (!GHPAC) {
    throw new Error("Missing github package key in environment");
}
Deno.env.set('DENO_AUTH_TOKENS', GHPAC + "@raw.githubusercontent.com");



import { Edr, Tng } from "./srv/deps.ts";
import {
    ApgEdr_Auth_Authentications,
    ApgEdr_Auth_Authorizations,
    ApgEdr_Auth_Profilations,
    ApgEdr_Microservice,
    ApgEdr_Middlewares,
    ApgEdr_Resources
} from "./srv/mod.ts";


Edr.ApgEdr_Service.Microservice = ApgEdr_Microservice;

Edr.ApgEdr_Service.ClientCacheMaxAge = 10 * 60; // 10 minutes

Edr.ApgEdr_Service.UseCdn = true;


// Setup Edr Auth
Edr.ApgEdr_Auth_Service.Authentications = ApgEdr_Auth_Authentications;
Edr.ApgEdr_Auth_Service.Authorizations = ApgEdr_Auth_Authorizations;
Edr.ApgEdr_Auth_Service.Profilations = ApgEdr_Auth_Profilations;


// Setup env customization
Edr.ApgEdr_Service.DefaultFavicon = "ApgCdn_Favicon_Breda_2024_V01";
Edr.ApgEdr_Service.DefaultLogoJs = "ApgCdn_Logo3D_Breda_2024_V01";


// Setup Tng
Tng.ApgTng_Service.Init("./srv/templates", true, 100);


const server = new Edr.Drash.Server({
    hostname: Edr.ApgEdr_Service.Microservice.devServerIP,
    port: Edr.ApgEdr_Service.Microservice.devServerPort,
    protocol: "http",
    resources: ApgEdr_Resources,
    services: ApgEdr_Middlewares,
});

server.run();

Edr.ApgEdr_Service.StartupResume(Edr.ApgEdr_Service.Microservice, server.address);