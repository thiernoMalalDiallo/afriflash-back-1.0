"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_dependency_injection_1 = require("express-dependency-injection");
const generic_repository_1 = require("../generic.repository");
const login_model_1 = require("../../models/users/login.model");
const user_model_1 = require("../../models/users/user.model");
const utils_service_1 = require("../../services/utils/utils.service");
const user_repository_1 = require("./user.repository");
/**
 * Le repository du model de données Login
 */
let LoginRepository = class LoginRepository extends express_dependency_injection_1.Repository(generic_repository_1.GenericRepository) {
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
        this.repositoryLogin = super.getConnection().getRepository(login_model_1.Login);
    }
    /**
     * Connexion à la base de données
     */
    connectDatabase() {
        const _super = Object.create(null, {
            connect: { get: () => super.connect }
        });
        return __awaiter(this, void 0, void 0, function* () {
            this.connection = yield _super.connect.call(this);
            this.repositoryLogin = this.connection.getRepository(login_model_1.Login);
        });
    }
    /**
     * Enregistrement d'un login
     * @param login
     */
    save(login) {
        return this.repositoryLogin.save(login);
    }
    /**
     * Retourn un login à partir de son id
     * @param id
     */
    findById(id) {
        return this.repositoryLogin.findOne(id);
    }
    /**
     * Retourn les (le) login d'un utilisateur
     * @param login
     * @param password
     * @param type
     */
    findByLogin(login, password, type) {
        return __awaiter(this, void 0, void 0, function* () {
            let userInfo = null;
            let log = null;
            if (type == 'social') {
                log = yield this.repositoryLogin.find({ where: { email: login } });
            }
            else {
                let hashPassword = user_model_1.User.hashPassword(password);
                log = yield this.repositoryLogin.find({ where: { email: login, password: hashPassword } });
            }
            if (log && log.length !== 0 && log[0].getObjectId()) {
                let user = yield this.repoUser.findByIdLogin(log[0].getObjectId());
                userInfo = {
                    socialUser: log[0],
                    user: user[0]
                };
            }
            return userInfo;
        });
    }
    /**
     * Retourn les (le) login d'un utilisateur
     * @param login
     * @param password
     */
    findByLoginPassword(login, password) {
        return __awaiter(this, void 0, void 0, function* () {
            let userInfo = null;
            let hashPassword = user_model_1.User.hashPassword(password);
            let log = yield this.repositoryLogin.find({ where: { email: login, password: hashPassword } });
            if (log && log.length !== 0 && log[0].getObjectId()) {
                let user = yield this.repoUser.findByIdLogin(log[0].getObjectId());
                userInfo = {
                    socialUser: log[0],
                    user: user[0]
                };
            }
            return userInfo;
        });
    }
    /**
     * Modification d'un login à partir de son id
     * @param id
     * @param login
     */
    update(id, login) {
        return __awaiter(this, void 0, void 0, function* () {
            let loginUpdated = yield this.repositoryLogin.findOne(id);
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
        });
    }
    /**
     * Suppression d'un login
     * @param id
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let loginUser = yield this.repositoryLogin.findOne(id);
            return this.repositoryLogin.remove(loginUser);
        });
    }
    /**
     * Retourn la liste de tous les login
     */
    getAll() {
        return this.repositoryLogin.find();
    }
    /**
     * Fermeture de la connexion au service de la db.
     */
    closeDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.connection.close();
        });
    }
    /**
     * Modification du mot de pass
     * @param idLogin
     */
    updatePassword(idLogin) {
    }
    /**
     * Modification de l'information d'un utilisateur
     * @param body
     */
    updateInformation(body) {
        return __awaiter(this, void 0, void 0, function* () {
            let userCode = this.utilsService.getObjectIdString(body.userId);
            let user = yield this.repoUser.findByIdLogin(body.userId);
            let login = yield this.repositoryLogin.findOne(userCode);
            if (login.provider === 'email') {
                user[0].email = body.email;
            }
            else {
                user[0].phoneNumber = body.email;
            }
            yield this.repoUser.update(user[0].getObjectId(), user[0]);
            login.name = body.name;
            login.email = body.email;
            return this.update(login.getObjectId(), login);
        });
    }
};
__decorate([
    express_dependency_injection_1.Inject(utils_service_1.UtilsService),
    __metadata("design:type", utils_service_1.UtilsService)
], LoginRepository.prototype, "utilsService", void 0);
__decorate([
    express_dependency_injection_1.Inject(user_repository_1.UserRepository),
    __metadata("design:type", user_repository_1.UserRepository)
], LoginRepository.prototype, "repoUser", void 0);
LoginRepository = __decorate([
    express_dependency_injection_1.ExRepository(),
    __metadata("design:paramtypes", [])
], LoginRepository);
exports.LoginRepository = LoginRepository;
//# sourceMappingURL=login.repository.js.map