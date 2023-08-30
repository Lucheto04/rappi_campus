import { Router } from "express";
import { getRestaurante, postRestaurante } from "../controllers/restaurante.js";
import { postRestauranteDto } from "../middlewares/secure/restaurantes.js";
// import routesVersioning from "express-routes-versioning";

const appRestaurante = Router();

appRestaurante.get('/', getRestaurante);
appRestaurante.post('/', postRestauranteDto, postRestaurante);


export default appRestaurante;