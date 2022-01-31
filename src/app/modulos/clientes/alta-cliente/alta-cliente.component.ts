import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ExpresionesRegulares } from 'src/app/compartidos/constantes/expresiones-regulares.constant';
import { Generos } from 'src/app/compartidos/enumeraciones/generos.enum';
import { Cliente } from 'src/app/compartidos/modelos/cliente.model';
import { Direccion } from 'src/app/compartidos/modelos/direccion.model';
import { CargandoService } from 'src/app/nucleo/servicios/cargando.service';
import { ClientesService } from 'src/app/nucleo/servicios/clientes.service';
import { NotificacionesService } from 'src/app/nucleo/servicios/notificaciones.service';

@Component({
  selector: 'tecas-alta-cliente',
  templateUrl: './alta-cliente.component.html',
  styleUrls: ['./alta-cliente.component.scss']
})
export class AltaClienteComponent implements OnInit {
  //VARIABLE PARA CONTROLAR EL FORMULARIO DEL CLIENTE
  formularioCliente: FormGroup;
  direccion: FormGroup;
  //VARIABLE PARA MOSTRAR LOS ERRORES DE LAS EXPRESIONES REGULARES EN EL TEMPLATE
  ExpresionesRegulares = ExpresionesRegulares;
  //ENUMERACION PARA LOS GENEROS
  Generos = Generos;
  //VARIABLE DE CARGA
  cargando: boolean = false;
  constructor(
    private _serNotificaciones: NotificacionesService,
    private _serClientes: ClientesService,
    private _serCargando: CargandoService,
    private constructorFormularios: FormBuilder,
    public referenciaModal: MatDialogRef<AltaClienteComponent>,
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  //METODO PARA INICIALIZAR EL FORMULARIO DE CLIENTE
  inicializarFormulario(): void {
    this.direccion = this.constructorFormularios.group({
      calle: ['', [Validators.required, Validators.pattern(ExpresionesRegulares[2].expresion)]],
      colonia: ['', [Validators.required, Validators.pattern(ExpresionesRegulares[2].expresion)]],
      numeroExterior: ['', [Validators.required, Validators.pattern(ExpresionesRegulares[3].expresion)]],
      numeroInterior: ['', [Validators.pattern(ExpresionesRegulares[3].expresion)]],
      estado: ['', [Validators.required, Validators.pattern(ExpresionesRegulares[4].expresion)]],
      ciudad: ['', [Validators.pattern(ExpresionesRegulares[4].expresion)]],
      cp: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(5), Validators.pattern(ExpresionesRegulares[1].expresion)]],
      referencias: ['', [Validators.pattern(ExpresionesRegulares[5].expresion)]]
    })
    this.formularioCliente = this.constructorFormularios.group({
      nombre: new FormControl('', [Validators.required, Validators.pattern(ExpresionesRegulares[0].expresion)]),
      apellido_paterno: ['', [Validators.required, Validators.pattern(ExpresionesRegulares[0].expresion)]],
      apellido_materno: ['', [Validators.pattern(ExpresionesRegulares[0].expresion)]],
      id: ['', [Validators.required, Validators.pattern(ExpresionesRegulares[1].expresion)]],
      direccion: this.direccion,
      edad: ['', [Validators.required, Validators.maxLength(3), Validators.pattern(ExpresionesRegulares[1].expresion)]],
      genero: ['', Validators.required]
    })
  }


  //METODO PARA CERRAR EL MODAL SIN EL CLIENTE CREADO
  cerrarModal() {
    this.referenciaModal.close();
  }

  //METODO PARA GUARDAR EL CLIENTE
  guardarCliente() {
    this.cargando = this._serCargando.abrirVistaCargando(true, 'Guardando cliente...');
    this._serClientes.guardarCliente(this.crearObjectoCliente()).subscribe(
      (clienteGuardado: Cliente) => {
        this.cargando = this._serCargando.abrirVistaCargando(false);
        this.referenciaModal.close(clienteGuardado);
      },
      (err: HttpErrorResponse) => {
        this.cargando = this._serCargando.abrirVistaCargando(false);
        this._serNotificaciones.mostrarNotificacionError(`${err.error.titulo}, ${err.error.detalles}.`, 4000);
      }
    );
  }

  //METODO PARA CREAR EL OBJETO DE CLIENTE
  crearObjectoCliente(): Cliente {
    let cliente: Cliente = new Cliente();
    cliente.nombre = this.formularioCliente.get('nombre').value;
    cliente.apellido_paterno = this.formularioCliente.get('apellido_paterno').value;
    cliente.apellido_materno = this.formularioCliente.get('apellido_materno').value;
    cliente.idC = this.formularioCliente.get('id').value;
    cliente.edad = this.formularioCliente.get('edad').value;
    cliente.genero = this.formularioCliente.get('genero').value;
    cliente.direccion = new Direccion();
    cliente.direccion.calle = this.direccion.get('calle').value;
    cliente.direccion.colonia = this.direccion.get('colonia').value;
    cliente.direccion.numeroExterior = this.direccion.get('numeroExterior').value;
    cliente.direccion.numeroInterior = this.direccion.get('numeroInterior').value;
    cliente.direccion.estado = this.direccion.get('estado').value;
    cliente.direccion.ciudad = this.direccion.get('ciudad').value;
    cliente.direccion.cp = this.direccion.get('cp').value;
    cliente.direccion.referencias = this.direccion.get('referencias').value;
    return cliente;
  }
}
