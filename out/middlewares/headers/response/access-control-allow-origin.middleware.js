"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const config_service_1 = require("../../../services/config/config.service");
const express_dependency_injection_1 = require("express-dependency-injection");
/**
 * Middleware pour configurer le Access-Control-Allow-Headers
 */
let AccessControlAllowOriginMiddleware = class AccessControlAllowOriginMiddleware extends express_dependency_injection_1.AbstractMiddleware {
    run(req, res) {
        const config = new config_service_1.ConfigService();
        res.header("Access-Control-Allow-Origin", config.getServerConfig().allowOrigin);
        res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    }
};
AccessControlAllowOriginMiddleware = __decorate([
    express_dependency_injection_1.ExMiddleware()
], AccessControlAllowOriginMiddleware);
exports.AccessControlAllowOriginMiddleware = AccessControlAllowOriginMiddleware;
//# sourceMappingURL=access-control-allow-origin.middleware.js.map