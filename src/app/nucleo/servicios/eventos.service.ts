import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { NotificacionReferencia } from 'src/app/compartidos/componentes/notificaciones/notificacion-referencia';

@Injectable({
  providedIn: 'root'
})
export class EventosService {

  private notificacionCerradaEvento = new Subject<any>();
  public notificacionCerradaEventoObservable$ = this.notificacionCerradaEvento.asObservable();
  
  constructor() { }

  public notificacionCerrada(referencia: NotificacionReferencia){
    this.notificacionCerradaEvento.next(referencia);
  }
}
