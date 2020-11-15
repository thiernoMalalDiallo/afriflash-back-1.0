"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const env = process.env.AFRICLEAN_ENV;
let value;
if (env === 'prod') {
    value = require('./config.prod');
}
else {
    value = require('./config.dev');
}
exports.config = value;
//# sourceMappingURL=config.js.map