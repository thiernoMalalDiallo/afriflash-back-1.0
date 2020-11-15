"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_dependency_injection_1 = require("express-dependency-injection");
const access_control_allow_origin_middleware_1 = require("../middlewares/headers/response/access-control-allow-origin.middleware");
const access_control_allow_headers_middleware_1 = require("../middlewares/headers/response/access-control-allow-headers.middleware");
const user_controller_1 = require("./users/user.controller");
const location_controller_1 = require("./localisation/location.controller");
const access_control_allow_methods_middleware_1 = require("../middlewares/headers/response/access-control-allow-methods.middleware");
const annonce_controller_1 = require("./annonce/annonce.controller");
const login_controller_1 = require("./users/login.controller");
/**
 * Controller principal de l'application - toutes les requêtes passeront par la.
 */
let MainController = class MainController extends express_dependency_injection_1.AbstractRouter {
};
MainController = __decorate([
    express_dependency_injection_1.ExRouter({
        path: "/",
        middlewares: [
            access_control_allow_origin_middleware_1.AccessControlAllowOriginMiddleware,
            access_control_allow_headers_middleware_1.AccessControlAllowHeadersMiddleware,
            access_control_allow_methods_middleware_1.AccessControlAllowMethodsMiddleware
        ],
        routers: [
            user_controller_1.UserController,
            location_controller_1.LocationController,
            annonce_controller_1.AnnonceController,
            login_controller_1.LoginController
        ]
    })
], MainController);
exports.MainController = MainController;
//# sourceMappingURL=main.controller.js.map