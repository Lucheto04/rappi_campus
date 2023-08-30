import { collectionGen } from "../../config/connection/atlas.js";
import { validationResult } from "express-validator";
import { siguienteId } from "../helpers/siguienteId.js";

const cupones = await collectionGen('cupones') 

const getAllCupones = async (req,res) => {
    const result = await cupones.find().toArray();
    res.send(result);
}
const postCupones = async (req, res) => {
    //Validacion 
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).send(errors);
    try {
        //Desestructuracion  y autoincrement
        let { cupon, expiration, discount, validation } = req.body

        const date = new Date(expiration)
        const idCupon = await siguienteId('cupones');

        const newParams = {
            id_cupon: idCupon,
            cupon: cupon,
            expiracion: date,
            descuento: discount,
            valido: validation
        }
        await cupones.insertOne(newParams)
        res.status(201).json({status:201,message:'Cupon insertado correctamente :D'})
    } catch (error) {
        res.send(error)
    }

}

export{getAllCupones,postCupones}