import { ConfigService } from "./services/config/config.service";
import "reflect-metadata";
import { App } from "./app/app";
import { DataBaseService } from "./services/database/database.service";
import { WebSocketService } from "./services/webSocket/websocket.service";
const dataBase = new DataBaseService();

dataBase.connection().then(
    (connection) => {
        const config = new ConfigService();
        const port = config.getServerConfig().listen;
        const app = new App();

        

        // Lancement du serveur        
        let server = app.listen(port, (_) => {
            
            DataBaseService.setConnexionInstance(connection)
            console.log(`server started, listening on port ${port}`);
         });

        // Configuration des websocket
        WebSocketService.setServerInstance(server);

        // Enregistrement d'un client
        const websocket = new WebSocketService();
        websocket.setPseudo('newClient');

        // Souhaite la bienvenu au client connecté
        websocket.emit('welcome', 'Bienvenue');
        
    }
)
