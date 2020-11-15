import { AbstractRouter, ExRouter } from 'express-dependency-injection';
import { AccessControlAllowOriginMiddleware } from '../middlewares/headers/response/access-control-allow-origin.middleware';
import { AccessControlAllowHeadersMiddleware } from '../middlewares/headers/response/access-control-allow-headers.middleware';
import { UserController } from './users/user.controller';
import { LocationController } from "./localisation/location.controller";
import { AccessControlAllowMethodsMiddleware } from "../middlewares/headers/response/access-control-allow-methods.middleware";
import { AnnonceController } from './annonce/annonce.controller';
import {LoginController} from "./users/login.controller";


/**
 * Controller principal de l'application - toutes les requêtes passeront par la.
 */
@ExRouter({
    path: "/",
    middlewares: [
        AccessControlAllowOriginMiddleware,
        AccessControlAllowHeadersMiddleware,
        AccessControlAllowMethodsMiddleware
    ],
    routers:[
        UserController,
        LocationController,
        AnnonceController,
        LoginController
    ]
})
export class MainController extends AbstractRouter {
    
}
