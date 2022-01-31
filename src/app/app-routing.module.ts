import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AutenticacionInicioGuard } from './nucleo/guardias/autenticacion-inicio.guard';
import { AutenticacionGuard } from './nucleo/guardias/autenticacion.guard';


const rutas: Routes = [
  {
    path: 'inicio',
    canActivate: [AutenticacionInicioGuard],
    loadChildren: () => import('./modulos/inicio/inicio.module')
      .then(m => m.InicioModule)
  },
  {
    path: 'login',
    canActivate: [AutenticacionGuard],
    loadChildren: () => import('./modulos/login/login.module')
      .then(m => m.LoginModule)
  },
  { path: '', redirectTo: '/login', pathMatch: "full" },

];

@NgModule({
  imports: [RouterModule.forRoot(rutas, {
    preloadingStrategy: PreloadAllModules
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
