import { collectionGen } from "../../config/connection/atlas.js";
import { siguienteId } from '../helpers/siguienteId.js'
import { validationResult } from "express-validator"; 
const restaurante = await collectionGen('restaurantes');

export const getRestaurante = async (req, res) => {
    try {
        const result = await restaurante.find().toArray();
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Couldnt connect to the database :C" })
    }
}


export const postRestaurante = async (req, res,) => {
    try {
        const id = await siguienteId('restaurantes');

        // Validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        
        // change of variables
        const {name: nombre, address: direccion, qualification: calificacion } = req.body;
        const json = Object.assign({nombre, direccion, calificacion});
        
        // New document 
        const newDocument = {
            id_restaurante: id,
            ...json
        }
        await restaurante.insertOne(newDocument);

        // Res consult...
        res.status(201).json({status:201,message:"'restaurante' added successfully 😀"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Couldnt connect to the database :C" });
    }
}

export const putRestaurante = async (req, res) => {
    try {
        // Capture 'id' from req.query
        const {id} = req.query

        // change of variables
        const {name: nombre, address: direccion, qualification: calificacion } = req.body;
        const json = Object.assign({nombre, direccion, calificacion});
            
        // Update document
        const result = await restaurante.updateOne(
            {id_restaurante: parseInt(id)},
            {$set: json}
        )
        if(result.matchedCount === 0) return res.status(404).send('that restaurant does not exist in the database');
        // Res consult...
        res.status(200).json({status:200,message:"Restaurante updated successfully :D"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Couldnt connect to the database :C" });
    }
}

export const deleteRestaurante = async (req, res) => {
    try {
        // Capture 'id' from req.query
        const {id} = req.query
        
        const result = await restaurante.deleteOne(
            {id_restauranteo: parseInt(id)}
        )
        if(result.deletedCount === 0) return res.status(404).send('that restaurant does not exist in the database');

        res.status(200).json({status:200,message:'deleted successfully 🙃'});
    } catch (error) {
        console.log(error);
        res.status(404).json({status:404,message:"Couldn't delete that 'usuario'"})
    }
}