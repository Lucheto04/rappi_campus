import { Router } from "express";
import { getUsuarios , postUsuarios} from "../controllers/usuario.js";
import { postUsuarioDto } from "../middlewares/secure/usuarios.js";
// import routesVersioning from "express-routes-versioning";

const appUsuarios = Router();

appUsuarios.get('/', getUsuarios);
appUsuarios.post('/', postUsuarioDto, postUsuarios);

export default appUsuarios;
