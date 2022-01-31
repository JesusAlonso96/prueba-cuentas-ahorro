import { Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector } from '@angular/cdk/portal';
import { Inject, Injectable, Injector, TemplateRef } from '@angular/core';
import { NotificacionReferencia } from 'src/app/compartidos/componentes/notificaciones/notificacion-referencia';
import { DatosNotificacion, NotificacionConfiguracion, NOTIFICACIONES_CONFIGURACION_TOKEN } from 'src/app/compartidos/componentes/notificaciones/notificaciones-configuracion';
import { NotificacionesComponent } from 'src/app/compartidos/componentes/notificaciones/notificaciones.component';
import { TiposNotificaciones } from 'src/app/compartidos/enumeraciones/tipos-notificaciones.enum';
import { EventosService } from './eventos.service';

@Injectable({
  providedIn: 'any'
})
export class NotificacionesService {
  private colaReferencias: NotificacionReferencia[] = [];
  constructor(private superposicion: Overlay,
    private inyectorPadre: Injector,
    private _serEventos: EventosService,
    @Inject(NOTIFICACIONES_CONFIGURACION_TOKEN) private notificacionConfiguracion: NotificacionConfiguracion) {
    this._serEventos.notificacionCerradaEventoObservable$.subscribe(
      (referencia: NotificacionReferencia) => {
        let posicionEliminar: number;
        for (let i = 0; i < this.colaReferencias.length; i++) {
          const referenciaExistente = this.colaReferencias[i];
          if (referenciaExistente == referencia) {
            posicionEliminar = i;
          }
        }
        const referenciaEliminada = this.colaReferencias[posicionEliminar];
        let top = referenciaEliminada.obtenerPosicion().top;
        this.colaReferencias.splice(posicionEliminar, 1);
        for (let j = posicionEliminar; j < this.colaReferencias.length; j++) {
          const referencia = this.colaReferencias[j];
          let topReferencia = referencia.obtenerPosicion().top;
          const estrategiaPosicion = this.superposicion.position()
            .global()
            .top(top + 'px')
            .right(this.notificacionConfiguracion.posicion.derecha + 'px');
          referencia.superposicion.updatePositionStrategy(estrategiaPosicion);
          top = topReferencia;
        }

      }
    );
  }

  private mostrarNotificacion(tipo: TiposNotificaciones, texto: string, duracion?: number, plantilla?: TemplateRef<any>, contextoPlantilla?: {}) {
    const estrategiaPosicion = this.obtenerPosicionEstrategica();
    const referenciaSuperposicion = this.superposicion.create({ positionStrategy: estrategiaPosicion });

    const notificacionReferencia = new NotificacionReferencia(referenciaSuperposicion);
    this.colaReferencias.push(notificacionReferencia);

    const inyector = this.obtenerInyector({ tipo, texto, duracion, plantilla, contextoPlantilla }, notificacionReferencia, this.inyectorPadre);
    const alertaPortal = new ComponentPortal(NotificacionesComponent, null, inyector);

    referenciaSuperposicion.attach(alertaPortal);
  }

  public mostrarNotificacionExito(texto: string, duracion?: number) {
    this.mostrarNotificacion(TiposNotificaciones.Exito, texto, duracion);
  }

  public mostrarNotificacionError(texto: string, duracion?: number) {
    this.mostrarNotificacion(TiposNotificaciones.Error, texto, duracion);
  }

  public mostrarNotificacionAdvertencia(texto: string, duracion?: number) {
    this.mostrarNotificacion(TiposNotificaciones.Advertencia, texto, duracion);
  }

  public mostrarNotificacionInfo(texto: string, duracion?: number) {
    this.mostrarNotificacion(TiposNotificaciones.Info, texto, duracion);
  }

  private obtenerPosicionEstrategica() {
    return this.superposicion.position()
      .global()
      .top(this.obtenerPosicion())
      .right(this.notificacionConfiguracion.posicion.derecha + 'px');
  }

  private obtenerPosicion() {
    const ultimaNotificacionVisible: NotificacionReferencia = this.colaReferencias.length > 0 ? this.colaReferencias[this.colaReferencias.length - 1] : null;
    const ultimaNotificacionEsVisible = ultimaNotificacionVisible && ultimaNotificacionVisible.esVisible();
    const posicion = ultimaNotificacionEsVisible
      ? ultimaNotificacionVisible.obtenerPosicion().bottom
      : this.notificacionConfiguracion.posicion.arriba;
    return posicion + 'px';
  }


  private obtenerInyector(datos: DatosNotificacion, notificacionReferencia: NotificacionReferencia, inyectorPadre: Injector) {
    const tokens = new WeakMap();
    tokens.set(DatosNotificacion, datos);
    tokens.set(NotificacionReferencia, notificacionReferencia);
    return new PortalInjector(inyectorPadre, tokens);
  }

}
