import { collectionGen } from "../../../config/connection/atlas.js";

const cupon = await collectionGen('cupones');


export const validCupon = async (req, res) => {
    try {
        //Rate limit
        console.log(req.rateLimit);

        const result = await cupon.aggregate([
            {
                $match: {
                    valido: true,
                    expiracion: { $gt: new Date() } // Cupones que no han expirado
                }
            },
            {
                $project: {
                    _id: 0,
                    id_cupon: 1,
                    cupon: 1,
                    expiracion: 1,
                    descuento: 1
                }
            }
        ]).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error.message)
    }
}

export const usedCupons = async (req, res) => {
    try {
        //Rate limit
        const { id } = req.params
        console.log(req.rateLimit);

        const result = await cupon.aggregate([
            {
                $match: {
                    id_usuario_utiliza: parseInt(id)
                }
            },
            {
                $lookup: {
                    from: "usuarios",
                    localField: "id_usuario_utiliza",
                    foreignField: "id_usuario",
                    as: "usuario_info"
                }
            },
            {
                $unwind: "$usuario_info"
            },
            {
                $group: {
                    _id: "$usuario_info",
                    CuponesUtilizados: {
                        $push: {
                            cupon: "$cupon",
                            expiracion: "$expiracion",
                            descuento: "$descuento",
                        }
                    }
                }
            },
            {
                $project: {
                    _id: 0,
                    Usuario: {
                        nombre_usuario: "$_id.nombre_usuario",
                        movil: "$_id.movil",
                        CuponesUtilizados: "$CuponesUtilizados"
                    }
                }
            }
        ]).toArray();
        res.send(result);
    } catch (error) {
        console.log(error);
        res.send(error.message)
    }
}