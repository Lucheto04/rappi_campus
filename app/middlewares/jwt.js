import { validationResult } from 'express-validator';
import {conexion } from '../../config/connection/atlas.js';
import { SignJWT, jwtVerify } from 'jose';

const db = await conexion();
const encoder = new TextEncoder();

export const crearToken = async (req, res) => {
    try {
        //Validacion de data
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(422).send(errors);

        console.log(req.body);
        const result = await db.collection('usuarios').find({ email: req.body.email }).toArray();
        console.log(result);
        res.send(result)
    } catch (error) {
        res.status(500).json({status:500,message:error.message})
    }
}


