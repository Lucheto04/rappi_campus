import { Router } from "express";
import { getUsuarios , postUsuarios, putUsuarios, deleteUsuario} from "../controllers/usuario.js";
import { postUsuarioDto } from "../middlewares/secure/usuarios.js";
import { limitReq } from "../middlewares/rateLimit.js";
import { verifyToken } from "../middlewares/jwt.js";
// import routesVersioning from "express-routes-versioning";

const appUsuarios = Router();

appUsuarios.use(verifyToken,limitReq());

appUsuarios.get('/', getUsuarios);
appUsuarios.post('/', postUsuarioDto, postUsuarios);
appUsuarios.put('/:id', postUsuarioDto, putUsuarios);
appUsuarios.delete('/:id', deleteUsuario);

export default appUsuarios;
