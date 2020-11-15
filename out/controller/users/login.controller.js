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
Object.defineProperty(exports, "__esModule", { value: true });
const rxjs_1 = require("rxjs");
const express_dependency_injection_1 = require("express-dependency-injection");
const body_parser_middleware_1 = require("../../middlewares/body-parser/body.parser.middleware");
const login_repository_1 = require("../../repository/users/login.repository");
const login_model_1 = require("../../models/users/login.model");
const user_model_1 = require("../../models/users/user.model");
const user_repository_1 = require("../../repository/users/user.repository");
const operators_1 = require("rxjs/operators");
/**
 * Controller lié aux login.
 */
let LoginController = class LoginController extends express_dependency_injection_1.AbstractRouter {
    /**
     * Enregistre un login
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    post(_req, res, args) {
        let newLogin = new login_model_1.Login();
        let user = new user_model_1.User();
        newLogin.provider = args.body.provider;
        newLogin.id = args.body.id;
        newLogin.email = args.body.email;
        newLogin.name = args.body.name;
        newLogin.image = args.body.image;
        newLogin.token = args.body.token;
        newLogin.idToken = args.body.idToken;
        args.body.password ? newLogin.password = user_model_1.User.hashPassword(args.body.password) : '';
        if (args.body.provider === 'google' || args.body.provider === 'email') {
            user.email = args.body.email;
        }
        if (args.body.provider === 'telephone') {
            user.phoneNumber = args.body.email;
        }
        if (args.body.provider === 'facebook') {
        }
        args.body.password ? user.password = user_model_1.User.hashPassword(args.body.password) : '';
        return rxjs_1.from(this.repoLogin.save(newLogin)).pipe(operators_1.mergeMap((login) => {
            user.loginId = this.repoUser.utilService.getObjectId(login.getObjectId());
            return rxjs_1.from(this.repoUser.save(user)).pipe(operators_1.map((user) => {
                return login;
            }));
        })).subscribe(data => data != null ? res.json(data) : null, error => res.status(500).send({ message: 'la requête à été interompu : ' + error }), () => {
            res.end();
            //  this.repoLogin.closeDatabase()
        });
    }
    /**
     * Enregistre un login
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    updateInformation(_req, res, args) {
        return rxjs_1.from(this.repoLogin.updateInformation(args.body)).subscribe(data => data != null ? res.json(data) : null, error => res.status(500).send({ message: 'la requête à été interompu : ' + error }), () => {
            res.end();
            //  this.repoLogin.closeDatabase()
        });
    }
    /**
     * retourner un login
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    get(_req, res, args) {
        return rxjs_1.from(this.repoLogin.findById(args.params.id)).subscribe(data => data != null ? res.json(data) : null, error => {
            res.status(500).send({ message: 'la requête à été interompu : ' + error });
            // this.repoLogin.closeDatabase()
        }, () => {
            res.end();
            //  this.repoLogin.closeDatabase()
        });
    }
    /**
     * retourner un objet user
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    getUserByLogin(_req, res, args) {
        return rxjs_1.from(this.repoLogin.findByLogin(args.body.email, args.body.password, args.body.type)).subscribe(data => data != null ? res.json(data) : null, error => {
            res.status(500).send({ message: 'la requête à été interompu : ' + error });
        }, () => {
            res.end();
            //  this.repoLogin.closeDatabase()
        });
    }
    /**
     * retourner tous les login
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    findAll(_req, res, args) {
        return rxjs_1.from(this.repoLogin.getAll()).subscribe(data => data != null ? res.json(data) : null, error => {
            res.status(500).send({ message: 'la requête à été interompu : ' + error });
            //  this.repoLogin.closeDatabase()
        }, () => {
            res.end();
            //   this.repoLogin.closeDatabase()
        });
    }
    /**
     * supprimer un login
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    delete(_req, res, args) {
        return rxjs_1.from(this.repoLogin.delete(args.params.id)).subscribe(data => data != null ? res.json(data) : null, error => {
            res.status(500).send({ message: 'la requête à été interompu : ' + error });
            //  this.repoLogin.closeDatabase()
        }, () => {
            res.end();
            //  this.repoLogin.closeDatabase()
        });
    }
};
__decorate([
    express_dependency_injection_1.Inject(login_repository_1.LoginRepository),
    __metadata("design:type", login_repository_1.LoginRepository)
], LoginController.prototype, "repoLogin", void 0);
__decorate([
    express_dependency_injection_1.Inject(user_repository_1.UserRepository),
    __metadata("design:type", user_repository_1.UserRepository)
], LoginController.prototype, "repoUser", void 0);
__decorate([
    express_dependency_injection_1.ExRoute({
        path: "/save",
        verb: express_dependency_injection_1.HttpVerbs.POST,
        middlewares: [
            body_parser_middleware_1.BodyParserMiddleware
        ]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", rxjs_1.Subscription)
], LoginController.prototype, "post", null);
__decorate([
    express_dependency_injection_1.ExRoute({
        path: "/update-informations",
        verb: express_dependency_injection_1.HttpVerbs.POST,
        middlewares: [
            body_parser_middleware_1.BodyParserMiddleware
        ]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", rxjs_1.Subscription)
], LoginController.prototype, "updateInformation", null);
__decorate([
    express_dependency_injection_1.ExRoute({
        path: "/:id",
        verb: express_dependency_injection_1.HttpVerbs.GET
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", rxjs_1.Subscription)
], LoginController.prototype, "get", null);
__decorate([
    express_dependency_injection_1.ExRoute({
        path: "/user/",
        verb: express_dependency_injection_1.HttpVerbs.POST,
        middlewares: [
            body_parser_middleware_1.BodyParserMiddleware
        ]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", rxjs_1.Subscription)
], LoginController.prototype, "getUserByLogin", null);
__decorate([
    express_dependency_injection_1.ExRoute({
        path: "/",
        verb: express_dependency_injection_1.HttpVerbs.GET
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", rxjs_1.Subscription)
], LoginController.prototype, "findAll", null);
__decorate([
    express_dependency_injection_1.ExRoute({
        path: "/delete/:id",
        verb: express_dependency_injection_1.HttpVerbs.DELETE
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", rxjs_1.Subscription)
], LoginController.prototype, "delete", null);
LoginController = __decorate([
    express_dependency_injection_1.ExRouter({
        path: "/login"
    })
], LoginController);
exports.LoginController = LoginController;
//# sourceMappingURL=login.controller.js.map