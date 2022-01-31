import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { EventosService } from 'src/app/nucleo/servicios/eventos.service';
import { TiposNotificaciones } from '../../enumeraciones/tipos-notificaciones.enum';
import { NotificacionReferencia } from './notificacion-referencia';
import { DatosNotificacion, NotificacionConfiguracion, NOTIFICACIONES_CONFIGURACION_TOKEN } from './notificaciones-configuracion';
import { AnimationEvent } from '@angular/animations';
import { AnimacionNotificacion } from './notificacion-animacion';

@Component({
  selector: 'tecas-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss'],
  animations: [AnimacionNotificacion.animacionNotificacion]
})
export class NotificacionesComponent implements OnInit, OnDestroy {
  mostrar: boolean = true;
  estadoAnimacion: string = 'inicial';
  private intervaloId: number;
  constructor(
    readonly datosNotificacion: DatosNotificacion,
    readonly referencia: NotificacionReferencia,
    private _serEventos: EventosService,
    @Inject(NOTIFICACIONES_CONFIGURACION_TOKEN) public notificacionConfiguracion: NotificacionConfiguracion) { }


  ngOnInit(): void {
    this.intervaloId = Number(setTimeout(() => this.estadoAnimacion = 'cerrandose', this.datosNotificacion.duracion ? this.datosNotificacion.duracion : 2000));
  }

  ngOnDestroy(): void {
    clearTimeout(this.intervaloId);
  }

  lanzarEvento() {
    this.estadoAnimacion = 'cerrandose';
    setTimeout(() => {
      this._serEventos.notificacionCerrada(this.referencia);
    }, 200);
  }

  obtenerTipoDeNotificacion() {
    switch (this.datosNotificacion.tipo) {
      case TiposNotificaciones.Exito: return 'notificacion-exito';
      case TiposNotificaciones.Info: return 'notificacion-info';
      case TiposNotificaciones.Advertencia: return 'notificacion-advertencia';
      case TiposNotificaciones.Error: return 'notificacion-error';
      default: 'notificacion-info';
    }
  }

  obtenerIconoNotificacion() {
    switch (this.datosNotificacion.tipo) {
      case TiposNotificaciones.Exito: return 'done';
      case TiposNotificaciones.Info: return 'help_outline';
      case TiposNotificaciones.Advertencia: return 'warning_amber';
      case TiposNotificaciones.Error: return 'error_outlined';
      default: 'help_outline';
    }
  }

  desvaneciendose(evento: AnimationEvent) {
    const estado: string = evento.toState;
    const seDesvanece: boolean = estado === 'cerrandose';
    const estaTerminado: boolean = this.estadoAnimacion === 'cerrandose';
    if (seDesvanece && estaTerminado) {
      this.cerrar();
    }
  }

  cerrar() {
    this.referencia.cerrar();
  }

}
