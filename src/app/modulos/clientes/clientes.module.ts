import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { AlertasModule } from 'src/app/compartidos/componentes/alertas/alertas.module';
import { AltaClienteComponent } from './alta-cliente/alta-cliente.component';
import { ClientesRoutingModule } from './clientes-routing.module';
import { ClientesComponent } from './clientes.component';
import { ListadoClientesComponent } from './listado-clientes/listado-clientes.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NotificacionesModule } from 'src/app/compartidos/componentes/notificaciones/notificaciones.module';
import { PipesModule } from 'src/app/compartidos/pipes/pipes.module';



@NgModule({
  declarations: [
    ClientesComponent,
     AltaClienteComponent,
     ListadoClientesComponent
    ],
  imports: [
    CommonModule,
    ClientesRoutingModule,
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
    MatProgressSpinnerModule,
    AlertasModule,
    NotificacionesModule.forRoot(),
    PipesModule
  ]
})
export class ClientesModule { }
