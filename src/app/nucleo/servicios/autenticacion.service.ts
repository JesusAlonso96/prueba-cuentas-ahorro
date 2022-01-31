import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/internal/Observable';
import { InicioSesion } from 'src/app/compartidos/modelos/inicio-sesion.model';
import { map } from 'rxjs/operators';
import * as momento from 'moment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Token } from 'src/app/compartidos/modelos/token.model';
import { Router } from '@angular/router';
const jwt = new JwtHelperService();

@Injectable({
  providedIn: 'root'
})
export class AutenticacionService {
  private tokenDesencriptado: Token;

  constructor(private clienteHttp: HttpClient,
    private enrutador: Router) {
    this.tokenDesencriptado = jwt.decodeToken(localStorage.getItem('auth_token'));
   }

  /* METODO PARA VERIFICAR LOGIN */
  public iniciarSesion(datosInicioSesion: InicioSesion): Observable<any> {
    return this.clienteHttp.post('https://www.googleapis.com/identitytoolkit/v3/relyingparty/verifyPassword?key=AIzaSyB-p8CKoaQr097NJ8YJRpoWpezJj5xRRUI', datosInicioSesion)
    .pipe(
      map((respuesta: any) => {
        this.guardarToken(respuesta.idToken)
      })
    );
  }

  /* METODOS GENERALES */
  private guardarToken(token: string) {
    this.tokenDesencriptado = jwt.decodeToken(token);
    localStorage.setItem('auth_token', token);
    return token;
  }

  public obtenerToken(){
    return localStorage.getItem('auth_token');
  }

  public obtenerTokenDesencriptado() {
    return this.tokenDesencriptado;
  }

  public obtenerIdUsuarioToken(){
    return this.tokenDesencriptado.user_id;
  }

  private obtenerExpiracionToken() {
    return momento.unix(this.tokenDesencriptado.exp);
  }

  public estaAutenticado(): boolean {
    return momento().isBefore(this.obtenerExpiracionToken());
  }

  public destruirToken() {
    localStorage.removeItem('token_aut');
    this.tokenDesencriptado = new Token();
  }

  public cerrarSesion(){
    this.destruirToken();
    this.enrutador.navigate(['/login']);
  }

}
