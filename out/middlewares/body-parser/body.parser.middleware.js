"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const bodyParser = require("body-parser");
const express_dependency_injection_1 = require("express-dependency-injection");
/**
 * Implementation for the body-parser node express middleware
 */
let BodyParserMiddleware = class BodyParserMiddleware extends express_dependency_injection_1.AbstractMiddleware {
    handle() {
        return bodyParser.json({ limit: '50mb' });
    }
    run(_req, _res) {
        // throw new InvalidFunctionCallException('this function is not implemented for this middleware');
    }
};
BodyParserMiddleware = __decorate([
    express_dependency_injection_1.ExMiddleware()
], BodyParserMiddleware);
exports.BodyParserMiddleware = BodyParserMiddleware;
//# sourceMappingURL=body.parser.middleware.js.map