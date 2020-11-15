import { config } from '../../config/config';
import { Service } from 'express-dependency-injection';

/**
 * Le service de configuration
 */
@Service()
export class ConfigService {

    private config: any;

    constructor() {

        this.config = config.config;
    }

    getDatabaseConfig(): any {

        return this.config.databaseConfig;
    }

    getServerConfig(): any {

        return this.config.serverConfig;
    }

    saveCascade<T>(collection: T){
        
    }
}