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
const generic_repository_1 = require("../generic.repository");
const location_model_1 = require("../../models/localisation/location.model");
/**
 * Reoisitory du modèle de données annonce
 */
let LocationRepository = class LocationRepository extends express_dependency_injection_1.Repository(generic_repository_1.GenericRepository) {
    /**
     * @constructor
     */
    constructor() {
        super();
        this.repository = super.getConnection().getRepository(location_model_1.LocationModel);
    }
    /**
     * Enregistrement d'une localisation
     * @param location
     */
    save(location) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.save(location);
        });
    }
    /**
     * Retourn une localisation à partir de son ID
     * @param id
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne(id);
        });
    }
    /**
     *
     * Retourne la liste de tous les localisations
     */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find();
        });
    }
    /***
     * Modification d'une localisation
     * @param id
     * @param location
     */
    update(id, location) {
        return __awaiter(this, void 0, void 0, function* () {
            let locationUpdated = yield this.repository.findOne(id);
            locationUpdated.countryName = location.countryName;
            locationUpdated.city = location.city;
            locationUpdated.zipCode = location.zipCode;
            locationUpdated.details = location.details;
            // locationUpdated.cordonnes = location.cordonnes;
            return yield this.repository.save(locationUpdated);
        });
    }
    /**
     * Suppression d'une localisation
     * @param id
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let locationDeleted = yield this.repository.findOne(id);
            return yield this.repository.remove(locationDeleted);
        });
    }
};
LocationRepository = __decorate([
    express_dependency_injection_1.ExRepository(),
    __metadata("design:paramtypes", [])
], LocationRepository);
exports.LocationRepository = LocationRepository;
//# sourceMappingURL=location.repository.js.map