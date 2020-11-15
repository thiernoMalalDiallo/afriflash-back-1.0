import { AbstractServer } from "express-dependency-injection/dist/server/server.abstract";
import { ExServer } from "express-dependency-injection";
import { MainController } from "../controller/main.controller";

/**
 * Le point d'entrée principale de l'application
 */
@ExServer({
    main: MainController
})
export class App extends AbstractServer {


}