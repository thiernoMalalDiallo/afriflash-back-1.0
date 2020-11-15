import {Entity, Column, ObjectIdColumn} from "typeorm";

/**
 * Le modèle de données location
 */
@Entity()
export class LocationModel {
    /**
     * Identifiant unique du pays
     */
    @ObjectIdColumn()
    private objectId: string;

    /**
     * Nom du Pays
     */
    @Column()
    public countryName: string;

    /**
     * ville de l'adresse
     */
    @Column()
    public city: string;

    /**
     * boite postal
     */
    @Column()
    public zipCode: string;

    /**
     * Cordonnée geographique
     */
    @Column()
    public cordonnes: any;

    /**
     * Plus de précision sur l'adresse
     */
    @Column()
    public details: string;

    /**
     * Date de creation de la localisation
     */
    @Column()
    public creationDate = new Date();

    /**
     * Date de modification de la localisation
     */
    @Column()
    public updateDate: Date;

    //************************ setter and getters *******************//

    public getObjectId(): string {
        return this.objectId;
    }

    public setObjectId(value: string) {
        this.objectId = value;
    }
}
