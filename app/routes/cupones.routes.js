import { Router } from "express";
import {getAllCupones, postCupones, putCupones} from '../controllers/cupones.controller.js'
import {cuponesDTO} from "../middlewares/secure/cupones.dto.js"
const appCupones = Router();

appCupones.get('/', getAllCupones);
appCupones.post('/',cuponesDTO,postCupones);
appCupones.put('/:id',putCupones)

export default appCupones;