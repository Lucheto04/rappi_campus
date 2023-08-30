import { Router } from "express";
import { getTendero } from "../controllers/tendero.js";

// import routesVersioning from "express-routes-versioning";

const appTendero = Router();

appTendero.get('/', getTendero);


export default appTendero;