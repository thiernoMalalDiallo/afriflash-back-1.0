"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var WebSocketService_1;
const express_dependency_injection_1 = require("express-dependency-injection");
/**
 * Permet de gérer la communication synchrone avec le client
 */
let WebSocketService = WebSocketService_1 = class WebSocketService {
    constructor() {
        // Configure le canal de communication (websocket)
        this.io = require('socket.io')(WebSocketService_1.server);
        this.io.set('origins', '*:*');
    }
    /**
     * Renseigne le serveur
     * @param server Serveur
     */
    static setServerInstance(server) {
        WebSocketService_1.server = server;
    }
    /**
     * Retourne le serveur
     */
    static getServerInstance() {
        return WebSocketService_1.server;
    }
    /**
     * Emet un message
     * @param event événement émis
     * @param eventValue Valeur de l'évenement
     */
    emit(event, eventValue) {
        this.io.on('connection', function (socket, pseudo) {
            socket.emit(event, eventValue);
        });
    }
    /**
     * Réçoit un message
     * @param event événement émis
     * @param callback fonction à éxecuter
     */
    receive(event, callback) {
        this.io.on('connection', function (socket, pseudo) {
            socket.on(event, callback);
        });
    }
    /**
     * Enregistre le pseudo d'un client
     * @param event événement émis
     */
    setPseudo(event) {
        this.io.on('connection', function (socket) {
            socket.on(event, (pseudo) => {
                socket.pseudo = pseudo;
                console.log('tototot : ' + socket.pseudo);
            });
        });
    }
    /**
     * Envoi à tous les clients un message
     * @param socket socket object
     * @param event événement émis
     * @param eventValue valeur de l'événement
     */
    broadcast(socket, event, eventValue) {
        socket.broadcast.emit(event, eventValue);
    }
};
WebSocketService = WebSocketService_1 = __decorate([
    express_dependency_injection_1.Service(),
    __metadata("design:paramtypes", [])
], WebSocketService);
exports.WebSocketService = WebSocketService;
//# sourceMappingURL=websocket.service.js.map