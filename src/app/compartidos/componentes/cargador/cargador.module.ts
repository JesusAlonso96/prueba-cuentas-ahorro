import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CargadorComponent } from './cargador.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [CargadorComponent],
  exports: [CargadorComponent],
  imports: [
    CommonModule,
    MatProgressSpinnerModule
  ]
})
export class CargadorModule { }
