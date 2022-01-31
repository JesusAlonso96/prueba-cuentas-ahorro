import express from 'express';
import http from 'http';
import { PUERTO_SERVIDOR } from '../../config/globales';
import rutasClientes from '../componentes/rutas/clientes';


export default class Servidor {
    private static _instance: Servidor;
    public app: express.Application;
    public puerto: number;
    private servidorHttp: http.Server;

    private constructor() {
        this.app = express();
        this.puerto = PUERTO_SERVIDOR;
        this.servidorHttp = new http.Server(this.app);
    }

    //MANEJAR UNA SOLA INSTANCIA DE LA CLASE SERVIDOR EN EL PROYECTO
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    //METODO PARA CREAR LAS RUTAS DE LOS ENDPOINTS DEL SERVIDOR
    private inicializarRutas(){
        this.app.use('/api/v1/clientes', rutasClientes);
    }

    public iniciar() {
        this.inicializarRutas();
        this.servidorHttp.listen(this.puerto, () => {
            console.log(`Servidor funcionando en el puerto ${this.puerto}`);
        })
    }

}