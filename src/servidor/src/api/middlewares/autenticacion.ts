import { Request, Response, NextFunction } from 'express';
import moment from 'moment';
import jwt from 'jsonwebtoken';

export let autenticacionMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const token = req.headers.authorization;
    if (token) verificarExpiracionToken(token, res, next);
    else return res.status(401).send({ titulo: 'No autorizado', detalles: 'necesitas iniciar sesion para tener acceso' })
}

function verificarExpiracionToken(token: any, res: Response, next: NextFunction) {
    const tokenDecodificado: any = jwt.decode(token);
    const expiracion: moment.Moment = moment.unix(tokenDecodificado.exp);
    if (moment().isBefore(expiracion)) {
        res.locals.usuario = tokenDecodificado;
        next();
    } else return res.status(401).send({ titulo: 'Sesion expirada', detalles: 'La sesion ha expirado, por favor vuelve a iniciar sesion' });
    
}