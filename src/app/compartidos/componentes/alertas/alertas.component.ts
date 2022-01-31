import { Component, Input, OnInit } from '@angular/core';
import { TiposAlertas } from '../../enumeraciones/tipos-alertas.enum';

@Component({
  selector: 'tecas-alertas',
  templateUrl: './alertas.component.html',
  styleUrls: ['./alertas.component.scss']
})
export class AlertasComponent implements OnInit {
  @Input() tipo: TiposAlertas;
  @Input() mensaje: string;
  constructor() { }

  ngOnInit(): void {
  }

  obtenerTipoDeAlerta(){
    switch(this.tipo){
      case TiposAlertas.Exito: return 'alerta-exito';
      case TiposAlertas.Error: return 'alerta-error';
      case TiposAlertas.Advertencia: return 'alerta-advertencia';
      case TiposAlertas.Informacion: return 'alerta-info';
      default: 'alerta-info';
    }
  }

  obtenerIconoAlerta() {
    switch (this.tipo) {
      case TiposAlertas.Exito: return 'done';
      case TiposAlertas.Informacion: return 'help_outline';
      case TiposAlertas.Advertencia: return 'warning_amber';
      case TiposAlertas.Error: return 'error_outlined';
      default: 'help_outline';
    }
  }

}
