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