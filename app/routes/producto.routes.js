import { Router } from "express";
import { getProductos } from "../controllers/producto.js";

// import routesVersioning from "express-routes-versioning";

const appProducto = Router();

appProducto.get('/', getProductos);


export default appProducto;