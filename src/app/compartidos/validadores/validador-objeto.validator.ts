import { AbstractControl } from "@angular/forms";



export function validadorObjeto(control: AbstractControl) {
    if(typeof control.value === 'string') return {invalido:true}
    else return null;
}