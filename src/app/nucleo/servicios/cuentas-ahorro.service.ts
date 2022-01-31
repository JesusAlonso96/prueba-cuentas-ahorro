import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CuentaAhorro } from 'src/app/compartidos/modelos/cuenta-ahorro.model';
import { AutenticacionService } from './autenticacion.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CuentasAhorroService {

  constructor(private clienteHttp: HttpClient,
    private _serAutenticacion: AutenticacionService) { }


  /* METODO PARA OBTENER LAS CUENTAS DE AHORRO */
  //GET
  public obtenerCuentasAhorro(): Observable<any> {
    return this.clienteHttp.get(`https://mibanco-333616-default-rtdb.firebaseio.com/cuentaAhorro/${this._serAutenticacion.obtenerIdUsuarioToken()}.json?auth=${this._serAutenticacion.obtenerToken()}`)
    .pipe(
      map((respuesta: any)=>{
        let cuentasAhorro: CuentaAhorro[] = [];
        let llavesRespuesta = Object.keys(respuesta);
        llavesRespuesta.forEach(llave=>{
          cuentasAhorro.push(respuesta[llave])
        })
        return cuentasAhorro;
      })
    )
  }

  /* METODO PARA CREAR CUENTA DE AHORRO */
  //POST
  public guardarCuentaAhorro(cuentaAhorro: CuentaAhorro): Observable<any> {
    return this.clienteHttp.post(`https://mibanco-333616-default-rtdb.firebaseio.com/cuentaAhorro/${this._serAutenticacion.obtenerIdUsuarioToken()}.json?auth=${this._serAutenticacion.obtenerToken()}`, cuentaAhorro)
  }

}
