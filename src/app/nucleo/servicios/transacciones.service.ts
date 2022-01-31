import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Transaccion } from 'src/app/compartidos/modelos/transaccion.model';
import { AutenticacionService } from './autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class TransaccionesService {

  constructor(private clienteHttp: HttpClient,
    private _serAutenticacion: AutenticacionService) { }

  /* METODO PARA OBTENER LAS TRANSACCIONES */
  //GET
  public obtenerTransacciones(): Observable<any> {
    return this.clienteHttp.get(`https://mibanco-333616-default-rtdb.firebaseio.com/transacciones/${this._serAutenticacion.obtenerIdUsuarioToken()}.json?auth=${this._serAutenticacion.obtenerToken()}`)
      .pipe(
        map((respuesta: any) => {
          let transacciones: Transaccion[] = [];
          let llavesRespuesta = Object.keys(respuesta);
          llavesRespuesta.forEach(llave => {
            transacciones.push(respuesta[llave])
          })
          return transacciones;
        })
      )
  }

  /* METODO PARA CREAR UNA TRANSACCION */
  //POST
  public guardarTransaccion(cuentaAhorro: Transaccion): Observable<any> {
    return this.clienteHttp.post(`https://mibanco-333616-default-rtdb.firebaseio.com/transacciones/${this._serAutenticacion.obtenerIdUsuarioToken()}.json?auth=${this._serAutenticacion.obtenerToken()}`, cuentaAhorro)
  }
}
