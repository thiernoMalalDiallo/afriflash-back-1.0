import {Column, Entity, ManyToOne, ObjectIdColumn, OneToMany} from "typeorm";
import { ObjectID } from 'mongodb'
/**
 * Le modèle de données User
 */
@Entity()
export class User {
    /**
     * Id de l'utilisateur
     */
    @ObjectIdColumn()
    private objectId: string;
    /**
     * Nom de l'utilisateur
     */
    @Column()
    public firstName: string;
    /**
     * Prenom de l'utilisateur
     */
    @Column()
    public lastName: string;

    /**
     * Date de naissance
     */
    @Column()
    public dateOfBirth: Date;

    /**
     * Lieu de naissance
     */
    @Column()
    public cityOfBirth: string;

    /**
     * Pays de naissance
     */
    @Column()
    public countryOfBirth: string;

    /**
     * Telephone portalble de l'utilisateur
     */
    @Column()
    public phoneNumber: string;

    /**
     * Telephone fixe
     */
    @Column()
    public phoneFixedNumber: string;

    /**
     * Adress de l'utilisateur
     */
    @Column()
    public adress: string;

    /**
     * CodePostal l'utilisateur
     */
    @Column()
    public zipCode: string;

    /**
     * Fonction de l'utilisateur
     */
    @Column()
    public userJob: string;

    /**
     * Pseudo de l'utilisateur
     */
    @Column()
    public pseudo: string;

    /**
     * Adresse mail de l'utilisateur
     */
    @Column()
    public email: string;

    /**
     * Mot de passe de l'utilisateur
     */
    @Column()
    public password: string;

    /**
     * Date de creation du compte de l'utilisateur
     */
    @Column()
    public dateOfCreation: Date;

    /***
     * Date de modification de compte de l'utilisateur
     */
    @Column()
    public dateOfUpdate: Date;

    /**
     * Date de suppression de compte de l'utilisateur
     */
    @Column()
    public dateOfDeleted: Date;

    /**
     * Genre de l'utilisateur (masculin ou fiminin)
     */
    @Column()
    public genderOfUser: string;


    /**
     * Compte bancaire de l'utilisateur
     */
    @Column()
    public banqueCode: string;
    /**
     * Type d'utilisateur (pro, particlier)
     */
    @Column()
    public typeOfUser: string;

    /**
     * Identifiant du login
     */
    @Column()
    public loginId: ObjectID;


    //******************Seters et getters***************************/


     public getObjectId(): string {
        return this.objectId;
    }

     public setObjectId(value: string) {
        this.objectId = value;
    }


    //*******************Autres methodes******************///


     public static hashPassword(password: string){
        let cryptoHas = require('crypto');

         // this.password = bcrypt.hashSync(this.password);
       const hash = cryptoHas.createHash('sha256').update(password ).digest('base64');

       return  hash;
    }


}
