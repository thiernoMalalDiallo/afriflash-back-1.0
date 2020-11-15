import {Column, Entity, ObjectIdColumn} from "typeorm";
import { ObjectID } from 'mongodb'


/**
 * Model de données annonce
 */
@Entity()
export class Annonce {

    /**
     * Id de l'annonce
     */
    @ObjectIdColumn()
    public objectId: string;

    /**
     * titre de l'annonce
     */
    @Column()
    public title: string;

    /**
     * Description du category
     */
    @Column()
    public description: string;


    /**
     * Date de publication
     */
    @Column()
    public datePublication = new Date();

    /**
     * Date de modification
     */
    @Column()
    public dateUpdate: Date;

    /**
     * telephone pour contacter
     */
    @Column()
    public telepone: string;
    /**
     * mail
     */
    @Column()
    public mail: string;

    /**
     * nom de l'entreprise
     */
    @Column()
    public companyName: string;

    /**
     * Annonceur (pro, particulier)
     */
    @Column()
    public annonceUser: string;


    /**
     * status du produit (en stock; location)
     */
    @Column()
    public price: number;

    /**
     * Devise (FGN? EURO, DOLLARS? ...)
     */
    @Column()
    public currency: string;
    /**
     * type d'annonce (location, vente)
     */
    @Column()
    public annonceType: string;

    /**
     * Photos de l'annonce
     */
    @Column()
    public photos: any[];

    /**
     * Chemin dossier Photos de l'annonce
     */
    @Column()
    public urlPhotos: string;

    /**
     * Afficher le téléphone ou non
     */
    @Column()
    public displayTelephone: boolean = true;

    /**
     * Code de l'utilisateur
     */
    @Column()
    public codeUser: ObjectID;

    /**
     * category de l'utilisateur
     */
    @Column()
    public codeCategory: ObjectID;

    /**
     * Catégorie
     */
    @Column()
    public category: string;

    /**
     * Sous catégorie
     */
    @Column()
    public subCategory: string;

    /**
     * category de l'utilisateur
     */
    @Column()
    public codeProduct: ObjectID;

    /**
     * category de l'utilisateur
     */
    @Column()
    public codelocation: ObjectID;

    // =============================== LOCATION ====================================
    
    /**
     * Pays
     */
    @Column()
    public country: string;

    /**
     * Ville
     */
    @Column()
    public city: string;
    
    /**
     * Details
     */
    @Column()
    public details: string;
    
    // ================================= PRODUCT ===================================
    
    /**
     * marque si voiture
     * nom du produit si autre
     * nom du service si service
     */
    @Column()
    public nameProduct: string;

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
    @Column()
    public dateProduct: Date;


//*************************Setter and getter************************************//

    public setObjectId(value: string){
        this.objectId = value;
    }

    public getObjectId(): string {
       return  this.objectId;
    }

}

