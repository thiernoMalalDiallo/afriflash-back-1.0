'use strict';
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_dependency_injection_1 = require("express-dependency-injection");
/**
 * Permet de gerer les fichiers
 */
let ManagerFileService = class ManagerFileService {
    /**
     * Permet de gerer les fichiers
     */
    constructor() {
        this.fs = require('fs');
    }
    /**
     * Write the data in the directory
     * @param fileUrl location of file
     * @param data data to write
     */
    write(fileUrl, data) {
        let cache = JSON.stringify(data);
        this.fs.writeFileSync(fileUrl, cache);
    }
    /**
     * Read the data
     * @param fileUrl location of file
     */
    read(fileUrl) {
        let rawdata = this.fs.readFileSync(fileUrl);
        let data = JSON.parse(rawdata);
        return data;
    }
    /**
     * Crée un repertoire
     * @param dirpath
     */
    createDirectory(dirpath) {
        try {
            return this.fs.mkdirSync(dirpath);
        }
        catch (err) {
            if (err.code !== 'EEXIST')
                throw err;
        }
    }
    /**
     * Suppression d'un fichier
     * @param dirpath
     */
    removeFile(dirpath) {
        //  return this.fs.rmdirSync(dirpath)
        try {
            this.fs.unlinkSync(dirpath);
            console.log('successfully deleted /tmp/hello');
        }
        catch (err) {
            // handle the error
        }
    }
    /**
     * Read the data
     * @param fileUrl location of file
     */
    readMonth(fileUrl) {
        let rawdata = this.fs.readFileSync(fileUrl);
        return rawdata;
    }
    /**
     * Test the access of file
     * @param fileUrl url file
     */
    access(fileUrl) {
        let bool = true;
        try {
            this.fs.accessSync(fileUrl, this.fs.constants.R_OK |
                this.fs.constants.W_OK);
            // can read/write
        }
        catch (err) {
            // no access
            return false;
        }
        return bool;
    }
};
ManagerFileService = __decorate([
    express_dependency_injection_1.Service()
], ManagerFileService);
exports.ManagerFileService = ManagerFileService;
//# sourceMappingURL=manager-file.service.js.map