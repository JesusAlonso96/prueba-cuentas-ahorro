import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OpcionesTamanoPaginador } from 'src/app/compartidos/constantes/opciones-tamano-paginador.constant';
import { TiposAlertas } from 'src/app/compartidos/enumeraciones/tipos-alertas.enum';
import { PaginadorPersonalizado } from 'src/app/compartidos/material/paginador-personalizado';
import { CuentaAhorro } from 'src/app/compartidos/modelos/cuenta-ahorro.model';

@Component({
  selector: 'tecas-listado-cuentas-ahorro',
  templateUrl: './listado-cuentas-ahorro.component.html',
  styleUrls: ['./listado-cuentas-ahorro.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: PaginadorPersonalizado('Cuentas de ahorro') }
  ]
})
export class ListadoCuentasAhorroComponent implements OnInit {
  @Input() cuentasAhorro: CuentaAhorro[] = [];
  //VARIABLE QUE CONTROLA EL PAGINADOR
  @ViewChild(MatPaginator, { static: false }) paginador: MatPaginator;
  OpcionesTamanoPaginador = OpcionesTamanoPaginador;

  //VARIABLE PARA COLUMNAS DE TABLA
  columnasTabla: string[] = ['numero_cuenta', 'id_cliente', /**'saldo', */ 'fechaUltimaAct', 'estado'];
  tablaCuentas: MatTableDataSource<CuentaAhorro>;
  TiposAlertas = TiposAlertas;
  constructor() { }

  ngOnInit(): void {
    this.inicializarTabla();
  }

  //METODO PARA INICIALIZAR LA TABLA DE CLIENTES
  inicializarTabla() {
    setTimeout(() => {
      this.tablaCuentas = new MatTableDataSource<CuentaAhorro>(this.cuentasAhorro);
      this.tablaCuentas.paginator = this.paginador;
    }, 500);
  }


  //METODO PARA FILTRAR INFORMACIÓN
  aplicarFiltro(evento: Event) {
    const valorFiltrado = (evento.target as HTMLInputElement).value;
    this.tablaCuentas.filter = valorFiltrado.trim().toLowerCase();
  }
}
