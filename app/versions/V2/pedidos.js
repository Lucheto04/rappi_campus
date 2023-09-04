import { collectionGen } from "../../../config/connection/atlas.js";

const pedidos = await collectionGen('pedidos');

export const pedidoByUser = async (req, res) => {
    //Rate limit
    console.log(req.rateLimit);
    try {
        const {id} = req.params
        if(!id) return res.status(404).json({ status: 404, message: "You did not send the data >:C" });
        const result = await pedidos.aggregate([
            {
                $match: {
                    id_usuario: parseInt(id) 
                }
            },
            {
                $lookup: {
                    from: "productos",
                    localField: "productos",
                    foreignField: "id_producto",
                    as: "detalle_productos"
                }
            },
            {
                $lookup: {
                    from: "restaurantes",
                    localField: "id_restaurante",
                    foreignField: "id_restaurante",
                    as: "info_restaurante"
                }
            },
            {
                $lookup: {
                    from: "rappi_tendero",
                    localField: "id_tendero",
                    foreignField: "id_tendero",
                    as: "info_tendero"
                }
            },
            {
                $lookup: {
                    from: "direcciones",
                    localField: "direccion",
                    foreignField: "id_direccion",
                    as: "info_direccion"
                }
            },
            {
                $project: {
                    _id: 0,
                    Pedido: "$id_pedido",
                    Restaurante: {
                        $arrayElemAt: ["$info_restaurante.nombre", 0]
                    },
                    Tendero: {
                        $arrayElemAt: ["$info_tendero.nombre_completo", 0]
                    },
                    Direccion: {
                        $arrayElemAt: ["$info_direccion.direccion", 0]
                    },
                    Productos: {
                        $map: {
                            input: "$detalle_productos",
                            as: "producto",
                            in: {
                                Nombre: "$$producto.nombre_producto",
                                Descripcion: "$$producto.descripcion",
                                Precio: "$$producto.precio"
                            }
                        }
                    }
                }
            }
        ]).toArray();
        if(result.length === 0) return res.status(404).json({ status: 404, message: "That user does not have any order requests." });
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Couldnt connect to the database :C" })
    }
}

export const infoSeller = async (req, res) => {
    //Rate limit
    console.log(req.rateLimit);
    try {
        const {id} = req.params
        if(!id) return res.status(404).json({ status: 404, message: "You did not send the data >:C" });
        const result = await pedidos.aggregate([
            {
                $match: {
                    id_pedido: parseInt(id)
                }
            },
            {
                $lookup: {
                    from: "rappi_tendero",
                    localField: "id_restaurante",
                    foreignField: "id_tendero",
                    as: "tendero_info"
                }
            },
            {
                $unwind: "$tendero_info"
            },
            {
                $project: {
                    _id: 0,
                    tendero: "$tendero_info.nombre_completo",
                    email: "$tendero_info.email",
                    movil: "$tendero_info.movil"
                }
            }
        ]).toArray();
        if(result.length === 0) return res.status(404).json({ status: 404, message: "No information was found for that order in the database." });
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Couldnt connect to the database :C" })
    }
}

export const badVersion = async (req, res) => {
    res.status(401).send({ status: 400, message:'This consult is not allowed to this version 🖐️ 🤨'})
}