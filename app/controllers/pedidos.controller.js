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
        res.status(201).json({status:201,message:'Pedido was added successfully :D'})
    } catch (error) {
        res.send(error);
    }
}
const putPedidos = async (req, res) => {
    //Validacion 
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).send(errors);
    try {
        const data = chekData(dbProperties, req.body)
        console.log(data);
        const result = await pedidos.updateOne({ id_pedido: Number(req.params.id) }, { $set: data })
        // Validacion del parametro
        if (result.matchedCount === 0) return res.status(400).json({ status:400,message:'id was not sent, please check the readme for more information'})

        res.status(200).json({status:200,message:'pedidos updated successfully 😁👍'})
    } catch (error) {
        res.status(500).send({status:500,message:error.message});
    }
}
const deletePedidos = async (req, res) => {
    //Validacion 
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).send(errors);
    try {

        const result = await pedidos.deleteOne({ id_pedido: Number(req.params.id) })
        if (result.deleteCount === 0) return result.status(404).json({ status: 404, message: 'That pedido does not exist' });
        res.send({ status: 200, message:'pedido was successfully deleted'})
    } catch (error) {
        res.status(500).send({ status: 500, message: error.message });
    }
}
export { getAllPedidos, postPedidos, putPedidos, deletePedidos }