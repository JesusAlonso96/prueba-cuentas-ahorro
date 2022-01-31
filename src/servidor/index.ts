import bodyParser from 'body-parser';
import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import Servidor from './src/api/clases/servidor';
import { BD_URL } from './src/config/bd';


const servidor = Servidor.instance;

/* CONEXION A LA BASE DE DATOS */
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);
mongoose.set('useUnifiedTopology', true);
mongoose.connect(BD_URL, { useNewUrlParser: true });

/* Body parser */
servidor.app.use(bodyParser.json({ limit: '10mb' }));
servidor.app.use(bodyParser.urlencoded({ limit: '10mb', extended: true }));

/* CORS */
servidor.app.use(cors({ origin: true, credentials: true }));



servidor.iniciar();
