import {
  HttpEvent, HttpHandler, HttpInterceptor, HttpRequest
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Injectable()
export class ErrorAutenticacionInterceptor implements HttpInterceptor {

  constructor(private _serAutenticacion: AutenticacionService) {
  }


  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request).pipe(catchError(err => {
      if (err.status === 401) {
        this._serAutenticacion.cerrarSesion();
      }
      return throwError(err);
    }));
  }
}
