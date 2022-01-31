import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { delay } from 'rxjs/operators';
import { Animaciones } from 'src/app/compartidos/constantes/animaciones.constant';
import { MenusPorDefecto } from 'src/app/compartidos/constantes/menus.constant';
import { Menu } from 'src/app/compartidos/modelos/menu.model';
import { AutenticacionService } from 'src/app/nucleo/servicios/autenticacion.service';
import { CargandoService } from 'src/app/nucleo/servicios/cargando.service';
import { NotificacionesService } from 'src/app/nucleo/servicios/notificaciones.service';

@Component({
  selector: 'tecas-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.scss'],
  animations: [Animaciones.animacionMenuLateral]
})
export class InicioComponent implements OnInit {
  //VARIABLES Y EVENTO PARA CONTROLAR EL ALTO DEL MENÚ LATERAL
  @HostListener('window:resize', ['$event'])
  cambioPantalla(event) {
    this.altoPantalla = window.innerHeight;
  }
  altoPantalla: number = window.innerHeight;
  //VARIABLES DE CONTROL PARA EL MENÚ LATERAL
  menuLateralColapsado: boolean = true;

  //VARIABLES PARA EL CONTROL DE LOS MULTIPLES MENÚS DEL SISTEMA
  menus: Menu[] = MenusPorDefecto;
  //VARIABLE PARA CONTROLAR LA VISTA DE CARGANDO
  cargando = {
    cargando: false,
    mensaje: ''
  };
  constructor(
    private _serNotificaciones: NotificacionesService,
    private _serAutenticacion: AutenticacionService,
    private _serCargando: CargandoService,
    private enrutador: Router) {
    this.escucharCambioCargando();
  }

  ngOnInit(): void {
    document.body.style.overflow = 'hidden';
  }

  //METODO QUE CONTROLA QUE MENÚ ESTA ACTIVO ACTUALMENTE
  estaMenuActivo(menu: Menu) {
    return this.enrutador.url.indexOf(menu.ruta) != -1;
  }

  obtenerMenuActivo(): Menu {
    return this.menus.find(menu => {
      return this.estaMenuActivo(menu);
    })
  }

  //METODO PARA ESCUCHAR EL EVENTO DE CARGANDO
  escucharCambioCargando() {
    this._serCargando.eventoEmitido$
      .pipe(delay(0))
      .subscribe(
        (cargando: { cargando: boolean, mensaje: string }) => {
          this.cargando.cargando = cargando.cargando;
          this.cargando.mensaje = cargando.mensaje ? cargando.mensaje : '';
        }
      );
  }

  //METODO PARA CERRAR SESIÓN
  cerrarSesion(){
    this._serAutenticacion.cerrarSesion();
    this._serNotificaciones.mostrarNotificacionExito('Sesión cerrada exitosamente', 4000);
  }

}
