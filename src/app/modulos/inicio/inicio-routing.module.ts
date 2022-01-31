import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InicioComponent } from './inicio.component';


const inicioRutas: Routes = [
  {
    path: '',
    component: InicioComponent,
    children: [
      {
        path: 'clientes',
        loadChildren: () => import('../clientes/clientes.module')
          .then(m => m.ClientesModule)
      },
      {
        path: 'cuentas-ahorro',
        loadChildren: () => import('../cuentas-ahorro/cuentas-ahorro.module')
          .then(m => m.CuentasAhorroModule)
      },
      {
        path: 'transacciones',
        loadChildren: () => import('../transacciones/transacciones.module')
          .then(m => m.TransaccionesModule)
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(inicioRutas)],
  exports: [RouterModule]
})
export class InicioRoutingModule { }
