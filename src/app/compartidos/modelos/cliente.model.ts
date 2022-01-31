import { Generos } from "../enumeraciones/generos.enum";
import { Direccion } from "./direccion.model";

export class Cliente {
    id: number;
    idC: number | string;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    direccion: Direccion;
    edad: number | string;
    genero: Generos;
    fechaRegistro?: Date;
    activo: boolean;
    constructor() { }
}

// Nombre Completo
// Número de identificación (Id),
// dirección,
// edad,
// género (Masculino/Femenino).