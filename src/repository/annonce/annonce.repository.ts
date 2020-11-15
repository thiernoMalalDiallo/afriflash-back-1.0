import {ExRepository, Inject, Repository} from "express-dependency-injection";
import {GenericRepository} from "../generic.repository";
import * as typeorm from "typeorm";
import {Annonce} from "../../models/Annonce/annonce.model";
import {UtilsService} from "../../services/utils/utils.service";
import {ManagerFileService} from "../../services/manager-files/manager-file.service";
import {ProductRepository} from "./product.repository";
import {UserRepository} from "../users/user.repository";
import {LocationRepository} from "../localisation/location.repository";
import {LoginRepository} from "../users/login.repository";
import {AnnonceController} from "../../controller/annonce/annonce.controller";
import {In} from "typeorm";

/**
 * Reoisitory du modèle de données Annonce
 */
@ExRepository()
export class AnnonceRepository extends Repository(GenericRepository) {
    /**
     * Injection de repository pour le model anonce
     */
    private repository: typeorm.Repository<Annonce>;
    /**
     * Injection de service de connexion
     */
    protected connection: typeorm.Connection;

    @Inject(UtilsService)
    public readonly utilService: UtilsService;

    @Inject(ManagerFileService)
    public readonly managerFile: ManagerFileService;

    @Inject(ProductRepository)
    public readonly productRepo: ProductRepository;

    @Inject(UserRepository)
    public readonly userRepo: UserRepository;

    @Inject(LoginRepository)
    public readonly loginRepo: LoginRepository;

    @Inject(LocationRepository)
    public readonly locationRepo: LocationRepository;

    @Inject(ManagerFileService)
    public readonly manageFiles: ManagerFileService;

    /**
     * @constructor
     */
    constructor() {
        super();
        this.repository = super.getConnection().getRepository(Annonce);
    }

    /**
     * Enregistrement d'une annonce
     * @param annonce
     */
    public async save(annonce: Annonce) {
        return await this.repository.save(annonce);
    }

    /**
     * Retourn une annonce à partir de son ID
     * @param id
     */
    public async findById(id: string) {
        let annonce = await this.repository.findOne(id);
        const login = await this.loginRepo.findById(this.utilService.getObjectIdString(annonce.codeUser));
        let name = annonce.annonceUser === 'Particulier' ? login.name : annonce.companyName;
        let url = AnnonceController.BASE_URL + '/' + login.getObjectId() + '/' + annonce.getObjectId() + '.json';
        let photos = {}
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

        }
        return annonceFormat;

    }

    /**
     *
     * Retourne la liste de tous les annonces
     */
    public async getAll() {
        return await this.repository.find();
    }

    /**
     *
     * Retourne la liste de tous les annonces avec un format spécifique
     */
    public async getAllWithFilters(limit: number, skip: number, filters?: {
        typeAnnonce: string,
        category: string,
        subCategories: string[],
        filters: any,
        acountType: string,
        country: string
    }) {

        // Construction des criteres
        let criteres = this.getEnableCriteres(filters);
        let annoncesInfos = [];
        let annonces = !filters ? await this.repository.find(
            {
                order: {
                    datePublication: "DESC"
                },
                skip: skip,
                take: limit
            }
        ) : await this.repository.find(
            {
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
            }
        );
        for (let index = 0; index < annonces.length; index++) {
            const annonce = annonces[index];
            const login = await this.loginRepo.findById(this.utilService.getObjectIdString(annonce.codeUser));
            let name = annonce.annonceUser === 'Particulier' ? login.name : annonce.companyName;
            let url = AnnonceController.BASE_URL + '/' + login.getObjectId() + '/' + annonce.getObjectId() + '.json';
            let photos = {}
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

            }
            annoncesInfos.push(annonceFormat);
        }
        return annoncesInfos;
    }

    /**
     *
     * Construction des criteres
     * @param filters
     */
    private getEnableCriteres(filters: any) {
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
                criteres['subCategory'] = {$in: filters.subCategories};
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
    public async getAnnonceByUsers(limit: number, skip: number, codeUser?: string) {

        // Construction des criteres
        let annoncesInfos = [];
        let annonces = await this.repository.find(
            {
                where: {codeUser: this.utilService.getObjectId(codeUser)},
                order: {
                    datePublication: "DESC"
                },
                skip: skip,
                take: limit
            }
        );
        for (let index = 0; index < annonces.length; index++) {
            const annonce = annonces[index];
            const login = await this.loginRepo.findById(this.utilService.getObjectIdString(annonce.codeUser));
            let name = annonce.annonceUser === 'Particulier' ? login.name : annonce.companyName;
            let url = AnnonceController.BASE_URL + '/' + login.getObjectId() + '/' + annonce.getObjectId() + '.json';
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
    }

    /***
     * Modification d'une annonce
     * @param id
     * @param annonce
     */
    public async update(id: string, annonce: Annonce) {
        let annonceUpdated = await this.repository.findOne(id);

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
        return await this.repository.save(annonceUpdated);
    }

    /**
     * Suppression d'une annonce
     * @param id
     */
    public async delete(id: string) {
        let annonceDeleted = await this.repository.findOne(id);
        return await this.repository.remove(annonceDeleted);
    }

    public async updateAnnonce(annonce: any, id: string) {
        let annonceUpdated =  await this.repository.findOne(id);
        // ANNONCE
        annonceUpdated.country = annonce.countryName;
        annonceUpdated.city = annonce.city;
        annonceUpdated.details = annonce.details;

        annonceUpdated.nameProduct = annonce.nameProduct;
        annonceUpdated.description = annonce.description;
        annonceUpdated.stateProduct =  annonce.stateProduct;
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
        annonceUpdated.price =  annonce.price;
        annonceUpdated.currency =  annonce.currency;
        annonceUpdated.annonceUser =  annonce.annonceUser;
        annonceUpdated.companyName =  annonce.companyName;
        annonceUpdated.dateUpdate = new Date();

        annonceUpdated.category = annonce.category;
        annonceUpdated.subCategory = annonce.subCategory;
        return await this.repository.save(annonceUpdated);
    }
}
