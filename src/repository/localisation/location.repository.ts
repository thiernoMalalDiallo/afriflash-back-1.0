import {ExRepository, Inject, Repository} from "express-dependency-injection";
import { GenericRepository } from "../generic.repository";
import * as typeorm from "typeorm";
import {LocationModel} from "../../models/localisation/location.model";
/**
 * Reoisitory du modèle de données annonce
 */
@ExRepository()
export class LocationRepository extends Repository(GenericRepository)
{
    /**
     * Injection de repository pour le model localisation
     */
    private repository: typeorm.Repository<LocationModel>;
    /**
     * Injection de service de connexion
     */
    protected connection: typeorm.Connection;

    /**
     * @constructor
     */
    constructor() {
        super();
        this.repository = super.getConnection().getRepository(LocationModel);
    }

    /**
     * Enregistrement d'une localisation
     * @param location
     */
    public async save(location: LocationModel){
        return await this.repository.save(location);
    }

    /**
     * Retourn une localisation à partir de son ID
     * @param id
     */
    public async findById(id: string){
        return await this.repository.findOne(id);
    }

    /**
     * 
     * Retourne la liste de tous les localisations
     */
    public async getAll(){
       return  await this.repository.find();
    }

    /***
     * Modification d'une localisation
     * @param id
     * @param location
     */
    public async update(id: string, location: LocationModel){
        let locationUpdated = await this.repository.findOne(id);

        locationUpdated.countryName= location.countryName;
        locationUpdated.city = location.city;
        locationUpdated.zipCode = location.zipCode;
        locationUpdated.details = location.details;
       // locationUpdated.cordonnes = location.cordonnes;
        return await this.repository.save(locationUpdated);
    }

    /**
     * Suppression d'une localisation
     * @param id
     */
    public async delete(id: string){
        let locationDeleted= await this.repository.findOne(id);
        return await this.repository.remove(locationDeleted);
    }
}
