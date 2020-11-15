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
 * Model de données produit
 */
let Product = class Product {
    /**
     * Model de données produit
     */
    constructor() {
        /**
         * Date de creation du produit
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
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", String)
], Product.prototype, "objectId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "nameProduct", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "stateProduct", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "statusProduct", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Product.prototype, "quantity", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Number)
], Product.prototype, "featureSize", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "featureMeasure", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], Product.prototype, "nbElement", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Object)
], Product.prototype, "creationDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], Product.prototype, "updateDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", mongodb_1.ObjectID)
], Product.prototype, "categoryId", void 0);
Product = __decorate([
    typeorm_1.Entity()
], Product);
exports.Product = Product;
//# sourceMappingURL=product.model.js.map