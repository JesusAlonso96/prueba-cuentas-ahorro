import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(private _serAutenticacion: AutenticacionService) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const token = this._serAutenticacion.obtenerToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      })
    }
    return next.handle(request);
  }
}
