import {ExRepository, Inject, Repository} from "express-dependency-injection";
import { GenericRepository } from "../generic.repository";
import * as typeorm from "typeorm";
import {User} from "../../models/users/user.model";
import { UtilsService } from "../../services/utils/utils.service";
/**
 * Reoisitory du modèle de données Users
 */
@ExRepository()
export class UserRepository extends Repository(GenericRepository)
{
    /**
     * Injection de repository pour le model Users
     */
    private repository: typeorm.Repository<User>;
    /**
     * Injection de service de connexion
     */
    public connection: typeorm.Connection;

    @Inject(UtilsService)
    public readonly utilsService: UtilsService;

    @Inject(UtilsService)
    public readonly utilService: UtilsService;
    
    /**
     * @constructor
     */
    constructor() {
        super();
        this.repository = super.getConnection().getRepository(User);
    }

    /**
     * Enregistrement d'un utilisateur
     * @param user
     */
    public async save(user: User){
        return await this.repository.save(user);
    }

    /**
     * Retourn un utilisateur à partir de son ID
     * @param id
     */
    public async findById(id: string){
        return await this.repository.findOne(id);
    }

    /**
     *
     * Retourne la liste de tous les utilisateurs
     */
    public async getAll(){
       return  await this.repository.find();
    }

    /***
     * Modification d'une localisation
     * @param id
     * @param user
     */
    public async update(id: string, user: User){
        let userUpdated = await this.repository.findOne(id);

      /*  userUpdated.firstName= user.firstName;
        userUpdated.lastName = user.lastName;

        userUpdated.dateOfBirth = user.dateOfBirth;
        userUpdated.cityOfBirth = user.cityOfBirth;
        userUpdated.genderOfUser = user.genderOfUser;*/
     //   userUpdated.pseudo = user.pseudo;

        userUpdated.email= user.email;
        userUpdated.phoneNumber = user.phoneNumber;
      /*  userUpdated.phoneFixedNumber = user.phoneFixedNumber;
        userUpdated.zipCode = user.zipCode;
        userUpdated.adress= user.adress;

        userUpdated.typeOfUser = user.typeOfUser;
        userUpdated.banqueCode = user.banqueCode;
        userUpdated.userJob = user.userJob;

        userUpdated.dateOfCreation= user.dateOfCreation;
        userUpdated.dateOfDeleted = user.dateOfDeleted;*/

        userUpdated.dateOfUpdate = new Date();

        return await this.repository.save(userUpdated);
    }

    /**
     * Suppression d'un utilisateur
     * @param id
     */
    public async delete(id: string){
        let userDeleted= await this.repository.findOne(id);
        return await this.repository.remove(userDeleted);
    }

    /**
     * Retourn l'utilisateur en fonction de son pseudo
     * @param pseudo
     * @param password
     */
    public async findUserByLogin(pseudo: string, password:string){
        //let cryptoHas = require('crypto');
        const passhashed = User.hashPassword(password);//cryptoHas.createHash('sha256').update(password ).digest('base64');
        return await this.repository.find({
            pseudo: pseudo,
            password: passhashed
        });
    }

    /**
     * Retourn l'utilisateur en fonction de son idLogin
     * @param idLogin
     */
    public async findByIdLogin(idLogin: string){
        //let cryptoHas = require('crypto');
        let id = this.utilsService.getObjectId(idLogin);
        console.log(id)
     let users= await this.repository.find({
            loginId: id
        });
        console.log(users);
        return users;

    }
}
