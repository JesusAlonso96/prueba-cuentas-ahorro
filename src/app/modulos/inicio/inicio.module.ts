import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InicioRoutingModule } from './inicio-routing.module';
import { InicioComponent } from './inicio.component';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BarraDeHerramientasComponent } from './barra-de-herramientas/barra-de-herramientas.component';
import { NotificacionesModule } from 'src/app/compartidos/componentes/notificaciones/notificaciones.module';
import { CargadorModule } from 'src/app/compartidos/componentes/cargador/cargador.module';


@NgModule({
  declarations: [
    InicioComponent, 
    BarraDeHerramientasComponent
  ],
  imports: [
    CommonModule,
    InicioRoutingModule,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatToolbarModule,
    CargadorModule,
    NotificacionesModule.forRoot()
  ]
})
export class InicioModule { }
