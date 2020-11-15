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
Object.defineProperty(exports, "__esModule", { value: true });
var AnnonceController_1;
const express_dependency_injection_1 = require("express-dependency-injection");
const rxjs_1 = require("rxjs");
const body_parser_middleware_1 = require("../../middlewares/body-parser/body.parser.middleware");
const annonce_repository_1 = require("../../repository/annonce/annonce.repository");
const annonce_model_1 = require("../../models/Annonce/annonce.model");
const product_model_1 = require("../../models/Annonce/product.model");
const operators_1 = require("rxjs/operators");
const product_repository_1 = require("../../repository/annonce/product.repository");
const location_repository_1 = require("../../repository/localisation/location.repository");
/**
 * Controller principal des annonces - toutes les requêtes qui concerne les annonces passeront par la.
 */
let AnnonceController = AnnonceController_1 = class AnnonceController extends express_dependency_injection_1.AbstractRouter {
    findAll(_req, res, args) {
        return rxjs_1.from(this.repoAnnonce.getAll()).subscribe((data) => data != null ? res.json(data) : null, error => res.status(500).send({ message: 'la requête à été interompu : ' + error }), () => res.end());
    }
    findAllWihtFilters(_req, res, args) {
        let filters = args.body.filters ? args.body.filters : null;
        return rxjs_1.from(this.repoAnnonce.getAllWithFilters(args.body.limit, args.body.skip, filters)).subscribe((data) => data != null ? res.json(data) : null, error => res.status(500).send({ message: 'la requête à été interompu : ' + error }), () => res.end());
    }
    /**
     * Retourne l'annonce en fonction de son id
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    findById(_req, res, args) {
        return rxjs_1.from(this.repoAnnonce.findById(args.params.id)).subscribe(data => data != null ? res.json(data) : null, error => {
            res.status(500).send({ message: 'la requête à été interompu : ' + error });
            //  this.repoLogin.closeDatabase()
        }, () => {
            res.end();
            //  this.repoLogin.closeDatabase()
        });
    }
    /**
     * Enregistrement d'une annonce
     * @param _req
     * @param res
     * @param args
     */
    post(_req, res, args) {
        // PRODUCT 
        let newProduct = new product_model_1.Product();
        newProduct.nameProduct = args.body.nameProduct;
        newProduct.description = args.body.description;
        args.body.quantity ? newProduct.quantity = args.body.quantity : 'nothing';
        args.body.stateProduct ? newProduct.stateProduct = args.body.stateProduct : 'nothing';
        newProduct.statusProduct = args.body.statusProduct;
        newProduct.dateProduct = args.body.dateProduct;
        newProduct.featureSize = args.body.featureSize;
        newProduct.featureMeasure = args.body.featureMeasure;
        newProduct.nbElement = args.body.nbElement;
        newProduct.updateDate = new Date();
        newProduct.creationDate = new Date();
        // ANNONCE
        let newAnnonce = new annonce_model_1.Annonce();
        let userId = this.repoAnnonce.utilService.getObjectId(args.body.codeUser);
        newAnnonce.country = args.body.countryName;
        newAnnonce.city = args.body.city;
        newAnnonce.details = args.body.details;
        newAnnonce.nameProduct = newProduct.nameProduct;
        newAnnonce.description = newProduct.description;
        newAnnonce.stateProduct = newProduct.stateProduct;
        newAnnonce.statusProduct = newProduct.statusProduct;
        newAnnonce.dateProduct = newProduct.dateProduct;
        newAnnonce.quantity = newProduct.quantity;
        newAnnonce.featureSize = newProduct.featureSize;
        newAnnonce.featureMeasure = newProduct.featureMeasure;
        newAnnonce.nbElement = newProduct.nbElement;
        newAnnonce.title = args.body.title;
        newAnnonce.description = args.body.description;
        newAnnonce.mail = args.body.mail;
        newAnnonce.telepone = args.body.telephone;
        newAnnonce.annonceType = args.body.annonceType;
        newAnnonce.price = args.body.price;
        newAnnonce.currency = args.body.currency;
        newAnnonce.annonceUser = args.body.annonceUser;
        newAnnonce.companyName = args.body.companyName;
        newAnnonce.datePublication = new Date();
        newAnnonce.dateUpdate = new Date();
        newAnnonce.category = args.body.category;
        newAnnonce.subCategory = args.body.subCategory;
        // newAnnonce.codeCategory =  categoryId;
        newAnnonce.codeUser = userId;
        return rxjs_1.from(this.repoAnnonce.save(newAnnonce)).pipe(operators_1.map((annonce) => {
            // Enregistrement des photos de l'annonce
            if (args.body.photos && args.body.photos.length !== 0) {
                let idAnnonce = annonce.getObjectId();
                let idUser = annonce.codeUser;
                let url = AnnonceController_1.BASE_URL + '/' + idUser + '/' + idAnnonce + '.json';
                let data = {};
                let photos = args.body.photos;
                for (let i = 0; i < photos.length; i++) {
                    let position = i + 1;
                    data['photo_' + position] = photos[i] + '';
                }
                // Creation du directory si il n'existe pas
                this.repoAnnonce.managerFile.createDirectory(AnnonceController_1.BASE_URL + '/' + idUser);
                // Enrégistrement des photos dans le fichier adéquat
                this.repoAnnonce.managerFile.write(url, data);
            }
            return annonce;
        })).subscribe((data) => data != null ? res.json(data) : null, error => res.status(500).send({ message: 'la requête à été interompu : ' + error }), () => res.end());
    }
    /**
     * Enregistrement d'une annonce
     * @param _req
     * @param res
     * @param args
     */
    update(_req, res, args) {
        return rxjs_1.from(this.repoAnnonce.updateAnnonce(args.body, args.params.id)).pipe(operators_1.map((annonce) => {
            // Enregistrement des photos de l'annonce
            if (args.body.photos && args.body.photos.length !== 0) {
                let idAnnonce = annonce.getObjectId();
                let idUser = annonce.codeUser;
                let url = AnnonceController_1.BASE_URL + '/' + idUser + '/' + idAnnonce + '.json';
                let data = {};
                let photos = args.body.photos;
                for (let i = 0; i < photos.length; i++) {
                    let position = i + 1;
                    data['photo_' + position] = photos[i] + '';
                }
                // Creation du directory si il n'existe pas
                this.repoAnnonce.managerFile.createDirectory(AnnonceController_1.BASE_URL + '/' + idUser);
                // Enrégistrement des photos dans le fichier adéquat
                this.repoAnnonce.managerFile.write(url, data);
            }
            return annonce;
        })).subscribe((data) => data != null ? res.json(data) : null, error => res.status(500).send({ message: 'la requête à été interompu : ' + error }), () => res.end());
    }
    /**
     * Retourne tous les annonces
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    // @ExRoute({
    //     path: "/",
    //     verb: HttpVerbs.GET
    // })
    // public findAll(_req: Request, res: Response, args: { body: null, params: { id: string } }): Subscription {
    //     return from(this.repoAnnonce.getAll()).subscribe(
    //         (data) => data != null ? res.json(data) : null,
    //         error => res.status(500).send({message: 'la requête à été interompu : ' + error}),
    //         () => res.end()
    //     )
    // }
    // /**
    //  * Enregistrement d'une annonce
    //  * @param _req
    //  * @param res
    //  * @param args
    //  */
    // @ExRoute({
    //     path: "/save",
    //     verb: HttpVerbs.POST,
    //     middlewares: [
    //         BodyParserMiddleware
    //     ]
    // })
    // public post(_req: Request, res: Response, args: {
    //     body: {
    //         title: string,
    //         description: string,
    //         telephone: string,
    //         mail:string,
    //         annonceType:string,
    //         companyName: string,
    //         annonceUser: string,
    //         photos: any[],
    //         price:number,
    //         nameProduct: string,
    //         currency: string,
    //         quantity?: number,
    //         stateProduct?: string,
    //         statusProduct:string,
    //         featureSize: number,
    //         featureMeasure: string,
    //         nbElement: string,
    //         dateProduct: Date,
    //         codeUser: string,
    //         codeCategory?: string,
    //         category: string,
    //         subCategory: string,
    //         city: string,
    //         zipCode?:string,
    //         details: string,
    //         countryName: string,
    //         cordonnes?: any
    //     }
    // }): Subscription {
    //     let newLocation = new LocationModel();
    //     newLocation.countryName= args.body.countryName;
    //     newLocation.city = args.body.city;
    //     // newLocation.zipCode = args.body.zipCode;
    //     newLocation.details = args.body.details;
    //     // newLocation.cordonnes = args.body.cordonnes;
    //     let userId = this.repoAnnonce.utilService.getObjectId(args.body.codeUser);
    //     // let categoryId = this.repoAnnonce.utilService.getObjectId(args.body.codeCategory);
    //     console.log('user id : ' + userId)
    //     return from(this.repoLocation.save(newLocation)).pipe(
    //         mergeMap(
    //             (location)=>{
    //                 console.log(location)
    //                 let newProduct = new Product();
    //                 newProduct.nameProduct = args.body.nameProduct;
    //                 newProduct.description = args.body.description;
    //                 args.body.quantity ? newProduct.quantity = args.body.quantity : 'nothing';
    //                 args.body.stateProduct ? newProduct.stateProduct = args.body.stateProduct : 'nothing';
    //                 newProduct.statusProduct = args.body.statusProduct;
    //                 newProduct.dateProduct = args.body.dateProduct;
    //                 newProduct.featureSize = args.body.featureSize;
    //                 newProduct.featureMeasure = args.body.featureMeasure;
    //                 newProduct.nbElement = args.body.nbElement;
    //                 // newProduct.categoryId = categoryId;
    //                 return from(this.repoProduct.save(newProduct)).pipe(
    //                     mergeMap(
    //                         (product) => {
    //                             console.log('================ product ==================')
    //                             console.log(product)
    //                             let newAnnonce = new Annonce();
    //                             newAnnonce.title = args.body.title;
    //                             newAnnonce.description = args.body.description;
    //                             newAnnonce.mail = args.body.mail;
    //                             newAnnonce.telepone = args.body.telephone;
    //                             newAnnonce.annonceType = args.body.annonceType;
    //                             newAnnonce.price =  args.body.price;
    //                             newAnnonce.currency =  args.body.currency;
    //                             newAnnonce.annonceUser =  args.body.annonceUser;
    //                             newAnnonce.companyName =  args.body.companyName;
    //                             // newAnnonce.photos = args.body.photos;
    //                             newAnnonce.datePublication = new Date();
    //                             newAnnonce.dateUpdate = new Date();
    //                             let productCode = this.repoAnnonce.utilService.getObjectId(product.getObjectId());
    //                             let locationCode = this.repoAnnonce.utilService.getObjectId(location.getObjectId());
    //                             newAnnonce.codelocation = locationCode;
    //                             newAnnonce.codeProduct= productCode;
    //                             newAnnonce.category = args.body.category;
    //                             newAnnonce.subCategory = args.body.subCategory;
    //                             // newAnnonce.codeCategory =  categoryId;
    //                             newAnnonce.codeUser =  userId;
    //                             return from(this.repoAnnonce.save(newAnnonce)).pipe(
    //                                 map(
    //                                     (annonce) => {
    //                                         console.log('================ Annonce ==================')
    //                                     console.log(annonce)
    //                                         // Enregistrement des photos de l'annonce
    //                                         if (args.body.photos && args.body.photos.length !== 0) {
    //                                             let idAnnonce = annonce.getObjectId();
    //                                             let idUser = annonce.codeUser;
    //                                             let url = AnnonceController.BASE_URL + '/' + idUser + '/' + idAnnonce + '.json';
    //                                             let data = {};
    //                                             let photos = args.body.photos;
    //                                             for (let i = 0; i < photos.length; i++) {
    //                                                 let position = i + 1;
    //                                                 data['photo_' + position] = photos[i] + '';
    //                                             }
    //                                             // Creation du directory si il n'existe pas
    //                                             this.repoAnnonce.managerFile.createDirectory(AnnonceController.BASE_URL + '/' + idUser);
    //                                             // Enrégistrement des photos dans le fichier adéquat
    //                                             this.repoAnnonce.managerFile.write(url, data);
    //                                         }
    //                                         return annonce;
    //                                     }
    //                                 )
    //                             )
    //                         }
    //                     )
    //                 )
    //             }
    //         )
    //       ).subscribe(
    //         (data) => data != null ? res.json(data) : null,
    //         error => res.status(500).send({message: 'la requête à été interompu : ' + error}),
    //         () => res.end()
    //     )}
    findAnnoncesByUser(_req, res, args) {
        let codeUser = args.body.user ? args.body.user : null;
        return rxjs_1.from(this.repoAnnonce.getAnnonceByUsers(args.body.limit, args.body.skip, codeUser)).subscribe((data) => data != null ? res.json(data) : null, error => res.status(500).send({ message: 'la requête à été interompu : ' + error }), () => res.end());
    }
    /**
     * Suppression d'une annonce en fonction de son id
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    delateAnnonce(_req, res, args) {
        return rxjs_1.from(this.repoAnnonce.delete(args.body.annonceId)).pipe(operators_1.map((annonce) => {
            // Enregistrement des photos de l'annonce
            let idAnnonce = annonce.getObjectId();
            let idUser = annonce.codeUser;
            let url = AnnonceController_1.BASE_URL + '/' + idUser + '/' + args.body.annonceId + '.json';
            let data = {};
            this.repoAnnonce.managerFile.removeFile(url);
            return annonce;
        })).subscribe(data => data != null ? res.json(data) : null, error => {
            res.status(500).send({ message: 'la requête à été interompu : ' + error });
            //  this.repoLogin.closeDatabase()
        }, () => {
            res.end();
            //  this.repoLogin.closeDatabase()
        });
    }
};
AnnonceController.BASE_URL = 'src/assets/photos';
__decorate([
    express_dependency_injection_1.Inject(annonce_repository_1.AnnonceRepository),
    __metadata("design:type", annonce_repository_1.AnnonceRepository)
], AnnonceController.prototype, "repoAnnonce", void 0);
__decorate([
    express_dependency_injection_1.Inject(product_repository_1.ProductRepository),
    __metadata("design:type", product_repository_1.ProductRepository)
], AnnonceController.prototype, "repoProduct", void 0);
__decorate([
    express_dependency_injection_1.Inject(location_repository_1.LocationRepository),
    __metadata("design:type", location_repository_1.LocationRepository)
], AnnonceController.prototype, "repoLocation", void 0);
__decorate([
    express_dependency_injection_1.ExRoute({
        path: "/",
        verb: express_dependency_injection_1.HttpVerbs.GET
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", rxjs_1.Subscription)
], AnnonceController.prototype, "findAll", null);
__decorate([
    express_dependency_injection_1.ExRoute({
        path: "/annonces",
        verb: express_dependency_injection_1.HttpVerbs.POST,
        middlewares: [
            body_parser_middleware_1.BodyParserMiddleware
        ]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", rxjs_1.Subscription)
], AnnonceController.prototype, "findAllWihtFilters", null);
__decorate([
    express_dependency_injection_1.ExRoute({
        path: "/:id",
        verb: express_dependency_injection_1.HttpVerbs.GET
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", rxjs_1.Subscription)
], AnnonceController.prototype, "findById", null);
__decorate([
    express_dependency_injection_1.ExRoute({
        path: "/save",
        verb: express_dependency_injection_1.HttpVerbs.POST,
        middlewares: [
            body_parser_middleware_1.BodyParserMiddleware
        ]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", rxjs_1.Subscription)
], AnnonceController.prototype, "post", null);
__decorate([
    express_dependency_injection_1.ExRoute({
        path: "/update/:id",
        verb: express_dependency_injection_1.HttpVerbs.POST,
        middlewares: [
            body_parser_middleware_1.BodyParserMiddleware
        ]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", rxjs_1.Subscription)
], AnnonceController.prototype, "update", null);
__decorate([
    express_dependency_injection_1.ExRoute({
        path: "/byuser",
        verb: express_dependency_injection_1.HttpVerbs.POST,
        middlewares: [
            body_parser_middleware_1.BodyParserMiddleware
        ]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", rxjs_1.Subscription)
], AnnonceController.prototype, "findAnnoncesByUser", null);
__decorate([
    express_dependency_injection_1.ExRoute({
        path: "/delate",
        verb: express_dependency_injection_1.HttpVerbs.POST,
        middlewares: [
            body_parser_middleware_1.BodyParserMiddleware
        ]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", rxjs_1.Subscription)
], AnnonceController.prototype, "delateAnnonce", null);
AnnonceController = AnnonceController_1 = __decorate([
    express_dependency_injection_1.ExRouter({
        path: "/annonce"
    })
], AnnonceController);
exports.AnnonceController = AnnonceController;
//# sourceMappingURL=annonce.controller.js.map