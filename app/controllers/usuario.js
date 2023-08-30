import { collectionGen } from "../../config/connection/atlas.js";
import { siguienteId } from '../helpers/siguienteId.js'
import { validationResult } from "express-validator"; 
const usuario = await collectionGen('usuarios');

export const getUsuarios = async (req, res) => {
    try {
        const result = await usuario.find().toArray();
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Couldnt connect to the database :C" })
    }
}

export const postUsuarios = async (req, res,) => {
    try {
        const id = await siguienteId('usuarios');

        // Validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        
        // change of variables
        const {user: nombre_usuario, name: nombre_completo, email_user: email, password_user: password, movil_number: movil, level:rol } = req.body
        const json = Object.assign({nombre_usuario, nombre_completo, email, password, movil, rol})
        
        // New document 
        const newDocument = {
            id_usuario: id,
            ...json
        }
        await usuario.insertOne(newDocument);

        // Res consult...
        res.status(201).json({status:201,message:"'usuario' added successfully 😀"})
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Couldnt connect to the database :C" })
    }
}