import { Router } from "express";
import { getUsuarios } from "../controllers/usuario.js";
// import routesVersioning from "express-routes-versioning";

const appUsuarios = Router();

appUsuarios.get('/', getUsuarios)

export default appUsuarios;
