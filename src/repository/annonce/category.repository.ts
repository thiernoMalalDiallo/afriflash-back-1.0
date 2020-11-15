import {ExRepository, Inject, Repository} from "express-dependency-injection";
import { GenericRepository } from "../generic.repository";
import * as typeorm from "typeorm";
import { Category } from "../../models/Annonce/category.model";

/**
 * Reoisitory du modèle de données category
 */
@ExRepository()
export class CategoryRepository extends Repository(GenericRepository) {
    /**
     * Injection de repository pour le model category
     */
    private repository: typeorm.Repository<Category>;
    /**
     * Injection de service de connexion
     */
    protected connection: typeorm.Connection;

    /**
     * @constructor
     */
    constructor() {
        super();
        this.repository = super.getConnection().getRepository(Category);
    }

    /**
     * Enregistrement d'une category
     * @param category
     */
    public async save(category: Category) {
        return await this.repository.save(category);
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
     * Modification d'une category
     * @param id
     * @param category
     */
    public async update(id: string, category: Category) {
        let categoryUpdated = await this.repository.findOne(id);

        categoryUpdated.nameCategory = category.nameCategory;
        categoryUpdated.description = category.description;

        return await this.repository.save(categoryUpdated);
    }

    /**
     * Suppression d'une category
     * @param id
     */
    public async delete(id: string) {
        let categoryDeleted = await this.repository.findOne(id);
        return await this.repository.remove(categoryDeleted);
    }
}
