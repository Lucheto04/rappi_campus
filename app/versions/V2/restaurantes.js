import { collectionGen } from "../../../config/connection/atlas.js";

const restaurante = await collectionGen('restaurantes');

export const restaurantByName = async (req, res) => {
    //Rate limit
    console.log(req.rateLimit);
    try {
        const {name} = req.body
        if(!name) return res.status(404).json({ status: 404, message: "You did not send the data >:C" });
        const result = await restaurante.find(
            {
                nombre: name
            },
            {
               _id: 0
            }
        ).toArray();
        if(result.length === 0) return res.status(404).json({ status: 404, message: "Couldnt find that restaurant" });
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Couldnt connect to the database :C" })
    }
}

export const restaurantByQualification = async (req, res) => {
    //Rate limit
    console.log(req.rateLimit);
    try {
        const {qualification} = req.params
        if(!qualification) return res.status(404).json({ status: 404, message: "You did not send the data >:C" });
        const result = await restaurante.find(
            {
                calificacion: {$eq: parseInt(qualification)}
            },
            {
                _id: 0,
                Name: '$nombre',
                Address: '$direccion',
                Qualification: '$calificacion'
            }
        ).toArray();
        if(result.length === 0) return res.status(404).json({ status: 404, message: "A restaurant with that rating was not found." });
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Couldnt connect to the database :C" })
    }
}

export const restaurantWithProducts = async (req, res) => {
    //Rate limit
    console.log(req.rateLimit);
    try {
        const result = await restaurante.aggregate([
            {
                $lookup: {
                    from: "productos",
                    localField: "id_restaurante",
                    foreignField: "restaurante_id",
                    as: "Menu"
                }
            },
            {
                $match: {
                    Menu: { $ne: [] }
                }
            },
            {
                $project: {
                    _id: 0,
                    Name: "$nombre",
                    Address: "$direccion",
                    Qualification: "$calificacion",
                    Menu: {
                        $map: {
                            input: "$Menu",
                            as: "item",
                            in: {
                                Name_: "$$item.nombre_producto",
                                Description: "$$item.descripcion",
                                Price: "$$item.precio"
                            }
                        }
                    }
                }
            }
        ]).toArray();
        res.status(200).json(result)
    } catch (error) {
        console.log(error);
        res.status(500).json({ status: 500, message: "Couldnt connect to the database :C" })
    }
}
