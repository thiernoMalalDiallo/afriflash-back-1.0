import {Column, Entity, ObjectIdColumn} from "typeorm";
import { ObjectID } from 'mongodb'


/**
 * Model de données category
 */
@Entity()
export class Category {

    /**
     * Id du category
     */
    @ObjectIdColumn()
    private objectId: string;

    /**
     * nom du category
     */
    @Column()
    public nameCategory: string;

    /**
     * Description du category
     */
    @Column()
    public description: string;

    /**
     * Code de l'utilisateur
     */
    @Column()
    public codeUser: ObjectID;

    /**
     * Date de creation de la categorie
     */
    @Column()
    public creationDate = new Date();

    /**
     * Date de modification de la catégorie
     */
    @Column()
    public updateDate: Date;

//*************************Setter and getter************************************//

    public setObjectId(value: string){
        this.objectId = value;
    }

    public getObjectId(): string {
       return  this.objectId;
    }

    public getNameCategory(){
        return this.nameCategory;
    }
    public setNameCategory(value: string){
       this.nameCategory =value;
    }

    public getDescrion(){
        return this.description;
    }
    public setDescrion(value: string){
        this.description =value;
    }

    public setUser(codeUser: ObjectID){
        this.codeUser = codeUser;
    }
    public getcodeUser(): ObjectID{
        return this.codeUser;
    }


}
