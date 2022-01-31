import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AutenticacionService } from '../servicios/autenticacion.service';

@Injectable({
  providedIn: 'root'
})
export class AutenticacionInicioGuard implements CanActivate {

  constructor(
    private _serAutenticacion: AutenticacionService,
    private enrutador: Router) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this._serAutenticacion.obtenerToken()) {
      this.enrutador.navigate(['/login']);
      return false;
    } else {
      if(this._serAutenticacion.estaAutenticado()) return true;
      else{
        this.enrutador.navigate(['/login']);
        return false;
      }
    }
  }

}
