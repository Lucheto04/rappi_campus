import { Router } from "express";
import { deletePedidos, getAllPedidos, postPedidos, putPedidos } from "../controllers/pedidos.controller.js";
import { pedidosDTO } from "../middlewares/secure/pedidos.dto.js";
import { limitReq } from "../middlewares/rateLimit.js";
import routesVersioning from "express-routes-versioning";
import { pedidoByUser } from "../versions/V2/pedidos.js";
const appPedidos = Router();
const version = routesVersioning();
appPedidos.use(limitReq());

appPedidos.get('/', version({
    "1.0.0": getAllPedidos
}));
// Busqueda de pedido por id_usuario
appPedidos.get('/:id', version({
    "2.0.0": pedidoByUser
}));
appPedidos.post('/', pedidosDTO, postPedidos);
appPedidos.put('/:id', pedidosDTO, putPedidos);
appPedidos.delete('/:id', pedidosDTO, deletePedidos);
export default appPedidos;