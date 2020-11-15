import {ExRouter, AbstractRouter, ExRoute, HttpVerbs, Inject} from "express-dependency-injection";
import {Request, Response} from "express";

import {from, Subscription} from 'rxjs';
import {BodyParserMiddleware} from "../../middlewares/body-parser/body.parser.middleware";
import {AnnonceRepository} from "../../repository/annonce/annonce.repository";
import {Annonce} from "../../models/Annonce/annonce.model";
import {Product} from "../../models/Annonce/product.model";
import {mergeMap, map} from "rxjs/operators";
import {ProductRepository} from "../../repository/annonce/product.repository";
import {LocationModel} from "../../models/localisation/location.model";
import {LocationRepository} from "../../repository/localisation/location.repository";
import {ManagerFileService} from "../../services/manager-files/manager-file.service";


/**
 * Controller principal des annonces - toutes les requêtes qui concerne les annonces passeront par la.
 */
@ExRouter({
    path: "/annonce"
})
export class AnnonceController extends AbstractRouter {

    @Inject(AnnonceRepository)
    private readonly repoAnnonce: AnnonceRepository;

    @Inject(ProductRepository)
    private readonly repoProduct: ProductRepository;

    @Inject(LocationRepository)
    private readonly repoLocation: LocationRepository;

    public static BASE_URL = 'src/assets/photos';


    @ExRoute({
        path: "/",
        verb: HttpVerbs.GET
    })
    public findAll(_req: Request, res: Response, args: { body: null, params: { id: string } }): Subscription {

        return from(this.repoAnnonce.getAll()).subscribe(
            (data) => data != null ? res.json(data) : null,
            error => res.status(500).send({message: 'la requête à été interompu : ' + error}),
            () => res.end()
        )

    }

    @ExRoute({
        path: "/annonces",
        verb: HttpVerbs.POST,
        middlewares: [
            BodyParserMiddleware
        ]
    })
    public findAllWihtFilters(_req: Request, res: Response, args: {
        body: {
            limit: number,
            skip: number,
            filters?: any
        },
        params: null
    }): Subscription {
        let filters = args.body.filters ? args.body.filters : null;
        return from(this.repoAnnonce.getAllWithFilters(args.body.limit, args.body.skip, filters)).subscribe(
            (data) => data != null ? res.json(data) : null,
            error => res.status(500).send({message: 'la requête à été interompu : ' + error}),
            () => res.end()
        )

    }

    /**
     * Retourne l'annonce en fonction de son id
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    @ExRoute({
        path: "/:id",
        verb: HttpVerbs.GET
    })
    public findById(_req: Request, res: Response, args: { params: { id: string } }): Subscription {
        return from(this.repoAnnonce.findById(args.params.id)).subscribe(
            data => data != null ? res.json(data) : null,
            error => {
                res.status(500).send({message: 'la requête à été interompu : ' + error})
                //  this.repoLogin.closeDatabase()
            },
            () => {
                res.end()
                //  this.repoLogin.closeDatabase()
            })

    }

    /**
     * Enregistrement d'une annonce
     * @param _req
     * @param res
     * @param args
     */
    @ExRoute({
        path: "/save",
        verb: HttpVerbs.POST,
        middlewares: [
            BodyParserMiddleware
        ]
    })
    public post(_req: Request, res: Response, args: {
        body: {

            title: string,
            description: string,
            telephone: string,
            mail: string,
            annonceType: string,
            companyName: string,
            annonceUser: string,
            photos: any[],
            price: number,

            nameProduct: string,
            currency: string,
            quantity?: number,
            stateProduct?: string,
            statusProduct: string,
            featureSize: number,
            featureMeasure: string,
            nbElement: string,
            dateProduct: Date,

            codeUser: string,
            codeCategory?: string,
            category: string,
            subCategory: string,


            city: string,
            zipCode?: string,
            details: string,
            countryName: string,
            cordonnes?: any
        }
    }): Subscription {
        // PRODUCT 
        let newProduct = new Product();
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
        let newAnnonce = new Annonce();
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

        return from(this.repoAnnonce.save(newAnnonce)).pipe(
            map(
                (annonce) => {
                    // Enregistrement des photos de l'annonce
                    if (args.body.photos && args.body.photos.length !== 0) {

                        let idAnnonce = annonce.getObjectId();
                        let idUser = annonce.codeUser;
                        let url = AnnonceController.BASE_URL + '/' + idUser + '/' + idAnnonce + '.json';
                        let data = {};
                        let photos = args.body.photos;
                        for (let i = 0; i < photos.length; i++) {
                            let position = i + 1;
                            data['photo_' + position] = photos[i] + '';
                        }

                        // Creation du directory si il n'existe pas
                        this.repoAnnonce.managerFile.createDirectory(AnnonceController.BASE_URL + '/' + idUser);
                        // Enrégistrement des photos dans le fichier adéquat
                        this.repoAnnonce.managerFile.write(url, data);
                    }
                    return annonce;
                }
            )
        ).subscribe(
            (data) => data != null ? res.json(data) : null,
            error => res.status(500).send({message: 'la requête à été interompu : ' + error}),
            () => res.end()
        )
    }


