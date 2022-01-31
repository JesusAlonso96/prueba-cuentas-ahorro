import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlertasComponent } from './alertas.component';
import { MatIconModule } from '@angular/material/icon';



@NgModule({
  declarations: [AlertasComponent],
  exports: [AlertasComponent],
  imports: [
    CommonModule,
    MatIconModule
  ]
})
export class AlertasModule { }
