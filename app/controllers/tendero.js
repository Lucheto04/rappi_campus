import { collectionGen } from "../../config/connection/atlas.js";
import { siguienteId } from '../helpers/siguienteId.js'
import { validationResult } from "express-validator"; 
const tendero = await collectionGen('rappi_tendero');

export const getTendero = async (req, res) => {
    try {
        const result = await tendero.find().toArray();
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Couldnt connect to the database :C" })
    }
}
// {
//     "_id": "64eeb14c586f9929fd87f609",
//     "id_tendero": 1,
//     "nombre_completo": "Pancho Gerardo Martinez Martinez",
//     "email": "pancho@gmail.com",
//     "password": "panchit0001",
//     "movil": "+573156794374"
// }
export const postTendero = async (req, res,) => {
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