    /**
     * Enregistrement d'une annonce
     * @param _req
     * @param res
     * @param args
     */
    @ExRoute({
        path: "/update/:id",
        verb: HttpVerbs.POST,
        middlewares: [
            BodyParserMiddleware
        ]
    })
    public update(_req: Request, res: Response, args: {
        params: { id: string },
        body: {

            title: string,
            description: string,
            telephone: string,
            mail: string,
            annonceType: string,
            companyName: string,
            annonceUser: string,
            photos: any[],
            price: number,

            nameProduct: string,
            currency: string,
            quantity?: number,
            stateProduct?: string,
            statusProduct: string,
            featureSize: number,
            featureMeasure: string,
            nbElement: string,
            dateProduct: Date,

            codeUser: string,
            codeCategory?: string,
            category: string,
            subCategory: string,


            city: string,
            zipCode?: string,
            details: string,
            countryName: string,
            cordonnes?: any
        }
    }): Subscription {
        return from(this.repoAnnonce.updateAnnonce(args.body, args.params.id)).pipe(
            map(
                (annonce) => {
                    // Enregistrement des photos de l'annonce
                    if (args.body.photos && args.body.photos.length !== 0) {

                        let idAnnonce = annonce.getObjectId();
                        let idUser = annonce.codeUser;
                        let url = AnnonceController.BASE_URL + '/' + idUser + '/' + idAnnonce + '.json';
                        let data = {};
                        let photos = args.body.photos;
                        for (let i = 0; i < photos.length; i++) {
                            let position = i + 1;
                            data['photo_' + position] = photos[i] + '';
                        }

                        // Creation du directory si il n'existe pas
                        this.repoAnnonce.managerFile.createDirectory(AnnonceController.BASE_URL + '/' + idUser);
                        // Enrégistrement des photos dans le fichier adéquat
                        this.repoAnnonce.managerFile.write(url, data);
                    }
                    return annonce;
                }
            )
        ).subscribe(
            (data) => data != null ? res.json(data) : null,
            error => res.status(500).send({message: 'la requête à été interompu : ' + error}),
            () => res.end()
        )
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

    @ExRoute({
        path: "/byuser",
        verb: HttpVerbs.POST,
        middlewares: [
            BodyParserMiddleware
        ]
    })
    public findAnnoncesByUser(_req: Request, res: Response, args: {
        body: {
            limit: number,
            skip: number,
            user?: any
        },
        params: null
    }): Subscription {
        let codeUser = args.body.user ? args.body.user : null;
        return from(this.repoAnnonce.getAnnonceByUsers(args.body.limit, args.body.skip, codeUser)).subscribe(
            (data) => data != null ? res.json(data) : null,
            error => res.status(500).send({message: 'la requête à été interompu : ' + error}),
            () => res.end()
        )

    }


    /**
     * Suppression d'une annonce en fonction de son id
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    @ExRoute({
        path: "/delate",
        verb: HttpVerbs.POST,
        middlewares: [
            BodyParserMiddleware
        ]
    })
    public delateAnnonce(_req: Request, res: Response, args: {
        body: {
            annonceId: string
        }, params: { id: string }
    }): Subscription {
        return from(this.repoAnnonce.delete(args.body.annonceId)).pipe(
            map(
                (annonce) => {
                    // Enregistrement des photos de l'annonce
                        let idAnnonce = annonce.getObjectId();
                        let idUser = annonce.codeUser;
                        let url = AnnonceController.BASE_URL + '/' + idUser + '/' + args.body.annonceId + '.json';
                        let data = {};
                        this.repoAnnonce.managerFile.removeFile(url);
                    return annonce;
                }
            )
        ).subscribe(
            data => data != null ? res.json(data) : null,
            error => {
                res.status(500).send({message: 'la requête à été interompu : ' + error})
                //  this.repoLogin.closeDatabase()
            },
            () => {
                res.end()
                //  this.repoLogin.closeDatabase()
            })

    }

}
