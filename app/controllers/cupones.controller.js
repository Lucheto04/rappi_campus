import { conexion } from "../../config/connection/atlas.js";

const db = await conexion();
const cupones = db.collection('cupones') 

export const getAllCupones = async (req,res) => {
    const result = await cupones.find().toArray();
    res.send(result);
}