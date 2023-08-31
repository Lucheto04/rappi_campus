import { Router } from "express";
import { getAllPedidos, postPedidos, putPedidos } from "../controllers/pedidos.controller.js";
import { pedidosDTO } from "../middlewares/secure/pedidos.dto.js";

const appPedidos = Router() 

appPedidos.get('/', getAllPedidos);
appPedidos.post('/', pedidosDTO, postPedidos);
appPedidos.put('/:id', pedidosDTO, putPedidos);

export default appPedidos;