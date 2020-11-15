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
const mongodb_1 = require("mongodb");
/**
 * Model de données category
 */
let Category = class Category {
    /**
     * Model de données category
     */
    constructor() {
        /**
         * Date de creation de la categorie
         */
        this.creationDate = new Date();
    }
    //*************************Setter and getter************************************//
    setObjectId(value) {
        this.objectId = value;
    }
    getObjectId() {
        return this.objectId;
    }
    getNameCategory() {
        return this.nameCategory;
    }
    setNameCategory(value) {
        this.nameCategory = value;
    }
    getDescrion() {
        return this.description;
    }
    setDescrion(value) {
        this.description = value;
    }
    setUser(codeUser) {
        this.codeUser = codeUser;
    }
    getcodeUser() {
        return this.codeUser;
    }
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", String)
], Category.prototype, "objectId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Category.prototype, "nameCategory", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Category.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", mongodb_1.ObjectID)
], Category.prototype, "codeUser", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Object)
], Category.prototype, "creationDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Category.prototype, "updateDate", void 0);
Category = __decorate([
    typeorm_1.Entity()
], Category);
exports.Category = Category;
//# sourceMappingURL=category.model.js.map