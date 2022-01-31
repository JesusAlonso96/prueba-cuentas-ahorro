import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorIntl } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { OpcionesTamanoPaginador } from 'src/app/compartidos/constantes/opciones-tamano-paginador.constant';
import { TiposAlertas } from 'src/app/compartidos/enumeraciones/tipos-alertas.enum';
import { PaginadorPersonalizado } from 'src/app/compartidos/material/paginador-personalizado';
import { Transaccion } from 'src/app/compartidos/modelos/transaccion.model';

@Component({
  selector: 'tecas-listado-transacciones',
  templateUrl: './listado-transacciones.component.html',
  styleUrls: ['./listado-transacciones.component.scss'],
  providers: [
    { provide: MatPaginatorIntl, useValue: PaginadorPersonalizado('Transacciones') }
  ]
})
export class ListadoTransaccionesComponent implements OnInit {
  @Input() transacciones: Transaccion[] = [];
  //VARIABLE QUE CONTROLA EL PAGINADOR
  @ViewChild(MatPaginator, { static: false }) paginador: MatPaginator;
  OpcionesTamanoPaginador = OpcionesTamanoPaginador;

  //VARIABLE PARA COLUMNAS DE TABLA
  columnasTabla: string[] = ['tipo', 'numero_cuenta', 'fechaUltimaAct', /**'monto',*/'total'];
  tablaTransacciones: MatTableDataSource<Transaccion>;
  TiposAlertas = TiposAlertas;
  constructor() { }

  ngOnInit(): void {
    this.inicializarTabla();
  }

  //METODO PARA INICIALIZAR LA TABLA DE CLIENTES
  inicializarTabla() {
    setTimeout(() => {
      this.tablaTransacciones = new MatTableDataSource<Transaccion>(this.transacciones);
      this.tablaTransacciones.paginator = this.paginador;
      this.tablaTransacciones.filterPredicate = (transaccion: Transaccion, filtro: string) => {
        return String(transaccion.numeroCuenta).trim().toLowerCase() == filtro.trim().toLowerCase();
      }
    }, 500);
  }


  //METODO PARA FILTRAR INFORMACIÓN
  aplicarFiltro(evento: Event) {
    const filtro = (evento.target as HTMLInputElement).value;
    this.tablaTransacciones.filter = filtro.trim().toLowerCase();
  }

  obtenerTotalTransacciones() {
    const totalDepositos: number = this.obtenerTotalPorTipoMovimiento('Deposito');
    const totalRetiros: number = this.obtenerTotalPorTipoMovimiento('Retiro');
    return totalDepositos - totalRetiros;
  }

  obtenerTotalPorTipoMovimiento(tipo: string): number {
    return this.tablaTransacciones ?
      this.tablaTransacciones.filteredData.filter(transaccion => {
        return String(transaccion.tipo).trim().toLowerCase() == String(tipo).trim().toLowerCase();
      })
        .map(transaccion => Number(transaccion.monto))
        .reduce((acumulador, cantidad) => { return acumulador + cantidad }, 0)
      : 0;
  }
}
