import { Pipe, PipeTransform } from '@angular/core';
import * as momento from 'moment';

@Pipe({
  name: 'fechaConHora'
})
export class FechaConHoraPipe implements PipeTransform {

  transform(fecha: Date): unknown {
    return fecha ? momento(fecha).locale('es').format('DD/MM/YY, h:mm:ss a'): '-';
  }

}
