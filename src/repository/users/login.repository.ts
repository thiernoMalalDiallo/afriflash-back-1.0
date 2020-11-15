import {ExRepository, Repository, Inject} from "express-dependency-injection";
import {GenericRepository} from "../generic.repository";
import * as typeorm from "typeorm";
import {Login} from "../../models/users/login.model";
import {User} from "../../models/users/user.model";
import {UtilsService} from "../../services/utils/utils.service";
import {UserRepository} from "./user.repository";

/**
 * Le repository du model de données Login
 */
@ExRepository()
export class LoginRepository extends Repository(GenericRepository) {
    /**
     * Injection de repository pour le login
     */
    private repositoryLogin: typeorm.Repository<Login>;

    @Inject(UtilsService)
    public readonly utilsService: UtilsService;

    @Inject(UserRepository)
    public repoUser: UserRepository;


    // private repositoryClient: typeorm.Repository<Client>;
    // private repositoryAdmin: typeorm.Repository<Administrator>;
    // private repositoryManager: typeorm.Repository<Manager>;
    // private repositoryIntervenant: typeorm.Repository<Intervenant>;
    // private repositoryCommercial: typeorm.Repository<Commercial>;
    /**
     * @constructor
     */
    constructor() {
        super();
        this.repositoryLogin = super.getConnection().getRepository(Login);
    }


    /**
     * Injection de la connexion au service
     */
    protected connection: typeorm.Connection;

    /**
     * Connexion à la base de données
     */
    public async connectDatabase() {
        this.connection = await super.connect();
        this.repositoryLogin = this.connection.getRepository(Login);
    }

    /**
     * Enregistrement d'un login
     * @param login
     */
    public save(login: Login) {
        return this.repositoryLogin.save(login);
    }

    /**
     * Retourn un login à partir de son id
     * @param id
     */
    public findById(id: string) {
        return this.repositoryLogin.findOne(id);
    }

    /**
     * Retourn les (le) login d'un utilisateur
     * @param login
     * @param password
     * @param type
     */
    public async findByLogin(login: string, password: string, type: string) {
        let userInfo = null;
        let log = null;
        if (type == 'social') {
            log = await this.repositoryLogin.find({where: {email: login}});
        } else {
            let hashPassword = User.hashPassword(password);
            log = await this.repositoryLogin.find({where: {email: login, password: hashPassword}});
        }

        if (log && log.length !== 0 && log[0].getObjectId()) {
            let user = await this.repoUser.findByIdLogin(log[0].getObjectId());
            userInfo = {
                socialUser: log[0],
                user: user[0]
            };
        }
        return userInfo;
    }

    /**
     * Retourn les (le) login d'un utilisateur
     * @param login
     * @param password
     */
    public async findByLoginPassword(login: string, password: string) {
        let userInfo = null;
        let hashPassword = User.hashPassword(password);
        let log = await this.repositoryLogin.find({where: {email: login, password: hashPassword}});
        if (log && log.length !== 0 && log[0].getObjectId()) {
            let user = await this.repoUser.findByIdLogin(log[0].getObjectId());
            userInfo = {
                socialUser: log[0],
                user: user[0]
            };
        }
        return userInfo;
    }

    /**
     * Modification d'un login à partir de son id
     * @param id
     * @param login
     */
    public async update(id: string, login: Login) {

        let loginUpdated = await this.repositoryLogin.findOne(id);

        loginUpdated.name = login.name;
        loginUpdated.email = login.email;
        loginUpdated.password = login.password;
        loginUpdated.image = login.image;
        loginUpdated.provider = login.provider;
        loginUpdated.id = login.id;
        loginUpdated.token = login.token;
        loginUpdated.updateDate = new Date();
        loginUpdated.idToken = login.idToken;

        return this.repositoryLogin.save(loginUpdated);
    }

    /**
     * Suppression d'un login
     * @param id
     */
    public async delete(id: string) {
        let loginUser = await this.repositoryLogin.findOne(id);
        return this.repositoryLogin.remove(loginUser);
    }

    /**
     * Retourn la liste de tous les login
     */
    public getAll() {
        return this.repositoryLogin.find();
    }

    /**
     * Fermeture de la connexion au service de la db.
     */
    public async closeDatabase() {
        await this.connection.close();
    }

    /**
     * Modification du mot de pass
     * @param idLogin
     */
    public updatePassword(idLogin: string) {

    }

    /**
     * Modification de l'information d'un utilisateur
     * @param body
     */
    public async updateInformation(body: { userId: string; password: string; name: string; email: string }) {
       let userCode = this.utilsService.getObjectIdString(body.userId);
        let user = await this.repoUser.findByIdLogin(body.userId);
        let login = await this.repositoryLogin.findOne(userCode);
       if (login.provider === 'email') {
            user[0].email = body.email;
        } else {
           user[0].phoneNumber = body.email;
        }
        await this.repoUser.update(user[0].getObjectId(), user[0]);

        login.name = body.name;
        login.email = body.email;
        return this.update(login.getObjectId(), login);

    }
}
