
import { Inject } from "express-dependency-injection";
import { DataBaseService } from "../services/database/database.service";
import { Connection } from "typeorm";

/**
 * Generic repository, Permettant d'assurer la connexion à la base de données
 */
export class GenericRepository {

    @Inject(DataBaseService)
    private readonly databaseService: DataBaseService;

    protected connection: Connection;

    constructor() {
        this.connection = DataBaseService.getConnexionInstance();
    }

    protected getConnection() {
        return this.connection;
    }

    protected async connect() {        
        this.connection = await this.databaseService.connection();
        return this.connection;

        // const options = this.configService.getDatabaseConfig();
        // if(mongoose.connection.readyState === 0) {

        //     mongoose.connect(
                
        //         `mongodb${options.address}`,
        //     );
        // }
    }
}