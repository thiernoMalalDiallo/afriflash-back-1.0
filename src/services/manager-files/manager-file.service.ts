'use strict';

import { Service } from "express-dependency-injection";

/**
 * Permet de gerer les fichiers
 */
@Service()
 export class ManagerFileService{

    private fs =  require('fs');

    /**
     * Write the data in the directory
     * @param fileUrl location of file
     * @param data data to write
     */
    public write(fileUrl: string, data: {}){
        let cache = JSON.stringify(data);
        this.fs.writeFileSync(fileUrl, cache);
    }

    /**
     * Read the data
     * @param fileUrl location of file
     */
    public read(fileUrl: string){
        let rawdata = this.fs.readFileSync(fileUrl);
        let data = JSON.parse(rawdata);
        return data;
    }

    /**
     * Crée un repertoire
     * @param dirpath
     */
    public createDirectory (dirpath) {
        try {
          return this.fs.mkdirSync(dirpath)
        } catch (err) {
          if (err.code !== 'EEXIST') throw err
        }
    }

    /**
     * Suppression d'un fichier
     * @param dirpath
     */
    public removeFile (dirpath) {
      //  return this.fs.rmdirSync(dirpath)
        try {
            this.fs.unlinkSync(dirpath);
            console.log('successfully deleted /tmp/hello');
        } catch (err) {
// handle the error
        }
    }

    /**
     * Read the data
     * @param fileUrl location of file
     */
    public readMonth(fileUrl: string){
      let rawdata = this.fs.readFileSync(fileUrl);
      return rawdata;
    }

    /**
     * Test the access of file
     * @param fileUrl url file
     */
    public access(fileUrl: string){
        let bool = true;
        try {
            this.fs.accessSync(fileUrl, this.fs.constants.R_OK |
                this.fs.constants.W_OK);
            // can read/write
          } catch (err) {
            // no access
            return false;
          }
        return bool;
    }
 }
