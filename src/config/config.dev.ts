export const config = {
    
    "databaseConfig": {
        "address": "+srv://afriflash:afriflash@cluster0.ue9y4.mongodb.net/test?retryWrites=true&w=majority",
        "type": "mongodb",
        "databaseName": "test",
        "port": "27016",
        "user": "afriflash",
        "pass": "afriflash",
        "poolSize": 15
    },
    "serverConfig": {

        url: "http://localhost",
        "listen": 3000,
        allowOrigin: "*"
    },
    jwtSecret: "afriflash"
};
