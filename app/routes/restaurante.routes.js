import { Router } from "express";
import { getRestaurante, postRestaurante, putRestaurante, deleteRestaurante } from "../controllers/restaurante.js";
import { postRestauranteDto } from "../middlewares/secure/restaurantes.js";
import { limitReq } from "../middlewares/rateLimit.js";
import { verifyToken } from "../middlewares/jwt.js";
// import routesVersioning from "express-routes-versioning";

const appRestaurante = Router();

appRestaurante.use(verifyToken,limitReq());

appRestaurante.get('/', getRestaurante);
appRestaurante.post('/', postRestauranteDto, postRestaurante);
appRestaurante.put('/', postRestauranteDto, putRestaurante);
appRestaurante.delete('/', deleteRestaurante);


export default appRestaurante;