import {ExRepository, Inject, Repository} from "express-dependency-injection";
import { GenericRepository } from "../generic.repository";
import * as typeorm from "typeorm";
import { Product } from "../../models/Annonce/product.model";

/**
 * Reoisitory du modèle de données produit
 */
@ExRepository()
export class ProductRepository extends Repository(GenericRepository) {
    /**
     * Injection de repository pour le model product
     */
    private repository: typeorm.Repository<Product>;
    /**
     * Injection de service de connexion
     */
    protected connection: typeorm.Connection;

    /**
     * @constructor
     */
    constructor() {
        super();
        this.repository = super.getConnection().getRepository(Product);
    }

    /**
     * Enregistrement d'une product
     * @param product
     */
    public async save(product: Product) {
        return await this.repository.save(product);
    }

    /**
     * Retourn une category à partir de son ID
     * @param id
     */
    public async findById(id: string) {
        return await this.repository.findOne(id);
    }

    /**
     *
     * Retourne la liste de tous les catgories
     */
    public async getAll() {
        return await this.repository.find();
    }

    /***
     * Modification d'un produit
     * @param id
     * @param product
     */
    public async update(id: string, product: Product) {
        let productUpdated = await this.repository.findOne(id);

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

        return await this.repository.save(productUpdated);
    }

    /**
     * Suppression d'un produit
     * @param id
     */
    public async delete(id: string) {
        let productDeleted = await this.repository.findOne(id);
        return await this.repository.remove(productDeleted);
    }
}
