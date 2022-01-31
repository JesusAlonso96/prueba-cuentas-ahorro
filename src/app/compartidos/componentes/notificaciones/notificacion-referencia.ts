import { OverlayRef } from "@angular/cdk/overlay";

export class NotificacionReferencia {
    constructor(public  superposicion: OverlayRef) {
    }

    esVisible() {
        return this.superposicion && this.superposicion.overlayElement;
    }

    cerrar() {
        this.superposicion.detach();
    }

    obtenerPosicion() {
        return this.superposicion.overlayElement.getBoundingClientRect();
    }
}