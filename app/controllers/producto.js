import { collectionGen } from "../../config/connection/atlas.js";
import { siguienteId } from '../helpers/siguienteId.js'
import { validationResult } from "express-validator"; 
const producto = await collectionGen('productos');

export const getProductos = async (req, res) => {
    try {
        const result = await producto.find().toArray();
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Couldnt connect to the database :C" })
    }
}

export const postProducto = async (req, res,) => {
    try {
        const id = await siguienteId('productos');

        // Validation
        const errors = validationResult(req);
        if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
        
        // change of variables
        const {name: nombre_producto, restaurant_id: restaurante_id, description: descripcion, price: precio } = req.body;
        const json = Object.assign({nombre_producto, restaurante_id, descripcion, precio});
        
        // New document 
        const newDocument = {
            id_producto: id,
            ...json
        }
        await producto.insertOne(newDocument);

        // Res consult...
        res.status(201).json({status:201,message:"'producto' added successfully 😀"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Couldnt connect to the database :C" });
    }
}