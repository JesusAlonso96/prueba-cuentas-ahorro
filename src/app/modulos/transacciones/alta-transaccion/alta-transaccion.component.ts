import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExpresionesRegulares } from 'src/app/compartidos/constantes/expresiones-regulares.constant';
import { TiposAlertas } from 'src/app/compartidos/enumeraciones/tipos-alertas.enum';
import { CuentaAhorro } from 'src/app/compartidos/modelos/cuenta-ahorro.model';
import { Transaccion } from 'src/app/compartidos/modelos/transaccion.model';
import { validadorObjeto } from 'src/app/compartidos/validadores/validador-objeto.validator';
import { CargandoService } from 'src/app/nucleo/servicios/cargando.service';
import { CuentasAhorroService } from 'src/app/nucleo/servicios/cuentas-ahorro.service';
import { NotificacionesService } from 'src/app/nucleo/servicios/notificaciones.service';
import { TransaccionesService } from 'src/app/nucleo/servicios/transacciones.service';
import * as momento from 'moment';

@Component({
  selector: 'tecas-alta-transaccion',
  templateUrl: './alta-transaccion.component.html',
  styleUrls: ['./alta-transaccion.component.scss']
})
export class AltaTransaccionComponent implements OnInit {
  //VARIABLE PARA CONTROLAR EL FORMULARIO DE LA TRANSACCION
  formularioTransaccion: FormGroup;
  //VARIABLE DE CARGA
  cargando: boolean = false;
  //VARIABLES PARA CUENTAS DE AHORRO
  cuentasAhorro: CuentaAhorro[] = [];
  cuentasAhorroFiltradas: CuentaAhorro[] = [];
  //VARIABLES PARA TRANSACCIONES
  transacciones: Transaccion[] = [];
  transaccionesFiltradas: Transaccion[] = [];
  //VARIABLES PARA ALERTAS
  TiposAlertas = TiposAlertas;
  //EXPRESIONES REGULARES
  ExpresionesRegulares = ExpresionesRegulares;
  constructor(
    private _serNotificaciones: NotificacionesService,
    private _serCuentasAhorro: CuentasAhorroService,
    private _serTransacciones: TransaccionesService,
    private _serCargando: CargandoService,
    private constructorFormularios: FormBuilder,
    public referenciaModal: MatDialogRef<AltaTransaccionComponent>,
  ) { }

  async ngOnInit() {
    try {
      this._serCargando.abrirVistaCargando(true, 'Cargando datos...');
      this.inicializarFormulario();
      this.cuentasAhorro = await this.obtenerCuentasDeAhorro();
      this.cuentasAhorroFiltradas = this.cuentasAhorro;
      this.transacciones = await this.obtenerTransacciones();
      this._serCargando.abrirVistaCargando(false);
    } catch (error) {
      this._serCargando.abrirVistaCargando(false);
      this._serNotificaciones.mostrarNotificacionError(`${error.titulo}, ${error.detalles}.`)
    }

  }

  //METODO PARA INICIALIZAR EL FORMULARIO
  inicializarFormulario(): void {
    this.formularioTransaccion = this.constructorFormularios.group({
      tipo: ['', [Validators.required]],
      monto: [Number(1).toFixed(2), [Validators.pattern(ExpresionesRegulares[7].expresion)]],
      numeroCuenta: ['', validadorObjeto]
    })
  }

  //METODO PARA TRANSFORMAR CANTIDAD DE MONTO
  transformarCantidadMontoTransferencia() {
    const cantidad: number = Number(this.formularioTransaccion.get('monto').value);
    if (cantidad != null && cantidad != undefined && !isNaN(cantidad) && cantidad > 0 && this.esMontoTransaccionValido()) this.formularioTransaccion.get('monto').setValue(Number(this.formularioTransaccion.get('monto').value).toFixed(2));
    else this.formularioTransaccion.get('monto').setValue(Number(1).toFixed(2));
  }

  //METODOS PARA CUENTAS DE AHORRO
  obtenerCuentasDeAhorro() {
    return new Promise<CuentaAhorro[]>((resolve, reject) => {
      this._serCuentasAhorro.obtenerCuentasAhorro().subscribe(
        (cuentasAhorro: CuentaAhorro[]) => {
          resolve(cuentasAhorro);
        },
        (err: HttpErrorResponse) => {
          reject({ titulo: 'Error al obtener las cuentas de ahorro', detalles: 'ocurrió un error al obtener las cuentas de ahorro, por favor intentalo de nuevo más tarde.' });
        }
      );
    })
  }

