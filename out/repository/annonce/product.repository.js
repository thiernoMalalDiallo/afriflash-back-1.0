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
const product_model_1 = require("../../models/Annonce/product.model");
/**
 * Reoisitory du modèle de données produit
 */
let ProductRepository = class ProductRepository extends express_dependency_injection_1.Repository(generic_repository_1.GenericRepository) {
    /**
     * @constructor
     */
    constructor() {
        super();
        this.repository = super.getConnection().getRepository(product_model_1.Product);
    }
    /**
     * Enregistrement d'une product
     * @param product
     */
    save(product) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.save(product);
        });
    }
    /**
     * Retourn une category à partir de son ID
     * @param id
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne(id);
        });
    }
    /**
     *
     * Retourne la liste de tous les catgories
     */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find();
        });
    }
    /***
     * Modification d'un produit
     * @param id
     * @param product
     */
    update(id, product) {
        return __awaiter(this, void 0, void 0, function* () {
            let productUpdated = yield this.repository.findOne(id);
            productUpdated.nameProduct = product.nameProduct;
            productUpdated.description = product.description;
            productUpdated.quantity = product.quantity;
            productUpdated.stateProduct = product.stateProduct;
            productUpdated.statusProduct = product.statusProduct;
            productUpdated.featureSize = product.featureSize;
            productUpdated.featureMeasure = product.featureMeasure;
            productUpdated.nbElement = product.nbElement;
            productUpdated.categoryId = product.categoryId;
            // productUpdated.codeUser = product.codeUser;
            productUpdated.dateProduct = product.dateProduct;
            return yield this.repository.save(productUpdated);
        });
    }
    /**
     * Suppression d'un produit
     * @param id
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let productDeleted = yield this.repository.findOne(id);
            return yield this.repository.remove(productDeleted);
        });
    }
};
ProductRepository = __decorate([
    express_dependency_injection_1.ExRepository(),
    __metadata("design:paramtypes", [])
], ProductRepository);
exports.ProductRepository = ProductRepository;
//# sourceMappingURL=product.repository.js.map