import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { InicioSesion } from 'src/app/compartidos/modelos/inicio-sesion.model';
import { AutenticacionService } from 'src/app/nucleo/servicios/autenticacion.service';
import { NotificacionesService } from 'src/app/nucleo/servicios/notificaciones.service';

@Component({
  selector: 'tecas-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  //VARIABLE PARA MOSTRAR U OCULTAR LA CONTRASEÑA
  mostrarContrasena: boolean = false;
  //VARIABLE PARA EL FORMULARIO DE INICIO DE SESION
  formularioLogin: FormGroup;
  //VARIABLE PARA CONTROLAR LA PETICIÓN DE INICIO DE SESION
  cargando: boolean = false;
  constructor(
    private enrutador: Router,
    private _serNotificaciones: NotificacionesService,
    private _serAutenticacion: AutenticacionService
  ) { }

  ngOnInit(): void {
    this.inicializarFormulario();
  }

  //METODO PARA INICIALIZAR EL FORMULARIO DE INICIO DE SESION
  inicializarFormulario(): void {
    this.formularioLogin = new FormGroup({
      correo: new FormControl('', [Validators.required, Validators.email]),
      contrasena: new FormControl('', [Validators.required])
    });
  }

  mostrarOcultarContrasena(): void {
    this.mostrarContrasena = !this.mostrarContrasena;
  }

  //METODO PARA GENERA TOKEN DE SESIÓN
  iniciarSesion(): void {
    let datosInicioSesion: InicioSesion = new InicioSesion(this.formularioLogin.get('correo').value, this.formularioLogin.get('contrasena').value, true);
    this.cargando = true;
    this._serAutenticacion.iniciarSesion(datosInicioSesion).subscribe(
      (respuesta: any) => {
        this.cargando = false;
        this._serNotificaciones.mostrarNotificacionExito('Bienvenido', 4000);
        this.enrutador.navigate(['/inicio/clientes'])
        //ENRUTAR AL ENVOLTORIO PRINCIPAL
      },
      (err: HttpErrorResponse) => {
        this.cargando = false;
        this._serNotificaciones.mostrarNotificacionError('Correo y/o contraseña errones', 4000);
      }
    );

  }
}
