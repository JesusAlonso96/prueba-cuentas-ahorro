import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FechaConHoraPipe } from './fecha-con-hora.pipe';



@NgModule({
  declarations: [
    FechaConHoraPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    FechaConHoraPipe
  ]
})
export class PipesModule { }
