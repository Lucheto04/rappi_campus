import { collectionGen } from "../../config/connection/atlas.js";

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

export {getAllDirecciones}