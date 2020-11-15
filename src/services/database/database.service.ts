import "reflect-metadata";
import {createConnection, Connection} from "typeorm";
import { Service } from "express-dependency-injection";
import { ConfigService } from "../config/config.service";
import {Annonce} from "../../models/Annonce/annonce.model";
import {Category} from "../../models/Annonce/category.model";
import {Product} from "../../models/Annonce/product.model";
import {User} from "../../models/users/user.model";
import {Login} from "../../models/users/login.model";
import { LocationModel } from "../../models/localisation/location.model";
@Service()
export class DataBaseService{

    private static config = new ConfigService();

    private static connectionInstance: Connection;

    public connection(){
        let options = DataBaseService.config.getDatabaseConfig();
        let url = `mongodb${options.address}`;
        return createConnection({
            type: options.type,
            useNewUrlParser: true,
            url: url,
            ssl: true,
            authSource: "admin",
            entities: [
                Annonce,
                Category,
                Product,
                User,
                Login,
                LocationModel
            ]
        });
    }

    public static setConnexionInstance(connection: Connection) {
        DataBaseService.connectionInstance = connection;
    }

    public static getConnexionInstance() {
        return DataBaseService.connectionInstance;
    }

}
