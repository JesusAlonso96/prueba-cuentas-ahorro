import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CuentasAhorroComponent } from './cuentas-ahorro.component';


const cuentasAhorroRutas: Routes = [
  {
    path: '',
    component: CuentasAhorroComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(cuentasAhorroRutas)],
  exports: [RouterModule]
})
export class CuentasAhorroRoutingModule { }
