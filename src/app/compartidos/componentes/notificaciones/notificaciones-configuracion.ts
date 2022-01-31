import { InjectionToken, TemplateRef } from "@angular/core";
import { TiposNotificaciones } from "../../enumeraciones/tipos-notificaciones.enum";

export class DatosNotificacion {
    tipo: TiposNotificaciones;
    texto: string;
    duracion?: number;
    plantilla?: TemplateRef<any>;
    contextoPlantilla?: {};
}

export interface NotificacionConfiguracion {
    posicion?: {
        arriba?: number;
        debajo?: number;
        derecha?: number;
        izquierda?: number;
    },
    animacion?: {
        desaparecer: number;
        fundirse: number;
    };
}

export const configuracionPorDefecto: NotificacionConfiguracion = {
    posicion: {
        arriba:20,
        derecha:20
    },
    animacion: {
        desaparecer: 450,
        fundirse: 300,
    },
}

export const NOTIFICACIONES_CONFIGURACION_TOKEN = new InjectionToken('notificaciones-configuracion');