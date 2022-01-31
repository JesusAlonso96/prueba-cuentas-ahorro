import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login.component';


const loginRutas: Routes = [
  {
    path: '',
    component: LoginComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(loginRutas)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
