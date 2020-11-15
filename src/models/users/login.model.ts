import {Column, Entity, ObjectIdColumn} from "typeorm";
import { ObjectID } from 'mongodb'


/**
 * Model de données login
 */
@Entity()
export class Login {

    /**
     * Id du login
     */
    @ObjectIdColumn()
    private objectId: string;

    /**
     * Login de l'utilisateur
     */
    @Column()
    public email: string;

    /**
     * nom de l'utilisateur
     */
    @Column()
    public name: string;

    /**
     * Code de l'utilisateur
     * provider: string;
     id: string;
     email: string;
     name: string;
     image: string;
     token?: string;
     idToken?: string;
     */
    @Column()
    public image: string;
    /**
     * token de l'utilisateur
     */
    @Column()
    public token: string;

    /**
     * token de l'utilisateur
     */
    @Column()
    public idToken: string;

    /**
     * source de connection
     */
    @Column()
    public provider: string;

    /**
     * id de connection
     */
    @Column()
    public id: string;

    /**
     * Date de creation de l'utilisateur
     */
    @Column()
    public subscriptionDate = new Date();

    /**
     * Date de modification de l'utilisateur
     */
    @Column()
    public updateDate: Date;

    /**
     * Mot de passe de l'utilisateur
     */
    @Column()
    public password: string;

//*************************Setter and getter************************************//

    public setObjectId(value: string){
        this.objectId = value;
    }

    public getObjectId(): string {
       return  this.objectId;
    }
}
