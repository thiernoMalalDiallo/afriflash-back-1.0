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
 * Model de données annonce
 */
let Annonce = class Annonce {
    /**
     * Model de données annonce
     */
    constructor() {
        /**
         * Date de publication
         */
        this.datePublication = new Date();
        /**
         * Afficher le téléphone ou non
         */
        this.displayTelephone = true;
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
], Annonce.prototype, "objectId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Annonce.prototype, "title", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Annonce.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Object)
], Annonce.prototype, "datePublication", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Annonce.prototype, "dateUpdate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Annonce.prototype, "telepone", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Annonce.prototype, "mail", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Annonce.prototype, "companyName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Annonce.prototype, "annonceUser", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Annonce.prototype, "price", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Annonce.prototype, "currency", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Annonce.prototype, "annonceType", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Array)
], Annonce.prototype, "photos", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Annonce.prototype, "urlPhotos", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Boolean)
], Annonce.prototype, "displayTelephone", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", mongodb_1.ObjectID)
], Annonce.prototype, "codeUser", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", mongodb_1.ObjectID)
], Annonce.prototype, "codeCategory", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Annonce.prototype, "category", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Annonce.prototype, "subCategory", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", mongodb_1.ObjectID)
], Annonce.prototype, "codeProduct", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", mongodb_1.ObjectID)
], Annonce.prototype, "codelocation", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Annonce.prototype, "country", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Annonce.prototype, "city", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Annonce.prototype, "details", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Annonce.prototype, "nameProduct", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Annonce.prototype, "stateProduct", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Annonce.prototype, "statusProduct", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Annonce.prototype, "quantity", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Annonce.prototype, "featureSize", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Annonce.prototype, "featureMeasure", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Annonce.prototype, "nbElement", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Annonce.prototype, "dateProduct", void 0);
Annonce = __decorate([
    typeorm_1.Entity()
], Annonce);
exports.Annonce = Annonce;
//# sourceMappingURL=annonce.model.js.map