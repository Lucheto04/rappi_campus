import { Router } from "express";
import {getAllCupones, postCupones} from '../controllers/cupones.controller.js'
import {cuponesDTO} from "../middlewares/secure/cupones.dto.js"
const appCupones = Router();

appCupones.get('/', getAllCupones);
appCupones.post('/',cuponesDTO,postCupones);

export default appCupones;