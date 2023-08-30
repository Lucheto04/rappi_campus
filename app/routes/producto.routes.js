import { Router } from "express";
import { getProductos, postProducto, putProducto, deleteProducto } from "../controllers/producto.js";
import { productoDto } from "../middlewares/secure/productos.js";
// import routesVersioning from "express-routes-versioning";

const appProducto = Router();

appProducto.get('/', getProductos);
appProducto.post('/', productoDto, postProducto);
appProducto.put('/', productoDto, putProducto);
appProducto.delete('/', deleteProducto);


export default appProducto;