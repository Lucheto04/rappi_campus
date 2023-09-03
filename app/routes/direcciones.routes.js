import { Router } from "express";
import { deleteDirecciones, getAllDirecciones, postDirecciones, putDirecciones } from "../controllers/direcciones.controller.js";
import {direccionesDTO} from '../middlewares/secure/direcciones.dto.js'
import { rateLimit } from "express-rate-limit";
const appDirecciones = Router();

appDirecciones.use(rateLimit())

appDirecciones.get('/', getAllDirecciones);
appDirecciones.post('/', direccionesDTO,postDirecciones);
appDirecciones.put('/:id', direccionesDTO, putDirecciones);
appDirecciones.delete('/:id', deleteDirecciones);

export default appDirecciones;