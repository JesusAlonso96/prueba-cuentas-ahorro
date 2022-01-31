import { HttpHeaders } from '@angular/common/http';

const httpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

export const AjustesAplicacion = {
    APIEndpoint: 'http://localhost:5529/api/v1',
    Opciones: {
        headers: httpHeaders
    }
}