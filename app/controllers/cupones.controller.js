import { collectionGen } from "../../config/connection/atlas.js";
import { validationResult } from "express-validator";
import { siguienteId } from "../helpers/siguienteId.js";

const cupones = await collectionGen('cupones') 

const getAllCupones = async (req, res) => {
    try {
        //Rate limit
        console.log(req.rateLimit);

        const result = await cupones.aggregate([
            {
                $project: {
                    id_cupon: '$id_cupon',
                    cupon: '$cupon',
                    expiration: '$expiracion',
                    discount: '$descuento',
                    validation: '$valido',
                    id_userConsumer: '$id_usuario_utiliza'
                }
            }
        ]).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error.message)
    }
}
const postCupones = async (req, res) => {
    //Rate limit
    console.log(req.rateLimit);
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
        res.status(201).json({status:201,message:'Cupon inserted successfully :D'})
    } catch (error) {
        res.send(error)
    }

}
const putCupones = async (req, res) => {
    //Rate limit
    console.log(req.rateLimit);
    //Validacion 
    const errors = validationResult(req)
    if (!errors.isEmpty()) return res.status(422).send(errors);
    try {
        const id = req.params.id

        //*Cambiar nombres de fronted a backend
        let data = req.body;
        const dbNames = {
            cupon:'cupon',
            expiration: 'expiracion',
            discount: 'descuento',
            validation: 'valido',
            id_userConsumer: 'id_usuario_utiliza'
        }
        let json = {};
        // Cambia los datos del fronted al backend
        for (const [fronted, backend] of Object.entries(dbNames)) {
            json[backend] = data[fronted];
        }
        // Elimina valores undefined dentro del objeto
        for (const clave in json) {
            if (json[clave] === undefined) {
                delete json[clave];
            }
        }
        // Expiración de string a Date
        if (json.hasOwnProperty('expiracion')) {
            const { expiracion } = json;
            const date = new Date(expiracion);
            json.expiracion = date;
        }
        console.log(json);
        const result = await cupones.updateOne({id_cupon:Number(id)},{$set:json})
        if (result.matchedCount === 0) return res.status(404).send({status:404,message:'that producto does not exist in the database 😢'});
        res.status(200).json({status:200,message:'sucessfully updated :D'})
    } catch (error) {
        res.send(error)
    }
}
const deleteCupones = async (req, res) => {
    //Rate limit
    console.log(req.rateLimit);
    try {
        const id = req.params.id

        const result = await cupones.deleteOne({id_cupon:Number(id)})
        if (result.deletedCount === 0) return res.status(404).send({status:404,message:'that producto does not exist in the database 😢'});
        res.status(200).json({status:200,message:'sucessfully deleted :D'})
    } catch (error) {
        res.send(error)
    }
}
export{getAllCupones,postCupones,putCupones,deleteCupones}