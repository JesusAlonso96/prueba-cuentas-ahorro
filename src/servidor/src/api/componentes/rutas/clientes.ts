import { Router } from 'express';
import { autenticacionMiddleware } from '../../middlewares/autenticacion';
import * as ControladorClientes from '../controladores/clientes';


const rutasClientes = Router();

//GET
rutasClientes.get('/:idCliente', autenticacionMiddleware, ControladorClientes.obtenerClientePorId);
rutasClientes.get('', autenticacionMiddleware, ControladorClientes.obtenerClientes);


//POST
rutasClientes.post('', autenticacionMiddleware, ControladorClientes.guardarCliente);









export default rutasClientes;