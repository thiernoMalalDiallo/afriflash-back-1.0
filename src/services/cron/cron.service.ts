import { Service } from 'express-dependency-injection';
var cron = require('node-schedule');

/**
 * Permet de gérer les crons
 */
@Service()
export class CronService {

    constructor() {}

    /**
     * Crée une nouveau cron
     * @param condition condition
     * @param callback fonction callback
     */
    public newJob(condition: any, callback: Function) {
        cron.scheduleJob(condition, callback);
    }
}