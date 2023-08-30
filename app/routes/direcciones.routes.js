import { Router } from "express";
import { getAllDirecciones, postDirecciones } from "../controllers/direcciones.controller.js";
import {direccionesDTO} from '../middlewares/secure/direcciones.dto.js'
const appDirecciones = Router();

appDirecciones.get('/', getAllDirecciones);
appDirecciones.post('/', direccionesDTO,postDirecciones);

export default appDirecciones;