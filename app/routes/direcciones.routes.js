import { Router } from "express";
import { getAllDirecciones } from "../controllers/direcciones.controller.js";

const appDirecciones = Router();

appDirecciones.get('/', getAllDirecciones);

export default appDirecciones;