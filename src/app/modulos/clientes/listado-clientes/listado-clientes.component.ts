import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OpcionesTamanoPaginador } from 'src/app/compartidos/constantes/opciones-tamano-paginador.constant';
import { Generos } from 'src/app/compartidos/enumeraciones/generos.enum';
import { PaginadorPersonalizado } from 'src/app/compartidos/material/paginador-personalizado';
import { Cliente } from 'src/app/compartidos/modelos/cliente.model';

@Component({
  selector: 'tecas-listado-clientes',
  templateUrl: './listado-clientes.component.html',
  styleUrls: ['./listado-clientes.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: PaginadorPersonalizado('Clientes') }
  ]
})
export class ListadoClientesComponent implements OnInit{
  @Input() clientes: Cliente[];
  //VARIABLE QUE CONTROLA EL PAGINADOR
  @ViewChild(MatPaginator, { static: false }) paginador: MatPaginator;
  OpcionesTamanoPaginador = OpcionesTamanoPaginador;
  //VARIABLE PARA COLUMNAS DE TABLA
  columnasTabla: string[] = ['id', 'nombre_completo', 'direccion', 'edad_genero', 'fecha'];
  tablaClientes: MatTableDataSource<Cliente>;
  constructor() { }
  
  ngOnInit(): void {
    this.inicializarTabla();
  }

  //METODO PARA INICIALIZAR LA TABLA DE CLIENTES
  inicializarTabla() {
    setTimeout(() => {
      this.tablaClientes = new MatTableDataSource<Cliente>(this.clientes);
    this.tablaClientes.paginator = this.paginador;
    }, 500);
  }


  //METODO PARA VISUALIZAR EL GENERO DEL CLIENTE
  mostrarGeneroCliente(cliente: Cliente) {
    switch (cliente.genero) {
      case Generos.Masculino: return 'Masculino';
      case Generos.Femenino: return 'Femenino';
    }
  }
}


