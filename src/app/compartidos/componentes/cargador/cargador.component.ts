import { Component, Input, OnInit } from '@angular/core';
import { Animaciones } from '../../constantes/animaciones.constant';

@Component({
  selector: 'tecas-cargador',
  templateUrl: './cargador.component.html',
  styleUrls: ['./cargador.component.scss'],
  animations: [Animaciones.carga]
})
export class CargadorComponent implements OnInit {
  @Input() cargando: boolean;
  @Input() mensaje: string;

  constructor() { }

  ngOnInit(): void {
  }

}
