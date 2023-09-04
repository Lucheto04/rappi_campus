import { collectionGen } from "../../config/connection/atlas.js";
import { siguienteId } from '../helpers/siguienteId.js'
import { validationResult } from "express-validator"; 
const usuario = await collectionGen('usuarios');

export const getUsuarios = async (req, res) => {
    //Rate limit
    console.log(req.rateLimit);
    try {
        const result = await usuario.find().toArray();
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Couldnt connect to the database :C" })
    }
}

export const postUsuarios = async (req, res,) => {
    //Rate limit
    console.log(req.rateLimit);
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
        res.status(201).json({status:201,message:"'usuario' added successfully 😀"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Couldnt connect to the database :C" });
    }
}

export const putUsuarios = async (req, res) => {
    //Rate limit
    console.log(req.rateLimit);
    //Validacion 
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).send(errors);
    try {
        // Capture 'id' from req.params
        const {id} = req.params

        // change of variables
        const {user: nombre_usuario, name: nombre_completo, email_user: email, password_user: password, movil_number: movil, level:rol } = req.body
        const json = Object.assign({nombre_usuario, nombre_completo, email, password, movil, rol})
        
        // Update document
        const result = await usuario.updateOne(
            {id_usuario: parseInt(id)},
            {$set: json}
        )
        if(result.matchedCount === 0) return res.status(404).send('that usuario does not exist in the database');

        // Res consult...
        res.status(200).json({status:200,message:"Usuario updated successfully :D"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Couldnt connect to the database :C" });
    }
}

export const deleteUsuario = async (req, res) => {
    //Rate limit
    console.log(req.rateLimit);
    try {
        // Capture 'id' from req.params
        const {id} = req.params
        
        const result = await usuario.deleteOne(
            {id_usuario: parseInt(id)}
        )
        if(result.deletedCount === 0) return res.status(404).send('that usuario does not exist in the database');
        res.status(200).json({status:200,message:'deleted successfully 🙃'});
    } catch (error) {
        res.status(404).json({status:404,message:"Couldn't delete that 'usuario'"})
    }
}