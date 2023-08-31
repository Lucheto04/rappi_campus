import { validationResult } from "express-validator";
import { collectionGen } from "../../config/connection/atlas.js";
import { siguienteId } from "../helpers/siguienteId.js";
import {chekData } from '../helpers/checkData.js';

const pedidos = await collectionGen('pedidos');
const dbProperties = {
    id_restaurant: 'id_restaurante',
    products: 'productos',
    address: 'direccion'
}

const getAllPedidos = async(req,res) => {
    res.send(await pedidos.aggregate([
        {
            $project: {
                id_order: '$id_pedido',
                id_restaurant: '$id_restaurante',
                products: '$productos',
                address: '$direccion'
            }
        }
    ]).toArray())
}
const postPedidos = async (req, res) => {
    //Validacion 
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).send(errors);
    try {
        const idPedido = await siguienteId('pedidos')
        const Data = chekData(dbProperties, req.body)
        await pedidos.insertOne({ id_pedido:idPedido,...Data})
        console.log(Data);
        res.status(201).json({status:201,message:'Pedido was added successfully :D'})
    } catch (error) {
        res.send(error);
    }
}
export {getAllPedidos, postPedidos}