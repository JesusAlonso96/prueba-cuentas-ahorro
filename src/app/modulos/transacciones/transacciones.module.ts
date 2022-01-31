import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
import { AlertasModule } from 'src/app/compartidos/componentes/alertas/alertas.module';
import { NotificacionesModule } from 'src/app/compartidos/componentes/notificaciones/notificaciones.module';
import { PipesModule } from 'src/app/compartidos/pipes/pipes.module';
import { AltaTransaccionComponent } from './alta-transaccion/alta-transaccion.component';
import { ListadoTransaccionesComponent } from './listado-transacciones/listado-transacciones.component';
import { TransaccionesRoutingModule } from './transacciones-routing.module';
import { TransaccionesComponent } from './transacciones.component';



@NgModule({
  declarations: [
    TransaccionesComponent,
    ListadoTransaccionesComponent,
    AltaTransaccionComponent
  ],
  imports: [
    CommonModule,
    TransaccionesRoutingModule,
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
    AlertasModule,
    NotificacionesModule.forRoot(),
    PipesModule
  ]
})
export class TransaccionesModule { }
