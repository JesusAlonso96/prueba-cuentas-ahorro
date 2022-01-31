import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TiposAlertas } from 'src/app/compartidos/enumeraciones/tipos-alertas.enum';
import { Transaccion } from 'src/app/compartidos/modelos/transaccion.model';
import { CargandoService } from 'src/app/nucleo/servicios/cargando.service';
import { NotificacionesService } from 'src/app/nucleo/servicios/notificaciones.service';
import { TransaccionesService } from 'src/app/nucleo/servicios/transacciones.service';
import { AltaTransaccionComponent } from './alta-transaccion/alta-transaccion.component';
import { ListadoTransaccionesComponent } from './listado-transacciones/listado-transacciones.component';

@Component({
  selector: 'tecas-transacciones',
  templateUrl: './transacciones.component.html',
  styleUrls: ['./transacciones.component.scss']
})
export class TransaccionesComponent implements OnInit {
  @ViewChild('listadoTransacciones') listadoTransacciones: ListadoTransaccionesComponent;
  transacciones: Transaccion[] = [];
  TiposAlertas = TiposAlertas;
  cargando: boolean = false;
  constructor(
    private _serCargando: CargandoService,
    private _serTransacciones: TransaccionesService,
    private _serNotificaciones: NotificacionesService,
    private modal: MatDialog
  ) { }

  async ngOnInit() {
    try {
      this.cargando = this._serCargando.abrirVistaCargando(true, 'Cargando transacciones...');
      this.transacciones = await this.obtenerTransacciones();
      this.cargando = this._serCargando.abrirVistaCargando(false);
    } catch (error) {
      this.cargando = this._serCargando.abrirVistaCargando(false);
      this._serNotificaciones.mostrarNotificacionError(`${error.titulo}, ${error.detalles}.`)
    }
  }

  //METODO PARA OBTENER LAS TRANSACCIONES 
  obtenerTransacciones() {
    return new Promise<Transaccion[]>((resolve, reject) => {
      this._serTransacciones.obtenerTransacciones().subscribe(
        (transacciones: Transaccion[]) => {
          resolve(transacciones)
        },
        (err: HttpErrorResponse) => {
          reject({ titulo: err.error.titulo, detalles: err.error.detalles });
        }
      );
    })
  }

  abrirAltaCuentaAhorro() {
    this.modal.open(AltaTransaccionComponent)
      .afterClosed()
      .subscribe(
        async (transaccion: Transaccion) => {
          //SI LA NUEVA CUENTA  FUE CREADA SE AGREGARÁ A LA LISTA DE CUENTAS
          if (transaccion) {
            this.cargando = this._serCargando.abrirVistaCargando(true, 'Cargando transacciones...');
            this.transacciones = await this.obtenerTransacciones();
            this.listadoTransacciones.inicializarTabla();
            this.cargando = this._serCargando.abrirVistaCargando(false);
            this._serNotificaciones.mostrarNotificacionExito('Transacción guardada con exito', 4000);
          }
        }
      )
  }
}
