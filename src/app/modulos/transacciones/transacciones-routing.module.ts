import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TransaccionesComponent } from './transacciones.component';


const transaccionesRutas: Routes = [
  {
    path:'',
    component: TransaccionesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(transaccionesRutas)],
  exports: [RouterModule]
})
export class TransaccionesRoutingModule { }
