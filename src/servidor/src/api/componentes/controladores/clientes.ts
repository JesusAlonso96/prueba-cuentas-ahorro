import { Request, Response } from 'express';
import { NativeError } from 'mongoose';
import { Cliente, ICliente } from '../modelos/cliente';


//GET
export let obtenerClientePorId = (req: Request, res: Response) => {
    const idCliente: number = Number(req.params.idCliente);
    Cliente.aggregate()
        .project({
            id: 1,
            idC: 1,
            nombre: 1,
            apellido_paterno: 1,
            apellido_materno: 1,
            activo: 1,
            direccion: 1,
            idString: { $toString: '$id' }
        })
        .match({
            idString: { $regex: String(idCliente), $options: "i" }
        })
        .exec((err: any, clientesEncontrados: any[]) => {
            if (err) return res.status(422).send({ titulo: 'Error al obtener los clientes', detalles: 'Ocurrió un error al obtener los clientes, por favor intentalo de nuevo más tarde' });
            return res.status(200).json(clientesEncontrados);
        })
}

export let obtenerClientes = (req: Request, res: Response) => {
    const activo: boolean = req.query.activo == 'true';
    // Cliente.find()
    //     .where({ activo })
    //     .exec((err: NativeError, clientes: ICliente[]) => {
    //         if (err) return res.status(422).send({ titulo: 'Error al obtener los clientes', detalles: 'Ocurrió un error al obtener los clientes, por favor intentalo de nuevo más tarde' });
    //         return res.status(200).json(clientes);
    //     })


    const filtro: string = String(req.query.filtro);
    Cliente.aggregate()
        .match({ activo })
        .project({
            id: 1,
            idC: 1,
            nombre: 1,
            apellido_paterno: 1,
            apellido_materno: 1,
            activo: 1,
            direccion: 1,
            edad: 1,
            genero: 1,
            fechaRegistro: 1,
            idString: { $toString: '$id' }
        })
        .match({
            $or: [
                { idString: { $regex: String(filtro), $options: "i" } },
                { nombre: { $regex: String(filtro), $options: "i" } },
                { apellido_paterno: { $regex: String(filtro), $options: "i" } },
                { apellido_materno: { $regex: String(filtro), $options: "i" } }
            ]
        })
        .exec((err: any, clientesEncontrados: any[]) => {
            if (err) return res.status(422).send({ titulo: 'Error al obtener los clientes', detalles: 'Ocurrió un error al obtener los clientes, por favor intentalo de nuevo más tarde' });
            return res.status(200).json(clientesEncontrados);
        })
}


//POST
export let guardarCliente = async (req: Request, res: Response) => {
    try {
        const cliente: ICliente = new Cliente(req.body);
        await validarDatosNuevoCliente(cliente);
        cliente.fechaRegistro = new Date(Date.now());
        cliente.save((err: any, clienteGuardado: ICliente) => {
            if (err) return res.status(422).send({ titulo: 'Error al guardar el cliente', detalles: 'Ocurrió un error al guardar el cliente, por favor intentalo de nuevo más tarde' });
            return res.status(200).json(clienteGuardado);
        })
    } catch (error: any) {
        return res.status(error.codigo).send({ titulo: error.titulo, detalles: error.detalles });
    }

}

//FUNCION PARA VALIDAR DATOS DEL CLIENTE
function validarDatosNuevoCliente(cliente: ICliente) {
    return new Promise<void>((resolve, reject) => {
        if (cliente.nombre == undefined || cliente.nombre == null) reject({ codigo: 400, titulo: 'Campo nombre requerido', detalles: 'por favor, ingresa el campo nombre' });
        if (cliente.apellido_paterno == undefined || cliente.apellido_paterno == null) reject({ codigo: 400, titulo: 'Campo apellido paterno requerido', detalles: 'por favor, ingresa el campo apellido paterno' });
        if (cliente.idC == undefined || cliente.idC == null) reject({ codigo: 400, titulo: 'Campo id requerido', detalles: 'por favor, ingresa el campo id' });
        if (cliente.edad == undefined || cliente.edad == null) reject({ codigo: 400, titulo: 'Campo edad requerido', detalles: 'por favor, ingresa el campo edad' });
        if (cliente.genero == undefined || cliente.genero == null) reject({ codigo: 400, titulo: 'Campo genero requerido', detalles: 'por favor, ingresa el campo genero' });
        if (cliente.direccion == undefined || cliente.direccion == null) reject({ codigo: 400, titulo: 'Campo dirección requerido', detalles: 'por favor, ingresa el campo dirección' });
        if (cliente.direccion.calle == undefined || cliente.direccion.calle == null) reject({ codigo: 400, titulo: 'Campo calle de la dirección requerido', detalles: 'por favor, ingresa el campo calle de la dirección' });
        if (cliente.direccion.colonia == undefined || cliente.direccion.colonia == null) reject({ codigo: 400, titulo: 'Campo colonia de la dirección requerido', detalles: 'por favor, ingresa el campo colonia de la dirección' });
        if (cliente.direccion.numeroExterior == undefined || cliente.direccion.numeroExterior == null) reject({ codigo: 400, titulo: 'Campo número exterior de la dirección requerido', detalles: 'por favor, ingresa el campo número exterior de la dirección' });
        if (cliente.direccion.cp == undefined || cliente.direccion.cp == null) reject({ codigo: 400, titulo: 'Campo código postal de la dirección requerido', detalles: 'por favor, ingresa el campo código postal de la dirección' });
        if (cliente.direccion.referencias == undefined || cliente.direccion.referencias == null) reject({ codigo: 400, titulo: 'Campo referencias de la dirección requerido', detalles: 'por favor, ingresa el campo referencias de la dirección' });
        if (cliente.direccion.ciudad == undefined || cliente.direccion.ciudad == null) reject({ codigo: 400, titulo: 'Campo ciudad de la dirección requerido', detalles: 'por favor, ingresa el campo ciudad de la dirección' });
        if (cliente.direccion.estado == undefined || cliente.direccion.estado == null) reject({ codigo: 400, titulo: 'Campo estado de la dirección requerido', detalles: 'por favor, ingresa el campo estado de la dirección' });
        resolve();
    })
}













