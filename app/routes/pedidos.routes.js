import { Router } from "express";
import { deletePedidos, getAllPedidos, postPedidos, putPedidos } from "../controllers/pedidos.controller.js";
import { pedidosDTO } from "../middlewares/secure/pedidos.dto.js";
import { limitReq } from "../middlewares/rateLimit.js";

const appPedidos = Router() 

appPedidos.use(limitReq());

appPedidos.get('/', getAllPedidos);
appPedidos.post('/', pedidosDTO, postPedidos);
appPedidos.put('/:id', pedidosDTO, putPedidos);
appPedidos.delete('/:id', pedidosDTO, deletePedidos);
export default appPedidos;