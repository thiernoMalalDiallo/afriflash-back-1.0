import {Column, Entity, ObjectIdColumn} from "typeorm";
import { ObjectID } from 'mongodb'


/**
 * Model de données produit
 */
@Entity()
export class Product {

    /**
     * Id du produit
     */
    @ObjectIdColumn()
    private objectId: string;

    /**
     * marque si voiture
     * nom du produit si autre
     * nom du service si service
     */
    @Column()
    public nameProduct: string;

    /**
     * Description du produit
     */
    @Column()
    public description: string;

    /**
     * Etat du produit (bon etat; neuf, occasion)
     */
    @Column()
    public stateProduct: string;

    /**
     * Status du produit
     * - disponible si produit
     * - deplacement (oui ou non ) si service
     * -
     */
    @Column()
    public statusProduct: string;


    /**
     * Quantité du produit
     */
    @Column()
    public quantity: number;

    /**
     * Grandeur caracteristique du produit
     * - Kilometrage si vehicule
     * - surface si imobilier
     * - poid si produit
     * -----------------------
     */
    @Column()
    public featureSize: number;

    /**
     * Mesure du grandeur caracteritique (Km, m2, kg, ha, l, ...)
     */
    @Column()
    public featureMeasure: string;

    /**
     * - nombre de piece si imobilier
     * - nombre de roue si vehicule
     * - nombre de varité si produit.
     */
    @Column()
    public nbElement: string;

    /***
     * Date du produit
     * - si vehicule année de mise en circulation
     * si imobilier date de construction
     * si produit date de fabrication
     * si service date de début de prestation
     */
    public dateProduct: Date;

    /**
     * Date de creation du produit
     */
    @Column()
    public creationDate = new Date();

    /**
     * Date de modification du produit
     */
    @Column()
    public updateDate: Date;

 //***********************************Clé etranger******************************//
    /**
     * Code de category
     */
    @Column()
    public categoryId: ObjectID;



//*************************Setter and getter************************************//

    public setObjectId(value: string){
        this.objectId = value;
    }

    public getObjectId(): string {
       return  this.objectId;
    }


}
