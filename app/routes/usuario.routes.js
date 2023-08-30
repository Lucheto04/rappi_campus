import { Router } from "express";
import { getUsuarios , postUsuarios, putUsuarios, deleteUsuario} from "../controllers/usuario.js";
import { postUsuarioDto } from "../middlewares/secure/usuarios.js";
// import routesVersioning from "express-routes-versioning";

const appUsuarios = Router();

appUsuarios.get('/', getUsuarios);
appUsuarios.post('/', postUsuarioDto, postUsuarios);
appUsuarios.put('/', postUsuarioDto, putUsuarios);
appUsuarios.delete('/', deleteUsuario);

export default appUsuarios;
