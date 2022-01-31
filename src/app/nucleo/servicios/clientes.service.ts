import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AjustesAplicacion } from 'src/app/compartidos/constantes/ajustes-aplicacion';
import { Cliente } from 'src/app/compartidos/modelos/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClientesService {

  constructor(private clienteHttp: HttpClient) { }

  //GET
  public obtenerClientesPorId(idCliente: number): Observable<Cliente[]> {
    return <Observable<Cliente[]>>this.clienteHttp.get(AjustesAplicacion.APIEndpoint + `/clientes/${idCliente}`, AjustesAplicacion.Opciones);
  }

  public obtenerClientes(activo: boolean, filtro: string): Observable<Cliente[]> {
    return <Observable<Cliente[]>>this.clienteHttp.get(AjustesAplicacion.APIEndpoint + `/clientes?activo=${activo}&filtro=${filtro}`, AjustesAplicacion.Opciones);
  }

  //POST
  public guardarCliente(cliente: Cliente): Observable<Cliente> {
    return <Observable<Cliente>>this.clienteHttp.post(AjustesAplicacion.APIEndpoint + `/clientes`, cliente, AjustesAplicacion.Opciones);
  }
}
