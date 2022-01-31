import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Menu } from 'src/app/compartidos/modelos/menu.model';

@Component({
  selector: 'tecas-barra-de-herramientas',
  templateUrl: './barra-de-herramientas.component.html',
  styleUrls: ['./barra-de-herramientas.component.scss']
})
export class BarraDeHerramientasComponent implements OnInit {
  @Input() menuActivo: Menu;
  @Output() cerrarSesionEvento = new EventEmitter(true);
  constructor() { }

  ngOnInit(): void {
  }

  cerrarSesion() {
    this.cerrarSesionEvento.emit();
  }

}
