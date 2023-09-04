import { collectionGen } from "../../config/connection/atlas.js";
import { siguienteId } from '../helpers/siguienteId.js'
import { validationResult } from "express-validator"; 
const tendero = await collectionGen('rappi_tendero');

export const getTendero = async (req, res) => {
    //Rate limit
    console.log(req.rateLimit);
    try {
        const result = await tendero.find().toArray();
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Couldnt connect to the database :C" })
    }
}

export const postTendero = async (req, res,) => {
    //Rate limit
    console.log(req.rateLimit);
    try {
        const id = await siguienteId('rappi_tendero');

        // Validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        
        // change of variables
        const {name: nombre_completo, email_tendero: email, password_tendero: password, movil_number: movil } = req.body;
        const json = Object.assign({nombre_completo, email, password, movil});
        
        // New document 
        const newDocument = {
            id_tendero: id,
            ...json
        }
        await tendero.insertOne(newDocument);

        // Res consult...
        res.status(201).json({status:201,message:"'tendero' added successfully 😀"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Couldnt connect to the database :C" });
    }
}

export const putTendero = async (req, res) => {
    //Rate limit
    console.log(req.rateLimit);
    try {
        //Validacion 
        const errors = validationResult(req)
        if (!errors.isEmpty()) return res.status(422).send(errors);
        // Capture 'id' from req.params
        const {id} = req.params

        // change of variables
        const {name: nombre_completo, email_tendero: email, password_tendero: password, movil_number: movil } = req.body;
        const json = Object.assign({nombre_completo, email, password, movil});
            
        // Update document
        const result = await tendero.updateOne(
            {id_tendero: parseInt(id)},
            {$set: json}
        )
        if(result.matchedCount === 0) return res.status(404).send('that tendero does not exist in the database');
        // Res consult...
        res.status(200).json({status:200,message:"Producto updated successfully :D"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Couldnt connect to the database :C" });
    }
}

export const deleteTendero = async (req, res) => {
    //Rate limit
    console.log(req.rateLimit);
    try {
        // Capture 'id' from req.params
        const {id} = req.params
        
        const result = await tendero.deleteOne(
            {id_tendero: parseInt(id)}
        )
        if(result.deletedCount === 0) return res.status(404).send('that tendero does not exist in the database');
        
        // Res consult...
        res.status(200).json({status:200,message:'deleted successfully 🙃'});
    } catch (error) {
        console.log(error);
        res.status(404).json({status:404,message:"Couldn't delete that 'usuario'"})
    }
}