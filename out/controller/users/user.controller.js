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
const express_dependency_injection_1 = require("express-dependency-injection");
const user_repository_1 = require("../../repository/users/user.repository");
const rxjs_1 = require("rxjs");
const body_parser_middleware_1 = require("../../middlewares/body-parser/body.parser.middleware");
const user_model_1 = require("../../models/users/user.model");
/**
 * Controller principal des utilisateurs - toutes les requêtes qui concerne les utilisateurs passeront par la.
 */
let UserController = class UserController extends express_dependency_injection_1.AbstractRouter {
    /**
     * Retourne tous les utilisateurs
     * @param _req Request
     * @param res Response
     * @param args Arguments
     */
    findAll(_req, res, args) {
        return rxjs_1.from(this.repoUser.getAll()).subscribe((data) => data != null ? res.json(data) : null, error => res.status(500).send({ message: 'la requête à été interompu : ' + error }), () => res.end());
    }
    /**
     * Enregistrement d'un utilisateur
     * @param _req
     * @param res
     * @param args
     */
    post(_req, res, args) {
        let newUser = new user_model_1.User();
        console.log(args);
        newUser.pseudo = args.body.pseudo;
        newUser.password = user_model_1.User.hashPassword(args.body.password);
        newUser.firstName = args.body.firstName;
        newUser.dateOfCreation = new Date();
        return rxjs_1.from(this.repoUser.save(newUser)).subscribe((data) => data != null ? res.json(data) : null, error => res.status(500).send({ message: 'la requête à été interompu : ' + error }), () => res.end());
    }
    /**
     * Connection a l'application
     * @param _req
     * @param res
     * @param args
     */
    authentication(_req, res, args) {
        return rxjs_1.from(this.repoUser.findUserByLogin(args.body.pseudo, args.body.password)).subscribe((data) => data != null ? res.json(data) : null, error => res.status(500).send({ message: 'la requête à été interompu : ' + error }), () => res.end());
    }
};
__decorate([
    express_dependency_injection_1.Inject(user_repository_1.UserRepository),
    __metadata("design:type", user_repository_1.UserRepository)
], UserController.prototype, "repoUser", void 0);
__decorate([
    express_dependency_injection_1.ExRoute({
        path: "/",
        verb: express_dependency_injection_1.HttpVerbs.GET
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", rxjs_1.Subscription)
], UserController.prototype, "findAll", null);
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
], UserController.prototype, "post", null);
__decorate([
    express_dependency_injection_1.ExRoute({
        path: "/login",
        verb: express_dependency_injection_1.HttpVerbs.POST,
        middlewares: [
            body_parser_middleware_1.BodyParserMiddleware
        ]
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object, Object]),
    __metadata("design:returntype", rxjs_1.Subscription)
], UserController.prototype, "authentication", null);
UserController = __decorate([
    express_dependency_injection_1.ExRouter({
        path: "/user"
    })
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map