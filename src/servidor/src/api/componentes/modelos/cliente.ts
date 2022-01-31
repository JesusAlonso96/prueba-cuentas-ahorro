import mongoose, { Document, Schema } from 'mongoose';
import autoIncrement from 'mongoose-auto-increment';
import { BD_URL } from '../../../config/bd';


mongoose.set('useUnifiedTopology', true);
var conexion = mongoose.createConnection(BD_URL, { useNewUrlParser: true });
autoIncrement.initialize(conexion);

export interface ICliente extends Document {
    id: number;
    idC: number;
    nombre: string;
    apellido_paterno: string;
    apellido_materno: string;
    direccion: {
        calle: string;
        colonia: string;
        numeroExterior: string;
        numeroInterior: string;
        estado: string;
        ciudad: string;
        cp: string;
        referencias: string;
    };
    edad: number;
    genero: number;
    fechaRegistro: Date;
    activo: boolean;

}

const clientesSchema = new Schema({
    id: { type: Number, required: false },
    idC: { type: Number, required: false },
    nombre: { type: String, required: false },
    apellido_paterno: { type: String, required: false },
    apellido_materno: { type: String, required: false },
    direccion: {
        type: {
            calle: { type: String, required: false },
            colonia: { type: String, required: false },
            numeroExterior: { type: String, required: false },
            numeroInterior: { type: String, required: false },
            estado: { type: String, required: false },
            ciudad: { type: String, required: false },
            cp: { type: String, required: false },
            referencias: { type: String, required: false },
        }
    },
    edad: { type: Number, required: false },
    genero: { type: Number, required: false },
    fechaRegistro: { type: Date, required: false },
    activo: { type: Boolean, required: false, default: true }
});

clientesSchema.plugin(autoIncrement.plugin, { model: 'Cliente', field: 'id' });

export const Cliente = mongoose.model<ICliente>('Cliente', clientesSchema);