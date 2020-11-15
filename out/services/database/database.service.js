"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var DataBaseService_1;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_dependency_injection_1 = require("express-dependency-injection");
const config_service_1 = require("../config/config.service");
const annonce_model_1 = require("../../models/Annonce/annonce.model");
const category_model_1 = require("../../models/Annonce/category.model");
const product_model_1 = require("../../models/Annonce/product.model");
const user_model_1 = require("../../models/users/user.model");
const login_model_1 = require("../../models/users/login.model");
const location_model_1 = require("../../models/localisation/location.model");
let DataBaseService = DataBaseService_1 = class DataBaseService {
    connection() {
        let options = DataBaseService_1.config.getDatabaseConfig();
        let url = `mongodb${options.address}`;
        return typeorm_1.createConnection({
            type: options.type,
            useNewUrlParser: true,
            url: url,
            ssl: true,
            authSource: "admin",
            entities: [
                annonce_model_1.Annonce,
                category_model_1.Category,
                product_model_1.Product,
                user_model_1.User,
                login_model_1.Login,
                location_model_1.LocationModel
            ]
        });
    }
    static setConnexionInstance(connection) {
        DataBaseService_1.connectionInstance = connection;
    }
    static getConnexionInstance() {
        return DataBaseService_1.connectionInstance;
    }
};
DataBaseService.config = new config_service_1.ConfigService();
DataBaseService = DataBaseService_1 = __decorate([
    express_dependency_injection_1.Service()
], DataBaseService);
exports.DataBaseService = DataBaseService;
//# sourceMappingURL=database.service.js.map