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
const user_model_1 = require("../../models/users/user.model");
const utils_service_1 = require("../../services/utils/utils.service");
/**
 * Reoisitory du modèle de données Users
 */
let UserRepository = class UserRepository extends express_dependency_injection_1.Repository(generic_repository_1.GenericRepository) {
    /**
     * @constructor
     */
    constructor() {
        super();
        this.repository = super.getConnection().getRepository(user_model_1.User);
    }
    /**
     * Enregistrement d'un utilisateur
     * @param user
     */
    save(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.save(user);
        });
    }
    /**
     * Retourn un utilisateur à partir de son ID
     * @param id
     */
    findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.findOne(id);
        });
    }
    /**
     *
     * Retourne la liste de tous les utilisateurs
     */
    getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.repository.find();
        });
    }
    /***
     * Modification d'une localisation
     * @param id
     * @param user
     */
    update(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            let userUpdated = yield this.repository.findOne(id);
            /*  userUpdated.firstName= user.firstName;
              userUpdated.lastName = user.lastName;
      
              userUpdated.dateOfBirth = user.dateOfBirth;
              userUpdated.cityOfBirth = user.cityOfBirth;
              userUpdated.genderOfUser = user.genderOfUser;*/
            //   userUpdated.pseudo = user.pseudo;
            userUpdated.email = user.email;
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
            return yield this.repository.save(userUpdated);
        });
    }
    /**
     * Suppression d'un utilisateur
     * @param id
     */
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            let userDeleted = yield this.repository.findOne(id);
            return yield this.repository.remove(userDeleted);
        });
    }
    /**
     * Retourn l'utilisateur en fonction de son pseudo
     * @param pseudo
     * @param password
     */
    findUserByLogin(pseudo, password) {
        return __awaiter(this, void 0, void 0, function* () {
            //let cryptoHas = require('crypto');
            const passhashed = user_model_1.User.hashPassword(password); //cryptoHas.createHash('sha256').update(password ).digest('base64');
            return yield this.repository.find({
                pseudo: pseudo,
                password: passhashed
            });
        });
    }
    /**
     * Retourn l'utilisateur en fonction de son idLogin
     * @param idLogin
     */
    findByIdLogin(idLogin) {
        return __awaiter(this, void 0, void 0, function* () {
            //let cryptoHas = require('crypto');
            let id = this.utilsService.getObjectId(idLogin);
            console.log(id);
            let users = yield this.repository.find({
                loginId: id
            });
            console.log(users);
            return users;
        });
    }
};
__decorate([
    express_dependency_injection_1.Inject(utils_service_1.UtilsService),
    __metadata("design:type", utils_service_1.UtilsService)
], UserRepository.prototype, "utilsService", void 0);
__decorate([
    express_dependency_injection_1.Inject(utils_service_1.UtilsService),
    __metadata("design:type", utils_service_1.UtilsService)
], UserRepository.prototype, "utilService", void 0);
UserRepository = __decorate([
    express_dependency_injection_1.ExRepository(),
    __metadata("design:paramtypes", [])
], UserRepository);
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map