import { Router } from "express";
import { getProductos, postProducto, putProducto, deleteProducto } from "../controllers/producto.js";
import { productoDto } from "../middlewares/secure/productos.js";
import { limitReq } from "../middlewares/rateLimit.js";
import { verifyToken } from "../middlewares/jwt.js";
// import routesVersioning from "express-routes-versioning";

const appProducto = Router();

appProducto.use(verifyToken,limitReq());

appProducto.get('/', getProductos);
appProducto.post('/', productoDto, postProducto);
appProducto.put('/:id', productoDto, putProducto);
appProducto.delete('/:id', deleteProducto);


export default appProducto;