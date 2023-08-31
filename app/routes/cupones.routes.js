import { Router } from "express";
import {deleteCupones, getAllCupones, postCupones, putCupones} from '../controllers/cupones.controller.js'
import {cuponesDTO} from "../middlewares/secure/cupones.dto.js"
const appCupones = Router();

appCupones.get('/', getAllCupones);
appCupones.post('/', cuponesDTO, postCupones);
appCupones.put('/:id', cuponesDTO, putCupones);
appCupones.delete('/:id', deleteCupones);

export default appCupones;