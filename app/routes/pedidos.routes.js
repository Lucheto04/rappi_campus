import { Router } from "express";
import { getAllPedidos, postPedidos } from "../controllers/pedidos.controller.js";

const appPedidos = Router() 

appPedidos.get('/', getAllPedidos);
appPedidos.post('/',postPedidos)

export default appPedidos;