import { Router } from "express";
import { deleteDirecciones, getAllDirecciones, postDirecciones, putDirecciones } from "../controllers/direcciones.controller.js";
import {direccionesDTO} from '../middlewares/secure/direcciones.dto.js'
const appDirecciones = Router();

appDirecciones.get('/', getAllDirecciones);
appDirecciones.post('/', direccionesDTO,postDirecciones);
appDirecciones.put('/:id', direccionesDTO, putDirecciones);
appDirecciones.delete('/:id', deleteDirecciones);

export default appDirecciones;