import { Router } from "express";
import { getProductos, postProducto } from "../controllers/producto.js";
import { productoDto } from "../middlewares/secure/productos.js";
// import routesVersioning from "express-routes-versioning";

const appProducto = Router();

appProducto.get('/', getProductos);
appProducto.post('/', productoDto, postProducto);


export default appProducto;