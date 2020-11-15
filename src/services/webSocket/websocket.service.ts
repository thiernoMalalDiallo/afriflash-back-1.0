import { Service } from "express-dependency-injection";
import { Server } from "http";

/**
 * Permet de gérer la communication synchrone avec le client
 */
@Service()
export class WebSocketService{
    
    /**
     * Variable socket.io
     */
    private io: any;

    /**
     * Server instance
     */
    private static server: Server;

    constructor() {
        // Configure le canal de communication (websocket)
        this.io = require('socket.io')(WebSocketService.server);
        this.io.set('origins', '*:*');
    }

    /**
     * Renseigne le serveur 
     * @param server Serveur
     */
    public static setServerInstance(server: Server) {
        WebSocketService.server = server;
    }

    /**
     * Retourne le serveur
     */
    public static getServerInstance() {
        return WebSocketService.server;
    }
    
    /**
     * Emet un message
     * @param event événement émis
     * @param eventValue Valeur de l'évenement
     */
    public emit(event: string, eventValue: any){
        this.io.on('connection', function (socket, pseudo) {
            socket.emit(event, eventValue);
            
        });
    }

    /**
     * Réçoit un message
     * @param event événement émis
     * @param callback fonction à éxecuter
     */
    public receive(event: string, callback: Function){
        this.io.on('connection', function (socket, pseudo) {
            socket.on(event, callback);
        });
    }

    /**
     * Enregistre le pseudo d'un client
     * @param event événement émis
     */
    public setPseudo(event: string){
        this.io.on('connection', function (socket) {
            socket.on(event, (pseudo) => {
                socket.pseudo = pseudo
                console.log('tototot : '+socket.pseudo)
            });
        });
    }

    /**
     * Envoi à tous les clients un message
     * @param socket socket object
     * @param event événement émis
     * @param eventValue valeur de l'événement
     */
    public broadcast(socket: any, event: string, eventValue: any){
        socket.broadcast.emit(event, eventValue);
    }
}