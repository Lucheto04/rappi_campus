import { Router } from "express";
import {getAllCupones} from '../controllers/cupones.controller.js'
const appCupones = Router();

appCupones.get('/', getAllCupones);

export default appCupones;