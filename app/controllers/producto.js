import { collectionGen } from "../../config/connection/atlas.js";
import { siguienteId } from '../helpers/siguienteId.js'
import { validationResult } from "express-validator"; 
const producto = await collectionGen('productos');

export const getProductos = async (req, res) => {
    //Rate limit
    console.log(req.rateLimit);
    try {
        const result = await producto.find().toArray();
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Couldnt connect to the database :C" })
    }
}

export const postProducto = async (req, res,) => {
    //Rate limit
    console.log(req.rateLimit);
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

export const putProducto = async (req, res) => {
    //Rate limit
    console.log(req.rateLimit);
    try {
        // Capture 'id' from req.params
        const {id} = req.params

        // change of variables
        const {name: nombre_producto, restaurant_id: restaurante_id, description: descripcion, price: precio } = req.body;
        const json = Object.assign({nombre_producto, restaurante_id, descripcion, precio});
            
        // Update document
        const result = await producto.updateOne(
            {id_producto: parseInt(id)},
            {$set: json}
        )
        if(result.matchedCount === 0) return res.status(404).send('that producto does not exist in the database');
        // Res consult...
        res.status(200).json({status:200,message:"Producto updated successfully :D"});
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Couldnt connect to the database :C" });
    }
}

export const deleteProducto = async (req, res) => {
    //Rate limit
    console.log(req.rateLimit);
    try {
        // Capture 'id' from req.params
        const {id} = req.params
        
        const result = await producto.deleteOne(
            {id_producto: parseInt(id)}
        )
        if(result.deletedCount === 0) return res.status(404).send('that producto does not exist in the database');
        
        // Res consult...
        res.status(200).json({status:200,message:'deleted successfully 🙃'});
    } catch (error) {
        console.log(error);
        res.status(404).json({status:404,message:"Couldn't delete that 'usuario'"})
    }
}