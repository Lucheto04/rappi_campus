import { Router } from "express";
import { getRestaurante, postRestaurante, putRestaurante, deleteRestaurante } from "../controllers/restaurante.js";
import { postRestauranteDto } from "../middlewares/secure/restaurantes.js";
import { limitReq } from "../middlewares/rateLimit.js";
import routesVersioning from "express-routes-versioning";
import { restaurantByName, restaurantByQualification, restaurantWithProducts } from "../versions/V2/restaurantes.js";
import { verifyToken } from "../middlewares/jwt.js";
const appRestaurante = Router();
const version = routesVersioning();
appRestaurante.use(verifyToken,limitReq());

// Busquedas de restaurantes de la V1 y V2, en la V2 se filtra los restaurantes por nombre pasandolo en el 'body' de la consulta.
appRestaurante.get('/', version({
    "1.0.0": getRestaurante,
    "2.0.0": restaurantByName
}));

// Busqueda de restaurantes con todos sus productos de la V2.
appRestaurante.get('/productos', version({
    "2.0.0": restaurantWithProducts
}));

// Busqueda de restaurantes por la calificacion dentro de los parametros de la V2.
appRestaurante.get('/:qualification', version({
    "2.0.0": restaurantByQualification
}));

appRestaurante.post('/', postRestauranteDto, version({
    "1.0.0": postRestaurante
}));
appRestaurante.put('/:id', postRestauranteDto, version({
    "1.0.0": putRestaurante
}));
appRestaurante.delete('/:id', version({
    "1.0.0": deleteRestaurante
}));


export default appRestaurante;