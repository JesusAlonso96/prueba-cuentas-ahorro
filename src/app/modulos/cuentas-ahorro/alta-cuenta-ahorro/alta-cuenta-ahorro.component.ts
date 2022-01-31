import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import * as momento from 'moment';
import { ExpresionesRegulares } from 'src/app/compartidos/constantes/expresiones-regulares.constant';
import { Cliente } from 'src/app/compartidos/modelos/cliente.model';
import { CuentaAhorro } from 'src/app/compartidos/modelos/cuenta-ahorro.model';
import { validadorObjeto } from 'src/app/compartidos/validadores/validador-objeto.validator';
import { CargandoService } from 'src/app/nucleo/servicios/cargando.service';
import { ClientesService } from 'src/app/nucleo/servicios/clientes.service';
import { CuentasAhorroService } from 'src/app/nucleo/servicios/cuentas-ahorro.service';
import { NotificacionesService } from 'src/app/nucleo/servicios/notificaciones.service';

@Component({
  selector: 'tecas-alta-cuenta-ahorro',
  templateUrl: './alta-cuenta-ahorro.component.html',
  styleUrls: ['./alta-cuenta-ahorro.component.scss']
})
export class AltaCuentaAhorroComponent implements OnInit {
  //VARIABLE PARA CONTROLAR EL FORMULARIO DE LA CUENTA
  formularioCuenta: FormGroup;
  //VARIABLE PARA MOSTRAR LOS ERRORES DE LAS EXPRESIONES REGULARES EN EL TEMPLATE
  ExpresionesRegulares = ExpresionesRegulares;
  //VARIABLE DE CARGA
  cargando: boolean = false;
  //VARIABLES PARA SECCION DEL CLIENTE
  clientes: Cliente[] = [];
  clienteElegido: Cliente;
  cargandoClientes: boolean = false;
  tecleo: boolean = false;
  tiempoMuerto = null;

  constructor(
    private _serNotificaciones: NotificacionesService,
    private _serCuentasAhorro: CuentasAhorroService,
    private _serCargando: CargandoService,
    private _serClientes: ClientesService,
    private constructorFormularios: FormBuilder,
    public referenciaModal: MatDialogRef<AltaCuentaAhorroComponent>,
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  //METODO PARA INICIALIZAR EL FORMULARIO
  inicializarFormulario(): void {
    this.formularioCuenta = this.constructorFormularios.group({
      numeroCuenta: ['', [Validators.required, Validators.pattern(ExpresionesRegulares[6].expresion)]],
      saldo: [Number(0).toFixed(2), [Validators.required, Validators.pattern(ExpresionesRegulares[7].expresion)]],
      idCliente: ['', [Validators.required, validadorObjeto]]
    })
  }

  //METODOS PARA INPUT DE CLIENTE
  mostrarCliente(cliente: Cliente) {
    return cliente ? cliente.id + '. ' + cliente.nombre + ' ' + cliente.apellido_paterno : '';
  }

  buscarClientes() {
    this.tecleo = true;
    clearTimeout(this.tiempoMuerto);
    this.tiempoMuerto = setTimeout(() => {
      this.tecleo = false;
      this.cargandoClientes = true;
      this._serClientes.obtenerClientes(true, String(this.formularioCuenta.get('idCliente').value)).subscribe(
        (clientes: Cliente[]) => {
          this.cargandoClientes = false;
          this.clientes = clientes;
        },
        (err: HttpErrorResponse) => {
          this.cargandoClientes = false;
          this._serNotificaciones.mostrarNotificacionError(`${err.error.titulo}, ${err.error.detalles}`, 4000);
        }
      );

    }, 500);
  }

  async guardarCuentaAhorro() {
    try {
      this.cargando = this._serCargando.abrirVistaCargando(true,'Guardando cuenta de ahorro...');
      const cuentaAhorro: CuentaAhorro = this.crearObjectoCuentaAhorro();
      let cuentasAhorroExistentes: CuentaAhorro[] = await this.obtenerCuentasDeAhorro();
      await this.existeNumeroCuenta(cuentasAhorroExistentes, cuentaAhorro);
      this._serCuentasAhorro.guardarCuentaAhorro(cuentaAhorro).subscribe(
        (respuesta: any)=>{
          this.cargando = this._serCargando.abrirVistaCargando(false);
          this.referenciaModal.close(true);

        },
        (err: HttpErrorResponse)=>{
          this.cargando = this._serCargando.abrirVistaCargando(false);
          this._serNotificaciones.mostrarNotificacionError('Error al guardar la cuenta de ahorro, por favor intentalo de nuevo más tarde', 6000);
        }
      );
    } catch (error) {
      this.cargando = this._serCargando.abrirVistaCargando(false);
      this._serNotificaciones.mostrarNotificacionError(`${error.titulo}, ${error.detalles}`, 6000);
    }
  }

  //METODO PARA CREAR EL OBJETO DE LA CUENTA
  crearObjectoCuentaAhorro(): CuentaAhorro {
    let cuentaAhorro: CuentaAhorro = new CuentaAhorro();
    cuentaAhorro.numeroCuenta = String(this.formularioCuenta.get('numeroCuenta').value);
    cuentaAhorro.saldo = Number(Number(this.formularioCuenta.get('saldo').value).toFixed(2));
    cuentaAhorro.idCliente = this.formularioCuenta.get('idCliente').value.id;
    const fechaActual: Date = new Date(Date.now());
    cuentaAhorro.fechaUltimaAct = `${momento(fechaActual).format('YYYY')}-${momento(fechaActual).format('MM')}-${momento(fechaActual).format('DD')}`;
    cuentaAhorro.estado = 'Activa';
    return cuentaAhorro;
  }

  //METODOS PARA VALIDAR YA EXISTE ESE NÚMERO DE CUENTA
  obtenerCuentasDeAhorro() {
    return new Promise<CuentaAhorro[]>((resolve, reject) => {
      this._serCuentasAhorro.obtenerCuentasAhorro().subscribe(
        (cuentasAhorro: CuentaAhorro[]) => {
          resolve(cuentasAhorro);
        },
        (err: HttpErrorResponse) => {
          reject({ titulo: err.error.titulo, detalles: err.error.detalles });
        }
      );
    })
  }

  existeNumeroCuenta(cuentas: CuentaAhorro[], cuentaACrear: CuentaAhorro) {
    return new Promise<void>((resolve, reject) => {
      const cuentaExistente = cuentas.find(cuenta => {
        return String(cuenta.numeroCuenta) == String(cuentaACrear.numeroCuenta)
      })
      if (cuentaExistente) reject({ titulo: 'Este número de cuenta ya existe', detalles: 'por favor, selecciona otro número' });
      else resolve();
    })

  }


  cerrarModal() {
    this.referenciaModal.close();
  }

}
