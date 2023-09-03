import { Router } from "express";
import { getTendero, postTendero, putTendero, deleteTendero } from "../controllers/tendero.js";
import { tenderoDto } from "../middlewares/secure/tenderos.js";
import { limitReq } from "../middlewares/rateLimit.js";
// import routesVersioning from "express-routes-versioning";

const appTendero = Router();

appTendero.use(limitReq());

appTendero.get('/', getTendero);
appTendero.post('/', tenderoDto, postTendero);
appTendero.put('/', tenderoDto, putTendero);
appTendero.delete('/', deleteTendero);


export default appTendero;