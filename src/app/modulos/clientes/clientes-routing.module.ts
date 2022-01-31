import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes.component';


const clientesRutas: Routes = [
  {
    path: '',
    component: ClientesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(clientesRutas)],
  exports: [RouterModule]
})
export class ClientesRoutingModule { }
