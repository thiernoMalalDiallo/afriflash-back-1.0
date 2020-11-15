"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_dependency_injection_1 = require("express-dependency-injection");
const database_service_1 = require("../services/database/database.service");
/**
 * Generic repository, Permettant d'assurer la connexion à la base de données
 */
class GenericRepository {
    constructor() {
        this.connection = database_service_1.DataBaseService.getConnexionInstance();
    }
    getConnection() {
        return this.connection;
    }
    connect() {
        return __awaiter(this, void 0, void 0, function* () {
            this.connection = yield this.databaseService.connection();
            return this.connection;
            // const options = this.configService.getDatabaseConfig();
            // if(mongoose.connection.readyState === 0) {
            //     mongoose.connect(
            //         `mongodb${options.address}`,
            //     );
            // }
        });
    }
}
__decorate([
    express_dependency_injection_1.Inject(database_service_1.DataBaseService),
    __metadata("design:type", database_service_1.DataBaseService)
], GenericRepository.prototype, "databaseService", void 0);
exports.GenericRepository = GenericRepository;
//# sourceMappingURL=generic.repository.js.map