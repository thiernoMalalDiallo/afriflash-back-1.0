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
 * Le modèle de données location
 */
let LocationModel = class LocationModel {
    /**
     * Le modèle de données location
     */
    constructor() {
        /**
         * Date de creation de la localisation
         */
        this.creationDate = new Date();
    }
    //************************ setter and getters *******************//
    getObjectId() {
        return this.objectId;
    }
    setObjectId(value) {
        this.objectId = value;
    }
};
__decorate([
    typeorm_1.ObjectIdColumn(),
    __metadata("design:type", String)
], LocationModel.prototype, "objectId", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], LocationModel.prototype, "countryName", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], LocationModel.prototype, "city", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], LocationModel.prototype, "zipCode", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Object)
], LocationModel.prototype, "cordonnes", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", String)
], LocationModel.prototype, "details", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Object)
], LocationModel.prototype, "creationDate", void 0);
__decorate([
    typeorm_1.Column(),
    __metadata("design:type", Date)
], LocationModel.prototype, "updateDate", void 0);
LocationModel = __decorate([
    typeorm_1.Entity()
], LocationModel);
exports.LocationModel = LocationModel;
//# sourceMappingURL=location.model.js.map