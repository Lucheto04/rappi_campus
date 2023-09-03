import { Router } from "express";
import { crearToken } from "../middlewares/jwt.js";
import {loginDTO} from '../middlewares/secure/login.dto.js';

const appLogin = Router();

appLogin.post('/',loginDTO ,crearToken);

export default appLogin;