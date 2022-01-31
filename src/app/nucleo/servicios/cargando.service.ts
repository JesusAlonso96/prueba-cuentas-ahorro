import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CargandoService {
  private emitirEventoCargando = new BehaviorSubject<any>({cargando: false, mensaje: ''});
  eventoEmitido$ = this.emitirEventoCargando.asObservable();

  constructor() { }

  abrirVistaCargando(cargando: boolean, mensaje?: string): boolean{
    this.emitirEventoCargando.next({cargando,mensaje});
    return cargando;
  }
}
