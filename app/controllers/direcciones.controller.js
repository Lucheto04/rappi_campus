import { collectionGen } from "../../config/connection/atlas.js";
import { validationResult } from "express-validator";
import { siguienteId } from "../helpers/siguienteId.js";
const direcciones = await collectionGen('direcciones'); 

const getAllDirecciones = async function (req, res) {
    try {
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
    try {
        const idDirecc = await siguienteId('direcciones')
        await direcciones.insertOne({ id_direccion: idDirecc, ...req.body });
        res.status(201).json({status:201,message:'Direccion added successfully :D'})
    } catch (error) {
        res.status(500).json({satus:500,message:error});
    }
}

export { getAllDirecciones, postDirecciones }