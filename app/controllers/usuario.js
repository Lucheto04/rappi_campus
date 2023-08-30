import { collectionGen } from "../../config/connection/atlas.js";
import { siguienteId } from '../helpers/siguienteId.js' 

export const getUsuarios = async (req, res) => {
    try {
        const usuario = await collectionGen('usuarios');
        const result = await usuario.find().toArray();
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Couldnt connect to the database :C" })
    }
}