import { Router } from "express";
import {deleteCupones, getAllCupones, postCupones, putCupones} from '../controllers/cupones.controller.js'
import {cuponesDTO} from "../middlewares/secure/cupones.dto.js"
import { limitReq } from "../middlewares/rateLimit.js";
const appCupones = Router();

appCupones.use(limitReq())

appCupones.get('/', getAllCupones);
appCupones.post('/', cuponesDTO, postCupones);
appCupones.put('/:id', cuponesDTO, putCupones);
appCupones.delete('/:id', deleteCupones);

export default appCupones;