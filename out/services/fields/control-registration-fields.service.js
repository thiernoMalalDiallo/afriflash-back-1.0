"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const control_fields_1 = require("./control-fields");
const express_dependency_injection_1 = require("express-dependency-injection");
const rxjs_1 = require("rxjs");
let ControlRegistrationFields = class ControlRegistrationFields extends control_fields_1.ControlFields {
    controlRegistration(form) {
        let ok = true;
        if (form.email) {
            ok = this.isEmpty(form.firstName) && !this.isEmpty(form.lastName) &&
                !this.isEmpty(form.gender) && !this.controlEmail(form.email) &&
                !this.controlPassword(form.password) && this.controlPhoneNumber(form.phoneNumber);
        }
        else {
            ok = !this.isEmpty(form.firstName) && !this.isEmpty(form.lastName) &&
                !this.isEmpty(form.gender) && this.controlPassword(form.password) &&
                this.controlPhoneNumber(form.phoneNumber);
        }
        return ok;
    }
    getErroMessge(message, res) {
        return rxjs_1.of({ errorMessage: message }).subscribe((data) => data != null ? res.json(data) : null, error => res.status(500).send({ message: 'la requête à été interompu : ' + error }), () => { res.end(); });
    }
};
ControlRegistrationFields = __decorate([
    express_dependency_injection_1.Service()
], ControlRegistrationFields);
exports.ControlRegistrationFields = ControlRegistrationFields;
//# sourceMappingURL=control-registration-fields.service.js.map