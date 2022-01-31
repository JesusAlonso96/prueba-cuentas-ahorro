import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource } from '@angular/material/table';
import { TiposAlertas } from 'src/app/compartidos/enumeraciones/tipos-alertas.enum';
import { Cliente } from 'src/app/compartidos/modelos/cliente.model';
import { CargandoService } from 'src/app/nucleo/servicios/cargando.service';
import { ClientesService } from 'src/app/nucleo/servicios/clientes.service';
import { NotificacionesService } from 'src/app/nucleo/servicios/notificaciones.service';
import { AltaClienteComponent } from './alta-cliente/alta-cliente.component';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';

@Component({
  selector: 'tecas-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.scss']
})
export class ClientesComponent implements OnInit {
  @ViewChild('listaClientes') listaClientes: ListadoClientesComponent;
  clientes: Cliente[] = [];
  TiposAlertas = TiposAlertas;
  cargando: boolean = false;
  constructor(
    private _serCargando: CargandoService,
    private _serClientes: ClientesService,
    private _serNotificaciones: NotificacionesService,
    private modal: MatDialog
  ) { }

  async ngOnInit() {
    try {
      this.cargando = this._serCargando.abrirVistaCargando(true, 'Cargando clientes...');
      this.clientes = await this.obtenerClientesActivos();
      this.cargando = this._serCargando.abrirVistaCargando(false);
    } catch (error) {
      this.cargando = this._serCargando.abrirVistaCargando(false);
      this._serNotificaciones.mostrarNotificacionError(`${error.titulo}, ${error.detalles}.`)
    }
  }

  //METODO PARA OBTENER LOS CLIENTES ACTIVOS ACTUALMENTE 
  obtenerClientesActivos() {
    return new Promise<Cliente[]>((resolve, reject) => {
      this._serClientes.obtenerClientes(true,'').subscribe(
        (clientes: Cliente[]) => {
          resolve(clientes)
        },
        (err: HttpErrorResponse) => {
          reject({ titulo: err.error.titulo, detalles: err.error.detalles });
        }
      );
    })
  }

  //METODO PARA ABRIR EL MODAL DE ALTA DE CLIENTE
  abrirAltaCliente() {
    this.modal.open(AltaClienteComponent)
      .afterClosed()
      .subscribe(
        (nuevoCliente: Cliente) => {
          //SI EL NUEVO CLIENTE FUE CREADO SE AGREGARÁ A LA LISTA DE CLIENTES
          if (nuevoCliente) {
            this.clientes.push(nuevoCliente);
            this.listaClientes.inicializarTabla();
            this._serNotificaciones.mostrarNotificacionExito(`El cliente ${nuevoCliente.nombre} ${nuevoCliente.apellido_paterno} ${nuevoCliente.apellido_materno ? nuevoCliente.apellido_materno : ''} fue agregado exitosamente`, 4000)
          }
        }
      )
  }


}
