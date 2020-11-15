"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const server_abstract_1 = require("express-dependency-injection/dist/server/server.abstract");
const express_dependency_injection_1 = require("express-dependency-injection");
const main_controller_1 = require("../controller/main.controller");
/**
 * Le point d'entrée principale de l'application
 */
let App = class App extends server_abstract_1.AbstractServer {
};
App = __decorate([
    express_dependency_injection_1.ExServer({
        main: main_controller_1.MainController
    })
], App);
exports.App = App;
//# sourceMappingURL=app.js.map