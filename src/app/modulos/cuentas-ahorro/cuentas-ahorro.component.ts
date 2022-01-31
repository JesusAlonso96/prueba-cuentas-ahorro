import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { TiposAlertas } from 'src/app/compartidos/enumeraciones/tipos-alertas.enum';
import { CuentaAhorro } from 'src/app/compartidos/modelos/cuenta-ahorro.model';
import { CargandoService } from 'src/app/nucleo/servicios/cargando.service';
import { CuentasAhorroService } from 'src/app/nucleo/servicios/cuentas-ahorro.service';
import { NotificacionesService } from 'src/app/nucleo/servicios/notificaciones.service';
import { AltaCuentaAhorroComponent } from './alta-cuenta-ahorro/alta-cuenta-ahorro.component';
import { ListadoCuentasAhorroComponent } from './listado-cuentas-ahorro/listado-cuentas-ahorro.component';

@Component({
  selector: 'tecas-cuentas-ahorro',
  templateUrl: './cuentas-ahorro.component.html',
  styleUrls: ['./cuentas-ahorro.component.scss']
})
export class CuentasAhorroComponent implements OnInit {
  @ViewChild('listadoCuentas') listadoCuentas: ListadoCuentasAhorroComponent;
  cuentasAhorro: CuentaAhorro[] = [];
  TiposAlertas = TiposAlertas;
  cargando: boolean = false;
  constructor(
    private _serCargando: CargandoService,
    private _serCuentasAhorro: CuentasAhorroService,
    private _serNotificaciones: NotificacionesService,
    private modal: MatDialog
  ) { }

  async ngOnInit() {
    try {
      this.cargando = this._serCargando.abrirVistaCargando(true, 'Cargando cuentas...');
      this.cuentasAhorro = await this.obtenerCuentasAhorro();
      this.cargando = this._serCargando.abrirVistaCargando(false);
    } catch (error) {
      this.cargando = this._serCargando.abrirVistaCargando(false);
      this._serNotificaciones.mostrarNotificacionError(`${error.titulo}, ${error.detalles}.`)
    }
  }

  //METODO PARA OBTENER LAS CUENTAS DE AHORRO 
  obtenerCuentasAhorro() {
    return new Promise<CuentaAhorro[]>((resolve, reject) => {
      this._serCuentasAhorro.obtenerCuentasAhorro().subscribe(
        (cuentasAhorro: CuentaAhorro[]) => {
          resolve(cuentasAhorro)
        },
        (err: HttpErrorResponse) => {
          reject({ titulo: err.error.titulo, detalles: err.error.detalles });
        }
      );
    })
  }

  abrirAltaCuentaAhorro() {
    this.modal.open(AltaCuentaAhorroComponent, {
      data: this.cuentasAhorro
    })
      .afterClosed()
      .subscribe(
        async (cuentaAhorro: CuentaAhorro) => {
          //SI LA NUEVA CUENTA  FUE CREADA SE AGREGARÁ A LA LISTA DE CUENTAS
          if (cuentaAhorro) {
            this.cargando = this._serCargando.abrirVistaCargando(true, 'Cargando cuentas...');
            this.cuentasAhorro = await this.obtenerCuentasAhorro();
            this.listadoCuentas.inicializarTabla();
            this.cargando = this._serCargando.abrirVistaCargando(false);
            this._serNotificaciones.mostrarNotificacionExito('Cuenta de ahorro guardada con exito',4000);
          }
        }
      )
  }

}
