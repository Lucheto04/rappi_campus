import { body } from "express-validator";

let producto = {
    entidad1: "name",
    entidad2: "restaurant_id",
    entidad3: "description",
    entidad4: "price"
}
let {entidad1: p1, entidad2: p2, entidad3: p3, entidad4: p4} = producto
export const productoDto = [
    body(`${p1}`)
    .notEmpty().withMessage(`El ${p1} es obligatorio.`)
    .isString().withMessage(`El ${p1} debe ser un string.`),

    body(`${p2}`)
    .notEmpty().withMessage(`El ${p2} es obligatorio.`)
    .isNumeric().withMessage(`El ${p2} debe ser el numero del id de un rol.`),

    body(`${p3}`)
    .notEmpty().withMessage(`El ${p3} es obligatorio.`)
    .isString().withMessage(`El ${p3} debe ser un string.`),


    body(`${p4}`)
    .notEmpty().withMessage(`El ${p4} es obligatorio.`)
    .isNumeric().withMessage(`El ${p4} debe ser el numero del id de un rol.`),
]