import { Router } from "express";
import { deleteDirecciones, getAllDirecciones, postDirecciones, putDirecciones } from "../controllers/direcciones.controller.js";
import {direccionesDTO} from '../middlewares/secure/direcciones.dto.js'
import { limitReq } from "../middlewares/rateLimit.js";
import { verifyToken } from "../middlewares/jwt.js";
const appDirecciones = Router();

appDirecciones.use(verifyToken,limitReq())

appDirecciones.get('/', getAllDirecciones);
appDirecciones.post('/', direccionesDTO,postDirecciones);
appDirecciones.put('/:id', direccionesDTO, putDirecciones);
appDirecciones.delete('/:id', deleteDirecciones);

export default appDirecciones;