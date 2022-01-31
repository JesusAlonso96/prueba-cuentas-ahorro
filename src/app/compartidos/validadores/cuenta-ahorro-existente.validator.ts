import { AbstractControl, ValidationErrors } from '@angular/forms';
import { CuentaAhorro } from '../modelos/cuenta-ahorro.model';

export function validadorCuentaAhorroExistente(cuentasAhorro: CuentaAhorro[], idCliente: number) {

    return (control: AbstractControl): ValidationErrors | null => {
        const indice = cuentasAhorro.findIndex(cuentaAhorro => {
            return String(cuentaAhorro.numeroCuenta) == String(control.value) && Number(cuentaAhorro.idCliente) == idCliente;
        });
        if (indice != -1) return { existente: true }
        else return null;
    }

}