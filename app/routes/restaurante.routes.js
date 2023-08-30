import { Router } from "express";
import { getRestaurante } from "../controllers/restaurante.js";

const appRestaurante = Router();

appRestaurante.get('/', getRestaurante);


export default appRestaurante;