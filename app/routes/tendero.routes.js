import { Router } from "express";
import { getTendero, postTendero, putTendero } from "../controllers/tendero.js";
import { tenderoDto } from "../middlewares/secure/tenderos.js";
// import routesVersioning from "express-routes-versioning";

const appTendero = Router();

appTendero.get('/', getTendero);
appTendero.post('/', tenderoDto, postTendero);
appTendero.put('/', tenderoDto, putTendero);


export default appTendero;