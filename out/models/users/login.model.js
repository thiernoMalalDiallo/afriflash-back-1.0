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
const typeorm_1 = require("typeorm");
/**
 * Model de données login
 */
let Login = class Login {
    /**
     * Model de données login
     */
    constructor() {
        /**
         * Date de creation de l'utilisateur
         */
        this.subscriptionDate = new Date();
    }
    //*************************Setter and getter************************************//
    setObjectId(value) {
        this.objectId = value;
    }
    getObjectId() {
        return this.objectId;
    }
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", String)
], Login.prototype, "objectId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Login.prototype, "email", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Login.prototype, "name", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Login.prototype, "image", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Login.prototype, "token", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Login.prototype, "idToken", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Login.prototype, "provider", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Login.prototype, "id", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Object)
], Login.prototype, "subscriptionDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Login.prototype, "updateDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Login.prototype, "password", void 0);
Login = __decorate([
    typeorm_1.Entity()
], Login);
exports.Login = Login;
//# sourceMappingURL=login.model.js.map