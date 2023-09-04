import { collectionGen } from "../../config/connection/atlas.js";
import { validationResult } from "express-validator";
import { siguienteId } from "../helpers/siguienteId.js";
const direcciones = await collectionGen('direcciones'); 

const getAllDirecciones = async function (req, res) {
    try {
        //Rate limit
        console.log(req.rateLimit);
        const result = await direcciones.aggregate([
            {
                $project: {
                    id_address: '$id_direccion',
                    id_user: '$usuario_id',
                    address: '$direccion'
                }
            }
        ]).toArray();
        res.send(result)
    } catch (error) {
        res.status(500).json(error);
    }
}
const postDirecciones = async (req, res) => {
    
    //Validacion 
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).send(errors);
    //Rate limit
    console.log(req.rateLimit);
    try {
        const idDirecc = await siguienteId('direcciones')
        await direcciones.insertOne({ id_direccion: idDirecc, ...req.body });
        res.status(201).json({status:201,message:'Direccion added successfully :D'})
    } catch (error) {
        res.status(500).json({satus:500,message:error});
    }
}
const putDirecciones = async (req, res) => {
    //Validacion 
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).send(errors);
    //Rate limit
    console.log(req.rateLimit);
    try {
        const id = req.params.id;
        console.log(id);

        //* Cambiar propiedades de fronted a backend 
        let data = req.body;
        
        const dbNames = {
            id_address: 'id_direccion',
            id_user: 'usuario_id',
            direccion:'direccion'
        }
        let json = {}
        //Cambia las propiedades manejadas por el usuario a las establecidas en la base de datos 
        for (const [fronted, backend] of Object.entries(dbNames)) {
            json[backend] = data[fronted];
        }
        console.log({ id_direccion: Number(id) }, { $set: json });
        //Elimina valores en undefined del objeto
        for (const clave in json) {
            if (json[clave] === undefined) {
                delete json[clave];
            }
        }
        await direcciones.updateOne({ id_direccion:Number(id)},{$set:json})
        res.status(200).json({status:200,message:'Direccion updated successfully :D'})
    } catch (error) {
        res.send(error)
    }
}
const deleteDirecciones = async (req, res) => {
    //Rate limit
    console.log(req.rateLimit);
    try {
        const { id } = req.params;

        const result = await direcciones.deleteOne({ id_direccion: parseInt(id) })
        if(result.deleteCount === 0) return result.status(404).json({status:404,message:'That direccion does not exist'})
        res.status(200).json({status:200,message:'That direccion was successfully deleted'})
    } catch (error) {
        res.send(error)
    }
}
export { getAllDirecciones, postDirecciones, putDirecciones, deleteDirecciones }