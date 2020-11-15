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
const annonce_model_1 = require("../../models/Annonce/annonce.model");
const utils_service_1 = require("../../services/utils/utils.service");
const manager_file_service_1 = require("../../services/manager-files/manager-file.service");
const product_repository_1 = require("./product.repository");
const user_repository_1 = require("../users/user.repository");
const location_repository_1 = require("../localisation/location.repository");
const login_repository_1 = require("../users/login.repository");
const annonce_controller_1 = require("../../controller/annonce/annonce.controller");
/**
 * Reoisitory du modèle de données Annonce
 */
let AnnonceRepository = class AnnonceRepository extends express_dependency_injection_1.Repository(generic_repository_1.GenericRepository) {
    /**
     * @constructor
     */
    constructor() {
        super();
        this.repository = super.getConnection().getRepository(annonce_model_1.Annonce);
    }
    /**
     * Enregistrement d'une annonce
     * @param annonce
     */
    save(annonce) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.save(annonce);
        });
    }
    /**
     * Retourn une annonce à partir de son ID
     * @param id
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let annonce = yield this.repository.findOne(id);
            const login = yield this.loginRepo.findById(this.utilService.getObjectIdString(annonce.codeUser));
            let name = annonce.annonceUser === 'Particulier' ? login.name : annonce.companyName;
            let url = annonce_controller_1.AnnonceController.BASE_URL + '/' + login.getObjectId() + '/' + annonce.getObjectId() + '.json';
            let photos = {};
            if (this.manageFiles.access(url)) {
                photos = this.manageFiles.read(url);
            }
            let annonceFormat = {
                _id: annonce.getObjectId(),
                creationDate: annonce.datePublication,
                user: login,
                annonce: {
                    category: annonce.category,
                    subCategory: annonce.subCategory,
                    compteType: annonce.annonceUser,
                    annonceType: annonce.annonceType,
                    annonceTitle: annonce.title,
                    description: annonce.description,
                    product: {
                        nameProduct: annonce.nameProduct,
                        stateProduct: annonce.stateProduct,
                        statusProduct: annonce.statusProduct,
                        featureSize: annonce.featureSize,
                        featureMeasure: annonce.featureMeasure,
                        nbElement: annonce.nbElement,
                        dateProduct: annonce.dateProduct,
                    },
                    price: {
                        value: annonce.price,
                        devise: annonce.currency,
                    },
                    photos: photos
                },
                adress: {
                    country: annonce.country,
                    city: annonce.city,
                    details: annonce.details
                },
                informations: {
                    nameOrPseudo: name,
                    mail: annonce.mail,
                    number: annonce.telepone,
                    displayNumber: annonce.displayTelephone
                }
            };
            return annonceFormat;
        });
    }
    /**
     *
     * Retourne la liste de tous les annonces
     */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find();
        });
    }
    /**
     *
     * Retourne la liste de tous les annonces avec un format spécifique
     */
    getAllWithFilters(limit, skip, filters) {
        return __awaiter(this, void 0, void 0, function* () {
            // Construction des criteres
            let criteres = this.getEnableCriteres(filters);
            let annoncesInfos = [];
            let annonces = !filters ? yield this.repository.find({
                order: {
                    datePublication: "DESC"
                },
                skip: skip,
                take: limit
            }) : yield this.repository.find({
                // TMP: Problème au niveau des filtres
                // Comment assurer un bon filtrage des données etant donnée que toutes les données
                // ne se trouvent pas dans la même collection par exemple si on filtre par Marque,
                // par Pays ?
                // IMPORTANT c'est en appliquant les fitres directement dans les requêtes qui peut 
                // améliorer le traitement
                where: criteres,
                order: {
                    datePublication: "DESC"
                },
                skip: skip,
                take: limit
            });
            for (let index = 0; index < annonces.length; index++) {
                const annonce = annonces[index];
                const login = yield this.loginRepo.findById(this.utilService.getObjectIdString(annonce.codeUser));
                let name = annonce.annonceUser === 'Particulier' ? login.name : annonce.companyName;
                let url = annonce_controller_1.AnnonceController.BASE_URL + '/' + login.getObjectId() + '/' + annonce.getObjectId() + '.json';
                let photos = {};
                if (this.manageFiles.access(url)) {
                    photos = this.manageFiles.read(url);
                }
                let annonceFormat = {
                    _id: annonce.getObjectId(),
                    creationDate: annonce.datePublication,
                    user: login,
                    annonce: {
                        category: annonce.category,
                        subCategory: annonce.subCategory,
                        compteType: annonce.annonceUser,
                        annonceType: annonce.annonceType,
                        annonceTitle: annonce.title,
                        description: annonce.description,
                        product: {
                            nameProduct: annonce.nameProduct,
                            stateProduct: annonce.stateProduct,
                            statusProduct: annonce.statusProduct,
                            featureSize: annonce.featureSize,
                            featureMeasure: annonce.featureMeasure,
                            nbElement: annonce.nbElement,
                            dateProduct: annonce.dateProduct,
                        },
                        price: {
                            value: annonce.price,
                            devise: annonce.currency,
                        },
                        photos: photos
                    },
                    adress: {
                        country: annonce.country,
                        city: annonce.city,
                        details: annonce.details
                    },
                    informations: {
                        nameOrPseudo: name,
                        mail: annonce.mail,
                        number: annonce.telepone,
                        displayNumber: annonce.displayTelephone
                    }
                };
                annoncesInfos.push(annonceFormat);
            }
            return annoncesInfos;
        });
    }
    /**
     *
     * Construction des criteres
     * @param filters
     */
    getEnableCriteres(filters) {
        let criteres = {};
        if (filters) {
            if (filters.country && filters.country.trim() !== '' && filters.country.trim() !== 'Tous') {
                criteres['country'] = filters.country;
            }
            if (filters.typeAnnonce && filters.typeAnnonce.trim() !== '' && filters.typeAnnonce.trim() !== 'Tous') {
                criteres['annonceType'] = filters.typeAnnonce;
            }
            if (filters.acountType && filters.acountType.trim() !== '') {
                criteres['annonceUser'] = filters.acountType;
            }
            if (filters.category && filters.category.trim() !== '' && filters.category.trim() !== 'Tous') {
                criteres['category'] = filters.category;
            }
            if (filters.subCategories && filters.subCategories.length !== 0) {
                criteres['subCategory'] = { $in: filters.subCategories };
            }
            if (filters.filters && filters.filters.marque && filters.filters.marque.trim() !== '') {
                criteres['nameProduct'] = filters.filters.marque;
            }
        }
        return criteres;
    }
    /**
     *
     * Retourne la liste de tous les annonces avec un format spécifique
     */
    getAnnonceByUsers(limit, skip, codeUser) {
        return __awaiter(this, void 0, void 0, function* () {
            // Construction des criteres
            let annoncesInfos = [];
            let annonces = yield this.repository.find({
                where: { codeUser: this.utilService.getObjectId(codeUser) },
                order: {
                    datePublication: "DESC"
                },
                skip: skip,
                take: limit
            });
            for (let index = 0; index < annonces.length; index++) {
                const annonce = annonces[index];
                const login = yield this.loginRepo.findById(this.utilService.getObjectIdString(annonce.codeUser));
                let name = annonce.annonceUser === 'Particulier' ? login.name : annonce.companyName;
                let url = annonce_controller_1.AnnonceController.BASE_URL + '/' + login.getObjectId() + '/' + annonce.getObjectId() + '.json';
                let photos = {};
                if (this.manageFiles.access(url)) {
                    photos = this.manageFiles.read(url);
                }
                let annonceFormat = {
                    _id: annonce.getObjectId(),
                    creationDate: annonce.datePublication,
                    user: login,
                    annonce: {
                        category: annonce.category,
                        subCategory: annonce.subCategory,
                        compteType: annonce.annonceUser,
                        annonceType: annonce.annonceType,
                        annonceTitle: annonce.title,
                        description: annonce.description,
                        product: {
                            nameProduct: annonce.nameProduct,
                            stateProduct: annonce.stateProduct,
                            statusProduct: annonce.stateProduct,
                            featureSize: annonce.featureSize,
                            featureMeasure: annonce.featureMeasure,
                            nbElement: annonce.nbElement,
                            dateProduct: annonce.dateProduct,
                        },
                        price: {
                            value: annonce.price,
                            devise: annonce.currency,
                        },
                        photos: photos
                    },
                    adress: {
                        country: annonce.country,
                        city: annonce.city,
                        details: annonce.details
                    },
                    informations: {
                        nameOrPseudo: name,
                        mail: annonce.mail,
                        number: annonce.telepone,
                        displayNumber: annonce.displayTelephone
                    }
                };
                annoncesInfos.push(annonceFormat);
            }
            return annoncesInfos;
        });
    }
    /***
     * Modification d'une annonce
     * @param id
     * @param annonce
     */
    update(id, annonce) {
        return __awaiter(this, void 0, void 0, function* () {
            let annonceUpdated = yield this.repository.findOne(id);
            annonceUpdated.title = annonce.title;
            annonceUpdated.description = annonce.description;
            annonceUpdated.mail = annonce.mail;
            annonceUpdated.telepone = annonce.telepone;
            annonceUpdated.annonceType = annonce.annonceType;
            annonceUpdated.price = annonce.price;
            annonceUpdated.currency = annonce.currency;
            annonceUpdated.annonceUser = annonce.companyName;
            annonceUpdated.companyName = annonce.companyName;
            // annonceUpdated.photos = annonce.photos;
            annonceUpdated.urlPhotos = annonce.urlPhotos;
            annonceUpdated.datePublication = annonce.datePublication;
            annonceUpdated.codelocation = annonce.codelocation;
            annonceUpdated.codeCategory = annonce.codeCategory;
            annonceUpdated.codeProduct = annonce.codeProduct;
            annonceUpdated.dateUpdate = new Date();
            // locationUpdated.cordonnes = location.cordonnes;
            return yield this.repository.save(annonceUpdated);
        });
    }
    /**
     * Suppression d'une annonce
     * @param id
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let annonceDeleted = yield this.repository.findOne(id);
            return yield this.repository.remove(annonceDeleted);
        });
    }
    updateAnnonce(annonce, id) {
        return __awaiter(this, void 0, void 0, function* () {
            let annonceUpdated = yield this.repository.findOne(id);
            // ANNONCE
            annonceUpdated.country = annonce.countryName;
            annonceUpdated.city = annonce.city;
            annonceUpdated.details = annonce.details;
            annonceUpdated.nameProduct = annonce.nameProduct;
            annonceUpdated.description = annonce.description;
            annonceUpdated.stateProduct = annonce.stateProduct;
            annonceUpdated.statusProduct = annonce.statusProduct;
            annonceUpdated.dateProduct = annonce.dateProduct;
            annonceUpdated.quantity = annonce.quantity;
            annonceUpdated.featureSize = annonce.featureSize;
            annonceUpdated.featureMeasure = annonce.featureMeasure;
            annonceUpdated.nbElement = annonce.nbElement;
            annonceUpdated.title = annonce.title;
            annonceUpdated.description = annonce.description;
            annonceUpdated.mail = annonce.mail;
            annonceUpdated.telepone = annonce.telephone;
            annonceUpdated.annonceType = annonce.annonceType;
            annonceUpdated.price = annonce.price;
            annonceUpdated.currency = annonce.currency;
            annonceUpdated.annonceUser = annonce.annonceUser;
            annonceUpdated.companyName = annonce.companyName;
            annonceUpdated.dateUpdate = new Date();
            annonceUpdated.category = annonce.category;
            annonceUpdated.subCategory = annonce.subCategory;
            return yield this.repository.save(annonceUpdated);
        });
    }
};
__decorate([
    express_dependency_injection_1.Inject(utils_service_1.UtilsService),
    __metadata("design:type", utils_service_1.UtilsService)
], AnnonceRepository.prototype, "utilService", void 0);
__decorate([
    express_dependency_injection_1.Inject(manager_file_service_1.ManagerFileService),
    __metadata("design:type", manager_file_service_1.ManagerFileService)
], AnnonceRepository.prototype, "managerFile", void 0);
__decorate([
    express_dependency_injection_1.Inject(product_repository_1.ProductRepository),
    __metadata("design:type", product_repository_1.ProductRepository)
], AnnonceRepository.prototype, "productRepo", void 0);
__decorate([
    express_dependency_injection_1.Inject(user_repository_1.UserRepository),
    __metadata("design:type", user_repository_1.UserRepository)
], AnnonceRepository.prototype, "userRepo", void 0);
__decorate([
    express_dependency_injection_1.Inject(login_repository_1.LoginRepository),
    __metadata("design:type", login_repository_1.LoginRepository)
], AnnonceRepository.prototype, "loginRepo", void 0);
__decorate([
    express_dependency_injection_1.Inject(location_repository_1.LocationRepository),
    __metadata("design:type", location_repository_1.LocationRepository)
], AnnonceRepository.prototype, "locationRepo", void 0);
__decorate([
    express_dependency_injection_1.Inject(manager_file_service_1.ManagerFileService),
    __metadata("design:type", manager_file_service_1.ManagerFileService)
], AnnonceRepository.prototype, "manageFiles", void 0);
AnnonceRepository = __decorate([
    express_dependency_injection_1.ExRepository(),
    __metadata("design:paramtypes", [])
], AnnonceRepository);
exports.AnnonceRepository = AnnonceRepository;
//# sourceMappingURL=annonce.repository.js.map