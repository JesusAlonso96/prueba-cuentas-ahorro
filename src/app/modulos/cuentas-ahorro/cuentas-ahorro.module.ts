import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CuentasAhorroRoutingModule } from './cuentas-ahorro-routing.module';
import { CuentasAhorroComponent } from './cuentas-ahorro.component';
import { AltaCuentaAhorroComponent } from './alta-cuenta-ahorro/alta-cuenta-ahorro.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { AlertasModule } from 'src/app/compartidos/componentes/alertas/alertas.module';
import { NotificacionesModule } from 'src/app/compartidos/componentes/notificaciones/notificaciones.module';
import { PipesModule } from 'src/app/compartidos/pipes/pipes.module';
import { ListadoCuentasAhorroComponent } from './listado-cuentas-ahorro/listado-cuentas-ahorro.component';


@NgModule({
  declarations: [
    CuentasAhorroComponent, 
    AltaCuentaAhorroComponent, 
    ListadoCuentasAhorroComponent
  ],
  imports: [
    CommonModule,
    CuentasAhorroRoutingModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatAutocompleteModule,
    MatProgressSpinnerModule,
    MatSortModule,
    AlertasModule,
    NotificacionesModule.forRoot(),
    PipesModule
  ]
})
export class CuentasAhorroModule { }
