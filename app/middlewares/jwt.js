import { validationResult } from 'express-validator';
import {conexion } from '../../config/connection/atlas.js';
import { SignJWT, jwtVerify } from 'jose';
import { ObjectId } from 'mongodb';
import dotenv from 'dotenv';
dotenv.config();

const db = await conexion();
const encoder = new TextEncoder();

export const crearToken = async (req, res) => {
    try {
        //Validacion de data
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(422).send(errors);

        let id = undefined;
        switch (req.body.email) {
            case "admin@system.com":
                //Encontrar _id
                id = (await db.collection('roles').find({ nombre: "admin" }).toArray())[0]._id;
                break;
            default:
                //Validar email
                const user = await db.collection('usuarios').find({ email: req.body.email }).toArray();
                if (!user[0]) return res.status(404).send({ status: 404, message: 'Email does not exist match :C' });
                //Encontrar _id
                id = (await db.collection('roles').find({ nombre: "usuario" }).toArray())[0]._id;
        }
        const signJWT = await new SignJWT({ _id: id });
        const jwt = await signJWT
            .setProtectedHeader({ alg: 'HS256', typ: "JWT" })
            .setIssuedAt()
            .setExpirationTime('1h')
            .sign(encoder.encode(process.env.JWT_PRIVATE_KEY));
        res.status(200).json({status:200,message:jwt})
    } catch (error) {
        res.status(404).json({status:404,message:error.message})
    }
}

export const verifyToken = async (req, res,next) => {
    try {
        //check del token
        const { authorization } = req.headers;
        if (!authorization) return res.status(400).send({ status: 400, token: "Token not sent  🧐" });

        const dataJWT = await jwtVerify(
            authorization,
            encoder.encode(process.env.JWT_PRIVATE_KEY) 
        );
        //Encontrar los permisos
        const result = await db.collection('roles').findOne({ _id: new ObjectId(dataJWT.payload._id) });
        
        //Comparación de endponts 
        if (!(req.baseUrl in result.permisos)) return res.status(401).json({ status: 401, message: 'The endpoint is not allowed :C' })
        //Comparación de versiones
        const versions = result.permisos[req.baseUrl];
        //Comprobar version
        if (!(req.headers["accept-version"] in versions)) return res.status(401).json({ status: 401, message: 'The version is not allowed :C' })
        //Comparación de métodos
        const methods = versions[req.headers["accept-version"]]
        if(!(methods.includes(req.method))) return res.status(401).json({ status: 401, message: 'The method is not allowed :C' });
        next()
    } catch (error) {
        res.status(400).json({ status: 400, message:'Unathorized 🖐️ 🤨'})
    }
}

