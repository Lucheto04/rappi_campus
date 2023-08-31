import { Router } from "express";
import { getAllPedidos, postPedidos } from "../controllers/pedidos.controller.js";
import { pedidosDTO } from "../middlewares/secure/pedidos.dto.js";

const appPedidos = Router() 

appPedidos.get('/', getAllPedidos);
appPedidos.post('/',pedidosDTO,postPedidos)

export default appPedidos;