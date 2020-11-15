"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const config_service_1 = require("./services/config/config.service");
require("reflect-metadata");
const app_1 = require("./app/app");
const database_service_1 = require("./services/database/database.service");
const websocket_service_1 = require("./services/webSocket/websocket.service");
const dataBase = new database_service_1.DataBaseService();
dataBase.connection().then((connection) => {
    const config = new config_service_1.ConfigService();
    const port = config.getServerConfig().listen;
    const app = new app_1.App();
    // Lancement du serveur        
    let server = app.listen(port, (_) => {
        database_service_1.DataBaseService.setConnexionInstance(connection);
        console.log(`server started, listening on port ${port}`);
    });
    // Configuration des websocket
    websocket_service_1.WebSocketService.setServerInstance(server);
    // Enregistrement d'un client
    const websocket = new websocket_service_1.WebSocketService();
    websocket.setPseudo('newClient');
    // Souhaite la bienvenu au client connecté
    websocket.emit('welcome', 'Bienvenue');
});
//# sourceMappingURL=start.js.map