  filtrarCuentasDeAhorro() {
    if (this.formularioTransaccion.get('numeroCuenta').value == '') this.cuentasAhorroFiltradas = this.cuentasAhorro;
    else {
      this.cuentasAhorroFiltradas = this.cuentasAhorro.filter(cuentaAhorro => {
        return String(cuentaAhorro.numeroCuenta).trim().toLowerCase() == String(this.formularioTransaccion.get('numeroCuenta').value).trim().toLowerCase()
      });
    }
  }

  mostrarCuenta(cuentaAhorro: CuentaAhorro) {
    return cuentaAhorro ? cuentaAhorro.numeroCuenta : '';
  }

  //METODO PARA OBTENER LAS TRANSACCIONES 
  obtenerTransacciones() {
    return new Promise<Transaccion[]>((resolve, reject) => {
      this._serTransacciones.obtenerTransacciones().subscribe(
        (transacciones: Transaccion[]) => {
          resolve(transacciones)
        },
        (err: HttpErrorResponse) => {
          reject({ titulo: 'Error al obtener las transacciones', detalles: 'ocurrió un error al obtener las transacciones, por favor intentalo de nuevo más tarde' });
        }
      );
    })
  }

  obtenerTotalPorTipoMovimiento(tipo: string): number {
    return this.transacciones.filter(transaccion => {
      return String(transaccion.numeroCuenta).trim().toLowerCase() == String(this.formularioTransaccion.get('numeroCuenta').value.numeroCuenta).trim().toLowerCase() && String(transaccion.tipo).trim().toLowerCase() == String(tipo).trim().toLowerCase();
    })
      .map(transaccion => Number(transaccion.monto))
      .reduce((acumulador, cantidad) => { return acumulador + cantidad }, 0);
  }

  obtenerTotalDeTransacciones(): number {
    const totalDepositos: number = this.obtenerTotalPorTipoMovimiento('Deposito');
    const totalRetiros: number = this.obtenerTotalPorTipoMovimiento('Retiro');
    return totalDepositos - totalRetiros;
  }

  esMontoTransaccionValido(): boolean {
    return this.obtenerTotalCuentaDespuesTransaccion() >= 0;
  }

  obtenerTotalCuentaDespuesTransaccion(): number {
    return this.formularioTransaccion.get('tipo').value == 'Retiro'
      ? this.obtenerTotalDeTransacciones() - Number(this.formularioTransaccion.get('monto').value)
      : this.obtenerTotalDeTransacciones() + Number(this.formularioTransaccion.get('monto').value)
  }

  //METODO PARA GUARDAR TRANSACCION
  guardarTransaccion() {
    this.cargando = this._serCargando.abrirVistaCargando(true, 'Guardando transacción');
    this._serTransacciones.guardarTransaccion(this.crearObjetoTransaccion()).subscribe(
      (transaccion: any) => {
        this.cargando = this._serCargando.abrirVistaCargando(false);
        this.referenciaModal.close(true);
      },
      (err: HttpErrorResponse) => {
        this.cargando = this._serCargando.abrirVistaCargando(false);
        this._serNotificaciones.mostrarNotificacionError('Error al guardar la transacción, por favor intentalo de nuevo más tarde', 4000);
      }
    );
  }

  //METODO PARA CREAR EL OBJETO DE LA TRANSACCION
  crearObjetoTransaccion(): Transaccion {
    let transaccion: Transaccion = new Transaccion();
    transaccion.numeroCuenta = this.formularioTransaccion.get('numeroCuenta').value.numeroCuenta;
    transaccion.monto = Number(this.formularioTransaccion.get('monto').value);
    transaccion.tipo = this.formularioTransaccion.get('tipo').value;
    transaccion.usuario = 'u-231';
    transaccion.terminal = 'TERM235';
    const fechaActual: Date = new Date(Date.now());
    transaccion.fechaUltimaAct = `${momento(fechaActual).format('YYYY-MM-DDTHH:mm:ss')}`;
    return transaccion;
  }

  cerrarModal() {
    this.referenciaModal.close();
  }

}

