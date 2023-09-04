import { Router } from "express";
import {deleteCupones, getAllCupones, postCupones, putCupones} from '../controllers/cupones.controller.js'
import {cuponesDTO} from "../middlewares/secure/cupones.dto.js"
import { limitReq } from "../middlewares/rateLimit.js";
import routesVersioning from "express-routes-versioning";
import { validCupon, usedCupons } from "../versions/V2/cupones.js";
import { verifyToken } from "../middlewares/jwt.js";
const appCupones = Router();
const version = routesVersioning();
appCupones.use(verifyToken,limitReq())

// Busquedas de cupones de la V1 y V2, en la V2 se filtra para conseguir solo los cupones validos.
appCupones.get('/', version({
    "1.0.0": getAllCupones,
    "2.0.0": validCupon
}));

// Busqueda de cupones ya usados por un usuario en especifico.
appCupones.get('/por/:id', version({
    "2.0.0": usedCupons
}));

appCupones.post('/', cuponesDTO, version({
    "1.0.0": postCupones
}));
appCupones.put('/:id', cuponesDTO, version({
    "1.0.0": putCupones
}));
appCupones.delete('/:id', version({
    "1.0.0": deleteCupones
}));

export default appCupones;